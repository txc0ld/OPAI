import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

export function AudienceBand() {
  return (
    <Section tone="paper" className="border-t-[3px] border-black">
      <SectionHeading
        eyebrow="Who it's for"
        title="Built for non-technical owners and technical teams"
        as="h2"
        className="mb-10"
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <Reveal className="border-[3px] border-black p-6">
          <h3 className="font-heading text-[1.25rem] font-bold uppercase tracking-[-0.02em]">
            Starting from zero
          </h3>
          <p className="mt-5 text-[0.9375rem] leading-[1.6] text-[var(--color-muted)]">
            For business owners and teams who are new to AI, we provide
            plain-English guidance, practical training and step-by-step
            implementation.
          </p>
        </Reveal>
        <Reveal className="border-[3px] border-black p-6" delay={60}>
          <h3 className="font-heading text-[1.25rem] font-bold uppercase tracking-[-0.02em]">
            With technical staff
          </h3>
          <p className="mt-5 text-[0.9375rem] leading-[1.6] text-[var(--color-muted)]">
            For businesses with more technical personnel, we provide deeper
            support across AI agent design, workflow architecture, automation
            logic, hosting, documentation and ongoing optimisation.
          </p>
        </Reveal>
      </div>
      <p className="mt-8 max-w-[var(--measure)] text-[1rem] leading-[1.6] text-[var(--color-muted)]">
        You do not need to know exactly what you need before speaking with us.
        The first step is identifying where AI can create useful business
        value.
      </p>
    </Section>
  );
}
