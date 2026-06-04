# Session Handoff — UtilSpot

## Current State (2026-06-04)

### All 24 tools LIVE ✅ — committed + pushed to main

| # | Tool | Route | Category | AI | Status |
|---|------|-------|----------|----|--------|
| 01 | EMI Calculator | /emi-calculator | Finance | — | ✅ |
| 02 | Income Tax Calculator | /income-tax-calculator | Finance | — | ✅ |
| 03 | SIP Calculator | /sip-calculator | Finance | — | ✅ |
| 04 | CTC to In-Hand Calculator | /salary-calculator | Finance | — | ✅ |
| 05 | GST Invoice Generator | /invoice-generator | Business | — | ✅ |
| 06 | Construction Cost Estimator | /construction-cost-calculator | Finance | — | ✅ |
| 07 | TDEE Calculator | /tdee-calculator | Health | — | ✅ |
| 08 | Word Counter | /word-counter | Writing | — | ✅ |
| 09 | QR Code Generator | /qr-code-generator | Developer | — | ✅ |
| 10 | AI Business Name Generator | /business-name-generator | Business | ✅ | ✅ |
| 11 | ATS Resume Checker | /ats-resume-checker | Career | ✅ | ✅ |
| 12 | AI Legal Document Generator | /legal-document-generator | Legal | ✅ | ✅ |
| 13 | AI Social Media Calendar | /social-media-calendar | Marketing | ✅ | ✅ |
| 14 | Freelance Rate Calculator | /freelance-rate-calculator | Career | — | ✅ |
| 15 | AI Color Palette Generator | /color-palette-generator | Design | ✅ | ✅ |
| 16 | AI README Generator | /readme-generator | Developer | ✅ | ✅ |
| 17 | Website SEO Analyzer | /seo-analyzer | Developer | — | ✅ |
| 18 | Accessibility Checker | /accessibility-checker | Developer | — | ✅ |
| 19 | Equity & Dilution Calculator | /equity-calculator | Finance | — | ✅ |
| 20 | Email Subject Line Tester | /email-subject-tester | Marketing | ✅ | ✅ |
| 21 | FSSAI Nutrition Label | /nutrition-label-calculator | Health | — | ✅ |
| 22 | Cron Expression Builder | /cron-builder | Developer | — | ✅ |
| 23 | AI Meeting Agenda Generator | /meeting-agenda-generator | Productivity | ✅ | ✅ |
| 24 | Password Generator | /password-generator | Security | — | ✅ |

**8 AI tools** (need `ANTHROPIC_API_KEY`): tools 10–13, 15–16, 20, 23  
**16 pure frontend** (zero API cost): all others

---

## What Needs Doing Next

### Priority 1: Vercel env var
Set `ANTHROPIC_API_KEY` in Vercel → Project → Settings → Environment Variables.
Without it all 8 AI tools return 500.

### Priority 2: AI tool rate limiting (deferred — discussed)
Options:
- `localStorage` daily cap (3 uses/day, no login)
- Per-IP server-side limit
- Show AdSense interstitial before AI result
Decision pending. Brainstorm next session.

### Priority 3: Programmatic SEO pages
Static pages using `generateStaticParams()`:
```
/emi-calculator/sbi-home-loan
/emi-calculator/hdfc-home-loan
/emi-calculator/40-lakh-20-years
/salary-calculator/bangalore
/salary-calculator/hyderabad
/construction-cost-calculator/bangalore
/construction-cost-calculator/hyderabad
```
Pattern: same component, different pre-filled defaults + unique metadata.

### Priority 4: AdSense
Replace `ca-pub-XXXXXXXXXXXXXXXX` in `app/layout.tsx` with real publisher ID once approved.
All AdSlot placeholders already in place on every page.

### Priority 5: Analytics
Add Google Analytics / Vercel Analytics to track which tools get most traffic.

---

## Key Files Reference

```
app/page.tsx                    — tools array (add new tools here)
components/layout/AdSlot.tsx    — ad slot component
components/layout/Header.tsx    — site nav
app/layout.tsx                  — root layout (AdSense script goes here)
agents/HANDOFF.md               — this file (update each session)
CLAUDE.md                       — project rules + coding standards
```

## Git State
- Last commit: `e87c932` — feat: add tools 11-24
- Branch: main
- Remote: https://github.com/torafitech/indiatools.git
- Vercel: auto-deploys on push to main
