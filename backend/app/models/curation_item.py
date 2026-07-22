import uuid

from sqlalchemy import ForeignKey, String
from sqlalchemy import Enum as SAEnum
from sqlalchemy.dialects.postgresql import ARRAY, JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.db import Base
from app.models.base import TimestampMixin, UUIDPkMixin

ITEM_TYPES = ("book", "youtube", "podcast", "essay", "x", "design")
ITEM_SIZES = ("small", "medium", "large")
RESOURCE_KINDS = ("post", "video", "channel", "podcast", "playlist", "account", "newsletter")


class CurationItem(UUIDPkMixin, TimestampMixin, Base):
    __tablename__ = "curation_items"

    profile_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("profiles.id"), nullable=False, index=True
    )
    type: Mapped[str] = mapped_column(SAEnum(*ITEM_TYPES, name="item_type"), nullable=False)
    resource_kind: Mapped[str | None] = mapped_column(SAEnum(*RESOURCE_KINDS, name="resource_kind"))
    title: Mapped[str] = mapped_column(nullable=False)
    creator_name: Mapped[str | None]
    link: Mapped[str] = mapped_column(nullable=False)
    description: Mapped[str] = mapped_column(default="")
    impact: Mapped[str] = mapped_column(default="")
    image_url: Mapped[str | None]
    tags: Mapped[list[str]] = mapped_column(ARRAY(String), default=list)
    size: Mapped[str] = mapped_column(SAEnum(*ITEM_SIZES, name="item_size"), default="medium")
    item_metadata: Mapped[dict] = mapped_column("metadata", JSONB, default=dict)
    is_pinned: Mapped[bool] = mapped_column(default=False)
    view_count: Mapped[int] = mapped_column(default=0)
    save_count: Mapped[int] = mapped_column(default=0)
    click_count: Mapped[int] = mapped_column(default=0)
