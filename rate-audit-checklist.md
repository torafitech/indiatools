# Rate Audit Checklist

Generated: 2026-08-02
Source of truth: `data/bank-rates.ts`
`RATES_LAST_REVIEWED` in that file is currently `"2025-06-01"` — **over 14 months stale** as of today. Every rate below needs manual re-verification against each bank's published rate card before this content goes live. Do not trust these numbers as current.

No rates were changed automatically. Only stale-flag comments (`// STALE RATE - VERIFY: ...`) were added in code so these are easy to find later (`grep -rn "STALE RATE" .`).

## data/bank-rates.ts — 30 banks / HFCs

| Bank | Category | Home Loan | Car Loan | Personal Loan |
|---|---|---|---|---|
| State Bank of India (SBI) | PSU | 8.50% | 9.25% | 12.00% |
| Punjab National Bank (PNB) | PSU | 8.55% | 9.40% | 11.75% |
| Bank of Baroda (BoB) | PSU | 8.60% | 9.15% | 11.40% |
| Canara Bank | PSU | 8.50% | 9.25% | 11.50% |
| Union Bank of India | PSU | 8.50% | 9.25% | 11.35% |
| Bank of India (BoI) | PSU | 8.55% | 9.20% | 11.25% |
| Indian Bank | PSU | 8.60% | 9.30% | 11.50% |
| Central Bank of India (CBI) | PSU | 8.55% | 9.40% | 11.85% |
| Indian Overseas Bank (IOB) | PSU | 8.60% | 9.45% | 12.00% |
| UCO Bank | PSU | 8.60% | 9.40% | 11.90% |
| Bank of Maharashtra (BoM) | PSU | 8.45% | 9.20% | 11.30% |
| HDFC Bank | Private | 8.75% | 9.40% | 11.00% |
| ICICI Bank | Private | 8.75% | 9.30% | 10.85% |
| Axis Bank | Private | 8.75% | 9.35% | 11.25% |
| Kotak Mahindra Bank | Private | 8.70% | 9.50% | 10.99% |
| IndusInd Bank | Private | 8.80% | 9.55% | 11.25% |
| Yes Bank | Private | 8.95% | 9.70% | 11.50% |
| IDFC First Bank | Private | 8.85% | 9.50% | 10.99% |
| Federal Bank | Private | 8.80% | 9.45% | 11.49% |
| RBL Bank | Private | 9.00% | 9.75% | 12.50% |
| Bandhan Bank | Private | 8.85% | — | 11.55% |
| South Indian Bank (SIB) | Private | 8.70% | 9.40% | 11.65% |
| Karur Vysya Bank (KVB) | Private | 8.95% | 9.55% | 11.75% |
| LIC Housing Finance | HFC | 8.65% | — | — |
| PNB Housing Finance | HFC | 8.75% | — | — |
| Bajaj Housing Finance | HFC | 8.70% | — | 13.00% |
| Tata Capital | HFC | 8.75% | — | 11.99% |
| Aditya Birla Finance | HFC | 8.80% | — | 13.00% |
| L&T Finance | HFC | — | — | 12.00% |
| Bajaj Finance | HFC | — | — | 13.00% |

This table drives `lib/programmatic/emi-variants.ts` bank×loan-type pages (`/emi-calculator/[bank]-[loantype]`) automatically — fixing it here fixes every downstream page.

## lib/programmatic/emi-variants.ts — amount-only landing pages

Representative market home loan rate used for the 6 non-bank amount pages (`20-lakh-home-loan`, `30-lakh-home-loan`, `40-lakh-home-loan`, `50-lakh-home-loan`, `75-lakh-home-loan`, `1-crore-home-loan`):

| Value | Used in |
|---|---|
| 8.65% p.a. | All 6 amount-variant slugs |

## app/emi-calculator/page.tsx — FAQ text (duplicated, not pulled from the table above)

"Which bank has the lowest home loan interest rate in India?" FAQ answer hardcodes:

| Bank | Rate |
|---|---|
| SBI | 8.50% |
| HDFC | 8.75% |
| ICICI | 8.75% |
| Kotak Mahindra Bank | 8.70% |

These happen to match `data/bank-rates.ts` today but are a separate hardcoded copy — if you update the table, update this FAQ text too (or refactor it to read from `BANK_RATES` directly — out of scope for this pass since it's calculator-adjacent content, not touched here).

## Action needed before publishing

1. Pull current published rates for all 30 banks/HFCs (home loan, car loan, personal loan where applicable).
2. Update `data/bank-rates.ts` values and bump `RATES_LAST_REVIEWED` to today's date.
3. Update the 8.65% representative rate in `emi-variants.ts` if the market rate has moved.
4. Update the 4 FAQ rates in `app/emi-calculator/page.tsx` to match.
5. Remove the `// STALE RATE - VERIFY` comments once each line is confirmed current.
