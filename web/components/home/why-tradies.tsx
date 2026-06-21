import { Section } from "@/components/ui/section";
import { MonoLabel } from "@/components/ui/mono-label";

export function WhyTradies() {
  return (
    <Section>
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
        <div>
          <MonoLabel>Why it hits tradies hardest</MonoLabel>
          <h2 className="mt-4 max-w-[18ch] text-[var(--text-section)] font-extrabold leading-[1.08] tracking-[-0.02em]">
            Your business lives on local discovery. That&rsquo;s the bit AI is eating first.
          </h2>
        </div>
        <p className="max-w-[52ch] text-[17px] leading-[1.6] text-[var(--color-fg-variant)]">
          Google, Maps, word of mouth — that&rsquo;s how you get found. Now an AI answer sits above the search results
          on a huge share of searches, and people are asking assistants for a name instead of comparing listings. Being
          findable isn&rsquo;t enough anymore. You have to be the one it&rsquo;s confident enough to recommend.
        </p>
      </div>
    </Section>
  );
}
