import { ChartLineUp, TrendUp } from "@phosphor-icons/react";

export default function AnalyticsTab() {
  return (
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
  );
}
