import React, { useEffect, useRef, useState } from "react";
import { Plus, X, ImageSquare, BookOpen, YoutubeLogo, Microphone, FileText, XLogo, Palette } from "@phosphor-icons/react";
import type { CurationItem, ResourceKind } from "../../types";
import { fetchLinkPreview } from "../../utils/api";
import { ResourceKindBadge } from "../ResourceKindIcon";

export interface ItemFormData {
  title: string;
  type: string;
  resourceKind: ResourceKind | "";
  creator: string;
  link: string;
  description: string;
  impact: string;
  tags: string;
  image: string;
  followerCount: string;
}

interface ItemModalProps {
  isOpen: boolean;
  editingItem: CurationItem | null;
  formData: ItemFormData;
  setFormData: React.Dispatch<React.SetStateAction<ItemFormData>>;
  onClose: () => void;
  onSave: (e: React.FormEvent) => void;
  allTags: string[];
}

const TYPE_LABELS: Record<string, string> = {
  book: "Book",
  youtube: "Video / YouTube",
  podcast: "Podcast",
  essay: "Essay / Article",
  x: "Twitter / X",
  design: "Design",
};

function TypeIcon({ type, className }: { type: string; className: string }) {
  switch (type) {
    case "youtube": return <YoutubeLogo className={className} weight="fill" />;
    case "x": return <XLogo className={className} />;
    case "podcast": return <Microphone className={className} />;
    case "essay": return <FileText className={className} />;
    case "design": return <Palette className={className} />;
    default: return <BookOpen className={className} />;
  }
}

