import type { Metadata } from "next";
import { ServicePageLayout } from "@/components/service/service-page-layout";
import { FaqSection } from "@/components/faq/faq-section";
import { BUSINESS } from "@/lib/business";

const PAGE_URL = `${BUSINESS.url}/ai-agent-hosting/`;
const TITLE = "AI Agent Hosting & Management | Managed AI Agents | OperateAI";
const DESCRIPTION =
  "We host, watch and look after your AI agents so they keep working. Managed AI for businesses without technical staff in-house.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/ai-agent-hosting/" },
};

const FAQS = [
  {
    question: "What does managed AI hosting include?",
    answer:
      "We host the agent, manage who can access it, keep its prompts and knowledge up to date, watch how it performs, fix issues, give you usage reports, and recommend improvements as things change.",
  },
  {
    question: "How do you handle security and access?",
    answer:
      "Every agent we manage has clear access controls, logged activity, and a written data-handling policy. We agree the rules with you before go-live: who can use it, what it can see, how long things are kept.",
  },
  {
    question: "Can we cancel managed hosting?",
    answer:
      "Yes. Managed AI runs month-to-month after the initial setup. If you cancel, we hand over the knowledge bases, prompts, configuration and documentation so you keep ownership.",
  },
];

export default function Page() {
  return (
    <ServicePageLayout
      pageUrl={PAGE_URL}
      title={TITLE}
      description={DESCRIPTION}
      h1="Managed AI agent hosting and support"
      heroImage={{
        src: "/operateai_04_automation_flow.webp",
        alt: "A diagram showing TRIGGER, AI AGENT, ACTION and NOTIFY nodes connected — a managed automation flow OperateAI runs for you.",
      }}
      opening={
        <>
          <p>
            Building an AI agent is only step one. To be useful in a business,
            it has to keep working: hosted, watched, updated, and fixed when
            things change.
          </p>
          <p>
            We do that part. You get the benefit of AI automation without
            needing a technical team in-house.
          </p>
        </>
      }
      included={{
        heading: "What is included",
        items: [
          "Setup and deployment",
          "Hosting and access management",
          "Prompt and instruction upkeep",
          "Knowledge base updates",
          "Workflow monitoring",
          "Performance reviews",
          "Issue fixes",
          "Usage reports",
          "Security and access controls",
          "Ongoing improvements",
        ],
      }}
      conversion={
        <p>
          Managed AI is a good fit when you want AI working quietly in the
          background across customer support, sales, admin or operations,
          without having to staff up a technical team to run it.
        </p>
      }
      ctaLabel="See managed AI options"
      relatedLinks={[
        { href: "/ai-agents-for-business/", label: "Custom AI Agents" },
        { href: "/ai-integration-services/", label: "AI Integration" },
        { href: "/book-ai-audit/", label: "Book an AI Business Audit" },
      ]}
      faq={<FaqSection items={FAQS} emitSchema={false} />}
      faqItems={FAQS}
    />
  );
}
