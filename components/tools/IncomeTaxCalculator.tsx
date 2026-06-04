"use client";

import { useState, useMemo } from "react";
import { compareRegimes, type TaxInput } from "@/lib/calculations/incometax";
import { formatINR, formatINRShort } from "@/lib/utils/format";

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
      <div className="flex items-center gap-1 bg-[#FFFCF8] border border-[#F0E4D4] focus-within:border-[#E8500A] focus-within:ring-2 focus-within:ring-[#E8500A]/10 rounded-xl px-3 py-1.5 w-36 shrink-0 transition-all">
        <span className="text-[#7A6048] text-sm">₹</span>
        <input
          type="number"
          value={value || ""}
          placeholder="0"
          min={0}
          max={max}
          onChange={(e) => onChange(Math.min(max ?? Infinity, Math.max(0, parseFloat(e.target.value) || 0)))}
          className="flex-1 text-right text-sm font-bold text-[#0F2447] bg-transparent focus:outline-none"
        />
      </div>
    </div>
  );
}

function RegimeCard({
  label,
  result,
  isBetter,
  isNew,
  savings,
}: {
  label: string;
  result: ReturnType<typeof compareRegimes>["newRegime"];
  isBetter: boolean;
  isNew: boolean;
  savings: number;
}) {
  const [expanded, setExpanded] = useState(false);

  const colors = isNew
    ? {
        card: isBetter ? "border-emerald-300 bg-emerald-50" : "border-[#F0E4D4] bg-white",
        label: isBetter ? "text-emerald-800" : "text-[#7A6048]",
        subtext: "text-emerald-600",
        subtextMuted: "text-emerald-500",
        divider: "border-emerald-200",
        taxValue: isBetter ? "text-emerald-700" : "text-[#0F2447]",
        rowMuted: "text-emerald-600/70",
        rowNormal: "text-emerald-800",
        negative: "text-emerald-600",
        slabBtn: "text-emerald-700 hover:text-emerald-900",
        slabRow: "text-emerald-600",
      }
    : {
        card: isBetter ? "border-amber-300 bg-amber-50" : "border-[#F0E4D4] bg-white",
        label: isBetter ? "text-amber-800" : "text-[#7A6048]",
        subtext: "text-amber-600",
        subtextMuted: "text-amber-500",
        divider: "border-amber-200",
        taxValue: isBetter ? "text-amber-700" : "text-[#0F2447]",
        rowMuted: "text-amber-600/70",
        rowNormal: "text-amber-800",
        negative: "text-amber-600",
        slabBtn: "text-amber-700 hover:text-amber-900",
        slabRow: "text-amber-600",
      };

  return (
    <div className={`rounded-2xl border-2 p-5 transition-all ${colors.card}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className={`font-bold text-base ${isBetter ? colors.label : "text-[#0F2447]"}`}>{label}</p>
          <p className={`text-xs mt-0.5 ${isBetter ? colors.subtext : "text-[#7A6048]"}`}>
            {isNew
              ? "Std. deduction ₹75K · No other deductions"
              : "HRA + 80C + 80D + NPS + Home loan"}
          </p>
        </div>
        {isBetter && savings > 0 && (
          <span className="bg-[#E8500A] text-white text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap">
            Save {formatINRShort(savings)}
          </span>
        )}
        {isBetter && savings === 0 && (
          <span className="bg-[#0F2447] text-white text-xs font-bold px-2.5 py-1 rounded-full">
            EQUAL
          </span>
        )}
      </div>

      <div className="space-y-1.5 mb-4">
        {[
          { label: "Gross Income", value: result.grossIncome, muted: true },
          { label: "Total Deductions", value: result.totalDeductions, muted: true, negative: true },
          { label: "Taxable Income", value: result.taxableIncome, bold: true },
          { label: "Income Tax", value: result.taxBeforeCess, muted: true },
          ...(result.rebate87A > 0
            ? [{ label: "Rebate u/s 87A", value: result.rebate87A, muted: true, negative: true }]
            : []),
          { label: "Cess (4%)", value: result.cess, muted: true },
        ].map((row) => (
          <div key={row.label} className="flex justify-between text-sm">
            <span className={row.bold ? `font-semibold ${isBetter ? colors.rowNormal : "text-[#0F2447]"}` : `${isBetter ? colors.rowMuted : "text-[#7A6048]"}`}>
              {row.label}
            </span>
            <span className={`font-semibold tabular-nums ${
              row.negative
                ? colors.negative
                : row.bold
                ? (isBetter ? colors.rowNormal : "text-[#0F2447]")
                : (isBetter ? colors.rowMuted : "text-[#7A6048]")
            }`}>
              {row.negative ? "−" : ""}{formatINRShort(row.value)}
            </span>
          </div>
        ))}

        <div className={`border-t pt-2.5 mt-2 flex justify-between items-baseline ${colors.divider}`}>
          <span className={`font-bold text-sm ${isBetter ? colors.rowNormal : "text-[#0F2447]"}`}>Total Tax</span>
          <span className={`font-bold text-xl tabular-nums ${colors.taxValue}`}>
            {formatINR(result.totalTax)}
          </span>
        </div>

        <div className="flex justify-between text-xs">
          <span className={isBetter ? colors.subtextMuted : "text-[#7A6048]"}>Effective rate</span>
          <span className={`font-bold text-base ${isBetter ? colors.taxValue : "text-[#0F2447]"}`}>
            {result.effectiveRate}%
          </span>
        </div>
      </div>

      {result.slabBreakup.length > 0 && (
        <div>
          <button
            onClick={() => setExpanded(!expanded)}
            className={`flex items-center gap-1 text-xs font-medium ${colors.slabBtn} transition-colors`}
          >
            <svg
              className={`w-3.5 h-3.5 transition-transform ${expanded ? "rotate-180" : ""}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            {expanded ? "Hide" : "View"} slab breakup
          </button>
          {expanded && (
            <div className="mt-2 space-y-1 pl-1">
              {result.slabBreakup.map((s) => (
                <div key={s.range} className={`flex justify-between text-xs ${colors.slabRow}`}>
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

export function IncomeTaxCalculator() {
  const [grossIncome, setGrossIncome]           = useState(1000000);
  const [age, setAge]                           = useState(30);
  const [hra, setHra]                           = useState(0);
  const [rentPaid, setRentPaid]                 = useState(0);
  const [isMetro, setIsMetro]                   = useState(true);
  const [investments80C, setInvestments80C]     = useState(150000);
  const [healthIns80D, setHealthIns80D]         = useState(25000);
  const [parentsIns80D, setParentsIns80D]       = useState(0);
  const [nps, setNps]                           = useState(0);
  const [homeLoanInt, setHomeLoanInt]           = useState(0);
  const [showOldInputs, setShowOldInputs]       = useState(false);

  const input: TaxInput = {
    grossIncome, age, hra, rentPaid, isMetro,
    investments80C, healthInsurance80D: healthIns80D,
    parentsInsurance80D: parentsIns80D,
    npsContribution: nps, homeLoanInterest: homeLoanInt,
  };

  const comparison = useMemo(
    () => compareRegimes(input),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [grossIncome, age, hra, rentPaid, isMetro, investments80C, healthIns80D, parentsIns80D, nps, homeLoanInt]
  );

  const { newRegime, oldRegime, betterRegime, savings } = comparison;

  const maxTax = Math.max(newRegime.totalTax, oldRegime.totalTax, 1);

  return (
    <div className="bg-white rounded-2xl border border-[#F0E4D4] shadow-sm overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-5">

        {/* LEFT: Inputs */}
        <div className="md:col-span-2 p-6 space-y-5 md:border-r border-[#F0E4D4]">

          {/* Section label */}
          <p className="text-xs font-semibold text-[#7A6048] uppercase tracking-widest">Income Details</p>

          <div className="space-y-4">
            <InputRow
              label="Annual Gross Income"
              value={grossIncome}
              onChange={setGrossIncome}
              note="Salary / business income before deductions"
            />

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

                {/* City type toggle */}
                <div className="flex items-center gap-3">
                  <label className="text-sm font-medium text-[#0F2447] flex-1">City Type</label>
                  <div className="flex gap-1 bg-white border border-[#F0E4D4] p-0.5 rounded-xl">
                    {([["Metro", true], ["Non-Metro", false]] as [string, boolean][]).map(([lbl, val]) => (
                      <button
                        key={lbl}
                        onClick={() => setIsMetro(val)}
                        className={`text-xs px-3 py-1 rounded-lg font-medium transition-all ${
                          isMetro === val
                            ? "bg-[#0F2447] text-white"
                            : "text-[#7A6048] hover:text-[#0F2447]"
                        }`}
                      >
                        {lbl}
                      </button>
                    ))}
                  </div>
                </div>

                <InputRow label="80C Investments" value={investments80C} onChange={setInvestments80C} max={150000} note="PPF, ELSS, LIC, PF (max ₹1.5L)" />
                <InputRow label="80D Health Insurance" value={healthIns80D} onChange={setHealthIns80D} max={25000} note="Self & family (max ₹25K)" />
                <InputRow label="80D Parents Insurance" value={parentsIns80D} onChange={setParentsIns80D} max={25000} note="Senior parents (max ₹25K)" />
                <InputRow label="80CCD NPS Contribution" value={nps} onChange={setNps} max={50000} note="Additional NPS (max ₹50K)" />
                <InputRow label="Home Loan Interest (24b)" value={homeLoanInt} onChange={setHomeLoanInt} max={200000} note="Self-occupied (max ₹2L)" />
              </div>
            )}
          </div>

          {/* Recommendation box */}
          <div className={`rounded-2xl p-4 border-2 ${
            betterRegime === "new"
              ? "bg-emerald-50 border-emerald-200"
              : betterRegime === "old"
              ? "bg-amber-50 border-amber-200"
              : "bg-[#FFFCF8] border-[#F0E4D4]"
          }`}>
            <p className="text-xs font-semibold text-[#7A6048] uppercase tracking-widest mb-2">Recommendation</p>
            {betterRegime === "equal" ? (
              <p className="text-sm text-[#7A6048]">Both regimes result in equal tax.</p>
            ) : (
              <>
                <p className="font-bold text-[#0F2447] text-sm">
                  {betterRegime === "new" ? "New Regime" : "Old Regime"} saves you{" "}
                  <span className="text-[#E8500A]">{formatINR(savings)}/year</span>
                </p>
                <p className="text-xs text-[#7A6048] mt-1">
                  {formatINRShort(Math.round(savings / 12))} more in-hand every month
                </p>
              </>
            )}
          </div>
        </div>

        {/* RIGHT: Comparison */}
        <div className="md:col-span-3 p-6 space-y-5">
          <p className="text-xs font-semibold text-[#7A6048] uppercase tracking-widest">
            FY 2025-26 Tax Comparison
          </p>

          {/* Regime cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <RegimeCard
              label="New Tax Regime"
              result={newRegime}
              isBetter={betterRegime === "new"}
              isNew
              savings={betterRegime === "new" ? savings : 0}
            />
            <RegimeCard
              label="Old Tax Regime"
              result={oldRegime}
              isBetter={betterRegime === "old"}
              isNew={false}
              savings={betterRegime === "old" ? savings : 0}
            />
          </div>

          {/* Visual bar comparison */}
          <div className="bg-[#FFFCF8] rounded-2xl p-4 border border-[#F0E4D4]">
            <p className="text-xs font-semibold text-[#7A6048] uppercase tracking-widest mb-4">Tax Comparison</p>
            {[
              {
                label: "New Regime",
                value: newRegime.totalTax,
                bar: "bg-emerald-400",
                isBetter: betterRegime === "new",
                color: betterRegime === "new" ? "text-emerald-700" : "text-[#7A6048]",
              },
              {
                label: "Old Regime",
                value: oldRegime.totalTax,
                bar: "bg-amber-400",
                isBetter: betterRegime === "old",
                color: betterRegime === "old" ? "text-amber-700" : "text-[#7A6048]",
              },
            ].map((row) => (
              <div key={row.label} className="mb-3 last:mb-0">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className={`font-semibold ${row.color}`}>{row.label}</span>
                  <span className={`font-bold tabular-nums ${row.color}`}>{formatINR(row.value)}</span>
                </div>
                <div className="w-full bg-[#F0E4D4] rounded-full h-2.5">
                  <div
                    className={`${row.bar} h-2.5 rounded-full transition-all duration-500`}
                    style={{ width: `${(row.value / maxTax) * 100}%` }}
                  />
                </div>
              </div>
            ))}

            {/* Effective rate row */}
            <div className="mt-4 pt-4 border-t border-[#F0E4D4] grid grid-cols-2 gap-3">
              {[
                { label: "New Regime Rate", rate: newRegime.effectiveRate, isNew: true },
                { label: "Old Regime Rate", rate: oldRegime.effectiveRate, isNew: false },
              ].map((r) => (
                <div key={r.label} className={`rounded-xl p-3 text-center ${r.isNew ? "bg-emerald-50 border border-emerald-200" : "bg-amber-50 border border-amber-200"}`}>
                  <p className={`text-xs font-medium mb-0.5 ${r.isNew ? "text-emerald-600" : "text-amber-600"}`}>{r.label}</p>
                  <p className={`text-2xl font-bold tabular-nums ${r.isNew ? "text-emerald-700" : "text-amber-700"}`}>{r.rate}%</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
