import { useState } from "react";
import {
  ArrowCircleUpRightIcon,
  CheckIcon,
  YoutubeLogoIcon,
  MicrophoneIcon,
  PaletteIcon,
  XLogoIcon,
  FlaskIcon,
} from "@phosphor-icons/react";
import * as PhosphorIcons from "@phosphor-icons/react";
import { generateVibrantColor, getSocialMediaColor } from "../utils/color";
import integrationsData from "../data/integrations.json";

export default function Hero({ onViewProfile, onViewDashboard }: { onViewProfile: () => void; onViewDashboard?: () => void }) {
  const [username, setUsername] = useState("");
  const [isClaimed, setIsClaimed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleClaim = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      setIsClaimed(true);
      setTimeout(() => {
        setIsClaimed(false);
        if (onViewDashboard) {
          onViewDashboard();
        } else {
          onViewProfile();
        }
      }, 800);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Duplicate list to ensure seamless infinite looping marquee
  const marqueeItems = [...integrationsData, ...integrationsData];

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative overflow-hidden bg-white pt-44 pb-44 lg:pt-56 lg:pb-56 border-b border-zinc-200"
    >
      {/* Interactive Blueprint Background Pattern (Light Grayscale) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {/* Double Blueprint Grid Structure in Gray */}
        <div
          className="absolute inset-0 opacity-100"
          style={{
            backgroundImage: `
              linear-gradient(rgba(24, 24, 27, 0.08) 1.2px, transparent 1.2px),
              linear-gradient(90deg, rgba(24, 24, 27, 0.08) 1.2px, transparent 1.2px),
              linear-gradient(rgba(24, 24, 27, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(24, 24, 27, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: "100px 100px, 100px 100px, 20px 20px, 20px 20px",
          }}
        />
        {/* Mouse follow glow */}
        <div
          className="absolute inset-0 transition-opacity duration-500 ease-out"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(24, 24, 27, 0.04) 0%, rgba(24, 24, 27, 0.01) 50%, transparent 100%)`,
          }}
        />
        {/* Subtle decorative color aura */}
        <div
          className="absolute inset-0 transition-opacity duration-500 ease-out"
          style={{
            opacity: isHovered ? 1 : 0.3,
            background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(99, 102, 241, 0.02) 0%, rgba(236, 72, 153, 0.01) 40%, transparent 70%)`,
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto py-20">
          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-slate-900 leading-tight mb-6">
            Where truly{" "}
            <span className="text-zinc-400 font-extrabold">
              trusted recommendations
            </span>{" "}
            live
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto mb-10">
            A space for recommendations, curated by the community. Share your
            favorite books, videos, articles, and more with your friends and
            followers.
          </p>

          {/* Claim Username Input */}
          <form
            onSubmit={handleClaim}
            className="relative max-w-lg mx-auto p-1.5 rounded-sm bg-white shadow-md border border-zinc-300 flex items-center group transition-all focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-black"
          >
            <div className="flex items-center pl-4 text-slate-400 font-medium">
              <span className="text-zinc-600 font-bold select-none text-base">
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
              className="w-full pl-1 pr-3 py-2 text-base text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-sm bg-black px-6 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800 transition-all flex items-center gap-1.5 whitespace-nowrap active:scale-95 shadow-xs cursor-pointer"
            >
              {isClaimed ? (
                <>
                  <CheckIcon className="h-4 w-4 text-white" />
                  Claimed!
                </>
              ) : (
                <>
                  Claim Handle
                  <ArrowCircleUpRightIcon size={22} />
                </>
              )}
            </button>
          </form>

          {/* Helper Micro-copy */}
          <p className="mt-4 text-xs font-semibold text-slate-400 tracking-wide">
            Free forever • Instant setup • No code required
          </p>
        </div>
      </div>

      {/* Floating Card Elements (Visual decorations from reference) */}
      <div
        onClick={onViewProfile}
        className="hidden xl:block absolute left-12 top-96 w-80 p-4 rounded-sm bg-white shadow-md border border-zinc-200 animate-float-slow transition-transform hover:-translate-y-2 cursor-pointer hover:border-black/50"
      >
        <div className="flex items-center gap-3">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120"
            alt="Sarah"
            className="h-10 w-10 rounded-sm object-cover ring-2 ring-zinc-100 grayscale hover:grayscale-0 transition-[filter] duration-300"
          />
          <div>
            <h4 className="text-sm my-2 font-semibold text-slate-900">
              Sarah Miller
            </h4>
            <p className="text-xs text-slate-500">
              Curated:{" "}
              <span
                className="px-2 py-0.5 rounded-sm text-[10px] font-bold"
                style={{
                  color: generateVibrantColor("Tech", 1),
                  backgroundColor: generateVibrantColor("Tech", 0.12),
                  border: `1px solid ${generateVibrantColor("Tech", 0.18)}`
                }}
              >
                Tech
              </span>{" "}
              <span
                className="px-2 py-0.5 rounded-sm text-[10px] font-bold"
                style={{
                  color: generateVibrantColor("Science", 1),
                  backgroundColor: generateVibrantColor("Science", 0.12),
                  border: `1px solid ${generateVibrantColor("Science", 0.18)}`
                }}
              >
                Science
              </span>
              &hellip;
            </p>
          </div>
        </div>
        <div className="mt-3 flex gap-1.5 flex-wrap">
          <span
            className="px-2 py-0.5 rounded-sm text-[10px] font-semibold flex items-center gap-1"
            style={{
              color: getSocialMediaColor("youtube", 1),
              backgroundColor: getSocialMediaColor("youtube", 0.12),
              border: `1px solid ${getSocialMediaColor("youtube", 0.18)}`
            }}
          >
            <YoutubeLogoIcon
              className="h-3 w-3"
              color={getSocialMediaColor("youtube", 1)}
            />{" "}
            @fireship
          </span>
          <span
            className="px-2 py-0.5 rounded-sm text-[10px] font-semibold flex items-center gap-1"
            style={{
              color: getSocialMediaColor("youtube", 1),
              backgroundColor: getSocialMediaColor("youtube", 0.12),
              border: `1px solid ${getSocialMediaColor("youtube", 0.18)}`
            }}
          >
            <FlaskIcon
              className="h-3 w-3"
              color={getSocialMediaColor("youtube", 1)}
            />{" "}
            @veritasium
          </span>
          <span
            className="px-2 py-0.5 rounded-sm text-[10px] font-semibold flex items-center gap-1"
            style={{
              color: getSocialMediaColor("x", 1),
              backgroundColor: getSocialMediaColor("x", 0.12),
              border: `1px solid ${getSocialMediaColor("x", 0.18)}`
            }}
          >
            <XLogoIcon
              className="h-3 w-3"
              color={getSocialMediaColor("x", 1)}
            />{" "}
            @alexxubyte
          </span>
        </div>
      </div>

      <div
        onClick={onViewProfile}
        className="hidden xl:block absolute right-12 top-96 w-80 p-4 rounded-sm bg-white shadow-md border border-zinc-200 animate-float-medium transition-transform hover:-translate-y-2 cursor-pointer hover:border-black/50"
      >
        <div className="flex items-center gap-3">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120"
            alt="Liam"
            className="h-10 w-10 rounded-sm object-cover ring-2 ring-zinc-100 grayscale hover:grayscale-0 transition-[filter] duration-300"
          />
          <div>
            <h4 className="text-sm my-2 font-semibold text-slate-900">
              Liam Carter
            </h4>
            <p className="text-xs text-slate-500">
              Curated:{" "}
              <span
                className="px-2 py-0.5 rounded-sm text-[10px] font-bold"
                style={{
                  color: generateVibrantColor("Design", 1),
                  backgroundColor: generateVibrantColor("Design", 0.12),
                  border: `1px solid ${generateVibrantColor("Design", 0.18)}`,
                }}
              >
                Design
              </span>{" "}
              <span
                className="px-2 py-0.5 rounded-sm text-[10px] font-bold"
                style={{
                  color: generateVibrantColor("Dev", 1),
                  backgroundColor: generateVibrantColor("Dev", 0.12),
                  border: `1px solid ${generateVibrantColor("Dev", 0.18)}`,
                }}
              >
                Dev
              </span>
              &hellip;
            </p>
          </div>
        </div>
        <div className="mt-3 flex gap-1.5 flex-wrap">
          <span
            className="px-2 py-0.5 rounded-sm text-[10px] font-semibold flex items-center gap-1"
            style={{
              color: getSocialMediaColor("youtube", 1),
              backgroundColor: getSocialMediaColor("youtube", 0.12),
              border: `1px solid ${getSocialMediaColor("youtube", 0.18)}`,
            }}
          >
            <MicrophoneIcon
              className="h-3 w-3"
              color={getSocialMediaColor("youtube", 1)}
            />{" "}
            @lexfridman
          </span>
          <span
            className="px-2 py-0.5 rounded-sm text-[10px] font-semibold flex items-center gap-1"
            style={{
              color: getSocialMediaColor("instagram", 1),
              backgroundColor: getSocialMediaColor("instagram", 0.12),
              border: `1px solid ${getSocialMediaColor("instagram", 0.18)}`,
            }}
          >
            <PaletteIcon
              className="h-3 w-3"
              color={getSocialMediaColor("instagram", 1)}
            />{" "}
            @design_weekly
          </span>
        </div>
      </div>

      {/* Sliding Marquee / Supported Integrations */}
      <div className="absolute bottom-0 inset-x-0 border-zinc-200 py-5  overflow-hidden">
        {/* Left/Right Fading Masks for Marquee */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
        
        <div className="relative w-full flex items-center">
          <div className="flex gap-4 animate-marquee whitespace-nowrap">
            {marqueeItems.map((item, index) => {
              const IconComponent = (PhosphorIcons as any)[item.icon] || PhosphorIcons.LinkIcon;
              return (
                <div
                  key={index}
                  className="inline-flex items-center gap-2 px-4 py-2 backdrop-blur-md rounded-sm border text-xs font-bold transition-all duration-300 select-none mx-2 cursor-pointer"
                  style={{
                    color: getSocialMediaColor(item.id, 1),
                    backgroundColor: getSocialMediaColor(item.id, 0.12),
                    borderColor: getSocialMediaColor(item.id, 0.18)
                  }}
                >
                  <IconComponent
                    className="h-4.5 w-4.5"
                    color={getSocialMediaColor(item.id, 1)}
                  />
                  <span className="font-bold">{item.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
