# Agent: Password Generator & Strength Tester

## Context
**Route:** `/password-generator` | **Category:** Security | **Tier:** 3
**Purpose:** Generate strong passwords and test existing ones. 100% client-side — passwords NEVER leave the browser.

## Key Files
```
app/password-generator/page.tsx
components/tools/PasswordGenerator.tsx
```

## Pure client-side — use crypto.getRandomValues() for generation

## Features

### Generator
- Length slider (8-64 chars)
- Toggles: uppercase, lowercase, numbers, symbols
- "Exclude similar characters" toggle (0, O, l, 1, I)
- Generate 1 / 5 / 10 passwords at once
- Copy each with one click

### Strength Tester
- User types/pastes their own password
- Score 0-4 (Very Weak / Weak / Fair / Strong / Very Strong)
- Factors: length, character variety, common patterns, dictionary words
- Time to crack estimate
- Specific improvement tips

### Strength algorithm (no external lib)
```ts
function scorePassword(pwd: string): { score: 0|1|2|3|4; feedback: string[] } {
  // Check length, uppercase, lowercase, numbers, symbols
  // Check common passwords list (top 20)
  // Check patterns: 123, abc, qwerty, repeated chars
  // Return score + feedback array
}
```

## Security note (display in UI)
"Your passwords are generated and tested entirely in your browser using the Web Crypto API. Nothing is sent to any server."

## Skills to Load
```
/frontend-design
```
