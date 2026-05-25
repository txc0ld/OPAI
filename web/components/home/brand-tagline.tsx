"use client";

import { useEffect, useRef } from "react";

const PARTS: { text: string; isDot: boolean }[] = [
  { text: "AUTOMATE", isDot: false },
  { text: "•", isDot: true },
  { text: "DELEGATE", isDot: false },
  { text: "•", isDot: true },
  { text: "ELEVATE", isDot: false },
];

// Reveal thresholds inside the section's scroll range (0..1). Words appear
// one by one, with the dots tucked between them.
const THRESHOLDS = [0.10, 0.25, 0.40, 0.55, 0.70];

/**
 * Tagline section that lives between the OPERATE Ai brand intro and the
 * AI AGENTS particle stage. Five elements (AUTOMATE · DELEGATE · ELEVATE)
 * fade in word-by-word driven directly off scroll position through the
 * section, so the user controls the cadence with their scroll.
 */
export function BrandTagline() {
  const sectionRef = useRef<HTMLElement>(null);
  const partRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / Math.max(1, total)));
      for (let i = 0; i < partRefs.current.length; i++) {
        const el = partRefs.current[i];
        if (!el) continue;
        const visible = progress >= THRESHOLDS[i];
        el.style.opacity = visible ? "1" : "0";
        el.style.transform = visible ? "translateY(0)" : "translateY(18px)";
      }
    };

    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative z-[3] h-[140vh]">
      <div className="pointer-events-none sticky top-0 flex h-screen items-center justify-center px-6">
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-center font-[family-name:Orbitron,sans-serif] text-[clamp(24px,5.5vw,48px)] font-black uppercase leading-none tracking-[-0.01em]">
          {PARTS.map((part, i) => (
            <span
              key={i}
              ref={(el) => {
                partRefs.current[i] = el;
              }}
              className={
                part.isDot
                  ? "text-[var(--color-accent)] text-[0.55em] leading-none"
                  : "text-[var(--color-fg)]"
              }
              style={{
                opacity: 0,
                transform: "translateY(18px)",
                transition:
                  "opacity 600ms cubic-bezier(.22,1,.36,1), transform 600ms cubic-bezier(.22,1,.36,1)",
                willChange: "opacity, transform",
              }}
            >
              {part.text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
