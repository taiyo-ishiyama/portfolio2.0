import { defineType, defineField } from "sanity";

export const education = defineType({
  name: "education",
  title: "Education",
  type: "document",
  fields: [
    defineField({
      name: "school",
      title: "School / Institution",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "logo",
      title: "School Logo",
      type: "image",
      options: {
        hotspot: true,
      },
      description: "Square logo recommended (e.g., 100x100)",
    }),
    defineField({
      name: "degree",
      title: "Degree / Certificate",
      type: "string",
      description: "e.g. B.Sc. in Computer Science",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "startDate",
      title: "Start Date",
      type: "date",
      options: { dateFormat: "MMM YYYY" },
    }),
    defineField({
      name: "endDate",
      title: "End Date",
      type: "date",
      options: { dateFormat: "MMM YYYY" },
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "gpa",
      title: "GPA",
      type: "string",
      description: "e.g. 3.8/4.0 or 3.8",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "Notable achievements, relevant coursework, etc.",
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Display order (lower numbers appear first)",
    }),
  ],
  preview: {
    select: {
      title: "school",
      subtitle: "degree",
    },
  },
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
