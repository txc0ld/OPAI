import type { Metadata } from "next";
import { ServicePageLayout } from "@/components/service/service-page-layout";
import { FaqSection } from "@/components/faq/faq-section";
import { BUSINESS } from "@/lib/business";

const PAGE_URL = `${BUSINESS.url}/ai-integration-services/`;
const TITLE = "AI Integration Services for Small Business | OperateAI";
const DESCRIPTION =
  "Plug AI into the tools you already use. OperateAI helps small and medium businesses use AI in everyday work, without ripping out what already works.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/ai-integration-services/" },
};

const FAQS = [
  {
    question: "What is AI integration in plain English?",
    answer:
      "It just means connecting AI to the tools your business already uses. Your email, your CRM, your helpdesk, your documents, your spreadsheets. So AI helps you in the apps you are already in, rather than being one more thing to open.",
  },
  {
    question: "Do we need to replace our existing tools?",
    answer:
      "No. We work with the tools you already have. ChatGPT, Microsoft Copilot, Google Gemini, Notion, Zapier, Make, your CRM, your helpdesk, your accounting platform. We add AI alongside them.",
  },
  {
    question: "How long does an integration take?",
    answer:
      "One high-value workflow usually ships in 2 to 4 weeks. Bigger programs run longer and are mapped out after the AI Business Audit.",
  },
];

export default function Page() {
  return (
    <ServicePageLayout
      pageUrl={PAGE_URL}
      title={TITLE}
      description={DESCRIPTION}
      h1="AI integration services for small and medium businesses"
      heroImage={{
        src: "/operateai_integration_4x5.webp",
        alt: "INTEGRATION — Connect what already works. App icons (Slack, Sheets, Notion, HubSpot, Gmail, Salesforce) connected by lime threads to a central OperateAI hub.",
      }}
      opening={
        <>
          <p>
            AI is most useful when it fits the work you already do. We do not
            try to replace your tools or your team. We plug AI into the tools
            you already use, so the slow parts of your day get faster.
          </p>
          <p>
            Useful systems, not gimmicks.
          </p>
        </>
      }
      whoItIsFor={
        <p>
          This is for businesses that are ready to move past poking at AI on
          the side. You may already use ChatGPT, Microsoft Copilot, Gemini,
          Notion, Zapier, Make, a CRM, a helpdesk, or an accounting platform.
          We will help you work out where AI fits, what should be automated,
          what should stay human, and how to make the whole thing reliable.
        </p>
      }
      included={{
        heading: "What we can integrate",
        items: [
          "AI chat helpers",
          "Internal knowledge tools",
          "Customer support workflows",
          "Sales and lead qualification",
          "Document drafting",
          "Email and inbox workflows",
          "CRM and pipeline workflows",
          "Auto-summarised reports",
          "Standard operating procedures",
          "Staff training workflows",
        ],
      }}
      conversion={
        <p>
          The result is an AI system that supports your business instead of
          distracting it.
        </p>
      }
      ctaLabel="Book a chat"
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
