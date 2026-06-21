import { Section } from "@/components/ui/section";
import { MonoLabel } from "@/components/ui/mono-label";

export function Forward() {
  return (
    <Section>
      <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-container)] p-8 lg:p-12">
        <MonoLabel>Where this is heading</MonoLabel>
        <p className="mt-5 max-w-[60ch] text-[length:var(--text-lede)] leading-[1.55] text-[var(--color-fg)]">
          Right now AI <span className="text-[var(--color-signal)]">recommends</span> you. Soon it&rsquo;ll{" "}
          <span className="text-[var(--color-signal)]">book</span> you — checking your diary, requesting quotes, even
          taking a deposit. That&rsquo;s not tomorrow, so don&rsquo;t let anyone panic-sell you robots. But the work to
          be ready is the same work that wins you jobs today. Fix the fundamentals now and you&rsquo;re sorted for both.
        </p>
      </div>
    </Section>
  );
}
