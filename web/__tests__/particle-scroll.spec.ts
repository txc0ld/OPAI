import { expect, test, type Page } from "@playwright/test";

type StageMetrics = {
  bodyOpacity: number;
  litPixels: number;
};

async function scrollStageTo(page: Page, stageId: string, bodyId: string, lp: number): Promise<StageMetrics> {
  return page.evaluate(
    async ({ stageId, bodyId, lp }) => {
      const stage = document.getElementById(stageId);
      const body = document.getElementById(bodyId);
      const canvas = document.getElementById("particle-canvas") as HTMLCanvasElement | null;
      if (!stage || !body || !canvas) throw new Error("particle stage DOM missing");

      const range = Math.max(1, stage.offsetHeight - window.innerHeight);
      const targetY = stage.offsetTop + range * lp;
      document.documentElement.style.scrollBehavior = "auto";
      window.scrollTo(0, targetY);
      for (let i = 0; i < 20 && Math.abs(window.scrollY - targetY) > 2; i++) {
        await new Promise((resolve) => requestAnimationFrame(resolve));
      }
      for (let i = 0; i < 12; i++) {
        const opacity = Number.parseFloat(getComputedStyle(body).opacity || "0");
        if ((lp < 0.74 && opacity <= 0.08) || (lp >= 0.74 && opacity > 0.1)) break;
        window.dispatchEvent(new Event("scroll"));
        await new Promise((resolve) => requestAnimationFrame(resolve));
      }
      await new Promise((resolve) => requestAnimationFrame(resolve));

      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("particle canvas context missing");
      const width = canvas.width;
      const height = canvas.height;
      const data = ctx.getImageData(0, 0, width, height).data;
      let litPixels = 0;
      const step = Math.max(16, Math.floor(Math.min(width, height) / 60));

      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const idx = (y * width + x) * 4;
          if (data[idx] > 20 || data[idx + 1] > 20 || data[idx + 2] > 20) litPixels += 1;
        }
      }

      return {
        bodyOpacity: Number.parseFloat(getComputedStyle(body).opacity || "0"),
        litPixels,
      };
    },
    { stageId, bodyId, lp },
  );
}

test("desktop particle title clears before stage body fades in", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(page.locator("#particle-canvas")).toBeVisible();

  const clearing = await scrollStageTo(page, "stage-top", "body-top", 0.7);
  expect(clearing.bodyOpacity).toBeLessThanOrEqual(0.08);

  const visible = await scrollStageTo(page, "stage-top", "body-top", 0.84);
  expect(visible.bodyOpacity).toBeGreaterThan(0.35);
  expect(visible.litPixels).toBeLessThanOrEqual(4);
});

test("mobile particle title clears before stage body fades in", async ({ browser }) => {
  const context = await browser.newContext({
    hasTouch: true,
    isMobile: true,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.locator("#particle-canvas")).toBeVisible();

  const clearing = await scrollStageTo(page, "stage-top", "body-top", 0.7);
  expect(clearing.bodyOpacity).toBeLessThanOrEqual(0.08);

  const visible = await scrollStageTo(page, "stage-top", "body-top", 0.84);
  expect(visible.bodyOpacity).toBeGreaterThan(0.35);
  expect(visible.litPixels).toBeLessThanOrEqual(4);

  await context.close();
});
