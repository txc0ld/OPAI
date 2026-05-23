import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

const STEPS = [
  {
    n: "01",
    title: "Audit",
    body: "We review your business workflows, tools, pain points, staff capability and AI opportunities.",
  },
  {
    n: "02",
    title: "Roadmap",
    body: "You receive a practical AI implementation plan prioritised by value, complexity, risk and speed of deployment.",
  },
  {
    n: "03",
    title: "Build",
    body: "We configure tools, design workflows, build AI agents and integrate systems where appropriate.",
  },
  {
    n: "04",
    title: "Train",
    body: "We train owners, managers and staff so the AI systems are used properly and consistently.",
  },
  {
    n: "05",
    title: "Manage",
    body: "We provide ongoing hosting, monitoring, updates and optimisation for businesses that want managed AI operations.",
  },
];

export function ProcessBand() {
  return (
    <Section tone="paper" className="border-t-[3px] border-black">
      <SectionHeading
        eyebrow="How we work"
        title="From audit to managed operations"
        as="h2"
        className="mb-10"
      />
      <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {STEPS.map((s, i) => (
          <Reveal as="li" key={s.n} delay={i * 50} className="border-[3px] border-black bg-[var(--color-surface)] p-5">
            <p className="font-mono text-[0.875rem] leading-none">{s.n}</p>
            <h3 className="mt-6 font-heading text-[1.25rem] font-bold uppercase leading-none tracking-[-0.03em]">
              {s.title}
            </h3>
            <p className="mt-3 text-[0.9375rem] leading-[1.5] text-[var(--color-muted)]">{s.body}</p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
