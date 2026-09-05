# Session Handoff — UtilSpot

## ⚠️ ACTION NEEDED NOW (blocks pending EMI rate-refactor work)

RBI's monetary policy committee met Aug 3–5, 2026. **Ask the user for the confirmed repo rate outcome first thing this session** — a Phase 2 EMI rate refactor is built, tested, and sitting **uncommitted** in the working tree waiting on it. Do not guess the number, do not search for it — ask.

Once you have it:
1. Set `RBI_REPO_RATE` in `data/bank-rates.ts` (currently `0`, typed `: number` so this is safe) and `RBI_REPO_RATE_LAST_UPDATED` to today's date.
2. Run `npm run build`, confirm the 8 majors (SBI, HDFC, ICICI, Axis, Kotak, PNB, Bank of Baroda, Canara Bank) render a real computed "Typically X%–Y% p.a." range instead of the "Rate data pending update" fallback — spot-check `/emi-calculator/sbi-home-loan` and a couple others.
3. Full context on what this refactor does and why: `/rate-refactor-report.md` (repo root, not yet committed — read it before touching this).
4. Only commit + push after the user explicitly says so (they've been gating every push on this project).

**Uncommitted files right now** (`git status`):
```
M app/emi-calculator/[variant]/page.tsx
M app/emi-calculator/page.tsx
M components/tools/BankRatesTable.tsx
M data/bank-rates.ts
M lib/programmatic/emi-variants.ts
?? rate-refactor-report.md
```
If the user hasn't mentioned the repo rate and asks for something unrelated, that's fine — just don't lose track of this; it's real uncommitted work, not scratch.

---

## Current State (2026-08-03)

### All 24 original tools LIVE, plus several more added since — committed + pushed to main
Tool count has grown past the original 24 (Attendance Calculator, Gold/Jewellery Calculator, New Labour Code Calculator, PF Corpus Calculator, Gratuity Calculator, Full & Final Settlement Calculator, and others — see `app/page.tsx` for the authoritative current list, this table is not exhaustive anymore).

### Recent work (last few sessions, chronological)
- **SEO content-accuracy pass**: fixed hardcoded `2025`/`FY 2025-26` strings across salary/income-tax/labour-code/construction/EMI programmatic templates — added `lib/currentFY.ts` (India Apr–Mar FY helper) as the shared fix instead of hardcoding per-template.
- **EMI bank rates**: flagged (not guessed) every hardcoded rate in `data/bank-rates.ts` — see `/rate-audit-checklist.md`.
- **EMI noindex**: the 78 `/emi-calculator/[bank]-[loantype]` pages (thin, template-only-swap content) are `noindex`; the 6 amount-based pages (`20-lakh-home-loan` etc.) stay indexed. Sitemap regenerated to match. See `/emi-noindex-report.md`.
- **EMI rate disclaimer**: "Rates last verified" notice added near every rate display (small pushed already, live).
- **EMI repo-rate + spread refactor (Phase 2)**: see the blocker section above — this is the in-progress piece.
- **Vercel Analytics**: `<Analytics/>` from `@vercel/analytics/next` wired into `app/layout.tsx`, committed + pushed (`405259b`).

---

## What Needs Doing Next

### Priority 0: RBI repo rate (see blocker above)

### Priority 1: Vercel env var
Set `ANTHROPIC_API_KEY` in Vercel → Project → Settings → Environment Variables.
Without it AI tools return 500. (Verify this is still outstanding — may have been done since this note was last true.)

### Priority 2: AI tool rate limiting (deferred — discussed, decision still pending)
Options: `localStorage` daily cap, per-IP server-side limit, AdSense interstitial before AI result.

### Priority 3: AdSense
Replace `ca-pub-XXXXXXXXXXXXXXXX` in `app/layout.tsx` with real publisher ID once approved.

### Priority 4: Bank rate data for the other 22 banks
`data/bank-rates.ts` has 8 majors on `"EBLR-linked-range"` (generic repo+3.0–3.5% band) and 22 banks/HFCs on `"unavailable"` ("Contact {bank}") because every single bank×loan-type page got noindexed in one pass with no traffic-tier exemption — see `/rate-refactor-report.md` for the full callout. If the user wants specific banks upgraded with real per-bank spreads, that's manual data entry, not something to estimate.

---

## Key Files Reference

```
app/page.tsx                    — tools array (add new tools here)
app/layout.tsx                  — root layout: AdSense script, GA, Vercel Analytics
components/layout/AdSlot.tsx    — ad slot component
components/layout/Header.tsx    — site nav
data/bank-rates.ts              — EMI bank rate source of truth (repo rate + spread model)
lib/currentFY.ts                — India FY helper, use instead of hardcoding years
rate-audit-checklist.md         — bank rates needing manual verification
rate-refactor-report.md         — EMI repo-rate refactor status (uncommitted work, read before touching)
emi-noindex-report.md           — which EMI variant pages are noindexed and why
agents/HANDOFF.md               — this file (update each session)
CLAUDE.md                       — project rules + coding standards
```

## Git State
- Last commit: `405259b` — feat: add Vercel Analytics
- Branch: main
- Remote: https://github.com/torafitech/indiatools.git
- Vercel: auto-deploys on push to main
- **Uncommitted work exists** — see blocker section at top
