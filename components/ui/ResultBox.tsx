interface ResultBoxProps {
  label: string;
  value: string | number;
  unit?: string;
  highlight?: boolean;
  subtext?: string;
}

export function ResultBox({ label, value, unit, highlight = false, subtext }: ResultBoxProps) {
  return (
    <div className={`rounded-lg p-4 ${highlight ? "bg-blue-600 text-white" : "bg-white border border-gray-200"}`}>
      <p className={`text-sm font-medium mb-1 ${highlight ? "text-blue-100" : "text-gray-500"}`}>{label}</p>
      <p className={`text-2xl font-bold ${highlight ? "text-white" : "text-gray-900"}`}>
        {unit && <span className="text-lg mr-0.5">{unit}</span>}
        {value}
      </p>
      {subtext && (
        <p className={`text-xs mt-1 ${highlight ? "text-blue-100" : "text-gray-400"}`}>{subtext}</p>
      )}
    </div>
  );
}
