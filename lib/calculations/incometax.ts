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
  age: number;
  // Old regime deductions
  hra: number;
  rentPaid: number;
  isMetro: boolean;
  investments80C: number;
  healthInsurance80D: number;
  parentsInsurance80D: number;
  parentsAreSenior: boolean;
  npsContribution: number;
  homeLoanInterest: number;
}

export interface RegimeTaxResult {
  grossIncome: number;
  standardDeduction: number;
  totalDeductions: number;
  taxableIncome: number;
  taxBeforeCess: number;
  surcharge: number;
  rebate87A: number;
  taxAfterRebate: number;
  cess: number;
  totalTax: number;
  effectiveRate: number;
  monthlyTakeHome: number;
  slabBreakup: { range: string; taxable: number; rate: number; tax: number }[];
}

export interface TaxComparisonResult {
  newRegime: RegimeTaxResult;
  oldRegime: RegimeTaxResult;
  betterRegime: "new" | "old" | "equal";
  savings: number;
  monthlySavings: number;
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

/**
 * Surcharge thresholds for old regime.
 * Returns surcharge rate as a fraction (e.g. 0.10 = 10%).
 */
function getSurchargeRateOld(grossIncome: number): number {
  if (grossIncome > 50000000) return 0.37;
  if (grossIncome > 20000000) return 0.25;
  if (grossIncome > 10000000) return 0.15;
  if (grossIncome > 5000000)  return 0.10;
  return 0;
}

/**
 * Surcharge thresholds for new regime (Budget 2023 — max 25%).
 */
function getSurchargeRateNew(grossIncome: number): number {
  if (grossIncome > 20000000) return 0.25;
  if (grossIncome > 10000000) return 0.15;
  if (grossIncome > 5000000)  return 0.10;
  return 0;
}

/**
 * Marginal relief: ensures extra tax from crossing surcharge threshold
 * does not exceed the extra income above that threshold.
 *
 * threshold: the income level below which lower surcharge rate applies
 * taxAtThreshold: (slab tax) at the threshold income (no surcharge)
 * taxBase: current slab tax (before surcharge)
 * surchargeAmount: computed surcharge at current income
 * income: actual gross/taxable income
 */
function applyMarginalRelief(
  income: number,
  threshold: number,
  taxAtThreshold: number,
  taxBase: number,
  surchargeAmount: number,
  surchargeRateAtThreshold: number,
): number {
  const taxPlusChargeAtThreshold = taxAtThreshold + Math.round(taxAtThreshold * surchargeRateAtThreshold);
  const maxExtraTax = income - threshold;
  const currentTotalBeforeCess = taxBase + surchargeAmount;
  if (currentTotalBeforeCess > taxPlusChargeAtThreshold + maxExtraTax) {
    return Math.max(0, taxPlusChargeAtThreshold + maxExtraTax - taxBase);
  }
  return surchargeAmount;
}

/**
 * Compute surcharge (with marginal relief) on slab tax.
 * slabs used only to recalculate tax at threshold for marginal relief.
 */
function calcSurchargeWithRelief(
  income: number,
  taxBase: number,
  slabs: TaxSlab[],
  getSurchargeRate: (inc: number) => number,
): number {
  const rate = getSurchargeRate(income);
  if (rate === 0) return 0;

  const rawSurcharge = Math.round(taxBase * rate);

  // Determine which threshold was just crossed
  const thresholds = [5000000, 10000000, 20000000, 50000000];
  let crossedThreshold = 0;
  for (const t of thresholds) {
    if (income > t) crossedThreshold = t;
  }
  if (crossedThreshold === 0) return rawSurcharge;

  const rateAtThreshold = getSurchargeRate(crossedThreshold);
  const { tax: taxAtThreshold } = calcSlabTax(crossedThreshold, slabs);

  return applyMarginalRelief(
    income,
    crossedThreshold,
    taxAtThreshold,
    taxBase,
    rawSurcharge,
    rateAtThreshold,
  );
}

function calcNewRegime(input: TaxInput): RegimeTaxResult {
  const standardDeduction = STANDARD_DEDUCTION_NEW;
  const taxableIncome = Math.max(0, input.grossIncome - standardDeduction);

  const { tax: taxBeforeCess, breakup } = calcSlabTax(taxableIncome, NEW_REGIME_SLABS_2025);

  // Surcharge is on tax, based on gross income (not taxable income)
  const surcharge = calcSurchargeWithRelief(
    input.grossIncome,
    taxBeforeCess,
    NEW_REGIME_SLABS_2025,
    getSurchargeRateNew,
  );

  const taxWithSurcharge = taxBeforeCess + surcharge;

  // 87A rebate applies only when taxable income <= 12L AND no surcharge
  const rebate87A = (taxableIncome <= REBATE_87A_NEW_LIMIT && surcharge === 0)
    ? Math.min(taxBeforeCess, REBATE_87A_NEW_MAX)
    : 0;

  const taxAfterRebate = Math.max(0, taxWithSurcharge - rebate87A);
  const cess = Math.round(taxAfterRebate * HEALTH_CESS_RATE);
  const totalTax = taxAfterRebate + cess;
  const effectiveRate = input.grossIncome > 0
    ? Math.round((totalTax / input.grossIncome) * 1000) / 10
    : 0;
  const monthlyTakeHome = Math.round((input.grossIncome - totalTax) / 12);

  return {
    grossIncome: input.grossIncome,
    standardDeduction,
    totalDeductions: standardDeduction,
    taxableIncome,
    taxBeforeCess,
    surcharge,
    rebate87A,
    taxAfterRebate,
    cess,
    totalTax,
    effectiveRate,
    monthlyTakeHome,
    slabBreakup: breakup,
  };
}

function calcOldRegime(input: TaxInput): RegimeTaxResult {
  const standardDeduction = STANDARD_DEDUCTION_OLD;
  const hraExemption    = calcHRAExemption(input.grossIncome, input.hra, input.rentPaid, input.isMetro);
  const deduction80C    = Math.min(input.investments80C, MAX_80C);
  const maxParents80D   = input.parentsAreSenior ? 50000 : MAX_80D_PARENTS;
  const deduction80D    = Math.min(input.healthInsurance80D, MAX_80D_SELF)
                        + Math.min(input.parentsInsurance80D, maxParents80D);
  const deduction80CCD  = Math.min(input.npsContribution, 50000);
  const deduction24b    = Math.min(input.homeLoanInterest, 200000);

  const totalDeductions = standardDeduction + hraExemption + deduction80C
    + deduction80D + deduction80CCD + deduction24b;

  const taxableIncome = Math.max(0, input.grossIncome - totalDeductions);
  const slabs = input.age >= 60 ? OLD_REGIME_SENIOR_SLABS : OLD_REGIME_SLABS_2025;

  const { tax: taxBeforeCess, breakup } = calcSlabTax(taxableIncome, slabs);

  const surcharge = calcSurchargeWithRelief(
    input.grossIncome,
    taxBeforeCess,
    slabs,
    getSurchargeRateOld,
  );

  const taxWithSurcharge = taxBeforeCess + surcharge;

  const rebate87A = (taxableIncome <= REBATE_87A_OLD_LIMIT && surcharge === 0)
    ? Math.min(taxBeforeCess, REBATE_87A_OLD_MAX)
    : 0;

  const taxAfterRebate = Math.max(0, taxWithSurcharge - rebate87A);
  const cess = Math.round(taxAfterRebate * HEALTH_CESS_RATE);
  const totalTax = taxAfterRebate + cess;
  const effectiveRate = input.grossIncome > 0
    ? Math.round((totalTax / input.grossIncome) * 1000) / 10
    : 0;
  const monthlyTakeHome = Math.round((input.grossIncome - totalTax) / 12);

  return {
    grossIncome: input.grossIncome,
    standardDeduction,
    totalDeductions,
    taxableIncome,
    taxBeforeCess,
    surcharge,
    rebate87A,
    taxAfterRebate,
    cess,
    totalTax,
    effectiveRate,
    monthlyTakeHome,
    slabBreakup: breakup,
  };
}

export function compareRegimes(input: TaxInput): TaxComparisonResult {
  const newRegime = calcNewRegime(input);
  const oldRegime = calcOldRegime(input);
  const diff = oldRegime.totalTax - newRegime.totalTax;
  const savings = Math.abs(diff);
  return {
    newRegime,
    oldRegime,
    betterRegime: diff > 0 ? "new" : diff < 0 ? "old" : "equal",
    savings,
    monthlySavings: Math.round(savings / 12),
  };
}
