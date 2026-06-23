import { Section } from "@/components/ui/section";
import { MonoLabel } from "@/components/ui/mono-label";
import { CheckButton } from "@/components/ui/check-button";

const ITEMS = [
  "What AI actually says about you",
  "Whether you make the shortlist",
  "The one thing costing you jobs",
  "How to fix it, in plain English",
];

export function CheckCta() {
  return (
    <Section tone="dark">
      <div className="relative grid items-center gap-12 overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface-low)] p-8 lg:grid-cols-[1fr_1fr] lg:p-14">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, var(--color-signal-glow), transparent 70%)" }}
        />
        <div className="relative">
          <MonoLabel>Free check</MonoLabel>
          <h2 className="mt-5 text-[length:var(--text-section)] font-extrabold leading-[1.05] tracking-[-0.025em]">
            Want to know how you look to AI right now?
          </h2>
          <p className="mt-5 max-w-[44ch] text-[16px] leading-[1.6] text-[var(--color-fg-variant)]">
            Send your name and suburb. We check it by hand and send the rundown back. Free, no pitch.
          </p>
          <div className="mt-8">
            <CheckButton />
          </div>
        </div>

        <div className="relative rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-lowest)] p-6 font-mono text-[13px] leading-[1.9]">
          <div className="mb-4 text-[10px] uppercase tracking-[0.18em] text-[var(--color-fg-variant)]">
            What you get back
          </div>
          <ul className="grid gap-2.5">
            {ITEMS.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[var(--color-fg)]">
                <span aria-hidden className="mt-0.5 select-none text-[var(--color-signal)]">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
