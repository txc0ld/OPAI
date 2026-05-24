import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { buildWebPage, wrapGraph } from "@/lib/schema";

export type IndustryPageLayoutProps = {
  pageUrl: string;
  title: string;
  description: string;
  industry: string;
  h1: string;
  opening: ReactNode;
  useCases: string[];
  relatedLinks: { href: string; label: string }[];
  /** Optional hero image displayed alongside the H1 + opening. */
  heroImage?: { src: string; alt: string };
};

export function IndustryPageLayout({
  pageUrl,
  title,
  description,
  industry,
  h1,
  opening,
  useCases,
  relatedLinks,
  heroImage,
}: IndustryPageLayoutProps) {
  return (
    <>
      <JsonLd schema={wrapGraph([buildWebPage({ url: pageUrl, title, description })])} />

      <section className="bg-[var(--color-bg)] px-6 pt-[140px] pb-24 lg:px-12 lg:pt-[180px] lg:pb-32">
        <div
          className={
            heroImage
              ? "mx-auto grid w-full max-w-[1200px] items-center gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16"
              : "mx-auto w-full max-w-[1200px]"
          }
        >
          <div>
            <span className="eyebrow">OperateAI · Industries · {industry}</span>
            <h1 className="mt-6 max-w-[18ch] text-[clamp(40px,7vw,88px)] font-extrabold leading-[1] tracking-[-0.04em]">
              {h1}
            </h1>
            <div className="mt-8 max-w-[var(--measure)] space-y-5 text-[clamp(17px,2vw,21px)] leading-[1.55] text-[var(--color-w70)]">
              {opening}
            </div>
            <div className="mt-10">
              <Link
                href="/book-ai-audit/"
                className="inline-flex items-center gap-2 rounded-[7px] bg-[var(--color-fg)] px-6 py-3.5 text-[15px] font-semibold text-black transition-transform duration-300 hover:-translate-y-0.5"
              >
                Discuss AI for your {industry} business →
              </Link>
            </div>
          </div>
          {heroImage ? (
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-[var(--color-w10)] bg-[#060606]">
              <Image
                src={heroImage.src}
                alt={heroImage.alt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
          ) : null}
        </div>
      </section>

      <section className="border-t border-[var(--color-w10)] bg-[var(--color-bg)] px-6 py-24 lg:px-12 lg:py-32">
        <div className="mx-auto w-full max-w-[1200px]">
          <span className="eyebrow">Use cases</span>
          <h2 className="reveal mt-6 text-[clamp(28px,4vw,44px)] font-extrabold leading-[1.05] tracking-[-0.03em]">
            Common AI use cases for {industry}
          </h2>
          <ul className="mt-10 grid list-none gap-x-12 gap-y-3 sm:grid-cols-2">
            {useCases.map((u, i) => (
              <li key={u} className="reveal flex items-start gap-[14px] border-b border-[var(--color-w10)] py-[18px] text-[16px] text-[var(--color-w70)]">
                <span className="min-w-[24px] font-mono text-[12px] text-[var(--color-w50)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{u}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-[var(--color-w10)] bg-[var(--color-bg)] px-6 py-24 text-center lg:px-12 lg:py-32">
        <div className="mx-auto w-full max-w-[820px]">
          <h2 className="reveal text-[clamp(32px,5vw,56px)] font-extrabold leading-[1.05] tracking-[-0.03em]">
            AI for {industry}, built around your workflows
          </h2>
          <p className="reveal mt-[22px] text-[clamp(17px,2vw,21px)] leading-[1.55] text-[var(--color-w70)]">
            Start with an AI Business Audit. We will identify the best opportunities, the risks to
            avoid, and the clearest next steps for implementation.
          </p>
          <div className="reveal mt-10 flex justify-center">
            <Link
              href="/book-ai-audit/"
              className="inline-flex items-center gap-2 rounded-[7px] bg-[var(--color-fg)] px-6 py-3.5 text-[15px] font-semibold text-black transition-transform duration-300 hover:-translate-y-0.5"
            >
              Book an AI Business Audit →
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--color-w10)] bg-[var(--color-bg)] px-6 py-24 lg:px-12 lg:py-32">
        <div className="mx-auto w-full max-w-[1200px]">
          <span className="eyebrow">Related</span>
          <ul className="reveal mt-8 flex flex-wrap gap-3">
            {relatedLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex items-center rounded-[7px] border border-[var(--color-w30)] px-5 py-3 font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--color-fg)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
