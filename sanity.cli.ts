import { defineCliConfig } from "sanity/cli";
import dotenv from "dotenv";

// Load .env.local for Sanity CLI (Node.js context)
dotenv.config({ path: ".env.local" });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
if (!projectId) {
  throw new Error("Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID");
}

const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  vite: {
    define: {
      __SANITY_PROJECT_ID__: JSON.stringify(projectId),
      __SANITY_DATASET__: JSON.stringify(dataset),
    },
  },
});
