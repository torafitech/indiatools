# Agent: Construction Cost Estimator

## Context

**Tool:** Construction Cost Estimator  
**Route:** `/construction-cost-calculator`  
**Category:** Finance  
**Purpose:** Estimate home construction cost by city and quality tier (Basic / Standard / Premium). Covers 30+ Indian cities.

## Key Files

```
app/construction-cost-calculator/page.tsx           ← SEO page
app/construction-cost-calculator/[variant]/page.tsx ← Programmatic SEO (city variants)
components/tools/ConstructionCalculator.tsx          ← Main UI (client)
data/cities.ts                                       ← City rates per sqft
lib/programmatic/construction-variants.ts            ← Variant page data
```

## Current State (as of 2026-06-04)

- City selection + quality tier + area input → cost estimate ✓
- 30+ Indian cities with per-sqft rates ✓
- Breakdown by construction stage ✓
- Programmatic SEO city pages ✓

## Cost Structure

```
Basic:    ₹1,500 – ₹1,800 per sqft (tier 2 cities), ₹1,800 – ₹2,200 (metros)
Standard: ₹2,200 – ₹2,800 per sqft
Premium:  ₹3,500 – ₹5,000+ per sqft

Stage breakdown (% of total):
- Structure (RCC): 35%
- Brick & plastering: 20%
- Flooring: 12%
- Electrical: 8%
- Plumbing: 7%
- Finishing / paint: 10%
- Doors & windows: 8%
```

## Skills to Load

```
/frontend-design    ← improve breakdown visualization (bar chart or stacked visual)
/code-review        ← verify city rates are reasonable, stage math adds up to 100%
/run                ← verify in browser
```

## Known Issues

- Rates may be outdated (construction costs fluctuate with material prices)
- No bhumi / land cost included (intentional — too variable)
- No interior work estimate

## Next Improvements

- [ ] Add interior work estimate (modular kitchen, wardrobes, false ceiling)
- [ ] Add timeline estimate (months to complete by phase)
- [ ] Add material cost estimator (cement bags, steel rods, bricks for given area)
- [ ] Add affiliate: NoBroker, Sulekha for contractor leads
- [ ] More programmatic SEO variants: `/construction-cost/3bhk-villa-bangalore`

## Agent Prompt (copy this)

```
I'm working on the IndiaTools project at /Users/rafi/Projects/indiatools.
This is a Next.js 14 + Tailwind site with tools for Indian users.

Tool focus: Construction Cost Estimator
Key files:
- app/construction-cost-calculator/page.tsx (SEO page)
- app/construction-cost-calculator/[variant]/page.tsx (city variants)
- components/tools/ConstructionCalculator.tsx (UI)
- data/cities.ts (city rates)

Design system: Plus Jakarta Sans font, #FFFCF8 bg, #E8500A saffron accent, #0F2447 navy.

First: read CLAUDE.md and agents/06-construction-cost-calculator.md for context.
Then: [describe your specific task here]
```
