import { useState, useMemo, useEffect, useCallback } from "react";
import { X } from "@phosphor-icons/react";

import type { CurationItem, DashboardTab, HandleSettings } from "../types";
import {
  getMyProfile,
  getMyItems,
  createItem,
  updateItem,
  deleteItem,
  toggleItemPin,
  updateMyProfile,
  createProfile,
  uploadAvatar,
  uploadBanner,
  getAnalyticsSummary,
  toCurationItem,
  toHandleSettings,
  handleSettingsToPatch,
  ApiError,
  type AnalyticsSummary,
} from "../utils/api";
import ClaimHandleForm from "./dashboard/ClaimHandleForm";

// Modular Dashboard Subcomponents
import Sidebar from "./dashboard/Sidebar";
import Header from "./dashboard/Header";
import KpiCards from "./dashboard/KpiCards";
import ManageShelfTab from "./dashboard/ManageShelfTab";
import AnalyticsTab from "./dashboard/AnalyticsTab";
import SettingsTab from "./dashboard/SettingsTab";

// Modular Modals
import ItemModal, { type ItemFormData } from "./modals/ItemModal";
import DeleteModal from "./modals/DeleteModal";

interface DashboardProps {
  onViewProfile: () => void;
  onGoHome: () => void;
  onLogout?: () => void;
}

const EMPTY_SETTINGS: HandleSettings = {
  handle: "",
  displayName: "",
  bio: "",
  location: "",
  skills: "",
  isVerified: false,
  isPublic: true,
};

