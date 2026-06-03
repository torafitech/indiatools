"use client";

import { useState, useMemo } from "react";
import {
  calculateEMISummary,
  generateAmortizationSchedule,
  getYearlyAmortization,
  calculatePrepaymentSavings,
} from "@/lib/calculations/emi";
import { formatINR, formatINRShort } from "@/lib/utils/format";

// Fix #1: per-type ranges so sliders are usable (30L on 10Cr scale = unusable)
const LOAN_TYPES = [
  {
    label: "Home Loan", icon: "🏠",
    rate: 8.5, amount: 3000000, tenure: 240,
    minAmount: 500000, maxAmount: 20000000, stepAmount: 100000,
    minTenureMonths: 12, maxTenureMonths: 360,
  },
  {
    label: "Car Loan", icon: "🚗",
    rate: 9.25, amount: 700000, tenure: 60,
    minAmount: 100000, maxAmount: 3000000, stepAmount: 50000,
    minTenureMonths: 12, maxTenureMonths: 84,
  },
  {
    label: "Personal Loan", icon: "💼",
    rate: 12.0, amount: 500000, tenure: 36,
    minAmount: 50000, maxAmount: 1500000, stepAmount: 10000,
    minTenureMonths: 6, maxTenureMonths: 60,
  },
] as const;


const DOWN_PAYMENT_OPTIONS = [10, 15, 20, 25, 30];

// Fix #11: human-readable tenure label
function formatTenureLabel(months: number): string {
  const y = Math.floor(months / 12);
  const m = months % 12;
  if (y === 0) return `${m} mo`;
  if (m === 0) return `${y} yr${y !== 1 ? "s" : ""}`;
  return `${y} yr ${m} mo`;
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
  right,
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
  right?: React.ReactNode;
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
        {right}
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
          className="font-bold text-gray-900 text-sm bg-blue-50 border border-blue-100 focus:border-blue-500 focus:bg-white px-3 py-1.5 rounded-lg text-right w-32 transition-colors focus:outline-none"
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
        <span>{minLabel ?? (min >= 100000 ? formatINRShort(min) : String(min))}</span>
        <span>{maxLabel ?? (max >= 100000 ? formatINRShort(max) : String(max))}</span>
      </div>
    </div>
  );
}

// Affordability config
const AFFORD = {
  danger:  { label: "High Risk",    color: "text-red-600",   bg: "bg-red-50 border-red-200",     bar: "bg-red-500",   msg: "EMI exceeds 50% of income. Consider longer tenure or smaller loan." },
  warning: { label: "Manageable",   color: "text-amber-600", bg: "bg-amber-50 border-amber-200", bar: "bg-amber-500", msg: "EMI is 30–50% of income. Tight but workable." },
  safe:    { label: "Comfortable",  color: "text-green-600", bg: "bg-green-50 border-green-200", bar: "bg-green-500", msg: "EMI is under 30% of income. Healthy debt level." },
} as const;

// Currency parse: handles "50L", "1.5Cr", "500000", "5,00,000"
function parseCurrency(s: string): number {
  const clean = s.toLowerCase().replace(/,/g, "").trim();
  if (clean.includes("cr")) return parseFloat(clean) * 10000000;
  if (clean.includes("l"))  return parseFloat(clean) * 100000;
  if (clean.includes("k"))  return parseFloat(clean) * 1000;
  return parseFloat(clean);
}

interface EMICalculatorProps {
  defaultAmount?: number;
  defaultRate?: number;
  defaultTenure?: number;
  defaultType?: number;
}

