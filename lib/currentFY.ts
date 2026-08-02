// India FY runs April–March. Single source of truth for "current year" /
// "current FY" strings used across programmatic template content.

export function getCurrentFY(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // 1-12
  return month >= 4
    ? `${year}-${(year + 1).toString().slice(-2)}`
    : `${year - 1}-${year.toString().slice(-2)}`;
}

export function getCurrentFYLabel(): string {
  return `FY ${getCurrentFY()}`;
}

export function getCurrentYear(): number {
  return new Date().getFullYear();
}
