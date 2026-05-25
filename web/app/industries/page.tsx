import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { buildWebPage, wrapGraph } from "@/lib/schema";
import { BUSINESS } from "@/lib/business";

const PAGE_URL = `${BUSINESS.url}/industries/`;
const TITLE = "AI by Industry | OperateAI";
const DESCRIPTION =
  "AI agents, automation and training built for specific industries. Accounting, real estate, trades, health, law and ecommerce. Plain-English help for any team.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/industries/" },
};

const INDUSTRIES = [
  { slug: "ai-for-accounting-firms", label: "Accounting firms" },
  { slug: "ai-for-real-estate-agencies", label: "Real estate agencies" },
  { slug: "ai-for-trades-businesses", label: "Trades businesses" },
  { slug: "ai-for-health-clinics", label: "Health clinics" },
  { slug: "ai-for-law-firms", label: "Law firms" },
  { slug: "ai-for-ecommerce-businesses", label: "Ecommerce businesses" },
];

export default function Page() {
  return (
    <>
      <JsonLd schema={wrapGraph([buildWebPage({ url: PAGE_URL, title: TITLE, description: DESCRIPTION })])} />

      <section className="bg-[var(--color-bg)] px-6 pt-[140px] pb-16 lg:px-12 lg:pt-[180px] lg:pb-24">
        <div className="mx-auto grid w-full max-w-[1200px] items-center gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <span className="eyebrow">OperateAI · Industries</span>
            <h1 className="mt-6 text-[clamp(40px,7vw,88px)] font-extrabold leading-[1] tracking-[-0.04em]">
              AI by industry
            </h1>
            <p className="mt-8 max-w-[var(--measure)] text-[clamp(17px,2vw,21px)] leading-[1.55] text-[var(--color-w70)]">
              AI agents, automation and training tailored to the sectors most
              small and medium businesses sit in. Plain-English for first-timers,
              deep for technical teams.
            </p>
          </div>
          <div className="relative aspect-[4/5] w-full">
            <Image
              src="/operateai_industries_4x5.webp"
              alt="INDUSTRIES — Solutions for every industry. 3D lime icons on plinths: shopping cart (ecommerce), heart-rate (health), factory (manufacturing), crane (construction), truck (trades)."
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-contain"
              priority
            />
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-bg)] px-6 pb-24 lg:px-12 lg:pb-32">
        <div className="mx-auto w-full max-w-[1200px]">
          <ul className="grid list-none gap-0 border-t border-[var(--color-w10)]">
            {INDUSTRIES.map((i, idx) => (
              <li key={i.slug} className="reveal border-b border-[var(--color-w10)]">
                <Link
                  href={`/industries/${i.slug}/`}
                  className="group grid grid-cols-1 gap-2 py-[30px] transition-all duration-[400ms] ease-[var(--ease)] hover:pl-3 md:grid-cols-[38px_1fr_auto] md:items-baseline md:gap-7"
                >
                  <span className="font-mono text-[13px] text-[var(--color-accent)]">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[21px] font-bold leading-tight tracking-[-0.02em]">
                    AI for {i.label.toLowerCase()}
                  </span>
                  <span className="whitespace-nowrap text-[14px] text-[var(--color-w50)] transition-colors duration-300 group-hover:text-[var(--color-fg)]">
                    View →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-[var(--color-w10)] bg-[var(--color-bg)] px-6 py-24 text-center lg:px-12 lg:py-32">
        <div className="mx-auto w-full max-w-[820px]">
          <h2 className="reveal text-[clamp(32px,5vw,56px)] font-extrabold leading-[1.05] tracking-[-0.03em]">
            Don&apos;t see your industry?
          </h2>
          <p className="reveal mt-[22px] text-[clamp(17px,2vw,21px)] leading-[1.55] text-[var(--color-w70)]">
            That does not mean we cannot help. Book an audit and we will work
            out whether AI fits your situation.
          </p>
          <div className="reveal mt-10 flex justify-center">
            <Link
              href="/book-ai-audit/"
              className="inline-flex items-center gap-2 rounded-[7px] bg-[var(--color-fg)] px-6 py-3.5 text-[15px] font-semibold text-black transition-transform duration-300 hover:-translate-y-0.5"
            >
              Book an AI Business Audit →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
