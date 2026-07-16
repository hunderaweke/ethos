import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProfileShowcase from "./components/ProfileShowcase";
import Highlights from "./components/Highlights";
import CommunityBanner from "./components/CommunityBanner";
import NetworkShowcase from "./components/NetworkShowcase";
import FeaturedBanner from "./components/FeaturedBanner";
import FeaturesGrid from "./components/FeaturesGrid";
import InteractiveFeatures from "./components/InteractiveFeatures";
import IntegrationCloud from "./components/IntegrationCloud";
import TargetAudience from "./components/TargetAudience";
import OwnershipSection from "./components/OwnershipSection";
import PrivacyCard from "./components/PrivacyCard";
import FAQSection from "./components/FAQSection";
import FooterCTA from "./components/FooterCTA";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans">
      <Navbar />
      <main>
        <Hero />
        <ProfileShowcase />
        <Highlights />
        <CommunityBanner />
        <NetworkShowcase />
        <FeaturedBanner />
        <FeaturesGrid />
        <InteractiveFeatures />
        <IntegrationCloud />
        <TargetAudience />
        <OwnershipSection />
        <PrivacyCard />
        <FAQSection />
        <FooterCTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
