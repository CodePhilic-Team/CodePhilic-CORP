"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

type Project = {
  title: string;
  category: string;
  description: string;
  tags: string[];
  accent: string;
  span: string;
  link: string;
};

const codephilicProducts: Project[] = [
  {
    title: "TourizBook",
    category: "CODEPHILIC PRODUCT · LIVE",
    description: "A tourism-focused digital platform developed and owned by CodePhilic, designed to provide a modern experience for discovering destinations, attractions and travel-related services.",
    tags: ["Next.js", "TypeScript", "Express", "DigitalOcean"],
    accent: "#8B5CF6", // Purple
    span: "md:col-span-3",
    link: "https://tourphilia.code-philic.com/",
  }
];

const codephilicTechnology: Project[] = [
  {
    title: "SOHH — Shahid Osman Hadi Hall Automation System",
    category: "CODEPHILIC-OWNED TECHNOLOGY · DEPLOYED AT SOHH / MBSTU",
    description: "A comprehensive hall management and dining automation system developed by CodePhilic for Shahid Osman Hadi Hall at Mawlana Bhashani Science and Technology University (MBSTU).",
    tags: ["React", "Node.js", "Express", "MongoDB"],
    accent: "#06B6D4", // Cyan
    span: "md:col-span-2",
    link: "#",
  },
  {
    title: "MBSTU WHEELs Platform",
    category: "CODEPHILIC-OWNED TECHNOLOGY · DEPLOYED FOR MBSTU",
    description: "A transportation technology platform developed by CodePhilic and deployed for MBSTU, supporting real-time vehicle tracking and digital transportation services.",
    tags: ["IoT", "GPS", "Real-time Tracking", "Cloud"],
    accent: "#06B6D4", // Cyan
    span: "md:col-span-1",
    link: "#",
  },
  {
    title: "CPSAA Alumni Platform",
    category: "CODEPHILIC TECHNOLOGY · UNDER CONSTRUCTION",
    description: "An alumni platform currently under construction for the CPS Alumni Association, being developed as a commitment to support alumni engagement and digital operations.",
    tags: ["React", "Node.js"],
    accent: "#06B6D4", // Cyan
    span: "md:col-span-3",
    link: "#",
  }
];

const clientSolutions: Project[] = [
  {
    title: "MBSTU WHEELs Mobile App",
    category: "INSTITUTIONAL SOLUTION · DEVELOPED BY CODEPHILIC",
    description: "Official mobile application supporting MBSTU transportation services and real-time vehicle tracking.",
    tags: ["Android", "iOS", "Flutter", "GPS"],
    accent: "#3B82F6", // Blue
    span: "md:col-span-2",
    link: "https://play.google.com/store/search?q=mbstu+wheels&c=apps&hl=bn",
  },
  {
    title: "MBSTU WHEELs Web App",
    category: "INSTITUTIONAL SOLUTION · DEVELOPED BY CODEPHILIC",
    description: "Web-based transportation platform supporting live vehicle tracking, routes and transportation operations.",
    tags: ["React", "NEXT JS", "PostgreSQL"],
    accent: "#3B82F6", // Blue
    span: "md:col-span-1",
    link: "https://transport.mbstu.ac.bd/MBSTU-Wheels",
  },
  {
    title: "MBSTU Transport Website",
    category: "INSTITUTIONAL SOLUTION · DEVELOPED BY CODEPHILIC",
    description: "Official digital platform for MBSTU transportation information, schedules, routes and updates.",
    tags: ["Next.js", "TypeScript", "TailwindCSS"],
    accent: "#3B82F6", // Blue
    span: "md:col-span-1",
    link: "https://transport.mbstu.ac.bd/",
  },
  {
    title: "CPS Department Alumni Website",
    category: "INSTITUTIONAL SOLUTION · DEVELOPED BY CODEPHILIC",
    description: "Digital alumni platform for the Department of Computer Science and Engineering at MBSTU, supporting alumni information, communication and community engagement.",
    tags: ["Next.js", "TypeScript", "Express"],
    accent: "#3B82F6", // Blue
    span: "md:col-span-1",
    link: "https://cpsaa.org/",
  },
  {
    title: "MBSTU Fleet Management",
    category: "INSTITUTIONAL SOLUTION · DEVELOPED BY CODEPHILIC",
    description: "Fleet management technology developed to support MBSTU transportation operations and vehicle management.",
    tags: ["Dashboard", "Analytics", "Fleet Tools"],
    accent: "#3B82F6", // Blue
    span: "md:col-span-1",
    link: "#",
  }
];

