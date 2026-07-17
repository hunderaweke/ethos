import { Stack, Globe } from "@phosphor-icons/react";

export default function Highlights() {
  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Highlight Card 1 */}
          <div className="flex gap-5 p-6 rounded-2xl bg-zinc-50 border border-zinc-200 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-black text-white shadow-xs">
              <Globe className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                A museum of your influences.
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Add the books, essays, and thinkers that made a difference. Help others discover life-changing ideas instead of transient feeds.
              </p>
            </div>
          </div>

          {/* Highlight Card 2 */}
          <div className="flex gap-5 p-6 rounded-2xl bg-zinc-100 border border-zinc-200 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-black text-white shadow-xs">
              <Stack className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                Add personal notes on how they built you.
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Explain how each resource impacted your thinking. Share niche tags and map out your personal intellectual lineage in one elegant space.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
