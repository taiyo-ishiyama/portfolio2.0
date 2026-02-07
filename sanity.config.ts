import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemaTypes";

// Environment variables are injected via Vite define in sanity.cli.ts
declare const __SANITY_PROJECT_ID__: string;
declare const __SANITY_DATASET__: string;

const projectId = typeof __SANITY_PROJECT_ID__ !== "undefined" ? __SANITY_PROJECT_ID__ : "";
const dataset = typeof __SANITY_DATASET__ !== "undefined" ? __SANITY_DATASET__ : "production";

if (!projectId) {
  throw new Error("Missing Sanity project ID. Check your .env.local file.");
}

export default defineConfig({
  name: "portfolio",
  title: "Portfolio",
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: {
    types: schemaTypes
  }
});
