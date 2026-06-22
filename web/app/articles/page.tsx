import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/section";
import { MonoLabel } from "@/components/ui/mono-label";
import { CheckButton } from "@/components/ui/check-button";
import { listArticles, formatArticleDate } from "@/lib/articles";
import { JsonLd } from "@/components/json-ld";
import { buildWebPage, wrapGraph } from "@/lib/schema";
import { BUSINESS } from "@/lib/business";

const PAGE_URL = `${BUSINESS.url}/articles/`;
const TITLE = "Articles for WA Trade Businesses";
const DESCRIPTION = "Plain-English guides for WA tradies on getting found, recommended and booked by AI.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/articles/" },
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function ArticlesPage() {
  const articles = listArticles();
  return (
    <>
      <JsonLd schema={wrapGraph([buildWebPage({ url: PAGE_URL, title: TITLE, description: DESCRIPTION })])} />
      <Section tone="paper" className="pt-32 lg:pt-40">
        <MonoLabel tone="light">Articles</MonoLabel>
        <h1 className="mt-5 max-w-[18ch] text-[length:var(--text-section)] font-extrabold leading-[1.05] tracking-[-0.025em] text-[var(--color-ink)]">
          Getting found, recommended and booked by AI.
        </h1>
        <p className="mt-5 max-w-[52ch] text-[17px] leading-[1.6] text-[var(--color-ink-soft)]">{DESCRIPTION}</p>

        <ul className="mt-12 grid gap-4">
          {articles.map((a) => (
            <li key={a.slug}>
              <Link
                href={`/articles/${a.slug}/`}
                className="group block rounded-2xl border border-[var(--color-line-ink)] bg-white p-6 shadow-[0_22px_44px_-30px_rgba(18,18,18,0.45)] transition-transform duration-300 hover:-translate-y-1 lg:p-8"
              >
                <div className="flex flex-wrap items-center gap-3 font-mono text-[12px] uppercase tracking-[0.08em] text-[var(--color-ink-soft)]">
                  <span>{formatArticleDate(a.date)}</span>
                  <span aria-hidden>,</span>
                  <span>{a.readingMinutes} min read</span>
                  {a.tags?.[0] ? (
                    <>
                      <span aria-hidden>,</span>
                      <span className="text-[var(--color-signal-dim)]">{a.tags[0]}</span>
                    </>
                  ) : null}
                </div>
                <h2 className="mt-3 text-[22px] font-bold leading-tight tracking-tight text-[var(--color-ink)]">
                  {a.title}
                </h2>
                <p className="mt-2 max-w-[60ch] text-[15px] leading-[1.6] text-[var(--color-ink-soft)]">
                  {a.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-14">
          <CheckButton variant="solid" />
        </div>
      </Section>
    </>
  );
}
