import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy import text

from app.config import settings
from app.db import engine
from app.errors import register_error_handlers
from app.routers import analytics, auth, discover, follows, items, link_preview, profiles, saves
from app.services.uploads import UPLOAD_ROOT

logger = logging.getLogger("app.startup")


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Fail loud with one clear line at boot instead of letting the first
    # request that touches the DB surface a multi-hundred-line traceback.
    try:
        async with engine.connect() as conn:
            await conn.execute(text("SELECT 1"))
    except Exception as exc:
        logger.error(
            "Could not connect to the database at startup (%s). "
            "Check DATABASE_URL — requests that need the DB will return 503 until this is fixed.",
            exc.__class__.__name__,
        )
    yield


app = FastAPI(title="blueprint.id API", version="0.1.0", lifespan=lifespan)
register_error_handlers(app)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_origin],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_ROOT.mkdir(parents=True, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=UPLOAD_ROOT), name="uploads")

api = "/api/v1"
app.include_router(auth.router, prefix=api)
app.include_router(profiles.router, prefix=api)
app.include_router(items.router, prefix=api)
app.include_router(link_preview.router, prefix=api)
app.include_router(saves.router, prefix=api)
app.include_router(follows.router, prefix=api)
app.include_router(analytics.router, prefix=api)
app.include_router(discover.router, prefix=api)


@app.get("/health")
async def health() -> dict:
    return {"status": "ok"}
