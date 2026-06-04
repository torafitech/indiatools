interface ResultBoxProps {
  label: string;
  value: string | number;
  unit?: string;
  highlight?: boolean;
  subtext?: string;
}

export function ResultBox({ label, value, unit, highlight = false, subtext }: ResultBoxProps) {
  return (
    <div className={`rounded-2xl p-4 ${highlight ? "bg-[#0F2447] text-white" : "bg-white border border-[#F0E4D4]"}`}>
      <p className={`text-sm font-medium mb-1 ${highlight ? "text-white/60" : "text-[#7A6048]"}`}>{label}</p>
      <p className={`text-2xl font-extrabold ${highlight ? "text-white" : "text-[#0F2447]"}`}>
        {unit && <span className="text-lg mr-0.5">{unit}</span>}
        {value}
      </p>
      {subtext && (
        <p className={`text-xs mt-1 ${highlight ? "text-white/50" : "text-[#7A6048]"}`}>{subtext}</p>
      )}
    </div>
  );
}
