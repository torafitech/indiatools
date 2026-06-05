"use client";

import { useState, useMemo } from "react";
import { calculateGratuity } from "@/lib/calculations/gratuity";
import { formatINR, formatINRShort } from "@/lib/utils/format";

function parseCurrency(s: string): number {
  const clean = s.toLowerCase().replace(/,/g, "").trim();
  if (clean.includes("cr")) return parseFloat(clean) * 10000000;
  if (clean.includes("l")) return parseFloat(clean) * 100000;
  if (clean.includes("k")) return parseFloat(clean) * 1000;
  return parseFloat(clean);
}

export function GratuityCalculator() {
  const [basicDA, setBasicDA]           = useState(50000);
  const [serviceYears, setServiceYears] = useState(5);
  const [empType, setEmpType]           = useState<"permanent" | "fixed-term">("permanent");
  const [coverage, setCoverage]         = useState<"covered" | "not-covered">("covered");
  const [rawBasic, setRawBasic]         = useState("");
  const [basicFocused, setBasicFocused] = useState(false);

  const result = useMemo(
    () => calculateGratuity(basicDA, serviceYears, empType, coverage),
    [basicDA, serviceYears, empType, coverage]
  );

  const basicPct = ((basicDA - 5000) / (500000 - 5000)) * 100;
  const yearsPct = ((serviceYears - 0) / (40 - 0)) * 100;

  function commitBasic(s: string) {
    const n = parseCurrency(s);
    if (!isNaN(n) && n > 0) setBasicDA(Math.min(500000, Math.max(5000, n)));
  }

  return (
    <div className="bg-white rounded-2xl border border-[#F0E4D4] shadow-sm overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-5">

        {/* LEFT */}
        <div className="md:col-span-3 p-6 space-y-6 md:border-r border-[#F0E4D4]">

          {/* Basic + DA */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm font-semibold text-[#0F2447] flex-1">Last Drawn Basic + DA (monthly)</span>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A6048] text-sm pointer-events-none">₹</span>
                <input type="text"
                  value={basicFocused ? rawBasic : formatINR(basicDA)}
                  onFocus={() => { setRawBasic(String(basicDA)); setBasicFocused(true); }}
                  onChange={(e) => setRawBasic(e.target.value)}
                  onBlur={() => { commitBasic(rawBasic); setBasicFocused(false); }}
                  onKeyDown={(e) => { if (e.key === "Enter") { commitBasic(rawBasic); (e.target as HTMLInputElement).blur(); } }}
                  className="font-bold text-[#0F2447] text-sm bg-[#FFF8F2] border border-[#FFDCBA] focus:border-[#E8500A] focus:ring-2 focus:ring-[#E8500A]/20 focus:bg-white pl-7 pr-3 py-2 rounded-xl text-right w-36 transition-colors focus:outline-none"
                />
              </div>
            </div>
            <input type="range" min={5000} max={500000} step={1000} value={basicDA}
              onChange={(e) => setBasicDA(parseFloat(e.target.value))}
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer focus:outline-none"
              style={{ background: `linear-gradient(to right, #E8500A ${basicPct}%, #F0E4D4 ${basicPct}%)` }} />
            <div className="flex justify-between text-xs text-[#7A6048]"><span>₹5K</span><span>₹5L</span></div>
          </div>

          {/* Years of service */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm font-semibold text-[#0F2447] flex-1">Years of Service</span>
              <div className="relative">
                <input type="number" value={serviceYears} min={0} max={40} step={0.5}
                  onChange={(e) => setServiceYears(Math.max(0, Math.min(40, parseFloat(e.target.value) || 0)))}
                  className="font-bold text-[#0F2447] text-sm bg-[#FFF8F2] border border-[#FFDCBA] focus:border-[#E8500A] focus:ring-2 focus:ring-[#E8500A]/20 focus:bg-white px-3 py-2 rounded-xl text-right w-24 transition-colors focus:outline-none"
                />
              </div>
            </div>
            <input type="range" min={0} max={40} step={0.5} value={serviceYears}
              onChange={(e) => setServiceYears(parseFloat(e.target.value))}
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer focus:outline-none"
              style={{ background: `linear-gradient(to right, #E8500A ${yearsPct}%, #F0E4D4 ${yearsPct}%)` }} />
            <div className="flex justify-between text-xs text-[#7A6048]"><span>0 yrs</span><span>40 yrs</span></div>
            <p className="text-xs text-[#7A6048]">Decimal accepted — e.g. 4.5 = 4 years 6 months</p>
          </div>

          {/* Employment type */}
          <div className="space-y-2">
            <span className="text-sm font-semibold text-[#0F2447] block">Employment Type</span>
            <div className="grid grid-cols-2 gap-2">
              {([
                { v: "permanent" as const, label: "Permanent", sub: "Eligible after 5 years" },
                { v: "fixed-term" as const, label: "Fixed-Term Contract", sub: "Eligible after 1 year (new rule)" },
              ]).map((opt) => (
                <button key={opt.v} onClick={() => setEmpType(opt.v)}
                  className={`flex flex-col items-start gap-0.5 px-4 py-3 rounded-xl border-2 text-left transition-all ${empType === opt.v ? "bg-[#E8500A] text-white border-[#E8500A]" : "bg-white text-[#7A6048] border-[#F0E4D4] hover:border-[#E8500A]/40"}`}>
                  <span className="font-semibold text-sm">{opt.label}</span>
                  <span className={`text-[11px] ${empType === opt.v ? "text-white/70" : "text-[#7A6048]"}`}>{opt.sub}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Coverage */}
          <div className="space-y-2">
            <span className="text-sm font-semibold text-[#0F2447] block">Organisation Type</span>
            <div className="flex gap-2">
              {([
                { v: "covered" as const, label: "Covered by Gratuity Act", sub: "÷26" },
                { v: "not-covered" as const, label: "Not Covered", sub: "÷30" },
              ]).map((opt) => (
                <button key={opt.v} onClick={() => setCoverage(opt.v)}
                  className={`flex-1 py-2.5 px-3 rounded-xl text-sm font-medium border transition-all ${coverage === opt.v ? "bg-[#E8500A] text-white border-[#E8500A]" : "bg-white text-[#7A6048] border-[#F0E4D4] hover:border-[#E8500A]"}`}>
                  {opt.label}
                </button>
              ))}
            </div>
            <p className="text-xs text-[#7A6048]">Most companies with 10+ employees are covered by the Act</p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="md:col-span-2 bg-[#0F2447] p-6 flex flex-col space-y-4">

          {/* Eligibility badge */}
          <div className={`text-center rounded-xl py-2 px-3 ${result.isEligible ? "bg-emerald-500/20 border border-emerald-500/30" : "bg-[#E8500A]/20 border border-[#E8500A]/30"}`}>
            <p className={`text-sm font-bold ${result.isEligible ? "text-emerald-400" : "text-[#FFDCBA]"}`}>
              {result.isEligible ? "✓ Eligible for Gratuity" : `✗ Not yet eligible (need ${empType === "fixed-term" ? "1 yr" : "5 yrs"})`}
            </p>
          </div>

          {/* Main amount */}
          <div className="text-center">
            <p className="text-[#E8500A] text-xs font-bold uppercase tracking-widest mb-1.5">Gratuity Amount</p>
            <p className="text-5xl font-extrabold text-white leading-none">{formatINRShort(result.gratuityAmount)}</p>
            <p className="text-white/40 text-xs mt-1.5">{formatINR(result.gratuityAmount)} total</p>
          </div>

          <div className="border-t border-white/10" />

          {/* Breakdown */}
          <div className="space-y-2">
            {[
              { label: "Years counted", value: `${result.roundedYears} yrs`, sub: result.eligibleYears !== result.roundedYears ? `(${result.eligibleYears.toFixed(1)} actual → rounded)` : "" },
              { label: "Tax-exempt", value: formatINRShort(result.taxExemptAmount), sub: "Up to ₹20L ceiling" },
              { label: "Taxable portion", value: formatINRShort(result.taxableAmount), sub: result.taxableAmount > 0 ? "30% TDS applies" : "—" },
              { label: "Monthly accrual", value: formatINR(result.monthlyAccrual), sub: "Earned every month" },
            ].map((row) => (
              <div key={row.label} className="flex justify-between items-center px-3 py-2 bg-white/5 rounded-xl">
                <div>
                  <span className="text-xs text-white/70">{row.label}</span>
                  {row.sub && <p className="text-white/35 text-[10px]">{row.sub}</p>}
                </div>
                <span className="text-sm font-semibold text-white tabular-nums">{row.value}</span>
              </div>
            ))}
          </div>

          {empType === "fixed-term" && (
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3">
              <p className="text-xs text-emerald-400 font-medium">
                ✓ New Labour Code: fixed-term employees now eligible after just 1 year of service
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
