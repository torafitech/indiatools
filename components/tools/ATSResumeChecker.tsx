"use client";

import { useState } from "react";

interface ATSResult {
  score: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  strengths: string[];
  suggestions: string[];
}

function ScoreCircle({ score }: { score: number }) {
  let ringColor = "stroke-red-500";
  let textColor = "text-red-500";
  let label = "Needs Work";

  if (score >= 90) {
    ringColor = "stroke-emerald-500";
    textColor = "text-emerald-600";
    label = "Excellent";
  } else if (score >= 70) {
    ringColor = "stroke-teal-500";
    textColor = "text-teal-600";
    label = "Good Match";
  } else if (score >= 40) {
    ringColor = "stroke-[#E8500A]";
    textColor = "text-[#E8500A]";
    label = "Partial Match";
  }

  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-36 h-36">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
          <circle
            cx="64"
            cy="64"
            r={radius}
            fill="none"
            stroke="#F0E4D4"
            strokeWidth="10"
          />
          <circle
            cx="64"
            cy="64"
            r={radius}
            fill="none"
            className={ringColor}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.6s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-4xl font-extrabold leading-none ${textColor}`}>{score}</span>
          <span className="text-xs text-[#7A6048] font-medium mt-0.5">/ 100</span>
        </div>
      </div>
      <span className={`text-sm font-bold ${textColor}`}>{label}</span>
    </div>
  );
}

export function ATSResumeChecker() {
  const [jdText, setJdText] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [result, setResult] = useState<ATSResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleAnalyze() {
    if (!jdText.trim() || !resumeText.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/ats-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jd: jdText.trim(), resume: resumeText.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setResult(data);
    } catch {
      setError("Network error. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  const canAnalyze = jdText.trim().length > 20 && resumeText.trim().length > 50;

  return (
    <div className="space-y-6">
      {/* Input: two columns on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* JD */}
        <div className="bg-white rounded-2xl border border-[#F0E4D4] p-5 space-y-3">
          <div>
            <label htmlFor="jd" className="block text-sm font-semibold text-[#0F2447] mb-1">
              Job Description <span className="text-[#E8500A]">*</span>
            </label>
            <p className="text-xs text-[#7A6048] mb-2">Paste the full job posting text</p>
          </div>
          <textarea
            id="jd"
            value={jdText}
            onChange={(e) => setJdText(e.target.value)}
            rows={12}
            maxLength={5000}
            placeholder="Paste the job description here — include responsibilities, required skills, qualifications, and any keywords the company mentions..."
            className="w-full border border-[#F0E4D4] rounded-xl p-4 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#E8500A]/20 focus:border-[#E8500A] bg-white text-[#0F2447] placeholder-[#C4A882] transition-colors"
          />
          <p className="text-xs text-[#C4A882] text-right">{jdText.length}/5000</p>
        </div>

        {/* Resume */}
        <div className="bg-white rounded-2xl border border-[#F0E4D4] p-5 space-y-3">
          <div>
            <label htmlFor="resume" className="block text-sm font-semibold text-[#0F2447] mb-1">
              Your Resume <span className="text-[#E8500A]">*</span>
            </label>
            <p className="text-xs text-[#7A6048] mb-2">Paste your resume as plain text</p>
          </div>
          <textarea
            id="resume"
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            rows={12}
            maxLength={8000}
            placeholder="Paste your resume here — include your summary, work experience, skills, education, and certifications..."
            className="w-full border border-[#F0E4D4] rounded-xl p-4 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#E8500A]/20 focus:border-[#E8500A] bg-white text-[#0F2447] placeholder-[#C4A882] transition-colors"
          />
          <p className="text-xs text-[#C4A882] text-right">{resumeText.length}/8000</p>
        </div>
      </div>

      {/* Analyze Button */}
      <button
        type="button"
        onClick={handleAnalyze}
        disabled={loading || !canAnalyze}
        className="w-full bg-[#E8500A] hover:bg-[#D44A09] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl px-5 py-2.5 text-base transition-colors flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Analyzing with Claude AI...
          </>
        ) : (
          "Analyze Resume →"
        )}
      </button>

      {/* Error */}
      {error && (
        <div className="bg-[#FFF5F0] border border-[#F0E4D4] rounded-2xl p-4 text-sm text-[#E8500A] font-medium">
          {error}
        </div>
      )}

      {/* Empty State */}
      {!loading && !result && !error && (
        <div className="flex flex-col items-center justify-center py-14 px-6 bg-white rounded-2xl border border-[#F0E4D4] text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#FBF5EE] flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-[#E8500A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
            </svg>
          </div>
          <h3 className="text-base font-bold text-[#0F2447] mb-1.5">Your ATS report will appear here</h3>
          <p className="text-sm text-[#7A6048] max-w-xs">
            Paste a job description and your resume above, then click Analyze Resume.
          </p>
        </div>
      )}

      {/* Loading Skeleton */}
      {loading && (
        <div className="bg-white rounded-2xl border border-[#F0E4D4] p-6 animate-pulse space-y-5">
          <div className="flex justify-center">
            <div className="w-36 h-36 rounded-full bg-[#F0E4D4]" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="h-4 bg-[#F0E4D4] rounded w-1/2" />
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4].map((i) => <div key={i} className="h-6 w-16 bg-[#FBF5EE] rounded-full" />)}
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-[#F0E4D4] rounded w-1/2" />
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3].map((i) => <div key={i} className="h-6 w-16 bg-[#FBF5EE] rounded-full" />)}
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-[#F0E4D4] rounded w-1/3" />
            {[1, 2, 3].map((i) => <div key={i} className="h-3 bg-[#FBF5EE] rounded w-full" />)}
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-[#F0E4D4] rounded w-1/3" />
            {[1, 2, 3, 4].map((i) => <div key={i} className="h-3 bg-[#FBF5EE] rounded w-full" />)}
          </div>
        </div>
      )}

      {/* Results */}
      {result && !loading && (
        <div className="bg-white rounded-2xl border border-[#F0E4D4] p-6 space-y-6">
          {/* Score */}
          <div className="flex flex-col items-center pb-5 border-b border-[#F0E4D4]">
            <ScoreCircle score={result.score} />
            <p className="text-xs text-[#7A6048] mt-2 text-center max-w-xs">
              This score estimates how well your resume aligns with the job description keywords and requirements.
            </p>
          </div>

          {/* Keywords Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Matched Keywords */}
            {result.matchedKeywords.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-[#0F2447] mb-2.5 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                  Matched Keywords
                  <span className="ml-auto text-xs font-normal text-[#7A6048]">{result.matchedKeywords.length}</span>
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {result.matchedKeywords.map((kw) => (
                    <span
                      key={kw}
                      className="px-2.5 py-1 text-xs font-medium rounded-full bg-green-50 text-green-700 border border-green-200"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Missing Keywords */}
            {result.missingKeywords.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-[#0F2447] mb-2.5 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
                  Missing Keywords
                  <span className="ml-auto text-xs font-normal text-[#7A6048]">{result.missingKeywords.length}</span>
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {result.missingKeywords.map((kw) => (
                    <span
                      key={kw}
                      className="px-2.5 py-1 text-xs font-medium rounded-full bg-red-50 text-red-600 border border-red-200"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Strengths */}
          {result.strengths.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-[#0F2447] mb-2.5">Strengths</h3>
              <ul className="space-y-2">
                {result.strengths.map((s) => (
                  <li key={s} className="flex items-start gap-2 text-sm text-[#0F2447]">
                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Suggestions */}
          {result.suggestions.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-[#0F2447] mb-2.5">Improvement Suggestions</h3>
              <ol className="space-y-2.5">
                {result.suggestions.map((s, i) => (
                  <li key={s} className="flex items-start gap-3 text-sm text-[#0F2447]">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#E8500A] text-white text-xs font-bold flex items-center justify-center leading-none">
                      {i + 1}
                    </span>
                    {s}
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Re-analyze */}
          <div className="pt-3 border-t border-[#F0E4D4]">
            <button
              type="button"
              onClick={handleAnalyze}
              disabled={loading}
              className="text-sm text-[#E8500A] font-semibold hover:underline disabled:opacity-50"
            >
              Re-analyze →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