export default function Dashboard({ onViewProfile, onGoHome, onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<DashboardTab>("items");
  const [copied, setCopied] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CurationItem | null>(null);
  const [itemToDelete, setItemToDelete] = useState<CurationItem | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Filters state
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterKind, setFilterKind] = useState<string>("all");
  const [activeTag, setActiveTag] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Pagination state
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [pages, setPages] = useState<number>(1);

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isKindOpen, setIsKindOpen] = useState(false);
  const [isTagOpen, setIsTagOpen] = useState(false);

  // Server data
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [needsProfile, setNeedsProfile] = useState(false);
  const [profileReady, setProfileReady] = useState(false);
  const [items, setItems] = useState<CurationItem[]>([]);
  const [pinnedItemIds, setPinnedItemIds] = useState<Record<string, boolean>>({});
  const [handleSettings, setHandleSettings] = useState<HandleSettings>(EMPTY_SETTINGS);
  const [originalHandle, setOriginalHandle] = useState("");
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);

  const [formData, setFormData] = useState<ItemFormData>({
    title: "",
    type: "book",
    resourceKind: "",
    creator: "",
    link: "",
    description: "",
    impact: "",
    tags: "",
    image: "",
    followerCount: "",
  });

  const triggerSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 3500);
  };

  const triggerError = (msg: string) => {
    setErrorMessage(msg);
    setTimeout(() => setErrorMessage(null), 4500);
  };

  const refreshSummary = useCallback(() => {
    getAnalyticsSummary()
      .then(setSummary)
      .catch(() => {});
  }, []);

  // Fetch Profile & Summary
  useEffect(() => {
    let cancelled = false;
    getMyProfile()
      .then((profile) => {
        if (cancelled) return;
        setNeedsProfile(false);
        setProfileReady(true);
        setHandleSettings(toHandleSettings(profile));
        setOriginalHandle(profile.handle);
        refreshSummary();
      })
      .catch((err) => {
        if (cancelled) return;
        if (err instanceof ApiError && err.status === 401) {
          onLogout?.();
        } else if (err instanceof ApiError && err.status === 404) {
          setNeedsProfile(true);
        } else {
          setLoadError(true);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [refreshSummary, onLogout]);

  // Fetch paginated items for my shelf
  const fetchMyItems = useCallback(() => {
    setLoading(true);
    getMyItems({
      type: filterCategory,
      kind: filterKind,
      tag: activeTag,
      q: searchQuery,
      page,
      limit,
    })
      .then((res) => {
        setItems(res.items.map(toCurationItem));
        setTotal(res.total);
        setPages(res.pages);
        setPage(res.page);
        setPinnedItemIds(
          Object.fromEntries(res.items.filter(i => i.is_pinned).map(i => [i.id, true]))
        );
      })
      .catch(() => setLoadError(true))
      .finally(() => setLoading(false));
  }, [filterCategory, filterKind, activeTag, searchQuery, page, limit]);

  useEffect(() => {
    if (profileReady) {
      fetchMyItems();
    }
  }, [profileReady, fetchMyItems]);

  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    items.forEach(item => {
      item.tags.forEach(t => tagsSet.add(t));
    });
    return Array.from(tagsSet).sort();
  }, [items]);

  const handleShare = () => {
    setCopied(true);
    navigator.clipboard.writeText(`${window.location.origin}/${handleSettings.handle}`);
    triggerSuccess("Copied public handle URL to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const togglePin = useCallback((id: string) => {
    const targetItem = items.find(i => i.id === id);
    toggleItemPin(id)
      .then((updated) => {
        setPinnedItemIds(prev => ({ ...prev, [id]: updated.is_pinned }));
        if (targetItem) {
          triggerSuccess(updated.is_pinned ? `Pinned "${targetItem.title}" as featured!` : `Unpinned "${targetItem.title}"`);
        }
      })
      .catch(() => triggerError("Couldn't update pin — try again."));
  }, [items]);

  const confirmDelete = () => {
    if (!itemToDelete) return;
    const { id, title } = itemToDelete;
    deleteItem(id)
      .then(() => {
        fetchMyItems();
        refreshSummary();
        triggerSuccess(`Successfully removed "${title}" from your shelf.`);
      })
      .catch(() => triggerError(`Couldn't delete "${title}" — try again.`))
      .finally(() => setItemToDelete(null));
  };

  const handleSaveProfile = async (draft: HandleSettings, avatarFile: File | null, bannerFile: File | null) => {
    try {
      let latestProfile;
      if (avatarFile) latestProfile = await uploadAvatar(avatarFile);
      if (bannerFile) latestProfile = await uploadBanner(bannerFile);
      latestProfile = await updateMyProfile(handleSettingsToPatch(draft));
      setHandleSettings(toHandleSettings(latestProfile));
      setOriginalHandle(latestProfile.handle);
      triggerSuccess("Profile & handle settings saved successfully!");
    } catch (err) {
      triggerError(err instanceof ApiError ? err.message : "Couldn't save profile settings — try again.");
      throw err;
    }
  };

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      type: "book",
      resourceKind: "",
      creator: "",
      link: "",
      description: "",
      impact: "",
      tags: "#Systems, #Engineering",
      image: "",
      followerCount: "",
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (item: CurationItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      type: item.type,
      resourceKind: item.resourceKind || "",
      creator: item.author || item.creator || item.host || item.handle || "",
      link: item.link,
      description: item.description,
      impact: item.impact,
      tags: item.tags.join(", "),
      image: item.image || "",
      followerCount: item.subscribers || item.followers || "",
    });
    setIsAddModalOpen(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.link || !formData.description) return;

    const parsedTags = formData.tags
      .split(",")
      .map(t => t.trim())
      .filter(t => t.length > 0)
      .map(t => t.startsWith("#") ? t : `#${t}`);

    const fallbackTitle = () => {
      try {
        return new URL(formData.link).hostname.replace(/^www\./, "");
      } catch {
        return "Untitled";
      }
    };

    const metadata: Record<string, string> = {};
    if (formData.followerCount) {
      if (formData.type === "youtube") metadata.subscribers = formData.followerCount;
      else if (formData.type === "x") metadata.followers = formData.followerCount;
    }

    const payload = {
      type: formData.type,
      resource_kind: formData.resourceKind || undefined,
      title: formData.title || fallbackTitle(),
      creator_name: formData.creator,
      link: formData.link,
      description: formData.description,
      impact: formData.impact,
      image_url: formData.image || undefined,
      tags: parsedTags,
      metadata,
    };

    const request = editingItem
      ? updateItem(editingItem.id, payload)
      : createItem({ ...payload, size: "medium" });

    request
      .then((saved) => {
        const mapped = toCurationItem(saved);
        if (editingItem) {
          triggerSuccess(`Updated "${mapped.title}" details.`);
        } else {
          triggerSuccess(`Added "${mapped.title}" to your mind-shelf!`);
        }
        fetchMyItems();
        refreshSummary();
        setIsAddModalOpen(false);
      })
      .catch(() => triggerError(editingItem ? "Couldn't update item — try again." : "Couldn't add item — try again."));
  };

  if (loading && items.length === 0 && !needsProfile && !loadError) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-xs font-black tracking-wider text-zinc-400">Loading your shelf...</p>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4">
        <p className="text-sm font-black tracking-wider text-zinc-700">Couldn't load your dashboard.</p>
        <button onClick={onGoHome} className="text-xs font-bold text-black underline cursor-pointer">Back to Home</button>
      </div>
    );
  }

  if (needsProfile) {
    return (
      <ClaimHandleForm
        onClaimed={async (handle, displayName) => {
          const profile = await createProfile(handle, displayName);
          setHandleSettings(toHandleSettings(profile));
          setOriginalHandle(profile.handle);
          setNeedsProfile(false);
          setProfileReady(true);
          refreshSummary();
        }}
        onGoHome={onGoHome}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-black selection:text-white flex flex-col md:flex-row relative">

      {/* SIDEBAR NAVIGATION */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        itemsCount={total}
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
        <main className="px-6 sm:px-10 lg:px-12 py-8 sm:py-10 max-w-7xl mx-auto w-full space-y-8 flex-1">

          {/* KPI Summary Cards */}
          <KpiCards
            summary={summary}
            totalItems={total}
            categoryCount={new Set(items.map(i => i.type)).size}
          />

          {/* TAB CONTENTS */}
          {activeTab === "items" && (
            <ManageShelfTab
              filteredItems={items}
              filterCategory={filterCategory}
              setFilterCategory={(cat) => { setFilterCategory(cat); setPage(1); }}
              filterKind={filterKind}
              setFilterKind={(kind) => { setFilterKind(kind); setPage(1); }}
              activeTag={activeTag}
              setActiveTag={(tag) => { setActiveTag(tag); setPage(1); }}
              searchQuery={searchQuery}
              setSearchQuery={(q) => { setSearchQuery(q); setPage(1); }}
              allTags={allTags}
              pinnedItemIds={pinnedItemIds}
              onTogglePin={togglePin}
              onOpenAddModal={handleOpenAddModal}
              onOpenEditModal={handleOpenEditModal}
              onRequestDelete={(item) => setItemToDelete(item)}
              isCategoryOpen={isCategoryOpen}
              setIsCategoryOpen={setIsCategoryOpen}
              isKindOpen={isKindOpen}
              setIsKindOpen={setIsKindOpen}
              isTagOpen={isTagOpen}
              setIsTagOpen={setIsTagOpen}
              page={page}
              pages={pages}
              total={total}
              limit={limit}
              onPageChange={(p) => setPage(p)}
              onLimitChange={(l) => { setLimit(l); setPage(1); }}
            />
          )}

          {activeTab === "analytics" && (
            <AnalyticsTab />
          )}

          {activeTab === "settings" && (
            <SettingsTab
              handleSettings={handleSettings}
              onSave={handleSaveProfile}
              onShare={handleShare}
              copied={copied}
              originalHandle={originalHandle}
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
        allTags={allTags}
      />

      <DeleteModal
        item={itemToDelete}
        onClose={() => setItemToDelete(null)}
        onConfirm={confirmDelete}
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

      {/* TOAST ERROR BANNER */}
      {errorMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-rose-950 text-white px-4 py-3 rounded-sm shadow-2xl border border-rose-900 flex items-center gap-3 animate-fade-in">
          <span className="text-xs font-bold">{errorMessage}</span>
          <button onClick={() => setErrorMessage(null)} className="text-rose-300 hover:text-white ml-2 cursor-pointer">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

    </div>
  );
}
