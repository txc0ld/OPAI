import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { MonoLabel } from "@/components/ui/mono-label";
import { CheckButton } from "@/components/ui/check-button";
import { JsonLd } from "@/components/json-ld";
import { buildWebPage, wrapGraph } from "@/lib/schema";
import { BUSINESS } from "@/lib/business";

const PAGE_URL = `${BUSINESS.url}/about/`;
const TITLE = "About";
const DESCRIPTION = "A Perth-based operator helping WA trade businesses get found and recommended by AI.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd schema={wrapGraph([buildWebPage({ url: PAGE_URL, title: TITLE, description: DESCRIPTION })])} />
      <Section tone="paper-warm" className="pt-32 lg:pt-40" containerClassName="max-w-[720px]">
        <MonoLabel tone="light">About</MonoLabel>
        <h1 className="mt-5 text-[length:var(--text-section)] font-extrabold leading-[1.08] tracking-[-0.025em] text-[var(--color-ink)]">
          A <span className="hl">real person</span> in Perth — not an overseas agency.
        </h1>
        <div className="mt-8 grid gap-5 text-[17px] leading-[1.7] text-[var(--color-ink-soft)]">
          <p>
            I&rsquo;m Taylor. I help WA trade businesses get found, recommended and booked in the new world where
            customers ask AI who to call instead of scrolling Google.
          </p>
          <p>
            I&rsquo;m not going to pretend I&rsquo;ve done a thousand of these. I&rsquo;m early, hungry, and I&rsquo;ll
            personally look at your business myself — which is exactly why the free check is worth taking. No call
            centre, no lock-in, no jargon. Just the fundamentals done properly, sorted for how customers search now and
            how AI is about to book them next.
          </p>
        </div>
        <div className="mt-10">
          <CheckButton variant="solid" />
        </div>
      </Section>
    </>
  );
}
