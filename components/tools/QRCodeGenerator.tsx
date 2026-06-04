"use client";

import { useState, useCallback } from "react";

type QRType = "url" | "text" | "phone" | "email" | "whatsapp" | "wifi";
type QRSize = 150 | 300 | 500;
type ECCLevel = "L" | "M" | "Q" | "H";

const QR_TYPES: { id: QRType; label: string; emoji: string; color: string; activeColor: string }[] = [
  { id: "url",       label: "URL",       emoji: "🔗", color: "text-blue-600",   activeColor: "border-[#E8500A] bg-orange-50" },
  { id: "text",      label: "Text",      emoji: "📝", color: "text-slate-600",  activeColor: "border-[#E8500A] bg-orange-50" },
  { id: "phone",     label: "Phone",     emoji: "📞", color: "text-emerald-600",activeColor: "border-[#E8500A] bg-orange-50" },
  { id: "whatsapp",  label: "WhatsApp",  emoji: "💬", color: "text-green-600",  activeColor: "border-[#E8500A] bg-orange-50" },
  { id: "email",     label: "Email",     emoji: "✉️", color: "text-violet-600", activeColor: "border-[#E8500A] bg-orange-50" },
  { id: "wifi",      label: "WiFi",      emoji: "📶", color: "text-amber-600",  activeColor: "border-[#E8500A] bg-orange-50" },
];

const SIZE_OPTIONS: { value: QRSize; label: string; short: string }[] = [
  { value: 150, label: "Small",  short: "128px" },
  { value: 300, label: "Medium", short: "256px" },
  { value: 500, label: "Large",  short: "512px" },
];

const ECC_OPTIONS: { value: ECCLevel; label: string; desc: string }[] = [
  { value: "L", label: "L", desc: "Low (~7%)" },
  { value: "M", label: "M", desc: "Medium (~15%)" },
  { value: "Q", label: "Q", desc: "High (~25%)" },
  { value: "H", label: "H", desc: "Max (~30%)" },
];

function formatData(type: QRType, input: string, wifiSsid: string, wifiPass: string, wifiType: string): string {
  const t = input.trim();
  switch (type) {
    case "url":
      if (!t) return "";
      return /^https?:\/\//i.test(t) ? t : `https://${t}`;
    case "phone":
      if (!t) return "";
      return `tel:${t.startsWith("+") ? t : `+91${t.replace(/^0/, "")}`}`;
    case "email":
      if (!t) return "";
      return `mailto:${t}`;
    case "whatsapp":
      if (!t) return "";
      const digits = t.replace(/\D/g, "");
      return `https://wa.me/${digits.length >= 10 && !digits.startsWith("91") ? `91${digits}` : digits}`;
    case "wifi":
      if (!wifiSsid) return "";
      return `WIFI:T:${wifiType};S:${wifiSsid};P:${wifiPass};;`;
    case "text":
    default:
      return t;
  }
}

