"use client";

import { useState } from "react";

interface SEOResult {
  url: string;
  title: string;
  titleLength: number;
  metaDesc: string;
  metaDescLength: number;
  h1s: string[];
  h2Count: number;
  h2s: string[];
  canonical: string;
  robots: string;
  ogTitle: string;
  ogDesc: string;
  ogImage: string;
  imgsTotal: number;
  imgsWithAlt: number;
  imgsMissingAlt: number;
  langAttr: string;
  viewportMeta: boolean;
}

type Status = "pass" | "warn" | "fail";

interface CheckResult {
  label: string;
  status: Status;
  points: number;
  maxPoints: number;
  detail: string;
  recommendation?: string;
  codeExample?: string;
}

function scoreTitle(r: SEOResult): CheckResult {
  const present = r.title.length > 0;
  const goodLen = r.titleLength >= 50 && r.titleLength <= 60;
  let points = 0;
  let status: Status = "fail";
  let detail = "";
  let recommendation: string | undefined;
  let codeExample: string | undefined;

  if (!present) {
    detail = "Title tag is missing.";
    recommendation = "Add a descriptive title tag between 50–60 characters.";
    codeExample = `<title>Your Page Title — Brand Name</title>`;
  } else if (goodLen) {
    points = 20;
    status = "pass";
    detail = `"${r.title}" (${r.titleLength} chars)`;
  } else if (r.titleLength < 50) {
    points = 12;
    status = "warn";
    detail = `"${r.title}" (${r.titleLength} chars — too short, aim for 50–60)`;
    recommendation = "Expand the title to 50–60 characters for better CTR.";
  } else {
    points = 12;
    status = "warn";
    detail = `"${r.title}" (${r.titleLength} chars — too long, aim for 50–60)`;
    recommendation = "Shorten the title to under 60 characters to avoid truncation in SERPs.";
  }

  return { label: "Title Tag", status, points, maxPoints: 20, detail, recommendation, codeExample };
}

function scoreMetaDesc(r: SEOResult): CheckResult {
  const present = r.metaDesc.length > 0;
  const goodLen = r.metaDescLength >= 150 && r.metaDescLength <= 160;
  let points = 0;
  let status: Status = "fail";
  let detail = "";
  let recommendation: string | undefined;
  let codeExample: string | undefined;

  if (!present) {
    detail = "Meta description is missing.";
    recommendation = "Add a meta description between 150–160 characters.";
    codeExample = `<meta name="description" content="Your page description here. Make it compelling and keyword-rich, 150–160 chars." />`;
  } else if (goodLen) {
    points = 20;
    status = "pass";
    detail = `"${r.metaDesc.slice(0, 80)}${r.metaDesc.length > 80 ? "…" : ""}" (${r.metaDescLength} chars)`;
  } else if (r.metaDescLength < 150) {
    points = 12;
    status = "warn";
    detail = `${r.metaDescLength} chars — too short (aim for 150–160)`;
    recommendation = "Expand the meta description to 150–160 characters to maximise SERP snippet space.";
  } else {
    points = 12;
    status = "warn";
    detail = `${r.metaDescLength} chars — too long (aim for 150–160)`;
    recommendation = "Trim the meta description to under 160 characters to avoid truncation.";
  }

  return { label: "Meta Description", status, points, maxPoints: 20, detail, recommendation, codeExample };
}

