import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

export function SolutionBand() {
  return (
    <Section tone="paper" className="border-t-[3px] border-black">
      <SectionHeading
        eyebrow="What we do"
        title="We help you turn AI into a working business system."
        as="h2"
        className="mb-8"
      />
      <Reveal>
        <div className="max-w-[var(--measure)] space-y-5 text-[1.0625rem] leading-[1.65] text-[var(--color-muted)]">
          <p>OperateAI works with businesses at every level of AI maturity.</p>
          <p>
            If you are starting from zero, we help you understand what AI can
            and cannot do, identify useful opportunities, and train your team
            to use the right tools safely and effectively.
          </p>
          <p>
            If you already have technical staff or existing systems, we help
            design, build, integrate and manage AI agents that connect with
            your workflows, documents, customer interactions and internal
            processes.
          </p>
          <p>
            The goal is simple: practical AI that saves time, improves
            consistency and supports better business operations.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
