"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

const clients = [
  {
    name: "NovaPay",
    industry: "FinTech",
    initials: "NP",
    accent: "#3B82F6",
    description: "Digital payments infrastructure",
  },
  {
    name: "Orbita",
    industry: "SaaS",
    initials: "OR",
    accent: "#8B5CF6",
    description: "Satellite data analytics platform",
  },
  {
    name: "Flox",
    industry: "Logistics",
    initials: "FL",
    accent: "#10B981",
    description: "Real-time fleet management",
  },
  {
    name: "CloudForge",
    industry: "DevOps",
    initials: "CF",
    accent: "#F59E0B",
    description: "CI/CD pipeline automation",
  },
  {
    name: "MedAxis",
    industry: "HealthTech",
    initials: "MA",
    accent: "#F43F5E",
    description: "Clinical workflow software",
  },
  {
    name: "Stratum",
    industry: "EdTech",
    initials: "ST",
    accent: "#06B6D4",
    description: "Adaptive learning platform",
  },
  {
    name: "Vortex",
    industry: "E-Commerce",
    initials: "VX",
    accent: "#EC4899",
    description: "Headless commerce engine",
  },
  {
    name: "Ironclad",
    industry: "LegalTech",
    initials: "IC",
    accent: "#6366F1",
    description: "Contract lifecycle management",
  },
];

const testimonials = [
  {
    quote:
      "CodePhilic delivered a production-ready platform in half the time we expected. The code quality blew our engineering team away.",
    author: "Arjun Mehta",
    role: "CTO, NovaPay",
    accent: "#3B82F6",
    initials: "AM",
  },
  {
    quote:
      "They didn't just build features — they challenged our assumptions and made the product significantly better. True engineering partners.",
    author: "Sofia Laurent",
    role: "CEO, Orbita",
    accent: "#8B5CF6",
    initials: "SL",
  },
  {
    quote:
      "From API design to pixel-perfect UI, every layer was handled with precision. We've shipped faster ever since.",
    author: "Marcus Cole",
    role: "VP Engineering, Flox",
    accent: "#10B981",
    initials: "MC",
  },
];

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

