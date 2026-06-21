"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { PRIMARY_NAV } from "@/lib/nav";
import { cn } from "@/lib/cn";

function isActive(pathname: string | null, href: string) {
  if (!pathname) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href);
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

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 flex h-[58px] items-center justify-between px-[22px]",
        "border-b border-[var(--color-w10)] bg-black/40 backdrop-blur-[14px]",
        "lg:h-[62px] lg:px-10",
      )}
    >
      <Link href="/" className="flex items-center">
        <Logo />
      </Link>

      <nav aria-label="Primary" className="hidden items-center gap-[22px] lg:flex">
        {PRIMARY_NAV.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "font-mono text-[11px] uppercase tracking-[0.1em] transition-colors",
                active ? "text-[var(--color-fg)]" : "text-[var(--color-w50)] hover:text-[var(--color-fg)]",
              )}
            >
              {item.label}
            </Link>
          );
        })}
        <Link
          href="/check/"
          className={cn(
            "group relative ml-1 pl-[22px] font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--color-fg)] transition-colors",
            "before:absolute before:left-0 before:top-1/2 before:h-px before:w-[11px] before:-translate-y-1/2 before:bg-[var(--color-w30)] before:transition-all",
            "hover:text-[var(--color-accent)] hover:before:w-4 hover:before:bg-[var(--color-accent)]",
          )}
        >
          Free AI Check
        </Link>
      </nav>

      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((v) => !v)}
        className="flex h-full w-12 items-center justify-center text-[var(--color-fg)] transition-colors hover:text-[var(--color-accent)] lg:hidden"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <div
        id="mobile-nav"
        // Use `inert` (not `aria-hidden`) when closed: this makes the entire
        // subtree non-focusable AND inaccessible to assistive tech, which is
        // what we want for a hidden off-canvas nav. aria-hidden with focusable
        // children inside fails axe rule "aria-hidden-focus".
        inert={!open ? true : undefined}
        className={cn(
          "fixed inset-x-0 top-[58px] z-40 bg-black/95 backdrop-blur-[14px] lg:hidden",
          "origin-top transition-[opacity,transform] duration-200 ease-out",
          open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-4 opacity-0",
        )}
      >
        <nav aria-label="Mobile primary" className="px-6 py-8">
          <ul className="flex flex-col gap-1">
            {PRIMARY_NAV.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block py-4 font-bold text-[22px] leading-none tracking-[-0.02em]",
                      active ? "text-[var(--color-accent)]" : "text-[var(--color-fg)]",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li className="mt-4">
              <Link
                href="/check/"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-2 rounded-md bg-[var(--color-fg)] px-6 py-3.5 text-[15px] font-semibold text-black"
              >
                Free AI Check →
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
