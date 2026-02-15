import { test, expect } from "@playwright/test";

test.describe("Theme Toggle", () => {
  test("theme toggle button is visible", async ({ page }) => {
    await page.goto("/");
    // Wait for client-side hydration
    await page.waitForTimeout(500);
    const themeButton = page.getByRole("button", { name: /switch to (light|dark) mode/i });
    await expect(themeButton).toBeVisible();
  });

  test("can toggle between light and dark mode", async ({ page }) => {
    await page.goto("/");
    // Wait for client-side hydration
    await page.waitForTimeout(500);

    const html = page.locator("html");
    const themeButton = page.getByRole("button", { name: /switch to (light|dark) mode/i });

    // Get initial theme
    const initialClass = await html.getAttribute("class");

    // Click to toggle
    await themeButton.click();

    // Wait for theme change
    await page.waitForTimeout(300);

    // Theme should have changed
    const newClass = await html.getAttribute("class");
    expect(newClass).not.toBe(initialClass);
  });
});
