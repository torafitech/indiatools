/**
 * Gratuity calculation under the Payment of Gratuity Act (as amended by
 * Code on Social Security 2020, effective November 2025).
 *
 * Key new-code change: fixed-term employees eligible after 1 year (was 5 years).
 *
 * Formula (Act-covered): (15 × last drawn salary × years of service) / 26
 * Formula (Not covered): (15 × last drawn salary × years of service) / 30
 *
 * Round-up rule: if months in final year > 6, round up to next full year.
 * Tax exemption ceiling: ₹20,00,000 (post Budget 2023 enhancement).
 */

export interface GratuityResult {
  eligibleYears: number;
  roundedYears: number;
  isEligible: boolean;
  gratuityAmount: number;
  taxExemptAmount: number;
  taxableAmount: number;
  monthlyAccrual: number;
  employmentType: "permanent" | "fixed-term";
  coverageType: "covered" | "not-covered";
  newRuleApplies: boolean;
}

const GRATUITY_EXEMPTION_LIMIT = 2_000_000;

/**
 * @param lastDrawnMonthly - Basic + DA monthly (INR)
 * @param serviceYears - decimal years, e.g. 4.8
 * @param employmentType - permanent (5yr rule) or fixed-term (1yr rule under new code)
 * @param coverageType - covered by Gratuity Act or not
 */
export function calculateGratuity(
  lastDrawnMonthly: number,
  serviceYears: number,
  employmentType: "permanent" | "fixed-term",
  coverageType: "covered" | "not-covered"
): GratuityResult {
  const minYears = employmentType === "fixed-term" ? 1 : 5;
  const isEligible = serviceYears >= minYears;

  const fullYears = Math.floor(serviceYears);
  const partialMonths = Math.round((serviceYears - fullYears) * 12);
  const roundedYears = partialMonths > 6 ? fullYears + 1 : fullYears;

  const divisor = coverageType === "covered" ? 26 : 30;
  const gratuityAmount = isEligible
    ? Math.round((15 * lastDrawnMonthly * roundedYears) / divisor)
    : 0;

  const taxExemptAmount = Math.min(gratuityAmount, GRATUITY_EXEMPTION_LIMIT);
  const taxableAmount = Math.max(0, gratuityAmount - GRATUITY_EXEMPTION_LIMIT);

  const monthlyAccrual = Math.round((15 * lastDrawnMonthly) / (divisor * 12));

  return {
    eligibleYears: serviceYears,
    roundedYears,
    isEligible,
    gratuityAmount,
    taxExemptAmount,
    taxableAmount,
    monthlyAccrual,
    employmentType,
    coverageType,
    newRuleApplies: employmentType === "fixed-term",
  };
}
