# Agent: SIP Calculator

## Context

**Tool:** SIP Calculator  
**Route:** `/sip-calculator`  
**Category:** Finance  
**Purpose:** Calculate SIP returns, lump sum growth, goal-based SIP planning (how much to invest monthly to reach a goal).

## Key Files

```
app/sip-calculator/page.tsx              ← SEO page (server component)
components/tools/SIPCalculator.tsx       ← Main UI component (client)
lib/calculations/sip.ts                  ← SIP/CAGR math
```

## Current State (as of 2026-06-04)

- Monthly SIP → maturity value calculation ✓
- Lump sum investment → future value ✓
- Goal-based SIP (reverse: target corpus → required monthly SIP) ✓
- FAQ section ✓
- No programmatic SEO variants

## Design Context

Site uses **Plus Jakarta Sans** font, warm cream background (`#FFFCF8`), saffron accent (`#E8500A`), navy (`#0F2447`).

## Formulas

```
SIP Future Value: FV = P × [((1 + r)^n - 1) / r] × (1 + r)
  P = monthly investment, r = monthly rate, n = months

Lump Sum FV: FV = P × (1 + r)^n
  P = principal, r = annual rate, n = years

Required SIP: P = FV × r / [((1 + r)^n - 1) × (1 + r)]
```

## Skills to Load

```
/frontend-design    ← for UI improvements (add chart visualizing growth)
/code-review        ← verify formulas are correct
/run                ← verify in browser
```

## Known Issues

- No inflation-adjusted returns option
- Yearly breakdown table not implemented
- No comparison between SIP vs lump sum for same goal

## Next Improvements

- [ ] Add year-by-year growth table
- [ ] Add SIP vs lump sum comparison toggle
- [ ] Add inflation adjustment (real returns)
- [ ] Add step-up SIP calculator (increase SIP by X% each year)
- [ ] Add programmatic SEO: `/sip-calculator/10-year-sip`, `/sip-calculator/1-crore-goal`
- [ ] Simple line chart showing corpus growth over time (canvas, no library)

## Agent Prompt (copy this)

```
I'm working on the IndiaTools project at /Users/rafi/Projects/indiatools.
This is a Next.js 14 + Tailwind site with tools for Indian users.

Tool focus: SIP Calculator
Key files:
- app/sip-calculator/page.tsx (SEO page)
- components/tools/SIPCalculator.tsx (UI)
- lib/calculations/sip.ts (math)

Design system: Plus Jakarta Sans font, #FFFCF8 bg, #E8500A saffron accent, #0F2447 navy.

First: read CLAUDE.md and agents/03-sip-calculator.md for context.
Then: [describe your specific task here]
```
