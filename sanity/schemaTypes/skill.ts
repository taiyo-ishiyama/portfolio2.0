import { defineType, defineField } from "sanity";

export const skill = defineType({
  name: "skill",
  type: "document",
  fields: [
    defineField({ name: "categoryName", type: "string" }),
    defineField({ name: "skills", type: "array", of: [{ type: "string" }] })
  ]
});
