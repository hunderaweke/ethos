export default function CommunityBanner() {
  const members = [
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=120",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=120",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=120",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120",
    "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&q=80&w=120",
  ];

  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Avatars Stack */}
        <div className="flex items-center justify-center -space-x-4 mb-6 hover:-space-x-2 transition-all duration-300">
          {members.map((img, idx) => (
            <div key={idx} className="relative group cursor-pointer">
              <img
                src={img}
                alt={`Member ${idx + 1}`}
                className="h-14 w-14 rounded-2xl object-cover border-4 border-slate-50 shadow-md grayscale group-hover:grayscale-0 transform group-hover:scale-110 group-hover:-translate-y-1.5 transition-all duration-300"
              />
            </div>
          ))}
        </div>

        {/* Small Label */}
        <p className="text-xs font-bold uppercase tracking-widest text-black mb-3 font-sans">
          OUR USERS CURATE THE ENTIRE WEB
        </p>

        {/* Heading */}
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 max-w-2xl mx-auto mb-6">
          Finally, a visual shelf of what{" "}
          <span className="text-zinc-400 font-extrabold">
            shaped you.
          </span>
        </h2>

        {/* Button */}
        <div className="mb-4">
          <a
            href="#claim"
            className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 hover:bg-slate-800 px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105 active:scale-95 shadow-md shadow-slate-950/15"
          >
            Build Your Shelf
          </a>
        </div>

        {/* Sub-label */}
        <p className="text-xs font-semibold text-slate-500">
          No algorithmic feeds. Just the books and ideas that build real perspective.
        </p>
      </div>
    </section>
  );
}
