// ─────────────────────────────────────────────────────────────────────────
// SINGLE SOURCE OF TRUTH for Indian bank loan interest rates.
// Derived model: RBI_REPO_RATE + per-loan-type spread, instead of 30+
// independent point-rates. Update the repo rate in ONE place when RBI
// changes it; only touch a bank's `spread` when that bank's published
// spread over repo actually changes.
// Always link users to the bank/BankBazaar for the latest official rate.
// ─────────────────────────────────────────────────────────────────────────

// PLACEHOLDER — STILL UNFILLED. Waiting on the confirmed Aug 3–5 MPC
// outcome. While this is 0, the 8 "EBLR-linked-range" majors render a
// "Rate data pending update" fallback instead of a computed range (see
// rangeSentence() below) — do not guess a value here, that fallback
// exists specifically so an unset 0 never displays as a real rate.
export const RBI_REPO_RATE: number = 0; // % p.a.

export const RBI_REPO_RATE_LAST_UPDATED = "2026-08-05"; // post-Aug-5 MPC

export type RateType = "EBLR-linked" | "EBLR-linked-range" | "fixed" | "unavailable";

export interface LoanRate {
  rateType: RateType;
  // EBLR-linked:       effective rate = RBI_REPO_RATE + spread (spread required)
  // EBLR-linked-range: no precise spread — UI shows a canned "repo + 3.0–3.5%" range sentence instead
  // fixed:             effective rate = spread itself (spread holds the flat published rate, not a delta)
  // unavailable:       spread is ignored — UI shows "Contact {bank}" instead of a number
  spread: number | null; // PLACEHOLDER — fill in manually, do not calculate from unverified data
}

export interface BankRate {
  slug: string;          // url-safe bank id
  name: string;          // display name
  shortName: string;     // for compact UI
  category: "PSU" | "Private" | "HFC";
  homeLoan?: LoanRate;    // omit if bank doesn't offer / not tracked
  carLoan?: LoanRate;
  personalLoan?: LoanRate;
}

/** Resolves a LoanRate to a displayable % number. Null for "unavailable" AND "EBLR-linked-range" (no single number) — use getRateDisplay() for UI text. */
export function getEffectiveRate(loan: LoanRate | undefined): number | null {
  if (!loan || loan.rateType === "unavailable" || loan.rateType === "EBLR-linked-range" || loan.spread === null) return null;
  if (loan.rateType === "fixed") return loan.spread;
  return RBI_REPO_RATE + loan.spread;
}

export interface RateDisplay {
  kind: "precise" | "range" | "unavailable";
  rate: number | null;    // only set when kind === "precise"
  shortLabel: string;     // compact form for grid pills, e.g. "8.65%" / "repo+3.0–3.5%" / "Contact bank"
  sentence: string;       // full prose sentence for page copy
}

// EBLR-linked-range spread band over RBI_REPO_RATE, for banks where we know
// they're EBLR-linked but don't have a precise per-bank spread (see
// rate-refactor-report.md). Computed off RBI_REPO_RATE, not hardcoded —
// if RBI_REPO_RATE is still the unset placeholder (0), this renders a
// pending-data fallback instead of a fabricated "3.0%–3.5%".
const RANGE_SPREAD_LOW = 3.0;
const RANGE_SPREAD_HIGH = 3.5;

function rangeShortLabel(): string {
  if (RBI_REPO_RATE === 0) return "Rate pending";
  const low = (RBI_REPO_RATE + RANGE_SPREAD_LOW).toFixed(1);
  const high = (RBI_REPO_RATE + RANGE_SPREAD_HIGH).toFixed(1);
  return `${low}–${high}%`;
}

function rangeSentence(bankName: string): string {
  if (RBI_REPO_RATE === 0) {
    return `Rate data pending update — confirm with ${bankName} directly.`;
  }
  const low = (RBI_REPO_RATE + RANGE_SPREAD_LOW).toFixed(1);
  const high = (RBI_REPO_RATE + RANGE_SPREAD_HIGH).toFixed(1);
  return `Typically ${low}%–${high}% p.a. for well-qualified borrowers — confirm exact rate with ${bankName}.`;
}

/** Single source of truth for how a LoanRate renders anywhere on the site. */
export function getRateDisplay(loan: LoanRate | undefined, bankName: string): RateDisplay | null {
  if (!loan) return null; // loan type not offered by this bank
  if (loan.rateType === "EBLR-linked-range") {
    return { kind: "range", rate: null, shortLabel: rangeShortLabel(), sentence: rangeSentence(bankName) };
  }
  const rate = getEffectiveRate(loan);
  if (rate === null) {
    return { kind: "unavailable", rate: null, shortLabel: "Contact bank", sentence: `Rate not published — contact ${bankName} for current pricing.` };
  }
  return { kind: "precise", rate, shortLabel: `${rate}%`, sentence: `${rate}% p.a.` };
}

// 30 major Indian banks + HFCs. Omit a loan type by leaving the field undefined.
//
// Every entry below defaults to rateType: "unavailable" — every single
// /emi-calculator/[bank]-[loantype] page is noindexed (see
// emi-noindex-report.md: 78/78 bank×loan-type pages, 0 exempted by
// traffic tier) — EXCEPT the 8 majors below (SBI, HDFC, ICICI, Axis,
// Kotak, PNB, Bank of Baroda, Canara), explicitly exempted from the
// noindex-default-unavailable rule and set to "EBLR-linked-range"
// (canned range sentence, no precise spread). Everyone else stays
// "unavailable" / "Contact {bank}". See rate-refactor-report.md.
const unavailable: LoanRate = { rateType: "unavailable", spread: null };
const rangeRate: LoanRate = { rateType: "EBLR-linked-range", spread: null };

