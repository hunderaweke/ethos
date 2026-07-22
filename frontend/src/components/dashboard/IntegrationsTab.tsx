import { Plugs, BookBookmark, YoutubeLogo, TwitterLogo, Globe } from "@phosphor-icons/react";

interface IntegrationsTabProps {
  onConnect: (integration: { id: string; name: string }) => void;
}

export default function IntegrationsTab({ onConnect }: IntegrationsTabProps) {
  return (
    <div className="bg-white border border-zinc-200 p-6 rounded-sm shadow-2xs space-y-6">
      <div>
        <h3 className="text-base font-black text-zinc-950 flex items-center gap-2">
          <Plugs className="h-4.5 w-4.5 text-black" />
          Integrations & Sync Feeds
        </h3>
        <p className="text-xs text-zinc-500 font-semibold mt-1">
          Auto-import highlights, bookmarks, and playlists from your favorite platforms.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        <div className="p-4 border border-zinc-200 rounded-sm bg-zinc-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookBookmark className="h-6 w-6 text-amber-600 shrink-0" />
            <div>
              <h4 className="text-xs font-extrabold text-zinc-900">Kindle / Readwise</h4>
              <p className="text-[10px] text-zinc-500 font-semibold">Auto-sync top book highlights</p>
            </div>
          </div>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 border border-emerald-200 px-2 py-1 rounded-sm">
            Connected
          </span>
        </div>

        <div className="p-4 border border-zinc-200 rounded-sm bg-zinc-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <YoutubeLogo className="h-6 w-6 text-red-600 shrink-0" />
            <div>
              <h4 className="text-xs font-extrabold text-zinc-900">YouTube Playlists</h4>
              <p className="text-[10px] text-zinc-500 font-semibold">Sync public video bookmarks</p>
            </div>
          </div>
          <button
            onClick={() => onConnect({ id: "youtube", name: "YouTube Playlists" })}
            className="text-[10px] font-bold text-zinc-700 bg-white border border-zinc-200 px-3 py-1 rounded-sm hover:bg-zinc-100 cursor-pointer"
          >
            Connect
          </button>
        </div>

        <div className="p-4 border border-zinc-200 rounded-sm bg-zinc-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TwitterLogo className="h-6 w-6 text-sky-500 shrink-0" />
            <div>
              <h4 className="text-xs font-extrabold text-zinc-900">Twitter / X Bookmarks</h4>
              <p className="text-[10px] text-zinc-500 font-semibold">Import saved tweet threads</p>
            </div>
          </div>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 border border-emerald-200 px-2 py-1 rounded-sm">
            Connected
          </span>
        </div>

        <div className="p-4 border border-zinc-200 rounded-sm bg-zinc-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Globe className="h-6 w-6 text-indigo-600 shrink-0" />
            <div>
              <h4 className="text-xs font-extrabold text-zinc-900">Custom RSS / Substack</h4>
              <p className="text-[10px] text-zinc-500 font-semibold">Publish newsletter essays</p>
            </div>
          </div>
          <button
            onClick={() => onConnect({ id: "rss", name: "Custom RSS / Substack" })}
            className="text-[10px] font-bold text-zinc-700 bg-white border border-zinc-200 px-3 py-1 rounded-sm hover:bg-zinc-100 cursor-pointer"
          >
            Connect
          </button>
        </div>

      </div>
    </div>
  );
}
