import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact/contact-form";
import { FaqSection } from "@/components/faq/faq-section";
import { JsonLd } from "@/components/json-ld";
import { buildService, buildWebPage, wrapGraph } from "@/lib/schema";
import { BUSINESS } from "@/lib/business";

const PAGE_URL = `${BUSINESS.url}/book-ai-audit/`;
const TITLE = "Contact OperateAI | AI Business Audit";
const DESCRIPTION =
  "Contact OperateAI about an AI Business Audit. Tell us about your tools, workflows and where AI might help.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/book-ai-audit/" },
};

const DELIVERABLES = [
  "A look at how your business currently runs",
  "A map of where AI could help most",
  "Honest risk and feasibility notes",
  "Suggested tools and systems",
  "A plan ranked by value, effort and risk",
  "Next-step proposal if you want to keep going",
];

const FAQS = [
  {
    question: "How long is the audit?",
    answer:
      "Usually 1 to 2 weeks. Bigger businesses with more workflows take a little longer.",
  },
  {
    question: "What do we need to prepare?",
    answer:
      "A quick overview of your business, a list of the tools and systems you use, the parts of your week that take the most time, and any AI tools your team has already tried.",
  },
  {
    question: "What happens after the audit?",
    answer:
      "You get a clear plan and a proposal for what to do first. You can keep working with us on integration, custom agents, training or managed AI, or take the plan to someone else. Either way, you keep it.",
  },
  {
    question: "Is this for businesses that have never used AI?",
    answer:
      "Yes. The audit is just as useful if you have never used AI at all. We focus on the work, not the tech. You will leave with a plain-English plan you can act on, even if you have no technical staff.",
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
              "A simple, structured look at your tools, workflows and where AI could actually help, with a plain-English plan and risk notes.",
          }),
        ])}
      />

      <section className="bg-[var(--color-bg)] px-6 pt-[140px] pb-24 lg:px-12 lg:pt-[180px] lg:pb-32">
        <div className="mx-auto w-full max-w-[1200px]">
          <span className="eyebrow">Contact - Audit</span>
          <h1 className="mt-6 max-w-[20ch] text-[clamp(40px,7vw,88px)] font-extrabold leading-[1] tracking-[-0.04em]">
            Contact us about an AI Business Audit
          </h1>
          <div className="mt-8 max-w-[var(--measure)] space-y-5 text-[clamp(17px,2vw,21px)] leading-[1.55] text-[var(--color-w70)]">
            <p>
              Tell us what you are trying to improve. We will look at your
              tools, your workflows and where AI could actually help.
            </p>
            <p>
              This is the right starting point whether you have never used AI
              or you already have a few automations running.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-[14px]">
            <Link
              href="#contact-form"
              className="inline-flex items-center gap-2 rounded-[7px] bg-[var(--color-fg)] px-6 py-3.5 text-[15px] font-semibold text-black transition-transform duration-300 hover:-translate-y-0.5"
            >
              Send an enquiry →
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

      <section
        id="contact-form"
        className="border-t border-[var(--color-w10)] bg-[var(--color-bg)] px-6 py-24 lg:px-12 lg:py-32"
      >
        <div className="mx-auto grid w-full max-w-[1200px] gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <span className="eyebrow">Enquiry form</span>
            <h2 className="reveal mt-6 text-[clamp(28px,4vw,44px)] font-extrabold leading-[1.05] tracking-[-0.03em]">
              Tell us what is going on
            </h2>
            <p className="reveal mt-5 text-[16px] leading-[1.65] text-[var(--color-w70)]">
              Share the business, workflow or team problem you want to explore.
              A short note is enough. We will reply by email.
            </p>
          </div>
          <ContactForm defaultInterest="AI Business Audit" />
        </div>
      </section>

      <section className="border-t border-[var(--color-w10)] bg-[var(--color-bg)] px-6 py-24 lg:px-12 lg:py-32">
        <div className="mx-auto w-full max-w-[1200px]">
          <span className="eyebrow">What you get</span>
          <h2 className="reveal mt-6 text-[clamp(28px,4vw,44px)] font-extrabold leading-[1.05] tracking-[-0.03em]">
            Six things, plain English
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
            Tell us a bit about your business. We will work out the best
            opportunities, the things to avoid, and what to do first.
          </p>
          <div className="reveal mt-10 flex justify-center">
            <Link
              href="#contact-form"
              className="inline-flex items-center gap-2 rounded-[7px] bg-[var(--color-fg)] px-6 py-3.5 text-[15px] font-semibold text-black transition-transform duration-300 hover:-translate-y-0.5"
            >
              Send an enquiry →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