export function QRCodeGenerator() {
  const [qrType, setQrType] = useState<QRType>("url");
  const [input, setInput] = useState("");
  const [wifiSsid, setWifiSsid] = useState("");
  const [wifiPass, setWifiPass] = useState("");
  const [wifiType, setWifiType] = useState("WPA");
  const [size, setSize] = useState<QRSize>(300);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [ecc, setEcc] = useState<ECCLevel>("M");
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const data = formatData(qrType, input, wifiSsid, wifiPass, wifiType);

  const qrUrl = data
    ? `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(data)}&color=${fgColor.replace("#", "")}&bgcolor=${bgColor.replace("#", "")}&ecc=${ecc}`
    : "";

  const handleDownload = useCallback(async () => {
    if (!qrUrl) return;
    setDownloading(true);
    try {
      const res = await fetch(qrUrl);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "qrcode.png";
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setDownloading(false);
    }
  }, [qrUrl]);

  const handleCopyUrl = useCallback(() => {
    if (!qrUrl) return;
    navigator.clipboard.writeText(qrUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [qrUrl]);

  const placeholders: Record<QRType, string> = {
    url: "https://example.com",
    text: "Enter any text...",
    phone: "9876543210",
    email: "hello@example.com",
    whatsapp: "9876543210",
    wifi: "",
  };

  const inputLabel: Record<QRType, string> = {
    url: "Website URL",
    text: "Your Text",
    phone: "Phone Number",
    email: "Email Address",
    whatsapp: "WhatsApp Number",
    wifi: "",
  };

  const inputFieldClass =
    "w-full border border-[#F0E4D4] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8500A]/20 focus:border-[#E8500A] bg-white";

  const labelClass = "block text-xs font-semibold text-[#7A6048] uppercase tracking-wide mb-1.5";

  return (
    <div className="bg-white rounded-2xl border border-[#F0E4D4] shadow-sm overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">

        {/* Left: Inputs */}
        <div className="p-6 space-y-6 border-b lg:border-b-0 lg:border-r border-[#F0E4D4]">

          {/* QR Type selector — icon grid */}
          <div>
            <label className={labelClass}>QR Type</label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {QR_TYPES.map((t) => {
                const active = qrType === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => { setQrType(t.id); setInput(""); }}
                    className={`flex flex-col items-center justify-center gap-1 py-3 px-1 rounded-2xl border-2 transition-all text-center ${
                      active
                        ? `${t.activeColor} border-[#E8500A]`
                        : "bg-[#FFFCF8] border-[#F0E4D4] hover:border-[#E8500A]/40 hover:bg-orange-50/50"
                    }`}
                  >
                    <span className="text-xl leading-none">{t.emoji}</span>
                    <span className={`text-[10px] font-semibold leading-none ${active ? "text-[#0F2447]" : "text-[#7A6048]"}`}>
                      {t.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Input area — WiFi vs everything else */}
          {qrType === "wifi" ? (
            <div className="space-y-3">
              <div>
                <label className={labelClass}>Network Name (SSID)</label>
                <input
                  type="text"
                  value={wifiSsid}
                  onChange={(e) => setWifiSsid(e.target.value)}
                  placeholder="MyHomeWiFi"
                  className={inputFieldClass}
                />
              </div>
              <div>
                <label className={labelClass}>Password</label>
                <input
                  type="text"
                  value={wifiPass}
                  onChange={(e) => setWifiPass(e.target.value)}
                  placeholder="WiFi password"
                  className={inputFieldClass}
                />
              </div>
              <div>
                <label className={labelClass}>Security Type</label>
                <select
                  value={wifiType}
                  onChange={(e) => setWifiType(e.target.value)}
                  className={inputFieldClass}
                >
                  <option value="WPA">WPA/WPA2</option>
                  <option value="WEP">WEP</option>
                  <option value="nopass">Open (No Password)</option>
                </select>
              </div>
            </div>
          ) : (
            <div>
              <label className={labelClass}>{inputLabel[qrType]}</label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={placeholders[qrType]}
                rows={3}
                className={`${inputFieldClass} resize-none`}
              />
              {(qrType === "phone" || qrType === "whatsapp") && (
                <p className="text-xs text-[#7A6048]/70 mt-1.5">Enter 10-digit number. +91 added automatically.</p>
              )}
            </div>
          )}

          {/* Size — 3 pill options */}
          <div>
            <label className={labelClass}>Size</label>
            <div className="flex gap-2">
              {SIZE_OPTIONS.map((s) => (
                <button
                  key={s.value}
                  onClick={() => setSize(s.value)}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all border ${
                    size === s.value
                      ? "bg-[#E8500A] text-white border-[#E8500A] shadow-sm"
                      : "bg-[#FFFCF8] text-[#7A6048] border-[#F0E4D4] hover:border-[#E8500A]/40"
                  }`}
                >
                  <span className="block">{s.label}</span>
                  <span className={`block text-[10px] font-normal mt-0.5 ${size === s.value ? "text-white/80" : "text-[#7A6048]/60"}`}>
                    {s.short}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>QR Color</label>
              <div className="flex items-center gap-2.5">
                <input
                  type="color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="w-10 h-10 rounded-xl border border-[#F0E4D4] cursor-pointer p-0.5 bg-white"
                />
                <span className="text-sm font-mono text-[#7A6048]">{fgColor.toUpperCase()}</span>
              </div>
            </div>
            <div>
              <label className={labelClass}>Background</label>
              <div className="flex items-center gap-2.5">
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-10 h-10 rounded-xl border border-[#F0E4D4] cursor-pointer p-0.5 bg-white"
                />
                <span className="text-sm font-mono text-[#7A6048]">{bgColor.toUpperCase()}</span>
              </div>
            </div>
          </div>

          {/* Error Correction */}
          <div>
            <label className={labelClass}>Error Correction</label>
            <div className="flex gap-2">
              {ECC_OPTIONS.map((e) => (
                <button
                  key={e.value}
                  onClick={() => setEcc(e.value)}
                  title={e.desc}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all border ${
                    ecc === e.value
                      ? "bg-[#E8500A] text-white border-[#E8500A] shadow-sm"
                      : "bg-[#FFFCF8] text-[#7A6048] border-[#F0E4D4] hover:border-[#E8500A]/40"
                  }`}
                >
                  {e.label}
                </button>
              ))}
            </div>
            <p className="text-xs text-[#7A6048]/70 mt-1.5">
              Higher = more damage-resistant, larger QR code. L is fine for clean prints; H for logos/stickers.
            </p>
          </div>
        </div>

        {/* Right: Preview */}
        <div className="p-6 flex flex-col items-center justify-center bg-[#FFFCF8] min-h-[420px]">
          {qrUrl ? (
            <div className="w-full flex flex-col items-center gap-5">
              {/* QR image card */}
              <div className="bg-white rounded-2xl p-5 shadow-md border border-[#F0E4D4]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={qrUrl}
                  alt="Generated QR Code"
                  width={size}
                  height={size}
                  className="block"
                  style={{ width: Math.min(size, 260), height: Math.min(size, 260) }}
                />
              </div>

              {/* Scan label */}
              <p className="text-xs font-medium text-[#7A6048] tracking-wide">
                📷 Scan to test
              </p>

              {/* Data preview */}
              <p className="text-xs text-[#7A6048]/60 text-center max-w-[260px] break-all leading-relaxed">
                {data.length > 60 ? data.slice(0, 60) + "…" : data}
              </p>

              {/* Download — full-width saffron */}
              <div className="w-full flex flex-col gap-2">
                <button
                  onClick={handleDownload}
                  disabled={downloading}
                  className="w-full bg-[#E8500A] hover:bg-[#D44A09] text-white font-semibold rounded-xl px-5 py-3 text-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-60"
                >
                  <span className="text-base leading-none">↓</span>
                  {downloading ? "Downloading…" : "Download PNG"}
                </button>
                <button
                  onClick={handleCopyUrl}
                  className="w-full bg-white border border-[#F0E4D4] text-[#7A6048] font-semibold rounded-xl px-5 py-2.5 text-sm hover:bg-[#FFFCF8] hover:border-[#E8500A]/30 transition-colors"
                >
                  {copied ? "✓ Copied!" : "Copy Image URL"}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-44 h-44 bg-[#F0E4D4]/40 rounded-2xl flex items-center justify-center">
                <svg className="w-16 h-16 text-[#E8500A]/20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="3" height="3" />
                  <rect x="19" y="14" width="2" height="2" />
                  <rect x="14" y="19" width="2" height="2" />
                  <rect x="18" y="18" width="3" height="3" rx="0.5" />
                  <rect x="5" y="5" width="3" height="3" fill="currentColor" stroke="none" />
                  <rect x="16" y="5" width="3" height="3" fill="currentColor" stroke="none" />
                  <rect x="5" y="16" width="3" height="3" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <div>
                <p className="text-[#0F2447] font-semibold text-sm">Your QR code appears here</p>
                <p className="text-[#7A6048]/70 text-xs mt-1">Enter content above to generate</p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
