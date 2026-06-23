import { Section } from "@/components/ui/section";
import { MonoLabel } from "@/components/ui/mono-label";
import { Photo } from "@/components/ui/photo";

export function WhyTradies() {
  return (
    <Section tone="paper">
      <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <MonoLabel tone="light">Why it hits local business hardest</MonoLabel>
          <h2 className="mt-5 max-w-[16ch] text-[length:var(--text-section)] font-extrabold leading-[1.04] tracking-[-0.025em] text-[var(--color-ink)]">
            Your business lives on local discovery. That&rsquo;s the bit AI eats first.
          </h2>
          <p className="mt-6 max-w-[52ch] text-[19px] leading-[1.6] text-[var(--color-ink-soft)]">
            Google, Maps, word of mouth. That&rsquo;s how you get found. Now AI gives the answer at the top of the
            page, and people ask it for a name instead of scrolling the listings.{" "}
            <span className="font-semibold text-[var(--color-ink)]">
              Being findable isn&rsquo;t enough anymore. You have to be the one it recommends.
            </span>
          </p>
        </div>
        <Photo
          src="/photos/electrician.jpg"
          alt="An electrician at work on a job in Perth"
          className="aspect-[4/5] w-full"
        />
      </div>
    </Section>
  );
}
