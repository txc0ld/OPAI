import { Section } from "@/components/section";
import { Button } from "@/components/button";
import { Reveal } from "@/components/reveal";

export function ConversionBand() {
  return (
    <Section tone="paper" className="border-t-[3px] border-black">
      <Reveal className="max-w-[var(--measure)] space-y-6">
        <h2 className="font-heading text-[clamp(2rem,4.5vw,3rem)] font-bold uppercase leading-[1] tracking-[-0.035em]">
          Start with an AI Business Audit
        </h2>
        <p className="text-[1.0625rem] leading-[1.65] text-[var(--color-muted)]">
          The fastest way to begin is with a focused AI Business Audit. We
          review your current tools, workflows and opportunities, then identify
          where AI agents, automation or training can deliver practical value.
          You will leave with a clear implementation roadmap instead of vague
          AI ideas.
        </p>
        <div className="pt-2">
          <Button as="a" href="/book-ai-audit/" size="lg">
            Book an AI Business Audit
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
