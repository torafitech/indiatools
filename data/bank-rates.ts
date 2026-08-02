// ─────────────────────────────────────────────────────────────────────────
// SINGLE SOURCE OF TRUTH for Indian bank loan interest rates.
// Update this table quarterly (or via the rate-review agent draft + approve).
// Rates are indicative starting rates (p.a.) for salaried borrowers, CIBIL 750+.
// Always link users to the bank/BankBazaar for the latest official rate.
// ─────────────────────────────────────────────────────────────────────────

export const RATES_LAST_REVIEWED = "2025-06-01"; // YYYY-MM-DD — bump every quarter

export interface BankRate {
  slug: string;          // url-safe bank id
  name: string;          // display name
  shortName: string;     // for compact UI
  category: "PSU" | "Private" | "HFC";
  homeLoan?: number;     // % p.a. — omit if bank doesn't offer / not tracked
  carLoan?: number;
  personalLoan?: number;
}

// 30 major Indian banks + HFCs. Omit a loan type by leaving the field undefined.
export const BANK_RATES: BankRate[] = [
  // ── Public Sector Banks ──
  { slug: "sbi",            name: "State Bank of India",       shortName: "SBI",        category: "PSU",     homeLoan: 8.50, carLoan: 9.25, personalLoan: 12.00 }, // STALE RATE - VERIFY: State Bank of India — homeLoan 8.50%, carLoan 9.25%, personalLoan 12.00%
  { slug: "pnb",            name: "Punjab National Bank",      shortName: "PNB",        category: "PSU",     homeLoan: 8.55, carLoan: 9.40, personalLoan: 11.75 }, // STALE RATE - VERIFY: Punjab National Bank — homeLoan 8.55%, carLoan 9.40%, personalLoan 11.75%
  { slug: "bob",            name: "Bank of Baroda",            shortName: "BoB",        category: "PSU",     homeLoan: 8.60, carLoan: 9.15, personalLoan: 11.40 }, // STALE RATE - VERIFY: Bank of Baroda — homeLoan 8.60%, carLoan 9.15%, personalLoan 11.40%
  { slug: "canara",         name: "Canara Bank",               shortName: "Canara",     category: "PSU",     homeLoan: 8.50, carLoan: 9.25, personalLoan: 11.50 }, // STALE RATE - VERIFY: Canara Bank — homeLoan 8.50%, carLoan 9.25%, personalLoan 11.50%
  { slug: "union-bank",     name: "Union Bank of India",       shortName: "Union",      category: "PSU",     homeLoan: 8.50, carLoan: 9.25, personalLoan: 11.35 }, // STALE RATE - VERIFY: Union Bank of India — homeLoan 8.50%, carLoan 9.25%, personalLoan 11.35%
  { slug: "bank-of-india",  name: "Bank of India",             shortName: "BoI",        category: "PSU",     homeLoan: 8.55, carLoan: 9.20, personalLoan: 11.25 }, // STALE RATE - VERIFY: Bank of India — homeLoan 8.55%, carLoan 9.20%, personalLoan 11.25%
  { slug: "indian-bank",    name: "Indian Bank",               shortName: "Indian Bank",category: "PSU",     homeLoan: 8.60, carLoan: 9.30, personalLoan: 11.50 }, // STALE RATE - VERIFY: Indian Bank — homeLoan 8.60%, carLoan 9.30%, personalLoan 11.50%
  { slug: "central-bank",   name: "Central Bank of India",     shortName: "CBI",        category: "PSU",     homeLoan: 8.55, carLoan: 9.40, personalLoan: 11.85 }, // STALE RATE - VERIFY: Central Bank of India — homeLoan 8.55%, carLoan 9.40%, personalLoan 11.85%
  { slug: "iob",            name: "Indian Overseas Bank",      shortName: "IOB",        category: "PSU",     homeLoan: 8.60, carLoan: 9.45, personalLoan: 12.00 }, // STALE RATE - VERIFY: Indian Overseas Bank — homeLoan 8.60%, carLoan 9.45%, personalLoan 12.00%
  { slug: "uco-bank",       name: "UCO Bank",                  shortName: "UCO",        category: "PSU",     homeLoan: 8.60, carLoan: 9.40, personalLoan: 11.90 }, // STALE RATE - VERIFY: UCO Bank — homeLoan 8.60%, carLoan 9.40%, personalLoan 11.90%
  { slug: "bank-of-maha",   name: "Bank of Maharashtra",       shortName: "BoM",        category: "PSU",     homeLoan: 8.45, carLoan: 9.20, personalLoan: 11.30 }, // STALE RATE - VERIFY: Bank of Maharashtra — homeLoan 8.45%, carLoan 9.20%, personalLoan 11.30%

  // ── Private Banks ──
  { slug: "hdfc",           name: "HDFC Bank",                 shortName: "HDFC",       category: "Private", homeLoan: 8.75, carLoan: 9.40, personalLoan: 11.00 }, // STALE RATE - VERIFY: HDFC Bank — homeLoan 8.75%, carLoan 9.40%, personalLoan 11.00%
  { slug: "icici",          name: "ICICI Bank",                shortName: "ICICI",      category: "Private", homeLoan: 8.75, carLoan: 9.30, personalLoan: 10.85 }, // STALE RATE - VERIFY: ICICI Bank — homeLoan 8.75%, carLoan 9.30%, personalLoan 10.85%
  { slug: "axis",           name: "Axis Bank",                 shortName: "Axis",       category: "Private", homeLoan: 8.75, carLoan: 9.35, personalLoan: 11.25 }, // STALE RATE - VERIFY: Axis Bank — homeLoan 8.75%, carLoan 9.35%, personalLoan 11.25%
  { slug: "kotak",          name: "Kotak Mahindra Bank",       shortName: "Kotak",      category: "Private", homeLoan: 8.70, carLoan: 9.50, personalLoan: 10.99 }, // STALE RATE - VERIFY: Kotak Mahindra Bank — homeLoan 8.70%, carLoan 9.50%, personalLoan 10.99%
  { slug: "indusind",       name: "IndusInd Bank",             shortName: "IndusInd",   category: "Private", homeLoan: 8.80, carLoan: 9.55, personalLoan: 11.25 }, // STALE RATE - VERIFY: IndusInd Bank — homeLoan 8.80%, carLoan 9.55%, personalLoan 11.25%
  { slug: "yes-bank",       name: "Yes Bank",                  shortName: "Yes Bank",   category: "Private", homeLoan: 8.95, carLoan: 9.70, personalLoan: 11.50 }, // STALE RATE - VERIFY: Yes Bank — homeLoan 8.95%, carLoan 9.70%, personalLoan 11.50%
  { slug: "idfc-first",     name: "IDFC First Bank",           shortName: "IDFC First", category: "Private", homeLoan: 8.85, carLoan: 9.50, personalLoan: 10.99 }, // STALE RATE - VERIFY: IDFC First Bank — homeLoan 8.85%, carLoan 9.50%, personalLoan 10.99%
  { slug: "federal-bank",   name: "Federal Bank",              shortName: "Federal",    category: "Private", homeLoan: 8.80, carLoan: 9.45, personalLoan: 11.49 }, // STALE RATE - VERIFY: Federal Bank — homeLoan 8.80%, carLoan 9.45%, personalLoan 11.49%
  { slug: "rbl-bank",       name: "RBL Bank",                  shortName: "RBL",        category: "Private", homeLoan: 9.00, carLoan: 9.75, personalLoan: 12.50 }, // STALE RATE - VERIFY: RBL Bank — homeLoan 9.00%, carLoan 9.75%, personalLoan 12.50%
  { slug: "bandhan-bank",   name: "Bandhan Bank",              shortName: "Bandhan",    category: "Private", homeLoan: 8.85,                personalLoan: 11.55 }, // STALE RATE - VERIFY: Bandhan Bank — homeLoan 8.85%, personalLoan 11.55%
  { slug: "south-indian",   name: "South Indian Bank",         shortName: "SIB",        category: "Private", homeLoan: 8.70, carLoan: 9.40, personalLoan: 11.65 }, // STALE RATE - VERIFY: South Indian Bank — homeLoan 8.70%, carLoan 9.40%, personalLoan 11.65%
  { slug: "karur-vysya",    name: "Karur Vysya Bank",          shortName: "KVB",        category: "Private", homeLoan: 8.95, carLoan: 9.55, personalLoan: 11.75 }, // STALE RATE - VERIFY: Karur Vysya Bank — homeLoan 8.95%, carLoan 9.55%, personalLoan 11.75%

  // ── Housing Finance Companies / NBFCs ──
  { slug: "lic-housing",    name: "LIC Housing Finance",       shortName: "LIC HFL",    category: "HFC",     homeLoan: 8.65 }, // STALE RATE - VERIFY: LIC Housing Finance — homeLoan 8.65%
  { slug: "pnb-housing",    name: "PNB Housing Finance",       shortName: "PNB Housing",category: "HFC",     homeLoan: 8.75 }, // STALE RATE - VERIFY: PNB Housing Finance — homeLoan 8.75%
  { slug: "bajaj-housing",  name: "Bajaj Housing Finance",     shortName: "Bajaj HFL",  category: "HFC",     homeLoan: 8.70, personalLoan: 13.00 }, // STALE RATE - VERIFY: Bajaj Housing Finance — homeLoan 8.70%, personalLoan 13.00%
  { slug: "tata-capital",   name: "Tata Capital",              shortName: "Tata Capital",category: "HFC",    homeLoan: 8.75, personalLoan: 11.99 }, // STALE RATE - VERIFY: Tata Capital — homeLoan 8.75%, personalLoan 11.99%
  { slug: "aditya-birla",   name: "Aditya Birla Finance",      shortName: "Aditya Birla",category: "HFC",    homeLoan: 8.80, personalLoan: 13.00 }, // STALE RATE - VERIFY: Aditya Birla Finance — homeLoan 8.80%, personalLoan 13.00%
  { slug: "lnt-finance",    name: "L&T Finance",               shortName: "L&T Finance",category: "HFC",                    personalLoan: 12.00 }, // STALE RATE - VERIFY: L&T Finance — personalLoan 12.00%
  { slug: "bajaj-finance",  name: "Bajaj Finance",             shortName: "Bajaj",      category: "HFC",                    personalLoan: 13.00 }, // STALE RATE - VERIFY: Bajaj Finance — personalLoan 13.00%
];
