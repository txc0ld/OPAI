import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { MonoLabel } from "@/components/ui/mono-label";
import { CheckButton } from "@/components/ui/check-button";
import { ButtonLink } from "@/components/ui/button-link";
import { Faq } from "@/components/faq";
import { PricingCards } from "@/components/websites/pricing-cards";
import { JsonLd } from "@/components/json-ld";
import { buildWebPage, buildService, buildBreadcrumb, wrapGraph } from "@/lib/schema";
import { BUSINESS, WEBSITE_PACKAGES } from "@/lib/business";

const PAGE_URL = `${BUSINESS.url}/websites/`;
const TITLE = "Website design that AI can read and recommend";
const DESCRIPTION =
  "Fixed-price website packages for Perth businesses, built AI-readable so ChatGPT, Gemini and Google's AI can read your services and put you on the shortlist. Pick a package, pay a deposit, we build it.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/websites/" },
  openGraph: { type: "website", url: PAGE_URL, title: TITLE, description: DESCRIPTION },
};

const STEPS = [
  ["01", "Pick a package", "Choose Starter, Business or Premium and pay the deposit to lock in your spot. Fixed price, agreed up front."],
  ["02", "We scope it", "A quick call to get your services, areas and goals. We do the thinking so you don't have to brief like a designer."],
  ["03", "We build it AI-readable", "Designed, written and structured so AI can read what you do, where, and for how much. Not just pretty, findable."],
  ["04", "You approve, we launch", "Review it, request tweaks, and we go live. The balance is due once you're happy and the site is up."],
] as const;

const FAQ_ITEMS = [
  {
    question: "What makes an “AI-readable” website different?",
    answer:
      "Most sites are built for looks, with services and prices buried in images or scripts AI can't read. We structure yours in plain text with the right schema, so ChatGPT, Gemini and Google's AI can actually read what you do, where, and for how much, and put you on the shortlist.",
  },
  {
    question: "How does payment work?",
    answer:
      "You pay a deposit to kick things off (half the package price), then the balance when you're happy and we launch. The price is fixed and agreed before we start. No hourly surprises.",
  },
  {
    question: "How long does it take?",
    answer:
      "Starter is about a week, Business 2 to 3 weeks, Premium around 4. The clock starts once the deposit is in and we have your details.",
  },
  {
    question: "Do I have to write the content?",
    answer:
      "No. Business and Premium include professional copy written to be AI-readable. We ask you a few questions, then handle the words.",
  },
  {
    question: "Do I own the website?",
    answer: "Yes. Your domain, your content, your site. No lock-in, and you can take it anywhere.",
  },
  {
    question: "Can you keep it found by AI after launch?",
    answer:
      "Yes. That's the done-for-you service: we keep your profile, site and reviews current so you stay on the AI shortlist as things change. Plenty of clients start with a website and add it.",
  },
];

const INCLUDED = ["Mobile-first", "Lightning fast", "Built AI-readable"];

export default function WebsitesPage() {
  return (
    <>
      <JsonLd
        schema={wrapGraph([
          buildWebPage({ url: PAGE_URL, title: TITLE, description: DESCRIPTION }),
          buildService({
            name: "Website design (AI-readable)",
            url: PAGE_URL,
            description: DESCRIPTION,
            offers: WEBSITE_PACKAGES.map((p) => ({ name: p.name, price: p.priceFrom })),
          }),
          buildBreadcrumb([
            { name: "Home", url: `${BUSINESS.url}/` },
            { name: "Websites", url: PAGE_URL },
          ]),
        ])}
      />

      {/* Hero */}
      <Section className="pt-32 lg:pt-40">
        <MonoLabel>Websites · Built AI-readable</MonoLabel>
        <h1 className="mt-5 max-w-[20ch] text-[length:var(--text-display)] font-extrabold leading-[0.98] tracking-[-0.035em]">
          A website AI can read. And recommend.
        </h1>
        <p className="mt-6 max-w-[56ch] text-[length:var(--text-lede)] leading-[1.5] text-[var(--color-fg-variant)]">
          Most websites look fine but AI can&rsquo;t read them, so they never get named. We build yours so ChatGPT,
          Gemini and Google&rsquo;s AI can read your services, prices and suburbs, and put you on the shortlist.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          {INCLUDED.map((item) => (
            <span
              key={item}
              className="rounded-full border border-[var(--color-border)] px-4 py-2 font-mono text-[12px] uppercase tracking-[0.12em] text-[var(--color-fg-variant)]"
            >
              {item}
            </span>
          ))}
        </div>
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <ButtonLink href="#packages" label="See the packages" />
          <CheckButton label="Start with a free check" variant="ghost" />
        </div>
        <p className="mt-5 text-[13px] text-[var(--color-fg-variant)]">
          Fixed-price packages from A$849. 50% deposit to start, balance on launch.
        </p>
      </Section>

      {/* How it works */}
      <Section tone="paper">
        <MonoLabel tone="light">How it works</MonoLabel>
        <h2 className="mt-5 max-w-[22ch] text-[length:var(--text-section)] font-extrabold leading-[1.05] tracking-[-0.025em] text-[var(--color-ink)]">
          From brief to booked, done for you.
        </h2>
        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(([n, h, p]) => (
            <li key={n} className="rounded-2xl border border-[var(--color-line-ink)] bg-[var(--color-paper)] p-7">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-[var(--color-ink)] text-[13px] font-extrabold text-[var(--color-paper)]">
                {n}
              </div>
              <h3 className="mt-4 font-bold text-[var(--color-ink)]">{h}</h3>
              <p className="mt-2 text-[14px] leading-[1.6] text-[var(--color-ink-soft)]">{p}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Packages */}
      <Section tone="dark" id="packages" className="scroll-mt-24">
        <MonoLabel>Packages</MonoLabel>
        <h2 className="mt-5 max-w-[20ch] text-[length:var(--text-section)] font-extrabold leading-[1.05] tracking-[-0.025em]">
          Pick your package.
        </h2>
        <p className="mt-5 max-w-[52ch] text-[16px] leading-[1.6] text-[var(--color-fg-variant)]">
          Fixed price, no surprises. Pay a deposit to start, and the balance when you&rsquo;re happy and we launch.
        </p>
        <div className="mt-10">
          <PricingCards />
        </div>
        <p className="mt-8 text-[14px] text-[var(--color-fg-variant)]">
          Not sure which fits?{" "}
          <a href="/contact/" className="font-semibold text-[var(--color-signal)] underline-offset-4 hover:underline">
            Tell us about your business
          </a>{" "}
          and we&rsquo;ll point you to the right one.
        </p>
      </Section>

      <Faq tone="paper" title="Website questions" items={FAQ_ITEMS} />

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
              A website that gets you found.
            </h2>
            <p className="mx-auto mt-6 max-w-[50ch] text-[length:var(--text-lede)] leading-[1.5] text-[var(--color-fg-variant)]">
              Pick a package and we&rsquo;ll build you a site AI actually reads. Not sure where you stand? Start with the
              free check.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <ButtonLink href="#packages" label="See the packages" />
              <ButtonLink href="/contact/" label="Talk to us" variant="ghost" />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
