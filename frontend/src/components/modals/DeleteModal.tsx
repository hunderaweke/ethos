import React from "react";
import { Trash } from "@phosphor-icons/react";
import type { CurationItem } from "../../types";

interface DeleteModalProps {
  item: CurationItem | null;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteModal({ item, onClose, onConfirm }: DeleteModalProps) {
  if (!item) return null;

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in cursor-pointer"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white border border-zinc-200 w-full max-w-md rounded-sm shadow-2xl overflow-hidden p-6 space-y-4 cursor-default"
      >
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-sm bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center shrink-0">
            <Trash className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-black text-zinc-950">Remove Mind-Shelf Item</h3>
            <p className="text-xs text-zinc-500 font-semibold mt-0.5">This item will be un-published from your handle page.</p>
          </div>
        </div>

        <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-sm text-xs font-semibold text-zinc-800">
          <span className="text-zinc-500 block text-[10px] capitalize font-bold">Item to remove:</span>
          <span className="font-extrabold text-zinc-950">{item.title}</span>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-zinc-600 hover:text-black cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 text-xs font-bold bg-rose-600 text-white hover:bg-rose-700 rounded-sm transition-all cursor-pointer shadow-2xs"
          >
            Yes, Remove Item
          </button>
        </div>
      </div>
    </div>
  );
}
