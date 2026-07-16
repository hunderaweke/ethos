
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

          {/* Dark/Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/45 to-transparent flex flex-col justify-center px-6 sm:px-12 text-white">
            <div className="max-w-md">
              <span className="inline-flex items-center rounded-full bg-brand-lime/10 border border-brand-lime/30 px-3 py-1 text-xs font-semibold text-brand-lime uppercase mb-4 tracking-wider">
                Curators & Seekers
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-4">
                Curate, share, and discover top-tier follows.
              </h2>
              <p className="text-sm sm:text-base text-slate-300 font-medium">
                Your feed, your rules. Build a personal collection of what you actually consume, write reviews explaining why you follow, and connect with other curious minds.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
