import io
import uuid
from pathlib import Path

from fastapi import HTTPException, Request, UploadFile, status
from PIL import Image, ImageOps

UPLOAD_ROOT = Path(__file__).resolve().parent.parent.parent / "uploads"
MAX_UPLOAD_BYTES = 5 * 1024 * 1024
ALLOWED_CONTENT_TYPES = {"image/jpeg", "image/png", "image/webp", "image/gif"}

# Re-encoded output caps, keyed by subdir — bounds both dimensions and file
# size regardless of what the client (already-cropped) image comes in as.
MAX_DIMENSIONS = {
    "avatars": (512, 512),
    "banners": (1600, 400),
}
JPEG_QUALITY = 85


async def save_image_upload(file: UploadFile, subdir: str, request: Request) -> str:
    if (file.content_type or "") not in ALLOWED_CONTENT_TYPES:
        raise HTTPException(
            status.HTTP_400_BAD_REQUEST,
            "Unsupported image type — use JPEG, PNG, WEBP, or GIF.",
        )

    contents = await file.read(MAX_UPLOAD_BYTES + 1)
    if len(contents) > MAX_UPLOAD_BYTES:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "Image too large (max 5MB).")

    try:
        image = Image.open(io.BytesIO(contents))
        image = ImageOps.exif_transpose(image)
        if image.mode not in ("RGB", "L"):
            background = Image.new("RGB", image.size, (255, 255, 255))
            background.paste(image, mask=image.split()[-1] if "A" in image.mode else None)
            image = background

        max_w, max_h = MAX_DIMENSIONS.get(subdir, (1024, 1024))
        image.thumbnail((max_w, max_h), Image.LANCZOS)

        buffer = io.BytesIO()
        image.save(buffer, format="JPEG", quality=JPEG_QUALITY, optimize=True)
        output_bytes = buffer.getvalue()
    except Exception:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "Couldn't process that image.")

    target_dir = UPLOAD_ROOT / subdir
    target_dir.mkdir(parents=True, exist_ok=True)
    filename = f"{uuid.uuid4()}.jpg"
    (target_dir / filename).write_bytes(output_bytes)

    return f"{str(request.base_url).rstrip('/')}/uploads/{subdir}/{filename}"
