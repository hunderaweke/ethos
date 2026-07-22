import React from "react";
import { User, Copy, Check } from "@phosphor-icons/react";
import type { HandleSettings } from "../../types";

interface SettingsTabProps {
  handleSettings: HandleSettings;
  setHandleSettings: React.Dispatch<React.SetStateAction<HandleSettings>>;
  onSaveProfile: (e: React.FormEvent) => void;
  onShare: () => void;
  copied: boolean;
}

export default function SettingsTab({
  handleSettings,
  setHandleSettings,
  onSaveProfile,
  onShare,
  copied
}: SettingsTabProps) {
  return (
    <div className="bg-white border border-zinc-200 p-6 rounded-sm shadow-2xs max-w-3xl space-y-6">
      <div>
        <h3 className="text-base font-black text-zinc-950 flex items-center gap-2">
          <User className="h-4.5 w-4.5 text-black" />
          Handle & Profile Settings
        </h3>
        <p className="text-xs text-zinc-500 font-semibold mt-1">
          Customize your public handle, bio statement, and verification status.
        </p>
      </div>

      <form onSubmit={onSaveProfile} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-zinc-700 mb-1">Display Name</label>
            <input
              type="text"
              value={handleSettings.displayName}
              onChange={(e) => setHandleSettings({ ...handleSettings, displayName: e.target.value })}
              className="w-full bg-zinc-50 border border-zinc-200 focus:border-black rounded-sm px-3 py-2 text-xs font-semibold text-zinc-900 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 mb-1">Public Handle</label>
            <div className="flex">
              <span className="bg-zinc-100 border border-r-0 border-zinc-200 rounded-l-sm px-3 py-2 text-xs font-bold text-zinc-500">
                blueprint.id/
              </span>
              <input
                type="text"
                value={handleSettings.handle}
                onChange={(e) => setHandleSettings({ ...handleSettings, handle: e.target.value })}
                className="w-full bg-zinc-50 border border-zinc-200 focus:border-black rounded-r-sm px-3 py-2 text-xs font-bold text-zinc-900 outline-none"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-zinc-700 mb-1">Bio / Thesis Statement</label>
          <textarea
            rows={3}
            value={handleSettings.bio}
            onChange={(e) => setHandleSettings({ ...handleSettings, bio: e.target.value })}
            className="w-full bg-zinc-50 border border-zinc-200 focus:border-black rounded-sm p-3 text-xs font-medium text-zinc-900 outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-zinc-700 mb-1">Location</label>
            <input
              type="text"
              value={handleSettings.location}
              onChange={(e) => setHandleSettings({ ...handleSettings, location: e.target.value })}
              className="w-full bg-zinc-50 border border-zinc-200 focus:border-black rounded-sm px-3 py-2 text-xs font-semibold text-zinc-900 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 mb-1">Key Focus / Domains</label>
            <input
              type="text"
              value={handleSettings.skills}
              onChange={(e) => setHandleSettings({ ...handleSettings, skills: e.target.value })}
              className="w-full bg-zinc-50 border border-zinc-200 focus:border-black rounded-sm px-3 py-2 text-xs font-semibold text-zinc-900 outline-none"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={onShare}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 text-xs font-bold text-zinc-700 bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 px-4 py-2 rounded-sm transition-all cursor-pointer"
          >
            <Copy className="h-3.5 w-3.5" />
            <span>{copied ? "Copied Handle URL!" : "Copy Handle Link"}</span>
          </button>

          <button
            type="submit"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-sm bg-black px-5 py-2 text-xs font-bold text-white hover:bg-zinc-900 transition-all cursor-pointer shadow-2xs"
          >
            <Check className="h-3.5 w-3.5" />
            <span>Save Profile Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
