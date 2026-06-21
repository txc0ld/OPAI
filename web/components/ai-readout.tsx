import { cn } from "@/lib/cn";

type AIReadoutProps = {
  prompt: string;
  names: string[];
  hook?: string;
  caption?: string;
  dim?: boolean;
  className?: string;
};

export function AIReadout({ prompt, names, hook, caption, dim = false, className }: AIReadoutProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-lowest)] p-5 font-mono text-[13px] leading-[1.7]",
        dim && "opacity-60",
        className,
      )}
    >
      {caption ? (
        <div className="mb-4 text-[11px] uppercase tracking-[0.1em] text-[var(--color-fg-variant)]">{caption}</div>
      ) : null}
      <div className="flex gap-2 text-[var(--color-fg-variant)]">
        <span className="select-none text-[var(--color-signal)]">&gt;</span>
        <span className="text-[var(--color-fg)]">{prompt}</span>
      </div>
      <ol className="mt-3 grid gap-1.5">
        {names.map((name, i) => (
          <li key={name} className="flex gap-2 text-[var(--color-fg)]">
            <span className="select-none text-[var(--color-fg-variant)]">{i + 1}.</span>
            <span>{name}</span>
          </li>
        ))}
      </ol>
      {hook ? (
        <div className="mt-4 flex items-center gap-2 text-[var(--color-signal)]">
          <span className="inline-block h-3 w-[7px] animate-pulse bg-[var(--color-signal)]" aria-hidden />
          {hook}
        </div>
      ) : null}
    </div>
  );
}
