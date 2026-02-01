import { defineType, defineField } from "sanity";

export const project = defineType({
  name: "project",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({ name: "slug", type: "slug", options: { source: "title" } }),
    defineField({ name: "description", type: "text" })
  ]
});
