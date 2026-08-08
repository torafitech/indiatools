"use client";

import { useEffect, useRef } from "react";

interface AdSlotProps {
  slot: string;
  className?: string;
}

const PUBLISHER_ID = process.env.NEXT_PUBLIC_ADSENSE_ID;
const ADS_LIVE = PUBLISHER_ID && !PUBLISHER_ID.includes("XXXX");

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export function AdSlot({ slot, className = "" }: AdSlotProps) {
  const pushed = useRef(false);

  useEffect(() => {
    if (!ADS_LIVE || pushed.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense script not ready yet — ad slot stays empty, no user-facing error
    }
  }, []);

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
