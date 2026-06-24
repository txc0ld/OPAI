import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/section";
import { MonoLabel } from "@/components/ui/mono-label";
import { CheckButton } from "@/components/ui/check-button";
import { JsonLd } from "@/components/json-ld";
import { buildWebPage, buildBreadcrumb, buildItemList, wrapGraph } from "@/lib/schema";
import { BUSINESS } from "@/lib/business";
import { TRADES } from "@/lib/programmatic";

const URL = `${BUSINESS.url}/ai-visibility/`;
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
          buildWebPage({ url: URL, title: TITLE, description: DESCRIPTION }),
          buildBreadcrumb([
            { name: "Home", url: BUSINESS.url },
            { name: "AI visibility", url: URL },
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
                className="block rounded-xl border border-[var(--color-line-ink)] bg-white p-4 text-[15px] font-semibold capitalize text-[var(--color-ink)] transition-colors hover:border-[color-mix(in_oklab,var(--color-signal)_60%,var(--color-line-ink))]"
              >
                {t.namePlural}
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
      </Section>
    </>
  );
}
