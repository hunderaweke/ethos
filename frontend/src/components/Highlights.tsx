import { Layers, Globe } from "lucide-react";

export default function Highlights() {
  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Highlight Card 1 */}
          <div className="flex gap-5 p-6 rounded-2xl bg-gradient-to-br from-rose-50/40 via-white to-white border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-rose-500 text-white shadow-lg shadow-rose-200">
              <Globe className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                The curated hub of your digital diet.
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Add and tag the creators, newsletters, and accounts you follow. Help friends and followers discover high-quality resources instead of random social media feeds.
              </p>
            </div>
          </div>

          {/* Highlight Card 2 */}
          <div className="flex gap-5 p-6 rounded-2xl bg-gradient-to-br from-indigo-50/40 via-white to-white border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-500 text-white shadow-lg shadow-indigo-200">
              <Layers className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                Organized categories, personal notes, and direct links.
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Give context to your recommendations. Explain why you subscribe, add niche tags, and keep an active record of your personal recommendations in one elegant shelf.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
