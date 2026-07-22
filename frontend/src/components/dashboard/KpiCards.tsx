import { Eye, Heart, Sparkle, BookOpen } from "@phosphor-icons/react";
import type { AnalyticsSummary } from "../../utils/api";

interface KpiCardsProps {
  summary: AnalyticsSummary | null;
  totalItems: number;
  categoryCount: number;
}

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return n.toLocaleString();
}

export default function KpiCards({ summary, totalItems, categoryCount }: KpiCardsProps) {
  // Real counters straight off the backend; fall back to the live item count
  // while the summary request is still in flight so the grid never flashes fake
  // numbers.
  const views = summary?.total_shelf_views ?? 0;
  const saves = summary?.community_saves ?? 0;
  const activeItems = summary?.active_items ?? totalItems;
  const curatorScore = summary?.curator_score;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">

      <div className="bg-white border border-zinc-200 p-4 sm:p-5 rounded-sm shadow-2xs">
        <div className="flex justify-between items-center text-zinc-500 mb-2">
          <span className="text-[11px] sm:text-xs font-bold capitalize tracking-wider truncate">Total shelf views</span>
          <Eye className="h-4 w-4 text-zinc-400 shrink-0" />
        </div>
        <div className="flex items-baseline justify-between flex-wrap gap-1">
          <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-950">{formatCount(views)}</h3>
        </div>
      </div>

      <div className="bg-white border border-zinc-200 p-4 sm:p-5 rounded-sm shadow-2xs">
        <div className="flex justify-between items-center text-zinc-500 mb-2">
          <span className="text-[11px] sm:text-xs font-bold capitalize tracking-wider truncate">Community saves</span>
          <Heart className="h-4 w-4 text-zinc-400 shrink-0" />
        </div>
        <div className="flex items-baseline justify-between flex-wrap gap-1">
          <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-950">{formatCount(saves)}</h3>
        </div>
      </div>

      <div className="bg-white border border-zinc-200 p-4 sm:p-5 rounded-sm shadow-2xs">
        <div className="flex justify-between items-center text-zinc-500 mb-2">
          <span className="text-[11px] sm:text-xs font-bold capitalize tracking-wider truncate">Curator score</span>
          <Sparkle className="h-4 w-4 text-amber-500 fill-amber-500 shrink-0" />
        </div>
        <div className="flex items-baseline justify-between flex-wrap gap-1">
          <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-950">
            {curatorScore != null ? `${curatorScore}%` : "—"}
          </h3>
          {curatorScore == null && (
            <span className="text-[10px] font-bold text-zinc-500 bg-zinc-100 px-1.5 py-0.5 rounded-sm">
              Not yet scored
            </span>
          )}
        </div>
      </div>

      <div className="bg-white border border-zinc-200 p-4 sm:p-5 rounded-sm shadow-2xs">
        <div className="flex justify-between items-center text-zinc-500 mb-2">
          <span className="text-[11px] sm:text-xs font-bold capitalize tracking-wider truncate">Active items</span>
          <BookOpen className="h-4 w-4 text-zinc-400 shrink-0" />
        </div>
        <div className="flex items-baseline justify-between flex-wrap gap-1">
          <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-950">{activeItems}</h3>
          <span className="text-[10px] font-bold text-zinc-600 bg-zinc-100 px-1.5 py-0.5 rounded-sm">
            {categoryCount} {categoryCount === 1 ? "Category" : "Categories"}
          </span>
        </div>
      </div>

    </div>
  );
}
