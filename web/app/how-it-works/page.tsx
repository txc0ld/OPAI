import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { MonoLabel } from "@/components/ui/mono-label";
import { CheckButton } from "@/components/ui/check-button";
import { JsonLd } from "@/components/json-ld";
import { buildHowTo, buildService, buildWebPage, wrapGraph } from "@/lib/schema";
import { BUSINESS } from "@/lib/business";

const PAGE_URL = `${BUSINESS.url}/how-it-works/`;
const TITLE = "How AI Picks Which Business to Recommend";
const DESCRIPTION =
  "How AI decides which local business to recommend, and exactly what we do to get you on the shortlist and ready for AI booking.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/how-it-works/" },
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const STEPS = [
  {
    title: "Google Business Profile, machine-perfect",
    body: "The AI leans on your Google Business Profile harder than anything you own. We list every service as its own line, set your exact service area, fix categories and hours, sort the Q&A, and get real photos of your work up. A complete, accurate profile is what gives an AI the confidence to put your name forward.",
  },
  {
    title: "Plain-text services, prices & area",
    body: "AI can't read a price inside a flyer or PDF. We put what you do, where you do it, and a 'starting from' or callout price into plain words on your site. That's the one sentence an AI can pick up and use.",
  },
  {
    title: "Reviews: plenty, recent, replied-to",
    body: "When AI is choosing between two of you, reviews are one of the heaviest things on the scale: the number, how recent, and whether you reply. We set up a one-tap way to ask every happy customer, and a habit of replying to all of them.",
  },
  {
    title: "Answer fast (and get ready for AI booking)",
    body: "Speed is quietly becoming the whole game. If a lead lands and you take three days to call back, AI learns to stop sending them. We help you catch missed calls and reply in minutes, which wins customers now and readies you for the day AI starts booking them.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <JsonLd
        schema={wrapGraph([
          buildWebPage({ url: PAGE_URL, title: TITLE, description: DESCRIPTION }),
          buildService({ name: "AI search visibility for local business", url: PAGE_URL, description: DESCRIPTION }),
          buildHowTo({
            name: TITLE,
            description: DESCRIPTION,
            url: PAGE_URL,
            steps: STEPS.map((s) => ({ name: s.title, text: s.body })),
          }),
        ])}
      />

      {/* Intro — paper */}
      <Section tone="paper" className="pt-32 lg:pt-40">
        <MonoLabel tone="light">How it works</MonoLabel>
        <h1 className="mt-5 max-w-[20ch] text-[length:var(--text-section)] font-extrabold leading-[1.05] tracking-[-0.025em] text-[var(--color-ink)]">
          Not magic, not random. Here&rsquo;s how AI picks and what we fix.
        </h1>
        <p className="mt-5 max-w-[56ch] text-[17px] leading-[1.6] text-[var(--color-ink-soft)]">
          AI builds its recommendation from a small handful of sources, and it trusts whatever is clearest, most
          complete, and most consistent. If your details are messy or locked in images, it skips you. Most of your
          competition hasn&rsquo;t fixed this. That&rsquo;s the good news.
        </p>
      </Section>

      {/* Steps — paper, white cards */}
      <Section tone="paper" className="pt-0">
        <ol className="grid gap-5">
          {STEPS.map((step, i) => (
            <li
              key={step.title}
              className="rounded-2xl border border-[var(--color-line-ink)] bg-white p-7 shadow-[0_22px_44px_-30px_rgba(18,18,18,0.45)] transition-transform duration-300 hover:-translate-y-1 lg:p-9"
            >
              <div className="flex items-center gap-3">
                <span
                  className="grid h-9 w-9 place-items-center rounded-lg text-[13px] font-extrabold text-[var(--color-ink)]"
                  style={{ background: "color-mix(in oklab, var(--color-signal) 38%, white)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="text-[20px] font-bold tracking-tight text-[var(--color-ink)]">{step.title}</h2>
              </div>
              <p className="mt-4 max-w-[64ch] text-[15px] leading-[1.7] text-[var(--color-ink-soft)]">{step.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Closing CTA band — dark */}
      <Section tone="dark">
        <div className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] px-8 py-14 text-center lg:py-20">
          {/* Lime glow blob */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-[600px] max-w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
            style={{ background: "radial-gradient(ellipse, var(--color-signal-glow), transparent 68%)" }}
          />
          <div className="relative">
            <MonoLabel className="justify-center">No fixed package</MonoLabel>
            <p className="mx-auto mt-5 max-w-[48ch] text-[length:var(--text-lede)] leading-[1.5] text-[var(--color-fg)]">
              Every business is different. There&rsquo;s no fixed package. Get the free check first, then we talk about
              what&rsquo;s worth doing.
            </p>
            <div className="mt-8 flex justify-center">
              <CheckButton />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
