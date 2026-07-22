import { SlidersHorizontal, ChartLineUp, User, Eye, ArrowLeft, SignOut, X } from "@phosphor-icons/react";
import type { DashboardTab, HandleSettings } from "../../types";

interface SidebarProps {
  activeTab: DashboardTab;
  setActiveTab: (tab: DashboardTab) => void;
  itemsCount: number;
  handleSettings: HandleSettings;
  onViewProfile: () => void;
  onGoHome: () => void;
  onLogout?: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export default function Sidebar({
  activeTab,
  setActiveTab,
  itemsCount,
  handleSettings,
  onViewProfile,
  onGoHome,
  onLogout,
  isMobileOpen = false,
  onCloseMobile
}: SidebarProps) {
  const sidebarContent = (
    <div className="flex flex-col justify-between h-full p-6 space-y-6">
      
      <div className="space-y-6">
        
        {/* Top Brand Header */}
        <div className="flex items-center justify-between cursor-pointer" onClick={onGoHome}>
          <span className="text-lg font-bold tracking-tight text-slate-900 font-sans select-none">
            blueprint<span className="text-zinc-400 font-medium">.id</span>
          </span>
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-black uppercase tracking-wider bg-zinc-100 text-zinc-600 border border-zinc-200 px-2 py-0.5 rounded-sm">
              Creator
            </span>
            {onCloseMobile && (
              <button 
                onClick={onCloseMobile} 
                className="md:hidden p-1 text-zinc-400 hover:text-black rounded-sm cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* User Profile Card */}
        <div className="p-3 bg-zinc-50 border border-zinc-200/80 rounded-sm flex items-center gap-3 group">
          <div className="relative">
            <img
              src={handleSettings.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"}
              alt="Avatar"
              referrerPolicy="no-referrer"
              className="h-9 w-9 rounded-sm object-cover border border-zinc-200"
            />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-white absolute -bottom-0.5 -right-0.5 animate-pulse" />
          </div>
          <div className="overflow-hidden">
            <h4 className="text-xs font-extrabold text-zinc-950 truncate">{handleSettings.displayName}</h4>
            <p className="text-[10px] text-zinc-500 font-semibold truncate">{handleSettings.handle}</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1">
          
          <button
            onClick={() => { setActiveTab("items"); if (onCloseMobile) onCloseMobile(); }}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-sm text-xs font-bold transition-all cursor-pointer ${
              activeTab === "items"
                ? "bg-black text-white shadow-2xs"
                : "text-zinc-600 hover:text-black hover:bg-zinc-100"
            }`}
          >
            <span className="flex items-center gap-2.5">
              <SlidersHorizontal className="h-4 w-4" />
              <span>Mind-Shelf</span>
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm ${
              activeTab === "items" ? "bg-zinc-800 text-white" : "bg-zinc-100 text-zinc-600"
            }`}>
              {itemsCount}
            </span>
          </button>

          <button
            onClick={() => { setActiveTab("analytics"); if (onCloseMobile) onCloseMobile(); }}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-sm text-xs font-bold transition-all cursor-pointer ${
              activeTab === "analytics"
                ? "bg-black text-white shadow-2xs"
                : "text-zinc-600 hover:text-black hover:bg-zinc-100"
            }`}
          >
            <span className="flex items-center gap-2.5">
              <ChartLineUp className="h-4 w-4" />
              <span>Analytics</span>
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </button>

          <button
            onClick={() => { setActiveTab("settings"); if (onCloseMobile) onCloseMobile(); }}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-sm text-xs font-bold transition-all cursor-pointer ${
              activeTab === "settings"
                ? "bg-black text-white shadow-2xs"
                : "text-zinc-600 hover:text-black hover:bg-zinc-100"
            }`}
          >
            <span className="flex items-center gap-2.5">
              <User className="h-4 w-4" />
              <span>Settings</span>
            </span>
          </button>

        </nav>

      </div>

      {/* Bottom Actions */}
      <div className="pt-6 border-t border-zinc-200/80 space-y-2">
        
        <button
          onClick={() => { onViewProfile(); if (onCloseMobile) onCloseMobile(); }}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-sm text-xs font-bold text-zinc-700 hover:text-black hover:bg-zinc-100 transition-colors cursor-pointer"
        >
          <Eye className="h-4 w-4 text-zinc-500" />
          <span>Preview Public Shelf</span>
        </button>

        <button
          onClick={() => { onGoHome(); if (onCloseMobile) onCloseMobile(); }}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-sm text-xs font-bold text-zinc-700 hover:text-black hover:bg-zinc-100 transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4 text-zinc-500" />
          <span>Back to Home</span>
        </button>

        {onLogout && (
          <button
            onClick={() => { onLogout(); if (onCloseMobile) onCloseMobile(); }}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-sm text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
          >
            <SignOut className="h-4 w-4" />
            <span>Log Out</span>
          </button>
        )}

      </div>

    </div>
  );

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden md:flex w-64 bg-white border-r border-zinc-200 shrink-0 md:h-screen md:sticky md:top-0 z-40">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar Overlay Drawer */}
      {isMobileOpen && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs md:hidden animate-fade-in cursor-pointer"
        >
          <aside 
            onClick={(e) => e.stopPropagation()}
            className="w-72 bg-white h-full shadow-2xl overflow-y-auto cursor-default animate-slide-in-left"
          >
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
