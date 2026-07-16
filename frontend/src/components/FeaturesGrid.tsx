import { useState } from "react";
import { FolderGit, Palette, ChevronRight, Lock, Sparkles } from "lucide-react";

export default function FeaturesGrid() {
  const [selectedColor, setSelectedColor] = useState("indigo");

  const colors = [
    { name: "indigo", bg: "bg-indigo-600", value: "#4f46e5" },
    { name: "pink", bg: "bg-pink-600", value: "#ec4899" },
    { name: "cyan", bg: "bg-cyan-500", value: "#06b6d4" },
    { name: "emerald", bg: "bg-emerald-600", value: "#10b981" },
    { name: "amber", bg: "bg-amber-500", value: "#f59e0b" },
  ];

  return (
    <section id="features" className="py-20 bg-slate-50 border-t border-slate-200/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Everything you need, built to share
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Manage your curated follows, search other builders' directories, and share your personal notes on who you follow.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Card 1: Personal Dashboard */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300">
            <div>
              {/* Graphic Mockup */}
              <div className="bg-slate-50 rounded-2xl border border-slate-100 p-4 h-48 mb-6 flex flex-col justify-between relative overflow-hidden">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <FolderGit className="h-3.5 w-3.5" /> Curate / Follow Shelf
                </div>
                
                <div className="flex flex-col gap-2">
                  <div className="p-2 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between text-xs font-bold text-slate-700">
                    <span className="flex items-center gap-1.5"><Lock className="h-3.5 w-3.5 text-brand-indigo" /> youtube_channels.json</span>
                    <span className="text-[10px] text-slate-400 font-semibold">14 items</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between text-xs font-bold text-slate-700">
                    <span className="flex items-center gap-1.5"><Lock className="h-3.5 w-3.5 text-brand-indigo" /> github_stars.json</span>
                    <span className="text-[10px] text-slate-400 font-semibold">28 items</span>
                  </div>
                </div>

                <div className="absolute -right-4 -bottom-4 h-16 w-16 bg-brand-indigo/10 rounded-full blur-xl" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-2">Personal Dashboard</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                A clean space to manage all your follows. Select platforms, input username handles, add niche tags, and write a quick description explaining why you recommend them.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-bold text-brand-indigo hover:text-indigo-700 cursor-pointer">
              Read curation guide <ChevronRight className="h-3.5 w-3.5 ml-1" />
            </div>
          </div>

          {/* Card 2: Search & Discovery */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300">
            <div>
              {/* Graphic Mockup */}
              <div className="bg-slate-50 rounded-2xl border border-slate-100 p-4 h-48 mb-6 flex flex-wrap gap-3.5 items-center justify-center relative overflow-hidden">
                <span className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 shadow-xs font-semibold text-xs text-slate-800 flex items-center gap-1">
                  💻 Tech
                </span>
                <span className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 shadow-xs font-semibold text-xs text-slate-800 flex items-center gap-1">
                  🎨 Design
                </span>
                <span className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 shadow-xs font-semibold text-xs text-slate-800 flex items-center gap-1">
                  💪 Fitness
                </span>
                <span className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 shadow-xs font-semibold text-xs text-slate-800 flex items-center gap-1">
                  🎮 Gaming
                </span>
                
                <div className="absolute -left-4 -bottom-4 h-16 w-16 bg-brand-pink/10 rounded-full blur-xl" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-2">Search & Discovery</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Browse through the directory with powerful filters. Sort by specific platforms, filter by niches, or search keywords inside recommendations.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-bold text-brand-indigo hover:text-indigo-700 cursor-pointer">
              Explore search filters <ChevronRight className="h-3.5 w-3.5 ml-1" />
            </div>
          </div>

          {/* Card 3: Shareable Profiles & Handles */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300">
            <div>
              {/* Graphic Mockup */}
              <div className="bg-slate-50 rounded-2xl border border-slate-100 p-4 h-48 mb-6 flex flex-col justify-between relative overflow-hidden">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <Palette className="h-3.5 w-3.5 text-slate-400" /> Theme Editor
                </div>

                {/* Simulated Custom Theme Preview */}
                <div className="my-auto flex items-center justify-center gap-3">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`h-8 w-8 rounded-full border-2 transition-all duration-300 ${color.bg} ${
                        selectedColor === color.name
                          ? "border-slate-900 scale-110 shadow-md"
                          : "border-transparent hover:scale-105"
                      }`}
                    />
                  ))}
                </div>

                <div className="p-2 rounded-xl bg-white border border-slate-200/80 shadow-xs text-center text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                  Custom theme: <span className="uppercase text-brand-indigo font-black">{selectedColor}</span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-2">Shareable Profiles</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Every user gets a custom @handle link (e.g. ethos.id/@technomad23) to share on their bio or profiles, making their lists instantly accessible to anyone.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-bold text-brand-indigo hover:text-indigo-700 cursor-pointer">
              View demo profiles <ChevronRight className="h-3.5 w-3.5 ml-1" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
