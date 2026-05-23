import type { Metadata } from "next";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Prose } from "@/components/prose";

export const metadata: Metadata = {
  title: "Terms",
  description: "OperateAI terms of service. Placeholder pending counsel review.",
};

export default function TermsPage() {
  return (
    <>
      <Section>
        <SectionHeading
          eyebrow="Legal"
          title="Terms"
          lede="This is a placeholder. The final terms of service will be drafted by counsel before public launch."
        />
      </Section>
      <Section>
        <Prose>
          <h2>Engagement</h2>
          <p>
            Services are delivered under a Master Services Agreement (MSA) and a Statement of Work
            (SOW) for each engagement. The MSA covers commercial terms; the SOW defines scope,
            deliverables, and acceptance criteria.
          </p>

          <h2>AI limitations</h2>
          <p>
            AI-generated outputs are drafts. Every customer-facing or system-changing action requires
            human approval before being released. Clients are responsible for the final content of
            approved actions and for the professional judgement that approval represents.
          </p>

          <h2>Data handling</h2>
          <p>
            Data handling is governed by the Data Processing Schedule attached to the MSA. We do not
            use client data to train models unless explicitly agreed in writing. Data residency
            preferences (Amazon Bedrock Sydney, Azure Australia East) are documented per engagement.
          </p>

          <h2>Liability</h2>
          <p>
            Liability is limited as set out in the MSA. We carry professional indemnity and cyber
            liability insurance; details are available on request.
          </p>

          <h2>Cancellation</h2>
          <p>
            Subscriptions are month-to-month after the initial term. Cancellation takes effect at
            the end of the current billing period. We provide a cancellation runbook covering
            configuration handover, log export, and integration revocation.
          </p>

          <h2>Contact</h2>
          <p>
            Commercial and contractual queries: <strong>legal@operateai.com.au</strong>.
          </p>

          <p className="footnote">Last updated: 25 April 2026 (placeholder).</p>
        </Prose>
      </Section>
    </>
  );
}
