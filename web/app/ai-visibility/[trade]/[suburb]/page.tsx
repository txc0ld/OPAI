import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Section } from "@/components/ui/section";
import { MonoLabel } from "@/components/ui/mono-label";
import { CheckButton } from "@/components/ui/check-button";
import { JsonLd } from "@/components/json-ld";
import { buildService, buildFaqPage, buildBreadcrumb, buildWebPage, wrapGraph } from "@/lib/schema";
import { BUSINESS } from "@/lib/business";
import { allPairs, getSuburb, getTrade, SUBURBS } from "@/lib/programmatic";
import { getEntry, isIndexable } from "@/content/programmatic/entries";

export function generateStaticParams() {
  return allPairs().map(({ trade, suburb }) => ({ trade: trade.slug, suburb: suburb.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ trade: string; suburb: string }>;
}): Promise<Metadata> {
  const { trade: tSlug, suburb: sSlug } = await params;
  const trade = getTrade(tSlug);
  const suburb = getSuburb(sSlug);
  if (!trade || !suburb) return {};
  const entry = getEntry(tSlug, sSlug);
  const title = `AI visibility for ${trade.namePlural} in ${suburb.name}`;
  const description = `What ChatGPT, Gemini and Google's AI say about ${trade.namePlural} in ${suburb.name}, and how to become the one they recommend.`;
  return {
    title,
    description,
    alternates: { canonical: `/ai-visibility/${tSlug}/${sSlug}/` },
    openGraph: { type: "website", title, description },
    ...(isIndexable(entry) ? {} : { robots: { index: false, follow: true } }),
  };
}

export default async function LeafPage({
  params,
}: {
  params: Promise<{ trade: string; suburb: string }>;
}) {
  const { trade: tSlug, suburb: sSlug } = await params;
  const trade = getTrade(tSlug);
  const suburb = getSuburb(sSlug);
  if (!trade || !suburb) notFound();
  const entry = getEntry(tSlug, sSlug);
  if (!entry) notFound();

  const url = `${BUSINESS.url}/ai-visibility/${tSlug}/${sSlug}/`;
  const tradeHubUrl = `${BUSINESS.url}/ai-visibility/${tSlug}/`;
  const title = `AI visibility for ${trade.namePlural} in ${suburb.name}`;
  const siblings = SUBURBS.filter((s) => s.slug !== sSlug).slice(0, 6);

  return (
    <>
      <JsonLd
        schema={wrapGraph([
          buildWebPage({ url, title, description: entry.intro }),
          buildService({
            name: title,
            url,
            description: entry.intro,
            areaServedName: suburb.name,
          }),
          buildFaqPage(entry.faqs.map((f) => ({ question: f.q, answer: f.a }))),
          buildBreadcrumb([
            { name: "Home", url: BUSINESS.url },
            { name: "AI visibility", url: `${BUSINESS.url}/ai-visibility/` },
            { name: trade.namePlural, url: tradeHubUrl },
            { name: suburb.name, url },
          ]),
        ])}
      />

      {/* Intro — paper */}
      <Section tone="paper" className="pt-32 lg:pt-40">
        <MonoLabel tone="light">
          {suburb.name} · {trade.namePlural}
        </MonoLabel>
        <h1 className="mt-5 max-w-[20ch] text-[length:var(--text-section)] font-extrabold leading-[1.05] tracking-[-0.025em] text-[var(--color-ink)]">
          Getting {trade.namePlural} in {suburb.name} recommended by AI
        </h1>
        <p className="mt-5 max-w-[58ch] text-[17px] leading-[1.6] text-[var(--color-ink-soft)]">{entry.intro}</p>
      </Section>

      {/* AI snapshot (proprietary) */}
      {entry.aiSnapshot ? (
        <Section tone="paper-warm" className="pt-0">
          <div className="rounded-2xl border border-[var(--color-line-ink)] bg-white p-7 lg:p-9">
            <MonoLabel tone="light">What AI says right now</MonoLabel>
            <p className="mt-4 max-w-[64ch] text-[16px] leading-[1.7] text-[var(--color-ink)]">
              {entry.aiSnapshot.summary}
            </p>
            <p className="mt-4 text-[13px] text-[var(--color-ink-soft)]">
              Captured {entry.aiSnapshot.capturedOn} · {entry.aiSnapshot.source}
            </p>
          </div>
        </Section>
      ) : null}

      {/* What AI checks + queries */}
      <Section tone="paper" className="pt-0">
        <h2 className="text-[22px] font-bold tracking-tight text-[var(--color-ink)]">
          What AI checks before recommending {trade.namePlural} in {suburb.name}
        </h2>
        <ul className="mt-5 grid gap-3">
          {entry.whatAIChecks.map((point) => (
            <li
              key={point}
              className="rounded-xl border border-[var(--color-line-ink)] bg-white p-5 text-[15px] leading-[1.6] text-[var(--color-ink-soft)]"
            >
              {point}
            </li>
          ))}
        </ul>

        <h2 className="mt-12 text-[22px] font-bold tracking-tight text-[var(--color-ink)]">
          What {suburb.name} locals are asking AI
        </h2>
        <ul className="mt-5 grid gap-3">
          {entry.exampleQueries.map((q) => (
            <li key={q} className="text-[16px] italic leading-[1.5] text-[var(--color-ink)]">
              &quot;{q}&quot;
            </li>
          ))}
        </ul>

        {entry.stats && entry.stats.length ? (
          <ul className="mt-12 grid gap-2">
            {entry.stats.map((s) => (
              <li key={s.claim} className="text-[14px] leading-[1.6] text-[var(--color-ink-soft)]">
                {s.claim}{" "}
                <span className="opacity-70">
                  ({s.source}, {s.date})
                </span>
              </li>
            ))}
          </ul>
        ) : null}
      </Section>

      {/* FAQ */}
      <Section tone="paper" className="pt-0">
        <h2 className="text-[22px] font-bold tracking-tight text-[var(--color-ink)]">Questions</h2>
        <dl className="mt-5 grid gap-5">
          {entry.faqs.map((f) => (
            <div key={f.q} className="rounded-xl border border-[var(--color-line-ink)] bg-white p-6">
              <dt className="text-[16px] font-bold text-[var(--color-ink)]">{f.q}</dt>
              <dd className="mt-2 text-[15px] leading-[1.65] text-[var(--color-ink-soft)]">{f.a}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* CTA + internal links */}
      <Section tone="dark">
        <div className="text-center">
          <MonoLabel className="justify-center">Free AI Visibility Check</MonoLabel>
          <p className="mx-auto mt-5 max-w-[48ch] text-[length:var(--text-lede)] leading-[1.5] text-[var(--color-fg)]">
            See exactly what AI says about your {trade.nameSingular} business in {suburb.name} today.
          </p>
          <div className="mt-8 flex justify-center">
            <CheckButton />
          </div>
        </div>

        <div className="mt-14 border-t border-[var(--color-border)] pt-8 text-[14px]">
          <Link href={`/ai-visibility/${tSlug}/`} className="font-semibold text-[var(--color-signal)]">
            All suburbs for {trade.namePlural} →
          </Link>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[var(--color-fg-variant)]">
            {siblings.map((s) => (
              <Link key={s.slug} href={`/ai-visibility/${tSlug}/${s.slug}/`} className="hover:text-[var(--color-signal)]">
                {trade.namePlural} in {s.name}
              </Link>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
