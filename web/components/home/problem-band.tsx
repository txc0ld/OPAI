import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

export function ProblemBand() {
  return (
    <Section tone="paper" className="border-t-[3px] border-black">
      <SectionHeading
        eyebrow="The problem"
        title="Most businesses know AI matters. Few know where to start."
        as="h2"
        className="mb-8"
      />
      <Reveal>
        <div className="max-w-[var(--measure)] space-y-5 text-[1.0625rem] leading-[1.65] text-[var(--color-muted)]">
          <p>
            AI tools are everywhere, but most small and medium businesses are
            still stuck at the experimentation stage.
          </p>
          <p>
            You may have staff using ChatGPT casually. You may have tried a few
            automation tools. You may know AI could save time, reduce admin and
            improve customer service — but without a clear implementation plan,
            it becomes another disconnected tool instead of a business
            advantage.
          </p>
          <p>
            OperateAI helps you move from scattered AI usage to structured AI
            systems that support real business workflows.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
