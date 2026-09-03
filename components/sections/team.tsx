"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { FaGithub, FaLinkedin, FaTwitter, FaFacebook, FaEnvelope } from "react-icons/fa";
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
    website?: string;
    email?: string;
  };
};

const team: TeamMember[] = [
  {
    name: "Md. Rakibul Islam",
    image: "/team/rakibx.jpg",
    role: "Leading Founder & CEO · Managing Director · Director",
    bio: "Primary responsibilities include:\n• Company leadership\n• Technology and product direction\n• Engineering\n• Business strategy\n• Overall operations",
    initials: "RI",
    accent: "#3B82F6",
    social: {
      linkedin: "https://www.linkedin.com/in/rakibul-islam-8372852bb/",
      github: "https://github.com/rakibtkg",
      email: "rakibulislammbstu32@gmail.com",
    },
  },
  {
    name: "Dhruba",
    image: "/team/dhrubax.jpg",
    role: "Co-Founder & CMO · Director",
    bio: "Primary responsibilities include:\n• Marketing\n• Brand strategy\n• Growth\n• Business development\n• Product and company operations",
    initials: "DP",
    accent: "#10B981",
    social: {
      linkedin: "https://www.linkedin.com/in/dhruba-paul-69342b363/",
      github: "https://github.com/DHRUBA-NIRO",
      email: "dhrubacse276mbstu@gmail.com",
    },
  },
  {
    name: "Shuvo",
    image: "/team/shuvox.jpg",
    role: "Co-Founder & CFO · Director",
    bio: "Primary responsibilities include:\n• Finance\n• Financial planning\n• Business operations\n• Administration\n• Product development",
    initials: "S",
    accent: "#F59E0B",
    social: {
      linkedin: "https://www.linkedin.com/in/iftekhar-alam-shuvo-4742842bb/",
      github: "https://github.com/SHUVOika",
      email: "ikashuvo8@gmail.com",
    },
  },
  {
    name: "Habib",
    image: "/team/himaloyx.jpg",
    role: "Co-Founder & COO · Director",
    bio: "Primary responsibilities include:\n• Operations\n• Project coordination\n• Process management\n• Delivery\n• Product development",
    initials: "H",
    accent: "#8B5CF6",
    social: {
      linkedin: "https://www.linkedin.com/in/habib007/",
      github: "https://github.com/himaloy007",
      email: "md.habiburrahman00369@gmail.com",
    },
  },
];

