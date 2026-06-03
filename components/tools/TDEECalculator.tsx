"use client";

import { useState, useMemo } from "react";
import { calculateTDEEResult, type Gender, type ActivityLevel, type Goal } from "@/lib/calculations/tdee";

const ACTIVITY_OPTIONS: { value: ActivityLevel; label: string; desc: string }[] = [
  { value: "sedentary", label: "Sedentary",       desc: "Little or no exercise, desk job" },
  { value: "light",     label: "Lightly Active",  desc: "Light exercise 1–3 days/week" },
  { value: "moderate",  label: "Moderate",         desc: "Moderate exercise 3–5 days/week" },
  { value: "active",    label: "Very Active",      desc: "Hard exercise 6–7 days/week" },
  { value: "extreme",   label: "Extra Active",     desc: "Physical job + daily training" },
];

const GOAL_OPTIONS: { value: Goal; label: string; icon: string; color: string }[] = [
  { value: "lose",     label: "Lose Weight",   icon: "📉", color: "bg-blue-600" },
  { value: "maintain", label: "Maintain",      icon: "⚖️", color: "bg-blue-600" },
  { value: "gain",     label: "Gain Muscle",   icon: "💪", color: "bg-blue-600" },
];

function MacroBar({ label, grams, calories, color }: { label: string; grams: number; calories: number; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className={`w-2.5 h-2.5 rounded-full ${color} flex-shrink-0`} />
      <span className="text-sm text-gray-600 w-16">{label}</span>
      <div className="flex-1 bg-gray-100 rounded-full h-2">
        <div className={`${color} h-2 rounded-full`} style={{ width: `${Math.min(100, (calories / 800) * 100)}%` }} />
      </div>
      <span className="text-sm font-semibold text-gray-800 w-16 text-right">{grams}g</span>
      <span className="text-xs text-gray-400 w-16 text-right">{calories} kcal</span>
    </div>
  );
}

