import { Section } from "@/components/ui/section";
import { MonoLabel } from "@/components/ui/mono-label";
import { cn } from "@/lib/cn";

const LEVERS = [
  {
    title: "Google Business Profile, machine-perfect",
    problem: "Half-finished profiles are why AI skips you.",
    fix: "Every service listed, exact suburbs, right categories, real hours, real photos.",
    big: true,
  },
  {
    title: "Plain-text services, prices & area",
    problem: "AI can't read a price inside a JPG or PDF.",
    fix: "Clear words it can actually pick up and quote.",
  },
  {
    title: "Reviews — plenty, recent, replied-to",
    problem: "12 reviews from 2022 reads as closed down.",
    fix: "A simple way to ask every happy customer, and reply to all.",
  },
  {
    title: "Answer fast",
    problem: "Slow callbacks teach AI to stop sending you leads.",
    fix: "Catch missed calls and reply in minutes — the next thing that matters.",
    big: true,
  },
];

export function HowItWorksGrid() {
  return (
    <Section>
      <MonoLabel>How the AI picks who it picks</MonoLabel>
      <h2 className="mt-4 max-w-[22ch] text-[length:var(--text-section)] font-extrabold leading-[1.08] tracking-[-0.02em]">
        It&rsquo;s not magic. It trusts whatever is clearest. Here&rsquo;s what I fix.
      </h2>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {LEVERS.map((lever) => (
          <div
            key={lever.title}
            className={cn(
              "rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-container)] p-7 transition-colors hover:border-[var(--color-signal)]/50",
              lever.big && "md:col-span-2",
            )}
          >
            <h3 className="text-[19px] font-bold tracking-tight">{lever.title}</h3>
            <p className="mt-3 text-[14px] leading-[1.6] text-[var(--color-fg-variant)]">{lever.problem}</p>
            <p className="mt-2 flex gap-2 text-[14px] leading-[1.6] text-[var(--color-fg)]">
              <span className="select-none font-mono text-[var(--color-signal)]" aria-hidden>
                ▸
              </span>
              {lever.fix}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
