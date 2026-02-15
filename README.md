# Taiyo's Portfolio

A modern software engineer portfolio built with Next.js, Sanity CMS, and Tailwind CSS.

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| CMS | Sanity |
| Fonts | Geist Sans + Geist Mono |
| Hosting | Vercel |
| Testing | Playwright (E2E), Vitest (Unit) |

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Start Sanity Studio
pnpm sanity

# Run tests
pnpm test:e2e
```

## Project Structure

```
portfolio/
├── app/                 # Next.js App Router
│   ├── (site)/          # Main site routes
│   │   ├── page.tsx     # Homepage
│   │   └── projects/    # Project pages
│   ├── api/             # API routes
│   ├── sitemap.ts       # Dynamic sitemap
│   └── robots.ts        # Robots.txt
├── components/          # React components
│   ├── layout/          # Header, Footer, Container
│   ├── sections/        # Page sections
│   ├── ui/              # UI primitives
│   ├── common/          # Shared components
│   ├── animations/      # Animation wrappers
│   └── seo/             # SEO components
├── lib/                 # Utilities and config
│   ├── sanity/          # Sanity client & queries
│   ├── seo/             # SEO metadata
│   ├── config/          # Site config
│   └── utils/           # Helper functions
├── sanity/              # Sanity Studio
│   └── schemaTypes/     # Content schemas
├── tests/               # Test files
│   └── e2e/             # Playwright tests
└── docs/                # Documentation
```

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Documentation

- [Architecture](./docs/ARCHITECTURE.md) - Technical architecture and structure
- [Content Model](./docs/CONTENT_MODEL.md) - Sanity CMS schema details
- [Testing](./docs/TESTING.md) - Testing strategy and commands
- [Deployment](./docs/DEPLOYMENT.md) - Deployment instructions
- [Planning](./docs/PLANNING.md) - Original planning document
