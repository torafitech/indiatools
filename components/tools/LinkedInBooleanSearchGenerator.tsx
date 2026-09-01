"use client";

import { useMemo, useState } from "react";
import { buildPeopleSearchQuery, buildAlumniSearchQuery } from "@/lib/calculations/linkedinBooleanSearch";

type Mode = "people" | "alumni";

function CopyIcon({ copied }: { copied: boolean }) {
  if (copied) {
    return (
      <svg className="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    );
  }
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  );
}

const inputClass =
  "w-full border border-[#F0E4D4] rounded-lg px-3 py-2.5 text-sm text-[#0F2447] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E8500A]/30 focus:border-[#E8500A] bg-white";

export function LinkedInBooleanSearchGenerator() {
  const [mode, setMode] = useState<Mode>("people");
  const [copied, setCopied] = useState(false);

  const [jobTitles, setJobTitles] = useState("");
  const [location, setLocation] = useState("");
  const [company, setCompany] = useState("");
  const [keyword, setKeyword] = useState("");
  const [excludeJobPostings, setExcludeJobPostings] = useState(true);

  const [school, setSchool] = useState("");
  const [role, setRole] = useState("");
  const [alumniLocation, setAlumniLocation] = useState("");

  const hasInput =
    mode === "people"
      ? [jobTitles, location, company, keyword].some((v) => v.trim().length > 0)
      : [school, role, alumniLocation].some((v) => v.trim().length > 0);

  const query = useMemo(() => {
    if (mode === "people") {
      return buildPeopleSearchQuery({ jobTitles, location, company, keyword, excludeJobPostings });
    }
    return buildAlumniSearchQuery({ school, role, location: alumniLocation });
  }, [mode, jobTitles, location, company, keyword, excludeJobPostings, school, role, alumniLocation]);

  async function handleCopy() {
    if (!hasInput) return;
    try {
      await navigator.clipboard.writeText(query);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard not available
    }
  }

  function handleSearch() {
    if (!hasInput) return;
    window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="space-y-5">
      {/* Mode toggle */}
      <div className="inline-flex bg-[#F1F5F9] rounded-full p-1 gap-1">
        {(["people", "alumni"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
              mode === m ? "bg-[#E8500A] text-white" : "text-[#7A6048] hover:text-[#0F2447]"
            }`}
          >
            {m === "people" ? "Find People" : "Find Alumni"}
          </button>
        ))}
      </div>

      {/* Inputs card */}
      <div className="bg-white rounded-2xl border border-[#F0E4D4] p-5 sm:p-6 space-y-5">
        {mode === "people" ? (
          <>
            <div>
              <label className="text-sm font-semibold text-[#0F2447] mb-2 block">Job Title(s)</label>
              <input
                type="text"
                value={jobTitles}
                onChange={(e) => setJobTitles(e.target.value)}
                placeholder="founder, co-founder"
                className={inputClass}
              />
              <p className="text-xs text-[#7A6048] mt-1">Comma-separated synonyms are OR&apos;d together.</p>
            </div>

            <div>
              <label className="text-sm font-semibold text-[#0F2447] mb-2 block">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Bengaluru"
                className={inputClass}
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-[#0F2447] mb-2 block">Current Company <span className="text-[#7A6048] font-normal">(optional)</span></label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Razorpay"
                className={inputClass}
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-[#0F2447] mb-2 block">Extra Keywords <span className="text-[#7A6048] font-normal">(optional)</span></label>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="fintech"
                className={inputClass}
              />
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={excludeJobPostings}
                onChange={(e) => setExcludeJobPostings(e.target.checked)}
                className="w-4 h-4 rounded border-[#F0E4D4] accent-[#E8500A]"
              />
              <span className="text-sm text-[#0F2447]">Exclude job postings</span>
            </label>
          </>
        ) : (
          <>
            <div>
              <label className="text-sm font-semibold text-[#0F2447] mb-2 block">School / College Name</label>
              <input
                type="text"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                placeholder="IIT Bombay"
                className={inputClass}
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-[#0F2447] mb-2 block">Role <span className="text-[#7A6048] font-normal">(optional)</span></label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="product manager"
                className={inputClass}
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-[#0F2447] mb-2 block">Location <span className="text-[#7A6048] font-normal">(optional)</span></label>
              <input
                type="text"
                value={alumniLocation}
                onChange={(e) => setAlumniLocation(e.target.value)}
                placeholder="Mumbai"
                className={inputClass}
              />
            </div>
          </>
        )}
      </div>

      {/* Result panel */}
      <div className="bg-[#0F2447] rounded-2xl border border-[#0F2447] overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <span className="text-xs font-mono text-white/60">Google Search Query</span>
          <button
            type="button"
            onClick={handleCopy}
            disabled={!hasInput}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-[#E8500A] hover:bg-[#D44A09] disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
          >
            <CopyIcon copied={copied} />
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <div className="p-5 overflow-x-auto">
          <p className="text-sm font-mono text-green-300 leading-relaxed whitespace-pre-wrap break-words">
            {query}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={handleSearch}
        disabled={!hasInput}
        className="w-full sm:w-auto px-6 py-3 bg-[#E8500A] hover:bg-[#D44A09] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors"
      >
        Search on Google
      </button>
    </div>
  );
}