export function TDEECalculator() {
  const [age, setAge]           = useState(28);
  const [gender, setGender]     = useState<Gender>("male");
  const [weight, setWeight]     = useState(70);
  const [height, setHeight]     = useState(170);
  const [unit, setUnit]         = useState<"metric" | "imperial">("metric");
  const [activity, setActivity] = useState<ActivityLevel>("moderate");
  const [goal, setGoal]         = useState<Goal>("maintain");

  const weightKg  = unit === "imperial" ? Math.round(weight * 0.453592) : weight;
  const heightCm  = unit === "imperial" ? Math.round(height * 2.54)      : height;

  const result = useMemo(
    () => calculateTDEEResult(weightKg, heightCm, age, gender, activity, goal),
    [weightKg, heightCm, age, gender, activity, goal]
  );

  const goalLabel = GOAL_OPTIONS.find((g) => g.value === goal)?.label ?? "";
  const deficitLabel = result.deficit < 0
    ? `${Math.abs(result.deficit)} kcal deficit`
    : result.deficit > 0
    ? `${result.deficit} kcal surplus`
    : "Maintenance";

  const bmiColor =
    result.bmi < 18.5 ? "text-blue-600" :
    result.bmi < 25   ? "text-green-600" :
    result.bmi < 30   ? "text-amber-600" : "text-red-600";

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-5">

        {/* LEFT: Inputs */}
        <div className="md:col-span-3 p-6 space-y-5 md:border-r border-gray-100">

          {/* Unit + Gender row */}
          <div className="flex gap-4">
            <div className="flex-1">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Unit</p>
              <div className="flex gap-1 bg-gray-100 p-0.5 rounded-lg w-fit">
                {(["metric", "imperial"] as const).map((u) => (
                  <button key={u} onClick={() => setUnit(u)}
                    className={`text-xs px-3 py-1.5 rounded-md font-medium transition-all capitalize ${
                      unit === u ? "bg-white text-blue-600 shadow-sm" : "text-gray-500"
                    }`}>
                    {u}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Gender</p>
              <div className="flex gap-1 bg-gray-100 p-0.5 rounded-lg w-fit">
                {(["male", "female"] as const).map((g) => (
                  <button key={g} onClick={() => setGender(g)}
                    className={`text-xs px-3 py-1.5 rounded-md font-medium transition-all capitalize ${
                      gender === g ? "bg-white text-blue-600 shadow-sm" : "text-gray-500"
                    }`}>
                    {g === "male" ? "♂ Male" : "♀ Female"}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Age, Weight, Height */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Age", value: age, set: setAge, unit: "yrs", min: 10, max: 90 },
              { label: "Weight", value: weight, set: setWeight, unit: unit === "metric" ? "kg" : "lbs", min: unit === "metric" ? 30 : 66, max: unit === "metric" ? 200 : 440 },
              { label: "Height", value: height, set: setHeight, unit: unit === "metric" ? "cm" : "in", min: unit === "metric" ? 100 : 39, max: unit === "metric" ? 230 : 91 },
            ].map(({ label, value, set, unit: u, min, max }) => (
              <div key={label}>
                <label className="text-sm font-medium text-gray-600 block mb-1.5">{label}</label>
                <div className="flex items-center gap-1 bg-blue-50 border border-blue-100 focus-within:border-blue-400 rounded-xl px-3 py-2 transition-colors">
                  <input
                    type="number"
                    value={value}
                    min={min}
                    max={max}
                    onChange={(e) => set(Math.min(max, Math.max(min, parseInt(e.target.value) || min)))}
                    className="flex-1 text-right font-bold text-gray-900 text-base bg-transparent focus:outline-none w-full"
                  />
                  <span className="text-gray-400 text-xs">{u}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Activity level */}
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">Activity Level</p>
            <div className="space-y-1.5">
              {ACTIVITY_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setActivity(opt.value)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left border transition-all ${
                    activity === opt.value
                      ? "bg-blue-600 text-white border-blue-600"
                      : "border-gray-200 hover:border-blue-200 hover:bg-blue-50"
                  }`}
                >
                  <span className={`text-sm font-semibold ${activity === opt.value ? "text-white" : "text-gray-800"}`}>
                    {opt.label}
                  </span>
                  <span className={`text-xs ${activity === opt.value ? "text-blue-200" : "text-gray-400"}`}>
                    {opt.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Goal */}
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">Goal</p>
            <div className="grid grid-cols-3 gap-2">
              {GOAL_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setGoal(opt.value)}
                  className={`flex flex-col items-center gap-1 py-3 rounded-xl border font-semibold text-sm transition-all ${
                    goal === opt.value
                      ? "bg-blue-600 text-white border-blue-600"
                      : "border-gray-200 text-gray-600 hover:border-blue-200 hover:bg-blue-50"
                  }`}
                >
                  <span className="text-xl">{opt.icon}</span>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Results */}
        <div className="md:col-span-2 bg-gradient-to-br from-blue-600 to-blue-700 p-6 flex flex-col">
          {/* Target calories hero */}
          <div className="text-center mb-5">
            <p className="text-blue-200 text-xs font-semibold uppercase tracking-widest mb-2">
              Daily Target — {goalLabel}
            </p>
            <p className="text-5xl font-bold text-white">{result.targetCalories.toLocaleString()}</p>
            <p className="text-blue-300 text-xs mt-1.5">kcal / day · {deficitLabel}</p>
          </div>

          <div className="border-t border-blue-500/50 mb-5" />

          {/* BMR + TDEE */}
          <div className="space-y-2 mb-4">
            {[
              { label: "BMR (at rest)", value: result.bmr, sub: "Basal Metabolic Rate" },
              { label: "TDEE (maintenance)", value: result.tdee, sub: "With your activity level" },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between bg-white/10 rounded-xl px-4 py-2.5">
                <div>
                  <p className="text-white text-sm font-semibold">{row.label}</p>
                  <p className="text-blue-200 text-xs">{row.sub}</p>
                </div>
                <p className="text-white font-bold text-lg">{row.value.toLocaleString()}</p>
              </div>
            ))}
          </div>

          {/* BMI */}
          <div className="bg-white/10 rounded-xl px-4 py-2.5 mb-4 flex items-center justify-between">
            <div>
              <p className="text-white text-sm font-semibold">BMI</p>
              <p className="text-blue-200 text-xs">{result.bmiLabel}</p>
            </div>
            <p className={`font-bold text-lg bg-white/20 px-3 py-1 rounded-lg text-white`}>
              {result.bmi}
            </p>
          </div>

          {/* Macros */}
          <div className="bg-white/10 rounded-xl p-4 mt-auto">
            <p className="text-blue-200 text-xs font-semibold uppercase tracking-wide mb-3">
              Daily Macros
            </p>
            <div className="space-y-2.5">
              <div className="flex justify-between text-xs text-blue-200 pb-1 border-b border-blue-500/30">
                <span>Nutrient</span><span>Grams</span><span>Calories</span>
              </div>
              {[
                { label: "Protein", grams: result.protein, cal: result.protein * 4, color: "bg-emerald-400" },
                { label: "Carbs",   grams: result.carbs,   cal: result.carbs * 4,   color: "bg-amber-400" },
                { label: "Fat",     grams: result.fat,     cal: result.fat * 9,     color: "bg-orange-400" },
              ].map((m) => (
                <div key={m.label} className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${m.color} flex-shrink-0`} />
                  <span className="text-blue-100 text-xs flex-1">{m.label}</span>
                  <span className="text-white font-semibold text-sm">{m.grams}g</span>
                  <span className="text-blue-200 text-xs w-16 text-right">{m.cal} kcal</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile results bar */}
      <div className="md:hidden bg-blue-600 px-4 pt-4 pb-3 border-t border-gray-100">
        <div className="text-center mb-3">
          <p className="text-blue-200 text-xs mb-1">Daily Target ({goalLabel})</p>
          <p className="text-3xl font-bold text-white">{result.targetCalories.toLocaleString()} kcal</p>
          <p className="text-blue-300 text-xs mt-1">{deficitLabel}</p>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center text-white">
          <div>
            <p className="text-blue-200 text-xs">BMR</p>
            <p className="font-bold">{result.bmr.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-blue-200 text-xs">TDEE</p>
            <p className="font-bold">{result.tdee.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-blue-200 text-xs">BMI</p>
            <p className="font-bold">{result.bmi}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
