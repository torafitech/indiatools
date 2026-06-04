# CLAUDE.md — Agent Instructions for UtilSpot Project

## What You Are Building
A multi-tool utility website targeting Indian users (and global where relevant), monetized via Google AdSense and affiliate marketing. The goal is passive income — not a SaaS, not a startup. Simple, fast, useful tools that rank on Google and get cited by AI search engines (Perplexity, ChatGPT, Google AI Overviews).

## Domain Concept
`utilspot.app` (or similar — confirm with owner before hardcoding)

## Tech Stack
- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS
- **Deployment:** Vercel (free tier)
- **PDF generation:** jsPDF (for invoice/document tools)
- **AI features:** Anthropic Claude API (`claude-sonnet-4-20250514`) — only for AI-powered tools
- **No database** — all tools are stateless, pure frontend calculations
- **No auth** — zero signup, zero login on any tool

## Project Structure
```
/
├── app/
│   ├── layout.tsx              # Root layout with AdSense script, header, footer
│   ├── page.tsx                # Homepage — lists all tools with descriptions
│   ├── emi-calculator/
│   │   ├── page.tsx            # Main tool page
│   │   └── [variant]/page.tsx  # Programmatic SEO: /emi-calculator/sbi-home-loan etc.
│   ├── income-tax-calculator/
│   │   └── page.tsx
│   ├── sip-calculator/
│   │   └── page.tsx
│   ├── word-counter/
│   │   └── page.tsx
│   ├── tdee-calculator/
│   │   └── page.tsx
│   └── ...more tools
├── components/
│   ├── ui/                     # Reusable UI: Button, Input, Slider, Card, ResultBox
│   ├── layout/                 # Header, Footer, AdSlot, Breadcrumb
│   └── tools/                  # Tool-specific components
├── lib/
│   ├── calculations/           # Pure JS math functions (EMI, tax, SIP, TDEE etc.)
│   ├── seo/                    # Metadata generators, structured data helpers
│   └── programmatic/           # Data for programmatic SEO pages (cities, banks, rates)
├── data/
│   ├── banks.ts                # Indian banks + current interest rates
│   ├── cities.ts               # Indian cities + construction costs per sqft
│   ├── tax-slabs.ts            # Income tax slabs (update after each budget)
│   └── states.ts               # State-specific professional tax rates
└── public/
```

## Coding Rules (Follow Strictly)

### General
- Every tool must work with **zero backend calls** unless it's an AI tool
- No unnecessary npm packages — if it can be done in 10 lines of JS, don't install a library
- Every page must be **mobile-first** — test at 375px width
- Page load time under **2 seconds** — no heavy libraries, lazy load where possible
- No dark mode toggle needed — light mode only for now

### Components
- All reusable UI goes in `/components/ui/`
- Never repeat styling — extract to components after second use
- Use Tailwind only — no inline styles, no CSS modules, no styled-components
- Form elements: use controlled components with `useState`
- Never use `<form>` with `action` — handle everything with onClick/onChange

### Calculations
- All math functions live in `/lib/calculations/` as pure exported functions
- Every calculation function must have a JSDoc comment explaining the formula
- Write unit-testable functions — no side effects, no DOM access in calculation files
- Example:
```ts
// /lib/calculations/emi.ts
/**
 * Calculate EMI using standard formula: P * r * (1+r)^n / ((1+r)^n - 1)
 * @param principal - Loan amount in INR
 * @param annualRate - Annual interest rate as percentage (e.g. 8.5)
 * @param tenureMonths - Loan tenure in months
 */
export function calculateEMI(principal: number, annualRate: number, tenureMonths: number): number {
  const r = annualRate / 12 / 100;
  return (principal * r * Math.pow(1 + r, tenureMonths)) / (Math.pow(1 + r, tenureMonths) - 1);
}
```

### SEO (Critical — Do Not Skip)
Every tool page MUST have:
```tsx
export const metadata: Metadata = {
  title: "[Tool Name] — Free Online [Tool Type] | UtilSpot",
  description: "[Specific description with primary keyword naturally included. 150-160 chars.]",
  keywords: ["keyword1", "keyword2", ...],
  openGraph: { title, description, url, siteName: "UtilSpot" },
  alternates: { canonical: "https://utilspot.app/[tool-slug]" }
}
```

Every tool page MUST have JSON-LD structured data:
```tsx
<script type="application/ld+json">{JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Tool Name",
  "description": "...",
  "url": "https://utilspot.app/tool-slug",
  "applicationCategory": "FinanceApplication",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" }
})}</script>
```

Every tool page MUST have:
- H1 tag with primary keyword
- At least 200 words of explanatory content below the tool (for SEO)
- FAQ section with 4-6 questions using FAQPage schema
- Internal links to 2-3 related tools

### AdSense
- AdSense publisher ID will be provided later — use a placeholder `ca-pub-XXXXXXXXXXXXXXXX`
- Ad slots go in:
  1. After the tool result (highest CTR position)
  2. Below the FAQ section
  3. Sidebar on desktop (if layout has one)
- Create a reusable `<AdSlot slot="XXXXXXXXXX" />` component
- Never place ads above the tool — Google penalizes this
- All ad slots must have `data-ad-format="auto"` and `data-full-width-responsive="true"`

### Affiliate Links
- All affiliate links go through a `/go/[partner]` redirect page for tracking
- Example: `/go/namecheap`, `/go/groww`, `/go/zoho-books`
- Use `rel="nofollow noopener sponsored"` on all affiliate links
- Never hardcode affiliate URLs in tool components — always use the redirect

## Current Priority Build Order
1. **EMI Calculator** — `/emi-calculator` (build first, today)
2. **Word Counter** — `/word-counter` (quick win, 1-2 days)
3. **TDEE Calculator** — `/tdee-calculator` (quick win, 2-3 days)
4. **Income Tax Calculator** — `/income-tax-calculator`
5. **SIP Calculator** — `/sip-calculator`
6. **Invoice Generator** — `/invoice-generator`
7. **Programmatic SEO pages** for EMI + Salary tools

## Programmatic SEO Pattern
For tools with location/variant data, generate static pages:
```
/emi-calculator/sbi-home-loan
/emi-calculator/hdfc-home-loan
/emi-calculator/40-lakh-20-years
/salary-calculator/bangalore
/salary-calculator/hyderabad
/construction-cost/bangalore
/construction-cost/hyderabad
```
Each page uses the same component but pre-fills different default values and has unique metadata.
Use `generateStaticParams()` in Next.js to generate these at build time.

## Homepage Requirements
- List all tools in a grid with icon, name, short description, and category badge
- Group by category: Finance, Career, Health, Business, Developer Tools
- Add a search/filter bar to find tools
- Show "Most Popular" badge on top 3 tools
- Clean, fast, no unnecessary animations

## Performance Rules
- All images: use Next.js `<Image>` component with explicit width/height
- No external fonts — use system font stack for speed
  ```css
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  ```
- Lazy load tool components below the fold
- Target Lighthouse score: 90+ on mobile

## What NOT to Build
- No user accounts / login
- No saving history (no database)
- No payment processing
- No complex animations (hurts performance + SEO)
- No social login
- No comment sections
- No newsletter signup (keep it simple)
