import { test, expect } from "@playwright/test";

test.describe("SEO", () => {
  test("homepage has correct meta tags", async ({ page }) => {
    await page.goto("/");

    // Check title contains site name
    await expect(page).toHaveTitle(/Taiyo/);

    // Check meta description exists
    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveAttribute("content", /.+/);

    // Check Open Graph tags
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute("content", /.+/);

    const ogDescription = page.locator('meta[property="og:description"]');
    await expect(ogDescription).toHaveAttribute("content", /.+/);

    const ogType = page.locator('meta[property="og:type"]');
    await expect(ogType).toHaveAttribute("content", "website");
  });

  test("sitemap.xml is accessible", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.status()).toBe(200);

    const body = await response.text();
    expect(body).toContain("<?xml");
    expect(body).toContain("<urlset");
  });

  test("robots.txt is accessible", async ({ request }) => {
    const response = await request.get("/robots.txt");
    expect(response.status()).toBe(200);

    const body = await response.text();
    expect(body).toContain("User-Agent");
    expect(body).toContain("Sitemap");
  });

  test("projects page has correct meta tags", async ({ page }) => {
    await page.goto("/projects");

    await expect(page).toHaveTitle(/Projects/);

    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute("href", /\/projects/);
  });
});
