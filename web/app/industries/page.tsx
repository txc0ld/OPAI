import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { CTABand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { buildWebPage, wrapGraph } from "@/lib/schema";
import { BUSINESS } from "@/lib/business";

const PAGE_URL = `${BUSINESS.url}/industries/`;
const TITLE = "AI for [Industry] Businesses | OperateAI";
const DESCRIPTION =
  "AI agents, automation and training tailored to industries — accounting, real estate, trades, health, law and ecommerce. OperateAI helps reduce admin and improve operations.";

export const metadata: Metadata = {
  title: "AI by Industry | OperateAI",
  description: DESCRIPTION,
  alternates: { canonical: "/industries/" },
};

const INDUSTRIES = [
  { slug: "ai-for-accounting-firms", label: "Accounting firms" },
  { slug: "ai-for-real-estate-agencies", label: "Real estate agencies" },
  { slug: "ai-for-trades-businesses", label: "Trades businesses" },
  { slug: "ai-for-health-clinics", label: "Health clinics" },
  { slug: "ai-for-law-firms", label: "Law firms" },
  { slug: "ai-for-ecommerce-businesses", label: "Ecommerce businesses" },
];

export default function Page() {
  return (
    <>
      <JsonLd schema={wrapGraph([buildWebPage({ url: PAGE_URL, title: TITLE, description: DESCRIPTION })])} />

      <Section tone="paper">
        <SectionHeading
          eyebrow="Industries"
          title="AI by industry"
          lede="Practical AI agents, automation and training tailored to common Australian small- and medium-business sectors."
          as="h1"
          className="mb-10"
        />
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((i, idx) => (
            <Reveal as="li" key={i.slug} delay={idx * 50}>
              <Link
                href={`/industries/${i.slug}/`}
                className="hard-offset flex h-full flex-col border-[3px] border-black bg-[var(--color-surface)] p-6 hover:bg-[var(--color-primary-container)]"
              >
                <h2 className="font-heading text-[1.375rem] font-bold uppercase leading-[1.05] tracking-[-0.02em]">
                  AI for {i.label.toLowerCase()}
                </h2>
                <span className="mt-6 inline-flex w-fit border-t-[3px] border-black pt-3 font-heading text-[0.75rem] font-bold uppercase tracking-[0.08em]">
                  View →
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Section>

      <CTABand
        headline="Don't see your industry?"
        body="If your sector is not listed, it does not mean we cannot help. Book an audit and we will assess fit directly."
        primaryLabel="Book an AI Business Audit"
        primaryHref="/book-ai-audit/"
      />
    </>
  );
}
