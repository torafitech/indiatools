import { BANK_RATES, type BankRate } from "@/data/bank-rates";

export interface EMIVariant {
  slug: string;
  bank: string;
  rate: number;
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
    const rate = bank[cfg.key];
    if (rate === undefined) return [];
    return [{
      slug: `${bank.slug}-${cfg.suffix}`,
      bank: bank.name,
      rate,
      type: cfg.type,
      defaultAmount: cfg.defaultAmount,
      defaultTenureMonths: cfg.defaultTenureMonths,
      description: `${bank.name} ${cfg.type.toLowerCase()} at ${rate.toFixed(2)}% p.a.`,
    }];
  })
);

// Amount-specific landing pages (no bank — uses a representative market rate).
// STALE RATE - VERIFY: representative market home loan rate 8.65% (all 6 amount variants below)
const amountVariants: EMIVariant[] = [
  { slug: "20-lakh-home-loan", bank: "", rate: 8.65, type: "Home Loan", defaultAmount: 2000000,  defaultTenureMonths: 240, description: "EMI for ₹20 lakh home loan at 8.65% p.a." },
  { slug: "30-lakh-home-loan", bank: "", rate: 8.65, type: "Home Loan", defaultAmount: 3000000,  defaultTenureMonths: 240, description: "EMI for ₹30 lakh home loan at 8.65% p.a." },
  { slug: "40-lakh-home-loan", bank: "", rate: 8.65, type: "Home Loan", defaultAmount: 4000000,  defaultTenureMonths: 240, description: "EMI for ₹40 lakh home loan at 8.65% p.a." },
  { slug: "50-lakh-home-loan", bank: "", rate: 8.65, type: "Home Loan", defaultAmount: 5000000,  defaultTenureMonths: 240, description: "EMI for ₹50 lakh home loan at 8.65% p.a." },
  { slug: "75-lakh-home-loan", bank: "", rate: 8.65, type: "Home Loan", defaultAmount: 7500000,  defaultTenureMonths: 240, description: "EMI for ₹75 lakh home loan at 8.65% p.a." },
  { slug: "1-crore-home-loan", bank: "", rate: 8.65, type: "Home Loan", defaultAmount: 10000000, defaultTenureMonths: 240, description: "EMI for ₹1 crore home loan at 8.65% p.a." },
];

export const emiVariants: EMIVariant[] = [...bankVariants, ...amountVariants];
