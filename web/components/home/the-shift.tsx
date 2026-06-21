import { Section } from "@/components/ui/section";
import { MonoLabel } from "@/components/ui/mono-label";
import { AIReadout } from "@/components/ai-readout";

export function TheShift() {
  return (
    <Section className="border-t border-[var(--color-border)] bg-[var(--color-surface-low)]">
      <MonoLabel>What changed</MonoLabel>
      <h2 className="mt-4 max-w-[20ch] text-[var(--text-section)] font-extrabold leading-[1.08] tracking-[-0.02em]">
        SEO got you on the list. AI doesn&rsquo;t show a list — it makes the choice.
      </h2>
      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        <AIReadout
          dim
          caption="Five years ago — Google"
          prompt="emergency plumber near me"
          names={["10 listings", "…scroll…", "…ads…", "…page two…"]}
        />
        <AIReadout
          caption="Now — AI"
          prompt="Who's a good emergency plumber in Perth?"
          names={["Two or three names", "Picked for the customer", "No scrolling"]}
          hook="No page two."
        />
      </div>
    </Section>
  );
}
