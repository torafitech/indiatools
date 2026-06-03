export interface EMIVariant {
  slug: string;
  bank: string;
  rate: number;
  type: string;
  defaultAmount: number;
  defaultTenureMonths: number;
  description: string;
}

export const emiVariants: EMIVariant[] = [
  // Home Loans
  { slug: "sbi-home-loan", bank: "SBI", rate: 8.50, type: "Home Loan", defaultAmount: 3000000, defaultTenureMonths: 240, description: "State Bank of India home loan at 8.50% p.a." },
  { slug: "hdfc-home-loan", bank: "HDFC Bank", rate: 8.75, type: "Home Loan", defaultAmount: 3000000, defaultTenureMonths: 240, description: "HDFC Bank home loan at 8.75% p.a." },
  { slug: "icici-home-loan", bank: "ICICI Bank", rate: 8.75, type: "Home Loan", defaultAmount: 3000000, defaultTenureMonths: 240, description: "ICICI Bank home loan at 8.75% p.a." },
  { slug: "axis-home-loan", bank: "Axis Bank", rate: 8.75, type: "Home Loan", defaultAmount: 3000000, defaultTenureMonths: 240, description: "Axis Bank home loan at 8.75% p.a." },
  { slug: "kotak-home-loan", bank: "Kotak Mahindra Bank", rate: 8.70, type: "Home Loan", defaultAmount: 3000000, defaultTenureMonths: 240, description: "Kotak Mahindra Bank home loan at 8.70% p.a." },
  { slug: "pnb-home-loan", bank: "Punjab National Bank", rate: 8.55, type: "Home Loan", defaultAmount: 3000000, defaultTenureMonths: 240, description: "Punjab National Bank home loan at 8.55% p.a." },
  { slug: "bob-home-loan", bank: "Bank of Baroda", rate: 8.60, type: "Home Loan", defaultAmount: 3000000, defaultTenureMonths: 240, description: "Bank of Baroda home loan at 8.60% p.a." },
  { slug: "lic-home-loan", bank: "LIC Housing Finance", rate: 8.65, type: "Home Loan", defaultAmount: 3000000, defaultTenureMonths: 240, description: "LIC Housing Finance home loan at 8.65% p.a." },

  // Car Loans
  { slug: "sbi-car-loan", bank: "SBI", rate: 9.25, type: "Car Loan", defaultAmount: 700000, defaultTenureMonths: 60, description: "State Bank of India car loan at 9.25% p.a." },
  { slug: "hdfc-car-loan", bank: "HDFC Bank", rate: 9.40, type: "Car Loan", defaultAmount: 700000, defaultTenureMonths: 60, description: "HDFC Bank car loan at 9.40% p.a." },
  { slug: "icici-car-loan", bank: "ICICI Bank", rate: 9.30, type: "Car Loan", defaultAmount: 700000, defaultTenureMonths: 60, description: "ICICI Bank car loan at 9.30% p.a." },
  { slug: "axis-car-loan", bank: "Axis Bank", rate: 9.35, type: "Car Loan", defaultAmount: 700000, defaultTenureMonths: 60, description: "Axis Bank car loan at 9.35% p.a." },
  { slug: "kotak-car-loan", bank: "Kotak Mahindra Bank", rate: 9.50, type: "Car Loan", defaultAmount: 700000, defaultTenureMonths: 60, description: "Kotak Mahindra Bank car loan at 9.50% p.a." },

  // Personal Loans
  { slug: "sbi-personal-loan", bank: "SBI", rate: 12.00, type: "Personal Loan", defaultAmount: 500000, defaultTenureMonths: 48, description: "State Bank of India personal loan at 12% p.a." },
  { slug: "hdfc-personal-loan", bank: "HDFC Bank", rate: 11.00, type: "Personal Loan", defaultAmount: 500000, defaultTenureMonths: 48, description: "HDFC Bank personal loan at 11% p.a." },
  { slug: "icici-personal-loan", bank: "ICICI Bank", rate: 10.85, type: "Personal Loan", defaultAmount: 500000, defaultTenureMonths: 48, description: "ICICI Bank personal loan at 10.85% p.a." },
  { slug: "axis-personal-loan", bank: "Axis Bank", rate: 11.25, type: "Personal Loan", defaultAmount: 500000, defaultTenureMonths: 48, description: "Axis Bank personal loan at 11.25% p.a." },
  { slug: "bajaj-personal-loan", bank: "Bajaj Finance", rate: 13.00, type: "Personal Loan", defaultAmount: 500000, defaultTenureMonths: 48, description: "Bajaj Finance personal loan at 13% p.a." },

  // Amount-based pages
  { slug: "30-lakh-home-loan", bank: "", rate: 8.75, type: "Home Loan", defaultAmount: 3000000, defaultTenureMonths: 240, description: "EMI for ₹30 lakh home loan at 8.75% p.a." },
  { slug: "50-lakh-home-loan", bank: "", rate: 8.75, type: "Home Loan", defaultAmount: 5000000, defaultTenureMonths: 240, description: "EMI for ₹50 lakh home loan at 8.75% p.a." },
  { slug: "1-crore-home-loan", bank: "", rate: 8.75, type: "Home Loan", defaultAmount: 10000000, defaultTenureMonths: 240, description: "EMI for ₹1 crore home loan at 8.75% p.a." },
];
