# Agent: AI Business Name Generator

## Context

**Tool:** AI Business Name Generator  
**Route:** `/business-name-generator`  
**Category:** Business  
**Purpose:** Generate 10 unique business name ideas with taglines using Claude AI. User inputs industry, keywords, and vibe. Results shown instantly.

## Key Files

```
app/business-name-generator/page.tsx     ← SEO page (server component)
app/api/business-name/route.ts           ← API route calling Claude API
components/tools/BusinessNameGenerator.tsx ← Main UI (client)
```

## AI Integration

Uses Claude claude-sonnet-4-20250514 via Anthropic SDK. API key from `ANTHROPIC_API_KEY` env var.

```ts
// app/api/business-name/route.ts
import Anthropic from "@anthropic-ai/sdk";
const client = new Anthropic();

const response = await client.messages.create({
  model: "claude-sonnet-4-20250514",
  max_tokens: 1024,
  messages: [{ role: "user", content: prompt }]
});
```

## Prompt Template

```
Generate 10 unique, memorable business names for a [industry] business.
Keywords: [keywords]
Vibe: [vibe: professional/playful/modern/traditional]
Target market: Indian customers

For each name, provide:
1. Business name
2. One-line tagline
3. Why it works (1 sentence)

Format as JSON array.
```

## Current State (as of 2026-06-04)

- Industry + keyword + vibe inputs ✓
- Claude API call via Next.js API route ✓
- Results displayed as cards ✓
- FAQ section ✓
- No rate limiting (could be abused)

## Skills to Load

```
/frontend-design    ← improve results card design, loading skeleton
/claude-api         ← improve prompt, add streaming, add prompt caching
/code-review        ← verify API error handling, rate limiting
/run                ← verify API call works, results display correctly
```

## Known Issues

- No rate limiting — single user could spam API and run up costs
- No streaming — waits for full response before showing anything (slow UX)
- No error message for API failure (silent fail)
- Prompt doesn't enforce JSON strictly (sometimes returns prose)

## Next Improvements

- [ ] Add streaming response (show names as they generate)
- [ ] Add rate limiting (IP-based, max 5 requests per hour)
- [ ] Add domain availability check (link to Namecheap search for each name)
- [ ] Add copy button per name
- [ ] Add trademark check link (IP India portal)
- [ ] Add "regenerate" button to get new variations
- [ ] Affiliate: Namecheap / GoDaddy domain link on each name

## Affiliate Opportunity

Domain registration affiliate: each generated name has a "Check Domain →" link:
```
https://www.namecheap.com/domains/registration/results/?domain=[name].com
```
Use `/go/namecheap` redirect with `rel="nofollow noopener sponsored"`.

## Agent Prompt (copy this)

```
I'm working on the IndiaTools project at /Users/rafi/Projects/indiatools.
This is a Next.js 14 + Tailwind site with tools for Indian users.

Tool focus: AI Business Name Generator
Key files:
- app/business-name-generator/page.tsx (SEO page)
- app/api/business-name/route.ts (Claude API route)
- components/tools/BusinessNameGenerator.tsx (UI)

Design system: Plus Jakarta Sans font, #FFFCF8 bg, #E8500A saffron accent, #0F2447 navy.
AI: Claude claude-sonnet-4-20250514 via @anthropic-ai/sdk. API key: ANTHROPIC_API_KEY env var.

First: read CLAUDE.md and agents/10-business-name-generator.md for context.
Then: [describe your specific task here]
```
