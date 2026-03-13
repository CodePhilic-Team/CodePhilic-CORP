"use client";

import { useRef, useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import { Globe, Smartphone, Cloud, Cpu } from "lucide-react";
import { ParticleCard, GlobalSpotlight } from "@/components/MagicBento";
import ScrollFloat from "@/components/ScrollFloat";
import DotGrid from "@/components/ui/dotgrid";

const services = [
  {
    title: "Web Architecture & Generic Products",
    description:
      "High-performance web applications built with modern frameworks. Scalable, accessible, and ultra-fast digital experiences.",
    icon: Globe,
    className: "md:col-span-2",
  },
  {
    title: "Mobile Ecosystems",
    description:
      "Native-feeling iOS and Android applications. Engaging transitions, offline-first capabilities, and perfect form factors.",
    icon: Smartphone,
    className: "md:col-span-1",
  },
  {
    title: "IoT Solutions",
    description:
      "End-to-end IoT platforms, device integration, and real-time data analytics for smart environments and industries.",
    icon: Cloud,
    className: "md:col-span-1",
  },
  {
    title: "GPS Tracking Systems",
    description:
      "Custom GPS tracker solutions for fleet management, asset tracking, and personal safety with live location and analytics.",
    icon: Cloud,
    className: "md:col-span-2",
  },
  {
    title: "AI-Based Web & App Solutions",
    description:
      "AI-powered websites and mobile apps: chatbots, recommendation engines, and automation for smarter user experiences.",
    icon: Cpu,
    className: "md:col-span-2",
  },
  {
    title: "SaaS & LMS Platforms",
    description:
      "Custom SaaS products and Learning Management Systems (LMS) for education, business, and productivity—scalable, secure, and feature-rich.",
    icon: Cpu,
    className: "md:col-span-1",
  },
 
];

// ─── Services section ─────────────────────────────────────────────────────────

export function Services() {
  const gridRef = useRef<HTMLDivElement>(null);

  const container: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 32 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 18 },
    },
  };

  return (
    <section id="services" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-100 pointer-events-none">
        <DotGrid
          dotSize={12}
          gap={24}
          proximity={150}
          activeColor="#3B82F6"
          baseColor="rgba(148,163,184,0.15)"
        />
      </div>
      <div className="container px-4 md:px-6 max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col gap-4 mb-16 max-w-3xl">
          <h2 className="font-heading tracking-tighter text-4xl md:text-5xl font-bold text-foreground">
            Engineering{" "}
            <span className="text-[#3B82F6]">Excellence</span>
          </h2>
          <p className="text-foreground/60 text-lg sm:text-xl font-sans leading-relaxed">
            We don&apos;t just write code; we architect solutions. Our core disciplines cover the entire modern software stack.
          </p>
        </div>

        <motion.div
          ref={gridRef}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 bento-section"
        >
          <GlobalSpotlight gridRef={gridRef} glowColor="59, 130, 246" />
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                variants={item}
                className={`${service.className} will-change-transform`}
              >
                <ParticleCard 
                  className="h-full rounded-3xl" 
                  glowColor="59, 130, 246"
                  enableTilt={false}
                  enableMagnetism={false}
                  style={{
                    background: "linear-gradient(to bottom right, var(--glass-bg), transparent)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: "1px solid var(--glass-border)",
                  }}
                >
                  <div className="p-8 flex flex-col h-full relative z-10 pointer-events-none">
                    <div
                      className="size-12 rounded-2xl flex items-center justify-center mb-6"
                      style={{
                        border: "1px solid rgba(59,130,246,0.2)",
                        background: "rgba(59,130,246,0.06)",
                      }}
                    >
                      <Icon
                        className="size-5"
                        style={{ color: "#3B82F6", filter: "drop-shadow(0 0 6px rgba(59,130,246,0.5))" }}
                      />
                    </div>
                    <h3 className="font-heading text-xl font-semibold mb-3 text-foreground">
                      {service.title}
                    </h3>
                    <p className="text-foreground/60 leading-relaxed text-sm max-w-md mt-auto">
                      {service.description}
                    </p>
                  </div>
                </ParticleCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
