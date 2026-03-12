"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: "50+", label: "Projects Delivered", description: "Across web, mobile and cloud" },
  { value: "30+", label: "Happy Clients", description: "From startups to enterprises" },
  { value: "3+", label: "Years of Excellence", description: "Crafting digital products" },
  { value: "99%", label: "Client Satisfaction", description: "We don't ship until it's right" },
];

const highlights = [
  {
    title: "Who We Are",
    body: "CodePhilic is a premium software development agency built by engineers who care deeply about craft. We architect performant, scalable, and beautiful digital products for modern businesses.",
  },
  {
    title: "What We Do",
    body: "From zero-to-one MVPs to full-scale enterprise platforms — we handle end-to-end product engineering including architecture, design systems, APIs, and cloud infrastructure.",
  },
  {
    title: "Why Us",
    body: "We treat every project as our own. Transparent timelines, clean code, and a relentless focus on quality set us apart from the rest. Your product is our obsession.",
  },
];

export function Overview() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden">
      {/* Subtle grid lines bg */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025] dark:opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="container px-4 md:px-6 max-w-7xl mx-auto relative z-10" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-4 mb-20 max-w-3xl"
        >
          <span className="text-[#3B82F6] text-sm font-semibold uppercase tracking-widest font-heading">
            Overview
          </span>
          <h2 className="font-heading tracking-tighter text-4xl md:text-5xl font-bold text-foreground">
            Built different,{" "}
            <span className="text-[#3B82F6]">ship better</span>
          </h2>
          <p className="text-foreground/60 text-lg sm:text-xl font-sans leading-relaxed">
            A small, elite team with an enormous portfolio of shipped products. We combine deep technical expertise with product thinking to build software that lasts.
          </p>
        </motion.div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl p-6 flex flex-col gap-1"
              style={{
                background: "var(--glass-bg)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid var(--glass-border)",
              }}
            >
              <span className="text-4xl font-bold font-heading text-[#3B82F6] tracking-tight">
                {stat.value}
              </span>
              <span className="text-sm font-semibold text-foreground font-heading">
                {stat.label}
              </span>
              <span className="text-xs text-foreground/50 font-sans">
                {stat.description}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Highlights grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlights.map((h, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl p-8 flex flex-col gap-4 group"
              style={{
                background: "var(--glass-bg)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid var(--glass-border)",
              }}
            >
              <div
                className="size-2 rounded-full"
                style={{ background: "#3B82F6", boxShadow: "0 0 8px rgba(59,130,246,0.6)" }}
              />
              <h3 className="text-lg font-bold font-heading text-foreground">{h.title}</h3>
              <p className="text-foreground/60 text-sm leading-relaxed font-sans">{h.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
