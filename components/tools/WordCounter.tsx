"use client";

import { useMemo, useState } from "react";
import { analyzeText } from "@/lib/calculations/wordcount";

const SAMPLE_TEXT = `The quick brown fox jumps over the lazy dog. This sentence contains every letter of the English alphabet at least once. It is commonly used for typing practice and font demonstrations. Writers often use it to test their keyboards and check that all characters are rendering correctly.

Paste your own text above to analyze it. You will see word count, reading time, keyword density, and more metrics update in real time as you type.`;

function StatCard({
  label,
  value,
  sub,
  highlight,
}: {
  label: string;
  value: string | number;
  sub?: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl p-4 ${
        highlight
          ? "bg-blue-600 text-white"
          : "bg-white border border-gray-200"
      }`}
    >
      <p
        className={`text-xs font-medium mb-1 ${
          highlight ? "text-blue-200" : "text-gray-500"
        }`}
      >
        {label}
      </p>
      <p
        className={`text-2xl font-bold ${
          highlight ? "text-white" : "text-gray-900"
        }`}
      >
        {value}
      </p>
      {sub && (
        <p
          className={`text-xs mt-0.5 ${
            highlight ? "text-blue-200" : "text-gray-400"
          }`}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

export function WordCounter() {
  const [text, setText] = useState(SAMPLE_TEXT);
  const result = useMemo(() => analyzeText(text), [text]);

  const fleschColor =
    result.fleschScore >= 70
      ? "text-green-600 bg-green-50 border-green-200"
      : result.fleschScore >= 50
      ? "text-amber-600 bg-amber-50 border-amber-200"
      : "text-red-600 bg-red-50 border-red-200";

  return (
    <div className="space-y-4">
      {/* Textarea */}
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type your text here..."
          rows={10}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 leading-relaxed resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-300"
        />
        {text.length > 0 && (
          <button
            onClick={() => setText("")}
            className="absolute top-3 right-3 text-xs text-gray-400 hover:text-gray-600 bg-white border border-gray-200 px-2 py-1 rounded-lg transition-colors"
          >
            Clear
          </button>
        )}
      </div>

      {/* Primary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard label="Words" value={result.words.toLocaleString()} highlight />
        <StatCard label="Characters" value={result.characters.toLocaleString()} sub="with spaces" />
        <StatCard label="Characters" value={result.charactersNoSpaces.toLocaleString()} sub="no spaces" />
        <StatCard label="Unique Words" value={result.uniqueWords.toLocaleString()} />
      </div>

      {/* Secondary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard label="Sentences" value={result.sentences} />
        <StatCard label="Paragraphs" value={result.paragraphs} />
        <StatCard
          label="Reading Time"
          value={`~${result.readingTimeMin} min`}
          sub="@ 200 wpm"
        />
        <StatCard
          label="Speaking Time"
          value={`~${result.speakingTimeMin} min`}
          sub="@ 130 wpm"
        />
      </div>

      {/* Flesch score */}
      <div className={`rounded-xl border p-4 ${fleschColor}`}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold">Flesch Reading Ease</span>
          <span className="text-2xl font-bold">{result.fleschScore}</span>
        </div>
        <div className="w-full bg-white/40 rounded-full h-2 mb-2">
          <div
            className="h-2 rounded-full bg-current opacity-60 transition-all"
            style={{ width: `${result.fleschScore}%` }}
          />
        </div>
        <div className="flex justify-between text-xs opacity-70">
          <span>Very Difficult (0)</span>
          <span className="font-semibold">{result.fleschLabel}</span>
          <span>Very Easy (100)</span>
        </div>
      </div>

      {/* Keyword density */}
      {result.topKeywords.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Top Keywords{" "}
            <span className="text-gray-400 font-normal">(excluding stop words)</span>
          </h3>
          <div className="space-y-2">
            {result.topKeywords.map((kw, i) => (
              <div key={kw.word} className="flex items-center gap-3">
                <span className="text-xs text-gray-400 w-4 text-right">{i + 1}</span>
                <span className="text-sm font-medium text-gray-800 w-28 truncate">
                  {kw.word}
                </span>
                <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                  <div
                    className="bg-blue-500 h-1.5 rounded-full"
                    style={{
                      width: `${
                        (kw.count /
                          (result.topKeywords[0]?.count || 1)) *
                        100
                      }%`,
                    }}
                  />
                </div>
                <span className="text-xs text-gray-500 w-12 text-right">
                  {kw.count}× ({kw.pct}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
