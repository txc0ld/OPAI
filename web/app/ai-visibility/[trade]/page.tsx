import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Section } from "@/components/ui/section";
import { MonoLabel } from "@/components/ui/mono-label";
import { CheckButton } from "@/components/ui/check-button";
import { JsonLd } from "@/components/json-ld";
import { buildWebPage, buildBreadcrumb, buildItemList, wrapGraph } from "@/lib/schema";
import { BUSINESS } from "@/lib/business";
import { SUBURBS, TRADES, getTrade } from "@/lib/programmatic";

export function generateStaticParams() {
  return TRADES.map((t) => ({ trade: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ trade: string }> }): Promise<Metadata> {
  const { trade: tSlug } = await params;
  const trade = getTrade(tSlug);
  if (!trade) return {};
  const title = `AI visibility for ${trade.namePlural} in Perth`;
  const description = `How ${trade.namePlural} across Perth get found, recommended and booked by AI, suburb by suburb.`;
  return {
    title,
    description,
    alternates: { canonical: `/ai-visibility/${tSlug}/` },
    openGraph: { type: "website", title, description },
  };
}

export default async function TradeHub({ params }: { params: Promise<{ trade: string }> }) {
  const { trade: tSlug } = await params;
  const trade = getTrade(tSlug);
  if (!trade) notFound();

  const url = `${BUSINESS.url}/ai-visibility/${tSlug}/`;
  const title = `AI visibility for ${trade.namePlural} in Perth`;
  const items = SUBURBS.map((s) => ({
    name: `${trade.namePlural} in ${s.name}`,
    url: `${BUSINESS.url}/ai-visibility/${tSlug}/${s.slug}/`,
  }));

  return (
    <>
      <JsonLd
        schema={wrapGraph([
          buildWebPage({ url, title, description: `How ${trade.namePlural} across Perth get recommended by AI.` }),
          buildBreadcrumb([
            { name: "Home", url: BUSINESS.url },
            { name: "AI visibility", url: `${BUSINESS.url}/ai-visibility/` },
            { name: trade.namePlural, url },
          ]),
          buildItemList(items),
        ])}
      />

      <Section tone="paper" className="pt-32 lg:pt-40">
        <MonoLabel tone="light">AI visibility · {trade.namePlural}</MonoLabel>
        <h1 className="mt-5 max-w-[22ch] text-[length:var(--text-section)] font-extrabold leading-[1.05] tracking-[-0.025em] text-[var(--color-ink)]">
          When someone asks AI for {trade.namePlural} in Perth, are you on the shortlist?
        </h1>
        <p className="mt-5 max-w-[58ch] text-[17px] leading-[1.6] text-[var(--color-ink-soft)]">
          AI now names two or three {trade.namePlural} when a local asks for a good one. We get your {trade.nameSingular}{" "}
          business onto that shortlist. Pick your suburb:
        </p>

        <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {SUBURBS.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/ai-visibility/${tSlug}/${s.slug}/`}
                className="block rounded-xl border border-[var(--color-line-ink)] bg-white p-4 text-[15px] font-semibold text-[var(--color-ink)] transition-colors hover:border-[color-mix(in_oklab,var(--color-signal)_60%,var(--color-line-ink))]"
              >
                {s.name}
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="dark">
        <div className="text-center">
          <MonoLabel className="justify-center">Free AI Visibility Check</MonoLabel>
          <p className="mx-auto mt-5 max-w-[48ch] text-[length:var(--text-lede)] leading-[1.5] text-[var(--color-fg)]">
            See what AI says about your {trade.nameSingular} business today.
          </p>
          <div className="mt-8 flex justify-center">
            <CheckButton />
          </div>
        </div>
      </Section>
    </>
  );
}
