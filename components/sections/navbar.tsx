"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function Navbar() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      style={{
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid var(--border)",
        background: "color-mix(in srgb, var(--background) 72%, transparent)",
      }}
    >
      <div className="flex items-center w-full max-w-7xl mx-auto">
        <a href="/" className="flex items-center gap-2 shrink-0">
          <div
            className="size-8 rounded-lg flex items-center justify-center font-bold text-xl leading-none text-white"
            style={{
              background: "#3B82F6",
              filter: "drop-shadow(0 0 10px rgba(59,130,246,0.6))",
            }}
          >
            C
          </div>
          <span className="font-heading font-semibold text-lg tracking-tight text-foreground">
            CodePhilic
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8 mx-auto">
          <a href="#services" className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors">Services</a>
          <a href="#work" className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors">Work</a>
          <a href="#about" className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors">About</a>
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="size-9 inline-flex items-center justify-center rounded-full text-foreground/50 hover:text-foreground transition-colors"
            style={{ border: "1px solid var(--border)" }}
            aria-label="Toggle theme"
          >
            {mounted ? (
              resolvedTheme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />
            ) : (
              <span className="size-4" />
            )}
          </button>
          <button
            className="hidden sm:inline-flex items-center justify-center h-9 px-5 rounded-full text-sm font-medium text-foreground transition-colors hover:bg-[#3B82F6]/10"
            style={{ border: "1px solid rgba(59,130,246,0.35)" }}
          >
            Book a Call
          </button>
        </div>
      </div>
    </header>
  );
}
