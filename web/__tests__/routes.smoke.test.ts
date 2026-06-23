import { test, expect } from "@playwright/test";

const ROUTES: { path: string; needle: RegExp }[] = [
  { path: "/", needle: /ask AI who to call/i },
  { path: "/check/", needle: /See what AI says about your business/i },
  { path: "/done-for-you/", needle: /The check finds the gaps/i },
  { path: "/how-it-works/", needle: /how AI picks/i },
  { path: "/articles/", needle: /recommended and booked by AI/i },
  { path: "/articles/your-next-customer-wont-scroll-google/", needle: /scroll Google/i },
  { path: "/about/", needle: /who gets recommended and who gets skipped/i },
  { path: "/contact/", needle: /just have a chat/i },
  { path: "/legal/privacy/", needle: /Privacy/i },
  { path: "/legal/terms/", needle: /Terms/i },
];

for (const { path, needle } of ROUTES) {
  test(`route ${path} renders and contains expected copy`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response?.status()).toBeLessThan(400);
    await expect(page.getByText(needle).first()).toBeVisible();
  });
}

test("home page has no console errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  expect(errors).toEqual([]);
});

test("404 renders for unknown route", async ({ page }) => {
  const response = await page.goto("/totally-nonexistent-route-xyz");
  expect(response?.status()).toBe(404);
});
