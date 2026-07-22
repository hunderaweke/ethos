import { useEffect, useState } from "react";
import { ChartLineUp, TrendUp } from "@phosphor-icons/react";
import {
  getCategoryBreakdown,
  getLeaderboard,
  type CategoryBreakdown,
  type LeaderboardItem,
} from "../../utils/api";
import { getSocialMediaColor } from "../../utils/color";

const TYPE_LABELS: Record<string, string> = {
  book: "Books & Literature",
  essay: "Essays & Articles",
  youtube: "YouTube & Video",
  podcast: "Podcasts & Audio",
  x: "X / Twitter",
  design: "Design",
};

const typeLabel = (t: string) => TYPE_LABELS[t] ?? t.charAt(0).toUpperCase() + t.slice(1);

export default function AnalyticsTab() {
  const [breakdown, setBreakdown] = useState<CategoryBreakdown[] | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardItem[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    Promise.all([getCategoryBreakdown(), getLeaderboard(5)])
      .then(([b, l]) => {
        if (cancelled) return;
        setBreakdown(b.sort((a, z) => z.item_count - a.item_count));
        setLeaderboard(l);
      })
      .catch(() => {
        if (!cancelled) {
          setBreakdown([]);
          setLeaderboard([]);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const maxViews = breakdown && breakdown.length
    ? Math.max(...breakdown.map(b => b.view_count), 1)
    : 1;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Column: Category Distribution */}
        <div className="lg:col-span-7 bg-white border border-zinc-200/90 p-6 sm:p-8 lg:p-10 rounded-sm shadow-xs space-y-6">
          <div>
            <h3 className="text-base font-black text-zinc-950 flex items-center gap-2">
              <ChartLineUp className="h-5 w-5 text-black" />
              Influence Category Breakdown
            </h3>
            <p className="text-xs text-zinc-500 font-medium mt-1">
              Distribution of your recommendations across media types.
            </p>
          </div>

          {loading ? (
            <div className="space-y-3 py-4">
              {[1, 2, 3].map(n => (
                <div key={n} className="h-8 bg-zinc-100 rounded-sm skeleton-shimmer" />
              ))}
            </div>
          ) : breakdown && breakdown.length > 0 ? (
            <div className="space-y-4 pt-2">
              {breakdown.map((row) => {
                const width = Math.max(4, Math.round((row.view_count / maxViews) * 100));
                const color = getSocialMediaColor(row.type, 1);
                return (
                  <div key={row.type}>
                    <div className="flex justify-between text-xs font-bold text-zinc-700 mb-1">
                      <span>{typeLabel(row.type)}</span>
                      <span className="text-zinc-500 font-semibold">
                        {row.share_pct}% · {row.item_count} {row.item_count === 1 ? "item" : "items"} · {row.view_count.toLocaleString()} views
                      </span>
                    </div>
                    <div className="w-full bg-zinc-100 h-2.5 rounded-sm overflow-hidden">
                      <div className="h-full rounded-sm transition-all duration-500" style={{ width: `${width}%`, backgroundColor: color }} />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-xs font-semibold text-zinc-400 py-6">
              No items yet — add recommendations to your shelf to see the breakdown.
            </p>
          )}
        </div>

        {/* Right Column: Top Performing Items */}
        <div className="lg:col-span-5 bg-white border border-zinc-200/90 p-6 sm:p-8 lg:p-10 rounded-sm shadow-xs space-y-4">
          <div>
            <h3 className="text-base font-black text-zinc-950 flex items-center gap-2">
              <TrendUp className="h-5 w-5 text-black" />
              Top Performing Recommendations
            </h3>
            <p className="text-xs text-zinc-500 font-medium mt-1">
              Most saved and referenced recommendations on your shelf.
            </p>
          </div>

          {loading ? (
            <div className="space-y-3 py-4">
              {[1, 2, 3].map(n => (
                <div key={n} className="h-12 bg-zinc-100 rounded-sm skeleton-shimmer" />
              ))}
            </div>
          ) : leaderboard && leaderboard.length > 0 ? (
            <div className="space-y-3 pt-2">
              {leaderboard.map((item, index) => (
                <div key={item.id} className="p-3.5 bg-zinc-50 border border-zinc-200/80 rounded-sm flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <h4 className="text-xs font-extrabold text-zinc-900 truncate">{item.title}</h4>
                    <span className="text-[10px] text-zinc-500 font-semibold">
                      {item.save_count} {item.save_count === 1 ? "Save" : "Saves"} • {item.view_count.toLocaleString()} Views
                    </span>
                  </div>
                  <span className="text-xs font-extrabold text-black bg-white border border-zinc-200/80 px-2.5 py-1 rounded-sm shrink-0 shadow-2xs">
                    #{index + 1}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs font-semibold text-zinc-400 py-6">
              No performance data yet — saves and views will appear here as people discover your shelf.
            </p>
          )}
        </div>

      </div>
    </div>
  );
}
