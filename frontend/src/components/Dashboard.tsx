import { useState, useMemo } from "react";
import {
  Plus,
  PencilSimple,
  Trash,
  Eye,
  Heart,
  TrendUp,
  SlidersHorizontal,
  ShareNetwork,
  ArrowSquareOut,
  Check,
  X,
  Sparkle,
  BookOpen,
  Plugs,
  ChartLineUp,
  User,
  SealCheck,
  ArrowLeft,
  Funnel,
  MagnifyingGlass,
  Star,
  Globe,
  LockSimple,
  Copy,
  YoutubeLogo,
  TwitterLogo,
  BookBookmark
} from "@phosphor-icons/react";
import type { CurationItem } from "./CurationCard";

interface DashboardProps {
  onViewProfile: () => void;
  onGoHome: () => void;
}

export default function Dashboard({ onViewProfile, onGoHome }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<"items" | "analytics" | "settings" | "integrations">("items");
  const [copied, setCopied] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CurationItem | null>(null);

  // Filters state for items manager
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Sample Curation Items state
  const [items, setItems] = useState<CurationItem[]>([
    {
      id: "book-ddia",
      type: "book",
      title: "Designing Data-Intensive Applications",
      author: "Martin Kleppmann",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400",
      description: "The absolute bible for understanding distributed systems, database architectures, and engineering trade-offs.",
      impact: "This book completely re-wired my brain. It taught me how to think in terms of databases, scale, and trade-offs.",
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
      impact: "Keeps me aware of new tech stacks and programming trends in a fraction of the time.",
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
      impact: "His episodes on dopamine scheduling and morning sunlight dramatically improved my focus.",
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
      description: "Foundational essay arguing why companies should use well-understood tech stacks.",
      impact: "Saved me from countless unnecessary rewrites and hyped frameworks.",
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
      description: "Silicon Valley investor sharing insights on wealth, happiness, and leverage.",
      impact: "His thoughts on building productized leverage shaped my entire career path.",
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
      description: "Ten rules detailing why good design is minimalist, honest, and unobtrusive.",
      impact: "Good design is as little design as possible. This rule drives every UI I build.",
      tags: ["#UIUX", "#Minimalism", "#DesignSystem"],
      link: "https://www.vitsoe.com/gb/about/dieter-rams",
      size: "medium",
    }
  ]);

  // Featured / pinned items state
  const [pinnedItemIds, setPinnedItemIds] = useState<Record<string, boolean>>({ "book-ddia": true });

  // Form State for Add/Edit Modal
  const [formData, setFormData] = useState({
    title: "",
    type: "book",
    creator: "",
    link: "",
    description: "",
    impact: "",
    tags: "",
    image: ""
  });

  // User Handle Settings State
  const [handleSettings, setHandleSettings] = useState({
    handle: "@technomad23",
    displayName: "Alex Rivera",
    bio: "Building tools for builders. Shaped by systems engineering, design history, and philosophical essays.",
    location: "San Francisco, CA",
    skills: "TypeScript • Rust • Distributed Systems",
    isVerified: true,
    isPublic: true
  });

  const handleShare = () => {
    setCopied(true);
    navigator.clipboard.writeText("https://blueprint.id/" + handleSettings.handle);
    setTimeout(() => setCopied(false), 2000);
  };

  const togglePin = (id: string) => {
    setPinnedItemIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDeleteItem = (id: string) => {
    if (confirm("Are you sure you want to remove this item from your mind-shelf?")) {
      setItems(prev => prev.filter(i => i.id !== id));
    }
  };

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      type: "book",
      creator: "",
      link: "",
      description: "",
      impact: "",
      tags: "#Systems, #Engineering",
      image: ""
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (item: CurationItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      type: item.type,
      creator: item.author || item.creator || item.host || item.handle || "",
      link: item.link,
      description: item.description,
      impact: item.impact,
      tags: item.tags.join(", "),
      image: item.image || ""
    });
    setIsAddModalOpen(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.link) return;

    const parsedTags = formData.tags
      .split(",")
      .map(t => t.trim())
      .filter(t => t.length > 0)
      .map(t => t.startsWith("#") ? t : `#${t}`);

    if (editingItem) {
      setItems(prev => prev.map(i => {
        if (i.id === editingItem.id) {
          return {
            ...i,
            title: formData.title,
            type: formData.type as any,
            author: formData.creator,
            creator: formData.creator,
            link: formData.link,
            description: formData.description,
            impact: formData.impact,
            tags: parsedTags.length > 0 ? parsedTags : i.tags,
            image: formData.image || i.image
          };
        }
        return i;
      }));
    } else {
      const newItem: CurationItem = {
        id: "item-" + Date.now(),
        title: formData.title,
        type: formData.type as any,
        author: formData.creator,
        creator: formData.creator,
        link: formData.link,
        description: formData.description || "Curated resource recommendation.",
        impact: formData.impact || "Essential reference material.",
        tags: parsedTags.length > 0 ? parsedTags : ["#Curated"],
        size: "medium"
      };
      setItems(prev => [newItem, ...prev]);
    }

    setIsAddModalOpen(false);
  };

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesCategory = filterCategory === "all" || item.type.toLowerCase() === filterCategory.toLowerCase();
      const matchesSearch = searchQuery === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [items, filterCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-black selection:text-white flex flex-col justify-between animate-fade-in relative">
      
      {/* Floating Minimal Navbar Bar */}
      <header className="sticky top-4 z-40 w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pointer-events-none mb-6">
        <div className="relative flex h-16 items-center justify-between px-4 sm:px-6 bg-white/85 backdrop-blur-md border border-zinc-200/80 rounded-sm shadow-sm pointer-events-auto transition-all duration-300">
          
          {/* Left Actions */}
          <div className="flex items-center gap-3">
            <button 
              onClick={onGoHome}
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-black transition-colors cursor-pointer bg-zinc-100/90 hover:bg-zinc-200/80 px-3.5 py-1.5 rounded-sm border border-zinc-200/60 group"
            >
              <ArrowLeft className="h-3.5 w-3.5 text-zinc-900 group-hover:-translate-x-1 transition-transform" />
              <span className="hidden sm:inline font-sans">Home</span>
            </button>

            <span className="text-zinc-300 hidden sm:inline">•</span>

            <div className="flex items-center gap-1 bg-zinc-100 p-0.5 rounded-sm border border-zinc-200 text-xs font-bold">
              <button
                onClick={() => setActiveTab("items")}
                className={`px-3 py-1 rounded-sm transition-all cursor-pointer ${
                  activeTab === "items" ? "bg-black text-white" : "text-zinc-600 hover:text-black"
                }`}
              >
                Shelf ({items.length})
              </button>
              <button
                onClick={() => setActiveTab("analytics")}
                className={`px-3 py-1 rounded-sm transition-all cursor-pointer ${
                  activeTab === "analytics" ? "bg-black text-white" : "text-zinc-600 hover:text-black"
                }`}
              >
                Analytics
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`px-3 py-1 rounded-sm transition-all cursor-pointer ${
                  activeTab === "settings" ? "bg-black text-white" : "text-zinc-600 hover:text-black"
                }`}
              >
                Settings
              </button>
              <button
                onClick={() => setActiveTab("integrations")}
                className={`px-3 py-1 rounded-sm transition-all cursor-pointer ${
                  activeTab === "integrations" ? "bg-black text-white" : "text-zinc-600 hover:text-black"
                }`}
              >
                Integrations
              </button>
            </div>
          </div>

          {/* Logo (Center) */}
          <div className="hidden lg:flex items-center gap-2 cursor-pointer" onClick={onGoHome}>
            <span className="text-base font-bold tracking-tight text-slate-900 font-sans select-none">
              blueprint<span className="text-zinc-400 font-medium">.id</span>
            </span>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onViewProfile}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-700 bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 px-3 py-1.5 rounded-sm transition-all cursor-pointer"
            >
              <Eye className="h-3.5 w-3.5 text-zinc-900" />
              <span className="hidden sm:inline">Preview Shelf</span>
            </button>

            <button
              onClick={handleOpenAddModal}
              className="inline-flex items-center gap-1.5 rounded-sm bg-slate-900 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-slate-800 transition-all hover:scale-105 active:scale-95 shadow-md shadow-slate-950/10 cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Influence</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Dashboard Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-2 pb-24 relative z-10 flex-1 w-full space-y-6">
        
        {/* KPI Overview Summary Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          
          <div className="bg-white border border-zinc-200 p-5 rounded-sm shadow-2xs">
            <div className="flex justify-between items-center text-zinc-500 mb-2">
              <span className="text-xs font-bold capitalize tracking-wider">Total shelf views</span>
              <Eye className="h-4 w-4 text-zinc-400" />
            </div>
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-extrabold text-zinc-950">12,480</h3>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-sm flex items-center gap-1">
                <TrendUp className="h-3 w-3" /> +14%
              </span>
            </div>
          </div>

          <div className="bg-white border border-zinc-200 p-5 rounded-sm shadow-2xs">
            <div className="flex justify-between items-center text-zinc-500 mb-2">
              <span className="text-xs font-bold capitalize tracking-wider">Community saves</span>
              <Heart className="h-4 w-4 text-zinc-400" />
            </div>
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-extrabold text-zinc-950">1,890</h3>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-sm flex items-center gap-1">
                <TrendUp className="h-3 w-3" /> +8%
              </span>
            </div>
          </div>

          <div className="bg-white border border-zinc-200 p-5 rounded-sm shadow-2xs">
            <div className="flex justify-between items-center text-zinc-500 mb-2">
              <span className="text-xs font-bold capitalize tracking-wider">Curator score</span>
              <Sparkle className="h-4 w-4 text-amber-500 fill-amber-500" />
            </div>
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-extrabold text-zinc-950">99.8%</h3>
              <span className="text-[10px] font-bold text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded-sm">
                Top 1%
              </span>
            </div>
          </div>

          <div className="bg-white border border-zinc-200 p-5 rounded-sm shadow-2xs">
            <div className="flex justify-between items-center text-zinc-500 mb-2">
              <span className="text-xs font-bold capitalize tracking-wider">Active items</span>
              <BookOpen className="h-4 w-4 text-zinc-400" />
            </div>
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-extrabold text-zinc-950">{items.length}</h3>
              <span className="text-[10px] font-bold text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded-sm">
                6 Categories
              </span>
            </div>
          </div>

        </div>

        {/* TAB 1: CURATIONS MANAGER */}
        {activeTab === "items" && (
          <div className="bg-white border border-zinc-200 p-6 rounded-sm shadow-2xs space-y-6">
            
            {/* Header & Filter Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200">
              <div>
                <h2 className="text-base font-black text-zinc-950 flex items-center gap-2">
                  <SlidersHorizontal className="h-4.5 w-4.5 text-black" />
                  Manage Mind-Shelf Items
                </h2>
                <p className="text-xs text-zinc-500 font-semibold mt-1">
                  Add, edit, pin featured items, and manage public visibility.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleOpenAddModal}
                  className="inline-flex items-center gap-1.5 rounded-sm bg-black px-4 py-2 text-xs font-bold text-white hover:bg-zinc-900 transition-all cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>New Item</span>
                </button>
              </div>
            </div>

            {/* Filter Pills & Search */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
                <Funnel className="h-3.5 w-3.5 text-zinc-400 mr-1 shrink-0" />
                {["all", "book", "youtube", "podcast", "essay", "x", "design"].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setFilterCategory(cat)}
                    className={`px-3 py-1 rounded-sm text-xs font-bold capitalize transition-all cursor-pointer whitespace-nowrap ${
                      filterCategory === cat
                        ? "bg-black text-white"
                        : "bg-zinc-100 text-zinc-600 hover:text-black hover:bg-zinc-200/60"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative shrink-0 w-full sm:w-56">
                <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search shelf items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 focus:border-black rounded-sm pl-8 pr-3 py-1.5 text-xs text-zinc-900 font-semibold placeholder-zinc-400 outline-none transition-colors"
                />
              </div>
            </div>

            {/* Items Table / Grid List */}
            <div className="divide-y divide-zinc-200 border border-zinc-200 rounded-sm overflow-hidden">
              {filteredItems.length > 0 ? (
                filteredItems.map(item => {
                  const isPinned = !!pinnedItemIds[item.id];
                  return (
                    <div
                      key={item.id}
                      className="p-4 bg-white hover:bg-zinc-50/80 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-start gap-3.5">
                        <div className="h-10 w-10 shrink-0 border border-zinc-200 bg-zinc-100 rounded-sm flex items-center justify-center font-bold text-xs capitalize text-zinc-700">
                          {item.type.substring(0, 2)}
                        </div>

                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="text-sm font-extrabold text-zinc-950">{item.title}</h4>
                            {isPinned && (
                              <span className="text-[9px] font-bold bg-amber-100 text-amber-900 border border-amber-200 px-2 py-0.5 rounded-sm inline-flex items-center gap-1">
                                <Star className="h-3 w-3 fill-amber-500 text-amber-500" /> Featured
                              </span>
                            )}
                            <span className="text-[9px] font-bold bg-zinc-100 text-zinc-600 border border-zinc-200 px-2 py-0.5 rounded-sm capitalize">
                              {item.type}
                            </span>
                          </div>

                          <p className="text-xs text-zinc-500 font-medium mt-1 line-clamp-1">
                            {item.description}
                          </p>

                          <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                            {item.tags.map(t => (
                              <span key={t} className="text-[9px] font-bold text-zinc-400 bg-zinc-50 border border-zinc-200 px-1.5 py-0.5 rounded-sm">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Item Actions */}
                      <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                        <button
                          onClick={() => togglePin(item.id)}
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
                          onClick={() => handleOpenEditModal(item)}
                          className="p-2 rounded-sm bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer"
                          title="Edit item"
                        >
                          <PencilSimple className="h-3.5 w-3.5" />
                        </button>

                        <button
                          onClick={() => handleDeleteItem(item.id)}
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
                  No curation items match your search filter.
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB 2: ANALYTICS & INSIGHTS */}
        {activeTab === "analytics" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Category Distribution & Performance */}
              <div className="lg:col-span-7 bg-white border border-zinc-200 p-6 rounded-sm shadow-2xs space-y-6">
                <div>
                  <h3 className="text-sm font-black text-zinc-950 flex items-center gap-2">
                    <ChartLineUp className="h-4.5 w-4.5 text-black" />
                    Influence Category Breakdown
                  </h3>
                  <p className="text-xs text-zinc-500 font-semibold mt-1">
                    Distribution of your recommendations across media types.
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  <div>
                    <div className="flex justify-between text-xs font-bold text-zinc-700 mb-1">
                      <span>Books & Literature</span>
                      <span>35% (4.2k views)</span>
                    </div>
                    <div className="w-full bg-zinc-100 h-2 rounded-sm overflow-hidden">
                      <div className="bg-black h-full w-[35%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-zinc-700 mb-1">
                      <span>Technical Essays</span>
                      <span>25% (3.1k views)</span>
                    </div>
                    <div className="w-full bg-zinc-100 h-2 rounded-sm overflow-hidden">
                      <div className="bg-zinc-800 h-full w-[25%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-zinc-700 mb-1">
                      <span>YouTube & Video Tutorials</span>
                      <span>20% (2.5k views)</span>
                    </div>
                    <div className="w-full bg-zinc-100 h-2 rounded-sm overflow-hidden">
                      <div className="bg-zinc-600 h-full w-[20%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-zinc-700 mb-1">
                      <span>Podcasts & Audio</span>
                      <span>12% (1.5k views)</span>
                    </div>
                    <div className="w-full bg-zinc-100 h-2 rounded-sm overflow-hidden">
                      <div className="bg-zinc-400 h-full w-[12%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-zinc-700 mb-1">
                      <span>Design Principles</span>
                      <span>8% (1.1k views)</span>
                    </div>
                    <div className="w-full bg-zinc-100 h-2 rounded-sm overflow-hidden">
                      <div className="bg-zinc-300 h-full w-[8%]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Top Performing Items Leaderboard */}
              <div className="lg:col-span-5 bg-white border border-zinc-200 p-6 rounded-sm shadow-2xs space-y-4">
                <div>
                  <h3 className="text-sm font-black text-zinc-950 flex items-center gap-2">
                    <TrendUp className="h-4.5 w-4.5 text-black" />
                    Top Performing Recommendations
                  </h3>
                  <p className="text-xs text-zinc-500 font-semibold mt-1">
                    Most saved and referenced recommendations on your shelf.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-sm flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-extrabold text-zinc-900">Designing Data-Intensive Applications</h4>
                      <span className="text-[10px] text-zinc-500 font-semibold">412 Saves • 3.2k Views</span>
                    </div>
                    <span className="text-xs font-extrabold text-black bg-white border border-zinc-200 px-2 py-1 rounded-sm">
                      #1
                    </span>
                  </div>

                  <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-sm flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-extrabold text-zinc-900">Choose Boring Technology</h4>
                      <span className="text-[10px] text-zinc-500 font-semibold">289 Saves • 2.1k Views</span>
                    </div>
                    <span className="text-xs font-extrabold text-black bg-white border border-zinc-200 px-2 py-1 rounded-sm">
                      #2
                    </span>
                  </div>

                  <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-sm flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-extrabold text-zinc-900">Naval Ravikant (@naval)</h4>
                      <span className="text-[10px] text-zinc-500 font-semibold">245 Saves • 1.9k Views</span>
                    </div>
                    <span className="text-xs font-extrabold text-black bg-white border border-zinc-200 px-2 py-1 rounded-sm">
                      #3
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 3: PROFILE & HANDLE SETTINGS */}
        {activeTab === "settings" && (
          <div className="bg-white border border-zinc-200 p-6 rounded-sm shadow-2xs max-w-3xl space-y-6">
            <div>
              <h3 className="text-base font-black text-zinc-950 flex items-center gap-2">
                <User className="h-4.5 w-4.5 text-black" />
                Handle & Profile Settings
              </h3>
              <p className="text-xs text-zinc-500 font-semibold mt-1">
                Customize your public handle, bio statement, and verification status.
              </p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); alert("Profile settings saved successfully!"); }} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">Display Name</label>
                  <input
                    type="text"
                    value={handleSettings.displayName}
                    onChange={(e) => setHandleSettings({ ...handleSettings, displayName: e.target.value })}
                    className="w-full bg-zinc-50 border border-zinc-200 focus:border-black rounded-sm px-3 py-2 text-xs font-semibold text-zinc-900 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">Public Handle</label>
                  <div className="flex">
                    <span className="bg-zinc-100 border border-r-0 border-zinc-200 rounded-l-sm px-3 py-2 text-xs font-bold text-zinc-500">
                      blueprint.id/
                    </span>
                    <input
                      type="text"
                      value={handleSettings.handle}
                      onChange={(e) => setHandleSettings({ ...handleSettings, handle: e.target.value })}
                      className="w-full bg-zinc-50 border border-zinc-200 focus:border-black rounded-r-sm px-3 py-2 text-xs font-bold text-zinc-900 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">Bio / Thesis Statement</label>
                <textarea
                  rows={3}
                  value={handleSettings.bio}
                  onChange={(e) => setHandleSettings({ ...handleSettings, bio: e.target.value })}
                  className="w-full bg-zinc-50 border border-zinc-200 focus:border-black rounded-sm p-3 text-xs font-medium text-zinc-900 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={handleSettings.location}
                    onChange={(e) => setHandleSettings({ ...handleSettings, location: e.target.value })}
                    className="w-full bg-zinc-50 border border-zinc-200 focus:border-black rounded-sm px-3 py-2 text-xs font-semibold text-zinc-900 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">Key Focus / Domains</label>
                  <input
                    type="text"
                    value={handleSettings.skills}
                    onChange={(e) => setHandleSettings({ ...handleSettings, skills: e.target.value })}
                    className="w-full bg-zinc-50 border border-zinc-200 focus:border-black rounded-sm px-3 py-2 text-xs font-semibold text-zinc-900 outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-700 bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 px-4 py-2 rounded-sm transition-all cursor-pointer"
                >
                  <Copy className="h-3.5 w-3.5" />
                  <span>{copied ? "Copied Handle URL!" : "Copy Handle Link"}</span>
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 rounded-sm bg-black px-5 py-2 text-xs font-bold text-white hover:bg-zinc-900 transition-all cursor-pointer"
                >
                  <Check className="h-3.5 w-3.5" />
                  <span>Save Profile Settings</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 4: INTEGRATIONS */}
        {activeTab === "integrations" && (
          <div className="bg-white border border-zinc-200 p-6 rounded-sm shadow-2xs space-y-6">
            <div>
              <h3 className="text-base font-black text-zinc-950 flex items-center gap-2">
                <Plugs className="h-4.5 w-4.5 text-black" />
                Integrations & Sync Feeds
              </h3>
              <p className="text-xs text-zinc-500 font-semibold mt-1">
                Auto-import highlights, bookmarks, and playlists from your favorite platforms.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div className="p-4 border border-zinc-200 rounded-sm bg-zinc-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <BookBookmark className="h-6 w-6 text-amber-600" />
                  <div>
                    <h4 className="text-xs font-extrabold text-zinc-900">Kindle / Readwise</h4>
                    <p className="text-[10px] text-zinc-500 font-semibold">Auto-sync top book highlights</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 border border-emerald-200 px-2 py-1 rounded-sm">
                  Connected
                </span>
              </div>

              <div className="p-4 border border-zinc-200 rounded-sm bg-zinc-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <YoutubeLogo className="h-6 w-6 text-red-600" />
                  <div>
                    <h4 className="text-xs font-extrabold text-zinc-900">YouTube Playlists</h4>
                    <p className="text-[10px] text-zinc-500 font-semibold">Sync public video bookmarks</p>
                  </div>
                </div>
                <button className="text-[10px] font-bold text-zinc-700 bg-white border border-zinc-200 px-3 py-1 rounded-sm hover:bg-zinc-100 cursor-pointer">
                  Connect
                </button>
              </div>

              <div className="p-4 border border-zinc-200 rounded-sm bg-zinc-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <TwitterLogo className="h-6 w-6 text-sky-500" />
                  <div>
                    <h4 className="text-xs font-extrabold text-zinc-900">Twitter / X Bookmarks</h4>
                    <p className="text-[10px] text-zinc-500 font-semibold">Import saved tweet threads</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 border border-emerald-200 px-2 py-1 rounded-sm">
                  Connected
                </span>
              </div>

              <div className="p-4 border border-zinc-200 rounded-sm bg-zinc-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Globe className="h-6 w-6 text-indigo-600" />
                  <div>
                    <h4 className="text-xs font-extrabold text-zinc-900">Custom RSS / Substack</h4>
                    <p className="text-[10px] text-zinc-500 font-semibold">Publish newsletter essays</p>
                  </div>
                </div>
                <button className="text-[10px] font-bold text-zinc-700 bg-white border border-zinc-200 px-3 py-1 rounded-sm hover:bg-zinc-100 cursor-pointer">
                  Connect
                </button>
              </div>

            </div>
          </div>
        )}

      </main>

      {/* ADD / EDIT ITEM MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border border-zinc-200 w-full max-w-lg rounded-sm shadow-2xl overflow-hidden">
            
            <div className="p-4 border-b border-zinc-200 flex items-center justify-between bg-zinc-50">
              <h3 className="text-xs font-black uppercase tracking-wider text-zinc-900 flex items-center gap-2">
                <Plus className="h-4 w-4" />
                {editingItem ? "Edit Mind-Shelf Influence" : "Add New Influence"}
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-zinc-400 hover:text-black p-1 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">Item Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Designing Data-Intensive Applications"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-zinc-50 border border-zinc-200 focus:border-black rounded-sm px-3 py-2 text-xs font-semibold outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">Category Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full bg-zinc-50 border border-zinc-200 focus:border-black rounded-sm px-3 py-2 text-xs font-semibold outline-none capitalize"
                  >
                    <option value="book">Book</option>
                    <option value="youtube">Video / Youtube</option>
                    <option value="podcast">Podcast</option>
                    <option value="essay">Essay / Article</option>
                    <option value="x">Twitter / X</option>
                    <option value="design">Design Rule</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">Author / Creator</label>
                  <input
                    type="text"
                    placeholder="e.g. Martin Kleppmann"
                    value={formData.creator}
                    onChange={(e) => setFormData({ ...formData, creator: e.target.value })}
                    className="w-full bg-zinc-50 border border-zinc-200 focus:border-black rounded-sm px-3 py-2 text-xs font-semibold outline-none"
                  />
                </div>
              </div>

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
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">Brief Description</label>
                <textarea
                  rows={2}
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

              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">Tags (Comma-separated)</label>
                <input
                  type="text"
                  placeholder="#Systems, #Databases, #Backend"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="w-full bg-zinc-50 border border-zinc-200 focus:border-black rounded-sm px-3 py-2 text-xs font-semibold outline-none"
                />
              </div>

              <div className="pt-4 border-t border-zinc-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-zinc-600 hover:text-black transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-black text-white hover:bg-zinc-900 rounded-sm transition-all cursor-pointer"
                >
                  {editingItem ? "Update Influence" : "Add to Mind-Shelf"}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
