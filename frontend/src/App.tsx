import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import ShareSection from "./components/ShareSection";
import Footer from "./components/Footer";
import HandlePage from "./components/HandlePage";
import Dashboard from "./components/Dashboard";

function App() {
  const [currentView, setCurrentView] = useState<"landing" | "profile" | "dashboard">("landing");

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

  if (currentView === "profile") {
    return <HandlePage onBack={handleGoHome} onViewDashboard={handleShowDashboard} />;
  }

  if (currentView === "dashboard") {
    return <Dashboard onViewProfile={handleShowProfile} onGoHome={handleGoHome} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans">
      <Navbar onViewProfile={handleShowProfile} onViewDashboard={handleShowDashboard} />
      <main>
        <Hero onViewProfile={handleShowProfile} onViewDashboard={handleShowDashboard} />
        <AboutSection />
        <ShareSection onViewProfile={handleShowProfile} />
      </main>
      <Footer onViewProfile={handleShowProfile} onViewDashboard={handleShowDashboard} onGoHome={handleGoHome} />
    </div>
  );
}

export default App;
