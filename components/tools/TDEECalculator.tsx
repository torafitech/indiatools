"use client";

import { useState, useMemo } from "react";
import { calculateTDEEResult, type Gender, type ActivityLevel, type Goal } from "@/lib/calculations/tdee";

const ACTIVITY_OPTIONS: { value: ActivityLevel; label: string; emoji: string; desc: string }[] = [
  { value: "sedentary", label: "Sedentary",      emoji: "🪑", desc: "Desk job, little/no exercise" },
  { value: "light",     label: "Lightly Active", emoji: "🚶", desc: "Light exercise 1–3 days/wk" },
  { value: "moderate",  label: "Moderate",        emoji: "🏃", desc: "Exercise 3–5 days/wk" },
  { value: "active",    label: "Very Active",     emoji: "🏋️", desc: "Hard exercise 6–7 days/wk" },
  { value: "extreme",   label: "Extra Active",    emoji: "⚡", desc: "Physical job + daily training" },
];

const GOAL_OPTIONS: { value: Goal; label: string; icon: string; color: string; textColor: string; borderColor: string; bgColor: string }[] = [
  { value: "lose",     label: "Cut",     icon: "📉", color: "#DC2626", textColor: "text-red-600",     borderColor: "border-red-500",     bgColor: "bg-red-50"     },
  { value: "maintain", label: "Maintain", icon: "⚖️",  color: "#059669", textColor: "text-emerald-600", borderColor: "border-emerald-500", bgColor: "bg-emerald-50" },
  { value: "gain",     label: "Bulk",    icon: "💪", color: "#7C3AED", textColor: "text-violet-600",  borderColor: "border-violet-500", bgColor: "bg-violet-50"  },
];

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
    result.bmi < 18.5 ? "text-[#0F2447]" :
    result.bmi < 25   ? "text-emerald-600" :
    result.bmi < 30   ? "text-[#E8500A]" : "text-red-600";

  const activeGoal = GOAL_OPTIONS.find((g) => g.value === goal)!;

  return (
    <div className="space-y-5">

      {/* ── Input card ── */}
      <div className="bg-white rounded-2xl border border-[#F0E4D4] p-5 space-y-6">

        {/* Row: Gender cards + Unit toggle */}
        <div className="flex items-start justify-between gap-4">
          {/* Gender */}
          <div className="flex-1">
            <p className="text-xs font-semibold text-[#7A6048] uppercase tracking-wide mb-2">Gender</p>
            <div className="grid grid-cols-2 gap-2">
              {(["male", "female"] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => setGender(g)}
                  className={`flex flex-col items-center gap-1.5 py-3 rounded-2xl border-2 font-semibold text-sm transition-all ${
                    gender === g
                      ? "bg-[#0F2447] border-[#0F2447] text-white"
                      : "bg-white border-[#F0E4D4] text-[#7A6048] hover:border-[#E8500A]/40"
                  }`}
                >
                  <span className="text-xl">{g === "male" ? "♂" : "♀"}</span>
                  <span className="capitalize">{g}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Unit toggle */}
          <div>
            <p className="text-xs font-semibold text-[#7A6048] uppercase tracking-wide mb-2">Unit</p>
            <div className="flex bg-[#FDF6EE] border border-[#F0E4D4] rounded-xl p-0.5">
              {(["metric", "imperial"] as const).map((u) => (
                <button
                  key={u}
                  onClick={() => setUnit(u)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all capitalize ${
                    unit === u
                      ? "bg-white text-[#E8500A] shadow-sm border border-[#F0E4D4]"
                      : "text-[#7A6048]"
                  }`}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Age / Weight / Height */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Age",    value: age,    set: setAge,    suffix: "yrs", min: 10, max: 90 },
            { label: "Weight", value: weight, set: setWeight, suffix: unit === "metric" ? "kg"  : "lbs", min: unit === "metric" ? 30  : 66, max: unit === "metric" ? 200 : 440 },
            { label: "Height", value: height, set: setHeight, suffix: unit === "metric" ? "cm"  : "in",  min: unit === "metric" ? 100 : 39, max: unit === "metric" ? 230 : 91  },
          ].map(({ label, value, set, suffix, min, max }) => (
            <div key={label}>
              <label className="text-xs font-semibold text-[#7A6048] uppercase tracking-wide block mb-1.5">{label}</label>
              <div className="flex items-center gap-1 border border-[#F0E4D4] rounded-xl px-3 py-2.5 bg-[#FDF6EE] focus-within:border-[#E8500A] focus-within:ring-2 focus-within:ring-[#E8500A]/20 transition-all">
                <input
                  type="number"
                  value={value}
                  min={min}
                  max={max}
                  onChange={(e) => set(Math.min(max, Math.max(min, parseInt(e.target.value) || min)))}
                  className="flex-1 text-right font-bold text-[#0F2447] text-base bg-transparent focus:outline-none"
                />
                <span className="text-[#7A6048] text-xs">{suffix}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Activity level */}
        <div>
          <p className="text-xs font-semibold text-[#7A6048] uppercase tracking-wide mb-2.5">Activity Level</p>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
            {ACTIVITY_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setActivity(opt.value)}
                className={`flex flex-col items-center text-center gap-1 px-2 py-3 rounded-2xl border-2 transition-all ${
                  activity === opt.value
                    ? "border-[#E8500A] bg-[#FFF5EF]"
                    : "border-[#F0E4D4] bg-white hover:border-[#E8500A]/40 hover:bg-[#FFF9F5]"
                }`}
              >
                <span className="text-2xl">{opt.emoji}</span>
                <span className={`text-xs font-semibold leading-tight ${activity === opt.value ? "text-[#E8500A]" : "text-[#0F2447]"}`}>
                  {opt.label}
                </span>
                <span className="text-[10px] text-[#7A6048] leading-tight">{opt.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Goal */}
        <div>
          <p className="text-xs font-semibold text-[#7A6048] uppercase tracking-wide mb-2.5">Goal</p>
          <div className="grid grid-cols-3 gap-2">
            {GOAL_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setGoal(opt.value)}
                className={`flex flex-col items-center gap-1.5 py-3 rounded-2xl border-2 font-semibold text-sm transition-all ${
                  goal === opt.value
                    ? `${opt.borderColor} ${opt.bgColor} ${opt.textColor}`
                    : "border-[#F0E4D4] bg-white text-[#7A6048] hover:border-[#F0E4D4]"
                }`}
              >
                <span className="text-xl">{opt.icon}</span>
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Results ── */}
      <div className="space-y-3">

        {/* TDEE hero card */}
        <div className="bg-[#0F2447] rounded-2xl p-5 text-white">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-[#8BA3CC] text-xs font-semibold uppercase tracking-widest mb-1">
                Daily Target — {goalLabel}
              </p>
              <div className="flex items-end gap-2">
                <span className="text-5xl font-bold">{result.targetCalories.toLocaleString()}</span>
                <span className="text-[#8BA3CC] text-sm mb-1.5">kcal / day</span>
              </div>
              <p className="text-[#8BA3CC] text-xs mt-1">{deficitLabel}</p>
            </div>

            <div className="flex sm:flex-col gap-3 sm:gap-2 sm:text-right">
              <div className="flex-1 sm:flex-none bg-white/10 rounded-xl px-4 py-2.5">
                <p className="text-[#8BA3CC] text-xs">BMR</p>
                <p className="font-bold text-lg">{result.bmr.toLocaleString()}</p>
              </div>
              <div className="flex-1 sm:flex-none bg-white/10 rounded-xl px-4 py-2.5">
                <p className="text-[#8BA3CC] text-xs">TDEE</p>
                <p className="font-bold text-lg">{result.tdee.toLocaleString()}</p>
              </div>
              <div className="flex-1 sm:flex-none bg-white/10 rounded-xl px-4 py-2.5">
                <p className="text-[#8BA3CC] text-xs">BMI</p>
                <p className={`font-bold text-lg ${bmiColor}`}>{result.bmi}</p>
                <p className="text-[#8BA3CC] text-[10px]">{result.bmiLabel}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Macro breakdown */}
        <div className="bg-white rounded-2xl border border-[#F0E4D4] p-5">
          <p className="text-xs font-semibold text-[#7A6048] uppercase tracking-wide mb-4">Daily Macros</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { label: "Protein", grams: result.protein, cal: result.protein * 4, pillBg: "bg-[#F0F4FF]",   pillText: "text-[#0F2447]",   barColor: "bg-[#0F2447]"   },
              { label: "Fat",     grams: result.fat,     cal: result.fat * 9,     pillBg: "bg-[#FFF8F2]",  pillText: "text-[#E8500A]",  barColor: "bg-[#E8500A]"  },
              { label: "Carbs",   grams: result.carbs,   cal: result.carbs * 4,   pillBg: "bg-emerald-100",pillText: "text-emerald-700",barColor: "bg-emerald-500"},
            ].map((m) => {
              const maxCal = result.targetCalories;
              const pct = Math.min(100, Math.round((m.cal / maxCal) * 100));
              return (
                <div key={m.label} className="bg-[#FDF6EE] rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${m.pillBg} ${m.pillText}`}>
                      {m.label}
                    </span>
                    <span className="text-[#7A6048] text-xs">{pct}%</span>
                  </div>
                  <div>
                    <span className="text-2xl font-bold text-[#0F2447]">{m.grams}g</span>
                    <span className="text-[#7A6048] text-xs ml-1.5">{m.cal} kcal</span>
                  </div>
                  <div className="bg-[#F0E4D4] rounded-full h-1.5">
                    <div className={`${m.barColor} h-1.5 rounded-full`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
