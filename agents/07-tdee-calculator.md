# Agent: TDEE Calculator

## Context

**Tool:** TDEE Calculator (Total Daily Energy Expenditure)  
**Route:** `/tdee-calculator`  
**Category:** Health  
**Purpose:** Calculate daily calorie needs based on weight, height, age, gender, and activity level. Show macro targets for different goals (weight loss, maintenance, muscle gain).

## Key Files

```
app/tdee-calculator/page.tsx             ← SEO page (server component)
components/tools/TDEECalculator.tsx      ← Main UI (client)
lib/calculations/tdee.ts                 ← BMR + TDEE + macro math
```

## Current State (as of 2026-06-04)

- BMR via Mifflin-St Jeor formula ✓
- Activity multiplier → TDEE ✓
- Macro targets for 3 goals (cut / maintain / bulk) ✓
- Imperial / metric toggle ✓
- FAQ section ✓

## Formulas

```
BMR (Mifflin-St Jeor):
  Men:   BMR = 10×weight(kg) + 6.25×height(cm) - 5×age + 5
  Women: BMR = 10×weight(kg) + 6.25×height(cm) - 5×age - 161

Activity multipliers:
  Sedentary:       1.2
  Light (1-3/wk):  1.375
  Moderate (3-5):  1.55
  Active (6-7):    1.725
  Very Active:     1.9

Macros (Cut: -500 cal, Bulk: +300 cal):
  Protein: 0.8-1g per lb of bodyweight
  Fat: 25-30% of calories
  Carbs: remainder
```

## Skills to Load

```
/frontend-design    ← improve results display (macro pie chart, goal cards)
/code-review        ← verify formulas, unit conversions
/run                ← verify in browser
```

## Known Issues

- Katch-McArdle formula (uses lean mass) not available — requires body fat % input
- No BMI display alongside BMR
- Imperial input (ft/in) may have rounding issues

## Next Improvements

- [ ] Add BMI display
- [ ] Add body fat % input → unlock Katch-McArdle formula
- [ ] Add water intake recommendation (35ml per kg)
- [ ] Add protein intake guide by food source
- [ ] Add visual macro ring chart (CSS-only, no library)
- [ ] Programmatic SEO: `/tdee-calculator/male-25-70kg` etc.

## Agent Prompt (copy this)

```
I'm working on the IndiaTools project at /Users/rafi/Projects/indiatools.
This is a Next.js 14 + Tailwind site with tools for Indian users.

Tool focus: TDEE Calculator
Key files:
- app/tdee-calculator/page.tsx (SEO page)
- components/tools/TDEECalculator.tsx (UI)
- lib/calculations/tdee.ts (math)

Design system: Plus Jakarta Sans font, #FFFCF8 bg, #E8500A saffron accent, #0F2447 navy.

First: read CLAUDE.md and agents/07-tdee-calculator.md for context.
Then: [describe your specific task here]
```
