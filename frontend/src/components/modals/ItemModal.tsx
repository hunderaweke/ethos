import React, { useEffect, useRef, useState } from "react";
import {
  Plus, X, ImageSquare, BookOpen, YoutubeLogo, Microphone, FileText, XLogo, Palette, ShareNetwork,
  TelegramLogo, InstagramLogo, LinkedinLogo, SpotifyLogo, GithubLogo, DiscordLogo, FigmaLogo,
  TwitchLogo, TiktokLogo, RedditLogo, GoodreadsLogo, MediumLogo, Newspaper
} from "@phosphor-icons/react";
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
  social: "Social / Channel",
  telegram: "Telegram",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  spotify: "Spotify",
  github: "GitHub",
  discord: "Discord",
  figma: "Figma",
  twitch: "Twitch",
  tiktok: "TikTok",
  reddit: "Reddit",
  goodreads: "Goodreads",
  medium: "Medium",
  substack: "Substack",
};

function TypeIcon({ type, className }: { type: string; className: string }) {
  switch (type) {
    case "youtube": return <YoutubeLogo className={className} weight="fill" />;
    case "x": return <XLogo className={className} />;
    case "podcast": return <Microphone className={className} />;
    case "essay": return <FileText className={className} />;
    case "design": return <Palette className={className} />;
    case "social": return <ShareNetwork className={className} />;
    case "telegram": return <TelegramLogo className={className} />;
    case "instagram": return <InstagramLogo className={className} />;
    case "linkedin": return <LinkedinLogo className={className} />;
    case "spotify": return <SpotifyLogo className={className} />;
    case "github": return <GithubLogo className={className} />;
    case "discord": return <DiscordLogo className={className} />;
    case "figma": return <FigmaLogo className={className} />;
    case "twitch": return <TwitchLogo className={className} />;
    case "tiktok": return <TiktokLogo className={className} />;
    case "reddit": return <RedditLogo className={className} />;
    case "goodreads": return <GoodreadsLogo className={className} />;
    case "medium": return <MediumLogo className={className} />;
    case "substack": return <Newspaper className={className} />;
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

  const lastTagTyped = (formData.tags.split(",").pop() || "").trim().toLowerCase();

  const tagSuggestions = lastTagTyped.length > 0
    ? allTags.filter((t) => t.toLowerCase().includes(lastTagTyped) && !formData.tags.includes(t))
    : [];

  const applyTagSuggestion = (tag: string) => {
    const parts = formData.tags.split(",").map((p) => p.trim());
    parts.pop();
    parts.push(tag);
    setFormData((prev) => ({ ...prev, tags: parts.join(", ") + ", " }));
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

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
  }, [formData.link, isOpen]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white border border-zinc-200/90 w-full max-w-lg rounded-sm shadow-2xl overflow-hidden cursor-default max-h-[90vh] flex flex-col"
      >
        <div className="p-4 sm:p-5 border-b border-zinc-200 flex items-center justify-between bg-zinc-50 shrink-0">
          <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-zinc-900 flex items-center gap-2">
            <Plus className="h-4 w-4 text-black" />
            {editingItem ? "Edit Mind-Shelf Item" : "Add New Item"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-zinc-400 hover:text-black hover:bg-zinc-200/60 p-2 rounded-sm cursor-pointer transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center"
            title="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={onSave} className="p-5 sm:p-6 space-y-4 overflow-y-auto flex-1">
          <div>
            <label className="block text-xs font-bold text-zinc-700 mb-1">Resource Link URL *</label>
            <input
              type="url"
              required
              placeholder="https://example.com/resource"
              value={formData.link}
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              className="w-full bg-zinc-50 border border-zinc-200 focus:border-black rounded-sm px-3.5 py-2.5 text-xs font-semibold outline-none"
            />

            {(previewLoading || formData.image || formData.title) && (
              <div className="mt-2 flex items-center gap-3 p-3 bg-zinc-50 border border-zinc-200/80 rounded-sm">
                <div className={`shrink-0 border border-zinc-200 bg-white overflow-hidden flex items-center justify-center rounded-sm ${
                  formData.type === "book" || formData.type === "goodreads" ? "aspect-[3/4] w-10 h-14" : "h-10 w-10"
                }`}>
                  {formData.image ? (
                    <img src={formData.image} alt="" referrerPolicy="no-referrer" className="h-full w-full object-cover" />
                  ) : (
                    <ImageSquare className="h-5 w-5 text-zinc-300 animate-pulse" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-zinc-800 truncate">
                    {previewLoading ? "Resolving link preview..." : formData.title || "Details not found — you can manually edit"}
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-zinc-500 capitalize">
                      <TypeIcon type={formData.type} className="h-3 w-3" />
                      {TYPE_LABELS[formData.type] || formData.type}
                    </span>
                    {formData.resourceKind && <ResourceKindBadge kind={formData.resourceKind} />}
                    {formData.followerCount && (
                      <span className="text-[10px] font-bold text-zinc-400">• {formData.followerCount}</span>
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
              placeholder="Resolved automatically from link — edit if needed"
              value={formData.creator}
              onChange={(e) => setFormData({ ...formData, creator: e.target.value })}
              className="w-full bg-zinc-50 border border-zinc-200 focus:border-black rounded-sm px-3.5 py-2.5 text-xs font-semibold outline-none"
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
              className="w-full bg-zinc-50 border border-zinc-200 focus:border-black rounded-sm p-3.5 text-xs font-medium outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 mb-1">How it shaped me (Impact Quote)</label>
            <textarea
              rows={2}
              placeholder="Personal insight or why you recommend it..."
              value={formData.impact}
              onChange={(e) => setFormData({ ...formData, impact: e.target.value })}
              className="w-full bg-zinc-50 border border-zinc-200 focus:border-black rounded-sm p-3.5 text-xs font-medium outline-none italic"
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
              className="w-full bg-zinc-50 border border-zinc-200 focus:border-black rounded-sm px-3.5 py-2.5 text-xs font-semibold outline-none"
            />
            {isTagFocused && tagSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-zinc-200/90 rounded-sm shadow-xl z-50 py-1.5 overflow-hidden animate-in fade-in">
                <div className="px-3.5 py-1 text-[9px] font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-100">
                  Similar tags already in use
                </div>
                {tagSuggestions.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onMouseDown={(e) => { e.preventDefault(); applyTagSuggestion(tag); }}
                    className="w-full text-left px-3.5 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 hover:text-black cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-zinc-200 flex items-center justify-end gap-2 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-bold text-zinc-600 hover:text-black cursor-pointer min-h-[44px]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-bold bg-black text-white hover:bg-zinc-800 rounded-sm transition-all cursor-pointer shadow-xs min-h-[44px] active:scale-95"
            >
              {editingItem ? "Update Item" : "Add to Mind-Shelf"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
