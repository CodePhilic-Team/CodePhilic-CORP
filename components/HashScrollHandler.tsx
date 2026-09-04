"use client";

import { useEffect } from "react";

/**
 * Handles smooth scrolling to section anchors on direct page loads and hash changes.
 * Especially useful when visiting clean URLs like /services or /about which redirect to /#services or /#about.
 */
export function HashScrollHandler() {
  useEffect(() => {
    const scrollToTarget = () => {
      const hash = window.location.hash;
      if (!hash) return;

      const element = document.querySelector(hash);
      if (element) {
        // Small delay to allow layout recalculation and animation hydration
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 120);
      }
    };

    // Execute on initial mount
    scrollToTarget();

    // Re-execute if hash changes in the URL bar or via navigation
    window.addEventListener("hashchange", scrollToTarget);
    return () => {
      window.removeEventListener("hashchange", scrollToTarget);
    };
  }, []);

  return null;
}
