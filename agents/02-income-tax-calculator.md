# Agent: Income Tax Calculator

## Context

**Tool:** Income Tax Calculator  
**Route:** `/income-tax-calculator`  
**Category:** Finance  
**Purpose:** Compare old vs new tax regime for FY 2025-26. Show tax saving difference, effective tax rate, and take-home salary.

## Key Files

```
app/income-tax-calculator/page.tsx       ← SEO page (server component)
components/tools/IncomeTaxCalculator.tsx ← Main UI component (client)
lib/calculations/income-tax.ts           ← Tax slab math
data/tax-slabs.ts                        ← FY 2025-26 tax slabs (update each budget)
```

## Current State (as of 2026-06-04)

- Old regime vs new regime comparison ✓
- All standard deductions applied (80C, 80D, HRA, standard deduction) ✓
- Effective tax rate display ✓
- FAQ section ✓
- No programmatic SEO variants yet

## Design Context

Site uses **Plus Jakarta Sans** font, warm cream background (`#FFFCF8`), saffron accent (`#E8500A`), navy (`#0F2447`).

## Skills to Load

```
/frontend-design    ← for UI improvements
/code-review        ← for tax slab accuracy audit
/run                ← to verify calculations in browser
```

## Known Issues

- Budget 2025 changes (new tax regime slabs updated Feb 2025) — verify slabs match official IT dept
- No HRA auto-calculation (user must manually compute HRA exempt amount)
- Surcharge and cess calculation may be missing for incomes > ₹50L

## Next Improvements

- [ ] Add surcharge calculation for incomes > ₹50L and > ₹1Cr
- [ ] Add HRA calculator embedded/linked
- [ ] Add 87A rebate for new regime (₹25,000 rebate up to ₹7L income)
- [ ] Add programmatic SEO: `/income-tax-calculator/salary-20-lakh`, `/salary-50-lakh`
- [ ] Add section 80C input breakdown (LIC, PPF, ELSS, home loan principal)
- [ ] Export result as PDF or image

## Tax Slab Reference (FY 2025-26 — New Regime)

| Income | Tax Rate |
|--------|----------|
| 0 – 4L | Nil |
| 4L – 8L | 5% |
| 8L – 12L | 10% |
| 12L – 16L | 15% |
| 16L – 20L | 20% |
| 20L – 24L | 25% |
| Above 24L | 30% |

4% health & education cess applies on tax amount. Rebate u/s 87A: ₹25,000 if income ≤ ₹7L.

## Agent Prompt (copy this)

```
I'm working on the IndiaTools project at /Users/rafi/Projects/indiatools.
This is a Next.js 14 + Tailwind site with tools for Indian users.

Tool focus: Income Tax Calculator
Key files:
- app/income-tax-calculator/page.tsx (SEO page)
- components/tools/IncomeTaxCalculator.tsx (UI)
- lib/calculations/income-tax.ts (math)
- data/tax-slabs.ts (FY 2025-26 slabs)

Design system: Plus Jakarta Sans font, #FFFCF8 bg, #E8500A saffron accent, #0F2447 navy.

First: read CLAUDE.md and agents/02-income-tax-calculator.md for context.
Then: [describe your specific task here]
```
