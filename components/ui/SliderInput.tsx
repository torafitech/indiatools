"use client";

interface SliderInputProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  format?: "currency" | "percent" | "number";
  onChange: (value: number) => void;
  hint?: string;
}

function formatDisplay(value: number, format: string, unit?: string): string {
  if (format === "currency") {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(2)} L`;
    return `₹${value.toLocaleString("en-IN")}`;
  }
  if (format === "percent") return `${value}%`;
  return `${value}${unit ? " " + unit : ""}`;
}

export function SliderInput({ label, value, min, max, step, unit, format = "number", onChange, hint }: SliderInputProps) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <div className="flex items-center gap-1">
          {format === "currency" && <span className="text-gray-500 text-sm">₹</span>}
          <input
            type="number"
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={(e) => {
              const v = parseFloat(e.target.value);
              if (!isNaN(v) && v >= min && v <= max) onChange(v);
            }}
            className="w-28 text-right text-sm font-semibold text-gray-900 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#E8500A]"
          />
          {format === "percent" && <span className="text-gray-500 text-sm">%</span>}
          {format === "number" && unit && <span className="text-gray-500 text-sm">{unit}</span>}
        </div>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#E8500A]"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>{formatDisplay(min, format, unit)}</span>
          <span className="font-semibold text-[#E8500A]">{formatDisplay(value, format, unit)}</span>
          <span>{formatDisplay(max, format, unit)}</span>
        </div>
      </div>
      {hint && <p className="text-xs text-gray-400">{hint}</p>}
    </div>
  );
}
