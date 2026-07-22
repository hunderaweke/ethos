import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { ArrowLeft, BookOpen, Funnel, MagnifyingGlass, CaretDown, Tag, X, Check, ShareNetwork } from "@phosphor-icons/react";
import ProfileHeader from "./ProfileHeader";
import CurationCard from "./CurationCard";
import Footer from "./Footer";
import Pagination from "./Pagination";
import type { CurationItem } from "./CurationCard";
import type { ResourceKind } from "../types";
import { getPublicProfile, getPublicItems, followProfile, unfollowProfile, saveItem, unsaveItem, toCurationItem, ApiError, type ApiProfile } from "../utils/api";
import ResourceKindIcon, { RESOURCE_KIND_LABELS } from "./ResourceKindIcon";
import { useToast } from "./ToastContext";

import { NotFoundIllustration, EmptyShelfIllustration } from "./illustrations/Illustrations";

interface HandlePageProps {
  onBack: () => void;
}

export default function HandlePage({ onBack }: HandlePageProps) {
  const { handle: rawHandle } = useParams<{ handle: string }>();
  const handle = rawHandle?.replace(/^@/, "");
  const { showToast } = useToast();

  const [profile, setProfile] = useState<ApiProfile | null>(null);
  const [items, setItems] = useState<CurationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const [copied, setCopied] = useState(false);
  const [savedItems, setSavedItems] = useState<Record<string, boolean>>({});
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeKind, setActiveKind] = useState<string>("all");
  const [activeTag, setActiveTag] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Server-side pagination state
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [pages, setPages] = useState<number>(1);

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isKindOpen, setIsKindOpen] = useState(false);
  const [isTagOpen, setIsTagOpen] = useState(false);

  const categoryRef = useRef<HTMLDivElement>(null);
  const kindRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);

  // Fetch public profile on mount
  useEffect(() => {
    if (!handle) return;
    let cancelled = false;
    getPublicProfile(handle)
      .then((profileData) => {
        if (!cancelled) setProfile(profileData);
      })
      .catch(() => {
        if (!cancelled) setNotFound(true);
      });
    return () => {
      cancelled = true;
    };
  }, [handle]);

  // Fetch paginated public items whenever handle, filters, page, or limit changes
  useEffect(() => {
    if (!handle) return;
    let cancelled = false;
    setLoading(true);

    getPublicItems(handle, {
      type: activeCategory,
      kind: activeKind,
      tag: activeTag,
      q: searchQuery,
      page,
      limit,
    })
      .then((res) => {
        if (cancelled) return;
        setItems(res.items.map(toCurationItem));
        setTotal(res.total);
        setPages(res.pages);
        setPage(res.page);
      })
      .catch(() => {
        if (!cancelled) setNotFound(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [handle, activeCategory, activeKind, activeTag, searchQuery, page, limit]);

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
  }, []);

  const handleShare = () => {
    setCopied(true);
    navigator.clipboard.writeText(window.location.href);
    showToast("Profile link copied to clipboard!", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleSave = useCallback((id: string) => {
    const wasSaved = savedItems[id];
    setSavedItems(prev => ({ ...prev, [id]: !prev[id] }));
    (wasSaved ? unsaveItem(id) : saveItem(id)).catch(() => {
      setSavedItems(prev => ({ ...prev, [id]: !!wasSaved }));
    });
  }, [savedItems]);

  const toggleFollow = () => {
    if (!handle) return;
    const wasFollowing = isFollowing;
    setIsFollowing(!wasFollowing);
    showToast(
      wasFollowing ? `Unfollowed @${handle}` : `Now following @${handle}`,
      wasFollowing ? "info" : "success"
    );
    (wasFollowing ? unfollowProfile(handle) : followProfile(handle)).catch((err) => {
      setIsFollowing(wasFollowing);
      if (!(err instanceof ApiError && err.status === 401)) {
        console.error("Failed to update follow state", err);
      }
    });
  };

  const categories = [
    { id: "all", label: "All Categories" },
    { id: "book", label: "Books" },
    { id: "youtube", label: "Videos" },
    { id: "podcast", label: "Podcasts" },
    { id: "essay", label: "Essays" },
    { id: "x", label: "Twitter / X" },
    { id: "design", label: "Design" },
  ];

  const kinds: { id: string; label: string }[] = [
    { id: "all", label: "All Kinds" },
    ...(Object.entries(RESOURCE_KIND_LABELS) as [ResourceKind, string][]).map(([id, label]) => ({ id, label })),
  ];

  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    items.forEach(item => {
      item.tags.forEach(t => tagsSet.add(t));
    });
    return Array.from(tagsSet).sort();
  }, [items]);

  const hasActiveFilters = activeCategory !== "all" || activeKind !== "all" || activeTag !== "all" || searchQuery !== "";

  if (loading && !profile) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
        <header className="sticky top-4 z-50 w-full px-4 sm:px-6 max-w-7xl mx-auto mb-6">
          <div className="h-16 bg-white border border-zinc-200 rounded-sm animate-pulse" />
        </header>
        <main className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-8 lg:grid lg:grid-cols-12 lg:gap-8 flex-1 w-full">
          <div className="lg:col-span-4 mb-8 lg:mb-0">
            <div className="h-96 bg-white border border-zinc-200 rounded-sm skeleton-shimmer" />
          </div>
          <div className="lg:col-span-8 space-y-6">
            <div className="h-28 bg-white border border-zinc-200 rounded-sm skeleton-shimmer" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="h-64 bg-white border border-zinc-200 rounded-sm skeleton-shimmer" />
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (notFound || !profile) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md w-full bg-white border border-zinc-200 rounded-sm p-8 shadow-sm space-y-5">
          <div className="flex justify-center">
            <NotFoundIllustration className="w-64 h-48" />
          </div>
          <div>
            <h2 className="text-xl font-black text-zinc-950">Mind-Shelf Not Located</h2>
            <p className="text-xs text-zinc-500 font-medium mt-1">
              The handle <strong className="text-zinc-800">@{handle}</strong> does not exist in our blueprint matrix or hasn't been claimed yet.
            </p>
          </div>
          <button 
            onClick={onBack} 
            className="w-full py-3 bg-zinc-950 text-white font-bold text-xs rounded-sm hover:bg-zinc-800 transition-all cursor-pointer active:scale-95 shadow-sm"
          >
            Back to Discovery Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-black selection:text-white relative overflow-x-hidden animate-fade-in flex flex-col justify-between">

      {/* Floating Navigation Header */}
      <header className="sticky top-4 z-50 w-full px-4 sm:px-6 max-w-7xl mx-auto pointer-events-none mb-4 sm:mb-6">
        <div className="relative flex h-16 items-center justify-between px-4 sm:px-6 bg-white/90 backdrop-blur-md border border-zinc-200 rounded-sm shadow-sm pointer-events-auto transition-all duration-300">

          {/* Left Navigation Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-black transition-colors cursor-pointer bg-zinc-100/90 hover:bg-zinc-200/80 px-3.5 py-2 rounded-sm border border-zinc-200/60 group"
            >
              <ArrowLeft className="h-3.5 w-3.5 text-zinc-900 group-hover:-translate-x-1 transition-transform" />
              <span className="hidden sm:inline font-sans">Back to Home</span>
              <span className="sm:hidden font-sans">Back</span>
            </button>

            <div className="hidden lg:flex items-center gap-4 text-xs font-semibold text-slate-500">
              <span className="text-zinc-300">•</span>
              <a href="#shelf-main" className="hover:text-black transition-colors">Mind-Shelf</a>
            </div>
          </div>

          {/* Logo (Center) */}
          <div
            onClick={onBack}
            className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 cursor-pointer group"
          >
            <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 font-sans select-none group-hover:opacity-80 transition-opacity">
              blueprint<span className="text-zinc-400 font-medium">.id</span>
            </span>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-zinc-100/90 border border-zinc-200 rounded-sm text-xs font-bold text-zinc-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-slate-800 font-sans">@{profile.handle}</span>
            </div>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 rounded-sm bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 transition-all active:scale-95 shadow-sm cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <ShareNetwork className="h-3.5 w-3.5" />
                  <span>Share Shelf</span>
                </>
              )}
            </button>
          </div>

        </div>
      </header>

      {/* Main 2-Column Grid */}
      <main className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pt-6 sm:pt-10 pb-28 lg:grid lg:grid-cols-12 lg:gap-10 items-start relative z-10 flex-1 w-full" id="shelf-main">

        {/* Sticky Profile Sidebar */}
        <div className="lg:col-span-4 mb-8 lg:mb-0">
          <ProfileHeader
            profile={profile}
            itemCount={total}
            copied={copied}
            onShare={handleShare}
            isFollowing={isFollowing}
            onToggleFollow={toggleFollow}
          />
        </div>

        {/* Shelf Content */}
        <div className="lg:col-span-8 space-y-8">

          {/* Header Bar & Filter Controls */}
          <div className="bg-white border border-zinc-200 p-6 sm:p-8 shadow-xs relative z-30 rounded-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200">
              <div>
                <h2 className="text-base sm:text-lg font-black tracking-tight text-zinc-950 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-black" />
                  The Blueprint of My Mind
                </h2>
                <p className="text-xs text-zinc-500 font-medium mt-1">
                  Curated mental models, foundational systems, and essential guides.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold tracking-wider bg-zinc-100 text-zinc-700 border border-zinc-200 px-3 py-1 rounded-sm">
                  {total} Total Items
                </span>
              </div>
            </div>

            {/* Filters & Search */}
            <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between gap-3">

              {/* Dropdown Filters Container */}
              <div className="flex flex-wrap items-center gap-2">

                {/* Category Dropdown */}
                <div className="relative" ref={categoryRef}>
                  <button
                    onClick={() => { setIsCategoryOpen(!isCategoryOpen); setIsKindOpen(false); setIsTagOpen(false); }}
                    className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-sm text-xs font-bold transition-all cursor-pointer border shadow-2xs ${
                      activeCategory !== "all"
                        ? "bg-black text-white border-black"
                        : "bg-zinc-50 hover:bg-zinc-100 text-zinc-800 border-zinc-200"
                    }`}
                  >
                    <Funnel className={`h-3.5 w-3.5 ${activeCategory !== "all" ? "text-white" : "text-zinc-500"}`} />
                    <span>
                      {activeCategory === "all" ? "Category: All" : categories.find(c => c.id === activeCategory)?.label}
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
                              setActiveCategory(cat.id);
                              setPage(1);
                              setIsCategoryOpen(false);
                            }}
                            className={`w-full text-left px-3.5 py-2 text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                              activeCategory === cat.id ? "bg-zinc-100 text-black font-bold" : "text-zinc-600 hover:bg-zinc-50 hover:text-black"
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              {activeCategory === cat.id && <Check className="h-3.5 w-3.5 text-black" />}
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
                      activeKind !== "all"
                        ? "bg-black text-white border-black"
                        : "bg-zinc-50 hover:bg-zinc-100 text-zinc-800 border-zinc-200"
                    }`}
                  >
                    {activeKind !== "all" ? (
                      <ResourceKindIcon kind={activeKind as ResourceKind} className="h-3.5 w-3.5 text-white" />
                    ) : (
                      <Funnel className="h-3.5 w-3.5 text-zinc-500" />
                    )}
                    <span>
                      {activeKind === "all" ? "Kind: All" : kinds.find(k => k.id === activeKind)?.label}
                    </span>
                    <CaretDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isKindOpen ? "rotate-180" : ""}`} />
                  </button>

                  {isKindOpen && (
                    <div className="absolute top-full left-0 mt-1.5 w-48 bg-white border border-zinc-200 rounded-sm shadow-xl z-50 py-1.5 overflow-hidden animate-in fade-in slide-in-from-top-1">
                      <div className="px-3.5 py-2 text-[10px] font-bold capitalize tracking-wider text-zinc-400 border-b border-zinc-100">
                        Filter by kind
                      </div>
                      <div className="max-h-56 overflow-y-auto py-1">
                        {kinds.map((kind) => (
                          <button
                            key={kind.id}
                            onClick={() => {
                              setActiveKind(kind.id);
                              setPage(1);
                              setIsKindOpen(false);
                            }}
                            className={`w-full text-left px-3.5 py-2 text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                              activeKind === kind.id ? "bg-zinc-100 text-black font-bold" : "text-zinc-600 hover:bg-zinc-50 hover:text-black"
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              {activeKind === kind.id && <Check className="h-3.5 w-3.5 text-black" />}
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
                            onClick={(e) => { e.stopPropagation(); setActiveTag("all"); setPage(1); }}
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
                            setPage(1);
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
                              setPage(1);
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
                      setActiveCategory("all");
                      setActiveKind("all");
                      setActiveTag("all");
                      setSearchQuery("");
                      setPage(1);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-sm text-xs font-bold text-zinc-500 hover:text-black hover:bg-zinc-100 transition-all cursor-pointer"
                  >
                    <X className="h-3.5 w-3.5" />
                    <span>Reset</span>
                  </button>
                )}

              </div>

              {/* Search Bar Input */}
              <div className="relative shrink-0 md:w-52 mt-2 md:mt-0">
                <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search items..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setPage(1);
                  }}
                  className="w-full bg-zinc-50 border border-zinc-200 focus:border-black rounded-sm pl-9 pr-3 py-2 text-xs text-zinc-900 font-semibold placeholder-zinc-400 outline-none transition-colors"
                />
              </div>

            </div>
          </div>

          {/* Cards shelf layout */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="h-64 bg-white border border-zinc-200 rounded-sm skeleton-shimmer" />
              ))}
            </div>
          ) : items.length > 0 ? (
            <div className="space-y-6">
              {/* Server-Side Pagination Bar (Top) */}
              <Pagination
                page={page}
                pages={pages}
                total={total}
                limit={limit}
                onPageChange={(p) => {
                  setPage(p);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onLimitChange={(l) => {
                  setLimit(l);
                  setPage(1);
                }}
              />

              <div className="columns-1 md:columns-2 gap-6">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="mb-6 break-inside-avoid"
                    style={item.size === "large" ? { columnSpan: "all" } : undefined}
                  >
                    <CurationCard
                      item={item}
                      isSaved={!!savedItems[item.id]}
                      onToggleSave={toggleSave}
                      onTagClick={(tag) => { setActiveTag(tag); setPage(1); }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white border border-zinc-200 p-10 sm:p-12 text-center rounded-sm space-y-4 flex flex-col items-center">
              <EmptyShelfIllustration className="w-48 h-40" />
              <div>
                <h3 className="text-sm font-black text-zinc-900">No Mind-Shelf Items Found</h3>
                <p className="text-zinc-500 text-xs font-medium mt-1">No recommendations match your active filter criteria.</p>
              </div>
              <button
                onClick={() => { setActiveCategory("all"); setActiveKind("all"); setActiveTag("all"); setSearchQuery(""); setPage(1); }}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-bold text-xs rounded-sm transition-colors cursor-pointer border border-zinc-200"
              >
                Reset All Filters
              </button>
            </div>
          )}

        </div>

      </main>

      <Footer onViewProfile={() => window.scrollTo({ top: 0, behavior: "smooth" })} onGoHome={onBack} />

    </div>
  );
}
