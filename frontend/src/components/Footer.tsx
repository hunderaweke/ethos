import { XLogoIcon, DiscordLogoIcon, GithubLogoIcon } from "@phosphor-icons/react";

interface FooterProps {
  onViewProfile?: () => void;
  onViewDashboard?: () => void;
  onGoHome?: () => void;
  onOpenAuth?: (mode: "login" | "signup") => void;
}

export default function Footer({ onViewProfile, onViewDashboard, onGoHome, onOpenAuth }: FooterProps) {
  return (
    <footer className="w-full bg-zinc-950 text-zinc-400 pt-16 mt-12 border-t border-zinc-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
        
        {/* Top Section: Branding and Links */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          
          {/* Logo & Branding */}
          <div className="md:col-span-2 flex flex-col gap-4 col-span-1">
            <div 
              className={`flex items-center gap-2 ${onGoHome ? "cursor-pointer hover:opacity-80 transition-opacity" : ""}`}
              onClick={onGoHome}
            >
              <span className="text-lg font-bold tracking-tight text-white font-sans">
                blueprint<span className="text-zinc-500 font-medium">.id</span>
              </span>
            </div>
            <p className="text-xs text-zinc-500 max-w-xs leading-relaxed">
              Your curation shelf for everything that shaped you. Own your intellectual graph, share your influences, and tag your categories.
            </p>
          </div>

          {/* Product Links */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:flex md:justify-end md:gap-12 col-span-1 md:col-span-3">
            <div>
              <h4 className="text-xs font-bold text-white capitalize tracking-wider mb-4">Product</h4>
              <ul className="flex flex-col gap-2.5 text-xs text-zinc-400">
                {onGoHome && (
                  <li>
                    <button
                      onClick={onGoHome}
                      className="hover:text-white transition-colors cursor-pointer bg-transparent border-none text-left p-0"
                    >
                      ← Back to Home
                    </button>
                  </li>
                )}
                {onViewDashboard && (
                  <li>
                    <button
                      onClick={onViewDashboard}
                      className="hover:text-white transition-colors cursor-pointer bg-transparent border-none text-left p-0 font-semibold text-white"
                    >
                      Creator Dashboard
                    </button>
                  </li>
                )}
                {onOpenAuth && (
                  <li>
                    <button
                      onClick={() => onOpenAuth("login")}
                      className="hover:text-white transition-colors cursor-pointer bg-transparent border-none text-left p-0 text-zinc-400"
                    >
                      Google Sign In
                    </button>
                  </li>
                )}
                {onViewProfile && (
                  <li>
                    <button
                      onClick={onViewProfile}
                      className="hover:text-white transition-colors cursor-pointer bg-transparent border-none text-left p-0"
                    >
                      Mind-Shelf Preview
                    </button>
                  </li>
                )}
                <li><a href="#discovery" className="hover:text-white transition-colors">Discover Perspectives</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              </ul>
            </div>
            {/* Company Links */}
            <div>
              <h4 className="text-xs font-bold text-white capitalize tracking-wider mb-4">Company</h4>
              <ul className="flex flex-col gap-2.5 text-xs text-zinc-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press Kit</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
            {/* Social Links */}
            <div>
              <h4 className="text-xs font-bold text-white capitalize tracking-wider mb-4">Community</h4>
              <ul className="flex flex-col gap-2.5 text-xs text-zinc-400">
                <li>
                  <a href="#" className="flex items-center gap-1.5 hover:text-white transition-colors">
                    <XLogoIcon className="h-3.5 w-3.5" />
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-1.5 hover:text-white transition-colors">
                    <DiscordLogoIcon className="h-3.5 w-3.5" />
                    Discord
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-1.5 hover:text-white transition-colors">
                    <GithubLogoIcon className="h-3.5 w-3.5" />
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom Section: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-semibold border-t border-zinc-900/60">
          <div>
            © {new Date().getFullYear()} Blueprint Inc. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-zinc-200 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-zinc-200 transition-colors">Privacy Policy</a>
            <a href="#" className="flex items-center gap-1.5 hover:text-zinc-200 transition-colors">
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-800 animate-pulse" /> All systems operational
            </a>
          </div>
        </div>

        <div 
          onClick={onGoHome || onViewProfile}
          className={`pt-8 border-t border-zinc-900/60 text-center select-none overflow-hidden ${onGoHome || onViewProfile ? "cursor-pointer hover:opacity-90 transition-opacity" : ""}`}
        >
          <span className="text-[16vw] sm:text-[18vw] lg:text-[max(13vw,15.5rem)] font-black tracking-tighter text-white block leading-none">
            blueprint<span className="text-zinc-500 font-medium">.id</span>
          </span>
        </div>

      </div>
    </footer>
  );
}

