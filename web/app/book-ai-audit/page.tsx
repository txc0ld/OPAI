import type { Metadata } from "next";
import Link from "next/link";
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

const BOOKING_HREF = "mailto:hello@operateai.com.au?subject=AI%20Business%20Audit%20Enquiry";

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

      <section className="bg-[var(--color-bg)] px-6 pt-[140px] pb-24 lg:px-12 lg:pt-[180px] lg:pb-32">
        <div className="mx-auto w-full max-w-[1200px]">
          <span className="eyebrow">Entry offer · Audit</span>
          <h1 className="mt-6 max-w-[20ch] text-[clamp(40px,7vw,88px)] font-extrabold leading-[1] tracking-[-0.04em]">
            Book an AI Business Audit
          </h1>
          <div className="mt-8 max-w-[var(--measure)] space-y-5 text-[clamp(17px,2vw,21px)] leading-[1.55] text-[var(--color-w70)]">
            <p>
              A focused review of your business workflows, tools, risks and AI opportunities. Best for
              businesses that want a clear starting point before investing in AI implementation.
            </p>
            <p>You will leave with a prioritised implementation roadmap instead of vague AI ideas.</p>
          </div>
          <div className="mt-10 flex flex-wrap gap-[14px]">
            {/* TODO(operator): replace mailto + data-booking-url placeholder with the real
                Cal.com / Calendly URL pre-launch. */}
            <Link
              href={BOOKING_HREF}
              data-booking-url="TODO(operator): https://cal.com/operateai/audit"
              className="inline-flex items-center gap-2 rounded-[7px] bg-[var(--color-fg)] px-6 py-3.5 text-[15px] font-semibold text-black transition-transform duration-300 hover:-translate-y-0.5"
            >
              Book a call →
            </Link>
            <Link
              href="/ai-integration-services/"
              className="inline-flex items-center gap-2 rounded-[7px] border border-[var(--color-w30)] px-6 py-3.5 text-[15px] font-semibold text-[var(--color-fg)] transition-colors duration-300 hover:border-[var(--color-fg)] hover:bg-[var(--color-w10)]"
            >
              See what comes after
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--color-w10)] bg-[var(--color-bg)] px-6 py-24 lg:px-12 lg:py-32">
        <div className="mx-auto w-full max-w-[1200px]">
          <span className="eyebrow">What you receive</span>
          <h2 className="reveal mt-6 text-[clamp(28px,4vw,44px)] font-extrabold leading-[1.05] tracking-[-0.03em]">
            Six deliverables
          </h2>
          <ul className="mt-10 grid list-none gap-x-12 gap-y-3 sm:grid-cols-2">
            {DELIVERABLES.map((d) => (
              <li key={d} className="reveal flex items-start gap-3 text-[15px] leading-[1.5] text-[var(--color-w70)]">
                <span className="mt-[7px] h-[7px] w-[7px] shrink-0 rounded-full bg-[var(--color-accent)]" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="border-t border-[var(--color-w10)]">
        <FaqSection items={FAQS} />
      </div>

      <section className="border-t border-[var(--color-w10)] bg-[var(--color-bg)] px-6 py-24 text-center lg:px-12 lg:py-32">
        <div className="mx-auto w-full max-w-[820px]">
          <h2 className="reveal text-[clamp(32px,5vw,56px)] font-extrabold leading-[1.05] tracking-[-0.03em]">
            Ready when you are.
          </h2>
          <p className="reveal mt-[22px] text-[clamp(17px,2vw,21px)] leading-[1.55] text-[var(--color-w70)]">
            We will identify the best opportunities, the risks to avoid, and the clearest next steps
            for implementation.
          </p>
          <div className="reveal mt-10 flex justify-center">
            <Link
              href={BOOKING_HREF}
              className="inline-flex items-center gap-2 rounded-[7px] bg-[var(--color-fg)] px-6 py-3.5 text-[15px] font-semibold text-black transition-transform duration-300 hover:-translate-y-0.5"
            >
              Email us to book →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
