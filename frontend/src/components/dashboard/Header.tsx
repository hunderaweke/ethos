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
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-zinc-200/90 px-6 sm:px-8 py-4 flex items-center justify-between gap-4">
      
      <div className="flex items-center gap-2 text-xs font-bold text-zinc-500">
        {onOpenMobileSidebar && (
          <button
            onClick={onOpenMobileSidebar}
            className="md:hidden p-2 text-zinc-700 hover:text-black hover:bg-zinc-100 rounded-sm cursor-pointer mr-1"
            title="Open navigation menu"
            aria-label="Open navigation menu"
          >
            <List className="h-5 w-5" />
          </button>
        )}
        <span className="text-zinc-400 hidden sm:inline">Dashboard</span>
        <CaretRight className="h-3 w-3 text-zinc-300 hidden sm:inline" />
        <span className="text-zinc-950 font-black tracking-tight capitalize">{getSectionTitle()}</span>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        
        <button
          onClick={onViewProfile}
          className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-zinc-700 bg-zinc-100 hover:bg-zinc-200 border border-zinc-200/80 px-3.5 py-2 rounded-sm transition-all cursor-pointer min-h-[38px]"
        >
          <Eye className="h-3.5 w-3.5" />
          <span>View Handle</span>
        </button>

        <button
          onClick={onOpenAddModal}
          className="inline-flex items-center gap-1.5 rounded-sm bg-black px-4 py-2 text-xs font-bold text-white hover:bg-zinc-800 transition-all active:scale-95 shadow-sm cursor-pointer min-h-[38px]"
        >
          <Plus className="h-3.5 w-3.5 text-white" />
          <span>Add Item</span>
        </button>

      </div>

    </header>
  );
}
