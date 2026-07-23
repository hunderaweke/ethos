from fastapi import APIRouter, Depends, HTTPException, Request, status
from pydantic import HttpUrl, TypeAdapter, ValidationError
from sqlalchemy.ext.asyncio import AsyncSession

from app.deps import get_db
from app.schemas.link_preview import LinkPreview
from app.services.link_preview import resolve_link_preview

router = APIRouter(tags=["link-preview"])

_url_adapter = TypeAdapter(HttpUrl)


@router.get("/link-preview", response_model=LinkPreview)
async def get_link_preview(
    url: str, request: Request, db: AsyncSession = Depends(get_db)
) -> LinkPreview:
    try:
        _url_adapter.validate_python(url)
    except ValidationError:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "Invalid URL")

    return await resolve_link_preview(db, url, base_url=str(request.base_url))
