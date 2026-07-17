import { useState } from "react";
import { BookOpen } from "@phosphor-icons/react";
import ProfileHeader from "./ProfileHeader";
import CurationCard from "./CurationCard";
import type { CurationItem } from "./CurationCard";

interface HandlePageProps {
  onBack: () => void;
}

export default function HandlePage({ onBack }: HandlePageProps) {
  const [copied, setCopied] = useState(false);
  const [savedItems, setSavedItems] = useState<Record<string, boolean>>({});

  const handleShare = () => {
    setCopied(true);
    navigator.clipboard.writeText(window.location.href);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleSave = (id: string) => {
    setSavedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const influences: CurationItem[] = [
    {
      id: "book-ddia",
      type: "book",
      title: "Designing Data-Intensive Applications",
      author: "Martin Kleppmann",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400",
      description: "The absolute bible for understanding distributed systems, database architectures, and engineering trade-offs.",
      impact: "This book completely re-wired my brain. It taught me how to think in terms of databases, scale, and trade-offs rather than dogmatic stack choices.",
      tags: ["#Systems", "#Databases", "#Backend"],
      link: "https://dataintensive.net/",
      size: "large", // spans multiple grid slots
    },
    {
      id: "yt-fireship",
      type: "youtube",
      title: "Fireship",
      creator: "Jeff Delaney",
      description: "High-intensity code tutorials and tech industry updates in 100 seconds.",
      impact: "Keeps me aware of new tech stacks and programming trends in a fraction of the time. Best paced dev channel on the web.",
      tags: ["#Coding", "#TechTrends"],
      link: "https://www.youtube.com/@Fireship",
      subscribers: "3.1M",
      size: "medium",
    },
    {
      id: "podcast-huberman",
      type: "podcast",
      title: "Huberman Lab",
      host: "Dr. Andrew Huberman",
      description: "Science-backed protocols and tools for high performance, focus, and health.",
      impact: "His episodes on dopamine scheduling, sleep cycles, and morning sunlight dramatically improved my daily developer focus.",
      tags: ["#Biology", "#Focus", "#Habits"],
      link: "https://www.youtube.com/@hubermanlab",
      episodes: "200+",
      size: "medium",
    },
    {
      id: "essay-boring-tech",
      type: "essay",
      title: "Choose Boring Technology",
      author: "Dan McKinley",
      description: "The foundational essay arguing why companies should use well-understood tech stacks to save innovation tokens.",
      impact: "Saved me from countless unnecessary rewrites and hyped frameworks. I evaluate every new dependency through this lens.",
      tags: ["#Architecture", "#Pragmatism"],
      link: "https://mcfunley.com/choose-boring-technology",
      readTime: "12 min read",
      size: "small",
    },
    {
      id: "x-naval",
      type: "x",
      title: "Naval Ravikant",
      handle: "@naval",
      description: "Silicon Valley investor and philosopher sharing insights on wealth, happiness, and leverage.",
      impact: "His thoughts on building productized leverage and compounding specific knowledge shaped my entire career path.",
      tags: ["#Philosophy", "#Startups", "#Leverage"],
      link: "https://x.com/naval",
      followers: "2.3M",
      size: "medium",
    },
    {
      id: "design-rams",
      type: "design",
      title: "Dieter Rams: Ten Principles",
      author: "Braun Design Lead",
      description: "Ten rules detailing why good design is minimalist, honest, aesthetic, and unobtrusive.",
      impact: "Good design is as little design as possible. This rule drives every user interface and component API I build.",
      tags: ["#UIUX", "#Minimalism", "#DesignSystem"],
      link: "https://www.vitsoe.com/gb/about/dieter-rams",
      size: "medium",
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-24 animate-fade-in">
      {/* Header & Banner Details */}
      <ProfileHeader 
        copied={copied} 
        onShare={handleShare} 
        onBack={onBack} 
      />

      {/* Bento Grid shelf layout */}
      <div className="max-w-6xl mx-auto px-4 mt-10">
        
        <h2 className="text-sm font-black uppercase tracking-wider text-zinc-950 mb-6 flex items-center gap-2">
          <BookOpen className="h-4.5 w-4.5 text-black" />
          The Blueprint of My Mind
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {influences.map((item) => (
            <CurationCard
              key={item.id}
              item={item}
              isSaved={!!savedItems[item.id]}
              onToggleSave={toggleSave}
            />
          ))}
        </div>

      </div>

    </div>
  );
}
