"use client";

import { useState, useMemo } from "react";
import { calculateInHandSalary } from "@/lib/calculations/salary";
import { formatINR, formatINRShort } from "@/lib/utils/format";
import { ALL_STATES } from "@/data/states";

interface SalaryCalculatorProps {
  defaultCTC?: number;
  defaultState?: string;
  defaultCity?: "metro" | "non-metro";
  defaultPF?: boolean;
}

function SliderRow({
  label,
  value,
  min,
  max,
  step,
  display,
  parseInput,
  onChange,
  minLabel,
  maxLabel,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  parseInput: (s: string) => number;
  onChange: (v: number) => void;
  minLabel?: string;
  maxLabel?: string;
}) {
  const [focused, setFocused] = useState(false);
  const [raw, setRaw] = useState("");
  const pct = ((value - min) / (max - min)) * 100;

  function commit(s: string) {
    const n = parseInput(s);
    if (!isNaN(n) && n > 0) onChange(Math.min(max, Math.max(min, n)));
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-sm font-semibold text-[#0F2447] flex-1 min-w-[90px]">{label}</span>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A6048] text-sm font-medium pointer-events-none">₹</span>
          <input
            type="text"
            value={focused ? raw : display}
            onFocus={() => { setRaw(String(value)); setFocused(true); }}
            onChange={(e) => setRaw(e.target.value)}
            onBlur={() => { commit(raw); setFocused(false); }}
            onKeyDown={(e) => {
              if (e.key === "Enter") { commit(raw); (e.target as HTMLInputElement).blur(); }
              if (e.key === "Escape") { setFocused(false); (e.target as HTMLInputElement).blur(); }
            }}
            className="font-bold text-[#0F2447] text-sm bg-[#FFF8F2] border border-[#FFDCBA] focus:border-[#E8500A] focus:ring-2 focus:ring-[#E8500A]/20 focus:bg-white pl-7 pr-3 py-2 rounded-xl text-right w-36 transition-colors focus:outline-none"
          />
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer focus:outline-none"
        style={{
          background: `linear-gradient(to right, #E8500A ${pct}%, #F0E4D4 ${pct}%)`,
        }}
      />
      <div className="flex justify-between text-xs text-[#7A6048]">
        <span>{minLabel ?? formatINRShort(min)}</span>
        <span>{maxLabel ?? formatINRShort(max)}</span>
      </div>
    </div>
  );
}

function parseCurrency(s: string): number {
  const clean = s.toLowerCase().replace(/,/g, "").trim();
  if (clean.includes("cr")) return parseFloat(clean) * 10000000;
  if (clean.includes("l"))  return parseFloat(clean) * 100000;
  if (clean.includes("k"))  return parseFloat(clean) * 1000;
  return parseFloat(clean);
}

export function SalaryCalculator({
  defaultCTC    = 1200000,
  defaultState  = "Karnataka",
  defaultCity   = "metro",
  defaultPF     = true,
}: SalaryCalculatorProps) {
  const [ctc, setCTC]     = useState(defaultCTC);
  const [pfOptIn, setPF]  = useState(defaultPF);
  const [state, setState] = useState(defaultState);
  const [city, setCity]   = useState<"metro" | "non-metro">(defaultCity);

  const result = useMemo(
    () => calculateInHandSalary(ctc, pfOptIn, state, city),
    [ctc, pfOptIn, state, city]
  );

  const [copied, setCopied] = useState(false);

  function handleCopy() {
    const lines = [
      "CTC to In-Hand Salary Breakdown",
      `Annual CTC: ${formatINRShort(result.ctc)}`,
      "",
      "Earnings (Monthly)",
      `  Basic:              ${formatINR(result.basicMonthly)}`,
      `  HRA:                ${formatINR(result.hra)}`,
      `  Special Allowance:  ${formatINR(result.specialAllowance)}`,
      `  Gross Monthly:      ${formatINR(result.grossMonthly)}`,
      "",
      "Deductions (Monthly)",
      pfOptIn ? `  Employee PF:        ${formatINR(result.employeePF)}` : "",
      result.professionalTax > 0 ? `  Professional Tax:   ${formatINR(result.professionalTax)}` : "",
      `  Income Tax:         ${formatINR(result.incomeTaxMonthly)}`,
      `  Total Deductions:   ${formatINR(result.totalDeductions)}`,
      "",
      `Monthly In-Hand: ${formatINR(result.inHandMonthly)}`,
      `Annual In-Hand:  ${formatINRShort(result.inHandAnnual)}`,
      `Take-Home:       ${result.takeHomePercent}% of CTC`,
      "",
      "Calculated on UtilSpot.app/salary-calculator",
    ].filter((l) => l !== undefined && l !== null);

    navigator.clipboard.writeText(lines.join("\n")).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  const breakdownRows = [
    { label: "Gross Monthly", sub: "Before deductions", value: formatINR(result.grossMonthly), deduction: false },
    ...(pfOptIn ? [{ label: "Employee PF", sub: "12% of basic", value: `−${formatINR(result.employeePF)}`, deduction: true }] : []),
    ...(result.professionalTax > 0 ? [{ label: "Professional Tax", sub: state, value: `−${formatINR(result.professionalTax)}`, deduction: true }] : []),
    { label: "Income Tax (TDS)", sub: "New regime, FY 2025-26", value: `−${formatINR(result.incomeTaxMonthly)}`, deduction: true },
  ];

  return (
    <div className="bg-white rounded-2xl border border-[#F0E4D4] shadow-sm overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-5">

        {/* LEFT: Inputs */}
        <div className="md:col-span-3 p-6 space-y-6 md:border-r border-[#F0E4D4]">

          {/* CTC input — prominent */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-[#0F2447] block">Annual CTC</label>
            <SliderRow
              label=""
              value={ctc}
              min={200000}
              max={10000000}
              step={50000}
              display={formatINRShort(ctc)}
              parseInput={parseCurrency}
              onChange={setCTC}
              minLabel="₹2 L"
              maxLabel="₹1 Cr"
            />
          </div>

          {/* PF toggle */}
          <div className="space-y-2">
            <span className="text-sm font-semibold text-[#0F2447] block">EPF Contribution</span>
            <div className="flex gap-2">
              {[
                { label: "Opted In (12% basic)", value: true },
                { label: "Opted Out", value: false },
              ].map((opt) => (
                <button
                  key={String(opt.value)}
                  onClick={() => setPF(opt.value)}
                  className={`flex-1 py-2.5 px-3 rounded-xl text-sm font-medium border transition-all ${
                    pfOptIn === opt.value
                      ? "bg-[#E8500A] text-white border-[#E8500A] shadow-sm"
                      : "bg-white text-[#7A6048] border-[#F0E4D4] hover:border-[#E8500A] hover:text-[#E8500A]"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* City type */}
          <div className="space-y-2">
            <span className="text-sm font-semibold text-[#0F2447] block">City Type</span>
            <div className="flex gap-2">
              {(["metro", "non-metro"] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setCity(c)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                    city === c
                      ? "bg-[#E8500A] text-white border-[#E8500A] shadow-sm"
                      : "bg-white text-[#7A6048] border-[#F0E4D4] hover:border-[#E8500A] hover:text-[#E8500A]"
                  }`}
                >
                  {c === "metro" ? "Metro" : "Non-Metro"}
                </button>
              ))}
            </div>
            <p className="text-xs text-[#7A6048]">Metro = Delhi / Mumbai / Chennai / Kolkata</p>
          </div>

          {/* State selector */}
          <div className="space-y-2">
            <label htmlFor="state-select" className="text-sm font-semibold text-[#0F2447] block">
              State <span className="font-normal text-[#7A6048]">(for Professional Tax)</span>
            </label>
            <div className="relative">
              <select
                id="state-select"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full border border-[#F0E4D4] rounded-xl px-4 py-2.5 text-sm text-[#0F2447] bg-white focus:outline-none focus:ring-2 focus:ring-[#E8500A]/20 focus:border-[#E8500A] appearance-none transition-colors pr-10 cursor-pointer"
              >
                {ALL_STATES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#7A6048]">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </div>
          </div>

          <p className="text-xs text-[#7A6048] leading-relaxed">
            Tax calculated under new regime (FY 2025-26). Actual figures may vary based on other deductions and employer structure.
          </p>
        </div>

        {/* RIGHT: Results (desktop) */}
        <div className="hidden md:flex md:col-span-2 flex-col bg-[#0F2447] p-6 space-y-5">

          {/* Hero in-hand */}
          <div className="text-center">
            <p className="text-[#E8500A] text-xs font-bold uppercase tracking-widest mb-1.5">
              Monthly In-Hand
            </p>
            <p className="text-5xl font-bold text-white tracking-tight leading-none">
              {formatINR(result.inHandMonthly)}
            </p>
            <p className="text-white/50 text-xs mt-2">
              {formatINRShort(result.inHandAnnual)} / year · {result.takeHomePercent}% of CTC
            </p>
          </div>

          <div className="border-t border-white/10" />

          {/* Deduction breakdown table */}
          <div className="flex-1 space-y-1">
            <p className="text-white/40 text-xs font-semibold uppercase tracking-wide mb-2">Monthly Breakdown</p>

            {breakdownRows.map((row, i) => (
              <div
                key={row.label}
                className={`flex justify-between items-center px-3 py-2 rounded-xl ${
                  i % 2 === 0 ? "bg-white/5" : "bg-transparent"
                }`}
              >
                <div>
                  <span className="text-xs text-white/80">{row.label}</span>
                  {row.sub && <span className="block text-white/35 text-xs">{row.sub}</span>}
                </div>
                <span className={`text-sm font-semibold tabular-nums ${row.deduction ? "text-[#FFDCBA]" : "text-white"}`}>
                  {row.value}
                </span>
              </div>
            ))}

            {/* In-hand row — highlighted */}
            <div className="mt-2 flex justify-between items-center px-3 py-2.5 bg-[#E8500A]/20 border border-[#E8500A]/40 rounded-xl">
              <span className="text-sm font-bold text-white">Monthly In-Hand</span>
              <span className="text-base font-bold text-[#E8500A] tabular-nums">{formatINR(result.inHandMonthly)}</span>
            </div>
          </div>

          <div className="pt-2 border-t border-white/10">
            <button
              onClick={handleCopy}
              className="w-full flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/15 text-white/80 hover:text-white text-xs py-2.5 px-3 rounded-xl transition-all"
            >
              {copied ? "✓ Copied!" : "Copy Breakdown"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile results */}
      <div className="md:hidden border-t border-[#F0E4D4] bg-[#0F2447] px-4 pt-5 pb-5 space-y-4">

        {/* Hero */}
        <div>
          <p className="text-[#E8500A] text-xs font-bold uppercase tracking-widest mb-1">Monthly In-Hand</p>
          <p className="text-4xl font-bold text-white">{formatINR(result.inHandMonthly)}</p>
          <p className="text-white/40 text-xs mt-1">{formatINRShort(result.inHandAnnual)} / year · {result.takeHomePercent}% of CTC</p>
        </div>

        {/* Breakdown table */}
        <div className="rounded-xl overflow-hidden border border-white/10">
          {breakdownRows.map((row, i) => (
            <div
              key={row.label}
              className={`flex justify-between items-center px-4 py-2.5 ${
                i % 2 === 0 ? "bg-white/5" : "bg-transparent"
              } ${i !== 0 ? "border-t border-white/5" : ""}`}
            >
              <span className="text-xs text-white/70">{row.label}</span>
              <span className={`text-sm font-semibold tabular-nums ${row.deduction ? "text-[#FFDCBA]" : "text-white"}`}>
                {row.value}
              </span>
            </div>
          ))}
          <div className="flex justify-between items-center px-4 py-3 bg-[#E8500A]/20 border-t border-[#E8500A]/30">
            <span className="text-sm font-bold text-white">Monthly In-Hand</span>
            <span className="text-base font-bold text-[#E8500A] tabular-nums">{formatINR(result.inHandMonthly)}</span>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="w-full text-xs bg-white/10 hover:bg-white/20 text-white/80 hover:text-white py-2.5 rounded-xl border border-white/15 transition-all"
        >
          {copied ? "✓ Copied!" : "Copy Salary Breakdown"}
        </button>
      </div>
    </div>
  );
}
