import { defineType, defineField } from "sanity";

export const profile = defineType({
  name: "profile",
  title: "Profile",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      description: "e.g. Full Stack Software Engineer",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      description: "A brief introduction about yourself",
    }),
    defineField({
      name: "photo",
      title: "Profile Photo",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "resume",
      title: "Resume (PDF)",
      type: "file",
      options: {
        accept: ".pdf",
      },
      description: "Upload your resume PDF",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "photo",
    },
  },
});
