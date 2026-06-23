import Link from "next/link";
import { Logo } from "@/components/logo";
import { FOOTER_LEGAL, PRIMARY_NAV, CHECK_CTA } from "@/lib/nav";
import { BUSINESS } from "@/lib/business";

export function SiteFooter() {
  return (
    <footer className="grain relative border-t border-[var(--color-border)] bg-[var(--color-void)] px-6 pt-20 pb-10 text-[var(--color-fg)] lg:px-12 lg:pt-24 lg:pb-12">
      <div className="relative z-[1] mx-auto grid w-full max-w-[var(--container-max)] gap-12 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <Link href="/" className="inline-flex">
            <Logo />
          </Link>
          <p className="mt-5 max-w-[360px] text-[15px] leading-[1.6] text-[var(--color-fg-variant)]">
            We help Perth local service businesses get found, recommended and booked by AI, sorted for how customers search now and how AI is about to book them next.
          </p>
        </div>

        <div>
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-fg-variant)]">
            Navigate
          </p>
          <ul className="grid gap-3">
            {[...PRIMARY_NAV, CHECK_CTA].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[15px] text-[var(--color-fg-variant)] transition-colors hover:text-[var(--color-signal)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-fg-variant)]">
            Legal
          </p>
          <ul className="grid gap-3">
            {FOOTER_LEGAL.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[15px] text-[var(--color-fg-variant)] transition-colors hover:text-[var(--color-signal)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative z-[1] mx-auto mt-16 flex w-full max-w-[var(--container-max)] flex-wrap justify-between gap-2 border-t border-[var(--color-border)] pt-7 text-[12px] tracking-[0.02em] text-[var(--color-fg-variant)]">
        <span>
          {BUSINESS.abn}, © {BUSINESS.copyrightYear} {BUSINESS.legalName}
        </span>
        <span>Perth, WA</span>
      </div>
    </footer>
  );
}
