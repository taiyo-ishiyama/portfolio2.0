import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
    include: ["tests/unit/**/*.{test,spec}.{ts,tsx}"],
    exclude: ["tests/e2e/**/*", "node_modules/**/*"]
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./")
    }
  }
});
