import React from "react";
import { Plugs, X } from "@phosphor-icons/react";

interface IntegrationModalProps {
  integration: { id: string; name: string } | null;
  inputVal: string;
  setInputVal: (val: string) => void;
  onClose: () => void;
  onConfirm: (e: React.FormEvent) => void;
}

export default function IntegrationModal({
  integration,
  inputVal,
  setInputVal,
  onClose,
  onConfirm
}: IntegrationModalProps) {
  if (!integration) return null;

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in cursor-pointer"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white border border-zinc-200 w-full max-w-md rounded-sm shadow-2xl overflow-hidden cursor-default"
      >
        <div className="p-4 border-b border-zinc-200 flex items-center justify-between bg-zinc-50">
          <h3 className="text-xs font-black uppercase tracking-wider text-zinc-900 flex items-center gap-2">
            <Plugs className="h-4 w-4" />
            Connect {integration.name}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-zinc-400 hover:text-black hover:bg-zinc-200/60 p-1.5 rounded-sm cursor-pointer transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={onConfirm} className="p-6 space-y-4">
          <p className="text-xs text-zinc-600 font-medium">
            Enter your {integration.name} username or URL feed to automatically sync public bookmarks.
          </p>

          <div>
            <label className="block text-xs font-bold text-zinc-700 mb-1">
              {integration.name} Handle or Feed URL *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. @technomad or https://feed.url"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="w-full bg-zinc-50 border border-zinc-200 focus:border-black rounded-sm px-3 py-2 text-xs font-semibold outline-none"
            />
          </div>

          <div className="pt-2 border-t border-zinc-100 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-zinc-600 hover:text-black cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold bg-black text-white hover:bg-zinc-900 rounded-sm cursor-pointer shadow-2xs"
            >
              Connect Integration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
