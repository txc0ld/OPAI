import { Section } from "@/components/section";
import { Button } from "@/components/button";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/cn";

type CTABandProps = {
  headline: string;
  body?: string;
  tone?: "ink" | "paper";
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  className?: string;
};

export function CTABand({
  headline,
  body,
  tone = "ink",
  primaryHref = "/book-ai-audit/",
  primaryLabel = "Book an AI Business Audit",
  secondaryHref,
  secondaryLabel,
  className,
}: CTABandProps) {
  const onInk = tone === "ink";
  const primaryVariant = onInk ? "inverse" : "primary";

  return (
    <Section
      tone={tone}
      className={cn("py-[clamp(5rem,12vw,9rem)]", className)}
    >
      <Reveal className="mx-auto flex max-w-[44rem] flex-col items-center text-center">
        <h2
          className={cn(
            "font-sans font-medium tracking-[-0.02em]",
            "text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05]",
          )}
        >
          {headline}
        </h2>
        {body ? (
          <p
            className={cn(
              "mt-6 font-sans text-[1.0625rem] leading-[1.55] max-w-[var(--measure)]",
              onInk
                ? "text-[rgb(246_244_238_/_0.78)]"
                : "text-[var(--color-muted)]",
            )}
          >
            {body}
          </p>
        ) : null}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:gap-5">
          <Button as="a" href={primaryHref} variant={primaryVariant} size="lg">
            {primaryLabel}
          </Button>
          {secondaryHref && secondaryLabel ? (
            <Button
              as="a"
              href={secondaryHref}
              variant="ghost"
              size="lg"
              data-on-ink={onInk ? "true" : undefined}
            >
              {secondaryLabel}
            </Button>
          ) : null}
        </div>
      </Reveal>
    </Section>
  );
}
