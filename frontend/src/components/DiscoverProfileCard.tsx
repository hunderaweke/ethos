import { UserCircle, UserPlus, UserMinus, Users } from "@phosphor-icons/react";
import type { DiscoverProfile } from "../utils/api";

interface DiscoverProfileCardProps {
  profile: DiscoverProfile;
  isFollowing: boolean;
  onToggleFollow: (handle: string) => void;
  onOpen: (handle: string) => void;
  isLoggedIn: boolean;
}

export default function DiscoverProfileCard({
  profile,
  isFollowing,
  onToggleFollow,
  onOpen,
  isLoggedIn,
}: DiscoverProfileCardProps) {
  return (
    <div className="group bg-white border border-zinc-200 hover:border-zinc-300 rounded-sm shadow-xs hover:shadow-md transition-all duration-300 p-6 flex flex-col gap-4">
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => onOpen(profile.handle)}
      >
        {profile.avatar_url ? (
          <img
            src={profile.avatar_url}
            alt={profile.handle}
            referrerPolicy="no-referrer"
            className="h-12 w-12 rounded-full object-cover border border-zinc-200 shrink-0"
          />
        ) : (
          <UserCircle className="h-12 w-12 text-zinc-300 shrink-0" weight="fill" />
        )}
        <div className="min-w-0">
          <h3 className="text-sm font-black text-zinc-950 truncate">
            {profile.display_name || profile.handle}
          </h3>
          <p className="text-xs font-bold text-zinc-500 truncate">@{profile.handle}</p>
        </div>
      </div>

      {profile.bio && (
        <p className="text-xs text-zinc-600 font-medium leading-relaxed line-clamp-2">
          {profile.bio}
        </p>
      )}

      <div className="flex items-center justify-between gap-2 pt-3 border-t border-zinc-150 mt-auto">
        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-zinc-500">
          <Users className="h-3.5 w-3.5" />
          {profile.follower_count} followers
        </span>

        {isLoggedIn && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFollow(profile.handle);
            }}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-bold transition-all cursor-pointer active:scale-95 ${
              isFollowing
                ? "bg-zinc-100 text-zinc-700 border border-zinc-200 hover:bg-zinc-200"
                : "bg-zinc-900 text-white hover:bg-zinc-800"
            }`}
          >
            {isFollowing ? (
              <>
                <UserMinus className="h-3.5 w-3.5" /> Unfollow
              </>
            ) : (
              <>
                <UserPlus className="h-3.5 w-3.5" /> Follow
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
