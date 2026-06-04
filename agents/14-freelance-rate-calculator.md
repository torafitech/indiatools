# Agent: Freelance Rate Calculator

## Context
**Route:** `/freelance-rate-calculator` | **Category:** Career | **Tier:** 2
**Purpose:** Data-driven hourly & project rate benchmarks by skill, country, experience level.
**Pure frontend** — no API needed.

## Key Files
```
app/freelance-rate-calculator/page.tsx
components/tools/FreelanceRateCalculator.tsx
```

## Rate Data (inline in component)
Skills: Developer, Designer, Writer, Consultant, Marketer, VA
Countries: India, US, UK, Canada, Australia, Germany
Experience: Junior (0-2yr), Mid (2-5yr), Senior (5-10yr), Expert (10+yr)
Each combination has a min/max hourly rate (USD).

## Outputs
- Recommended hourly rate range
- Monthly income projection (at 20hr/wk billable)
- Market positioning (budget/market/premium)
- Project rate suggestion

## Skills to Load
```
/frontend-design
```
