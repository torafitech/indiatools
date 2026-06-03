"use client";

import { useState } from "react";

interface NameResult {
  name: string;
  tagline: string;
  why: string;
}

const INDUSTRIES = [
  "General",
  "Technology",
  "Food & Beverage",
  "Fashion & Apparel",
  "Health & Wellness",
  "Education",
  "Finance",
  "Real Estate",
  "Retail",
  "Consulting",
  "Manufacturing",
  "Travel & Hospitality",
  "Media & Entertainment",
  "E-commerce",
  "Agriculture",
];

const STYLES = ["Modern", "Classic", "Playful", "Minimal", "Bold", "Tech"] as const;
type StyleType = (typeof STYLES)[number];

function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-2/5 mb-3" />
      <div className="h-4 bg-gray-100 rounded w-3/4 mb-2" />
      <div className="h-3 bg-gray-100 rounded w-full mb-4" />
      <div className="flex gap-2">
        <div className="h-8 bg-gray-100 rounded w-24" />
        <div className="h-8 bg-gray-100 rounded w-28" />
      </div>
    </div>
  );
}

export function BusinessNameGenerator() {
  const [description, setDescription] = useState("");
  const [industry, setIndustry] = useState("General");
  const [style, setStyle] = useState<StyleType>("Modern");
  const [values, setValues] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<NameResult[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedName, setCopiedName] = useState<string | null>(null);

  async function handleGenerate() {
    if (!description.trim()) return;
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const res = await fetch("/api/business-name", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: description.trim(), industry, style, values }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 429) {
          setError("You've used your 5 free generations today. Come back tomorrow.");
        } else {
          setError(data.error ?? "Something went wrong. Please try again.");
        }
        return;
      }

      setResults(data.names);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy(name: string) {
    try {
      await navigator.clipboard.writeText(name);
      setCopiedName(name);
      setTimeout(() => setCopiedName(null), 2000);
    } catch {
      // clipboard not available — silent fail
    }
  }

  return (
    <div className="space-y-6">
      {/* Input Form */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6 space-y-4">
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1.5">
            Business Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={500}
            rows={3}
            placeholder="e.g. An online marketplace for handmade Indian handicrafts connecting artisans with global buyers"
            className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-900 placeholder-gray-400"
          />
          <p className="text-xs text-gray-400 mt-1 text-right">{description.length}/500</p>
        </div>

        <div>
          <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1.5">
            Industry
          </label>
          <select
            id="industry"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
          >
            {INDUSTRIES.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p className="block text-sm font-medium text-gray-700 mb-2">Brand Style</p>
          <div className="flex flex-wrap gap-2">
            {STYLES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStyle(s)}
                className={`px-3.5 py-1.5 text-sm rounded-full border transition-colors ${
                  style === s
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-600 border-gray-300 hover:border-blue-400 hover:text-blue-600"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="values" className="block text-sm font-medium text-gray-700 mb-1.5">
            Brand Values{" "}
            <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <input
            id="values"
            type="text"
            value={values}
            onChange={(e) => setValues(e.target.value)}
            placeholder="e.g. trust, innovation, sustainability"
            className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400"
          />
        </div>

        <button
          type="button"
          onClick={handleGenerate}
          disabled={loading || !description.trim()}
          className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Claude is thinking...
            </>
          ) : (
            "Generate 10 Names →"
          )}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Skeleton Loading */}
      {loading && (
        <div className="space-y-3">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      )}

      {/* Results */}
      {results && !loading && (
        <div className="space-y-3">
          <p className="text-sm text-gray-500">
            {results.length} name ideas generated — powered by{" "}
            <span className="font-medium text-gray-700">Claude AI</span>
          </p>
          {results.map((item) => (
            <div
              key={item.name}
              className="bg-white rounded-xl border border-gray-200 p-5 hover:border-blue-200 transition-colors"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-1">{item.name}</h3>
              <p className="text-sm text-blue-600 font-medium mb-2 italic">&ldquo;{item.tagline}&rdquo;</p>
              <p className="text-xs text-gray-500 mb-4 leading-relaxed">{item.why}</p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => handleCopy(item.name)}
                  className="px-3 py-1.5 text-xs font-medium border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 flex items-center gap-1.5"
                >
                  {copiedName === item.name ? (
                    <>
                      <svg className="h-3.5 w-3.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Copy Name
                    </>
                  )}
                </button>
                <a
                  href={`https://www.namecheap.com/domains/registration/results/?domain=${item.name.toLowerCase().replace(/\s/g, "")}`}
                  target="_blank"
                  rel="nofollow noopener sponsored"
                  className="px-3 py-1.5 text-xs font-medium border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors text-gray-700 flex items-center gap-1.5"
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
                  </svg>
                  Check .com
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
