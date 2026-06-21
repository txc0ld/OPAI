import Link from "next/link";
import { Section } from "@/components/ui/section";
import { MonoLabel } from "@/components/ui/mono-label";
import { listArticles, formatArticleDate } from "@/lib/articles";

export function LatestArticles() {
  const articles = listArticles().slice(0, 3);
  if (articles.length === 0) return null;
  return (
    <Section className="border-t border-[var(--color-border)] bg-[var(--color-surface-low)]">
      <div className="flex items-end justify-between gap-4">
        <div>
          <MonoLabel>From the site</MonoLabel>
          <h2 className="mt-4 text-[length:var(--text-section)] font-extrabold leading-[1.08] tracking-[-0.02em]">Latest</h2>
        </div>
        <Link href="/articles/" className="font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--color-fg-variant)] hover:text-[var(--color-signal)]">
          All articles →
        </Link>
      </div>
      <ul className="mt-8 grid gap-4">
        {articles.map((a) => (
          <li key={a.slug}>
            <Link
              href={`/articles/${a.slug}/`}
              className="group block rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-container)] p-6 transition-colors hover:border-[var(--color-signal)]/50"
            >
              <div className="font-mono text-[12px] uppercase tracking-[0.08em] text-[var(--color-fg-variant)]">
                {formatArticleDate(a.date)} · {a.readingMinutes} min read
              </div>
              <h3 className="mt-2 text-[19px] font-bold leading-tight tracking-tight group-hover:text-[var(--color-signal)]">
                {a.title}
              </h3>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
