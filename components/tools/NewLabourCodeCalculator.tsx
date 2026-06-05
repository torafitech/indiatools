"use client";

import { useState, useMemo } from "react";
import { calculateLabourCodeImpact } from "@/lib/calculations/labour-code";
import { formatINR, formatINRShort } from "@/lib/utils/format";
import { ALL_STATES } from "@/data/states";

interface Props {
  defaultCTC?: number;
  defaultBasicPct?: number;
}

function parseCurrency(s: string): number {
  const clean = s.toLowerCase().replace(/,/g, "").trim();
  if (clean.includes("cr")) return parseFloat(clean) * 10000000;
  if (clean.includes("l"))  return parseFloat(clean) * 100000;
  if (clean.includes("k"))  return parseFloat(clean) * 1000;
  return parseFloat(clean);
}

function CompareRow({
  label,
  oldVal,
  newVal,
  format = (v: number) => formatINR(v),
  highlight = false,
}: {
  label: string;
  oldVal: number;
  newVal: number;
  format?: (v: number) => string;
  highlight?: boolean;
}) {
  const diff = newVal - oldVal;
  const diffColor = diff > 0 ? "text-emerald-400" : diff < 0 ? "text-[#FFDCBA]" : "text-white/40";
  return (
    <div className={`grid grid-cols-3 px-3 py-2 rounded-xl ${highlight ? "bg-white/10 border border-white/10" : "bg-white/5"}`}>
      <span className="text-xs text-white/60 self-center">{label}</span>
      <span className="text-xs font-semibold text-white/80 text-right tabular-nums">{format(oldVal)}</span>
      <span className={`text-xs font-semibold text-right tabular-nums ${highlight ? "text-[#E8500A]" : "text-white"}`}>{format(newVal)}</span>
    </div>
  );
}

