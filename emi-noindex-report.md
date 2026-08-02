# EMI Calculator Noindex Report

Generated: 2026-08-02

`app/emi-calculator/[variant]/page.tsx` `generateMetadata()` now sets
`robots: { index: false, follow: true }` whenever `variant.bank` is set —
that's exactly the 78 bank×loan-type pages below, template-generated
with only bank name and interest rate swapped, no other unique content.
The 6 amount-only pages keep answering a distinct query ("EMI for ₹X
loan") and stay indexed as before.

Logic added:
```ts
...(variant.bank ? { robots: { index: false, follow: true } } : {}),
```

## Kept indexed (6) — /emi-calculator/[amount]-home-loan

| Route | Note |
|---|---|
| /emi-calculator | main tool page |
| /emi-calculator/20-lakh-home-loan | distinct amount query |
| /emi-calculator/30-lakh-home-loan | distinct amount query |
| /emi-calculator/40-lakh-home-loan | distinct amount query |
| /emi-calculator/50-lakh-home-loan | distinct amount query |
| /emi-calculator/75-lakh-home-loan | distinct amount query |
| /emi-calculator/1-crore-home-loan | distinct amount query |

## Noindexed (78) — /emi-calculator/[bank]-[loantype]

| Route | Bank |
|---|---|
| /emi-calculator/sbi-home-loan | State Bank of India |
| /emi-calculator/sbi-car-loan | State Bank of India |
| /emi-calculator/sbi-personal-loan | State Bank of India |
| /emi-calculator/pnb-home-loan | Punjab National Bank |
| /emi-calculator/pnb-car-loan | Punjab National Bank |
| /emi-calculator/pnb-personal-loan | Punjab National Bank |
| /emi-calculator/bob-home-loan | Bank of Baroda |
| /emi-calculator/bob-car-loan | Bank of Baroda |
| /emi-calculator/bob-personal-loan | Bank of Baroda |
| /emi-calculator/canara-home-loan | Canara Bank |
| /emi-calculator/canara-car-loan | Canara Bank |
| /emi-calculator/canara-personal-loan | Canara Bank |
| /emi-calculator/union-bank-home-loan | Union Bank of India |
| /emi-calculator/union-bank-car-loan | Union Bank of India |
| /emi-calculator/union-bank-personal-loan | Union Bank of India |
| /emi-calculator/bank-of-india-home-loan | Bank of India |
| /emi-calculator/bank-of-india-car-loan | Bank of India |
| /emi-calculator/bank-of-india-personal-loan | Bank of India |
| /emi-calculator/indian-bank-home-loan | Indian Bank |
| /emi-calculator/indian-bank-car-loan | Indian Bank |
| /emi-calculator/indian-bank-personal-loan | Indian Bank |
| /emi-calculator/central-bank-home-loan | Central Bank of India |
| /emi-calculator/central-bank-car-loan | Central Bank of India |
| /emi-calculator/central-bank-personal-loan | Central Bank of India |
| /emi-calculator/iob-home-loan | Indian Overseas Bank |
| /emi-calculator/iob-car-loan | Indian Overseas Bank |
| /emi-calculator/iob-personal-loan | Indian Overseas Bank |
| /emi-calculator/uco-bank-home-loan | UCO Bank |
| /emi-calculator/uco-bank-car-loan | UCO Bank |
| /emi-calculator/uco-bank-personal-loan | UCO Bank |
| /emi-calculator/bank-of-maha-home-loan | Bank of Maharashtra |
| /emi-calculator/bank-of-maha-car-loan | Bank of Maharashtra |
| /emi-calculator/bank-of-maha-personal-loan | Bank of Maharashtra |
| /emi-calculator/hdfc-home-loan | HDFC Bank |
| /emi-calculator/hdfc-car-loan | HDFC Bank |
| /emi-calculator/hdfc-personal-loan | HDFC Bank |
| /emi-calculator/icici-home-loan | ICICI Bank |
| /emi-calculator/icici-car-loan | ICICI Bank |
| /emi-calculator/icici-personal-loan | ICICI Bank |
| /emi-calculator/axis-home-loan | Axis Bank |
| /emi-calculator/axis-car-loan | Axis Bank |
| /emi-calculator/axis-personal-loan | Axis Bank |
| /emi-calculator/kotak-home-loan | Kotak Mahindra Bank |
| /emi-calculator/kotak-car-loan | Kotak Mahindra Bank |
| /emi-calculator/kotak-personal-loan | Kotak Mahindra Bank |
| /emi-calculator/indusind-home-loan | IndusInd Bank |
| /emi-calculator/indusind-car-loan | IndusInd Bank |
| /emi-calculator/indusind-personal-loan | IndusInd Bank |
| /emi-calculator/yes-bank-home-loan | Yes Bank |
| /emi-calculator/yes-bank-car-loan | Yes Bank |
| /emi-calculator/yes-bank-personal-loan | Yes Bank |
| /emi-calculator/idfc-first-home-loan | IDFC First Bank |
| /emi-calculator/idfc-first-car-loan | IDFC First Bank |
| /emi-calculator/idfc-first-personal-loan | IDFC First Bank |
| /emi-calculator/federal-bank-home-loan | Federal Bank |
| /emi-calculator/federal-bank-car-loan | Federal Bank |
| /emi-calculator/federal-bank-personal-loan | Federal Bank |
| /emi-calculator/rbl-bank-home-loan | RBL Bank |
| /emi-calculator/rbl-bank-car-loan | RBL Bank |
| /emi-calculator/rbl-bank-personal-loan | RBL Bank |
| /emi-calculator/bandhan-bank-home-loan | Bandhan Bank |
| /emi-calculator/bandhan-bank-personal-loan | Bandhan Bank |
| /emi-calculator/south-indian-home-loan | South Indian Bank |
| /emi-calculator/south-indian-car-loan | South Indian Bank |
| /emi-calculator/south-indian-personal-loan | South Indian Bank |
| /emi-calculator/karur-vysya-home-loan | Karur Vysya Bank |
| /emi-calculator/karur-vysya-car-loan | Karur Vysya Bank |
| /emi-calculator/karur-vysya-personal-loan | Karur Vysya Bank |
| /emi-calculator/lic-housing-home-loan | LIC Housing Finance |
| /emi-calculator/pnb-housing-home-loan | PNB Housing Finance |
| /emi-calculator/bajaj-housing-home-loan | Bajaj Housing Finance |
| /emi-calculator/bajaj-housing-personal-loan | Bajaj Housing Finance |
| /emi-calculator/tata-capital-home-loan | Tata Capital |
| /emi-calculator/tata-capital-personal-loan | Tata Capital |
| /emi-calculator/aditya-birla-home-loan | Aditya Birla Finance |
| /emi-calculator/aditya-birla-personal-loan | Aditya Birla Finance |
| /emi-calculator/lnt-finance-personal-loan | L&T Finance |
| /emi-calculator/bajaj-finance-personal-loan | Bajaj Finance |

**Total EMI routes:** 1 main + 6 indexed variants + 78 noindexed variants = 85.
