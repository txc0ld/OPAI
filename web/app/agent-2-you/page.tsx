import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { MonoLabel } from "@/components/ui/mono-label";
import { CheckButton } from "@/components/ui/check-button";
import { ButtonLink } from "@/components/ui/button-link";
import { Faq } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { buildWebPage, buildService, buildBreadcrumb, wrapGraph } from "@/lib/schema";
import { BUSINESS } from "@/lib/business";

const PAGE_URL = `${BUSINESS.url}/agent-2-you/`;
const TITLE = "Agent 2 You: your own AI agent, built for your business";
const DESCRIPTION =
  "We build and deploy a custom AI agent for your business: it answers enquiries, follows up customers, and handles the admin you hate, running on its own always-on computer, set up around how you actually work.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/agent-2-you/" },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    title: TITLE,
    description: DESCRIPTION,
  },
};

// What the agent can take off the owner's plate — fitted per client, not a fixed menu.
const JOBS = [
  [
    "Answer and qualify enquiries",
    "Replies to leads the moment they land, asks the right questions, books the job or hands you a qualified one. A missed call is a lost job. Now it stops being missed.",
  ],
  [
    "Follow up customers",
    "Chases quotes that went quiet, asks happy customers for reviews, brings past clients back. The follow-up you never get around to, done every time.",
  ],
  [
    "Handle the back-office",
    "The admin you hate: data entry, scheduling, quote prep, moving information between your tools and keeping everything up to date.",
  ],
  [
    "Whatever's eating your week",
    "Every business has one repetitive job that quietly burns hours. We find yours and build the agent around it. Not a template. Your bottleneck.",
  ],
] as const;

const STEPS = [
  [
    "01",
    "We map your bottleneck",
    "A short discovery call. We find the repetitive, time-sucking work that an agent can take off your plate first.",
  ],
  [
    "02",
    "We build it around you",
    "The agent is set up custom to how your business runs and the tools you already use. Not a one-size-fits-all bot.",
  ],
  [
    "03",
    "It goes live on its own computer",
    "Your agent runs on its own dedicated, always-on machine in the cloud. Private to your business, working 24/7, no laptop to leave on.",
  ],
  [
    "04",
    "You stay in control",
    "It works; you approve anything that matters before it goes out, and you can see exactly what it did. Like a reliable staff member, on the record.",
  ],
] as const;

const FAQ_ITEMS = [
  {
    question: "What exactly is an AI agent?",
    answer:
      "Think of it as a tireless staff member that lives on a computer. It can read and reply to messages, use your software, fill things in, follow up people, and do multi-step jobs on its own. The repetitive work, handled. We build it for your business and it runs around the clock.",
  },
  {
    question: "Is this a fixed product or built for me?",
    answer:
      "Built for you. We scope what your business actually needs and set the agent up around that: your jobs, your tools, your way of working. Two businesses rarely get the same agent.",
  },
  {
    question: "Where does it run? Is my data safe?",
    answer:
      "On its own dedicated, always-on computer in the cloud, isolated to your business, never shared with anyone else. It only connects to the tools and accounts you approve, and we use delegated access rather than handing it your passwords wherever possible.",
  },
  {
    question: "Will it do things without asking me?",
    answer:
      "Not the things that matter. It starts by doing the work and showing you, with anything public or irreversible queued for your approval first. You decide what it's allowed to do on its own as you build trust in it.",
  },
  {
    question: "How is this different from the free check or done-for-you?",
    answer:
      "The free check tells you how AI sees your business. Done-for-you keeps you on AI's shortlist. Agent 2 You is the next level: an agent that actually does the work inside your business, not just gets you found.",
  },
  {
    question: "What does it cost?",
    answer:
      "It's priced to your build, because every agent's scoped to what your business needs. It's far less than a hire and it never clocks off. Start with a quick call and you'll get a clear, fixed quote before anything's built.",
  },
];

