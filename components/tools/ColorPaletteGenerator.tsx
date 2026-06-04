"use client";

import { useState, useCallback } from "react";

interface ColorEntry {
  name: string;
  hex: string;
  usage: string;
  rgb: { r: number; g: number; b: number };
}

type ManualMode = "analogous" | "split-complementary" | "triadic" | "monochromatic";

// ── HSL helpers ──────────────────────────────────────────────────────────────

function hexToHsl(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return [h * 360, s * 100, l * 100];
}

function hslToHex(h: number, s: number, l: number): string {
  h = ((h % 360) + 360) % 360;
  s = Math.max(0, Math.min(100, s));
  l = Math.max(0, Math.min(100, l));
  const sl = s / 100;
  const ll = l / 100;
  const c = (1 - Math.abs(2 * ll - 1)) * sl;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = ll - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60)       { r = c; g = x; }
  else if (h < 120) { r = x; g = c; }
  else if (h < 180) { g = c; b = x; }
  else if (h < 240) { g = x; b = c; }
  else if (h < 300) { r = x; b = c; }
  else              { r = c; b = x; }
  const toHex = (v: number) => Math.round((v + m) * 255).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  };
}

function generateManualPalette(baseHex: string, mode: ManualMode): ColorEntry[] {
  const [h, s, l] = hexToHsl(baseHex);

  const make = (hue: number, sat: number, lig: number, name: string, usage: string): ColorEntry => {
    const hex = hslToHex(hue, sat, lig);
    return { name, hex, usage, rgb: hexToRgb(hex) };
  };

  if (mode === "analogous") {
    return [
      make(h,      s,      l,           "Base",        "Primary brand color"),
      make(h + 30, s,      l,           "Warm",        "Secondary elements"),
      make(h - 30, s,      l,           "Cool",        "Accent & highlights"),
      make(h + 60, s * 0.4, Math.min(l + 35, 96), "Light", "Background surfaces"),
      make(h,      s * 0.2, Math.max(l - 40, 10), "Dark",  "Text & headings"),
    ];
  }
  if (mode === "split-complementary") {
    return [
      make(h,       s,      l,           "Primary",    "Main brand color"),
      make(h + 150, s,      l,           "Split A",    "Secondary actions"),
      make(h + 210, s,      l,           "Split B",    "Accent & hover states"),
      make(h + 150, s * 0.3, Math.min(l + 35, 96), "Light", "Background surfaces"),
      make(h,       s * 0.15, Math.max(l - 42, 8), "Dark",  "Text & headings"),
    ];
  }
  if (mode === "triadic") {
    return [
      make(h,       s,      l,           "Primary",    "Core brand color"),
      make(h + 120, s,      l,           "Triadic A",  "Secondary elements"),
      make(h + 240, s,      l,           "Triadic B",  "Accents & CTAs"),
      make(h + 120, s * 0.3, Math.min(l + 35, 96), "Light", "Background surfaces"),
      make(h,       s * 0.15, Math.max(l - 42, 8), "Dark",  "Text & headings"),
    ];
  }
  // monochromatic
  return [
    make(h, s,           l,                        "Base",    "Primary brand color"),
    make(h, s * 0.85,    Math.min(l + 15, 90),     "Light",   "Secondary elements"),
    make(h, s * 0.7,     Math.min(l + 30, 94),     "Lighter", "Background surfaces"),
    make(h, Math.min(s * 1.15, 100), Math.max(l - 15, 15), "Dark",    "Emphasis & borders"),
    make(h, s * 0.2,     Math.max(l - 40, 8),      "Darkest", "Text & headings"),
  ];
}

// ── Swatch ───────────────────────────────────────────────────────────────────

