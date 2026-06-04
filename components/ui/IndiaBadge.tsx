export function IndiaBadge({ note }: { note?: string }) {
  return (
    <div className="inline-flex items-center gap-1.5 text-xs text-[#7A6048] bg-[#FFFCF8] border border-[#F0E4D4] px-3 py-1.5 rounded-full mb-4">
      <span>🇮🇳</span>
      <span>{note ?? "Optimized for India — uses Indian banks, ₹, and local tax rules"}</span>
    </div>
  );
}
