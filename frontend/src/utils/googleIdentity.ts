export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

interface GoogleCredentialResponse {
  credential: string;
}

interface GoogleAccountsId {
  initialize: (config: { client_id: string; callback: (res: GoogleCredentialResponse) => void }) => void;
  renderButton: (
    parent: HTMLElement,
    options: { theme?: string; size?: string; width?: number; text?: string; shape?: string }
  ) => void;
}

declare global {
  interface Window {
    google?: { accounts: { id: GoogleAccountsId } };
  }
}

let scriptPromise: Promise<void> | null = null;

export function loadGoogleIdentityScript(): Promise<void> {
  if (window.google?.accounts?.id) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Google Identity Services"));
    document.head.appendChild(script);
  });
  return scriptPromise;
}

export type { GoogleCredentialResponse };
