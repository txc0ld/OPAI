import { cn } from "@/lib/cn";

type MonoLabelProps = {
  children: React.ReactNode;
  className?: string;
  tone?: "dark" | "light";
};

// Editorial eyebrow: a short rule + spaced caps. Lime on dark, ink-soft on paper.
export function MonoLabel({ children, className, tone = "dark" }: MonoLabelProps) {
  const color = tone === "light" ? "text-[var(--color-ink-soft)]" : "text-[var(--color-signal)]";
  const rule = tone === "light" ? "bg-[var(--color-ink-soft)]" : "bg-[var(--color-signal)]";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em]",
        color,
        className,
      )}
    >
      <span aria-hidden className={cn("h-px w-6 opacity-70", rule)} />
      {children}
    </span>
  );
}
