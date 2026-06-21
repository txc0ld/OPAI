import { Section } from "@/components/ui/section";
import { MonoLabel } from "@/components/ui/mono-label";

export function Forward() {
  return (
    <Section tone="paper">
      <div className="max-w-[20ch]">
        <MonoLabel tone="light">Where this is heading</MonoLabel>
      </div>
      <p className="mt-7 max-w-[24ch] text-[length:var(--text-section)] font-extrabold leading-[1.08] tracking-[-0.025em] text-[var(--color-ink)]">
        Today AI <span className="hl">recommends</span> you. Soon it&rsquo;ll <span className="hl">book</span> you.
      </p>
      <p className="mt-7 max-w-[60ch] text-[19px] leading-[1.6] text-[var(--color-ink-soft)]">
        Checking your diary, requesting a quote, even taking a deposit — on the customer&rsquo;s behalf. That&rsquo;s not
        tomorrow, so no panic about robots. But the work that gets you ready for it is the exact same work that wins you
        jobs <span className="font-semibold text-[var(--color-ink)]">today</span>. Fix the fundamentals now and
        you&rsquo;re sorted for both.
      </p>
    </Section>
  );
}
