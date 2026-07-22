import uuid
from datetime import datetime, timezone

from fastapi import Cookie, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.config import settings
from app.db import get_db
from app.models import Session as SessionModel
from app.models import User

__all__ = ["get_db"]


async def get_current_user(
    db: AsyncSession = Depends(get_db),
    session_id: str | None = Cookie(default=None, alias=settings.session_cookie_name),
) -> User:
    if session_id is None:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Not authenticated")

    try:
        sid = uuid.UUID(session_id)
    except ValueError:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Not authenticated")

    session = await db.get(SessionModel, sid)
    if session is None or session.expires_at < datetime.now(timezone.utc):
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Session expired")

    user = await db.get(User, session.user_id)
    if user is None:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Not authenticated")
    return user


async def get_optional_user(
    db: AsyncSession = Depends(get_db),
    session_id: str | None = Cookie(default=None, alias=settings.session_cookie_name),
) -> User | None:
    if session_id is None:
        return None
    try:
        return await get_current_user(db=db, session_id=session_id)
    except HTTPException:
        return None
