import { test, expect } from "@playwright/test";

test("home hero shows the AI readout with the hook", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Who's a good emergency plumber in Perth?").first()).toBeVisible();
  await expect(page.getByText("is your name here?").first()).toBeVisible();
});

test("home CTAs point at the free check", async ({ page }) => {
  await page.goto("/");
  const cta = page.getByRole("link", { name: /See what AI says about you/i }).first();
  await expect(cta).toBeVisible();
  await expect(cta).toHaveAttribute("href", "/check/");
});

test("check form renders required fields", async ({ page }) => {
  await page.goto("/check/");
  await expect(page.getByLabel("Business name")).toBeVisible();
  await expect(page.getByLabel("Suburb / service area")).toBeVisible();
  await expect(page.getByLabel("Business type")).toBeVisible();
  await expect(page.getByRole("button", { name: /send my free check/i })).toBeVisible();
});

test("check form shows the human confirmation after submit", async ({ page }) => {
  await page.goto("/check/");
  await page.getByLabel("Business name").fill("Test Plumbing");
  await page.getByLabel("Suburb / service area").fill("Midland");
  await page.getByLabel("Business type").selectOption("Plumber");
  await page.getByLabel("Email").fill("test@example.com");
  await page.getByRole("button", { name: /send my free check/i }).click();
  await expect(page.getByText(/check what AI says about/i)).toBeVisible();
  await expect(page.getByText("Test Plumbing")).toBeVisible();
});
