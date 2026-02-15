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
    await page.waitForLoadState("networkidle");

    // Verify that tabbable interactive elements exist on the page
    const tabbableCount = await page.evaluate(() => {
      const tabbableSelectors = [
        'a[href]',
        'button:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        '[tabindex]:not([tabindex="-1"])',
      ];
      const elements = document.querySelectorAll(tabbableSelectors.join(', '));
      return elements.length;
    });

    // Page should have multiple tabbable elements for keyboard navigation
    expect(tabbableCount).toBeGreaterThan(0);
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
