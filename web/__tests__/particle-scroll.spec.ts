import { expect, test, type Page } from "@playwright/test";

type StageMetrics = {
  bodyOpacity: number;
  litPixels: number;
  limePixels: number;
  totalBrightness: number;
  centerY: number | null;
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
      let limePixels = 0;
      let weightedY = 0;
      let totalWeight = 0;
      const step = Math.max(16, Math.floor(Math.min(width, height) / 60));

      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const idx = (y * width + x) * 4;
          const brightness = Math.max(data[idx], data[idx + 1], data[idx + 2]);
          if (brightness > 20) {
            litPixels += 1;
            if (data[idx] > 120 && data[idx + 1] > 160 && data[idx + 2] < 80) limePixels += 1;
            weightedY += y * brightness;
            totalWeight += brightness;
          }
        }
      }

      return {
        bodyOpacity: Number.parseFloat(getComputedStyle(body).opacity || "0"),
        litPixels,
        limePixels,
        totalBrightness: totalWeight,
        centerY: totalWeight > 0 ? weightedY / totalWeight / height : null,
      };
    },
    { stageId, bodyId, lp },
  );
}

test("desktop particle title clears before stage body fades in", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(page.locator("#particle-canvas")).toBeVisible();

  const clearing = await scrollStageTo(page, "stage-top", "body-top", 0.64);
  expect(clearing.bodyOpacity).toBeLessThanOrEqual(0.08);

  const visible = await scrollStageTo(page, "stage-top", "body-top", 0.84);
  expect(visible.bodyOpacity).toBeGreaterThan(0.9);
  expect(visible.litPixels).toBeLessThanOrEqual(4);
});

test("mobile particle title clears before stage body fades in", async ({ browser }) => {
  const context = await browser.newContext({
    hasTouch: true,
    isMobile: true,
    deviceScaleFactor: 3,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.locator("#particle-canvas")).toBeVisible();

  const clearing = await scrollStageTo(page, "stage-top", "body-top", 0.64);
  expect(clearing.bodyOpacity).toBeLessThanOrEqual(0.08);

  const visible = await scrollStageTo(page, "stage-top", "body-top", 0.84);
  expect(visible.bodyOpacity).toBeGreaterThan(0.9);
  expect(visible.litPixels).toBeLessThanOrEqual(4);

  await context.close();
});

test("mobile particle title rises from bottom to center then fades upward", async ({ browser }) => {
  const context = await browser.newContext({
    hasTouch: true,
    isMobile: true,
    deviceScaleFactor: 3,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.locator("#particle-canvas")).toBeVisible();
  await page.waitForTimeout(300);

  const entering = await scrollStageTo(page, "stage-top", "body-top", -0.06);
  expect(entering.litPixels).toBeGreaterThan(4);
  expect(entering.centerY).not.toBeNull();
  expect(entering.centerY!).toBeGreaterThan(0.56);

  const centered = await scrollStageTo(page, "stage-top", "body-top", 0.18);
  expect(centered.litPixels).toBeGreaterThan(4);
  expect(centered.limePixels).toBeGreaterThan(0);
  expect(centered.centerY).not.toBeNull();
  expect(centered.centerY!).toBeGreaterThan(0.42);
  expect(centered.centerY!).toBeLessThan(0.58);

  const exiting = await scrollStageTo(page, "stage-top", "body-top", 0.58);
  expect(exiting.bodyOpacity).toBeLessThanOrEqual(0.08);
  expect(exiting.centerY).not.toBeNull();
  expect(exiting.centerY!).toBeLessThan(centered.centerY! - 0.05);
  expect(exiting.centerY!).toBeGreaterThan(0.16);
  expect(exiting.totalBrightness).toBeLessThan(centered.totalBrightness * 0.75);

  await context.close();
});

test("mobile revealed stage bodies fit inside the viewport", async ({ browser }) => {
  const context = await browser.newContext({
    hasTouch: true,
    isMobile: true,
    deviceScaleFactor: 3,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto("/");

  for (const [stageId, bodyId] of [
    ["stage-top", "body-top"],
    ["stage-integration", "body-integration"],
    ["stage-hosting", "body-hosting"],
    ["stage-training", "body-training"],
    ["stage-industries", "body-industries"],
  ] as const) {
    await scrollStageTo(page, stageId, bodyId, 0.94);
    const box = await page.locator(`#${bodyId}`).boundingBox();
    expect(box, bodyId).not.toBeNull();
    expect(box!.y, bodyId).toBeGreaterThanOrEqual(0);
    expect(box!.y + box!.height, bodyId).toBeLessThanOrEqual(844);
  }

  await context.close();
});

test("mobile stage body has scroll leeway after reveal", async ({ browser }) => {
  const context = await browser.newContext({
    hasTouch: true,
    isMobile: true,
    deviceScaleFactor: 3,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto("/");

  const justReadable = await scrollStageTo(page, "stage-training", "body-training", 0.82);
  expect(justReadable.bodyOpacity).toBeGreaterThan(0.9);

  const afterSmallScroll = await scrollStageTo(page, "stage-training", "body-training", 0.94);
  expect(afterSmallScroll.bodyOpacity).toBeGreaterThan(0.9);

  await context.close();
});

test("mobile particle canvas uses high-DPR backing pixels", async ({ browser }) => {
  const context = await browser.newContext({
    hasTouch: true,
    isMobile: true,
    deviceScaleFactor: 3,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.locator("#particle-canvas")).toBeVisible();

  await expect
    .poll(async () =>
      page.evaluate(() => {
        const canvas = document.getElementById("particle-canvas") as HTMLCanvasElement | null;
        if (!canvas) throw new Error("particle canvas missing");
        return canvas.width;
      }),
    )
    .toBe(1170);

  const canvasSize = await page.evaluate(() => {
    const canvas = document.getElementById("particle-canvas") as HTMLCanvasElement | null;
    if (!canvas) throw new Error("particle canvas missing");
    return {
      width: canvas.width,
      height: canvas.height,
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      dpr: window.devicePixelRatio,
    };
  });

  expect(canvasSize.dpr).toBe(3);
  expect(canvasSize.width).toBe(canvasSize.innerWidth * 3);
  expect(canvasSize.height).toBe(canvasSize.innerHeight * 3);

  await context.close();
});
