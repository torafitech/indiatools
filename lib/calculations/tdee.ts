export type Gender = "male" | "female";
export type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "extreme";
export type Goal = "lose" | "maintain" | "gain";

const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light:     1.375,
  moderate:  1.55,
  active:    1.725,
  extreme:   1.9,
};

const GOAL_ADJUSTMENTS: Record<Goal, number> = {
  lose:     -500,
  maintain: 0,
  gain:     +300,
};

export interface TDEEResult {
  bmr: number;
  tdee: number;
  targetCalories: number;
  deficit: number;
  protein: number;
  carbs: number;
  fat: number;
  bmi: number;
  bmiLabel: string;
}

/**
 * Mifflin-St Jeor BMR equation — most accurate for general population.
 * Male:   10W + 6.25H - 5A + 5
 * Female: 10W + 6.25H - 5A - 161
 */
export function calculateBMR(weight: number, height: number, age: number, gender: Gender): number {
  const base = 10 * weight + 6.25 * height - 5 * age;
  return Math.round(gender === "male" ? base + 5 : base - 161);
}

export function calculateTDEE(bmr: number, activity: ActivityLevel): number {
  return Math.round(bmr * ACTIVITY_MULTIPLIERS[activity]);
}

export function calculateTDEEResult(
  weightKg: number,
  heightCm: number,
  age: number,
  gender: Gender,
  activity: ActivityLevel,
  goal: Goal
): TDEEResult {
  const bmr = calculateBMR(weightKg, heightCm, age, gender);
  const tdee = calculateTDEE(bmr, activity);
  const targetCalories = Math.max(1200, tdee + GOAL_ADJUSTMENTS[goal]);
  const deficit = targetCalories - tdee;

  // Macros: protein 30%, carbs 40%, fat 30% — adjusts for goal
  const proteinPct = goal === "gain" ? 0.30 : 0.25;
  const fatPct     = 0.30;
  const carbPct    = 1 - proteinPct - fatPct;

  const protein = Math.round((targetCalories * proteinPct) / 4);
  const fat     = Math.round((targetCalories * fatPct)     / 9);
  const carbs   = Math.round((targetCalories * carbPct)    / 4);

  const bmi = Math.round((weightKg / Math.pow(heightCm / 100, 2)) * 10) / 10;
  let bmiLabel = "Normal";
  if (bmi < 18.5) bmiLabel = "Underweight";
  else if (bmi >= 25 && bmi < 30) bmiLabel = "Overweight";
  else if (bmi >= 30) bmiLabel = "Obese";

  return { bmr, tdee, targetCalories, deficit, protein, carbs, fat, bmi, bmiLabel };
}
