/**
 * Attendance percentage (0-100)
 * @param attended - classes attended
 * @param total - total classes held
 */
export function attendancePct(attended: number, total: number): number {
  if (total === 0) return 0;
  return (attended / total) * 100;
}

/**
 * Max additional classes you can skip while staying at or above target.
 * Derived from: A / (T + B) >= C → B <= (A - C*T) / C
 * @param attended - classes attended so far
 * @param total - classes held so far
 * @param target - required attendance as decimal (e.g. 0.75 for 75%)
 */
export function safeBunks(attended: number, total: number, target: number): number {
  if (target === 0) return Infinity;
  return Math.max(0, Math.floor((attended - target * total) / target));
}

/**
 * Minimum consecutive classes to attend to reach target (assuming you attend all of them).
 * Derived from: (A + X) / (T + X) >= C → X >= (C*T - A) / (1 - C)
 * @param attended - classes attended so far
 * @param total - classes held so far
 * @param target - required attendance as decimal (e.g. 0.75 for 75%)
 */
export function classesNeeded(attended: number, total: number, target: number): number {
  if (total === 0 || attended / total >= target) return 0;
  if (target >= 1) return Infinity;
  return Math.ceil((target * total - attended) / (1 - target));
}
