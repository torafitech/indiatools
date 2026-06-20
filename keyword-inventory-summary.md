# Keyword Inventory Summary — UtilSpot.app

**Audit date:** 2026-06-20
**Source:** Read-only scan of `/Users/rafi/Projects/indiatools`

---

## Page Counts

| Category | Count |
|---|---|
| Home page | 1 |
| Static tool pages (indexed) | 22 |
| Static tool pages (noindex) | 8 |
| Utility pages (about / contact / privacy / terms) | 4 |
| EMI Calculator programmatic sub-pages | 84 |
| Salary Calculator programmatic sub-pages | 20 |
| Construction Cost programmatic sub-pages | 30 |
| Income Tax programmatic sub-pages | 9 |
| New Labour Code programmatic sub-pages | 12 |
| **TOTAL** | **190** |

---

## Completeness Check

| Field | Pages missing |
|---|---|
| title | **0** |
| meta_description | **0** |
| H1 | **0** |

No pages are missing any of the three critical SEO fields.

---

## noindex Pages

8 pages are marked noindex and correctly excluded from `public/sitemap.xml`:

| Route | Likely reason |
|---|---|
| `/ats-resume-checker` | AI-powered — Claude API cost gating |
| `/business-name-generator` | AI-powered |
| `/color-palette-generator` | AI-powered |
| `/email-subject-tester` | AI-powered |
| `/legal-document-generator` | AI-powered |
| `/meeting-agenda-generator` | AI-powered |
| `/readme-generator` | AI-powered |
| `/social-media-calendar` | AI-powered |

All 8 use `robots: { index: false, follow: false }` or `robots: "noindex, nofollow"` in metadata.

---

## FAQPage Schema Coverage

| Group | Pages | Has FAQPage |
|---|---|---|
| Static tool pages (indexed) | 22 | 18 (82%) |
| Static tool pages (noindex) | 8 | 8 (100% — but irrelevant, noindex) |
| Home page | 1 | 0 |
| Utility pages | 4 | 0 |
| EMI programmatic sub-pages | 84 | 0 |
| Salary programmatic sub-pages | 20 | 0 |
| Construction Cost programmatic sub-pages | 30 | 0 |
| Income Tax programmatic sub-pages | 9 | 0 |
| Labour Code programmatic sub-pages | 12 | 0 |

**Pages with NO FAQPage schema: 160** (all 155 programmatic sub-pages + home + 4 utility pages)

Static indexed pages missing FAQPage: **4**
- `/salary-calculator` — has FAQ H2 but no FAQPage JSON-LD (verify)
- `/gratuity-calculator` — has FAQ H2 but confirm FAQPage JSON-LD present
- `/new-labour-code-calculator` — has FAQPage (6 Qs confirmed)
- `/construction-cost-calculator` — has FAQPage confirmed

> Note: programmatic sub-pages not having FAQPage is a deliberate trade-off (thin pages). Adding FAQPage schema to even the top 20 highest-traffic programmatic pages would improve rich result eligibility.

---

## BreadcrumbList Schema Coverage

Pages with BreadcrumbList:
- `/emi-calculator`, `/income-tax-calculator`, `/salary-calculator`, `/sip-calculator`, `/word-counter`, `/tdee-calculator`, `/invoice-generator`, `/construction-cost-calculator`, `/pf-calculator`, `/gratuity-calculator`, `/new-labour-code-calculator`, `/full-final-settlement-calculator`, `/gold-jewellery-calculator`, `/attendance-calculator`, `/accessibility-checker`, `/cron-builder`, `/equity-calculator`, `/freelance-rate-calculator`, `/nutrition-label-calculator`, `/password-generator`, `/qr-code-generator`, `/seo-analyzer`

