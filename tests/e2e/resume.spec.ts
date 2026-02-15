import { test, expect } from "@playwright/test";

test.describe("Resume", () => {
  test("resume API endpoint responds", async ({ request }) => {
    const response = await request.get("/api/resume");

    // Should either return PDF or 404 if no resume uploaded
    expect([200, 404]).toContain(response.status());

    if (response.status() === 200) {
      expect(response.headers()["content-type"]).toBe("application/pdf");
    }
  });

  test("resume link or button exists in header", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(500);

    // Look for resume link or button (could be either)
    const resumeLink = page.locator('a[href*="resume"], a:has-text("Resume"), button:has-text("Resume")');

    // Resume link/button should exist
    const count = await resumeLink.count();
    expect(count).toBeGreaterThan(0);
  });
});
