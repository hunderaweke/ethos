import { ArrowLeft, ShareNetwork, Check } from "@phosphor-icons/react";

interface ProfileHeaderProps {
  copied: boolean;
  onShare: () => void;
  onBack: () => void;
}

export default function ProfileHeader({ copied, onShare, onBack }: ProfileHeaderProps) {
  return (
    <div className="w-full">
      {/* Back navigation header */}
      <div className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-zinc-200 px-4 py-3.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button 
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-zinc-500 hover:text-black transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to blueprint.id
          </button>
          
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 bg-black animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-wider text-zinc-500">Live mind-shelf</span>
          </div>
        </div>
      </div>

      {/* Hero Profile Banner & Metadata */}
      <div className="max-w-6xl mx-auto px-4 mt-8">
        {/* Abstract Blueprint/Drafting Banner Card */}
        <div className="relative h-48 sm:h-64 border border-zinc-200 bg-zinc-50 overflow-hidden select-none">
          {/* Blueprint Grid Background */}
          <div 
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(24, 24, 27, 0.5) 1px, transparent 1px),
                linear-gradient(90deg, rgba(24, 24, 27, 0.5) 1px, transparent 1px)
              `,
              backgroundSize: "24px 24px"
            }}
          />
          
          {/* Diagonal Drafting Lines */}
          <svg className="absolute inset-0 w-full h-full text-zinc-300/60" xmlns="http://www.w3.org/2000/svg">
            <line x1="-10%" y1="10%" x2="110%" y2="90%" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8" />
            <line x1="-10%" y1="90%" x2="110%" y2="10%" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8" />
            
            {/* Outline Circle (Compass mark) */}
            <circle cx="50%" cy="50%" r="80" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="2 4" />
            <circle cx="50%" cy="50%" r="120" stroke="currentColor" strokeWidth="1" fill="none" />
            <circle cx="50%" cy="50%" r="4" fill="currentColor" />
            
            {/* Coordinate markings */}
            <line x1="50%" y1="10%" x2="50%" y2="90%" stroke="currentColor" strokeWidth="0.5" />
            <line x1="10%" y1="50%" x2="90%" y2="50%" stroke="currentColor" strokeWidth="0.5" />
          </svg>

          {/* Glowing/Fade gradient overlays for depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-100/50 via-transparent to-zinc-100/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-zinc-50" />
          
          {/* Subtle floating drafting nodes */}
          <div className="absolute left-[15%] top-[30%] w-3 h-3 border border-zinc-400 rotate-45" />
          <div className="absolute right-[20%] top-[40%] w-4 h-4 border border-zinc-400 rounded-full" />
          <div className="absolute right-[35%] bottom-[20%] w-2 h-2 bg-zinc-400" />
        </div>

        {/* Profile Details Container */}
        <div className="relative px-6 sm:px-12 pb-8 border-b border-zinc-200 flex flex-col md:flex-row md:items-end justify-between gap-6">
          
          {/* Avatar Image (Absolutely Positioned, pulled up) */}
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
            alt="Alex Rivera"
            className="absolute left-6 sm:left-12 -top-16 sm:-top-20 h-32 w-32 sm:h-36 sm:w-36 object-cover border border-zinc-200 bg-white z-10 shadow-sm"
          />
          
          {/* Profile Text Block */}
          <div className="pt-20 md:pt-4 md:pl-44 mb-2 flex-1 text-left">
            <div className="flex flex-wrap items-center justify-start gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-950">Alex Rivera</h1>
              
            </div>
            <p className="text-xs font-bold text-zinc-500 mt-1">blueprint.id/@technomad23</p>
            <p className="text-sm text-zinc-650 font-medium mt-3 max-w-xl leading-relaxed">
              Building tools for builders. Shaped by systems engineering, design history, and philosophical essays.
            </p>
            <div className="flex gap-4 items-center justify-start mt-4 text-[10px] font-black uppercase tracking-wider text-zinc-400">
              <span><strong className="text-zinc-900">14</strong> Influences</span>
              <span className="h-1.5 w-1.5 bg-zinc-200" />
              <span><strong className="text-zinc-900">2.4k</strong> Followers</span>
            </div>
          </div>

          {/* Social share actions */}
          <div className="flex gap-3 justify-center md:mb-2 w-full md:w-auto z-10">
            <button 
              onClick={onShare}
              className="inline-flex items-center justify-center gap-1.5 border border-zinc-200 bg-white hover:bg-zinc-50 px-4 py-2.5 text-xs font-black uppercase tracking-wider text-zinc-700 active:scale-98 transition-all cursor-pointer w-full md:w-auto"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-zinc-900" /> : <ShareNetwork className="h-3.5 w-3.5" />}
              {copied ? "Copied Link" : "Share Shelf"}
            </button>
            <button className="inline-flex items-center justify-center gap-1.5 bg-black hover:bg-zinc-900 text-white px-5 py-2.5 text-xs font-black uppercase tracking-wider active:scale-98 transition-all cursor-pointer w-full md:w-auto">
              Follow Shelf
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
