"use client";

import { useEffect } from "react";

/**
 * Mounts a single IntersectionObserver that adds `.show` to elements with
 * the `.reveal` class as they enter the viewport. Used site-wide via
 * <RootLayout>. Skipped automatically by the reduced-motion CSS rule.
 */
export function ScrollReveal() {
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("show"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("show");
            io.unobserve(en.target);
          }
        }),
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
