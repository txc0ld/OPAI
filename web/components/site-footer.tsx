import Link from "next/link";
import { Logo } from "@/components/logo";
import { FOOTER_LEGAL, PRIMARY_NAV } from "@/lib/nav";
import { BUSINESS } from "@/lib/business";
import { cn } from "@/lib/cn";

export function SiteFooter() {
  return (
    <footer className="border-t-[3px] border-black bg-black text-white">
      <div className="mx-auto w-full max-w-[var(--container-max)] px-[clamp(1.5rem,4vw,3rem)] py-12">
        <div className="grid grid-cols-1 border-[3px] border-white md:grid-cols-12">
          <div className="border-b-[3px] border-white p-6 md:col-span-5 md:border-b-0 md:border-r-[3px]">
            <Link href="/" aria-label="OperateAI home" className="inline-block hover:text-[var(--color-primary-container)]">
              <Logo variant="stacked" tone="paper" />
            </Link>
            <p className="mt-8 max-w-[28ch] font-heading text-[2rem] font-bold uppercase leading-[0.95] tracking-[-0.04em]">
              AI agents, automation, hosting and training for Australian small and medium businesses.
            </p>
            <p className="mt-6 max-w-[36ch] font-sans text-[0.9375rem] leading-[1.55] text-white/70">
              Based in Perth, Western Australia. Supporting businesses across Australia and online worldwide.
            </p>
          </div>

          <div className="border-b-[3px] border-white p-6 md:col-span-4 md:border-b-0 md:border-r-[3px]">
            <p className="font-heading text-[0.75rem] font-bold uppercase tracking-[0.08em] text-[var(--color-primary-container)]">
              Navigate
            </p>
            <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {PRIMARY_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-heading text-[0.8125rem] font-bold uppercase tracking-[0.06em] underline-offset-[6px] hover:text-[var(--color-primary-container)] hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/book-ai-audit/"
                  className="font-heading text-[0.8125rem] font-bold uppercase tracking-[0.06em] underline-offset-[6px] hover:text-[var(--color-primary-container)] hover:underline"
                >
                  Book audit
                </Link>
              </li>
            </ul>
          </div>

          <div className="p-6 md:col-span-3">
            <p className="font-heading text-[0.75rem] font-bold uppercase tracking-[0.08em] text-[var(--color-primary-container)]">
              Legal
            </p>
            <ul className="mt-6 flex flex-col gap-3">
              {FOOTER_LEGAL.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-heading text-[0.8125rem] font-bold uppercase tracking-[0.06em] underline-offset-[6px] hover:text-[var(--color-primary-container)] hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-8 font-mono text-[0.75rem] tracking-[0.04em] text-white/70">
              {BUSINESS.abn}
            </p>
          </div>
        </div>

        <div
          className={cn(
            "mt-8 flex flex-col gap-3 border-t-[3px] border-white pt-5",
            "md:flex-row md:items-center md:justify-between",
          )}
        >
          <p className="font-mono text-[0.75rem] tracking-[0.04em] text-white/70">
            &copy; {BUSINESS.copyrightYear} {BUSINESS.legalName}. All rights reserved.
          </p>
          <p className="font-heading text-[0.75rem] font-bold uppercase tracking-[0.08em] text-[var(--color-primary-container)]">
            Built in Perth · Delivered worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}
