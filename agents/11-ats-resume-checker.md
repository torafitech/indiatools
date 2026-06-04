# Agent: AI ATS Resume Checker

## Context
**Route:** `/ats-resume-checker` | **Category:** HR & Career | **Tier:** 1
**Purpose:** Free AI-powered ATS resume scanner. User pastes job description + resume, gets instant match score, missing keywords, strengths, and improvement suggestions.
**Revenue driver:** High CPC (~$6.50), premium upsell potential.

## Key Files
```
app/ats-resume-checker/page.tsx
components/tools/ATSResumeChecker.tsx
app/api/ats-check/route.ts
```

## Current State
Not built. Build from scratch.

## API Pattern
```ts
// app/api/ats-check/route.ts
import Anthropic from "@anthropic-ai/sdk";
const client = new Anthropic();
// POST: { jd: string, resume: string }
// Returns: { score: number, matchedKeywords: string[], missingKeywords: string[], strengths: string[], suggestions: string[] }
```

## Skills to Load
```
/frontend-design   ← for UI
/claude-api        ← for API route
```

## Agent Prompt (copy this)
```
Read CLAUDE.md and agents/11-ats-resume-checker.md.
Build the ATS Resume Checker at /ats-resume-checker.
Files: components/tools/ATSResumeChecker.tsx + app/ats-resume-checker/page.tsx + app/api/ats-check/route.ts
```
