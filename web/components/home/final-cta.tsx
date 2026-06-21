import { Section } from "@/components/ui/section";
import { CheckButton } from "@/components/ui/check-button";

export function FinalCta() {
  return (
    <Section className="border-t border-[var(--color-border)]">
      <div className="rounded-lg border border-[var(--color-signal)]/40 bg-[var(--color-surface-container)] p-8 text-center lg:p-16">
        <h2 className="mx-auto max-w-[20ch] text-[var(--text-section)] font-extrabold leading-[1.08] tracking-[-0.02em]">
          See what AI says about your business.
        </h2>
        <p className="mx-auto mt-5 max-w-[52ch] text-[17px] leading-[1.6] text-[var(--color-fg-variant)]">
          Send your name and suburb. I&rsquo;ll send back a free rundown of what AI says about you — and the one thing
          costing you jobs.
        </p>
        <div className="mt-8 flex justify-center">
          <CheckButton />
        </div>
      </div>
    </Section>
  );
}
