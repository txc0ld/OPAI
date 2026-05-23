import type { Metadata } from "next";
import { ServicePageLayout } from "@/components/service/service-page-layout";
import { FaqSection } from "@/components/faq/faq-section";
import { JsonLd } from "@/components/json-ld";
import { buildLocalBusiness, wrapGraph } from "@/lib/schema";
import { BUSINESS } from "@/lib/business";

const PAGE_URL = `${BUSINESS.url}/perth-ai-consultant/`;
const TITLE = "AI Consultant Perth | AI Agents, Automation & Training | OperateAI";
const DESCRIPTION =
  "Perth AI consultant helping small and medium businesses integrate AI, build AI agents, automate workflows and train staff. Serving Perth, WA, Australia and online.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/perth-ai-consultant/" },
};

const FAQS = [
  {
    question: "Do you only work with Perth businesses?",
    answer:
      "No. OperateAI is based in Perth, Western Australia and works with businesses across Perth, WA, the rest of Australia, and online clients worldwide.",
  },
  {
    question: "Do you offer in-person consultations in Perth?",
    answer:
      "Yes. For Perth-based clients we offer in-person discovery sessions, audit interviews and on-site training where suitable. Most ongoing work is delivered online.",
  },
  {
    question: "What kinds of Perth businesses do you work with?",
    answer:
      "Local service businesses, professional firms, trades, agencies, ecommerce businesses and growing teams that want AI to support real work — not create more complexity.",
  },
];

export default function Page() {
  return (
    <>
      {/* LocalBusiness schema repeated here so the Perth landing page itself signals local relevance. */}
      <JsonLd schema={wrapGraph([buildLocalBusiness()])} />
      <ServicePageLayout
        pageUrl={PAGE_URL}
        title={TITLE}
        description={DESCRIPTION}
        h1="AI consultant in Perth for small and medium businesses"
        opening={
          <>
            <p>
              OperateAI is a Perth-based AI consultancy helping small and
              medium businesses adopt practical AI systems.
            </p>
            <p>
              We support businesses across Perth and Western Australia with AI
              integration, custom AI agents, workflow automation, staff
              training and managed AI agent hosting.
            </p>
          </>
        }
        whoItIsFor={
          <>
            <p>
              Many Perth businesses know AI could improve operations but are
              unsure where to begin. OperateAI helps identify realistic
              opportunities, design practical systems, train staff and manage
              ongoing AI workflows.
            </p>
            <p>
              We work with local service businesses, professional firms,
              trades, agencies, ecommerce businesses and growing teams that
              want AI to support real work — not create more complexity.
            </p>
            <p>
              Based in Perth, Western Australia. Supporting businesses across
              Perth, WA, Australia-wide and online worldwide.
            </p>
          </>
        }
        included={{
          heading: "How we help Perth businesses",
          items: [
            "AI Business Audit and roadmap",
            "AI integration into your existing tools",
            "Custom AI agent design and build",
            "Managed AI agent hosting",
            "Practical AI training for your team",
            "AI governance and usage policies",
            "Workflow automation",
            "Ongoing improvement and support",
          ],
        }}
        ctaLabel="Book a Perth AI Consultation"
        relatedLinks={[
          { href: "/ai-integration-services/", label: "AI Integration" },
          { href: "/ai-agents-for-business/", label: "Custom AI Agents" },
          { href: "/ai-training-for-business/", label: "AI Training" },
          { href: "/book-ai-audit/", label: "Book an AI Business Audit" },
        ]}
        faq={<FaqSection items={FAQS} emitSchema={false} />}
        faqItems={FAQS}
      />
    </>
  );
}
