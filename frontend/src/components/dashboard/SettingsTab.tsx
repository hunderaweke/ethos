import { useEffect, useState } from "react";
import { User, Copy, Check, X, PencilSimple, Camera, Image as ImageIcon } from "@phosphor-icons/react";
import type { HandleSettings } from "../../types";
import { useHandleAvailability } from "../../utils/useHandleAvailability";
import HandleAvailabilityBadge, { handleStatusInputClass } from "../HandleAvailabilityBadge";
import ImageCropModal from "../ImageCropModal";
import { useToast } from "../ToastContext";

interface SettingsTabProps {
  handleSettings: HandleSettings;
  onSave: (draft: HandleSettings, avatarFile: File | null, bannerFile: File | null) => Promise<void>;
  onShare: () => void;
  copied: boolean;
  originalHandle: string;
}

type CropTarget = "avatar" | "banner" | null;

export default function SettingsTab({
  handleSettings,
  onSave,
  onShare,
  copied,
  originalHandle,
}: SettingsTabProps) {
  const { showToast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<HandleSettings>(handleSettings);
  const [saving, setSaving] = useState(false);
  const [cropTarget, setCropTarget] = useState<CropTarget>(null);
  const [cropImageSrc, setCropImageSrc] = useState<string | null>(null);
  const [pendingAvatarFile, setPendingAvatarFile] = useState<File | null>(null);
  const [pendingAvatarPreview, setPendingAvatarPreview] = useState<string | null>(null);
  const [pendingBannerFile, setPendingBannerFile] = useState<File | null>(null);
  const [pendingBannerPreview, setPendingBannerPreview] = useState<string | null>(null);
  const availability = useHandleAvailability(draft.handle, originalHandle);

  useEffect(() => {
    if (!isEditing) setDraft(handleSettings);
  }, [handleSettings, isEditing]);

  const canSave = availability !== "taken" && availability !== "invalid" && availability !== "checking";

  const clearPendingImages = () => {
    if (pendingAvatarPreview) URL.revokeObjectURL(pendingAvatarPreview);
    if (pendingBannerPreview) URL.revokeObjectURL(pendingBannerPreview);
    setPendingAvatarFile(null);
    setPendingAvatarPreview(null);
    setPendingBannerFile(null);
    setPendingBannerPreview(null);
  };

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    setDraft(handleSettings);
    clearPendingImages();
    setIsEditing(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave(draft, pendingAvatarFile, pendingBannerFile);
      showToast("Profile settings updated successfully!", "success");
      clearPendingImages();
      setIsEditing(false);
    } catch {
      showToast("Failed to save settings. Please try again.", "error");
    } finally {
      setSaving(false);
    }
  };

  const openCropper = (e: React.ChangeEvent<HTMLInputElement>, target: CropTarget) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setCropImageSrc(URL.createObjectURL(file));
    setCropTarget(target);
  };

  const closeCropper = () => {
    if (cropImageSrc) URL.revokeObjectURL(cropImageSrc);
    setCropImageSrc(null);
    setCropTarget(null);
  };

  const handleCropConfirm = (file: File) => {
    const target = cropTarget;
    const previewUrl = URL.createObjectURL(file);
    closeCropper();
    if (target === "avatar") {
      if (pendingAvatarPreview) URL.revokeObjectURL(pendingAvatarPreview);
      setPendingAvatarFile(file);
      setPendingAvatarPreview(previewUrl);
    } else if (target === "banner") {
      if (pendingBannerPreview) URL.revokeObjectURL(pendingBannerPreview);
      setPendingBannerFile(file);
      setPendingBannerPreview(previewUrl);
    }
  };

  const displayedAvatar = pendingAvatarPreview || handleSettings.avatarUrl;
  const displayedBanner = pendingBannerPreview || handleSettings.bannerUrl;

  return (
    <div className="bg-white border border-zinc-200/90 p-6 sm:p-8 lg:p-10 rounded-sm shadow-xs max-w-3xl space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base sm:text-lg font-black text-zinc-950 flex items-center gap-2">
            <User className="h-5 w-5 text-black" />
            Handle & Profile Settings
          </h3>
          <p className="text-xs text-zinc-500 font-medium mt-1">
            Customize your public handle, bio statement, and verification status.
          </p>
        </div>
        {!isEditing && (
          <button
            type="button"
            onClick={handleEdit}
            className="shrink-0 inline-flex items-center gap-1.5 text-xs font-bold text-zinc-700 bg-zinc-100 hover:bg-zinc-200 border border-zinc-200/80 px-4 py-2 rounded-sm transition-all cursor-pointer min-h-[40px]"
          >
            <PencilSimple className="h-4 w-4" />
            Edit
          </button>
        )}
      </div>

      <div>
        <label className="block text-xs font-bold text-zinc-700 mb-2">Banner & Profile Picture</label>
        <div className="relative">
          <div className="relative h-32 sm:h-40 bg-zinc-100 border border-zinc-200/80 rounded-sm overflow-hidden">
            {displayedBanner && (
              <img src={displayedBanner} alt="Banner" referrerPolicy="no-referrer" className="absolute inset-0 w-full h-full object-cover" />
            )}
            {isEditing && (
              <label className="absolute top-3 right-3 inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-md border border-zinc-200/80 px-3 py-1.5 rounded-sm text-xs font-bold text-zinc-800 cursor-pointer hover:bg-white transition-colors shadow-xs">
                <ImageIcon className="h-4 w-4" />
                {pendingBannerPreview ? "Change Banner (pending save)" : "Change Banner"}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  className="hidden"
                  onChange={(e) => openCropper(e, "banner")}
                />
              </label>
            )}
          </div>

          <div className="absolute -bottom-8 left-4">
            <div className="relative h-20 w-20 rounded-sm border-2 border-white bg-zinc-50 shadow-md overflow-hidden">
              {displayedAvatar && (
                <img src={displayedAvatar} alt="Avatar" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              )}
              {isEditing && (
                <label className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/40 transition-colors cursor-pointer group">
                  <Camera className="h-5 w-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    className="hidden"
                    onChange={(e) => openCropper(e, "avatar")}
                  />
                </label>
              )}
            </div>
          </div>
        </div>
        <div className="h-9" />
        {(pendingAvatarPreview || pendingBannerPreview) && (
          <p className="text-[10px] font-bold text-amber-600 mt-1">Unsaved image — click Save Profile Settings below to apply it.</p>
        )}
      </div>

      {cropTarget && cropImageSrc && (
        <ImageCropModal
          title={cropTarget === "avatar" ? "Crop Profile Picture" : "Crop Banner"}
          imageSrc={cropImageSrc}
          aspect={cropTarget === "avatar" ? 1 : 4}
          outputWidth={cropTarget === "avatar" ? 512 : 1600}
          outputHeight={cropTarget === "avatar" ? 512 : 400}
          fileName={cropTarget === "avatar" ? "avatar.jpg" : "banner.jpg"}
          onCancel={closeCropper}
          onConfirm={handleCropConfirm}
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-zinc-700 mb-1">Display Name</label>
            {isEditing ? (
              <input
                type="text"
                value={draft.displayName}
                onChange={(e) => setDraft({ ...draft, displayName: e.target.value })}
                className="w-full bg-zinc-50 border border-zinc-200 focus:border-black rounded-sm px-3.5 py-2.5 text-xs font-semibold text-zinc-900 outline-none"
              />
            ) : (
              <p className="px-3.5 py-2 text-xs font-semibold text-zinc-900">{handleSettings.displayName || "—"}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 mb-1">Public Handle</label>
            {isEditing ? (
              <>
                <div className="flex">
                  <span className="bg-zinc-100 border border-r-0 border-zinc-200 rounded-l-sm px-3.5 py-2.5 text-xs font-bold text-zinc-500">
                    blueprint.id/
                  </span>
                  <input
                    type="text"
                    value={draft.handle}
                    onChange={(e) => setDraft({ ...draft, handle: e.target.value })}
                    className={`w-full bg-zinc-50 border rounded-r-sm px-3.5 py-2.5 text-xs font-bold text-zinc-900 outline-none transition-colors ${handleStatusInputClass(availability)}`}
                  />
                </div>
                <div className="mt-1.5">
                  <HandleAvailabilityBadge status={availability} />
                </div>
              </>
            ) : (
              <p className="px-3.5 py-2 text-xs font-bold text-zinc-900">blueprint.id/{handleSettings.handle}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-zinc-700 mb-1">Bio / Thesis Statement</label>
          {isEditing ? (
            <textarea
              rows={3}
              value={draft.bio}
              onChange={(e) => setDraft({ ...draft, bio: e.target.value })}
              className="w-full bg-zinc-50 border border-zinc-200 focus:border-black rounded-sm p-3.5 text-xs font-medium text-zinc-900 outline-none"
            />
          ) : (
            <p className="px-3.5 py-2 text-xs font-medium text-zinc-700 whitespace-pre-wrap">{handleSettings.bio || "—"}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-zinc-700 mb-1">Location</label>
            {isEditing ? (
              <input
                type="text"
                value={draft.location}
                onChange={(e) => setDraft({ ...draft, location: e.target.value })}
                className="w-full bg-zinc-50 border border-zinc-200 focus:border-black rounded-sm px-3.5 py-2.5 text-xs font-semibold text-zinc-900 outline-none"
              />
            ) : (
              <p className="px-3.5 py-2 text-xs font-semibold text-zinc-900">{handleSettings.location || "—"}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 mb-1">Key Focus / Domains</label>
            {isEditing ? (
              <input
                type="text"
                value={draft.skills}
                onChange={(e) => setDraft({ ...draft, skills: e.target.value })}
                className="w-full bg-zinc-50 border border-zinc-200 focus:border-black rounded-sm px-3.5 py-2.5 text-xs font-semibold text-zinc-900 outline-none"
              />
            ) : (
              <p className="px-3.5 py-2 text-xs font-semibold text-zinc-900">{handleSettings.skills || "—"}</p>
            )}
          </div>
        </div>

        <div className="pt-4 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={onShare}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 text-xs font-bold text-zinc-700 bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 px-4 py-2.5 rounded-sm transition-all cursor-pointer min-h-[44px]"
          >
            <Copy className="h-4 w-4" />
            <span>{copied ? "Copied Handle URL!" : "Copy Handle Link"}</span>
          </button>

          {isEditing && (
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleCancel}
                disabled={saving}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 text-xs font-bold text-zinc-600 hover:text-black px-4 py-2.5 rounded-sm transition-all cursor-pointer disabled:opacity-50 min-h-[44px]"
              >
                <X className="h-4 w-4" />
                Cancel
              </button>
              <button
                type="submit"
                disabled={!canSave || saving}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 rounded-sm bg-black px-5 py-2.5 text-xs font-bold text-white hover:bg-zinc-800 transition-all cursor-pointer shadow-xs disabled:opacity-50 min-h-[44px]"
              >
                <Check className="h-4 w-4" />
                <span>{saving ? "Saving..." : "Save Profile Settings"}</span>
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
