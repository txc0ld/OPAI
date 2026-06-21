import { cn } from "@/lib/cn";

type LogoProps = {
  className?: string;
};

/**
 * OperateAI wordmark: a lime mark tile + the name. Inherits text colour from
 * its context (light on the dark nav/footer). Replaces the old raster PNG.
 */
export function Logo({ className }: LogoProps) {
  return (
    <span className={cn("inline-flex select-none items-center gap-2.5", className)}>
      <span
        aria-hidden
        className="grid h-7 w-7 place-items-center rounded-lg bg-[var(--color-signal)] text-[14px] font-extrabold text-[var(--color-on-signal)]"
      >
        O
      </span>
      <span className="text-[18px] font-extrabold tracking-[-0.02em]">
        OperateAI<span className="text-[var(--color-signal)]">.</span>
      </span>
    </span>
  );
}
