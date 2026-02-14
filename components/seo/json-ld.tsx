import { siteConfig } from "@/lib/seo/metadata";

type PersonJsonLdProps = {
  name: string;
  jobTitle: string;
  description?: string;
  image?: string;
  url?: string;
  sameAs?: string[];
};

export function PersonJsonLd({
  name,
  jobTitle,
  description,
  image,
  url,
  sameAs = [],
}: PersonJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    jobTitle,
    description,
    image,
    url: url || siteConfig.url,
    sameAs,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

type WebsiteJsonLdProps = {
  name?: string;
  description?: string;
  url?: string;
};

export function WebsiteJsonLd({
  name = siteConfig.name,
  description = siteConfig.description,
  url = siteConfig.url,
}: WebsiteJsonLdProps = {}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    description,
    url,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

type ProjectJsonLdProps = {
  name: string;
  description: string;
  image?: string;
  url: string;
  technologies?: string[];
  sourceUrl?: string;
};

export function ProjectJsonLd({
  name,
  description,
  image,
  url,
  technologies = [],
  sourceUrl,
}: ProjectJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name,
    description,
    image,
    url,
    programmingLanguage: technologies,
    codeRepository: sourceUrl,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

type BreadcrumbItem = {
  name: string;
  url: string;
};

type BreadcrumbJsonLdProps = {
  items: BreadcrumbItem[];
};

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
