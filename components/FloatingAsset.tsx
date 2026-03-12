"use client";

import { motion } from "framer-motion";
import { useParallax } from "@/hooks/use-parallax";

// ─── 3D-styled SVG assets ────────────────────────────────────────────────────

function WebSVG() {
  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(0 0 28px rgba(59,130,246,0.35))" }}
    >
      <circle cx="60" cy="60" r="52" stroke="#3B82F6" strokeWidth="0.75" opacity="0.5" />
      <circle cx="60" cy="60" r="36" stroke="#94A3B8" strokeWidth="0.5" opacity="0.4" />
      <circle cx="60" cy="60" r="18" stroke="#3B82F6" strokeWidth="1" opacity="0.7" />
      <circle cx="60" cy="60" r="4" fill="#3B82F6" opacity="0.8" />
      {/* Latitude lines */}
      <ellipse cx="60" cy="60" rx="52" ry="22" stroke="#94A3B8" strokeWidth="0.5" opacity="0.3" />
      <ellipse cx="60" cy="60" rx="52" ry="10" stroke="#94A3B8" strokeWidth="0.4" opacity="0.2" />
      {/* Meridian */}
      <line x1="60" y1="8" x2="60" y2="112" stroke="#94A3B8" strokeWidth="0.5" opacity="0.3" />
      <line x1="8" y1="60" x2="112" y2="60" stroke="#94A3B8" strokeWidth="0.5" opacity="0.3" />
      {/* Orbit ring - tilted */}
      <ellipse cx="60" cy="60" rx="52" ry="14" stroke="#3B82F6" strokeWidth="0.75" opacity="0.25" transform="rotate(-30 60 60)" />
      {/* Node on orbit */}
      <circle cx="103" cy="49" r="3" fill="#3B82F6" opacity="0.7" />
    </svg>
  );
}

function AppSVG() {
  return (
    <svg
      width="72"
      height="126"
      viewBox="0 0 72 126"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(0 0 20px rgba(148,163,184,0.25))" }}
    >
      {/* Phone body */}
      <rect x="4" y="4" width="64" height="118" rx="14" stroke="#94A3B8" strokeWidth="0.75" opacity="0.5" />
      <rect x="4" y="4" width="64" height="118" rx="14" fill="rgba(148,163,184,0.03)" />
      {/* Screen */}
      <rect x="12" y="18" width="48" height="80" rx="4" stroke="#3B82F6" strokeWidth="0.6" opacity="0.4" />
      <rect x="12" y="18" width="48" height="80" rx="4" fill="rgba(59,130,246,0.03)" />
      {/* Notch */}
      <rect x="24" y="7" width="24" height="3" rx="1.5" fill="#94A3B8" opacity="0.3" />
      {/* Home button */}
      <circle cx="36" cy="112" r="5" stroke="#94A3B8" strokeWidth="0.75" opacity="0.4" />
      {/* Screen content lines */}
      <rect x="20" y="28" width="32" height="2" rx="1" fill="#3B82F6" opacity="0.5" />
      <rect x="20" y="36" width="22" height="1.5" rx="0.75" fill="#94A3B8" opacity="0.3" />
      <rect x="20" y="46" width="32" height="18" rx="3" stroke="#3B82F6" strokeWidth="0.5" opacity="0.3" fill="rgba(59,130,246,0.04)" />
      <rect x="20" y="72" width="32" height="2" rx="1" fill="#94A3B8" opacity="0.25" />
      <rect x="20" y="78" width="24" height="2" rx="1" fill="#94A3B8" opacity="0.2" />
      {/* Signal dots */}
      <circle cx="20" cy="10" r="1.5" fill="#94A3B8" opacity="0.3" />
      <circle cx="25" cy="10" r="1.5" fill="#94A3B8" opacity="0.3" />
    </svg>
  );
}

