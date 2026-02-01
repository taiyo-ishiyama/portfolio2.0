# Portfolio Website Planning

## Goal
Build a modern software engineer portfolio website that showcases:
- Intro (profile + short pitch + links)
- Featured projects + project detail pages
- Work experience & education (tab switch)
- Technical skills (expandable “show more”)
- Contact section + footer links

All content is managed in Sanity CMS so updates do not require UI code edits.

## Tech Stack
### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui (buttons, tabs, cards, dialog if needed)
- Framer Motion (optional: subtle section/card animations)
- next-themes (dark mode toggle + system preference)

### CMS
- Sanity embedded in same repo under `/sanity`
- Content types: profile, projects, experience, education, skills

### Hosting
- Next.js on Vercel
- Sanity Studio accessed locally (can be hosted separately later)

### Testing
- Unit: Vitest + React Testing Library
- E2E: Playwright
- CI: GitHub Actions (lint + typecheck + tests)

## Architecture & Routing
### Pages (App Router)
- `/` Home page (scroll sections)
- `/projects` optional list page (reuses cards)
- `/projects/[slug]` project detail / case study page

### Data Flow
- Home + project pages fetch structured content from Sanity via GROQ queries
  - profile info
  - featured projects
  - all projects
  - work experience
  - education
  - skill categories
- Render as static where possible (SSG). Optional later: ISR + webhook revalidate.

### UI Component Structure
- Home page uses section components
- Reusable cards (ProjectCard, ExperienceCard, SkillChip)
- UI code is content-agnostic; all text/links come from CMS

## Design Plan
### Overall Style
- Minimal, modern, professional
- Light + dark mode
- Accent color: blue

### Theme Rules (neutral-first)
- Light: off-white background, white cards, near-black text
- Dark: near-black background, slightly lighter card surfaces, near-white text
- Blue used for: primary button, links, active tab underline, hover highlights

### Layout
- Centered container (~1000–1100px max width)
- Generous whitespace
- Sticky navbar with anchor links

### Section Order
1. Intro/Hero
2. Featured Projects
3. Background (Work/Education tabs)
4. Technical Skills (expandable)
5. Contact + Footer

## Section Details
### 1) Intro/Hero (above the fold)
- Small circular profile photo
- Name + role title (“Full Stack Software Engineer”)
- 1–2 line value prop (web dev + workflow automation focus)
- CTA buttons:
  - Primary (blue): “View Projects”
  - Secondary: “Download Resume”
- Contact icons row (with tooltips): email, LinkedIn, GitHub

### 2) Featured Projects
- Grid of cards (2 columns desktop, 1 column mobile)
- Each card includes:
  - thumbnail
  - title
  - 1 sentence description
  - tech tags (max ~5–7)
  - links (GitHub, Demo)
- Entire card clickable → `/projects/[slug]`
- Optional “View all” link

### 3) Background (Tabs)
- Tabs: Work (default) | Education
- Content shown as timeline or stacked cards
- Work entry fields:
  - company, role, dates, location
  - 2–4 impact bullets
  - tech tags
- Education entry fields:
  - school, degree, dates, location
  - optional bullets (awards/GPA/coursework)

### 4) Technical Skills
- Categories: Frontend / Backend / Cloud / Data / Tools
- Display key skills as chips (optional small icons)
- “Show more/less” expands inline (not modal)

### 5) Contact + Footer
- Simple CTA: “Email me”
- Icons/buttons: GitHub, LinkedIn
- Optional footer line: “Built with Next.js + Sanity”
- Footer copyright

## Repo / File Structure (chosen)
```
portfolio/
├─ app/
│  ├─ (site)/
│  │  ├─ layout.tsx
│  │  ├─ page.tsx
│  │  ├─ projects/
│  │  │  ├─ page.tsx
│  │  │  └─ [slug]/page.tsx
│  │  ├─ api/
│  │  │  └─ revalidate/route.ts    # optional
│  ├─ robots.ts
│  ├─ sitemap.ts
│  └─ globals.css
│
├─ components/
│  ├─ layout/
│  │  ├─ header.tsx
│  │  ├─ footer.tsx
│  │  └─ container.tsx
│  ├─ sections/
│  │  ├─ hero.tsx
│  │  ├─ featured-projects.tsx
│  │  ├─ background-tabs.tsx
│  │  ├─ skills.tsx
│  │  └─ contact.tsx
│  ├─ ui/                          # shadcn/ui
│  └─ common/
│     ├─ project-card.tsx
│     ├─ experience-card.tsx
│     ├─ skill-chip.tsx
│     └─ social-links.tsx
│
├─ lib/
│  ├─ sanity/
│  │  ├─ client.ts
│  │  ├─ queries.ts
│  │  ├─ types.ts
│  │  └─ image.ts
│  ├─ config/
│  │  ├─ site.ts
│  │  └─ nav.ts
│  ├─ utils/
│  │  ├─ cn.ts
│  │  └─ format.ts
│  └─ seo/
│     ├─ metadata.ts
│     └─ jsonld.ts
│
├─ sanity/
│  ├─ schemaTypes/
│  │  ├─ index.ts
│  │  ├─ profile.ts
│  │  ├─ project.ts
│  │  ├─ experience.ts
│  │  ├─ education.ts
│  │  └─ skill.ts
│  ├─ sanity.config.ts
│  └─ sanity.cli.ts
│
├─ public/
│  ├─ images/
│  └─ resume/
│     └─ Resume.pdf
│
├─ docs/
│  ├─ README.md
│  ├─ ARCHITECTURE.md
│  ├─ CONTENT_MODEL.md
│  ├─ DEPLOYMENT.md
│  └─ TESTING.md
│
├─ tests/
│  ├─ unit/
│  ├─ e2e/
│  └─ fixtures/
│
├─ .github/workflows/
│  ├─ ci.yml
│  └─ e2e.yml
│
├─ .env.example
└─ package.json
```

## Sanity Content Model (high level)
- profile: name, role, summary, photo, contact links, CTA labels
- project: title, slug, description, thumbnail, tech tags, githubUrl, demoUrl, featured (boolean), body/caseStudy (optional)
- experience: company, role, dates, location, bullets[], techTags[]
- education: school, degree, dates, location, bullets[]
- skillCategory / skill: categoryName, skills[] (name, optional icon)

## Key UX Requirements
- Responsive (mobile-first)
- Dark/light mode toggle + system default
- Cards have hover lift / subtle shadow
- Tooltips for icon-only buttons
- Project card navigates to detail page
- Skills “Show more” expands inline
