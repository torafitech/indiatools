import { CITIES } from "@/data/cities";

export type ConstructionType = "basic" | "standard" | "premium";

export interface ConstructionResult {
  city: string;
  builtUpArea: number;
  type: ConstructionType;
  costPerSqft: number;
  constructionCost: number;
  materialCost: number;
  labourCost: number;
  finishingCost: number;
  contingency: number;
  totalCostMin: number;
  totalCostMax: number;
  estimatedMonths: number;
}

/**
 * Estimate construction timeline in months based on built-up area.
 * Rule of thumb: 1 month per 500–600 sqft, minimum 6 months.
 * @param builtUpArea - Built-up area in sqft
 */
function estimateTimeline(builtUpArea: number): number {
  const months = Math.ceil(builtUpArea / 500);
  return Math.max(6, Math.min(36, months));
}

/**
 * Calculate construction cost for a given city, area, and quality level.
 * Cost components: material ~55%, labour ~30%, finishing ~15%.
 * Contingency buffer of 10% added separately.
 * Range is ±10% of total (construction is approximate).
 *
 * @param citySlug - City slug from CITIES data (e.g. "bangalore")
 * @param builtUpArea - Built-up area in sqft (500–10000)
 * @param type - Construction type: basic | standard | premium
 */
export function calculateConstructionCost(
  citySlug: string,
  builtUpArea: number,
  type: ConstructionType
): ConstructionResult {
  const cityData = CITIES.find((c) => c.slug === citySlug) ?? CITIES[2];

  const costPerSqftMap: Record<ConstructionType, number> = {
    basic: cityData.basicCostPerSqft,
    standard: cityData.standardCostPerSqft,
    premium: cityData.premiumCostPerSqft,
  };

  const costPerSqft = costPerSqftMap[type];
  const constructionCost = Math.round(builtUpArea * costPerSqft);
  const materialCost = Math.round(constructionCost * 0.55);
  const labourCost = Math.round(constructionCost * 0.30);
  const finishingCost = Math.round(constructionCost * 0.15);
  const contingency = Math.round(constructionCost * 0.10);
  const totalWithContingency = constructionCost + contingency;

  return {
    city: cityData.name,
    builtUpArea,
    type,
    costPerSqft,
    constructionCost,
    materialCost,
    labourCost,
    finishingCost,
    contingency,
    totalCostMin: Math.round(totalWithContingency * 0.90),
    totalCostMax: Math.round(totalWithContingency * 1.10),
    estimatedMonths: estimateTimeline(builtUpArea),
  };
}
