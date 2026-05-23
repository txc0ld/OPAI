import Link from "next/link";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

const SERVICES = [
  {
    href: "/book-ai-audit/",
    title: "AI Business Audit",
    body: "A structured review of your workflows, tools, bottlenecks and AI opportunities. We identify where AI can create measurable value and where it should be avoided.",
    cta: "Book an audit",
  },
  {
    href: "/ai-integration-services/",
    title: "AI Integration Services",
    body: "We help integrate AI into your daily business processes, including customer support, admin, sales, reporting, operations, documentation and internal knowledge systems.",
    cta: "View integration services",
  },
  {
    href: "/ai-agents-for-business/",
    title: "Custom AI Agents",
    body: "We design and build AI agents that can assist with repetitive tasks, answer business-specific questions, process information, support customers and help staff work faster.",
    cta: "Explore AI agents",
  },
  {
    href: "/ai-agent-hosting/",
    title: "AI Agent Hosting & Management",
    body: "We host, monitor, maintain and improve AI agents so your business is not left managing technical systems alone.",
    cta: "View managed AI hosting",
  },
  {
    href: "/ai-training-for-business/",
    title: "AI Training for Business",
    body: "Practical training for owners, managers and staff — from AI basics to advanced workflows, prompt design, tool selection and safe business usage.",
    cta: "View training options",
  },
];

export function ServicesGrid() {
  return (
    <Section tone="paper" className="border-t-[3px] border-black">
      <SectionHeading
        eyebrow="Services"
        title="AI services for every stage of business adoption"
        as="h2"
        className="mb-10"
      />
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s, i) => (
          <Reveal as="li" key={s.href} delay={i * 60}>
            <Link
              href={s.href}
              className="hard-offset group flex h-full flex-col border-[3px] border-black bg-[var(--color-surface)] p-6 hover:bg-[var(--color-primary-container)]"
            >
              <h3 className="font-heading text-[1.375rem] font-bold uppercase leading-[1.05] tracking-[-0.02em]">
                {s.title}
              </h3>
              <p className="mt-4 text-[0.9375rem] leading-[1.55] text-[var(--color-muted)] group-hover:text-black">
                {s.body}
              </p>
              <span className="mt-6 inline-flex w-fit border-t-[3px] border-black pt-3 font-heading text-[0.75rem] font-bold uppercase tracking-[0.08em]">
                {s.cta} →
              </span>
            </Link>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
