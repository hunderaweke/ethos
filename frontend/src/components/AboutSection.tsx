import { Speedometer, Palette, MagnifyingGlass, Globe, ShareNetwork, SquaresFour } from "@phosphor-icons/react";

export default function AboutSection() {
  const features = [
    {
      icon: Speedometer,
      title: "Lightning Curation",
      description: "Index new inputs in seconds. Our drafting layout is designed for rapid, keyboard-friendly ingestion of books, articles, podcasts, and designs."
    },
    {
      icon: Palette,
      title: "Monochrome Architecture",
      description: "Express your mind-shelf in a clean, high-readability monochrome grid system focused strictly on content hierarchy and custom tags."
    },
    {
      icon: MagnifyingGlass,
      title: "Pure Discovery",
      description: "Traverse peer blueprints directly using structured tags. Explore the influences of people you respect without algorithmically-engineered feed noise."
    },
    {
      icon: Globe,
      title: "Cross-Platform Curation",
      description: "Unify your digital footprint. Aggregate Goodreads books, Spotify podcasts, Figma libraries, and newsletter logs into a single public shelf."
    },
    {
      icon: ShareNetwork,
      title: "Instant Sharing",
      description: "Share your recommendations in one click. Generate custom social preview cards, embed your shelf on your website, or export your curation graph."
    },
    {
      icon: SquaresFour,
      title: "Structured Tags",
      description: "Organize by category. Group your books, podcasts, and designs into clean, filterable folders so visitors can scan your shelf in a glance."
    }
  ];

  return (
    <section id="about" className="py-24 bg-white border-t border-zinc-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl font-sans leading-[1.15]">
            Thoughtfully designed <br />
            for intentional people.
          </h2>
          <p className="mt-4 text-sm text-zinc-500 font-semibold  tracking-wider">
            A minimal place to store and recommend without chaos.
          </p>
        </div>

        {/* Grid (3x2 layout using Gap-px borders) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-200 border border-zinc-200 overflow-hidden">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index} 
                className="bg-white px-8 py-12 flex flex-col gap-4 relative overflow-hidden group hover:bg-slate-50/30 transition-colors duration-300"
              >
                {/* Minimal Blueprint grid pattern overlay */}
                <div 
                  className="absolute inset-0 opacity-[0.03] pointer-events-none group-hover:opacity-[0.05] transition-opacity duration-300 select-none"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(24, 24, 27, 0.5) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(24, 24, 27, 0.5) 1px, transparent 1px)
                    `,
                    backgroundSize: "20px 20px"
                  }}
                />
                
                {/* Feature Content */}
                <div className="relative z-10 flex flex-col gap-3">
                  <div className="h-10 w-10 bg-slate-50/50 flex items-center justify-center border border-zinc-200 transition-all duration-300 group-hover:bg-black group-hover:border-black group-hover:scale-105">
                    <Icon className="h-5 w-5 text-zinc-800 transition-colors duration-300 group-hover:text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-950 mt-2 transition-colors duration-300 group-hover:text-black">{feature.title}</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed font-medium transition-colors duration-300 group-hover:text-zinc-650">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
