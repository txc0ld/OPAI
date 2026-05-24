import Link from "next/link";
import { Logo } from "@/components/logo";
import { FOOTER_LEGAL, PRIMARY_NAV } from "@/lib/nav";
import { BUSINESS } from "@/lib/business";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--color-w10)] bg-[#060606] px-6 pt-20 pb-10 lg:px-12 lg:pt-24 lg:pb-12">
      <div className="mx-auto grid w-full max-w-[1200px] gap-12 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <Link href="/" className="inline-flex">
            <Logo />
          </Link>
          <p className="mt-4 max-w-[340px] text-sm leading-[1.6] text-[var(--color-w50)]">
            AI agents, automation, hosting and training for Australian small and medium businesses.
            Based in Perth, Western Australia. Working with businesses across Australia and online
            worldwide.
          </p>
        </div>

        <div>
          <h3 className="mb-[18px] font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-w50)]">
            Navigate
          </h3>
          <ul className="grid gap-[11px]">
            {PRIMARY_NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-[var(--color-w70)] transition-colors hover:text-[var(--color-fg)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/book-ai-audit/"
                className="text-sm text-[var(--color-w70)] transition-colors hover:text-[var(--color-fg)]"
              >
                Book audit
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-[18px] font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-w50)]">
            Legal
          </h3>
          <ul className="grid gap-[11px]">
            {FOOTER_LEGAL.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-[var(--color-w70)] transition-colors hover:text-[var(--color-fg)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-16 flex w-full max-w-[1200px] flex-wrap justify-between gap-2 border-t border-[var(--color-w10)] pt-7 font-mono text-[11px] tracking-[0.04em] text-[var(--color-w50)]">
        <span>
          {BUSINESS.abn} · © {BUSINESS.copyrightYear} {BUSINESS.legalName}
        </span>
        <span>Built in Perth · Delivered worldwide</span>
      </div>
    </footer>
  );
}
