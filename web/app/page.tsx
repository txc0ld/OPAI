import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { ProblemBand } from "@/components/home/problem-band";
import { SolutionBand } from "@/components/home/solution-band";
import { ServicesGrid } from "@/components/home/services-grid";
import { AudienceBand } from "@/components/home/audience-band";
import { UseCasesStrip } from "@/components/home/use-cases-strip";
import { ProcessBand } from "@/components/home/process-band";
import { ConversionBand } from "@/components/home/conversion-band";
import { FaqSection } from "@/components/faq/faq-section";
import { CTABand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { buildLocalBusiness, buildWebPage, wrapGraph } from "@/lib/schema";
import { BUSINESS } from "@/lib/business";

export const metadata: Metadata = {
  title: "OperateAI | AI Agents, Automation & Training for Australian Businesses",
  description:
    "OperateAI helps small and medium businesses integrate AI, automate workflows, host AI agents and train staff. Based in Perth, serving Australia and online clients worldwide.",
  alternates: { canonical: "/" },
};

const FAQS = [
  {
    question: "What does an AI consultant do for a small business?",
    answer:
      "An AI consultant helps a business identify where AI can be used practically, choose the right tools, design workflows, train staff and implement systems such as AI agents, automation and internal knowledge assistants. The goal is to apply AI where it creates measurable operational value.",
  },
  {
    question: "Do we need technical staff to use your AI services?",
    answer:
      "No. OperateAI works with both non-technical business owners and more technical teams. For beginners, we provide plain-English guidance and training. For technical teams, we support deeper workflow design, AI agent architecture, integrations and managed operations.",
  },
  {
    question: "Can you build custom AI agents for our business?",
    answer:
      "Yes. OperateAI can design and build custom AI agents for customer support, admin, sales, internal knowledge, operations, onboarding and other business workflows. Each agent should have a clear purpose, defined boundaries and appropriate business information.",
  },
  {
    question: "Do you offer AI training in Perth?",
    answer:
      "Yes. OperateAI offers AI training for businesses in Perth and across Australia. Training can be delivered for owners, managers, staff and technical personnel, either in person where suitable or online.",
  },
  {
    question: "Do you host and manage AI agents?",
    answer:
      "Yes. OperateAI provides managed AI agent hosting, monitoring, maintenance and optimisation for businesses that want AI systems running without managing the technical details internally.",
  },
  {
    question: "Is AI suitable for every business process?",
    answer:
      "No. AI is useful for many repetitive, information-heavy and support workflows, but it is not suitable for every task. A proper AI audit should identify where AI can help, where human oversight is required, and where automation would create unnecessary risk.",
  },
];

export default function Home() {
  return (
    <>
      <JsonLd
        schema={wrapGraph([
          buildWebPage({
            url: BUSINESS.url + "/",
            title: "OperateAI — AI agents and automation for small businesses",
            description:
              "OperateAI helps small and medium businesses integrate AI, automate workflows, host AI agents and train staff.",
          }),
          buildLocalBusiness(),
        ])}
      />
      <Hero />
      <ProblemBand />
      <SolutionBand />
      <ServicesGrid />
      <AudienceBand />
      <UseCasesStrip />
      <ProcessBand />
      <ConversionBand />
      <FaqSection items={FAQS} />
      <CTABand
        headline="Not sure where AI fits your business?"
        body="Start with an AI Business Audit. We will identify the best opportunities, the risks to avoid, and the clearest next steps for implementation."
        primaryLabel="Book an AI Business Audit"
        primaryHref="/book-ai-audit/"
      />
    </>
  );
}