function CloudSVG() {
  return (
    <svg
      width="132"
      height="100"
      viewBox="0 0 132 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(0 0 30px rgba(59,130,246,0.28))" }}
    >
      {/* Main cloud shape */}
      <path
        d="M28 64 C10 64 2 52 2 40 C2 28 12 18 24 18 C26 8 36 0 52 0 C68 0 78 8 80 18 C94 18 106 29 106 42 C106 55 94 64 78 64 Z"
        stroke="#3B82F6"
        strokeWidth="0.9"
        opacity="0.6"
        fill="rgba(59,130,246,0.04)"
      />
      {/* Internal grid lines */}
      <line x1="28" y1="36" x2="78" y2="36" stroke="#3B82F6" strokeWidth="0.5" opacity="0.3" />
      <line x1="28" y1="48" x2="78" y2="48" stroke="#3B82F6" strokeWidth="0.5" opacity="0.2" />
      <line x1="40" y1="18" x2="40" y2="64" stroke="#3B82F6" strokeWidth="0.5" opacity="0.2" />
      <line x1="56" y1="10" x2="56" y2="64" stroke="#3B82F6" strokeWidth="0.5" opacity="0.2" />
      <line x1="72" y1="18" x2="72" y2="64" stroke="#3B82F6" strokeWidth="0.5" opacity="0.2" />
      {/* Connection stems */}
      <line x1="20" y1="64" x2="20" y2="80" stroke="#94A3B8" strokeWidth="0.6" opacity="0.35" />
      <line x1="54" y1="64" x2="54" y2="84" stroke="#94A3B8" strokeWidth="0.6" opacity="0.35" />
      <line x1="88" y1="64" x2="88" y2="80" stroke="#94A3B8" strokeWidth="0.6" opacity="0.35" />
      {/* Connection nodes */}
      <circle cx="20" cy="84" r="5" stroke="#94A3B8" strokeWidth="0.75" opacity="0.45" fill="rgba(148,163,184,0.05)" />
      <circle cx="54" cy="88" r="5" stroke="#3B82F6" strokeWidth="0.75" opacity="0.5" fill="rgba(59,130,246,0.05)" />
      <circle cx="88" cy="84" r="5" stroke="#94A3B8" strokeWidth="0.75" opacity="0.45" fill="rgba(148,163,184,0.05)" />
      {/* Node links */}
      <line x1="25" y1="84" x2="49" y2="88" stroke="#94A3B8" strokeWidth="0.4" opacity="0.25" />
      <line x1="59" y1="88" x2="83" y2="84" stroke="#94A3B8" strokeWidth="0.4" opacity="0.25" />
    </svg>
  );
}

// ─── Floating Assets orchestration ──────────────────────────────────────────

export function FloatingAssets() {
  const y1 = useParallax(-0.18);
  const y2 = useParallax(-0.28);
  const y3 = useParallax(-0.11);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {/* Web globe — top right */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-[14%] right-[5%] will-change-transform"
        initial={{ opacity: 0, scale: 0.75 }}
        animate={{ opacity: 0.22, scale: 1 }}
        transition={{ duration: 1.6, ease: "easeOut", delay: 0.9 }}
      >
        <WebSVG />
      </motion.div>

      {/* Mobile app — left */}
      <motion.div
        style={{ y: y2 }}
        className="absolute top-[38%] left-[4%] will-change-transform"
        initial={{ opacity: 0, scale: 0.75 }}
        animate={{ opacity: 0.18, scale: 1 }}
        transition={{ duration: 1.6, ease: "easeOut", delay: 1.1 }}
      >
        <AppSVG />
      </motion.div>

      {/* Cloud — lower right */}
      <motion.div
        style={{ y: y3 }}
        className="absolute top-[62%] right-[10%] will-change-transform"
        initial={{ opacity: 0, scale: 0.75 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 1.6, ease: "easeOut", delay: 1.3 }}
      >
        <CloudSVG />
      </motion.div>
    </div>
  );
}
