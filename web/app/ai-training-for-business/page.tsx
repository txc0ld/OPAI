import type { Metadata } from "next";
import { ServicePageLayout } from "@/components/service/service-page-layout";
import { FaqSection } from "@/components/faq/faq-section";
import { BUSINESS } from "@/lib/business";

const PAGE_URL = `${BUSINESS.url}/ai-training-for-business/`;
const TITLE = "AI Training for Business | Practical AI Training for SMBs | OperateAI";
const DESCRIPTION =
  "Plain-English AI training for small and medium businesses. Show your team how to actually use AI tools, whatever their starting point.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/ai-training-for-business/" },
};

const FAQS = [
  {
    question: "Do you train teams that have never used AI before?",
    answer:
      "Yes. Beginner sessions assume zero experience. We cover what AI is good at, what it is not, how to use tools like ChatGPT properly, and the common mistakes to avoid.",
  },
  {
    question: "Is training delivered in person or online?",
    answer:
      "Both. In-person sessions are available in Perth, and on request elsewhere in Australia. Online sessions are available worldwide.",
  },
  {
    question: "Can you tailor training to our business?",
    answer:
      "Yes. Every session is built around your team, the tools you already use, and the work where AI will make the biggest difference.",
  },
];

export default function Page() {
  return (
    <ServicePageLayout
      pageUrl={PAGE_URL}
      title={TITLE}
      description={DESCRIPTION}
      h1="Practical AI training for business owners and teams"
      heroImage={{
        src: "/operateai_training_4x5.webp",
        alt: "TRAINING. Upskill your team. Practical, hands-on training to help you work smarter with AI. A laptop on a desk showing Module 03 — Prompt Engineering with a lime waveform.",
      }}
      opening={
        <>
          <p>AI training should be practical, not buzzword soup.</p>
          <p>
            We teach owners, managers and staff how to actually use AI tools at
            work. Whether someone on your team has never opened ChatGPT, or
            they already build agents, we meet them where they are.
          </p>
        </>
      }
      body={
        <>
          <h2 className="font-heading text-[1.5rem] font-bold uppercase tracking-[-0.02em] text-[var(--color-fg)]">
            Three levels
          </h2>
          <div className="space-y-5">
            <div>
              <h3 className="font-heading text-[1.125rem] font-bold uppercase tracking-[-0.01em]">Beginner</h3>
              <p>
                For teams starting from zero. Learn what AI can and cannot do,
                how to use tools like ChatGPT properly, and the common mistakes
                to avoid.
              </p>
            </div>
            <div>
              <h3 className="font-heading text-[1.125rem] font-bold uppercase tracking-[-0.01em]">Intermediate</h3>
              <p>
                For teams already using AI casually. Learn stronger prompting,
                repeatable workflows, document handling, and team standards
                everyone can follow.
              </p>
            </div>
            <div>
              <h3 className="font-heading text-[1.125rem] font-bold uppercase tracking-[-0.01em]">Advanced</h3>
              <p>
                For technical or operations-focused teams. Cover AI agent
                workflows, automation planning, knowledge base design, tool
                selection, governance and rollout.
              </p>
            </div>
          </div>
        </>
      }
      included={{
        heading: "Training topics",
        items: [
          "AI basics for business",
          "Prompting that actually works",
          "AI for admin, sales and ops",
          "AI-assisted writing and docs",
          "Designing AI workflows",
          "Agents and automation",
          "AI policy and governance",
          "Safe use of business data",
          "Picking the right tools",
          "Getting your team onboard",
        ],
      }}
      ctaLabel="Ask about AI training"
      relatedLinks={[
        { href: "/ai-integration-services/", label: "AI Integration" },
        { href: "/ai-agents-for-business/", label: "Custom AI Agents" },
        { href: "/book-ai-audit/", label: "Contact OperateAI" },
      ]}
      faq={<FaqSection items={FAQS} emitSchema={false} />}
      faqItems={FAQS}
    />
  );
}
