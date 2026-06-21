import Link from "next/link";
import { cn } from "@/lib/cn";
import { CHECK_CTA } from "@/lib/nav";

type CheckButtonProps = {
  label?: string;
  variant?: "solid" | "outline";
  className?: string;
};

export function CheckButton({ label = "See what AI says about you", variant = "solid", className }: CheckButtonProps) {
  return (
    <Link
      href={CHECK_CTA.href}
      className={cn(
        "inline-flex items-center gap-2 rounded px-6 py-3.5 text-[15px] font-bold tracking-tight transition-all duration-300",
        variant === "solid"
          ? "bg-[var(--color-signal)] text-[var(--color-on-signal)] hover:-translate-y-0.5 hover:shadow-[2px_2px_0_0_rgba(243,252,133,0.3)]"
          : "border border-[var(--color-signal)] text-[var(--color-signal)] hover:bg-[var(--color-signal)]/10",
        className,
      )}
    >
      {label}
      <span aria-hidden>→</span>
    </Link>
  );
}
