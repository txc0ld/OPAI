import Link from "next/link";
import { Section } from "@/components/ui/section";
import { MonoLabel } from "@/components/ui/mono-label";
import { listArticles, formatArticleDate } from "@/lib/articles";

export function LatestArticles() {
  const articles = listArticles().slice(0, 3);
  if (articles.length === 0) return null;
  return (
    <Section tone="dark">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <MonoLabel>From the site</MonoLabel>
          <h2 className="mt-5 text-[length:var(--text-section)] font-extrabold leading-[1.05] tracking-[-0.025em]">
            Plain talk on getting found.
          </h2>
        </div>
        <Link
          href="/articles/"
          className="text-[13px] font-semibold text-[var(--color-fg-variant)] transition-colors hover:text-[var(--color-signal)]"
        >
          All articles →
        </Link>
      </div>
      <ul className="mt-10 grid gap-5">
        {articles.map((a) => (
          <li key={a.slug}>
            <Link
              href={`/articles/${a.slug}/`}
              className="group grid gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-container)] p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-[color-mix(in_oklab,var(--color-signal)_40%,transparent)] sm:grid-cols-[auto_1fr] sm:items-center sm:gap-6 lg:p-8"
            >
              <div className="text-[12px] font-medium uppercase tracking-[0.12em] text-[var(--color-fg-variant)] sm:w-[150px]">
                {formatArticleDate(a.date)}
                <span className="block normal-case tracking-normal opacity-70">{a.readingMinutes} min read</span>
              </div>
              <h3 className="text-[21px] font-bold leading-snug tracking-tight text-[var(--color-fg)] transition-colors group-hover:text-[var(--color-signal)]">
                {a.title}
              </h3>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
