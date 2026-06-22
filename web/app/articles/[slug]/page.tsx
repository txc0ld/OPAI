import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/ui/section";
import { CheckButton } from "@/components/ui/check-button";
import { ReadingChrome } from "@/components/article/reading-chrome";
import { KeyTakeaways } from "@/components/mock/examples";
import { getArticleSlugs, listArticles, formatArticleDate } from "@/lib/articles";
import { JsonLd } from "@/components/json-ld";
import { buildArticle, buildBreadcrumb, buildWebPage, wrapGraph } from "@/lib/schema";
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

// Short scannable summary shown at the top of each article (the retention hook).
const TAKEAWAYS: Record<string, string[]> = {
  "your-next-customer-wont-scroll-google": [
    "AI now names just two or three tradies. You need to be one of them.",
    "Your Google Business Profile is the biggest lever. Finish it properly.",
    "Put your services, prices and area in plain text, not inside images.",
    "Get recent reviews, reply to them, and answer fast.",
  ],
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
  const takeaways = TAKEAWAYS[slug] ?? [];

  return (
    <>
      <JsonLd
        schema={wrapGraph([
          buildWebPage({ url, title: meta.title, description: meta.description }),
          buildArticle({ url, title: meta.title, description: meta.description, date: meta.date, author: meta.author }),
          buildBreadcrumb([
            { name: "Home", url: BUSINESS.url },
            { name: "Articles", url: `${BUSINESS.url}/articles/` },
            { name: meta.title, url },
          ]),
        ])}
      />
      <ReadingChrome />

      <Section tone="paper" className="pt-28 lg:pt-36" containerClassName="max-w-[720px]">
        <Link
          href="/articles/"
          className="text-[13px] font-semibold text-[var(--color-ink-soft)] transition-colors hover:text-[var(--color-ink)]"
        >
          ← All articles
        </Link>

        <div className="mt-7 flex flex-wrap items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--color-ink-soft)]">
          {meta.tags?.[0] ? (
            <span className="rounded-full bg-[color-mix(in_oklab,var(--color-signal)_40%,white)] px-3 py-1 text-[var(--color-ink)]">
              {meta.tags[0]}
            </span>
          ) : null}
          <span>{formatArticleDate(meta.date)}</span>
          <span aria-hidden className="opacity-40">
            •
          </span>
          <span>{meta.readingMinutes} min read</span>
        </div>

        <h1 className="mt-5 text-[length:var(--text-display)] font-extrabold leading-[1.0] tracking-[-0.035em] text-[var(--color-ink)]">
          {meta.title}
        </h1>

        <div className="mt-7 flex items-center gap-3">
          <span className="relative h-11 w-11 flex-none overflow-hidden rounded-full border border-[var(--color-line-ink)]">
            <Image
              src="/TMAbout.png"
              alt={meta.author}
              fill
              sizes="44px"
              className="object-cover"
              style={{ objectPosition: "center 18%" }}
            />
          </span>
          <div className="text-[14px] leading-tight">
            <div className="font-bold text-[var(--color-ink)]">{meta.author}</div>
          </div>
        </div>

        {takeaways.length ? <KeyTakeaways points={takeaways} /> : null}

        <article className="mt-10">
          <Content />
        </article>

        <div className="mt-14 overflow-hidden rounded-3xl border border-[color-mix(in_oklab,var(--color-signal)_45%,var(--color-line-ink))] bg-white p-8 text-center shadow-[0_30px_60px_-36px_rgba(18,18,18,0.5)] lg:p-12">
          <h2 className="mx-auto max-w-[22ch] text-[clamp(1.6rem,3vw,2.25rem)] font-extrabold leading-[1.05] tracking-[-0.025em] text-[var(--color-ink)]">
            Want to know how you currently look to AI?
          </h2>
          <p className="mx-auto mt-4 max-w-[46ch] text-[16px] leading-[1.55] text-[var(--color-ink-soft)]">
            Send your business name and suburb. I&rsquo;ll send back a free rundown of what AI says about you, and the
            one thing costing you jobs.
          </p>
          <div className="mt-7 flex justify-center">
            <CheckButton />
          </div>
        </div>
      </Section>
    </>
  );
}
