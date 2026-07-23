import uuid

from pydantic import BaseModel, ConfigDict, Field


class ProfileCreate(BaseModel):
    handle: str = Field(pattern=r"^[a-z0-9_]{3,30}$")
    display_name: str = ""


class ProfileUpdate(BaseModel):
    handle: str | None = Field(default=None, pattern=r"^[a-z0-9_]{3,30}$")
    display_name: str | None = None
    bio: str | None = None
    location: str | None = None
    skills: str | None = None
    avatar_url: str | None = None
    is_public: bool | None = None


class ProfileOut(BaseModel):
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
    is_public: bool
    follower_count: int
    view_count: int
    curator_score: float | None
    is_following: bool = False
    is_own_profile: bool = False


class HandleAvailability(BaseModel):
    handle: str
    available: bool
