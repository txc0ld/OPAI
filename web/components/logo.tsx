import { cn } from "@/lib/cn";

type LogoProps = {
  showPerth?: boolean;
  className?: string;
};

export function Logo({ showPerth = true, className }: LogoProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-bold text-[15px] leading-none tracking-[-0.02em]",
        className,
      )}
      aria-label="OperateAI — AI for small business"
    >
      <span className="power-dot" aria-hidden="true" />
      <span>OperateAI</span>
      {showPerth ? (
        <span className="hidden font-normal text-[var(--color-w50)] sm:inline">· Perth</span>
      ) : null}
    </span>
  );
}
