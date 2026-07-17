import { 
  BookOpen, 
  Microphone, 
  FileText, 
  Palette, 
  ArrowSquareOut, 
  Heart,
  YoutubeLogo,
  XLogo
} from "@phosphor-icons/react";
import { getSocialMediaColor, generateVibrantColor } from "../utils/color";
import { getResourceLogo } from "../utils/logo";

export interface CurationItem {
  id: string;
  type: string;
  title: string;
  description: string;
  impact: string;
  tags: string[];
  link: string;
  size?: string;
  image?: string;
  author?: string;
  creator?: string;
  host?: string;
  handle?: string;
  subscribers?: string;
  episodes?: string;
  followers?: string;
  readTime?: string;
}

interface CurationCardProps {
  item: CurationItem;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
}

export default function CurationCard({ item, isSaved, onToggleSave }: CurationCardProps) {
  const sizeClass = item.size === "large" 
    ? "md:col-span-2 lg:row-span-2 flex flex-col md:flex-row" 
    : "";

  // Helper to render type-specific icons
  const renderTypeIcon = (type: string) => {
    const iconClass = "h-3.5 w-3.5 inline mr-1.5 -mt-0.5";
    switch (type.toLowerCase()) {
      case "youtube":
        return <YoutubeLogo className={iconClass} weight="fill" />;
      case "x":
      case "twitter":
        return <XLogo className={iconClass} />;
      case "podcast":
        return <Microphone className={iconClass} />;
      case "essay":
        return <FileText className={iconClass} />;
      case "design":
        return <Palette className={iconClass} />;
      case "book":
      default:
        return <BookOpen className={iconClass} />;
    }
  };

  // Common badge style reading dynamic brand color
  const badgeStyle = {
    color: getSocialMediaColor(item.type, 1),
    backgroundColor: getSocialMediaColor(item.type, 0.08),
    borderColor: getSocialMediaColor(item.type, 0.15)
  };

  return (
    <div 
      className={`bg-white border border-zinc-200 hover:border-black transition-all duration-300 flex flex-col justify-between group relative overflow-visible ${sizeClass}`}
    >
      {/* Blueprint Grid Overlay (Matches landing page style) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-none z-0">
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none group-hover:opacity-[0.06] transition-opacity duration-300 select-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(24, 24, 27, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(24, 24, 27, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px"
          }}
        />
      </div>

      {item.type === "book" && item.size === "large" ? (
        <>
          {/* Left section: Cover Image with Overlay */}
          <div className="md:w-1/2 relative min-h-[300px] md:min-h-full overflow-hidden">
            <img 
              src={item.image} 
              alt={item.title} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.01] grayscale group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-black/50 mix-blend-multiply" />
            
            {/* Mobile Cover Info */}
            <div className="absolute inset-x-0 bottom-0 p-6 text-white md:hidden z-10 flex flex-col items-start gap-2">
              <span className="text-[9px] font-black uppercase tracking-wider bg-white/20 border border-white/20 px-2.5 py-0.5 rounded-full inline-flex items-center">
                <BookOpen className="h-3 w-3 mr-1" /> Book
              </span>
              <h3 className="text-xl font-extrabold mt-1">{item.title}</h3>
              <p className="text-xs text-zinc-300 font-semibold">{item.author}</p>
            </div>
          </div>
          
          {/* Right section: Info Details */}
          <div className="p-6 md:w-1/2 flex flex-col justify-between z-10 relative bg-white">
            <div>
              <div className="hidden md:flex justify-between items-center mb-4">
                <span className="text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 border rounded-full inline-flex items-center" style={badgeStyle}>
                  {renderTypeIcon(item.type)} Book
                </span>
                <button 
                  onClick={() => onToggleSave(item.id)}
                  className="p-1.5 hover:bg-zinc-50 border border-transparent hover:border-zinc-200 transition-all cursor-pointer"
                >
                  <Heart className={`h-4.5 w-4.5 transition-colors ${isSaved ? "fill-black text-black" : "text-zinc-400"}`} />
                </button>
              </div>
              
              <div className="hidden md:block">
                <h3 className="text-lg font-black text-zinc-950 leading-tight">{item.title}</h3>
                <p className="text-xs text-zinc-500 font-bold mt-0.5">{item.author}</p>
              </div>

              <div className="mt-4">
                <h5 className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">Description</h5>
                <p className="text-xs text-zinc-650 font-medium leading-relaxed mt-1">{item.description}</p>
              </div>

              <div className="mt-4">
                <h5 className="text-[10px] font-black uppercase text-zinc-950 tracking-wider">How it shaped me</h5>
                <p className="text-xs text-zinc-700 font-semibold leading-relaxed mt-1 bg-zinc-50/50 p-3 border border-zinc-200 italic">
                  "{item.impact}"
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-150 flex items-center justify-between">
              <div className="flex gap-1.5 flex-wrap">
                {item.tags.map(tag => {
                  const cleanTag = tag.replace("#", "");
                  const tagStyle = {
                    color: generateVibrantColor(cleanTag, 1),
                    backgroundColor: generateVibrantColor(cleanTag, 0.08),
                    borderColor: generateVibrantColor(cleanTag, 0.15)
                  };
                  return (
                    <span 
                      key={tag} 
                      className="text-[9px] font-bold border px-2.5 py-0.5 rounded-full tracking-tight"
                      style={tagStyle}
                    >
                      {cleanTag}
                    </span>
                  );
                })}
              </div>
              <a 
                href={item.link} 
                target="_blank" 
                rel="noreferrer" 
                className="text-xs font-bold text-zinc-950 flex items-center gap-1 hover:underline cursor-pointer"
              >
                Source <ArrowSquareOut className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </>
      ) : (
        /* General Layout (Medium/Small items) */
        <div className="p-6 h-full flex flex-col justify-between gap-6 z-10 relative bg-white">
          <div>
            {/* Card Header */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 border rounded-full inline-flex items-center" style={badgeStyle}>
                {renderTypeIcon(item.type)} {item.type}
              </span>
              
              <button 
                onClick={() => onToggleSave(item.id)}
                className="p-1.5 hover:bg-zinc-50 border border-transparent hover:border-zinc-200 transition-all cursor-pointer"
              >
                <Heart className={`h-4.5 w-4.5 transition-colors ${isSaved ? "fill-black text-black" : "text-zinc-400"}`} />
              </button>
            </div>

            {/* Title & Creator metadata */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-black text-zinc-950 leading-snug">{item.title}</h3>
                {item.creator && <p className="text-[10px] text-zinc-400 font-bold mt-0.5">by {item.creator} • {item.subscribers} Subs</p>}
                {item.host && <p className="text-[10px] text-zinc-400 font-bold mt-0.5">hosted by {item.host} • {item.episodes} Ep</p>}
                {item.author && <p className="text-[10px] text-zinc-400 font-bold mt-0.5">by {item.author} • {item.readTime}</p>}
                {item.handle && <p className="text-[10px] text-zinc-400 font-bold mt-0.5">{item.handle} • {item.followers} Followers</p>}
              </div>
              {(() => {
                const logoUrl = getResourceLogo(item.link);
                return logoUrl ? (
                  <div className="h-10 w-10 shrink-0 border border-zinc-200 bg-zinc-50 overflow-hidden flex items-center justify-center p-1.5 z-10">
                    <img 
                      src={logoUrl} 
                      alt={item.title} 
                      className="h-full w-full object-contain grayscale group-hover:grayscale-0 transition-[filter] duration-300"
                    />
                  </div>
                ) : null;
              })()}
            </div>

            {/* Brief Description */}
            <p className="text-xs text-zinc-555 mt-3 font-medium leading-relaxed">
              {item.description}
            </p>

            {/* Impact section */}
            <div className="mt-4 bg-zinc-50/50 border border-zinc-200 p-3">
              <h5 className="text-[10px] font-black uppercase text-zinc-950 tracking-wider">How it shaped me</h5>
              <p className="text-xs text-zinc-700 font-semibold leading-relaxed mt-1 italic">
                "{item.impact}"
              </p>
            </div>
          </div>

          {/* Footer Tags & link */}
          <div className="pt-4 border-t border-zinc-150 flex items-center justify-between">
            <div className="flex gap-1.5 flex-wrap">
              {item.tags.map(tag => {
                const cleanTag = tag.replace("#", "");
                const tagStyle = {
                  color: generateVibrantColor(cleanTag, 1),
                  backgroundColor: generateVibrantColor(cleanTag, 0.08),
                  borderColor: generateVibrantColor(cleanTag, 0.15)
                };
                return (
                  <span 
                    key={tag} 
                    className="text-[9px] font-bold border px-2.5 py-0.5 rounded-full tracking-tight"
                    style={tagStyle}
                  >
                    {cleanTag}
                  </span>
                );
              })}
            </div>
            <a 
              href={item.link} 
              target="_blank" 
              rel="noreferrer" 
              className="text-xs font-bold text-zinc-950 flex items-center gap-1 hover:underline cursor-pointer"
            >
              Visit <ArrowSquareOut className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
