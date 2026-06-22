import { Section } from "@/components/ui/section";
import { MonoLabel } from "@/components/ui/mono-label";
import { JsonLd } from "@/components/json-ld";
import { buildFaqPage, wrapGraph, type FaqItem } from "@/lib/schema";

type FaqProps = {
  items: FaqItem[];
  title?: string;
  tone?: "paper" | "dark";
  emitSchema?: boolean;
};

export function Faq({ items, title = "Common questions", tone = "paper", emitSchema = true }: FaqProps) {
  const isLight = tone === "paper";
  return (
    <Section tone={tone}>
      {emitSchema && <JsonLd schema={wrapGraph([buildFaqPage(items)])} />}

      <MonoLabel tone={isLight ? "light" : "dark"}>FAQ</MonoLabel>
      <h2
        className={[
          "mt-5 text-[clamp(26px,3.5vw,38px)] font-extrabold leading-[1.08] tracking-[-0.025em]",
          isLight ? "text-[var(--color-ink)]" : "text-[var(--color-fg)]",
        ].join(" ")}
      >
        {title}
      </h2>

      <div className="mt-10 max-w-[860px] divide-y divide-[var(--color-line-ink)]" style={isLight ? {} : { "--color-line-ink": "var(--color-border)" } as React.CSSProperties}>
        {items.map((item) => (
          <details
            key={item.question}
            className="group"
          >
            <summary
              className={[
                "flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[17px] font-semibold leading-snug tracking-[-0.01em] transition-colors",
                "[&::-webkit-details-marker]:hidden",
                isLight
                  ? "text-[var(--color-ink)] hover:text-[color-mix(in_oklab,var(--color-ink)_80%,var(--color-signal))]"
                  : "text-[var(--color-fg)] hover:text-[color-mix(in_oklab,var(--color-fg)_80%,var(--color-signal))]",
              ].join(" ")}
            >
              <span>{item.question}</span>
              {/* Plus/minus icon — lime when open */}
              <span
                aria-hidden
                className="relative ml-4 h-5 w-5 shrink-0 text-[var(--color-signal)]"
              >
                <span className="absolute left-1/2 top-1/2 h-px w-[14px] -translate-x-1/2 -translate-y-1/2 bg-current" />
                <span className="absolute left-1/2 top-1/2 h-[14px] w-px -translate-x-1/2 -translate-y-1/2 bg-current transition-transform duration-200 group-open:scale-y-0" />
              </span>
            </summary>
            <p
              className={[
                "pb-6 text-[15px] leading-[1.7] max-w-[760px]",
                isLight ? "text-[var(--color-ink-soft)]" : "text-[var(--color-fg-variant)]",
              ].join(" ")}
            >
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </Section>
  );
}
