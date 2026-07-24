import math

from fastapi import APIRouter, Depends, Query
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.deps import get_db, get_optional_user
from app.models import CurationItem, Follow, Profile, User
from app.schemas.discover import (
    DiscoverItemOut,
    DiscoverProfileOut,
    PaginatedDiscoverItems,
    PaginatedDiscoverProfiles,
)

router = APIRouter(tags=["discover"])


@router.get("/discover/profiles", response_model=PaginatedDiscoverProfiles)
async def discover_profiles(
    q: str | None = None,
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
    user: User | None = Depends(get_optional_user),
):
    stmt = select(Profile).where(Profile.is_public.is_(True))
    if q:
        like = f"%{q.lower()}%"
        stmt = stmt.where((Profile.handle.ilike(like)) | (Profile.display_name.ilike(like)))

    count_stmt = select(func.count()).select_from(stmt.subquery())
    total = (await db.execute(count_stmt)).scalar_one()
    pages = max(1, math.ceil(total / limit)) if total > 0 else 1
    page = min(max(1, page), pages) if total > 0 else 1

    ordered = (
        stmt.order_by(Profile.follower_count.desc(), Profile.view_count.desc(), Profile.id.desc())
        .offset((page - 1) * limit)
        .limit(limit)
    )
    profiles = (await db.execute(ordered)).scalars().all()

    following_ids: set = set()
    if user is not None and profiles:
        rows = await db.execute(
            select(Follow.followed_profile_id).where(
                Follow.follower_user_id == user.id,
                Follow.followed_profile_id.in_([p.id for p in profiles]),
            )
        )
        following_ids = {row for (row,) in rows.all()}

    items_out = [
        DiscoverProfileOut.model_validate(p).model_copy(
            update={"is_following": p.id in following_ids}
        )
        for p in profiles
    ]
    return PaginatedDiscoverProfiles(
        items=items_out, total=total, page=page, limit=limit, pages=pages, has_more=page < pages
    )


@router.get("/discover/items", response_model=PaginatedDiscoverItems)
async def discover_items(
    type: str | None = None,
    tag: str | None = None,
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
):
    stmt = (
        select(CurationItem, Profile)
        .join(Profile, CurationItem.profile_id == Profile.id)
        .where(Profile.is_public.is_(True))
    )
    if type and type != "all":
        stmt = stmt.where(CurationItem.type == type)
    if tag and tag != "all":
        stmt = stmt.where(CurationItem.tags.any(tag))

    count_stmt = select(func.count()).select_from(stmt.subquery())
    total = (await db.execute(count_stmt)).scalar_one()
    pages = max(1, math.ceil(total / limit)) if total > 0 else 1
    page = min(max(1, page), pages) if total > 0 else 1

    ordered = (
        stmt.order_by(
            CurationItem.save_count.desc(),
            CurationItem.view_count.desc(),
            CurationItem.created_at.desc(),
        )
        .offset((page - 1) * limit)
        .limit(limit)
    )
    rows = (await db.execute(ordered)).all()

    items_out = [
        DiscoverItemOut.model_validate(
            {
                "id": item.id,
                "profile_id": item.profile_id,
                "type": item.type,
                "resource_kind": item.resource_kind,
                "title": item.title,
                "creator_name": item.creator_name,
                "link": item.link,
                "description": item.description,
                "impact": item.impact,
                "image_url": item.image_url,
                "tags": item.tags,
                "size": item.size,
                "metadata": item.item_metadata,
                "is_pinned": item.is_pinned,
                "view_count": item.view_count,
                "save_count": item.save_count,
                "click_count": item.click_count,
                "created_at": item.created_at,
                "updated_at": item.updated_at,
                "profile_handle": profile.handle,
                "profile_display_name": profile.display_name,
                "profile_avatar_url": profile.avatar_url,
            }
        )
        for item, profile in rows
    ]
    return PaginatedDiscoverItems(
        items=items_out, total=total, page=page, limit=limit, pages=pages, has_more=page < pages
    )