function Swatch({ color, onCopy, copied }: {
  color: ColorEntry;
  onCopy: (hex: string) => void;
  copied: boolean;
}) {
  return (
    <button
      onClick={() => onCopy(color.hex)}
      className="group flex flex-col rounded-2xl overflow-hidden border border-[#F0E4D4] shadow-sm hover:shadow-md transition-shadow cursor-pointer text-left w-full"
      title={`Click to copy ${color.hex}`}
    >
      <div
        className="h-28 sm:h-36 w-full flex items-center justify-center transition-opacity"
        style={{ backgroundColor: color.hex }}
      >
        {copied && (
          <span className="bg-black/40 text-white text-xs font-semibold px-3 py-1 rounded-full">
            Copied!
          </span>
        )}
      </div>
      <div className="bg-white px-3 py-2.5">
        <p className="font-mono text-xs font-bold text-gray-800 tracking-wide">{color.hex.toUpperCase()}</p>
        <p className="text-xs font-semibold text-[#0F2447] mt-0.5">{color.name}</p>
        <p className="text-[11px] text-[#7A6048] leading-tight mt-0.5">{color.usage}</p>
      </div>
    </button>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

const EXAMPLES = [
  "A luxury spa in Mumbai",
  "A fintech startup for Gen Z",
  "An eco-friendly food brand",
  "A corporate law firm in Delhi",
  "A children's education app",
];

const MANUAL_MODES: { value: ManualMode; label: string }[] = [
  { value: "analogous",           label: "Analogous" },
  { value: "split-complementary", label: "Split-Complementary" },
  { value: "triadic",             label: "Triadic" },
  { value: "monochromatic",       label: "Monochromatic" },
];

export function ColorPaletteGenerator() {
  const [tab, setTab] = useState<"ai" | "manual">("ai");

  // AI mode
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Manual mode
  const [baseColor, setBaseColor] = useState("#E8500A");
  const [manualMode, setManualMode] = useState<ManualMode>("analogous");

  // Shared
  const [palette, setPalette] = useState<ColorEntry[] | null>(null);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [exportCopied, setExportCopied] = useState<string | null>(null);

  const copyToClipboard = useCallback((text: string, key: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopiedHex(key);
    setTimeout(() => setCopiedHex(null), 1800);
  }, []);

  async function handleAIGenerate() {
    if (!description.trim()) return;
    setLoading(true);
    setError(null);
    setPalette(null);
    try {
      const res = await fetch("/api/color-palette", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Generation failed");
      setPalette(data.colors);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function handleManualGenerate() {
    setPalette(generateManualPalette(baseColor, manualMode));
    setError(null);
  }

  function copyExport(type: "css" | "tailwind" | "hex") {
    if (!palette) return;
    let text = "";
    if (type === "css") {
      text = `:root {\n${palette.map((c) => `  --color-${c.name.toLowerCase().replace(/\s+/g, "-")}: ${c.hex};`).join("\n")}\n}`;
    } else if (type === "tailwind") {
      text = `colors: {\n${palette.map((c) => `  ${c.name.toLowerCase().replace(/\s+/g, "-")}: '${c.hex}',`).join("\n")}\n}`;
    } else {
      text = palette.map((c) => c.hex.toUpperCase()).join("\n");
    }
    navigator.clipboard.writeText(text).catch(() => {});
    setExportCopied(type);
    setTimeout(() => setExportCopied(null), 1800);
  }

  return (
    <div className="bg-[#FFFCF8] rounded-2xl border border-[#F0E4D4] p-5 sm:p-6">
      {/* Tab toggle */}
      <div className="flex gap-1 bg-[#F5EDE0] rounded-xl p-1 w-fit mb-6">
        {(["ai", "manual"] as const).map((t) => (
          <button
            key={t}
            onClick={() => { setTab(t); setPalette(null); setError(null); }}
            className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
              tab === t
                ? "bg-white text-[#0F2447] shadow-sm"
                : "text-[#7A6048] hover:text-[#0F2447]"
            }`}
          >
            {t === "ai" ? "AI Generate" : "Manual / Color Theory"}
          </button>
        ))}
      </div>

      {/* AI mode inputs */}
      {tab === "ai" && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[#0F2447] mb-1.5">
              Describe your brand or project
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. A luxury spa in Mumbai focused on Ayurvedic wellness..."
              rows={3}
              maxLength={500}
              className="w-full border border-[#F0E4D4] rounded-xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E8500A]/30 focus:border-[#E8500A] resize-none bg-white"
            />
            <div className="flex justify-between items-center mt-1">
              <p className="text-xs text-[#7A6048]">{description.length}/500</p>
            </div>
          </div>

          {/* Example chips */}
          <div className="flex flex-wrap gap-2">
            {EXAMPLES.map((ex) => (
              <button
                key={ex}
                onClick={() => setDescription(ex)}
                className="text-xs px-3 py-1.5 bg-white border border-[#F0E4D4] rounded-full text-[#7A6048] hover:border-[#E8500A] hover:text-[#E8500A] transition-colors"
              >
                {ex}
              </button>
            ))}
          </div>

          <button
            onClick={handleAIGenerate}
            disabled={loading || !description.trim()}
            className="w-full sm:w-auto bg-[#E8500A] hover:bg-[#C93F06] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-8 py-3 rounded-xl transition-colors text-sm"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                Generating...
              </span>
            ) : "Generate Palette →"}
          </button>
        </div>
      )}

      {/* Manual mode inputs */}
      {tab === "manual" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#0F2447] mb-1.5">Base Color</label>
              <div className="flex items-center gap-3 border border-[#F0E4D4] rounded-xl px-3 py-2 bg-white w-fit">
                <input
                  type="color"
                  value={baseColor}
                  onChange={(e) => setBaseColor(e.target.value)}
                  className="h-8 w-10 rounded cursor-pointer border-0 bg-transparent p-0"
                />
                <input
                  type="text"
                  value={baseColor.toUpperCase()}
                  onChange={(e) => {
                    const v = e.target.value;
                    if (/^#[0-9A-Fa-f]{0,6}$/.test(v)) setBaseColor(v);
                  }}
                  className="font-mono text-sm text-gray-800 w-20 focus:outline-none"
                  maxLength={7}
                />
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-semibold text-[#0F2447] mb-1.5">Harmony Mode</label>
              <div className="flex flex-wrap gap-2">
                {MANUAL_MODES.map((m) => (
                  <button
                    key={m.value}
                    onClick={() => setManualMode(m.value)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                      manualMode === m.value
                        ? "bg-[#0F2447] text-white border-[#0F2447]"
                        : "bg-white text-[#7A6048] border-[#F0E4D4] hover:border-[#0F2447]"
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <button
            onClick={handleManualGenerate}
            disabled={baseColor.length < 7}
            className="w-full sm:w-auto bg-[#0F2447] hover:bg-[#1a3a6b] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-8 py-3 rounded-xl transition-colors text-sm"
          >
            Generate Palette →
          </button>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Loading skeleton */}
      {loading && (
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-5 gap-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="rounded-2xl overflow-hidden border border-[#F0E4D4] animate-pulse">
              <div className="h-28 sm:h-36 bg-[#F0E4D4]" />
              <div className="bg-white p-3 space-y-1.5">
                <div className="h-3 bg-[#F5EDE0] rounded w-3/4" />
                <div className="h-3 bg-[#F5EDE0] rounded w-1/2" />
                <div className="h-3 bg-[#FBF5EE] rounded w-full" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Palette display */}
      {palette && !loading && (
        <>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-5 gap-3">
            {palette.map((color) => (
              <Swatch
                key={color.hex}
                color={color}
                onCopy={(hex) => copyToClipboard(hex, hex)}
                copied={copiedHex === color.hex}
              />
            ))}
          </div>

          {/* Export section */}
          <div className="mt-5 p-4 bg-white rounded-xl border border-[#F0E4D4]">
            <p className="text-xs font-semibold text-[#7A6048] uppercase tracking-wide mb-3">Export</p>
            <div className="flex flex-wrap gap-2">
              {(["css", "tailwind", "hex"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => copyExport(type)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-[#FFFCF8] border border-[#F0E4D4] hover:border-[#E8500A] hover:text-[#E8500A] rounded-xl text-sm font-semibold text-[#0F2447] transition-colors"
                >
                  {exportCopied === type ? "Copied!" : (
                    <>
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {type === "css" ? "CSS Variables" : type === "tailwind" ? "Tailwind Config" : "Hex List"}
                    </>
                  )}
                </button>
              ))}
            </div>

            {/* Preview of CSS variables */}
            <div className="mt-3 bg-[#F5EDE0] rounded-lg p-3 font-mono text-[11px] text-[#0F2447] overflow-x-auto">
              <p className="text-[#7A6048]">:root {"{"}</p>
              {palette.map((c) => (
                <p key={c.hex} className="pl-4">
                  <span className="text-[#E8500A]">--color-{c.name.toLowerCase().replace(/\s+/g, "-")}</span>
                  {": "}
                  <span className="flex items-center gap-1.5 inline-flex">
                    <span
                      className="inline-block w-3 h-3 rounded-sm border border-black/10 flex-shrink-0"
                      style={{ backgroundColor: c.hex }}
                    />
                    {c.hex};
                  </span>
                </p>
              ))}
              <p className="text-[#7A6048]">{"}"}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
