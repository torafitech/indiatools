"use client";

import { useMemo, useState } from "react";
import { UNITS, REGIONS, getSqftPerUnit, type UnitKey, type RegionKey } from "@/data/land-units";
import { convertLandArea } from "@/lib/calculations/land-area";
import { formatNumber } from "@/lib/utils/format";

interface LandAreaConverterProps {
  defaultFromUnit?: UnitKey;
  defaultToUnit?: UnitKey;
  defaultRegion?: RegionKey;
}

function formatResult(n: number): string {
  if (!isFinite(n)) return "0";
  if (n >= 1000) return formatNumber(Math.round(n * 100) / 100);
  if (n >= 1) return (Math.round(n * 10000) / 10000).toString();
  return (Math.round(n * 1000000) / 1000000).toString();
}

export function LandAreaConverter({
  defaultFromUnit = "sqft",
  defaultToUnit = "acre",
  defaultRegion = "standard",
}: LandAreaConverterProps) {
  const [value, setValue] = useState("1000");
  const [fromUnit, setFromUnit] = useState<UnitKey>(defaultFromUnit);
  const [toUnit, setToUnit] = useState<UnitKey>(defaultToUnit);
  const [region, setRegion] = useState<RegionKey>(defaultRegion);

  const numericValue = parseFloat(value.replace(/,/g, "")) || 0;

  const needsRegion =
    fromUnit === "guntha" || fromUnit === "bigha" || fromUnit === "katha" ||
    toUnit === "guntha" || toUnit === "bigha" || toUnit === "katha";

  const result = useMemo(
    () => convertLandArea(numericValue, fromUnit, toUnit, region),
    [numericValue, fromUnit, toUnit, region]
  );

  const oneUnitResult = useMemo(
    () => convertLandArea(1, fromUnit, toUnit, region),
    [fromUnit, toUnit, region]
  );

  const fromLabel = UNITS.find((u) => u.key === fromUnit)?.label ?? fromUnit;
  const toLabel = UNITS.find((u) => u.key === toUnit)?.label ?? toUnit;
  const regionInfo = REGIONS.find((r) => r.key === region) ?? REGIONS[0];

  function swap() {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  }

  return (
    <div className="bg-white rounded-2xl border border-[#F0E4D4] shadow-sm overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-5">
        {/* ── LEFT: Inputs ── */}
        <div className="md:col-span-3 p-6 space-y-6 md:border-r border-[#F0E4D4]">
          {/* Value input */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#0F2447] uppercase tracking-wide">
              Value
            </label>
            <input
              type="text"
              inputMode="decimal"
              value={value}
              onChange={(e) => setValue(e.target.value.replace(/[^0-9.]/g, ""))}
              className="w-full border border-[#F0E4D4] rounded-xl px-4 py-2.5 text-lg font-bold text-[#0F2447] bg-white focus:outline-none focus:ring-2 focus:ring-[#E8500A]/20 focus:border-[#E8500A]"
            />
          </div>

          {/* From / Swap / To */}
          <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-2">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#0F2447] uppercase tracking-wide">
                From
              </label>
              <div className="relative">
                <select
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value as UnitKey)}
                  className="w-full border border-[#F0E4D4] rounded-xl px-3 py-2.5 text-sm text-[#0F2447] bg-white focus:outline-none focus:ring-2 focus:ring-[#E8500A]/20 focus:border-[#E8500A] appearance-none cursor-pointer pr-8"
                >
                  {UNITS.map((u) => (
                    <option key={u.key} value={u.key}>{u.label}</option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#7A6048] text-xs">▾</span>
              </div>
            </div>

            <button
              onClick={swap}
              aria-label="Swap units"
              className="mb-0.5 flex items-center justify-center w-9 h-9 rounded-xl border border-[#F0E4D4] bg-[#FFFCF8] text-[#E8500A] hover:border-[#E8500A] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4M16 17H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </button>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#0F2447] uppercase tracking-wide">
                To
              </label>
              <div className="relative">
                <select
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value as UnitKey)}
                  className="w-full border border-[#F0E4D4] rounded-xl px-3 py-2.5 text-sm text-[#0F2447] bg-white focus:outline-none focus:ring-2 focus:ring-[#E8500A]/20 focus:border-[#E8500A] appearance-none cursor-pointer pr-8"
                >
                  {UNITS.map((u) => (
                    <option key={u.key} value={u.key}>{u.label}</option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#7A6048] text-xs">▾</span>
              </div>
            </div>
          </div>

          {/* Region selector — only relevant for Guntha/Bigha/Katha */}
          {needsRegion && (
            <div className="space-y-2 bg-[#FFFCF8] border border-[#F0E4D4] rounded-xl p-4">
              <label className="text-xs font-semibold text-[#0F2447] uppercase tracking-wide">
                Regional Standard
              </label>
              <div className="relative">
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value as RegionKey)}
                  className="w-full border border-[#F0E4D4] rounded-xl px-3 py-2.5 text-sm text-[#0F2447] bg-white focus:outline-none focus:ring-2 focus:ring-[#E8500A]/20 focus:border-[#E8500A] appearance-none cursor-pointer pr-8"
                >
                  {REGIONS.map((r) => (
                    <option key={r.key} value={r.key}>{r.label}</option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#7A6048] text-xs">▾</span>
              </div>
              <p className="text-xs text-[#7A6048] leading-relaxed">
                Guntha, Bigha, and Katha values vary by state. Using <strong>{regionInfo.label}</strong> standard
                — 1 Bigha = {formatNumber(regionInfo.bighaSqft)} sq ft, 1 Katha = {formatNumber(regionInfo.kathaSqft)} sq ft,
                1 Guntha = {formatNumber(regionInfo.gunthaSqft)} sq ft. Source: {regionInfo.source}.
              </p>
            </div>
          )}
        </div>

        {/* ── RIGHT: Result (desktop) ── */}
        <div className="hidden md:flex md:col-span-2 flex-col justify-center bg-[#0F2447] p-6 gap-4">
          <p className="text-white/60 text-[10px] font-semibold uppercase tracking-widest text-center">
            Converted Value
          </p>
          <div className="bg-white/10 rounded-2xl px-4 py-5 text-center border border-white/10">
            <p className="text-3xl font-bold text-white leading-tight break-all">
              {formatResult(result)}
            </p>
            <p className="text-white/60 text-xs mt-1">{toLabel}</p>
          </div>
          <p className="text-white/50 text-xs text-center leading-relaxed">
            {formatNumber(numericValue)} {fromLabel} = {formatResult(result)} {toLabel}
          </p>
          <div className="border-t border-white/10 pt-3 text-center">
            <p className="text-white/40 text-[11px]">
              1 {fromLabel} = {formatResult(oneUnitResult)} {toLabel}
            </p>
          </div>
        </div>
      </div>

      {/* ── Mobile result ── */}
      <div className="md:hidden border-t border-[#F0E4D4] bg-[#0F2447] px-4 pt-5 pb-6 space-y-3">
        <div className="text-center bg-white/10 rounded-2xl px-4 py-4 border border-white/10">
          <p className="text-white/50 text-[10px] font-semibold uppercase tracking-widest mb-1">
            Converted Value
          </p>
          <p className="text-2xl font-bold text-white break-all">
            {formatResult(result)} <span className="text-base font-medium text-white/60">{toLabel}</span>
          </p>
          <p className="text-white/50 text-xs mt-1">
            {formatNumber(numericValue)} {fromLabel} = {formatResult(result)} {toLabel}
          </p>
        </div>
        <p className="text-white/40 text-[11px] text-center">
          1 {fromLabel} = {formatResult(oneUnitResult)} {toLabel}
        </p>
      </div>
    </div>
  );
}

export function LandAreaReferenceTable({ region = "standard" as RegionKey }: { region?: RegionKey }) {
  const regionInfo = REGIONS.find((r) => r.key === region) ?? REGIONS[0];
  const acreSqft = getSqftPerUnit("acre", region);

  return (
    <section className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-baseline justify-between flex-wrap gap-2 mb-1">
        <h2 className="text-xl font-bold text-gray-900">Land Area Unit Reference Table</h2>
      </div>
      <p className="text-gray-500 text-sm mb-4">
        All major Indian land units converted to Square Feet and Acre. Guntha, Bigha, and Katha
        shown here use the <strong>{regionInfo.label}</strong> standard — switch the regional
        standard in the calculator above for other states.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-[#F0E4D4]">
              {["Unit", "In Square Feet", "In Acre"].map((h, i) => (
                <th
                  key={h}
                  className={`py-2.5 px-3 text-[#7A6048] font-semibold text-xs uppercase tracking-wide ${i === 0 ? "text-left" : "text-right"}`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {UNITS.filter((u) => u.key !== "acre").map((u, idx) => {
              const sqft = getSqftPerUnit(u.key, region);
              return (
                <tr key={u.key} className={idx % 2 === 0 ? "bg-[#FFFCF8]" : "bg-white"}>
                  <td className="py-2.5 px-3 font-semibold text-[#0F2447]">
                    {u.label}
                    {u.regional && (
                      <span className="ml-1.5 text-[10px] font-medium text-[#E8500A] bg-[#FFF8F2] px-1.5 py-0.5 rounded-full align-middle">
                        regional
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-right text-[#7A6048]">{formatNumber(Math.round(sqft * 100) / 100)}</td>
                  <td className="py-2.5 px-3 text-right font-medium text-[#0F2447]">
                    {(sqft / acreSqft).toFixed(sqft / acreSqft < 1 ? 6 : 2)}
                  </td>
                </tr>
              );
            })}
            <tr className="bg-white border-t-2 border-[#F0E4D4]">
              <td className="py-2.5 px-3 font-semibold text-[#0F2447]">Acre</td>
              <td className="py-2.5 px-3 text-right text-[#7A6048]">{formatNumber(acreSqft)}</td>
              <td className="py-2.5 px-3 text-right font-bold text-[#0F2447]">1.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
