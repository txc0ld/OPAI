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
    const canvasN = document.getElementById("particle-canvas") as HTMLCanvasElement | null;
    const stirEl = document.getElementById("particle-stir") as HTMLDivElement | null;
    const scrollcue = document.getElementById("particle-scrollcue") as HTMLDivElement | null;
    if (!canvasN || !stirEl || !scrollcue) return;
    const ctx = canvasN.getContext("2d", { alpha: false });
    if (!ctx) return;
    const canvas: HTMLCanvasElement = canvasN;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (!coarsePointer) {
      // Desktop: hide OS cursor; the stir circle replaces it.
      canvas.style.cursor = "none";
    } else {
      // Touch/iOS: let scroll gestures pass straight through the fixed canvas,
      // and promote the canvas to its own GPU compositor layer so iOS Safari
      // keeps painting it during the touch scroll thread instead of freezing
      // the layer until the gesture ends.
      canvas.style.pointerEvents = "none";
      canvas.style.transform = "translateZ(0)";
      canvas.style.willChange = "transform";
    }

    const HERO_Y = 0.42;
    const TITLE_Y = 0.42;

    const STAGE_DEFS = [
      // Brand intro: "OPERATE Ai" pours in and fades down on its own,
      // matching the flow style of the rest. Previously the hero stage
      // morphed straight from OPERATE Ai to "Ai AGENTS & AUTOMATiON"
      // which felt inconsistent with the other stages.
      { stageId: "stage-brand", kind: "intro" as const, titleLines: ["OPERATE", "Ai"], bodyId: "body-brand" },
      { stageId: "stage-top", kind: "flow" as const, titleLines: ["Ai AGENTS &", "AUTOMATiON"], bodyId: "body-top" },
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
    let dpr = 1;

    // Size the canvas backing store to (cssSize * dpr) so high-DPI screens
    // (especially mobile) get crisp particles instead of an upscaled blur.
    // ctx is scaled by dpr so all drawing keeps using CSS-pixel coordinates.
    function sizeCanvas() {
      dpr = Math.min(typeof window !== "undefined" ? (window.devicePixelRatio || 1) : 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

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
      // Stir physics: per-particle displacement from target + velocity.
      cdx: number; cdy: number; vx: number; vy: number; hitAt: number;
      // Tier 0 = main title, time-based form-in on page load.
      // Tier >= 1 = tagline word/dot, fades in on scroll at per-tier threshold.
      tier: number;
    };
    type StageRuntime = {
      def: (typeof STAGE_DEFS)[number];
      el: HTMLElement;
      body: HTMLElement;
      P: (HeroParticle | FlowParticle)[];
      kind: "flow" | "intro";
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
      ctx!.font = `900 ${fontSize}px "Orbitron", "Plus Jakarta Sans", sans-serif`;
      ctx!.textBaseline = "middle";
      const top = cy - ((lines.length - 1) * lh) / 2;
      ctx!.textAlign = "left";
      // Render each line one character at a time, switching fill colour for
      // lowercase "i" letters so they come out lime. This lets the font
      // handle alignment of the dot/stem entirely — no synthetic dot box
      // tuned per-font, no drift when fonts change. Pixel sampling below
      // then picks up the lime ink as lime particles.
      lines.forEach((line, li) => {
        const lineW = ctx!.measureText(line).width;
        let x = W / 2 - lineW / 2;
        const yc = top + li * lh;
        for (const ch of line) {
          const w = ctx!.measureText(ch).width;
          ctx!.fillStyle = ch === "i" ? "#ccff00" : "#fff";
          ctx!.fillText(ch, x, yc);
          if (ch === "i") {
            // Tighten the gap between Orbitron's tittle and the stem so the
            // dot reads clearly as a dot of an i. Erase the natural tittle
            // area in black, then repaint a compact lime square sitting just
            // above the stem top.
            const m = ctx!.measureText("i");
            const ascent = m.actualBoundingBoxAscent || fontSize * 0.78;
            const inkL = m.actualBoundingBoxLeft || 0;
            const inkR = m.actualBoundingBoxRight || w;
            const stemCenter = x + (inkR - inkL) / 2;
            const eraseTop = yc - ascent - 1;
            ctx!.fillStyle = "#000";
            ctx!.fillRect(x - 3, eraseTop, w + 6, fontSize * 0.42);
            const dotSize = fontSize * 0.11;
            const stemTopApprox = yc - fontSize * 0.38;
            const newGap = fontSize * 0.004;
            ctx!.fillStyle = "#ccff00";
            ctx!.fillRect(stemCenter - dotSize / 2, stemTopApprox - newGap - dotSize, dotSize, dotSize);
          }
          x += w;
        }
      });

      // getImageData reads from the backing store (device pixels), not CSS
      // pixels. Iterate in backing coords, but emit particle positions in
      // CSS coords (x/dpr, y/dpr) so all rendering stays in CSS space.
      const Wbs = canvas.width;
      const Hbs = canvas.height;
      const d = ctx!.getImageData(0, 0, Wbs, Hbs).data;
      const pts: { x: number; y: number; lime: boolean }[] = [];
      const bsStep = Math.max(1, Math.round(STEP * dpr));
      for (let y = 0; y < Hbs; y += bsStep) {
        for (let x = 0; x < Wbs; x += bsStep) {
          const idx = (y * Wbs + x) * 4;
          const r = d[idx];
          const g = d[idx + 1];
          const b = d[idx + 2];
          if (r > 128 || g > 128) {
            const lime = g > 140 && b < 120 && r > 120;
            pts.push({ x: x / dpr, y: y / dpr, lime });
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

    // Sample a single text segment centered at (cx, cy). Used for the tagline
    // word/dot pieces so each one is positioned independently from a shared
    // baseline. White ink for letters, lime for "•" and "i" (with the same
    // i-dot tightening sampleText applies).
    function sampleSegment(text: string, fontSize: number, cx: number, cy: number) {
      ctx!.fillStyle = "#000";
      ctx!.fillRect(0, 0, W, H);
      ctx!.font = `900 ${fontSize}px "Orbitron", "Plus Jakarta Sans", sans-serif`;
      ctx!.textBaseline = "middle";
      ctx!.textAlign = "left";
      const totalW = ctx!.measureText(text).width;
      let x = cx - totalW / 2;
      for (const ch of text) {
        const w = ctx!.measureText(ch).width;
        const isAccent = ch === "•" || ch === "i";
        ctx!.fillStyle = isAccent ? "#ccff00" : "#fff";
        ctx!.fillText(ch, x, cy);
        if (ch === "i") {
          const m = ctx!.measureText("i");
          const ascent = m.actualBoundingBoxAscent || fontSize * 0.78;
          const inkL = m.actualBoundingBoxLeft || 0;
          const inkR = m.actualBoundingBoxRight || w;
          const stemCenter = x + (inkR - inkL) / 2;
          ctx!.fillStyle = "#000";
          ctx!.fillRect(x - 3, cy - ascent - 1, w + 6, fontSize * 0.42);
          const dotSize = fontSize * 0.11;
          const stemTopApprox = cy - fontSize * 0.38;
          const newGap = fontSize * 0.004;
          ctx!.fillStyle = "#ccff00";
          ctx!.fillRect(stemCenter - dotSize / 2, stemTopApprox - newGap - dotSize, dotSize, dotSize);
        }
        x += w;
      }
      const Wbs = canvas.width;
      const Hbs = canvas.height;
      const d = ctx!.getImageData(0, 0, Wbs, Hbs).data;
      const pts: { x: number; y: number; lime: boolean }[] = [];
      const bsStep = Math.max(1, Math.round(STEP * dpr));
      for (let yy = 0; yy < Hbs; yy += bsStep) {
        for (let xx = 0; xx < Wbs; xx += bsStep) {
          const idx = (yy * Wbs + xx) * 4;
          const r = d[idx];
          const g = d[idx + 1];
          const b = d[idx + 2];
          if (r > 128 || g > 128) {
            const lime = g > 140 && b < 120 && r > 120;
            pts.push({ x: xx / dpr, y: yy / dpr, lime });
          }
        }
      }
      ctx!.fillStyle = "#000";
      ctx!.fillRect(0, 0, W, H);
      return pts;
    }

    function makeFlowParticle(
      b: { x: number; y: number; lime: boolean },
      tier: number,
      originFrom: "outside" | "below" | "above",
    ): FlowParticle {
      const bx = b.x + jit();
      const by = b.y + jit();
      let ox: number;
      let oy: number;
      if (originFrom === "outside") {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.max(W, H) * (0.7 + Math.random() * 0.7);
        ox = W / 2 + Math.cos(angle) * dist;
        oy = H / 2 + Math.sin(angle) * dist;
      } else if (originFrom === "below") {
        ox = bx + (Math.random() - 0.5) * 30;
        oy = H + Math.random() * H * 0.35 + 30;
      } else {
        ox = bx + (Math.random() - 0.5) * 40;
        oy = -Math.random() * H * 0.5 - 30;
      }
      return {
        bx, by, ox, oy,
        size: Math.random() * 0.7 + 0.6,
        lime: b.lime,
        formDelay: Math.random() * 0.35,
        dispX: bx + (Math.random() - 0.5) * 80,
        dispY: by + H * (0.7 + Math.random() * 0.4),
        cdx: 0, cdy: 0, vx: 0, vy: 0, hitAt: 0,
        tier,
      };
    }

    function buildStages() {
      stages.length = 0;
      const titleSize = Math.min(W / 9, H / 7, 92);
      const taglineSize = Math.max(20, titleSize * 0.32);
      for (const def of STAGE_DEFS) {
        const el = document.getElementById(def.stageId);
        const body = document.getElementById(def.bodyId);
        if (!el || !body) continue;
        let P: FlowParticle[];
        if (def.kind === "intro") {
          // Tier 0: OPERATE / Ai (main title) at TITLE_Y.
          const mainPts = shuffle(sampleText(def.titleLines, titleSize, H * TITLE_Y));
          P = mainPts.map((b) => makeFlowParticle(b, 0, "outside"));
          // Tiers 1..5: AUTOMATE · DELEGATE · ELEVATE positioned below.
          ctx!.font = `900 ${taglineSize}px "Orbitron", "Plus Jakarta Sans", sans-serif`;
          const segs = ["AUTOMATE", "•", "DELEGATE", "•", "ELEVATE"];
          const segW = segs.map((s) => ctx!.measureText(s).width);
          const gap = taglineSize * 0.55;
          const totalW = segW.reduce((a, b) => a + b, 0) + gap * (segs.length - 1);
          const startX = W / 2 - totalW / 2;
          const taglineY = H * 0.66;
          let cursor = startX;
          segs.forEach((seg, i) => {
            const cx = cursor + segW[i] / 2;
            const tier = i + 1;
            const segPts = sampleSegment(seg, taglineSize, cx, taglineY);
            for (const b of segPts) P.push(makeFlowParticle(b, tier, "below"));
            cursor += segW[i] + gap;
          });
        } else {
          const B = shuffle(sampleText(def.titleLines, titleSize, H * TITLE_Y));
          P = B.map((b) => makeFlowParticle(b, 0, "above"));
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

    // iOS Safari does not update window.scrollY during a touch scroll
    // gesture (only after it ends). visualViewport.pageTop DOES update
    // live, so on touch we read from there. Desktop keeps window.scrollY
    // because some desktop browsers return non-numeric pageTop in edge
    // cases (broke desktop in an earlier iteration).
    function getScrollY(): number {
      if (coarsePointer && window.visualViewport) {
        return window.visualViewport.pageTop;
      }
      return window.scrollY;
    }

    function onScroll() {
      const y = getScrollY();
      let act = 0;
      for (let i = 0; i < stages.length; i++) {
        if (y + window.innerHeight * 0.5 >= stages[i].top) act = i;
      }
      activeIdx = act;
      for (const s of stages) {
        const lp = clamp01((y - s.top) / s.range);
        const asm = smoother(clamp01((lp - 0.64) / 0.32));
        s.body.style.opacity = asm.toFixed(3);
        s.body.style.transform = `translateY(${((1 - asm) * 60).toFixed(1)}px)`;
      }
      if (stages[0]) {
        scrollcue!.style.opacity = (1 - clamp01((y / stages[0].range) / 0.1)).toFixed(3);
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
          // Touch: bypass per-frame easing during scroll-driven morph.
          // iOS drops frames during touch scroll; with easing, particles
          // fall behind the morph target and snap visibly. Direct-set
          // gives renderFlow-style 1:1 scroll tracking.
          if (coarsePointer) {
            p.x = hx;
            p.y = hy;
          } else {
            p.x += (hx - p.x) * 0.5;
            p.y += (hy - p.y) * 0.5;
          }
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

    const SPRING = 0.05;
    const DAMP = 0.88;

    // Apply mouse stir physics to a single flow particle in place. Pushes
    // velocity when the mouse is within radius, springs displacement back to
    // (0,0) otherwise. No-op when no mouse interaction has happened or on
    // touch (mouse.active never flips true).
    function stir(p: FlowParticle, baseX: number, baseY: number, weight: number, elapsed: number) {
      if (mouse.active && weight > 0) {
        const cx = baseX + p.cdx;
        const cy = baseY + p.cdy;
        const dxm = cx - mx;
        const dym = cy - my;
        const dist = Math.hypot(dxm, dym);
        if (dist < radius && dist > 0.5) {
          const f = smoothstep(1 - dist / radius);
          const dirX = dxm / dist;
          const dirY = dym / dist;
          const push = f * PUSH;
          const sw = f * SWIRL;
          p.vx += (dirX * push + (-dirY) * push * sw) * weight;
          p.vy += (dirY * push + dirX * push * sw) * weight;
          p.hitAt = elapsed;
        }
      }
      // Spring back to target
      p.vx -= p.cdx * SPRING;
      p.vy -= p.cdy * SPRING;
      p.vx *= DAMP;
      p.vy *= DAMP;
      const sp = Math.hypot(p.vx, p.vy);
      if (sp > VMAX) { p.vx *= VMAX / sp; p.vy *= VMAX / sp; }
      p.cdx += p.vx;
      p.cdy += p.vy;
    }

    // Tier 1..5 scroll-based fade-in thresholds (relative to brand stage's
    // own scroll progress). AUTOMATE, ·, DELEGATE, ·, ELEVATE arrive one
    // after another so the reveal feels word-by-word.
    const TIER_FORM_START = [0, 0.10, 0.18, 0.27, 0.35, 0.43];
    const TIER_FORM_DUR = 0.18;
    // All tiers disperse together once the user scrolls past this threshold.
    const INTRO_DISPERSE_START = 0.7;
    const INTRO_DISPERSE_DUR = 0.3;

    function renderIntro(s: StageRuntime, scrollProgress: number, elapsed: number) {
      // Brand intro: tier 0 (OPERATE Ai) forms in on page load via elapsed
      // time. Tiers 1..5 (AUTOMATE · DELEGATE · ELEVATE) fade in on scroll
      // at staggered thresholds. All tiers disperse together near the end
      // of the brand scroll, just before AI AGENTS begins to form.
      const disperse = smoother(clamp01((scrollProgress - INTRO_DISPERSE_START) / INTRO_DISPERSE_DUR));
      if (disperse >= 0.999) return;
      const formRawTime = clamp01(elapsed / 2.2);
      for (let i = 0; i < s.P.length; i++) {
        const p = s.P[i] as FlowParticle;
        let local: number;
        if (p.tier === 0) {
          local = smoother(clamp01((formRawTime - p.formDelay) / (1 - p.formDelay)));
        } else {
          const start = TIER_FORM_START[p.tier];
          local = smoother(clamp01((scrollProgress - start) / TIER_FORM_DUR));
        }
        if (local <= 0.001 && disperse <= 0.001) continue;
        const fx = p.ox + (p.bx - p.ox) * local;
        const fy = p.oy + (p.by - p.oy) * local;
        const bx = disperse > 0 ? fx + (p.dispX - fx) * disperse : fx;
        const by = disperse > 0 ? fy + (p.dispY - fy) * disperse : fy;
        const stirWeight = (1 - disperse) * local;
        stir(p, bx, by, stirWeight, elapsed);
        ctx!.globalAlpha = Math.min(1, local * 1.6) * (1 - disperse);
        ctx!.fillStyle = p.lime ? "#ccff00" : "#fff";
        ctx!.fillRect(bx + p.cdx, by + p.cdy, p.size, p.size);
      }
      ctx!.globalAlpha = 1;
    }

    function renderFlow(s: StageRuntime, lp: number, elapsed: number) {
      const disperse = smoother(clamp01((lp - 0.55) / 0.4));
      if (disperse >= 0.999) return;
      const formRaw = clamp01(lp / 0.46);
      for (let i = 0; i < s.P.length; i++) {
        const p = s.P[i] as FlowParticle;
        const local = smoother(clamp01((formRaw - p.formDelay) / (1 - p.formDelay)));
        const fx = p.ox + (p.bx - p.ox) * local;
        const fy = p.oy + (p.by - p.oy) * local;
        const bx = disperse > 0 ? fx + (p.dispX - fx) * disperse : fx;
        const by = disperse > 0 ? fy + (p.dispY - fy) * disperse : fy;
        const stirWeight = (1 - disperse) * local;
        stir(p, bx, by, stirWeight, elapsed);
        ctx!.globalAlpha = Math.min(1, local * 1.6) * (1 - disperse);
        ctx!.fillStyle = p.lime ? "#ccff00" : "#fff";
        ctx!.fillRect(bx + p.cdx, by + p.cdy, p.size, p.size);
      }
      ctx!.globalAlpha = 1;
    }

    function frame(now: number) {
      const elapsed = (now - t0) / 1000;
      // Ease the mouse position toward the latest cursor coords so the stir
      // feels smooth rather than snapping per-frame to raw pointer movement.
      if (mouse.active) {
        if (mx < -9000) { mx = mouse.x; my = mouse.y; }
        mx += (mouse.x - mx) * EASE;
        my += (mouse.y - my) * EASE;
      }
      const y = getScrollY();
      const s = stages[activeIdx];
      // visualViewport-aware read so the canvas matches what the user sees
      // mid-touch-scroll on iOS (window.scrollY is stale until the gesture
      // ends, which is the source of the post-scroll flash).
      const lp = s ? clamp01((y - s.top) / s.range) : 0;
      const brand = stages[0];
      // Scale brand intro progress so disperse completes right when the next
      // stage starts pinning — no empty canvas window in between.
      const introTransitionEnd = stages[1] ? stages[1].top : H;
      const introScrollProgress = clamp01(y / Math.max(1, introTransitionEnd));
      const inIntroWindow = brand && brand.kind === "intro" && introScrollProgress < 0.99;
      const resting = inIntroWindow && introScrollProgress < 0.02;
      const fade = resting ? TRAIL : 0.85;
      ctx!.fillStyle = `rgba(0,0,0,${fade})`;
      ctx!.fillRect(0, 0, W, H);
      // Always render the brand intro until scrolled past its viewport — its
      // disperse uses raw scrollY, not stage lp, so it bridges any gap to the
      // next stage without an empty-canvas window in between.
      if (inIntroWindow) {
        renderIntro(brand, introScrollProgress, elapsed);
      }
      // Render the active stage normally, unless it IS the brand (which we
      // just handled above on its own scroll-driven path).
      if (s && s !== brand) {
        renderFlow(s, lp, elapsed);
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
        sizeCanvas();
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
    // Touch-only: also listen on visualViewport so iOS fires our scroll
    // handler at touch-frequency rather than only at gesture end.
    if (coarsePointer && window.visualViewport) {
      window.visualViewport.addEventListener("scroll", onScroll, { passive: true });
    }

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
      sizeCanvas();
      buildStages();
      onScroll();
      t0 = performance.now();
      rafId = requestAnimationFrame(frame);
    }
    if (document.fonts && document.fonts.ready) {
      // Preload Orbitron 900 so the first sampleText() uses it. Fall back
      // (boot anyway) if the load rejects — Plus Jakarta Sans takes over
      // via the font-family stack rather than leaving the canvas un-started.
      Promise.race([
        document.fonts.load('900 100px "Orbitron"').then(() => document.fonts.ready),
        new Promise((r) => setTimeout(r, 1000)),
      ]).then(boot, boot);
    } else {
      boot();
    }

    const visualViewportCleanup = coarsePointer && window.visualViewport ? window.visualViewport : null;
    return () => {
      cancelAnimationFrame(rafId);
      if (resizeTimer) clearTimeout(resizeTimer);
      if (!coarsePointer) {
        removeEventListener("pointermove", onPointerMove);
        removeEventListener("pointerleave", onPointerLeave);
      }
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onResize);
      if (visualViewportCleanup) visualViewportCleanup.removeEventListener("scroll", onScroll);
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
