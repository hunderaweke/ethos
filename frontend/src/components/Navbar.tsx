export default function Navbar({ onViewProfile }: { onViewProfile: () => void }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/50 bg-white/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black text-white font-bold shadow-xs">
            b
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-950 font-sans">
            blueprint
          </span>
        </div>

        {/* Navigation links */}
        <nav className="hidden md:flex items-center gap-8">
          <button 
            onClick={onViewProfile} 
            className="text-sm font-medium text-slate-600 hover:text-brand-indigo transition-colors cursor-pointer bg-transparent border-none"
          >
            Mind-Shelf Preview
          </button>
          <a href="#discovery" className="text-sm font-medium text-slate-600 hover:text-brand-indigo transition-colors">
            Discover Perspectives
          </a>
          <a href="#features" className="text-sm font-medium text-slate-600 hover:text-brand-indigo transition-colors">
            Features
          </a>
          <a href="#faq" className="text-sm font-medium text-slate-600 hover:text-brand-indigo transition-colors">
            FAQ
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <a
            href="#claim"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Log in
          </a>
          <a
            href="#claim"
            className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 transition-all hover:scale-105 active:scale-95 shadow-sm shadow-slate-950/10"
          >
            Sign Up
          </a>
        </div>
      </div>
    </header>
  );
}
