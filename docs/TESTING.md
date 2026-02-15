# Testing

This document describes the testing strategy and how to run tests.

## Overview

| Type | Framework | Directory |
|------|-----------|-----------|
| E2E | Playwright | `tests/e2e/` |
| Unit | Vitest | `tests/unit/` |

## Running Tests

```bash
# Run E2E tests (requires dev server running)
pnpm dev &
pnpm test:e2e

# Run unit tests
pnpm test

# Run unit tests with UI
pnpm test:ui
```

## E2E Tests (Playwright)

### Test Files

| File | Description |
|------|-------------|
| `navigation.spec.ts` | Page loads, navigation between pages, navbar links |
| `theme.spec.ts` | Theme toggle visibility and functionality |
| `resume.spec.ts` | Resume API endpoint and link presence |
| `seo.spec.ts` | Meta tags, sitemap.xml, robots.txt |
| `accessibility.spec.ts` | Headings, alt text, keyboard navigation, button labels |

### Test Coverage

#### Navigation Tests
- Homepage loads with correct title
- Projects page loads with heading
- Navigation from home to projects
- Back navigation from projects to home
- All navbar links visible on desktop

#### Theme Tests
- Theme toggle button is visible
- Clicking toggle changes theme class

#### Resume Tests
- `/api/resume` endpoint responds (200 or 404)
- Resume link exists in hero section

#### SEO Tests
- Homepage has meta description and Open Graph tags
- `/sitemap.xml` returns valid XML
- `/robots.txt` contains required directives
- Projects page has canonical URL

#### Accessibility Tests
- Page has proper `<h1>` heading
- All images have `alt` attributes
- Tab navigation works
- Buttons have accessible names

### Configuration

Playwright config in `playwright.config.ts`:

```typescript
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  use: {
    baseURL: "http://localhost:3000"
  }
});
```

### Writing New Tests

```typescript
import { test, expect } from "@playwright/test";

test.describe("Feature Name", () => {
  test("should do something", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading")).toBeVisible();
  });
});
```

## Unit Tests (Vitest)

### Configuration

Vitest config in `vitest.config.ts`:

```typescript
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts"
  }
});
```

### Writing Unit Tests

```typescript
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });
});
```

## CI/CD Integration

Tests can be run in GitHub Actions:

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      - run: pnpm install
      - run: pnpm build
      - run: pnpm exec playwright install chromium
      - run: pnpm start &
      - run: pnpm test:e2e
```

## Best Practices

1. **Wait for hydration** - Add `waitForTimeout(500)` when testing client components
2. **Use roles** - Prefer `getByRole()` over `getByTestId()`
3. **Test user flows** - Focus on real user interactions
4. **Keep tests independent** - Each test should work in isolation
5. **Use descriptive names** - Test names should explain what's being tested
