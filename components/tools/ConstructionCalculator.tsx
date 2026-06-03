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
}[] = [
  {
    value: "basic",
    label: "Basic",
    description: "Bare structure, standard cement plaster, basic tiles, no false ceiling",
    icon: "🧱",
  },
  {
    value: "standard",
    label: "Standard",
    description: "Vitrified tiles, modular kitchen, granite countertops, standard fittings",
    icon: "🏠",
  },
  {
    value: "premium",
    label: "Premium",
    description: "Italian marble, smart home wiring, premium sanitary, designer interiors",
    icon: "🏰",
  },
];

const BREAKDOWN_ITEMS = [
  { key: "materialCost" as const, label: "Material Cost", pct: 55, color: "bg-blue-500" },
  { key: "labourCost" as const, label: "Labour Cost", pct: 30, color: "bg-indigo-400" },
  { key: "finishingCost" as const, label: "Finishing & MEP", pct: 15, color: "bg-sky-400" },
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
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-5">

        {/* ── LEFT: Inputs ── */}
        <div className="md:col-span-3 p-6 space-y-6 md:border-r border-gray-100">

          {/* City selector */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">City</label>
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
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
              />
              {showDropdown && (
                <div className="absolute z-20 left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-56 overflow-y-auto">
                  {filteredCities.length === 0 ? (
                    <div className="px-4 py-3 text-sm text-gray-400">No cities found</div>
                  ) : (
                    filteredCities.map((c) => (
                      <button
                        key={c.slug}
                        onMouseDown={() => selectCity(c.slug)}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between ${
                          c.slug === citySlug
                            ? "bg-blue-50 text-blue-700 font-medium"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <span>{c.name}</span>
                        <span className="text-xs text-gray-400">{c.state}</span>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
            <div className="flex gap-3 text-xs text-gray-500">
              <span>Basic: ₹{selectedCity.basicCostPerSqft}/sqft</span>
              <span>·</span>
              <span>Standard: ₹{selectedCity.standardCostPerSqft}/sqft</span>
              <span>·</span>
              <span>Premium: ₹{selectedCity.premiumCostPerSqft}/sqft</span>
            </div>
          </div>

          {/* Built-up area slider */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-gray-600 flex-1 min-w-[90px]">Built-up Area</span>
              <div className="flex items-center gap-1 bg-blue-50 border border-blue-100 rounded-lg px-3 py-1.5">
                <input
                  type="text"
                  value={areaInput}
                  onChange={(e) => handleAreaInput(e.target.value)}
                  onBlur={handleAreaBlur}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") (e.target as HTMLInputElement).blur();
                  }}
                  className="w-16 text-right text-sm font-bold text-gray-900 bg-transparent focus:outline-none"
                />
                <span className="text-xs text-gray-500">sqft</span>
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
                background: `linear-gradient(to right, #2563eb ${areaPct}%, #e2e8f0 ${areaPct}%)`,
              }}
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>500 sqft</span>
              <span>10,000 sqft</span>
            </div>
          </div>

          {/* Construction type selector */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">Construction Type</label>
            <div className="grid grid-cols-3 gap-2">
              {TYPE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setType(opt.value)}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 text-center transition-all ${
                    type === opt.value
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 hover:border-blue-200 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-xl">{opt.icon}</span>
                  <span
                    className={`text-sm font-semibold ${
                      type === opt.value ? "text-blue-700" : "text-gray-700"
                    }`}
                  >
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 leading-relaxed mt-1">
              {TYPE_OPTIONS.find((o) => o.value === type)?.description}
            </p>
          </div>

          {/* Cost rate info */}
          <div className="bg-gray-50 rounded-xl px-4 py-3 flex items-center justify-between">
            <span className="text-sm text-gray-600">Rate applied</span>
            <span className="text-xl font-bold text-blue-600">
              ₹{result.costPerSqft.toLocaleString("en-IN")}/sqft
            </span>
          </div>
        </div>

        {/* ── RIGHT: Results ── */}
        <div className="hidden md:flex md:col-span-2 flex-col bg-gradient-to-br from-blue-600 via-blue-600 to-blue-700 p-6">

          {/* Hero: cost range */}
          <div className="text-center mb-5">
            <p className="text-blue-200 text-xs font-semibold uppercase tracking-widest mb-1">
              Estimated Total Cost
            </p>
            <p className="text-3xl font-bold text-white leading-tight">
              {formatINRShort(result.totalCostMin)}
            </p>
            <p className="text-blue-300 text-sm">to</p>
            <p className="text-3xl font-bold text-white leading-tight">
              {formatINRShort(result.totalCostMax)}
            </p>
            <p className="text-blue-300 text-xs mt-2">
              {area.toLocaleString("en-IN")} sqft · {result.city} · {type}
            </p>
          </div>

          <div className="border-t border-blue-500/50 mb-4" />

          {/* Cost breakdown */}
          <div className="space-y-3 mb-4">
            {BREAKDOWN_ITEMS.map((item) => {
              const value = result[item.key];
              const barPct = Math.round((value / result.constructionCost) * 100);
              return (
                <div key={item.key}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="flex items-center gap-1.5 text-xs text-blue-200">
                      <span
                        className={`w-2 h-2 rounded-full ${item.color} inline-block flex-shrink-0`}
                      />
                      {item.label}
                    </span>
                    <span className="text-white font-semibold text-sm">
                      {formatINRShort(value)}
                    </span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-1">
                    <div
                      className={`${item.color} h-1 rounded-full transition-all`}
                      style={{ width: `${barPct}%` }}
                    />
                  </div>
                </div>
              );
            })}

            <div className="border-t border-blue-500/40 pt-2">
              <div className="flex justify-between items-center mb-1">
                <span className="flex items-center gap-1.5 text-xs text-blue-200">
                  <span className="w-2 h-2 rounded-full bg-yellow-400 inline-block flex-shrink-0" />
                  Contingency (10%)
                </span>
                <span className="text-yellow-300 font-semibold text-sm">
                  {formatINRShort(result.contingency)}
                </span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="text-blue-200 text-xs">Cost per sqft</span>
                <span className="text-white font-bold text-sm">
                  ₹{result.costPerSqft.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white/10 rounded-xl px-3 py-2.5 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-blue-200 text-xs">Est. construction time</span>
              <span className="text-white font-bold text-sm">
                {result.estimatedMonths} months
              </span>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-blue-300 text-xs leading-relaxed mt-auto">
            Rates as of 2025. Actual costs vary by contractor, materials, and site conditions.
            Always get 3+ quotes.
          </p>
        </div>
      </div>

      {/* Mobile results bar */}
      <div className="md:hidden border-t border-gray-100 bg-blue-600 px-4 pt-4 pb-4">
        <div className="text-center mb-3">
          <p className="text-blue-200 text-xs mb-1">Estimated Total Cost</p>
          <p className="text-2xl font-bold text-white">
            {formatINRShort(result.totalCostMin)} – {formatINRShort(result.totalCostMax)}
          </p>
          <p className="text-blue-300 text-xs mt-0.5">
            {area.toLocaleString("en-IN")} sqft · {result.city}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 text-center">
          {BREAKDOWN_ITEMS.map((item) => (
            <div key={item.key} className="bg-white/10 rounded-lg px-2 py-2">
              <p className="text-blue-200 text-xs">{item.label}</p>
              <p className="text-white font-bold text-sm">{formatINRShort(result[item.key])}</p>
            </div>
          ))}
          <div className="bg-white/10 rounded-lg px-2 py-2">
            <p className="text-blue-200 text-xs">Contingency</p>
            <p className="text-yellow-300 font-bold text-sm">{formatINRShort(result.contingency)}</p>
          </div>
          <div className="bg-white/10 rounded-lg px-2 py-2">
            <p className="text-blue-200 text-xs">Timeline</p>
            <p className="text-white font-bold text-sm">{result.estimatedMonths} months</p>
          </div>
        </div>
        <p className="text-blue-300 text-xs text-center mt-3 leading-relaxed">
          Rates as of 2025. Get 3+ contractor quotes.
        </p>
      </div>
    </div>
  );
}
