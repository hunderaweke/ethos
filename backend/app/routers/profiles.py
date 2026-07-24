from html import escape

from fastapi import APIRouter, Depends, File, HTTPException, Request, UploadFile, status
from fastapi.responses import HTMLResponse
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.config import settings
from app.deps import get_current_user, get_db, get_optional_user
from app.models import AnalyticsEvent, Follow, Profile, User
from app.schemas.profile import HandleAvailability, ProfileCreate, ProfileOut, ProfileUpdate
from app.services.uploads import delete_old_upload, save_image_upload

router = APIRouter(tags=["profiles"])


@router.get("/share/{handle}", response_class=HTMLResponse, include_in_schema=False)
async def share_profile(handle: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Profile).where(Profile.handle == handle.lower()))
    profile = result.scalar_one_or_none()
    if profile is None or not profile.is_public:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Profile not found")

    title = f"{profile.display_name or profile.handle} (@{profile.handle}) · blueprint.id"
    description = profile.bio.strip() or f"Check out @{profile.handle}'s curated Mind-Shelf on blueprint.id."
    canonical = f"{settings.frontend_origin}/@{profile.handle}"

    image_tags = ""
    if profile.avatar_url:
        image_tags = (
            f'<meta property="og:image" content="{escape(profile.avatar_url)}" />'
            f'<meta name="twitter:image" content="{escape(profile.avatar_url)}" />'
        )

    html = f"""<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>{escape(title)}</title>
<meta name="description" content="{escape(description)}" />
<link rel="canonical" href="{canonical}" />
<meta property="og:type" content="profile" />
<meta property="og:site_name" content="blueprint.id" />
<meta property="og:title" content="{escape(title)}" />
<meta property="og:description" content="{escape(description)}" />
<meta property="og:url" content="{canonical}" />
{image_tags}
<meta name="twitter:card" content="{"summary_large_image" if profile.avatar_url else "summary"}" />
<meta name="twitter:title" content="{escape(title)}" />
<meta name="twitter:description" content="{escape(description)}" />
</head>
<body></body>
</html>"""
    return HTMLResponse(html)


@router.get("/handles/{handle}/availability", response_model=HandleAvailability)
async def check_handle_availability(handle: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Profile).where(Profile.handle == handle.lower()))
    taken = result.scalar_one_or_none() is not None
    return HandleAvailability(handle=handle.lower(), available=not taken)


@router.post("/profiles", response_model=ProfileOut, status_code=status.HTTP_201_CREATED)
async def create_profile(
    body: ProfileCreate,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    existing = await db.execute(select(Profile).where(Profile.user_id == user.id))
    if existing.scalar_one_or_none() is not None:
        raise HTTPException(status.HTTP_409_CONFLICT, "Profile already exists for this user")

    taken = await db.execute(select(Profile).where(Profile.handle == body.handle.lower()))
    if taken.scalar_one_or_none() is not None:
        raise HTTPException(status.HTTP_409_CONFLICT, "Handle already taken")

    profile = Profile(
        user_id=user.id,
        handle=body.handle.lower(),
        display_name=body.display_name or body.handle,
        avatar_url=user.avatar_url,
    )
    db.add(profile)
    await db.commit()
    await db.refresh(profile)
    return profile


@router.get("/profiles/me", response_model=ProfileOut)
async def get_my_profile(
    db: AsyncSession = Depends(get_db), user: User = Depends(get_current_user)
):
    result = await db.execute(select(Profile).where(Profile.user_id == user.id))
    profile = result.scalar_one_or_none()
    if profile is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "No profile yet")
    return profile


@router.patch("/profiles/me", response_model=ProfileOut)
async def update_my_profile(
    body: ProfileUpdate,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    result = await db.execute(select(Profile).where(Profile.user_id == user.id))
    profile = result.scalar_one_or_none()
    if profile is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "No profile yet")

    data = body.model_dump(exclude_unset=True)
    if "handle" in data and data["handle"] is not None:
        new_handle = data["handle"].lower()
        if new_handle != profile.handle:
            taken = await db.execute(select(Profile).where(Profile.handle == new_handle))
            if taken.scalar_one_or_none() is not None:
                raise HTTPException(status.HTTP_409_CONFLICT, "Handle already taken")
        data["handle"] = new_handle

    for field, value in data.items():
        setattr(profile, field, value)

    await db.commit()
    await db.refresh(profile)
    return profile


@router.post("/profiles/me/avatar", response_model=ProfileOut)
async def upload_my_avatar(
    request: Request,
    file: UploadFile = File(...),
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    result = await db.execute(select(Profile).where(Profile.user_id == user.id))
    profile = result.scalar_one_or_none()
    if profile is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "No profile yet")

    old_avatar_url = profile.avatar_url
    profile.avatar_url = await save_image_upload(file, "avatars", request)
    await db.commit()
    await db.refresh(profile)
    delete_old_upload(old_avatar_url)
    return profile


@router.post("/profiles/me/banner", response_model=ProfileOut)
async def upload_my_banner(
    request: Request,
    file: UploadFile = File(...),
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    result = await db.execute(select(Profile).where(Profile.user_id == user.id))
    profile = result.scalar_one_or_none()
    if profile is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "No profile yet")

    old_banner_url = profile.banner_url
    profile.banner_url = await save_image_upload(file, "banners", request)
    await db.commit()
    await db.refresh(profile)
    delete_old_upload(old_banner_url)
    return profile


@router.get("/profiles/{handle}", response_model=ProfileOut)
async def get_public_profile(
    handle: str,
    db: AsyncSession = Depends(get_db),
    user: User | None = Depends(get_optional_user),
):
    result = await db.execute(select(Profile).where(Profile.handle == handle.lower()))
    profile = result.scalar_one_or_none()
    if profile is None or not profile.is_public:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Profile not found")

    is_own_profile = user is not None and profile.user_id == user.id
    if not is_own_profile:
        profile.view_count += 1
        db.add(AnalyticsEvent(event_type="profile_view", profile_id=profile.id))
        await db.commit()
        await db.refresh(profile)

    is_following = False
    if user is not None and not is_own_profile:
        follow = await db.execute(
            select(Follow).where(
                Follow.follower_user_id == user.id, Follow.followed_profile_id == profile.id
            )
        )
        is_following = follow.scalar_one_or_none() is not None

    return ProfileOut.model_validate(profile).model_copy(
        update={"is_following": is_following, "is_own_profile": is_own_profile}
    )
