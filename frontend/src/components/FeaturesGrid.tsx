import { useState } from "react";
import { FolderSimple, Palette, CaretRight, Lock, BookOpen, VideoCamera, Microphone, Lightbulb } from "@phosphor-icons/react";

export default function FeaturesGrid({ onViewProfile }: { onViewProfile: () => void }) {
  const [selectedColor, setSelectedColor] = useState("gray");

  const colors = [
    { name: "white", bg: "bg-white border border-zinc-300", value: "#ffffff" },
    { name: "light gray", bg: "bg-zinc-200", value: "#e4e4e7" },
    { name: "gray", bg: "bg-zinc-500", value: "#71717a" },
    { name: "dark gray", bg: "bg-zinc-800", value: "#27272a" },
    { name: "black", bg: "bg-black", value: "#000000" },
  ];

  return (
    <section id="features" className="py-20 bg-slate-50 border-t border-slate-200/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Your intellectual shelf, built to share
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Showcase your influences, explore what built other minds, and share personal notes on how each item shaped you.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Card 1: Personal Dashboard */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300">
            <div>
              {/* Graphic Mockup */}
              <div className="bg-slate-50 rounded-2xl border border-slate-100 p-4 h-48 mb-6 flex flex-col justify-between relative overflow-hidden">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <FolderSimple className="h-3.5 w-3.5" /> Influences / Books Shelf
                </div>
                
                <div className="flex flex-col gap-2">
                  <div className="p-2 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between text-xs font-bold text-slate-700">
                    <span className="flex items-center gap-1.5"><Lock className="h-3.5 w-3.5 text-brand-indigo" /> books_read.json</span>
                    <span className="text-[10px] text-slate-400 font-semibold">14 items</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between text-xs font-bold text-slate-700">
                    <span className="flex items-center gap-1.5"><Lock className="h-3.5 w-3.5 text-brand-indigo" /> design_mentors.json</span>
                    <span className="text-[10px] text-slate-400 font-semibold">28 items</span>
                  </div>
                </div>

                <div className="absolute -right-4 -bottom-4 h-16 w-16 bg-brand-indigo/10 rounded-full blur-xl" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-2">Personal Shelf</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                A beautiful shelf to manage your influences. Select media types, add tags, and write a note on how it shaped your worldview.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-bold text-brand-indigo hover:text-zinc-600 cursor-pointer">
              Read curation guide <CaretRight className="h-3.5 w-3.5 ml-1" />
            </div>
          </div>

          {/* Card 2: Search & Discovery */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300">
            <div>
              {/* Graphic Mockup */}
              <div className="bg-slate-50 rounded-2xl border border-slate-100 p-4 h-48 mb-6 flex flex-wrap gap-3.5 items-center justify-center relative overflow-hidden">
                <span className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 shadow-xs font-semibold text-xs text-slate-800 flex items-center gap-1.5">
                  <BookOpen className="h-3.5 w-3.5" /> Books
                </span>
                <span className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 shadow-xs font-semibold text-xs text-slate-800 flex items-center gap-1.5">
                  <VideoCamera className="h-3.5 w-3.5" /> Creators
                </span>
                <span className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 shadow-xs font-semibold text-xs text-slate-800 flex items-center gap-1.5">
                  <Microphone className="h-3.5 w-3.5" /> Podcasts
                </span>
                <span className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 shadow-xs font-semibold text-xs text-slate-800 flex items-center gap-1.5">
                  <Lightbulb className="h-3.5 w-3.5" /> Essays
                </span>
                
                <div className="absolute -left-4 -bottom-4 h-16 w-16 bg-brand-pink/10 rounded-full blur-xl" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-2">Discover Perspectives</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Explore other users' shelves. Search by specific books, channels, or platforms to see who was shaped by what.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-bold text-brand-indigo hover:text-zinc-600 cursor-pointer">
              Explore search filters <CaretRight className="h-3.5 w-3.5 ml-1" />
            </div>
          </div>

          {/* Card 3: Shareable Profiles & Handles */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300">
            <div>
              {/* Graphic Mockup */}
              <div className="bg-slate-50 rounded-2xl border border-slate-100 p-4 h-48 mb-6 flex flex-col justify-between relative overflow-hidden">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <Palette className="h-3.5 w-3.5 text-slate-400" /> Theme Editor
                </div>

                {/* Simulated Custom Theme Preview */}
                <div className="my-auto flex items-center justify-center gap-3">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`h-8 w-8 rounded-full border-2 transition-all duration-300 ${color.bg} ${
                        selectedColor === color.name
                          ? "border-slate-900 scale-110 shadow-md"
                          : "border-transparent hover:scale-105"
                      }`}
                    />
                  ))}
                </div>

                <div className="p-2 rounded-xl bg-white border border-slate-200/80 shadow-xs text-center text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5">
                  Custom theme: <span className="uppercase text-black font-black">{selectedColor}</span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-2">Shareable Mind-Shelf</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Every user gets a custom @handle link (e.g. blueprint.id/@technomad23) to share on their bio, making their personal bookshelf instantly readable.
              </p>
            </div>
            <button 
              onClick={onViewProfile}
              className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-bold text-brand-indigo hover:text-zinc-600 cursor-pointer bg-transparent border-none w-full justify-start text-left"
            >
              View demo profiles <CaretRight className="h-3.5 w-3.5 ml-1" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
