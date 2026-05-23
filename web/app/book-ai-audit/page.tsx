import type { Metadata } from "next";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/button";
import { Reveal } from "@/components/reveal";
import { JsonLd } from "@/components/json-ld";
import { buildService, buildWebPage, wrapGraph } from "@/lib/schema";
import { FaqSection } from "@/components/faq/faq-section";
import { BUSINESS } from "@/lib/business";

const PAGE_URL = `${BUSINESS.url}/book-ai-audit/`;
const TITLE = "Book an AI Business Audit | OperateAI";
const DESCRIPTION =
  "Book an AI Business Audit with OperateAI. A focused review of your workflows, tools, risks and AI opportunities, with a prioritised implementation roadmap.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/book-ai-audit/" },
};

const DELIVERABLES = [
  "Workflow review",
  "AI opportunity map",
  "Risk and feasibility assessment",
  "Recommended tools and systems",
  "Prioritised implementation roadmap",
  "Next-step proposal",
];

const FAQS = [
  {
    question: "How long is the audit?",
    answer:
      "The audit is typically delivered over 1 to 2 weeks, depending on the size of your business and the number of workflows under review.",
  },
  {
    question: "What do we need to prepare?",
    answer:
      "An overview of your business, a list of the tools and systems you currently use, the workflows that consume the most time, and (if available) any prior AI tool usage your team has experimented with.",
  },
  {
    question: "What happens after the audit?",
    answer:
      "You receive a prioritised implementation roadmap and a next-step proposal. From there you can engage OperateAI for an AI Integration Sprint, custom AI agent build, training, or managed AI operations — or take the roadmap to another provider.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLd
        schema={wrapGraph([
          buildWebPage({ url: PAGE_URL, title: TITLE, description: DESCRIPTION }),
          buildService({
            name: "AI Business Audit",
            url: PAGE_URL,
            description:
              "A focused review of your business workflows, tools, risks and AI opportunities, delivering a prioritised AI implementation roadmap.",
          }),
        ])}
      />

      <Section tone="paper">
        <Reveal>
          <p className="font-heading text-[0.75rem] font-bold uppercase tracking-[0.08em] text-[var(--color-muted)]">
            Entry offer · Audit
          </p>
          <h1 className="mt-5 max-w-[20ch] font-heading text-[clamp(2.5rem,6vw,4rem)] font-bold leading-[0.95] tracking-[-0.04em]">
            Book an AI Business Audit
          </h1>
          <div className="mt-8 max-w-[var(--measure)] space-y-5 text-[1.0625rem] leading-[1.65] text-[var(--color-muted)]">
            <p>
              A focused review of your business workflows, tools, risks and AI
              opportunities. Best for businesses that want a clear starting
              point before investing in AI implementation.
            </p>
            <p>
              You will leave with a prioritised implementation roadmap instead
              of vague AI ideas.
            </p>
          </div>
          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row">
            {/*
              TODO(operator): replace data-booking-url placeholder with the real
              Cal.com / Calendly URL, then wire this Button to <a href={...}>
              or swap in the booking embed component.
            */}
            <Button
              as="a"
              href="mailto:hello@operateai.com.au?subject=AI%20Business%20Audit%20Enquiry"
              data-booking-url="TODO(operator): https://cal.com/operateai/audit"
              size="lg"
            >
              Book a call
            </Button>
            <Button as="a" href="/ai-integration-services/" variant="outline" size="lg">
              See what comes after
            </Button>
          </div>
        </Reveal>
      </Section>

      <Section tone="paper" className="border-t-[3px] border-black">
        <SectionHeading title="What you receive" as="h2" className="mb-8" />
        <ul className="grid gap-x-10 gap-y-3 sm:grid-cols-2">
          {DELIVERABLES.map((d) => (
            <li key={d} className="flex gap-3 text-[1rem] leading-[1.5]">
              <span className="mt-2 h-2 w-2 shrink-0 bg-[var(--color-primary-container)] ring-2 ring-black" />
              <span>{d}</span>
            </li>
          ))}
        </ul>
      </Section>

      <FaqSection items={FAQS} />

      <Section tone="ink" className="border-t-[3px] border-black">
        <Reveal>
          <h2 className="font-heading text-[clamp(2rem,4.5vw,3rem)] font-bold uppercase leading-[1] tracking-[-0.035em] text-white">
            Ready when you are.
          </h2>
          <p className="mt-6 max-w-[var(--measure)] text-[1.0625rem] leading-[1.6] text-white/75">
            We will identify the best opportunities, the risks to avoid, and
            the clearest next steps for implementation.
          </p>
          <div className="mt-8">
            <Button
              as="a"
              href="mailto:hello@operateai.com.au?subject=AI%20Business%20Audit%20Enquiry"
              variant="inverse"
              size="lg"
            >
              Email us to book
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
