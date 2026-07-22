import { useState } from "react";
import { X, ArrowLeft, CheckCircle, ShieldCheck, Sparkle, GoogleLogo } from "@phosphor-icons/react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialMode?: "login" | "signup";
}

export default function AuthModal({ isOpen, onClose, onSuccess, initialMode = "signup" }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleGoogleAuth = () => {
    setIsLoading(true);
    // Simulate Google SSO authentication flow
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onSuccess();
        onClose();
      }, 900);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white border border-zinc-200 w-full max-w-md rounded-sm shadow-2xl overflow-hidden relative group">
        
        {/* Minimal Blueprint grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none select-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(24, 24, 27, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(24, 24, 27, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px"
          }}
        />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-black p-1 rounded-sm cursor-pointer z-10 transition-colors"
          title="Close modal"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="p-8 relative z-10 space-y-6 text-center">
          
          {/* Brand Logo & Header */}
          <div className="space-y-2">
            
            <h2 className="text-2xl font-extrabold text-zinc-950 font-sans tracking-tight">
              {mode === "signup" ? "Create your mind-shelf" : "Welcome back to"}
              <span className="block text-black">
                blueprint<span className="text-zinc-400 font-medium">.id</span>
              </span>
            </h2>
            
            <p className="text-xs text-zinc-500 font-medium max-w-xs mx-auto">
              {mode === "signup"
                ? "Join curators, engineers, and designers sharing their intellectual graph."
                : "Sign in with Google to manage your handle, shelf items, and analytics."}
            </p>
          </div>

          {/* Mode Switch Tabs */}
          <div className="grid grid-cols-2 p-1 bg-zinc-100 border border-zinc-200/80 rounded-sm text-xs font-bold">
            <button
              onClick={() => setMode("signup")}
              className={`py-1.5 rounded-sm transition-all cursor-pointer ${
                mode === "signup" ? "bg-black text-white shadow-2xs" : "text-zinc-600 hover:text-black"
              }`}
            >
              Sign Up
            </button>
            <button
              onClick={() => setMode("login")}
              className={`py-1.5 rounded-sm transition-all cursor-pointer ${
                mode === "login" ? "bg-black text-white shadow-2xs" : "text-zinc-600 hover:text-black"
              }`}
            >
              Log In
            </button>
          </div>

          {/* Single Sign-On Action Area */}
          <div className="space-y-3 pt-2">
            
            {isSuccess ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-sm text-emerald-800 flex items-center justify-center gap-2 animate-fade-in">
                <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0" />
                <span className="text-xs font-extrabold">Authenticated! Opening Dashboard...</span>
              </div>
            ) : (
              <button
                onClick={handleGoogleAuth}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 bg-white border border-zinc-300 hover:border-black hover:bg-slate-50 text-slate-900 font-bold text-xs py-3 px-4 rounded-sm transition-all shadow-2xs cursor-pointer disabled:opacity-50 group/btn"
              >
                {isLoading ? (
                  <div className="h-4 w-4 border-2 border-zinc-400 border-t-black rounded-full animate-spin" />
                ) : (
                  <GoogleLogo className="h-5 w-5 shrink-0 text-black transition-transform group-hover/btn:scale-110" weight="bold" />
                )}
                <span>{isLoading ? "Authenticating with Google..." : `Continue with Google to ${mode === "signup" ? "Sign Up" : "Log In"}`}</span>
              </button>
            )}

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-zinc-400 font-semibold pt-1">
              <ShieldCheck className="h-3.5 w-3.5 text-zinc-500" />
              <span>Only Google Authentication is supported for instant verification.</span>
            </div>

          </div>

          {/* Footer Terms & Policy */}
          <div className="pt-4 border-t border-zinc-100 text-[10px] text-zinc-400 font-medium leading-relaxed">
            By continuing, you agree to blueprint.id's{" "}
            <a href="#terms" onClick={(e) => e.preventDefault()} className="underline hover:text-black">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#privacy" onClick={(e) => e.preventDefault()} className="underline hover:text-black">
              Privacy Policy
            </a>.
          </div>

        </div>

      </div>
    </div>
  );
}
