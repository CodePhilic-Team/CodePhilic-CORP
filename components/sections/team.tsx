"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { FaGithub, FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";
type TeamMember = {
  name: string;
  image: string;
  role: string;
  bio: string;
  initials: string;
  accent: string;
  social: {
    linkedin?: string;
    github?: string;
    fb?: string;
    twitter?: string;
  };
};

const team: TeamMember[] = [
  {
    name: "Md.Rakibul Islam",
    image:"/team/rakibx.jpg",
    role: "Co-Founder & CEO",
    bio: "Full-stack architect with a passion for building scalable systems. Previously led engineering at two Y-Combinator startups.",
    initials: "AM",
    accent: "#3B82F6",
    social: {  linkedin: "https://www.linkedin.com/in/rakibul-islam-8372852bb/", github: "https://github.com/rakibtkg" ,fb:"#"},
  },
  {
    name: "Md.Habibur Rahman",
     image:"/team/himaloyx.jpg",
    role: "Co-Founder & CTO",
    bio: "Distributed systems engineer. Designed infrastructure handling 10M+ daily requests. Systems thinker, coffee enthusiast.",
    initials: "PS",
    accent: "#8B5CF6",
    social: { fb: "#", linkedin: "https://www.linkedin.com/in/habib007/", github: "https://github.com/himaloy007" },
  },
  {
    name: "Dhruba Paul",
    role: "Co-Founder & CFO",
    image:"/team/dhrubax.jpg",
    bio: "UI perfectionist obsessed with micro-interactions and performance. Contributor to open-source React tooling.",
    initials: "JC",
    accent: "#10B981",
    social: { fb: "#", linkedin: "https://www.linkedin.com/in/dhruba-paul-69342b363/", github: "https://github.com/DHRUBA-NIRO" },
  },
  {
    name: "Iftekhar Ahmed Shuvo",
    image:"/team/shuvox.jpg",
    role: "Co-Founder & CMO",
    bio: "Bridging product thinking and visual craft. Formerly at Figma's design team. Ships designs that developers love to build.",
    initials: "SN",
    accent: "#F59E0B",
    social: { fb: "#", linkedin: "https://www.linkedin.com/in/iftekhar-alam-shuvo-4742842bb/", github: "https://github.com/SHUVOika" },
  },
];

export function Team() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="team" className="py-24 md:py-32 relative overflow-hidden">
      {/* Radial bg glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(59,130,246,0.06), transparent)",
        }}
      />

      <div className="container px-4 md:px-6 max-w-7xl mx-auto relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-4 mb-16 max-w-3xl"
        >
          <span className="text-[#3B82F6] text-sm font-semibold uppercase tracking-widest font-heading">
            The Team
          </span>
          <h2 className="font-heading tracking-tighter text-4xl md:text-5xl font-bold text-foreground">
            The people behind{" "}
            <span className="text-[#3B82F6]">the craft</span>
          </h2>
          <p className="text-foreground/60 text-lg sm:text-xl font-sans leading-relaxed">
            A tight-knit crew of engineers, designers, and product thinkers. Small enough to stay fast, experienced enough to get it right.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative  overflow-hidden flex flex-col"
              style={{
                background: "var(--glass-bg)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid var(--glass-border)",
              }}
            >
              {/* Top accent strip */}
              <div
                className="h-1 w-full opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, ${member.accent}, transparent)` }}
              />

              <div className="p-7 flex flex-col gap-5 flex-1">
                {/* Avatar */}
                <div
                  className="size-16 rounded-full overflow-hidden ring-2 ring-offset-2 ring-offset-transparent"
                  style={{ boxShadow: `0 0 0 2px ${member.accent}66` }}
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <h3 className="text-base font-bold font-heading text-foreground">{member.name}</h3>
                  <span
                    className="text-xs font-semibold font-heading uppercase tracking-wider"
                    style={{ color: member.accent }}
                  >
                    {member.role}
                  </span>
                </div>

                <p className="text-foreground/55 text-sm leading-relaxed font-sans flex-1">
                  {member.bio}
                </p>

                {/* Socials */}
                <div className="flex items-center gap-3 pt-1">
                  {member.social.fb && (
                    <a
                      href={member.social.fb}
                      className="text-foreground/30 hover:text-foreground transition-colors"
                      aria-label="Facebook"
                    >
                      <FaFacebook className="size-4" />
                    </a>
                  )}
                  {member.social.twitter && (
                    <a
                      href={member.social.twitter}
                      className="text-foreground/30 hover:text-foreground transition-colors"
                      aria-label="Twitter"
                    >
                      <FaTwitter className="size-4" />
                    </a>
                  )}
                  {member.social.linkedin && (
                    <a
                      href={member.social.linkedin}
                      className="text-foreground/30 hover:text-foreground transition-colors"
                      aria-label="LinkedIn"
                    >
                      <FaLinkedin className="size-4" />
                    </a>
                  )}
                  {member.social.github && (
                    <a
                      href={member.social.github}
                      className="text-foreground/30 hover:text-foreground transition-colors"
                      aria-label="GitHub"
                    >
                      <FaGithub className="size-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
