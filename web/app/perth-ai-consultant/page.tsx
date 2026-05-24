import type { Metadata } from "next";
import { ServicePageLayout } from "@/components/service/service-page-layout";
import { FaqSection } from "@/components/faq/faq-section";
import { JsonLd } from "@/components/json-ld";
import { buildLocalBusiness, wrapGraph } from "@/lib/schema";
import { BUSINESS } from "@/lib/business";

const PAGE_URL = `${BUSINESS.url}/perth-ai-consultant/`;
const TITLE = "AI Consultant Perth | AI Agents, Automation & Training | OperateAI";
const DESCRIPTION =
  "Perth AI consultant for small and medium businesses. Plain-English help to try AI, build agents, automate workflows and train your team. Serving Perth, WA, Australia and online.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/perth-ai-consultant/" },
};

const FAQS = [
  {
    question: "Do you only work with Perth businesses?",
    answer:
      "No. We are based in Perth but we work with businesses across Perth, Western Australia, the rest of Australia, and online clients worldwide.",
  },
  {
    question: "Do you offer in-person consultations in Perth?",
    answer:
      "Yes. For Perth-based clients we offer in-person discovery sessions, audit interviews and on-site training where suitable. Most ongoing work happens online.",
  },
  {
    question: "What kinds of Perth businesses do you work with?",
    answer:
      "Local service businesses, professional firms, trades, agencies, ecommerce, and growing teams that want AI to support real work without adding more complexity.",
  },
];

export default function Page() {
  return (
    <>
      {/* LocalBusiness schema repeated on the Perth page for local SEO relevance. */}
      <JsonLd schema={wrapGraph([buildLocalBusiness()])} />
      <ServicePageLayout
        pageUrl={PAGE_URL}
        title={TITLE}
        description={DESCRIPTION}
        h1="AI consultant in Perth for small and medium businesses"
        heroImage={{
          src: "/operateai_05_dark_building.webp",
          alt: "A modern dark commercial building lit by a lime accent strip — OperateAI working with Perth and WA businesses.",
        }}
        opening={
          <>
            <p>
              OperateAI is a Perth AI consultancy. We help small and medium
              businesses try AI safely, whether they have never used it or
              already build with it.
            </p>
            <p>
              We support Perth and Western Australia with plain-English AI
              advice, integration, custom AI agents, automation, staff training
              and managed hosting.
            </p>
          </>
        }
        whoItIsFor={
          <>
            <p>
              A lot of Perth businesses can see that AI could help, but are not
              sure where to begin. We help you work out what is realistic,
              build the right things, train your team, and look after the AI
              once it is running.
            </p>
            <p>
              We work with local service businesses, professional firms, trades,
              agencies, ecommerce, and growing teams that want AI to support
              their real work, not add more complexity.
            </p>
            <p>
              Based in Perth, Western Australia. Working with businesses across
              Perth, WA, all of Australia, and online worldwide.
            </p>
          </>
        }
        included={{
          heading: "How we help Perth businesses",
          items: [
            "AI Business Audit and plan",
            "AI integration into your existing tools",
            "Custom AI agent design and build",
            "Managed AI agent hosting",
            "Plain-English AI training for your team",
            "AI policy and safe-use rules",
            "Workflow automation",
            "Ongoing improvement and support",
          ],
        }}
        ctaLabel="Book a Perth AI consultation"
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
