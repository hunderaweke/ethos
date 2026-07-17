import { useState } from "react";
import { LinkSimple, ShoppingCart, Globe, Check, YoutubeLogo, Laptop, Heart, BookOpen, VideoCamera, Microphone, MagnifyingGlass } from "@phosphor-icons/react";

export default function InteractiveFeatures() {
  const [activeTab, setActiveTab] = useState("cards");

  const tabs = [
    {
      id: "cards",
      label: "Influence Cards",
      description: "Display icons, tags, views, and impact notes for each influence.",
      icon: LinkSimple,
      colorClass: "bg-zinc-100 text-zinc-900 border-zinc-300",
    },
    {
      id: "filter",
      label: "Influence Sorting",
      description: "Let visitors filter your shelf by books, videos, articles, or custom tags.",
      icon: ShoppingCart,
      colorClass: "bg-zinc-900 text-white border-zinc-800",
    },
    {
      id: "handles",
      label: "Shareable Handles",
      description: "Map your unique handle (e.g., blueprint.id/@username) to share your mind's blueprint.",
      icon: Globe,
      colorClass: "bg-zinc-50 text-zinc-800 border-zinc-200",
    },
  ];

  return (
    <section className="py-20 bg-white border-b border-zinc-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Tab options */}
          <div className="flex flex-col gap-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`text-left p-6 rounded-2xl border transition-all duration-300 flex items-start gap-4 active:scale-98 ${
                    isActive
                      ? "bg-zinc-50 border-black shadow-xs"
                      : "bg-white border-slate-100 hover:bg-slate-50/50 hover:border-slate-200"
                  }`}
                >
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${tab.colorClass}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">{tab.label}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">{tab.description}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Simulated Preview */}
          <div className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200 flex items-center justify-center min-h-[380px]">
            {activeTab === "cards" && (
              <div className="w-full max-w-sm bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col gap-4 animate-fade-in">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-3">
                  Influence Card Preview
                </h4>
                
                <div className="p-4 rounded-xl border border-slate-200 bg-white flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <span className="px-2.5 py-0.5 rounded-full bg-zinc-100 text-[10px] font-bold text-zinc-950 border border-zinc-200 inline-flex items-center gap-1">
                      <YoutubeLogo className="h-3 w-3" /> YouTube
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold">1,248 views</span>
                  </div>

                  <div>
                    <h5 className="font-bold text-slate-900 text-sm">Fireship</h5>
                    <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
                      "100-seconds explanations. Shaped my modern dev workflow."
                    </p>
                  </div>

                  <div className="flex justify-between items-center mt-2 border-t border-slate-100 pt-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-zinc-900 text-[9px] font-bold text-white inline-flex items-center gap-1">
                      <Laptop className="h-3 w-3" /> Tech & Dev
                    </span>
                    <span className="text-[10px] font-extrabold text-slate-700 inline-flex items-center gap-1"><Heart weight="fill" className="h-3 w-3" /> 124 saves</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "filter" && (
              <div className="w-full max-w-sm bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col gap-4 animate-fade-in">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-3">
                  Influence Filter Demonstration
                </h4>
                
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 rounded-full bg-black text-white text-xs font-bold cursor-pointer inline-flex items-center gap-1.5">
                    <BookOpen className="h-3.5 w-3.5" /> Books (Active)
                  </span>
                  <span className="px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-semibold cursor-pointer hover:bg-slate-200 inline-flex items-center gap-1.5">
                    <VideoCamera className="h-3.5 w-3.5" /> Creators
                  </span>
                  <span className="px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-semibold cursor-pointer hover:bg-slate-200 inline-flex items-center gap-1.5">
                    <Microphone className="h-3.5 w-3.5" /> Podcasts
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-bold text-slate-600 text-center inline-flex items-center justify-center gap-1.5 w-full">
                  <MagnifyingGlass className="h-3.5 w-3.5" /> Displaying <span className="text-black font-extrabold">12 books & essays</span> on this shelf
                </div>
              </div>
            )}

            {activeTab === "handles" && (
              <div className="w-full max-w-sm bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between min-h-[220px] animate-fade-in">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-3 mb-4">
                    Handle registration
                  </h4>
                  
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-100 border border-zinc-200">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-black animate-ping" />
                      <span className="font-bold text-sm text-zinc-900">blueprint.id/@technomad23</span>
                    </div>
                    <span className="inline-flex items-center gap-0.5 text-[10px] font-black text-zinc-800 bg-white px-2 py-0.5 rounded-full border border-zinc-300">
                      <Check className="h-3 w-3" /> Claimed
                    </span>
                  </div>
                </div>

                <p className="text-[10px] text-slate-400 font-semibold text-center mt-4">
                  Share your mind's blueprint with one clean link.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