const advisors: TeamMember[] = [
  {
    name: "Dr. Md. Sazzad Hossain",
    image: "/team/sazzad_1778071366_2186ca1d.jpeg",
    role: "Advisor",
    bio: "Professor, Department of Computer Science and Engineering (CSE), Mawlana Bhashani Science and Technology University (MBSTU).\n\nAdvising CodePhilic on advanced technology, strategic development, and academic-industry alignment.",
    initials: "SH",
    accent: "#6366F1",
    social: {
      website: "https://cse.mbstu.ac.bd/teacher/dr-md-sazzad-hossain",
    },
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

      <div
        className="container px-4 md:px-6 max-w-7xl mx-auto relative z-10"
        ref={ref}
      >
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
            The people behind <span className="text-[#3B82F6]">the craft</span>
          </h2>
          <p className="text-foreground/60 text-lg sm:text-xl font-sans leading-relaxed">
            CodePhilic is founded and operated by a four-member leadership team with responsibilities spanning technology, product development, marketing, finance and operations.
            <br /><br />
            The founding team remains actively involved in product development, engineering and day-to-day company operations, with each founder leading a primary area of the business.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.1 + i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
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
                style={{
                  background: `linear-gradient(90deg, ${member.accent}, transparent)`,
                }}
              />

              <div className="p-7 flex flex-col gap-5 flex-1">
                {/* Avatar */}
                <div
                  className="size-16 rounded-full overflow-hidden ring-2 ring-offset-2 ring-offset-transparent flex items-center justify-center shrink-0"
                  style={{ boxShadow: `0 0 0 2px ${member.accent}66`, backgroundColor: `${member.accent}20` }}
                >
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <span className="font-heading font-bold text-xl text-foreground" style={{ color: member.accent }}>
                      {member.initials}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <h3 className="text-base font-bold font-heading text-foreground">
                    {member.name}
                  </h3>
                  <span
                    className="text-xs font-semibold font-heading uppercase tracking-wider"
                    style={{ color: member.accent }}
                  >
                    {member.role}
                  </span>
                </div>

                <p className="text-foreground/55 text-sm leading-relaxed font-sans flex-1 whitespace-pre-line">
                  {member.bio}
                </p>

                {/* Socials */}
                <div className="flex items-center gap-3 pt-1">
                  {member.social.fb && (
                    <a
                      href={member.social.fb}
                      className="group/tooltip relative text-foreground/30 hover:text-foreground transition-colors flex items-center justify-center"
                      aria-label="Facebook"
                    >
                      <FaFacebook className="size-4" />
                      <span className="absolute -top-9 left-1/2 -translate-x-1/2 scale-50 opacity-0 group-hover/tooltip:scale-100 group-hover/tooltip:opacity-100 transition-all duration-200 px-2 py-1 bg-foreground/90 backdrop-blur text-background text-[10px] font-bold tracking-widest uppercase rounded pointer-events-none origin-bottom whitespace-nowrap shadow-xl">
                        Facebook
                      </span>
                    </a>
                  )}
                  {member.social.twitter && (
                    <a
                      href={member.social.twitter}
                      className="group/tooltip relative text-foreground/30 hover:text-foreground transition-colors flex items-center justify-center"
                      aria-label="Twitter"
                    >
                      <FaTwitter className="size-4" />
                      <span className="absolute -top-9 left-1/2 -translate-x-1/2 scale-50 opacity-0 group-hover/tooltip:scale-100 group-hover/tooltip:opacity-100 transition-all duration-200 px-2 py-1 bg-foreground/90 backdrop-blur text-background text-[10px] font-bold tracking-widest uppercase rounded pointer-events-none origin-bottom whitespace-nowrap shadow-xl">
                        Twitter
                      </span>
                    </a>
                  )}
                  {member.social.linkedin && (
                    <a
                      href={member.social.linkedin}
                      className="group/tooltip relative text-foreground/30 hover:text-foreground transition-colors flex items-center justify-center"
                      aria-label="LinkedIn"
                    >
                      <FaLinkedin className="size-4" />
                      <span className="absolute -top-9 left-1/2 -translate-x-1/2 scale-50 opacity-0 group-hover/tooltip:scale-100 group-hover/tooltip:opacity-100 transition-all duration-200 px-2 py-1 bg-foreground/90 backdrop-blur text-background text-[10px] font-bold tracking-widest uppercase rounded pointer-events-none origin-bottom whitespace-nowrap shadow-xl">
                        LinkedIn
                      </span>
                    </a>
                  )}
                  {member.social.github && (
                    <a
                      href={member.social.github}
                      className="group/tooltip relative text-foreground/30 hover:text-foreground transition-colors flex items-center justify-center"
                      aria-label="GitHub"
                    >
                      <FaGithub className="size-4" />
                      <span className="absolute -top-9 left-1/2 -translate-x-1/2 scale-50 opacity-0 group-hover/tooltip:scale-100 group-hover/tooltip:opacity-100 transition-all duration-200 px-2 py-1 bg-foreground/90 backdrop-blur text-background text-[10px] font-bold tracking-widest uppercase rounded pointer-events-none origin-bottom whitespace-nowrap shadow-xl">
                        GitHub
                      </span>
                    </a>
                  )}
                  {member.social.email && (
                    <a
                      href={`mailto:${member.social.email}`}
                      className="group/tooltip relative text-foreground/30 hover:text-foreground transition-colors flex items-center justify-center"
                      aria-label="Email"
                    >
                      <FaEnvelope className="size-4" />
                      <span className="absolute -top-9 left-1/2 -translate-x-1/2 scale-50 opacity-0 group-hover/tooltip:scale-100 group-hover/tooltip:opacity-100 transition-all duration-200 px-2 py-1 bg-foreground/90 backdrop-blur text-background text-[10px] font-bold tracking-widest uppercase rounded pointer-events-none origin-bottom whitespace-nowrap shadow-xl">
                        Email
                      </span>
                    </a>
                  )}
                  {member.social.website && (
                    <a
                      href={member.social.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold hover:underline"
                      style={{ color: member.accent }}
                      aria-label="Website"
                    >
                      View Faculty Profile
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Advisor Section */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-4 mt-24 mb-10 max-w-3xl"
        >
          <h2 className="font-heading tracking-tighter text-3xl md:text-4xl font-bold text-foreground">
            Advisor
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {advisors.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.5,
                delay: 0.1 + i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative overflow-hidden flex flex-col"
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
                style={{
                  background: `linear-gradient(90deg, ${member.accent}, transparent)`,
                }}
              />

              <div className="p-7 flex flex-col gap-5 flex-1">
                {/* Avatar */}
                <div
                  className="size-16 rounded-full overflow-hidden ring-2 ring-offset-2 ring-offset-transparent flex items-center justify-center shrink-0"
                  style={{ boxShadow: `0 0 0 2px ${member.accent}66`, backgroundColor: `${member.accent}20` }}
                >
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <span className="font-heading font-bold text-xl text-foreground" style={{ color: member.accent }}>
                      {member.initials}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <h3 className="text-base font-bold font-heading text-foreground">
                    {member.name}
                  </h3>
                  <span
                    className="text-xs font-semibold font-heading uppercase tracking-wider"
                    style={{ color: member.accent }}
                  >
                    {member.role}
                  </span>
                </div>

                <p className="text-foreground/55 text-sm leading-relaxed font-sans flex-1 whitespace-pre-line">
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
                  {member.social.email && (
                    <a
                      href={`mailto:${member.social.email}`}
                      className="text-foreground/30 hover:text-foreground transition-colors"
                      aria-label="Email"
                    >
                      <FaEnvelope className="size-4" />
                    </a>
                  )}
                  {member.social.website && (
                    <a
                      href={member.social.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold hover:underline"
                      style={{ color: member.accent }}
                      aria-label="Website"
                    >
                      MBSTU Faculty Profile
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
