import type { ReactNode } from "react";

type StageShellProps = {
  stageId: string;
  bodyId: string;
  children: ReactNode;
};

/**
 * Pinned scroll stage. The outer .stage is 300vh tall to give the
 * particle canvas room to animate its title between three phases
 * (form-in → hold → disperse). The inner .pin is sticky 100vh.
 * The .intro-body element receives opacity/transform updates from
 * the ParticleCanvas script, so it must have the `id={bodyId}`.
 */
export function StageShell({ stageId, bodyId, children }: StageShellProps) {
  return (
    <div id={stageId} className="relative z-[3] h-[300vh]">
      <div className="pointer-events-none sticky top-0 flex h-screen items-center justify-center px-6 lg:px-12">
        <div
          id={bodyId}
          className="pointer-events-auto w-full max-w-[760px] opacity-0 will-change-[opacity,transform]"
          style={{ transform: "translateY(70px)" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
