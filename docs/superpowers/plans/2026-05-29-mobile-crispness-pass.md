# Mobile Crispness Pass Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the mobile homepage render as sharp as desktop by fixing three measured root causes — under-resolved particle titles, soft/thumbnail stage images, and the downstream "general feel."

**Architecture:** All rendering changes are touch-only, gated by the existing `coarsePointer` flag in `particle-canvas.tsx`, so desktop is provably unchanged. Image fixes combine a Next 16 `images.qualities` allowlist (required for non-default `quality` to take effect) with a higher `quality` + larger mobile display size on the `StageBodyMedia` component. Tests extend the existing `__tests__/particle-scroll.spec.ts` metrics harness.

**Tech Stack:** Next.js 16, React 19, Tailwind v4, `next/image`, Playwright (testDir `./__tests__`, port 3100), pnpm.

**Working directory:** All paths are relative to `web/`. Run all commands from `web/`.

---

## File Structure

- `web/next.config.ts` — add `images.qualities` allowlist (Next 16 requirement).
- `web/app/page.tsx` — `StageBodyMedia` component: `quality` prop + larger mobile size + matching `sizes`.
- `web/components/home/particle-canvas.tsx` — DPR ceiling, particle size, size floor, sampling density (all touch-gated).
- `web/__tests__/stage-images.spec.ts` — NEW: asserts images request `q=90` at the new mobile size.
- `web/__tests__/particle-scroll.spec.ts` — add a dpr-4 backing-pixel test; existing tests act as choreography regression guards.

---

## Task 1: Image sharpness — quality allowlist + higher-quality, larger mobile images

**Files:**
- Test: `web/__tests__/stage-images.spec.ts` (create)
- Modify: `web/next.config.ts:15-22`
- Modify: `web/app/page.tsx:504-512`

- [ ] **Step 1: Write the failing test**

Create `web/__tests__/stage-images.spec.ts`:

```ts
import { expect, test } from "@playwright/test";

// In Next 16, images.qualities defaults to [75]; a quality={90} prop is
// silently coerced to 75 unless 90 is allow-listed in next.config. next/image
// encodes the resolved quality into every srcset candidate as `&q=<n>`, so we
// assert the optimizer is actually being asked for q=90.
test("stage body image requests quality 90 at the larger mobile size", async ({ page }) => {
  await page.goto("/");
  const img = page.locator("#body-top img").first();
  await expect(img).toHaveAttribute("srcset", /[?&]q=90/);
  await expect(img).toHaveAttribute("sizes", /(^|\D)240px/);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `pnpm exec playwright test __tests__/stage-images.spec.ts --reporter=line`
Expected: FAIL — current `srcset` contains `q=75` (default) and `sizes` starts with `180px`.

- [ ] **Step 3: Add the `images.qualities` allowlist to `next.config.ts`**

In `web/next.config.ts`, add an `images` block to `nextConfig` (between `trailingSlash` and `turbopack`):

```ts
const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  trailingSlash: true,
  images: {
    // Next 16 defaults images.qualities to [75]. Allow 90 so the detailed
    // UI-screenshot PNGs in the homepage stages render crisp instead of soft.
    qualities: [75, 90],
  },
  turbopack: {
    root: __dirname,
  },
};
```

- [ ] **Step 4: Raise quality and mobile display size in `StageBodyMedia`**

In `web/app/page.tsx`, replace the image wrapper + `<Image>` (lines 504–512) with:

```tsx
      <div className="relative mx-auto w-full max-w-[240px] overflow-hidden rounded-[8px] border border-[var(--color-w10)] bg-white/[0.04] sm:max-w-[220px] lg:max-w-none">
        <Image
          src={image}
          alt={alt}
          width={width}
          height={height}
          quality={90}
          sizes="(max-width: 640px) 240px, (max-width: 1024px) 220px, 340px"
          className="h-auto w-full object-cover"
        />
