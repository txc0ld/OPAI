"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { PRIMARY_NAV } from "@/lib/nav";
import { Logo } from "@/components/logo";

function isActive(pathname: string | null, href: string) {
  if (!pathname) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

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

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full",
        "bg-[var(--color-paper)]",
        "border-b border-[var(--color-rule)]",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-[var(--container-max)] items-center justify-between px-6 md:h-20 lg:px-10">
        <Link href="/" aria-label="OperateAI home" className="group inline-flex items-baseline">
          <Logo variant="compact" tone="ink" />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-9 md:flex">
          {PRIMARY_NAV.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative inline-block text-[0.9375rem] leading-none text-[var(--color-ink)] transition-colors",
                  "hover:text-[var(--color-ink-2)]",
                  "after:absolute after:left-0 after:right-0 after:-bottom-2 after:h-px after:origin-left after:scale-x-0 after:bg-[var(--color-ink)] after:transition-transform after:duration-200 after:ease-out",
                  "hover:after:scale-x-100",
                  active && "after:scale-x-100",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/book-ai-audit/"
            className={cn(
              "inline-flex items-center justify-center",
              "border border-[var(--color-ink)] px-5 py-2.5",
              "text-[0.875rem] leading-none tracking-[0.01em] text-[var(--color-ink)]",
              "transition-colors duration-200",
              "hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)]",
              "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-ink)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-paper)]",
            )}
          >
            Book audit
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "inline-flex h-10 w-10 items-center justify-center md:hidden",
            "text-[var(--color-ink)]",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-ink)]",
          )}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        id="mobile-nav"
        aria-hidden={!open}
        className={cn(
          "md:hidden",
          "fixed inset-x-0 top-16 z-40 origin-top",
          "border-b border-[var(--color-rule)] bg-[var(--color-paper)]",
          "transition-[opacity,transform] duration-300 ease-out",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0",
        )}
      >
        <nav
          aria-label="Mobile primary"
          className="mx-auto flex w-full max-w-[var(--container-max)] flex-col px-6 py-8"
        >
          <ul className="flex flex-col divide-y divide-[var(--color-rule)]">
            {PRIMARY_NAV.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between py-5",
                      "font-serif text-[1.5rem] leading-none tracking-[-0.015em] text-[var(--color-ink)]",
                    )}
                  >
                    <span className={cn(active && "underline underline-offset-[6px] decoration-[1px]")}>
                      {item.label}
                    </span>
                    <span className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[var(--color-muted)]">
                      {String(PRIMARY_NAV.indexOf(item) + 1).padStart(2, "0")}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link
            href="/book-ai-audit/"
            className={cn(
              "mt-8 inline-flex w-full items-center justify-center",
              "border border-[var(--color-ink)] px-5 py-4",
              "text-[0.9375rem] leading-none tracking-[0.01em] text-[var(--color-ink)]",
              "transition-colors duration-200",
              "hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)]",
            )}
          >
            Book audit
          </Link>
        </nav>
      </div>
    </header>
  );
}
