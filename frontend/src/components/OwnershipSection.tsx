import { ShieldCheck, HardDrive, Cpu, FileText, CheckCircle } from "@phosphor-icons/react";

export default function OwnershipSection() {
  const points = [
    { title: "Own Your Intellectual Graph", desc: "Your influences are your personal blueprint. Export your lists and impact notes in JSON/CSV at any time." },
    { title: "Exportable Graph", desc: "Your shelf data and custom reviews are fully portable and free from social networks." },
    { title: "Easy Import", desc: "Import your reading logs or platform follows to start building your shelf in seconds." },
  ];

  return (
    <section className="py-20 lg:py-28 bg-slate-50 border-y border-slate-200/50 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side text content */}
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 border border-zinc-200 px-3.5 py-1 text-xs font-semibold tracking-wider text-zinc-900 uppercase mb-4">
              <ShieldCheck className="h-3.5 w-3.5 text-zinc-600" /> Data Ownership
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 leading-tight mb-6">
              Your mind's blueprint belongs{" "}
              <span className="text-black font-extrabold">
                only to you.
              </span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8">
              No lock-in. Your lists, influence notes, and custom reviews are fully owned and exportable by you at any time.
            </p>

            <div className="flex flex-col gap-4">
              {points.map((point, idx) => (
                <div key={idx} className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-black shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{point.title}</h4>
                    <p className="text-xs text-slate-500 font-semibold mt-0.5">{point.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side visual grid */}
          <div className="relative p-6 sm:p-10 bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-100/50 flex items-center justify-center">
            
            {/* Visual Storage nodes */}
            <div className="w-full max-w-md grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-center gap-3.5">
                <div className="h-10 w-10 rounded-xl bg-zinc-100 border border-zinc-200 text-zinc-900 flex items-center justify-center">
                  <HardDrive className="h-5 w-5" />
                </div>
                <div>
                  <h5 className="font-bold text-slate-800 text-xs">what_shaped_me.json</h5>
                  <p className="text-[10px] text-zinc-500 font-bold">Ready to Export</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-center gap-3.5">
                <div className="h-10 w-10 rounded-xl bg-zinc-100 border border-zinc-200 text-zinc-900 flex items-center justify-center">
                  <Cpu className="h-5 w-5" />
                </div>
                <div>
                  <h5 className="font-bold text-slate-800 text-xs">influences_backup.csv</h5>
                  <p className="text-[10px] text-zinc-500 font-bold">Ready to Export</p>
                </div>
              </div>

              <div className="col-span-2 p-4 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="h-10 w-10 rounded-xl bg-zinc-100 border border-zinc-200 text-zinc-900 flex items-center justify-center">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-800 text-xs">Standard Data Portability</h5>
                    <p className="text-[10px] text-slate-400 font-semibold">Export all details in JSON/CSV</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-zinc-900 bg-zinc-100 border border-zinc-200 px-2 py-0.5 rounded-full">
                  100% Exportable
                </span>
              </div>
            </div>

            {/* Glowing orb decoration */}
            <div className="absolute -right-4 -top-4 h-20 w-20 bg-zinc-300/10 rounded-full blur-xl animate-pulse" />
          </div>

        </div>
      </div>
    </section>
  );
}
