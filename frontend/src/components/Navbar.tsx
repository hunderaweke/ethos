import { useState, useEffect } from "react";
import { List, X, ArrowRight, SignOut } from "@phosphor-icons/react";

interface NavbarProps {
  onViewProfile: () => void;
  onViewDashboard?: () => void;
  onViewExplore?: () => void;
  onOpenAuth?: (mode: "login" | "signup") => void;
  isLoggedIn?: boolean;
  onLogout?: () => void;
}

export default function Navbar({ onViewProfile, onViewDashboard, onViewExplore, onOpenAuth, isLoggedIn, onLogout }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="sticky top-4 z-50 w-full px-4 sm:px-6 max-w-7xl mx-auto pointer-events-none -mb-20">
      <div className="relative flex h-16 items-center justify-between px-4 sm:px-6 bg-white/90 backdrop-blur-md border border-zinc-200/90 rounded-sm shadow-sm pointer-events-auto transition-all duration-300">
        
        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-zinc-700 hover:text-black hover:bg-zinc-100 rounded-sm cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
            title="Toggle Menu"
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5 text-black" />
            ) : (
              <List className="h-5 w-5 text-black" />
            )}
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {isLoggedIn && onViewDashboard && (
            <button
              onClick={onViewDashboard}
              className="inline-flex items-center text-sm font-bold text-zinc-900 hover:text-black transition-colors cursor-pointer bg-transparent border-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 rounded-sm px-1 py-0.5"
            >
              Dashboard
            </button>
          )}
          {onViewExplore && (
            <button
              onClick={onViewExplore}
              className="text-sm font-semibold text-zinc-600 hover:text-black transition-colors cursor-pointer bg-transparent border-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 rounded-sm px-1 py-0.5"
            >
              Explore
            </button>
          )}
          <a href="#features" className="text-sm font-semibold text-zinc-600 hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 rounded-sm px-1 py-0.5">
            Features
          </a>
        </nav>
        
        {/* Logo */}
        <div className="md:absolute md:left-1/2 md:-translate-x-1/2 flex items-center gap-2">
          <button 
            onClick={onViewProfile}
            className="text-lg font-bold tracking-tight text-zinc-900 font-sans select-none bg-transparent border-none cursor-pointer"
          >
            blueprint<span className="text-zinc-400 font-medium">.id</span>
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {isLoggedIn ? (
            <>
              {onLogout && (
                <button
                  onClick={onLogout}
                  className="hidden sm:inline-flex items-center gap-1.5 text-sm font-bold text-zinc-600 hover:text-black transition-colors cursor-pointer bg-transparent border-none p-2 rounded-sm"
                >
                  <SignOut className="h-4 w-4" />
                  Log out
                </button>
              )}
              <button
                onClick={() => (onViewDashboard || onViewProfile)()}
                className="inline-flex items-center gap-1.5 rounded-sm bg-zinc-900 px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-zinc-800 transition-all active:scale-95 shadow-md cursor-pointer border-none"
              >
                Dashboard
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => onOpenAuth ? onOpenAuth("login") : (onViewDashboard || onViewProfile)()}
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-bold text-zinc-600 hover:text-black transition-colors cursor-pointer bg-transparent border-none p-2 rounded-sm"
              >
                Log in
              </button>
              <button
                onClick={() => onOpenAuth ? onOpenAuth("signup") : (onViewDashboard || onViewProfile)()}
                className="inline-flex items-center gap-1.5 rounded-sm bg-zinc-900 px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-zinc-800 transition-all active:scale-95 shadow-md cursor-pointer border-none"
              >
                Sign Up
              </button>
            </>
          )}
        </div>

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <>
            <div 
              className="fixed inset-0 bg-black/20 backdrop-blur-xs z-40 md:hidden" 
              onClick={() => setIsMobileMenuOpen(false)} 
            />
            <div className="absolute top-full left-0 right-0 mt-3 p-4 bg-white/95 backdrop-blur-xl border border-zinc-200/90 rounded-sm shadow-xl z-50 animate-in fade-in slide-in-from-top-2 md:hidden space-y-3">
              <div className="flex flex-col space-y-1">
                {isLoggedIn && onViewDashboard && (
                  <button
                    onClick={() => {
                      onViewDashboard();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-3.5 py-3 text-sm font-bold text-zinc-950 hover:bg-zinc-100 rounded-sm flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span>Creator Dashboard</span>
                    <ArrowRight className="h-4 w-4 text-zinc-400" />
                  </button>
                )}

                {onViewExplore && (
                  <button
                    onClick={() => {
                      onViewExplore();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-3.5 py-3 text-sm font-bold text-zinc-600 hover:text-black hover:bg-zinc-100 rounded-sm flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span>Explore</span>
                    <ArrowRight className="h-4 w-4 text-zinc-400" />
                  </button>
                )}

                <a
                  href="#features"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-left px-3.5 py-3 text-sm font-bold text-zinc-600 hover:text-black hover:bg-zinc-100 rounded-sm flex items-center justify-between transition-colors"
                >
                  <span>Features</span>
                  <ArrowRight className="h-4 w-4 text-zinc-400" />
                </a>
              </div>

              {/* Mobile Auth Actions */}
              {isLoggedIn ? (
                <div className="pt-3 border-t border-zinc-200">
                  <button
                    onClick={() => {
                      if (onLogout) onLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full py-3 flex items-center justify-center gap-1.5 bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 rounded-sm text-sm font-bold text-zinc-900 transition-colors cursor-pointer"
                  >
                    <SignOut className="h-4 w-4" />
                    Log Out
                  </button>
                </div>
              ) : (
                <div className="pt-3 border-t border-zinc-200 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      if (onOpenAuth) onOpenAuth("login");
                      else if (onViewDashboard) onViewDashboard();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full py-3 bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 rounded-sm text-sm font-bold text-zinc-900 transition-colors cursor-pointer text-center"
                  >
                    Log In
                  </button>

                  <button
                    onClick={() => {
                      if (onOpenAuth) onOpenAuth("signup");
                      else if (onViewDashboard) onViewDashboard();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full py-3 bg-black text-white hover:bg-zinc-800 rounded-sm text-sm font-bold transition-colors cursor-pointer text-center shadow-sm"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </>
        )}

      </div>
    </header>
  );
}