export default function ItemModal({
  isOpen,
  editingItem,
  formData,
  setFormData,
  onClose,
  onSave,
  allTags
}: ItemModalProps) {
  const [previewLoading, setPreviewLoading] = useState(false);
  const [isTagFocused, setIsTagFocused] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const tagSegments = formData.tags.split(",");
  const currentTagFragment = (tagSegments[tagSegments.length - 1] || "").trim().replace(/^#/, "").toLowerCase();
  const alreadyUsedTags = new Set(
    tagSegments.slice(0, -1).map(t => t.trim().replace(/^#/, "").toLowerCase())
  );
  const tagSuggestions = currentTagFragment
    ? allTags
        .filter(t => {
          const clean = t.replace(/^#/, "").toLowerCase();
          return clean.startsWith(currentTagFragment) && clean !== currentTagFragment && !alreadyUsedTags.has(clean);
        })
        .slice(0, 6)
    : [];

  const applyTagSuggestion = (tag: string) => {
    const priorTags = tagSegments.slice(0, -1).map(t => t.trim()).filter(Boolean);
    setFormData({ ...formData, tags: `${[...priorTags, tag].join(", ")}, ` });
  };

  useEffect(() => {
    if (!isOpen) return;
    clearTimeout(debounceRef.current);

    let url: URL;
    try {
      url = new URL(formData.link);
    } catch {
      return;
    }
    if (!/^https?:$/.test(url.protocol)) {
      return;
    }

    const controller = new AbortController();
    debounceRef.current = setTimeout(async () => {
      setPreviewLoading(true);
      const preview = await fetchLinkPreview(formData.link, controller.signal);
      setPreviewLoading(false);
      setFormData(prev => ({
        ...prev,
        image: preview?.image_url || prev.image,
        title: preview?.title || prev.title,
        type: preview?.suggested_type || prev.type,
        resourceKind: (preview?.resource_kind as ResourceKind) || prev.resourceKind,
        creator: preview?.creator_name || prev.creator,
        followerCount: preview?.follower_count || prev.followerCount,
      }));
    }, 600);

    return () => {
      clearTimeout(debounceRef.current);
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.link, isOpen]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white border border-zinc-200 w-full max-w-lg rounded-sm shadow-2xl overflow-hidden cursor-default"
      >
        <div className="p-4 border-b border-zinc-200 flex items-center justify-between bg-zinc-50">
          <h3 className="text-xs font-black uppercase tracking-wider text-zinc-900 flex items-center gap-2">
            <Plus className="h-4 w-4" />
            {editingItem ? "Edit Mind-Shelf Influence" : "Add New Influence"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-zinc-400 hover:text-black hover:bg-zinc-200/60 p-1.5 rounded-sm cursor-pointer transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={onSave} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div>
            <label className="block text-xs font-bold text-zinc-700 mb-1">Resource Link URL *</label>
            <input
              type="url"
              required
              placeholder="https://example.com/book"
              value={formData.link}
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              className="w-full bg-zinc-50 border border-zinc-200 focus:border-black rounded-sm px-3 py-2 text-xs font-semibold outline-none"
            />

            {/* Auto-resolved preview: image, title, category, follower/subscriber count */}
            {(previewLoading || formData.image || formData.title) && (
              <div className="mt-2 flex items-center gap-2.5 p-2 bg-zinc-50 border border-zinc-200 rounded-sm">
                <div className="h-10 w-10 shrink-0 border border-zinc-200 bg-white overflow-hidden flex items-center justify-center rounded-sm">
                  {formData.image ? (
                    <img src={formData.image} alt="" referrerPolicy="no-referrer" className="h-full w-full object-cover" />
                  ) : (
                    <ImageSquare className="h-4 w-4 text-zinc-300 animate-pulse" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold text-zinc-700 truncate">
                    {previewLoading ? "Resolving..." : formData.title || "Details not found — you can still save"}
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="inline-flex items-center gap-1 text-[9px] font-bold text-zinc-400 capitalize">
                      <TypeIcon type={formData.type} className="h-3 w-3" />
                      {TYPE_LABELS[formData.type] || formData.type}
                    </span>
                    {formData.resourceKind && <ResourceKindBadge kind={formData.resourceKind} />}
                    {formData.followerCount && (
                      <span className="text-[9px] font-bold text-zinc-400">• {formData.followerCount}</span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 mb-1">Author / Creator</label>
            <input
              type="text"
              placeholder="Resolved automatically from the link — edit if needed"
              value={formData.creator}
              onChange={(e) => setFormData({ ...formData, creator: e.target.value })}
              className="w-full bg-zinc-50 border border-zinc-200 focus:border-black rounded-sm px-3 py-2 text-xs font-semibold outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 mb-1">Short Description *</label>
            <textarea
              rows={2}
              required
              placeholder="What is this resource about?"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-zinc-50 border border-zinc-200 focus:border-black rounded-sm p-3 text-xs font-medium outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 mb-1">How it shaped me (Impact Quote)</label>
            <textarea
              rows={2}
              placeholder="Personal insight or why you recommend it..."
              value={formData.impact}
              onChange={(e) => setFormData({ ...formData, impact: e.target.value })}
              className="w-full bg-zinc-50 border border-zinc-200 focus:border-black rounded-sm p-3 text-xs font-medium outline-none italic"
            />
          </div>

          <div className="relative">
            <label className="block text-xs font-bold text-zinc-700 mb-1">Tags (Comma-separated)</label>
            <input
              type="text"
              placeholder="#Systems, #Databases, #Backend"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              onFocus={() => setIsTagFocused(true)}
              onBlur={() => setIsTagFocused(false)}
              className="w-full bg-zinc-50 border border-zinc-200 focus:border-black rounded-sm px-3 py-2 text-xs font-semibold outline-none"
            />
            {isTagFocused && tagSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-zinc-200 rounded-sm shadow-xl z-50 py-1 overflow-hidden animate-fade-in">
                <div className="px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-100">
                  Similar tags already in use
                </div>
                {tagSuggestions.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onMouseDown={(e) => { e.preventDefault(); applyTagSuggestion(tag); }}
                    className="w-full text-left px-3 py-1.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 hover:text-black cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-zinc-200 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-zinc-600 hover:text-black cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold bg-black text-white hover:bg-zinc-900 rounded-sm transition-all cursor-pointer shadow-2xs"
            >
              {editingItem ? "Update Influence" : "Add to Mind-Shelf"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
