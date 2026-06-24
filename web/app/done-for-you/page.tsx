import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { MonoLabel } from "@/components/ui/mono-label";
import { CheckButton } from "@/components/ui/check-button";
import { ButtonLink } from "@/components/ui/button-link";
import { Faq } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { buildWebPage, buildService, buildBreadcrumb, wrapGraph } from "@/lib/schema";
import { BUSINESS, DONE_FOR_YOU } from "@/lib/business";

const PAGE_URL = `${BUSINESS.url}/done-for-you/`;
const TITLE = "Done-for-you: we keep you on AI's shortlist";
const DESCRIPTION =
  "The free check finds the gaps. The done-for-you service fixes them and keeps them fixed, always on. We monitor what AI says about you, keep your profile and site current, and send proof of the work.";

const PRICE_FROM = `A$${DONE_FOR_YOU.priceFrom}/mo`;
const SETUP = `A$${DONE_FOR_YOU.setup}`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/done-for-you/" },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    title: TITLE,
    description: DESCRIPTION,
  },
};

// What's included — the work the service actually does, on a cadence.
const INCLUDED = [
  [
    "We watch what AI says about you",
    "Every week we check what ChatGPT and Google's AI say when someone asks for a business like yours. If you slip off the shortlist, we catch it.",
  ],
  [
    "We keep your Google profile current",
    "Hours, services, suburbs, photos, categories: the details AI reads first. Kept accurate and complete, not set-and-forgotten.",
  ],
  [
    "We keep your site AI-readable",
    "Plain-text services, prices and areas, plus the behind-the-scenes schema AI uses to trust you. Updated as your business changes.",
  ],
  [
    "We keep the reviews flowing",
    "A simple system so happy customers leave reviews: the signal AI leans on hardest when it decides who to name.",
  ],
  [
    "You get proof of the work",
    "A monthly plain-English report: your visibility trend, what we changed, and before/after screenshots. No vague 'we did stuff'.",
  ],
  [
    "A real person owns it",
    "Not a dashboard you have to learn. Someone on our team runs it and you can reach them when you need to.",
  ],
] as const;

const COMPARE = {
  check: [
    "A one-time snapshot of how AI sees you today",
    "The single biggest thing costing you customers",
    "Plain-English, no pressure",
    "You do the fixing (or you don't)",
  ],
  service: [
    "Always on. Checked every week, not once",
    "We do the fixing, and keep it fixed as things drift",
    "Monthly proof-of-work with screenshots",
    "You approve anything that goes public before it's live",
  ],
} as const;

const FAQ_ITEMS = [
  {
    question: "How is this different from the free check?",
    answer:
      "The free check is a one-time snapshot: it tells you how AI sees you today and the main thing to fix. Done-for-you is the ongoing version: we check every week, do the fixing, and keep it fixed as your details and the AI models change. The check is the photo; this is keeping the picture true.",
  },
  {
    question: "Will you change things without asking me?",
    answer:
      "No. Anything that goes public you approve first: a listing edit, a post, a change to your site. We start in monitor-and-recommend mode and only act on the categories you've signed off on. Every action is logged with a screenshot.",
  },
  {
    question: "What does it cost?",
    answer: `It starts from ${PRICE_FROM} plus a one-off setup of ${SETUP}. The setup is where most of the work happens: profile rebuilt, site made AI-readable, reviews system in place. You'll know the exact price before anything starts, and there's no lock-in.`,
  },
  {
    question: "Do I need to do anything?",
    answer:
      "Almost nothing. We need access to your Google Business Profile and your website, and a few minutes to approve changes when we propose them. That's the point: you run the business, we keep you findable.",
  },
  {
    question: "How long until it makes a difference?",
    answer:
      "The profile and review fixes start working within weeks as AI re-reads your details, then it compounds. Because we're always on, you don't quietly slide back the way a one-off fix does.",
  },
  {
    question: "Can I cancel?",
    answer:
      "Yes, any time. No lock-in contract. If it's not earning its keep, you stop. We'd rather keep you because it works than because you're trapped.",
  },
];

