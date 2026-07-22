import { useEffect, useRef, useState } from "react";
import { X, CheckCircle, ShieldCheck, GoogleLogo, WarningCircle } from "@phosphor-icons/react";
import { googleAuth, ApiError } from "../utils/api";
import { GOOGLE_CLIENT_ID, loadGoogleIdentityScript, type GoogleCredentialResponse } from "../utils/googleIdentity";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialMode?: "login" | "signup";
}

// Login and signup are the same Google flow server-side (POST /auth/google
// upserts either way), so there's no separate signup/login UI here — one button.
export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleCredential = (idToken: string) => {
    setError(null);
    setIsLoading(true);
    googleAuth(idToken)
      .then(() => {
        setIsLoading(false);
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          onSuccess();
          onClose();
        }, 900);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err instanceof ApiError ? err.message : "Couldn't sign you in — please try again.");
      });
  };

  // Simulated flow — only used when no GOOGLE_CLIENT_ID is configured (local dev without credentials).
  const handleSimulatedAuth = () => {
    setIsLoading(true);
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

  useEffect(() => {
    if (!isOpen || !GOOGLE_CLIENT_ID || !buttonRef.current) return;

    let cancelled = false;
    loadGoogleIdentityScript()
      .then(() => {
        if (cancelled || !window.google || !buttonRef.current) return;
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: (res: GoogleCredentialResponse) => handleCredential(res.credential),
        });
        buttonRef.current.innerHTML = "";
        window.google.accounts.id.renderButton(buttonRef.current, {
          theme: "outline",
          size: "large",
          width: 320,
          shape: "rectangular",
          text: "continue_with",
        });
      })
      .catch(() => setError("Couldn't load Google Sign-In — please try again."));

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white border border-zinc-200 w-full max-w-md rounded-sm shadow-2xl overflow-hidden relative group cursor-default"
      >

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
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-4 right-4 text-zinc-400 hover:text-black hover:bg-zinc-100 p-2 rounded-sm cursor-pointer z-30 transition-all pointer-events-auto"
          title="Close modal"
        >
          <X className="h-4 w-4 text-zinc-600" />
        </button>

        <div className="p-8 relative z-10 space-y-6 text-center">

          {/* Brand Logo & Header */}
          <div className="space-y-2">

            <h2 className="text-2xl font-extrabold text-zinc-950 font-sans tracking-tight">
              Continue to
              <span className="block text-black">
                blueprint<span className="text-zinc-400 font-medium">.id</span>
              </span>
            </h2>

            <p className="text-xs text-zinc-500 font-medium max-w-xs mx-auto">
              One account for everything — curate your shelf, or just browse what others have shared.
            </p>
          </div>

          {/* Single Sign-On Action Area */}
          <div className="space-y-3 pt-2">

            {isSuccess ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-sm text-emerald-800 flex items-center justify-center gap-2 animate-fade-in">
                <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0" />
                <span className="text-xs font-extrabold">Authenticated! Opening Dashboard...</span>
              </div>
            ) : GOOGLE_CLIENT_ID ? (
              <div className="flex flex-col items-center gap-2">
                <div ref={buttonRef} className="min-h-[44px] flex items-center justify-center" />
                {isLoading && <div className="h-4 w-4 border-2 border-zinc-400 border-t-black rounded-full animate-spin" />}
              </div>
            ) : (
              <button
                onClick={handleSimulatedAuth}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 bg-white border border-zinc-300 hover:border-black hover:bg-slate-50 text-slate-900 font-bold text-xs py-3 px-4 rounded-sm transition-all shadow-2xs cursor-pointer disabled:opacity-50 group/btn"
              >
                {isLoading ? (
                  <div className="h-4 w-4 border-2 border-zinc-400 border-t-black rounded-full animate-spin" />
                ) : (
                  <GoogleLogo className="h-5 w-5 shrink-0 text-black transition-transform group-hover/btn:scale-110" weight="bold" />
                )}
                <span>{isLoading ? "Authenticating with Google..." : "Continue with Google"}</span>
              </button>
            )}

            {error && (
              <div className="flex items-center justify-center gap-1.5 text-[10px] text-rose-600 font-bold">
                <WarningCircle className="h-3.5 w-3.5" />
                <span>{error}</span>
              </div>
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
