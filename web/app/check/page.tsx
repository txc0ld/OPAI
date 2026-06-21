import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { MonoLabel } from "@/components/ui/mono-label";
import { CheckForm } from "@/components/check/check-form";
import { JsonLd } from "@/components/json-ld";
import { buildWebPage, wrapGraph } from "@/lib/schema";
import { BUSINESS } from "@/lib/business";

const PAGE_URL = `${BUSINESS.url}/check/`;
const TITLE = "Free AI Visibility Check";
const DESCRIPTION =
  "Send your business name and suburb. I'll send back a free rundown of what ChatGPT and Google's AI say about you, including the one thing costing you jobs.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/check/" },
};

const RUNDOWN = [
  "What ChatGPT and Google's AI actually say when someone asks for a good tradie in your area",
  "Whether you make the shortlist or get skipped",
  "The one thing costing you jobs right now",
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
            Send your name and suburb. I&rsquo;ll personally check what AI says about you and send back a plain-English
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
            ["01", "You send it", "Business name, suburb, trade. Takes about 30 seconds."],
            ["02", "I check it by hand", "I look at what AI says about you. A real person, not an autoresponder."],
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
    </>
  );
}
