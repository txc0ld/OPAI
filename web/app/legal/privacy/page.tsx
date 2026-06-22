import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { MonoLabel } from "@/components/ui/mono-label";
import { JsonLd } from "@/components/json-ld";
import { buildWebPage, wrapGraph } from "@/lib/schema";
import { BUSINESS } from "@/lib/business";

const PAGE_URL = `${BUSINESS.url}/legal/privacy/`;
const TITLE = "Privacy Policy";
const DESCRIPTION =
  "How OperateAI (Operate AI - by Fantom Labs Tech) collects, uses, and protects your personal information in accordance with the Australian Privacy Principles.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/legal/privacy/" },
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function PrivacyPage() {
  return (
    <>
      <JsonLd schema={wrapGraph([buildWebPage({ url: PAGE_URL, title: TITLE, description: DESCRIPTION })])} />

      <Section tone="paper" className="pt-32 lg:pt-40" containerClassName="max-w-[760px]">
        <MonoLabel tone="light">Legal</MonoLabel>

        <h1 className="mt-5 text-[length:var(--text-section)] font-extrabold leading-[1.08] tracking-[-0.025em] text-[var(--color-ink)]">
          Privacy Policy
        </h1>

        <p className="mt-4 text-[14px] text-[var(--color-ink-soft)]">Last updated: 22 June 2026</p>

        {/* 1. Who we are */}
        <div className="mt-12">
          <h2 className="text-[20px] font-bold leading-snug text-[var(--color-ink)]">1. Who we are</h2>
          <div className="mt-4 grid gap-4 text-[16px] leading-[1.75] text-[var(--color-ink-soft)]">
            <p>
              This website is operated by <strong className="text-[var(--color-ink)]">OperateAI</strong>, the trading
              name of <strong className="text-[var(--color-ink)]">Operate AI - by Fantom Labs Tech</strong> (ABN 51 559
              921 362), based in Perth, Western Australia, Australia.
            </p>
            <p>
              We help WA trade businesses get found, recommended, and booked by AI search. Our main services are a
              free&nbsp;AI Visibility Check and optional done-for-you setup work.
            </p>
            <p>
              We are bound by the{" "}
              <strong className="text-[var(--color-ink)]">Privacy Act 1988 (Cth)</strong> and the{" "}
              <strong className="text-[var(--color-ink)]">Australian Privacy Principles (APPs)</strong>. This policy
              explains how we handle the personal information we collect.
            </p>
          </div>
        </div>

        {/* 2. What we collect */}
        <div className="mt-10">
          <h2 className="text-[20px] font-bold leading-snug text-[var(--color-ink)]">2. What we collect</h2>
          <div className="mt-4 grid gap-4 text-[16px] leading-[1.75] text-[var(--color-ink-soft)]">
            <p>We collect information in two ways:</p>

            <div>
              <h3 className="text-[16px] font-semibold text-[var(--color-ink)]">AI Visibility Check form</h3>
              <ul className="mt-2 grid gap-1 pl-5 list-disc">
                <li>Business name</li>
                <li>Suburb or service area</li>
                <li>Trade or industry type</li>
                <li>Email address and/or mobile number</li>
                <li>An optional note about your business</li>
              </ul>
            </div>

            <div>
              <h3 className="text-[16px] font-semibold text-[var(--color-ink)]">Contact form</h3>
              <ul className="mt-2 grid gap-1 pl-5 list-disc">
                <li>Your name</li>
                <li>Email address and/or mobile number</li>
                <li>Your message</li>
              </ul>
            </div>

            <div>
              <h3 className="text-[16px] font-semibold text-[var(--color-ink)]">Technical data</h3>
              <p className="mt-2">
                When you use the site or submit a form, our servers automatically record your IP address and basic
                request logs. We use this solely for security and rate-limiting purposes. We do not currently use
                tracking cookies or third-party analytics.
              </p>
            </div>
          </div>
        </div>

        {/* 3. How we use it */}
        <div className="mt-10">
          <h2 className="text-[20px] font-bold leading-snug text-[var(--color-ink)]">3. How we use it</h2>
          <div className="mt-4 grid gap-4 text-[16px] leading-[1.75] text-[var(--color-ink-soft)]">
            <p>We use the information you provide only for the purpose you gave it:</p>
            <ul className="grid gap-2 pl-5 list-disc">
              <li>To prepare and send you the AI Visibility Check rundown you requested</li>
              <li>To reply to your enquiry through the contact form</li>
              <li>To provide any further services you specifically ask for</li>
            </ul>
            <p>
              We do not use your information for marketing to third parties, and we will not add you to a mailing list
              without your explicit consent.
            </p>
          </div>
        </div>

        {/* 4. Third parties */}
        <div className="mt-10">
          <h2 className="text-[20px] font-bold leading-snug text-[var(--color-ink)]">
            4. Third parties we share it with to do the work
          </h2>
          <div className="mt-4 grid gap-4 text-[16px] leading-[1.75] text-[var(--color-ink-soft)]">
            <p>
              To prepare your AI Visibility Check rundown, the business details you submit (business name, suburb,
              trade) and the search queries we run on your behalf are sent to the following third-party services, which
              act as data processors on our behalf:
            </p>
            <ul className="grid gap-2 pl-5 list-disc">
              <li>
                <strong className="text-[var(--color-ink)]">OpenAI</strong> - AI analysis and content generation
              </li>
              <li>
                <strong className="text-[var(--color-ink)]">Anthropic</strong> - AI analysis and content generation
              </li>
              <li>
                <strong className="text-[var(--color-ink)]">Perplexity</strong> - AI-powered search and visibility
                checking
              </li>
              <li>
                <strong className="text-[var(--color-ink)]">Google</strong> (Places API, Gemini, PageSpeed Insights) -
                business listing data, AI analysis, and site performance checks
              </li>
              <li>
                <strong className="text-[var(--color-ink)]">Resend</strong> - transactional email delivery (to send
                your rundown)
              </li>
            </ul>
            <p>
              We only send what is needed to run the check. We do not sell your information, and none of these
              processors are permitted to use it for their own purposes beyond providing the service to us.
            </p>
            <p>
              These services may store and process data outside Australia. Each provider maintains their own privacy
              and security practices in accordance with applicable law.
            </p>
          </div>
        </div>

        {/* 5. Storage and retention */}
        <div className="mt-10">
          <h2 className="text-[20px] font-bold leading-snug text-[var(--color-ink)]">5. Storage and retention</h2>
          <div className="mt-4 grid gap-4 text-[16px] leading-[1.75] text-[var(--color-ink-soft)]">
            <p>
              We keep your information only for as long as is needed to respond to your enquiry or deliver the
              service you requested, and for a reasonable period thereafter in case you follow up.
            </p>
            <p>
              Your information is stored in our operational records and email systems. We take reasonable steps to
              protect it from misuse, loss, and unauthorised access.
            </p>
            <p>
              When your information is no longer needed, we take reasonable steps to destroy or de-identify it.
            </p>
          </div>
        </div>

        {/* 6. Your rights */}
        <div className="mt-10">
          <h2 className="text-[20px] font-bold leading-snug text-[var(--color-ink)]">6. Your rights</h2>
          <div className="mt-4 grid gap-4 text-[16px] leading-[1.75] text-[var(--color-ink-soft)]">
            <p>Under the Australian Privacy Principles, you have the right to:</p>
            <ul className="grid gap-2 pl-5 list-disc">
              <li>Request access to personal information we hold about you</li>
              <li>Ask us to correct information that is inaccurate, out of date, incomplete, or misleading</li>
              <li>Ask us to delete your information (subject to any legal retention obligations)</li>
            </ul>
            <p>
              To make a request, contact us at{" "}
              <a
                href="mailto:privacy@operateai.com.au"
                className="text-[var(--color-ink)] underline underline-offset-4 hover:opacity-70"
              >
                privacy@operateai.com.au
              </a>
              . We will acknowledge your request within five business days and respond within a reasonable time.
            </p>
            <p>
              If you are not satisfied with our response, you can lodge a complaint with the{" "}
              <strong className="text-[var(--color-ink)]">Office of the Australian Information Commissioner (OAIC)</strong>{" "}
              at{" "}
              <a
                href="https://www.oaic.gov.au"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-ink)] underline underline-offset-4 hover:opacity-70"
              >
                oaic.gov.au
              </a>
              .
            </p>
          </div>
        </div>

        {/* 7. Cookies and analytics */}
        <div className="mt-10">
          <h2 className="text-[20px] font-bold leading-snug text-[var(--color-ink)]">7. Cookies and analytics</h2>
          <div className="mt-4 grid gap-4 text-[16px] leading-[1.75] text-[var(--color-ink-soft)]">
            <p>
              We do not currently use tracking cookies, advertising cookies, or third-party analytics on this site.
              Server logs are retained for security and rate-limiting only.
            </p>
            <p>
              If we add cookies or analytics tools in the future, we will update this policy and provide appropriate
              notice.
            </p>
          </div>
        </div>

        {/* 8. Changes to this policy */}
        <div className="mt-10">
          <h2 className="text-[20px] font-bold leading-snug text-[var(--color-ink)]">8. Changes to this policy</h2>
          <div className="mt-4 grid gap-4 text-[16px] leading-[1.75] text-[var(--color-ink-soft)]">
            <p>
              We may update this Privacy Policy from time to time. Any changes will be published on this page with an
              updated &ldquo;Last updated&rdquo; date. We encourage you to review this page periodically.
            </p>
          </div>
        </div>

        {/* 9. Contact */}
        <div className="mt-10">
          <h2 className="text-[20px] font-bold leading-snug text-[var(--color-ink)]">9. Contact</h2>
          <div className="mt-4 grid gap-4 text-[16px] leading-[1.75] text-[var(--color-ink-soft)]">
            <p>For any privacy-related questions, requests, or complaints, contact us at:</p>
            <p>
              <a
                href="mailto:privacy@operateai.com.au"
                className="text-[var(--color-ink)] underline underline-offset-4 hover:opacity-70"
              >
                privacy@operateai.com.au
              </a>
            </p>
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-12 border-t border-[var(--color-border)] pt-8">
          <p className="text-[14px] leading-[1.7] text-[var(--color-ink-soft)]">
            This is a plain-English summary and starting template. OperateAI will keep it current as our practices
            evolve.
          </p>
        </div>
      </Section>
    </>
  );
}