```

(The closing `</div>` and the rest of the component are unchanged.)

- [ ] **Step 5: Run the test to verify it passes**

Run: `pnpm exec playwright test __tests__/stage-images.spec.ts --reporter=line`
Expected: PASS. (The Playwright `webServer` auto-starts `pnpm dev` on :3100; the config change is picked up on the fresh dev server. If a stale dev server is already running on :3100, stop it first so the new `next.config.ts` is loaded.)

- [ ] **Step 6: Commit**

```bash
git add web/next.config.ts web/app/page.tsx web/__tests__/stage-images.spec.ts
git commit -m "Sharpen mobile stage images (q90 + larger size, Next16 qualities allowlist)"
```

---

## Task 2: High-DPR mobile canvas — raise the touch DPR ceiling to device max (capped 4)

**Files:**
- Test: `web/__tests__/particle-scroll.spec.ts` (add one test)
- Modify: `web/components/home/particle-canvas.tsx:88`

- [ ] **Step 1: Write the failing test**

Append this test to `web/__tests__/particle-scroll.spec.ts`:

```ts
test("particle canvas uses full device DPR up to 4 on high-density mobile", async ({ browser }) => {
  const context = await browser.newContext({
    hasTouch: true,
    isMobile: true,
    deviceScaleFactor: 4,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.locator("#particle-canvas")).toBeVisible();

  // Cap was 3, which downscaled (blurred) the backing store on dpr 3.5-4
  // phones. With the cap raised to 4 the backing store matches the device.
  await expect
    .poll(async () =>
      page.evaluate(() => {
        const canvas = document.getElementById("particle-canvas") as HTMLCanvasElement | null;
        if (!canvas) throw new Error("particle canvas missing");
        return canvas.width;
      }),
    )
    .toBe(390 * 4);

  await context.close();
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `pnpm exec playwright test __tests__/particle-scroll.spec.ts -g "full device DPR up to 4" --reporter=line`
Expected: FAIL — `canvas.width` is `390 * 3 = 1170` because the cap is currently `3`.

- [ ] **Step 3: Raise the coarse-pointer DPR ceiling**

In `web/components/home/particle-canvas.tsx`, in `sizeCanvas()` (line 88), change:

```ts
      dpr = Math.min(deviceDpr, coarsePointer ? 3 : 2);
```

to:

```ts
      dpr = Math.min(deviceDpr, coarsePointer ? 4 : 2);
```

- [ ] **Step 4: Run both the new and the existing DPR test to verify pass + no regression**

Run: `pnpm exec playwright test __tests__/particle-scroll.spec.ts -g "DPR" --reporter=line`
Expected: PASS for both `full device DPR up to 4` (now `1560`) and the existing `uses high-DPR backing pixels` (still `1170` at dpr 3 — unaffected because `min(3, 4) === 3`).

- [ ] **Step 5: Commit**

```bash
git add web/components/home/particle-canvas.tsx web/__tests__/particle-scroll.spec.ts
git commit -m "Raise mobile canvas DPR ceiling to device max (capped 4)"
```

---

## Task 3: Crisper particles — solid pixel-snapped dots + denser mobile sampling

This task tunes rendering for visual crispness. Crispness itself is verified
visually (screenshots); the existing `particle-scroll.spec.ts` choreography
tests are the regression guard (titles must still form, center, and clear on
schedule). All three edits are gated on `coarsePointer` so desktop is untouched.

**Files:**
- Modify: `web/components/home/particle-canvas.tsx` (add `SAMPLE_STEP`; edit `drawParticle`, `makeFlowParticle`, and the three `bsStep` lines)

- [ ] **Step 1: Capture a BEFORE screenshot for visual comparison**

Run (from `web/`, dev server auto-starts via Playwright; this is a throwaway one-liner):

```bash
pnpm exec playwright screenshot --device="iPhone 13" --wait-for-timeout=1200 "http://localhost:3100/" before-mobile.png
```

If the dev server is not running, start it first: `pnpm dev --port 3100` in another shell, then run the screenshot. Keep `before-mobile.png` for side-by-side comparison (do NOT commit it; add to a scratch dir or delete after review).

- [ ] **Step 2: Add a touch-aware sampling step constant**

In `web/components/home/particle-canvas.tsx`, just after the `coarsePointer` declaration (line 23) and its `if/else` block (ends line 35), add:

```ts
    // Mobile title glyphs are far smaller than desktop (~W/9 vs up to 92px),
    // so the fixed 1px sample grid yields too few dots per letter and the
    // title reads as a fuzzy dot-cloud. Sample denser on touch so small
    // glyphs resolve as crisp type. Desktop keeps the 1px grid (STEP).
    const SAMPLE_STEP = coarsePointer ? 0.8 : 1;
```

- [ ] **Step 3: Use `SAMPLE_STEP` in all three sampler functions**

In the same file there are three identical lines (in `sampleText`, `sampleIcon`, and `sampleSegment`):

```ts
      const bsStep = Math.max(1, Math.round(STEP * dpr));
```

Replace ALL three occurrences with:

```ts
      const bsStep = Math.max(1, Math.round(SAMPLE_STEP * dpr));
```

(Use a replace-all; the surrounding loops are unchanged. `STEP` stays defined and is no longer referenced after this — that is fine, but if your linter flags the now-unused `const STEP = 1;` at line 71, delete that line.)

- [ ] **Step 4: Make touch particles slightly larger so they read as solid blocks**

In `makeFlowParticle()`, change the `size` field (line 355):

```ts
        size: Math.random() * 0.7 + 0.6,
```

to:

```ts
        // Touch: 0.9-1.5 CSS px so dots are solid blocks, not faint specks on
        // retina. Desktop: unchanged 0.6-1.3.
        size: coarsePointer ? Math.random() * 0.6 + 0.9 : Math.random() * 0.7 + 0.6,
```

- [ ] **Step 5: Raise the per-particle size floor on touch**

In `drawParticle()` (line 131), change:

```ts
      ctx!.fillRect(snap(x), snap(y), Math.max(1 / dpr, snap(p.size)), Math.max(1 / dpr, snap(p.size)));
```

to:

```ts
      // Touch floor of 1 CSS px kills sub-pixel (1/dpr ~= 0.33px) faint specks
      // that read as haze; desktop keeps the finer 1/dpr floor.
      const minSize = coarsePointer ? 1 : 1 / dpr;
      ctx!.fillRect(snap(x), snap(y), Math.max(minSize, snap(p.size)), Math.max(minSize, snap(p.size)));
```

- [ ] **Step 6: Run the full particle spec to confirm no choreography regression**

Run: `pnpm exec playwright test __tests__/particle-scroll.spec.ts --reporter=line`
Expected: PASS for all existing tests (form-in, center, clear-before-body, icon-below-title, body-fit, scroll-leeway, both DPR tests). The metric floors (`litPixels > 4`, `limePixels > 0`, `centerY` bands, `bodyOpacity` gates) all still hold — denser/larger dots only increase lit coverage, they do not move the choreography.

- [ ] **Step 7: Capture an AFTER screenshot and compare**

```bash
pnpm exec playwright screenshot --device="iPhone 13" --wait-for-timeout=1200 "http://localhost:3100/" after-mobile.png
```

Open `before-mobile.png` and `after-mobile.png` side by side. Confirm the particle title reads as crisp, solid type (not faint/sparse). If dots look too heavy or blob together, reduce the touch `size` lower bound from `0.9` toward `0.8` and/or raise `SAMPLE_STEP` from `0.8` toward `0.9`, then re-run Step 6. Delete both PNGs when satisfied.

- [ ] **Step 8: Commit**

```bash
git add web/components/home/particle-canvas.tsx
git commit -m "Sharpen mobile particles — solid pixel-snapped dots, denser sampling"
```

---

## Task 4: Full verification gate

**Files:** none (verification only)

- [ ] **Step 1: Type-check**

Run: `pnpm exec tsc --noEmit`
Expected: no errors. (If `const STEP = 1;` was left unused and `noUnusedLocals` is on, tsc will flag it — delete the line and re-run.)

- [ ] **Step 2: Lint**

Run: `pnpm lint`
Expected: no errors.

- [ ] **Step 3: Invoke the project's Next.js 16 reviewer**

Per `web/CLAUDE.md`, invoke the `nextjs16-reviewer` agent on the `web/` edits (`next.config.ts`, `app/page.tsx`, `components/home/particle-canvas.tsx`) to catch any version-drift issues (e.g., correct `images.qualities` shape, `next/image` prop usage). Address any P0/P1 findings before proceeding.

- [ ] **Step 4: Run the pre-deploy route smoke check**

Invoke the `/route-smoke-check` skill (Playwright + tsc + route coverage diff). This is the project's mandated pre-deploy gate for `web/` changes.
Expected: all routes pass, full Playwright suite green.

- [ ] **Step 5: Final confirmation**

Confirm all three root causes are addressed and verified:
- Particle titles: dpr-4 test passes + AFTER screenshot shows crisp type.
- Stage images: `stage-images.spec.ts` passes (`q=90`, `240px`).
- No desktop regression: desktop choreography test + `tsc`/`lint`/route-smoke all green.

---

## Self-Review Notes

- **Spec coverage:** Particle DPR (Task 2), particle size floor + size range + density (Task 3), image quality allowlist + quality + size + sizes (Task 1), Playwright + route-smoke + nextjs16-reviewer verification (Tasks 1–4). All spec sections mapped.
- **Touch-gating:** Every `particle-canvas.tsx` edit references `coarsePointer`, satisfying the "desktop unchanged" constraint. The existing desktop choreography test (`desktop particle title clears...`) is the guard.
- **Next 16 trap:** `images.qualities` allowlist (Task 1 Step 3) is what makes `quality={90}` actually apply — the spec's explicit prerequisite.
- **Naming consistency:** `SAMPLE_STEP` introduced in Task 3 Step 2 is used in Step 3; `coarsePointer`, `drawParticle`, `makeFlowParticle`, `sizeCanvas` match the existing source symbols.
