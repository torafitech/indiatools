"use client";

import { useState, useMemo, useRef } from "react";

interface Ingredient {
  name: string;
  cal: number; protein: number; carbs: number; fat: number;
  fiber: number; sodium: number;
}

const DB: Record<string, Ingredient> = {
  "Rice (cooked)":       { name:"Rice (cooked)",       cal:130, protein:2.7,  carbs:28.2,  fat:0.3,  fiber:0.4, sodium:1 },
  "Wheat flour (maida)": { name:"Wheat flour (maida)", cal:364, protein:10.3, carbs:73.5,  fat:1.0,  fiber:2.7, sodium:2 },
  "Wheat flour (atta)":  { name:"Wheat flour (atta)",  cal:340, protein:11.8, carbs:71.2,  fat:1.7,  fiber:11.2, sodium:2 },
  "Sugar":               { name:"Sugar",               cal:387, protein:0,    carbs:99.8,  fat:0,    fiber:0,  sodium:1 },
  "Salt":                { name:"Salt",                cal:0,   protein:0,    carbs:0,     fat:0,    fiber:0,  sodium:38758 },
  "Butter":              { name:"Butter",              cal:717, protein:0.9,  carbs:0.1,   fat:81.1, fiber:0,  sodium:576 },
  "Ghee":                { name:"Ghee",                cal:900, protein:0,    carbs:0,     fat:99.5, fiber:0,  sodium:0 },
  "Refined oil":         { name:"Refined oil",         cal:884, protein:0,    carbs:0,     fat:100,  fiber:0,  sodium:0 },
  "Milk (whole)":        { name:"Milk (whole)",        cal:61,  protein:3.2,  carbs:4.8,   fat:3.3,  fiber:0,  sodium:44 },
  "Egg":                 { name:"Egg",                 cal:155, protein:13.0, carbs:1.1,   fat:11.0, fiber:0,  sodium:124 },
  "Potato":              { name:"Potato",              cal:77,  protein:2.0,  carbs:17.5,  fat:0.1,  fiber:2.2, sodium:6 },
  "Onion":               { name:"Onion",               cal:40,  protein:1.1,  carbs:9.3,   fat:0.1,  fiber:1.7, sodium:4 },
  "Tomato":              { name:"Tomato",              cal:18,  protein:0.9,  carbs:3.9,   fat:0.2,  fiber:1.2, sodium:5 },
  "Chicken (cooked)":    { name:"Chicken (cooked)",    cal:239, protein:27.3, carbs:0,     fat:13.6, fiber:0,  sodium:82 },
  "Paneer":              { name:"Paneer",              cal:265, protein:18.3, carbs:1.2,   fat:20.8, fiber:0,  sodium:24 },
  "Dal (toor)":          { name:"Dal (toor)",          cal:343, protein:22.3, carbs:60.5,  fat:1.7,  fiber:7.0, sodium:35 },
  "Dal (moong)":         { name:"Dal (moong)",         cal:347, protein:24.5, carbs:59.2,  fat:1.2,  fiber:8.0, sodium:15 },
  "Chickpeas (cooked)":  { name:"Chickpeas (cooked)",  cal:164, protein:8.9,  carbs:27.4,  fat:2.6,  fiber:7.6, sodium:24 },
  "Oats":                { name:"Oats",                cal:389, protein:16.9, carbs:66.3,  fat:6.9,  fiber:10.6, sodium:2 },
  "Semolina (rava)":     { name:"Semolina (rava)",     cal:360, protein:12.7, carbs:72.8,  fat:1.0,  fiber:3.9, sodium:1 },
  "Coconut (fresh)":     { name:"Coconut (fresh)",     cal:354, protein:3.3,  carbs:15.2,  fat:33.5, fiber:9.0, sodium:20 },
  "Almonds":             { name:"Almonds",             cal:579, protein:21.2, carbs:21.6,  fat:49.9, fiber:12.5, sodium:1 },
  "Cashews":             { name:"Cashews",             cal:553, protein:18.2, carbs:30.2,  fat:43.8, fiber:3.3, sodium:12 },
  "Raisins":             { name:"Raisins",             cal:299, protein:3.1,  carbs:79.2,  fat:0.5,  fiber:3.7, sodium:11 },
  "Honey":               { name:"Honey",               cal:304, protein:0.3,  carbs:82.4,  fat:0,    fiber:0.2, sodium:4 },
  "Besan (gram flour)":  { name:"Besan (gram flour)",  cal:387, protein:22.4, carbs:57.8,  fat:6.7,  fiber:10.9, sodium:64 },
  "Corn flour":          { name:"Corn flour",          cal:361, protein:6.9,  carbs:79.4,  fat:1.0,  fiber:7.3, sodium:5 },
  "Cream":               { name:"Cream",               cal:340, protein:2.1,  carbs:2.9,   fat:35.1, fiber:0,  sodium:38 },
  "Curd (yogurt)":       { name:"Curd (yogurt)",       cal:59,  protein:3.5,  carbs:4.7,   fat:3.3,  fiber:0,  sodium:36 },
  "Lemon juice":         { name:"Lemon juice",         cal:22,  protein:0.4,  carbs:6.9,   fat:0.2,  fiber:0.3, sodium:1 },
  "Ginger":              { name:"Ginger",              cal:80,  protein:1.8,  carbs:17.8,  fat:0.8,  fiber:2.0, sodium:13 },
  "Garlic":              { name:"Garlic",              cal:149, protein:6.4,  carbs:33.1,  fat:0.5,  fiber:2.1, sodium:17 },
  "Green chilli":        { name:"Green chilli",        cal:40,  protein:2.0,  carbs:9.5,   fat:0.2,  fiber:1.5, sodium:7 },
  "Coriander leaves":    { name:"Coriander leaves",    cal:23,  protein:2.1,  carbs:3.7,   fat:0.5,  fiber:2.8, sodium:46 },
  "Turmeric":            { name:"Turmeric",            cal:354, protein:7.8,  carbs:64.9,  fat:9.9,  fiber:21.1, sodium:38 },
  "Red chilli powder":   { name:"Red chilli powder",   cal:282, protein:13.5, carbs:49.7,  fat:14.3, fiber:34.8, sodium:30 },
  "Cumin":               { name:"Cumin",               cal:375, protein:17.8, carbs:44.2,  fat:22.3, fiber:10.5, sodium:168 },
  "Garam masala":        { name:"Garam masala",        cal:279, protein:10.6, carbs:50.4,  fat:14.8, fiber:23.0, sodium:70 },
};

