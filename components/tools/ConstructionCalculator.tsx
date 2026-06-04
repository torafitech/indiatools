"use client";

import { useState, useMemo } from "react";
import { CITIES } from "@/data/cities";
import {
  calculateConstructionCost,
  type ConstructionType,
} from "@/lib/calculations/construction";
import { formatINRShort } from "@/lib/utils/format";

const TYPE_OPTIONS: {
  value: ConstructionType;
  label: string;
  description: string;
  icon: string;
  priceHint: string;
  activeColor: string;
  activeBg: string;
  activeBorder: string;
}[] = [
  {
    value: "basic",
    label: "Basic",
    description: "Bare structure, cement plaster, basic tiles, no false ceiling",
    icon: "🧱",
    priceHint: "Most affordable",
    activeColor: "text-slate-700",
    activeBg: "bg-slate-50",
    activeBorder: "border-[#E8500A]",
  },
  {
    value: "standard",
    label: "Standard",
    description: "Vitrified tiles, modular kitchen, granite countertops, standard fittings",
    icon: "🏠",
    priceHint: "Popular choice",
    activeColor: "text-[#0F2447]",
    activeBg: "bg-[#F0F4FF]",
    activeBorder: "border-[#E8500A]",
  },
  {
    value: "premium",
    label: "Premium",
    description: "Italian marble, smart home wiring, premium sanitary, designer interiors",
    icon: "🏰",
    priceHint: "Top quality",
    activeColor: "text-amber-700",
    activeBg: "bg-amber-50",
    activeBorder: "border-[#E8500A]",
  },
];

const BREAKDOWN_ITEMS = [
  {
    key: "materialCost" as const,
    label: "Material & Structure",
    color: "bg-[#F0F4FF]0",
    textColor: "text-[#E8500A]",
    trackBg: "bg-blue-100",
  },
  {
    key: "labourCost" as const,
    label: "Labour",
    color: "bg-[#E8500A]",
    textColor: "text-[#E8500A]",
    trackBg: "bg-amber-100",
  },
  {
    key: "finishingCost" as const,
    label: "Finishing & MEP",
    color: "bg-emerald-500",
    textColor: "text-emerald-600",
    trackBg: "bg-emerald-100",
  },
];

interface ConstructionCalculatorProps {
  defaultCitySlug?: string;
}

