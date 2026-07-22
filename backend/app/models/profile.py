import uuid

from sqlalchemy import CheckConstraint, ForeignKey
from sqlalchemy.dialects.postgresql import CITEXT, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db import Base
from app.models.base import TimestampMixin, UUIDPkMixin


class Profile(UUIDPkMixin, TimestampMixin, Base):
    __tablename__ = "profiles"
    __table_args__ = (
        CheckConstraint("handle ~ '^[a-z0-9_]{3,30}$'", name="handle_format"),
    )

    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id"), unique=True, nullable=False
    )
    handle: Mapped[str] = mapped_column(CITEXT, unique=True, nullable=False, index=True)
    display_name: Mapped[str] = mapped_column(default="")
    bio: Mapped[str] = mapped_column(default="")
    location: Mapped[str] = mapped_column(default="")
    skills: Mapped[str] = mapped_column(default="")
    avatar_url: Mapped[str | None]
    banner_url: Mapped[str | None]
    is_verified: Mapped[bool] = mapped_column(default=False)
    is_public: Mapped[bool] = mapped_column(default=True)
    follower_count: Mapped[int] = mapped_column(default=0)
    view_count: Mapped[int] = mapped_column(default=0)
    curator_score: Mapped[float | None]

    user: Mapped["User"] = relationship(back_populates="profile")  # noqa: F821
