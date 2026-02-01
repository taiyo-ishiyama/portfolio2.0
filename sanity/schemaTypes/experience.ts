import { defineType, defineField } from "sanity";

export const experience = defineType({
  name: "experience",
  type: "document",
  fields: [
    defineField({ name: "company", type: "string" }),
    defineField({ name: "role", type: "string" }),
    defineField({ name: "dates", type: "string" })
  ]
});
