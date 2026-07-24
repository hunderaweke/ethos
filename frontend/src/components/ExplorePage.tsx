import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Compass, Users, BookOpen } from "@phosphor-icons/react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Pagination from "./Pagination";
import CurationCard from "./CurationCard";
import DiscoverProfileCard from "./DiscoverProfileCard";
import {
  discoverProfiles,
  discoverItems,
  followProfile,
  unfollowProfile,
  saveItem,
  unsaveItem,
  toCurationItem,
  ApiError,
  type DiscoverProfile,
  type DiscoverItem,
} from "../utils/api";
import { useToast } from "./ToastContext";

interface ExplorePageProps {
  onViewProfile: () => void;
  onViewDashboard: () => void;
  onOpenAuth: (mode?: "login" | "signup") => void;
  onGoHome: () => void;
  isLoggedIn: boolean;
  onLogout: () => void;
}

export default function ExplorePage({
  onViewProfile,
  onViewDashboard,
  onOpenAuth,
  onGoHome,
  isLoggedIn,
  onLogout,
}: ExplorePageProps) {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [tab, setTab] = useState<"people" | "items">("people");

  const [profiles, setProfiles] = useState<DiscoverProfile[]>([]);
  const [followingState, setFollowingState] = useState<Record<string, boolean>>({});
  const [profilesLoading, setProfilesLoading] = useState(true);
  const [profilePage, setProfilePage] = useState(1);
  const [profileLimit, setProfileLimit] = useState(20);
  const [profileTotal, setProfileTotal] = useState(0);
  const [profilePages, setProfilePages] = useState(1);

  const [discoveredItems, setDiscoveredItems] = useState<DiscoverItem[]>([]);
  const [savedItems, setSavedItems] = useState<Record<string, boolean>>({});
  const [itemsLoading, setItemsLoading] = useState(true);
  const [itemPage, setItemPage] = useState(1);
  const [itemLimit, setItemLimit] = useState(20);
  const [itemTotal, setItemTotal] = useState(0);
  const [itemPages, setItemPages] = useState(1);

  useEffect(() => {
    if (tab !== "people") return;
    let cancelled = false;
    setProfilesLoading(true);
    discoverProfiles({ page: profilePage, limit: profileLimit })
      .then((res) => {
        if (cancelled) return;
        setProfiles(res.items);
        setFollowingState(
          Object.fromEntries(res.items.map((p) => [p.handle, p.is_following]))
        );
        setProfileTotal(res.total);
        setProfilePages(res.pages);
        setProfilePage(res.page);
      })
      .finally(() => {
        if (!cancelled) setProfilesLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [tab, profilePage, profileLimit]);

  useEffect(() => {
    if (tab !== "items") return;
    let cancelled = false;
    setItemsLoading(true);
    discoverItems({ page: itemPage, limit: itemLimit })
      .then((res) => {
        if (cancelled) return;
        setDiscoveredItems(res.items);
        setItemTotal(res.total);
        setItemPages(res.pages);
        setItemPage(res.page);
      })
      .finally(() => {
        if (!cancelled) setItemsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [tab, itemPage, itemLimit]);

  const toggleFollow = useCallback(
    (handle: string) => {
      const wasFollowing = !!followingState[handle];
      setFollowingState((prev) => ({ ...prev, [handle]: !wasFollowing }));
      showToast(
        wasFollowing ? `Unfollowed @${handle}` : `Now following @${handle}`,
        wasFollowing ? "info" : "success"
      );
      (wasFollowing ? unfollowProfile(handle) : followProfile(handle)).catch((err) => {
        setFollowingState((prev) => ({ ...prev, [handle]: wasFollowing }));
        if (!(err instanceof ApiError && err.status === 401)) {
          console.error("Failed to update follow state", err);
        }
      });
    },
    [followingState, showToast]
  );

  const toggleSave = useCallback(
    (id: string) => {
      const wasSaved = savedItems[id];
      setSavedItems((prev) => ({ ...prev, [id]: !prev[id] }));
      (wasSaved ? unsaveItem(id) : saveItem(id)).catch(() => {
        setSavedItems((prev) => ({ ...prev, [id]: !!wasSaved }));
      });
    },
    [savedItems]
  );

  const openProfile = (handle: string) => {
    navigate(`/@${handle}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col justify-between">
      <Navbar
        onViewProfile={onViewProfile}
        onViewDashboard={onViewDashboard}
        onOpenAuth={onOpenAuth}
        isLoggedIn={isLoggedIn}
        onLogout={onLogout}
      />

      <main className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-10 sm:pt-14 pb-20 flex-1 w-full">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-950 flex items-center gap-2.5">
            <Compass className="h-7 w-7 text-black" />
            Explore
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 font-medium mt-1.5">
            Discover curators and curated items across the community.
          </p>
        </div>

        <div className="flex items-center gap-2 mb-6 border-b border-zinc-200">
          <button
            onClick={() => setTab("people")}
            className={`inline-flex items-center gap-1.5 px-4 py-3 text-sm font-bold border-b-2 -mb-px transition-colors cursor-pointer ${
              tab === "people"
                ? "border-zinc-950 text-zinc-950"
                : "border-transparent text-zinc-500 hover:text-zinc-800"
            }`}
          >
            <Users className="h-4 w-4" /> People
          </button>
          <button
            onClick={() => setTab("items")}
            className={`inline-flex items-center gap-1.5 px-4 py-3 text-sm font-bold border-b-2 -mb-px transition-colors cursor-pointer ${
              tab === "items"
                ? "border-zinc-950 text-zinc-950"
                : "border-transparent text-zinc-500 hover:text-zinc-800"
            }`}
          >
            <BookOpen className="h-4 w-4" /> Items
          </button>
        </div>

        {tab === "people" ? (
          profilesLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="h-40 bg-white border border-zinc-200 rounded-sm skeleton-shimmer" />
              ))}
            </div>
          ) : profiles.length > 0 ? (
            <div className="space-y-6">
              <Pagination
                page={profilePage}
                pages={profilePages}
                total={profileTotal}
                limit={profileLimit}
                onPageChange={(p) => {
                  setProfilePage(p);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onLimitChange={(l) => {
                  setProfileLimit(l);
                  setProfilePage(1);
                }}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {profiles.map((profile) => (
                  <DiscoverProfileCard
                    key={profile.id}
                    profile={profile}
                    isFollowing={!!followingState[profile.handle]}
                    onToggleFollow={toggleFollow}
                    onOpen={openProfile}
                    isLoggedIn={isLoggedIn}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white border border-zinc-200 p-10 text-center rounded-sm">
              <p className="text-sm font-bold text-zinc-700">No public profiles yet.</p>
            </div>
          )
        ) : itemsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-64 bg-white border border-zinc-200 rounded-sm skeleton-shimmer" />
            ))}
          </div>
        ) : discoveredItems.length > 0 ? (
          <div className="space-y-6">
            <Pagination
              page={itemPage}
              pages={itemPages}
              total={itemTotal}
              limit={itemLimit}
              onPageChange={(p) => {
                setItemPage(p);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onLimitChange={(l) => {
                setItemLimit(l);
                setItemPage(1);
              }}
            />
            <div className="columns-1 md:columns-2 gap-6">
              {discoveredItems.map((item) => (
                <div key={item.id} className="mb-6 break-inside-avoid">
                  <button
                    onClick={() => openProfile(item.profile_handle)}
                    className="flex items-center gap-2 mb-2 text-xs font-bold text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer bg-transparent border-none px-0"
                  >
                    {item.profile_avatar_url ? (
                      <img
                        src={item.profile_avatar_url}
                        alt={item.profile_handle}
                        referrerPolicy="no-referrer"
                        className="h-5 w-5 rounded-full object-cover border border-zinc-200"
                      />
                    ) : null}
                    @{item.profile_handle}
                  </button>
                  <CurationCard
                    item={toCurationItem(item)}
                    isSaved={!!savedItems[item.id]}
                    onToggleSave={toggleSave}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white border border-zinc-200 p-10 text-center rounded-sm">
            <p className="text-sm font-bold text-zinc-700">No items to explore yet.</p>
          </div>
        )}
      </main>

      <Footer
        onViewProfile={onViewProfile}
        onViewDashboard={onViewDashboard}
        onGoHome={onGoHome}
        onOpenAuth={onOpenAuth}
      />
    </div>
  );
}
