import { useState } from "react";
import { Link2, ShoppingCart, Globe, ArrowUpRight, Check } from "lucide-react";

export default function InteractiveFeatures() {
  const [activeTab, setActiveTab] = useState("cards");

  const tabs = [
    {
      id: "cards",
      label: "Resource Cards",
      description: "Display platform icons, niche tags, view counters, and upvotes for each follow.",
      icon: Link2,
      colorClass: "bg-indigo-50 text-indigo-600 border-indigo-200",
    },
    {
      id: "filter",
      label: "Niche Filtering",
      description: "Let visitors sort your directory by Tech, Design, Gaming, Fitness, or custom tags.",
      icon: ShoppingCart,
      colorClass: "bg-pink-50 text-pink-600 border-pink-200",
    },
    {
      id: "handles",
      label: "Shareable Handles",
      description: "Map your unique handle (e.g., ethos.id/@username) to share on social bio links.",
      icon: Globe,
      colorClass: "bg-cyan-50 text-cyan-600 border-cyan-200",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Features in action
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            See how Ethos helps you curate, filter, and share your recommendations.
          </p>
        </div>

        {/* Tab content wrapper */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Tab selection */}
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
                      ? "bg-slate-50 border-slate-300 shadow-sm"
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
                  Resource Card Preview
                </h4>
                
                <div className="p-4 rounded-xl border border-slate-200 bg-white flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <span className="px-2.5 py-0.5 rounded-full bg-red-50 text-[10px] font-bold text-red-600 border border-red-200">
                      🎥 YouTube
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold">1,248 views</span>
                  </div>
                  
                  <div>
                    <h5 className="font-bold text-slate-900 text-sm">Fireship</h5>
                    <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
                      "100-seconds tech explanations. Keeps me updated on coding trends."
                    </p>
                  </div>

                  <div className="flex justify-between items-center mt-2 border-t border-slate-100 pt-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-[9px] font-bold text-indigo-600">
                      💻 Tech & Dev
                    </span>
                    <span className="text-[10px] font-extrabold text-slate-700">❤️ 124 saves</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "filter" && (
              <div className="w-full max-w-sm bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col gap-4 animate-fade-in">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-3">
                  Niche Filter Demonstration
                </h4>
                
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 rounded-full bg-indigo-600 text-white text-xs font-bold cursor-pointer">
                    💻 Tech (Active)
                  </span>
                  <span className="px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-semibold cursor-pointer hover:bg-slate-200">
                    🎨 Design
                  </span>
                  <span className="px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-semibold cursor-pointer hover:bg-slate-200">
                    🔬 Science
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-bold text-slate-600 text-center">
                  🔍 Displaying <span className="text-indigo-600 font-extrabold">12 recommended channels</span> in Tech
                </div>
              </div>
            )}

            {activeTab === "handles" && (
              <div className="w-full max-w-sm bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between min-h-[220px] animate-fade-in">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-3 mb-4">
                    Handle registration
                  </h4>
                  
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-50 border border-emerald-100">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                      <span className="font-bold text-sm text-emerald-800">ethos.id/@technomad23</span>
                    </div>
                    <span className="inline-flex items-center gap-0.5 text-[10px] font-black text-emerald-600 bg-white px-2 py-0.5 rounded-full border border-emerald-200">
                      <Check className="h-3 w-3" /> Claimed
                    </span>
                  </div>
                </div>

                <p className="text-[10px] text-slate-400 font-semibold text-center mt-4">
                  Every page is search engine optimized to build your audience.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
