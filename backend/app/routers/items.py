import math
import uuid

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import func, select, update
from sqlalchemy.ext.asyncio import AsyncSession

from app.deps import get_current_user, get_db
from app.models import AnalyticsEvent, CurationItem, Profile, User
from app.schemas.item import ItemCreate, ItemOut, ItemUpdate, PaginatedItems, ReorderItems

router = APIRouter(tags=["items"])

SORT_OPTIONS = {
    "custom": (CurationItem.sort_order.asc(),),
    "newest": (CurationItem.created_at.desc(),),
    "oldest": (CurationItem.created_at.asc(),),
    "title": (CurationItem.title.asc(),),
    "featured": (CurationItem.is_pinned.desc(), CurationItem.sort_order.asc()),
    "most_viewed": (CurationItem.view_count.desc(),),
    "most_saved": (CurationItem.save_count.desc(),),
}


async def _get_own_profile(db: AsyncSession, user: User) -> Profile:
    result = await db.execute(select(Profile).where(Profile.user_id == user.id))
    profile = result.scalar_one_or_none()
    if profile is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "No profile yet")
    return profile


def _apply_filters(
    stmt, item_type: str | None, kind: str | None, tag: str | None, q: str | None
):
    if item_type and item_type != "all":
        stmt = stmt.where(CurationItem.type == item_type)
    if kind and kind != "all":
        stmt = stmt.where(CurationItem.resource_kind == kind)
    if tag and tag != "all":
        stmt = stmt.where(CurationItem.tags.any(tag))
    if q:
        like = f"%{q.lower()}%"
        stmt = stmt.where(
            (CurationItem.title.ilike(like)) | (CurationItem.description.ilike(like))
        )
    return stmt


async def _paginate_stmt(
    stmt, page: int, limit: int, db: AsyncSession, order_by=(CurationItem.sort_order.asc(),)
) -> PaginatedItems:
    count_stmt = select(func.count()).select_from(stmt.subquery())
    total = (await db.execute(count_stmt)).scalar_one()

    pages = max(1, math.ceil(total / limit)) if total > 0 else 1
    page = min(max(1, page), pages) if total > 0 else 1

    paginated_stmt = stmt.order_by(*order_by).offset((page - 1) * limit).limit(limit)
    items = (await db.execute(paginated_stmt)).scalars().all()

    return PaginatedItems(
        items=[ItemOut.model_validate(item) for item in items],
        total=total,
        page=page,
        limit=limit,
        pages=pages,
        has_more=page < pages,
    )


@router.get("/profiles/{handle}/items", response_model=PaginatedItems)
async def list_public_items(
    handle: str,
    type: str | None = None,
    kind: str | None = None,
    tag: str | None = None,
    q: str | None = None,
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(Profile).where(Profile.handle == handle.lower()))
    profile = result.scalar_one_or_none()
    if profile is None or not profile.is_public:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Profile not found")

    stmt = select(CurationItem).where(CurationItem.profile_id == profile.id)
    stmt = _apply_filters(stmt, type, kind, tag, q)
    return await _paginate_stmt(stmt, page, limit, db)


@router.get("/items/me", response_model=PaginatedItems)
async def list_my_items(
    type: str | None = None,
    kind: str | None = None,
    tag: str | None = None,
    q: str | None = None,
    sort: str = "custom",
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    profile = await _get_own_profile(db, user)
    stmt = select(CurationItem).where(CurationItem.profile_id == profile.id)
    stmt = _apply_filters(stmt, type, kind, tag, q)
    order_by = SORT_OPTIONS.get(sort, SORT_OPTIONS["custom"])
    return await _paginate_stmt(stmt, page, limit, db, order_by=order_by)


@router.post("/items", response_model=ItemOut, status_code=status.HTTP_201_CREATED)
async def create_item(
    body: ItemCreate,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    profile = await _get_own_profile(db, user)
    max_order = (
        await db.execute(
            select(func.max(CurationItem.sort_order)).where(CurationItem.profile_id == profile.id)
        )
    ).scalar_one()
    item = CurationItem(
        profile_id=profile.id,
        type=body.type,
        resource_kind=body.resource_kind,
        title=body.title,
        creator_name=body.creator_name,
        link=str(body.link),
        description=body.description,
        impact=body.impact,
        image_url=body.image_url,
        tags=body.tags,
        size=body.size,
        item_metadata=body.metadata,
        sort_order=(max_order + 1) if max_order is not None else 0,
    )
    db.add(item)
    await db.commit()
    await db.refresh(item)
    return item


@router.patch("/items/reorder", status_code=status.HTTP_204_NO_CONTENT)
async def reorder_items(
    body: ReorderItems,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    profile = await _get_own_profile(db, user)
    existing_ids = set(
        (
            await db.execute(
                select(CurationItem.id).where(CurationItem.profile_id == profile.id)
            )
        )
        .scalars()
        .all()
    )
    given_ids = body.item_ids
    if set(given_ids) != existing_ids or len(given_ids) != len(existing_ids):
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "item_ids must match all of your shelf items exactly")

    for index, item_id in enumerate(given_ids):
        await db.execute(
            update(CurationItem).where(CurationItem.id == item_id).values(sort_order=index)
        )
    await db.commit()


async def _get_own_item(db: AsyncSession, user: User, item_id: uuid.UUID) -> CurationItem:
    profile = await _get_own_profile(db, user)
    item = await db.get(CurationItem, item_id)
    if item is None or item.profile_id != profile.id:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Item not found")
    return item


@router.patch("/items/{item_id}", response_model=ItemOut)
async def update_item(
    item_id: uuid.UUID,
    body: ItemUpdate,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    item = await _get_own_item(db, user, item_id)
    data = body.model_dump(exclude_unset=True)
    if "link" in data and data["link"] is not None:
        data["link"] = str(data["link"])
    if "metadata" in data:
        data["item_metadata"] = data.pop("metadata")
    for field, value in data.items():
        setattr(item, field, value)
    await db.commit()
    await db.refresh(item)
    return item


@router.delete("/items/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_item(
    item_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    item = await _get_own_item(db, user, item_id)
    await db.delete(item)
    await db.commit()


@router.patch("/items/{item_id}/pin", response_model=ItemOut)
async def toggle_pin(
    item_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    item = await _get_own_item(db, user, item_id)
    item.is_pinned = not item.is_pinned
    await db.commit()
    await db.refresh(item)
    return item


@router.post("/items/{item_id}/click", status_code=status.HTTP_204_NO_CONTENT)
async def record_click(item_id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    item = await db.get(CurationItem, item_id)
    if item is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Item not found")
    item.click_count += 1
    db.add(AnalyticsEvent(event_type="item_click", profile_id=item.profile_id, item_id=item.id))
    await db.commit()
