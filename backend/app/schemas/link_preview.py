from pydantic import BaseModel


class LinkPreview(BaseModel):
    platform: str
    title: str | None = None
    image_url: str | None = None
    description: str | None = None
    creator_name: str | None = None
    suggested_type: str | None = None
    resource_kind: str | None = None
    follower_count: str | None = None
