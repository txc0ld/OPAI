import { Section } from "@/components/ui/section";
import { MonoLabel } from "@/components/ui/mono-label";

const POINTS: [string, string][] = [
  ["Perth-based", "A real person who knows WA trades — not an overseas agency or a dashboard."],
  ["No lock-in", "No long contracts. The work proves itself, or it doesn't."],
  ["Free check first", "You see exactly what's wrong before you spend a cent."],
];

export function Credibility() {
  return (
    <Section tone="dark">
      <MonoLabel>Straight up</MonoLabel>
      <h2 className="mt-5 max-w-[22ch] text-[length:var(--text-section)] font-extrabold leading-[1.05] tracking-[-0.025em]">
        New to this brand. Not new to the work.
      </h2>
      <div className="mt-12 grid gap-5 sm:grid-cols-3">
        {POINTS.map(([h, p]) => (
          <div
            key={h}
            className="grain group relative overflow-hidden rounded-2xl border border-[var(--color-border)] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[color-mix(in_oklab,var(--color-signal)_40%,transparent)]"
            style={{ background: "linear-gradient(150deg, var(--color-surface-high), var(--color-surface-container))" }}
          >
            <h3 className="relative z-[1] text-[17px] font-bold text-[var(--color-fg)]">{h}</h3>
            <p className="relative z-[1] mt-2.5 text-[14.5px] leading-[1.6] text-[var(--color-fg-variant)]">{p}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
