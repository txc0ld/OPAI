import type { ReactNode } from "react";

type StageShellProps = {
  stageId: string;
  bodyId: string;
  /**
   * Title lines rendered as a big Orbitron heading on touch devices where
   * the particle canvas is disabled. Each line becomes a row in the
   * heading. Lowercase "i" letters get the lime accent treatment via
   * inline spans. Pass undefined to skip the mobile heading (the hero
   * stage already has its own H1).
   */
  mobileTitleLines?: string[];
  children: ReactNode;
};

/** Wrap each lowercase "i" in a lime-accent span. */
function colorizeLowercaseI(line: string): ReactNode[] {
  const parts = line.split("i");
  const out: ReactNode[] = [];
  parts.forEach((p, idx) => {
    if (p) out.push(p);
    if (idx < parts.length - 1) {
      out.push(
        <span key={`i-${idx}`} className="text-[var(--color-accent)]">
          i
        </span>,
      );
    }
  });
  return out;
}

/**
 * Pinned scroll stage. On fine pointers (desktop) the outer .stage is 300vh
 * tall to give the particle canvas room to animate its title between three
 * phases (form-in → hold → disperse) while the inner .pin sticks at 100vh.
 *
 * On coarse pointers (touch) the stage collapses to a normal static section
 * and the particle canvas is hidden — see ParticleCanvas + globals.css.
 * iOS Safari pauses canvas paints during a scroll gesture, causing a
 * "flash to full canvas" once the gesture ends, so we render a clean
 * Orbitron heading instead on touch.
 */
export function StageShell({ stageId, bodyId, mobileTitleLines, children }: StageShellProps) {
  return (
    <div id={stageId} className="stage-shell relative z-[3] h-[300vh]">
      <div className="stage-shell-pin pointer-events-none sticky top-0 flex h-screen items-center justify-center px-6 lg:px-12">
        <div
          id={bodyId}
          className="stage-shell-body pointer-events-auto w-full max-w-[760px] opacity-0 will-change-[opacity,transform]"
          style={{ transform: "translateY(70px)" }}
        >
          {mobileTitleLines && mobileTitleLines.length > 0 ? (
            <h2 className="stage-shell-mobile-title hidden font-[family-name:Orbitron,sans-serif] text-[clamp(40px,12vw,80px)] font-black uppercase leading-[0.95] tracking-[-0.02em]">
              {mobileTitleLines.map((line, idx) => (
                <span key={idx} className="block">
                  {colorizeLowercaseI(line)}
                </span>
              ))}
            </h2>
          ) : null}
          {children}
        </div>
      </div>
    </div>
  );
}
