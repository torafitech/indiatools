"use client";

interface AdSlotProps {
  slot: string;
  className?: string;
}

export function AdSlot({ slot, className = "" }: AdSlotProps) {
  if (process.env.NODE_ENV === "development") {
    return (
      <div className={`ad-container flex items-center justify-center text-xs text-gray-400 border border-dashed border-gray-300 ${className}`}>
        Ad Slot: {slot}
      </div>
    );
  }

  return (
    <div className={`ad-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_ID || "ca-pub-XXXXXXXXXXXXXXXX"}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
