import type { Metadata } from "next";
import { ServicePageLayout } from "@/components/service/service-page-layout";
import { FaqSection } from "@/components/faq/faq-section";
import { BUSINESS } from "@/lib/business";

const PAGE_URL = `${BUSINESS.url}/ai-agents-for-business/`;
const TITLE = "AI Agents for Business | Custom AI Agents for SMBs | OperateAI";
const DESCRIPTION =
  "Custom AI agents for small and medium businesses. Build AI agents for customer support, admin, sales, operations, documents and internal knowledge workflows.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/ai-agents-for-business/" },
};

const FAQS = [
  {
    question: "What is the difference between an AI agent and a chatbot?",
    answer:
      "A chatbot follows a fixed script. An AI agent has a defined role, access to the right business information, clear instructions, usage boundaries, and a workflow it is designed to support. Agents can retrieve information, draft responses, process documents and operate across multiple steps.",
  },
  {
    question: "Where do AI agents store our business information?",
    answer:
      "We design agents with a defined knowledge boundary — typically a curated knowledge base of FAQs, policies, documents or procedures that you control. We do not feed customer data into public training pipelines, and access controls are part of every build.",
  },
  {
    question: "Can AI agents connect to our existing tools?",
    answer:
      "Yes. Agents can be wired to CRMs, helpdesks, document stores, ticketing systems, calendars and similar tools where the integration is supported and authorised. Scope is defined per build.",
  },
];

export default function Page() {
  return (
    <ServicePageLayout
      pageUrl={PAGE_URL}
      title={TITLE}
      description={DESCRIPTION}
      h1="Custom AI agents for business workflows"
      opening={
        <>
          <p>
            AI agents can help your business handle repetitive,
            information-heavy and process-driven work with greater speed and
            consistency.
          </p>
          <p>
            OperateAI designs and builds custom AI agents for small and medium
            businesses. These agents can support staff, assist customers,
            retrieve business information, process documents, draft responses,
            qualify leads and help automate routine workflows.
          </p>
        </>
      }
      body={
        <>
          <h2 className="font-heading text-[1.5rem] font-bold uppercase tracking-[-0.02em] text-[var(--color-on-surface)]">
            An AI agent is not just a chatbot.
          </h2>
          <p>
            A properly designed AI agent has a defined role, access to the
            right business information, clear instructions, usage boundaries
            and a workflow it is designed to support.
          </p>
        </>
      }
      included={{
        heading: "What every agent we build includes",
        items: [
          "Clearly defined role and scope",
          "Curated knowledge base",
          "Guardrails and refusal behaviour",
          "Escalation paths to humans",
          "Documentation for staff and operators",
          "Logging and review hooks",
          "Performance tuning over time",
          "Access controls and data handling rules",
        ],
      }}
      secondaryList={{
        heading: "Agent examples",
        items: [
          "Customer support agent trained on your FAQs, policies and service information",
          "Internal staff assistant trained on procedures, documents and business knowledge",
          "Sales assistant for lead qualification, follow-up and proposal drafting",
          "Operations assistant for task summaries, handovers and workflow support",
          "Admin assistant for intake forms, emails, document drafting and data extraction",
          "Training assistant for onboarding and staff education",
        ],
      }}
      conversion={
        <p>
          Poorly designed AI agents create risk, confusion and inconsistent
          results. OperateAI designs agents with clear scope, guardrails,
          escalation paths, documentation and ongoing improvement. The goal is
          not to replace your team. The goal is to give your team better
          systems.
        </p>
      }
      ctaLabel="Discuss an AI Agent Build"
      relatedLinks={[
        { href: "/ai-agent-hosting/", label: "AI Agent Hosting" },
        { href: "/ai-integration-services/", label: "AI Integration" },
        { href: "/book-ai-audit/", label: "Book an AI Business Audit" },
      ]}
      faq={<FaqSection items={FAQS} emitSchema={false} />}
      faqItems={FAQS}
    />
  );
}
