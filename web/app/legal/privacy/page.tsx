import type { Metadata } from "next";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Prose } from "@/components/prose";

export const metadata: Metadata = {
  title: "Privacy",
  description: "OperateAI privacy policy. Placeholder pending counsel review.",
};

export default function PrivacyPage() {
  return (
    <>
      <Section>
        <SectionHeading
          eyebrow="Legal"
          title="Privacy"
          lede="This is a placeholder. The final privacy policy will be drafted by counsel before public launch."
        />
      </Section>
      <Section>
        <Prose>
          <p>
            OperateAI operates in compliance with the Australian Privacy Principles under the
            Privacy Act 1988 (Cth). We collect personal information only where it is necessary to
            deliver services to our clients, manage business operations, and comply with the law.
          </p>

          <h2>What we collect</h2>
          <p>
            Names, contact details, and business information you provide via our enquiry form,
            booking system, or in the course of an engagement. Operational data from client systems
            is processed under the terms of the engagement and the relevant data processing schedule.
          </p>

          <h2>How we use it</h2>
          <p>
            To respond to enquiries, deliver services, send operational updates, and meet our legal
            and contractual obligations. We do not sell personal information. We do not use client
            operational data to train models unless explicitly agreed in writing.
          </p>

          <h2>Storage and residency</h2>
          <p>
            Where possible, customer data routes through Amazon Bedrock (Sydney region) or Azure
            (Australia East) to keep processing onshore. Each engagement documents the model and
            region used.
          </p>

          <h2>Your rights</h2>
          <p>
            You can request access to or correction of personal information we hold about you, or
            lodge a complaint, by contacting <strong>privacy@operateai.com.au</strong>. We acknowledge
            requests within five business days.
          </p>

          <h2>Updates</h2>
          <p>
            This policy will be replaced before public launch. Any future changes will be versioned
            and published on this page with an effective date.
          </p>

          <p className="footnote">Last updated: 25 April 2026 (placeholder).</p>
        </Prose>
      </Section>
    </>
  );
}
