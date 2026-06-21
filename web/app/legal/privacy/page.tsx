import type { Metadata } from "next";
import { Prose } from "@/components/prose";

export const metadata: Metadata = {
  title: "Privacy",
  description: "OperateAI privacy policy.",
};

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-[var(--color-bg)] px-6 pt-[140px] pb-16 lg:px-12 lg:pt-[180px] lg:pb-24">
        <div className="mx-auto w-full max-w-[1200px]">
          <span className="eyebrow">Legal</span>
          <h1 className="mt-6 text-[clamp(40px,7vw,88px)] font-extrabold leading-[1] tracking-[-0.04em]">
            Privacy
          </h1>
          <p className="mt-8 max-w-[var(--measure)] text-[clamp(17px,2vw,21px)] leading-[1.55] text-[var(--color-w70)]">
            How OperateAI handles your personal and business information.
          </p>
        </div>
      </section>

      <section className="border-t border-[var(--color-w10)] bg-[var(--color-bg)] px-6 py-20 lg:px-12 lg:py-28">
        <Prose>
          <p>
            OperateAI operates in compliance with the Australian Privacy Principles under the
            Privacy Act 1988 (Cth). We collect personal information only where it is necessary to
            respond to your enquiry or deliver the service you have requested.
          </p>

          <h2>What we collect</h2>
          <p>
            Names, business names, contact details, and any other information you provide through
            the AI Visibility Check form or the contact form on this site.
          </p>

          <h2>How we use it</h2>
          <p>
            Details submitted through the AI Visibility Check and the contact form are used only
            to prepare and send the requested rundown or reply. We do not sell or share your
            information with third parties. We keep it only as long as needed to respond to your
            enquiry and for a reasonable period thereafter in case you follow up.
          </p>

          <h2>Your rights</h2>
          <p>
            You can request access to or correction of personal information we hold about you, or
            lodge a complaint, by contacting <strong>privacy@operateai.com.au</strong>. We acknowledge
            requests within five business days.
          </p>

          <h2>Updates</h2>
          <p>
            Future changes will be versioned and published on this page with an effective date.
          </p>

          <p className="footnote">Last updated: 22 June 2026.</p>
        </Prose>
      </section>
    </>
  );
}
