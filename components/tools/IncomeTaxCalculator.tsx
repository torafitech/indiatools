"use client";

import { useState, useMemo } from "react";
import { compareRegimes, type TaxInput } from "@/lib/calculations/incometax";
import { formatINR, formatINRShort } from "@/lib/utils/format";

/* ─── Input helpers ──────────────────────────────────────────────────── */

function AmountInput({
  value,
  onChange,
  max,
}: {
  value: number;
  onChange: (v: number) => void;
  max?: number;
}) {
  return (
    <div className="flex items-center gap-1 bg-[#FFF8F2] border border-[#FFDCBA] focus-within:border-[#E8500A] focus-within:ring-2 focus-within:ring-[#E8500A]/10 rounded-xl px-3 py-1.5 w-36 shrink-0 transition-all">
      <span className="text-[#7A6048] text-xs">₹</span>
      <input
        type="number"
        value={value || ""}
        placeholder="0"
        min={0}
        max={max}
        onChange={(e) =>
          onChange(Math.min(max ?? Infinity, Math.max(0, parseFloat(e.target.value) || 0)))
        }
        className="flex-1 text-right text-sm font-bold text-[#E8500A] bg-transparent focus:outline-none"
      />
    </div>
  );
}

function InputRow({
  label,
  value,
  onChange,
  max,
  note,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  max?: number;
  note?: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex-1 min-w-0">
        <label className="text-sm font-medium text-[#0F2447] block mb-0.5">{label}</label>
        {note && <p className="text-xs text-[#7A6048]">{note}</p>}
      </div>
      <AmountInput value={value} onChange={onChange} max={max} />
    </div>
  );
}

/* ─── Regime comparison card ─────────────────────────────────────────── */

