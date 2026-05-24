import { JsonLd } from "@/components/json-ld";
import { buildFaqPage, type FaqItem } from "@/lib/schema";

type FaqSectionProps = {
  heading?: string;
  eyebrow?: string;
  items: FaqItem[];
  emitSchema?: boolean;
};

export function FaqSection({
  heading = "Frequently asked questions",
  eyebrow = "FAQ",
  items,
  emitSchema = true,
}: FaqSectionProps) {
  return (
    <section className="bg-[var(--color-bg)] px-6 py-24 lg:px-12 lg:py-32">
      <div className="mx-auto w-full max-w-[1200px]">
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="reveal mt-6 text-[clamp(28px,4vw,44px)] font-extrabold leading-[1.05] tracking-[-0.03em]">
          {heading}
        </h2>
        <div className="reveal mt-12 max-w-[860px]">
          {items.map((f) => (
            <details key={f.question} className="group border-b border-[var(--color-w10)]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-[18px] font-semibold tracking-[-0.01em] transition-colors hover:text-[var(--color-fg)] [&::-webkit-details-marker]:hidden">
                <span>{f.question}</span>
                <span className="relative h-[18px] w-[18px] shrink-0">
                  <span className="absolute left-1/2 top-1/2 h-[1.5px] w-[14px] -translate-x-1/2 -translate-y-1/2 bg-[var(--color-w50)]" />
                  <span className="absolute left-1/2 top-1/2 h-[14px] w-[1.5px] -translate-x-1/2 -translate-y-1/2 bg-[var(--color-w50)] transition-transform duration-300 group-open:scale-y-0" />
                </span>
              </summary>
              <div className="overflow-hidden pb-6 text-[15px] leading-[1.65] text-[var(--color-w70)]">
                <p className="max-w-[760px]">{f.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
      {emitSchema ? <JsonLd schema={buildFaqPage(items)} /> : null}
    </section>
  );
}
