from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.config import settings
from app.routers import analytics, auth, follows, items, link_preview, profiles, saves
from app.services.uploads import UPLOAD_ROOT

app = FastAPI(title="blueprint.id API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_origin],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_ROOT.mkdir(parents=True, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=UPLOAD_ROOT), name="uploads")

api = "/api/v1"
app.include_router(auth.router, prefix=api)
app.include_router(profiles.router, prefix=api)
app.include_router(items.router, prefix=api)
app.include_router(link_preview.router, prefix=api)
app.include_router(saves.router, prefix=api)
app.include_router(follows.router, prefix=api)
app.include_router(analytics.router, prefix=api)


@app.get("/health")
async def health() -> dict:
    return {"status": "ok"}
