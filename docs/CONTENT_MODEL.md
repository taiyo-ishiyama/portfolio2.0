# Content Model

This document describes the Sanity CMS schema used in the portfolio.

## Schema Types

### Profile

Single document containing personal information.

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Full name |
| `role` | string | Job title (e.g., "Software Engineer") |
| `summary` | text | Brief bio/introduction |
| `photo` | image | Profile photo |
| `resume` | file | PDF resume file |

**Location:** `/sanity/schemaTypes/profile.ts`

### Project

Portfolio projects with details and links.

| Field | Type | Description |
|-------|------|-------------|
| `title` | string | Project name |
| `slug` | slug | URL-friendly identifier |
| `thumbnail` | image | Project thumbnail |
| `shortDescription` | string | One-line summary |
| `fullDescription` | text | Detailed description (Markdown) |
| `techStacks` | array[string] | Technologies used |
| `githubUrl` | url | GitHub repository link |
| `demoUrl` | url | Demo video link |
| `liveUrl` | url | Live site link |
| `featured` | boolean | Show on homepage |
| `order` | number | Display order |

**Location:** `/sanity/schemaTypes/project.ts`

### Experience

Work experience entries.

| Field | Type | Description |
|-------|------|-------------|
| `company` | string | Company name |
| `logo` | image | Company logo |
| `role` | string | Job title |
| `startDate` | date | Start date |
| `endDate` | date | End date (optional) |
| `isCurrent` | boolean | Currently employed |
| `location` | string | Work location |
| `bullets` | array[string] | Achievement bullets |
| `order` | number | Display order |

**Location:** `/sanity/schemaTypes/experience.ts`

### Education

Education entries.

| Field | Type | Description |
|-------|------|-------------|
| `school` | string | Institution name |
| `logo` | image | School logo |
| `degree` | string | Degree/program name |
| `startDate` | date | Start date |
| `endDate` | date | End date |
| `location` | string | Location |
| `gpa` | string | GPA (optional) |
| `description` | text | Additional details |
| `order` | number | Display order |

**Location:** `/sanity/schemaTypes/education.ts`

## GROQ Queries

All queries are defined in `/lib/sanity/queries.ts`:

```groq
// Profile data for hero section
*[_type == "profile"][0] {
  name, role, summary, photo,
  "resume": { "asset": resume.asset->{ url } }
}

// Featured projects for homepage
*[_type == "project" && featured == true] | order(order asc) {
  _id, title, slug, thumbnail, shortDescription,
  techStacks, githubUrl, demoUrl, liveUrl
}

// All projects for /projects page
*[_type == "project"] | order(order asc, _createdAt desc) {
  _id, title, slug, thumbnail, shortDescription,
  techStacks, githubUrl, demoUrl, liveUrl, featured
}

// Single project by slug
*[_type == "project" && slug.current == $slug][0] {
  _id, title, slug, thumbnail, shortDescription,
  fullDescription, techStacks, githubUrl, demoUrl, liveUrl
}

// Work experience
*[_type == "experience"] | order(order asc, startDate desc) {
  _id, company, logo, role, startDate, endDate,
  isCurrent, location, bullets
}

// Education
*[_type == "education"] | order(order asc, endDate desc) {
  _id, school, logo, degree, startDate, endDate,
  location, gpa, description
}
```

## TypeScript Types

All types are defined in `/lib/sanity/types.ts`:

```typescript
type Profile = {
  name: string;
  role: string;
  summary?: string;
  photo?: SanityImage;
  resume?: { asset: { url: string } };
}

type Project = {
  _id: string;
  title: string;
  slug: { current: string };
  thumbnail?: SanityImage;
  shortDescription?: string;
  fullDescription?: string;
  techStacks?: string[];
  githubUrl?: string;
  demoUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  order?: number;
}

type Experience = {
  _id: string;
  company: string;
  logo?: SanityImage;
  role: string;
  startDate: string;
  endDate?: string;
  isCurrent?: boolean;
  location?: string;
  bullets?: string[];
  order?: number;
}

type Education = {
  _id: string;
  school: string;
  logo?: SanityImage;
  degree: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  gpa?: string;
  description?: string;
  order?: number;
}
```

## Managing Content

1. Start Sanity Studio: `pnpm sanity`
2. Open http://localhost:3333
3. Add/edit content in the Studio
4. Changes appear on the site after refresh (or revalidation)
