"use client";

import { useState } from "react";

interface CopyBlockProps {
  content: string;
  downloadFilename?: string;
  downloadMime?: string;
}

export function CopyBlock({ content, downloadFilename, downloadMime = "text/plain" }: CopyBlockProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard permission denied — button silently stays "Copy", no crash
    }
  }

  function handleDownload() {
    const blob = new Blob([content], { type: downloadMime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = downloadFilename ?? "resource.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="rounded-2xl border border-[#F0E4D4] bg-[#0F2447] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-[#0A1B36] border-b border-white/10">
        <span className="text-xs font-semibold text-white/50 uppercase tracking-wide">
          {downloadFilename ?? "Copy content"}
        </span>
        <div className="flex items-center gap-2">
          {downloadFilename && (
            <button
              onClick={handleDownload}
              className="text-xs font-semibold text-white/70 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors"
            >
              Download
            </button>
          )}
          <button
            onClick={handleCopy}
            className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
              copied ? "bg-emerald-500 text-white" : "bg-[#E8500A] hover:bg-[#D44A09] text-white"
            }`}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
      <pre className="p-4 overflow-x-auto text-[13px] leading-relaxed text-white/90 whitespace-pre-wrap font-mono max-h-[600px] overflow-y-auto">
        {content}
      </pre>
    </div>
  );
}
