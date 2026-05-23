import type { Metadata } from "next";
import { IndustryPageLayout } from "@/components/industry/industry-page-layout";
import { BUSINESS } from "@/lib/business";

const SLUG = "ai-for-health-clinics";
const INDUSTRY = "health clinics"; // e.g. "accounting firms"
const PAGE_URL = `${BUSINESS.url}/industries/${SLUG}/`;
const TITLE = `AI for ${capitalised(INDUSTRY)} | Automation, Agents & Training | OperateAI`;
const DESCRIPTION = `AI services for ${INDUSTRY}. OperateAI helps ${INDUSTRY} teams use AI agents, automation, training and managed workflows to reduce admin and improve operations.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `/industries/${SLUG}/` },
};

function capitalised(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default function Page() {
  return (
    <IndustryPageLayout
      pageUrl={PAGE_URL}
      title={TITLE}
      description={DESCRIPTION}
      industry={INDUSTRY}
      h1={`AI for ${INDUSTRY}`}
      opening={
        <>
          <p>
            {capitalised(INDUSTRY)} businesses deal with repetitive admin,
            customer questions, documentation, follow-ups and operational
            bottlenecks.
          </p>
          <p>
            OperateAI helps {INDUSTRY} teams use practical AI tools, agents
            and automation to reduce manual work, improve consistency and
            support better client service.
          </p>
        </>
      }
      useCases={[
        "Client intake support",
        "Document drafting and summarisation",
        "FAQ and customer support assistants",
        "Follow-up and reminder workflows",
        "Internal knowledge assistants",
        "Sales and lead qualification support",
        "Staff onboarding and training",
        "Reporting and operational summaries",
      ]}
      relatedLinks={[
        { href: "/ai-integration-services/", label: "AI Integration" },
        { href: "/ai-agents-for-business/", label: "Custom AI Agents" },
        { href: "/ai-training-for-business/", label: "AI Training" },
        { href: "/book-ai-audit/", label: "Book an AI Business Audit" },
      ]}
    />
  );
}
