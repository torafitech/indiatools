"use client";

interface AdSlotProps {
  slot: string;
  className?: string;
}

const PUBLISHER_ID = process.env.NEXT_PUBLIC_ADSENSE_ID;
const ADS_LIVE = PUBLISHER_ID && !PUBLISHER_ID.includes("XXXX");

export function AdSlot({ slot, className = "" }: AdSlotProps) {
  if (process.env.NODE_ENV === "development") {
    return (
      <div className={`ad-container flex items-center justify-center text-xs text-[#7A6048] border border-dashed border-[#F0E4D4] rounded-xl ${className}`}>
        Ad · {slot}
      </div>
    );
  }

  if (!ADS_LIVE) return null;

  return (
    <div className={`ad-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={PUBLISHER_ID}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
