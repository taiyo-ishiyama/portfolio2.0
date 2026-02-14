import type { Metadata } from "next";

// Site configuration - update these values for your portfolio
export const siteConfig = {
  name: "Taiyo Ishiyama",
  title: "Taiyo's Portfolio",
  description: "Full-stack software engineer specializing in Next.js, React, TypeScript, and modern web technologies. Building performant and user-friendly applications.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://taiyo.vercel.app",
  locale: "en_AU",
};

// Default metadata for the entire site
export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Taiyo Ishiyama",
    "Software Engineer",
    "Full Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Web Development",
    "Portfolio",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/logo.svg",
  },
};

// Helper to generate page-specific metadata
export function generatePageMetadata({
  title,
  description,
  path = "",
}: {
  title: string;
  description?: string;
  path?: string;
}): Metadata {
  const url = `${siteConfig.url}${path}`;

  return {
    title,
    description: description || siteConfig.description,
    openGraph: {
      title,
      description: description || siteConfig.description,
      url,
    },
    alternates: {
      canonical: url,
    },
  };
}
