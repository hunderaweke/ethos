import { ArrowRight, Paintbrush, Briefcase, Key } from "lucide-react";

export default function TargetAudience() {
  const cards = [
    {
      title: "Tech & Developers",
      description: "Curate coding channels, GitHub repositories, dev newsletters, and articles you learn from.",
      icon: Paintbrush,
      bgClass: "from-blue-600 via-indigo-600 to-violet-600",
      accent: "text-blue-200",
      badge: "GitHub & DevBlogs",
    },
    {
      title: "Design & Creatives",
      description: "Share Pinterest boards, Instagram accounts, color palettes, and UI libraries that inspire your style.",
      icon: Briefcase,
      bgClass: "from-cyan-600 via-sky-600 to-blue-500",
      accent: "text-cyan-200",
      badge: "Inspiration & UI/UX",
    },
    {
      title: "Writers & Researchers",
      description: "Display newsletter recommendations, podcast directories, substacks, and news feeds shaping your diet.",
      icon: Key,
      bgClass: "from-orange-500 via-pink-600 to-rose-600",
      accent: "text-orange-200",
      badge: "Substack & Podcasts",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Designed for everyone. Open to the world.
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Tailor-made features that work whether you are starting a shop, building a resume, or configuring digital nodes.
          </p>
        </div>

        {/* 3 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className={`relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br ${card.bgClass} text-white shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between min-h-[380px] group`}
              >
                {/* Decorative glow */}
                <div className="absolute top-0 right-0 h-40 w-40 bg-white/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500" />

                <div>
                  {/* Top row: Icon & Badge */}
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md border border-white/25">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-white/15 border border-white/25 px-3 py-1 rounded-full">
                      {card.badge}
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <h3 className="text-2xl font-bold mb-2">{card.title}</h3>
                  <p className="text-sm text-white/80 leading-relaxed font-medium">{card.description}</p>
                </div>

                {/* Bottom link action */}
                <div className="mt-8 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider cursor-pointer group/btn">
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
