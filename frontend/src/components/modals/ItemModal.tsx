import React from "react";
import { Plus, X } from "@phosphor-icons/react";
import type { CurationItem } from "../../types";

interface ItemModalProps {
  isOpen: boolean;
  editingItem: CurationItem | null;
  formData: {
    title: string;
    type: string;
    creator: string;
    link: string;
    description: string;
    impact: string;
    tags: string;
    image: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    title: string;
    type: string;
    creator: string;
    link: string;
    description: string;
    impact: string;
    tags: string;
    image: string;
  }>>;
  onClose: () => void;
  onSave: (e: React.FormEvent) => void;
}

export default function ItemModal({
  isOpen,
  editingItem,
  formData,
  setFormData,
  onClose,
  onSave
}: ItemModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in cursor-pointer"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white border border-zinc-200 w-full max-w-lg rounded-sm shadow-2xl overflow-hidden cursor-default"
      >
        <div className="p-4 border-b border-zinc-200 flex items-center justify-between bg-zinc-50">
          <h3 className="text-xs font-black uppercase tracking-wider text-zinc-900 flex items-center gap-2">
            <Plus className="h-4 w-4" />
            {editingItem ? "Edit Mind-Shelf Influence" : "Add New Influence"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-zinc-400 hover:text-black hover:bg-zinc-200/60 p-1.5 rounded-sm cursor-pointer transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={onSave} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div>
            <label className="block text-xs font-bold text-zinc-700 mb-1">Item Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Designing Data-Intensive Applications"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-zinc-50 border border-zinc-200 focus:border-black rounded-sm px-3 py-2 text-xs font-semibold outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1">Category Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full bg-zinc-50 border border-zinc-200 focus:border-black rounded-sm px-3 py-2 text-xs font-semibold outline-none capitalize cursor-pointer"
              >
                <option value="book">Book</option>
                <option value="youtube">Video / Youtube</option>
                <option value="podcast">Podcast</option>
                <option value="essay">Essay / Article</option>
                <option value="x">Twitter / X</option>
                <option value="design">Design Rule</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1">Author / Creator</label>
              <input
                type="text"
                placeholder="e.g. Martin Kleppmann"
                value={formData.creator}
                onChange={(e) => setFormData({ ...formData, creator: e.target.value })}
                className="w-full bg-zinc-50 border border-zinc-200 focus:border-black rounded-sm px-3 py-2 text-xs font-semibold outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 mb-1">Resource Link URL *</label>
            <input
              type="url"
              required
              placeholder="https://example.com/book"
              value={formData.link}
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              className="w-full bg-zinc-50 border border-zinc-200 focus:border-black rounded-sm px-3 py-2 text-xs font-semibold outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 mb-1">Brief Description</label>
            <textarea
              rows={2}
              placeholder="What is this resource about?"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-zinc-50 border border-zinc-200 focus:border-black rounded-sm p-3 text-xs font-medium outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 mb-1">How it shaped me (Impact Quote)</label>
            <textarea
              rows={2}
              placeholder="Personal insight or why you recommend it..."
              value={formData.impact}
              onChange={(e) => setFormData({ ...formData, impact: e.target.value })}
              className="w-full bg-zinc-50 border border-zinc-200 focus:border-black rounded-sm p-3 text-xs font-medium outline-none italic"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 mb-1">Tags (Comma-separated)</label>
            <input
              type="text"
              placeholder="#Systems, #Databases, #Backend"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              className="w-full bg-zinc-50 border border-zinc-200 focus:border-black rounded-sm px-3 py-2 text-xs font-semibold outline-none"
            />
          </div>

          <div className="pt-4 border-t border-zinc-200 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-zinc-600 hover:text-black cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold bg-black text-white hover:bg-zinc-900 rounded-sm transition-all cursor-pointer shadow-2xs"
            >
              {editingItem ? "Update Influence" : "Add to Mind-Shelf"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
