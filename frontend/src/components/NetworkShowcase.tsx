import { useState } from "react";
import { ShieldCheck, Trophy, Lightning, Pulse, Check, Radio } from "@phosphor-icons/react";

export default function NetworkShowcase() {
  const [feedSubscribed, setFeedSubscribed] = useState(false);

  return (
    <section id="discovery" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Decorative radial gradients */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 border border-zinc-200 px-3.5 py-1 text-xs font-semibold tracking-wider text-zinc-900 uppercase mb-4">
            <Radio className="h-3.5 w-3.5 text-black animate-pulse" />
            Community Curated Recommendations
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
            A directory of human influences{" "}
            <span className="text-black font-extrabold">
              powered by people.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-xl mx-auto">
            Blueprint is a personal museum of the mind. Share the creators, articles, and books that shaped your path and learn what built others.
          </p>
        </div>

        {/* Dashboard/Widget Mockup */}
        <div className="max-w-3xl mx-auto bg-slate-50 border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-xl shadow-slate-100/50 relative">
          
          {/* Card Glass Overlay */}
          <div className="bg-white rounded-2xl border border-slate-200/50 p-6 shadow-sm relative overflow-hidden flex flex-col gap-6">
            
            {/* Top Row: User identity & Wallet */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
              <div className="flex items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150"
                  alt="Identity Avatar"
                  className="h-14 w-14 rounded-full object-cover ring-2 ring-zinc-100 grayscale hover:grayscale-0 transition-[filter] duration-300"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-slate-900 text-lg">Alex Rivera</h3>
                    <ShieldCheck weight="fill" className="h-4 w-4 text-zinc-400" />
                  </div>
                  <p className="text-sm font-semibold text-slate-500">@technomad23</p>
                </div>
              </div>

              <div>
                <button
                  onClick={() => setFeedSubscribed(!feedSubscribed)}
                  className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all active:scale-95 shadow-sm border ${
                    feedSubscribed
                      ? "bg-zinc-100 border-zinc-200 text-zinc-800 hover:bg-zinc-200"
                      : "bg-zinc-900 border-zinc-900 text-white hover:bg-zinc-800 hover:border-zinc-800"
                  }`}
                >
                  <Pulse className="h-4 w-4" />
                  {feedSubscribed ? "Subscribed to Curation Feed" : "Subscribe to Feed"}
                </button>
              </div>
            </div>

            {/* Bottom Row: Score & Widget details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Left col: Blueprint Score */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/50 flex flex-col justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 tracking-wider uppercase mb-3">
                  <Trophy className="h-4 w-4 text-zinc-500" />
                  Influence Score
                </div>
                <div>
                  <span className="text-3xl font-extrabold text-slate-900">850</span>
                  <span className="text-xs font-bold text-zinc-500 ml-1.5">+15.2%</span>
                  <p className="text-[10px] text-slate-400 font-semibold mt-1">Saves and upvotes on things that shaped you.</p>
                </div>
              </div>

              {/* Middle col: Connected Accounts */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/50 flex flex-col justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 tracking-wider uppercase mb-3">
                  <Lightning className="h-4 w-4 text-zinc-500" />
                  Niches Covered
                </div>
                <div>
                  <span className="text-3xl font-extrabold text-slate-900">28</span>
                  <p className="text-[10px] text-slate-400 font-semibold mt-2">Tech, design, science, photography, fitness...</p>
                </div>
              </div>

              {/* Right col: Network status */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/50 flex flex-col justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 tracking-wider uppercase mb-3">
                  <Pulse className="h-4 w-4 text-zinc-500" />
                  Shelf Status
                </div>
                <div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-900 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                    <span className="h-2 w-2 rounded-full bg-zinc-900 animate-ping" />
                    Live & Active
                  </span>
                  <p className="text-[10px] text-slate-400 font-semibold mt-2.5">New influences added by the community every minute.</p>
                </div>
              </div>

            </div>

          </div>

          {/* Decorative floating widgets around the dashboard */}
          <div className="absolute -left-12 bottom-6 hidden lg:block p-3 rounded-xl bg-white border border-slate-200 shadow-md transform -rotate-6">
            <span className="text-xs font-bold text-slate-900 flex items-center gap-1">
              <Check className="h-3 w-3 text-zinc-900" /> Verified Curation
            </span>
          </div>

          <div className="absolute -right-8 top-16 hidden lg:block p-3 rounded-xl bg-white border border-slate-200 shadow-md transform rotate-3">
            <span className="text-xs font-bold text-slate-900 flex items-center gap-1">
              Total Follows: 1.4k
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