const aiProducts: Project[] = [
  {
    title: "AI Product — Coming Soon",
    category: "Intelligent Workflow & Automation",
    description: "An AI-powered product being developed to automate complex digital workflows, reduce repetitive tasks and help users make faster, data-informed decisions.",
    tags: ["AI", "Machine Learning", "Python", "Private Development"],
    accent: "#10B981", // Green
    span: "md:col-span-2",
    link: "#",
  },
  {
    title: "AI Product — Coming Soon",
    category: "Generative AI & Intelligent Data",
    description: "A next-generation generative AI product under development, focused on intelligent interaction with data and scalable AI-powered workflows.",
    tags: ["Generative AI", "LLMs", "Python", "Private Development"],
    accent: "#10B981", // Green
    span: "md:col-span-1",
    link: "#",
  }
];

function ProjectGrid({ projects, inView }: { projects: Project[], inView: boolean }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {projects.map((project, i) => (
        <a
          key={i}
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`no-underline ${project.span}`}
        >
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.5,
              delay: 0.1 + i * 0.09,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="group relative rounded-3xl overflow-hidden cursor-pointer h-full"
            style={{
              background: "var(--glass-bg)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid var(--glass-border)",
            }}
            whileHover={{
              y: -4,
              transition: { type: "spring", stiffness: 200, damping: 20 },
            }}
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
                  style={{
                    background: `${project.accent}22`,
                    border: `1px solid ${project.accent}44`,
                  }}
                >
                  <ArrowUpRight
                    className="size-4"
                    style={{ color: project.accent }}
                  />
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
        </a>
      ))}
    </div>
  );
}

export function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="work" className="py-24 md:py-32 relative overflow-hidden">
      <div
        className="container px-4 md:px-6 max-w-7xl mx-auto relative z-10"
        ref={ref}
      >
        {/* CodePhilic Products Category */}
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-4 mb-12 max-w-3xl"
          >
            <span className="text-[#8B5CF6] text-sm font-semibold uppercase tracking-widest font-heading flex items-center gap-2">
              <span className="size-2 rounded-full bg-[#8B5CF6]" />
              CodePhilic Products
            </span>
            <h2 className="font-heading tracking-tighter text-3xl md:text-4xl font-bold text-foreground">
              Our own software products, owned and operated by CodePhilic.
            </h2>
          </motion.div>
          <ProjectGrid projects={codephilicProducts} inView={inView} />
        </div>

        {/* CodePhilic Technology & Institutional Deployments Category */}
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-4 mb-12 max-w-3xl"
          >
            <span className="text-[#06B6D4] text-sm font-semibold uppercase tracking-widest font-heading flex items-center gap-2">
              <span className="size-2 rounded-full bg-[#06B6D4]" />
              CodePhilic Technology & Institutional Deployments
            </span>
            <h2 className="font-heading tracking-tighter text-3xl md:text-4xl font-bold text-foreground">
              Reusable technology and software modules developed by CodePhilic and deployed for real-world institutional use.
            </h2>
          </motion.div>
          <ProjectGrid projects={codephilicTechnology} inView={inView} />
        </div>

        {/* Client Solutions Category */}
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-4 mb-12 max-w-3xl"
          >
            <span className="text-[#3B82F6] text-sm font-semibold uppercase tracking-widest font-heading flex items-center gap-2">
              <span className="size-2 rounded-full bg-[#3B82F6]" />
              Client & Institutional Solutions
            </span>
            <h2 className="font-heading tracking-tighter text-3xl md:text-4xl font-bold text-foreground">
              Digital systems designed and developed by CodePhilic for organizations, institutions and businesses.
            </h2>
          </motion.div>
          <ProjectGrid projects={clientSolutions} inView={inView} />
        </div>

        {/* AI Products Category */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-4 mb-12 max-w-3xl"
          >
            <span className="text-[#10B981] text-sm font-semibold uppercase tracking-widest font-heading flex items-center gap-2">
              <span className="size-2 rounded-full bg-[#10B981]" />
              AI Products
            </span>
            <h2 className="font-heading tracking-tighter text-3xl md:text-4xl font-bold text-foreground">
              CodePhilic is currently developing a portfolio of AI-powered products designed to solve practical problems through intelligent automation, generative AI and machine learning.
            </h2>
            <p className="text-foreground/60 text-lg font-sans leading-relaxed">
              Our AI products are currently in active development and will be introduced as they reach product readiness.
            </p>
          </motion.div>
          <ProjectGrid projects={aiProducts} inView={inView} />
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 text-center text-sm font-medium text-foreground/50 font-sans"
          >
            More details will be announced as these products move toward public release.
          </motion.div>
        </div>

      </div>
    </section>
  );
}
