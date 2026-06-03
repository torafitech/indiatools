# agents.md — Agent & Workflow Instructions

## How to Work on This Project

### Single Task Mode
When given a specific tool to build (e.g. "build the EMI calculator"):
1. Read `CLAUDE.md` first — understand conventions
2. Read the relevant tool spec in `instructions.md`
3. Build in this order: calculation logic → component → page → SEO → FAQ content
4. Never skip the SEO step — it's as important as the tool itself

### Multi-Tool Mode
When asked to build multiple tools:
1. Build shared components first (`AdSlot`, `SliderInput`, `ResultBox`)
2. Build tools one at a time — complete each fully before starting next
3. Re-use components aggressively — never duplicate UI patterns

---

## Agent Roles (If Using Multi-Agent)

### Agent 1 — Calculator Logic Agent
**Responsibility:** Write and test all calculation functions
**Works in:** `/lib/calculations/`
**Rules:**
- Pure functions only — no side effects, no imports from React
- Every function gets a JSDoc comment with the formula source
- Test edge cases: zero values, very large values, negative inputs (throw error)
- Export all functions as named exports

**Example task:** "Write all EMI calculation functions including amortization schedule generator"

### Agent 2 — UI Component Agent
**Responsibility:** Build React components for tools
**Works in:** `/components/tools/` and `/components/ui/`
**Rules:**
- Import calculation functions from `/lib/calculations/` — never rewrite math in components
- Use Tailwind only — no inline styles
- Components must be fully responsive (mobile-first)
- Handle loading states for any async operations
- Use `useState` for all form state

**Example task:** "Build the EMI calculator UI component using the functions from /lib/calculations/emi.ts"

### Agent 3 — SEO & Content Agent
**Responsibility:** Write page metadata, FAQ content, and explanatory text
**Works in:** `app/[tool]/page.tsx` (metadata + content sections)
**Rules:**
- Every page needs: title, description, H1, 300+ words of content, FAQ section with schema
- Content must be original — never copy from competitor sites
- Primary keyword must appear in: title, H1, first paragraph, at least 2 subheadings
- FAQ schema must be valid JSON-LD — validate before committing

**Example task:** "Write SEO metadata, page content, and FAQ section for the EMI calculator page"

### Agent 4 — Programmatic SEO Agent
**Responsibility:** Generate variant pages for programmatic SEO
**Works in:** `/lib/programmatic/`, `/app/[tool]/[variant]/`
**Rules:**
- Each variant must have unique metadata (no duplicate title/description)
- Variant pages re-use the main tool component with pre-filled values
- Use `generateStaticParams()` for all variant pages
- Keep variant data files clean and well-commented

**Example task:** "Generate 20 EMI calculator variant pages for different banks with unique SEO metadata"

---

## Task Handoff Protocol
When one agent completes work and hands off to next:
1. Summarize what was built
2. List any assumptions made
3. Flag any incomplete items or decisions needed
4. Specify exactly what the next agent needs to do

Example handoff:
```
COMPLETED: EMI calculation functions in /lib/calculations/emi.ts
- calculateEMI(principal, annualRate, tenureMonths) ✓
- generateAmortizationSchedule(principal, annualRate, tenureMonths) ✓
ASSUMPTION: Rounded EMI to nearest rupee
INCOMPLETE: Edge case for 0% interest rate (returns NaN) — needs fix
NEXT AGENT: Build EMI calculator UI component. Import from /lib/calculations/emi.ts
```

---

## Git Workflow
```bash
# One branch per tool
git checkout -b tool/emi-calculator
# Commit when tool is complete
git commit -m "feat: EMI calculator with amortization table and programmatic SEO"
# Merge to main when tested
git checkout main && git merge tool/emi-calculator
```

Commit message format: `feat: [tool name] - [what was built]`

---

## Testing Checklist Per Tool
Before marking any tool as complete:
- [ ] Calculation matches manual calculation / known reference (e.g. BankBazaar result)
- [ ] Works on mobile (375px width)
- [ ] All inputs have validation (no negative numbers, no absurd values)
- [ ] Page has H1, meta title, meta description
- [ ] FAQ section present with minimum 4 questions
- [ ] JSON-LD structured data present and valid
- [ ] AdSlot components placed correctly (never above the tool)
- [ ] Internal links to 2+ related tools
- [ ] No console errors or warnings
- [ ] Lighthouse mobile score 85+
