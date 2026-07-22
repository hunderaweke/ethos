import { CheckCircle, XCircle, WarningCircle } from "@phosphor-icons/react";
import type { HandleAvailabilityStatus } from "../utils/useHandleAvailability";

// Shared so the input border/background can echo the same status the badge
// shows — one glance at the field itself, not just a small line of text below it.
export function handleStatusInputClass(status: HandleAvailabilityStatus): string {
  switch (status) {
    case "available":
      return "border-emerald-400 focus:border-emerald-500 bg-emerald-50/50";
    case "taken":
      return "border-rose-400 focus:border-rose-500 bg-rose-50/50";
    case "invalid":
      return "border-amber-400 focus:border-amber-500 bg-amber-50/50";
    case "checking":
      return "border-zinc-300 focus:border-zinc-400";
    default:
      return "border-zinc-200 focus:border-black";
  }
}

// Border-only variant for wrappers that already own their own background
// (e.g. Hero's pill-shaped form), so it doesn't fight an existing bg-* class.
export function handleStatusBorderClass(status: HandleAvailabilityStatus): string {
  switch (status) {
    case "available":
      return "border-emerald-400 focus-within:border-emerald-500 focus-within:ring-emerald-900/10";
    case "taken":
      return "border-rose-400 focus-within:border-rose-500 focus-within:ring-rose-900/10";
    case "invalid":
      return "border-amber-400 focus-within:border-amber-500 focus-within:ring-amber-900/10";
    case "checking":
      return "border-zinc-300";
    default:
      return "border-zinc-300 focus-within:border-black";
  }
}

const STATUS_STYLE: Record<Exclude<HandleAvailabilityStatus, "idle">, { bg: string; text: string; border: string }> = {
  checking: { bg: "bg-zinc-100", text: "text-zinc-500", border: "border-zinc-200" },
  available: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  taken: { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200" },
  invalid: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  error: { bg: "bg-zinc-100", text: "text-zinc-500", border: "border-zinc-200" },
};

export default function HandleAvailabilityBadge({ status }: { status: HandleAvailabilityStatus }) {
  if (status === "idle") return null;

  const { bg, text, border } = STATUS_STYLE[status];
  const content = (() => {
    switch (status) {
      case "checking":
        return (
          <>
            <span className="h-3 w-3 border-2 border-zinc-300 border-t-zinc-600 rounded-full animate-spin" />
            Checking availability...
          </>
        );
      case "available":
        return (
          <>
            <CheckCircle className="h-3.5 w-3.5" weight="fill" />
            Available — this handle is yours to claim
          </>
        );
      case "taken":
        return (
          <>
            <XCircle className="h-3.5 w-3.5" weight="fill" />
            Already taken — try another
          </>
        );
      case "invalid":
        return (
          <>
            <WarningCircle className="h-3.5 w-3.5" weight="fill" />
            3–30 characters: a–z, 0–9, underscore only
          </>
        );
      case "error":
        return (
          <>
            <WarningCircle className="h-3.5 w-3.5" />
            Couldn't check right now
          </>
        );
    }
  })();

  return (
    <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-sm border ${bg} ${text} ${border}`}>
      {content}
    </span>
  );
}
