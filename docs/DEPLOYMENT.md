# Deployment

This document covers deploying the portfolio to Vercel.

## Prerequisites

- Vercel account
- Sanity project set up
- Environment variables ready

## Environment Variables

Set these in Vercel dashboard (Settings → Environment Variables):

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID | `abc123xyz` |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset | `production` |
| `NEXT_PUBLIC_SITE_URL` | Production URL | `https://taiyo.dev` |

## Deploy to Vercel

### Option 1: GitHub Integration (Recommended)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Configure environment variables
6. Click "Deploy"

Vercel will automatically deploy on every push to main.

### Option 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

## Build Settings

Vercel auto-detects Next.js. Default settings work:

| Setting | Value |
|---------|-------|
| Framework | Next.js |
| Build Command | `next build` |
| Output Directory | `.next` |
| Install Command | `pnpm install` |

## Sanity Studio Deployment

Sanity Studio can be deployed separately:

```bash
# Deploy Sanity Studio
pnpm sanity deploy

# Choose a hostname (e.g., taiyo-portfolio)
# Access at: https://taiyo-portfolio.sanity.studio
```

## Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Test dark/light mode toggle
- [ ] Verify resume download works
- [ ] Check SEO meta tags (use browser dev tools)
- [ ] Verify sitemap.xml is accessible
- [ ] Verify robots.txt is accessible
- [ ] Test on mobile devices
- [ ] Run Lighthouse audit

## Custom Domain

1. Go to Vercel project settings
2. Click "Domains"
3. Add your domain
4. Configure DNS records as instructed

### DNS Configuration

For apex domain (e.g., `taiyo.dev`):
```
A     @     76.76.21.21
```

For www subdomain:
```
CNAME www   cname.vercel-dns.com
```

## Revalidation (Optional)

For on-demand revalidation when Sanity content changes:

### 1. Create Webhook Secret

Generate a secret and add to Vercel env vars:
```
SANITY_REVALIDATE_SECRET=your-secret-here
```

### 2. API Route

The revalidation endpoint is at `/api/revalidate`:

```typescript
// app/api/revalidate/route.ts
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  revalidatePath("/");
  revalidatePath("/projects");

  return NextResponse.json({ revalidated: true });
}
```

### 3. Configure Sanity Webhook

1. Go to Sanity project settings
2. Click "API" → "Webhooks"
3. Add webhook:
   - URL: `https://your-site.com/api/revalidate?secret=your-secret`
   - Trigger on: Create, Update, Delete
   - Filter: Leave empty for all content types

## Monitoring

### Vercel Analytics

Enable in Vercel dashboard for:
- Page views
- Visitor insights
- Performance metrics

### Vercel Speed Insights

Enable for:
- Core Web Vitals
- Real user monitoring

## Troubleshooting

### Build Fails

```bash
# Check build locally
pnpm build

# Check for TypeScript errors
pnpm lint
```

### Environment Variables Not Working

- Ensure variables are set for correct environment (Production/Preview/Development)
- Variables starting with `NEXT_PUBLIC_` are exposed to browser
- Redeploy after changing environment variables

### 404 on Dynamic Routes

- Check that `generateStaticParams` returns valid slugs
- Verify Sanity queries return expected data

### Images Not Loading

- Verify Sanity image URLs are accessible
- Check `next.config.js` has correct image domains:

```javascript
// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};
```
