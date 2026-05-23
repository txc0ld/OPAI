import { JsonLd } from "@/components/json-ld";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { buildFaqPage, type FaqItem } from "@/lib/schema";

type FaqSectionProps = {
  heading?: string;
  eyebrow?: string;
  items: FaqItem[];
  tone?: "paper" | "ink";
  emitSchema?: boolean;
};

export function FaqSection({
  heading = "Frequently asked questions",
  eyebrow,
  items,
  tone = "paper",
  emitSchema = true,
}: FaqSectionProps) {
  return (
    <Section tone={tone} aria-labelledby="faq-heading">
      <SectionHeading
        eyebrow={eyebrow}
        title={heading}
        as="h2"
        className="mb-10"
      />
      <dl className="border-[3px] border-black">
        {items.map((item, i) => (
          <div
            key={item.question}
            className={i === 0 ? "" : "border-t-[3px] border-black"}
          >
            <dt>
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-5 py-5 font-heading text-[1.0625rem] font-bold uppercase tracking-[-0.01em] hover:bg-[var(--color-primary-container)]">
                  <span>{item.question}</span>
                  <span
                    aria-hidden="true"
                    className="font-mono text-[1.25rem] leading-none transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <dd className="border-t-[3px] border-black px-5 py-5 text-[0.9375rem] leading-[1.6] text-[var(--color-muted)]">
                  {item.answer}
                </dd>
              </details>
            </dt>
          </div>
        ))}
      </dl>
      {emitSchema ? <JsonLd schema={buildFaqPage(items)} /> : null}
    </Section>
  );
}
