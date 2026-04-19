import { expect, test } from "@playwright/test";

test("homepage exposes a working skip link", async ({ page }) => {
  await page.goto("/");

  await page.keyboard.press("Tab");

  const skipLink = page.getByRole("link", { name: /skip to main content/i });
  await expect(skipLink).toBeVisible();

  await skipLink.press("Enter");

  await expect(page.locator("main")).toBeFocused();
});

test("search form is labeled and exposes helper guidance", async ({ page }) => {
  await page.goto("/search");

  await expect(page.getByRole("search", { name: /search public real journey content/i })).toBeVisible();
  await expect(page.getByText(/private vault material is excluded/i)).toBeVisible();
});

test("reader mode buttons expose pressed state", async ({ page }) => {
  await page.goto("/topic/http-request-lifecycle");

  const docsButton = page.getByRole("button", { name: /docs view/i });
  const ebookButton = page.getByRole("button", { name: /ebook view/i });

  await expect(docsButton).toHaveAttribute("aria-pressed", "true");
  await expect(ebookButton).toHaveAttribute("aria-pressed", "false");

  await ebookButton.click();

  await expect(ebookButton).toHaveAttribute("aria-pressed", "true");
});

test("accessibility page is reachable from the footer", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("link", { name: /accessibility/i }).click();

  await expect(page).toHaveURL(/\/accessibility$/);
  await expect(page.getByRole("heading", { name: /Real Journey aims to stay readable/i })).toBeVisible();
});
