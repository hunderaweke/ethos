export default function Navbar({ onViewProfile, onViewDashboard }: { onViewProfile: () => void; onViewDashboard?: () => void }) {
  return (
    <header className="sticky top-4 z-50 w-full px-4 sm:px-6 max-w-7xl mx-auto pointer-events-none -mb-20">
      <div className="relative flex h-16 items-center justify-between px-6 bg-white/85 backdrop-blur-md border border-zinc-200/80 rounded-full shadow-sm pointer-events-auto transition-all duration-300">
        <nav className="hidden md:flex items-center gap-8">
          <button 
            onClick={onViewProfile} 
            className="inline-flex items-center text-sm font-semibold text-slate-600 hover:text-black transition-colors cursor-pointer bg-transparent border-none"
          >
            Mind-Shelf
          </button>
          {onViewDashboard && (
            <button 
              onClick={onViewDashboard} 
              className="inline-flex items-center text-sm font-semibold text-slate-900 hover:text-black transition-colors cursor-pointer bg-transparent border-none font-bold"
            >
              Dashboard
            </button>
          )}
          <a href="#discovery" className="text-sm font-semibold text-slate-600 hover:text-black transition-colors">
            Explore
          </a>
          <a href="#features" className="text-sm font-semibold text-slate-600 hover:text-black transition-colors">
            Features
          </a>
        </nav>
        
        {/* Logo (Perfect Center) */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
          <span className="text-lg font-bold tracking-tight text-slate-900 font-sans select-none">
            blueprint<span className="text-zinc-400 font-medium">.id</span>
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={onViewDashboard || onViewProfile}
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-bold text-slate-600 hover:text-black transition-colors cursor-pointer bg-transparent border-none"
          >
            Log in
          </button>
          <button
            onClick={onViewDashboard || onViewProfile}
            className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-bold text-white hover:bg-slate-800 transition-all hover:scale-105 active:scale-95 shadow-md shadow-slate-950/10 cursor-pointer border-none"
          >
            Open Dashboard
          </button>
        </div>
      </div>
    </header>
  );
}
