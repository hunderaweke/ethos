import { ShareNetwork, Check, UserPlus, SealCheck, Compass, Code, MapPin } from "@phosphor-icons/react";
import type { ApiProfile } from "../utils/api";

interface ProfileHeaderProps {
  profile: ApiProfile;
  itemCount: number;
  copied: boolean;
  onShare: () => void;
  isFollowing: boolean;
  onToggleFollow: () => void;
}

export default function ProfileHeader({ profile, itemCount, copied, onShare, isFollowing, onToggleFollow }: ProfileHeaderProps) {
  return (
    <aside className="w-full lg:sticky lg:top-24 space-y-6">
      {/* Sidebar Profile Card Container - Light Landing Page Theme */}
      <div className="bg-white border border-zinc-200 shadow-sm relative group overflow-hidden rounded-sm">

        {/* Banner Header in Sidebar */}
        <div className="relative h-36 sm:h-40 border-b border-zinc-200 bg-zinc-50 overflow-hidden select-none">

          {profile.banner_url ? (
            <img
              src={profile.banner_url}
              alt=""
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <>
              {/* Vector Drafting SVG Lines (fallback when no banner is set) */}
              <svg className="absolute inset-0 w-full h-full text-zinc-300/80" xmlns="http://www.w3.org/2000/svg">
                <line x1="-10%" y1="10%" x2="110%" y2="90%" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8" />
                <line x1="-10%" y1="90%" x2="110%" y2="10%" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8" />
                <circle cx="50%" cy="50%" r="60" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="2 4" />
                <circle cx="50%" cy="50%" r="90" stroke="currentColor" strokeWidth="1" fill="none" />
                <circle cx="50%" cy="50%" r="3" fill="currentColor" />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-r from-zinc-100/60 via-transparent to-zinc-100/60" />
            </>
          )}

          {/* Minimalist Blueprint Label Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none text-[9px] font-bold text-zinc-500 capitalize tracking-wider">
            <span className="bg-white/90 backdrop-blur-sm px-2 py-0.5 border border-zinc-200 shadow-2xs rounded-sm">Sys // Blueprint.id</span>
            <span className="bg-white/90 backdrop-blur-sm px-2 py-0.5 border border-zinc-200 shadow-2xs rounded-sm">Node 01</span>
          </div>
        </div>

        {/* Profile Details Body */}
        <div className="p-6 relative pt-0 z-10">

          {/* Avatar Image (Overlapping Banner) */}
          <div className="relative -mt-14 mb-4 inline-block">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 border border-zinc-200 bg-white z-10 shadow-sm overflow-hidden group-hover:border-black transition-colors rounded-sm">
              <img
                src={profile.avatar_url || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"}
                alt={profile.display_name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Live Indicator */}
            <span className="absolute bottom-1 right-1 flex h-3.5 w-3.5 z-20">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-black border-2 border-white"></span>
            </span>
          </div>

          {/* Name & Handle */}
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-zinc-950 tracking-tight">{profile.display_name}</h1>
              {profile.is_verified && <SealCheck className="h-5 w-5 text-black" weight="fill" />}
            </div>
            <p className="text-xs font-bold text-zinc-500 mt-0.5">
              blueprint.id/@{profile.handle}
            </p>
          </div>

          {/* Bio statement */}
          {profile.bio && (
            <p className="text-xs text-zinc-650 font-medium leading-relaxed mt-3.5 border-l-2 border-black pl-3">
              {profile.bio}
            </p>
          )}

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-2 mt-5 py-3 border-y border-zinc-200 text-[10px] font-bold capitalize tracking-wider">
            <div className="bg-zinc-50 p-2.5 border border-zinc-200 text-left rounded-sm">
              <span className="text-zinc-400 block text-[9px]">Influences</span>
              <strong className="text-sm font-extrabold text-zinc-900">{itemCount} Items</strong>
            </div>
            <div className="bg-zinc-50 p-2.5 border border-zinc-200 text-left rounded-sm">
              <span className="text-zinc-400 block text-[9px]">Followers</span>
              <strong className="text-sm font-extrabold text-zinc-900">{profile.follower_count.toLocaleString()}</strong>
            </div>
          </div>

          {/* Metadata tags */}
          <div className="mt-4 space-y-2 text-[11px] font-bold text-zinc-500">
            {profile.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-zinc-950" />
                <span>{profile.location}</span>
              </div>
            )}
            {profile.skills && (
              <div className="flex items-center gap-2">
                <Code className="h-3.5 w-3.5 text-zinc-950" />
                <span>{profile.skills}</span>
              </div>
            )}
            {profile.curator_score != null && (
              <div className="flex items-center gap-2">
                <Compass className="h-3.5 w-3.5 text-zinc-950" />
                <span>Curator score: {profile.curator_score}%</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-6 space-y-2.5">
            <button
              onClick={onShare}
              className="w-full inline-flex items-center justify-center gap-2 border border-zinc-200 bg-white hover:bg-zinc-50 px-4 py-2.5 text-xs font-bold capitalize text-zinc-900 active:scale-98 transition-all cursor-pointer shadow-2xs rounded-sm"
            >
              {copied ? <Check className="h-4 w-4 text-zinc-950" /> : <ShareNetwork className="h-4 w-4 text-zinc-950" />}
              {copied ? "Copied Link" : "Share Shelf"}
            </button>
            <button
              onClick={onToggleFollow}
              className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold capitalize active:scale-98 transition-all cursor-pointer shadow-2xs rounded-sm ${
                isFollowing ? "bg-zinc-100 hover:bg-zinc-200 text-zinc-900 border border-zinc-200" : "bg-black hover:bg-zinc-900 text-white"
              }`}
            >
              <UserPlus className={`h-4 w-4 ${isFollowing ? "text-zinc-900" : "text-white"}`} />
              {isFollowing ? "Following" : "Follow Shelf"}
            </button>
          </div>

        </div>

        {/* Card Footer HUD metadata line */}
        <div className="px-6 py-2.5 bg-zinc-50 border-t border-zinc-200 flex justify-between items-center text-[9px] font-bold capitalize tracking-wider text-zinc-400">
          <span>Ethos // ID-0x8F92</span>
          <span className="flex items-center gap-1.5 text-zinc-900">
            <span className="h-1.5 w-1.5 rounded-full bg-black animate-pulse" />
            Live mind-shelf
          </span>
        </div>
      </div>
    </aside>
  );
}
