import uuid

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.deps import get_current_user, get_db
from app.models import AnalyticsEvent, CurationItem, Save, User
from app.schemas.item import ItemOut

router = APIRouter(tags=["saves"])


@router.post("/items/{item_id}/save", status_code=status.HTTP_204_NO_CONTENT)
async def save_item(
    item_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    item = await db.get(CurationItem, item_id)
    if item is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Item not found")

    existing = await db.execute(
        select(Save).where(Save.user_id == user.id, Save.item_id == item_id)
    )
    if existing.scalar_one_or_none() is not None:
        return

    db.add(Save(user_id=user.id, item_id=item_id))
    item.save_count += 1
    db.add(AnalyticsEvent(event_type="item_save", profile_id=item.profile_id, item_id=item.id))
    await db.commit()


@router.delete("/items/{item_id}/save", status_code=status.HTTP_204_NO_CONTENT)
async def unsave_item(
    item_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    result = await db.execute(
        select(Save).where(Save.user_id == user.id, Save.item_id == item_id)
    )
    save = result.scalar_one_or_none()
    if save is None:
        return

    item = await db.get(CurationItem, item_id)
    if item is not None and item.save_count > 0:
        item.save_count -= 1
    await db.delete(save)
    await db.commit()


@router.get("/users/me/saves", response_model=list[ItemOut])
async def list_my_saves(
    db: AsyncSession = Depends(get_db), user: User = Depends(get_current_user)
):
    stmt = (
        select(CurationItem)
        .join(Save, Save.item_id == CurationItem.id)
        .where(Save.user_id == user.id)
        .order_by(Save.created_at.desc())
    )
    return (await db.execute(stmt)).scalars().all()
