import { Section } from "@/components/ui/section";
import { MonoLabel } from "@/components/ui/mono-label";
import { MissedCall } from "@/components/mock/examples";

export function Forward() {
  return (
    <Section tone="paper">
      <div className="max-w-[20ch]">
        <MonoLabel tone="light">Where this is heading</MonoLabel>
      </div>
      <h2 className="mt-7 max-w-[24ch] text-[length:var(--text-section)] font-extrabold leading-[1.08] tracking-[-0.025em] text-[var(--color-ink)]">
        Today AI <span className="hl">recommends</span> you. Soon it&rsquo;ll <span className="hl">book</span> you.
      </h2>
      <p className="mt-7 max-w-[60ch] text-[19px] leading-[1.6] text-[var(--color-ink-soft)]">
        It&rsquo;ll check your diary, send a quote, even take a deposit for the customer. That&rsquo;s not tomorrow, so
        no panic about robots. But getting ready for it is the same work that wins you customers{" "}
        <span className="font-semibold text-[var(--color-ink)]">today</span>. Sort the basics now and you&rsquo;re set
        for both.
      </p>
      <MissedCall />
    </Section>
  );
}
