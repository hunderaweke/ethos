import { useState } from "react";
import { Sparkles, Check, ArrowRight } from "lucide-react";

export default function FooterCTA() {
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
    <section id="claim" className="relative py-24 overflow-hidden bg-slate-900 text-white">
      {/* Background gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-pink-500/10 blur-3xl -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3.5 py-1 text-xs font-semibold tracking-wider text-indigo-300 uppercase mb-6">
          <Sparkles className="h-3 w-3 text-indigo-400 fill-indigo-400" />
          Get Started
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-6 max-w-2xl mx-auto leading-tight">
          Claim your curation handle today.
        </h2>

        {/* Claim Box */}
        <form
          onSubmit={handleClaim}
          className="relative max-w-lg mx-auto p-1.5 rounded-full bg-white/5 backdrop-blur-md shadow-xl border border-white/10 flex items-center group transition-all focus-within:ring-2 focus-within:ring-indigo-500/50"
        >
          <div className="flex items-center pl-4 text-slate-400 font-medium">
            <span className="text-indigo-400 font-bold select-none text-base">ethos.id/@</span>
          </div>
          <input
            type="text"
            placeholder="handle"
            value={username}
            onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))}
            className="w-full pl-1 pr-3 py-2 text-base text-white placeholder-slate-500 bg-transparent focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-full bg-white px-6 py-2.5 text-sm font-bold text-slate-900 hover:bg-slate-100 transition-all flex items-center gap-1.5 whitespace-nowrap active:scale-95 shadow-md"
          >
            {isClaimed ? (
              <>
                <Check className="h-4 w-4 text-emerald-600" />
                Claimed!
              </>
            ) : (
              <>
                Claim Handle
                <ArrowRight className="h-4 w-4 text-slate-900" />
              </>
            )}
          </button>
        </form>

        {/* Bottom stats text */}
        <p className="mt-6 text-xs font-semibold text-slate-400">
          Join 10k+ curators and creators. Free forever.
        </p>

      </div>

      {/* Floating Decorative Cards */}
      <div className="hidden xl:block absolute left-16 top-16 w-52 p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md animate-float-slow">
        <div className="flex items-center gap-3">
          <img
            src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=120"
            alt="Alex"
            className="h-8 w-8 rounded-full object-cover"
          />
          <div>
            <h4 className="text-xs font-bold text-white">Alex Rivera</h4>
            <p className="text-[10px] text-slate-400 font-medium">@technomad23 claimed</p>
          </div>
        </div>
      </div>

      <div className="hidden xl:block absolute right-16 bottom-16 w-52 p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md animate-float-medium">
        <div className="flex items-center gap-3">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120"
            alt="Sarah"
            className="h-8 w-8 rounded-full object-cover"
          />
          <div>
            <h4 className="text-xs font-bold text-white">Sarah Miller</h4>
            <p className="text-[10px] text-slate-400 font-medium">@sarah_m claimed</p>
          </div>
        </div>
      </div>
    </section>
  );
}
