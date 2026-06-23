import { Section } from "@/components/ui/section";
import { MonoLabel } from "@/components/ui/mono-label";
import { Photo } from "@/components/ui/photo";

const POINTS: [string, string][] = [
  ["Perth-based", "A real person who knows Perth small business. Not an overseas agency or a dashboard."],
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
      <div className="mt-12 grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <Photo
          src="/photos/worksite.jpg"
          alt="A Perth construction site crew at work"
          dark
          className="aspect-[4/3] w-full"
        />
        <div className="grid gap-4">
          {POINTS.map(([h, p]) => (
            <div
              key={h}
              className="grain relative overflow-hidden rounded-2xl border border-[var(--color-border)] p-6"
              style={{ background: "linear-gradient(150deg, var(--color-surface-high), var(--color-surface-container))" }}
            >
              <h3 className="relative z-[1] text-[17px] font-bold text-[var(--color-fg)]">{h}</h3>
              <p className="relative z-[1] mt-2 text-[14.5px] leading-[1.6] text-[var(--color-fg-variant)]">{p}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
