
export default function FeaturedBanner() {
  return (
    <section className="py-12 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative h-[350px] sm:h-[450px] rounded-3xl overflow-hidden shadow-xl border border-slate-200/50 group">
          {/* Background Image */}
          <img
            src="/curation_showcase.jpg"
            alt="Curate and Share your follows"
            className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
          />

          {/* Solid Dark Overlay */}
          <div className="absolute inset-0 bg-black/75 flex flex-col justify-center px-6 sm:px-12 text-white">
            <div className="max-w-md">
              <span className="inline-flex items-center rounded-full bg-white/10 border border-white/20 px-3 py-1 text-xs font-semibold text-white uppercase mb-4 tracking-wider">
                Curators & Seekers
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-4">
                Curate, share, and discover what shaped you.
              </h2>
              <p className="text-sm sm:text-base text-slate-300 font-medium">
                Your shelf, your rules. Build a personal collection of what you actually consume, write reviews explaining how it built you, and connect with other curious minds.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
