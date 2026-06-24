"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "@/components/logo";
import { PRIMARY_NAV, CHECK_CTA } from "@/lib/nav";
import { cn } from "@/lib/cn";

const EASE = [0.16, 1, 0.3, 1] as const;

function isActive(pathname: string | null, href: string) {
  if (!pathname) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href);
}

// true once the page is scrolled past `threshold`px.
function useScrolled(threshold = 24): boolean {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled(24);

  // Lock body scroll + close on Escape while the drawer is open.
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 text-[var(--color-fg)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          scrolled
            ? "border-b border-[var(--color-border)] bg-[rgba(10,10,10,0.8)] py-2.5 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)] backdrop-blur-xl backdrop-saturate-150"
            : "border-b border-transparent bg-[rgba(10,10,10,0.4)] py-4 backdrop-blur-md",
        )}
      >
        <div className="relative flex items-center justify-between px-6 lg:px-12">
          {/* Brand */}
          <Link
            href="/"
            aria-label="OperateAI home"
            onClick={() => setOpen(false)}
            className="relative z-50 flex items-center transition-opacity hover:opacity-80"
          >
            <Logo />
          </Link>

          {/* Desktop links — centered */}
          <nav
            aria-label="Primary"
            className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-8 lg:flex"
          >
            {PRIMARY_NAV.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "group relative text-[13px] font-semibold tracking-tight transition-colors",
                    active ? "text-[var(--color-fg)]" : "text-[var(--color-fg-variant)] hover:text-[var(--color-fg)]",
                  )}
                >
                  {item.label}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute -bottom-1.5 left-0 h-px w-full origin-left bg-[var(--color-signal)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right: CTA + hamburger */}
          <div className="flex items-center gap-4">
            <Link
              href={CHECK_CTA.href}
              className="hidden rounded-full bg-[var(--color-signal)] px-5 py-2 text-[13px] font-bold text-[var(--color-on-signal)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-8px_var(--color-signal-glow),0_0_0_1px_var(--color-signal)] lg:block"
            >
              {CHECK_CTA.label}
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-controls="mobile-nav"
              aria-expanded={open}
              className="relative z-50 flex h-10 w-10 items-center justify-center lg:hidden"
            >
              <span className="relative h-4 w-6" aria-hidden>
                <span
                  className={cn(
                    "absolute left-0 h-0.5 w-full origin-center bg-[var(--color-fg)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    open ? "top-2 rotate-45" : "top-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-2 h-0.5 w-full bg-[var(--color-fg)] transition-all duration-300",
                    open ? "scale-x-0 opacity-0" : "opacity-100",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 h-0.5 w-full origin-center bg-[var(--color-fg)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    open ? "top-2 -rotate-45" : "top-4",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-md lg:hidden"
            />
            <motion.div
              id="mobile-nav"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 220 }}
              className="grain fixed inset-y-0 right-0 z-40 flex w-full max-w-sm flex-col overflow-y-auto border-l border-[var(--color-border)] bg-[var(--color-void)] px-10 pt-24 pb-12 lg:hidden"
            >
              <div className="my-auto">
              <nav aria-label="Mobile primary" className="flex flex-col gap-7">
                {PRIMARY_NAV.map((item, i) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 24, transition: { delay: i * 0.03 } }}
                      transition={{ delay: 0.08 + i * 0.06, duration: 0.6, ease: EASE }}
                    >
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "block w-fit text-[32px] font-extrabold leading-none tracking-[-0.02em] transition-colors",
                          active ? "text-[var(--color-signal)]" : "text-[var(--color-fg)] hover:text-[var(--color-signal)]",
                        )}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-12"
              >
                <Link
                  href={CHECK_CTA.href}
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--color-signal)] px-6 py-3.5 text-[15px] font-bold text-[var(--color-on-signal)]"
                >
                  {CHECK_CTA.label} →
                </Link>
              </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
