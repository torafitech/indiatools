"use client";

import { useState, useMemo } from "react";

const RATES: Record<string, Record<string, Record<string, [number, number]>>> = {
  Developer: {
    India:     { Junior: [8,15],   Mid: [15,30],  Senior: [30,60],  Expert: [60,120] },
    US:        { Junior: [30,50],  Mid: [50,100], Senior: [100,175],Expert: [175,300] },
    UK:        { Junior: [25,45],  Mid: [45,90],  Senior: [90,150], Expert: [150,250] },
    Canada:    { Junior: [25,45],  Mid: [45,85],  Senior: [85,140], Expert: [140,220] },
    Australia: { Junior: [30,50],  Mid: [50,90],  Senior: [90,150], Expert: [150,230] },
    Germany:   { Junior: [25,45],  Mid: [45,85],  Senior: [85,140], Expert: [140,220] },
  },
  Designer: {
    India:     { Junior: [6,12],   Mid: [12,25],  Senior: [25,50],  Expert: [50,100] },
    US:        { Junior: [25,45],  Mid: [45,85],  Senior: [85,150], Expert: [150,250] },
    UK:        { Junior: [20,40],  Mid: [40,75],  Senior: [75,130], Expert: [130,200] },
    Canada:    { Junior: [20,40],  Mid: [40,75],  Senior: [75,130], Expert: [130,200] },
    Australia: { Junior: [25,45],  Mid: [45,80],  Senior: [80,140], Expert: [140,210] },
    Germany:   { Junior: [20,40],  Mid: [40,75],  Senior: [75,130], Expert: [130,200] },
  },
  Writer: {
    India:     { Junior: [4,8],    Mid: [8,18],   Senior: [18,40],  Expert: [40,80]  },
    US:        { Junior: [20,35],  Mid: [35,70],  Senior: [70,120], Expert: [120,200] },
    UK:        { Junior: [15,30],  Mid: [30,60],  Senior: [60,110], Expert: [110,180] },
    Canada:    { Junior: [15,30],  Mid: [30,60],  Senior: [60,110], Expert: [110,180] },
    Australia: { Junior: [18,35],  Mid: [35,65],  Senior: [65,120], Expert: [120,190] },
    Germany:   { Junior: [15,30],  Mid: [30,60],  Senior: [60,110], Expert: [110,180] },
  },
  Consultant: {
    India:     { Junior: [10,20],  Mid: [20,45],  Senior: [45,90],  Expert: [90,180] },
    US:        { Junior: [50,80],  Mid: [80,150], Senior: [150,250],Expert: [250,450] },
    UK:        { Junior: [40,70],  Mid: [70,130], Senior: [130,220],Expert: [220,380] },
    Canada:    { Junior: [40,65],  Mid: [65,120], Senior: [120,200],Expert: [200,350] },
    Australia: { Junior: [45,75],  Mid: [75,135], Senior: [135,220],Expert: [220,380] },
    Germany:   { Junior: [40,70],  Mid: [70,130], Senior: [130,210],Expert: [210,360] },
  },
  Marketer: {
    India:     { Junior: [5,10],   Mid: [10,22],  Senior: [22,45],  Expert: [45,90]  },
    US:        { Junior: [25,45],  Mid: [45,80],  Senior: [80,140], Expert: [140,230] },
    UK:        { Junior: [20,38],  Mid: [38,70],  Senior: [70,120], Expert: [120,200] },
    Canada:    { Junior: [20,38],  Mid: [38,70],  Senior: [70,120], Expert: [120,200] },
    Australia: { Junior: [22,42],  Mid: [42,75],  Senior: [75,130], Expert: [130,210] },
    Germany:   { Junior: [20,38],  Mid: [38,70],  Senior: [70,120], Expert: [120,200] },
  },
};

const SKILLS = ["Developer", "Designer", "Writer", "Consultant", "Marketer"] as const;
const COUNTRIES = ["India", "US", "UK", "Canada", "Australia", "Germany"] as const;
const EXPERIENCES = [
  { label: "Junior", sub: "0–2 yr" },
  { label: "Mid",    sub: "2–5 yr" },
  { label: "Senior", sub: "5–10 yr" },
  { label: "Expert", sub: "10+ yr" },
] as const;
const CURRENCIES = ["USD", "INR", "GBP"] as const;

