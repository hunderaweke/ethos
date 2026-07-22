import uuid
from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field, HttpUrl

ItemType = Literal["book", "youtube", "podcast", "essay", "x", "design"]
ItemSize = Literal["small", "medium", "large"]
ResourceKind = Literal["post", "video", "channel", "podcast", "playlist", "account", "newsletter"]


class ItemCreate(BaseModel):
    type: ItemType
    resource_kind: ResourceKind | None = None
    title: str
    creator_name: str | None = None
    link: HttpUrl
    description: str = ""
    impact: str = ""
    image_url: str | None = None
    tags: list[str] = []
    size: ItemSize = "medium"
    metadata: dict = {}


class ItemUpdate(BaseModel):
    type: ItemType | None = None
    resource_kind: ResourceKind | None = None
    title: str | None = None
    creator_name: str | None = None
    link: HttpUrl | None = None
    description: str | None = None
    impact: str | None = None
    image_url: str | None = None
    tags: list[str] | None = None
    size: ItemSize | None = None
    metadata: dict | None = None


class ItemOut(BaseModel):
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


class PaginatedItems(BaseModel):
    items: list[ItemOut]
    total: int
    page: int
    limit: int
    pages: int
    has_more: bool
