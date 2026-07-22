import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle, WarningCircle, Info, X } from "@phosphor-icons/react";

export type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = "success") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast Render Container */}
      <div
        className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full px-4 sm:px-0 pointer-events-none"
        aria-live="polite"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-sm shadow-lg border text-sm font-semibold transition-all duration-300 transform translate-y-0 animate-in fade-in slide-in-from-bottom-2 ${
              toast.type === "success"
                ? "bg-zinc-900 text-white border-zinc-800"
                : toast.type === "error"
                ? "bg-rose-900 text-white border-rose-800"
                : "bg-zinc-800 text-zinc-100 border-zinc-700"
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              {toast.type === "success" && <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" weight="fill" />}
              {toast.type === "error" && <WarningCircle className="w-4 h-4 text-rose-400 shrink-0" weight="fill" />}
              {toast.type === "info" && <Info className="w-4 h-4 text-sky-400 shrink-0" weight="fill" />}
              <span className="truncate">{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-zinc-400 hover:text-white transition-colors p-1 rounded-sm shrink-0 cursor-pointer"
              aria-label="Close notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
