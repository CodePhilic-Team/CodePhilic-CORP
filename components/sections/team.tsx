"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { FaGithub, FaLinkedin, FaTwitter, FaFacebook, FaEnvelope } from "react-icons/fa";
type TeamMember = {
  name: string;
  image: string;
  role: string;
  primaryRole?: string;
  secondaryRole?: string;
  executiveRoles?: string[];
  bio?: string;
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
    primaryRole: "Leading Founder & CEO",
    secondaryRole: "Managing Director · Director",
    executiveRoles: [
      "Leading Founder & CEO (Chief Executive Officer)",
      "Managing Director & Director",
      "CTO (Chief Technology Officer) · CSO (Chief Strategy Officer)",
    ],
    initials: "RI",
    accent: "#3B82F6",
    social: {
      linkedin: "https://www.linkedin.com/in/rakibul-islam-8372852bb/",
      github: "https://github.com/rakibtkg",
      email: "rakibulislammbstu32@gmail.com",
    },
  },
  {
    name: "Druba Paul",
    image: "/team/dhrubax.jpg",
    role: "Co-Founder & CMO · Director",
    primaryRole: "Co-Founder & CMO",
    secondaryRole: "Director",
    executiveRoles: [
      "Co-Founder & CMO (Chief Marketing Officer)",
      "Director",
      "CRO (Chief Revenue Officer) · CPO (Chief Product Officer)",
    ],
    initials: "DP",
    accent: "#10B981",
    social: {
      linkedin: "https://www.linkedin.com/in/dhruba-paul-69342b363/",
      github: "https://github.com/DHRUBA-NIRO",
      email: "dhrubacse276mbstu@gmail.com",
    },
  },
  {
    name: "Iftekhar Alam Shuvo",
    image: "/team/shuvox.jpg",
    role: "Co-Founder & CFO · Director",
    primaryRole: "Co-Founder & CFO",
    secondaryRole: "Director",
    executiveRoles: [
      "Co-Founder & CFO (Chief Financial Officer)",
      "Director",
      "Compliance & Finance Lead · Advisory CSO",
    ],
    initials: "IS",
    accent: "#F59E0B",
    social: {
      linkedin: "https://www.linkedin.com/in/iftekhar-alam-shuvo-4742842bb/",
      github: "https://github.com/SHUVOika",
      email: "ikashuvo8@gmail.com",
    },
  },
  {
    name: "Md. Habibur Rahman",
    image: "/team/himaloyx.jpg",
    role: "Co-Founder & COO · Director",
    primaryRole: "Co-Founder & COO",
    secondaryRole: "Director",
    executiveRoles: [
      "Co-Founder & COO (Chief Operating Officer)",
      "Director",
      "CBO (Chief Business Officer) · Advisory CTO",
    ],
    initials: "HR",
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
    role: "Academic & Strategic Advisor",
    primaryRole: "Advisor",
    secondaryRole: "MBSTU Faculty",
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
    <section id="team" className="py-24 md:py-32 relative overflow-hidden scroll-mt-24">
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
              className="group relative overflow-hidden flex flex-col rounded-xl"
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

              <div className="p-6 sm:p-7 flex flex-col gap-4 flex-1">
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

                {/* Name & Role Header */}
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-lg font-bold font-heading text-foreground tracking-tight">
                    {member.name}
                  </h3>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span
                      className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold font-heading tracking-wide border"
                      style={{
                        color: member.accent,
                        backgroundColor: `${member.accent}14`,
                        borderColor: `${member.accent}33`,
                      }}
                    >
                      {member.primaryRole || member.role}
                    </span>
                    {member.secondaryRole && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium text-foreground/75 bg-foreground/5 border border-foreground/10">
                        {member.secondaryRole}
                      </span>
                    )}
                  </div>
                </div>

                {/* Executive & Statutory Roles */}
                {member.executiveRoles && member.executiveRoles.length > 0 ? (
                  <div className="flex flex-col gap-2 pt-2 border-t border-border/40 flex-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-foreground/45 font-heading">
                      Executive &amp; Statutory Roles
                    </span>
                    <ul className="space-y-1.5">
                      {member.executiveRoles.map((roleText, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-foreground/75 leading-relaxed font-sans">
                          <span
                            className="size-1.5 rounded-full mt-1.5 shrink-0"
                            style={{ backgroundColor: member.accent }}
                          />
                          <span>{roleText}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="text-foreground/55 text-sm leading-relaxed font-sans flex-1 whitespace-pre-line">
                    {member.bio}
                  </p>
                )}

                {/* Socials / Links - Single Row */}
                <div className="grid grid-cols-3 gap-1.5 pt-3 border-t border-border/40 mt-auto">
                  {member.social.linkedin && (
                    <a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1 py-1.5 px-1 rounded-md text-[11px] font-medium text-foreground/80 hover:text-foreground hover:bg-foreground/5 border border-foreground/10 transition-colors whitespace-nowrap"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <FaLinkedin className="size-3 text-[#0A66C2] shrink-0" />
                      <span>LinkedIn</span>
                    </a>
                  )}
                  {member.social.github && (
                    <a
                      href={member.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1 py-1.5 px-1 rounded-md text-[11px] font-medium text-foreground/80 hover:text-foreground hover:bg-foreground/5 border border-foreground/10 transition-colors whitespace-nowrap"
                      aria-label={`${member.name} GitHub`}
                    >
                      <FaGithub className="size-3 shrink-0" />
                      <span>GitHub</span>
                    </a>
                  )}
                  {member.social.email && (
                    <a
                      href={`mailto:${member.social.email}`}
                      className="flex items-center justify-center gap-1 py-1.5 px-1 rounded-md text-[11px] font-medium text-foreground/80 hover:text-foreground hover:bg-foreground/5 border border-foreground/10 transition-colors whitespace-nowrap"
                      aria-label={`${member.name} Email`}
                      title={member.social.email}
                    >
                      <FaEnvelope className="size-2.5 text-foreground/60 shrink-0" />
                      <span>Email</span>
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
              className="group relative overflow-hidden flex flex-col rounded-xl"
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

              <div className="p-6 sm:p-7 flex flex-col gap-4 flex-1">
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

                {/* Name & Role Header */}
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-lg font-bold font-heading text-foreground tracking-tight">
                    {member.name}
                  </h3>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span
                      className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold font-heading tracking-wide border"
                      style={{
                        color: member.accent,
                        backgroundColor: `${member.accent}14`,
                        borderColor: `${member.accent}33`,
                      }}
                    >
                      {member.primaryRole || member.role}
                    </span>
                    {member.secondaryRole && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium text-foreground/75 bg-foreground/5 border border-foreground/10">
                        {member.secondaryRole}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-foreground/60 text-xs sm:text-sm leading-relaxed font-sans flex-1 whitespace-pre-line">
                  {member.bio}
                </p>

                {/* Socials / Website */}
                <div className="flex items-center flex-wrap gap-2 pt-3 border-t border-border/40 mt-auto">
                  {member.social.website && (
                    <a
                      href={member.social.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium hover:underline transition-colors border border-foreground/10 bg-foreground/5"
                      style={{ color: member.accent }}
                      aria-label="MBSTU Faculty Profile"
                    >
                      MBSTU Faculty Profile &rarr;
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
