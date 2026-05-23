import { cn } from "@/lib/cn";

type LogoProps = {
  variant?: "stacked" | "compact";
  tone?: "ink" | "paper";
  className?: string;
};

export function Logo({ variant = "stacked", tone = "ink", className }: LogoProps) {
  const fg = tone === "ink" ? "text-[var(--color-ink)]" : "text-[var(--color-paper)]";
  const muted = tone === "ink" ? "text-[var(--color-muted)]" : "text-[rgb(246_244_238_/_0.55)]";
  const rule = tone === "ink" ? "border-[var(--color-ink)]" : "border-[var(--color-paper)]";
  const ariaLabel = "OperateAI — AI for small business";

  if (variant === "compact") {
    return (
      <span
        className={cn("inline-flex items-baseline gap-3 leading-none", className)}
        aria-label={ariaLabel}
      >
        <span className="font-sans text-[1.5rem] tracking-[-0.04em] leading-none">
          <span className={cn("font-light", muted)}>[</span>
          <span className={cn("font-semibold", fg)}>opai</span>
          <span className={cn("font-light", muted)}>]</span>
        </span>
        <span className={cn("font-mono text-[0.625rem] uppercase tracking-[0.28em] translate-y-[-2px]", muted)}>
          OperateAI · Perth
        </span>
      </span>
    );
  }

  return (
    <span
      className={cn("inline-flex flex-col leading-none", className)}
      aria-label={ariaLabel}
    >
      <span className="font-sans text-[2rem] tracking-[-0.04em] leading-none">
        <span className={cn("font-light", muted)}>[</span>
        <span className={cn("font-semibold", fg)}>opai</span>
        <span className={cn("font-light", muted)}>]</span>
      </span>
      <span className={cn("mt-2 pt-2 border-t font-mono text-[0.625rem] uppercase tracking-[0.32em]", rule, muted)}>
        OperateAI · AI for Small Business
      </span>
    </span>
  );
}
