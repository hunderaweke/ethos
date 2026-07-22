import uuid

from pydantic import BaseModel, ConfigDict

from app.schemas.profile import ProfileOut


class GoogleAuthRequest(BaseModel):
    id_token: str
    claim_handle: str | None = None


class UserOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    email: str
    avatar_url: str | None


class MeOut(BaseModel):
    user: UserOut
    profile: ProfileOut | None
