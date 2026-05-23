import type { Metadata } from "next";
import { ServicePageLayout } from "@/components/service/service-page-layout";
import { FaqSection } from "@/components/faq/faq-section";
import { BUSINESS } from "@/lib/business";

const PAGE_URL = `${BUSINESS.url}/ai-agent-hosting/`;
const TITLE = "AI Agent Hosting & Management | Managed AI Agents | OperateAI";
const DESCRIPTION =
  "Managed AI agent hosting, monitoring and optimisation for businesses. OperateAI hosts and manages AI agents so your team can use AI without technical overhead.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/ai-agent-hosting/" },
};

const FAQS = [
  {
    question: "What does managed AI agent hosting include?",
    answer:
      "Hosting, access management, prompt and knowledge-base maintenance, workflow monitoring, performance reviews, issue troubleshooting, usage reporting, security controls, and ongoing improvement recommendations.",
  },
  {
    question: "How do you handle security and access controls?",
    answer:
      "Every managed agent has defined access controls, logged activity, and a documented data-handling policy. We work with you to set role boundaries, retention rules and escalation paths before go-live.",
  },
  {
    question: "Can we cancel managed hosting?",
    answer:
      "Yes. Managed AI hosting runs on a month-to-month basis after the initial setup period. On cancellation we provide an offboarding handover covering knowledge bases, prompts, configuration and documentation.",
  },
];

export default function Page() {
  return (
    <ServicePageLayout
      pageUrl={PAGE_URL}
      title={TITLE}
      description={DESCRIPTION}
      h1="Managed AI agent hosting and support"
      opening={
        <>
          <p>
            Building an AI agent is only the first step. To be useful in a
            business, it needs to be hosted, monitored, maintained, updated
            and improved over time.
          </p>
          <p>
            OperateAI provides managed AI agent hosting and support for
            businesses that want the benefits of AI automation without
            carrying the technical burden internally.
          </p>
        </>
      }
      included={{
        heading: "What is included",
        items: [
          "AI agent setup and deployment",
          "Hosting and access management",
          "Prompt and instruction maintenance",
          "Knowledge base updates",
          "Workflow monitoring",
          "Performance reviews",
          "Issue troubleshooting",
          "Usage reporting",
          "Security and access controls",
          "Ongoing improvement recommendations",
        ],
      }}
      conversion={
        <p>
          Managed AI agent hosting is suitable for businesses that want AI
          systems operating reliably across customer support, sales, admin,
          internal knowledge, training or operational workflows. It is
          especially useful when your business does not have an internal AI
          engineer or automation specialist.
        </p>
      }
      ctaLabel="View Managed AI Options"
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
