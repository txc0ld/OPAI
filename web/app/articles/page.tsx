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
const TITLE = "Articles";
const DESCRIPTION = "Plain-English guides for WA tradies on getting found, recommended and booked by AI.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/articles/" },
};

export default function ArticlesPage() {
  const articles = listArticles();
  return (
    <>
      <JsonLd schema={wrapGraph([buildWebPage({ url: PAGE_URL, title: TITLE, description: DESCRIPTION })])} />
      <Section className="pt-32 lg:pt-40">
        <MonoLabel>Articles</MonoLabel>
        <h1 className="mt-5 max-w-[18ch] text-[length:var(--text-section)] font-extrabold leading-[1.05] tracking-[-0.02em]">
          Getting found, recommended and booked by AI.
        </h1>
        <p className="mt-5 max-w-[52ch] text-[17px] leading-[1.6] text-[var(--color-fg-variant)]">{DESCRIPTION}</p>

        <ul className="mt-12 grid gap-4">
          {articles.map((a) => (
            <li key={a.slug}>
              <Link
                href={`/articles/${a.slug}/`}
                className="group block rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-container)] p-6 transition-colors hover:border-[var(--color-signal)]/50 lg:p-8"
              >
                <div className="flex flex-wrap items-center gap-3 font-mono text-[12px] uppercase tracking-[0.08em] text-[var(--color-fg-variant)]">
                  <span>{formatArticleDate(a.date)}</span>
                  <span aria-hidden>·</span>
                  <span>{a.readingMinutes} min read</span>
                  {a.tags?.[0] ? (
                    <>
                      <span aria-hidden>·</span>
                      <span className="text-[var(--color-signal)]">{a.tags[0]}</span>
                    </>
                  ) : null}
                </div>
                <h2 className="mt-3 text-[22px] font-bold leading-tight tracking-tight group-hover:text-[var(--color-signal)]">
                  {a.title}
                </h2>
                <p className="mt-2 max-w-[60ch] text-[15px] leading-[1.6] text-[var(--color-fg-variant)]">
                  {a.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-14">
          <CheckButton />
        </div>
      </Section>
    </>
  );
}
