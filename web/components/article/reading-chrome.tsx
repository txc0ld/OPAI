"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CHECK_CTA } from "@/lib/nav";

// Reading progress bar + a sticky conversion bar that slides in once the reader
// is invested (past the fold) and hides again near the end so it never nags.
export function ReadingChrome() {
  const [progress, setProgress] = useState(0);
  const [showBar, setShowBar] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const doc = document.documentElement;
        const max = doc.scrollHeight - doc.clientHeight;
        const pct = max > 0 ? doc.scrollTop / max : 0;
        setProgress(pct);
        setShowBar(doc.scrollTop > 700 && pct < 0.92);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className="fixed inset-x-0 top-[60px] z-40 h-[3px] bg-transparent lg:top-[68px]" aria-hidden>
        <div
          className="h-full bg-[var(--color-signal)] transition-[width] duration-150 ease-out"
          style={{ width: `${(progress * 100).toFixed(2)}%` }}
        />
      </div>

      <div
        className={cnBar(showBar)}
        style={{ transitionTimingFunction: "var(--ease)" }}
      >
        <div className="mx-auto flex w-full max-w-[var(--container-max)] items-center justify-between gap-4">
          <span className="hidden text-[14px] font-semibold text-[var(--color-fg)] sm:block">
            See how AI ranks your business — free, one business day.
          </span>
          <span className="text-[14px] font-semibold text-[var(--color-fg)] sm:hidden">Free AI check</span>
          <Link
            href={CHECK_CTA.href}
            className="inline-flex flex-none items-center gap-2 rounded-full bg-[var(--color-signal)] px-5 py-2.5 text-[14px] font-bold text-[var(--color-on-signal)] transition-transform duration-300 hover:-translate-y-0.5"
          >
            Check my business
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </>
  );
}

function cnBar(show: boolean) {
  return [
    "fixed inset-x-0 bottom-0 z-40 border-t border-[var(--color-border)] bg-[rgba(10,10,10,0.86)] px-6 py-3.5 backdrop-blur-xl transition-transform duration-500 lg:px-12",
    show ? "translate-y-0" : "translate-y-full",
  ].join(" ");
}
