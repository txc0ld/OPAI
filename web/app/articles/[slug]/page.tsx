import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Section } from "@/components/ui/section";
import { CheckButton } from "@/components/ui/check-button";
import { getArticleSlugs, listArticles, formatArticleDate } from "@/lib/articles";
import { JsonLd } from "@/components/json-ld";
import { buildArticle, buildWebPage, wrapGraph } from "@/lib/schema";
import { BUSINESS } from "@/lib/business";

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

// Keep in sync with content/articles/*.mdx — every article file needs an entry here
// (Turbopack can't resolve a bare template-literal dynamic import).
const LOADERS: Record<string, () => Promise<{ default: React.ComponentType }>> = {
  "your-next-customer-wont-scroll-google": () =>
    import("@/content/articles/your-next-customer-wont-scroll-google.mdx"),
};

async function loadArticle(slug: string) {
  const meta = listArticles().find((a) => a.slug === slug);
  if (!meta) return null;
  const loader = LOADERS[slug];
  if (!loader) return null;
  try {
    const mod = await loader();
    return { meta, Content: mod.default as React.ComponentType };
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const meta = listArticles().find((a) => a.slug === slug);
  if (!meta) return {};
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/articles/${slug}/` },
    openGraph: { type: "article", title: meta.title, description: meta.description },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const loaded = await loadArticle(slug);
  if (!loaded) notFound();
  const { meta, Content } = loaded;
  const url = `${BUSINESS.url}/articles/${slug}/`;

  return (
    <>
      <JsonLd
        schema={wrapGraph([
          buildWebPage({ url, title: meta.title, description: meta.description }),
          buildArticle({ url, title: meta.title, description: meta.description, date: meta.date, author: meta.author }),
        ])}
      />
      <Section className="pt-32 lg:pt-40" containerClassName="max-w-[760px]">
        <Link
          href="/articles/"
          className="font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--color-fg-variant)] hover:text-[var(--color-signal)]"
        >
          ← All articles
        </Link>
        <div className="mt-6 flex flex-wrap items-center gap-3 font-mono text-[12px] uppercase tracking-[0.08em] text-[var(--color-fg-variant)]">
          <span>{formatArticleDate(meta.date)}</span>
          <span aria-hidden>·</span>
          <span>{meta.readingMinutes} min read</span>
          <span aria-hidden>·</span>
          <span>{meta.author}</span>
        </div>
        <h1 className="mt-4 text-[var(--text-section)] font-extrabold leading-[1.08] tracking-[-0.02em]">{meta.title}</h1>

        <div className="my-10 rounded-lg border border-[var(--color-signal)]/40 bg-[var(--color-surface-container)] p-5">
          <p className="text-[14px] text-[var(--color-fg-variant)]">
            Want to know how you currently look to AI?
          </p>
          <div className="mt-3">
            <CheckButton label="Get your free AI check" />
          </div>
        </div>

        <Content />

        <div className="mt-14 border-t border-[var(--color-border)] pt-10">
          <CheckButton label="See what AI says about you" />
        </div>
      </Section>
    </>
  );
}
