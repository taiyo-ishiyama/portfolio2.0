import { defineType, defineField } from "sanity";

export const education = defineType({
  name: "education",
  type: "document",
  fields: [
    defineField({ name: "school", type: "string" }),
    defineField({ name: "degree", type: "string" }),
    defineField({ name: "dates", type: "string" })
  ]
});
