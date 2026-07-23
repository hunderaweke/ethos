import {
  BookOpen,
  Microphone,
  FileText,
  Palette,
  ArrowSquareOut,
  Heart,
  YoutubeLogo,
  XLogo,
  ShareNetwork,
  TelegramLogo,
  InstagramLogo,
  LinkedinLogo,
  SpotifyLogo,
  GithubLogo,
  DiscordLogo,
  FigmaLogo,
  TwitchLogo,
  TiktokLogo,
  RedditLogo,
  GoodreadsLogo,
  MediumLogo,
  Newspaper
} from "@phosphor-icons/react";
import { getSocialMediaColor, generateVibrantColor } from "../utils/color";
import type { CurationItem } from "../types";
import { ResourceKindBadge } from "./ResourceKindIcon";
import { useToast } from "./ToastContext";

export type { CurationItem };

export interface CurationCardProps {
  item: CurationItem;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onTagClick?: (tag: string) => void;
}

export default function CurationCard({ item, isSaved, onToggleSave, onTagClick }: CurationCardProps) {
  const { showToast } = useToast();

  const isBook = item.type === "book" || item.type === "goodreads";
  const MEDIA_PREVIEW_KINDS = ["video", "playlist", "podcast", "post", "newsletter"];
  const isMediaPreview = !isBook && item.resourceKind ? MEDIA_PREVIEW_KINDS.includes(item.resourceKind) : false;

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleSave(item.id);
    showToast(
      isSaved ? `Removed "${item.title}" from saved` : `Saved "${item.title}" to your library`,
      isSaved ? "info" : "success"
    );
  };

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
      case "social":
        return <ShareNetwork className={iconClass} />;
      case "telegram":
        return <TelegramLogo className={iconClass} />;
      case "instagram":
        return <InstagramLogo className={iconClass} />;
      case "linkedin":
        return <LinkedinLogo className={iconClass} />;
      case "spotify":
        return <SpotifyLogo className={iconClass} />;
      case "github":
        return <GithubLogo className={iconClass} />;
      case "discord":
        return <DiscordLogo className={iconClass} />;
      case "figma":
        return <FigmaLogo className={iconClass} />;
      case "twitch":
        return <TwitchLogo className={iconClass} />;
      case "tiktok":
        return <TiktokLogo className={iconClass} />;
      case "reddit":
        return <RedditLogo className={iconClass} />;
      case "goodreads":
        return <GoodreadsLogo className={iconClass} />;
      case "medium":
        return <MediumLogo className={iconClass} />;
      case "substack":
        return <Newspaper className={iconClass} />;
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

  const bookAuthor = item.author || item.creator || item.host || item.handle;

  return (
    <div
      className={`group relative overflow-hidden bg-white border border-zinc-200 hover:border-zinc-300 transition-all duration-300 flex flex-col justify-between rounded-sm shadow-xs hover:shadow-md ${
        item.size === "large"
          ? "md:col-span-2 md:flex-row min-h-[320px]"
          : isBook
            ? "min-h-[220px]"
            : isMediaPreview
              ? "min-h-[300px]"
              : "min-h-[190px]"
      }`}
    >
      {isBook && item.size === "large" ? (
        <>
          {/* Featured Book Large Layout */}
          <div className="md:w-5/12 relative min-h-[280px] md:min-h-full overflow-hidden border-b md:border-b-0 md:border-r border-zinc-200 bg-zinc-900 flex items-center justify-center p-6">
            {item.image ? (
              <div className="relative aspect-[3/4] w-36 sm:w-44 rounded-sm shadow-2xl overflow-hidden border border-white/20 transition-transform duration-500 group-hover:scale-105">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                {/* Book spine lighting */}
                <div className="absolute inset-y-0 left-0 w-2 bg-gradient-to-r from-black/40 to-transparent pointer-events-none" />
              </div>
            ) : (
              <div className="relative aspect-[3/4] w-36 sm:w-44 rounded-sm shadow-2xl bg-amber-100 border border-amber-300 p-4 flex flex-col justify-between text-amber-950">
                <BookOpen className="h-6 w-6 text-amber-900" />
                <div>
                  <h4 className="text-sm font-black leading-tight line-clamp-3">{item.title}</h4>
                  {bookAuthor && <p className="text-[10px] font-bold text-amber-800 mt-1">by {bookAuthor}</p>}
                </div>
              </div>
            )}
            
            <div className="absolute top-4 left-4 z-10">
              <span className="text-[9px] font-bold tracking-wider px-2.5 py-1 border rounded-sm inline-flex items-center gap-1.5 capitalize bg-white/95 backdrop-blur-md text-zinc-950 border-zinc-200 shadow-xs">
                {renderTypeIcon(item.type)} Featured Book
              </span>
            </div>
          </div>
          
          {/* Right section: Content */}
          <div className="md:w-7/12 p-6 flex flex-col justify-between z-10 relative bg-white">
            <div>
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[9px] font-bold tracking-wider px-2.5 py-1 border rounded-sm inline-flex items-center gap-1.5 capitalize" style={badgeStyle}>
                    {renderTypeIcon(item.type)} Book Recommendation
                  </span>
                  {item.resourceKind && <ResourceKindBadge kind={item.resourceKind} />}
                </div>

                <button
                  onClick={handleSave}
                  className="p-1.5 hover:bg-zinc-100 border border-transparent hover:border-zinc-200 transition-all cursor-pointer rounded-sm active:scale-95"
                  title={isSaved ? "Saved" : "Save item"}
                >
                  <Heart className={`h-4.5 w-4.5 transition-colors ${isSaved ? "fill-red-500 text-red-500" : "text-zinc-400 hover:text-black"}`} />
                </button>
              </div>

              <h3 className="text-lg font-black text-zinc-950 leading-snug">{item.title}</h3>
              {bookAuthor && <p className="text-xs font-bold text-zinc-500 mt-0.5">by {bookAuthor}</p>}

              <p className="text-xs text-zinc-600 font-medium leading-relaxed mt-3">{item.description}</p>

              {item.impact && (
                <div className="mt-4 p-3 bg-zinc-50 border-l-2 border-black rounded-r-sm">
                  <p className="text-xs italic text-zinc-700 font-serif leading-relaxed">"{item.impact}"</p>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-zinc-150 flex items-center justify-between mt-4 gap-2 flex-wrap">
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
                      className="text-[9px] font-bold border px-2.5 py-1 rounded-sm tracking-tight cursor-pointer hover:opacity-80 transition-opacity"
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
                className="text-xs font-bold text-zinc-950 flex items-center gap-1 hover:underline cursor-pointer min-h-[36px] px-2 py-1 rounded-sm hover:bg-zinc-100 transition-colors"
              >
                Source <ArrowSquareOut className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </>
      ) : (
        /* General Layout (including Standard Book Card) */
        <div className="h-full flex flex-col justify-between gap-4 z-10 relative bg-white">
          <div>
            {isMediaPreview && item.image && (
              <div className="relative w-full aspect-video overflow-hidden border-b border-zinc-200">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            )}

            <div className="p-6 pb-0">
              {/* Card Header */}
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[9px] font-bold tracking-wider px-2.5 py-1 border rounded-sm inline-flex items-center gap-1.5 capitalize" style={badgeStyle}>
                    {renderTypeIcon(item.type)} {item.type}
                  </span>
                  {item.resourceKind && <ResourceKindBadge kind={item.resourceKind} />}
                </div>

                <button
                  onClick={handleSave}
                  className="p-1.5 hover:bg-zinc-100 border border-transparent hover:border-zinc-200 transition-all cursor-pointer rounded-sm active:scale-95"
                  title={isSaved ? "Saved" : "Save item"}
                >
                  <Heart className={`h-4.5 w-4.5 transition-colors ${isSaved ? "fill-red-500 text-red-500" : "text-zinc-400 hover:text-black"}`} />
                </button>
              </div>

              {/* Title & Creator metadata */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-black text-zinc-950 leading-snug">{item.title}</h3>
                  {bookAuthor && (
                    <p className="text-xs font-bold text-zinc-500 mt-0.5">by {bookAuthor}</p>
                  )}
                  {item.description && (
                    <p className="text-xs text-zinc-600 font-medium mt-1.5 line-clamp-2">{item.description}</p>
                  )}
                </div>

                {/* Book Cover Thumbnail vs Generic Thumbnail */}
                {isBook ? (
                  item.image ? (
                    <div className="aspect-[3/4] w-14 sm:w-16 shrink-0 border border-zinc-200 bg-zinc-900 overflow-hidden rounded-sm shadow-sm relative group-hover:shadow-md transition-shadow">
                      <img
                        src={item.image}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-y-0 left-0 w-1 bg-black/30 pointer-events-none" />
                    </div>
                  ) : (
                    <div className="aspect-[3/4] w-14 sm:w-16 shrink-0 border border-amber-200 bg-amber-50 p-1.5 rounded-sm shadow-2xs flex flex-col justify-between text-amber-950">
                      <BookOpen className="h-4 w-4 text-amber-800" />
                      <span className="text-[8px] font-black leading-tight line-clamp-2">{item.title}</span>
                    </div>
                  )
                ) : !isMediaPreview && item.image ? (
                  <div className="h-10 w-10 shrink-0 border border-zinc-200 bg-zinc-50 overflow-hidden flex items-center justify-center rounded-sm shadow-2xs">
                    <img
                      src={item.image}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover transition-all duration-300"
                    />
                  </div>
                ) : null}
              </div>

              {/* Impact quote section */}
              {item.impact && (
                <div className="mt-3 bg-zinc-50/80 border-l-2 border-black p-3 rounded-r-sm">
                  <p className="text-xs text-zinc-700 font-semibold leading-relaxed italic">
                    "{item.impact}"
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Footer Tags & Link */}
          <div className="px-6 pb-6 pt-3 border-t border-zinc-150 flex items-center justify-between gap-2">
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
                    className="text-[9px] font-bold border px-2.5 py-1 rounded-sm tracking-tight cursor-pointer hover:opacity-80 transition-opacity"
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
              className="text-xs font-bold text-zinc-950 flex items-center gap-1 hover:underline cursor-pointer px-2 py-1 rounded-sm hover:bg-zinc-100 transition-colors"
            >
              Visit <ArrowSquareOut className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
