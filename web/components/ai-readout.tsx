import { cn } from "@/lib/cn";

type AIReadoutProps = {
  prompt: string;
  names: string[];
  hook?: string;
  caption?: string;
  dim?: boolean;
  className?: string;
};

// A dark "AI answer" card. Premium even on light sections: layered gradient,
// hairline border, deep shadow, grain, and (when live) a soft lime glow.
export function AIReadout({ prompt, names, hook, caption, dim = false, className }: AIReadoutProps) {
  return (
    <div className={cn("relative", className)}>
      {!dim ? (
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-12 h-56 w-56 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, var(--color-signal-glow), transparent 70%)" }}
        />
      ) : null}

      <div
        className="grain relative overflow-hidden rounded-3xl border font-mono text-[12.5px] leading-[1.6]"
        style={{
          borderColor: dim ? "var(--color-border)" : "color-mix(in oklab, var(--color-signal) 18%, var(--color-border))",
          background: dim
            ? "linear-gradient(160deg, #141414, #0b0b0b)"
            : "linear-gradient(160deg, #1c1c1c, #0c0c0c)",
          boxShadow: dim
            ? "0 24px 50px -30px rgba(0,0,0,0.6)"
            : "0 40px 80px -32px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        <div className="relative z-[1] p-5 lg:p-6">
          {/* header */}
          <div className="mb-5 flex items-center justify-between border-b border-[var(--color-border)] pb-4">
            <div className="flex items-center gap-2.5">
              <span
                aria-hidden
                className={cn(
                  "grid h-6 w-6 place-items-center rounded-md text-[10px] font-extrabold",
                  dim
                    ? "bg-[var(--color-surface-high)] text-[var(--color-fg-variant)]"
                    : "bg-[var(--color-signal)] text-[var(--color-on-signal)]",
                )}
              >
                {dim ? "G" : "AI"}
              </span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-fg-variant)]">
                {caption ?? (dim ? "Google" : "AI answer")}
              </span>
            </div>
            {!dim ? (
              <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-[var(--color-fg-variant)]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-signal)]" aria-hidden />
                live
              </span>
            ) : null}
          </div>

          {/* prompt */}
          <p className="flex gap-2 text-[var(--color-fg)]">
            <span aria-hidden className="select-none text-[var(--color-fg-variant)]">
              &rsaquo;
            </span>
            <span>{prompt}</span>
          </p>

          {/* answer rows */}
          <ol role="list" className="mt-4 grid gap-1.5">
            {names.map((name, i) => (
              <li
                key={`${i}-${name}`}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5",
                  dim ? "text-[var(--color-fg-variant)]" : "text-[var(--color-fg)]",
                )}
                style={
                  dim ? undefined : { background: "color-mix(in oklab, var(--color-signal) 6%, transparent)" }
                }
              >
                <span
                  className={cn(
                    "grid h-5 w-5 flex-none place-items-center rounded-md bg-[var(--color-surface-high)] text-[10px]",
                    dim ? "text-[var(--color-fg-variant)]" : "text-[var(--color-signal)]",
                  )}
                >
                  {i + 1}
                </span>
                <span className="flex-1">{name}</span>
                {!dim ? (
                  <span aria-hidden className="text-[var(--color-signal)]">
                    ✓
                  </span>
                ) : null}
              </li>
            ))}
          </ol>

          {hook ? (
            <p
              className={cn(
                "mt-5 flex items-center gap-2 border-t border-[var(--color-border)] pt-4 font-semibold",
                dim ? "text-[var(--color-fg-variant)]" : "text-[var(--color-signal)]",
              )}
            >
              {!dim ? <span aria-hidden className="caret inline-block h-3.5 w-[7px] bg-[var(--color-signal)]" /> : null}
              {hook}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
