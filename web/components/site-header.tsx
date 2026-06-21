"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { PRIMARY_NAV, CHECK_CTA } from "@/lib/nav";
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
        "fixed inset-x-0 top-0 z-50 flex h-[60px] items-center justify-between px-6 text-[var(--color-fg)]",
        "border-b border-[var(--color-border)] bg-[rgba(10,10,10,0.72)] backdrop-blur-xl backdrop-saturate-150",
        "lg:h-[68px] lg:px-12",
      )}
    >
      <Link href="/" className="flex items-center" aria-label="OperateAI home">
        <Logo />
      </Link>

      <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
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
                  "absolute -bottom-1.5 left-0 h-px w-full origin-left bg-[var(--color-signal)] transition-transform duration-300",
                  active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                )}
              />
            </Link>
          );
        })}
        <Link
          href={CHECK_CTA.href}
          className="rounded-full bg-[var(--color-signal)] px-5 py-2 text-[13px] font-bold text-[var(--color-on-signal)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-8px_var(--color-signal-glow),0_0_0_1px_var(--color-signal)]"
        >
          {CHECK_CTA.label}
        </Link>
      </nav>

      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((v) => !v)}
        className="flex h-full w-12 items-center justify-center text-[var(--color-fg)] transition-colors hover:text-[var(--color-signal)] lg:hidden"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <div
        id="mobile-nav"
        inert={!open ? true : undefined}
        className={cn(
          "fixed inset-x-0 top-[60px] z-40 border-b border-[var(--color-border)] bg-[rgba(10,10,10,0.96)] backdrop-blur-xl lg:hidden",
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
                      "block py-4 text-[22px] font-extrabold leading-none tracking-[-0.02em]",
                      active ? "text-[var(--color-signal)]" : "text-[var(--color-fg)]",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li className="mt-4">
              <Link
                href={CHECK_CTA.href}
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-2 rounded-full bg-[var(--color-signal)] px-6 py-3.5 text-[15px] font-bold text-[var(--color-on-signal)]"
              >
                {CHECK_CTA.label} →
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
