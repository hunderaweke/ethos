import { ChatCircle } from "@phosphor-icons/react";

export default function Footer({ onViewProfile }: { onViewProfile: () => void }) {
  return (
    <footer className="bg-white border-t border-zinc-200 py-16 text-zinc-500 font-medium">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top Section: Branding and Links */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-zinc-100">
          
          {/* Logo & Branding */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-black text-white font-bold">
                b
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-900 font-sans">
                blueprint
              </span>
            </div>
            <p className="text-xs text-zinc-400 max-w-xs leading-relaxed">
              Your curation shelf for everything that shaped you. Own your intellectual graph, share your influences, and tag your categories.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">Product</h4>
            <ul className="flex flex-col gap-2.5 text-xs text-zinc-500">
              <li>
                <button 
                  onClick={onViewProfile} 
                  className="hover:text-black transition-colors cursor-pointer bg-transparent border-none text-left p-0"
                >
                  Mind-Shelf Preview
                </button>
              </li>
              <li><a href="#discovery" className="hover:text-black transition-colors">Discover Perspectives</a></li>
              <li><a href="#features" className="hover:text-black transition-colors">Features</a></li>
              <li><a href="#faq" className="hover:text-black transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">Company</h4>
            <ul className="flex flex-col gap-2.5 text-xs text-zinc-500">
              <li><a href="#" className="hover:text-black transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Press Kit</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Security</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">Community</h4>
            <ul className="flex flex-col gap-2.5 text-xs text-zinc-500">
              <li>
                <a href="#" className="flex items-center gap-1.5 hover:text-black transition-colors">
                  <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-1.5 hover:text-black transition-colors">
                  <ChatCircle className="h-3.5 w-3.5" /> Discord
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-1.5 hover:text-black transition-colors">
                  <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  GitHub
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Section: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400 font-semibold">
          <div>
            © {new Date().getFullYear()} Blueprint Inc. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-zinc-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-zinc-600 transition-colors">Privacy Policy</a>
            <a href="#" className="flex items-center gap-1.5 hover:text-zinc-600 transition-colors">
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-300" /> All systems operational
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
