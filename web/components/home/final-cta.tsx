import { Section } from "@/components/ui/section";
import { CheckButton } from "@/components/ui/check-button";

export function FinalCta() {
  return (
    <Section tone="void">
      <div className="relative overflow-hidden rounded-3xl border border-[color-mix(in_oklab,var(--color-signal)_28%,var(--color-border))] px-8 py-16 text-center lg:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[440px] w-[760px] max-w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{ background: "radial-gradient(ellipse, var(--color-signal-glow), transparent 68%)" }}
        />
        <div className="relative">
          <h2 className="mx-auto max-w-[18ch] text-[length:var(--text-display)] font-extrabold leading-[0.98] tracking-[-0.035em] text-[var(--color-fg)]">
            See what AI says about your business.
          </h2>
          <p className="mx-auto mt-6 max-w-[50ch] text-[length:var(--text-lede)] leading-[1.5] text-[var(--color-fg-variant)]">
            Send your name and suburb. I&rsquo;ll send back a free rundown of what AI says about you, including the one thing
            costing you jobs.
          </p>
          <div className="mt-9 flex justify-center">
            <CheckButton />
          </div>
          <p className="mt-5 text-[13px] text-[var(--color-fg-variant)]">
            Free. One business day. Checked by a real person.
          </p>
        </div>
      </div>
    </Section>
  );
}
