import { chromium } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const dir = path.resolve("design/mockups");
const outDir = path.resolve("web/public/work");
fs.mkdirSync(outDir, { recursive: true });

const files = fs.readdirSync(dir).filter((f) => f.endsWith(".html"));
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 2 });
for (const f of files) {
  const key = f.replace(/\.html$/, "");
  await page.goto("file://" + path.join(dir, f), { waitUntil: "networkidle" });
  await page.screenshot({ path: path.join(outDir, `site-${key}.png`) });
  console.log("rendered", key);
}
await browser.close();
