# Agent: Accessibility Checker (WCAG)

## Context
**Route:** `/accessibility-checker` | **Category:** Developer | **Tier:** 3
**Purpose:** Client-side WCAG 2.1 AA accessibility checker. User pastes HTML → tool identifies violations and provides fix code snippets.

## Key Files
```
app/accessibility-checker/page.tsx
components/tools/AccessibilityChecker.tsx
```

## Pure client-side — no backend needed
Parse user-pasted HTML using DOMParser (browser API).

## Checks (client-side, regex + DOMParser)
1. Images missing alt: `<img>` without alt attribute
2. Inputs missing labels: `<input>` not associated with `<label>`
3. Empty links: `<a>` with no text content
4. Empty buttons: `<button>` with no text
5. Missing lang attribute on `<html>`
6. Color contrast approximation (warn about white-on-white / similar)
7. Heading hierarchy jumps (h1→h3 skipping h2)
8. Form submit buttons present

## Skills to Load
```
/frontend-design
```
