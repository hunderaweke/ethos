import { useState } from "react";
import { Check, ArrowCircleUpRightIcon } from "@phosphor-icons/react";

export default function FooterCTA({
  onViewProfile,
}: {
  onViewProfile: () => void;
}) {
  const [username, setUsername] = useState("");
  const [isClaimed, setIsClaimed] = useState(false);

  const handleClaim = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      setIsClaimed(true);
      setTimeout(() => {
        setIsClaimed(false);
        onViewProfile();
      }, 800);
    }
  };

  return (
    <section
      id="claim"
      className="relative py-24 overflow-hidden bg-black text-white border-t border-zinc-800"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3.5 py-1 text-xs font-semibold tracking-wider text-white uppercase mb-6">
          Get Started
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-6 max-w-2xl mx-auto leading-tight">
          Claim your shelf handle today.
        </h2>

        {/* Claim Box */}
        <form
          onSubmit={handleClaim}
          className="relative max-w-lg mx-auto p-1.5 rounded-full bg-white/5 backdrop-blur-md shadow-xl border border-white/10 flex items-center group transition-all focus-within:ring-2 focus-within:ring-white/20"
        >
          <div className="flex items-center pl-4 text-slate-400 font-medium">
            <span className="text-zinc-500 font-bold select-none text-base">
              blueprint.id/@
            </span>
          </div>
          <input
            type="text"
            placeholder="handle"
            value={username}
            onChange={(e) =>
              setUsername(
                e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""),
              )
            }
            className="w-full pl-1 pr-3 py-2 text-base text-white placeholder-slate-500 bg-transparent focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-full bg-white px-6 py-2.5 text-sm font-bold text-slate-900 hover:bg-slate-100 transition-all flex items-center gap-1.5 whitespace-nowrap active:scale-95 shadow-md"
          >
            {isClaimed ? (
              <>
                <Check className="h-4 w-4 text-black" />
                Claimed!
              </>
            ) : (
              <>
                Claim Handle
                <ArrowCircleUpRightIcon size={22} color={"black"} />
              </>
            )}
          </button>
        </form>

        {/* Bottom stats text */}
        <p className="mt-6 text-xs font-semibold text-slate-400">
          Join 10k+ thinkers, builders, and curators. Free forever.
        </p>
      </div>

      {/* Floating Decorative Cards */}
      <div className="hidden xl:block absolute left-16 top-16 w-52 p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md animate-float-slow">
        <div className="flex items-center gap-3">
          <img
            src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=120"
            alt="Alex"
            className="h-8 w-8 rounded-full object-cover grayscale hover:grayscale-0 transition-[filter] duration-300"
          />
          <div>
            <h4 className="text-xs font-bold text-white">Alex Rivera</h4>
            <p className="text-[10px] text-slate-400 font-medium">
              @technomad23 claimed
            </p>
          </div>
        </div>
      </div>

      <div className="hidden xl:block absolute right-16 bottom-16 w-52 p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md animate-float-medium">
        <div className="flex items-center gap-3">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120"
            alt="Sarah"
            className="h-8 w-8 rounded-full object-cover grayscale hover:grayscale-0 transition-[filter] duration-300"
          />
          <div>
            <h4 className="text-xs font-bold text-white">Sarah Miller</h4>
            <p className="text-[10px] text-slate-400 font-medium">
              @sarah_m claimed
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
