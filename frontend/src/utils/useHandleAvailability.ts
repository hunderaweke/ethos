import { useEffect, useState } from "react";
import { checkHandleAvailability } from "./api";

export type HandleAvailabilityStatus = "idle" | "invalid" | "checking" | "available" | "taken" | "error";

const HANDLE_PATTERN = /^[a-z0-9_]{3,30}$/;

/**
 * Live debounced handle-availability check, shared by the landing claim form,
 * dashboard onboarding, and settings handle field. `currentHandle` excludes a
 * user's own existing handle from being reported as "taken".
 */
export function useHandleAvailability(handle: string, currentHandle?: string): HandleAvailabilityStatus {
  const [status, setStatus] = useState<HandleAvailabilityStatus>("idle");

  useEffect(() => {
    const normalized = handle.trim().toLowerCase();

    if (!normalized) {
      setStatus("idle");
      return;
    }
    if (!HANDLE_PATTERN.test(normalized)) {
      setStatus("invalid");
      return;
    }
    if (currentHandle && normalized === currentHandle.replace(/^@/, "").toLowerCase()) {
      setStatus("idle");
      return;
    }

    setStatus("checking");
    const controller = new AbortController();
    const timeout = setTimeout(() => {
      checkHandleAvailability(normalized)
        .then(({ available }) => {
          if (!controller.signal.aborted) setStatus(available ? "available" : "taken");
        })
        .catch(() => {
          if (!controller.signal.aborted) setStatus("error");
        });
    }, 400);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [handle, currentHandle]);

  return status;
}
