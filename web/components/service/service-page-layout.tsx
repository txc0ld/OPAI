import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { buildService, buildWebPage, wrapGraph } from "@/lib/schema";

export type ServicePageLayoutProps = {
  pageUrl: string;
  title: string;
  description: string;
  h1: string;
  opening: ReactNode;
  /**
   * Hero image displayed alongside the H1 + opening copy on desktop, stacked
   * below on mobile. Use a 4:5-ish or square crop for best fit.
   */
  heroImage?: { src: string; alt: string };
  whoItIsFor?: ReactNode;
  included: { heading: string; items: string[] };
  secondaryList?: { heading: string; items: string[] };
  body?: ReactNode;
  conversion?: ReactNode;
  ctaLabel: string;
  ctaHref?: string;
  relatedLinks: { href: string; label: string }[];
  faq?: ReactNode;
  faqItems?: { question: string; answer: string }[];
};

export function ServicePageLayout({
  pageUrl,
  title,
  description,
  h1,
  opening,
  heroImage,
  whoItIsFor,
  included,
  secondaryList,
  body,
  conversion,
  ctaLabel,
  ctaHref = "/book-ai-audit/",
  relatedLinks,
  faq,
  faqItems,
}: ServicePageLayoutProps) {
  const nodes: Record<string, unknown>[] = [
    buildWebPage({ url: pageUrl, title, description }),
    buildService({ name: h1, url: pageUrl, description }),
  ];
  if (faqItems && faqItems.length > 0) {
    nodes.push({
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    });
  }

  return (
    <>
      <JsonLd schema={wrapGraph(nodes)} />

      {/* Hero — top padding clears the fixed 58/62px header */}
      <section className="bg-[var(--color-bg)] px-6 pt-[140px] pb-24 lg:px-12 lg:pt-[180px] lg:pb-32">
        <div
          className={
            heroImage
              ? "mx-auto grid w-full max-w-[1200px] items-center gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16"
              : "mx-auto w-full max-w-[1200px]"
          }
        >
          <div>
            <span className="eyebrow">OperateAI · Service</span>
            <h1 className="mt-6 max-w-[18ch] text-[clamp(40px,7vw,88px)] font-extrabold leading-[1] tracking-[-0.04em]">
              {h1}
            </h1>
            <div className="mt-8 max-w-[var(--measure)] space-y-5 text-[clamp(17px,2vw,21px)] leading-[1.55] text-[var(--color-w70)]">
              {opening}
            </div>
            <div className="mt-10 flex flex-wrap gap-[14px]">
              <Link
                href={ctaHref}
                className="inline-flex items-center gap-2 rounded-[7px] bg-[var(--color-fg)] px-6 py-3.5 text-[15px] font-semibold text-black transition-transform duration-300 hover:-translate-y-0.5"
              >
                {ctaLabel} →
              </Link>
              <Link
                href="/book-ai-audit/"
                className="inline-flex items-center gap-2 rounded-[7px] border border-[var(--color-w30)] px-6 py-3.5 text-[15px] font-semibold text-[var(--color-fg)] transition-colors duration-300 hover:border-[var(--color-fg)] hover:bg-[var(--color-w10)]"
              >
                Book an audit
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

      {whoItIsFor ? (
        <section className="border-t border-[var(--color-w10)] bg-[var(--color-bg)] px-6 py-24 lg:px-12 lg:py-32">
          <div className="mx-auto w-full max-w-[1200px]">
            <span className="eyebrow">Who this is for</span>
            <div className="reveal mt-8 max-w-[var(--measure)] space-y-5 text-[17px] leading-[1.65] text-[var(--color-w70)]">
              {whoItIsFor}
            </div>
          </div>
        </section>
      ) : null}

      <section className="border-t border-[var(--color-w10)] bg-[var(--color-bg)] px-6 py-24 lg:px-12 lg:py-32">
        <div className="mx-auto w-full max-w-[1200px]">
          <span className="eyebrow">Inside the offer</span>
          <h2 className="reveal mt-6 text-[clamp(28px,4vw,44px)] font-extrabold leading-[1.05] tracking-[-0.03em]">
            {included.heading}
          </h2>
          <ul className="mt-10 grid list-none gap-x-12 gap-y-3 sm:grid-cols-2">
            {included.items.map((item) => (
              <li key={item} className="reveal flex items-start gap-3 text-[15px] leading-[1.5] text-[var(--color-w70)]">
                <span className="mt-[7px] h-[7px] w-[7px] shrink-0 rounded-full bg-[var(--color-accent)]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {secondaryList ? (
        <section className="border-t border-[var(--color-w10)] bg-[var(--color-bg)] px-6 py-24 lg:px-12 lg:py-32">
          <div className="mx-auto w-full max-w-[1200px]">
            <span className="eyebrow">Examples</span>
            <h2 className="reveal mt-6 text-[clamp(28px,4vw,44px)] font-extrabold leading-[1.05] tracking-[-0.03em]">
              {secondaryList.heading}
            </h2>
            <ul className="mt-10 grid list-none gap-x-12 gap-y-3 sm:grid-cols-2">
              {secondaryList.items.map((item) => (
                <li key={item} className="reveal flex items-start gap-3 text-[15px] leading-[1.5] text-[var(--color-w70)]">
                  <span className="mt-[7px] h-[7px] w-[7px] shrink-0 rounded-full bg-[var(--color-accent)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {body ? (
        <section className="border-t border-[var(--color-w10)] bg-[var(--color-bg)] px-6 py-24 lg:px-12 lg:py-32">
          <div className="mx-auto w-full max-w-[1200px]">
            <div className="reveal max-w-[var(--measure)] space-y-5 text-[17px] leading-[1.65] text-[var(--color-w70)]">
              {body}
            </div>
          </div>
        </section>
      ) : null}

      {faq ? <div className="border-t border-[var(--color-w10)]">{faq}</div> : null}

      {conversion ? (
        <section className="border-t border-[var(--color-w10)] bg-[var(--color-bg)] px-6 py-24 lg:px-12 lg:py-32">
          <div className="mx-auto w-full max-w-[1200px]">
            <div className="reveal max-w-[var(--measure)] text-[clamp(17px,2vw,21px)] leading-[1.6] text-[var(--color-fg)]">
              {conversion}
            </div>
          </div>
        </section>
      ) : null}

      {/* CTA band */}
      <section className="border-t border-[var(--color-w10)] bg-[var(--color-bg)] px-6 py-24 text-center lg:px-12 lg:py-32">
        <div className="mx-auto w-full max-w-[820px]">
          <h2 className="reveal text-[clamp(32px,5vw,56px)] font-extrabold leading-[1.05] tracking-[-0.03em]">
            Start with an AI Business Audit
          </h2>
          <p className="reveal mt-[22px] text-[clamp(17px,2vw,21px)] leading-[1.55] text-[var(--color-w70)]">
            We review your current tools, workflows and opportunities, then identify where AI agents,
            automation or training can deliver practical value.
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

      {/* Related */}
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
