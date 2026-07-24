import uuid
from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field

from app.schemas.item import ItemSize, ItemType, ResourceKind


class DiscoverProfileOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    handle: str
    display_name: str
    bio: str
    location: str
    skills: str
    avatar_url: str | None
    banner_url: str | None
    is_verified: bool
    follower_count: int
    view_count: int
    curator_score: float | None
    is_following: bool = False


class PaginatedDiscoverProfiles(BaseModel):
    items: list[DiscoverProfileOut]
    total: int
    page: int
    limit: int
    pages: int
    has_more: bool


class DiscoverItemOut(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    id: uuid.UUID
    profile_id: uuid.UUID
    type: ItemType
    resource_kind: ResourceKind | None
    title: str
    creator_name: str | None
    link: str
    description: str
    impact: str
    image_url: str | None
    tags: list[str]
    size: ItemSize
    metadata: dict = Field(validation_alias="item_metadata", serialization_alias="metadata")
    is_pinned: bool
    view_count: int
    save_count: int
    click_count: int
    created_at: datetime
    updated_at: datetime
    profile_handle: str
    profile_display_name: str
    profile_avatar_url: str | None


class PaginatedDiscoverItems(BaseModel):
    items: list[DiscoverItemOut]
    total: int
    page: int
    limit: int
    pages: int
    has_more: bool
