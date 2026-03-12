"use client";

import { ArrowUpRight } from "lucide-react";
import ScrollVelocity from "@/components/ScrollVelocity";
import dynamic from "next/dynamic";

const Ballpit = dynamic(() => import("@/components/Ballpit"), { ssr: false });

export function Footer() {
  return (
    <footer
      className="flex flex-col relative overflow-hidden"
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="w-full relative py-12 md:py-24 overflow-hidden border-b border-white/[0.06]">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <Ballpit count={100} followCursor={true} />
        </div>
        <div className="w-full overflow-hidden select-none pointer-events-none opacity-40 relative z-10">
          <ScrollVelocity
            texts={[
              "NEXT.JS • REACT • TYPESCRIPT • TAILWIND CSS • NODE.JS", 
              "EXPRESS.JS • PYTHON • DJANGO • POSTGRESQL • MONGODB"
            ]}
            className="text-7xl font-bold font-heading uppercase text-foreground/40 whitespace-nowrap"
            velocity={40}
          />
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
              <span className="font-heading font-semibold text-xl tracking-tight text-white">
                CodePhilic
              </span>
            </a>
            <p className="text-[#94A3B8] max-w-xs text-sm leading-relaxed">
              A premium software development agency architecting digital excellence.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-xs tracking-widest uppercase text-white font-heading">
              Company
            </h4>
            <ul className="space-y-3 text-sm text-[#94A3B8]">
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="#work" className="hover:text-white transition-colors">Our Work</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-xs tracking-widest uppercase text-white font-heading">
              Social
            </h4>
            <ul className="space-y-3 text-sm text-[#94A3B8]">
              <li>
                <a href="#" className="hover:text-white transition-colors inline-flex items-center gap-1">
                  Twitter <ArrowUpRight className="size-3" />
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors inline-flex items-center gap-1">
                  LinkedIn <ArrowUpRight className="size-3" />
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors inline-flex items-center gap-1">
                  GitHub <ArrowUpRight className="size-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#94A3B8]/50"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <p>© {new Date().getFullYear()} CodePhilic Corp. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <a href="#" className="hover:text-[#94A3B8] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#94A3B8] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
