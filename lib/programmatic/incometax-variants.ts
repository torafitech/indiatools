import { getCurrentFY } from "@/lib/currentFY";

export interface IncomeTaxVariant {
  slug: string;
  lpa: number;
  grossIncome: number;
  title: string;
  description: string;
  h1: string;
}

const fy = getCurrentFY();

export const incomeTaxVariants: IncomeTaxVariant[] = [
  {
    slug: "10-lpa",
    lpa: 10,
    grossIncome: 1000000,
    title: `Income Tax Calculator for ₹10 LPA — New vs Old Regime FY ${fy}`,
    description: `Calculate income tax on ₹10 LPA salary for FY ${fy}. Compare new vs old regime and find which saves more tax.`,
    h1: "Income Tax on ₹10 LPA — New vs Old Regime",
  },
  {
    slug: "12-lpa",
    lpa: 12,
    grossIncome: 1200000,
    title: `Income Tax Calculator for ₹12 LPA — Zero Tax Under New Regime FY ${fy}`,
    description: "At ₹12 LPA, income tax under new regime is zero due to Section 87A rebate. See full breakdown.",
    h1: "Income Tax on ₹12 LPA — Is It Really Zero Under New Regime?",
  },
  {
    slug: "15-lpa",
    lpa: 15,
    grossIncome: 1500000,
    title: `Income Tax Calculator for ₹15 LPA — New vs Old Regime FY ${fy}`,
    description: `Calculate income tax on ₹15 LPA salary. Compare new and old tax regime for FY ${fy}.`,
    h1: "Income Tax on ₹15 LPA — New vs Old Regime Comparison",
  },
  {
    slug: "20-lpa",
    lpa: 20,
    grossIncome: 2000000,
    title: `Income Tax Calculator for ₹20 LPA — New vs Old Regime FY ${fy}`,
    description: "How much tax on ₹20 LPA? Compare new vs old regime with full deduction breakdown.",
    h1: "Income Tax on ₹20 LPA — When Does Old Regime Win?",
  },
  {
    slug: "25-lpa",
    lpa: 25,
    grossIncome: 2500000,
    title: `Income Tax Calculator for ₹25 LPA — FY ${fy} Complete Breakdown`,
    description: "Income tax calculation for ₹25 LPA salary. Full breakdown: taxable income, deductions, slab-wise tax, cess.",
    h1: `Income Tax on ₹25 LPA — Complete Tax Breakdown FY ${fy}`,
  },
  {
    slug: "30-lpa",
    lpa: 30,
    grossIncome: 3000000,
    title: `Income Tax Calculator for ₹30 LPA — FY ${fy}`,
    description: "Calculate tax on ₹30 LPA income. Compare regimes and see how deductions impact total tax.",
    h1: "Income Tax on ₹30 LPA — Which Regime Saves More?",
  },
  {
    slug: "50-lpa",
    lpa: 50,
    grossIncome: 5000000,
    title: `Income Tax Calculator for ₹50 LPA — Surcharge Applies | FY ${fy}`,
    description: "Tax calculation for ₹50 LPA income. Surcharge kicks in — see full breakdown including surcharge and cess.",
    h1: "Income Tax on ₹50 LPA — Including Surcharge Calculation",
  },
  {
    slug: "75-lpa",
    lpa: 75,
    grossIncome: 7500000,
    title: `Income Tax Calculator for ₹75 LPA — FY ${fy}`,
    description: "Tax on ₹75 LPA with 10% surcharge. New vs old regime comparison with full slab breakdown.",
    h1: "Income Tax on ₹75 LPA — New vs Old Regime with Surcharge",
  },
  {
    slug: "1-crore",
    lpa: 100,
    grossIncome: 10000000,
    title: `Income Tax on ₹1 Crore Salary — FY ${fy}`,
    description: "How much tax on ₹1 crore income? Full breakdown: 15% surcharge, cess, new vs old regime.",
    h1: `Income Tax on ₹1 Crore — Complete Breakdown FY ${fy}`,
  },
];
