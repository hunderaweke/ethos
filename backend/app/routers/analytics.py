from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.deps import get_current_user, get_db
from app.models import CurationItem, Profile, User

router = APIRouter(prefix="/analytics/me", tags=["analytics"])


async def _get_own_profile(db: AsyncSession, user: User) -> Profile:
    result = await db.execute(select(Profile).where(Profile.user_id == user.id))
    profile = result.scalar_one_or_none()
    if profile is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "No profile yet")
    return profile


@router.get("/summary")
async def summary(
    db: AsyncSession = Depends(get_db), user: User = Depends(get_current_user)
) -> dict:
    profile = await _get_own_profile(db, user)

    totals = await db.execute(
        select(func.count(), func.coalesce(func.sum(CurationItem.save_count), 0)).where(
            CurationItem.profile_id == profile.id
        )
    )
    active_items, community_saves = totals.one()

    return {
        "total_shelf_views": profile.view_count,
        "community_saves": int(community_saves),
        "curator_score": profile.curator_score,
        "active_items": active_items,
    }


@router.get("/category-breakdown")
async def category_breakdown(
    db: AsyncSession = Depends(get_db), user: User = Depends(get_current_user)
) -> list[dict]:
    profile = await _get_own_profile(db, user)

    rows = await db.execute(
        select(
            CurationItem.type,
            func.count(),
            func.coalesce(func.sum(CurationItem.view_count), 0),
        )
        .where(CurationItem.profile_id == profile.id)
        .group_by(CurationItem.type)
    )
    breakdown = rows.all()
    total_items = sum(row[1] for row in breakdown) or 1

    return [
        {
            "type": item_type,
            "item_count": count,
            "view_count": int(views),
            "share_pct": round(count / total_items * 100, 1),
        }
        for item_type, count, views in breakdown
    ]


@router.get("/leaderboard")
async def leaderboard(
    limit: int = 10,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
) -> list[dict]:
    profile = await _get_own_profile(db, user)

    rows = await db.execute(
        select(CurationItem)
        .where(CurationItem.profile_id == profile.id)
        .order_by(CurationItem.save_count.desc(), CurationItem.view_count.desc())
        .limit(limit)
    )
    items = rows.scalars().all()
    return [
        {
            "id": item.id,
            "title": item.title,
            "save_count": item.save_count,
            "view_count": item.view_count,
        }
        for item in items
    ]
