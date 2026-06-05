"use client";

import { useState, useMemo } from "react";

type Founder = { id: string; name: string; sharesPct: number };
type Round = {
  id: string;
  name: string;
  investment: number;
  preMoneyValuation: number;
  optionPoolPct: number;
  currency: "INR" | "USD";
};

type StageHolder = { name: string; shares: number; pct: number };
type Stage = {
  label: string;
  holders: StageHolder[];
  pricePerShare?: number;
  postMoney?: number;
  investorPct?: number;
};

const COLORS = ["#0F2447", "#E8500A", "#059669", "#7C3AED", "#DC2626", "#0891B2"];

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

function calculateCapTable(founders: Founder[], rounds: Round[]): Stage[] {
  let totalShares = 10_000_000;
  const stages: Stage[] = [
    {
      label: "Founders",
      holders: founders.map((f) => ({
        name: f.name,
        shares: Math.round((totalShares * f.sharesPct) / 100),
        pct: f.sharesPct,
      })),
    },
  ];

  for (const round of rounds) {
    const postMoney = round.preMoneyValuation + round.investment;
    const investorPct = (round.investment / postMoney) * 100;
    const optionPct = round.optionPoolPct;
    const dilutionFactor = (100 - investorPct - optionPct) / 100;

    const newTotalShares = Math.round(totalShares / dilutionFactor);
    const investorShares = Math.round((newTotalShares * investorPct) / 100);
    const optionShares = Math.round((newTotalShares * optionPct) / 100);
    const pricePerShare = round.preMoneyValuation / totalShares;

    const holders: StageHolder[] = stages[stages.length - 1].holders.map((h) => ({
      name: h.name,
      shares: h.shares,
      pct: (h.shares / newTotalShares) * 100,
    }));
    holders.push({ name: `${round.name} Investors`, shares: investorShares, pct: investorPct });
    if (optionPct > 0) holders.push({ name: "Option Pool", shares: optionShares, pct: optionPct });

    totalShares = newTotalShares;
    stages.push({ label: round.name, holders, pricePerShare, postMoney, investorPct });
  }

  return stages;
}

function formatCurrency(val: number, currency: "INR" | "USD" = "INR"): string {
  if (currency === "USD") {
    if (val >= 1_000_000) return `$${(val / 1_000_000).toFixed(2)}M`;
    if (val >= 1_000) return `$${(val / 1_000).toFixed(0)}K`;
    return `$${val.toLocaleString()}`;
  }
  if (val >= 10_000_000) return `₹${(val / 10_000_000).toFixed(2)}Cr`;
  if (val >= 100_000) return `₹${(val / 100_000).toFixed(2)}L`;
  if (val >= 1_000) return `₹${(val / 1_000).toFixed(0)}K`;
  return `₹${val.toLocaleString()}`;
}

function formatShares(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n.toLocaleString();
}

function StackedBar({ holders }: { holders: StageHolder[] }) {
  return (
    <div className="flex h-8 rounded-lg overflow-hidden border border-[#F0E4D4]">
      {holders.map((h, i) => (
        <div
          key={i}
          style={{ width: `${Math.max(h.pct, 0)}%`, background: COLORS[i % COLORS.length] }}
          title={`${h.name}: ${h.pct.toFixed(1)}%`}
          className="transition-all duration-300"
        />
      ))}
    </div>
  );
}

function LegendDot({ color, label, pct }: { color: string; label: string; pct: number }) {
  return (
    <div className="flex items-center gap-1.5 text-xs text-[#7A6048]">
      <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: color }} />
      <span className="truncate max-w-[100px]">{label}</span>
      <span className="font-semibold text-[#0F2447]">{pct.toFixed(1)}%</span>
    </div>
  );
}

const ROUND_PRESETS = ["Seed", "Series A", "Series B", "Series C", "Bridge", "Custom"];

