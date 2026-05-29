# Mobile Crispness Pass — Design

**Date:** 2026-05-29
**Status:** Approved (scope: "Crispness pass")
**Surfaces:** `web/` homepage (Next.js 16 / React 19 / Tailwind v4)

## Problem

The mobile homepage reads softer / less crisp than desktop. Investigation found
three independent root causes across the surfaces the user flagged (particle
titles, stage images, general feel):

1. **Particle titles are under-resolved on mobile** (`components/home/particle-canvas.tsx`):
   - DPR is capped at `3` in `sizeCanvas()` (`coarsePointer ? 3 : 2`). Phones
     reporting dpr 3.5–4 get a downscaled backing store → soft.
   - Particle `size` is 0.6–1.3 CSS px with a floor of `1/dpr` (≈0.33 CSS px at
     dpr 3) → faint, anti-aliased specks on retina.
   - Sampling is `STEP = 1` CSS px, but the mobile title font is only ≈`W/9`
     (~43px vs up to 92px desktop). Smaller glyphs sampled at the same grid =
     fewer, sparser dots per letter → fuzzy dot-clouds rather than crisp type.

2. **Stage images served small and at default quality** (`app/page.tsx`
   `StageBodyMedia`): `next/image` is wired correctly but capped at
   `180px`/`220px` wide on phones and uses Next's default quality (75). Detailed
   UI-screenshot PNGs look soft at that size/quality and feel thumbnail-ish.

3. **General feel** is largely a downstream effect of (1) and (2).

## Goal

Make the mobile homepage render as sharp as desktop, fixing the three measured
root causes. All changes are touch-only, guarded by the existing `coarsePointer`
flag, so desktop rendering is unchanged.

## Non-goals (deferred to a later "fidelity overhaul")

- Mobile layout rework, larger title typography, type-scale/spacing redesign.
- Treating mobile as a separately-designed experience.

## Design

### 1. Particle titles — `components/home/particle-canvas.tsx`

- **DPR ceiling → device max (capped 4):** in `sizeCanvas()`, change the coarse
  cap from `3` to `4`: `dpr = Math.min(deviceDpr, coarsePointer ? 4 : 2)`.
  No-op on dpr≤3 phones; removes downscale blur on 3.5–4× devices.
- **Solid, pixel-snapped particles:** raise the size floor in `drawParticle()`
  so no particle renders below ~1 CSS px (removes the 0.33px faint specks);
  keep the existing device-pixel `snap()`. On touch, shift the `size` range in
  `makeFlowParticle()` slightly up (≈0.9–1.5) so glyphs read as crisp blocks.
- **Denser sampling on small glyphs:** on touch, lower the effective `STEP`
  from `1` → ~0.8 CSS px (used by `sampleText` / `sampleSegment` / `sampleIcon`
  via `bsStep`) so the smaller mobile title font gets enough dots per letter to
  read as type. Desktop keeps `STEP = 1`.
- **Perf guard:** these increase per-frame work modestly (~1.5× particles, more
  fill at dpr 4). Verify scroll stays smooth on a mobile viewport. If it
  regresses, reduce the DPR ceiling toward 3.5 before reducing density.

### 2. Stage images — `app/page.tsx` + `next.config.ts`

- **Next 16 prerequisite:** add `images: { qualities: [75, 90] }` to
  `next.config.ts`. In Next 16, `images.qualities` defaults to `[75]` and any
  `quality` prop not in the array is silently coerced to the nearest allowed
  value — so `quality={90}` is a no-op without this.
- **`StageBodyMedia`:** add `quality={90}` to the `<Image>`, lift the mobile
  display cap from `max-w-[180px]` → ~`max-w-[240px]`, and update the `sizes`
  string to match (e.g. `(max-width: 640px) 240px, (max-width: 1024px) 220px, 340px`)
  so `next/image` serves a higher-res candidate. Sharper and less thumbnail-ish.

### 3. Verification

- Playwright before/after screenshots at a phone viewport (390×844 @ dpr 3) for
  the brand stage + at least one flow stage.
- Run `/route-smoke-check` (Playwright + tsc + route coverage diff) before
  declaring done.
- Invoke `nextjs16-reviewer` after the `web/` edits (per project CLAUDE.md).

## Files touched

- `web/components/home/particle-canvas.tsx`
- `web/app/page.tsx`
- `web/next.config.ts`
