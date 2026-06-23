import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/section";
import { MonoLabel } from "@/components/ui/mono-label";
import { CheckForm } from "@/components/check/check-form";
import { JsonLd } from "@/components/json-ld";
import { buildWebPage, wrapGraph } from "@/lib/schema";
import { BUSINESS } from "@/lib/business";

const PAGE_URL = `${BUSINESS.url}/check/`;
const TITLE = "Free AI Visibility Check for Perth Businesses";
const DESCRIPTION =
  "Send your business name and suburb. We'll send back a free rundown of what ChatGPT and Google's AI say about you, including the one thing costing you customers.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/check/" },
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const RUNDOWN = [
  "What ChatGPT and Google's AI actually say when someone asks for a good business in your area",
  "Whether you make the shortlist or get skipped",
  "The one thing costing you customers right now",
  "How to fix it (no pressure, no jargon)",
];

export default function CheckPage() {
  return (
    <>
      <JsonLd schema={wrapGraph([buildWebPage({ url: PAGE_URL, title: TITLE, description: DESCRIPTION })])} />

      {/* Hero + form */}
      <Section className="pt-32 lg:pt-40" containerClassName="grid gap-14 lg:grid-cols-[1fr_1.1fr]">
        {/* Left: copy */}
        <div>
          <MonoLabel>Free. One business day. A real person.</MonoLabel>
          <h1 className="mt-5 text-[length:var(--text-section)] font-extrabold leading-[1.05] tracking-[-0.02em]">
            See what AI says about your business.
          </h1>
          <p className="mt-5 max-w-[46ch] text-[17px] leading-[1.6] text-[var(--color-fg-variant)]">
            Send your name and suburb. We&rsquo;ll check what AI says about you by hand and send back a plain-English
            rundown. It&rsquo;s free because the work proves itself. No catch, no spam.
          </p>
          <ul className="mt-8 grid gap-3">
            {RUNDOWN.map((item) => (
              <li key={item} className="flex gap-3 text-[15px] leading-[1.5] text-[var(--color-fg)]">
                <span
                  className="mt-0.5 select-none text-[var(--color-signal)]"
                  aria-hidden
                >
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Right: form card */}
        <div className="relative">
          {/* Lime glow blob behind the card */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-16 -right-16 h-72 w-72 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, var(--color-signal-glow), transparent 70%)" }}
          />
          <div
            className="grain relative rounded-3xl border border-[var(--color-border)] p-8 lg:p-10"
            style={{ background: "linear-gradient(150deg,var(--color-surface-high),var(--color-surface-container))" }}
          >
            <CheckForm />
          </div>
        </div>
      </Section>

      {/* What happens next */}
      <Section tone="dark" className="border-t border-[var(--color-border)]">
        <MonoLabel>What happens next</MonoLabel>
        <h2 className="mt-5 text-[22px] font-bold tracking-tight">Three steps. Thirty seconds on your end.</h2>
        <ol className="mt-8 grid gap-5 sm:grid-cols-3">
          {[
            ["01", "You send it", "Business name, suburb, business type, and your website if you have one. Takes about 30 seconds."],
            ["02", "We check it by hand", "A real person on our team looks at what AI says about you, not an autoresponder."],
            ["03", "You get the rundown", "A plain-English summary and the one thing to fix. No pressure to buy anything."],
          ].map(([n, h, p]) => (
            <li
              key={n}
              className="grain rounded-2xl border border-[var(--color-border)] p-7 hover:border-[color-mix(in_oklab,var(--color-signal)_40%,transparent)]"
              style={{ background: "linear-gradient(150deg,var(--color-surface-high),var(--color-surface-container))" }}
            >
              <div
                className="grid h-9 w-9 place-items-center rounded-lg text-[13px] font-extrabold text-[var(--color-on-signal)]"
                style={{ background: "color-mix(in oklab, var(--color-signal) 80%, transparent)" }}
              >
                {n}
              </div>
              <h3 className="mt-4 font-bold text-[var(--color-fg)]">{h}</h3>
              <p className="mt-2 text-[14px] leading-[1.6] text-[var(--color-fg-variant)]">{p}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Upsell band: the always-on done-for-you service */}
      <Section tone="paper-warm">
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-[var(--color-line-ink)] bg-[var(--color-paper)] p-8 lg:flex-row lg:items-center lg:p-10">
          <div>
            <MonoLabel tone="light">Prefer we just handle it?</MonoLabel>
            <h2 className="mt-4 max-w-[28ch] text-[22px] font-bold leading-snug tracking-tight text-[var(--color-ink)]">
              The check is a snapshot. Done-for-you keeps you on the shortlist, always on.
            </h2>
          </div>
          <Link
            href="/done-for-you/"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-[var(--color-line-ink)] px-7 py-3.5 text-[15px] font-bold tracking-tight text-[var(--color-ink)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--color-ink)] hover:text-white"
          >
            See done-for-you
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </div>
      </Section>
    </>
  );
}
