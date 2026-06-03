import {
  NEW_REGIME_SLABS_2025, OLD_REGIME_SLABS_2025, OLD_REGIME_SENIOR_SLABS,
  TaxSlab,
  STANDARD_DEDUCTION_NEW, STANDARD_DEDUCTION_OLD,
  MAX_80C, MAX_80D_SELF, MAX_80D_PARENTS,
  REBATE_87A_NEW_LIMIT, REBATE_87A_NEW_MAX,
  REBATE_87A_OLD_LIMIT, REBATE_87A_OLD_MAX,
  HEALTH_CESS_RATE,
} from "@/data/tax-slabs";

export interface TaxInput {
  grossIncome: number;
  age: number;         // determines senior/super-senior brackets
  // Old regime deductions
  hra: number;
  rentPaid: number;
  isMetro: boolean;
  investments80C: number;
  healthInsurance80D: number;
  parentsInsurance80D: number;
  npsContribution: number;
  homeLoanInterest: number;
}

export interface RegimeTaxResult {
  grossIncome: number;
  standardDeduction: number;
  totalDeductions: number;
  taxableIncome: number;
  taxBeforeCess: number;
  rebate87A: number;
  taxAfterRebate: number;
  cess: number;
  totalTax: number;
  effectiveRate: number;
  slabBreakup: { range: string; taxable: number; rate: number; tax: number }[];
}

export interface TaxComparisonResult {
  newRegime: RegimeTaxResult;
  oldRegime: RegimeTaxResult;
  betterRegime: "new" | "old" | "equal";
  savings: number;
}

function calcSlabTax(income: number, slabs: TaxSlab[]): {
  tax: number;
  breakup: { range: string; taxable: number; rate: number; tax: number }[];
} {
  let tax = 0;
  const breakup = [];
  for (const slab of slabs) {
    if (income <= slab.min) break;
    const taxable = Math.min(income, slab.max === Infinity ? income : slab.max) - slab.min;
    const slabTax = taxable * slab.rate;
    tax += slabTax;
    if (slab.rate > 0 && taxable > 0) {
      const maxLabel = slab.max === Infinity ? "above" : `₹${(slab.max / 100000).toFixed(0)}L`;
      breakup.push({
        range: `₹${(slab.min / 100000).toFixed(0)}L – ${maxLabel}`,
        taxable,
        rate: slab.rate * 100,
        tax: Math.round(slabTax),
      });
    }
  }
  return { tax: Math.round(tax), breakup };
}

function calcHRAExemption(grossIncome: number, hra: number, rentPaid: number, isMetro: boolean): number {
  if (hra === 0 || rentPaid === 0) return 0;
  const basicSalary = grossIncome * 0.4;
  return Math.min(
    hra,
    rentPaid - 0.1 * basicSalary,
    isMetro ? 0.5 * basicSalary : 0.4 * basicSalary,
  );
}

function calcNewRegime(input: TaxInput): RegimeTaxResult {
  const standardDeduction = STANDARD_DEDUCTION_NEW;
  const taxableIncome = Math.max(0, input.grossIncome - standardDeduction);

  const { tax: taxBeforeCess, breakup } = calcSlabTax(taxableIncome, NEW_REGIME_SLABS_2025);

  const rebate87A = taxableIncome <= REBATE_87A_NEW_LIMIT
    ? Math.min(taxBeforeCess, REBATE_87A_NEW_MAX)
    : 0;
  const taxAfterRebate = Math.max(0, taxBeforeCess - rebate87A);
  const cess = Math.round(taxAfterRebate * HEALTH_CESS_RATE);
  const totalTax = taxAfterRebate + cess;
  const effectiveRate = input.grossIncome > 0
    ? Math.round((totalTax / input.grossIncome) * 1000) / 10
    : 0;

  return {
    grossIncome: input.grossIncome,
    standardDeduction,
    totalDeductions: standardDeduction,
    taxableIncome,
    taxBeforeCess,
    rebate87A,
    taxAfterRebate,
    cess,
    totalTax,
    effectiveRate,
    slabBreakup: breakup,
  };
}

function calcOldRegime(input: TaxInput): RegimeTaxResult {
  const standardDeduction = STANDARD_DEDUCTION_OLD;
  const hraExemption    = calcHRAExemption(input.grossIncome, input.hra, input.rentPaid, input.isMetro);
  const deduction80C    = Math.min(input.investments80C, MAX_80C);
  const deduction80D    = Math.min(input.healthInsurance80D, MAX_80D_SELF)
                        + Math.min(input.parentsInsurance80D, MAX_80D_PARENTS);
  const deduction80CCD  = Math.min(input.npsContribution, 50000);
  const deduction24b    = Math.min(input.homeLoanInterest, 200000);

  const totalDeductions = standardDeduction + hraExemption + deduction80C
    + deduction80D + deduction80CCD + deduction24b;

  const taxableIncome = Math.max(0, input.grossIncome - totalDeductions);
  const slabs = input.age >= 60 ? OLD_REGIME_SENIOR_SLABS : OLD_REGIME_SLABS_2025;

  const { tax: taxBeforeCess, breakup } = calcSlabTax(taxableIncome, slabs);

  const rebate87A = taxableIncome <= REBATE_87A_OLD_LIMIT
    ? Math.min(taxBeforeCess, REBATE_87A_OLD_MAX)
    : 0;
  const taxAfterRebate = Math.max(0, taxBeforeCess - rebate87A);
  const cess = Math.round(taxAfterRebate * HEALTH_CESS_RATE);
  const totalTax = taxAfterRebate + cess;
  const effectiveRate = input.grossIncome > 0
    ? Math.round((totalTax / input.grossIncome) * 1000) / 10
    : 0;

  return {
    grossIncome: input.grossIncome,
    standardDeduction,
    totalDeductions,
    taxableIncome,
    taxBeforeCess,
    rebate87A,
    taxAfterRebate,
    cess,
    totalTax,
    effectiveRate,
    slabBreakup: breakup,
  };
}

export function compareRegimes(input: TaxInput): TaxComparisonResult {
  const newRegime = calcNewRegime(input);
  const oldRegime = calcOldRegime(input);
  const diff = oldRegime.totalTax - newRegime.totalTax;
  return {
    newRegime,
    oldRegime,
    betterRegime: diff > 0 ? "new" : diff < 0 ? "old" : "equal",
    savings: Math.abs(diff),
  };
}
