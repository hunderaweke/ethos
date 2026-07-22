import { CaretRight, Eye, Plus, List } from "@phosphor-icons/react";
import type { DashboardTab } from "../../types";

interface HeaderProps {
  activeTab: DashboardTab;
  onViewProfile: () => void;
  onOpenAddModal: () => void;
  onOpenMobileSidebar?: () => void;
}

export default function Header({
  activeTab,
  onViewProfile,
  onOpenAddModal,
  onOpenMobileSidebar
}: HeaderProps) {
  const getSectionTitle = () => {
    switch (activeTab) {
      case "items": return "Mind-Shelf Items";
      case "analytics": return "Analytics & Graph";
      case "settings": return "Profile & Handle Settings";
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/85 backdrop-blur-md border-b border-zinc-200 px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
      
      <div className="flex items-center gap-2 text-xs font-bold text-zinc-500">
        {onOpenMobileSidebar && (
          <button
            onClick={onOpenMobileSidebar}
            className="md:hidden p-1.5 text-zinc-700 hover:text-black hover:bg-zinc-100 rounded-sm cursor-pointer mr-1"
            title="Open navigation menu"
          >
            <List className="h-5 w-5" />
          </button>
        )}
        <span className="text-zinc-400 hidden sm:inline">Dashboard</span>
        <CaretRight className="h-3 w-3 text-zinc-300 hidden sm:inline" />
        <span className="text-zinc-950 capitalize">{getSectionTitle()}</span>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        
        <button
          onClick={onViewProfile}
          className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-zinc-700 bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 px-3 py-1.5 rounded-sm transition-all cursor-pointer"
        >
          <Eye className="h-3.5 w-3.5" />
          <span>View Handle</span>
        </button>

        <button
          onClick={onOpenAddModal}
          className="inline-flex items-center gap-1.5 rounded-sm bg-black px-3.5 sm:px-4 py-1.5 text-xs font-bold text-white hover:bg-zinc-900 transition-all hover:scale-105 active:scale-95 shadow-md cursor-pointer"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Add Influence</span>
        </button>

      </div>

    </header>
  );
}
