"use client";

import { useState, useMemo } from "react";
import {
  calculateSIP,
  calculateRequiredSIP,
  calculateLumpSum,
  getSIPYearlyBreakdown,
} from "@/lib/calculations/sip";
import { formatINR, formatINRShort } from "@/lib/utils/format";

type Mode = "sip" | "goal" | "lumpsum";

const MODES: { value: Mode; label: string; icon: string }[] = [
  { value: "sip",     label: "SIP",       icon: "📅" },
  { value: "goal",    label: "Goal",       icon: "🎯" },
  { value: "lumpsum", label: "Lump Sum",   icon: "💰" },
];

function SliderField({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (v: number) => void;
}) {
  const [focused, setFocused] = useState(false);
  const [raw, setRaw] = useState("");
  const pct = ((value - min) / (max - min)) * 100;

  function commit(s: string) {
    const n = parseFloat(s.replace(/[^0-9.]/g, ""));
    if (!isNaN(n) && n >= min) onChange(Math.min(max, Math.max(min, n)));
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-600 flex-1">{label}</span>
        <input
          type="text"
          value={focused ? raw : display}
          onFocus={() => { setRaw(String(value)); setFocused(true); }}
          onChange={(e) => setRaw(e.target.value)}
          onBlur={() => { commit(raw); setFocused(false); }}
          onKeyDown={(e) => { if (e.key === "Enter") { commit(raw); (e.target as HTMLInputElement).blur(); } }}
          className="font-bold text-gray-900 text-sm bg-blue-50 border border-blue-100 focus:border-blue-500 focus:bg-white px-3 py-1.5 rounded-lg text-right w-32 transition-colors focus:outline-none"
        />
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer focus:outline-none"
        style={{ background: `linear-gradient(to right, #2563eb ${pct}%, #e2e8f0 ${pct}%)` }}
      />
    </div>
  );
}

