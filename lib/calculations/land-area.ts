import { getSqftPerUnit, type RegionKey, type UnitKey } from "@/data/land-units";

/**
 * Convert a land-area value between units using square feet as the common
 * base. Guntha, Bigha, and Katha are region-dependent — their sq-ft-per-unit
 * constant comes from `region`; every other unit is a fixed ratio.
 */
export function convertLandArea(
  value: number,
  fromUnit: UnitKey,
  toUnit: UnitKey,
  region: RegionKey
): number {
  if (!isFinite(value)) return 0;
  const sqft = value * getSqftPerUnit(fromUnit, region);
  return sqft / getSqftPerUnit(toUnit, region);
}
