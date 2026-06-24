import Link from "next/link";
import { Section } from "@/components/ui/section";
import { MonoLabel } from "@/components/ui/mono-label";
import { DONE_FOR_YOU, WEBSITE_PACKAGES, IOAGENT_PLANS } from "@/lib/business";

// en-US locale renders AUD as "A$" so the currency is explicit (matches pricing cards).
const aud = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "AUD",
  maximumFractionDigits: 0,
});

type Offering = {
  name: string;
  blurb: string;
  entry: string;
  href: string;
  start?: boolean;
};

// Prices derive from the source constants so they never drift from the real pages.
const OFFERINGS: Offering[] = [
  {
    name: "Free AI Check",
    blurb: "See exactly what AI says about your business today, by hand, in plain English.",
    entry: "Free",
    href: "/check/",
    start: true,
  },
  {
    name: "Done-for-you",
    blurb: "We keep you on the AI shortlist, always on, and send proof of the work.",
    entry: `from ${aud.format(DONE_FOR_YOU.priceFrom)}/mo`,
    href: "/done-for-you/",
  },
  {
    name: "Websites",
    blurb: "A fast, on-brand site built so AI can read your services and recommend you.",
    entry: `from ${aud.format(WEBSITE_PACKAGES[0].priceFrom)}`,
    href: "/websites/",
  },
  {
    name: "iOAgent",
    blurb: "Your own always-on AI agent for the busywork, set up around your business.",
    entry: `from ${aud.format(IOAGENT_PLANS[0].pricePerMonth)}/mo`,
    href: "/ioagent/",
  },
];

export function WhatWeDo() {
  return (
    <Section tone="paper-warm" className="border-t border-[var(--color-line-ink)]">
      <MonoLabel tone="light">What we do</MonoLabel>
      <h2 className="mt-5 max-w-[20ch] text-[length:var(--text-section)] font-extrabold leading-[1.05] tracking-[-0.025em] text-[var(--color-ink)]">
        Found by AI today. Fully handled tomorrow.
      </h2>
      <p className="mt-5 max-w-[54ch] text-[16px] leading-[1.6] text-[var(--color-ink-soft)]">
        Start with the free check, then go as far as you want. We keep you on the shortlist, build the site AI can read,
        and run the agents that do the work.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {OFFERINGS.map((o, i) => (
          <Link
            key={o.name}
            href={o.href}
            data-d={i + 1}
            className="reveal group flex flex-col rounded-2xl border border-[var(--color-line-ink)] bg-[var(--color-paper)] p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-[color-mix(in_oklab,var(--color-ink)_28%,transparent)]"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-ink-soft)]">
                {o.entry}
              </span>
              {o.start ? (
                <span className="rounded-full bg-[var(--color-signal)] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--color-on-signal)]">
                  Start here
                </span>
              ) : null}
            </div>
            <h3 className="mt-4 text-[19px] font-extrabold tracking-[-0.01em] text-[var(--color-ink)]">{o.name}</h3>
            <p className="mt-2 flex-1 text-[14px] leading-[1.55] text-[var(--color-ink-soft)]">{o.blurb}</p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[var(--color-ink)]">
              Learn more
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
                →
              </span>
            </span>
          </Link>
        ))}
      </div>
    </Section>
  );
}
