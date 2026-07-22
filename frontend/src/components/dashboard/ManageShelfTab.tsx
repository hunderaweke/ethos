import React, { useRef, useEffect } from "react";
import {
  SlidersHorizontal,
  Plus,
  Funnel,
  CaretDown,
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
  XLogo
} from "@phosphor-icons/react";
import type { CurationItem } from "../../types";
import { generateVibrantColor, getSocialMediaColor } from "../../utils/color";

interface ManageShelfTabProps {
  items: CurationItem[];
  filteredItems: CurationItem[];
  filterCategory: string;
  setFilterCategory: (cat: string) => void;
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
  isTagOpen: boolean;
  setIsTagOpen: (open: boolean) => void;
}

export default function ManageShelfTab({
  items,
  filteredItems,
  filterCategory,
  setFilterCategory,
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
  isTagOpen,
  setIsTagOpen
}: ManageShelfTabProps) {
  const categoryRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setIsCategoryOpen(false);
      }
      if (tagRef.current && !tagRef.current.contains(event.target as Node)) {
        setIsTagOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsCategoryOpen, setIsTagOpen]);

  const categories = [
    { id: "all", label: "All Categories" },
    { id: "book", label: "Books" },
    { id: "youtube", label: "Videos" },
    { id: "podcast", label: "Podcasts" },
    { id: "essay", label: "Essays" },
    { id: "x", label: "Twitter / X" },
    { id: "design", label: "Design" },
  ];

  const renderTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "youtube": return <YoutubeLogo className="h-4 w-4" weight="fill" />;
      case "x":
      case "twitter": return <XLogo className="h-4 w-4" />;
      case "podcast": return <Microphone className="h-4 w-4" />;
      case "essay": return <FileText className="h-4 w-4" />;
      case "design": return <Palette className="h-4 w-4" />;
      case "book":
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const hasActiveFilters = filterCategory !== "all" || activeTag !== "all" || searchQuery !== "";

  return (
    <div className="bg-white border border-zinc-200 p-4 sm:p-6 rounded-sm shadow-2xs space-y-6 relative z-30">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200">
        <div>
          <h2 className="text-base font-black text-zinc-950 flex items-center gap-2">
            <SlidersHorizontal className="h-4.5 w-4.5 text-black" />
            Manage Mind-Shelf Items
          </h2>
          <p className="text-xs text-zinc-500 font-semibold mt-1">
            Add, edit, pin featured items, and filter by tags & categories.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenAddModal}
            className="inline-flex items-center gap-1.5 rounded-sm bg-black px-4 py-2 text-xs font-bold text-white hover:bg-zinc-900 transition-all cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>New Item</span>
          </button>
        </div>
      </div>

      {/* Custom Styled Dropdowns (Category & Tag) + Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        
        {/* Dropdown Filters Group */}
        <div className="flex flex-wrap items-center gap-2.5">
          
          {/* Category Custom Dropdown */}
          <div className="relative" ref={categoryRef}>
            <button
              onClick={() => { setIsCategoryOpen(!isCategoryOpen); setIsTagOpen(false); }}
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
              <div className="absolute top-full left-0 mt-1.5 w-48 bg-white border border-zinc-200 rounded-sm shadow-xl z-50 py-1.5 overflow-hidden animate-fade-in">
                <div className="px-3 py-1.5 text-[10px] font-bold capitalize tracking-wider text-zinc-400 border-b border-zinc-100">
                  Filter category
                </div>
                <div className="max-h-56 overflow-y-auto py-1">
                  {categories.map((cat) => {
                    const count = cat.id === "all" 
                      ? items.length 
                      : items.filter(i => i.type.toLowerCase() === cat.id.toLowerCase()).length;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setFilterCategory(cat.id);
                          setIsCategoryOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-1.5 text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                          filterCategory === cat.id ? "bg-zinc-100 text-black font-bold" : "text-zinc-600 hover:bg-zinc-50 hover:text-black"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {filterCategory === cat.id && <Check className="h-3.5 w-3.5 text-black" />}
                          <span>{cat.label}</span>
                        </span>
                        <span className="text-[10px] text-zinc-400 font-bold bg-zinc-100 px-1.5 py-0.5 rounded-sm">
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Tag Custom Dropdown */}
          <div className="relative" ref={tagRef}>
            <button
              onClick={() => { setIsTagOpen(!isTagOpen); setIsCategoryOpen(false); }}
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
              <div className="absolute top-full left-0 mt-1.5 w-56 bg-white border border-zinc-200 rounded-sm shadow-xl z-50 py-1.5 overflow-hidden animate-fade-in">
                <div className="px-3 py-1.5 text-[10px] font-bold capitalize tracking-wider text-zinc-400 border-b border-zinc-100 flex items-center justify-between">
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
                    className={`w-full text-left px-3.5 py-1.5 text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                      activeTag === "all" ? "bg-zinc-100 text-black font-bold" : "text-zinc-600 hover:bg-zinc-50 hover:text-black"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {activeTag === "all" && <Check className="h-3.5 w-3.5 text-black" />}
                      <span>All Tags</span>
                    </span>
                    <span className="text-[10px] text-zinc-400 font-bold bg-zinc-100 px-1.5 py-0.5 rounded-sm">
                      {items.length}
                    </span>
                  </button>
                  {allTags.map((tag) => {
                    const count = items.filter(i => i.tags.includes(tag)).length;
                    return (
                      <button
                        key={tag}
                        onClick={() => {
                          setActiveTag(tag);
                          setIsTagOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-1.5 text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                          activeTag === tag ? "bg-zinc-100 text-black font-bold" : "text-zinc-600 hover:bg-zinc-50 hover:text-black"
                        }`}
                      >
                        <span className="flex items-center gap-2 truncate">
                          {activeTag === tag && <Check className="h-3.5 w-3.5 text-black shrink-0" />}
                          <span className="truncate">{tag}</span>
                        </span>
                        <span className="text-[10px] text-zinc-400 font-bold bg-zinc-100 px-1.5 py-0.5 rounded-sm shrink-0 ml-2">
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Reset Filters button */}
          {hasActiveFilters && (
            <button
              onClick={() => {
                setFilterCategory("all");
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

        {/* Search Bar Input */}
        <div className="relative shrink-0 md:w-56">
          <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
          <input
            type="text"
            placeholder="Search shelf items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-50 border border-zinc-200 focus:border-black rounded-sm pl-8 pr-3 py-2 text-xs text-zinc-900 font-semibold placeholder-zinc-400 outline-none transition-colors"
          />
        </div>

      </div>

      {/* Items Table / Grid List */}
      <div className="divide-y divide-zinc-200 border border-zinc-200 rounded-sm overflow-hidden">
        {filteredItems.length > 0 ? (
          filteredItems.map(item => {
            const isPinned = !!pinnedItemIds[item.id];
            
            const iconColor = getSocialMediaColor(item.type, 1);
            const iconBg = getSocialMediaColor(item.type, 0.08);
            const iconBorder = getSocialMediaColor(item.type, 0.2);

            return (
              <div
                key={item.id}
                className="p-4 bg-white hover:bg-zinc-50/80 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5">
                  
                  {/* Type Icon Box with Social Color */}
                  <div 
                    className="h-10 w-10 shrink-0 border rounded-sm flex items-center justify-center font-bold text-sm"
                    style={{ color: iconColor, backgroundColor: iconBg, borderColor: iconBorder }}
                  >
                    {renderTypeIcon(item.type)}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm font-extrabold text-zinc-950">{item.title}</h4>
                      
                      {/* Type Badge */}
                      <span 
                        className="text-[9px] font-bold border px-2 py-0.5 rounded-sm capitalize inline-flex items-center gap-1"
                        style={{ color: iconColor, backgroundColor: iconBg, borderColor: iconBorder }}
                      >
                        {renderTypeIcon(item.type)}
                        <span>{item.type}</span>
                      </span>

                      {isPinned && (
                        <span className="text-[9px] font-bold bg-amber-100 text-amber-900 border border-amber-200 px-2 py-0.5 rounded-sm inline-flex items-center gap-1">
                          <Star className="h-3 w-3 fill-amber-500 text-amber-500" /> Featured
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-zinc-500 font-medium mt-1 line-clamp-1">
                      {item.description}
                    </p>

                    {/* Vibrant Tag Pills */}
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
                            className="text-[9px] font-bold border px-2 py-0.5 rounded-sm cursor-pointer hover:opacity-80 transition-opacity"
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
                  <button
                    onClick={() => onTogglePin(item.id)}
                    className={`p-2 rounded-sm border transition-colors cursor-pointer text-xs font-bold flex items-center gap-1 ${
                      isPinned
                        ? "bg-amber-50 border-amber-200 text-amber-900"
                        : "bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-100"
                    }`}
                    title={isPinned ? "Unpin featured" : "Pin as featured"}
                  >
                    <Star className={`h-3.5 w-3.5 ${isPinned ? "fill-amber-500 text-amber-500" : ""}`} />
                  </button>

                  <button
                    onClick={() => onOpenEditModal(item)}
                    className="p-2 rounded-sm bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer"
                    title="Edit item"
                  >
                    <PencilSimple className="h-3.5 w-3.5" />
                  </button>

                  <button
                    onClick={() => onRequestDelete(item)}
                    className="p-2 rounded-sm bg-white border border-zinc-200 text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    title="Delete item"
                  >
                    <Trash className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-8 text-center bg-zinc-50 text-zinc-500 text-xs font-bold">
            No curation items match your filter criteria.
          </div>
        )}
      </div>

    </div>
  );
}
