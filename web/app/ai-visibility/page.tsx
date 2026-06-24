import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/section";
import { MonoLabel } from "@/components/ui/mono-label";
import { CheckButton } from "@/components/ui/check-button";
import { JsonLd } from "@/components/json-ld";
import { buildWebPage, buildBreadcrumb, buildItemList, wrapGraph } from "@/lib/schema";
import { StepsStrip } from "@/components/programmatic/steps-strip";
import { BUSINESS } from "@/lib/business";
import { TRADES } from "@/lib/programmatic";

const PAGE_URL = `${BUSINESS.url}/ai-visibility/`;
const TITLE = "AI visibility for Perth trades";
const DESCRIPTION =
  "AI now picks which local business to recommend. See how Perth trades get found, recommended and booked by AI, by trade and suburb.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/ai-visibility/" },
  openGraph: { type: "website", title: TITLE, description: DESCRIPTION },
};

export default function AiVisibilityIndex() {
  const items = TRADES.map((t) => ({
    name: `AI visibility for ${t.namePlural}`,
    url: `${BUSINESS.url}/ai-visibility/${t.slug}/`,
  }));

  return (
    <>
      <JsonLd
        schema={wrapGraph([
          buildWebPage({ url: PAGE_URL, title: TITLE, description: DESCRIPTION }),
          buildBreadcrumb([
            { name: "Home", url: BUSINESS.url },
            { name: "AI visibility", url: PAGE_URL },
          ]),
          buildItemList(items),
        ])}
      />

      <Section tone="paper" className="pt-32 lg:pt-40">
        <MonoLabel tone="light">AI visibility</MonoLabel>
        <h1 className="mt-5 max-w-[20ch] text-[length:var(--text-section)] font-extrabold leading-[1.05] tracking-[-0.025em] text-[var(--color-ink)]">
          AI decides who gets recommended. We get you on the shortlist.
        </h1>
        <p className="mt-5 max-w-[58ch] text-[17px] leading-[1.6] text-[var(--color-ink-soft)]">
          Pick your trade to see how AI picks in your Perth suburbs, and the fixes that put you in front.
        </p>

        <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {TRADES.map((t) => (
            <li key={t.slug}>
              <Link
                href={`/ai-visibility/${t.slug}/`}
                className="group flex items-center justify-between gap-3 rounded-xl border border-[var(--color-line-ink)] bg-white p-4 text-[15px] font-semibold capitalize text-[var(--color-ink)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[color-mix(in_oklab,var(--color-signal)_60%,var(--color-line-ink))] hover:shadow-[0_16px_32px_-24px_rgba(18,18,18,0.5)]"
              >
                {t.namePlural}
                <span
                  aria-hidden
                  className="text-[var(--color-ink-soft)] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-[var(--color-ink)]"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="dark">
        <div className="text-center">
          <MonoLabel className="justify-center">Free AI Visibility Check</MonoLabel>
          <p className="mx-auto mt-5 max-w-[48ch] text-[length:var(--text-lede)] leading-[1.5] text-[var(--color-fg)]">
            See what AI says about your business today.
          </p>
          <div className="mt-8 flex justify-center">
            <CheckButton />
          </div>
        </div>
        <StepsStrip />
      </Section>
    </>
  );
}
