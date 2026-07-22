import { Eye, TrendUp, Heart, Sparkle, BookOpen } from "@phosphor-icons/react";

interface KpiCardsProps {
  totalItems: number;
}

export default function KpiCards({ totalItems }: KpiCardsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
      
      <div className="bg-white border border-zinc-200 p-4 sm:p-5 rounded-sm shadow-2xs">
        <div className="flex justify-between items-center text-zinc-500 mb-2">
          <span className="text-[11px] sm:text-xs font-bold capitalize tracking-wider truncate">Total shelf views</span>
          <Eye className="h-4 w-4 text-zinc-400 shrink-0" />
        </div>
        <div className="flex items-baseline justify-between flex-wrap gap-1">
          <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-950">12,480</h3>
          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-sm flex items-center gap-0.5">
            <TrendUp className="h-3 w-3" /> +14%
          </span>
        </div>
      </div>

      <div className="bg-white border border-zinc-200 p-4 sm:p-5 rounded-sm shadow-2xs">
        <div className="flex justify-between items-center text-zinc-500 mb-2">
          <span className="text-[11px] sm:text-xs font-bold capitalize tracking-wider truncate">Community saves</span>
          <Heart className="h-4 w-4 text-zinc-400 shrink-0" />
        </div>
        <div className="flex items-baseline justify-between flex-wrap gap-1">
          <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-950">1,890</h3>
          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-sm flex items-center gap-0.5">
            <TrendUp className="h-3 w-3" /> +8%
          </span>
        </div>
      </div>

      <div className="bg-white border border-zinc-200 p-4 sm:p-5 rounded-sm shadow-2xs">
        <div className="flex justify-between items-center text-zinc-500 mb-2">
          <span className="text-[11px] sm:text-xs font-bold capitalize tracking-wider truncate">Curator score</span>
          <Sparkle className="h-4 w-4 text-amber-500 fill-amber-500 shrink-0" />
        </div>
        <div className="flex items-baseline justify-between flex-wrap gap-1">
          <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-950">99.8%</h3>
          <span className="text-[10px] font-bold text-zinc-600 bg-zinc-100 px-1.5 py-0.5 rounded-sm">
            Top 1%
          </span>
        </div>
      </div>

      <div className="bg-white border border-zinc-200 p-4 sm:p-5 rounded-sm shadow-2xs">
        <div className="flex justify-between items-center text-zinc-500 mb-2">
          <span className="text-[11px] sm:text-xs font-bold capitalize tracking-wider truncate">Active items</span>
          <BookOpen className="h-4 w-4 text-zinc-400 shrink-0" />
        </div>
        <div className="flex items-baseline justify-between flex-wrap gap-1">
          <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-950">{totalItems}</h3>
          <span className="text-[10px] font-bold text-zinc-600 bg-zinc-100 px-1.5 py-0.5 rounded-sm">
            6 Categories
          </span>
        </div>
      </div>

    </div>
  );
}
