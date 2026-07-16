import { useState } from "react";
import { ChevronLeft, ChevronRight, Share2, Plus, Heart, Music, Image as ImageIcon, Compass } from "lucide-react";

export default function ProfileShowcase() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <section id="showcase" className="py-20 bg-slate-50 border-y border-slate-200/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div id="profile" className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Explore public curation profiles
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Every user gets a unique, shareable profile where others can explore their full curated shelf of follows.
          </p>
        </div>

        {/* Profile Card Container */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl shadow-slate-100/80 border border-slate-200 overflow-hidden">
          {/* Profile Header */}
          <div className="p-6 sm:p-8 border-b border-slate-100 flex flex-col sm:flex-row items-center sm:justify-between gap-6 bg-gradient-to-r from-slate-50/50 to-white">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <img
                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150"
                alt="Alex Rivera"
                className="h-16 w-16 rounded-full object-cover ring-4 ring-slate-100 shadow-sm"
              />
              <div>
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <h3 className="text-xl font-bold text-slate-900">Alex Rivera</h3>
                  <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-brand-indigo ring-1 ring-inset ring-indigo-700/10">
                    Full-Stack
                  </span>
                </div>
                <p className="text-sm font-medium text-slate-500">@technomad23</p>
                <p className="text-xs text-slate-400 mt-0.5">2.4k followers • Sharing coding channels, tech substacks, & books</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-2.5 rounded-full border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50 active:scale-95 transition-all">
                <Share2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setIsFollowing(!isFollowing)}
                className={`flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold transition-all active:scale-95 shadow-sm ${
                  isFollowing
                    ? "bg-slate-100 text-slate-800 hover:bg-slate-200"
                    : "bg-slate-900 text-white hover:bg-slate-800"
                }`}
              >
                {!isFollowing && <Plus className="h-4 w-4" />}
                {isFollowing ? "Following" : "Follow"}
              </button>
            </div>
          </div>

          {/* Grid Layout of Content Blocks */}
          <div className="p-6 sm:p-8 bg-slate-50/50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Main Book Recommendation (Tall) */}
              <div className="md:row-span-2 group relative overflow-hidden rounded-2xl bg-white border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="aspect-[3/4] md:h-full relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600"
                    alt="Designing Data-Intensive Applications"
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-transparent flex flex-col justify-end p-5 text-white">
                    <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-amber-400 mb-1.5">
                      📖 Book Recommendation
                    </span>
                    <h4 className="font-bold text-base leading-tight">Designing Data-Intensive Applications</h4>
                    <p className="text-[10px] text-slate-300 mt-1.5 leading-relaxed">
                      "Why I follow: The absolute bible for understanding distributed systems and database choices. A must-read."
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2: YouTube Follow Widget */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-red-500 text-white flex items-center justify-center shadow-md">
                    <span className="font-extrabold text-sm">YT</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Fireship</h4>
                    <p className="text-[10px] text-slate-400 font-semibold truncate max-w-[150px]">100-seconds tech explanations</p>
                  </div>
                </div>
                <a
                  href="#"
                  className="h-8 px-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center transition-colors"
                >
                  Visit
                </a>
              </div>

              {/* Card 3: Card Recommendation metrics */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="px-2 py-0.5 rounded-full bg-rose-50 text-[10px] font-bold text-rose-600 ring-1 ring-inset ring-rose-600/10">
                    UPVOTES
                  </span>
                  <Heart className="h-4 w-4 text-slate-400 hover:text-rose-500 cursor-pointer transition-colors" />
                </div>
                <div className="mt-4">
                  <span className="text-3xl font-extrabold text-slate-900">348</span>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Recommendations saved by others</p>
                </div>
              </div>

              {/* Card 4: Grid Layout of Smaller Images (Instagram/Pinterest integration) */}
              <div className="md:col-span-2 p-5 rounded-2xl bg-white border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <ImageIcon className="h-4 w-4 text-brand-indigo" />
                    Pinterest & Design Inspiration Board
                  </h4>
                  <a href="#" className="text-xs font-semibold text-brand-indigo hover:underline">
                    View list
                  </a>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="aspect-square rounded-xl overflow-hidden bg-slate-100">
                    <img
                      src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=200"
                      alt="UI UIX"
                      className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="aspect-square rounded-xl overflow-hidden bg-slate-100">
                    <img
                      src="https://images.unsplash.com/photo-1541462608141-2f5287b4e665?auto=format&fit=crop&q=80&w=200"
                      alt="Typography"
                      className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="aspect-square rounded-xl overflow-hidden bg-slate-100">
                    <img
                      src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=200"
                      alt="Workspace"
                      className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Slider Bar */}
          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-center gap-4 bg-white">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-full hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
            >
              <ChevronLeft className="h-5 w-5 text-slate-600" />
            </button>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest select-none">
              Shelf {currentPage} / 4
            </span>
            <button
              onClick={() => setCurrentPage(Math.min(4, currentPage + 1))}
              disabled={currentPage === 4}
              className="p-1.5 rounded-full hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
            >
              <ChevronRight className="h-5 w-5 text-slate-600" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