const USD_TO = { USD: 1, INR: 83, GBP: 1 / 1.27 };
const CURRENCY_SYMBOL: Record<string, string> = { USD: "$", INR: "₹", GBP: "£" };

function fmt(n: number, currency: string): string {
  const sym = CURRENCY_SYMBOL[currency];
  if (currency === "INR") {
    if (n >= 100000) return `${sym}${(n / 100000).toFixed(1)}L`;
    if (n >= 1000) return `${sym}${(n / 1000).toFixed(0)}K`;
    return `${sym}${Math.round(n).toLocaleString("en-IN")}`;
  }
  if (n >= 1000) return `${sym}${(n / 1000).toFixed(0)}K`;
  return `${sym}${Math.round(n)}`;
}

function PillGroup<T extends string>({
  options,
  value,
  onChange,
  renderLabel,
}: {
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
  renderLabel?: (v: T) => React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
            value === opt
              ? "bg-[#E8500A] text-white border-[#E8500A]"
              : "bg-white text-[#7A6048] border-[#F0E4D4] hover:border-[#E8500A] hover:text-[#E8500A]"
          }`}
        >
          {renderLabel ? renderLabel(opt) : opt}
        </button>
      ))}
    </div>
  );
}

function positioning(min: number, max: number): { label: string; color: string; desc: string } {
  const mid = (min + max) / 2;
  if (min < mid * 0.6) return { label: "Budget", color: "text-[#7A6048]", desc: "Below market — good for building portfolio or volume work" };
  if (max > mid * 1.5) return { label: "Premium", color: "text-[#E8500A]", desc: "Top tier — positions you as a specialist, not a commodity" };
  return { label: "Market Rate", color: "text-[#0F2447]", desc: "Competitive rate — attracts quality clients without discounting" };
}

export function FreelanceRateCalculator() {
  const [skill, setSkill] = useState<typeof SKILLS[number]>("Developer");
  const [country, setCountry] = useState<typeof COUNTRIES[number]>("India");
  const [exp, setExp] = useState<"Junior" | "Mid" | "Senior" | "Expert">("Mid");
  const [hoursPerWeek, setHoursPerWeek] = useState(20);
  const [currency, setCurrency] = useState<typeof CURRENCIES[number]>("USD");

  const result = useMemo(() => {
    const [minUSD, maxUSD] = RATES[skill][country][exp];
    const rate = USD_TO[currency];
    const minH = minUSD * rate;
    const maxH = maxUSD * rate;
    const weeksPerMonth = 4.33;
    const minMonthly = minH * hoursPerWeek * weeksPerMonth;
    const maxMonthly = maxH * hoursPerWeek * weeksPerMonth;
    const minAnnual = minMonthly * 12;
    const maxAnnual = maxMonthly * 12;
    const minProject40 = minH * 40;
    const maxProject40 = maxH * 40;
    const pos = positioning(minH, maxH);
    return { minH, maxH, minMonthly, maxMonthly, minAnnual, maxAnnual, minProject40, maxProject40, pos };
  }, [skill, country, exp, hoursPerWeek, currency]);

  const sym = CURRENCY_SYMBOL[currency];

  return (
    <div className="space-y-5">
      {/* Inputs card */}
      <div className="bg-white rounded-2xl border border-[#F0E4D4] p-5 sm:p-6 space-y-6">
        {/* Skill */}
        <div>
          <p className="text-sm font-semibold text-[#0F2447] mb-2">Skill</p>
          <PillGroup options={SKILLS} value={skill} onChange={setSkill} />
        </div>

        {/* Country */}
        <div>
          <p className="text-sm font-semibold text-[#0F2447] mb-2">Country / Market</p>
          <PillGroup options={COUNTRIES} value={country} onChange={setCountry} />
        </div>

        {/* Experience */}
        <div>
          <p className="text-sm font-semibold text-[#0F2447] mb-2">Experience Level</p>
          <div className="flex flex-wrap gap-2">
            {EXPERIENCES.map(({ label, sub }) => (
              <button
                key={label}
                onClick={() => setExp(label)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors flex flex-col items-center leading-tight ${
                  exp === label
                    ? "bg-[#E8500A] text-white border-[#E8500A]"
                    : "bg-white text-[#7A6048] border-[#F0E4D4] hover:border-[#E8500A] hover:text-[#E8500A]"
                }`}
              >
                <span>{label}</span>
                <span className={`text-[10px] mt-0.5 ${exp === label ? "text-orange-100" : "text-[#B0956C]"}`}>{sub}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Billable hours */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-[#0F2447]">Billable Hours / Week</p>
            <span className="text-sm font-bold text-[#E8500A]">{hoursPerWeek} hrs</span>
          </div>
          <input
            type="range"
            min={10}
            max={40}
            step={1}
            value={hoursPerWeek}
            onChange={(e) => setHoursPerWeek(Number(e.target.value))}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-[#E8500A] bg-[#F0E4D4]"
          />
          <div className="flex justify-between text-xs text-[#7A6048] mt-1">
            <span>10 hrs</span>
            <span>40 hrs</span>
          </div>
        </div>

        {/* Currency */}
        <div>
          <p className="text-sm font-semibold text-[#0F2447] mb-2">Display Currency</p>
          <PillGroup options={CURRENCIES} value={currency} onChange={setCurrency} />
        </div>
      </div>

      {/* Results card */}
      <div className="bg-white rounded-2xl border border-[#F0E4D4] p-5 sm:p-6">
        <h2 className="text-base font-bold text-[#0F2447] mb-4">Your Rate Estimate</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Hourly */}
          <div className="bg-[#FFFCF8] rounded-xl border border-[#F0E4D4] p-4">
            <p className="text-xs text-[#7A6048] font-medium uppercase tracking-wide mb-1">Hourly Rate</p>
            <p className="text-2xl sm:text-3xl font-extrabold text-[#0F2447]">
              {sym}{Math.round(result.minH)} – {sym}{Math.round(result.maxH)}
            </p>
            <p className="text-xs text-[#7A6048] mt-1">per hour · {currency}</p>
          </div>

          {/* Market positioning */}
          <div className="bg-[#FFFCF8] rounded-xl border border-[#F0E4D4] p-4">
            <p className="text-xs text-[#7A6048] font-medium uppercase tracking-wide mb-1">Market Position</p>
            <p className={`text-2xl sm:text-3xl font-extrabold ${result.pos.color}`}>{result.pos.label}</p>
            <p className="text-xs text-[#7A6048] mt-1">{result.pos.desc}</p>
          </div>

          {/* Monthly */}
          <div className="bg-[#FFFCF8] rounded-xl border border-[#F0E4D4] p-4">
            <p className="text-xs text-[#7A6048] font-medium uppercase tracking-wide mb-1">Monthly Income</p>
            <p className="text-xl font-extrabold text-[#0F2447]">
              {fmt(result.minMonthly, currency)} – {fmt(result.maxMonthly, currency)}
            </p>
            <p className="text-xs text-[#7A6048] mt-1">at {hoursPerWeek} hrs/week × 4.33 weeks</p>
          </div>

          {/* Annual */}
          <div className="bg-[#FFFCF8] rounded-xl border border-[#F0E4D4] p-4">
            <p className="text-xs text-[#7A6048] font-medium uppercase tracking-wide mb-1">Annual Income</p>
            <p className="text-xl font-extrabold text-[#0F2447]">
              {fmt(result.minAnnual, currency)} – {fmt(result.maxAnnual, currency)}
            </p>
            <p className="text-xs text-[#7A6048] mt-1">projected full-year earnings</p>
          </div>
        </div>

        {/* Project rate */}
        <div className="mt-4 rounded-xl border border-[#F0E4D4] bg-[#FFF5EE] p-4">
          <p className="text-xs text-[#7A6048] font-medium uppercase tracking-wide mb-1">Typical 40-Hour Project</p>
          <p className="text-lg font-bold text-[#E8500A]">
            {fmt(result.minProject40, currency)} – {fmt(result.maxProject40, currency)}
          </p>
          <p className="text-xs text-[#7A6048] mt-0.5">
            {skill} · {country} · {exp} · 40 hrs total
          </p>
        </div>
      </div>
    </div>
  );
}
