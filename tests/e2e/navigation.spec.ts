import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("homepage loads successfully", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Taiyo/);
  });

  test("projects page loads successfully", async ({ page }) => {
    await page.goto("/projects");
    await expect(page).toHaveTitle(/Projects/);
    await expect(page.getByRole("heading", { name: "All Projects" })).toBeVisible();
  });

  test("can navigate from home to projects", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Projects" }).first().click();
    await expect(page).toHaveURL(/\/projects/);
  });

  test("can navigate back to home from projects", async ({ page }) => {
    await page.goto("/projects");
    await page.getByRole("link", { name: "Back to Home" }).click();
    await expect(page).toHaveURL("/");
  });

  test("navbar links are visible on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto("/");

    await expect(page.getByRole("link", { name: "Home" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Projects" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Background" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Skills" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Contact" })).toBeVisible();
  });
});
