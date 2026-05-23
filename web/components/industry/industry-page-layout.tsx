import type { ReactNode } from "react";
import Link from "next/link";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/button";
import { Reveal } from "@/components/reveal";
import { CTABand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { buildWebPage, wrapGraph } from "@/lib/schema";

export type IndustryPageLayoutProps = {
  pageUrl: string;
  title: string;
  description: string;
  industry: string;     // e.g. "accounting firms"
  h1: string;           // e.g. "AI for accounting firms"
  opening: ReactNode;
  useCases: string[];
  relatedLinks: { href: string; label: string }[];
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
}: IndustryPageLayoutProps) {
  return (
    <>
      <JsonLd schema={wrapGraph([buildWebPage({ url: pageUrl, title, description })])} />

      <Section tone="paper">
        <Reveal>
          <p className="font-heading text-[0.75rem] font-bold uppercase tracking-[0.08em] text-[var(--color-muted)]">
            Industries — {industry}
          </p>
          <h1 className="mt-5 max-w-[18ch] font-heading text-[clamp(2.5rem,6vw,4rem)] font-bold leading-[0.95] tracking-[-0.04em]">
            {h1}
          </h1>
          <div className="mt-8 max-w-[var(--measure)] text-[1.0625rem] leading-[1.65] text-[var(--color-muted)] space-y-5">
            {opening}
          </div>
          <div className="mt-10">
            <Button as="a" href="/book-ai-audit/" size="lg">
              Discuss AI for your {industry} business
            </Button>
          </div>
        </Reveal>
      </Section>

      <Section tone="paper" className="border-t-[3px] border-black">
        <SectionHeading title={`Common AI use cases for ${industry}`} as="h2" className="mb-8" />
        <ul className="grid gap-x-10 gap-y-3 sm:grid-cols-2">
          {useCases.map((u) => (
            <li key={u} className="flex gap-3 text-[1rem] leading-[1.5]">
              <span className="mt-2 h-2 w-2 shrink-0 bg-[var(--color-primary-container)] ring-2 ring-black" />
              <span>{u}</span>
            </li>
          ))}
        </ul>
      </Section>

      <CTABand
        headline={`AI for ${industry}, built around your workflows`}
        body="Start with an AI Business Audit. We will identify the best opportunities, the risks to avoid, and the clearest next steps for implementation."
        primaryLabel="Book an AI Business Audit"
        primaryHref="/book-ai-audit/"
      />

      <Section tone="paper" className="border-t-[3px] border-black">
        <SectionHeading title="Related" as="h2" className="mb-6" />
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