export function ConstructionCalculator({
  defaultCitySlug = "bangalore",
}: ConstructionCalculatorProps) {
  const [citySlug, setCitySlug] = useState(defaultCitySlug);
  const [area, setArea] = useState(1200);
  const [areaInput, setAreaInput] = useState("1200");
  const [type, setType] = useState<ConstructionType>("standard");
  const [citySearch, setCitySearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredCities = useMemo(
    () =>
      CITIES.filter(
        (c) =>
          c.name.toLowerCase().includes(citySearch.toLowerCase()) ||
          c.state.toLowerCase().includes(citySearch.toLowerCase())
      ),
    [citySearch]
  );

  const selectedCity = CITIES.find((c) => c.slug === citySlug) ?? CITIES[2];

  const result = useMemo(
    () => calculateConstructionCost(citySlug, area, type),
    [citySlug, area, type]
  );

  const areaPct = ((area - 500) / (10000 - 500)) * 100;

  function handleAreaInput(v: string) {
    setAreaInput(v);
    const n = parseInt(v.replace(/[^0-9]/g, ""), 10);
    if (!isNaN(n) && n >= 500 && n <= 10000) setArea(n);
  }

  function handleAreaBlur() {
    const n = parseInt(areaInput.replace(/[^0-9]/g, ""), 10);
    if (isNaN(n) || n < 500) {
      setArea(500);
      setAreaInput("500");
    } else if (n > 10000) {
      setArea(10000);
      setAreaInput("10000");
    } else {
      setArea(n);
      setAreaInput(String(n));
    }
  }

  function selectCity(slug: string) {
    setCitySlug(slug);
    const c = CITIES.find((x) => x.slug === slug);
    setCitySearch(c?.name ?? "");
    setShowDropdown(false);
  }

  return (
    <div className="bg-white rounded-2xl border border-[#F0E4D4] shadow-sm overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-5">

        {/* ── LEFT: Inputs ── */}
        <div className="md:col-span-3 p-6 space-y-7 md:border-r border-[#F0E4D4]">

          {/* City selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#0F2447] uppercase tracking-wide">
              City
            </label>
            <div className="relative">
              <input
                type="text"
                value={showDropdown ? citySearch : selectedCity.name}
                placeholder="Search city..."
                onFocus={() => {
                  setCitySearch("");
                  setShowDropdown(true);
                }}
                onChange={(e) => setCitySearch(e.target.value)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
                className="w-full border border-[#F0E4D4] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8500A]/20 focus:border-[#E8500A] bg-white text-[#0F2447]"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#7A6048] text-xs">
                ▾
              </span>
              {showDropdown && (
                <div className="absolute z-20 left-0 right-0 top-full mt-1 bg-white border border-[#F0E4D4] rounded-xl shadow-lg max-h-56 overflow-y-auto">
                  {filteredCities.length === 0 ? (
                    <div className="px-4 py-3 text-sm text-[#7A6048]">No cities found</div>
                  ) : (
                    filteredCities.map((c) => (
                      <button
                        key={c.slug}
                        onMouseDown={() => selectCity(c.slug)}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between ${
                          c.slug === citySlug
                            ? "bg-[#FFF5EE] text-[#E8500A] font-semibold"
                            : "text-[#0F2447] hover:bg-[#FFFCF8]"
                        }`}
                      >
                        <span>{c.name}</span>
                        <span className="text-xs text-[#7A6048]">{c.state}</span>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-[#7A6048]">
              <span>Basic: ₹{selectedCity.basicCostPerSqft}/sqft</span>
              <span>·</span>
              <span>Standard: ₹{selectedCity.standardCostPerSqft}/sqft</span>
              <span>·</span>
              <span>Premium: ₹{selectedCity.premiumCostPerSqft}/sqft</span>
            </div>
          </div>

          {/* Built-up area */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-[#0F2447] uppercase tracking-wide">
                Built-up Area
              </label>
              <div className="flex items-center gap-2 bg-[#FFFCF8] border border-[#F0E4D4] rounded-xl px-3 py-1.5">
                <input
                  type="text"
                  value={areaInput}
                  onChange={(e) => handleAreaInput(e.target.value)}
                  onBlur={handleAreaBlur}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") (e.target as HTMLInputElement).blur();
                  }}
                  className="w-16 text-right text-sm font-bold text-[#0F2447] bg-transparent focus:outline-none"
                />
                <span className="text-xs font-medium text-[#7A6048] border-l border-[#F0E4D4] pl-2">
                  sq ft
                </span>
              </div>
            </div>
            <input
              type="range"
              min={500}
              max={10000}
              step={50}
              value={area}
              onChange={(e) => {
                const v = parseInt(e.target.value, 10);
                setArea(v);
                setAreaInput(String(v));
              }}
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer focus:outline-none"
              style={{
                background: `linear-gradient(to right, #E8500A ${areaPct}%, #F0E4D4 ${areaPct}%)`,
              }}
            />
            <div className="flex justify-between text-xs text-[#7A6048]">
              <span>500 sqft</span>
              <span>10,000 sqft</span>
            </div>
          </div>

          {/* Construction type — large clickable cards */}
          <div className="space-y-2.5">
            <label className="text-xs font-semibold text-[#0F2447] uppercase tracking-wide">
              Construction Type
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {TYPE_OPTIONS.map((opt) => {
                const active = type === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => setType(opt.value)}
                    className={`relative flex flex-col items-center gap-2 p-3 rounded-2xl border-2 text-center transition-all ${
                      active
                        ? `${opt.activeBorder} ${opt.activeBg}`
                        : "border-[#F0E4D4] hover:border-[#E8500A]/40 bg-white"
                    }`}
                  >
                    {active && (
                      <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#E8500A] rounded-full flex items-center justify-center text-white text-[10px] font-bold shadow-sm">
                        ✓
                      </span>
                    )}
                    <span className="text-2xl">{opt.icon}</span>
                    <span
                      className={`text-sm font-bold leading-tight ${
                        active ? opt.activeColor : "text-[#0F2447]"
                      }`}
                    >
                      {opt.label}
                    </span>
                    <span
                      className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
                        active
                          ? "bg-[#E8500A]/10 text-[#E8500A]"
                          : "bg-[#FFFCF8] text-[#7A6048]"
                      }`}
                    >
                      {opt.priceHint}
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-[#7A6048] leading-relaxed bg-[#FFFCF8] border border-[#F0E4D4] rounded-xl px-3 py-2">
              {TYPE_OPTIONS.find((o) => o.value === type)?.description}
            </p>
          </div>

          {/* Rate chip */}
          <div className="flex items-center justify-between bg-[#FFFCF8] border border-[#F0E4D4] rounded-xl px-4 py-3">
            <span className="text-sm text-[#7A6048]">Rate applied</span>
            <span className="text-xl font-bold text-[#E8500A]">
              ₹{result.costPerSqft.toLocaleString("en-IN")}<span className="text-sm font-medium text-[#7A6048]">/sqft</span>
            </span>
          </div>
        </div>

        {/* ── RIGHT: Results (desktop) ── */}
        <div className="hidden md:flex md:col-span-2 flex-col bg-[#0F2447] p-6 gap-5">

          {/* Hero cost range */}
          <div className="bg-white/10 rounded-2xl px-4 py-5 text-center border border-white/10">
            <p className="text-white/60 text-[10px] font-semibold uppercase tracking-widest mb-2">
              Estimated Total Cost
            </p>
            <p className="text-4xl font-bold text-white leading-none">
              {formatINRShort(result.totalCostMin)}
            </p>
            <p className="text-white/50 text-xs my-1 font-medium">to</p>
            <p className="text-4xl font-bold text-white leading-none">
              {formatINRShort(result.totalCostMax)}
            </p>
            <div className="mt-3 flex items-center justify-center gap-1.5 flex-wrap">
              <span className="bg-white/10 rounded-full px-2.5 py-0.5 text-[10px] text-white/70">
                {area.toLocaleString("en-IN")} sqft
              </span>
              <span className="bg-white/10 rounded-full px-2.5 py-0.5 text-[10px] text-white/70">
                {result.city}
              </span>
              <span className="bg-white/10 rounded-full px-2.5 py-0.5 text-[10px] text-white/70 capitalize">
                {type}
              </span>
            </div>
          </div>

          {/* Breakdown bars */}
          <div className="space-y-3">
            <p className="text-white/50 text-[10px] font-semibold uppercase tracking-widest">
              Cost Breakdown
            </p>
            {BREAKDOWN_ITEMS.map((item) => {
              const value = result[item.key];
              const barPct = Math.round((value / result.constructionCost) * 100);
              return (
                <div key={item.key} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${item.color} flex-shrink-0`} />
                      <span className="text-white/70 text-xs">{item.label}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-white font-semibold text-sm">{formatINRShort(value)}</span>
                      <span className="text-white/40 text-[10px] ml-1">{barPct}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div
                      className={`${item.color} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${barPct}%` }}
                    />
                  </div>
                </div>
              );
            })}

            {/* Contingency row */}
            <div className="space-y-1.5 border-t border-white/10 pt-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0" />
                  <span className="text-white/70 text-xs">Contingency (10%)</span>
                </div>
                <span className="text-amber-300 font-semibold text-sm">
                  {formatINRShort(result.contingency)}
                </span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div
                  className="bg-amber-400 h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.round((result.contingency / result.constructionCost) * 100)}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white/10 rounded-xl px-4 py-3 flex items-center justify-between border border-white/10">
            <div className="flex items-center gap-2">
              <span className="text-lg">🗓️</span>
              <span className="text-white/60 text-xs">Est. timeline</span>
            </div>
            <span className="text-white font-bold text-sm">
              {result.estimatedMonths} months
            </span>
          </div>

          {/* Disclaimer */}
          <p className="text-white/30 text-[10px] leading-relaxed mt-auto">
            Rates as of 2025. Actual costs vary by contractor, materials, and site conditions.
            Always get 3+ quotes.
          </p>
        </div>
      </div>

      {/* ── Mobile results ── */}
      <div className="md:hidden border-t border-[#F0E4D4] bg-[#0F2447] px-4 pt-5 pb-6 space-y-4">
        {/* Cost hero */}
        <div className="text-center bg-white/10 rounded-2xl px-4 py-4 border border-white/10">
          <p className="text-white/50 text-[10px] font-semibold uppercase tracking-widest mb-1">
            Estimated Total Cost
          </p>
          <p className="text-3xl font-bold text-white">
            {formatINRShort(result.totalCostMin)} – {formatINRShort(result.totalCostMax)}
          </p>
          <p className="text-white/50 text-xs mt-1">
            {area.toLocaleString("en-IN")} sqft · {result.city}
          </p>
        </div>

        {/* Breakdown bars (mobile) */}
        <div className="space-y-3">
          {BREAKDOWN_ITEMS.map((item) => {
            const value = result[item.key];
            const barPct = Math.round((value / result.constructionCost) * 100);
            return (
              <div key={item.key} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${item.color} flex-shrink-0`} />
                    <span className="text-white/70 text-xs">{item.label}</span>
                  </div>
                  <div>
                    <span className="text-white font-semibold text-sm">{formatINRShort(value)}</span>
                    <span className="text-white/40 text-[10px] ml-1">{barPct}%</span>
                  </div>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className={`${item.color} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${barPct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-white/10 rounded-xl px-3 py-3 border border-white/10">
            <p className="text-white/50 text-[10px]">Contingency</p>
            <p className="text-amber-300 font-bold text-sm">{formatINRShort(result.contingency)}</p>
          </div>
          <div className="bg-white/10 rounded-xl px-3 py-3 border border-white/10">
            <p className="text-white/50 text-[10px]">Timeline</p>
            <p className="text-white font-bold text-sm">{result.estimatedMonths} months</p>
          </div>
        </div>

        <p className="text-white/30 text-[10px] text-center leading-relaxed">
          Rates as of 2025. Always get 3+ contractor quotes.
        </p>
      </div>
    </div>
  );
}
