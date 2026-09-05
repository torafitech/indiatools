import { BANK_RATES, getRateDisplay, type BankRate, type RateType } from "@/data/bank-rates";

export interface EMIVariant {
  slug: string;
  bank: string;
  rate: number;         // numeric value fed to the calculator's slider default — 0 when unavailable/range, never shown as a factual claim on its own
  rateType: RateType;   // precise ("EBLR-linked"/"fixed") / "EBLR-linked-range" / "unavailable"
  rateSentence: string; // single source of truth for the rate prose — from getRateDisplay(), don't re-derive elsewhere
  type: string;
  defaultAmount: number;
  defaultTenureMonths: number;
  description: string;
}

interface LoanTypeConfig {
  key: keyof Pick<BankRate, "homeLoan" | "carLoan" | "personalLoan">;
  type: string;
  suffix: string;           // url suffix: sbi-home-loan
  defaultAmount: number;
  defaultTenureMonths: number;
}

const LOAN_CONFIGS: LoanTypeConfig[] = [
  { key: "homeLoan",     type: "Home Loan",     suffix: "home-loan",     defaultAmount: 3000000, defaultTenureMonths: 240 },
  { key: "carLoan",      type: "Car Loan",      suffix: "car-loan",      defaultAmount: 700000,  defaultTenureMonths: 60  },
  { key: "personalLoan", type: "Personal Loan", suffix: "personal-loan", defaultAmount: 500000,  defaultTenureMonths: 48  },
];

// Generate one variant per (bank × loan type) where the bank offers that loan.
const bankVariants: EMIVariant[] = BANK_RATES.flatMap((bank) =>
  LOAN_CONFIGS.flatMap((cfg) => {
    const loan = bank[cfg.key];
    if (loan === undefined) return [];
    const display = getRateDisplay(loan, bank.name);
    const sentence = display?.sentence ?? "Rate unavailable — contact bank for current pricing.";
    return [{
      slug: `${bank.slug}-${cfg.suffix}`,
      bank: bank.name,
      rate: display?.rate ?? 0,
      rateType: loan.rateType,
      rateSentence: sentence,
      type: cfg.type,
      defaultAmount: cfg.defaultAmount,
      defaultTenureMonths: cfg.defaultTenureMonths,
      description: `${bank.name} ${cfg.type.toLowerCase()} — ${sentence}`,
    }];
  })
);

// Amount-specific landing pages (no bank — uses a representative market rate).
// STALE RATE - VERIFY: representative market home loan rate 8.65% (all 6 amount variants below)
const amountVariants: EMIVariant[] = [
  { slug: "20-lakh-home-loan", bank: "", rate: 8.65, rateType: "fixed", rateSentence: "8.65% p.a.", type: "Home Loan", defaultAmount: 2000000,  defaultTenureMonths: 240, description: "EMI for ₹20 lakh home loan at 8.65% p.a." },
  { slug: "30-lakh-home-loan", bank: "", rate: 8.65, rateType: "fixed", rateSentence: "8.65% p.a.", type: "Home Loan", defaultAmount: 3000000,  defaultTenureMonths: 240, description: "EMI for ₹30 lakh home loan at 8.65% p.a." },
  { slug: "40-lakh-home-loan", bank: "", rate: 8.65, rateType: "fixed", rateSentence: "8.65% p.a.", type: "Home Loan", defaultAmount: 4000000,  defaultTenureMonths: 240, description: "EMI for ₹40 lakh home loan at 8.65% p.a." },
  { slug: "50-lakh-home-loan", bank: "", rate: 8.65, rateType: "fixed", rateSentence: "8.65% p.a.", type: "Home Loan", defaultAmount: 5000000,  defaultTenureMonths: 240, description: "EMI for ₹50 lakh home loan at 8.65% p.a." },
  { slug: "75-lakh-home-loan", bank: "", rate: 8.65, rateType: "fixed", rateSentence: "8.65% p.a.", type: "Home Loan", defaultAmount: 7500000,  defaultTenureMonths: 240, description: "EMI for ₹75 lakh home loan at 8.65% p.a." },
  { slug: "1-crore-home-loan", bank: "", rate: 8.65, rateType: "fixed", rateSentence: "8.65% p.a.", type: "Home Loan", defaultAmount: 10000000, defaultTenureMonths: 240, description: "EMI for ₹1 crore home loan at 8.65% p.a." },
];

export const emiVariants: EMIVariant[] = [...bankVariants, ...amountVariants];
