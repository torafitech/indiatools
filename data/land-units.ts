// Land area unit constants. Fixed units (sq ft, sq m, sq yd, acre, hectare,
// cent, ankanam, ground) are stable mathematical/legal ratios with no regional
// variance. Guntha, Bigha, and Katha are revenue-record units whose sq-ft
// value differs by state — REGIONS holds the sq-ft-per-unit for those three
// per state, sourced from each state's land-record standard.

export type RegionKey = "standard" | "west-bengal" | "bihar" | "uttar-pradesh";

export interface RegionInfo {
  key: RegionKey;
  label: string;
  gunthaSqft: number;
  bighaSqft: number;
  kathaSqft: number;
  source: string;
}

export const REGIONS: RegionInfo[] = [
  {
    key: "standard",
    label: "Standard (Karnataka / Maharashtra / pan-India reference)",
    gunthaSqft: 1089,
    bighaSqft: 27225,
    kathaSqft: 720,
    source: "Karnataka RTC land-record standard (Guntha); commonly published pan-India reference (Bigha/Katha)",
  },
  {
    key: "west-bengal",
    label: "West Bengal",
    gunthaSqft: 1089,
    bighaSqft: 14400,
    kathaSqft: 720,
    source: "West Bengal BLRO (Block Land Reforms Office) land records",
  },
  {
    key: "bihar",
    label: "Bihar",
    gunthaSqft: 1089,
    bighaSqft: 27220,
    kathaSqft: 1361,
    source: "Bihar Jamabandi land records",
  },
  {
    key: "uttar-pradesh",
    label: "Uttar Pradesh",
    gunthaSqft: 1089,
    bighaSqft: 27225,
    kathaSqft: 1361,
    source: "UP Khatauni / Jamabandi land records (Pucca Bigha standard)",
  },
];

export type UnitKey =
  | "sqft"
  | "sqm"
  | "sqyd"
  | "acre"
  | "hectare"
  | "cent"
  | "guntha"
  | "bigha"
  | "katha"
  | "ankanam"
  | "ground";

export interface UnitDef {
  key: UnitKey;
  label: string;
  shortLabel: string;
  regional: boolean;
  sqftPerUnit: number; // for regional units, this is the "standard" region value
}

export const UNITS: UnitDef[] = [
  { key: "sqft",    label: "Square Feet",        shortLabel: "sq ft",   regional: false, sqftPerUnit: 1 },
  { key: "sqm",     label: "Square Meter",       shortLabel: "sq m",    regional: false, sqftPerUnit: 10.7639 },
  { key: "sqyd",    label: "Square Yard (Gaj)",  shortLabel: "sq yd",   regional: false, sqftPerUnit: 9 },
  { key: "acre",    label: "Acre",               shortLabel: "acre",    regional: false, sqftPerUnit: 43560 },
  { key: "hectare", label: "Hectare",            shortLabel: "ha",      regional: false, sqftPerUnit: 107639.1 },
  { key: "cent",    label: "Cent",               shortLabel: "cent",    regional: false, sqftPerUnit: 435.6 },
  { key: "guntha",  label: "Guntha / Gunta",     shortLabel: "guntha",  regional: true,  sqftPerUnit: 1089 },
  { key: "bigha",   label: "Bigha",              shortLabel: "bigha",   regional: true,  sqftPerUnit: 27225 },
  { key: "katha",   label: "Katha",              shortLabel: "katha",   regional: true,  sqftPerUnit: 720 },
  { key: "ankanam", label: "Ankanam",            shortLabel: "ankanam", regional: false, sqftPerUnit: 72 },
  { key: "ground",  label: "Ground",             shortLabel: "ground",  regional: false, sqftPerUnit: 2400 },
];

export function getRegion(key: RegionKey): RegionInfo {
  return REGIONS.find((r) => r.key === key) ?? REGIONS[0];
}

export function getSqftPerUnit(unitKey: UnitKey, region: RegionKey): number {
  const unit = UNITS.find((u) => u.key === unitKey);
  if (!unit) return 1;
  if (!unit.regional) return unit.sqftPerUnit;

  const r = getRegion(region);
  if (unitKey === "guntha") return r.gunthaSqft;
  if (unitKey === "bigha") return r.bighaSqft;
  if (unitKey === "katha") return r.kathaSqft;
  return unit.sqftPerUnit;
}