export default function Agent2YouPage() {
  return (
    <>
      <JsonLd
        schema={wrapGraph([
          buildWebPage({ url: PAGE_URL, title: TITLE, description: DESCRIPTION }),
          buildService({
            name: "Agent 2 You: custom AI agent setup",
            url: PAGE_URL,
            description: DESCRIPTION,
          }),
          buildBreadcrumb([
            { name: "Home", url: `${BUSINESS.url}/` },
            { name: "Agent 2 You", url: PAGE_URL },
          ]),
        ])}
      />

      {/* Hero */}
      <Section className="pt-32 lg:pt-40">
        <MonoLabel>Agent 2 You · Custom AI agents</MonoLabel>
        <h1 className="mt-5 max-w-[18ch] text-[length:var(--text-display)] font-extrabold leading-[0.98] tracking-[-0.035em]">
          Your own AI agent, built around your business.
        </h1>
        <p className="mt-6 max-w-[56ch] text-[length:var(--text-lede)] leading-[1.5] text-[var(--color-fg-variant)]">
          Not a chatbot. A tireless team member that lives on its own always-on computer and does the repetitive
          work for you: answering enquiries, following up customers, handling the admin. We build it custom to your
          business and set the whole thing up.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <ButtonLink href="/contact/" label="Book a setup call" />
          <CheckButton label="Start with a free check" variant="ghost" />
        </div>
        <p className="mt-5 text-[13px] text-[var(--color-fg-variant)]">
          Built for you · Runs 24/7 · You stay in control. Priced to your build. Clear quote before anything starts.
        </p>
      </Section>

      {/* What it takes off your plate */}
      <Section tone="paper-warm">
        <MonoLabel tone="light">What it takes off your plate</MonoLabel>
        <h2 className="mt-5 max-w-[24ch] text-[length:var(--text-section)] font-extrabold leading-[1.05] tracking-[-0.025em] text-[var(--color-ink)]">
          The work that&rsquo;s eating your week, handled.
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {JOBS.map(([h, p]) => (
            <div key={h} className="rounded-2xl border border-[var(--color-line-ink)] bg-[var(--color-paper)] p-7">
              <h3 className="font-bold text-[var(--color-ink)]">{h}</h3>
              <p className="mt-2 text-[14px] leading-[1.6] text-[var(--color-ink-soft)]">{p}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* How it works */}
      <Section tone="dark">
        <MonoLabel>How we set it up</MonoLabel>
        <h2 className="mt-5 max-w-[22ch] text-[length:var(--text-section)] font-extrabold leading-[1.05] tracking-[-0.025em]">
          Done for you, start to finish.
        </h2>
        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(([n, h, p]) => (
            <li
              key={n}
              className="grain rounded-2xl border border-[var(--color-border)] p-7"
              style={{ background: "linear-gradient(150deg,var(--color-surface-high),var(--color-surface-container))" }}
            >
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-[var(--color-signal)] text-[13px] font-extrabold text-[var(--color-on-signal)]">
                {n}
              </div>
              <h3 className="mt-4 font-bold text-[var(--color-fg)]">{h}</h3>
              <p className="mt-2 text-[14px] leading-[1.6] text-[var(--color-fg-variant)]">{p}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Why an agent */}
      <Section tone="paper-warm">
        <MonoLabel tone="light">Why an agent, not another hire</MonoLabel>
        <h2 className="mt-5 max-w-[22ch] text-[length:var(--text-section)] font-extrabold leading-[1.05] tracking-[-0.025em] text-[var(--color-ink)]">
          It doesn&rsquo;t sleep, quit, or call in sick.
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {[
            ["Always on", "Works nights, weekends and the moment a lead comes in, not just business hours."],
            ["Costs less than a hire", "No wage, no super, no onboarding. A fraction of the cost of the staff member you can't justify yet."],
            ["Scales with you", "Busy week? It doesn't get overwhelmed. Quiet week? It's not sitting idle on the payroll."],
          ].map(([h, p]) => (
            <div key={h} className="rounded-2xl border border-[var(--color-line-ink)] bg-[var(--color-paper)] p-7">
              <h3 className="font-bold text-[var(--color-ink)]">{h}</h3>
              <p className="mt-2 text-[14px] leading-[1.6] text-[var(--color-ink-soft)]">{p}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* You stay in control */}
      <Section tone="void">
        <div className="mx-auto max-w-[44ch] text-center">
          <MonoLabel className="justify-center">It&rsquo;s your agent</MonoLabel>
          <h2 className="mt-5 text-[length:var(--text-section)] font-extrabold leading-[1.05] tracking-[-0.03em]">
            Yours, private, and under your control.
          </h2>
          <p className="mt-6 text-[16px] leading-[1.6] text-[var(--color-fg-variant)]">
            Your agent runs on its own computer, isolated to your business and no one else&rsquo;s. It only touches the
            accounts you approve, anything that matters waits for your say-so, and you can see exactly what it&rsquo;s
            done. You decide how much it runs on its own as you learn to trust it.
          </p>
        </div>
      </Section>

      <Faq tone="paper" title="Agent 2 You questions" items={FAQ_ITEMS} />

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
              Put an agent to work in your business.
            </h2>
            <p className="mx-auto mt-6 max-w-[50ch] text-[length:var(--text-lede)] leading-[1.5] text-[var(--color-fg-variant)]">
              Tell us where your week goes. We&rsquo;ll show you what an agent built for your business could take off
              your plate, and what it&rsquo;d cost.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <ButtonLink href="/contact/" label="Book a setup call" />
              <ButtonLink href="/done-for-you/" variant="ghost" label="See done-for-you" />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