export function NewLabourCodeCalculator({ defaultCTC = 1200000, defaultBasicPct = 40 }: Props) {
  const [ctc, setCTC]             = useState(defaultCTC);
  const [basicPct, setBasicPct]   = useState(defaultBasicPct);
  const [state, setState]         = useState("Karnataka");
  const [city, setCity]           = useState<"metro" | "non-metro">("metro");
  const [rawCTC, setRawCTC]       = useState("");
  const [ctcFocused, setCtcFocused] = useState(false);

  const result = useMemo(
    () => calculateLabourCodeImpact(ctc, basicPct, state, city),
    [ctc, basicPct, state, city]
  );

  const belowFifty = basicPct < 50;

  function commitCTC(s: string) {
    const n = parseCurrency(s);
    if (!isNaN(n) && n > 0) setCTC(Math.min(10000000, Math.max(200000, n)));
  }

  const ctcPct = ((ctc - 200000) / (10000000 - 200000)) * 100;
  const basicPctPct = ((basicPct - 10) / (70 - 10)) * 100;

  return (
    <div className="bg-white rounded-2xl border border-[#F0E4D4] shadow-sm overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-5">

        {/* LEFT: Inputs */}
        <div className="md:col-span-3 p-6 space-y-6 md:border-r border-[#F0E4D4]">

          {/* CTC */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm font-semibold text-[#0F2447] flex-1">Annual CTC</span>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A6048] text-sm pointer-events-none">₹</span>
                <input
                  type="text"
                  value={ctcFocused ? rawCTC : formatINRShort(ctc)}
                  onFocus={() => { setRawCTC(String(ctc)); setCtcFocused(true); }}
                  onChange={(e) => setRawCTC(e.target.value)}
                  onBlur={() => { commitCTC(rawCTC); setCtcFocused(false); }}
                  onKeyDown={(e) => { if (e.key === "Enter") { commitCTC(rawCTC); (e.target as HTMLInputElement).blur(); } }}
                  className="font-bold text-[#0F2447] text-sm bg-[#FFF8F2] border border-[#FFDCBA] focus:border-[#E8500A] focus:ring-2 focus:ring-[#E8500A]/20 focus:bg-white pl-7 pr-3 py-2 rounded-xl text-right w-36 transition-colors focus:outline-none"
                />
              </div>
            </div>
            <input type="range" min={200000} max={10000000} step={50000} value={ctc}
              onChange={(e) => setCTC(parseFloat(e.target.value))}
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer focus:outline-none"
              style={{ background: `linear-gradient(to right, #E8500A ${ctcPct}%, #F0E4D4 ${ctcPct}%)` }} />
            <div className="flex justify-between text-xs text-[#7A6048]">
              <span>₹2 L</span><span>₹1 Cr</span>
            </div>
          </div>

          {/* Current basic % */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm font-semibold text-[#0F2447] flex-1">Current Basic % of CTC</span>
              <div className="relative">
                <input
                  type="number"
                  value={basicPct}
                  min={10} max={70}
                  onChange={(e) => setBasicPct(Math.max(10, Math.min(70, parseInt(e.target.value) || 10)))}
                  className="font-bold text-[#0F2447] text-sm bg-[#FFF8F2] border border-[#FFDCBA] focus:border-[#E8500A] focus:ring-2 focus:ring-[#E8500A]/20 focus:bg-white pr-7 pl-3 py-2 rounded-xl text-right w-24 transition-colors focus:outline-none"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A6048] text-sm pointer-events-none">%</span>
              </div>
            </div>
            <input type="range" min={10} max={70} step={1} value={basicPct}
              onChange={(e) => setBasicPct(parseInt(e.target.value))}
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer focus:outline-none"
              style={{ background: `linear-gradient(to right, #E8500A ${basicPctPct}%, #F0E4D4 ${basicPctPct}%)` }} />
            <div className="flex justify-between text-xs">
              <span className="text-[#7A6048]">10%</span>
              <span className="font-bold text-[#059669] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">⬆ 50% minimum under new rule</span>
              <span className="text-[#7A6048]">70%</span>
            </div>
          </div>

          {/* Warning */}
          {belowFifty && (
            <div className="bg-[#FFF8F2] border border-[rgba(232,80,10,0.3)] rounded-xl p-3">
              <p className="text-xs text-[#E8500A] font-semibold">
                ⚠ Your basic ({basicPct}%) is below the 50% minimum under new Labour Code.
                Employer must raise basic to {Math.round(ctc * 0.5 / 12).toLocaleString("en-IN")} /mo.
              </p>
            </div>
          )}

          {/* State */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#0F2447] block">State <span className="font-normal text-[#7A6048]">(professional tax)</span></label>
            <div className="relative">
              <select value={state} onChange={(e) => setState(e.target.value)}
                className="w-full border border-[#F0E4D4] rounded-xl px-4 py-2.5 text-sm text-[#0F2447] bg-white focus:outline-none focus:ring-2 focus:ring-[#E8500A]/20 focus:border-[#E8500A] appearance-none pr-10 cursor-pointer">
                {ALL_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#7A6048]">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </div>
          </div>

          {/* City */}
          <div className="space-y-2">
            <span className="text-sm font-semibold text-[#0F2447] block">City Type</span>
            <div className="flex gap-2">
              {(["metro", "non-metro"] as const).map((c) => (
                <button key={c} onClick={() => setCity(c)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-all ${city === c ? "bg-[#E8500A] text-white border-[#E8500A]" : "bg-white text-[#7A6048] border-[#F0E4D4] hover:border-[#E8500A]"}`}>
                  {c === "metro" ? "Metro" : "Non-Metro"}
                </button>
              ))}
            </div>
            <p className="text-xs text-[#7A6048]">Metro = Delhi / Mumbai / Chennai / Kolkata</p>
          </div>
        </div>

        {/* RIGHT: Results */}
        <div className="md:col-span-2 bg-[#0F2447] p-6 flex flex-col space-y-4">

          {/* Hero diff */}
          <div className="text-center">
            <p className="text-[#E8500A] text-xs font-bold uppercase tracking-widest mb-1.5">Take-Home Change</p>
            <p className={`text-4xl font-extrabold leading-none ${result.inHandDiff >= 0 ? "text-white" : "text-[#FFDCBA]"}`}>
              {result.inHandDiff >= 0 ? "+" : ""}{formatINR(result.inHandDiff)}/mo
            </p>
            <p className="text-white/40 text-xs mt-1.5">
              {result.inHandDiff < 0 ? "Lower take-home — money goes to PF" : result.basicIncrease ? "Basic already meets 50% rule" : "No change needed"}
            </p>
          </div>

          <div className="border-t border-white/10" />

          {/* Column headers */}
          <div className="grid grid-cols-3 px-3 text-[10px] font-bold text-white/40 uppercase tracking-wider">
            <span>Component</span>
            <span className="text-right">Old</span>
            <span className="text-right">New Code</span>
          </div>

          <div className="space-y-1">
            <CompareRow label="Basic /mo" oldVal={result.old.basicMonthly} newVal={result.new.basicMonthly} />
            <CompareRow label="Employee PF" oldVal={result.old.employeePFMonthly} newVal={result.new.employeePFMonthly} />
            <CompareRow label="Employer PF" oldVal={result.old.employerPFMonthly} newVal={result.new.employerPFMonthly} />
            <CompareRow label="Gratuity /mo" oldVal={result.old.gratuityMonthly} newVal={result.new.gratuityMonthly} />
            <CompareRow label="In-Hand /mo" oldVal={result.old.inHandMonthly} newVal={result.new.inHandMonthly} highlight />
          </div>

          <div className="border-t border-white/10" />

          {/* Annual impact */}
          <div className="space-y-1.5">
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Annual Impact</p>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white/5 rounded-xl p-3 text-center">
                <p className="text-white/40 text-[10px]">PF saved extra</p>
                <p className="text-emerald-400 font-bold text-sm">{formatINRShort(result.pfDiff * 12)}/yr</p>
              </div>
              <div className="bg-white/5 rounded-xl p-3 text-center">
                <p className="text-white/40 text-[10px]">Extra gratuity</p>
                <p className="text-emerald-400 font-bold text-sm">{formatINRShort(result.gratuityDiffPerYear)}/yr</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
