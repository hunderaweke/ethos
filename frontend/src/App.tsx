import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import ShareSection from "./components/ShareSection";
import Footer from "./components/Footer";
import HandlePage from "./components/HandlePage";
import ExplorePage from "./components/ExplorePage";
import Dashboard from "./components/Dashboard";
import AuthModal from "./components/AuthModal";
import { getMe, logout as apiLogout } from "./utils/api";
import { ToastProvider } from "./components/ToastContext";

// Logged-out visitors previewing "Mind-Shelf" land on this demo profile.
const DEMO_HANDLE = "technomad23";

function Landing({
  onViewProfile,
  onViewDashboard,
  onViewExplore,
  onOpenAuth,
  onGoHome,
  isLoggedIn,
  onLogout,
}: {
  onViewProfile: () => void;
  onViewDashboard: () => void;
  onViewExplore: () => void;
  onOpenAuth: (mode?: "login" | "signup", claimHandle?: string) => void;
  onGoHome: () => void;
  isLoggedIn: boolean;
  onLogout: () => void;
}) {
  return (
    <>
      <Navbar
        onViewProfile={onViewProfile}
        onViewDashboard={onViewDashboard}
        onViewExplore={onViewExplore}
        onOpenAuth={onOpenAuth}
        isLoggedIn={isLoggedIn}
        onLogout={onLogout}
      />
      <main>
        <Hero
          onViewProfile={onViewProfile}
          onViewDashboard={onViewDashboard}
          onOpenAuth={onOpenAuth}
        />
        <AboutSection />
        <ShareSection onViewProfile={onViewProfile} />
      </main>
      <Footer
        onViewProfile={onViewProfile}
        onViewDashboard={onViewDashboard}
        onViewExplore={onViewExplore}
        onGoHome={onGoHome}
        onOpenAuth={onOpenAuth}
      />
    </>
  );
}

function RequireAuth({
  ready,
  isLoggedIn,
  onNeedAuth,
  children,
}: {
  ready: boolean;
  isLoggedIn: boolean;
  onNeedAuth: () => void;
  children: ReactNode;
}) {
  const navigate = useNavigate();

  useEffect(() => {
    if (ready && !isLoggedIn) {
      onNeedAuth();
      navigate("/", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, isLoggedIn]);

  if (!ready) return null;
  return isLoggedIn ? <>{children}</> : null;
}

function App() {
  const navigate = useNavigate();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("signup");
  const [pendingHandle, setPendingHandle] = useState<string | undefined>(undefined);
  const [authChecked, setAuthChecked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [myHandle, setMyHandle] = useState<string | null>(null);

  useEffect(() => {
    getMe()
      .then((me) => {
        setIsLoggedIn(true);
        setMyHandle(me.profile?.handle ?? null);
      })
      .catch(() => setIsLoggedIn(false))
      .finally(() => setAuthChecked(true));
  }, []);

  const handleShowProfile = () => {
    navigate(`/@${myHandle || DEMO_HANDLE}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleShowDashboard = () => {
    if (!isLoggedIn) {
      handleOpenAuth("login");
      return;
    }
    navigate("/dashboard");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleShowExplore = () => {
    navigate("/explore");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleGoHome = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpenAuth = (mode: "login" | "signup" = "signup", claimHandle?: string) => {
    setAuthMode(mode);
    setPendingHandle(claimHandle);
    setIsAuthOpen(true);
  };

  const handleAuthSuccess = () => {
    setIsLoggedIn(true);
    setPendingHandle(undefined);
    getMe().then((me) => setMyHandle(me.profile?.handle ?? null)).catch(() => {});
    navigate("/dashboard");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogout = () => {
    apiLogout().catch(() => {});
    setIsLoggedIn(false);
    setMyHandle(null);
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <ToastProvider>
      <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans flex flex-col">
        <Routes>
          <Route
            path="/"
            element={
              <Landing
                onViewProfile={handleShowProfile}
                onViewDashboard={handleShowDashboard}
                onViewExplore={handleShowExplore}
                onOpenAuth={handleOpenAuth}
                onGoHome={handleGoHome}
                isLoggedIn={isLoggedIn}
                onLogout={handleLogout}
              />
            }
          />
          <Route
            path="/explore"
            element={
              <ExplorePage
                onViewProfile={handleShowProfile}
                onViewDashboard={handleShowDashboard}
                onOpenAuth={handleOpenAuth}
                onGoHome={handleGoHome}
                isLoggedIn={isLoggedIn}
                onLogout={handleLogout}
              />
            }
          />
          {/* react-router can't match a literal "@" glued directly before a param
              (path="/@:handle" never matches) — route on a bare single segment
              instead; HandlePage strips the "@" itself. */}
          <Route
            path="/:handle"
            element={
              <HandlePage
                onBack={handleGoHome}
                isLoggedIn={isLoggedIn}
                onGoDashboard={handleShowDashboard}
              />
            }
          />
          <Route
            path="/dashboard"
            element={
              <RequireAuth ready={authChecked} isLoggedIn={isLoggedIn} onNeedAuth={() => handleOpenAuth("login")}>
                <Dashboard
                  onViewProfile={handleShowProfile}
                  onGoHome={handleGoHome}
                  onLogout={handleLogout}
                />
              </RequireAuth>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Google Single Sign-On Auth Modal */}
        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          onSuccess={handleAuthSuccess}
          initialMode={authMode}
          claimHandle={pendingHandle}
        />
      </div>
    </ToastProvider>
  );
}

export default App;
