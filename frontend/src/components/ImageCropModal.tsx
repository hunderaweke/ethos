import { useState, useCallback, useEffect } from "react";
import Cropper from "react-easy-crop";
import type { Area } from "react-easy-crop";
import { Check, X, WarningCircle, MagnifyingGlassPlus, MagnifyingGlassMinus } from "@phosphor-icons/react";
import { getCroppedImageFile, type CropPixels } from "../utils/cropImage";

interface ImageCropModalProps {
  title: string;
  imageSrc: string;
  aspect: number;
  outputWidth: number;
  outputHeight: number;
  fileName: string;
  onCancel: () => void;
  onConfirm: (file: File) => void;
}

export default function ImageCropModal({
  title,
  imageSrc,
  aspect,
  outputWidth,
  outputHeight,
  fileName,
  onCancel,
  onConfirm,
}: ImageCropModalProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onCancel]);

  const onCropComplete = useCallback((_area: Area, areaPixels: Area) => {
    setCroppedAreaPixels(areaPixels);
  }, []);

  const handleConfirm = async () => {
    if (!croppedAreaPixels) return;
    setProcessing(true);
    setError(null);
    try {
      const crop: CropPixels = croppedAreaPixels;
      const file = await getCroppedImageFile(imageSrc, crop, outputWidth, outputHeight, fileName);
      onConfirm(file);
    } catch {
      setError("Couldn't process that image — try a different file.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white border border-zinc-200/90 w-full max-w-lg rounded-sm shadow-2xl overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-zinc-200 flex items-center justify-between bg-zinc-50">
          <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-zinc-900">{title}</h3>
          <button
            type="button"
            onClick={onCancel}
            className="text-zinc-400 hover:text-black hover:bg-zinc-200/60 p-2 rounded-sm cursor-pointer transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center"
            title="Close cropper"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="relative w-full bg-zinc-900" style={{ height: 320 }}>
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>

        <div className="p-4 flex items-center gap-3">
          <MagnifyingGlassMinus className="h-5 w-5 text-zinc-400 shrink-0" />
          <input
            type="range"
            min={1}
            max={3}
            step={0.05}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-full accent-black cursor-pointer h-2 bg-zinc-200 rounded-sm"
          />
          <MagnifyingGlassPlus className="h-5 w-5 text-zinc-400 shrink-0" />
        </div>

        {error && (
          <div className="mx-5 mb-3 flex items-center gap-1.5 text-[11px] font-bold text-rose-600">
            <WarningCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="px-5 pb-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2.5 text-xs font-bold text-zinc-600 hover:text-black cursor-pointer min-h-[40px]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={processing || !croppedAreaPixels}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold bg-black text-white hover:bg-zinc-800 rounded-sm transition-all cursor-pointer shadow-xs disabled:opacity-50 min-h-[40px] active:scale-95"
          >
            <Check className="h-4 w-4" />
            {processing ? "Saving..." : "Apply Crop"}
          </button>
        </div>
      </div>
    </div>
  );
}
