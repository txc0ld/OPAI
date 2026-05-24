import type { ReactNode } from "react";

type StageShellProps = {
  stageId: string;
  bodyId: string;
  children: ReactNode;
};

/**
 * Pinned scroll stage. On fine pointers (desktop) the outer .stage is 300vh
 * tall to give the particle canvas room to animate its title between three
 * phases (form-in → hold → disperse) while the inner .pin sticks at 100vh.
 *
 * On coarse pointers (touch) the stage collapses to a normal static section.
 * The particle canvas is disabled on touch — see ParticleCanvas + globals.css
 * — because iOS Safari pauses canvas paints during a scroll gesture, causing
 * a "flash to full canvas" once the gesture ends.
 */
export function StageShell({ stageId, bodyId, children }: StageShellProps) {
  return (
    <div id={stageId} className="stage-shell relative z-[3] h-[300vh]">
      <div className="stage-shell-pin pointer-events-none sticky top-0 flex h-screen items-center justify-center px-6 lg:px-12">
        <div
          id={bodyId}
          className="stage-shell-body pointer-events-auto w-full max-w-[760px] opacity-0 will-change-[opacity,transform]"
          style={{ transform: "translateY(70px)" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
