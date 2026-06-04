# Agent: Free Website SEO Analyzer

## Context
**Route:** `/seo-analyzer` | **Category:** Developer | **Tier:** 2
**Purpose:** Instant on-page SEO audit. Enter URL → API fetches page → analyze title, meta, H-tags, images, canonical, robots.

## Key Files
```
app/seo-analyzer/page.tsx
components/tools/SEOAnalyzer.tsx
app/api/seo-check/route.ts
```

## API Route Logic
```ts
// POST { url: string }
// fetch(url, { headers: { 'User-Agent': 'UtilSpot SEO Checker' } })
// Parse HTML text with regex: title, meta description, h1, h2s, img alts, canonical, robots, og tags
// Return scored audit object
```

## Checks
- Title: length (50-60 chars), present
- Meta description: length (150-160 chars), present
- H1: count (should be exactly 1), contains keywords
- H2-H6: count and structure
- Images: count with vs without alt text
- Canonical: present, self-referencing
- Robots: noindex check
- OG tags: og:title, og:description, og:image

## Skills to Load
```
/frontend-design
```
