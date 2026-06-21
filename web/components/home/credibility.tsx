import { Section } from "@/components/ui/section";
import { MonoLabel } from "@/components/ui/mono-label";

const POINTS = [
  ["Perth-based", "A real person who knows WA trades — not an overseas agency."],
  ["No lock-in", "No long contracts. The work proves itself or it doesn't."],
  ["Free check first", "I'll show you what's wrong before you spend a cent."],
];

export function Credibility() {
  return (
    <Section className="border-t border-[var(--color-border)] bg-[var(--color-surface-low)]">
      <MonoLabel>Straight up</MonoLabel>
      <h2 className="mt-4 max-w-[20ch] text-[var(--text-section)] font-extrabold leading-[1.08] tracking-[-0.02em]">
        I&rsquo;m new at this brand, not new at the work. Here&rsquo;s the deal.
      </h2>
      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {POINTS.map(([h, p]) => (
          <div key={h} className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-container)] p-6">
            <h3 className="font-bold">{h}</h3>
            <p className="mt-2 text-[14px] leading-[1.6] text-[var(--color-fg-variant)]">{p}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
