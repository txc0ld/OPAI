import type { Metadata } from "next";
import { ServicePageLayout } from "@/components/service/service-page-layout";
import { FaqSection } from "@/components/faq/faq-section";
import { BUSINESS } from "@/lib/business";

const PAGE_URL = `${BUSINESS.url}/ai-agents-for-business/`;
const TITLE = "AI Agents for Business | Custom AI Agents for SMBs | OperateAI";
const DESCRIPTION =
  "Custom AI agents for small and medium businesses. We build helpers for customer support, admin, sales, operations, documents and internal knowledge.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/ai-agents-for-business/" },
};

const FAQS = [
  {
    question: "What is the difference between an AI agent and a chatbot?",
    answer:
      "A chatbot follows a fixed script. An AI agent has a clear role, the right business information, clear instructions, and a job to do. Agents can look things up, draft replies, process documents, and work through more than one step on their own.",
  },
  {
    question: "Where do AI agents store our business information?",
    answer:
      "In a knowledge area you control. It is usually a curated set of FAQs, policies, documents or procedures. We do not push your customer data into public training pipelines, and every agent has access controls baked in.",
  },
  {
    question: "Can AI agents connect to our existing tools?",
    answer:
      "Yes. Agents can hook into CRMs, helpdesks, document stores, ticketing systems, calendars and similar tools where the integration is supported and you have the permissions. Scope is decided per build.",
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
            An AI agent is a helper with one clear job. It can answer customer
            questions, look things up in your documents, draft messages,
            qualify leads, or work through a process for your team.
          </p>
          <p>
            We design and build these agents for small and medium businesses.
            Whether you have never used one before, or you already have a few
            running, we will build the right one for your work.
          </p>
        </>
      }
      body={
        <>
          <h2 className="font-heading text-[1.5rem] font-bold uppercase tracking-[-0.02em] text-[var(--color-fg)]">
            An AI agent is not just a chatbot.
          </h2>
          <p>
            A good AI agent has a clear job, the right information, clear
            instructions, and limits on what it can and cannot do. That is
            what makes it actually useful in a real business.
          </p>
        </>
      }
      included={{
        heading: "What every agent we build includes",
        items: [
          "A clear job and scope",
          "A curated knowledge base",
          "Safety rules and refusal behaviour",
          "An escalation path to a human",
          "Documentation for your team",
          "Logging so you can review what it did",
          "Tuning over time as you use it",
          "Access controls and data rules",
        ],
      }}
      secondaryList={{
        heading: "What agents we usually build",
        items: [
          "A customer support helper trained on your FAQs and policies",
          "An internal staff helper trained on your procedures and docs",
          "A sales helper that qualifies leads and drafts follow-ups",
          "An operations helper for summaries, handovers and task notes",
          "An admin helper for intake forms, emails and data extraction",
          "A training helper for onboarding new staff",
        ],
      }}
      conversion={
        <p>
          A badly designed agent creates risk and confusion. A well-designed
          one quietly takes work off your team. We do not build agents to
          replace people. We build them so people can spend time on the work
          that needs them.
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