export default function DoneForYouPage() {
  return (
    <>
      <JsonLd
        schema={wrapGraph([
          buildWebPage({ url: PAGE_URL, title: TITLE, description: DESCRIPTION }),
          buildService({
            name: "Done-for-you AI visibility (always-on)",
            url: PAGE_URL,
            description: DESCRIPTION,
            offers: [{ name: "Done-for-you", price: DONE_FOR_YOU.priceFrom, recurring: true }],
          }),
          buildBreadcrumb([
            { name: "Home", url: `${BUSINESS.url}/` },
            { name: "Done-for-you", url: PAGE_URL },
          ]),
        ])}
      />

      {/* Hero */}
      <Section className="pt-32 lg:pt-40">
        <MonoLabel>Done-for-you · Always on</MonoLabel>
        <h1 className="mt-5 max-w-[20ch] text-[length:var(--text-display)] font-extrabold leading-[0.98] tracking-[-0.035em]">
          The check finds the gaps. We close them for good.
        </h1>
        <p className="mt-6 max-w-[54ch] text-[length:var(--text-lede)] leading-[1.5] text-[var(--color-fg-variant)]">
          AI doesn&rsquo;t pick from a list. It names two or three businesses, and it re-reads the web constantly. A one-off
          fix fades. This is the always-on version: we keep you on the shortlist while you get on with the job.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <CheckButton label="Start with a free check" />
          <ButtonLink href="/contact/" variant="ghost" label="Talk to us" />
        </div>
        <p className="mt-5 text-[13px] text-[var(--color-fg-variant)]">
          From {PRICE_FROM} + {SETUP} one-off setup. No lock-in. You&rsquo;ll know the exact price before anything starts.
        </p>
      </Section>

      {/* Why one-off decays */}
      <Section tone="paper" className="border-t border-[var(--color-line-ink)]">
        <MonoLabel tone="light">Why one-off isn&rsquo;t enough</MonoLabel>
        <h2 className="mt-5 max-w-[24ch] text-[length:var(--text-section)] font-extrabold leading-[1.05] tracking-[-0.025em] text-[var(--color-ink)]">
          Getting found once is easy. Staying found is the work.
        </h2>
        <p className="mt-5 max-w-[60ch] text-[17px] leading-[1.6] text-[var(--color-ink-soft)]">
          Fix your profile today and you&rsquo;ll look great today. But AI re-reads the web every week, your hours and
          services change, competitors update their listings, and the models themselves shift. A snapshot quietly goes
          stale, and you slide back off the shortlist without ever knowing. The businesses AI keeps naming are the ones
          that stay current. That&rsquo;s a job, not a one-off.
        </p>
      </Section>

      {/* What we do */}
      <Section tone="dark">
        <MonoLabel>What we do, every week</MonoLabel>
        <h2 className="mt-5 max-w-[24ch] text-[length:var(--text-section)] font-extrabold leading-[1.05] tracking-[-0.025em]">
          The whole job, handled.
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {INCLUDED.map(([h, p]) => (
            <div
              key={h}
              className="grain rounded-2xl border border-[var(--color-border)] p-7 transition-colors hover:border-[color-mix(in_oklab,var(--color-signal)_40%,transparent)]"
              style={{ background: "linear-gradient(150deg,var(--color-surface-high),var(--color-surface-container))" }}
            >
              <h3 className="font-bold text-[var(--color-fg)]">{h}</h3>
              <p className="mt-2 text-[14px] leading-[1.6] text-[var(--color-fg-variant)]">{p}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Free check vs always-on */}
      <Section tone="paper-warm">
        <MonoLabel tone="light">Free check vs always-on</MonoLabel>
        <h2 className="mt-5 max-w-[22ch] text-[length:var(--text-section)] font-extrabold leading-[1.05] tracking-[-0.025em] text-[var(--color-ink)]">
          Two ways in. Same goal: get named.
        </h2>
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-[var(--color-line-ink)] bg-[var(--color-paper)] p-8">
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-ink-soft)]">
              Free AI Check
            </div>
            <ul className="mt-6 grid gap-3">
              {COMPARE.check.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] leading-[1.5] text-[var(--color-ink)]">
                  <span aria-hidden className="mt-0.5 select-none text-[var(--color-ink-soft)]">
                    •
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-[color-mix(in_oklab,var(--color-ink)_22%,transparent)] bg-[var(--color-ink)] p-8 text-[var(--color-fg)]">
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-signal)]">
              Done-for-you
            </div>
            <ul className="mt-6 grid gap-3">
              {COMPARE.service.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] leading-[1.5] text-[var(--color-fg)]">
                  <span aria-hidden className="mt-0.5 select-none text-[var(--color-signal)]">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* You're in control */}
      <Section tone="void">
        <div className="mx-auto max-w-[44ch] text-center">
          <MonoLabel className="justify-center">You stay in control</MonoLabel>
          <h2 className="mt-5 text-[length:var(--text-section)] font-extrabold leading-[1.05] tracking-[-0.03em]">
            Nothing goes public without your say-so.
          </h2>
          <p className="mt-6 text-[16px] leading-[1.6] text-[var(--color-fg-variant)]">
            We start by watching and recommending. Any change to a live listing, a post, or your site is queued for you
            to approve first. Once it&rsquo;s done, you get a before/after screenshot. It&rsquo;s your business and
            your reputation. We act on it the way you&rsquo;d want a trusted staff member to: carefully, and on the record.
          </p>
        </div>
      </Section>

      {/* Pricing */}
      <Section tone="dark">
        <div className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface-low)] p-8 lg:p-14">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, var(--color-signal-glow), transparent 70%)" }}
          />
          <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
            <div>
              <MonoLabel>Simple pricing</MonoLabel>
              <div className="mt-5 flex items-baseline gap-2">
                <span className="text-[length:var(--text-display)] font-extrabold leading-none tracking-[-0.04em]">
                  From {PRICE_FROM}
                </span>
              </div>
              <p className="mt-4 max-w-[40ch] text-[16px] leading-[1.6] text-[var(--color-fg-variant)]">
                Plus a one-off setup of {SETUP}, where the heavy lifting happens. No lock-in, cancel any time, and
                you&rsquo;ll know the exact price before a thing is touched.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <CheckButton label="Start with a free check" />
                <ButtonLink href="/contact/" variant="ghost" label="Talk to us" />
              </div>
            </div>
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-lowest)] p-6 font-mono text-[13px] leading-[1.9]">
              <div className="mb-4 text-[10px] uppercase tracking-[0.18em] text-[var(--color-fg-variant)]">
                Every month you get
              </div>
              <ul className="grid gap-2.5">
                {[
                  "Weekly AI visibility checks",
                  "Profile + site kept current",
                  "Reviews system running",
                  "Proof-of-work report w/ screenshots",
                  "A real person on it",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[var(--color-fg)]">
                    <span aria-hidden className="mt-0.5 select-none text-[var(--color-signal)]">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Faq tone="paper" title="Done-for-you questions" items={FAQ_ITEMS} />

      {/* Final CTA */}
      <Section tone="void">
        <div className="relative overflow-hidden rounded-3xl border border-[color-mix(in_oklab,var(--color-signal)_28%,var(--color-border))] px-8 py-16 text-center lg:py-24">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[440px] w-[760px] max-w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
            style={{ background: "radial-gradient(ellipse, var(--color-signal-glow), transparent 68%)" }}
          />
          <div className="relative">
            <h2 className="mx-auto max-w-[20ch] text-[length:var(--text-display)] font-extrabold leading-[0.98] tracking-[-0.035em] text-[var(--color-fg)]">
              Stay on the shortlist. Always.
            </h2>
            <p className="mx-auto mt-6 max-w-[50ch] text-[length:var(--text-lede)] leading-[1.5] text-[var(--color-fg-variant)]">
              Start with the free check to see where you stand. If you want it handled from there, we&rsquo;ll keep you
              there.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <CheckButton label="See what AI says about you" />
              <ButtonLink href="/contact/" variant="ghost" label="Talk to us" />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
