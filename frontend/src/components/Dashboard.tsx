import { useState, useMemo } from "react";
import { X } from "@phosphor-icons/react";

import type { CurationItem, DashboardTab, HandleSettings } from "../types";

// Modular Dashboard Subcomponents
import Sidebar from "./dashboard/Sidebar";
import Header from "./dashboard/Header";
import KpiCards from "./dashboard/KpiCards";
import ManageShelfTab from "./dashboard/ManageShelfTab";
import AnalyticsTab from "./dashboard/AnalyticsTab";
import SettingsTab from "./dashboard/SettingsTab";
import IntegrationsTab from "./dashboard/IntegrationsTab";

// Modular Modals
import ItemModal from "./modals/ItemModal";
import DeleteModal from "./modals/DeleteModal";
import IntegrationModal from "./modals/IntegrationModal";

interface DashboardProps {
  onViewProfile: () => void;
  onGoHome: () => void;
  onLogout?: () => void;
}

export default function Dashboard({ onViewProfile, onGoHome, onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<DashboardTab>("items");
  const [copied, setCopied] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CurationItem | null>(null);
  const [itemToDelete, setItemToDelete] = useState<CurationItem | null>(null);
  const [connectingIntegration, setConnectingIntegration] = useState<{ id: string; name: string } | null>(null);
  const [integrationInput, setIntegrationInput] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Filters state
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [activeTag, setActiveTag] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isTagOpen, setIsTagOpen] = useState(false);

  const triggerSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 3500);
  };

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

  const [pinnedItemIds, setPinnedItemIds] = useState<Record<string, boolean>>({ "book-ddia": true });

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

  const [handleSettings, setHandleSettings] = useState<HandleSettings>({
    handle: "@technomad23",
    displayName: "Alex Rivera",
    bio: "Building tools for builders. Shaped by systems engineering, design history, and philosophical essays.",
    location: "San Francisco, CA",
    skills: "TypeScript • Rust • Distributed Systems",
    isVerified: true,
    isPublic: true
  });

  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    items.forEach(item => {
      item.tags.forEach(t => tagsSet.add(t));
    });
    return Array.from(tagsSet).sort();
  }, [items]);

  const handleShare = () => {
    setCopied(true);
    navigator.clipboard.writeText("https://blueprint.id/" + handleSettings.handle);
    triggerSuccess("Copied public handle URL to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const togglePin = (id: string) => {
    setPinnedItemIds(prev => {
      const isNowPinned = !prev[id];
      const targetItem = items.find(i => i.id === id);
      if (targetItem) {
        triggerSuccess(isNowPinned ? `Pinned "${targetItem.title}" as featured!` : `Unpinned "${targetItem.title}"`);
      }
      return { ...prev, [id]: isNowPinned };
    });
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      const title = itemToDelete.title;
      setItems(prev => prev.filter(i => i.id !== itemToDelete.id));
      triggerSuccess(`Successfully removed "${title}" from your shelf.`);
      setItemToDelete(null);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    triggerSuccess("Profile & handle settings saved successfully!");
  };

  const handleConfirmIntegration = (e: React.FormEvent) => {
    e.preventDefault();
    if (connectingIntegration) {
      triggerSuccess(`Successfully connected ${connectingIntegration.name} integration!`);
      setConnectingIntegration(null);
      setIntegrationInput("");
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
      triggerSuccess(`Updated "${formData.title}" details.`);
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
      triggerSuccess(`Added "${formData.title}" to your mind-shelf!`);
    }

    setIsAddModalOpen(false);
  };

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesCategory = filterCategory === "all" || item.type.toLowerCase() === filterCategory.toLowerCase();
      const matchesTag = activeTag === "all" || item.tags.includes(activeTag);
      const matchesSearch = searchQuery === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesTag && matchesSearch;
    });
  }, [items, filterCategory, activeTag, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-black selection:text-white flex flex-col md:flex-row relative">
      
      {/* SIDEBAR NAVIGATION (Desktop Fixed & Mobile Drawer) */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        itemsCount={items.length}
        handleSettings={handleSettings}
        onViewProfile={onViewProfile}
        onGoHome={onGoHome}
        onLogout={onLogout}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* MAIN WORKSPACE VIEWPORT */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Top Workspace Header Bar */}
        <Header
          activeTab={activeTab}
          onViewProfile={onViewProfile}
          onOpenAddModal={handleOpenAddModal}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
        />

        {/* Workspace Body Pane */}
        <main className="p-4 sm:p-6 max-w-7xl mx-auto w-full space-y-6 flex-1">
          
          {/* KPI Summary Cards */}
          <KpiCards totalItems={items.length} />

          {/* TAB CONTENTS */}
          {activeTab === "items" && (
            <ManageShelfTab
              items={items}
              filteredItems={filteredItems}
              filterCategory={filterCategory}
              setFilterCategory={setFilterCategory}
              activeTag={activeTag}
              setActiveTag={setActiveTag}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              allTags={allTags}
              pinnedItemIds={pinnedItemIds}
              onTogglePin={togglePin}
              onOpenAddModal={handleOpenAddModal}
              onOpenEditModal={handleOpenEditModal}
              onRequestDelete={(item) => setItemToDelete(item)}
              isCategoryOpen={isCategoryOpen}
              setIsCategoryOpen={setIsCategoryOpen}
              isTagOpen={isTagOpen}
              setIsTagOpen={setIsTagOpen}
            />
          )}

          {activeTab === "analytics" && (
            <AnalyticsTab />
          )}

          {activeTab === "settings" && (
            <SettingsTab
              handleSettings={handleSettings}
              setHandleSettings={setHandleSettings}
              onSaveProfile={handleSaveProfile}
              onShare={handleShare}
              copied={copied}
            />
          )}

          {activeTab === "integrations" && (
            <IntegrationsTab
              onConnect={(int) => setConnectingIntegration(int)}
            />
          )}

        </main>

      </div>

      {/* MODALS */}
      <ItemModal
        isOpen={isAddModalOpen}
        editingItem={editingItem}
        formData={formData}
        setFormData={setFormData}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveModal}
      />

      <DeleteModal
        item={itemToDelete}
        onClose={() => setItemToDelete(null)}
        onConfirm={confirmDelete}
      />

      <IntegrationModal
        integration={connectingIntegration}
        inputVal={integrationInput}
        setInputVal={setIntegrationInput}
        onClose={() => setConnectingIntegration(null)}
        onConfirm={handleConfirmIntegration}
      />

      {/* TOAST SUCCESS BANNER */}
      {successMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-950 text-white px-4 py-3 rounded-sm shadow-2xl border border-slate-800 flex items-center gap-3 animate-fade-in">
          <div className="h-5 w-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 font-bold text-xs">
            ✓
          </div>
          <span className="text-xs font-bold">{successMessage}</span>
          <button onClick={() => setSuccessMessage(null)} className="text-zinc-400 hover:text-white ml-2 cursor-pointer">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

    </div>
  );
}