export const BANK_RATES: BankRate[] = [
  // ── Public Sector Banks ──
  { slug: "sbi",            name: "State Bank of India",       shortName: "SBI",        category: "PSU",     homeLoan: rangeRate,   carLoan: rangeRate,    personalLoan: rangeRate },
  { slug: "pnb",            name: "Punjab National Bank",      shortName: "PNB",        category: "PSU",     homeLoan: rangeRate,   carLoan: rangeRate,    personalLoan: rangeRate },
  { slug: "bob",            name: "Bank of Baroda",            shortName: "BoB",        category: "PSU",     homeLoan: rangeRate,   carLoan: rangeRate,    personalLoan: rangeRate },
  { slug: "canara",         name: "Canara Bank",               shortName: "Canara",     category: "PSU",     homeLoan: rangeRate,   carLoan: rangeRate,    personalLoan: rangeRate },
  { slug: "union-bank",     name: "Union Bank of India",       shortName: "Union",      category: "PSU",     homeLoan: unavailable, carLoan: unavailable, personalLoan: unavailable },
  { slug: "bank-of-india",  name: "Bank of India",             shortName: "BoI",        category: "PSU",     homeLoan: unavailable, carLoan: unavailable, personalLoan: unavailable },
  { slug: "indian-bank",    name: "Indian Bank",               shortName: "Indian Bank",category: "PSU",     homeLoan: unavailable, carLoan: unavailable, personalLoan: unavailable },
  { slug: "central-bank",   name: "Central Bank of India",     shortName: "CBI",        category: "PSU",     homeLoan: unavailable, carLoan: unavailable, personalLoan: unavailable },
  { slug: "iob",            name: "Indian Overseas Bank",      shortName: "IOB",        category: "PSU",     homeLoan: unavailable, carLoan: unavailable, personalLoan: unavailable },
  { slug: "uco-bank",       name: "UCO Bank",                  shortName: "UCO",        category: "PSU",     homeLoan: unavailable, carLoan: unavailable, personalLoan: unavailable },
  { slug: "bank-of-maha",   name: "Bank of Maharashtra",       shortName: "BoM",        category: "PSU",     homeLoan: unavailable, carLoan: unavailable, personalLoan: unavailable },

  // ── Private Banks ──
  { slug: "hdfc",           name: "HDFC Bank",                 shortName: "HDFC",       category: "Private", homeLoan: rangeRate,   carLoan: rangeRate,    personalLoan: rangeRate },
  { slug: "icici",          name: "ICICI Bank",                shortName: "ICICI",      category: "Private", homeLoan: rangeRate,   carLoan: rangeRate,    personalLoan: rangeRate },
  { slug: "axis",           name: "Axis Bank",                 shortName: "Axis",       category: "Private", homeLoan: rangeRate,   carLoan: rangeRate,    personalLoan: rangeRate },
  { slug: "kotak",          name: "Kotak Mahindra Bank",       shortName: "Kotak",      category: "Private", homeLoan: rangeRate,   carLoan: rangeRate,    personalLoan: rangeRate },
  { slug: "indusind",       name: "IndusInd Bank",             shortName: "IndusInd",   category: "Private", homeLoan: unavailable, carLoan: unavailable, personalLoan: unavailable },
  { slug: "yes-bank",       name: "Yes Bank",                  shortName: "Yes Bank",   category: "Private", homeLoan: unavailable, carLoan: unavailable, personalLoan: unavailable },
  { slug: "idfc-first",     name: "IDFC First Bank",           shortName: "IDFC First", category: "Private", homeLoan: unavailable, carLoan: unavailable, personalLoan: unavailable },
  { slug: "federal-bank",   name: "Federal Bank",              shortName: "Federal",    category: "Private", homeLoan: unavailable, carLoan: unavailable, personalLoan: unavailable },
  { slug: "rbl-bank",       name: "RBL Bank",                  shortName: "RBL",        category: "Private", homeLoan: unavailable, carLoan: unavailable, personalLoan: unavailable },
  { slug: "bandhan-bank",   name: "Bandhan Bank",              shortName: "Bandhan",    category: "Private", homeLoan: unavailable,                        personalLoan: unavailable },
  { slug: "south-indian",   name: "South Indian Bank",         shortName: "SIB",        category: "Private", homeLoan: unavailable, carLoan: unavailable, personalLoan: unavailable },
  { slug: "karur-vysya",    name: "Karur Vysya Bank",          shortName: "KVB",        category: "Private", homeLoan: unavailable, carLoan: unavailable, personalLoan: unavailable },

  // ── Housing Finance Companies / NBFCs ──
  { slug: "lic-housing",    name: "LIC Housing Finance",       shortName: "LIC HFL",    category: "HFC",     homeLoan: unavailable },
  { slug: "pnb-housing",    name: "PNB Housing Finance",       shortName: "PNB Housing",category: "HFC",     homeLoan: unavailable },
  { slug: "bajaj-housing",  name: "Bajaj Housing Finance",     shortName: "Bajaj HFL",  category: "HFC",     homeLoan: unavailable,                        personalLoan: unavailable },
  { slug: "tata-capital",   name: "Tata Capital",              shortName: "Tata Capital",category: "HFC",    homeLoan: unavailable,                        personalLoan: unavailable },
  { slug: "aditya-birla",   name: "Aditya Birla Finance",      shortName: "Aditya Birla",category: "HFC",    homeLoan: unavailable,                        personalLoan: unavailable },
  { slug: "lnt-finance",    name: "L&T Finance",               shortName: "L&T Finance",category: "HFC",                                                   personalLoan: unavailable },
  { slug: "bajaj-finance",  name: "Bajaj Finance",             shortName: "Bajaj",      category: "HFC",                                                   personalLoan: unavailable },
];
