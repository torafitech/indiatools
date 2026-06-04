# Agent: Salary / CTC Calculator

## Context

**Tool:** CTC to In-Hand Salary Calculator  
**Route:** `/salary-calculator`  
**Category:** Finance  
**Purpose:** Convert annual CTC to monthly in-hand take-home. Deducts PF (employee + employer), professional tax (state-wise), and income tax (new regime by default).

## Key Files

```
app/salary-calculator/page.tsx           ← SEO page (server component)
app/salary-calculator/[variant]/page.tsx ← Programmatic SEO variant pages
components/tools/SalaryCalculator.tsx    ← Main UI component (client)
lib/calculations/salary.ts               ← CTC breakdown math
data/states.ts                           ← State professional tax rates
```

## Current State (as of 2026-06-04)

- CTC → gross salary → in-hand calculation ✓
- PF deduction (12% employee + 12% employer on basic) ✓
- Professional tax by state ✓
- Income tax estimation (simplified) ✓
- Programmatic SEO: city variants (Bangalore, Hyderabad, etc.) ✓

## CTC Breakdown Logic

```
Basic = 40-50% of CTC (user can adjust)
HRA = 40-50% of Basic
Special Allowance = remainder

Employee PF = 12% of Basic (capped at ₹1,800/mo if basic > ₹15,000)
Income Tax = estimated from IncomeTax lib
Professional Tax = state-specific (₹200/mo in most states)

In-hand = Gross - PF - Income Tax - Professional Tax
```

## Skills to Load

```
/frontend-design    ← UI improvements
/code-review        ← verify PF/tax deduction accuracy
/run                ← verify in browser
```

## Known Issues

- ESIC not deducted (applies to employees earning < ₹21,000/mo gross)
- Gratuity not shown in the breakup
- Income tax estimate is simplified — should use actual slab calculation

## Next Improvements

- [ ] Add ESIC deduction (1.75% of gross if gross ≤ ₹21,000)
- [ ] Add gratuity estimate (4.81% of basic per year)
- [ ] Show complete CTC breakup as a table (Basic / HRA / PF / Gratuity / Special Allowance)
- [ ] Let user toggle old vs new tax regime
- [ ] Add more city variants for programmatic SEO

## Agent Prompt (copy this)

```
I'm working on the IndiaTools project at /Users/rafi/Projects/indiatools.
This is a Next.js 14 + Tailwind site with tools for Indian users.

Tool focus: CTC to In-Hand Salary Calculator
Key files:
- app/salary-calculator/page.tsx (SEO page)
- app/salary-calculator/[variant]/page.tsx (variants)
- components/tools/SalaryCalculator.tsx (UI)
- lib/calculations/salary.ts (math)
- data/states.ts (professional tax rates)

Design system: Plus Jakarta Sans font, #FFFCF8 bg, #E8500A saffron accent, #0F2447 navy.

First: read CLAUDE.md and agents/04-salary-calculator.md for context.
Then: [describe your specific task here]
```
