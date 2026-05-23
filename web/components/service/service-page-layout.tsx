import type { ReactNode } from "react";
import Link from "next/link";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/button";
import { Reveal } from "@/components/reveal";
import { CTABand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { buildService, buildWebPage, wrapGraph } from "@/lib/schema";
import { BUSINESS } from "@/lib/business";

export type ServicePageLayoutProps = {
  // Page meta passed through for schema/title display.
  pageUrl: string;          // absolute (e.g. https://operateai.com.au/ai-agents-for-business/)
  title: string;            // SEO title
  description: string;      // meta description
  h1: string;
  // Hero opening copy under H1.
  opening: ReactNode;
  // Who it is for (paragraph or list).
  whoItIsFor?: ReactNode;
  // List of items (e.g. what we can integrate, what is included, agent examples, training topics).
  included: { heading: string; items: string[] };
  // Optional secondary list (e.g. agent examples).
  secondaryList?: { heading: string; items: string[] };
  // Body copy slot (e.g. "why managed setup matters", "clear explanation").
  body?: ReactNode;
  // Conversion copy above the CTA.
  conversion?: ReactNode;
  // CTA button text.
  ctaLabel: string;
  // CTA href — defaults to /book-ai-audit/.
  ctaHref?: string;
  // Internal links list (per spec §14).
  relatedLinks: { href: string; label: string }[];
  // Optional FAQ slot — pass <FaqSection ... emitSchema={false} /> here so the
  // service page schema graph below can include FAQPage too.
  faq?: ReactNode;
  // FAQ items used for schema generation (mirrors the visible <FaqSection> items).
  faqItems?: { question: string; answer: string }[];
};

export function ServicePageLayout({
  pageUrl,
  title,
  description,
  h1,
  opening,
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
  const nodes = [
    buildWebPage({ url: pageUrl, title, description }),
    buildService({ name: h1, url: pageUrl, description }),
  ];
  if (faqItems && faqItems.length > 0) {
    // Inline FAQPage schema in the same graph rather than the FaqSection emitting separately.
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

      {/* Hero */}
      <Section tone="paper">
        <Reveal>
          <p className="font-heading text-[0.75rem] font-bold uppercase tracking-[0.08em] text-[var(--color-muted)]">
            {BUSINESS.name} — service
          </p>
          <h1 className="mt-5 max-w-[18ch] font-heading text-[clamp(2.5rem,6vw,4rem)] font-bold leading-[0.95] tracking-[-0.04em]">
            {h1}
          </h1>
          <div className="mt-8 max-w-[var(--measure)] text-[1.0625rem] leading-[1.65] text-[var(--color-muted)] space-y-5">
            {opening}
          </div>
          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row">
            <Button as="a" href={ctaHref} size="lg">
              {ctaLabel}
            </Button>
          </div>
        </Reveal>
      </Section>

      {/* Who it is for */}
      {whoItIsFor ? (
        <Section tone="paper" className="border-t-[3px] border-black">
          <SectionHeading title="Who this is for" as="h2" className="mb-6" />
          <div className="max-w-[var(--measure)] space-y-5 text-[1.0625rem] leading-[1.65] text-[var(--color-muted)]">
            {whoItIsFor}
          </div>
        </Section>
      ) : null}

      {/* Included list */}
      <Section tone="paper" className="border-t-[3px] border-black">
        <SectionHeading title={included.heading} as="h2" className="mb-8" />
        <ul className="grid gap-x-10 gap-y-3 sm:grid-cols-2">
          {included.items.map((item) => (
            <li key={item} className="flex gap-3 text-[1rem] leading-[1.5]">
              <span className="mt-2 h-2 w-2 shrink-0 bg-[var(--color-primary-container)] ring-2 ring-black" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Secondary list (e.g. agent examples) */}
      {secondaryList ? (
        <Section tone="paper" className="border-t-[3px] border-black">
          <SectionHeading title={secondaryList.heading} as="h2" className="mb-8" />
          <ul className="grid gap-x-10 gap-y-3 sm:grid-cols-2">
            {secondaryList.items.map((item) => (
              <li key={item} className="flex gap-3 text-[1rem] leading-[1.5]">
                <span className="mt-2 h-2 w-2 shrink-0 bg-[var(--color-primary-container)] ring-2 ring-black" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {/* Body slot */}
      {body ? (
        <Section tone="paper" className="border-t-[3px] border-black">
          <div className="max-w-[var(--measure)] space-y-5 text-[1.0625rem] leading-[1.65] text-[var(--color-muted)]">
            {body}
          </div>
        </Section>
      ) : null}

      {/* FAQ slot */}
      {faq ? <div className="border-t-[3px] border-black">{faq}</div> : null}

      {/* Conversion */}
      {conversion ? (
        <Section tone="paper" className="border-t-[3px] border-black">
          <div className="max-w-[var(--measure)] text-[1.125rem] leading-[1.6]">
            {conversion}
          </div>
        </Section>
      ) : null}

      {/* CTA band */}
      <CTABand
        headline="Start with an AI Business Audit"
        body="We review your current tools, workflows and opportunities, then identify where AI agents, automation or training can deliver practical value."
        primaryLabel="Book an AI Business Audit"
        primaryHref="/book-ai-audit/"
      />

      {/* Related links */}
      <Section tone="paper" className="border-t-[3px] border-black">
        <SectionHeading title="Related services" as="h2" className="mb-6" />
        <ul className="flex flex-wrap gap-3">
          {relatedLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="inline-flex items-center border-[3px] border-black bg-[var(--color-surface)] px-5 py-3 font-heading text-[0.875rem] font-bold uppercase tracking-[0.06em] hover:bg-black hover:text-white"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
