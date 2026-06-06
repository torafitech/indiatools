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
    <div className="bg-white rounded-2xl border border-[#F0E4D4] p-5 animate-pulse">
      <div className="flex items-start justify-between mb-3">
        <div className="h-7 bg-[#F0E4D4] rounded-lg w-2/5" />
        <div className="h-7 w-7 bg-[#F0E4D4] rounded-lg" />
      </div>
      <div className="h-4 bg-[#FBF5EE] rounded w-3/4 mb-2" />
      <div className="h-3 bg-[#FBF5EE] rounded w-full mb-1" />
      <div className="h-3 bg-[#FBF5EE] rounded w-5/6 mb-4" />
      <div className="flex gap-2">
        <div className="h-8 bg-[#FBF5EE] rounded-xl w-24" />
        <div className="h-8 bg-[#FBF5EE] rounded-xl w-28" />
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
      <div className="bg-white rounded-2xl border border-[#F0E4D4] p-5 sm:p-6 space-y-5">

        {/* Business Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-semibold text-[#0F2447] mb-1.5">
            Business Description <span className="text-[#E8500A]">*</span>
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={500}
            rows={3}
            placeholder="e.g. An online marketplace for handmade Indian handicrafts connecting artisans with global buyers"
            className="w-full border border-[#F0E4D4] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8500A]/20 focus:border-[#E8500A] bg-white text-[#0F2447] placeholder-[#C4A882] resize-none transition-colors"
          />
          <p className="text-xs text-[#C4A882] mt-1 text-right">{description.length}/500</p>
        </div>

        {/* Industry */}
        <div>
          <label htmlFor="industry" className="block text-sm font-semibold text-[#0F2447] mb-1.5">
            Industry
          </label>
          <select
            id="industry"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="w-full border border-[#F0E4D4] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8500A]/20 focus:border-[#E8500A] bg-white text-[#0F2447] transition-colors"
          >
            {INDUSTRIES.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
        </div>

        {/* Brand Style */}
        <div>
          <p className="block text-sm font-semibold text-[#0F2447] mb-2">Brand Style</p>
          <div className="flex flex-wrap gap-2">
            {STYLES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStyle(s)}
                className={`px-4 py-1.5 text-sm rounded-full transition-colors ${
                  style === s
                    ? "bg-[#0F2447] text-white font-semibold"
                    : "bg-white border border-[#F0E4D4] text-[#7A6048] hover:border-[#E8500A] hover:text-[#E8500A]"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Brand Values */}
        <div>
          <label htmlFor="values" className="block text-sm font-semibold text-[#0F2447] mb-1.5">
            Keywords / Brand Values{" "}
            <span className="text-[#7A6048] font-normal">(optional)</span>
          </label>
          <input
            id="values"
            type="text"
            value={values}
            onChange={(e) => setValues(e.target.value)}
            placeholder="e.g. trust, innovation, sustainability"
            className="w-full border border-[#F0E4D4] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8500A]/20 focus:border-[#E8500A] bg-white text-[#0F2447] placeholder-[#C4A882] transition-colors"
          />
        </div>

        {/* Generate Button */}
        <button
          type="button"
          onClick={handleGenerate}
          disabled={loading || !description.trim()}
          className="w-full bg-[#E8500A] hover:bg-[#D44A09] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl px-6 py-3 text-base transition-colors flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
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
        {!description.trim() && !loading && (
          <p className="text-xs text-[#7A6048] mt-1.5 text-center">Describe your business above to enable</p>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="bg-[#FFF5F0] border border-[#F0E4D4] rounded-2xl p-4 text-sm text-[#E8500A] font-medium">
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

      {/* Empty State */}
      {!loading && !results && !error && (
        <div className="flex flex-col items-center justify-center py-14 px-6 bg-white rounded-2xl border border-[#F0E4D4] text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#FBF5EE] flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-[#E8500A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
            </svg>
          </div>
          <h3 className="text-base font-bold text-[#0F2447] mb-1.5">Your names will appear here</h3>
          <p className="text-sm text-[#7A6048] max-w-xs">
            Describe your business above and hit Generate. Claude AI will craft 10 unique names with taglines.
          </p>
        </div>
      )}

      {/* Results */}
      {results && !loading && (
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <p className="text-sm font-semibold text-[#0F2447]">
              {results.length} Business Names Generated
            </p>
            <button
              type="button"
              onClick={handleGenerate}
              disabled={loading || !description.trim()}
              className="text-sm text-[#E8500A] font-semibold hover:underline disabled:opacity-50 transition-opacity"
            >
              Regenerate →
            </button>
          </div>

          {results.map((item) => (
            <div
              key={item.name}
              className="bg-white rounded-2xl border border-[#F0E4D4] p-5 hover:border-[#E8500A]/40 transition-colors"
            >
              <div className="flex items-start justify-between gap-3 mb-1">
                <h3 className="text-xl font-bold text-[#0F2447] leading-snug">{item.name}</h3>
                <button
                  type="button"
                  onClick={() => handleCopy(item.name)}
                  title="Copy name"
                  className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-xl border border-[#F0E4D4] hover:border-[#E8500A] hover:text-[#E8500A] text-[#7A6048] transition-colors"
                >
                  {copiedName === item.name ? (
                    <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </button>
              </div>

              <p className="text-sm text-[#E8500A] font-medium italic mb-2">&ldquo;{item.tagline}&rdquo;</p>
              <p className="text-xs text-[#7A6048] mb-4 leading-relaxed italic">{item.why}</p>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => handleCopy(item.name)}
                  className="px-3 py-1.5 text-xs font-semibold border border-[#F0E4D4] rounded-xl hover:bg-[#FBF5EE] hover:border-[#E8500A]/30 transition-colors text-[#7A6048] flex items-center gap-1.5"
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
                  className="px-3 py-1.5 text-xs font-semibold border border-[#F0E4D4] rounded-xl hover:bg-[#FBF5EE] hover:border-[#E8500A]/30 hover:text-[#E8500A] transition-colors text-[#7A6048] flex items-center gap-1.5"
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
