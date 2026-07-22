from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.deps import get_current_user, get_db
from app.models import Follow, Profile, User

router = APIRouter(tags=["follows"])


async def _get_profile_by_handle(db: AsyncSession, handle: str) -> Profile:
    result = await db.execute(select(Profile).where(Profile.handle == handle.lower()))
    profile = result.scalar_one_or_none()
    if profile is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Profile not found")
    return profile


@router.post("/profiles/{handle}/follow", status_code=status.HTTP_204_NO_CONTENT)
async def follow_profile(
    handle: str,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    profile = await _get_profile_by_handle(db, handle)
    if profile.user_id == user.id:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "Cannot follow your own shelf")

    existing = await db.execute(
        select(Follow).where(
            Follow.follower_user_id == user.id, Follow.followed_profile_id == profile.id
        )
    )
    if existing.scalar_one_or_none() is not None:
        return

    db.add(Follow(follower_user_id=user.id, followed_profile_id=profile.id))
    profile.follower_count += 1
    await db.commit()


@router.delete("/profiles/{handle}/follow", status_code=status.HTTP_204_NO_CONTENT)
async def unfollow_profile(
    handle: str,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    profile = await _get_profile_by_handle(db, handle)
    result = await db.execute(
        select(Follow).where(
            Follow.follower_user_id == user.id, Follow.followed_profile_id == profile.id
        )
    )
    follow = result.scalar_one_or_none()
    if follow is None:
        return

    await db.delete(follow)
    if profile.follower_count > 0:
        profile.follower_count -= 1
    await db.commit()


@router.get("/profiles/me/followers")
async def my_follower_count(
    db: AsyncSession = Depends(get_db), user: User = Depends(get_current_user)
) -> dict:
    result = await db.execute(select(Profile).where(Profile.user_id == user.id))
    profile = result.scalar_one_or_none()
    if profile is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "No profile yet")

    count = await db.execute(
        select(func.count()).select_from(Follow).where(Follow.followed_profile_id == profile.id)
    )
    return {"follower_count": count.scalar_one()}
