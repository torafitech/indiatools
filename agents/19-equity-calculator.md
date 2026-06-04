# Agent: Startup Equity & Dilution Calculator

## Context
**Route:** `/equity-calculator` | **Category:** Finance | **Tier:** 3
**Purpose:** Visual cap table simulator. Add founders, show dilution through seed/Series A/B funding rounds with ESOP pool.

## Key Files
```
app/equity-calculator/page.tsx
components/tools/EquityCalculator.tsx
```

## Pure frontend — no backend

## Data Model
```ts
type Founder = { name: string; shares: number; vestingMonths: number };
type Round = { name: string; investment: number; preMoneyValuation: number; optionPool: number };
```

## Outputs
- Cap table after each round: who owns what % and how many shares
- Total shares, price per share per round
- Founder dilution percentage lost per round
- Visual stacked bar chart (CSS, no library)

## Skills to Load
```
/frontend-design
```