Pages with WebApplication+FAQPage but **no BreadcrumbList** (gap):
- `/ats-resume-checker` (noindex — low priority)
- `/business-name-generator` (noindex)
- `/color-palette-generator` (noindex)
- `/email-subject-tester` (noindex)
- `/legal-document-generator` (noindex)
- `/meeting-agenda-generator` (noindex)
- `/readme-generator` (noindex)
- `/social-media-calendar` (noindex)

All programmatic sub-pages: WebApplication only, no BreadcrumbList.

---

## Duplicate Primary Keywords (Cannibalization Risk)

These keyword families have a parent page + multiple programmatic sub-pages targeting overlapping terms:

### 1. "EMI calculator" family — HIGH RISK
- Parent: `/emi-calculator` → "EMI calculator India"
- 84 sub-pages → "[Bank] home/car/personal loan EMI calculator"
- **Risk level:** LOW-MEDIUM. Sub-pages differentiated by bank name + loan type. The parent should rank for "EMI calculator" (generic); sub-pages target long-tail "[bank] [loan type] EMI calculator" which are distinct enough. Monitor if parent drops when sub-pages go live.

### 2. "Income tax calculator" family — MEDIUM RISK
- Parent: `/income-tax-calculator` → "income tax calculator FY 2025-26"
- 9 sub-pages → "income tax on [X] LPA"
- **Risk level:** LOW. LPA variants target informational queries ("how much tax on 15 LPA"), not the same as the parent tool query. Different intent.

### 3. "Salary calculator" / "CTC to in-hand" family — MEDIUM RISK
- Parent: `/salary-calculator` → "CTC to in-hand salary calculator"
- 12 LPA sub-pages → "[X] LPA salary calculator India"
- 8 city sub-pages → "[City] salary calculator"
- **Risk level:** MEDIUM. "12 LPA salary calculator" vs "CTC salary calculator" — similar intent. Watch for the parent losing visibility to its own variants.

### 4. "New Labour Code calculator" family — LOW RISK
- Parent: `/new-labour-code-calculator`
- 12 LPA sub-pages
- **Risk level:** LOW. LPA variants are clearly informational; the parent is the conversion page.

### 5. "Construction cost calculator" family — LOW RISK
- Parent: `/construction-cost-calculator`
- 30 city sub-pages → "construction cost per sqft [city]"
- **Risk level:** LOW. City terms are distinct geographically; the parent targets generic "India" query.

---

## Missing Canonical Patterns

All static tool pages have proper `alternates: { canonical: "..." }` set. All programmatic sub-pages set canonical via `generateMetadata()`.

**Utility pages (about / contact / privacy-policy / terms):** Confirm canonical is set. These pages are low-value so not critical, but should have canonical to prevent soft-duplicate signals.

---

## Sitemap

- `public/sitemap.xml` is **static** (not dynamically generated via Next.js)
- Contains **182 URLs**
- All 8 noindex pages are correctly excluded
- Sitemap needs **manual update** whenever new pages/variants are added — there is no automatic generation

**Action needed:** Switch to dynamic sitemap generation (`app/sitemap.ts`) to prevent sitemap from going stale as new programmatic pages are added.

---

## Priority Recommendations

1. **Sitemap:** Switch from static XML to `app/sitemap.ts` — static file will drift as routes change.
2. **FAQPage on top programmatic pages:** Add to at least the 10 highest-traffic EMI variant pages (SBI, HDFC, ICICI home loan) and top salary LPA variants (10-lpa, 15-lpa, 20-lpa) to increase rich result eligibility.
3. **Salary calculator cannibalization:** Monitor GSC impressions on `/salary-calculator` after salary LPA sub-pages index. If parent loses clicks, add clearer differentiation (e.g., parent meta should emphasize "custom" while LPA pages are "pre-filled for [X] LPA").
4. **BreadcrumbList on programmatic sub-pages:** Low effort, signals clear hierarchy to Google. All sub-pages should have `Home > [Parent Tool] > [Variant]` breadcrumb JSON-LD.
5. **Utility page canonicals:** Verify about/contact/privacy/terms pages have `alternates.canonical` set.
