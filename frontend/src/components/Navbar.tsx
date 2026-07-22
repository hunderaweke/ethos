import { useState } from "react";
import { List, X, ArrowRight, SignOut } from "@phosphor-icons/react";

interface NavbarProps {
  onViewProfile: () => void;
  onViewDashboard?: () => void;
  onOpenAuth?: (mode: "login" | "signup") => void;
  isLoggedIn?: boolean;
  onLogout?: () => void;
}

export default function Navbar({ onViewProfile, onViewDashboard, onOpenAuth, isLoggedIn, onLogout }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-4 z-50 w-full px-4 sm:px-6 max-w-7xl mx-auto pointer-events-none -mb-20">
      <div className="relative flex h-16 items-center justify-between px-4 sm:px-6 bg-white/85 backdrop-blur-md border border-zinc-200/80 rounded-sm shadow-sm pointer-events-auto transition-all duration-300">
        
        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <button 
            onClick={onViewProfile} 
            className="inline-flex items-center text-sm font-semibold text-slate-600 hover:text-black transition-colors cursor-pointer bg-transparent border-none"
          >
            Mind-Shelf
          </button>
          {isLoggedIn && onViewDashboard && (
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

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-zinc-700 hover:text-black hover:bg-zinc-100 rounded-sm cursor-pointer transition-colors"
            title="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5 text-black" />
            ) : (
              <List className="h-5 w-5 text-black" />
            )}
          </button>
        </div>
        
        {/* Logo (Perfect Center) */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
          <span className="text-lg font-bold tracking-tight text-slate-900 font-sans select-none">
            blueprint<span className="text-zinc-400 font-medium">.id</span>
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {isLoggedIn ? (
            <>
              {onLogout && (
                <button
                  onClick={onLogout}
                  className="hidden sm:inline-flex items-center gap-1.5 text-sm font-bold text-slate-600 hover:text-black transition-colors cursor-pointer bg-transparent border-none"
                >
                  <SignOut className="h-4 w-4" />
                  Log out
                </button>
              )}
              <button
                onClick={() => (onViewDashboard || onViewProfile)()}
                className="inline-flex items-center gap-1.5 rounded-sm bg-slate-900 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-slate-800 transition-all hover:scale-105 active:scale-95 shadow-md shadow-slate-950/10 cursor-pointer border-none"
              >
                Dashboard
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => onOpenAuth ? onOpenAuth("login") : (onViewDashboard || onViewProfile)()}
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-bold text-slate-600 hover:text-black transition-colors cursor-pointer bg-transparent border-none"
              >
                Log in
              </button>
              <button
                onClick={() => onOpenAuth ? onOpenAuth("signup") : (onViewDashboard || onViewProfile)()}
                className="inline-flex items-center gap-1.5 rounded-sm bg-slate-900 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-slate-800 transition-all hover:scale-105 active:scale-95 shadow-md shadow-slate-950/10 cursor-pointer border-none"
              >
                Sign Up
              </button>
            </>
          )}
        </div>

        {/* Floating Mobile Hamburger Menu Panel */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 mt-3 p-4 bg-white/95 backdrop-blur-md border border-zinc-200 rounded-sm shadow-2xl z-50 animate-fade-in md:hidden space-y-3">
            
            {/* Blueprint Grid pattern */}
            <div 
              className="absolute inset-0 opacity-[0.03] pointer-events-none select-none"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(24, 24, 27, 0.5) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(24, 24, 27, 0.5) 1px, transparent 1px)
                `,
                backgroundSize: "16px 16px"
              }}
            />

            <div className="relative z-10 flex flex-col space-y-1">
              <button
                onClick={() => {
                  onViewProfile();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2.5 text-xs font-bold text-zinc-800 hover:text-black hover:bg-zinc-100 rounded-sm flex items-center justify-between transition-colors cursor-pointer"
              >
                <span>Mind-Shelf</span>
                <ArrowRight className="h-3.5 w-3.5 text-zinc-400" />
              </button>

              {isLoggedIn && onViewDashboard && (
                <button
                  onClick={() => {
                    onViewDashboard();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2.5 text-xs font-bold text-zinc-950 hover:bg-zinc-100 rounded-sm flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span>Creator Dashboard</span>
                  <ArrowRight className="h-3.5 w-3.5 text-zinc-400" />
                </button>
              )}

              <a
                href="#discovery"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-left px-3 py-2.5 text-xs font-bold text-zinc-600 hover:text-black hover:bg-zinc-100 rounded-sm flex items-center justify-between transition-colors"
              >
                <span>Explore</span>
                <ArrowRight className="h-3.5 w-3.5 text-zinc-400" />
              </a>

              <a
                href="#features"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-left px-3 py-2.5 text-xs font-bold text-zinc-600 hover:text-black hover:bg-zinc-100 rounded-sm flex items-center justify-between transition-colors"
              >
                <span>Features</span>
                <ArrowRight className="h-3.5 w-3.5 text-zinc-400" />
              </a>
            </div>

            {/* Mobile Auth Actions */}
            {isLoggedIn ? (
              <div className="relative z-10 pt-3 border-t border-zinc-200/80">
                <button
                  onClick={() => {
                    if (onLogout) onLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-2 flex items-center justify-center gap-1.5 bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 rounded-sm text-xs font-bold text-zinc-900 transition-colors cursor-pointer text-center"
                >
                  <SignOut className="h-3.5 w-3.5" />
                  Log Out
                </button>
              </div>
            ) : (
              <div className="relative z-10 pt-3 border-t border-zinc-200/80 grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    if (onOpenAuth) onOpenAuth("login");
                    else if (onViewDashboard) onViewDashboard();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-2 bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 rounded-sm text-xs font-bold text-zinc-900 transition-colors cursor-pointer text-center"
                >
                  Log In
                </button>

                <button
                  onClick={() => {
                    if (onOpenAuth) onOpenAuth("signup");
                    else if (onViewDashboard) onViewDashboard();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-2 bg-black text-white hover:bg-zinc-900 rounded-sm text-xs font-bold transition-colors cursor-pointer text-center shadow-2xs"
                >
                  Sign Up
                </button>
              </div>
            )}

          </div>
        )}

      </div>
    </header>
  );
}
