import { useState, useMemo, useRef, useEffect } from "react";
import { ArrowLeft, BookOpen, Funnel, MagnifyingGlass, Sparkle, ShareNetwork, Check, CaretDown, Tag, X } from "@phosphor-icons/react";
import ProfileHeader from "./ProfileHeader";
import CurationCard from "./CurationCard";
import Footer from "./Footer";
import type { CurationItem } from "./CurationCard";

interface HandlePageProps {
  onBack: () => void;
  onViewDashboard?: () => void;
}

export default function HandlePage({ onBack, onViewDashboard }: HandlePageProps) {
  const [copied, setCopied] = useState(false);
  const [savedItems, setSavedItems] = useState<Record<string, boolean>>({});
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeTag, setActiveTag] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isTagOpen, setIsTagOpen] = useState(false);

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
  }, []);

  const handleShare = () => {
    setCopied(true);
    navigator.clipboard.writeText(window.location.href);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleSave = (id: string) => {
    setSavedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const influences: CurationItem[] = [
    {
      id: "book-ddia",
      type: "book",
      title: "Designing Data-Intensive Applications",
      author: "Martin Kleppmann",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400",
      description: "The absolute bible for understanding distributed systems, database architectures, and engineering trade-offs.",
      impact: "This book completely re-wired my brain. It taught me how to think in terms of databases, scale, and trade-offs rather than dogmatic stack choices.",
      tags: ["#Systems", "#Databases", "#Backend"],
      link: "https://dataintensive.net/",
      size: "large",
    },
    {
      id: "yt-fireship",
      type: "youtube",
      title: "Fireship",
      creator: "Jeff Delaney",
      description: "High-intensity code tutorials and tech industry updates in 100 seconds.",
      impact: "Keeps me aware of new tech stacks and programming trends in a fraction of the time. Best paced dev channel on the web.",
      tags: ["#Coding", "#TechTrends"],
      link: "https://www.youtube.com/@Fireship",
      subscribers: "3.1M",
      size: "medium",
    },
    {
      id: "podcast-huberman",
      type: "podcast",
      title: "Huberman Lab",
      host: "Dr. Andrew Huberman",
      description: "Science-backed protocols and tools for high performance, focus, and health.",
      impact: "His episodes on dopamine scheduling, sleep cycles, and morning sunlight dramatically improved my daily developer focus.",
      tags: ["#Biology", "#Focus", "#Habits"],
      link: "https://www.youtube.com/@hubermanlab",
      episodes: "200+",
      size: "medium",
    },
    {
      id: "essay-boring-tech",
      type: "essay",
      title: "Choose Boring Technology",
      author: "Dan McKinley",
      description: "The foundational essay arguing why companies should use well-understood tech stacks to save innovation tokens.",
      impact: "Saved me from countless unnecessary rewrites and hyped frameworks. I evaluate every new dependency through this lens.",
      tags: ["#Architecture", "#Pragmatism"],
      link: "https://mcfunley.com/choose-boring-technology",
      readTime: "12 min read",
      size: "small",
    },
    {
      id: "x-naval",
      type: "x",
      title: "Naval Ravikant",
      handle: "@naval",
      description: "Silicon Valley investor and philosopher sharing insights on wealth, happiness, and leverage.",
      impact: "His thoughts on building productized leverage and compounding specific knowledge shaped my entire career path.",
      tags: ["#Philosophy", "#Startups", "#Leverage"],
      link: "https://x.com/naval",
      followers: "2.3M",
      size: "medium",
    },
    {
      id: "design-rams",
      type: "design",
      title: "Dieter Rams: Ten Principles",
      author: "Braun Design Lead",
      description: "Ten rules detailing why good design is minimalist, honest, aesthetic, and unobtrusive.",
      impact: "Good design is as little design as possible. This rule drives every user interface and component API I build.",
      tags: ["#UIUX", "#Minimalism", "#DesignSystem"],
      link: "https://www.vitsoe.com/gb/about/dieter-rams",
      size: "medium",
    }
  ];

  const categories = [
    { id: "all", label: "All Categories" },
    { id: "book", label: "Books" },
    { id: "youtube", label: "Videos" },
    { id: "podcast", label: "Podcasts" },
    { id: "essay", label: "Essays" },
    { id: "x", label: "Twitter / X" },
    { id: "design", label: "Design" },
  ];

  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    influences.forEach(item => {
      item.tags.forEach(t => tagsSet.add(t));
    });
    return Array.from(tagsSet).sort();
  }, [influences]);

  const filteredInfluences = useMemo(() => {
    return influences.filter(item => {
      const matchesCategory = activeCategory === "all" || item.type.toLowerCase() === activeCategory.toLowerCase();
      const matchesTag = activeTag === "all" || item.tags.includes(activeTag);
      const matchesSearch = searchQuery === "" || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesTag && matchesSearch;
    });
  }, [activeCategory, activeTag, searchQuery]);

  const hasActiveFilters = activeCategory !== "all" || activeTag !== "all" || searchQuery !== "";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-black selection:text-white relative overflow-x-hidden animate-fade-in flex flex-col justify-between">
      
      {/* Floating Navigation Header (Matches Landing Page Pill Navbar with Profile Page Adaptation) */}
      <header className="sticky top-4 z-50 w-full px-4 sm:px-6 max-w-7xl mx-auto pointer-events-none mb-4 sm:mb-6">
        <div className="relative flex h-16 items-center justify-between px-4 sm:px-6 bg-white/85 backdrop-blur-md border border-zinc-200/80 rounded-full shadow-sm pointer-events-auto transition-all duration-300">
          
          {/* Left Navigation Actions */}
          <div className="flex items-center gap-3">
            <button 
              onClick={onBack}
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-black transition-colors cursor-pointer bg-zinc-100/90 hover:bg-zinc-200/80 px-3.5 py-1.5 rounded-full border border-zinc-200/60 group"
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
          
          {/* Logo (Perfect Center) */}
          <div 
            onClick={onBack}
            className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 cursor-pointer group"
          >
            <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 font-sans select-none group-hover:opacity-80 transition-opacity">
              blueprint<span className="text-zinc-400 font-medium">.id</span>
            </span>
          </div>

          {/* Right Actions: Handle Badge, Dashboard & Share CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            {onViewDashboard && (
              <button
                onClick={onViewDashboard}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 rounded-full text-xs font-bold text-zinc-800 transition-all cursor-pointer"
              >
                <span>Dashboard</span>
              </button>
            )}

            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-zinc-100/90 border border-zinc-200 rounded-full text-xs font-bold text-zinc-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-slate-800 font-sans">@technomad23</span>
            </div>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 transition-all hover:scale-105 active:scale-95 shadow-md shadow-slate-950/10 cursor-pointer"
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

      {/* Main 2-Column Desktop Grid (Sidebar Left, Shelf Right) */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-2 pb-24 lg:grid lg:grid-cols-12 lg:gap-8 items-start relative z-10 flex-1 w-full" id="shelf-main">
        
        {/* Left Column: Sticky Profile Sidebar */}
        <div className="lg:col-span-4 mb-8 lg:mb-0">
          <ProfileHeader 
            copied={copied} 
            onShare={handleShare} 
            onBack={onBack} 
          />
        </div>

        {/* Right Column: Mind-Shelf Main Content */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Header Bar & Control Panel */}
          <div className="bg-white border border-zinc-200 p-6 shadow-2xs relative z-30 rounded-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200">
              <div>
                <h2 className="text-sm font-black tracking-wider text-zinc-950 flex items-center gap-2">
                  <BookOpen className="h-4.5 w-4.5 text-black" />
                  The Blueprint of My Mind
                </h2>
                <p className="text-xs text-zinc-500 font-semibold mt-1">
                  Curated mental models, foundational systems, and essential guides.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black tracking-wider bg-zinc-100 text-zinc-700 border border-zinc-200 px-3 py-1 rounded-sm">
                  {filteredInfluences.length} / {influences.length} Items
                </span>
              </div>
            </div>

            {/* Custom Styled Dropdown Filters & Search Input */}
            <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
              
              {/* Dropdown Filters Container */}
              <div className="flex flex-wrap items-center gap-2.5">
                
                {/* Category Dropdown */}
                <div className="relative" ref={categoryRef}>
                  <button
                    onClick={() => { setIsCategoryOpen(!isCategoryOpen); setIsTagOpen(false); }}
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
                    <div className="absolute top-full left-0 mt-1.5 w-48 bg-white border border-zinc-200 rounded-sm shadow-xl z-50 py-1.5 overflow-hidden animate-fade-in">
                      <div className="px-3 py-1.5 text-[10px] font-bold capitalize tracking-wider text-zinc-400 border-b border-zinc-100">
                        Filter category
                      </div>
                      <div className="max-h-56 overflow-y-auto py-1">
                        {categories.map((cat) => {
                          const count = cat.id === "all" 
                            ? influences.length 
                            : influences.filter(i => i.type.toLowerCase() === cat.id.toLowerCase()).length;
                          return (
                            <button
                              key={cat.id}
                              onClick={() => {
                                setActiveCategory(cat.id);
                                setIsCategoryOpen(false);
                              }}
                              className={`w-full text-left px-3.5 py-1.5 text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                                activeCategory === cat.id ? "bg-zinc-100 text-black font-bold" : "text-zinc-600 hover:bg-zinc-50 hover:text-black"
                              }`}
                            >
                              <span className="flex items-center gap-2">
                                {activeCategory === cat.id && <Check className="h-3.5 w-3.5 text-black" />}
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

                {/* Tag Dropdown */}
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
                            {influences.length}
                          </span>
                        </button>
                        {allTags.map((tag) => {
                          const count = influences.filter(i => i.tags.includes(tag)).length;
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
                      setActiveCategory("all");
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
              <div className="relative shrink-0 md:w-48">
                <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Filter shelf..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 focus:border-black rounded-sm pl-8 pr-3 py-2 text-xs text-zinc-900 font-semibold placeholder-zinc-400 outline-none transition-colors"
                />
              </div>

            </div>
          </div>

          {/* Bento Grid shelf layout */}
          {filteredInfluences.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredInfluences.map((item) => (
                <CurationCard
                  key={item.id}
                  item={item}
                  isSaved={!!savedItems[item.id]}
                  onToggleSave={toggleSave}
                  onTagClick={(tag) => setActiveTag(tag)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-zinc-200 p-12 text-center rounded-sm">
              <p className="text-zinc-500 text-xs font-black tracking-wider">No curation items match your filter criteria.</p>
              <button
                onClick={() => { setActiveCategory("all"); setActiveTag("all"); setSearchQuery(""); }}
                className="mt-3 text-xs font-black text-black underline cursor-pointer tracking-wider"
              >
                Reset Filters
              </button>
            </div>
          )}

        </div>

      </main>

      {/* Shared Landing Page Footer */}
      <Footer onViewProfile={() => window.scrollTo({ top: 0, behavior: "smooth" })} onGoHome={onBack} />

    </div>
  );
}




