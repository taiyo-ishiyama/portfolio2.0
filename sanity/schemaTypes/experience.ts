import { defineType, defineField } from "sanity";

export const experience = defineType({
  name: "experience",
  title: "Work Experience",
  type: "document",
  fields: [
    defineField({
      name: "company",
      title: "Company",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Company Logo",
      type: "image",
      options: {
        hotspot: true,
      },
      description: "Square logo recommended (e.g., 100x100)",
    }),
    defineField({
      name: "role",
      title: "Role / Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "startDate",
      title: "Start Date",
      type: "date",
      options: { dateFormat: "MMM YYYY" },
      validation: (rule) => rule.required().error("Start date is required"),
    }),
    defineField({
      name: "endDate",
      title: "End Date",
      type: "date",
      options: { dateFormat: "MMM YYYY" },
      description: "Leave empty if current position",
      validation: (rule) =>
        rule.custom((endDate, context) => {
          const { isCurrent, startDate } = context.document as {
            isCurrent?: boolean;
            startDate?: string;
          };

          if (isCurrent && endDate) {
            return "End date must be empty for current positions";
          }

          if (!isCurrent && !endDate) {
            return "End date is required for past positions";
          }

          if (endDate && startDate && endDate < startDate) {
            return "End date must be on or after start date";
          }

          return true;
        }),
    }),
    defineField({
      name: "isCurrent",
      title: "Current Position",
      type: "boolean",
      initialValue: false,
      description: "If checked, end date will be ignored",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: "e.g. San Francisco, CA or Remote",
    }),
    defineField({
      name: "bullets",
      title: "Description (Bullet Points)",
      type: "array",
      of: [{ type: "string" }],
      description: "Key responsibilities and achievements as bullet points",
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
      title: "company",
      subtitle: "role",
      isCurrent: "isCurrent",
    },
    prepare({ title, subtitle, isCurrent }) {
      return {
        title: isCurrent ? `${title} (Current)` : title,
        subtitle,
      };
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
