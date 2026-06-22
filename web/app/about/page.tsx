import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { MonoLabel } from "@/components/ui/mono-label";
import { CheckButton } from "@/components/ui/check-button";
import { Photo } from "@/components/ui/photo";
import { JsonLd } from "@/components/json-ld";
import { buildWebPage, wrapGraph } from "@/lib/schema";
import { BUSINESS } from "@/lib/business";

const PAGE_URL = `${BUSINESS.url}/about/`;
const TITLE = "About OperateAI";
const DESCRIPTION = "A Perth-based operator helping WA trade businesses get found and recommended by AI.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/about/" },
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd schema={wrapGraph([buildWebPage({ url: PAGE_URL, title: TITLE, description: DESCRIPTION })])} />
      <Section tone="paper-warm" className="pt-32 lg:pt-40" containerClassName="max-w-[1000px]">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.78fr]">
          <div>
            <MonoLabel tone="light">About</MonoLabel>
            <h1 className="mt-5 text-[length:var(--text-section)] font-extrabold leading-[1.08] tracking-[-0.025em] text-[var(--color-ink)]">
              A <span className="hl">real person</span> in Perth. Not an overseas agency.
            </h1>
            <div className="mt-8 grid max-w-[52ch] gap-5 text-[17px] leading-[1.7] text-[var(--color-ink-soft)]">
              <p>
                I&rsquo;m Taylor. I help WA trade businesses get found, recommended and booked in a world where
                customers ask AI who to call instead of scrolling Google.
              </p>
              <p>
                I&rsquo;ve spent the better part of three years working with these systems, so I know how they decide who
                gets recommended and who gets skipped. That&rsquo;s the whole game now, and most trades aren&rsquo;t set
                up for it yet.
              </p>
              <p>
                When you take the complimentary check, I look at your business myself. Not a template, not a call
                centre. No lock-in, no jargon. Just the fundamentals done properly, built for how customers search today
                and how AI is about to start booking them tomorrow.
              </p>
            </div>
            <div className="mt-10">
              <CheckButton variant="solid" />
            </div>
          </div>
          <Photo src="/photos/tools.jpg" alt="A WA tradie's toolbox" className="aspect-[4/5] w-full" />
        </div>
      </Section>
    </>
  );
}
