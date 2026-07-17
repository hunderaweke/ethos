import { ArrowRight, PaintBrush, Briefcase, Key } from "@phosphor-icons/react";

export default function TargetAudience() {
  const cards = [
    {
      title: "Engineers & Builders",
      description: "Share the system designs, compilers, dev channels, and repos that shaped your engineering style.",
      icon: PaintBrush,
      bgClass: "bg-zinc-50 border border-zinc-200 text-zinc-900",
      accent: "text-zinc-600",
      badge: "Code & Architecture",
      isDark: false,
    },
    {
      title: "Artists & Designers",
      description: "Showcase the art movements, typographies, design portfolios, and UI kits that built your taste.",
      icon: Briefcase,
      bgClass: "bg-zinc-900 text-white",
      accent: "text-zinc-300",
      badge: "Visuals & Style",
      isDark: true,
    },
    {
      title: "Thinkers & Writers",
      description: "Display the philosophy essays, newsletters, history podcasts, and books that shaped your perspective.",
      icon: Key,
      bgClass: "bg-zinc-100 border border-zinc-200 text-zinc-900",
      accent: "text-zinc-600",
      badge: "Essays & Podcasts",
      isDark: false,
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            For every mind. Open to the world.
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Curate your shelf whether you are a developer, designer, writer, or lifelong learner.
          </p>
        </div>

        {/* 3 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className={`relative overflow-hidden rounded-3xl p-8 ${card.bgClass} shadow-md hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between min-h-[380px] group`}
              >
                <div>
                  {/* Top row: Icon & Badge */}
                  <div className="flex justify-between items-center mb-6">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${card.isDark ? "bg-white/10 border border-white/20" : "bg-black/5 border border-black/10"}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${card.isDark ? "bg-white/10 border border-white/20" : "bg-black/5 border border-black/10"}`}>
                      {card.badge}
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <h3 className="text-2xl font-bold mb-2">{card.title}</h3>
                  <p className={`text-sm leading-relaxed font-medium ${card.isDark ? "text-zinc-300" : "text-zinc-600"}`}>{card.description}</p>
                </div>

                {/* Bottom link action */}
                <div className={`mt-8 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider cursor-pointer group/btn ${card.isDark ? "text-white" : "text-black"}`}>
                  <span>Learn more</span>
                  <ArrowRight className="h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