export function Clients() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const testimonialsRef = useRef<HTMLDivElement>(null);
  const testimonialsInView = useInView(testimonialsRef, { once: true, margin: "-80px" });

  return (
    <section id="clients" className="py-24 md:py-36 relative overflow-hidden">
      {/* Animated floating orb background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Blue orb — top-left drift */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 640,
            height: 640,
            top: "-12%",
            left: "-8%",
            background: "radial-gradient(ellipse, rgba(59,130,246,0.28) 0%, rgba(59,130,246,0.06) 55%, transparent 75%)",
            filter: "blur(48px)",
          }}
          animate={{ x: ["-2%", "7%", "-2%"], y: ["0%", "6%", "0%"] }}
          transition={{ duration: 22, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        />
        {/* Purple orb — center-right drift */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 520,
            height: 520,
            top: "25%",
            right: "-10%",
            background: "radial-gradient(ellipse, rgba(139,92,246,0.24) 0%, rgba(139,92,246,0.05) 55%, transparent 75%)",
            filter: "blur(52px)",
          }}
          animate={{ x: ["0%", "-9%", "0%"], y: ["0%", "7%", "0%"] }}
          transition={{ duration: 26, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: 5 }}
        />
        {/* Cyan orb — bottom-left drift */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 420,
            height: 420,
            bottom: "0%",
            left: "15%",
            background: "radial-gradient(ellipse, rgba(6,182,212,0.18) 0%, rgba(6,182,212,0.04) 55%, transparent 75%)",
            filter: "blur(44px)",
          }}
          animate={{ x: ["0%", "6%", "0%"], y: ["0%", "-8%", "0%"] }}
          transition={{ duration: 19, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: 10 }}
        />
        {/* Rose orb — bottom-right drift */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 340,
            height: 340,
            bottom: "10%",
            right: "12%",
            background: "radial-gradient(ellipse, rgba(244,63,94,0.16) 0%, rgba(244,63,94,0.04) 55%, transparent 75%)",
            filter: "blur(38px)",
          }}
          animate={{ x: ["0%", "-6%", "0%"], y: ["0%", "5%", "0%"] }}
          transition={{ duration: 24, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: 15 }}
        />
      </div>

      <div className="container px-4 md:px-6 max-w-7xl mx-auto relative z-10" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-center flex flex-col gap-4 mb-20 max-w-3xl mx-auto"
        >
          <span className="text-[#3B82F6] text-sm font-semibold uppercase tracking-widest font-heading">
            Trusted By
          </span>
          <h2 className="font-heading tracking-tighter text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
            Visionaries Who{" "}
            <span
              className="inline-block"
              style={{
                background: "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 50%, #F43F5E 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Chose Us
            </span>
          </h2>
          <p className="text-foreground/55 text-lg sm:text-xl font-sans leading-relaxed">
            From early-stage startups to growth-stage companies — these are the teams that handed us their most critical product challenges. Here&apos;s what we built together.
          </p>
        </motion.div>

        {/* Client logo grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-24"
        >
          {clients.map((client) => (
            <motion.div
              key={client.name}
              variants={itemVariants}
              whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
              className="group relative rounded-2xl p-5 flex flex-col gap-3 cursor-default overflow-hidden bg-white/25 dark:bg-white/5 border border-white/50 dark:border-white/10"
              style={{
                backdropFilter: "blur(24px) saturate(180%)",
                WebkitBackdropFilter: "blur(24px) saturate(180%)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.18)",
              }}
            >
              {/* Inner radial glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                style={{ background: `radial-gradient(ellipse at top left, ${client.accent}1a 0%, transparent 65%)` }}
              />
              {/* Top accent bar — faint at rest, full on hover */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl opacity-30 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, ${client.accent}, ${client.accent}55, transparent)` }}
              />

              {/* Initials badge */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold font-heading text-white tracking-wide shrink-0"
                style={{ background: `${client.accent}22`, color: client.accent, border: `1px solid ${client.accent}33` }}
              >
                {client.initials}
              </div>

              <div className="flex flex-col gap-1">
                <span className="font-heading font-semibold text-foreground text-base tracking-tight">
                  {client.name}
                </span>
                <span className="text-xs font-sans text-foreground/50 uppercase tracking-widest">
                  {client.industry}
                </span>
                <span className="text-sm font-sans text-foreground/60 leading-snug mt-1">
                  {client.description}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Divider label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center gap-4 mb-14"
        >
          <div className="flex-1 h-px bg-foreground/10" />
          <span className="text-xs font-heading font-semibold uppercase tracking-[0.2em] text-foreground/35 whitespace-nowrap">
            What our clients say
          </span>
          <div className="flex-1 h-px bg-foreground/10" />
        </motion.div>

        {/* Testimonials */}
        <motion.div
          ref={testimonialsRef}
          variants={containerVariants}
          initial="hidden"
          animate={testimonialsInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.author}
              variants={itemVariants}
              className="relative rounded-2xl p-7 flex flex-col gap-6 overflow-hidden bg-white/30 dark:bg-white/4 border border-white/55 dark:border-white/10"
              style={{
                backdropFilter: "blur(28px) saturate(170%)",
                WebkitBackdropFilter: "blur(28px) saturate(170%)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.2)",
              }}
            >
              {/* Quote mark */}
              <span
                className="absolute top-4 right-6 text-6xl font-serif leading-none select-none opacity-10"
                style={{ color: t.accent }}
              >
                &ldquo;
              </span>

              <p className="text-foreground/75 font-sans text-[0.95rem] leading-relaxed relative z-10">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3 mt-auto">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold font-heading shrink-0"
                  style={{ background: `${t.accent}22`, color: t.accent, border: `1px solid ${t.accent}44` }}
                >
                  {t.initials}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold font-heading text-foreground">{t.author}</span>
                  <span className="text-xs text-foreground/50 font-sans">{t.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
