"""Central place for turning exceptions into clean, structured JSON
responses instead of letting them surface as raw tracebacks.

Every handler here returns the same envelope shape the frontend already
expects from HTTPException (`{"detail": "..."}`, see api.ts's apiFetch),
so existing error handling on the client keeps working unchanged — these
handlers just catch the exceptions that used to fall through uncaught.
"""

import logging

from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse
from sqlalchemy.exc import SQLAlchemyError

from app.db import DatabaseUnavailableError

logger = logging.getLogger("app.errors")


async def database_unavailable_handler(request: Request, exc: DatabaseUnavailableError) -> JSONResponse:
    # The DB couldn't be reached at all (wrong host, DNS failure, connection
    # refused/timed out) — the request itself was fine, so 503, not 500.
    logger.error(
        "Database unreachable on %s %s: %s", request.method, request.url.path,
        exc.__cause__.__class__.__name__ if exc.__cause__ else exc,
        exc_info=exc,
    )
    return JSONResponse(
        status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
        content={"detail": "Database is temporarily unavailable. Please try again shortly."},
    )


async def sqlalchemy_error_handler(request: Request, exc: SQLAlchemyError) -> JSONResponse:
    # A query reached the database but failed there (bad SQL, constraint
    # violation, etc.) — a real application/data error, so 500.
    logger.error(
        "Database query error on %s %s: %s", request.method, request.url.path, exc.__class__.__name__,
        exc_info=exc,
    )
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"detail": "A database error occurred. Please try again."},
    )


async def unhandled_error_handler(request: Request, exc: Exception) -> JSONResponse:
    logger.error(
        "Unhandled error on %s %s: %s", request.method, request.url.path, exc.__class__.__name__,
        exc_info=exc,
    )
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"detail": "Something went wrong. Please try again."},
    )


def register_error_handlers(app: FastAPI) -> None:
    app.add_exception_handler(DatabaseUnavailableError, database_unavailable_handler)
    app.add_exception_handler(SQLAlchemyError, sqlalchemy_error_handler)
    # Registered last so it only catches what nothing more specific claimed —
    # FastAPI/Starlette match exception handlers by the most specific type.
    app.add_exception_handler(Exception, unhandled_error_handler)
