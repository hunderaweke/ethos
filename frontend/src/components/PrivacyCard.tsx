import { ShieldWarning, Key, HardDrives, EyeSlash, FileCode, ArrowRight } from "@phosphor-icons/react";

export default function PrivacyCard() {
  const securityItems = [
    {
      title: "Ad-Free Platform",
      desc: "We do not monetize your space. No sponsored recommendations or algorithms pushing paid content.",
      icon: Key,
    },
    {
      title: "You Own the Data",
      desc: "Export your follows lists, notes, and tags in CSV or JSON at any moment.",
      icon: HardDrives,
    },
    {
      title: "No Ad-tracking",
      desc: "We do not track your clicks, browser fingerprints, or profile interactions.",
      icon: EyeSlash,
    },
    {
      title: "Open Source Codebase",
      desc: "Verify our curation platform privacy yourself. Check or clone our repository on GitHub.",
      icon: FileCode,
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Centered White Card */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-xl shadow-slate-100/50 relative overflow-hidden">
          
          {/* Top Lock/Shield Icon */}
          <div className="flex justify-center mb-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-white shadow-xs">
              <ShieldWarning className="h-7 w-7" />
            </div>
          </div>

          {/* Heading */}
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-4">
              Built from scratch for mental privacy
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
              Blueprint is built on privacy-first principles. We don't sell your data, track what you browse, or show you ads. Ever.
            </p>
          </div>

          {/* 2x2 Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-b border-slate-200/60 pb-10 mb-8">
            {securityItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 border border-slate-200 text-slate-700">
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-950 text-sm mb-1">{item.title}</h4>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Read Whitepaper button */}
          <div className="flex justify-center">
            <button className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-900 hover:text-brand-indigo transition-colors cursor-pointer">
              Read our Privacy Policies
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Decorative glow decoration */}
          <div className="absolute -left-12 -bottom-12 h-24 w-24 bg-zinc-500/5 rounded-full blur-xl" />
        </div>

      </div>
    </section>
  );
}
