import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import ShareSection from "./components/ShareSection";
import Footer from "./components/Footer";
import HandlePage from "./components/HandlePage";
import Dashboard from "./components/Dashboard";
import AuthModal from "./components/AuthModal";

function App() {
  const [currentView, setCurrentView] = useState<"landing" | "profile" | "dashboard">("landing");
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("signup");

  const handleShowProfile = () => {
    setCurrentView("profile");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleShowDashboard = () => {
    setCurrentView("dashboard");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleGoHome = () => {
    setCurrentView("landing");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpenAuth = (mode: "login" | "signup" = "signup") => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const handleAuthSuccess = () => {
    setCurrentView("dashboard");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans">
      
      {/* View Router */}
      {currentView === "profile" ? (
        <HandlePage onBack={handleGoHome} onViewDashboard={handleShowDashboard} onOpenAuth={handleOpenAuth} />
      ) : currentView === "dashboard" ? (
        <Dashboard onViewProfile={handleShowProfile} onGoHome={handleGoHome} />
      ) : (
        <>
          <Navbar 
            onViewProfile={handleShowProfile} 
            onViewDashboard={handleShowDashboard}
            onOpenAuth={handleOpenAuth} 
          />
          <main>
            <Hero 
              onViewProfile={handleShowProfile} 
              onViewDashboard={handleShowDashboard}
              onOpenAuth={handleOpenAuth} 
            />
            <AboutSection />
            <ShareSection onViewProfile={handleShowProfile} />
          </main>
          <Footer 
            onViewProfile={handleShowProfile} 
            onViewDashboard={handleShowDashboard} 
            onGoHome={handleGoHome}
            onOpenAuth={handleOpenAuth}
          />
        </>
      )}

      {/* Google Single Sign-On Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={handleAuthSuccess}
        initialMode={authMode}
      />

    </div>
  );
}

export default App;
