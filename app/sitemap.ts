import type { MetadataRoute } from "next";
import { sanityClient } from "@/lib/sanity/client";
import { groq } from "next-sanity";
import { siteConfig } from "@/lib/seo/metadata";

const projectSlugsQuery = groq`
  *[_type == "project"] {
    "slug": slug.current,
    _updatedAt
  }
`;

type ProjectSlug = {
  slug: string;
  _updatedAt: string;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // Dynamic project pages
  const projects = await sanityClient.fetch<ProjectSlug[]>(projectSlugsQuery);

  const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(project._updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...projectPages];
}
