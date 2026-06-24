import { test, expect } from "@playwright/test";

const ROUTES: { path: string; needle: RegExp }[] = [
  { path: "/ai-visibility/", needle: /AI decides who gets recommended/i },
  { path: "/ai-visibility/plumbers/", needle: /are you on the shortlist/i },
  { path: "/ai-visibility/plumbers/subiaco/", needle: /recommended by AI/i },
];

for (const { path, needle } of ROUTES) {
  test(`pseo route ${path} renders`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response?.status()).toBeLessThan(400);
    await expect(page.getByText(needle).first()).toBeVisible();
  });
}

test("filled leaf is indexable", async ({ page }) => {
  await page.goto("/ai-visibility/plumbers/subiaco/");
  const robots = page.locator('head meta[name="robots"]');
  // No noindex meta (or content does not contain noindex)
  const count = await robots.count();
  if (count > 0) {
    await expect(robots).not.toHaveAttribute("content", /noindex/);
  }
});
