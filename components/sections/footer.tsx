"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import DecryptedText from "@/components/DecryptedText";
import dynamic from "next/dynamic";

const Ballpit = dynamic(() => import("@/components/Ballpit"), { ssr: false });

const ROW1 = [
  { name: "NEXT.JS",      logo: "/icons8-next.js-48.png" },
  { name: "REACT",        logo: null },
  { name: "TYPESCRIPT",   logo: "/icons8-typescript-48.png" },
  { name: "TAILWIND CSS", logo: null },
  { name: "NODE.JS",      logo: "/node.png" },
];

const ROW2 = [
  { name: "EXPRESS.JS",  logo: "/icons8-express-js-50.png" },
  { name: "PYTHON",      logo: null },
  { name: "DJANGO",      logo: null },
  { name: "POSTGRESQL",  logo: "/icons8-postgresql-50.png" },
  { name: "MONGODB",     logo: "/icons8-mongodb-24.png" },
];

function MarqueeRow({ items, reverse = false }: { items: { name: string; logo: string | null }[]; reverse?: boolean }) {
  const doubled = [...items, ...items, ...items, ...items];
  return (
    <div className="w-full overflow-hidden">
      <div className={`flex gap-12 whitespace-nowrap ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
        style={{ width: "max-content" }}>
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3 text-5xl font-bold font-heading uppercase text-slate-400 dark:text-white/30">
            {item.logo && (
              <Image
                src={item.logo}
                alt={item.name}
                width={40}
                height={40}
                className="opacity-60 dark:opacity-50 object-contain"
              />
            )}
            {item.name}
            <span className="text-slate-300 dark:text-white/20 ml-4">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer
      className="flex flex-col relative overflow-hidden bg-slate-100 dark:bg-[#09090b] border-t border-slate-200 dark:border-white/[0.08]"
    >
      <div className="w-full relative py-12 md:py-24 overflow-hidden border-b border-slate-200 dark:border-white/[0.08]">
        <div className="absolute inset-0 z-0 opacity-10 dark:opacity-20 pointer-events-none">
          {/* <Ballpit count={100} followCursor={true} /> */}
        </div>
        <div className="relative z-10 flex justify-center mb-6 md:mb-10">
          <DecryptedText
            text="Our Tech Stacks"
            animateOn="view"
            sequential={true}
            speed={90}
            revealDirection="start"
            className="text-3xl md:text-7xl font-bold font-heading text-slate-900 dark:text-white tracking-tight"
            encryptedClassName="text-3xl md:text-7xl font-bold font-heading text-blue-500/50 dark:text-blue-400/60 tracking-tight"
          />
        </div>
        <div className="w-full overflow-hidden select-none pointer-events-none relative z-10 flex flex-col gap-6">
          <MarqueeRow items={ROW1} />
          <MarqueeRow items={ROW2} reverse />
        </div>
      </div>
      <div className="container max-w-7xl mx-auto px-4 md:px-6 py-12 flex flex-col gap-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-1 sm:col-span-2">
            <a href="/" className="flex items-center gap-2 mb-4">
              <div
                className="size-8 rounded-lg flex items-center justify-center font-bold text-xl leading-none text-white"
                style={{ background: "#3B82F6", filter: "drop-shadow(0 0 8px rgba(59,130,246,0.5))" }}
              >
                C
              </div>
              <span className="font-heading font-semibold text-xl tracking-tight text-slate-900 dark:text-white">
                CodePhilic
              </span>
            </a>
            <p className="text-slate-500 dark:text-[#94A3B8] max-w-xs text-sm leading-relaxed">
              A premium software development agency architecting digital excellence.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-xs tracking-widest uppercase text-slate-900 dark:text-white font-heading">
              Company
            </h4>
            <ul className="space-y-3 text-sm text-slate-500 dark:text-[#94A3B8]">
              <li><a href="#about" className="hover:text-slate-900 dark:hover:text-white transition-colors">About Us</a></li>
              <li><a href="#services" className="hover:text-slate-900 dark:hover:text-white transition-colors">Services</a></li>
              <li><a href="#work" className="hover:text-slate-900 dark:hover:text-white transition-colors">Our Work</a></li>
              <li><a href="#contact" className="hover:text-slate-900 dark:hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-xs tracking-widest uppercase text-slate-900 dark:text-white font-heading">
              Social
            </h4>
            <ul className="space-y-3 text-sm text-slate-500 dark:text-[#94A3B8]">
              <li>
                <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors inline-flex items-center gap-1">
                  Twitter <ArrowUpRight className="size-3" />
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors inline-flex items-center gap-1">
                  LinkedIn <ArrowUpRight className="size-3" />
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors inline-flex items-center gap-1">
                  GitHub <ArrowUpRight className="size-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 dark:text-[#94A3B8]/50 border-t border-slate-200 dark:border-white/[0.08]"
        >
          <p>© {new Date().getFullYear()} CodePhilic Corp. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <a href="#" className="hover:text-slate-600 dark:hover:text-[#94A3B8] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-600 dark:hover:text-[#94A3B8] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