export function SIPCalculator() {
  const [mode, setMode]         = useState<Mode>("sip");
  const [monthly, setMonthly]   = useState(5000);
  const [rate, setRate]         = useState(12);
  const [years, setYears]       = useState(10);
  const [target, setTarget]     = useState(5000000);
  const [lumpsum, setLumpsum]   = useState(100000);
  const [showTable, setShowTable] = useState(false);

  const sipResult     = useMemo(() => calculateSIP(monthly, rate, years), [monthly, rate, years]);
  const requiredSIP   = useMemo(() => calculateRequiredSIP(target, rate, years), [target, rate, years]);
  const lumpSumResult = useMemo(() => calculateLumpSum(lumpsum, rate, years), [lumpsum, rate, years]);
  const yearlyData    = useMemo(() => {
    if (!showTable || mode === "lumpsum") return [];
    return getSIPYearlyBreakdown(mode === "sip" ? monthly : requiredSIP, rate, years);
  }, [showTable, mode, monthly, requiredSIP, rate, years]);

  const activeResult = mode === "lumpsum" ? lumpSumResult : sipResult;
  const displayCorpus = mode === "goal" ? target : activeResult.corpus;
  const displayInvested = mode === "goal"
    ? requiredSIP * years * 12
    : activeResult.invested;
  const displayGains = displayCorpus - displayInvested;
  const gainsPct = displayInvested > 0
    ? Math.round((displayGains / displayInvested) * 1000) / 10
    : 0;

  const investedPct = Math.round((displayInvested / displayCorpus) * 100);
  const gainsPctOfCorpus = 100 - investedPct;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Mode tabs */}
      <div className="flex gap-1.5 p-3 bg-gray-50 border-b border-gray-100">
        {MODES.map((m) => (
          <button
            key={m.value}
            onClick={() => setMode(m.value)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              mode === m.value ? "bg-blue-600 text-white shadow-sm" : "text-gray-500 hover:bg-white hover:text-gray-800"
            }`}
          >
            <span>{m.icon}</span>
            <span>{m.label}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5">
        {/* LEFT: Inputs */}
        <div className="md:col-span-3 p-6 space-y-6 md:border-r border-gray-100">

          {mode === "sip" && (
            <SliderField label="Monthly SIP" value={monthly} min={500} max={200000} step={500}
              display={`₹${monthly.toLocaleString("en-IN")}`} onChange={setMonthly} />
          )}
          {mode === "goal" && (
            <SliderField label="Target Amount" value={target} min={100000} max={100000000} step={100000}
              display={formatINRShort(target)} onChange={setTarget} />
          )}
          {mode === "lumpsum" && (
            <SliderField label="Investment Amount" value={lumpsum} min={10000} max={50000000} step={10000}
              display={formatINRShort(lumpsum)} onChange={setLumpsum} />
          )}

          <SliderField label="Expected Return (p.a.)" value={rate} min={1} max={30} step={0.5}
            display={`${rate}%`} onChange={setRate} />

          <SliderField label="Investment Period" value={years} min={1} max={40} step={1}
            display={`${years} yr${years !== 1 ? "s" : ""}`} onChange={setYears} />

          {/* Affiliate CTA */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-sm">
            <p className="text-emerald-800 font-medium mb-1">Start SIP on Groww or Zerodha</p>
            <p className="text-emerald-600 text-xs mb-2">Zero commission, direct mutual funds, instant KYC.</p>
            <a href="/go/groww" rel="nofollow noopener sponsored"
              className="text-emerald-700 font-semibold hover:text-emerald-900 text-sm">
              Start SIP on Groww →
            </a>
          </div>
        </div>

        {/* RIGHT: Results */}
        <div className="hidden md:flex md:col-span-2 flex-col bg-gradient-to-br from-blue-600 to-blue-700 p-6">
          <div className="text-center mb-5">
            {mode === "goal" ? (
              <>
                <p className="text-blue-200 text-xs font-semibold uppercase tracking-widest mb-2">Monthly SIP Needed</p>
                <p className="text-5xl font-bold text-white">{formatINR(requiredSIP)}</p>
                <p className="text-blue-300 text-xs mt-1.5">to reach {formatINRShort(target)} in {years} yrs</p>
              </>
            ) : (
              <>
                <p className="text-blue-200 text-xs font-semibold uppercase tracking-widest mb-2">
                  {mode === "lumpsum" ? "Future Value" : "Corpus at Maturity"}
                </p>
                <p className="text-5xl font-bold text-white">{formatINRShort(displayCorpus)}</p>
                <p className="text-blue-300 text-xs mt-1.5">in {years} year{years !== 1 ? "s" : ""}</p>
              </>
            )}
          </div>

          <div className="border-t border-blue-500/50 mb-5" />

          {/* Donut */}
          <div className="flex items-center gap-4 mb-5">
            <div className="relative w-24 h-24 flex-shrink-0">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="4" />
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round"
                  strokeDasharray={`${investedPct} ${100 - investedPct}`} />
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#34d399" strokeWidth="4" strokeLinecap="round"
                  strokeDasharray={`${gainsPctOfCorpus} ${100 - gainsPctOfCorpus}`}
                  strokeDashoffset={`-${investedPct}`} />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-white font-bold text-sm">{gainsPctOfCorpus}%</span>
                <span className="text-blue-200 text-xs">gains</span>
              </div>
            </div>
            <div className="flex-1 space-y-2.5">
              {[
                { label: "Invested",  value: formatINRShort(displayInvested), pct: investedPct, dot: "bg-white" },
                { label: "Est. Returns", value: formatINRShort(displayGains), pct: gainsPctOfCorpus, dot: "bg-emerald-400" },
              ].map((row) => (
                <div key={row.label}>
                  <div className="flex justify-between items-center mb-0.5">
                    <span className="flex items-center gap-1.5 text-xs text-blue-200">
                      <span className={`w-2 h-2 rounded-full ${row.dot} inline-block`} />
                      {row.label}
                    </span>
                    <span className="text-white font-semibold text-sm">{row.value}</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-1">
                    <div className={`${row.dot} h-1 rounded-full`} style={{ width: `${row.pct}%` }} />
                  </div>
                </div>
              ))}
              <div className="border-t border-blue-500/40 pt-2 flex justify-between">
                <span className="text-blue-200 text-xs">Return on Investment</span>
                <span className="text-emerald-300 font-bold text-sm">+{gainsPct}%</span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 rounded-xl p-3 mt-auto text-xs text-blue-100 leading-relaxed text-center">
            Assumes <span className="text-white font-semibold">{rate}% p.a.</span> returns,
            compounded monthly. Actual returns vary.
          </div>
        </div>
      </div>

      {/* Mobile stats */}
      <div className="md:hidden bg-blue-600 px-4 pt-4 pb-3 border-t border-gray-100">
        <div className="grid grid-cols-3 gap-2 text-white text-center">
          {mode === "goal" ? (
            <>
              <div><p className="text-blue-200 text-xs">Monthly SIP</p><p className="font-bold">{formatINRShort(requiredSIP)}</p></div>
              <div><p className="text-blue-200 text-xs">Invested</p><p className="font-bold">{formatINRShort(displayInvested)}</p></div>
              <div><p className="text-blue-200 text-xs">Target</p><p className="font-bold">{formatINRShort(target)}</p></div>
            </>
          ) : (
            <>
              <div><p className="text-blue-200 text-xs">Corpus</p><p className="font-bold">{formatINRShort(displayCorpus)}</p></div>
              <div><p className="text-blue-200 text-xs">Invested</p><p className="font-bold">{formatINRShort(displayInvested)}</p></div>
              <div><p className="text-blue-200 text-xs">Gains</p><p className="font-bold text-emerald-300">{formatINRShort(displayGains)}</p></div>
            </>
          )}
        </div>
      </div>

      {/* Yearly table */}
      {mode !== "lumpsum" && (
        <div className="border-t border-gray-100">
          <button
            onClick={() => setShowTable(!showTable)}
            className="w-full py-3 text-sm font-medium text-gray-500 hover:text-blue-600 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            <svg className={`w-4 h-4 transition-transform ${showTable ? "rotate-180" : ""}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            {showTable ? "Hide" : "View"} Year-by-Year Growth
          </button>
          {showTable && yearlyData.length > 0 && (
            <div className="overflow-x-auto px-4 pb-5">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    {["Year", "Invested", "Est. Returns", "Total Value"].map((h, i) => (
                      <th key={h} className={`py-2 px-3 text-gray-500 font-semibold text-xs uppercase ${i === 0 ? "text-left" : "text-right"}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {yearlyData.map((row) => (
                    <tr key={row.year} className="hover:bg-gray-50">
                      <td className="py-2 px-3 font-medium text-gray-700">Year {row.year}</td>
                      <td className="py-2 px-3 text-right text-gray-600">{formatINRShort(row.invested)}</td>
                      <td className="py-2 px-3 text-right text-emerald-600 font-medium">{formatINRShort(row.gains)}</td>
                      <td className="py-2 px-3 text-right font-bold text-gray-900">{formatINRShort(row.corpus)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
