import { chromium } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Renders each design/mockups/*.html to web/public/work/site-<key>.webp.
// WebP is produced via the browser's own canvas encoder, so no extra deps.
const here = path.dirname(fileURLToPath(import.meta.url)); // web/scripts
const repoRoot = path.resolve(here, "..", "..");
const dir = path.join(repoRoot, "design", "mockups");
const outDir = path.join(repoRoot, "web", "public", "work");
fs.mkdirSync(outDir, { recursive: true });

const files = fs.readdirSync(dir).filter((f) => f.endsWith(".html"));
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 2 });
for (const f of files) {
  const key = f.replace(/\.html$/, "");
  await page.goto("file://" + path.join(dir, f), { waitUntil: "networkidle" });
  const png = await page.screenshot(); // PNG buffer
  const dataUrl = "data:image/png;base64," + png.toString("base64");
  const webpBase64 = await page.evaluate(async (src) => {
    const img = new Image();
    img.src = src;
    await img.decode();
    const c = document.createElement("canvas");
    c.width = img.naturalWidth;
    c.height = img.naturalHeight;
    c.getContext("2d").drawImage(img, 0, 0);
    return c.toDataURL("image/webp", 0.82).split(",")[1];
  }, dataUrl);
  fs.writeFileSync(path.join(outDir, `site-${key}.webp`), Buffer.from(webpBase64, "base64"));
  console.log("rendered", key);
}
await browser.close();
