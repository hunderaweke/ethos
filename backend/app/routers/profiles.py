from fastapi import APIRouter, Depends, File, HTTPException, Request, UploadFile, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.deps import get_current_user, get_db
from app.models import AnalyticsEvent, Profile, User
from app.schemas.profile import HandleAvailability, ProfileCreate, ProfileOut, ProfileUpdate
from app.services.uploads import save_image_upload

router = APIRouter(tags=["profiles"])


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

    profile.avatar_url = await save_image_upload(file, "avatars", request)
    await db.commit()
    await db.refresh(profile)
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

    profile.banner_url = await save_image_upload(file, "banners", request)
    await db.commit()
    await db.refresh(profile)
    return profile


@router.get("/profiles/{handle}", response_model=ProfileOut)
async def get_public_profile(handle: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Profile).where(Profile.handle == handle.lower()))
    profile = result.scalar_one_or_none()
    if profile is None or not profile.is_public:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Profile not found")

    profile.view_count += 1
    db.add(AnalyticsEvent(event_type="profile_view", profile_id=profile.id))
    await db.commit()
    await db.refresh(profile)
    return profile
