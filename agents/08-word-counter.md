# Agent: Word Counter

## Context

**Tool:** Word Counter  
**Route:** `/word-counter`  
**Category:** Writing  
**Purpose:** Real-time word, character, sentence, paragraph, and reading time counter. Keyword density analysis. Useful for bloggers, students, content writers.

## Key Files

```
app/word-counter/page.tsx                ← SEO page (server component)
components/tools/WordCounter.tsx         ← Main UI (client)
```

## Current State (as of 2026-06-04)

- Word count ✓
- Character count (with/without spaces) ✓
- Sentence count ✓
- Paragraph count ✓
- Reading time (avg 200 wpm) ✓
- Keyword density (top 10 words) ✓
- FAQ section ✓

## Stats Calculated

```
Words: text.trim().split(/\s+/).filter(Boolean).length
Chars (with spaces): text.length
Chars (no spaces): text.replace(/\s/g, "").length
Sentences: text.split(/[.!?]+/).filter(Boolean).length
Paragraphs: text.split(/\n{2,}/).filter(Boolean).length
Reading time: Math.ceil(wordCount / 200) minutes
Keyword density: word frequency excluding common stopwords
```

## Skills to Load

```
/frontend-design    ← improve textarea + stats display design
/code-review        ← verify counting edge cases (contractions, hyphenated words)
/run                ← verify real-time counting works
```

## Known Issues

- Reading time assumes 200 wpm — should let user adjust
- Keyword density includes single letters and very short words even with stopwords list
- No copy button for stats
- Textarea loses focus on mobile on re-renders (if using controlled too aggressively)

## Next Improvements

- [ ] Add speaking time (avg 130 wpm for speeches)
- [ ] Add readability score (Flesch-Kincaid)
- [ ] Add "Find & Replace" mini feature
- [ ] Add case converter (UPPER / lower / Title Case / Sentence case)
- [ ] Add copy-to-clipboard for stats summary
- [ ] Add character limit warning (useful for Twitter/LinkedIn bio)

## Agent Prompt (copy this)

```
I'm working on the IndiaTools project at /Users/rafi/Projects/indiatools.
This is a Next.js 14 + Tailwind site with tools for Indian users.

Tool focus: Word Counter
Key files:
- app/word-counter/page.tsx (SEO page)
- components/tools/WordCounter.tsx (UI + counting logic inline)

Design system: Plus Jakarta Sans font, #FFFCF8 bg, #E8500A saffron accent, #0F2447 navy.

First: read CLAUDE.md and agents/08-word-counter.md for context.
Then: [describe your specific task here]
```
