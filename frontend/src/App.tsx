import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CommunityBanner from "./components/CommunityBanner";
import FeaturesGrid from "./components/FeaturesGrid";
import AboutSection from "./components/AboutSection";
import Footer from "./components/Footer";
import HandlePage from "./components/HandlePage";

function App() {
  const [viewProfile, setViewProfile] = useState<string | null>(null);

  const handleShowProfile = () => {
    setViewProfile("@technomad23");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (viewProfile) {
    return <HandlePage onBack={() => setViewProfile(null)} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans">
      <Navbar onViewProfile={handleShowProfile} />
      <main>
        <Hero onViewProfile={handleShowProfile} />
        <FeaturesGrid onViewProfile={handleShowProfile} />
        <CommunityBanner />
        <AboutSection />
      </main>
      <Footer onViewProfile={handleShowProfile} />
    </div>
  );
}

export default App;
