import { 
  XLogo, 
  InstagramLogo, 
  TelegramLogo, 
  YoutubeLogo, 
  SlackLogo, 
  DiscordLogo, 
  LinkedinLogo, 
  SpotifyLogo,
  GithubLogo,
  FigmaLogo,
  DribbbleLogo,
  BehanceLogo,
  MediumLogo,
  RedditLogo,
  PinterestLogo,
  TiktokLogo,
  GoodreadsLogo,
  Newspaper,
  TwitchLogo,
  PatreonLogo,
  FacebookLogo,
  AppleLogo,
  GoogleLogo,
  Rss
} from "@phosphor-icons/react";

export default function ShareSection({ onViewProfile }: { onViewProfile: () => void }) {
  const iconGrid = [
    { Icon: XLogo, name: "X", hoverBg: "hover:bg-zinc-900/5", hoverColor: "group-hover:text-black" },
    { Icon: GithubLogo, name: "GitHub", hoverBg: "hover:bg-zinc-950/5", hoverColor: "group-hover:text-[#181717]" },
    { Icon: InstagramLogo, name: "Instagram", hoverBg: "hover:bg-[#E1306C]/10", hoverColor: "group-hover:text-[#E1306C]" },
    { Icon: FigmaLogo, name: "Figma", hoverBg: "hover:bg-[#F24E1E]/10", hoverColor: "group-hover:text-[#F24E1E]" },
    { Icon: TelegramLogo, name: "Telegram", hoverBg: "hover:bg-[#229ED9]/10", hoverColor: "group-hover:text-[#229ED9]" },
    { Icon: DribbbleLogo, name: "Dribbble", hoverBg: "hover:bg-[#EA4C89]/10", hoverColor: "group-hover:text-[#EA4C89]" },
    { Icon: YoutubeLogo, name: "YouTube", hoverBg: "hover:bg-[#FF0000]/10", hoverColor: "group-hover:text-[#FF0000]" },
    { Icon: BehanceLogo, name: "Behance", hoverBg: "hover:bg-[#0057ff]/10", hoverColor: "group-hover:text-[#0057ff]" },
    { Icon: SlackLogo, name: "Slack", hoverBg: "hover:bg-[#4A154B]/10", hoverColor: "group-hover:text-[#4A154B]" },
    { Icon: MediumLogo, name: "Medium", hoverBg: "hover:bg-[#00AB6C]/10", hoverColor: "group-hover:text-[#00AB6C]" },
    { Icon: DiscordLogo, name: "Discord", hoverBg: "hover:bg-[#5865F2]/10", hoverColor: "group-hover:text-[#5865F2]" },
    { Icon: RedditLogo, name: "Reddit", hoverBg: "hover:bg-[#FF4500]/10", hoverColor: "group-hover:text-[#FF4500]" },
    { Icon: LinkedinLogo, name: "LinkedIn", hoverBg: "hover:bg-[#0077B5]/10", hoverColor: "group-hover:text-[#0077B5]" },
    { Icon: PinterestLogo, name: "Pinterest", hoverBg: "hover:bg-[#BD081C]/10", hoverColor: "group-hover:text-[#BD081C]" },
    { Icon: SpotifyLogo, name: "Spotify", hoverBg: "hover:bg-[#1DB954]/10", hoverColor: "group-hover:text-[#1DB954]" },
    { Icon: TiktokLogo, name: "TikTok", hoverBg: "hover:bg-[#FE2C55]/10", hoverColor: "group-hover:text-[#FE2C55]" },
    { Icon: GoodreadsLogo, name: "Goodreads", hoverBg: "hover:bg-[#5B3E25]/10", hoverColor: "group-hover:text-[#5B3E25]" },
    { Icon: Newspaper, name: "Substack", hoverBg: "hover:bg-[#FF6719]/10", hoverColor: "group-hover:text-[#FF6719]" },
    { Icon: TwitchLogo, name: "Twitch", hoverBg: "hover:bg-[#9146FF]/10", hoverColor: "group-hover:text-[#9146FF]" },
    { Icon: PatreonLogo, name: "Patreon", hoverBg: "hover:bg-[#FF424D]/10", hoverColor: "group-hover:text-[#FF424D]" },
    { Icon: FacebookLogo, name: "Facebook", hoverBg: "hover:bg-[#1877F2]/10", hoverColor: "group-hover:text-[#1877F2]" },
    { Icon: AppleLogo, name: "Apple", hoverBg: "hover:bg-zinc-950/5", hoverColor: "group-hover:text-black" },
    { Icon: GoogleLogo, name: "Google", hoverBg: "hover:bg-[#4285F4]/10", hoverColor: "group-hover:text-[#4285F4]" },
    { Icon: Rss, name: "RSS", hoverBg: "hover:bg-[#EE802F]/10", hoverColor: "group-hover:text-[#EE802F]" }
  ];

  return (
    <section className="w-full py-20 bg-white border-t border-zinc-200 overflow-hidden relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Column: Content */}
        <div className="lg:col-span-7 flex flex-col items-start gap-6 text-left">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl font-sans leading-[1.15]">
            Connect and share <br />
            your recommendations.
          </h2>
          <p className="text-base text-zinc-500 font-medium leading-relaxed max-w-xl">
            Easily distribute your mind-shelf, favorite reading lists, design inspirations, or podcasts to your audience with custom embeds, social previews, and portable lists.
          </p>
          <div className="mt-2">
            <button
              onClick={onViewProfile}
              className="inline-flex items-center justify-center px-6 py-3 border border-zinc-200 rounded-full bg-white text-sm font-bold text-slate-900 shadow-xs hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Start Curating
            </button> 
          </div>
        </div>

        {/* Right Column: Checkerboard Icon Grid (Rectangular 6x4 grid) */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="grid grid-cols-6 gap-px bg-zinc-200 border border-zinc-200 overflow-visible w-full max-w-[480px]">
            {iconGrid.map((item, index) => {
              const Icon = item.Icon;
              const isAlternate = (Math.floor(index / 6) + (index % 6)) % 2 === 1;
              const isTopRow = index < 6;
              return (
                <div 
                  key={index} 
                  className={`group flex items-center justify-center transition-all duration-300 aspect-square cursor-pointer relative overflow-visible ${
                    isAlternate ? "bg-slate-50/40" : "bg-white"
                  } ${item.hoverBg}`}
                >
                  {/* Blueprint Grid Overlay Wrapper that clips */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-none">
                    <div 
                      className="absolute inset-0 opacity-[0.03] pointer-events-none group-hover:opacity-[0.06] transition-opacity duration-300 select-none"
                      style={{
                        backgroundImage: `
                          linear-gradient(rgba(24, 24, 27, 0.5) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(24, 24, 27, 0.5) 1px, transparent 1px)
                        `,
                        backgroundSize: "16px 16px"
                      }}
                    />
                  </div>
                  
                  {/* Content */}
                  
                  <Icon className={`h-5 w-5 sm:h-6 sm:w-6 text-slate-700 transition-all duration-300 group-hover:scale-115 relative z-10 ${item.hoverColor}`} />
                  
                  {/* Custom Tooltip (Top row shows downwards to prevent container boundary clipping) */}
                  <span className={`absolute left-1/2 -translate-x-1/2 scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 rounded-lg bg-slate-950 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-white transition-all duration-200 z-50 pointer-events-none whitespace-nowrap shadow-md ${
                    isTopRow ? "top-full mt-2" : "bottom-full mb-2"
                  }`}>
                    {item.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
