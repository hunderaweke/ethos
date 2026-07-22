import uuid

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.deps import get_current_user, get_db
from app.models import AnalyticsEvent, CurationItem, Profile, User
from app.schemas.item import ItemCreate, ItemOut, ItemUpdate

router = APIRouter(tags=["items"])


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


@router.get("/profiles/{handle}/items", response_model=list[ItemOut])
async def list_public_items(
    handle: str,
    type: str | None = None,
    kind: str | None = None,
    tag: str | None = None,
    q: str | None = None,
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(Profile).where(Profile.handle == handle.lower()))
    profile = result.scalar_one_or_none()
    if profile is None or not profile.is_public:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Profile not found")

    stmt = select(CurationItem).where(CurationItem.profile_id == profile.id)
    stmt = _apply_filters(stmt, type, kind, tag, q).order_by(CurationItem.created_at.desc())
    items = (await db.execute(stmt)).scalars().all()
    return items


@router.get("/items/me", response_model=list[ItemOut])
async def list_my_items(
    type: str | None = None,
    kind: str | None = None,
    tag: str | None = None,
    q: str | None = None,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    profile = await _get_own_profile(db, user)
    stmt = select(CurationItem).where(CurationItem.profile_id == profile.id)
    stmt = _apply_filters(stmt, type, kind, tag, q).order_by(CurationItem.created_at.desc())
    items = (await db.execute(stmt)).scalars().all()
    return items


@router.post("/items", response_model=ItemOut, status_code=status.HTTP_201_CREATED)
async def create_item(
    body: ItemCreate,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    profile = await _get_own_profile(db, user)
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
    )
    db.add(item)
    await db.commit()
    await db.refresh(item)
    return item


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
