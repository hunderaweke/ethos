import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "What is Ethos?",
      a: "Ethos is a curation directory that lets you share and discover recommended creators, channels, and accounts you follow across YouTube, TikTok, GitHub, X, Telegram, and other social platforms.",
    },
    {
      q: "How does the handle claim work?",
      a: "Simply search for an available name in the claim box at the top or bottom of this page. Once claimed, your unique @handle (e.g. ethos.id/@technomad23) becomes your public recommendation profile.",
    },
    {
      q: "Is Ethos free to use?",
      a: "Yes! Creating your profile, claiming your handle, curating follows, writing custom reviews, and tagging niches is 100% free and always will be.",
    },
    {
      q: "How is my curation data stored?",
      a: "Your recommendations are saved under your personal profile config. You own your lists and can download them at any time in standard JSON or CSV formats.",
    },
    {
      q: "Can I connect custom domains?",
      a: "Absolutely. You can map your custom domain (e.g. recommend.yourname.com) directly to your curation shelf in the settings dashboard at no cost.",
    },
    {
      q: "How do I import existing follows?",
      a: "We support simple integrations to import follow logs from X (Twitter), YouTube subscriptions, or GitHub star history, letting you launch your curation list in seconds.",
    },
  ];

  const handleToggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-slate-50 border-t border-slate-200/50">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 border border-indigo-100 px-3.5 py-1 text-xs font-semibold tracking-wider text-brand-indigo uppercase mb-4">
            <HelpCircle className="h-3.5 w-3.5 text-indigo-500" /> FAQ
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 font-medium">
            Everything you need to know about setting up your Ethos curation directory.
          </p>
        </div>

        {/* 2-Column Accordion Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          
          {/* Column 1: Indices 0, 1, 2 */}
          <div className="flex flex-col gap-4">
            {faqs.slice(0, 3).map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all duration-200 shadow-xs"
                >
                  <button
                    onClick={() => handleToggle(idx)}
                    className="w-full p-5 text-left flex justify-between items-center gap-4 font-bold text-sm sm:text-base text-slate-900 hover:bg-slate-50/50"
                  >
                    <span>{faq.q}</span>
                    <span className="shrink-0 p-1 rounded-md bg-slate-50 text-slate-500">
                      {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="p-5 pt-0 border-t border-slate-100 text-xs sm:text-sm text-slate-500 leading-relaxed font-medium animate-fade-in">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Column 2: Indices 3, 4, 5 */}
          <div className="flex flex-col gap-4">
            {faqs.slice(3, 6).map((faq, idx) => {
              const realIdx = idx + 3;
              const isOpen = openIndex === realIdx;
              return (
                <div
                  key={realIdx}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all duration-200 shadow-xs"
                >
                  <button
                    onClick={() => handleToggle(realIdx)}
                    className="w-full p-5 text-left flex justify-between items-center gap-4 font-bold text-sm sm:text-base text-slate-900 hover:bg-slate-50/50"
                  >
                    <span>{faq.q}</span>
                    <span className="shrink-0 p-1 rounded-md bg-slate-50 text-slate-500">
                      {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="p-5 pt-0 border-t border-slate-100 text-xs sm:text-sm text-slate-500 leading-relaxed font-medium animate-fade-in">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
