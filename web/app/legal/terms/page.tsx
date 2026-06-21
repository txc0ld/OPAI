import type { Metadata } from "next";
import { Prose } from "@/components/prose";

export const metadata: Metadata = {
  title: "Terms",
  description: "OperateAI terms of service.",
};

export default function TermsPage() {
  return (
    <>
      <section className="bg-[var(--color-bg)] px-6 pt-[140px] pb-16 lg:px-12 lg:pt-[180px] lg:pb-24">
        <div className="mx-auto w-full max-w-[1200px]">
          <span className="eyebrow">Legal</span>
          <h1 className="mt-6 text-[clamp(40px,7vw,88px)] font-extrabold leading-[1] tracking-[-0.04em]">
            Terms
          </h1>
          <p className="mt-8 max-w-[var(--measure)] text-[clamp(17px,2vw,21px)] leading-[1.55] text-[var(--color-w70)]">
            Plain-language terms for using OperateAI and engaging our services.
          </p>
        </div>
      </section>

      <section className="border-t border-[var(--color-w10)] bg-[var(--color-bg)] px-6 py-20 lg:px-12 lg:py-28">
        <Prose>
          <h2>What we do</h2>
          <p>
            OperateAI helps trade businesses get found, recommended and booked by AI. That starts
            with a free AI Visibility Check, a rundown of how AI systems currently see your
            business. From there, we offer optional done-for-you work to improve your AI presence
            over time.
          </p>

          <h2>The free AI Visibility Check</h2>
          <p>
            Submitting the check form is free and carries no obligation. We will send you a
            personalised rundown by email. We do not guarantee any particular outcome from the
            check or from any subsequent work.
          </p>

          <h2>Done-for-you work</h2>
          <p>
            If you engage us for ongoing work, the scope, deliverables and pricing will be agreed
            in writing before we start. Month-to-month arrangements can be cancelled at the end of
            any billing period.
          </p>

          <h2>AI limitations</h2>
          <p>
            AI systems change frequently. Visibility in AI results is not guaranteed and can shift
            without notice. Any improvements we make are based on current best practice and are
            not a promise of a specific ranking or booking outcome.
          </p>

          <h2>Liability</h2>
          <p>
            Our liability is limited to the fees paid for the relevant service. We carry
            professional indemnity insurance; details are available on request.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these terms: <strong>legal@operateai.com.au</strong>.
          </p>

          <p className="footnote">Last updated: 22 June 2026.</p>
        </Prose>
      </section>
    </>
  );
}
