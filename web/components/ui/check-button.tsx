import Link from "next/link";
import { cn } from "@/lib/cn";
import { CHECK_CTA } from "@/lib/nav";

type CheckButtonProps = {
  label?: string;
  variant?: "solid" | "ghost";
  tone?: "dark" | "light";
  className?: string;
};

export function CheckButton({
  label = "See what AI says about you",
  variant = "solid",
  tone = "dark",
  className,
}: CheckButtonProps) {
  const base =
    "group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[15px] font-bold tracking-tight transition-all duration-300 will-change-transform";
  const solid =
    "bg-[var(--color-signal)] text-[var(--color-on-signal)] hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_var(--color-signal),0_16px_44px_-10px_var(--color-signal-glow),0_0_46px_-6px_var(--color-signal-glow)]";
  const ghostDark =
    "border border-[var(--color-border)] text-[var(--color-fg)] hover:-translate-y-0.5 hover:border-[var(--color-signal)] hover:text-[var(--color-signal)]";
  const ghostLight =
    "border border-[var(--color-line-ink)] text-[var(--color-ink)] hover:-translate-y-0.5 hover:border-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-white";

  return (
    <Link
      href={CHECK_CTA.href}
      className={cn(base, variant === "solid" ? solid : tone === "light" ? ghostLight : ghostDark, className)}
    >
      {label}
      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
        →
      </span>
    </Link>
  );
}
