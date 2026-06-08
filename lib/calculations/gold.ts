export type WeightUnit = "grams" | "tola" | "sovereign" | "pavan";

/**
 * Convert weight from various Indian jewellery units to grams.
 * 1 tola = 11.664g (traditional Indian unit used by bullion dealers)
 * 1 sovereign = 8g (British Indian coin weight, still used in South India)
 * 1 pavan = 8g (same as sovereign, common in Kerala/Tamil Nadu)
 */
export function toGrams(value: number, unit: WeightUnit): number {
  if (unit === "tola") return value * 11.664;
  if (unit === "sovereign" || unit === "pavan") return value * 8;
  return value;
}

export interface JewelleryPriceResult {
  pureGoldValue: number;
  makingCharges: number;
  wastageCharges: number;
  effectiveWastagePct: number;
  subtotal: number;
  gstGold: number;
  gstMaking: number;
  totalGST: number;
  total: number;
  tcs: number;
}

/**
 * Calculate jewellery price with all charges.
 * Formula:
 *   pureGoldValue = weightGrams × (purityPct / 100) × ratePerGram
 *   making        = pureGoldValue × makingPct / 100
 *   wastage       = pureGoldValue × effectiveWastagePct / 100  (+2% for heavy items)
 *   gstGold       = pureGoldValue × 3%    (GST on gold as per Indian tax law)
 *   gstMaking     = makingCharges × 5%   (GST on making as labour service)
 *   total         = pureGoldValue + making + wastage + gstGold + gstMaking
 *   tcs           = 1% of total if total > ₹2,00,000  (Budget 2023 provision)
 */
export function calcJewelleryPrice(params: {
  weightGrams: number;
  purityPct: number;
  ratePerGram: number;
  makingPct: number;
  wastagePct: number;
  isKadai: boolean;
}): JewelleryPriceResult {
  const { weightGrams, purityPct, ratePerGram, makingPct, wastagePct, isKadai } = params;
  const effectiveWastagePct = wastagePct + (isKadai ? 2 : 0);

  const pureGoldValue = weightGrams * (purityPct / 100) * ratePerGram;
  const makingCharges = pureGoldValue * (makingPct / 100);
  const wastageCharges = pureGoldValue * (effectiveWastagePct / 100);
  const subtotal = pureGoldValue + makingCharges + wastageCharges;

  const gstGold = pureGoldValue * 0.03;
  const gstMaking = makingCharges * 0.05;
  const totalGST = gstGold + gstMaking;

  const total = subtotal + totalGST;
  const tcs = total > 200000 ? total * 0.01 : 0;

  return {
    pureGoldValue,
    makingCharges,
    wastageCharges,
    effectiveWastagePct,
    subtotal,
    gstGold,
    gstMaking,
    totalGST,
    total,
    tcs,
  };
}

/**
 * Calculate exchange value for old gold.
 * Formula: weight × (purity / 100) × rate × (1 − deductionPct / 100)
 * Jewellers deduct 3–8% for melting losses and purity verification.
 */
export function calcExchangeValue(
  weightGrams: number,
  purityPct: number,
  ratePerGram: number,
  deductionPct: number
): number {
  return weightGrams * (purityPct / 100) * ratePerGram * (1 - deductionPct / 100);
}

/**
 * Calculate gold loan eligibility at standard LTV ratios.
 * RBI caps NBFC gold loans at 75% LTV. Banks typically offer 60–65%.
 */
export function calcGoldLoan(
  weightGrams: number,
  purityPct: number,
  ratePerGram: number
): { marketValue: number; ltv75: number; ltv65: number; ltv60: number } {
  const marketValue = weightGrams * (purityPct / 100) * ratePerGram;
  return {
    marketValue,
    ltv75: Math.round(marketValue * 0.75),
    ltv65: Math.round(marketValue * 0.65),
    ltv60: Math.round(marketValue * 0.60),
  };
}
