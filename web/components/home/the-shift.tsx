import { Section } from "@/components/ui/section";
import { MonoLabel } from "@/components/ui/mono-label";
import { AIReadout } from "@/components/ai-readout";

export function TheShift() {
  return (
    <Section tone="dark">
      <MonoLabel>What changed</MonoLabel>
      <h2 className="mt-5 max-w-[22ch] text-[length:var(--text-section)] font-extrabold leading-[1.05] tracking-[-0.025em]">
        SEO got you on the list. AI doesn&rsquo;t show a list. It makes the{" "}
        <span className="text-[var(--color-signal)]">choice</span>.
      </h2>
      <p className="mt-5 max-w-[54ch] text-[17px] leading-[1.65] text-[var(--color-fg-variant)]">
        Being findable used to be enough. Now AI picks the names, and you need to be one it trusts.
      </p>
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <AIReadout
          dim
          caption="Google, five years ago"
          prompt="emergency plumber near me"
          names={["10 blue links", "…scroll…", "…ads…", "…page two…"]}
        />
        <AIReadout
          caption="AI, today"
          prompt="Who's a good emergency plumber in Perth?"
          names={["Two or three names", "Picked for the customer", "No scrolling"]}
          hook="No page two."
        />
      </div>
    </Section>
  );
}
