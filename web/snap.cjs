const { chromium } = require('@playwright/test');
(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.addInitScript(() => {
    // Force render at first stage (top)
    window.scrollTo(0, 0);
  });
  // Build a local-only test page that mounts the canvas with Orbitron preloaded
  await page.goto('https://www.operateai.com.au/', { waitUntil: 'networkidle' });
  // Scroll partway through stage 1 so the morph fires and we see "Ai AGENTS & AUTOMATiON"
  await page.evaluate(() => window.scrollTo(0, window.innerHeight * 1.6));
  await page.waitForTimeout(2500);
  await page.screenshot({ path: 'snap-morph.png' });
  // Then scroll to stage 3 (hosting) which is "Ai AGENT HOSTiNG"
  await page.evaluate(() => {
    const el = document.getElementById('stage-hosting');
    if (el) window.scrollTo(0, el.offsetTop + window.innerHeight * 1.0);
  });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'snap-hosting.png' });
  await browser.close();
})();
