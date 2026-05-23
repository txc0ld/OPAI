import type { Metadata } from "next";
import { ServicePageLayout } from "@/components/service/service-page-layout";
import { FaqSection } from "@/components/faq/faq-section";
import { BUSINESS } from "@/lib/business";

const PAGE_URL = `${BUSINESS.url}/ai-integration-services/`;
const TITLE = "AI Integration Services for Small Business | OperateAI";
const DESCRIPTION =
  "AI integration services for small and medium businesses. OperateAI helps integrate AI tools, agents and automation into daily workflows. Perth-based, Australia-wide and online.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/ai-integration-services/" },
};

const FAQS = [
  {
    question: "What is AI integration?",
    answer:
      "AI integration is the process of connecting AI tools, agents and automation into the systems your business already uses — CRMs, helpdesks, document stores, spreadsheets, accounting tools — so AI supports daily operations rather than sitting in a separate app.",
  },
  {
    question: "Do we need to replace our existing tools?",
    answer:
      "No. OperateAI typically integrates AI alongside your existing tools (ChatGPT, Microsoft Copilot, Google Gemini, Notion, Zapier, Make, CRMs, helpdesks, accounting platforms) rather than replacing them.",
  },
  {
    question: "How long does an integration take?",
    answer:
      "A single high-value workflow typically takes 2 to 4 weeks from audit to handover. Larger multi-workflow programs run longer and are scoped on a roadmap after the AI Business Audit.",
  },
];

export default function Page() {
  return (
    <ServicePageLayout
      pageUrl={PAGE_URL}
      title={TITLE}
      description={DESCRIPTION}
      h1="AI integration services for small and medium businesses"
      opening={
        <>
          <p>
            AI integration is not about adding another tool to your business.
            It is about connecting AI to the way your business already works.
          </p>
          <p>
            OperateAI helps small and medium businesses integrate AI into
            practical workflows across admin, sales, customer service,
            operations, reporting, documentation and internal knowledge
            management.
          </p>
          <p>We focus on usable systems, not gimmicks.</p>
        </>
      }
      whoItIsFor={
        <p>
          This service is for businesses that want to move beyond casual AI
          usage and start using AI as part of daily operations. You may
          already use tools like ChatGPT, Microsoft Copilot, Google Gemini,
          Notion, Zapier, Make, CRMs, helpdesk software, accounting platforms
          or internal databases. We help identify where AI fits, what should
          be automated, what should stay human-led, and how to make the
          system reliable.
        </p>
      }
      included={{
        heading: "What we can integrate",
        items: [
          "AI chat assistants",
          "Internal knowledge bases",
          "Customer support workflows",
          "Sales and lead qualification workflows",
          "Document generation systems",
          "Email and inbox workflows",
          "CRM and pipeline workflows",
          "Reporting and summarisation workflows",
          "Standard operating procedures",
          "Staff training workflows",
        ],
      }}
      conversion={
        <p>
          The result is a practical AI system that supports your business
          instead of distracting it.
        </p>
      }
      ctaLabel="Book an AI Integration Call"
      relatedLinks={[
        { href: "/ai-agents-for-business/", label: "Custom AI Agents" },
        { href: "/ai-agent-hosting/", label: "AI Agent Hosting" },
        { href: "/ai-training-for-business/", label: "AI Training" },
        { href: "/book-ai-audit/", label: "Book an AI Business Audit" },
      ]}
      faq={<FaqSection items={FAQS} emitSchema={false} />}
      faqItems={FAQS}
    />
  );
}
