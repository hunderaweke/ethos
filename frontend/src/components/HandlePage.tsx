import { useState } from "react";
import {
  ArrowLeft, ShareNetwork, Check, BookOpen,
  Microphone, FileText, Palette, ArrowSquareOut, ShieldCheck, Heart
} from "@phosphor-icons/react";
import { getSocialMediaColor } from "../utils/color";

interface HandlePageProps {
  onBack: () => void;
}

const YoutubeIcon = () => (
  <svg className="h-3 w-3 inline mr-1 -mt-0.5 fill-current" viewBox="0 0 24 24">
    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.51a3.003 3.003 0 0 0-2.11 2.108C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.108c1.871.51 9.388.51 9.388.51s7.517 0 9.388-.51a3.003 3.003 0 0 0 2.11-2.108c.502-1.87 0.502-5.837 0.502-5.837s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const XIcon = () => (
  <svg className="h-3 w-3 inline mr-1 -mt-0.5 fill-current" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

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

  const influences = [
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
      {/* Back navigation header */}
      <div className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200/60 px-4 py-3.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button 
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to blueprint.id
          </button>
          
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-zinc-900 animate-pulse" />
            <span className="text-xs font-semibold text-slate-500">Live mind-shelf</span>
          </div>
        </div>
      </div>

      {/* Hero Profile Header */}
      <div className="max-w-6xl mx-auto px-4 mt-8">
        
        {/* Banner Card */}
        <div className="relative h-48 sm:h-64 rounded-3xl overflow-hidden shadow-sm border border-slate-200">
          <img 
            src="/curation_showcase.jpg" 
            alt="Workspace Banner" 
            className="w-full h-full object-cover blur-[1px] opacity-90"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Profile Details Container */}
        <div className="relative px-6 sm:px-12 -mt-16 sm:-mt-20 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200/80">
          
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6 text-center md:text-left">
            <img 
              src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200"
              alt="Alex Rivera"
              className="h-32 w-32 sm:h-36 sm:w-36 rounded-3xl object-cover border-4 border-white shadow-lg ring-1 ring-slate-200/50 bg-white grayscale hover:grayscale-0 transition-[filter] duration-300"
            />
            
            <div className="mb-2">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950">Alex Rivera</h1>
                <span className="inline-flex items-center gap-1 rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-bold text-zinc-900 border border-zinc-200 shadow-xs">
                  <ShieldCheck className="h-3.5 w-3.5" /> Verified Curator
                </span>
              </div>
              <p className="text-sm font-semibold text-black mt-1">blueprint.id/@technomad23</p>
              <p className="text-sm text-slate-500 font-medium mt-3 max-w-xl">
                Building tools for builders. Shaped by systems engineering, design history, and philosophical essays.
              </p>
              <div className="flex gap-4 items-center justify-center md:justify-start mt-4 text-xs font-bold text-slate-400">
                <span><strong className="text-slate-900">14</strong> Influences</span>
                <span className="h-1 w-1 bg-slate-300 rounded-full" />
                <span><strong className="text-slate-900">2.4k</strong> Followers</span>
              </div>
            </div>
          </div>

          {/* Social share actions */}
          <div className="flex gap-3 justify-center md:mb-2">
            <button 
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 px-4 py-2.5 text-sm font-bold text-slate-700 active:scale-95 transition-all shadow-xs cursor-pointer"
            >
              {copied ? <Check className="h-4 w-4 text-slate-900" /> : <ShareNetwork className="h-4 w-4" />}
              {copied ? "Copied Link" : "Share Shelf"}
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-2xl bg-black hover:bg-zinc-800 text-white px-5 py-2.5 text-sm font-bold active:scale-95 transition-all shadow-md cursor-pointer">
              Follow Shelf
            </button>
          </div>

        </div>

      </div>

      {/* Bento Grid layout */}
      <div className="max-w-6xl mx-auto px-4 mt-10">
        
        <h2 className="text-xl font-black text-slate-950 mb-6 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-black" />
          The Blueprint of My Mind
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {influences.map((item) => {
            const isSaved = !!savedItems[item.id];
            
            // Layout specific styling classes based on bento size
            const sizeClass = item.size === "large" 
              ? "md:col-span-2 lg:row-span-2 flex flex-col md:flex-row" 
              : "";
              
            return (
              <div 
                key={item.id}
                className={`bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between group ${sizeClass}`}
              >
                
                {/* Large book cover layout details */}
                {item.type === "book" && item.size === "large" ? (
                  <>
                    <div className="md:w-1/2 relative min-h-[300px] md:min-h-full">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/60" />
                      <div className="absolute inset-x-0 bottom-0 p-6 text-white md:hidden">
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 border border-white/20 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                          <BookOpen className="h-3 w-3" /> Book
                        </span>
                        <h3 className="text-xl font-extrabold mt-2">{item.title}</h3>
                        <p className="text-xs text-slate-300 font-semibold">{item.author}</p>
                      </div>
                    </div>
                    
                    <div className="p-6 md:w-1/2 flex flex-col justify-between">
                      <div>
                        <div className="hidden md:flex justify-between items-center mb-4">
                          <span
                            className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border inline-flex items-center gap-1"
                            style={{
                              color: getSocialMediaColor("book", 1),
                              backgroundColor: getSocialMediaColor("book", 0.1),
                              borderColor: getSocialMediaColor("book", 0.15)
                            }}
                          >
                            <BookOpen className="h-3 w-3" /> Book
                          </span>
                          <button 
                            onClick={() => toggleSave(item.id)}
                            className="p-1.5 rounded-full hover:bg-slate-100 transition-colors"
                          >
                            <Heart className={`h-4.5 w-4.5 ${isSaved ? "fill-black text-black" : "text-slate-400"}`} />
                          </button>
                        </div>
                        
                        <div className="hidden md:block">
                          <h3 className="text-lg font-black text-slate-900">{item.title}</h3>
                          <p className="text-xs text-slate-500 font-bold">{item.author}</p>
                        </div>

                        <div className="mt-4">
                          <h5 className="text-xs font-black uppercase text-slate-400 tracking-wider">Description</h5>
                          <p className="text-xs text-slate-600 font-medium leading-relaxed mt-1">{item.description}</p>
                        </div>

                        <div className="mt-4">
                          <h5 className="text-xs font-black uppercase text-black tracking-wider">How it shaped me</h5>
                          <p className="text-xs text-slate-700 font-semibold leading-relaxed mt-1 bg-slate-50 p-3 rounded-xl border border-slate-200/50 italic">
                            "{item.impact}"
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                        <div className="flex gap-1.5 flex-wrap">
                          {item.tags.map(tag => (
                            <span key={tag} className="text-[10px] font-bold text-slate-400">{tag}</span>
                          ))}
                        </div>
                        <a 
                          href={item.link} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="text-xs font-bold text-black flex items-center gap-1 hover:underline"
                        >
                          Source <ArrowSquareOut className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  </>
                ) : (
                  // General Card Layout (For Medium/Small items)
                  <div className="p-6 h-full flex flex-col justify-between gap-6">
                    <div>
                      {/* Top Header */}
                      <div className="flex justify-between items-center mb-4">
                        <span
                          className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border inline-flex items-center"
                          style={{
                            color: getSocialMediaColor(item.type, 1),
                            backgroundColor: getSocialMediaColor(item.type, 0.1),
                            borderColor: getSocialMediaColor(item.type, 0.15)
                          }}
                        >
                          {item.type === "youtube" && <YoutubeIcon />}
                          {item.type === "podcast" && <Microphone className="h-3 w-3 inline mr-1 -mt-0.5" />}
                          {item.type === "x" && <XIcon />}
                          {item.type === "essay" && <FileText className="h-3 w-3 inline mr-1 -mt-0.5" />}
                          {item.type === "design" && <Palette className="h-3 w-3 inline mr-1 -mt-0.5" />}
                          {item.type}
                        </span>
                        
                        <button 
                          onClick={() => toggleSave(item.id)}
                          className="p-1.5 rounded-full hover:bg-slate-100 transition-colors"
                        >
                          <Heart className={`h-4.5 w-4.5 ${isSaved ? "fill-black text-black" : "text-slate-400"}`} />
                        </button>
                      </div>

                      {/* Title & Metadata */}
                      <h3 className="text-base font-extrabold text-slate-900">{item.title}</h3>
                      {item.creator && <p className="text-[10px] text-slate-400 font-bold">by {item.creator} • {item.subscribers} Subs</p>}
                      {item.host && <p className="text-[10px] text-slate-400 font-bold">hosted by {item.host} • {item.episodes} Ep</p>}
                      {item.author && <p className="text-[10px] text-slate-400 font-bold">by {item.author} • {item.readTime}</p>}
                      {item.handle && <p className="text-[10px] text-slate-400 font-bold">{item.handle} • {item.followers} Followers</p>}

                      {/* Brief description */}
                      <p className="text-xs text-slate-500 mt-3 font-medium leading-relaxed">
                        {item.description}
                      </p>

                      {/* Impact section */}
                      <div className="mt-4 bg-slate-50 border border-slate-200/50 p-3 rounded-xl">
                        <h5 className="text-[10px] font-black uppercase text-black tracking-wider">How it shaped me</h5>
                        <p className="text-xs text-slate-700 font-semibold leading-relaxed mt-1 italic">
                          "{item.impact}"
                        </p>
                      </div>
                    </div>

                    {/* Footer Tags & Link */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex gap-1.5 flex-wrap">
                        {item.tags.map(tag => (
                          <span key={tag} className="text-[10px] font-bold text-slate-400">{tag}</span>
                        ))}
                      </div>
                      <a 
                        href={item.link} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-xs font-bold text-black flex items-center gap-1 hover:underline"
                      >
                        Visit <ArrowSquareOut className="h-3 w-3" />
                      </a>
                    </div>

                  </div>
                )}

              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
}
