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

  test("resume link exists in hero section", async ({ page }) => {
    await page.goto("/");

    // Look for resume/CV link in hero
    const resumeLink = page.getByRole("link", { name: /resume|cv/i });

    // Resume link should exist
    const count = await resumeLink.count();
    expect(count).toBeGreaterThan(0);
  });
});
