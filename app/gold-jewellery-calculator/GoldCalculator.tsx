"use client";

import { useState } from "react";
import {
  toGrams,
  calcJewelleryPrice,
  calcExchangeValue,
  calcGoldLoan,
  type WeightUnit,
} from "@/lib/calculations/gold";
import { formatINR } from "@/lib/utils/format";

const PURITIES = [
  { label: "24K (99.9%)", value: 99.9 },
  { label: "22K / 916 Hallmark (91.6%)", value: 91.6 },
  { label: "18K (75%)", value: 75 },
  { label: "14K (58.3%)", value: 58.3 },
] as const;

const inputCls =
  "border border-[#F0E4D4] rounded-xl px-3 py-2.5 text-sm text-[#0F2447] bg-white focus:outline-none focus:ring-2 focus:ring-[#E8500A]/20 focus:border-[#E8500A] transition-colors";

const numInputCls =
  "w-24 text-right border border-[#F0E4D4] rounded-lg px-2 py-1.5 text-sm font-semibold text-[#0F2447] bg-white focus:outline-none focus:ring-2 focus:ring-[#E8500A]/20 focus:border-[#E8500A] transition-colors";

export function GoldCalculator() {
  // ── shared ──────────────────────────────────────────────────
  const [goldRate, setGoldRate] = useState("9200");

  // ── section 1 ───────────────────────────────────────────────
  const [weight, setWeight] = useState("10");
  const [weightUnit, setWeightUnit] = useState<WeightUnit>("grams");
  const [purityIdx, setPurityIdx] = useState(1); // 22K default
  const [makingPct, setMakingPct] = useState("12");
  const [wastagePct, setWastagePct] = useState("3");
  const [isKadai, setIsKadai] = useState(false);

  // ── section 2 ───────────────────────────────────────────────
  const [oldWeight, setOldWeight] = useState("5");
  const [oldWeightUnit, setOldWeightUnit] = useState<WeightUnit>("grams");
  const [oldPurityIdx, setOldPurityIdx] = useState(1);
  const [oldDeduction, setOldDeduction] = useState("5");

  // ── derived ─────────────────────────────────────────────────
  const rate = Math.max(0, parseFloat(goldRate) || 0);
  const weightGrams = toGrams(Math.max(0, parseFloat(weight) || 0), weightUnit);
  const purity = PURITIES[purityIdx];

  const result = calcJewelleryPrice({
    weightGrams,
    purityPct: purity.value,
    ratePerGram: rate,
    makingPct: Math.min(40, Math.max(0, parseFloat(makingPct) || 0)),
    wastagePct: Math.min(10, Math.max(0, parseFloat(wastagePct) || 0)),
    isKadai,
  });

  const oldWeightGrams = toGrams(Math.max(0, parseFloat(oldWeight) || 0), oldWeightUnit);
  const exchangeValue = calcExchangeValue(
    oldWeightGrams,
    PURITIES[oldPurityIdx].value,
    rate,
    Math.min(30, Math.max(0, parseFloat(oldDeduction) || 0))
  );

  const loanResult = calcGoldLoan(weightGrams, purity.value, rate);

  const effectivePrice = Math.max(0, result.total - exchangeValue);

  return (
    <div className="space-y-6">
      {/* ── Gold rate input ──────────────────────────────────── */}
      <div className="bg-[#FFF8F2] border border-[#FFDCBA] rounded-2xl p-5">
        <label className="text-sm font-semibold text-[#0F2447] block mb-3">
          Today&apos;s Gold Rate
          <span className="font-normal text-[#7A6048] ml-1.5 text-xs">(₹ per gram, 22K standard)</span>
        </label>
        <div className="flex items-center gap-2">
          <span className="text-[#7A6048] font-semibold text-base">₹</span>
          <input
            type="number"
            value={goldRate}
            onChange={(e) => setGoldRate(e.target.value)}
            placeholder="e.g. 9200 — check MCX or your jeweller"
            className={`flex-1 ${inputCls}`}
            min="0"
          />
          <span className="text-xs text-[#7A6048] hidden sm:block whitespace-nowrap">/gram</span>
        </div>
        <p className="text-xs text-[#7A6048] mt-2">
          Check today&apos;s rate on MCX.in or ask your jeweller. Rates change daily.
        </p>
      </div>

      {/* ── Section 1: Jewellery Price ───────────────────────── */}
      <div className="bg-white rounded-2xl border border-[#F0E4D4] shadow-sm overflow-hidden">
        <div className="border-b border-[#F0E4D4] px-6 py-4 bg-[#FFFCF8]">
          <h2 className="text-base font-bold text-[#0F2447]">Jewellery Price Calculator</h2>
          <p className="text-xs text-[#7A6048] mt-0.5">Pure gold value + making + wastage + GST (3% + 5%)</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5">
          {/* Inputs */}
          <div className="md:col-span-3 p-6 space-y-6 md:border-r border-[#F0E4D4]">
            {/* Weight + unit */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#0F2447] block">Weight</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  min="0"
                  step="0.1"
                  className="w-28 border border-[#F0E4D4] rounded-xl px-3 py-2.5 text-sm font-semibold text-[#0F2447] focus:outline-none focus:ring-2 focus:ring-[#E8500A]/20 focus:border-[#E8500A]"
                />
                <select
                  value={weightUnit}
                  onChange={(e) => setWeightUnit(e.target.value as WeightUnit)}
                  className={`flex-1 ${inputCls} cursor-pointer appearance-none`}
                >
                  <option value="grams">Grams</option>
                  <option value="tola">Tola (1 tola = 11.664g)</option>
                  <option value="sovereign">Sovereign (= 8g)</option>
                  <option value="pavan">Pavan (= 8g)</option>
                </select>
              </div>
              {weightUnit !== "grams" && parseFloat(weight) > 0 && (
                <p className="text-xs text-[#7A6048]">= {weightGrams.toFixed(3)} grams</p>
              )}
            </div>

            {/* Purity */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#0F2447] block">Purity</label>
              <div className="grid grid-cols-2 gap-2">
                {PURITIES.map((p, i) => (
                  <button
                    key={p.label}
                    onClick={() => setPurityIdx(i)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-medium border transition-all text-left ${
                      purityIdx === i
                        ? "bg-[#E8500A] border-[#E8500A] text-white"
                        : "bg-white border-[#F0E4D4] text-[#0F2447] hover:border-[#E8500A] hover:text-[#E8500A]"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Making charges */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-[#0F2447]">Making Charges</label>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    value={makingPct}
                    onChange={(e) => setMakingPct(e.target.value)}
                    min="0"
                    max="40"
                    step="0.5"
                    className={numInputCls}
                  />
                  <span className="text-sm text-[#7A6048]">%</span>
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                step="0.5"
                value={parseFloat(makingPct) || 0}
                onChange={(e) => setMakingPct(e.target.value)}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-[#E8500A]"
              />
              <div className="flex justify-between text-xs text-[#7A6048]">
                <span>0% (gold bars)</span>
                <span>~12% typical</span>
                <span>40% (intricate)</span>
              </div>
            </div>

            {/* Wastage charges */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-[#0F2447]">Wastage Charges</label>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    value={wastagePct}
                    onChange={(e) => setWastagePct(e.target.value)}
                    min="0"
                    max="10"
                    step="0.5"
                    className={numInputCls}
                  />
                  <span className="text-sm text-[#7A6048]">%</span>
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                step="0.5"
                value={parseFloat(wastagePct) || 0}
                onChange={(e) => setWastagePct(e.target.value)}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-[#E8500A]"
              />
              <div className="flex justify-between text-xs text-[#7A6048]">
                <span>0%</span>
                <span>~3% typical</span>
                <span>10%</span>
              </div>
            </div>

            {/* Kadai / bangle toggle */}
            <div className="flex items-center justify-between bg-[#FFFCF8] border border-[#F0E4D4] rounded-xl px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-[#0F2447]">Kadai / Bangle (heavy item)?</p>
                <p className="text-xs text-[#7A6048] mt-0.5">Adds 2% extra wastage for thick or heavy pieces</p>
              </div>
              <button
                onClick={() => setIsKadai(!isKadai)}
                aria-label="Toggle kadai/bangle"
                className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
                  isKadai ? "bg-[#E8500A]" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                    isKadai ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Results panel */}
          <div className="md:col-span-2 bg-[#0F2447] p-6 flex flex-col gap-4">
            {/* Line items */}
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <span className="text-white/60 text-xs">Pure Gold Value</span>
                <span className="text-white font-semibold text-sm">{formatINR(Math.round(result.pureGoldValue))}</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-white/60 text-xs">+ Making Charges ({parseFloat(makingPct) || 0}%)</span>
                <span className="text-white font-semibold text-sm">+ {formatINR(Math.round(result.makingCharges))}</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-white/60 text-xs">
                  + Wastage ({result.effectiveWastagePct}%{isKadai ? " incl. +2%" : ""})
                </span>
                <span className="text-white font-semibold text-sm">+ {formatINR(Math.round(result.wastageCharges))}</span>
              </div>
              <div className="flex justify-between items-baseline border-t border-white/10 pt-2">
                <span className="text-white/70 text-xs font-medium">Subtotal</span>
                <span className="text-white font-bold">{formatINR(Math.round(result.subtotal))}</span>
              </div>
            </div>

            {/* GST breakdown */}
            <div className="border-t border-white/10 pt-3 space-y-1.5">
              <p className="text-white/50 text-xs font-medium uppercase tracking-wide">GST</p>
              <div className="flex justify-between items-baseline">
                <span className="text-white/50 text-xs">3% on gold value</span>
                <span className="text-white/80 text-xs font-medium">+ {formatINR(Math.round(result.gstGold))}</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-white/50 text-xs">5% on making charges</span>
                <span className="text-white/80 text-xs font-medium">+ {formatINR(Math.round(result.gstMaking))}</span>
              </div>
              <div className="flex justify-between items-baseline border-t border-white/10 pt-1.5">
                <span className="text-white/60 text-xs">Total GST</span>
                <span className="text-white/90 text-sm font-bold">+ {formatINR(Math.round(result.totalGST))}</span>
              </div>
            </div>

            {/* Total */}
            <div className="bg-[#E8500A] rounded-xl p-4 mt-auto">
              <p className="text-white/80 text-xs font-medium mb-1">Total Price to Pay</p>
              <p className="text-white text-2xl font-extrabold">{formatINR(Math.round(result.total))}</p>
              <p className="text-white/60 text-xs mt-1">
                {(parseFloat(weight) || 0).toFixed(1)} {weightUnit} · {purity.label}
              </p>
            </div>

            {/* TCS alert */}
            {result.total > 200000 && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                <p className="text-amber-800 text-xs font-semibold mb-1">⚠️ TCS Applicable</p>
                <p className="text-amber-700 text-xs leading-relaxed">
                  TCS of 1% ({formatINR(Math.round(result.tcs))}) will be collected by the jeweller
                  at source as per Income Tax rules.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Section 2: Old Gold Exchange ─────────────────────── */}
      <div className="bg-white rounded-2xl border border-[#F0E4D4] shadow-sm overflow-hidden">
        <div className="border-b border-[#F0E4D4] px-6 py-4 bg-[#FFFCF8]">
          <h2 className="text-base font-bold text-[#0F2447]">Old Gold / Exchange Value</h2>
          <p className="text-xs text-[#7A6048] mt-0.5">How much you&apos;ll receive against your old gold</p>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Inputs */}
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#0F2447] block">Old Gold Weight</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={oldWeight}
                  onChange={(e) => setOldWeight(e.target.value)}
                  min="0"
                  step="0.1"
                  className="w-28 border border-[#F0E4D4] rounded-xl px-3 py-2.5 text-sm font-semibold text-[#0F2447] focus:outline-none focus:ring-2 focus:ring-[#E8500A]/20 focus:border-[#E8500A]"
                />
                <select
                  value={oldWeightUnit}
                  onChange={(e) => setOldWeightUnit(e.target.value as WeightUnit)}
                  className={`flex-1 ${inputCls} cursor-pointer appearance-none`}
                >
                  <option value="grams">Grams</option>
                  <option value="tola">Tola (1 tola = 11.664g)</option>
                  <option value="sovereign">Sovereign (= 8g)</option>
                  <option value="pavan">Pavan (= 8g)</option>
                </select>
              </div>
              {oldWeightUnit !== "grams" && parseFloat(oldWeight) > 0 && (
                <p className="text-xs text-[#7A6048]">= {oldWeightGrams.toFixed(3)} grams</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#0F2447] block">Old Gold Purity</label>
              <select
                value={oldPurityIdx}
                onChange={(e) => setOldPurityIdx(parseInt(e.target.value))}
                className={`w-full ${inputCls} cursor-pointer`}
              >
                {PURITIES.map((p, i) => (
                  <option key={i} value={i}>{p.label}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between gap-4">
                <label className="text-sm font-semibold text-[#0F2447]">Jeweller Deduction</label>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    value={oldDeduction}
                    onChange={(e) => setOldDeduction(e.target.value)}
                    min="0"
                    max="30"
                    step="0.5"
                    className={numInputCls}
                  />
                  <span className="text-sm text-[#7A6048]">%</span>
                </div>
              </div>
              <p className="text-xs text-[#7A6048]">Jewellers deduct 3–8% for melting losses and purity verification</p>
            </div>
          </div>

          {/* Exchange result */}
          <div className="bg-[#F8FAFC] rounded-xl p-5 border border-[#EEF0F3] space-y-3 flex flex-col justify-center">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Exchange Value You Get</span>
              <span className="text-xl font-extrabold text-emerald-600">{formatINR(Math.round(exchangeValue))}</span>
            </div>
            <div className="border-t border-gray-200 pt-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">New jewellery total</span>
                <span className="font-medium text-[#0F2447]">{formatINR(Math.round(result.total))}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Less: exchange value</span>
                <span className="font-medium text-emerald-600">− {formatINR(Math.round(exchangeValue))}</span>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
              <span className="text-sm font-semibold text-[#0F2447]">Effective Price After Exchange</span>
              <span className="text-xl font-extrabold text-[#E8500A]">{formatINR(Math.round(effectivePrice))}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Section 3: Gold Loan Eligibility ─────────────────── */}
      <div className="bg-white rounded-2xl border border-[#F0E4D4] shadow-sm overflow-hidden">
        <div className="border-b border-[#F0E4D4] px-6 py-4 bg-[#FFFCF8]">
          <h2 className="text-base font-bold text-[#0F2447]">Gold Loan Eligibility</h2>
          <p className="text-xs text-[#7A6048] mt-0.5">Pre-filled from Section 1 — uses same weight, purity &amp; rate</p>
        </div>

        <div className="p-6">
          <div className="mb-5 bg-[#F0F4FF] border border-[#CBD5EF] rounded-xl p-4 text-sm">
            <span className="text-[#0F2447] font-medium">
              Market value of {(parseFloat(weight) || 0).toFixed(1)} {weightUnit} ({purity.label}) at ₹{goldRate}/g:
            </span>{" "}
            <span className="font-extrabold text-[#0F2447] text-base">{formatINR(Math.round(loanResult.marketValue))}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#F8FAFC] rounded-xl p-4 border border-[#EEF0F3] text-center">
              <p className="text-xs text-gray-500 mb-2">75% LTV</p>
              <p className="text-2xl font-extrabold text-[#0F2447]">{formatINR(loanResult.ltv75)}</p>
              <p className="text-xs text-emerald-600 font-semibold mt-2">RBI max for NBFCs</p>
            </div>
            <div className="bg-[#F0F4FF] rounded-xl p-4 border border-[#CBD5EF] ring-1 ring-[#CBD5EF] text-center">
              <p className="text-xs text-[#7A6048] mb-2">65% LTV</p>
              <p className="text-2xl font-extrabold text-[#0F2447]">{formatINR(loanResult.ltv65)}</p>
              <p className="text-xs text-[#7A6048] font-semibold mt-2">Conservative banks</p>
            </div>
            <div className="bg-[#F8FAFC] rounded-xl p-4 border border-[#EEF0F3] text-center">
              <p className="text-xs text-gray-500 mb-2">60% LTV</p>
              <p className="text-2xl font-extrabold text-[#0F2447]">{formatINR(loanResult.ltv60)}</p>
              <p className="text-xs text-gray-500 font-semibold mt-2">SBI / PNB typical</p>
            </div>
          </div>

          <p className="text-xs text-[#7A6048] mt-4 bg-[#FFFCF8] border border-[#F0E4D4] rounded-xl px-4 py-3 leading-relaxed">
            RBI allows max 75% LTV on gold loans. Banks typically offer 60–65%. Interest rates range from 7–29% p.a. depending on lender, tenure, and scheme. Gold loan tenures are typically 3 months to 3 years.
          </p>
        </div>
      </div>
    </div>
  );
}
