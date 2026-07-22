import uuid
from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, Cookie, Depends, HTTPException, Response, status
from google.auth.transport import requests as google_requests
from google.oauth2 import id_token as google_id_token
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.config import settings
from app.deps import get_current_user, get_db
from app.models import Profile, Session as SessionModel, User
from app.schemas.auth import GoogleAuthRequest, MeOut, UserOut

router = APIRouter(prefix="/auth", tags=["auth"])


def _set_session_cookie(response: Response, session_id: uuid.UUID) -> None:
    response.set_cookie(
        key=settings.session_cookie_name,
        value=str(session_id),
        httponly=True,
        secure=settings.environment != "development",
        samesite="lax",
        max_age=settings.session_ttl_days * 24 * 3600,
    )


@router.post("/google", response_model=MeOut)
async def google_auth(
    body: GoogleAuthRequest, response: Response, db: AsyncSession = Depends(get_db)
) -> MeOut:
    if not settings.google_client_id:
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR, "Google auth not configured")

    try:
        claims = google_id_token.verify_oauth2_token(
            body.id_token, google_requests.Request(), settings.google_client_id
        )
    except Exception as exc:
        detail = "Invalid Google token"
        if settings.environment == "development":
            detail = f"Invalid Google token: {type(exc).__name__}: {exc}"
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, detail)

    google_sub = claims["sub"]
    email = claims["email"]
    now = datetime.now(timezone.utc)

    result = await db.execute(select(User).where(User.google_sub == google_sub))
    user = result.scalar_one_or_none()
    if user is None:
        user = User(
            google_sub=google_sub,
            email=email,
            email_verified=claims.get("email_verified", False),
            avatar_url=claims.get("picture"),
            last_login_at=now,
        )
        db.add(user)
        await db.flush()
    else:
        user.last_login_at = now

    profile: Profile | None = None
    if body.claim_handle:
        existing = await db.execute(select(Profile).where(Profile.user_id == user.id))
        profile = existing.scalar_one_or_none()
        if profile is None:
            handle_taken = await db.execute(
                select(Profile).where(Profile.handle == body.claim_handle.lower())
            )
            if handle_taken.scalar_one_or_none() is None:
                profile = Profile(
                    user_id=user.id,
                    handle=body.claim_handle.lower(),
                    display_name=email.split("@")[0],
                    avatar_url=user.avatar_url,
                )
                db.add(profile)
                await db.flush()

    if profile is None:
        existing = await db.execute(select(Profile).where(Profile.user_id == user.id))
        profile = existing.scalar_one_or_none()

    session = SessionModel(
        user_id=user.id,
        created_at=now,
        expires_at=now + timedelta(days=settings.session_ttl_days),
    )
    db.add(session)
    await db.commit()

    _set_session_cookie(response, session.id)

    return MeOut(
        user=UserOut.model_validate(user),
        profile=profile,
    )


@router.post("/logout")
async def logout(
    response: Response,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
    session_id: str | None = Cookie(default=None, alias=settings.session_cookie_name),
) -> dict:
    if session_id:
        session = await db.get(SessionModel, uuid.UUID(session_id))
        if session is not None:
            await db.delete(session)
            await db.commit()
    response.delete_cookie(settings.session_cookie_name)
    return {"ok": True}


@router.get("/me", response_model=MeOut)
async def me(
    db: AsyncSession = Depends(get_db), user: User = Depends(get_current_user)
) -> MeOut:
    result = await db.execute(select(Profile).where(Profile.user_id == user.id))
    profile = result.scalar_one_or_none()
    return MeOut(user=UserOut.model_validate(user), profile=profile)
