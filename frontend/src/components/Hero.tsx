import { useState } from "react";
import { ArrowRight, Sparkles, Check, Heart, MessageSquare } from "lucide-react";

export default function Hero() {
  const [username, setUsername] = useState("");
  const [isClaimed, setIsClaimed] = useState(false);

  const handleClaim = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      setIsClaimed(true);
      setTimeout(() => setIsClaimed(false), 3000);
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 py-20 lg:py-32">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/4 left-1/10 h-72 w-72 rounded-full bg-indigo-200/40 blur-3xl" />
      <div className="absolute top-1/3 right-1/10 h-80 w-80 rounded-full bg-pink-200/30 blur-3xl" />
      <div className="absolute bottom-10 left-1/3 h-96 w-96 rounded-full bg-cyan-100/40 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 border border-indigo-100 px-3.5 py-1 text-xs font-semibold tracking-wider text-brand-indigo uppercase mb-6 animate-fade-in">
            <Sparkles className="h-3 w-3 text-indigo-500 fill-indigo-100" />
            Share What You Follow • Discover What's Worth Following
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-slate-900 leading-tight mb-6">
            Your{" "}
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-brand-indigo to-brand-violet font-extrabold">
              forever list
              <span className="absolute left-0 bottom-1 h-1 w-full bg-gradient-to-r from-brand-indigo to-brand-violet rounded-full opacity-35" />
            </span>{" "}
            of{" "}
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-brand-violet to-brand-pink font-extrabold">
              who you follow.
              <span className="absolute left-0 bottom-1 h-1 w-full bg-gradient-to-r from-brand-violet to-brand-pink rounded-full opacity-35" />
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto mb-10">
            Curate your digital diet. Show the world the YouTube channels, GitHub repos, TikTok creators, and substacks that shape your mind.
          </p>

          {/* Claim Username Input */}
          <form
            onSubmit={handleClaim}
            className="relative max-w-lg mx-auto p-1.5 rounded-full bg-white shadow-xl shadow-slate-200/60 border border-slate-200 flex items-center group transition-all focus-within:ring-2 focus-within:ring-brand-indigo/20 focus-within:border-brand-indigo"
          >
            {/* Pulsing Gradient Border Effect */}
            <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-brand-cyan via-brand-indigo to-brand-pink opacity-20 blur group-hover:opacity-40 transition duration-500 -z-10" />

            <div className="flex items-center pl-4 text-slate-400 font-medium">
              <span className="text-brand-indigo font-bold select-none text-base">ethos.id/@</span>
            </div>
            <input
              type="text"
              placeholder="handle"
              value={username}
              onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))}
              className="w-full pl-1 pr-3 py-2 text-base text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-full bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition-all flex items-center gap-1.5 whitespace-nowrap active:scale-95 shadow-md shadow-slate-900/10"
            >
              {isClaimed ? (
                <>
                  <Check className="h-4 w-4 text-emerald-400" />
                  Claimed!
                </>
              ) : (
                <>
                  Claim Handle
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Claim Subtext */}
          <p className="mt-4 text-xs font-semibold text-slate-500">
            Always free. <span className="text-brand-indigo underline cursor-pointer hover:text-indigo-700">Claim your @handle now.</span>
          </p>
        </div>
      </div>

      {/* Floating Card Elements (Visual decorations from reference) */}
      <div className="hidden xl:block absolute left-12 top-24 w-60 p-4 rounded-2xl bg-white/80 backdrop-blur-md shadow-lg border border-slate-200/50 animate-float-slow transition-transform hover:-translate-y-2">
        <div className="flex items-center gap-3">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120"
            alt="Sarah"
            className="h-10 w-10 rounded-full object-cover ring-2 ring-indigo-50"
          />
          <div>
            <h4 className="text-sm font-semibold text-slate-900">Sarah Miller</h4>
            <p className="text-xs text-slate-500">Curating: Tech & Science</p>
          </div>
        </div>
        <div className="mt-3 flex gap-1.5 flex-wrap">
          <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-[10px] font-semibold text-brand-indigo">🎥 @fireship</span>
          <span className="px-2 py-0.5 rounded-full bg-pink-50 text-[10px] font-semibold text-brand-pink">🔬 @veritasium</span>
        </div>
      </div>

      <div className="hidden xl:block absolute right-12 top-24 w-64 p-4 rounded-2xl bg-white/80 backdrop-blur-md shadow-lg border border-slate-200/50 animate-float-medium transition-transform hover:-translate-y-2">
        <div className="flex items-center gap-3">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120"
            alt="Liam"
            className="h-10 w-10 rounded-full object-cover ring-2 ring-pink-50"
          />
          <div>
            <h4 className="text-sm font-semibold text-slate-900">Liam Carter</h4>
            <p className="text-xs text-slate-500">Curating: Design & Dev</p>
          </div>
          <span className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-pink-50 text-brand-pink text-xs font-semibold">
            ✦
          </span>
        </div>
        <div className="mt-3 flex justify-between items-center text-xs text-slate-500 border-t border-slate-100 pt-2.5">
          <span className="flex items-center gap-1">🎙️ @lexfridman</span>
          <span className="flex items-center gap-1">🎨 @design_weekly</span>
        </div>
      </div>

      {/* Floating images / graphics on outer limits */}
      <div className="hidden lg:block absolute left-8 bottom-16 h-36 w-48 rounded-2xl overflow-hidden border-4 border-white shadow-xl rotate-[-6deg] animate-float-medium hover:rotate-0 transition-transform duration-300">
        <img
          src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400"
          alt="Lifestyle"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="hidden lg:block absolute right-10 bottom-20 h-44 w-36 rounded-2xl overflow-hidden border-4 border-white shadow-xl rotate-[6deg] animate-float-slow hover:rotate-0 transition-transform duration-300">
        <img
          src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=400"
          alt="Style"
          className="h-full w-full object-cover"
        />
      </div>
    </section>
  );
}