export function EMICalculator({
  defaultAmount = 3000000,
  defaultRate   = 8.5,
  defaultTenure = 240,
  defaultType   = 0,
}: EMICalculatorProps) {
  const [loanTypeIdx, setLoanTypeIdx] = useState(defaultType);
  const [principal, setPrincipal]     = useState(defaultAmount);
  const [rate, setRate]               = useState(defaultRate);
  const [tenure, setTenure]           = useState(defaultTenure);
  const [tenureUnit, setTenureUnit]   = useState<"years" | "months">("months");

  // Fix #4: down payment mode for home loans
  const [useDownPayment, setUseDownPayment] = useState(false);
  const [propertyValue, setPropertyValue]   = useState(6000000);
  const [downPaymentPct, setDownPaymentPct] = useState(20);

  // Fix #3: affordability
  const [income, setIncome] = useState(0);

  // Fix #9: processing fee
  const [processingFee, setProcessingFee] = useState(0);

  // Fix #5: amortization
  const [showAmortization, setShowAmortization] = useState(false);

  // Fix #8: copy
  const [copied, setCopied] = useState(false);

  const currentType = LOAN_TYPES[loanTypeIdx];
  const tenureMonths = tenureUnit === "years" ? tenure * 12 : tenure;

  const effectivePrincipal =
    useDownPayment && loanTypeIdx === 0
      ? Math.round(propertyValue * (1 - downPaymentPct / 100))
      : principal;

  const result = useMemo(
    () => calculateEMISummary(effectivePrincipal, rate, tenureMonths),
    [effectivePrincipal, rate, tenureMonths]
  );

  // Fix #6/#10: prepayment suggestion — 10% extra/month
  const prepay = useMemo(() => {
    const extra = Math.round(result.emi * 0.1);
    return {
      extra,
      ...calculatePrepaymentSavings(effectivePrincipal, rate, tenureMonths, extra),
    };
  }, [effectivePrincipal, rate, tenureMonths, result.emi]);

  const yearlySchedule = useMemo(() => {
    if (!showAmortization) return [];
    return getYearlyAmortization(
      generateAmortizationSchedule(effectivePrincipal, rate, tenureMonths)
    );
  }, [effectivePrincipal, rate, tenureMonths, showAmortization]);

  function handleTypeChange(idx: number) {
    setLoanTypeIdx(idx);
    const t = LOAN_TYPES[idx];
    setPrincipal(t.amount);
    setRate(t.rate);
    setTenure(t.tenure);
    setTenureUnit("months");
    setUseDownPayment(false);
  }

  // Fix #8: copy summary
  function handleCopy() {
    const lines = [
      `${currentType.label} EMI Calculation`,
      `Loan: ${formatINRShort(effectivePrincipal)} @ ${rate}% p.a. for ${formatTenureLabel(tenureMonths)}`,
      `Monthly EMI:     ${formatINR(result.emi)}`,
      `Total Interest:  ${formatINRShort(result.totalInterest)}`,
      `Total Payment:   ${formatINRShort(result.totalAmount)}`,
      processingFee > 0 ? `Processing Fee:  ${formatINR(Math.round(effectivePrincipal * processingFee / 100))} (${processingFee}%)` : "",
      ``,
      `Calculated on IndiaTools.in/emi-calculator`,
    ].filter(Boolean);
    navigator.clipboard.writeText(lines.join("\n")).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  const processingFeeAmt = processingFee > 0
    ? Math.round(effectivePrincipal * processingFee / 100)
    : 0;

  const principalPct = Math.round((effectivePrincipal / result.totalAmount) * 100);
  const interestPct  = 100 - principalPct;

  const emiIncomePct = income > 0 ? Math.round((result.emi / income) * 100) : 0;
  const affordLevel  = emiIncomePct > 50 ? "danger" : emiIncomePct > 30 ? "warning" : "safe";
  const afford       = AFFORD[affordLevel];

  const tenureMin = tenureUnit === "years"
    ? Math.ceil(currentType.minTenureMonths / 12)
    : currentType.minTenureMonths;
  const tenureMax = tenureUnit === "years"
    ? Math.floor(currentType.maxTenureMonths / 12)
    : currentType.maxTenureMonths;

  const RADIUS = 15.9;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

      {/* ─── Loan type tabs ─── */}
      <div className="flex gap-1.5 p-3 bg-gray-50 border-b border-gray-100">
        {LOAN_TYPES.map((t, i) => (
          <button
            key={t.label}
            onClick={() => handleTypeChange(i)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              loanTypeIdx === i
                ? "bg-blue-600 text-white shadow-sm"
                : "text-gray-500 hover:bg-white hover:text-gray-800 hover:shadow-sm"
            }`}
          >
            <span>{t.icon}</span>
            <span className="hidden sm:inline">{t.label}</span>
            <span className="sm:hidden">{t.label.split(" ")[0]}</span>
          </button>
        ))}
      </div>

      {/* ─── Main two-panel grid ─── */}
      <div className="grid grid-cols-1 md:grid-cols-5">

        {/* ── LEFT: Inputs ── */}
        <div className="md:col-span-3 p-6 space-y-6 md:border-r border-gray-100">

          {/* Fix #4: property value / loan amount toggle (home loans only) */}
          {loanTypeIdx === 0 && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 font-medium">Enter:</span>
              {["Loan amount", "Property value"].map((label, i) => (
                <button
                  key={label}
                  onClick={() => setUseDownPayment(i === 1)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                    useDownPayment === (i === 1)
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          )}

          {/* Property value + down payment */}
          {useDownPayment && loanTypeIdx === 0 ? (
            <div className="space-y-4">
              <SliderRow
                label="Property Value"
                value={propertyValue}
                min={1000000}
                max={100000000}
                step={500000}
                display={formatINRShort(propertyValue)}
                parseInput={parseCurrency}
                onChange={setPropertyValue}
              />
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-sm font-medium text-gray-600">Down Payment</span>
                  <span className="text-sm font-bold text-gray-900">
                    {downPaymentPct}% = {formatINRShort(Math.round(propertyValue * downPaymentPct / 100))}
                  </span>
                </div>
                <div className="flex gap-2">
                  {DOWN_PAYMENT_OPTIONS.map((p) => (
                    <button
                      key={p}
                      onClick={() => setDownPaymentPct(p)}
                      className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                        downPaymentPct === p
                          ? "bg-blue-600 text-white shadow-sm"
                          : "bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                      }`}
                    >
                      {p}%
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
                <span className="text-sm text-blue-700 font-medium">Loan Amount</span>
                <span className="text-xl font-bold text-blue-600">{formatINRShort(effectivePrincipal)}</span>
              </div>
            </div>
          ) : (
            // Fix #1: ranges scoped per loan type
            <SliderRow
              label="Loan Amount"
              value={principal}
              min={currentType.minAmount}
              max={currentType.maxAmount}
              step={currentType.stepAmount}
              display={formatINRShort(principal)}
              parseInput={parseCurrency}
              onChange={setPrincipal}
            />
          )}

          {/* Interest rate */}
          <SliderRow
            label="Annual Interest Rate"
            value={rate}
            min={5}
            max={24}
            step={0.05}
            display={`${rate.toFixed(2)}%`}
            parseInput={(s) => parseFloat(s.replace(/[^0-9.]/g, ""))}
            onChange={setRate}
            minLabel="5%"
            maxLabel="24%"
          />

          {/* Tenure — Fix #11: human label */}
          <SliderRow
            label="Loan Tenure"
            value={tenure}
            min={tenureMin}
            max={tenureMax}
            step={1}
            display={
              tenureUnit === "years"
                ? `${tenure} yr${tenure !== 1 ? "s" : ""}`
                : formatTenureLabel(tenure)
            }
            parseInput={(s) => parseInt(s.replace(/[^0-9]/g, ""), 10)}
            onChange={setTenure}
            minLabel={tenureUnit === "years" ? `${tenureMin} yr` : `${tenureMin} mo`}
            maxLabel={tenureUnit === "years" ? `${tenureMax} yrs` : `${tenureMax} mo`}
            right={
              <div className="flex items-center gap-0.5 bg-gray-100 p-0.5 rounded-lg">
                {(["Years", "Months"] as const).map((u) => (
                  <button
                    key={u}
                    onClick={() => setTenureUnit(u.toLowerCase() as "years" | "months")}
                    className={`text-xs px-2.5 py-1 rounded-md font-medium transition-all ${
                      tenureUnit === u.toLowerCase()
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {u}
                  </button>
                ))}
              </div>
            }
          />

          {/* Fix #3 + #9: optional fields */}
          <div className="space-y-3 pt-3 border-t border-gray-100">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Optional</p>

            {/* Monthly income → affordability */}
            <div className="flex items-center gap-3">
              <label className="text-sm text-gray-600 flex-1">Monthly Income</label>
              <div className="flex items-center gap-1 bg-blue-50 border border-blue-100 rounded-lg px-3 py-1.5">
                <span className="text-gray-400 text-sm">₹</span>
                <input
                  type="number"
                  value={income || ""}
                  placeholder="0"
                  onChange={(e) => setIncome(parseFloat(e.target.value) || 0)}
                  className="w-24 text-right text-sm font-bold text-gray-900 bg-transparent focus:outline-none"
                />
              </div>
            </div>

            {/* Processing fee */}
            <div className="flex items-center gap-3">
              <label className="text-sm text-gray-600 flex-1">Processing Fee</label>
              <div className="flex gap-1.5">
                {[0, 0.5, 1, 1.5].map((f) => (
                  <button
                    key={f}
                    onClick={() => setProcessingFee(f)}
                    className={`text-xs px-2.5 py-1.5 rounded-lg font-medium border transition-all ${
                      processingFee === f
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-500 border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    {f === 0 ? "None" : `${f}%`}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Fix #3: affordability signal — shown only when income entered */}
          {income > 0 && (
            <div className={`rounded-xl border p-3.5 ${afford.bg}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-gray-600">EMI Affordability</span>
                <span className={`text-xs font-bold ${afford.color}`}>
                  {afford.label} — {emiIncomePct}% of income
                </span>
              </div>
              <div className="w-full bg-white/60 rounded-full h-2 mb-2">
                <div
                  className={`h-2 rounded-full transition-all ${afford.bar}`}
                  style={{ width: `${Math.min(100, emiIncomePct)}%` }}
                />
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">{afford.msg}</p>
            </div>
          )}
        </div>

        {/* ── RIGHT: Results panel (desktop only) ── */}
        <div className="hidden md:flex md:col-span-2 flex-col bg-gradient-to-br from-blue-600 via-blue-600 to-blue-700 p-6">

          {/* EMI hero number */}
          <div className="text-center mb-5">
            <p className="text-blue-200 text-xs font-semibold uppercase tracking-widest mb-2">
              Monthly EMI
            </p>
            <p className="text-5xl font-bold text-white tracking-tight">
              {formatINR(result.emi)}
            </p>
            {/* Fix #11: human tenure label in results */}
            <p className="text-blue-300 text-xs mt-2">
              {formatTenureLabel(tenureMonths)} · {formatINRShort(effectivePrincipal)} loan
            </p>
          </div>

          <div className="border-t border-blue-500/50 mb-5" />

          {/* Donut chart + breakdown */}
          <div className="flex items-center gap-4 mb-4">
            <div className="relative w-24 h-24 flex-shrink-0">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                <circle cx="18" cy="18" r={RADIUS} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="4" />
                <circle
                  cx="18" cy="18" r={RADIUS} fill="none"
                  stroke="white" strokeWidth="4" strokeLinecap="round"
                  strokeDasharray={`${principalPct} ${100 - principalPct}`}
                />
                <circle
                  cx="18" cy="18" r={RADIUS} fill="none"
                  stroke="#fb923c" strokeWidth="4" strokeLinecap="round"
                  strokeDasharray={`${interestPct} ${100 - interestPct}`}
                  strokeDashoffset={`-${principalPct}`}
                />
              </svg>
              {/* Fix from before: center label NOT inside rotated SVG */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-white font-bold text-base leading-tight">{principalPct}%</span>
                <span className="text-blue-200 text-xs">principal</span>
              </div>
            </div>

            <div className="flex-1 space-y-2.5">
              {[
                { label: "Principal", value: formatINRShort(effectivePrincipal), pct: principalPct, dot: "bg-white" },
                { label: "Interest",  value: formatINRShort(result.totalInterest), pct: interestPct, dot: "bg-orange-400" },
              ].map((row) => (
                <div key={row.label}>
                  <div className="flex justify-between items-center mb-0.5">
                    <span className="flex items-center gap-1.5 text-xs text-blue-200">
                      <span className={`w-2 h-2 rounded-full ${row.dot} inline-block flex-shrink-0`} />
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
                <span className="text-blue-200 text-xs">Total Payment</span>
                <span className="text-white font-bold text-sm">{formatINRShort(result.totalAmount)}</span>
              </div>
            </div>
          </div>

          {/* Fix #9: processing fee row */}
          {processingFeeAmt > 0 && (
            <div className="bg-white/10 rounded-xl px-3 py-2 mb-3 flex justify-between items-center">
              <span className="text-blue-200 text-xs">Processing Fee ({processingFee}%)</span>
              <span className="text-white font-semibold text-sm">{formatINR(processingFeeAmt)}</span>
            </div>
          )}

          {/* Fix #6/#10: prepayment insight — reframed as actionable */}
          {prepay.monthsSaved > 0 && (
            <div className="bg-white/10 rounded-xl p-3 mb-4">
              <p className="text-blue-100 text-xs leading-relaxed">
                💡 Pay{" "}
                <span className="text-white font-bold">{formatINRShort(prepay.extra)}</span>
                {" "}extra/month →{" "}
                <span className="text-green-300 font-bold">
                  save {formatINRShort(prepay.interestSaved)} interest
                </span>
                {" "}&amp; close{" "}
                <span className="text-white font-bold">
                  {Math.round(prepay.monthsSaved / 12)} yrs
                </span>
                {" "}early
              </p>
            </div>
          )}

          {/* Fix #8: copy + affiliate — side by side */}
          <div className="flex gap-2 mt-auto">
            <button
              onClick={handleCopy}
              className="flex-1 flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs py-2.5 px-3 rounded-xl transition-all"
            >
              {copied ? "✓ Copied!" : "📋 Copy"}
            </button>
            <a
              href="/go/bankbazaar"
              rel="nofollow noopener sponsored"
              className="flex-1 flex items-center justify-between bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs py-2.5 px-3 rounded-xl transition-all group"
            >
              <span>Compare rates</span>
              <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </a>
          </div>
        </div>
      </div>

      {/* Fix #12: mobile stats bar — always visible, no scrolling needed */}
      <div className="md:hidden border-t border-gray-100 bg-blue-600 px-4 pt-4 pb-3">
        <div className="flex items-start justify-between text-white mb-2">
          <div>
            <p className="text-blue-200 text-xs mb-0.5">Monthly EMI</p>
            <p className="text-3xl font-bold">{formatINR(result.emi)}</p>
            <p className="text-blue-300 text-xs mt-0.5">{formatTenureLabel(tenureMonths)}</p>
          </div>
          <div className="text-right space-y-1.5">
            <div>
              <p className="text-blue-200 text-xs">Total Interest</p>
              <p className="font-bold text-orange-300">{formatINRShort(result.totalInterest)}</p>
            </div>
            <div>
              <p className="text-blue-200 text-xs">Total Payment</p>
              <p className="font-bold">{formatINRShort(result.totalAmount)}</p>
            </div>
          </div>
        </div>

        {/* Affordability on mobile too */}
        {income > 0 && (
          <div className={`text-xs px-3 py-1.5 rounded-lg font-medium text-center mb-2 ${
            affordLevel === "danger"  ? "bg-red-500/30 text-red-200" :
            affordLevel === "warning" ? "bg-amber-500/30 text-amber-200" :
                                        "bg-green-500/30 text-green-200"
          }`}>
            {afford.label} — EMI is {emiIncomePct}% of income
          </div>
        )}

        {/* Copy on mobile */}
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="flex-1 text-xs bg-white/10 hover:bg-white/20 text-white py-2 rounded-xl border border-white/20"
          >
            {copied ? "✓ Copied!" : "📋 Copy Summary"}
          </button>
          <a
            href="/go/bankbazaar"
            rel="nofollow noopener sponsored"
            className="flex-1 text-xs bg-white/10 hover:bg-white/20 text-white py-2 rounded-xl border border-white/20 text-center"
          >
            Compare rates →
          </a>
        </div>
      </div>

      {/* Fix #5: amortization — shows year count so users know what's inside */}
      <div className="border-t border-gray-100">
        <button
          onClick={() => setShowAmortization(!showAmortization)}
          className="w-full py-3 text-sm font-medium text-gray-500 hover:text-blue-600 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
        >
          <svg
            className={`w-4 h-4 transition-transform ${showAmortization ? "rotate-180" : ""}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
          {showAmortization
            ? "Hide Amortization Schedule"
            : `View ${Math.ceil(tenureMonths / 12)}-Year Amortization Schedule`}
        </button>

        {showAmortization && yearlySchedule.length > 0 && (
          <div className="overflow-x-auto px-4 pb-5">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  {["Year", "Principal Paid", "Interest Paid", "Total Paid", "Balance"].map((h, i) => (
                    <th
                      key={h}
                      className={`py-2.5 px-3 text-gray-500 font-semibold text-xs uppercase tracking-wide ${
                        i === 0 ? "text-left" : "text-right"
                      }`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {yearlySchedule.map((row) => (
                  <tr key={row.year} className="hover:bg-gray-50 transition-colors">
                    <td className="py-2.5 px-3 font-medium text-gray-700">
                      Year {row.year}
                    </td>
                    <td className="py-2.5 px-3 text-right text-blue-600 font-medium">
                      {formatINRShort(row.principalPaid)}
                    </td>
                    <td className="py-2.5 px-3 text-right text-orange-500">
                      {formatINRShort(row.interestPaid)}
                    </td>
                    <td className="py-2.5 px-3 text-right text-gray-600">
                      {formatINRShort(row.totalPaid)}
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold text-gray-900">
                      {formatINRShort(row.balance)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
