# Land Area Converter — Bug Fix Report

Calculator logic, schema structure, and FAQ content untouched, as instructed.

## Bug 1 — Duplicated title tag

**Root cause**: `app/layout.tsx:17-20` sets a metadata title template `"%s | UtilSpot"`, which Next.js appends to every page's `title`. `app/land-area-converter/page.tsx` additionally hardcoded `| UtilSpot` inside its own title string — so the template appended a second copy, producing the reported `"... & More | UtilSpot | UtilSpot"`.

**File fixed**: `app/land-area-converter/page.tsx` (line 8) — removed the hardcoded `| UtilSpot` suffix. Title now renders once via the layout template, matching the convention every other tool page on the site already follows (none of them hardcode the suffix).

**Other 5 routes checked**: karnataka, telangana-andhra-pradesh, tamil-nadu, west-bengal, uttar-pradesh-bihar — their titles come from `metaTitle` strings in `lib/programmatic/land-area-variants.ts`, none of which had the suffix hardcoded. They were already clean, confirmed by rendering all 6 titles post-fix:

```
/land-area-converter                        → ...Cent & More | UtilSpot
/land-area-converter/karnataka               → ...Sq Ft, Acre | UtilSpot
/land-area-converter/telangana-andhra-pradesh → ...Ankanam to Sq Ft | UtilSpot
/land-area-converter/tamil-nadu              → ...Square Feet, Acre | UtilSpot
/land-area-converter/west-bengal             → ...Acre Conversion | UtilSpot
/land-area-converter/uttar-pradesh-bihar     → ...Acre Conversion | UtilSpot
```

Each has exactly one `| UtilSpot`.

## Bug 2 — Missing reciprocal internal links

**Root cause, two parts**:

1. `app/construction-cost-calculator/[variant]/page.tsx` only rendered the land-area-converter cross-link section when a matching state variant was found (`{landVariant && (...)}`). For any city whose state has no dedicated variant page, the section silently didn't render — zero link, not even to the main converter.
2. `lib/programmatic/land-area-variants.ts`'s `constructionCitySlugs` arrays were incomplete: **Tiruchirappalli** (Tamil Nadu) and **Meerut** (Uttar Pradesh) exist in `data/cities.ts` but were left out of the tamil-nadu and uttar-pradesh-bihar variants respectively, so those two cities fell through to "no link" even though their state variant exists.

**Fixes**:
- `lib/programmatic/land-area-variants.ts`: added `"tiruchirappalli"` to the tamil-nadu variant and `"meerut"` to the uttar-pradesh-bihar variant.
- `app/construction-cost-calculator/[variant]/page.tsx`: removed the conditional wrapper — the section now always renders. When a state variant matches, it links there; otherwise it falls back to the main `/land-area-converter` page with generic copy ("Land Area Unit Converter").

**Cities updated with links** (all 30 in `data/cities.ts` now have an outbound link):

| Mapped to a state variant (14) | Falls back to main converter (16) |
|---|---|
| bangalore, mysuru, mangaluru → karnataka | mumbai, pune, nagpur, nashik (Maharashtra) |
| hyderabad, visakhapatnam → telangana-andhra-pradesh | delhi |
| chennai, coimbatore, madurai, tiruchirappalli → tamil-nadu | ahmedabad, surat, vadodara (Gujarat) |
| kolkata → west-bengal | jaipur (Rajasthan) |
| lucknow, agra, meerut, patna → uttar-pradesh-bihar | chandigarh (Punjab) |
| | kochi (Kerala) |
| | indore, bhopal (Madhya Pradesh) |
| | bhubaneswar (Odisha) |
| | guwahati (Assam) |
| | faridabad (Haryana) |

**Gap flagged for you**: Maharashtra is the biggest fallback group — 4 cities (Mumbai, Pune, Nagpur, Nashik) with no dedicated Bigha/Guntha variant. Maharashtra's Guntha is already covered by the "standard" region value in the converter (same 1,089 sq ft as Karnataka), so a Maharashtra page would mostly need its own Bigha figure if it has one worth documenting — otherwise it'd risk being the "templated filler" pattern you told me to avoid originally. Your call on whether it's worth a 6th variant.

## Verification
- `tsc --noEmit`: clean
- `next build`: clean, all 209 routes built, no new errors
- `next start` smoke test:
  - All 6 land-area-converter titles confirmed single `| UtilSpot` suffix (shown above)
  - Tiruchirappalli → `/land-area-converter/tamil-nadu` (200)
  - Meerut → `/land-area-converter/uttar-pradesh-bihar` (200)
  - Mumbai → `/land-area-converter` (200, fallback working)
  - Kochi → `/land-area-converter` (200, fallback working)

## Not pushed
Waiting on your review.
