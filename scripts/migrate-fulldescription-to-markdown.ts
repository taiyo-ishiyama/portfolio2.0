/**
 * Migration Script: Convert fullDescription from Portable Text to Markdown
 *
 * This script migrates existing project documents from the old Portable Text
 * block array format to plain Markdown strings.
 *
 * Prerequisites:
 * - Install dependencies: pnpm add @sanity/client @portabletext/to-html turndown
 * - Set SANITY_TOKEN environment variable with write access
 *
 * Usage:
 * 1. Test on a subset first: npx tsx sanity/migrations/migrate-fulldescription-to-markdown.ts --dry-run
 * 2. Run migration: npx tsx sanity/migrations/migrate-fulldescription-to-markdown.ts
 *
 * Rollback:
 * The script stores the original content in `_fullDescriptionBackup` field.
 * To rollback, restore from this backup field.
 */

import { createClient } from "@sanity/client";

// Configuration
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_TOKEN; // Needs write access

if (!projectId) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
  process.exit(1);
}

if (!token) {
  console.error("Missing SANITY_TOKEN - needs write access");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
});

const isDryRun = process.argv.includes("--dry-run");

// Simple block-to-markdown converter for basic Portable Text
function blocksToMarkdown(blocks: unknown[]): string {
  if (!Array.isArray(blocks)) return "";

  return blocks
    .map((block: Record<string, unknown>) => {
      if (block._type !== "block") return "";

      const style = block.style as string || "normal";
      const children = block.children as Array<{ text: string; marks?: string[] }> || [];

      let text = children
        .map((child) => {
          let t = child.text || "";
          if (child.marks?.includes("strong")) t = `**${t}**`;
          if (child.marks?.includes("em")) t = `*${t}*`;
          if (child.marks?.includes("code")) t = `\`${t}\``;
          return t;
        })
        .join("");

      // Apply block styles
      switch (style) {
        case "h1":
          return `# ${text}`;
        case "h2":
          return `## ${text}`;
        case "h3":
          return `### ${text}`;
        case "h4":
          return `#### ${text}`;
        case "blockquote":
          return `> ${text}`;
        default:
          return text;
      }
    })
    .filter(Boolean)
    .join("\n\n");
}

async function migrate() {
  console.log(`Starting migration (${isDryRun ? "DRY RUN" : "LIVE"})...`);
  console.log(`Project: ${projectId}, Dataset: ${dataset}`);

  // Fetch all projects with old block-based fullDescription
  const query = `*[_type == "project" && defined(fullDescription) && fullDescription[0]._type == "block"] {
    _id,
    _rev,
    title,
    fullDescription
  }`;

  const projects = await client.fetch(query);
  console.log(`Found ${projects.length} projects to migrate`);

  if (projects.length === 0) {
    console.log("No projects need migration");
    return;
  }

  for (const project of projects) {
    console.log(`\nProcessing: ${project.title} (${project._id})`);

    const markdown = blocksToMarkdown(project.fullDescription);
    console.log(`Converted to ${markdown.length} characters of Markdown`);

    if (isDryRun) {
      console.log("Preview (first 200 chars):", markdown.slice(0, 200));
      continue;
    }

    // Patch the document
    await client
      .patch(project._id)
      .setIfMissing({ _fullDescriptionBackup: project.fullDescription })
      .set({ fullDescription: markdown })
      .commit();

    console.log(`✓ Migrated: ${project.title}`);
  }

  console.log("\nMigration complete!");
  if (isDryRun) {
    console.log("This was a dry run. Run without --dry-run to apply changes.");
  }
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
