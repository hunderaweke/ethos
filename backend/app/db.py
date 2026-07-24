import ssl
from collections.abc import AsyncGenerator

from sqlalchemy.engine import make_url
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase

from app.config import settings

# Cloud Postgres URLs (Supabase/Neon/Render/...) carry libpq-style query params
# like ?sslmode=require. asyncpg doesn't understand those — it takes an `ssl`
# connect arg instead — so translate here rather than making callers hand-edit
# the connection string.
_LIBPQ_ONLY_PARAMS = ("sslmode", "channel_binding", "gssencmode", "sslrootcert", "sslcert", "sslkey")


def _asyncpg_url_and_args():
    """Return an asyncpg-safe URL (libpq-only params stripped) plus the matching
    connect_args. Shared by the app engine and Alembic so both handle SSL the
    same way."""
    url = make_url(settings.database_url)
    query = dict(url.query)
    sslmode = query.pop("sslmode", None)
    for key in _LIBPQ_ONLY_PARAMS:
        query.pop(key, None)
    url = url.set(query=query)

    # Managed Postgres (Supabase/Aiven/Neon/...) requires SSL but its URI often
    # omits sslmode. Default any non-local host to require-style SSL so it
    # connects out of the box; leave local/Docker as plaintext.
    host = (url.host or "").lower()
    if sslmode is None and host not in ("", "localhost", "127.0.0.1", "::1"):
        sslmode = "require"

    connect_args: dict = {}
    if sslmode == "disable":
        connect_args["ssl"] = False
    elif sslmode in ("allow", "prefer", "require"):
        # libpq "require" = encrypt but don't verify the cert; mirror that so
        # managed DBs with non-public CAs still connect.
        context = ssl.create_default_context()
        context.check_hostname = False
        context.verify_mode = ssl.CERT_NONE
        connect_args["ssl"] = context
    elif sslmode in ("verify-ca", "verify-full"):
        connect_args["ssl"] = True

    return url, connect_args


DB_URL, DB_CONNECT_ARGS = _asyncpg_url_and_args()

engine = create_async_engine(DB_URL, echo=False, connect_args=DB_CONNECT_ARGS)
async_session = async_sessionmaker(engine, expire_on_commit=False)


class Base(DeclarativeBase):
    pass


class DatabaseUnavailableError(RuntimeError):
    """The database couldn't be reached at all (DNS failure, connection
    refused, timeout) — distinct from a query failing against a database
    that IS reachable. Raised so app.errors can return a clean 503 instead
    of letting the raw socket/asyncpg exception surface as an unhandled 500."""


# Connection-level failures raised by asyncpg before SQLAlchemy gets a chance
# to wrap them in its own exception hierarchy (that wrapping only happens for
# errors during statement execution on an already-open connection).
_CONNECTIVITY_ERRORS = (
    ConnectionError,  # covers ConnectionRefusedError/ResetError/AbortedError
    TimeoutError,
    OSError,  # socket.gaierror (DNS failure) is an OSError subclass
)


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with async_session() as session:
        try:
            yield session
        except _CONNECTIVITY_ERRORS as exc:
            raise DatabaseUnavailableError("Could not reach the database") from exc
