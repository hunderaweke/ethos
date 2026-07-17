import { ArrowRight } from "@phosphor-icons/react";
import { getSocialMediaColor } from "../utils/color";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-white border-t border-zinc-200 relative overflow-hidden">
      {/* Decorative Grid Lines to match blueprint theme */}
      <div className="absolute inset-x-0 top-0 h-px bg-zinc-200" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Vision & Concept */}
          <div className="lg:col-span-5 flex flex-col justify-center gap-6">
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
              The Philosophy
            </span>
            <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 leading-[1.1] sm:text-5xl font-sans">
              You are the sum of your inputs.
            </h2>
            <p className="text-base text-zinc-500 font-medium leading-relaxed mt-2">
              In a world crowded by noisy feeds and algorithmic content, we believe the most valuable index is human curation. Your blueprint is a self-owned graph of the books, podcasts, designers, and articles that truly shaped your mind.
            </p>
            <p className="text-base text-zinc-500 font-medium leading-relaxed">
              No vanity metrics, no short-form distraction—just verified curation shelves that show how worldview is constructed.
            </p>
            
            <div className="mt-4">
              <a 
                href="#claim" 
                className="inline-flex items-center gap-2 text-sm font-bold text-black hover:text-zinc-650 transition-colors"
              >
                Claim your handle <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Visual Diagram representing a Mind Map */}
          <div className="lg:col-span-7 relative flex items-center justify-center p-8 bg-slate-50 border border-zinc-200 overflow-hidden h-[450px]">
            {/* Blueprint grid lines on diagram container */}
            <div 
              className="absolute inset-0 opacity-40 pointer-events-none"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(24, 24, 27, 0.06) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(24, 24, 27, 0.06) 1px, transparent 1px)
                `,
                backgroundSize: "20px 20px"
              }}
            />

            {/* Central Node representing Curator Identity */}
            <div className="relative z-10 flex flex-col items-center justify-center gap-3 bg-white p-6 rounded-2xl border border-zinc-200 shadow-md max-w-xs text-center">
              <div className="h-10 w-10 rounded-xl bg-black text-white flex items-center justify-center font-bold shadow-sm">
                @
              </div>
              <div>
                <h4 className="text-sm font-black text-slate-900">Curator Identity</h4>
                <p className="text-[10px] text-zinc-400 font-semibold mt-0.5">blueprint.id/handle</p>
              </div>
            </div>

            {/* Node 1: Books (Connected via drafting line) */}
            <div className="absolute left-8 top-12 z-10 flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-zinc-200 shadow-xs">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: getSocialMediaColor("goodreads") }} />
              <span className="text-[11px] font-bold text-slate-800">14 Books Read</span>
            </div>
            {/* Connection Line 1 */}
            <svg className="absolute inset-0 h-full w-full pointer-events-none" style={{ zIndex: 0 }}>
              <line 
                x1="22%" y1="18%" x2="50%" y2="50%" 
                stroke="rgba(24,24,27,0.15)" strokeWidth="1.5" strokeDasharray="4 4"
              />
              <circle cx="22%" cy="18%" r="3" fill="#cbd5e1" />
            </svg>

            {/* Node 2: Podcasts (Connected via drafting line) */}
            <div className="absolute right-8 top-16 z-10 flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-zinc-200 shadow-xs">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: getSocialMediaColor("spotify") }} />
              <span className="text-[11px] font-bold text-slate-800">8 Podcasts Added</span>
            </div>
            {/* Connection Line 2 */}
            <svg className="absolute inset-0 h-full w-full pointer-events-none" style={{ zIndex: 0 }}>
              <line 
                x1="78%" y1="23%" x2="50%" y2="50%" 
                stroke="rgba(24,24,27,0.15)" strokeWidth="1.5" strokeDasharray="4 4"
              />
              <circle cx="78%" cy="23%" r="3" fill="#cbd5e1" />
            </svg>

            {/* Node 3: Design (Connected via drafting line) */}
            <div className="absolute left-10 bottom-16 z-10 flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-zinc-200 shadow-xs">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: getSocialMediaColor("figma") }} />
              <span className="text-[11px] font-bold text-slate-800">4 Figma Libraries</span>
            </div>
            {/* Connection Line 3 */}
            <svg className="absolute inset-0 h-full w-full pointer-events-none" style={{ zIndex: 0 }}>
              <line 
                x1="26%" y1="80%" x2="50%" y2="50%" 
                stroke="rgba(24,24,27,0.15)" strokeWidth="1.5" strokeDasharray="4 4"
              />
              <circle cx="26%" cy="80%" r="3" fill="#cbd5e1" />
            </svg>

            {/* Node 4: Writing/News (Connected via drafting line) */}
            <div className="absolute right-12 bottom-12 z-10 flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-zinc-200 shadow-xs">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: getSocialMediaColor("substack") }} />
              <span className="text-[11px] font-bold text-slate-800">6 Newsletters</span>
            </div>
            {/* Connection Line 4 */}
            <svg className="absolute inset-0 h-full w-full pointer-events-none" style={{ zIndex: 0 }}>
              <line 
                x1="76%" y1="85%" x2="50%" y2="50%" 
                stroke="rgba(24,24,27,0.15)" strokeWidth="1.5" strokeDasharray="4 4"
              />
              <circle cx="76%" cy="85%" r="3" fill="#cbd5e1" />
            </svg>

          </div>

        </div>

      </div>
    </section>
  );
}
