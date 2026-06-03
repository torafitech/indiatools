export interface SIPResult {
  corpus: number;
  invested: number;
  gains: number;
  gainsPercent: number;
}

export interface LumpSumResult {
  corpus: number;
  invested: number;
  gains: number;
  gainsPercent: number;
}

/**
 * SIP future value: FV = P * [((1+r)^n - 1) / r] * (1+r)
 */
export function calculateSIP(
  monthlyAmount: number,
  annualRate: number,
  years: number
): SIPResult {
  const r = annualRate / 12 / 100;
  const n = years * 12;
  const corpus = r === 0
    ? monthlyAmount * n
    : monthlyAmount * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
  const invested = monthlyAmount * n;
  const gains = corpus - invested;
  return {
    corpus: Math.round(corpus),
    invested: Math.round(invested),
    gains: Math.round(gains),
    gainsPercent: Math.round((gains / invested) * 1000) / 10,
  };
}

/**
 * Reverse SIP: how much monthly SIP needed to reach target corpus.
 */
export function calculateRequiredSIP(
  targetCorpus: number,
  annualRate: number,
  years: number
): number {
  const r = annualRate / 12 / 100;
  const n = years * 12;
  if (r === 0) return Math.round(targetCorpus / n);
  const fvFactor = ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
  return Math.round(targetCorpus / fvFactor);
}

/**
 * Lump sum future value: FV = P * (1+r)^n  (annual compounding)
 */
export function calculateLumpSum(
  principal: number,
  annualRate: number,
  years: number
): LumpSumResult {
  const corpus = principal * Math.pow(1 + annualRate / 100, years);
  const gains = corpus - principal;
  return {
    corpus: Math.round(corpus),
    invested: principal,
    gains: Math.round(gains),
    gainsPercent: Math.round((gains / principal) * 1000) / 10,
  };
}

/** Year-by-year SIP growth for amortization-style table */
export function getSIPYearlyBreakdown(
  monthlyAmount: number,
  annualRate: number,
  years: number
): { year: number; invested: number; corpus: number; gains: number }[] {
  return Array.from({ length: years }, (_, i) => {
    const result = calculateSIP(monthlyAmount, annualRate, i + 1);
    return { year: i + 1, ...result };
  });
}