function scoreHeadings(r: SEOResult): CheckResult {
  const hasOneH1 = r.h1s.length === 1;
  const hasH2s = r.h2Count > 0;
  let points = 0;
  let status: Status = "fail";
  let detail = "";
  let recommendation: string | undefined;
  let codeExample: string | undefined;

  if (r.h1s.length === 0) {
    detail = "No H1 tag found.";
    recommendation = "Add exactly one H1 tag containing your primary keyword.";
    codeExample = `<h1>Your Primary Keyword — Page Topic</h1>`;
  } else if (r.h1s.length > 1) {
    points = 8;
    status = "warn";
    detail = `${r.h1s.length} H1 tags found — should have exactly one.`;
    recommendation = `Keep only one H1. Found: ${r.h1s.slice(0, 3).map((h) => `"${h}"`).join(", ")}`;
  } else if (hasOneH1 && !hasH2s) {
    points = 10;
    status = "warn";
    detail = `H1: "${r.h1s[0]}" — no H2 subheadings found.`;
    recommendation = "Add H2 subheadings to structure your content and target secondary keywords.";
    codeExample = `<h2>Section Heading with Secondary Keyword</h2>`;
  } else {
    points = 15;
    status = "pass";
    detail = `H1: "${r.h1s[0]}" + ${r.h2Count} H2${r.h2Count !== 1 ? "s" : ""}`;
  }

  return { label: "Heading Structure", status, points, maxPoints: 15, detail, recommendation, codeExample };
}

function scoreImages(r: SEOResult): CheckResult {
  let points = 0;
  let status: Status = "pass";
  let detail = "";
  let recommendation: string | undefined;
  let codeExample: string | undefined;

  if (r.imgsTotal === 0) {
    points = 15;
    status = "pass";
    detail = "No images on page.";
  } else if (r.imgsMissingAlt === 0) {
    points = 15;
    status = "pass";
    detail = `All ${r.imgsTotal} image${r.imgsTotal !== 1 ? "s have" : " has"} alt text.`;
  } else {
    const ratio = r.imgsWithAlt / r.imgsTotal;
    points = Math.round(ratio * 15);
    status = ratio >= 0.75 ? "warn" : "fail";
    detail = `${r.imgsMissingAlt} of ${r.imgsTotal} images missing alt text.`;
    recommendation = "Add descriptive alt attributes to all images for accessibility and image SEO.";
    codeExample = `<img src="photo.jpg" alt="Descriptive text about the image" />`;
  }

  return { label: "Image Alt Text", status, points, maxPoints: 15, detail, recommendation, codeExample };
}

function scoreTechnical(r: SEOResult): CheckResult {
  const checks = [r.canonical.length > 0, !!r.langAttr, r.viewportMeta];
  const passed = checks.filter(Boolean).length;
  const points = Math.round((passed / 3) * 15);
  const status: Status = passed === 3 ? "pass" : passed >= 2 ? "warn" : "fail";

  const missing: string[] = [];
  const recs: string[] = [];
  const examples: string[] = [];

  if (!r.canonical) {
    missing.push("canonical URL");
    recs.push("Add a canonical link to prevent duplicate content issues.");
    examples.push(`<link rel="canonical" href="https://yoursite.com/page" />`);
  }
  if (!r.langAttr) {
    missing.push("lang attribute");
    recs.push("Add lang attribute to <html> for accessibility and regional search.");
    examples.push(`<html lang="en">`);
  }
  if (!r.viewportMeta) {
    missing.push("viewport meta");
    recs.push("Add viewport meta tag for mobile responsiveness.");
    examples.push(`<meta name="viewport" content="width=device-width, initial-scale=1" />`);
  }

  const detail =
    passed === 3
      ? "Canonical, lang attribute, and viewport meta all present."
      : `Missing: ${missing.join(", ")}.`;

  return {
    label: "Technical SEO",
    status,
    points,
    maxPoints: 15,
    detail,
    recommendation: recs.length ? recs.join(" ") : undefined,
    codeExample: examples.length ? examples.join("\n") : undefined,
  };
}

