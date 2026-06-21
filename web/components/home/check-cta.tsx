import { Section } from "@/components/ui/section";
import { MonoLabel } from "@/components/ui/mono-label";
import { CheckButton } from "@/components/ui/check-button";

const ITEMS = [
  "What AI says about you",
  "Are you on the shortlist",
  "The one thing costing you jobs",
  "How to fix it",
];

export function CheckCta() {
  return (
    <Section className="border-y border-[var(--color-border)] bg-[var(--color-surface-low)]">
      <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div>
          <MonoLabel>Free check</MonoLabel>
          <h2 className="mt-4 text-[var(--text-section)] font-extrabold leading-[1.08] tracking-[-0.02em]">
            Want to know how you look to AI right now?
          </h2>
          <div className="mt-8">
            <CheckButton />
          </div>
        </div>
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-lowest)] p-6 font-mono text-[13px] leading-[1.9]">
          <div className="mb-3 text-[11px] uppercase tracking-[0.1em] text-[var(--color-fg-variant)]">You&rsquo;ll get back</div>
          {ITEMS.map((item) => (
            <div key={item} className="flex gap-2 text-[var(--color-fg)]">
              <span className="select-none text-[var(--color-signal)]" aria-hidden>
                ▸
              </span>
              {item}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
