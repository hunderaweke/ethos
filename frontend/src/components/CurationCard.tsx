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

export interface CurationCardProps {
  item: CurationItem;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onTagClick?: (tag: string) => void;
}

export default function CurationCard({ item, isSaved, onToggleSave, onTagClick }: CurationCardProps) {
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

  const badgeStyle = {
    color: getSocialMediaColor(item.type, 1),
    backgroundColor: getSocialMediaColor(item.type, 0.08),
    borderColor: getSocialMediaColor(item.type, 0.18)
  };

  return (
    <div 
      className={`group relative overflow-hidden bg-white border border-zinc-200 hover:border-zinc-300 transition-all duration-300 flex flex-col justify-between rounded-sm ${
        item.size === "large" ? "md:col-span-2 md:flex-row min-h-[320px]" : "min-h-[220px]"
      }`}
    >
      {item.type === "book" && item.size === "large" ? (
        <>
          {/* Left section: Cover Image with Overlay */}
          <div className="md:w-1/2 relative min-h-[280px] md:min-h-full overflow-hidden border-b md:border-b-0 md:border-r border-zinc-200">
            <img 
              src={item.image} 
              alt={item.title} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 grayscale group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
            
            {/* Mobile Cover Info */}
            <div className="absolute top-4 left-4 z-10">
              <span className="text-[9px] font-bold tracking-wider px-2.5 py-0.5 border rounded-sm inline-flex items-center gap-1.5 capitalize bg-white/95 backdrop-blur-md text-zinc-950 border-zinc-200">
                {renderTypeIcon(item.type)} {item.type}
              </span>
            </div>
          </div>
          
          {/* Right section: Content & Impact */}
          <div className="md:w-1/2 p-6 flex flex-col justify-between z-10 relative bg-white">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-[9px] font-bold tracking-wider px-2.5 py-0.5 border rounded-sm inline-flex items-center gap-1.5 capitalize" style={badgeStyle}>
                  {renderTypeIcon(item.type)} Featured {item.type}
                </span>

                <button 
                  onClick={() => onToggleSave(item.id)}
                  className="p-1.5 hover:bg-zinc-50 border border-transparent hover:border-zinc-200 transition-all cursor-pointer rounded-sm"
                >
                  <Heart className={`h-4.5 w-4.5 transition-colors ${isSaved ? "fill-black text-black" : "text-zinc-400 hover:text-black"}`} />
                </button>
              </div>

              <h3 className="text-lg font-black text-zinc-950 leading-snug">{item.title}</h3>
              {item.author && <p className="text-xs text-zinc-400 font-bold mt-0.5">by {item.author}</p>}
              
              <p className="text-xs text-zinc-600 font-medium leading-relaxed mt-3">{item.description}</p>
              
              {/* Highlight Impact Quote */}
              <div className="mt-4 p-3 bg-zinc-50 border-l-2 border-black">
                <p className="text-xs italic text-zinc-700 font-serif leading-relaxed">"{item.impact}"</p>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-150 flex items-center justify-between mt-4">
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
                      onClick={() => onTagClick?.(tag)}
                      className="text-[9px] font-bold border px-2.5 py-0.5 rounded-sm tracking-tight cursor-pointer hover:opacity-80 transition-opacity"
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
              <span className="text-[9px] font-bold tracking-wider px-2.5 py-0.5 border rounded-sm inline-flex items-center gap-1.5 capitalize" style={badgeStyle}>
                {renderTypeIcon(item.type)} {item.type}
              </span>
              
              <button 
                onClick={() => onToggleSave(item.id)}
                className="p-1.5 hover:bg-zinc-50 border border-transparent hover:border-zinc-200 transition-all cursor-pointer rounded-sm"
              >
                <Heart className={`h-4.5 w-4.5 transition-colors ${isSaved ? "fill-black text-black" : "text-zinc-400 hover:text-black"}`} />
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
                  <div className="h-10 w-10 shrink-0 border border-zinc-200 bg-zinc-50 overflow-hidden flex items-center justify-center p-1.5 z-10 rounded-sm">
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
            <p className="text-xs text-zinc-650 mt-3 font-medium leading-relaxed">
              {item.description}
            </p>

            {/* Impact section */}
            <div className="mt-4 bg-zinc-50/70 border-l-2 border-black p-3">
              <p className="text-xs text-zinc-700 font-semibold leading-relaxed italic">
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
                    onClick={() => onTagClick?.(tag)}
                    className="text-[9px] font-bold border px-2.5 py-0.5 rounded-sm tracking-tight cursor-pointer hover:opacity-80 transition-opacity"
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


