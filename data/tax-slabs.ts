// FY 2025-26 (AY 2026-27) — updated post Union Budget 2025

export interface TaxSlab {
  min: number;
  max: number;
  rate: number;
}

// New regime: income up to ₹12L is effectively zero tax due to rebate u/s 87A
export const NEW_REGIME_SLABS_2025: TaxSlab[] = [
  { min: 0,        max: 400000,   rate: 0.00 },
  { min: 400000,   max: 800000,   rate: 0.05 },
  { min: 800000,   max: 1200000,  rate: 0.10 },
  { min: 1200000,  max: 1600000,  rate: 0.15 },
  { min: 1600000,  max: 2000000,  rate: 0.20 },
  { min: 2000000,  max: 2400000,  rate: 0.25 },
  { min: 2400000,  max: Infinity, rate: 0.30 },
];

export const OLD_REGIME_SLABS_2025: TaxSlab[] = [
  { min: 0,        max: 250000,   rate: 0.00 },
  { min: 250000,   max: 500000,   rate: 0.05 },
  { min: 500000,   max: 1000000,  rate: 0.20 },
  { min: 1000000,  max: Infinity, rate: 0.30 },
];

// Senior citizen (60-79) — old regime
export const OLD_REGIME_SENIOR_SLABS: TaxSlab[] = [
  { min: 0,        max: 300000,   rate: 0.00 },
  { min: 300000,   max: 500000,   rate: 0.05 },
  { min: 500000,   max: 1000000,  rate: 0.20 },
  { min: 1000000,  max: Infinity, rate: 0.30 },
];

export const STANDARD_DEDUCTION_NEW = 75000;
export const STANDARD_DEDUCTION_OLD = 50000;
export const MAX_80C = 150000;
export const MAX_80D_SELF = 25000;
export const MAX_80D_PARENTS = 25000;
export const REBATE_87A_NEW_LIMIT = 1200000;  // tax-free up to ₹12L net income
export const REBATE_87A_NEW_MAX   = 60000;
export const REBATE_87A_OLD_LIMIT = 500000;
export const REBATE_87A_OLD_MAX   = 12500;
export const HEALTH_CESS_RATE     = 0.04;     // 4% on tax
