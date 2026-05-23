import type { Metadata } from "next";
import { ServicePageLayout } from "@/components/service/service-page-layout";
import { FaqSection } from "@/components/faq/faq-section";
import { BUSINESS } from "@/lib/business";

const PAGE_URL = `${BUSINESS.url}/ai-training-for-business/`;
const TITLE = "AI Training for Business | Practical AI Training for SMBs | OperateAI";
const DESCRIPTION =
  "Practical AI training for small and medium businesses. Train owners, managers and staff to use AI tools, prompts, workflows and agents safely and effectively.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/ai-training-for-business/" },
};

const FAQS = [
  {
    question: "Do you train teams that have never used AI before?",
    answer:
      "Yes. Our beginner sessions assume zero prior experience and focus on what AI can and cannot do, how to use tools like ChatGPT effectively, and how to avoid common mistakes.",
  },
  {
    question: "Is training delivered in person or online?",
    answer:
      "Both. In-person sessions are available in Perth and on request elsewhere in Australia. Online sessions are available worldwide.",
  },
  {
    question: "Can you tailor training to our business?",
    answer:
      "Yes. Sessions are built around your team capability, the tools you already use, and the workflows where AI can make the biggest difference.",
  },
];

export default function Page() {
  return (
    <ServicePageLayout
      pageUrl={PAGE_URL}
      title={TITLE}
      description={DESCRIPTION}
      h1="Practical AI training for business owners and teams"
      opening={
        <>
          <p>AI training should not be abstract, technical or filled with hype.</p>
          <p>
            OperateAI provides practical AI training for small and medium
            businesses that want their owners, managers and staff to use AI
            tools confidently, safely and productively.
          </p>
        </>
      }
      body={
        <>
          <h2 className="font-heading text-[1.5rem] font-bold uppercase tracking-[-0.02em] text-[var(--color-on-surface)]">
            Training levels
          </h2>
          <div className="space-y-5">
            <div>
              <h3 className="font-heading text-[1.125rem] font-bold uppercase tracking-[-0.01em]">Beginner</h3>
              <p>
                For teams starting from zero. Learn what AI can do, where it
                fits in business, how to use tools like ChatGPT effectively,
                and how to avoid common mistakes.
              </p>
            </div>
            <div>
              <h3 className="font-heading text-[1.125rem] font-bold uppercase tracking-[-0.01em]">Intermediate</h3>
              <p>
                For teams already using AI casually. Learn stronger prompting,
                repeatable workflows, document handling, task automation and
                team-wide usage standards.
              </p>
            </div>
            <div>
              <h3 className="font-heading text-[1.125rem] font-bold uppercase tracking-[-0.01em]">Advanced</h3>
              <p>
                For technical or operations-focused teams. Learn AI agent
                workflows, automation planning, knowledge base design, tool
                selection, governance and implementation methods.
              </p>
            </div>
          </div>
        </>
      }
      included={{
        heading: "Training topics",
        items: [
          "AI fundamentals for business",
          "Prompting for practical work",
          "AI for admin, sales and operations",
          "AI-assisted writing and documentation",
          "AI workflow design",
          "AI agents and automation",
          "AI policy and governance",
          "Safe use of business data",
          "Tool selection and implementation",
          "Team adoption and change management",
        ],
      }}
      ctaLabel="Book AI Training"
      relatedLinks={[
        { href: "/ai-integration-services/", label: "AI Integration" },
        { href: "/ai-agents-for-business/", label: "Custom AI Agents" },
        { href: "/book-ai-audit/", label: "Book an AI Business Audit" },
      ]}
      faq={<FaqSection items={FAQS} emitSchema={false} />}
      faqItems={FAQS}
    />
  );
}
