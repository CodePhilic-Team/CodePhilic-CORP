"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMounted(true);

    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });

    // Highlight active section on scroll
    const sections = NAV_LINKS.map(
      (l) => document.querySelector(l.href) as HTMLElement | null,
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((el) => el && observer.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    setActive(href);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
          background: scrolled
            ? "color-mix(in srgb, var(--background) 80%, transparent)"
            : "transparent",
          borderBottom: scrolled
            ? "1px solid var(--border)"
            : "1px solid transparent",
        }}
      >
        <div className="flex items-center w-full max-w-7xl mx-auto px-6 py-4">
          {/* Logo */}
          <Link
            href="/"
            className="p-1 border-2 flex items-center gap-2.5 shrink-0 rounded-lg transition-colors"
            style={{
              borderColor:
                resolvedTheme === "dark" ? "#ffffff" : "var(--border)",
            }}
          >
            <img
              src="/CodePhilic.jpg"
              alt="CodePhilic Logo"
              className="h-9 w-auto"
            />
            {/* <span className="font-heading font-semibold text-lg tracking-tight text-foreground">
              CodePhilic
            </span> */}
          </Link>

          {/* Desktop pill nav — centred */}
          <nav
            className="hidden md:flex items-center gap-1 mx-auto rounded-full px-2 py-1.5"
            style={{
              background: "var(--glass-bg)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid var(--glass-border)",
            }}
          >
            {NAV_LINKS.map((link) => {
              const isActive = active === link.href;
              return (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className="relative px-4 py-1.5 text-sm font-medium rounded-full transition-colors duration-200"
                  style={{
                    color: isActive ? "#fff" : "var(--foreground)",
                    opacity: isActive ? 1 : 0.55,
                  }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full"
                      style={{ background: "#3B82F6" }}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right controls */}
          <div className="ml-auto flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
              className="size-9 inline-flex items-center justify-center rounded-full text-foreground/50 hover:text-foreground transition-colors"
              style={{ border: "1px solid var(--border)" }}
              aria-label="Toggle theme"
            >
              {mounted ? (
                resolvedTheme === "dark" ? (
                  <Sun className="size-4" />
                ) : (
                  <Moon className="size-4" />
                )
              ) : (
                <span className="size-4" />
              )}
            </button>

            {/* CTA */}
            <button
              onClick={() => handleNav("#contact")}
              className="hidden sm:inline-flex items-center justify-center h-9 px-5 rounded-full text-sm font-medium text-white transition-all hover:brightness-110"
              style={{
                background: "#3B82F6",
                filter: "drop-shadow(0 0 8px rgba(59,130,246,0.4))",
              }}
            >
              Book a Call
            </button>

            {/* Mobile hamburger */}
            <button
              className="md:hidden size-9 inline-flex items-center justify-center rounded-full text-foreground/60 hover:text-foreground transition-colors"
              style={{ border: "1px solid var(--border)" }}
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="size-4" />
              ) : (
                <Menu className="size-4" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-[65px] left-4 right-4 z-40 rounded-2xl overflow-hidden md:hidden"
            style={{
              background:
                "color-mix(in srgb, var(--background) 90%, transparent)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid var(--glass-border)",
            }}
          >
            <nav className="flex flex-col p-3 gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = active === link.href;
                return (
                  <button
                    key={link.href}
                    onClick={() => handleNav(link.href)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-left transition-colors"
                    style={{
                      background: isActive
                        ? "rgba(59,130,246,0.12)"
                        : "transparent",
                      color: isActive ? "#3B82F6" : "var(--foreground)",
                    }}
                  >
                    {isActive && (
                      <span className="size-1.5 rounded-full bg-[#3B82F6] shrink-0" />
                    )}
                    {link.label}
                  </button>
                );
              })}
              <div
                className="mt-2 pt-2"
                style={{ borderTop: "1px solid var(--border)" }}
              >
                <button
                  onClick={() => handleNav("#contact")}
                  className="w-full flex items-center justify-center h-10 rounded-xl text-sm font-medium text-white"
                  style={{ background: "#3B82F6" }}
                >
                  Book a Call
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
