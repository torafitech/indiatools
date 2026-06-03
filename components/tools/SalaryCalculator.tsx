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
    <div className="space-y-2.5">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm font-medium text-gray-600 flex-1 min-w-[90px]">{label}</span>
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
          className="font-bold text-gray-900 text-sm bg-blue-50 border border-blue-100 focus:border-blue-500 focus:bg-white px-3 py-1.5 rounded-lg text-right w-36 transition-colors focus:outline-none"
        />
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
          background: `linear-gradient(to right, #2563eb ${pct}%, #e2e8f0 ${pct}%)`,
        }}
      />
      <div className="flex justify-between text-xs text-gray-400">
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

function BreakdownRow({
  label,
  value,
  sub,
  positive,
  bold,
  separator,
}: {
  label: string;
  value: string;
  sub?: string;
  positive?: boolean;
  bold?: boolean;
  separator?: boolean;
}) {
  return (
    <>
      {separator && <div className="border-t border-blue-500/30 my-2" />}
      <div className={`flex justify-between items-start gap-2 ${bold ? "font-semibold" : ""}`}>
        <div>
          <span className={`text-xs ${bold ? "text-white" : "text-blue-100"}`}>{label}</span>
          {sub && <span className="block text-blue-300 text-xs">{sub}</span>}
        </div>
        <span className={`text-sm font-medium tabular-nums whitespace-nowrap ${
          bold ? "text-white text-base font-bold" :
          positive ? "text-green-300" : "text-white"
        }`}>
          {value}
        </span>
      </div>
    </>
  );
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
      "Calculated on IndiaTools.in/salary-calculator",
    ].filter((l) => l !== undefined && l !== null);

    navigator.clipboard.writeText(lines.join("\n")).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-5">

        {/* LEFT: Inputs */}
        <div className="md:col-span-3 p-6 space-y-6 md:border-r border-gray-100">

          <SliderRow
            label="Annual CTC"
            value={ctc}
            min={200000}
            max={5000000}
            step={50000}
            display={formatINRShort(ctc)}
            parseInput={parseCurrency}
            onChange={setCTC}
            minLabel="₹2 L"
            maxLabel="₹50 L"
          />

          {/* PF toggle */}
          <div className="space-y-2">
            <span className="text-sm font-medium text-gray-600">EPF Contribution</span>
            <div className="flex gap-2">
              {[
                { label: "Opted In (12% basic)", value: true },
                { label: "Opted Out", value: false },
              ].map((opt) => (
                <button
                  key={String(opt.value)}
                  onClick={() => setPF(opt.value)}
                  className={`flex-1 py-2 px-3 rounded-xl text-sm font-medium border transition-all ${
                    pfOptIn === opt.value
                      ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                      : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* City type */}
          <div className="space-y-2">
            <span className="text-sm font-medium text-gray-600">City Type</span>
            <div className="flex gap-2">
              {(["metro", "non-metro"] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setCity(c)}
                  className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-all capitalize ${
                    city === c
                      ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                      : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600"
                  }`}
                >
                  {c === "metro" ? "Metro (Delhi/Mumbai/Chennai/Kolkata)" : "Non-Metro"}
                </button>
              ))}
            </div>
          </div>

          {/* State selector */}
          <div className="space-y-2">
            <label htmlFor="state-select" className="text-sm font-medium text-gray-600 block">
              State (for Professional Tax)
            </label>
            <select
              id="state-select"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            >
              {ALL_STATES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Quick note */}
          <p className="text-xs text-gray-400 leading-relaxed">
            Tax calculated under new regime (FY 2025-26). Actual figures may vary based on other deductions and employer structure.
          </p>
        </div>

        {/* RIGHT: Results (desktop) */}
        <div className="hidden md:flex md:col-span-2 flex-col bg-gradient-to-br from-blue-600 via-blue-600 to-blue-700 p-6">

          {/* Hero */}
          <div className="text-center mb-5">
            <p className="text-blue-200 text-xs font-semibold uppercase tracking-widest mb-2">
              Monthly In-Hand
            </p>
            <p className="text-5xl font-bold text-white tracking-tight">
              {formatINR(result.inHandMonthly)}
            </p>
            <p className="text-blue-300 text-xs mt-2">
              {formatINRShort(result.inHandAnnual)} / year · {result.takeHomePercent}% of CTC
            </p>
          </div>

          <div className="border-t border-blue-500/50 mb-4" />

          {/* Breakdown */}
          <div className="space-y-2 flex-1">
            <p className="text-blue-300 text-xs font-semibold uppercase tracking-wide mb-1">Earnings</p>

            <BreakdownRow label="Basic" value={formatINR(result.basicMonthly)} sub="40% of CTC" />
            <BreakdownRow label="HRA" value={formatINR(result.hra)} sub={`${city === "metro" ? "50" : "40"}% of basic`} />
            <BreakdownRow label="Special Allowance" value={formatINR(result.specialAllowance)} />
            {pfOptIn && (
              <BreakdownRow label="Employer PF" value={formatINR(result.employerPF)} sub="12% basic (in CTC)" />
            )}
            <BreakdownRow
              label="Gross Monthly"
              value={formatINR(result.grossMonthly)}
              bold
              separator
            />

            <p className="text-blue-300 text-xs font-semibold uppercase tracking-wide mt-3 mb-1">Deductions</p>

            {pfOptIn && (
              <BreakdownRow label="Employee PF" value={`−${formatINR(result.employeePF)}`} sub="12% basic" />
            )}
            {result.professionalTax > 0 && (
              <BreakdownRow label="Professional Tax" value={`−${formatINR(result.professionalTax)}`} />
            )}
            <BreakdownRow label="Income Tax" value={`−${formatINR(result.incomeTaxMonthly)}`} sub="New regime" />
            <BreakdownRow
              label="Total Deductions"
              value={`−${formatINR(result.totalDeductions)}`}
              separator
              bold
            />

            <BreakdownRow
              label="Monthly In-Hand"
              value={formatINR(result.inHandMonthly)}
              positive
              separator
              bold
            />
          </div>

          <div className="mt-4 pt-4 border-t border-blue-500/40">
            <button
              onClick={handleCopy}
              className="w-full flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs py-2.5 px-3 rounded-xl transition-all"
            >
              {copied ? "✓ Copied!" : "📋 Copy Breakdown"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile results bar */}
      <div className="md:hidden border-t border-gray-100 bg-blue-600 px-4 pt-4 pb-4">
        <div className="flex items-start justify-between text-white mb-3">
          <div>
            <p className="text-blue-200 text-xs mb-0.5">Monthly In-Hand</p>
            <p className="text-3xl font-bold">{formatINR(result.inHandMonthly)}</p>
            <p className="text-blue-300 text-xs mt-0.5">{result.takeHomePercent}% of CTC</p>
          </div>
          <div className="text-right space-y-1.5">
            <div>
              <p className="text-blue-200 text-xs">Annual In-Hand</p>
              <p className="font-bold text-green-300">{formatINRShort(result.inHandAnnual)}</p>
            </div>
            <div>
              <p className="text-blue-200 text-xs">Monthly Tax</p>
              <p className="font-bold text-orange-300">{formatINR(result.incomeTaxMonthly)}</p>
            </div>
          </div>
        </div>

        {/* Mini breakdown */}
        <div className="bg-white/10 rounded-xl p-3 text-xs text-blue-100 space-y-1.5 mb-3">
          <div className="flex justify-between">
            <span>Gross Monthly</span>
            <span className="font-semibold text-white">{formatINR(result.grossMonthly)}</span>
          </div>
          <div className="flex justify-between">
            <span>Total Deductions</span>
            <span className="font-semibold text-orange-300">−{formatINR(result.totalDeductions)}</span>
          </div>
          <div className="border-t border-white/20 pt-1.5 flex justify-between font-bold">
            <span className="text-white">In-Hand</span>
            <span className="text-green-300">{formatINR(result.inHandMonthly)}</span>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="w-full text-xs bg-white/10 hover:bg-white/20 text-white py-2.5 rounded-xl border border-white/20"
        >
          {copied ? "✓ Copied!" : "📋 Copy Salary Breakdown"}
        </button>
      </div>
    </div>
  );
}
