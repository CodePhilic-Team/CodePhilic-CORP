"use client";

import { useEffect, useRef } from "react";

export function SpatialBackground() {
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!spotRef.current) return;
      spotRef.current.style.background = `radial-gradient(700px circle at ${e.clientX}px ${e.clientY}px, rgba(59,130,246,0.08), transparent 40%)`;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      {/* Base background — follows the active theme */}
      <div className="fixed inset-0 -z-30 bg-background" aria-hidden />

      {/* Animated mesh grid + atmospheric glow */}
      <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none" aria-hidden>
        {/* Grid pattern that slowly drifts */}
        <div className="absolute inset-[-10%] w-[120%] h-[120%] animate-mesh-drift opacity-[0.045]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="cp-grid" width="64" height="64" patternUnits="userSpaceOnUse">
                <path d="M 64 0 L 0 0 0 64" fill="none" stroke="#94A3B8" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cp-grid)" />
          </svg>
        </div>

        {/* Blue atmospheric center glow */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 55% at 50% 20%, rgba(59,130,246,0.13), transparent 70%)",
          }}
        />
      </div>

      {/* Cursor studio spotlight */}
      <div
        ref={spotRef}
        className="fixed inset-0 -z-10 pointer-events-none transition-none"
        aria-hidden
        style={{
          background:
            "radial-gradient(700px circle at 50% 50%, rgba(59,130,246,0.04), transparent 40%)",
        }}
      />
    </>
  );
}
