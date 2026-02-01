import { defineType, defineField } from "sanity";

export const profile = defineType({
  name: "profile",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string" }),
    defineField({ name: "role", type: "string" }),
    defineField({ name: "summary", type: "text" })
  ]
});
