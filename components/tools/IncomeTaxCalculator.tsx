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
      <div className="flex-1">
        <label className="text-sm font-medium text-gray-700 block mb-0.5">{label}</label>
        {note && <p className="text-xs text-gray-400">{note}</p>}
      </div>
      <div className="flex items-center gap-1 bg-blue-50 border border-blue-100 focus-within:border-blue-400 rounded-lg px-3 py-1.5 w-36 transition-colors">
        <span className="text-gray-400 text-sm">₹</span>
        <input
          type="number"
          value={value || ""}
          placeholder="0"
          min={0}
          max={max}
          onChange={(e) => onChange(Math.min(max ?? Infinity, Math.max(0, parseFloat(e.target.value) || 0)))}
          className="flex-1 text-right text-sm font-bold text-gray-900 bg-transparent focus:outline-none"
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
}: {
  label: string;
  result: ReturnType<typeof compareRegimes>["newRegime"];
  isBetter: boolean;
  isNew: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={`rounded-xl border-2 p-5 transition-all ${isBetter ? "border-green-400 bg-green-50" : "border-gray-200 bg-white"}`}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="font-bold text-gray-900">{label}</p>
          {isNew && <p className="text-xs text-gray-500 mt-0.5">Standard deduction ₹75,000 · No other deductions</p>}
          {!isNew && <p className="text-xs text-gray-500 mt-0.5">HRA + 80C + 80D + NPS + Home loan interest</p>}
        </div>
        {isBetter && (
          <span className="bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
            BETTER ✓
          </span>
        )}
      </div>

      <div className="space-y-1.5 mb-3">
        {[
          { label: "Gross Income", value: result.grossIncome, muted: true },
          { label: "Total Deductions", value: result.totalDeductions, muted: true, negative: true },
          { label: "Taxable Income", value: result.taxableIncome, bold: true },
          { label: "Income Tax", value: result.taxBeforeCess, muted: true },
          ...(result.rebate87A > 0 ? [{ label: "Rebate u/s 87A", value: result.rebate87A, muted: true, negative: true }] : []),
          { label: "Health & Education Cess (4%)", value: result.cess, muted: true },
        ].map((row) => (
          <div key={row.label} className="flex justify-between text-sm">
            <span className={row.muted ? "text-gray-500" : "text-gray-700 font-medium"}>{row.label}</span>
            <span className={`font-semibold tabular-nums ${row.negative ? "text-green-600" : row.bold ? "text-gray-900" : "text-gray-700"}`}>
              {row.negative ? "−" : ""}{formatINRShort(row.value)}
            </span>
          </div>
        ))}
        <div className="border-t border-gray-200 pt-2 flex justify-between">
          <span className="font-bold text-gray-900">Total Tax</span>
          <span className={`font-bold text-lg tabular-nums ${isBetter ? "text-green-600" : "text-gray-900"}`}>
            {formatINR(result.totalTax)}
          </span>
        </div>
        <div className="flex justify-between text-xs text-gray-400">
          <span>Effective Tax Rate</span>
          <span className="font-medium">{result.effectiveRate}%</span>
        </div>
      </div>

      {/* Slab breakup */}
      {result.slabBreakup.length > 0 && (
        <div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs text-blue-600 hover:underline"
          >
            {expanded ? "Hide" : "View"} slab breakup
          </button>
          {expanded && (
            <div className="mt-2 space-y-1">
              {result.slabBreakup.map((s) => (
                <div key={s.range} className="flex justify-between text-xs text-gray-500">
                  <span>{s.range} @ {s.rate}%</span>
                  <span className="font-medium text-gray-700">{formatINRShort(s.tax)}</span>
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

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-5">

        {/* LEFT: Inputs */}
        <div className="md:col-span-2 p-6 space-y-4 md:border-r border-gray-100">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Income Details</p>
            <div className="space-y-3">
              <InputRow
                label="Annual Gross Income"
                value={grossIncome}
                onChange={setGrossIncome}
                note="Salary / business income before deductions"
              />
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-gray-700 flex-1">Age</label>
                <div className="flex items-center gap-1 bg-blue-50 border border-blue-100 rounded-lg px-3 py-1.5 w-36">
                  <input
                    type="number"
                    value={age}
                    min={18}
                    max={100}
                    onChange={(e) => setAge(parseInt(e.target.value) || 30)}
                    className="flex-1 text-right text-sm font-bold text-gray-900 bg-transparent focus:outline-none"
                  />
                  <span className="text-gray-400 text-sm">yrs</span>
                </div>
              </div>
            </div>
          </div>

          {/* Old regime deductions toggle */}
          <div>
            <button
              onClick={() => setShowOldInputs(!showOldInputs)}
              className="w-full flex items-center justify-between text-sm font-semibold text-gray-700 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 hover:bg-gray-100 transition-colors"
            >
              <span>Old Regime Deductions</span>
              <svg className={`w-4 h-4 transition-transform ${showOldInputs ? "rotate-180" : ""}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showOldInputs && (
              <div className="mt-3 space-y-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
                <InputRow label="HRA Received" value={hra} onChange={setHra} note="From salary slip" />
                <InputRow label="Rent Paid (annual)" value={rentPaid} onChange={setRentPaid} />
                <div className="flex items-center gap-3">
                  <label className="text-sm font-medium text-gray-700 flex-1">City Type</label>
                  <div className="flex gap-1 bg-white border border-gray-200 p-0.5 rounded-lg">
                    {[["Metro", true], ["Non-Metro", false]].map(([label, val]) => (
                      <button key={String(label)} onClick={() => setIsMetro(val as boolean)}
                        className={`text-xs px-2.5 py-1 rounded-md font-medium transition-all ${
                          isMetro === val ? "bg-blue-600 text-white" : "text-gray-500"
                        }`}>
                        {String(label)}
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

          {/* Summary */}
          <div className={`rounded-xl p-4 border-2 ${
            betterRegime === "new" ? "bg-blue-50 border-blue-200" :
            betterRegime === "old" ? "bg-green-50 border-green-200" :
            "bg-gray-50 border-gray-200"
          }`}>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Recommendation</p>
            {betterRegime === "equal" ? (
              <p className="text-sm text-gray-700">Both regimes result in equal tax.</p>
            ) : (
              <>
                <p className="font-bold text-gray-900 text-sm">
                  {betterRegime === "new" ? "New Regime" : "Old Regime"} saves you{" "}
                  <span className="text-green-600">{formatINR(savings)}/year</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {formatINRShort(Math.round(savings / 12))} more in-hand every month
                </p>
              </>
            )}
          </div>
        </div>

        {/* RIGHT: Comparison */}
        <div className="md:col-span-3 p-6 space-y-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
            FY 2025-26 Tax Comparison
          </p>
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

          {/* Visual bar comparison */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <p className="text-xs font-semibold text-gray-500 mb-3">Tax Comparison</p>
            {[
              { label: "New Regime", value: newRegime.totalTax, color: "bg-blue-500", isBetter: betterRegime === "new" },
              { label: "Old Regime", value: oldRegime.totalTax, color: "bg-gray-400", isBetter: betterRegime === "old" },
            ].map((row) => {
              const max = Math.max(newRegime.totalTax, oldRegime.totalTax, 1);
              return (
                <div key={row.label} className="mb-2">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span className={row.isBetter ? "font-bold text-green-600" : ""}>{row.label}</span>
                    <span className="font-semibold text-gray-800">{formatINR(row.value)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`${row.color} h-3 rounded-full transition-all`}
                      style={{ width: `${(row.value / max) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
