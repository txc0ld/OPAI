import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { MonoLabel } from "@/components/ui/mono-label";
import { CheckButton } from "@/components/ui/check-button";
import { JsonLd } from "@/components/json-ld";
import { buildService, buildWebPage, wrapGraph } from "@/lib/schema";
import { BUSINESS } from "@/lib/business";

const PAGE_URL = `${BUSINESS.url}/how-it-works/`;
const TITLE = "How it works";
const DESCRIPTION =
  "How AI decides which tradie to recommend — and exactly what I do to get you on the shortlist and ready for AI booking.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/how-it-works/" },
};

const STEPS = [
  {
    title: "Google Business Profile, machine-perfect",
    body: "The AI leans on your Google Business Profile harder than anything you own. I list every service as its own line, set your exact service area, fix categories and hours, sort the Q&A, and get real job photos up. A complete, accurate profile is what gives an AI the confidence to put your name forward.",
  },
  {
    title: "Plain-text services, prices & area",
    body: "AI can't read a price inside a flyer or PDF. I put what you do, where you do it, and a 'starting from' or callout price into plain words on your site — the one sentence an AI can pick up and use.",
  },
  {
    title: "Reviews — plenty, recent, replied-to",
    body: "When AI is choosing between two of you, reviews are one of the heaviest things on the scale: the number, how recent, and whether you reply. I set up a one-tap way to ask every happy customer, and a habit of replying to all of them.",
  },
  {
    title: "Answer fast (and get ready for AI booking)",
    body: "Speed is quietly becoming the whole game. If a lead lands and you take three days to call back, AI learns to stop sending them. I help you catch missed calls and reply in minutes — which wins jobs now and readies you for the day AI starts booking them.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <JsonLd
        schema={wrapGraph([
          buildWebPage({ url: PAGE_URL, title: TITLE, description: DESCRIPTION }),
          buildService({ name: "AI search visibility for trades", url: PAGE_URL, description: DESCRIPTION }),
        ])}
      />
      <Section className="pt-32 lg:pt-40">
        <MonoLabel>How it works</MonoLabel>
        <h1 className="mt-5 max-w-[20ch] text-[length:var(--text-section)] font-extrabold leading-[1.05] tracking-[-0.02em]">
          It&rsquo;s not magic, and it&rsquo;s not random. Here&rsquo;s how AI picks — and what I fix.
        </h1>
        <p className="mt-5 max-w-[56ch] text-[17px] leading-[1.6] text-[var(--color-fg-variant)]">
          AI builds its recommendation from a small handful of sources, and it trusts whatever is clearest, most
          complete, and most consistent. If your details are messy or locked in images, it skips you. Most of your
          competition hasn&rsquo;t fixed this. That&rsquo;s the good news.
        </p>
      </Section>

      <Section className="pt-0">
        <ol className="grid gap-5">
          {STEPS.map((step, i) => (
            <li
              key={step.title}
              className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-container)] p-7 lg:p-9"
            >
              <div className="font-mono text-[13px] text-[var(--color-signal)]">{String(i + 1).padStart(2, "0")}</div>
              <h2 className="mt-2 text-[22px] font-bold tracking-tight">{step.title}</h2>
              <p className="mt-3 max-w-[64ch] text-[15px] leading-[1.7] text-[var(--color-fg-variant)]">{step.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-12 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-low)] p-8 text-center">
          <p className="mx-auto max-w-[48ch] text-[17px] leading-[1.6] text-[var(--color-fg)]">
            Every business is different. There&rsquo;s no fixed package — get the free check first, then we talk about
            what&rsquo;s worth doing.
          </p>
          <div className="mt-6 flex justify-center">
            <CheckButton />
          </div>
        </div>
      </Section>
    </>
  );
}
