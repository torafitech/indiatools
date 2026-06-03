"use client";

import { useState, useCallback } from "react";

type QRType = "url" | "text" | "phone" | "email" | "whatsapp" | "wifi";
type QRSize = 150 | 300 | 500;
type ECCLevel = "L" | "M" | "Q" | "H";

const QR_TYPES: { id: QRType; label: string }[] = [
  { id: "url", label: "URL" },
  { id: "text", label: "Text" },
  { id: "phone", label: "Phone" },
  { id: "email", label: "Email" },
  { id: "whatsapp", label: "WhatsApp" },
  { id: "wifi", label: "WiFi" },
];

const SIZE_OPTIONS: { value: QRSize; label: string }[] = [
  { value: 150, label: "Small (150px)" },
  { value: 300, label: "Medium (300px)" },
  { value: 500, label: "Large (500px)" },
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

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        {/* Left: Inputs */}
        <div className="p-6 space-y-5 border-r border-gray-100">
          {/* Type presets */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              QR Type
            </label>
            <div className="flex flex-wrap gap-2">
              {QR_TYPES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => { setQrType(t.id); setInput(""); }}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    qrType === t.id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Main input — WiFi gets special fields */}
          {qrType === "wifi" ? (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                  Network Name (SSID)
                </label>
                <input
                  type="text"
                  value={wifiSsid}
                  onChange={(e) => setWifiSsid(e.target.value)}
                  placeholder="MyHomeWiFi"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                  Password
                </label>
                <input
                  type="text"
                  value={wifiPass}
                  onChange={(e) => setWifiPass(e.target.value)}
                  placeholder="WiFi password"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                  Security Type
                </label>
                <select
                  value={wifiType}
                  onChange={(e) => setWifiType(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="WPA">WPA/WPA2</option>
                  <option value="WEP">WEP</option>
                  <option value="nopass">Open (No Password)</option>
                </select>
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                {qrType === "phone" || qrType === "whatsapp" ? "Phone Number" : qrType === "email" ? "Email Address" : "Content"}
              </label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={placeholders[qrType]}
                rows={3}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
              {(qrType === "phone" || qrType === "whatsapp") && (
                <p className="text-xs text-gray-400 mt-1">Enter 10-digit number. +91 added automatically.</p>
              )}
            </div>
          )}

          {/* Size */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Size
            </label>
            <div className="flex gap-2">
              {SIZE_OPTIONS.map((s) => (
                <button
                  key={s.value}
                  onClick={() => setSize(s.value)}
                  className={`flex-1 py-2 rounded-lg text-xs font-medium transition-colors ${
                    size === s.value
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                QR Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="w-10 h-10 rounded-lg border border-gray-300 cursor-pointer p-0.5 bg-white"
                />
                <span className="text-sm font-mono text-gray-600">{fgColor.toUpperCase()}</span>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                Background
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-10 h-10 rounded-lg border border-gray-300 cursor-pointer p-0.5 bg-white"
                />
                <span className="text-sm font-mono text-gray-600">{bgColor.toUpperCase()}</span>
              </div>
            </div>
          </div>

          {/* Error Correction */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Error Correction
            </label>
            <div className="flex gap-2">
              {ECC_OPTIONS.map((e) => (
                <button
                  key={e.value}
                  onClick={() => setEcc(e.value)}
                  title={e.desc}
                  className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    ecc === e.value
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {e.label}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-1.5">
              Higher = more damage-resistant, larger QR code. L is fine for clean prints; H for logos/stickers.
            </p>
          </div>
        </div>

        {/* Right: Preview */}
        <div className="p-6 flex flex-col items-center justify-center bg-gray-50 min-h-[400px]">
          {qrUrl ? (
            <>
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 mb-4">
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
              <p className="text-xs text-gray-400 mb-4 text-center max-w-[240px] break-all">
                {data.length > 60 ? data.slice(0, 60) + "…" : data}
              </p>
              <div className="flex gap-2 flex-wrap justify-center">
                <button
                  onClick={handleDownload}
                  disabled={downloading}
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-60"
                >
                  {downloading ? "Downloading…" : "Download PNG"}
                </button>
                <button
                  onClick={handleCopyUrl}
                  className="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                >
                  {copied ? "Copied!" : "Copy Image URL"}
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center text-center">
              <div className="w-40 h-40 bg-gray-200 rounded-2xl flex items-center justify-center mb-4">
                <svg className="w-16 h-16 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
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
              <p className="text-gray-400 text-sm">Enter content above to generate your QR code</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