function scoreSocialMeta(r: SEOResult): CheckResult {
  const checks = [r.ogTitle.length > 0, r.ogDesc.length > 0, r.ogImage.length > 0];
  const passed = checks.filter(Boolean).length;
  const points = Math.round((passed / 3) * 15);
  const status: Status = passed === 3 ? "pass" : passed >= 2 ? "warn" : "fail";

  const missing: string[] = [];
  if (!r.ogTitle) missing.push("og:title");
  if (!r.ogDesc) missing.push("og:description");
  if (!r.ogImage) missing.push("og:image");

  const detail =
    passed === 3
      ? "OG title, description, and image all present."
      : missing.length === 3
      ? "No Open Graph tags found."
      : `Missing: ${missing.join(", ")}.`;

  const codeExample =
    missing.length > 0
      ? missing
          .map((tag) => {
            if (tag === "og:title") return `<meta property="og:title" content="Your Page Title" />`;
            if (tag === "og:description") return `<meta property="og:description" content="Your page description for social sharing." />`;
            return `<meta property="og:image" content="https://yoursite.com/og-image.png" />`;
          })
          .join("\n")
      : undefined;

  return {
    label: "Social Meta (OG)",
    status,
    points,
    maxPoints: 15,
    detail,
    recommendation: missing.length ? "Add missing Open Graph tags for better social sharing previews." : undefined,
    codeExample,
  };
}

function computeChecks(result: SEOResult): CheckResult[] {
  return [
    scoreTitle(result),
    scoreMetaDesc(result),
    scoreHeadings(result),
    scoreImages(result),
    scoreTechnical(result),
    scoreSocialMeta(result),
  ];
}

function statusIcon(s: Status) {
  if (s === "pass") return <span className="text-emerald-600 font-bold text-base">✓</span>;
  if (s === "warn") return <span className="text-orange-500 font-bold text-base">⚠</span>;
  return <span className="text-red-500 font-bold text-base">✗</span>;
}

function statusBadge(s: Status) {
  if (s === "pass") return "bg-emerald-50 border-emerald-200 text-emerald-800";
  if (s === "warn") return "bg-orange-50 border-orange-200 text-orange-800";
  return "bg-red-50 border-red-200 text-red-800";
}

function scoreColor(score: number) {
  if (score >= 90) return "text-emerald-600";
  if (score >= 75) return "text-teal-600";
  if (score >= 50) return "text-orange-500";
  return "text-red-500";
}

function scoreBg(score: number) {
  if (score >= 90) return "bg-emerald-50 border-emerald-200";
  if (score >= 75) return "bg-teal-50 border-teal-200";
  if (score >= 50) return "bg-orange-50 border-orange-200";
  return "bg-red-50 border-red-200";
}

function scoreLabel(score: number) {
  if (score >= 90) return "Excellent";
  if (score >= 75) return "Good";
  if (score >= 50) return "Needs Work";
  return "Poor";
}

