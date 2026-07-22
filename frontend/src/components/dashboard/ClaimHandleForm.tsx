import { useState } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import { checkHandleAvailability, ApiError } from "../../utils/api";
import { useHandleAvailability } from "../../utils/useHandleAvailability";
import HandleAvailabilityBadge, { handleStatusInputClass } from "../HandleAvailabilityBadge";

interface ClaimHandleFormProps {
  onClaimed: (handle: string, displayName: string) => Promise<void>;
  onGoHome: () => void;
}

export default function ClaimHandleForm({ onClaimed, onGoHome }: ClaimHandleFormProps) {
  const [handle, setHandle] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const availability = useHandleAvailability(handle);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!handle.trim()) return;
    setSubmitting(true);
    setError(null);
    try {
      // Re-check right before submit — the live indicator above can go stale
      // (race with another user claiming it, or debounce still catching up).
      const { available } = await checkHandleAvailability(handle);
      if (!available) {
        setError("That handle is already taken.");
        return;
      }
      await onClaimed(handle, displayName || handle);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't claim that handle — try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white border border-zinc-200 rounded-sm shadow-sm p-8 space-y-6">
        <div>
          <h1 className="text-xl font-extrabold text-zinc-950 tracking-tight">Claim your mind-shelf</h1>
          <p className="text-xs text-zinc-500 font-medium mt-1">
            Pick a handle before you start curating. This becomes your public shelf URL.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-zinc-700 mb-1">Handle</label>
            <div className="flex">
              <span className="bg-zinc-100 border border-r-0 border-zinc-200 rounded-l-sm px-3 py-2 text-xs font-bold text-zinc-500">
                blueprint.id/@
              </span>
              <input
                type="text"
                required
                value={handle}
                onChange={(e) => setHandle(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))}
                className={`w-full bg-zinc-50 border rounded-r-sm px-3 py-2 text-xs font-bold text-zinc-900 outline-none transition-colors ${handleStatusInputClass(availability)}`}
                placeholder="yourhandle"
              />
            </div>
            <div className="mt-1.5">
              <HandleAvailabilityBadge status={availability} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 mb-1">Display Name</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full bg-zinc-50 border border-zinc-200 focus:border-black rounded-sm px-3 py-2 text-xs font-semibold text-zinc-900 outline-none"
              placeholder="Your name"
            />
          </div>

          {error && <p className="text-[11px] font-bold text-rose-600">{error}</p>}

          <button
            type="submit"
            disabled={submitting || availability === "taken" || availability === "invalid" || availability === "checking"}
            className="w-full inline-flex items-center justify-center gap-1.5 rounded-sm bg-black px-5 py-2.5 text-xs font-bold text-white hover:bg-zinc-900 transition-all cursor-pointer shadow-2xs disabled:opacity-50"
          >
            {submitting ? "Claiming..." : "Claim Handle"}
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </form>

        <button onClick={onGoHome} className="text-[11px] font-bold text-zinc-500 hover:text-black underline cursor-pointer">
          Back to Home
        </button>
      </div>
    </div>
  );
}
