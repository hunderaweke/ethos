import { useRef, useEffect } from "react";
import {
  SlidersHorizontal,
  Plus,
  Funnel,
  CaretDown,
  CaretUp,
  Check,
  Tag,
  X,
  MagnifyingGlass,
  Star,
  PencilSimple,
  Trash,
  BookOpen,
  YoutubeLogo,
  Microphone,
  FileText,
  Palette,
  XLogo,
  ShareNetwork,
  TelegramLogo,
  InstagramLogo,
  LinkedinLogo,
  SpotifyLogo,
  GithubLogo,
  DiscordLogo,
  FigmaLogo,
  TwitchLogo,
  TiktokLogo,
  RedditLogo,
  GoodreadsLogo,
  MediumLogo,
  Newspaper
} from "@phosphor-icons/react";
import type { CurationItem, ResourceKind } from "../../types";
import { generateVibrantColor, getSocialMediaColor } from "../../utils/color";
import ResourceKindIcon, { RESOURCE_KIND_LABELS, ResourceKindBadge } from "../ResourceKindIcon";
import Pagination from "../Pagination";
import { EmptyShelfIllustration } from "../illustrations/Illustrations";

interface ManageShelfTabProps {
  filteredItems: CurationItem[];
  filterCategory: string;
  setFilterCategory: (cat: string) => void;
  filterKind: string;
  setFilterKind: (kind: string) => void;
  activeTag: string;
  setActiveTag: (tag: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  allTags: string[];
  pinnedItemIds: Record<string, boolean>;
  onTogglePin: (id: string) => void;
  onOpenAddModal: () => void;
  onOpenEditModal: (item: CurationItem) => void;
  onRequestDelete: (item: CurationItem) => void;
  isCategoryOpen: boolean;
  setIsCategoryOpen: (open: boolean) => void;
  isKindOpen: boolean;
  setIsKindOpen: (open: boolean) => void;
  isTagOpen: boolean;
  setIsTagOpen: (open: boolean) => void;
  sortMode: string;
  setSortMode: (sort: string) => void;
  onMoveItem: (id: string, direction: "up" | "down") => void;
  page: number;
  pages: number;
  total: number;
  limit: number;
  onPageChange: (newPage: number) => void;
  onLimitChange: (newLimit: number) => void;
}

const KINDS: { id: string; label: string }[] = [
  { id: "all", label: "All Kinds" },
  ...(Object.entries(RESOURCE_KIND_LABELS) as [ResourceKind, string][]).map(([id, label]) => ({ id, label })),
];

export default function ManageShelfTab({
  filteredItems,
  filterCategory,
  setFilterCategory,
  filterKind,
  setFilterKind,
  activeTag,
  setActiveTag,
  searchQuery,
  setSearchQuery,
  allTags,
  pinnedItemIds,
  onTogglePin,
  onOpenAddModal,
  onOpenEditModal,
  onRequestDelete,
  isCategoryOpen,
  setIsCategoryOpen,
  isKindOpen,
  setIsKindOpen,
  isTagOpen,
  setIsTagOpen,
  sortMode,
  setSortMode,
  onMoveItem,
  page,
  pages,
  total,
  limit,
  onPageChange,
  onLimitChange,
}: ManageShelfTabProps) {
  const categoryRef = useRef<HTMLDivElement>(null);
  const kindRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setIsCategoryOpen(false);
      }
      if (kindRef.current && !kindRef.current.contains(event.target as Node)) {
        setIsKindOpen(false);
      }
      if (tagRef.current && !tagRef.current.contains(event.target as Node)) {
        setIsTagOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsCategoryOpen, setIsKindOpen, setIsTagOpen]);

  const categories = [
    { id: "all", label: "All Categories" },
    { id: "book", label: "Books" },
    { id: "youtube", label: "Videos" },
    { id: "podcast", label: "Podcasts" },
    { id: "essay", label: "Essays" },
    { id: "x", label: "Twitter / X" },
    { id: "design", label: "Design" },
    { id: "telegram", label: "Telegram" },
    { id: "instagram", label: "Instagram" },
    { id: "linkedin", label: "LinkedIn" },
    { id: "spotify", label: "Spotify" },
    { id: "github", label: "GitHub" },
    { id: "discord", label: "Discord" },
    { id: "figma", label: "Figma" },
    { id: "twitch", label: "Twitch" },
    { id: "tiktok", label: "TikTok" },
    { id: "reddit", label: "Reddit" },
    { id: "goodreads", label: "Goodreads" },
    { id: "medium", label: "Medium" },
    { id: "substack", label: "Substack" },
    { id: "social", label: "Social (Other)" },
  ];

  const renderTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "youtube": return <YoutubeLogo className="h-4 w-4" weight="fill" />;
      case "x":
      case "twitter": return <XLogo className="h-4 w-4" />;
      case "podcast": return <Microphone className="h-4 w-4" />;
      case "essay": return <FileText className="h-4 w-4" />;
      case "design": return <Palette className="h-4 w-4" />;
      case "social": return <ShareNetwork className="h-4 w-4" />;
      case "telegram": return <TelegramLogo className="h-4 w-4" />;
      case "instagram": return <InstagramLogo className="h-4 w-4" />;
      case "linkedin": return <LinkedinLogo className="h-4 w-4" />;
      case "spotify": return <SpotifyLogo className="h-4 w-4" />;
      case "github": return <GithubLogo className="h-4 w-4" />;
      case "discord": return <DiscordLogo className="h-4 w-4" />;
      case "figma": return <FigmaLogo className="h-4 w-4" />;
      case "twitch": return <TwitchLogo className="h-4 w-4" />;
      case "tiktok": return <TiktokLogo className="h-4 w-4" />;
      case "reddit": return <RedditLogo className="h-4 w-4" />;
      case "goodreads": return <GoodreadsLogo className="h-4 w-4" />;
      case "medium": return <MediumLogo className="h-4 w-4" />;
      case "substack": return <Newspaper className="h-4 w-4" />;
      case "book":
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const hasActiveFilters = filterCategory !== "all" || filterKind !== "all" || activeTag !== "all" || searchQuery !== "";

  return (
    <div className="bg-white border border-zinc-200 p-6 sm:p-8 lg:p-10 rounded-sm shadow-2xs space-y-6 relative z-30">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200">
        <div>
          <h2 className="text-base sm:text-lg font-black text-zinc-950 flex items-center gap-2">
            <SlidersHorizontal className="h-5 w-5 text-black" />
            Manage Mind-Shelf Items
          </h2>
          <p className="text-xs text-zinc-500 font-semibold mt-1">
            Add, edit, pin featured items, and filter by tags & categories.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenAddModal}
            className="inline-flex items-center justify-center gap-1.5 rounded-sm bg-black px-4 py-2 text-xs font-bold text-white hover:bg-zinc-800 transition-all cursor-pointer active:scale-95 shadow-xs"
          >
            <Plus className="h-4 w-4 text-white" />
            <span>New Item</span>
          </button>
        </div>
      </div>

      {/* Filters & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        
        {/* Dropdown Filters Group */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Category Dropdown */}
          <div className="relative" ref={categoryRef}>
            <button
              onClick={() => { setIsCategoryOpen(!isCategoryOpen); setIsKindOpen(false); setIsTagOpen(false); }}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-sm text-xs font-bold transition-all cursor-pointer border shadow-2xs ${
                filterCategory !== "all" 
                  ? "bg-black text-white border-black" 
                  : "bg-zinc-50 hover:bg-zinc-100 text-zinc-800 border-zinc-200"
              }`}
            >
              <Funnel className={`h-3.5 w-3.5 ${filterCategory !== "all" ? "text-white" : "text-zinc-500"}`} />
              <span>
                {filterCategory === "all" ? "Category: All" : categories.find(c => c.id === filterCategory)?.label}
              </span>
              <CaretDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isCategoryOpen ? "rotate-180" : ""}`} />
            </button>

            {isCategoryOpen && (
              <div className="absolute top-full left-0 mt-1.5 w-48 bg-white border border-zinc-200 rounded-sm shadow-xl z-50 py-1.5 overflow-hidden animate-in fade-in slide-in-from-top-1">
                <div className="px-3.5 py-2 text-[10px] font-bold capitalize tracking-wider text-zinc-400 border-b border-zinc-100">
                  Filter category
                </div>
                <div className="max-h-56 overflow-y-auto py-1">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setFilterCategory(cat.id);
                        setIsCategoryOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                        filterCategory === cat.id ? "bg-zinc-100 text-black font-bold" : "text-zinc-600 hover:bg-zinc-50 hover:text-black"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {filterCategory === cat.id && <Check className="h-3.5 w-3.5 text-black" />}
                        <span>{cat.label}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Kind Dropdown */}
          <div className="relative" ref={kindRef}>
            <button
              onClick={() => { setIsKindOpen(!isKindOpen); setIsCategoryOpen(false); setIsTagOpen(false); }}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-sm text-xs font-bold transition-all cursor-pointer border shadow-2xs ${
                filterKind !== "all"
                  ? "bg-black text-white border-black"
                  : "bg-zinc-50 hover:bg-zinc-100 text-zinc-800 border-zinc-200"
              }`}
            >
              {filterKind !== "all" ? (
                <ResourceKindIcon kind={filterKind as ResourceKind} className="h-3.5 w-3.5 text-white" />
              ) : (
                <Funnel className="h-3.5 w-3.5 text-zinc-500" />
              )}
              <span>
                {filterKind === "all" ? "Kind: All" : KINDS.find(k => k.id === filterKind)?.label}
              </span>
              <CaretDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isKindOpen ? "rotate-180" : ""}`} />
            </button>

            {isKindOpen && (
              <div className="absolute top-full left-0 mt-1.5 w-48 bg-white border border-zinc-200 rounded-sm shadow-xl z-50 py-1.5 overflow-hidden animate-in fade-in slide-in-from-top-1">
                <div className="px-3.5 py-2 text-[10px] font-bold capitalize tracking-wider text-zinc-400 border-b border-zinc-100">
                  Filter by kind
                </div>
                <div className="max-h-56 overflow-y-auto py-1">
                  {KINDS.map((kind) => (
                    <button
                      key={kind.id}
                      onClick={() => {
                        setFilterKind(kind.id);
                        setIsKindOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                        filterKind === kind.id ? "bg-zinc-100 text-black font-bold" : "text-zinc-600 hover:bg-zinc-50 hover:text-black"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {filterKind === kind.id && <Check className="h-3.5 w-3.5 text-black" />}
                        {kind.id !== "all" && <ResourceKindIcon kind={kind.id as ResourceKind} className="h-3.5 w-3.5 text-zinc-400" />}
                        <span>{kind.label}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Tag Dropdown */}
          <div className="relative" ref={tagRef}>
            <button
              onClick={() => { setIsTagOpen(!isTagOpen); setIsCategoryOpen(false); setIsKindOpen(false); }}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-sm text-xs font-bold transition-all cursor-pointer border shadow-2xs ${
                activeTag !== "all" 
                  ? "bg-black text-white border-black" 
                  : "bg-zinc-50 hover:bg-zinc-100 text-zinc-800 border-zinc-200"
              }`}
            >
              <Tag className={`h-3.5 w-3.5 ${activeTag !== "all" ? "text-white" : "text-zinc-500"}`} />
              <span>
                {activeTag === "all" ? "Tag: All" : activeTag}
              </span>
              <CaretDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isTagOpen ? "rotate-180" : ""}`} />
            </button>

            {isTagOpen && (
              <div className="absolute top-full left-0 mt-1.5 w-56 bg-white border border-zinc-200 rounded-sm shadow-xl z-50 py-1.5 overflow-hidden animate-in fade-in slide-in-from-top-1">
                <div className="px-3.5 py-2 text-[10px] font-bold capitalize tracking-wider text-zinc-400 border-b border-zinc-100 flex items-center justify-between">
                  <span>Filter by tag</span>
                  {activeTag !== "all" && (
                    <button 
                      onClick={(e) => { e.stopPropagation(); setActiveTag("all"); }}
                      className="text-[9px] text-zinc-500 hover:text-black underline cursor-pointer capitalize"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <div className="max-h-60 overflow-y-auto py-1">
                  <button
                    onClick={() => {
                      setActiveTag("all");
                      setIsTagOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                      activeTag === "all" ? "bg-zinc-100 text-black font-bold" : "text-zinc-600 hover:bg-zinc-50 hover:text-black"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {activeTag === "all" && <Check className="h-3.5 w-3.5 text-black" />}
                      <span>All Tags</span>
                    </span>
                  </button>
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => {
                        setActiveTag(tag);
                        setIsTagOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                        activeTag === tag ? "bg-zinc-100 text-black font-bold" : "text-zinc-600 hover:bg-zinc-50 hover:text-black"
                      }`}
                    >
                      <span className="flex items-center gap-2 truncate">
                        {activeTag === tag && <Check className="h-3.5 w-3.5 text-black shrink-0" />}
                        <span className="truncate">{tag}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Reset Filters button */}
          {hasActiveFilters && (
            <button
              onClick={() => {
                setFilterCategory("all");
                setFilterKind("all");
                setActiveTag("all");
                setSearchQuery("");
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-sm text-xs font-bold text-zinc-500 hover:text-black hover:bg-zinc-100 transition-all cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
              <span>Reset</span>
            </button>
          )}

        </div>

        {/* Sort & Search */}
        <div className="flex items-center gap-2 mt-2 md:mt-0">
          <select
            value={sortMode}
            onChange={(e) => setSortMode(e.target.value)}
            className="bg-zinc-50 border border-zinc-200 rounded-sm px-3 py-2 text-xs font-bold text-zinc-900 outline-none cursor-pointer hover:border-zinc-400 transition-colors"
          >
            <option value="custom">Custom Order</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="title">Title A-Z</option>
            <option value="featured">Featured First</option>
            <option value="most_viewed">Most Viewed</option>
            <option value="most_saved">Most Saved</option>
          </select>

          <div className="relative shrink-0 md:w-56">
            <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search shelf items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-50 border border-zinc-200 focus:border-black rounded-sm pl-9 pr-3 py-2 text-xs text-zinc-900 font-semibold placeholder-zinc-400 outline-none transition-colors"
            />
          </div>
        </div>

      </div>

      {sortMode === "custom" ? (
        <p className="text-[10px] font-bold text-zinc-400 tracking-wide uppercase">
          Use the arrows below to arrange your shelf — it's also the order visitors see.
        </p>
      ) : (
        /* Server-Side Pagination (Top) */
        <Pagination
          page={page}
          pages={pages}
          total={total}
          limit={limit}
          onPageChange={onPageChange}
          onLimitChange={onLimitChange}
        />
      )}

      {/* Items List */}
      <div className="divide-y divide-zinc-200 border border-zinc-200 rounded-sm overflow-hidden shadow-2xs">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => {
            const isPinned = !!pinnedItemIds[item.id];
            
            const iconColor = getSocialMediaColor(item.type, 1);
            const iconBg = getSocialMediaColor(item.type, 0.08);
            const iconBorder = getSocialMediaColor(item.type, 0.2);

            return (
              <div
                key={item.id}
                className="p-4 sm:p-5 bg-white hover:bg-zinc-50/80 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5 min-w-0">
                  
                  {/* Resource Image */}
                  <div
                    className="h-10 w-10 shrink-0 border rounded-sm overflow-hidden flex items-center justify-center font-bold text-sm"
                    style={{ color: iconColor, backgroundColor: iconBg, borderColor: iconBorder }}
                  >
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      renderTypeIcon(item.type)
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm font-black text-zinc-950 truncate">{item.title}</h4>
                      
                      {/* Type Badge */}
                      <span 
                        className="text-[9px] font-bold border px-2.5 py-0.5 rounded-sm capitalize inline-flex items-center gap-1"
                        style={{ color: iconColor, backgroundColor: iconBg, borderColor: iconBorder }}
                      >
                        {renderTypeIcon(item.type)}
                        <span>{item.type}</span>
                      </span>

                      {item.resourceKind && <ResourceKindBadge kind={item.resourceKind} />}

                      {isPinned && (
                        <span className="text-[9px] font-bold bg-amber-100 text-amber-900 border border-amber-200 px-2 py-0.5 rounded-sm inline-flex items-center gap-1">
                          <Star className="h-3 w-3 fill-amber-500 text-amber-500" /> Featured
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-zinc-500 font-medium mt-1 line-clamp-1">
                      {item.description}
                    </p>

                    {/* Tag Pills */}
                    <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                      {item.tags.map(t => {
                        const cleanTag = t.replace("#", "");
                        const tagColor = generateVibrantColor(cleanTag, 1);
                        const tagBg = generateVibrantColor(cleanTag, 0.08);
                        const tagBorder = generateVibrantColor(cleanTag, 0.18);
                        return (
                          <span 
                            key={t} 
                            onClick={() => setActiveTag(t)}
                            className="text-[9px] font-bold border px-2.5 py-0.5 rounded-sm cursor-pointer hover:opacity-80 transition-opacity"
                            style={{ color: tagColor, backgroundColor: tagBg, borderColor: tagBorder }}
                          >
                            {cleanTag}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Item Actions */}
                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  {sortMode === "custom" && (
                    <div className="flex flex-col gap-0.5">
                      <button
                        onClick={() => onMoveItem(item.id, "up")}
                        disabled={index === 0}
                        className="p-1 rounded-sm bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-100 disabled:opacity-30 disabled:hover:bg-white transition-colors cursor-pointer disabled:cursor-not-allowed min-w-[28px] min-h-[18px] flex items-center justify-center"
                        title="Move up"
                      >
                        <CaretUp className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => onMoveItem(item.id, "down")}
                        disabled={index === filteredItems.length - 1}
                        className="p-1 rounded-sm bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-100 disabled:opacity-30 disabled:hover:bg-white transition-colors cursor-pointer disabled:cursor-not-allowed min-w-[28px] min-h-[18px] flex items-center justify-center"
                        title="Move down"
                      >
                        <CaretDown className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}

                  <button
                    onClick={() => onTogglePin(item.id)}
                    className={`p-2 rounded-sm border transition-colors cursor-pointer text-xs font-bold flex items-center justify-center min-w-[36px] min-h-[36px] ${
                      isPinned
                        ? "bg-amber-50 border-amber-200 text-amber-900"
                        : "bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-100"
                    }`}
                    title={isPinned ? "Unpin featured" : "Pin as featured"}
                  >
                    <Star className={`h-4 w-4 ${isPinned ? "fill-amber-500 text-amber-500" : ""}`} />
                  </button>

                  <button
                    onClick={() => onOpenEditModal(item)}
                    className="p-2 rounded-sm bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center"
                    title="Edit item"
                  >
                    <PencilSimple className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => onRequestDelete(item)}
                    className="p-2 rounded-sm bg-white border border-zinc-200 text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center"
                    title="Delete item"
                  >
                    <Trash className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-10 text-center bg-zinc-50 flex flex-col items-center justify-center gap-3">
            <EmptyShelfIllustration className="w-44 h-36" />
            <div>
              <h4 className="text-sm font-black text-zinc-900">Your Shelf is Empty</h4>
              <p className="text-xs text-zinc-500 font-semibold mt-0.5">No curation items match your current filter settings.</p>
            </div>
            <button
              onClick={onOpenAddModal}
              className="mt-1 inline-flex items-center gap-1.5 px-4 py-2 rounded-sm bg-black text-white text-xs font-bold hover:bg-zinc-800 transition-colors cursor-pointer shadow-xs"
            >
              <Plus className="h-3.5 w-3.5" />
              Add First Recommendation
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
