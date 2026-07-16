import React from "react";
import { Link2 } from "lucide-react";

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.107C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.388.511a3.002 3.002 0 0 0-2.11 2.107C0 8.053 0 12 0 12s0 3.947.502 5.837a3.003 3.003 0 0 0 2.11 2.107c1.883.511 9.388.511 9.388.511s7.505 0 9.388-.511a3.002 3.002 0 0 0 2.11-2.107C24 15.947 24 12 24 12s0-3.947-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const TwitchIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
  </svg>
);

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const DiscIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const FigmaIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2C9.24 2 7 4.24 7 7c0 1.62.77 3.06 1.96 3.98A4.987 4.987 0 0 0 7 15c0 2.76 2.24 5 5 5s5-2.24 5-5c0-1.62-.77-3.06-1.96-3.98A4.987 4.987 0 0 0 17 7c0-2.76-2.24-5-5-5zm-3 7c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm6 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
  </svg>
);

export default function IntegrationCloud() {
  const icons = [
    { icon: YoutubeIcon, color: "text-red-500 bg-red-50 border-red-100", animation: "animate-float-slow", top: "10%", left: "12%" },
    { icon: TwitchIcon, color: "text-purple-600 bg-purple-50 border-purple-100", animation: "animate-float-medium", top: "15%", right: "15%" },
    { icon: GithubIcon, color: "text-slate-800 bg-slate-50 border-slate-200", animation: "animate-float-fast", top: "45%", left: "8%" },
    { icon: InstagramIcon, color: "text-pink-500 bg-pink-50 border-pink-100", animation: "animate-float-slow", top: "50%", right: "10%" },
    { icon: DiscIcon, color: "text-emerald-500 bg-emerald-50 border-emerald-100", animation: "animate-float-medium", bottom: "12%", left: "20%" },
    { icon: FigmaIcon, color: "text-orange-500 bg-orange-50 border-orange-100", animation: "animate-float-fast", bottom: "15%", right: "22%" },
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-indigo to-brand-pink">
              one simple space.
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 font-medium max-w-lg mx-auto">
            Ethos integrates seamlessly with the apps and networks you already use to create a unified landing hub.
          </p>
        </div>

        {/* Center Button Action */}
        <div className="my-16">
          <button className="inline-flex items-center gap-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white px-7 py-3.5 text-sm font-semibold transition-all hover:scale-105 active:scale-95 shadow-md shadow-slate-950/20 group">
            <Link2 className="h-4.5 w-4.5 text-indigo-400 group-hover:rotate-45 transition-transform duration-300" />
            Connect Your Accounts
          </button>
        </div>

        {/* Floating Icons Representation */}
        {icons.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className={`absolute hidden lg:flex h-12 w-12 items-center justify-center rounded-2xl border shadow-md transition-all duration-300 ${item.color} ${item.animation}`}
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
