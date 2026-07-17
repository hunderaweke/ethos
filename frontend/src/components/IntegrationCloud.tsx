import { LinkSimple, YoutubeLogo, TwitchLogo, GithubLogo, InstagramLogo, DiscordLogo, FigmaLogo } from "@phosphor-icons/react";

export default function IntegrationCloud() {
  const icons = [
    { icon: YoutubeLogo, animation: "animate-float-slow", top: "10%", left: "12%" },
    { icon: TwitchLogo, animation: "animate-float-medium", top: "15%", right: "15%" },
    { icon: GithubLogo, animation: "animate-float-fast", top: "45%", left: "8%" },
    { icon: InstagramLogo, animation: "animate-float-slow", top: "50%", right: "10%" },
    { icon: DiscordLogo, animation: "animate-float-medium", bottom: "12%", left: "20%" },
    { icon: FigmaLogo, animation: "animate-float-fast", bottom: "15%", right: "22%" },
  ];

  return (
    <section className="py-20 lg:py-28 bg-slate-50 relative overflow-hidden border-y border-slate-200/50">
      
      {/* Decorative Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Header */}
        <div className="max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
            Bring all together in{" "}
            <span className="text-black font-extrabold">
              one simple space.
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 font-medium max-w-lg mx-auto">
            Blueprint integrates seamlessly with the apps and networks you already use to create a unified landing hub.
          </p>
        </div>

        {/* Center Button Action */}
        <div className="my-16">
          <button className="inline-flex items-center gap-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white px-7 py-3.5 text-sm font-semibold transition-all hover:scale-105 active:scale-95 shadow-md shadow-slate-950/20 group">
            <LinkSimple className="h-4.5 w-4.5 text-white group-hover:rotate-45 transition-transform duration-300" />
            Connect Your Accounts
          </button>
        </div>

        {/* Floating Icons Representation */}
        {icons.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className={`absolute hidden lg:flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-200 bg-white text-zinc-800 shadow-md transition-all duration-300 hover:bg-black hover:text-white ${item.animation}`}
              style={{
                top: item.top,
                bottom: item.bottom,
                left: item.left,
                right: item.right,
              }}
            >
              <Icon className="h-6 w-6" />
            </div>
          );
        })}

      </div>
    </section>
  );
}