type Entry = { ingredientName: string; grams: number };

interface BarcodeNutrition {
  cal: number; protein: number; carbs: number; fat: number;
  satFat: number; sugars: number; fiber: number; sodium: number;
  brand: string; ingredientsText: string;
}

type LookupStatus = "idle" | "loading" | "found" | "not-found" | "error";

export function NutritionLabelCalculator() {
  const [entries, setEntries] = useState<Entry[]>([{ ingredientName: "", grams: 100 }]);
  const [servingSize, setServingSize] = useState(100);
  const [servingUnit, setServingUnit] = useState("g");
  const [productName, setProductName] = useState("My Product");

  const [barcode, setBarcode]             = useState("");
  const [lookupStatus, setLookupStatus]   = useState<LookupStatus>("idle");
  const [barcodeData, setBarcodeData]     = useState<BarcodeNutrition | null>(null);
  const barcodeInputRef                   = useRef<HTMLInputElement>(null);

  async function handleLookup() {
    const code = barcode.trim().replace(/\D/g, "");
    if (!code) return;
    setLookupStatus("loading");
    setBarcodeData(null);
    try {
      const res = await fetch(
        `https://world.openfoodfacts.org/api/v2/product/${code}.json?fields=product_name,ingredients_text,nutriments,brands`,
        { signal: AbortSignal.timeout(8000) }
      );
      if (!res.ok) throw new Error("network");
      const json = await res.json();
      if (json.status === 0 || !json.product) {
        setLookupStatus("not-found");
        return;
      }
      const p = json.product;
      const nm = p.nutriments ?? {};
      const data: BarcodeNutrition = {
        cal:            nm["energy-kcal_100g"]     ?? (nm["energy_100g"] ? nm["energy_100g"] / 4.184 : 0),
        protein:        nm["proteins_100g"]         ?? 0,
        carbs:          nm["carbohydrates_100g"]    ?? 0,
        fat:            nm["fat_100g"]              ?? 0,
        satFat:         nm["saturated-fat_100g"]    ?? 0,
        sugars:         nm["sugars_100g"]           ?? 0,
        fiber:          nm["fiber_100g"]            ?? nm["fibers_100g"] ?? 0,
        sodium:         (nm["sodium_100g"]          ?? 0) * 1000,
        brand:          p.brands                    ?? "",
        ingredientsText: p.ingredients_text         ?? "",
      };
      setBarcodeData(data);
      if (p.product_name) setProductName(p.product_name);
      setLookupStatus("found");
    } catch {
      setLookupStatus("error");
    }
  }

  function clearLookup() {
    setBarcodeData(null);
    setBarcode("");
    setLookupStatus("idle");
    barcodeInputRef.current?.focus();
  }

  const totals = useMemo(() => {
    let cal = 0, protein = 0, carbs = 0, fat = 0, fiber = 0, sodium = 0, totalG = 0;
    entries.forEach(({ ingredientName, grams }) => {
      const ing = DB[ingredientName];
      if (!ing || grams <= 0) return;
      const factor = grams / 100;
      cal += ing.cal * factor;
      protein += ing.protein * factor;
      carbs += ing.carbs * factor;
      fat += ing.fat * factor;
      fiber += ing.fiber * factor;
      sodium += ing.sodium * factor;
      totalG += grams;
    });
    return { cal, protein, carbs, fat, fiber, sodium, totalG };
  }, [entries]);

  const perServing = useMemo(() => {
    if (barcodeData) {
      const f = servingSize / 100;
      return {
        cal: barcodeData.cal * f, protein: barcodeData.protein * f,
        carbs: barcodeData.carbs * f, fat: barcodeData.fat * f,
        fiber: barcodeData.fiber * f, sodium: barcodeData.sodium * f,
        satFat: barcodeData.satFat * f, sugars: barcodeData.sugars * f,
        totalG: servingSize,
      };
    }
    if (totals.totalG === 0) return { ...totals, satFat: 0, sugars: 0 };
    const factor = servingSize / totals.totalG;
    return {
      cal: totals.cal * factor, protein: totals.protein * factor,
      carbs: totals.carbs * factor, fat: totals.fat * factor,
      fiber: totals.fiber * factor, sodium: totals.sodium * factor,
      satFat: 0, sugars: 0, totalG: servingSize,
    };
  }, [totals, servingSize, barcodeData]);

  function addEntry() {
    setEntries([...entries, { ingredientName: "", grams: 100 }]);
  }

  function removeEntry(idx: number) {
    setEntries(entries.filter((_, i) => i !== idx));
  }

  function updateEntry(idx: number, key: keyof Entry, value: string | number) {
    setEntries(entries.map((e, i) => i === idx ? { ...e, [key]: value } : e));
  }

  const n = (v: number) => v.toFixed(1);

  const showLabel = barcodeData !== null || totals.totalG > 0;

  return (
    <div className="space-y-5">

      {/* ── Barcode lookup ── */}
      <div className="bg-white rounded-xl border border-[#F0E4D4] p-5">
        <h3 className="text-sm font-bold text-[#0F2447] mb-1 flex items-center gap-2">
          <svg className="w-4 h-4 text-[#E8500A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
            <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="3" height="3"/>
          </svg>
          Lookup an Existing Product
        </h3>
        <p className="text-xs text-[#7A6048] mb-3">Enter EAN-13 barcode to auto-fill nutritional info from Open Food Facts database.</p>

        <div className="flex gap-2">
          <input
            ref={barcodeInputRef}
            type="text"
            inputMode="numeric"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value.replace(/\D/g, "").slice(0, 14))}
            onKeyDown={(e) => { if (e.key === "Enter") handleLookup(); }}
            placeholder="e.g. 8901030852091"
            className="flex-1 border border-[#F0E4D4] rounded-lg px-3 py-2 text-sm text-[#0F2447] focus:outline-none focus:ring-2 focus:ring-[#E8500A]/30 font-mono"
          />
          <button
            onClick={handleLookup}
            disabled={lookupStatus === "loading" || barcode.trim().length < 8}
            className="px-4 py-2 bg-[#E8500A] hover:bg-[#D44A09] disabled:opacity-50 text-white text-sm font-semibold rounded-lg transition-colors whitespace-nowrap"
          >
            {lookupStatus === "loading" ? "Looking up…" : "Lookup Product"}
          </button>
        </div>

        {/* Status messages */}
        {lookupStatus === "not-found" && (
          <div className="mt-3 flex items-start gap-2 bg-[#FFF8F2] border border-[rgba(232,80,10,0.2)] rounded-lg px-3 py-2.5">
            <span className="text-[#E8500A] text-sm shrink-0">✗</span>
            <p className="text-xs text-[#E8500A]">Product not found in database. Enter ingredients manually below.</p>
          </div>
        )}
        {lookupStatus === "error" && (
          <div className="mt-3 flex items-start gap-2 bg-[#FFF8F2] border border-[rgba(232,80,10,0.2)] rounded-lg px-3 py-2.5">
            <span className="text-[#E8500A] text-sm shrink-0">⚠</span>
            <p className="text-xs text-[#E8500A]">Lookup unavailable. Please enter ingredients manually below.</p>
          </div>
        )}
        {lookupStatus === "found" && barcodeData && (
          <div className="mt-3 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-3 space-y-2">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                  <span>✓</span> Product found
                </p>
                {barcodeData.brand && (
                  <p className="text-xs text-emerald-600 mt-0.5">{barcodeData.brand}</p>
                )}
              </div>
              <button onClick={clearLookup} className="text-xs text-emerald-600 hover:text-emerald-800 underline shrink-0">Clear</button>
            </div>
            {barcodeData.ingredientsText && (
              <p className="text-[11px] text-emerald-700 leading-relaxed line-clamp-2">
                <span className="font-semibold">Ingredients:</span> {barcodeData.ingredientsText}
              </p>
            )}
            <div className="grid grid-cols-4 gap-1 text-[11px]">
              {[
                { label: "Energy", val: `${Math.round(barcodeData.cal)} kcal` },
                { label: "Protein", val: `${barcodeData.protein.toFixed(1)}g` },
                { label: "Carbs", val: `${barcodeData.carbs.toFixed(1)}g` },
                { label: "Fat", val: `${barcodeData.fat.toFixed(1)}g` },
              ].map((r) => (
                <div key={r.label} className="bg-white rounded px-2 py-1 text-center border border-emerald-100">
                  <p className="text-emerald-500 font-medium">{r.label}</p>
                  <p className="text-[#0F2447] font-bold">{r.val}</p>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-emerald-600">
              ⓘ Data from Open Food Facts community database. Verify before printing on label.
            </p>
          </div>
        )}

        <div className="mt-4 flex items-center gap-3">
          <div className="flex-1 border-t border-[#F0E4D4]" />
          <span className="text-xs text-[#7A6048] shrink-0">or enter ingredients manually below</span>
          <div className="flex-1 border-t border-[#F0E4D4]" />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#F0E4D4] p-5">
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-xs font-semibold text-[#7A6048] mb-1">Product Name</label>
            <input
              type="text" value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full border border-[#F0E4D4] rounded-lg px-3 py-2 text-sm text-[#0F2447] focus:outline-none focus:ring-2 focus:ring-[#E8500A]/30"
            />
          </div>
          <div className="flex gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#7A6048] mb-1">Serving size</label>
              <input
                type="number" value={servingSize} min={1}
                onChange={(e) => setServingSize(Number(e.target.value))}
                className="w-24 border border-[#F0E4D4] rounded-lg px-3 py-2 text-sm text-[#0F2447] focus:outline-none focus:ring-2 focus:ring-[#E8500A]/30"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#7A6048] mb-1">Unit</label>
              <select
                value={servingUnit}
                onChange={(e) => setServingUnit(e.target.value)}
                className="border border-[#F0E4D4] rounded-lg px-3 py-2 text-sm text-[#0F2447] focus:outline-none bg-white"
              >
                <option>g</option><option>ml</option><option>oz</option><option>piece</option>
              </select>
            </div>
          </div>
        </div>

        <h3 className="text-sm font-bold text-[#0F2447] mb-3">Ingredients</h3>
        <div className="space-y-2 mb-3">
          {entries.map((entry, i) => (
            <div key={i} className="flex gap-2 items-center">
              <select
                value={entry.ingredientName}
                onChange={(e) => updateEntry(i, "ingredientName", e.target.value)}
                className="flex-1 border border-[#F0E4D4] rounded-lg px-2 py-2 text-sm text-[#0F2447] focus:outline-none focus:ring-2 focus:ring-[#E8500A]/30 bg-white"
              >
                <option value="">Select ingredient…</option>
                {Object.keys(DB).sort().map((name) => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
              <input
                type="number" value={entry.grams} min={0} max={9999}
                onChange={(e) => updateEntry(i, "grams", Number(e.target.value))}
                className="w-20 border border-[#F0E4D4] rounded-lg px-2 py-2 text-sm text-[#0F2447] focus:outline-none focus:ring-2 focus:ring-[#E8500A]/30 text-center"
              />
              <span className="text-xs text-[#7A6048]">g</span>
              <button
                onClick={() => removeEntry(i)}
                disabled={entries.length === 1}
                className="text-red-400 hover:text-red-600 disabled:opacity-30 text-lg leading-none"
              >×</button>
            </div>
          ))}
        </div>
        <button
          onClick={addEntry}
          className="text-sm text-[#E8500A] font-medium hover:text-[#C94008]"
        >
          + Add ingredient
        </button>
      </div>

      {showLabel && (
        <div className="flex flex-col sm:flex-row gap-5">
          {/* FSSAI Label */}
          <div className="bg-white border-2 border-black rounded-lg p-4 w-full sm:w-72 print:shadow-none" id="nutrition-label">
            <p className="text-xs text-center font-bold border-b border-black pb-1 mb-1">NUTRITION INFORMATION</p>
            <p className="text-xs font-bold">{productName}</p>
            <p className="text-xs text-gray-600 mb-2">Serving size: {servingSize}{servingUnit}</p>
            <div className="border-t-4 border-black pt-2 space-y-0.5">
              <div className="flex justify-between text-sm font-extrabold">
                <span>Energy</span>
                <span>{Math.round(perServing.cal)} kcal</span>
              </div>
              <hr className="border-gray-300"/>
              {[
                { label: "Total Fat",            val: n(perServing.fat),     unit: "g",  dv: 78,   indent: false },
                ...(barcodeData ? [{ label: "Saturated Fat", val: n(perServing.satFat ?? 0), unit: "g", dv: 20, indent: true }] : []),
                { label: "Total Carbohydrate",   val: n(perServing.carbs),   unit: "g",  dv: 300,  indent: false },
                ...(barcodeData ? [{ label: "Sugars", val: n(perServing.sugars ?? 0), unit: "g", dv: 50, indent: true }] : []),
                { label: "Dietary Fiber",        val: n(perServing.fiber),   unit: "g",  dv: 28,   indent: false },
                { label: "Total Protein",        val: n(perServing.protein), unit: "g",  dv: 50,   indent: false },
                { label: "Sodium",               val: Math.round(perServing.sodium), unit: "mg", dv: 2300, indent: false },
              ].map((row) => (
                <div key={row.label} className={`flex justify-between text-xs ${row.indent ? "pl-3" : ""}`}>
                  <span className={row.indent ? "text-gray-500" : ""}>{row.label}</span>
                  <span className="font-medium">{row.val}{row.unit} <span className="text-gray-500">({Math.round((Number(row.val)/row.dv)*100)}% DV)</span></span>
                </div>
              ))}
            </div>
            <p className="text-[9px] text-gray-500 mt-2 border-t border-gray-300 pt-1">
              *Percent daily values based on a 2000 kcal diet. As per FSSAI labelling regulations.
            </p>
          </div>

          {/* Summary */}
          <div className="flex-1 bg-white rounded-xl border border-[#F0E4D4] p-5">
            <h3 className="text-sm font-bold text-[#0F2447] mb-3">Per Serving ({servingSize}{servingUnit})</h3>
            <div className="space-y-3">
              {[
                { label: "Energy", value: `${Math.round(perServing.cal)} kcal`, pct: Math.round((perServing.cal/2000)*100) },
                { label: "Protein", value: `${n(perServing.protein)}g`, pct: Math.round((perServing.protein/50)*100) },
                { label: "Carbs", value: `${n(perServing.carbs)}g`, pct: Math.round((perServing.carbs/300)*100) },
                { label: "Fat", value: `${n(perServing.fat)}g`, pct: Math.round((perServing.fat/78)*100) },
                { label: "Fiber", value: `${n(perServing.fiber)}g`, pct: Math.round((perServing.fiber/28)*100) },
                { label: "Sodium", value: `${Math.round(perServing.sodium)}mg`, pct: Math.round((perServing.sodium/2300)*100) },
              ].map((row) => (
                <div key={row.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-[#0F2447] font-medium">{row.label}</span>
                    <span className="text-[#7A6048]">{row.value} <span className="text-xs">({row.pct}% DV)</span></span>
                  </div>
                  <div className="h-1.5 bg-[#F0E4D4] rounded-full">
                    <div
                      className="h-1.5 rounded-full bg-[#E8500A]"
                      style={{ width: `${Math.min(100, row.pct)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => window.print()}
              className="mt-4 w-full py-2 border border-[#E8500A] text-[#E8500A] rounded-lg text-sm font-semibold hover:bg-[#FBF5EE] transition-colors"
            >
              Print Label
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
