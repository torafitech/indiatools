# Agent: AI Color Palette Generator

## Context
**Route:** `/color-palette-generator` | **Category:** Design | **Tier:** 2
**Purpose:** Generate brand color palettes from text description. Export to CSS variables / Tailwind / hex codes.

## Key Files
```
app/color-palette-generator/page.tsx
components/tools/ColorPaletteGenerator.tsx
app/api/color-palette/route.ts
```

## Two Modes
1. AI Mode: Text description → Claude returns 5 colors [{name, hex, usage}]
2. Manual Mode: Pick a base hex color → generate complementary palette using color theory (client-side math)

## Export Formats
- CSS custom properties
- Tailwind config colors object
- Plain hex list

## Skills to Load
```
/frontend-design  /claude-api
```
