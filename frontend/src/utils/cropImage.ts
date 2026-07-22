export interface CropPixels {
  x: number;
  y: number;
  width: number;
  height: number;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export async function getCroppedImageFile(
  imageSrc: string,
  crop: CropPixels,
  outputWidth: number,
  outputHeight: number,
  fileName: string
): Promise<File> {
  const image = await loadImage(imageSrc);
  const canvas = document.createElement("canvas");
  canvas.width = outputWidth;
  canvas.height = outputHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported");

  ctx.drawImage(
    image,
    crop.x, crop.y, crop.width, crop.height,
    0, 0, outputWidth, outputHeight
  );

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/jpeg", 0.9)
  );
  if (!blob) throw new Error("Failed to encode image");

  return new File([blob], fileName, { type: "image/jpeg" });
}
