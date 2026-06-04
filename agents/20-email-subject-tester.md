# Agent: AI Email Subject Line Tester

## Context
**Route:** `/email-subject-tester` | **Category:** Marketing | **Tier:** 3
**Purpose:** Score email subject lines for open rate potential, spam triggers, length, emoji impact. Generate 5 AI alternatives.

## Key Files
```
app/email-subject-tester/page.tsx
components/tools/EmailSubjectTester.tsx
app/api/subject-tester/route.ts
```

## Two-layer approach
1. **Client-side instant analysis**: length check, spam word detection (list of 50 common spam words), emoji count, ALL_CAPS detection, question marks, urgency words
2. **Claude API**: overall score (0-100), open rate prediction, 5 alternative subject lines, brief explanation

## Display
- Score: large circular/ring display (0-100, color-coded)
- Flags: spam words highlighted in red, good elements in green
- Alternatives: 5 cards with copy button each

## Skills to Load
```
/frontend-design  /claude-api
```
