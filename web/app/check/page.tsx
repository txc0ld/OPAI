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
  "Send your business name and suburb. I'll send back a free rundown of what ChatGPT and Google's AI say about you — and the one thing costing you jobs.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/check/" },
};

const RUNDOWN = [
  "What ChatGPT and Google's AI actually say when someone asks for a good tradie in your area",
  "Whether you make the shortlist — or get skipped",
  "The one thing costing you jobs right now",
  "How to fix it (no pressure, no jargon)",
];

export default function CheckPage() {
  return (
    <>
      <JsonLd schema={wrapGraph([buildWebPage({ url: PAGE_URL, title: TITLE, description: DESCRIPTION })])} />
      <Section className="pt-32 lg:pt-40" containerClassName="grid gap-14 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <MonoLabel>Free · one business day · a real person</MonoLabel>
          <h1 className="mt-5 text-[length:var(--text-section)] font-extrabold leading-[1.05] tracking-[-0.02em]">
            See what AI says about your business.
          </h1>
          <p className="mt-5 max-w-[46ch] text-[17px] leading-[1.6] text-[var(--color-fg-variant)]">
            Send your name and suburb. I&rsquo;ll personally check what AI says about you and send back a plain-English
            rundown. It&rsquo;s free because the work proves itself — no catch, no spam.
          </p>
          <ul className="mt-8 grid gap-3">
            {RUNDOWN.map((item) => (
              <li key={item} className="flex gap-3 text-[15px] leading-[1.5] text-[var(--color-fg)]">
                <span className="mt-1 select-none font-mono text-[var(--color-signal)]" aria-hidden>
                  ▸
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-container)] p-6 lg:p-8">
          <CheckForm />
        </div>
      </Section>

      <Section className="border-t border-[var(--color-border)] bg-[var(--color-surface-low)]">
        <h2 className="text-[22px] font-bold tracking-tight">What happens next</h2>
        <ol className="mt-6 grid gap-6 sm:grid-cols-3">
          {[
            ["01", "You send it", "Business name, suburb, trade. Takes about 30 seconds."],
            ["02", "I check it by hand", "I look at what AI says about you — a real person, not an autoresponder."],
            ["03", "You get the rundown", "A plain-English summary and the one thing to fix. No pressure to buy anything."],
          ].map(([n, h, p]) => (
            <li key={n}>
              <div className="font-mono text-[13px] text-[var(--color-signal)]">{n}</div>
              <h3 className="mt-2 font-bold">{h}</h3>
              <p className="mt-1 text-[14px] leading-[1.6] text-[var(--color-fg-variant)]">{p}</p>
            </li>
          ))}
        </ol>
      </Section>
    </>
  );
}
