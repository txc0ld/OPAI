import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

const USE_CASES = [
  "Customer support assistants trained on your business information",
  "Internal knowledge assistants for policies, procedures and documents",
  "Lead qualification and sales support agents",
  "Automated email, proposal and document drafting workflows",
  "AI-assisted quoting, intake and admin processes",
  "Reporting and data summarisation workflows",
  "Staff training and AI adoption programs",
  "AI agents connected to business tools and databases",
  "AI governance, usage policies and risk controls",
];

export function UseCasesStrip() {
  return (
    <Section tone="paper" className="border-t-[3px] border-black">
      <SectionHeading
        eyebrow="Use cases"
        title="Common AI use cases for small and medium businesses"
        as="h2"
        className="mb-10"
      />
      <ul className="grid gap-x-10 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
        {USE_CASES.map((u, i) => (
          <Reveal as="li" key={u} delay={i * 30} className="flex gap-3 text-[1rem] leading-[1.5]">
            <span className="mt-2 h-2 w-2 shrink-0 bg-[var(--color-primary-container)] ring-2 ring-black" />
            <span>{u}</span>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
