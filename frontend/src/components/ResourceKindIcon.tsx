import { ChatCircleText, VideoCamera, Broadcast, Microphone, Playlist, UserCircle, Newspaper } from "@phosphor-icons/react";
import type { ResourceKind } from "../types";
import { getSocialMediaColor } from "../utils/color";

export const RESOURCE_KIND_LABELS: Record<ResourceKind, string> = {
  post: "Post",
  video: "Video",
  channel: "Channel",
  podcast: "Podcast",
  playlist: "Playlist",
  account: "Account",
  newsletter: "Newsletter",
};

export default function ResourceKindIcon({ kind, className }: { kind: ResourceKind; className: string }) {
  switch (kind) {
    case "post": return <ChatCircleText className={className} />;
    case "video": return <VideoCamera className={className} />;
    case "channel": return <Broadcast className={className} />;
    case "podcast": return <Microphone className={className} />;
    case "playlist": return <Playlist className={className} />;
    case "account": return <UserCircle className={className} />;
    case "newsletter": return <Newspaper className={className} />;
  }
}

// Colored pill badge — deliberately matches the look of the type/category
// badges (getSocialMediaColor-driven border/bg/text), so a kind badge reads
// as the same family of UI element, not a plain gray afterthought.
export function ResourceKindBadge({ kind, className = "" }: { kind: ResourceKind; className?: string }) {
  const style = {
    color: getSocialMediaColor(kind, 1),
    backgroundColor: getSocialMediaColor(kind, 0.08),
    borderColor: getSocialMediaColor(kind, 0.18),
  };
  return (
    <span
      className={`text-[9px] font-bold border px-2 py-0.5 rounded-sm capitalize inline-flex items-center gap-1 ${className}`}
      style={style}
    >
      <ResourceKindIcon kind={kind} className="h-3 w-3" />
      {RESOURCE_KIND_LABELS[kind]}
    </span>
  );
}
