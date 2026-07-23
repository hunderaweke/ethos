import { useEffect, useRef, useState } from "react";
import { X, CheckCircle, ShieldCheck, GoogleLogo, WarningCircle } from "@phosphor-icons/react";
import { googleAuth, ApiError } from "../utils/api";
import { GOOGLE_CLIENT_ID, loadGoogleIdentityScript, type GoogleCredentialResponse } from "../utils/googleIdentity";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialMode?: "login" | "signup";
  claimHandle?: string;
}

export default function AuthModal({ isOpen, onClose, onSuccess, claimHandle }: AuthModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleCredential = (idToken: string) => {
    setError(null);
    setIsLoading(true);
    googleAuth(idToken, claimHandle)
      .then((res) => {
        setIsLoading(false);
        if (claimHandle && res.profile?.handle !== claimHandle) {
          setError(`@${claimHandle} was just taken by someone else — you're signed in, pick another handle from your dashboard.`);
          onSuccess();
          return;
        }
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
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

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
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white border border-zinc-200/90 w-full max-w-md rounded-sm shadow-2xl overflow-hidden relative group cursor-default max-h-[90vh] overflow-y-auto"
      >

        {/* Blueprint grid pattern overlay */}
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
          className="absolute top-4 right-4 text-zinc-400 hover:text-black hover:bg-zinc-100 p-2.5 rounded-sm cursor-pointer z-30 transition-all pointer-events-auto min-w-[44px] min-h-[44px] flex items-center justify-center"
          title="Close modal"
          aria-label="Close modal"
        >
          <X className="h-5 w-5 text-zinc-600" />
        </button>

        <div className="p-6 sm:p-8 relative z-10 space-y-6 text-center">

          {/* Brand Header */}
          <div className="space-y-2 pt-2">
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
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-sm text-emerald-800 flex items-center justify-center gap-2 animate-in fade-in">
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
                className="w-full flex items-center justify-center gap-3 bg-white border border-zinc-300 hover:border-black hover:bg-slate-50 text-slate-900 font-bold text-xs py-3.5 px-4 rounded-sm transition-all shadow-xs cursor-pointer disabled:opacity-50 min-h-[48px] active:scale-95 group/btn"
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
