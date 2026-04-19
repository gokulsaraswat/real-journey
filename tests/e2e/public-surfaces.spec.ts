import { expect, test } from "@playwright/test";

test("homepage exposes premium hero and loader slot", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: /Build depth\./i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Explore learning/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Read the blog/i })).toBeVisible();
  await expect(page.getByText(/Loader slot ready/i)).toBeVisible();
});

test("blog index and detail route render seeded writing", async ({ page }) => {
  await page.goto("/blog");

  await expect(
    page.getByRole("heading", { name: /Writing that explains the system behind the product\./i }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", {
      name: /Designing a learning platform that stays clean after 500 topics/i,
    }),
  ).toBeVisible();

  await page.goto("/blog/designing-a-learning-platform-after-500-topics");
  await expect(
    page.getByRole("heading", {
      name: /Designing a learning platform that stays clean after 500 topics/i,
    }),
  ).toBeVisible();
  await expect(page.getByText(/The real scaling problem/i)).toBeVisible();
});

test("search finds public content for HTTP", async ({ page }) => {
  await page.goto("/search?q=http");

  await expect(page.getByRole("heading", { name: /results for/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /HTTP request lifecycle/i })).toBeVisible();
  await expect(page.getByText(/Try next/i)).toBeVisible();
});

test("topic reader supports both docs and ebook modes", async ({ page }) => {
  await page.goto("/topic/http-request-lifecycle");

  await expect(page.getByRole("heading", { name: /HTTP request lifecycle/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /Docs view/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /Ebook view/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Download source/i })).toBeVisible();
});

test("admin routes redirect to login when auth env is not configured", async ({ page }) => {
  await page.goto("/admin");

  await expect(page).toHaveURL(/\/login\?/);
  await expect(page.getByRole("heading", { name: /Login portal for admins now, contributors later/i })).toBeVisible();
  await expect(page.getByText(/Supabase environment values are missing/i)).toBeVisible();
});
