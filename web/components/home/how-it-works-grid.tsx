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
    fix: "Clear words it can pick up and quote back.",
  },
  {
    title: "Reviews — plenty, recent, replied-to",
    problem: "12 reviews from 2022 reads as closed down.",
    fix: "An easy way to ask every happy customer, and reply to all.",
  },
  {
    title: "Answer fast",
    problem: "Slow callbacks teach AI to stop sending leads.",
    fix: "Catch missed calls and reply in minutes — the next thing that matters.",
    big: true,
  },
];

export function HowItWorksGrid() {
  return (
    <Section tone="paper">
      <MonoLabel tone="light">How the AI picks who it picks</MonoLabel>
      <h2 className="mt-5 max-w-[24ch] text-[length:var(--text-section)] font-extrabold leading-[1.04] tracking-[-0.025em] text-[var(--color-ink)]">
        It&rsquo;s not magic. It trusts whatever is clearest — here&rsquo;s what I fix.
      </h2>
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {LEVERS.map((lever, i) => (
          <div
            key={lever.title}
            className={cn(
              "group rounded-2xl border border-[var(--color-line-ink)] bg-white p-7 shadow-[0_22px_44px_-30px_rgba(18,18,18,0.45)] transition-transform duration-300 hover:-translate-y-1 lg:p-8",
              lever.big && "md:col-span-2",
            )}
          >
            <div className="flex items-center gap-3">
              <span
                aria-hidden
                className="grid h-9 w-9 place-items-center rounded-lg text-[13px] font-extrabold text-[var(--color-ink)]"
                style={{ background: "color-mix(in oklab, var(--color-signal) 38%, white)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-[19px] font-bold tracking-tight text-[var(--color-ink)]">{lever.title}</h3>
            </div>
            <p className="mt-4 text-[15px] leading-[1.6] text-[var(--color-ink-soft)]">{lever.problem}</p>
            <p className="mt-2 flex gap-2 text-[15px] font-medium leading-[1.6] text-[var(--color-ink)]">
              <span aria-hidden className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[var(--color-signal-dim)]" />
              {lever.fix}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
