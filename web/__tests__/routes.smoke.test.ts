import { test, expect } from "@playwright/test";

const ROUTES: { path: string; needle: RegExp }[] = [
  // Homepage H1 is visually rendered via canvas + an sr-only fallback for screen readers.
  // The smoke test looks for the hero lead paragraph which IS in the DOM as visible text.
  { path: "/", needle: /Curious about using AI in your business/i },
  { path: "/ai-integration-services/", needle: /AI integration services for small and medium businesses/i },
  { path: "/ai-agents-for-business/", needle: /Custom AI agents for business workflows/i },
  { path: "/ai-agent-hosting/", needle: /Managed AI agent hosting and support/i },
  { path: "/ai-training-for-business/", needle: /Practical AI training for business owners and teams/i },
  { path: "/perth-ai-consultant/", needle: /AI consultant in Perth/i },
  { path: "/book-ai-audit/", needle: /Contact us about an AI Business Audit/i },
  { path: "/industries/", needle: /AI by industry/i },
  { path: "/industries/ai-for-accounting-firms/", needle: /AI for accounting firms/i },
  { path: "/industries/ai-for-real-estate-agencies/", needle: /AI for real estate agencies/i },
  { path: "/industries/ai-for-trades-businesses/", needle: /AI for trades businesses/i },
  { path: "/industries/ai-for-health-clinics/", needle: /AI for health clinics/i },
  { path: "/industries/ai-for-law-firms/", needle: /AI for law firms/i },
  { path: "/industries/ai-for-ecommerce-businesses/", needle: /AI for ecommerce businesses/i },
  { path: "/legal/privacy/", needle: /Privacy/i },
  { path: "/legal/terms/", needle: /Terms/i },
];

for (const { path, needle } of ROUTES) {
  test(`route ${path} renders and contains expected headline`, async ({ page }) => {
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

test("audit contact page renders the enquiry form", async ({ page }) => {
  await page.goto("/book-ai-audit/");
  await expect(page.getByLabel("Name")).toBeVisible();
  await expect(page.getByLabel("Email")).toBeVisible();
  await expect(page.getByLabel("What do you need help with?")).toHaveValue("AI Business Audit");
  await expect(page.getByRole("button", { name: /send enquiry/i })).toBeVisible();
});

test("404 page renders for unknown route", async ({ page }) => {
  const response = await page.goto("/totally-nonexistent-route-xyz");
  expect(response?.status()).toBe(404);
});
