# Agent: EMI Calculator

## Context

**Tool:** EMI Calculator  
**Route:** `/emi-calculator`  
**Category:** Finance (most popular tool on the site)  
**Purpose:** Calculate monthly EMI for home, car, personal loans. Shows amortization schedule, total interest, and prepayment savings.

## Key Files

```
app/emi-calculator/page.tsx              ← SEO page (server component)
app/emi-calculator/[variant]/page.tsx    ← Programmatic SEO variant pages
components/tools/EMICalculator.tsx       ← Main UI component (client)
lib/calculations/emi.ts                  ← Pure math functions
data/bank-rates.ts                       ← 30+ banks with current rates
lib/programmatic/emi-variants.ts         ← Variant page data (bank + amount combos)
```

## Current State (as of 2026-06-04)

- EMI calculation with standard P*r*(1+r)^n formula ✓
- Loan types: Home, Car, Personal — each with own slider ranges ✓
- Amortization table (yearly breakdown) ✓
- Prepayment savings calculator ✓
- 30+ banks in the bank hub ✓
- Programmatic SEO: bank-specific + amount-specific variant pages ✓
- FAQ section with schema ✓

## Design Context

Site uses **Plus Jakarta Sans** font, warm cream background (`#FFFCF8`), saffron accent (`#E8500A`), navy (`#0F2447`).  
Tool pages follow this pattern: breadcrumb → h1 → tool component → ad slot → SEO content → FAQ → related tools.

## Skills to Load

```
/frontend-design    ← for any UI work on the calculator component
/code-review        ← for auditing calculation logic
/run                ← to verify the tool works in browser
```

## Known Issues

- Prepayment input only allows one-time prepayment; should support recurring annual prepayment
- Mobile: amortization table overflows on very small screens (< 320px)

## Next Improvements

- [ ] Add comparison mode: compare two different loan scenarios side-by-side
- [ ] Add "How much can I afford?" reverse calculator (target EMI → principal)
- [ ] Add recurring prepayment option (e.g., ₹50,000 extra per year)
- [ ] Add pie chart for principal vs interest split (use a minimal canvas draw, no library)
- [ ] Add more programmatic SEO variants: `/emi-calculator/10-lakh-personal-loan` etc.

## Agent Prompt (copy this)

```
I'm working on the IndiaTools project at /Users/rafi/Projects/indiatools.
This is a Next.js 14 + Tailwind site with tools for Indian users.

Tool focus: EMI Calculator
Key files:
- app/emi-calculator/page.tsx (SEO page)
- components/tools/EMICalculator.tsx (UI)
- lib/calculations/emi.ts (math)
- data/bank-rates.ts (bank rates)

Design system: Plus Jakarta Sans font, #FFFCF8 bg, #E8500A saffron accent, #0F2447 navy.

First: read CLAUDE.md and agents/01-emi-calculator.md for context.
Then: [describe your specific task here]
```