function RegimeCard({
  label,
  result,
  isBetter,
  isNew,
}: {
  label: string;
  result: ReturnType<typeof compareRegimes>["newRegime"];
  isBetter: boolean;
  isNew: boolean;
}) {
  const [expanded, setExpanded] = useState(false);

  /* Winner → dark navy */
  if (isBetter) {
    return (
      <div className="rounded-2xl bg-[#0F2447] p-5 text-white relative">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-[10px] font-bold text-[#E8500A] uppercase tracking-widest mb-0.5">✓ Winner</p>
            <p className="font-extrabold text-lg text-white leading-tight">{label}</p>
            <p className="text-xs text-white/50 mt-0.5">
              {isNew ? "₹75K std. deduction · no other deductions" : "HRA + 80C + 80D + NPS + 24b"}
            </p>
          </div>
        </div>

        <div className="space-y-1.5 mb-3">
          <div className="flex justify-between text-sm">
            <span className="text-white/50">Taxable Income</span>
            <span className="font-semibold text-white tabular-nums">{formatINRShort(result.taxableIncome)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/50">Income Tax</span>
            <span className="font-semibold text-white tabular-nums">{formatINRShort(result.taxBeforeCess)}</span>
          </div>
          {result.surcharge > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-white/50">Surcharge</span>
              <span className="font-semibold text-white tabular-nums">{formatINRShort(result.surcharge)}</span>
            </div>
          )}
          {result.rebate87A > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-white/50">Rebate u/s 87A</span>
              <span className="font-semibold text-emerald-400 tabular-nums">−{formatINRShort(result.rebate87A)}</span>
            </div>
          )}
        </div>

        <div className="border-t border-white/10 pt-3 mb-1">
          <p className="text-xs text-white/40 mb-0.5">Total Tax</p>
          <p className="text-3xl font-extrabold tabular-nums text-white">{formatINR(result.totalTax)}</p>
        </div>
        <p className="text-[#E8500A] font-bold text-lg">{result.effectiveRate}% effective rate</p>

        {result.slabBreakup.length > 0 && (
          <div className="mt-3 pt-3 border-t border-white/10">
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1 text-xs text-white/40 hover:text-white/70 transition-colors"
            >
              <svg
                className={`w-3 h-3 transition-transform ${expanded ? "rotate-180" : ""}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              {expanded ? "Hide" : "View"} slab breakup
            </button>
            {expanded && (
              <div className="mt-2 space-y-1">
                {result.slabBreakup.map((s) => (
                  <div key={s.range} className="flex justify-between text-xs text-white/40">
                    <span>{s.range} @ {s.rate}%</span>
                    <span className="font-semibold tabular-nums">{formatINRShort(s.tax)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  /* Loser → light card */
  return (
    <div className="rounded-2xl border border-[#F0E4D4] bg-white p-5">
      <p className="font-extrabold text-base text-[#0F2447] mb-0.5">{label}</p>
      <p className="text-xs text-[#7A6048] mb-4">
        {isNew ? "₹75K std. deduction · no other deductions" : "HRA + 80C + 80D + NPS + 24b"}
      </p>

      <div className="space-y-1.5 mb-3">
        <div className="flex justify-between text-sm">
          <span className="text-[#7A6048]">Taxable Income</span>
          <span className="font-semibold text-[#0F2447] tabular-nums">{formatINRShort(result.taxableIncome)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[#7A6048]">Income Tax</span>
          <span className="font-semibold text-[#0F2447] tabular-nums">{formatINRShort(result.taxBeforeCess)}</span>
        </div>
        {result.surcharge > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-[#7A6048]">Surcharge</span>
            <span className="font-semibold text-[#0F2447] tabular-nums">{formatINRShort(result.surcharge)}</span>
          </div>
        )}
        {result.rebate87A > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-[#7A6048]">Rebate u/s 87A</span>
            <span className="font-semibold text-emerald-600 tabular-nums">−{formatINRShort(result.rebate87A)}</span>
          </div>
        )}
      </div>

      <div className="border-t border-[#F0E4D4] pt-3 mb-1">
        <p className="text-xs text-[#7A6048] mb-0.5">Total Tax</p>
        <p className="text-3xl font-extrabold tabular-nums text-[#0F2447]">{formatINR(result.totalTax)}</p>
      </div>
      <p className="text-[#7A6048] font-bold text-lg">{result.effectiveRate}% effective rate</p>

      {result.slabBreakup.length > 0 && (
        <div className="mt-3 pt-3 border-t border-[#F0E4D4]">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-xs text-[#7A6048] hover:text-[#0F2447] transition-colors"
          >
            <svg
              className={`w-3 h-3 transition-transform ${expanded ? "rotate-180" : ""}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            {expanded ? "Hide" : "View"} slab breakup
          </button>
          {expanded && (
            <div className="mt-2 space-y-1">
              {result.slabBreakup.map((s) => (
                <div key={s.range} className="flex justify-between text-xs text-[#7A6048]">
                  <span>{s.range} @ {s.rate}%</span>
                  <span className="font-semibold tabular-nums">{formatINRShort(s.tax)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────────────────── */

const SLIDER_MIN = 100000;   // ₹1L
const SLIDER_MAX = 5000000;  // ₹50L

export function IncomeTaxCalculator({ defaultIncome }: { defaultIncome?: number }) {
  const [grossIncome, setGrossIncome]           = useState(defaultIncome ?? 1000000);
  const [age, setAge]                           = useState(30);
  const [hra, setHra]                           = useState(0);
  const [rentPaid, setRentPaid]                 = useState(0);
  const [isMetro, setIsMetro]                   = useState(true);
  const [investments80C, setInvestments80C]     = useState(150000);
  const [healthIns80D, setHealthIns80D]         = useState(25000);
  const [parentsIns80D, setParentsIns80D]       = useState(0);
  const [parentsAreSenior, setParentsAreSenior] = useState(false);
  const [nps, setNps]                           = useState(0);
  const [homeLoanInt, setHomeLoanInt]           = useState(0);
  const [showOldInputs, setShowOldInputs]       = useState(false);

  const input: TaxInput = {
    grossIncome, age, hra, rentPaid, isMetro,
    investments80C, healthInsurance80D: healthIns80D,
    parentsInsurance80D: parentsIns80D,
    parentsAreSenior,
    npsContribution: nps, homeLoanInterest: homeLoanInt,
  };

  const comparison = useMemo(
    () => compareRegimes(input),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [grossIncome, age, hra, rentPaid, isMetro, investments80C, healthIns80D, parentsIns80D, parentsAreSenior, nps, homeLoanInt]
  );

  const { newRegime, oldRegime, betterRegime, savings } = comparison;

  /* Slider fill % — clamp for incomes beyond ₹50L */
  const sliderPct = Math.min(
    ((Math.min(grossIncome, SLIDER_MAX) - SLIDER_MIN) / (SLIDER_MAX - SLIDER_MIN)) * 100,
    100,
  );

  const maxTax = Math.max(newRegime.totalTax, oldRegime.totalTax, 1);

  return (
    <div className="bg-white rounded-2xl border border-[#F0E4D4] shadow-sm overflow-hidden">

      {/* ── HERO VERDICT BANNER ─────────────────────────────────────── */}
      <div className={`px-6 py-5 border-b border-[#F0E4D4] ${
        betterRegime === "new"
          ? "bg-emerald-50"
          : betterRegime === "old"
          ? "bg-amber-50"
          : "bg-[#FFFCF8]"
      }`}>
        {betterRegime === "equal" ? (
          <p className="text-center text-[#7A6048] font-medium text-sm">
            Both regimes result in equal tax for this income.
          </p>
        ) : (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${
                betterRegime === "new" ? "text-emerald-600" : "text-amber-600"
              }`}>
                ✓ {betterRegime === "new" ? "New Regime" : "Old Regime"} saves you more
              </p>
              <p className="font-extrabold text-4xl sm:text-5xl text-[#0F2447] tabular-nums leading-none">
                {formatINR(savings)}
              </p>
              <p className="text-sm text-[#7A6048] mt-1.5">
                per year &nbsp;·&nbsp;{" "}
                <span className="font-semibold text-[#E8500A]">
                  {formatINR(Math.round(savings / 12))} more every month
                </span>
              </p>
            </div>
            <div className={`rounded-2xl px-5 py-3 text-center shrink-0 ${
              betterRegime === "new"
                ? "bg-emerald-100 border border-emerald-200"
                : "bg-amber-100 border border-amber-200"
            }`}>
              <p className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${
                betterRegime === "new" ? "text-emerald-600" : "text-amber-600"
              }`}>Switch to</p>
              <p className={`font-extrabold text-xl ${
                betterRegime === "new" ? "text-emerald-800" : "text-amber-800"
              }`}>
                {betterRegime === "new" ? "New Regime" : "Old Regime"}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ── MAIN GRID ───────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-5">

        {/* LEFT: Inputs */}
        <div className="md:col-span-2 p-6 space-y-5 md:border-r border-[#F0E4D4]">
          <p className="text-xs font-semibold text-[#7A6048] uppercase tracking-widest">Income Details</p>

          {/* Income slider + text input */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-[#0F2447]">Annual Gross Income</label>
              <AmountInput value={grossIncome} onChange={setGrossIncome} />
            </div>
            <input
              type="range"
              min={SLIDER_MIN}
              max={SLIDER_MAX}
              step={50000}
              value={Math.min(grossIncome, SLIDER_MAX)}
              onChange={(e) => setGrossIncome(parseFloat(e.target.value))}
              className="w-full"
              style={{
                background: `linear-gradient(to right, #E8500A 0%, #E8500A ${sliderPct}%, #F0E4D4 ${sliderPct}%, #F0E4D4 100%)`,
              }}
            />
            <div className="flex justify-between text-xs text-[#7A6048] mt-1">
              <span>₹1L</span>
              <span>₹50L</span>
            </div>
            <p className="text-xs text-[#7A6048] mt-1">Salary / business income before deductions</p>
          </div>

          {/* Age */}
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-[#0F2447] flex-1">Age</label>
            <div className="flex items-center gap-1 bg-[#FFFCF8] border border-[#F0E4D4] focus-within:border-[#E8500A] focus-within:ring-2 focus-within:ring-[#E8500A]/10 rounded-xl px-3 py-1.5 w-36 transition-all">
              <input
                type="number"
                value={age}
                min={18}
                max={100}
                onChange={(e) => setAge(parseInt(e.target.value) || 30)}
                className="flex-1 text-right text-sm font-bold text-[#0F2447] bg-transparent focus:outline-none"
              />
              <span className="text-[#7A6048] text-sm">yrs</span>
            </div>
          </div>

          {/* Old regime deductions accordion */}
          <div>
            <button
              onClick={() => setShowOldInputs(!showOldInputs)}
              className="w-full flex items-center justify-between text-sm font-semibold text-[#0F2447] bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 hover:bg-amber-100 transition-colors"
            >
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
                Old Regime Deductions
              </span>
              <svg
                className={`w-4 h-4 text-[#7A6048] transition-transform ${showOldInputs ? "rotate-180" : ""}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showOldInputs && (
              <div className="mt-2 space-y-3.5 p-4 bg-amber-50/60 rounded-2xl border border-amber-200">
                <InputRow label="HRA Received" value={hra} onChange={setHra} note="From salary slip" />
                <InputRow label="Rent Paid (annual)" value={rentPaid} onChange={setRentPaid} />

                {/* City type */}
                <div className="flex items-center gap-3">
                  <label className="text-sm font-medium text-[#0F2447] flex-1">City Type</label>
                  <div className="flex gap-1 bg-white border border-[#F0E4D4] p-0.5 rounded-xl">
                    {([ ["Metro", true], ["Non-Metro", false] ] as [string, boolean][]).map(([lbl, val]) => (
                      <button
                        key={lbl}
                        onClick={() => setIsMetro(val)}
                        className={`text-xs px-3 py-1 rounded-lg font-medium transition-all ${
                          isMetro === val ? "bg-[#0F2447] text-white" : "text-[#7A6048] hover:text-[#0F2447]"
                        }`}
                      >
                        {lbl}
                      </button>
                    ))}
                  </div>
                </div>

                <InputRow label="80C Investments" value={investments80C} onChange={setInvestments80C} max={150000} note="PPF, ELSS, LIC, PF (max ₹1.5L)" />
                <InputRow label="80D Health Insurance" value={healthIns80D} onChange={setHealthIns80D} max={25000} note="Self & family (max ₹25K)" />
                <InputRow
                  label="80D Parents Insurance"
                  value={parentsIns80D}
                  onChange={setParentsIns80D}
                  max={parentsAreSenior ? 50000 : 25000}
                  note={parentsAreSenior ? "Senior parents (max ₹50K)" : "Parents under 60 (max ₹25K)"}
                />

                {/* Parents age toggle */}
                <div className="flex items-center gap-3">
                  <label className="text-sm font-medium text-[#0F2447] flex-1">Parents Age</label>
                  <div className="flex gap-1 bg-white border border-[#F0E4D4] p-0.5 rounded-xl">
                    {([ ["Under 60", false], ["Senior 60+", true] ] as [string, boolean][]).map(([lbl, val]) => (
                      <button
                        key={lbl}
                        onClick={() => setParentsAreSenior(val)}
                        className={`text-xs px-3 py-1 rounded-lg font-medium transition-all ${
                          parentsAreSenior === val ? "bg-[#0F2447] text-white" : "text-[#7A6048] hover:text-[#0F2447]"
                        }`}
                      >
                        {lbl}
                      </button>
                    ))}
                  </div>
                </div>

                <InputRow label="80CCD NPS Contribution" value={nps} onChange={setNps} max={50000} note="Additional NPS (max ₹50K)" />
                <InputRow label="Home Loan Interest (24b)" value={homeLoanInt} onChange={setHomeLoanInt} max={200000} note="Self-occupied (max ₹2L)" />
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Results */}
        <div className="md:col-span-3 p-6 space-y-4">
          <p className="text-xs font-semibold text-[#7A6048] uppercase tracking-widest">
            FY 2025-26 Tax Comparison
          </p>

          {/* ── MONTHLY IN-HAND (prominent) ──────────────────── */}
          <div className="bg-[#0F2447] rounded-2xl p-5">
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-3">
              Monthly In-Hand Salary
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "New Regime", value: newRegime.monthlyTakeHome, isBetter: betterRegime === "new" },
                { label: "Old Regime",  value: oldRegime.monthlyTakeHome,  isBetter: betterRegime === "old"  },
              ].map((r) => (
                <div
                  key={r.label}
                  className={`rounded-xl p-3 ${
                    r.isBetter
                      ? "bg-[#E8500A]/20 border border-[#E8500A]/40"
                      : "bg-white/5"
                  }`}
                >
                  <p className={`text-xs font-medium mb-1 ${r.isBetter ? "text-[#E8500A]" : "text-white/40"}`}>
                    {r.label}
                  </p>
                  <p className={`text-xl sm:text-2xl font-extrabold tabular-nums leading-none ${
                    r.isBetter ? "text-white" : "text-white/50"
                  }`}>
                    {formatINR(r.value)}
                  </p>
                  <p className={`text-xs mt-1 ${r.isBetter ? "text-white/60" : "text-white/25"}`}>/month</p>
                </div>
              ))}
            </div>
            {betterRegime !== "equal" && (
              <p className="text-[11px] text-white/40 mt-3 text-center">
                {formatINR(Math.abs(newRegime.monthlyTakeHome - oldRegime.monthlyTakeHome))} more per month
                with {betterRegime === "new" ? "New" : "Old"} Regime
              </p>
            )}
          </div>

          {/* ── REGIME CARDS ─────────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <RegimeCard
              label="New Tax Regime"
              result={newRegime}
              isBetter={betterRegime === "new"}
              isNew
            />
            <RegimeCard
              label="Old Tax Regime"
              result={oldRegime}
              isBetter={betterRegime === "old"}
              isNew={false}
            />
          </div>

          {/* ── TAX BAR COMPARISON ───────────────────────────── */}
          <div className="bg-[#FFFCF8] rounded-2xl p-4 border border-[#F0E4D4]">
            <p className="text-xs font-semibold text-[#7A6048] uppercase tracking-widest mb-4">Tax Comparison</p>
            {[
              { label: "New Regime", value: newRegime.totalTax, bar: "bg-emerald-400", isBetter: betterRegime === "new" },
              { label: "Old Regime",  value: oldRegime.totalTax,  bar: "bg-amber-400",   isBetter: betterRegime === "old"  },
            ].map((row) => (
              <div key={row.label} className="mb-3 last:mb-0">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className={`font-semibold ${row.isBetter ? "text-[#0F2447]" : "text-[#7A6048]"}`}>
                    {row.label}
                  </span>
                  <span className={`font-bold tabular-nums ${row.isBetter ? "text-[#0F2447]" : "text-[#7A6048]"}`}>
                    {formatINR(row.value)}
                  </span>
                </div>
                <div className="w-full bg-[#F0E4D4] rounded-full h-2.5">
                  <div
                    className={`${row.bar} h-2.5 rounded-full transition-all duration-500`}
                    style={{ width: `${(row.value / maxTax) * 100}%` }}
                  />
                </div>
              </div>
            ))}

            <div className="mt-4 pt-4 border-t border-[#F0E4D4] grid grid-cols-2 gap-3">
              {[
                { label: "New Regime Rate", rate: newRegime.effectiveRate, isNew: true  },
                { label: "Old Regime Rate",  rate: oldRegime.effectiveRate,  isNew: false },
              ].map((r) => (
                <div
                  key={r.label}
                  className={`rounded-xl p-3 text-center ${
                    r.isNew
                      ? "bg-emerald-50 border border-emerald-200"
                      : "bg-amber-50 border border-amber-200"
                  }`}
                >
                  <p className={`text-xs font-medium mb-0.5 ${r.isNew ? "text-emerald-600" : "text-amber-600"}`}>
                    {r.label}
                  </p>
                  <p className={`text-2xl font-bold tabular-nums ${r.isNew ? "text-emerald-700" : "text-amber-700"}`}>
                    {r.rate}%
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
