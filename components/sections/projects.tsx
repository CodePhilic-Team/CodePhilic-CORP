"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "NovaPay",
    category: "Fintech · Web App",
    description:
      "A real-time payment platform handling high-volume transactions with sub-100ms latency. Built with Next.js, Stripe Connect, and PostgreSQL on Supabase.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Stripe"],
    accent: "#3B82F6",
    span: "md:col-span-2",
  },
  {
    title: "Orbita",
    category: "SaaS · Dashboard",
    description:
      "Analytics and observability SaaS for e-commerce brands. Real-time charts, cohort analysis, and AI-generated growth insights.",
    tags: ["React", "Node.js", "MongoDB", "OpenAI"],
    accent: "#8B5CF6",
    span: "md:col-span-1",
  },
  {
    title: "Flox",
    category: "Mobile · iOS & Android",
    description:
      "A social fitness app with workout tracking, live challenges, and friend leaderboards. 10k+ downloads in first month post-launch.",
    tags: ["React Native", "Django", "PostgreSQL"],
    accent: "#10B981",
    span: "md:col-span-1",
  },
  {
    title: "CloudForge",
    category: "DevOps · Platform",
    description:
      "Internal developer platform for a Series B startup — one-click deployments, environment management, and cost dashboards across AWS regions.",
    tags: ["Python", "AWS", "Terraform", "TypeScript"],
    accent: "#F59E0B",
    span: "md:col-span-2",
  },
];

export function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="work" className="py-24 md:py-32 relative overflow-hidden">
      <div className="container px-4 md:px-6 max-w-7xl mx-auto relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-4 mb-16 max-w-3xl"
        >
          <span className="text-[#3B82F6] text-sm font-semibold uppercase tracking-widest font-heading">
            Our Work
          </span>
          <h2 className="font-heading tracking-tighter text-4xl md:text-5xl font-bold text-foreground">
            Products we&apos;ve{" "}
            <span className="text-[#3B82F6]">shipped</span>
          </h2>
          <p className="text-foreground/60 text-lg sm:text-xl font-sans leading-relaxed">
            A selection of recent client work spanning fintech, SaaS, mobile, and developer tooling.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              className={`${project.span} group relative rounded-3xl overflow-hidden cursor-pointer`}
              style={{
                background: "var(--glass-bg)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid var(--glass-border)",
              }}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 } as never}
            >
              {/* Glow accent */}
              <div
                className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle, ${project.accent}, transparent 70%)`,
                  transform: "translate(30%, -30%)",
                }}
              />

              <div className="p-8 flex flex-col h-full gap-5 relative z-10">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col gap-1">
                    <span
                      className="text-xs font-semibold uppercase tracking-widest font-heading"
                      style={{ color: project.accent }}
                    >
                      {project.category}
                    </span>
                    <h3 className="text-2xl font-bold font-heading text-foreground">
                      {project.title}
                    </h3>
                  </div>
                  <div
                    className="size-9 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shrink-0"
                    style={{ background: `${project.accent}22`, border: `1px solid ${project.accent}44` }}
                  >
                    <ArrowUpRight className="size-4" style={{ color: project.accent }} />
                  </div>
                </div>

                <p className="text-foreground/60 text-sm leading-relaxed font-sans flex-1">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, j) => (
                    <span
                      key={j}
                      className="text-xs px-3 py-1 rounded-full font-medium font-sans"
                      style={{
                        background: `${project.accent}15`,
                        color: project.accent,
                        border: `1px solid ${project.accent}30`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
