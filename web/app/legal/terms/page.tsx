import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { MonoLabel } from "@/components/ui/mono-label";
import { JsonLd } from "@/components/json-ld";
import { buildWebPage, wrapGraph } from "@/lib/schema";
import { BUSINESS } from "@/lib/business";

const PAGE_URL = `${BUSINESS.url}/legal/terms/`;
const TITLE = "Terms & Conditions";
const DESCRIPTION =
  "Plain-language terms for using the OperateAI website and free AI Visibility Check, operated by Operate AI - by Fantom Labs Tech (ABN 51 559 921 362).";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/legal/terms/" },
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function TermsPage() {
  return (
    <>
      <JsonLd schema={wrapGraph([buildWebPage({ url: PAGE_URL, title: TITLE, description: DESCRIPTION })])} />

      <Section tone="paper" className="pt-32 lg:pt-40" containerClassName="max-w-[760px]">
        <MonoLabel tone="light">Legal</MonoLabel>

        <h1 className="mt-5 text-[length:var(--text-section)] font-extrabold leading-[1.08] tracking-[-0.025em] text-[var(--color-ink)]">
          Terms &amp; Conditions
        </h1>

        <p className="mt-4 text-[14px] text-[var(--color-ink-soft)]">Last updated: 22 June 2026</p>

        {/* 1. Acceptance */}
        <div className="mt-12">
          <h2 className="text-[20px] font-bold leading-snug text-[var(--color-ink)]">
            1. About these terms and acceptance
          </h2>
          <div className="mt-4 grid gap-4 text-[16px] leading-[1.75] text-[var(--color-ink-soft)]">
            <p>
              These Terms &amp; Conditions govern your use of this website and the free AI Visibility Check service
              offered by OperateAI. By accessing the site or submitting the AI Visibility Check form, you agree to
              these terms.
            </p>
            <p>
              If you do not agree, please do not use the site or submit any forms.
            </p>
          </div>
        </div>

        {/* 2. Who we are */}
        <div className="mt-10">
          <h2 className="text-[20px] font-bold leading-snug text-[var(--color-ink)]">2. Who we are</h2>
          <div className="mt-4 grid gap-4 text-[16px] leading-[1.75] text-[var(--color-ink-soft)]">
            <p>
              This site is operated by <strong className="text-[var(--color-ink)]">OperateAI</strong>, the trading
              name of <strong className="text-[var(--color-ink)]">Operate AI - by Fantom Labs Tech</strong> (ABN 51
              559 921 362), based in Perth, Western Australia, Australia.
            </p>
          </div>
        </div>

        {/* 3. The free AI Visibility Check */}
        <div className="mt-10">
          <h2 className="text-[20px] font-bold leading-snug text-[var(--color-ink)]">
            3. The free AI Visibility Check
          </h2>
          <div className="mt-4 grid gap-4 text-[16px] leading-[1.75] text-[var(--color-ink-soft)]">
            <p>
              The AI Visibility Check is a complimentary, no-obligation service. When you submit the form, we use
              AI and data tools to prepare a personalised rundown of how AI systems currently appear to see your
              business, and we send it to you by email.
            </p>
            <p>
              The results are an indicative, point-in-time snapshot only. AI outputs are non-deterministic and can
              vary between runs. The landscape changes constantly.
            </p>
            <p>
              We make no guarantee that you will rank in any particular position, be recommended by any AI or search
              platform, or win any work as a result of the check or any subsequent engagement with us. The check is
              provided as a free starting point to help you understand your current position.
            </p>
          </div>
        </div>

        {/* 4. Done-for-you services */}
        <div className="mt-10">
          <h2 className="text-[20px] font-bold leading-snug text-[var(--color-ink)]">
            4. Done-for-you services
          </h2>
          <div className="mt-4 grid gap-4 text-[16px] leading-[1.75] text-[var(--color-ink-soft)]">
            <p>
              In addition to the free check, we offer optional done-for-you setup and optimisation work. These
              services are provided under a separate, fixed-scope agreement with pricing agreed in writing before
              any work begins.
            </p>
            <p>
              Nothing on this website, including these terms, constitutes a contract for paid services. A binding
              agreement for done-for-you work only exists once a separate written scope and fee arrangement has
              been agreed between us.
            </p>
          </div>
        </div>

        {/* 5. No guarantees / not affiliated */}
        <div className="mt-10">
          <h2 className="text-[20px] font-bold leading-snug text-[var(--color-ink)]">
            5. No guarantees and no affiliation
          </h2>
          <div className="mt-4 grid gap-4 text-[16px] leading-[1.75] text-[var(--color-ink-soft)]">
            <p>
              OperateAI is an independent business. We are not affiliated with, endorsed by, sponsored by, or
              partnered with Google, OpenAI, ChatGPT, Perplexity, or any other AI or search platform.
            </p>
            <p>
              Google, ChatGPT, Perplexity, and other names referenced on this site are trademarks or registered
              trademarks of their respective owners. Their use here is purely descriptive.
            </p>
            <p>
              We have no control over how third-party AI systems rank, recommend, or present any business. Visibility
              in AI-generated results can change at any time without notice, and is ultimately determined by those
              third-party platforms.
            </p>
          </div>
        </div>

        {/* 6. Acceptable use */}
        <div className="mt-10">
          <h2 className="text-[20px] font-bold leading-snug text-[var(--color-ink)]">6. Acceptable use</h2>
          <div className="mt-4 grid gap-4 text-[16px] leading-[1.75] text-[var(--color-ink-soft)]">
            <p>When using this site, you agree not to:</p>
            <ul className="grid gap-2 pl-5 list-disc">
              <li>Submit false, misleading, or fraudulent information through any form</li>
              <li>Abuse, overload, or attempt to circumvent the rate-limiting on our forms or APIs</li>
              <li>Scrape, crawl, or systematically extract content from this site without our written permission</li>
              <li>Use the site in any way that violates applicable law</li>
            </ul>
            <p>
              We reserve the right to refuse service to anyone who misuses the site or its forms.
            </p>
          </div>
        </div>

        {/* 7. Intellectual property */}
        <div className="mt-10">
          <h2 className="text-[20px] font-bold leading-snug text-[var(--color-ink)]">7. Intellectual property</h2>
          <div className="mt-4 grid gap-4 text-[16px] leading-[1.75] text-[var(--color-ink-soft)]">
            <p>
              All content on this site, including text, design, graphics, and code, is owned by or licensed to
              Operate AI - by Fantom Labs Tech, unless otherwise stated.
            </p>
            <p>
              You may not reproduce, republish, or distribute substantial portions of the site content without our
              prior written permission. Fair use for referencing or linking is fine.
            </p>
          </div>
        </div>

        {/* 8. Limitation of liability */}
        <div className="mt-10">
          <h2 className="text-[20px] font-bold leading-snug text-[var(--color-ink)]">
            8. Limitation of liability
          </h2>
          <div className="mt-4 grid gap-4 text-[16px] leading-[1.75] text-[var(--color-ink-soft)]">
            <p>
              To the extent permitted by law, including the{" "}
              <strong className="text-[var(--color-ink)]">Australian Consumer Law</strong>, OperateAI is not liable
              for any indirect, consequential, special, or incidental loss arising from your use of this site or
              the AI Visibility Check.
            </p>
            <p>
              Nothing in these terms excludes, restricts, or modifies any right or remedy, or any guarantee,
              warranty, or other term or condition, implied or imposed by the Australian Consumer Law that cannot
              lawfully be excluded or limited.
            </p>
            <p>
              Where our liability cannot be excluded by law, it is limited, to the extent permitted, to
              re-supplying the relevant service.
            </p>
          </div>
        </div>

        {/* 9. Governing law */}
        <div className="mt-10">
          <h2 className="text-[20px] font-bold leading-snug text-[var(--color-ink)]">9. Governing law</h2>
          <div className="mt-4 grid gap-4 text-[16px] leading-[1.75] text-[var(--color-ink-soft)]">
            <p>
              These terms are governed by the laws of Western Australia, Australia. Any disputes will be subject
              to the non-exclusive jurisdiction of the courts of Western Australia.
            </p>
          </div>
        </div>

        {/* 10. Changes to these terms */}
        <div className="mt-10">
          <h2 className="text-[20px] font-bold leading-snug text-[var(--color-ink)]">
            10. Changes to these terms
          </h2>
          <div className="mt-4 grid gap-4 text-[16px] leading-[1.75] text-[var(--color-ink-soft)]">
            <p>
              We may update these terms from time to time. Any changes will be published on this page with an
              updated &ldquo;Last updated&rdquo; date. Continued use of the site after changes are posted constitutes
              acceptance of the revised terms.
            </p>
          </div>
        </div>

        {/* 11. Contact */}
        <div className="mt-10">
          <h2 className="text-[20px] font-bold leading-snug text-[var(--color-ink)]">11. Contact</h2>
          <div className="mt-4 grid gap-4 text-[16px] leading-[1.75] text-[var(--color-ink-soft)]">
            <p>For any questions about these terms, contact us at:</p>
            <p>
              <a
                href="mailto:legal@operateai.com.au"
                className="text-[var(--color-ink)] underline underline-offset-4 hover:opacity-70"
              >
                legal@operateai.com.au
              </a>
            </p>
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-12 border-t border-[var(--color-border)] pt-8">
          <p className="text-[14px] leading-[1.7] text-[var(--color-ink-soft)]">
            This is a plain-English summary and starting template. OperateAI will keep it current as our services
            and practices evolve.
          </p>
        </div>
      </Section>
    </>
  );
}
