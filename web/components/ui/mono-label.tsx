import { cn } from "@/lib/cn";

export function MonoLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-[var(--color-fg-variant)]",
        className,
      )}
    >
      {children}
    </span>
  );
}
