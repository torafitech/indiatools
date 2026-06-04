# Agent: FSSAI Nutrition Label Calculator

## Context
**Route:** `/nutrition-label-calculator` | **Category:** Health | **Tier:** 3
**Purpose:** Create FSSAI-compliant nutrition labels for Indian food businesses. Recipe builder with ingredient database.
**India-specific** → use IndiaBadge

## Key Files
```
app/nutrition-label-calculator/page.tsx
components/tools/NutritionLabelCalculator.tsx
```

## Pure frontend — ingredient database inline in component

## Ingredient Database (per 100g)
Include ~40 common Indian ingredients:
rice, wheat flour (maida/atta), sugar, salt, butter, ghee, refined oil, milk (whole), egg, potato, onion, tomato, chicken, paneer, dal (toor), dal (moong), chickpeas, oats, semolina (rava), coconut, almonds, cashews, raisins, honey, besan (gram flour), corn flour, bread crumbs, cream, curd (yogurt), lemon juice, ginger, garlic, green chilli, coriander leaves, curry leaves, turmeric, red chilli powder, cumin, coriander powder, garam masala

Each with: calories, protein, carbs, fat, fiber, sodium (all per 100g)

## Outputs
- Nutrition per serving (user sets serving size)
- FSSAI label format (styled like actual nutrition fact panel)
- Print button
- % Daily Values based on 2000 kcal

## Skills to Load
```
/frontend-design
```