export function EquityCalculator() {
  const [founders, setFounders] = useState<Founder[]>([
    { id: uid(), name: "Co-Founder 1", sharesPct: 60 },
    { id: uid(), name: "Co-Founder 2", sharesPct: 40 },
  ]);
  const [rounds, setRounds] = useState<Round[]>([]);

  const founderSum = founders.reduce((s, f) => s + f.sharesPct, 0);
  const founderError = Math.abs(founderSum - 100) > 0.01;

  const stages = useMemo(() => {
    if (founderError) return [];
    return calculateCapTable(founders, rounds);
  }, [founders, rounds, founderError]);

  function updateFounder(id: string, field: keyof Founder, value: string | number) {
    setFounders((prev) =>
      prev.map((f) => (f.id === id ? { ...f, [field]: value } : f))
    );
  }

  function addFounder() {
    const remaining = Math.max(0, 100 - founderSum);
    setFounders((prev) => [
      ...prev,
      { id: uid(), name: `Co-Founder ${prev.length + 1}`, sharesPct: remaining },
    ]);
  }

  function removeFounder(id: string) {
    if (founders.length <= 1) return;
    setFounders((prev) => prev.filter((f) => f.id !== id));
  }

  function addRound() {
    setRounds((prev) => [
      ...prev,
      {
        id: uid(),
        name: ROUND_PRESETS[prev.length] || "Custom",
        investment: 10_000_000,
        preMoneyValuation: 50_000_000,
        optionPoolPct: 10,
        currency: "INR",
      },
    ]);
  }

  function updateRound(id: string, field: keyof Round, value: string | number) {
    setRounds((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
  }

  function removeRound(id: string) {
    setRounds((prev) => prev.filter((r) => r.id !== id));
  }

  const lastRoundCurrency = rounds.length > 0 ? rounds[rounds.length - 1].currency : "INR";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      {/* Left panel */}
      <div className="lg:col-span-2 space-y-5">
        {/* Founders */}
        <div className="bg-white rounded-2xl border border-[#F0E4D4] p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-[#0F2447]">Founders</h2>
            <button
              onClick={addFounder}
              className="text-xs px-3 py-1.5 rounded-lg border border-[#E8500A] text-[#E8500A] hover:bg-[#FFF5F0] transition-colors font-medium"
            >
              + Add Founder
            </button>
          </div>

          <div className="space-y-3">
            {founders.map((f, i) => (
              <div key={f.id} className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-sm flex-shrink-0"
                  style={{ background: COLORS[i % COLORS.length] }}
                />
                <input
                  type="text"
                  value={f.name}
                  onChange={(e) => updateFounder(f.id, "name", e.target.value)}
                  placeholder="Name"
                  className="flex-1 min-w-0 text-sm border border-[#F0E4D4] rounded-lg px-3 py-2 focus:outline-none focus:border-[#E8500A] text-[#0F2447]"
                />
                <div className="relative flex-shrink-0 w-20">
                  <input
                    type="number"
                    value={f.sharesPct}
                    min={0}
                    max={100}
                    step={0.1}
                    onChange={(e) => updateFounder(f.id, "sharesPct", parseFloat(e.target.value) || 0)}
                    className="w-full text-sm border border-[#F0E4D4] rounded-lg px-3 py-2 pr-6 focus:outline-none focus:border-[#E8500A] text-[#0F2447] text-right"
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[#7A6048] text-xs">%</span>
                </div>
                <button
                  onClick={() => removeFounder(f.id)}
                  disabled={founders.length <= 1}
                  className="text-[#7A6048] hover:text-red-500 disabled:opacity-30 transition-colors flex-shrink-0"
                  title="Remove"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className={`mt-3 flex items-center justify-between text-xs px-1 ${founderError ? "text-red-500" : "text-[#7A6048]"}`}>
            <span>{founderError ? `Total must be 100% (currently ${founderSum.toFixed(1)}%)` : "Total equity"}</span>
            <span className={`font-bold ${founderError ? "text-red-500" : "text-[#059669]"}`}>{founderSum.toFixed(1)}%</span>
          </div>
        </div>

        {/* Funding Rounds */}
        <div className="bg-white rounded-2xl border border-[#F0E4D4] p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-[#0F2447]">Funding Rounds</h2>
          </div>

          {rounds.length === 0 && (
            <p className="text-xs text-[#7A6048] text-center py-4">
              No rounds yet. Add a round to see dilution.
            </p>
          )}

          <div className="space-y-4">
            {rounds.map((r, idx) => (
              <div key={r.id} className="border border-[#F0E4D4] rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <select
                      value={r.name}
                      onChange={(e) => updateRound(r.id, "name", e.target.value)}
                      className="text-sm font-semibold text-[#0F2447] border border-[#F0E4D4] rounded-lg px-2 py-1.5 focus:outline-none focus:border-[#E8500A] bg-white"
                    >
                      {ROUND_PRESETS.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                    <select
                      value={r.currency}
                      onChange={(e) => updateRound(r.id, "currency", e.target.value as "INR" | "USD")}
                      className="text-xs text-[#7A6048] border border-[#F0E4D4] rounded-lg px-2 py-1.5 focus:outline-none focus:border-[#E8500A] bg-white"
                    >
                      <option value="INR">₹ INR</option>
                      <option value="USD">$ USD</option>
                    </select>
                  </div>
                  <button
                    onClick={() => removeRound(r.id)}
                    className="text-[#7A6048] hover:text-red-500 transition-colors ml-2 flex-shrink-0"
                  >
                    ✕
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-[#7A6048] block mb-1">Investment</label>
                    <div className="relative">
                      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#7A6048] text-xs">
                        {r.currency === "INR" ? "₹" : "$"}
                      </span>
                      <input
                        type="number"
                        value={r.investment}
                        min={0}
                        onChange={(e) => updateRound(r.id, "investment", parseFloat(e.target.value) || 0)}
                        className="w-full text-sm border border-[#F0E4D4] rounded-lg pl-6 pr-3 py-2 focus:outline-none focus:border-[#E8500A] text-[#0F2447]"
                      />
                    </div>
                    <p className="text-[10px] text-[#7A6048] mt-0.5">{formatCurrency(r.investment, r.currency)}</p>
                  </div>
                  <div>
                    <label className="text-xs text-[#7A6048] block mb-1">Pre-money Valuation</label>
                    <div className="relative">
                      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#7A6048] text-xs">
                        {r.currency === "INR" ? "₹" : "$"}
                      </span>
                      <input
                        type="number"
                        value={r.preMoneyValuation}
                        min={0}
                        onChange={(e) => updateRound(r.id, "preMoneyValuation", parseFloat(e.target.value) || 0)}
                        className="w-full text-sm border border-[#F0E4D4] rounded-lg pl-6 pr-3 py-2 focus:outline-none focus:border-[#E8500A] text-[#0F2447]"
                      />
                    </div>
                    <p className="text-[10px] text-[#7A6048] mt-0.5">{formatCurrency(r.preMoneyValuation, r.currency)}</p>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-[#7A6048] block mb-1">Option Pool %</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min={0}
                      max={30}
                      step={0.5}
                      value={r.optionPoolPct}
                      onChange={(e) => updateRound(r.id, "optionPoolPct", parseFloat(e.target.value))}
                      className="flex-1 accent-[#E8500A]"
                    />
                    <span className="text-sm font-semibold text-[#0F2447] w-10 text-right">
                      {r.optionPoolPct}%
                    </span>
                  </div>
                </div>

                {r.preMoneyValuation > 0 && r.investment > 0 && (
                  <div className="flex items-center gap-3 text-xs text-[#7A6048] pt-1 border-t border-[#F0E4D4]">
                    <span>Post-money: <strong className="text-[#0F2447]">{formatCurrency(r.preMoneyValuation + r.investment, r.currency)}</strong></span>
                    <span>·</span>
                    <span>Investor gets: <strong className="text-[#E8500A]">{((r.investment / (r.preMoneyValuation + r.investment)) * 100).toFixed(1)}%</strong></span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={addRound}
            className="mt-4 w-full py-2.5 rounded-xl border-2 border-dashed border-[#E8500A] text-[#E8500A] text-sm font-medium hover:bg-[#FFF5F0] transition-colors"
          >
            + Add Funding Round
          </button>
        </div>
      </div>

      {/* Right panel */}
      <div className="lg:col-span-3 space-y-4">
        {founderError ? (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
            <p className="text-red-600 font-medium">Founder equity must sum to 100%</p>
            <p className="text-red-400 text-sm mt-1">Currently: {founderSum.toFixed(1)}%</p>
          </div>
        ) : stages.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#F0E4D4] p-6 text-center">
            <p className="text-[#7A6048]">Cap table will appear here</p>
          </div>
        ) : (
          stages.map((stage, si) => {
            const roundData = si > 0 ? rounds[si - 1] : null;
            const currency = roundData?.currency ?? lastRoundCurrency;
            return (
              <div key={stage.label} className="bg-white rounded-2xl border border-[#F0E4D4] overflow-hidden">
                <div className="px-5 py-3 border-b border-[#F0E4D4] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-semibold"
                      style={{
                        background: si === 0 ? "#F0F4FF" : "#FFF5F0",
                        color: si === 0 ? "#0F2447" : "#E8500A",
                      }}
                    >
                      {si === 0 ? "Initial" : `Round ${si}`}
                    </span>
                    <h3 className="font-bold text-[#0F2447] text-sm">{stage.label}</h3>
                  </div>
                  {stage.postMoney != null && (
                    <div className="text-right">
                      <p className="text-xs text-[#7A6048]">Post-money</p>
                      <p className="text-sm font-bold text-[#0F2447]">{formatCurrency(stage.postMoney, currency)}</p>
                    </div>
                  )}
                </div>

                <div className="p-5 space-y-4">
                  <StackedBar holders={stage.holders} />

                  <div className="flex flex-wrap gap-3">
                    {stage.holders.map((h, i) => (
                      <LegendDot key={i} color={COLORS[i % COLORS.length]} label={h.name} pct={h.pct} />
                    ))}
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-[#F0E4D4]">
                          <th className="text-left py-2 text-xs font-semibold text-[#7A6048]">Stakeholder</th>
                          <th className="text-right py-2 text-xs font-semibold text-[#7A6048]">Shares</th>
                          <th className="text-right py-2 text-xs font-semibold text-[#7A6048]">Ownership</th>
                          {stage.pricePerShare != null && (
                            <th className="text-right py-2 text-xs font-semibold text-[#7A6048]">Value</th>
                          )}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#F0E4D4]">
                        {stage.holders.map((h, i) => (
                          <tr key={i} className="hover:bg-[#FFFCF8] transition-colors">
                            <td className="py-2.5">
                              <div className="flex items-center gap-2">
                                <span
                                  className="w-2 h-2 rounded-sm flex-shrink-0"
                                  style={{ background: COLORS[i % COLORS.length] }}
                                />
                                <span className="text-[#0F2447] font-medium text-xs">{h.name}</span>
                              </div>
                            </td>
                            <td className="py-2.5 text-right text-xs text-[#7A6048]">{formatShares(h.shares)}</td>
                            <td className="py-2.5 text-right text-xs font-semibold text-[#0F2447]">
                              {h.pct.toFixed(2)}%
                            </td>
                            {stage.pricePerShare != null && (
                              <td className="py-2.5 text-right text-xs text-[#7A6048]">
                                {formatCurrency(h.shares * stage.pricePerShare, currency)}
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="border-t-2 border-[#F0E4D4]">
                          <td className="py-2 text-xs font-bold text-[#0F2447]">Total</td>
                          <td className="py-2 text-right text-xs font-bold text-[#0F2447]">
                            {formatShares(stage.holders.reduce((s, h) => s + h.shares, 0))}
                          </td>
                          <td className="py-2 text-right text-xs font-bold text-[#059669]">100%</td>
                          {stage.pricePerShare != null && (
                            <td className="py-2 text-right text-xs font-bold text-[#0F2447]">
                              {formatCurrency(
                                stage.holders.reduce((s, h) => s + h.shares * (stage.pricePerShare ?? 0), 0),
                                currency
                              )}
                            </td>
                          )}
                        </tr>
                      </tfoot>
                    </table>
                  </div>

                  {stage.pricePerShare != null && (
                    <div className="text-xs text-[#7A6048] pt-1">
                      Price per share: <strong className="text-[#0F2447]">{currency === "USD" ? "$" : "₹"}{stage.pricePerShare.toFixed(4)}</strong>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
