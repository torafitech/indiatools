"use client";

import { useState, useMemo } from "react";
import { calculateFFSettlement } from "@/lib/calculations/full-final-settlement";
import { formatINR, formatINRShort } from "@/lib/utils/format";

function parseCurrency(s: string): number {
  const clean = s.toLowerCase().replace(/,/g, "").trim();
  if (clean.includes("cr")) return parseFloat(clean) * 10000000;
  if (clean.includes("l")) return parseFloat(clean) * 100000;
  if (clean.includes("k")) return parseFloat(clean) * 1000;
  return parseFloat(clean);
}

export function FullFinalSettlementCalculator() {
  const [basicDA, setBasicDA]         = useState(50000);
  const [annualCTC, setAnnualCTC]     = useState(1200000);
  const [joiningDate, setJoining]     = useState("2019-06-01");
  const [lastDay, setLastDay]         = useState(new Date().toISOString().split("T")[0]);
  const [pendingLeave, setPendingLeave] = useState(12);
  const [noticeServed, setNoticeServed] = useState(45);
  const [requiredNotice, setReqdNotice] = useState(60);
  const [pendingSalaryDays, setPendingDays] = useState(15);
  const [empType, setEmpType]         = useState<"permanent" | "fixed-term">("permanent");

  const [basicRaw, setBasicRaw]     = useState("");
  const [ctcRaw, setCtcRaw]         = useState("");
  const [basicFocused, setBasicFocused] = useState(false);
  const [ctcFocused, setCtcFocused] = useState(false);

  const result = useMemo(() => {
    try {
      return calculateFFSettlement(
        basicDA, annualCTC, joiningDate, lastDay,
        pendingLeave, noticeServed, requiredNotice,
        pendingSalaryDays, empType
      );
    } catch {
      return null;
    }
  }, [basicDA, annualCTC, joiningDate, lastDay, pendingLeave, noticeServed, requiredNotice, pendingSalaryDays, empType]);

  return (
    <div className="bg-white rounded-2xl border border-[#F0E4D4] shadow-sm overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-5">

        {/* LEFT: Inputs */}
        <div className="md:col-span-3 p-6 space-y-5 md:border-r border-[#F0E4D4]">

          <div className="grid grid-cols-2 gap-4">
            {/* Basic + DA */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-[#0F2447] block">Basic + DA (monthly)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A6048] text-sm pointer-events-none">₹</span>
                <input type="text"
                  value={basicFocused ? basicRaw : formatINR(basicDA)}
                  onFocus={() => { setBasicRaw(String(basicDA)); setBasicFocused(true); }}
                  onChange={(e) => setBasicRaw(e.target.value)}
                  onBlur={() => { const n = parseCurrency(basicRaw); if (!isNaN(n) && n > 0) setBasicDA(n); setBasicFocused(false); }}
                  className="w-full font-bold text-[#0F2447] text-sm bg-[#FFF8F2] border border-[#FFDCBA] focus:border-[#E8500A] focus:ring-2 focus:ring-[#E8500A]/20 focus:bg-white pl-7 pr-3 py-2.5 rounded-xl text-right transition-colors focus:outline-none"
                />
              </div>
            </div>

            {/* Annual CTC */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-[#0F2447] block">Annual CTC</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A6048] text-sm pointer-events-none">₹</span>
                <input type="text"
                  value={ctcFocused ? ctcRaw : formatINRShort(annualCTC)}
                  onFocus={() => { setCtcRaw(String(annualCTC)); setCtcFocused(true); }}
                  onChange={(e) => setCtcRaw(e.target.value)}
                  onBlur={() => { const n = parseCurrency(ctcRaw); if (!isNaN(n) && n > 0) setAnnualCTC(n); setCtcFocused(false); }}
                  className="w-full font-bold text-[#0F2447] text-sm bg-[#FFF8F2] border border-[#FFDCBA] focus:border-[#E8500A] focus:ring-2 focus:ring-[#E8500A]/20 focus:bg-white pl-7 pr-3 py-2.5 rounded-xl text-right transition-colors focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-[#0F2447] block">Date of Joining</label>
              <input type="date" value={joiningDate} onChange={(e) => setJoining(e.target.value)}
                className="w-full border border-[#F0E4D4] rounded-xl px-3 py-2.5 text-sm text-[#0F2447] focus:outline-none focus:ring-2 focus:ring-[#E8500A]/20 focus:border-[#E8500A]" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-[#0F2447] block">Last Working Day</label>
              <input type="date" value={lastDay} onChange={(e) => setLastDay(e.target.value)}
                className="w-full border border-[#F0E4D4] rounded-xl px-3 py-2.5 text-sm text-[#0F2447] focus:outline-none focus:ring-2 focus:ring-[#E8500A]/20 focus:border-[#E8500A]" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-[#0F2447] block">Pending Leave Days</label>
              <input type="number" value={pendingLeave} min={0} max={365}
                onChange={(e) => setPendingLeave(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full border border-[#F0E4D4] rounded-xl px-3 py-2.5 text-sm text-[#0F2447] focus:outline-none focus:ring-2 focus:ring-[#E8500A]/20 focus:border-[#E8500A]" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-[#0F2447] block">Days Worked in Final Month</label>
              <input type="number" value={pendingSalaryDays} min={0} max={31}
                onChange={(e) => setPendingDays(Math.max(0, Math.min(31, parseInt(e.target.value) || 0)))}
                className="w-full border border-[#F0E4D4] rounded-xl px-3 py-2.5 text-sm text-[#0F2447] focus:outline-none focus:ring-2 focus:ring-[#E8500A]/20 focus:border-[#E8500A]" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-[#0F2447] block">Notice Served (days)</label>
              <input type="number" value={noticeServed} min={0} max={365}
                onChange={(e) => setNoticeServed(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full border border-[#F0E4D4] rounded-xl px-3 py-2.5 text-sm text-[#0F2447] focus:outline-none focus:ring-2 focus:ring-[#E8500A]/20 focus:border-[#E8500A]" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-[#0F2447] block">Required Notice (days)</label>
              <input type="number" value={requiredNotice} min={0} max={365}
                onChange={(e) => setReqdNotice(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full border border-[#F0E4D4] rounded-xl px-3 py-2.5 text-sm text-[#0F2447] focus:outline-none focus:ring-2 focus:ring-[#E8500A]/20 focus:border-[#E8500A]" />
            </div>
          </div>

          {/* Employment type */}
          <div className="space-y-2">
            <span className="text-sm font-semibold text-[#0F2447] block">Employment Type</span>
            <div className="flex gap-2">
              {([
                { v: "permanent" as const, label: "Permanent (5yr gratuity)" },
                { v: "fixed-term" as const, label: "Fixed-Term (1yr gratuity)" },
              ]).map((opt) => (
                <button key={opt.v} onClick={() => setEmpType(opt.v)}
                  className={`flex-1 py-2.5 px-3 rounded-xl text-sm font-medium border transition-all ${empType === opt.v ? "bg-[#E8500A] text-white border-[#E8500A]" : "bg-white text-[#7A6048] border-[#F0E4D4] hover:border-[#E8500A]"}`}>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Results */}
        <div className="md:col-span-2 bg-[#0F2447] p-6 flex flex-col space-y-4">
          <div className="text-center">
            <p className="text-[#E8500A] text-xs font-bold uppercase tracking-widest mb-1.5">Net F&F Amount</p>
            <p className="text-5xl font-extrabold text-white leading-none">
              {result ? formatINRShort(result.netFnF) : "—"}
            </p>
            {result && (
              <p className="text-white/40 text-xs mt-1.5">
                Service: {result.serviceYears.toFixed(1)} years
              </p>
            )}
          </div>

          <div className="border-t border-white/10" />

          {result && (
            <div className="space-y-1.5">
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-2">Breakdown</p>
              {result.breakdown.map((row) => (
                <div key={row.label} className={`flex justify-between items-center px-3 py-2 rounded-xl ${row.type === "credit" ? "bg-white/5" : "bg-[#E8500A]/10 border border-[#E8500A]/20"}`}>
                  <span className="text-xs text-white/70">{row.label}</span>
                  <span className={`text-sm font-semibold tabular-nums ${row.type === "debit" ? "text-[#FFDCBA]" : "text-white"}`}>
                    {row.type === "debit" ? "−" : "+"}{formatINR(row.amount)}
                  </span>
                </div>
              ))}
              <div className="mt-2 flex justify-between items-center px-3 py-2.5 bg-[#E8500A]/20 border border-[#E8500A]/40 rounded-xl">
                <span className="text-sm font-bold text-white">Net F&F</span>
                <span className="text-base font-bold text-[#E8500A] tabular-nums">{formatINR(result.netFnF)}</span>
              </div>
            </div>
          )}

          {result && !result.isGratuityEligible && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
              <p className="text-xs text-white/50">
                ℹ Gratuity not included — service period {result.serviceYears.toFixed(1)} yrs below minimum threshold
              </p>
            </div>
          )}

          {result && (
            <div className="bg-white/5 rounded-xl p-3">
              <p className="text-[10px] text-white/40">{result.noticePayLabel}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