export function SEOAnalyzer() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<SEOResult | null>(null);

  async function analyze() {
    setError("");
    setResult(null);

    let normalized = url.trim();
    if (!normalized) return;
    if (!/^https?:\/\//i.test(normalized)) normalized = "https://" + normalized;

    setLoading(true);
    try {
      const res = await fetch("/api/seo-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: normalized }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setError(data.error ?? "Something went wrong. Try again.");
      } else {
        setResult(data);
      }
    } catch {
      setError("Network error. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  const checks = result ? computeChecks(result) : [];
  const totalScore = checks.reduce((sum, c) => sum + c.points, 0);

  return (
    <div className="space-y-5">
      {/* Input */}
      <div className="bg-white border border-[#F0E4D4] rounded-xl p-5">
        <label className="block text-sm font-semibold text-[#0F2447] mb-2">
          Website URL
        </label>
        <div className="flex gap-3 flex-col sm:flex-row">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !loading && analyze()}
            placeholder="https://example.com/your-page"
            className="flex-1 px-4 py-3 border border-[#F0E4D4] rounded-lg text-sm text-[#0F2447] placeholder-[#7A6048] focus:outline-none focus:ring-2 focus:ring-[#E8500A] focus:border-transparent"
          />
          <button
            onClick={analyze}
            disabled={loading || !url.trim()}
            className="w-full sm:w-auto px-6 py-3 bg-[#E8500A] text-white font-semibold rounded-lg hover:bg-[#cf4509] disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
          >
            {loading ? (
              <span className="flex items-center gap-2 justify-center">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Analyzing…
              </span>
            ) : (
              "Analyze"
            )}
          </button>
        </div>
        {error && (
          <p className="mt-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            {error}
          </p>
        )}
        <p className="mt-2 text-xs text-[#7A6048]">
          Enter any public URL. Analysis runs in real-time — no login needed.
        </p>
      </div>

      {/* Results */}
      {result && (
        <>
          {/* Overall Score */}
          <div className={`border rounded-xl p-5 flex flex-col sm:flex-row items-center gap-5 ${scoreBg(totalScore)}`}>
            <div className="text-center">
              <div className={`text-6xl font-extrabold leading-none ${scoreColor(totalScore)}`}>
                {totalScore}
              </div>
              <div className="text-xs font-semibold text-[#7A6048] mt-1">out of 100</div>
            </div>
            <div>
              <div className={`text-xl font-extrabold ${scoreColor(totalScore)}`}>
                {scoreLabel(totalScore)}
              </div>
              <div className="text-sm text-[#7A6048] mt-1 break-all">
                Analyzed: <span className="font-medium text-[#0F2447]">{result.url}</span>
              </div>
              <div className="mt-2 flex gap-3 text-xs text-[#7A6048]">
                <span>
                  <span className="text-emerald-600 font-bold">✓</span>{" "}
                  {checks.filter((c) => c.status === "pass").length} passed
                </span>
                <span>
                  <span className="text-orange-500 font-bold">⚠</span>{" "}
                  {checks.filter((c) => c.status === "warn").length} warnings
                </span>
                <span>
                  <span className="text-red-500 font-bold">✗</span>{" "}
                  {checks.filter((c) => c.status === "fail").length} failed
                </span>
              </div>
            </div>
          </div>

          {/* Check Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {checks.map((check) => (
              <div
                key={check.label}
                className={`border rounded-xl p-4 ${statusBadge(check.status)}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {statusIcon(check.status)}
                    <span className="font-semibold text-sm text-[#0F2447]">{check.label}</span>
                  </div>
                  <span className="text-xs font-bold text-[#7A6048]">
                    {check.points}/{check.maxPoints}
                  </span>
                </div>
                {/* Progress bar */}
                <div className="h-1.5 bg-white/60 rounded-full mb-3 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      check.status === "pass"
                        ? "bg-emerald-500"
                        : check.status === "warn"
                        ? "bg-orange-400"
                        : "bg-red-400"
                    }`}
                    style={{ width: `${(check.points / check.maxPoints) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-[#7A6048] leading-relaxed">{check.detail}</p>
                {check.recommendation && (
                  <p className="mt-2 text-xs text-[#0F2447] font-medium leading-relaxed">
                    Fix: {check.recommendation}
                  </p>
                )}
                {check.codeExample && (
                  <pre className="mt-2 text-xs bg-white/70 border border-white/50 rounded p-2 overflow-x-auto text-[#0F2447] font-mono whitespace-pre-wrap break-all">
                    {check.codeExample}
                  </pre>
                )}
              </div>
            ))}
          </div>

          {/* Robots & Extra Info */}
          <div className="bg-white border border-[#F0E4D4] rounded-xl p-4">
            <h3 className="text-sm font-semibold text-[#0F2447] mb-3">Additional Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {[
                { label: "Robots directive", value: result.robots || "index,follow (default)" },
                { label: "Canonical URL", value: result.canonical || "Not set" },
                { label: "Lang attribute", value: result.langAttr || "Not set" },
                { label: "Viewport meta", value: result.viewportMeta ? "Present" : "Missing" },
                { label: "OG Title", value: result.ogTitle || "Not set" },
                { label: "OG Image", value: result.ogImage ? "Present" : "Not set" },
              ].map(({ label, value }) => (
                <div key={label} className="flex gap-2">
                  <span className="text-[#7A6048] shrink-0 w-32">{label}:</span>
                  <span className="text-[#0F2447] font-medium break-all truncate">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
