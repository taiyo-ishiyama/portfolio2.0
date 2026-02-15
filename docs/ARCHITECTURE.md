# Architecture

## Overview

This portfolio is built with Next.js App Router, using Server Components for data fetching and Client Components for interactivity. Content is managed in Sanity CMS.

## Data Flow

```text
Sanity CMS → GROQ Queries → Server Components → React Components → Browser
```

1. **Sanity CMS** stores all content (profile, projects, experience, education)
2. **GROQ Queries** fetch structured data at build/request time
3. **Server Components** render static HTML with data
4. **Client Components** handle interactivity (animations, theme toggle)

## Rendering Strategy

| Page | Strategy | Reason |
|------|----------|--------|
| `/` | Static (SSG) | Content rarely changes |
| `/projects` | Static (SSG) | List of all projects |
| `/projects/[slug]` | Dynamic | Per-project metadata |
| `/sitemap.xml` | Static | Auto-generated |
| `/robots.txt` | Static | Auto-generated |
| `/api/resume` | Dynamic | Proxies PDF from Sanity |

## Component Architecture

### Layout Components
- `Header` - Sticky navigation with pill-style nav and theme toggle
- `Footer` - Site footer with social links
- `Container` - Centered content wrapper (max-width: 1100px)

### Section Components (Homepage)
- `HeroSection` - Profile photo, name, summary, CTAs
- `FeaturedProjectsSection` - Grid of project cards
- `BackgroundTabsSection` - Work/Education tabs with timeline
- `SkillsSection` - Categorized skills with expand/collapse
- `ContactSection` - Contact CTA and social links

### UI Components
- `Button` - Primary, secondary, ghost, outline variants
- `Typography` - H1, H2, H3, Text, Tag, Label, Timestamp, Code
- `ThemeToggle` - Dark/light mode switch

### Animation Components
- `FadeIn` - Fade and slide animation
- `FadeInImage` - Optimized image reveal
- `StaggerContainer` / `StaggerItem` - Staggered children animations
- `ScrollFadeIn` - Scroll-triggered animations

## SEO Architecture

### Metadata
- Centralized in `/lib/seo/metadata.ts`
- `siteConfig` - Site name, title, description, URL
- `defaultMetadata` - Base metadata for all pages
- `generatePageMetadata()` - Helper for page-specific metadata

### Structured Data (JSON-LD)
- `PersonJsonLd` - For profile/author info
- `ProjectJsonLd` - For individual projects
- `BreadcrumbJsonLd` - For navigation path
- `WebsiteJsonLd` - For site identity

### Auto-generated Files
- `/sitemap.xml` - Dynamic sitemap with all pages
- `/robots.txt` - Search engine directives

## Styling Architecture

### Tailwind CSS
- Custom color tokens via CSS variables
- Dark mode via `class` strategy
- Custom shadows and animations in config

### Fonts
- **Geist Sans** - Primary font (95% of text)
- **Geist Mono** - Tags, labels, timestamps, code

### Typography System
Located in `/components/ui/typography.tsx`:
- Sans: `H1`, `H2`, `H3`, `Lead`, `Text`, `Small`
- Mono: `Tag`, `Label`, `Timestamp`, `Code`

## File Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | kebab-case | `project-card.tsx` |
| Pages | `page.tsx` | `app/(site)/page.tsx` |
| Layouts | `layout.tsx` | `app/layout.tsx` |
| API Routes | `route.ts` | `app/api/resume/route.ts` |
| Types | PascalCase | `Project`, `Experience` |
| Utils | camelCase | `formatDate()` |
