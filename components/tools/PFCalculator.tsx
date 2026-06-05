"use client";

import { useState, useMemo } from "react";
import { calculatePFCorpus } from "@/lib/calculations/pf-corpus";
import { formatINR, formatINRShort } from "@/lib/utils/format";

function parseCurrency(s: string): number {
  const clean = s.toLowerCase().replace(/,/g, "").trim();
  if (clean.includes("cr")) return parseFloat(clean) * 10000000;
  if (clean.includes("l")) return parseFloat(clean) * 100000;
  if (clean.includes("k")) return parseFloat(clean) * 1000;
  return parseFloat(clean);
}

function SliderField({
  label, value, min, max, step, display, onChange, minLabel, maxLabel, suffix,
}: {
  label: string; value: number; min: number; max: number; step: number;
  display: string; onChange: (v: number) => void; minLabel?: string; maxLabel?: string; suffix?: string;
}) {
  const [focused, setFocused] = useState(false);
  const [raw, setRaw] = useState("");
  const pct = ((value - min) / (max - min)) * 100;

  function commit(s: string) {
    const n = parseFloat(s.replace(/,/g, ""));
    if (!isNaN(n)) onChange(Math.min(max, Math.max(min, n)));
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-semibold text-[#0F2447] truncate">{label}</span>
        <div className="relative shrink-0">
          <input type="text"
            value={focused ? raw : display}
            onFocus={() => { setRaw(String(value)); setFocused(true); }}
            onChange={(e) => setRaw(e.target.value)}
            onBlur={() => { commit(raw); setFocused(false); }}
            onKeyDown={(e) => { if (e.key === "Enter") { commit(raw); (e.target as HTMLInputElement).blur(); } }}
            className={`font-bold text-[#0F2447] text-sm bg-[#FFF8F2] border border-[#FFDCBA] focus:border-[#E8500A] focus:ring-2 focus:ring-[#E8500A]/20 focus:bg-white pl-3 py-2 rounded-xl text-right w-28 transition-colors focus:outline-none ${suffix ? "pr-8" : "pr-3"}`}
          />
          {suffix && (
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#7A6048] text-xs pointer-events-none select-none">
              {suffix}
            </span>
          )}
        </div>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer focus:outline-none"
        style={{ background: `linear-gradient(to right, #E8500A ${pct}%, #F0E4D4 ${pct}%)` }} />
      <div className="flex justify-between text-xs text-[#7A6048]">
        <span>{minLabel ?? String(min)}</span>
        <span>{maxLabel ?? String(max)}</span>
      </div>
    </div>
  );
}

export function PFCalculator() {
  const [basicMonthly, setBasic]   = useState(40000);
  const [currentAge, setAge]       = useState(30);
  const [retirementAge, setRetAge] = useState(58);
  const [currentPF, setPF]         = useState(200000);
  const [growthRate, setGrowth]    = useState(8);
  const [epfRate, setEpfRate]      = useState(8.25);
  const [applyNewCode, setNewCode] = useState(false);

  const effectiveBasic = applyNewCode ? Math.max(basicMonthly, Math.round(basicMonthly * 1.25)) : basicMonthly;

  const result = useMemo(
    () => calculatePFCorpus(effectiveBasic, currentAge, retirementAge, currentPF, growthRate, epfRate),
    [effectiveBasic, currentAge, retirementAge, currentPF, growthRate, epfRate]
  );

  const maxBalance = result.yearlySnapshots.length > 0
    ? Math.max(...result.yearlySnapshots.map((s) => s.balance))
    : 1;

  const svgWidth = 320;
  const svgHeight = 120;
  const snapshots = result.yearlySnapshots;

  const points = snapshots.map((s, i) => {
    const x = (i / Math.max(snapshots.length - 1, 1)) * svgWidth;
    const y = svgHeight - (s.balance / maxBalance) * svgHeight;
    return `${x},${y}`;
  }).join(" ");

  return (
    <div className="bg-white rounded-2xl border border-[#F0E4D4] shadow-sm overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-5">

        {/* LEFT */}
        <div className="md:col-span-3 p-6 space-y-5 md:border-r border-[#F0E4D4]">
          <SliderField label="Monthly Basic Salary" value={basicMonthly} min={10000} max={500000} step={1000}
            display={"₹" + basicMonthly.toLocaleString("en-IN")} onChange={setBasic} minLabel="₹10K" maxLabel="₹5L" />
          <div className="grid grid-cols-2 gap-4">
            <SliderField label="Current Age" value={currentAge} min={18} max={57} step={1}
              display={String(currentAge)} onChange={setAge} suffix=" yrs" minLabel="18" maxLabel="57" />
            <SliderField label="Retirement Age" value={retirementAge} min={Math.max(currentAge + 1, 45)} max={65} step={1}
              display={String(retirementAge)} onChange={setRetAge} suffix=" yrs" minLabel="45" maxLabel="65" />
          </div>
          <SliderField label="Current PF Balance" value={currentPF} min={0} max={5000000} step={10000}
            display={formatINRShort(currentPF)} onChange={setPF} minLabel="₹0" maxLabel="₹50L" />
          <div className="grid grid-cols-2 gap-4">
            <SliderField label="Salary Growth/yr" value={growthRate} min={0} max={20} step={0.5}
              display={`${growthRate}%`} onChange={setGrowth} suffix="%" minLabel="0%" maxLabel="20%" />
            <SliderField label="EPF Interest Rate" value={epfRate} min={6} max={12} step={0.05}
              display={`${epfRate}%`} onChange={setEpfRate} suffix="%" minLabel="6%" maxLabel="12%" />
          </div>

          {/* New Labour Code toggle */}
          <div className="bg-[#FFF8F2] border border-[rgba(232,80,10,0.2)] rounded-xl p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-[#0F2447]">Apply 50% Wage Rule (New Labour Code)</p>
                <p className="text-xs text-[#7A6048] mt-0.5">Increases basic by ~25% if below 50% of CTC</p>
              </div>
              <button onClick={() => setNewCode(!applyNewCode)}
                className={`relative shrink-0 w-11 h-6 rounded-full transition-colors ${applyNewCode ? "bg-[#E8500A]" : "bg-gray-200"}`}>
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${applyNewCode ? "translate-x-6" : "translate-x-1"}`} />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="md:col-span-2 bg-[#0F2447] p-6 flex flex-col space-y-4">
          <div className="text-center">
            <p className="text-[#E8500A] text-xs font-bold uppercase tracking-widest mb-1.5">Corpus at Retirement</p>
            <p className="text-5xl font-extrabold text-white leading-none">{formatINRShort(result.totalCorpus)}</p>
            <p className="text-white/40 text-xs mt-1.5">In {result.yearsToRetirement} years at age {retirementAge}</p>
          </div>

          <div className="border-t border-white/10" />

          {/* SVG chart */}
          {snapshots.length > 1 && (
            <div className="rounded-xl overflow-hidden bg-white/5 p-3">
              <svg width="100%" viewBox={`0 0 ${svgWidth} ${svgHeight}`} preserveAspectRatio="none">
                <defs>
                  <linearGradient id="pfGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#E8500A" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#E8500A" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <polygon
                  points={`0,${svgHeight} ${points} ${svgWidth},${svgHeight}`}
                  fill="url(#pfGrad)"
                />
                <polyline points={points} fill="none" stroke="#E8500A" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
              </svg>
              <div className="flex justify-between text-[10px] text-white/30 mt-1">
                <span>Age {currentAge}</span>
                <span>Age {retirementAge}</span>
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            {[
              { label: "Your contributions", value: result.totalEmployeeContribution, color: "text-white" },
              { label: "Employer contributions", value: result.totalEmployerContribution, color: "text-white" },
              { label: "Interest earned", value: result.totalInterest, color: "text-emerald-400" },
            ].map((row) => (
              <div key={row.label} className="flex justify-between items-center px-3 py-2 bg-white/5 rounded-xl">
                <span className="text-xs text-white/60">{row.label}</span>
                <span className={`text-sm font-semibold tabular-nums ${row.color}`}>{formatINRShort(row.value)}</span>
              </div>
            ))}
            <div className="flex justify-between items-center px-3 py-2.5 bg-[#E8500A]/20 border border-[#E8500A]/30 rounded-xl">
              <span className="text-sm font-bold text-white">Monthly pension est.</span>
              <span className="text-base font-bold text-[#E8500A] tabular-nums">{formatINR(result.equivalentMonthlyPension)}</span>
            </div>
          </div>

          <p className="text-[10px] text-white/25 text-center">4% SWR applied on corpus. Estimate only.</p>
        </div>
      </div>
    </div>
  );
}
