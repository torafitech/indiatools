"use client";

import { useMemo, useState } from "react";
import { analyzeText } from "@/lib/calculations/wordcount";

const SAMPLE_TEXT = `The quick brown fox jumps over the lazy dog. This sentence contains every letter of the English alphabet at least once. It is commonly used for typing practice and font demonstrations. Writers often use it to test their keyboards and check that all characters are rendering correctly.

Paste your own text above to analyze it. You will see word count, reading time, keyword density, and more metrics update in real time as you type.`;

const MAX_CHARS = 50000;

interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  color: string;
}

function StatCard({ label, value, sub, color }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl border border-[#F0E4D4] p-4 text-center">
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
      <p className="text-xs font-semibold text-[#0F2447] mt-1">{label}</p>
      {sub && <p className="text-[10px] text-[#7A6048] mt-0.5">{sub}</p>}
    </div>
  );
}

export function WordCounter() {
  const [text, setText] = useState(SAMPLE_TEXT);
  const result = useMemo(() => analyzeText(text), [text]);

  const fleschColor =
    result.fleschScore >= 70
      ? "text-emerald-700 bg-emerald-50 border-emerald-200"
      : result.fleschScore >= 50
      ? "text-[#E8500A] bg-[#FFF8F2] border-[#E8500A]/20"
      : "text-red-700 bg-red-50 border-red-200";

  const fleschBarColor =
    result.fleschScore >= 70
      ? "bg-emerald-500"
      : result.fleschScore >= 50
      ? "bg-[#E8500A]"
      : "bg-red-500";

  return (
    <div className="space-y-6">
      {/* Main two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr,320px] gap-6 items-start">
        {/* Left — textarea */}
        <div className="bg-white rounded-2xl border border-[#F0E4D4] overflow-hidden">
          {/* Toolbar */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#F0E4D4] bg-[#FFFCF8]">
            <span className="text-xs font-semibold text-[#7A6048] uppercase tracking-wide">
              Your Text
            </span>
            <div className="flex items-center gap-3">
              <span
                className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
                  text.length > MAX_CHARS * 0.9
                    ? "text-red-600 bg-red-50 border-red-200"
                    : "text-[#7A6048] bg-[#FFFCF8] border-[#F0E4D4]"
                }`}
              >
                {text.length.toLocaleString()} / {MAX_CHARS.toLocaleString()}
              </span>
              {text.length > 0 && (
                <button
                  onClick={() => setText("")}
                  className="text-xs font-semibold text-red-500 hover:text-red-700 transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value.slice(0, MAX_CHARS))}
            placeholder="Paste your text or start typing…"
            className="w-full border-0 p-4 text-sm text-[#0F2447] leading-relaxed resize-none focus:outline-none focus:ring-0 bg-white min-h-[320px] lg:min-h-[400px] placeholder-[#C4B09A]"
          />
        </div>

        {/* Right — stats grid */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <StatCard
              label="Words"
              value={result.words.toLocaleString()}
              color="text-[#E8500A]"
            />
            <StatCard
              label="Characters"
              value={result.characters.toLocaleString()}
              sub="with spaces"
              color="text-[#0F2447]"
            />
            <StatCard
              label="Sentences"
              value={result.sentences}
              color="text-emerald-600"
            />
            <StatCard
              label="Paragraphs"
              value={result.paragraphs}
              color="text-violet-600"
            />
            <StatCard
              label="Reading Time"
              value={`~${result.readingTimeMin} min`}
              sub="@ 200 wpm"
              color="text-[#E8500A]"
            />
            <StatCard
              label="No-Space Chars"
              value={result.charactersNoSpaces.toLocaleString()}
              sub="no spaces"
              color="text-[#E8500A]"
            />
          </div>

          {/* Unique words chip */}
          <div className="bg-white rounded-xl border border-[#F0E4D4] px-4 py-3 flex items-center justify-between">
            <span className="text-sm font-semibold text-[#0F2447]">Unique Words</span>
            <span className="text-xl font-bold text-[#E8500A]">
              {result.uniqueWords.toLocaleString()}
            </span>
          </div>

          {/* Speaking time chip */}
          <div className="bg-white rounded-xl border border-[#F0E4D4] px-4 py-3 flex items-center justify-between">
            <span className="text-sm font-semibold text-[#0F2447]">Speaking Time</span>
            <span className="text-xl font-bold text-violet-600">
              ~{result.speakingTimeMin} min
            </span>
          </div>
        </div>
      </div>

      {/* Flesch Reading Ease */}
      <div className={`rounded-2xl border p-5 ${fleschColor}`}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-bold">Flesch Reading Ease</span>
          <span className="text-3xl font-extrabold">{result.fleschScore}</span>
        </div>
        <div className="w-full bg-white/50 rounded-full h-2 mb-2.5">
          <div
            className={`h-2 rounded-full transition-all ${fleschBarColor}`}
            style={{ width: `${result.fleschScore}%` }}
          />
        </div>
        <div className="flex justify-between text-xs opacity-70">
          <span>Very Difficult (0)</span>
          <span className="font-bold">{result.fleschLabel}</span>
          <span>Very Easy (100)</span>
        </div>
      </div>

      {/* Keyword density */}
      {result.topKeywords.length > 0 && (
        <div className="bg-white border border-[#F0E4D4] rounded-2xl p-5">
          <h3 className="text-sm font-bold text-[#0F2447] mb-4">
            Top Keywords{" "}
            <span className="text-[#7A6048] font-normal">— stop words excluded</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {result.topKeywords.map((kw, i) => {
              const intensity = Math.max(
                0.25,
                kw.count / (result.topKeywords[0]?.count || 1)
              );
              return (
                <div
                  key={kw.word}
                  className="flex items-center gap-1.5 bg-[#FFFCF8] border border-[#F0E4D4] rounded-full pl-3 pr-2 py-1"
                  style={{ opacity: 0.55 + intensity * 0.45 }}
                >
                  <span className="text-xs font-semibold text-[#0F2447]">
                    {kw.word}
                  </span>
                  <span className="text-[10px] font-bold bg-[#E8500A] text-white rounded-full px-1.5 py-0.5 leading-none">
                    {kw.count}
                  </span>
                  <span className="text-[10px] text-[#7A6048]">{kw.pct}%</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
