"use client";


import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FloatingAssets } from "@/components/FloatingAsset";
import GradientText from "@/components/GradientText";
import Squares from "@/components/Squares";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

// ─── Per-character spring stagger ────────────────────────────────────────────

const SPRING = { type: "spring" as const, stiffness: 100, damping: 10 };

const charVariants = {
  hidden: { opacity: 0, y: 36 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { ...SPRING, delay: i * 0.035 },
  }),
};

function SplitText({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={charVariants}
          className="inline-block will-change-transform"
          style={{ whiteSpace: ch === " " ? "pre" : undefined }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

// ─── Animated Button ──────────────────────────────────────────────────────────

function AnimatedButton({
  children,
  className,
  style,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      className={`relative overflow-hidden ${className || ""}`}
      style={{ ...style }}
      whileHover="hover"
      whileTap="tap"
      variants={{
        hover: { scale: 1.05 },
        tap: { scale: 0.95 }
      }}
    >
      <span className="relative z-10 flex items-center justify-center">{children}</span>
      <motion.div
        className="absolute inset-0 pointer-events-none z-0 w-[150%] left-[-25%]"
        initial={{ x: "-100%", skewX: -20 }}
        variants={{
          hover: { x: "100%" }
        }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear", repeatDelay: 0.2 }}
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
        }}
      />
    </motion.button>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export function Hero() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = !mounted || resolvedTheme === "dark";

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Squares 
          direction="diagonal"
          speed={0.5}
          squareSize={40}
          borderColor={isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)"} 
          hoverFillColor={isDark ? "rgba(59,130,246,0.1)" : "rgba(59,130,246,0.15)"}
        />
      </div>
      <FloatingAssets />

      <div className="container px-4 md:px-6 relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
            }}
            className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-1 text-xs font-medium tracking-widest uppercase text-[#3B82F6]"
          >
            Premium Software Agency
          </motion.div>

          {/* H1 with character stagger */}
          <motion.h1
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.032, delayChildren: 0.25 } } }}
            className="font-heading font-bold tracking-tighter leading-[1.1] flex flex-col items-center justify-center gap-1 sm:gap-4"
          >
            <span className="block text-6xl md:text-8xl lg:text-[7.5rem]">
              <SplitText text="CodePhilic" />
            </span>
            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
              <GradientText
                colors={["#3B82F6", "#8B5CF6", "#F43F5E", "#3B82F6"]}
                animationSpeed={5}
                showBorder={false}
                className="inline-block px-2 text-balance"
              >
                We Architect Imagination
              </GradientText>
            </span>
          </motion.h1>

          {/* Subtitle with character stagger */}
          <motion.p
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.018, delayChildren: 0.75 } } }}
            className="max-w-3xl mx-auto text-base md:text-xl text-foreground/60 leading-relaxed font-sans text-balance"
            aria-label="Human-authored code. Flawless execution. We build high-performance web and mobile applications for visionaries who refuse to compromise on quality."
          >
            {"Human-authored code. Flawless execution. We build high-performance web and mobile applications for visionaries who refuse to compromise on quality.".split("").map((ch, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={charVariants}
                className="inline-block will-change-transform"
                style={{ whiteSpace: ch === " " ? "pre" : undefined }}
              >
                {ch}
              </motion.span>
            ))}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 1.1 } },
            }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-8"
          >
            <AnimatedButton className="group inline-flex items-center justify-center h-12 px-8 rounded-full bg-[#3B82F6] text-white text-sm font-medium transition-colors hover:bg-[#2563eb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]/60">
              Start your project
              <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
            </AnimatedButton>

            <AnimatedButton className="inline-flex items-center justify-center h-12 px-8 rounded-full text-foreground text-sm font-medium backdrop-blur-md transition-colors hover:bg-foreground/10" style={{ border: '1px solid var(--border)' }}>
              View our work
            </AnimatedButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
