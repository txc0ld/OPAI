"use client";

import { useEffect } from "react";

/**
 * OperateAI particle engine — fixed canvas that renders whichever pinned
 * stage is currently in view. Ported nearly verbatim from the user's
 * operate-ai-site.html mockup (5 stages: hero + 4 service flows).
 *
 * The component is a client-side singleton; mount it once near the top of
 * the homepage. It expects `#stage-top`, `#stage-integration`, etc. and
 * matching `#body-top`, `#body-integration`, etc. to be present in the DOM.
 */
export function ParticleCanvas() {
  useEffect(() => {
    const canvasEl = document.getElementById("particle-canvas") as HTMLCanvasElement | null;
    const stirEl = document.getElementById("particle-stir") as HTMLDivElement | null;
    const scrollcue = document.getElementById("particle-scrollcue") as HTMLDivElement | null;
    if (!canvasEl || !stirEl || !scrollcue) return;
    const ctx = canvasEl.getContext("2d", { alpha: false });
    if (!ctx) return;
    const canvas = canvasEl;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    // Hide the OS cursor only on fine pointers (the stir circle replaces it).
    // On touch screens the stir is meaningless and cursor:none is inert anyway.
    if (!coarsePointer) {
      canvas.style.cursor = "none";
    }

    const HERO_Y = 0.42;
    const TITLE_Y = 0.42;

    const STAGE_DEFS = [
      { stageId: "stage-top", kind: "hero" as const, heroLines: ["OPERATE", "Ai"], titleLines: ["Ai AGENTS &", "AUTOMATiON"], bodyId: "body-top" },
      { stageId: "stage-integration", kind: "flow" as const, titleLines: ["Ai iNTEGRATiON", "SERViCES"], bodyId: "body-integration" },
      { stageId: "stage-hosting", kind: "flow" as const, titleLines: ["Ai AGENT", "HOSTiNG"], bodyId: "body-hosting" },
      { stageId: "stage-training", kind: "flow" as const, titleLines: ["Ai", "TRAiNiNG"], bodyId: "body-training" },
      { stageId: "stage-industries", kind: "flow" as const, titleLines: ["Ai BY", "iNDUSTRY"], bodyId: "body-industries" },
    ];

    const radius = 75;
    const PUSH = 2.6;
    const SWIRL = 1.0;
    const RETAIN = 0.97;
    const EASE = 0.09;
    const TRAIL = 0.2;
    const VMAX = 4;
    const RETURN_EASE = 0.06;
    const RETURN_DELAY = 1.0;
    const STEP = 1;
    const JITTER = 1.3;
    const FORM_DUR = 1.1;
    const FORM_STAGGER = 0.7;

    let W = 0;
    let H = 0;
    let t0 = 0;
    let activeIdx = 0;
    let rafId = 0;
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;

    type HeroParticle = {
      ax: number; ay: number; bx: number; by: number;
      x: number; y: number; vx: number; vy: number;
      lime: boolean;
      dispX: number; dispY: number;
      delay: number; size: number; resp: number;
      hitAt: number; done: boolean;
    };
    type FlowParticle = {
      bx: number; by: number; ox: number; oy: number;
      size: number; lime: boolean; formDelay: number;
      dispX: number; dispY: number;
    };
    type StageRuntime = {
      def: (typeof STAGE_DEFS)[number];
      el: HTMLElement;
      body: HTMLElement;
      P: (HeroParticle | FlowParticle)[];
      kind: "hero" | "flow";
      top: number;
      range: number;
    };

    const stages: StageRuntime[] = [];
    const mouse = { x: -9999, y: -9999, active: false };
    let mx = -9999;
    let my = -9999;
    let pmx = -9999;
    let pmy = -9999;

    const smoothstep = (t: number) => t * t * (3 - 2 * t);
    const smoother = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
    const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
    const jit = () => (Math.random() - 0.5) * JITTER * 2;

    function sampleText(lines: string[], fontSize: number, cy: number) {
      const lh = fontSize * 1.04;
      ctx!.fillStyle = "#000";
      ctx!.fillRect(0, 0, W, H);
      ctx!.font = `800 ${fontSize}px "Plus Jakarta Sans", sans-serif`;
      ctx!.textBaseline = "middle";
      const top = cy - ((lines.length - 1) * lh) / 2;
      const dotBoxes: { x: number; y: number; w: number; h: number }[] = [];
      ctx!.textAlign = "left";
      lines.forEach((line, li) => {
        const lineW = ctx!.measureText(line).width;
        let x = W / 2 - lineW / 2;
        const yc = top + li * lh;
        ctx!.fillStyle = "#fff";
        for (const ch of line) {
          const w = ctx!.measureText(ch).width;
          ctx!.fillText(ch, x, yc);
          if (ch === "i") {
            const dotH = fontSize * 0.16;
            const dotW = Math.max(w * 0.55, dotH);
            dotBoxes.push({ x: x + w * 0.5 - dotW / 2, y: yc - fontSize * 0.42, w: dotW, h: dotH });
          }
          x += w;
        }
      });
      ctx!.fillStyle = "#ccff00";
      for (const b of dotBoxes) ctx!.fillRect(b.x, b.y, b.w, b.h);

      const d = ctx!.getImageData(0, 0, W, H).data;
      const pts: { x: number; y: number; lime: boolean }[] = [];
      for (let y = 0; y < H; y += STEP) {
        for (let x = 0; x < W; x += STEP) {
          const idx = (y * W + x) * 4;
          const r = d[idx];
          const g = d[idx + 1];
          const b = d[idx + 2];
          if (r > 128 || g > 128) {
            const lime = g > 140 && b < 120 && r > 120;
            pts.push({ x, y, lime });
          }
        }
      }
      ctx!.fillStyle = "#000";
      ctx!.fillRect(0, 0, W, H);
      return pts;
    }

    function shuffle<T>(a: T[]): T[] {
      for (let i = a.length - 1; i > 0; i--) {
        const j = (Math.random() * (i + 1)) | 0;
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    }

    function buildStages() {
      stages.length = 0;
      const heroSize = Math.min(W / 6.5, H / 4.2, 150);
      const titleSize = Math.min(W / 9, H / 7, 92);
      for (const def of STAGE_DEFS) {
        const el = document.getElementById(def.stageId);
        const body = document.getElementById(def.bodyId);
        if (!el || !body) continue;
        let P: (HeroParticle | FlowParticle)[];
        if (def.kind === "hero") {
          const A = shuffle(sampleText(def.heroLines!, heroSize, H * HERO_Y));
          const B = shuffle(sampleText(def.titleLines, titleSize, H * TITLE_Y));
          const N = Math.max(A.length, B.length);
          P = new Array(N);
          for (let i = 0; i < N; i++) {
            const a = A[i % A.length];
            const b = B[i % B.length];
            const ax = a.x + jit();
            const ay = a.y + jit();
            const bx = b.x + jit();
            const by = b.y + jit();
            P[i] = {
              ax, ay, bx, by,
              x: Math.random() * W,
              y: Math.random() * H,
              vx: 0, vy: 0,
              lime: b.lime,
              dispX: bx + (Math.random() - 0.5) * 120,
              dispY: by + H * (0.9 + Math.random() * 0.6),
              delay: Math.random() * FORM_STAGGER,
              size: Math.random() * 0.7 + 0.6,
              resp: Math.random() * 0.7 + 0.7,
              hitAt: -999,
              done: false,
            } satisfies HeroParticle;
          }
        } else {
          const B = shuffle(sampleText(def.titleLines, titleSize, H * TITLE_Y));
          P = B.map((b) => {
            const bx = b.x + jit();
            const by = b.y + jit();
            const ox = bx + (Math.random() - 0.5) * 40;
            const oy = -Math.random() * H * 0.5 - 30;
            return {
              bx, by, ox, oy,
              size: Math.random() * 0.7 + 0.6,
              lime: b.lime,
              formDelay: Math.random() * 0.35,
              dispX: bx + (Math.random() - 0.5) * 80,
              dispY: by + H * (0.7 + Math.random() * 0.4),
            } satisfies FlowParticle;
          });
        }
        stages.push({ def, el, body, P, kind: def.kind, top: 0, range: 1 });
      }
      layout();
    }

    function layout() {
      for (const s of stages) {
        s.top = s.el.offsetTop;
        s.range = Math.max(1, s.el.offsetHeight - window.innerHeight);
      }
    }

    function onScroll() {
      let act = 0;
      for (let i = 0; i < stages.length; i++) {
        if (window.scrollY + window.innerHeight * 0.5 >= stages[i].top) act = i;
      }
      activeIdx = act;
      for (const s of stages) {
        const lp = clamp01((window.scrollY - s.top) / s.range);
        const asm = s.kind === "hero" ? smoother(clamp01((lp - 0.62) / 0.34)) : smoother(clamp01((lp - 0.64) / 0.32));
        s.body.style.opacity = asm.toFixed(3);
        s.body.style.transform = `translateY(${((1 - asm) * 60).toFixed(1)}px)`;
      }
      if (stages[0]) {
        scrollcue!.style.opacity = (1 - clamp01((window.scrollY / stages[0].range) / 0.1)).toFixed(3);
      }
    }

    function renderHero(s: StageRuntime, lp: number, elapsed: number) {
      const morph = smoother(clamp01(lp / 0.42));
      const disperse = smoother(clamp01((lp - 0.52) / 0.4));
      if (disperse >= 0.999) return;
      if (mouse.active) {
        if (mx < -9000) { mx = mouse.x; my = mouse.y; pmx = mx; pmy = my; }
        mx += (mouse.x - mx) * EASE;
        my += (mouse.y - my) * EASE;
      }
      const mspeed = Math.hypot(mx - pmx, my - pmy);
      pmx = mx; pmy = my;
      const alpha = 1 - disperse;
      ctx!.globalAlpha = alpha;
      for (let i = 0; i < s.P.length; i++) {
        const p = s.P[i] as HeroParticle;
        const hx = p.ax + (p.bx - p.ax) * morph;
        const hy = p.ay + (p.by - p.ay) * morph;
        if (!p.done) {
          if (elapsed > p.delay) {
            p.x += (hx - p.x) * 0.08;
            p.y += (hy - p.y) * 0.08;
          }
          if (elapsed > p.delay + FORM_DUR) p.done = true;
        } else if (morph > 0.001) {
          p.x += (hx - p.x) * 0.5;
          p.y += (hy - p.y) * 0.5;
          p.vx = 0;
          p.vy = 0;
        } else {
          if (mouse.active && activeIdx === 0) {
            const dx = p.x - mx;
            const dy = p.y - my;
            const dist = Math.hypot(dx, dy);
            if (dist < radius && dist > 0.5) {
              const f = smoothstep(1 - dist / radius);
              const dirX = dx / dist;
              const dirY = dy / dist;
              const push = f * PUSH * p.resp;
              const sw = f * (SWIRL + mspeed * 0.02) * p.resp;
              p.vx += dirX * push + (-dirY) * push * sw;
              p.vy += dirY * push + dirX * push * sw;
              p.hitAt = elapsed;
            }
          }
          if (elapsed - p.hitAt > RETURN_DELAY) {
            let vx = (hx - p.x) * RETURN_EASE;
            let vy = (hy - p.y) * RETURN_EASE;
            const sp = Math.hypot(vx, vy);
            if (sp > VMAX) { vx *= VMAX / sp; vy *= VMAX / sp; }
            p.x += vx; p.y += vy;
            p.vx = vx; p.vy = vy;
          } else {
            p.vx *= RETAIN;
            p.vy *= RETAIN;
            const sp = Math.hypot(p.vx, p.vy);
            if (sp > VMAX) { p.vx *= VMAX / sp; p.vy *= VMAX / sp; }
            p.x += p.vx;
            p.y += p.vy;
          }
        }
        const rx = disperse > 0 ? p.x + (p.dispX - p.x) * disperse : p.x;
        const ry = disperse > 0 ? p.y + (p.dispY - p.y) * disperse : p.y;
        ctx!.fillStyle = p.lime ? "#ccff00" : "#fff";
        ctx!.fillRect(rx, ry, p.size, p.size);
      }
      ctx!.globalAlpha = 1;
    }

    function renderFlow(s: StageRuntime, lp: number) {
      const disperse = smoother(clamp01((lp - 0.55) / 0.4));
      if (disperse >= 0.999) return;
      const formRaw = clamp01(lp / 0.46);
      for (let i = 0; i < s.P.length; i++) {
        const p = s.P[i] as FlowParticle;
        const local = smoother(clamp01((formRaw - p.formDelay) / (1 - p.formDelay)));
        const fx = p.ox + (p.bx - p.ox) * local;
        const fy = p.oy + (p.by - p.oy) * local;
        const rx = disperse > 0 ? fx + (p.dispX - fx) * disperse : fx;
        const ry = disperse > 0 ? fy + (p.dispY - fy) * disperse : fy;
        ctx!.globalAlpha = Math.min(1, local * 1.6) * (1 - disperse);
        ctx!.fillStyle = p.lime ? "#ccff00" : "#fff";
        ctx!.fillRect(rx, ry, p.size, p.size);
      }
      ctx!.globalAlpha = 1;
    }

    function frame(now: number) {
      const elapsed = (now - t0) / 1000;
      const s = stages[activeIdx];
      const lp = s ? clamp01((window.scrollY - s.top) / s.range) : 0;
      const resting = activeIdx === 0 && lp < 0.02;
      const fade = resting ? TRAIL : 0.85;
      ctx!.fillStyle = `rgba(0,0,0,${fade})`;
      ctx!.fillRect(0, 0, W, H);
      if (s) {
        if (s.kind === "hero") renderHero(s, lp, elapsed);
        else renderFlow(s, lp);
      }
      rafId = requestAnimationFrame(frame);
    }

    function moveCursor(cx: number, cy: number) {
      mouse.x = cx;
      mouse.y = cy;
      mouse.active = true;
      stirEl!.style.left = cx + "px";
      stirEl!.style.top = cy + "px";
      stirEl!.classList.add("on");
    }
    const onPointerMove = (e: PointerEvent) => moveCursor(e.clientX, e.clientY);
    const onPointerLeave = () => {
      mouse.active = false;
      stirEl!.classList.remove("on");
    };
    const onResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
        buildStages();
        onScroll();
      }, 160);
    };

    // Skip stir physics entirely on touch devices.
    if (!coarsePointer) {
      addEventListener("pointermove", onPointerMove);
      addEventListener("pointerleave", onPointerLeave);
    }
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onResize);

    // Pause the RAF loop when the tab is hidden (battery + CPU saver).
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
      } else {
        // Re-anchor t0 so animation timing doesn't jump after returning.
        t0 = performance.now() - 0;
        rafId = requestAnimationFrame(frame);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    function boot() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      buildStages();
      onScroll();
      t0 = performance.now();
      rafId = requestAnimationFrame(frame);
    }
    if (document.fonts && document.fonts.ready) {
      Promise.race([
        document.fonts.load('800 100px "Plus Jakarta Sans"').then(() => document.fonts.ready),
        new Promise((r) => setTimeout(r, 1000)),
      ]).then(boot, boot);
    } else {
      boot();
    }

    return () => {
      cancelAnimationFrame(rafId);
      if (resizeTimer) clearTimeout(resizeTimer);
      if (!coarsePointer) {
        removeEventListener("pointermove", onPointerMove);
        removeEventListener("pointerleave", onPointerLeave);
      }
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <>
      <canvas
        id="particle-canvas"
        aria-hidden="true"
        className="pointer-events-auto fixed inset-0 z-[2] block"
      />
      <div
        id="particle-stir"
        aria-hidden="true"
        className="pointer-events-none fixed z-[5] h-[30px] w-[30px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--color-w30)] opacity-0 transition-opacity duration-300"
      />
      <div
        id="particle-scrollcue"
        aria-hidden="true"
        className="pointer-events-none fixed bottom-[38px] left-1/2 z-[4] -translate-x-1/2 text-center"
      >
        <small className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-w30)]">
          Scroll
        </small>
        <svg viewBox="0 0 16 14" fill="none" className="mt-3 inline-block h-[14px] w-[16px] animate-[bob_2s_ease_infinite]">
          <path d="M1 1l7 6 7-6M1 7l7 6 7-6" stroke="#fff" strokeOpacity=".5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <style jsx global>{`
        #particle-stir.on { opacity: 1; }
        @keyframes bob {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(5px); opacity: 0.85; }
        }
      `}</style>
    </>
  );
}
