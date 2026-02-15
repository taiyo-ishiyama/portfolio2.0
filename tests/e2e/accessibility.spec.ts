import { test, expect } from "@playwright/test";

test.describe("Accessibility", () => {
  test("homepage has proper heading hierarchy", async ({ page }) => {
    await page.goto("/");

    // Should have at least one h1
    const h1 = page.locator("h1");
    await expect(h1.first()).toBeVisible();
  });

  test("images have alt text", async ({ page }) => {
    await page.goto("/");

    const images = page.locator("img");
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute("alt");
      // All images should have alt attribute (can be empty for decorative)
      expect(alt).not.toBeNull();
    }
  });

  test("interactive elements are keyboard accessible", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(500);

    // Tab multiple times to find an interactive element
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press("Tab");
    }

    // Verify that an interactive element is focused
    const activeElement = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el || el === document.body) return null;
      return {
        tagName: el.tagName.toLowerCase(),
        tabIndex: el.tabIndex,
        role: el.getAttribute("role"),
      };
    });

    // Should focus an interactive element (a, button, input, or element with non-negative tabindex/role)
    const isInteractive =
      activeElement &&
      (["a", "button", "input", "select", "textarea"].includes(activeElement.tagName) ||
        activeElement.tabIndex >= 0 ||
        activeElement.role === "button" ||
        activeElement.role === "link");
    expect(isInteractive).toBeTruthy();
  });

  test("buttons have accessible names", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(500);

    const buttons = page.locator("button");
    const count = await buttons.count();

    for (let i = 0; i < count; i++) {
      const button = buttons.nth(i);
      const isVisible = await button.isVisible();
      if (!isVisible) continue;

      const text = await button.textContent();
      const ariaLabel = await button.getAttribute("aria-label");

      // Button should have some accessible name
      const hasAccessibleName = (text && text.trim().length > 0) || ariaLabel;
      expect(hasAccessibleName).toBeTruthy();
    }
  });
});
