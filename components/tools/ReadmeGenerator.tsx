"use client";

import { useState } from "react";

const LICENSE_OPTIONS = ["MIT", "Apache 2.0", "GPL-3.0", "ISC", "Unlicensed"] as const;

function Spinner() {
  return (
    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

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

export function ReadmeGenerator() {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [techStack, setTechStack] = useState("");
  const [features, setFeatures] = useState("");
  const [installation, setInstallation] = useState("");
  const [usage, setUsage] = useState("");
  const [license, setLicense] = useState<string>("MIT");
  const [loading, setLoading] = useState(false);
  const [readme, setReadme] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const isValid = projectName.trim() && description.trim() && techStack.trim() && features.trim();

  async function handleGenerate() {
    if (!isValid) return;
    setLoading(true);
    setError(null);
    setReadme(null);

    try {
      const res = await fetch("/api/readme-gen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectName: projectName.trim(),
          description: description.trim(),
          techStack: techStack.trim(),
          features: features.trim(),
          installation: installation.trim(),
          usage: usage.trim(),
          license,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setReadme(data.readme);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy() {
    if (!readme) return;
    try {
      await navigator.clipboard.writeText(readme);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard not available
    }
  }

  function handleDownload() {
    if (!readme) return;
    const blob = new Blob([readme], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "README.md";
    a.click();
    URL.revokeObjectURL(url);
  }

  const inputClass =
    "w-full border border-[#F0E4D4] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8500A]/20 focus:border-[#E8500A] bg-white text-[#0F2447] placeholder-[#C4A882] transition-colors";

  const labelClass = "block text-sm font-semibold text-[#0F2447] mb-1.5";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
      {/* Left: Input Form */}
      <div className="bg-white rounded-2xl border border-[#F0E4D4] p-5 sm:p-6 space-y-5">
        {/* Project Name */}
        <div>
          <label htmlFor="projectName" className={labelClass}>
            Project Name <span className="text-[#E8500A]">*</span>
          </label>
          <input
            id="projectName"
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="my-awesome-project"
            className={inputClass}
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className={labelClass}>
            Description <span className="text-[#E8500A]">*</span>
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="A tool that..."
            className={`${inputClass} resize-none`}
          />
        </div>

        {/* Tech Stack */}
        <div>
          <label htmlFor="techStack" className={labelClass}>
            Tech Stack <span className="text-[#E8500A]">*</span>
          </label>
          <input
            id="techStack"
            type="text"
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
            placeholder="React, TypeScript, Node.js, PostgreSQL"
            className={inputClass}
          />
        </div>

        {/* Key Features */}
        <div>
          <label htmlFor="features" className={labelClass}>
            Key Features <span className="text-[#E8500A]">*</span>
          </label>
          <textarea
            id="features"
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
            rows={4}
            placeholder="One feature per line"
            className={`${inputClass} resize-none`}
          />
        </div>

        {/* Installation Steps */}
        <div>
          <label htmlFor="installation" className={labelClass}>
            Installation Steps{" "}
            <span className="text-[#7A6048] font-normal">(optional)</span>
          </label>
          <textarea
            id="installation"
            value={installation}
            onChange={(e) => setInstallation(e.target.value)}
            rows={3}
            placeholder={"npm install\nnpm run dev"}
            className={`${inputClass} resize-none font-mono text-xs`}
          />
        </div>

        {/* Usage Example */}
        <div>
          <label htmlFor="usage" className={labelClass}>
            Usage Example{" "}
            <span className="text-[#7A6048] font-normal">(optional)</span>
          </label>
          <textarea
            id="usage"
            value={usage}
            onChange={(e) => setUsage(e.target.value)}
            rows={3}
            placeholder={"import MyTool from ..."}
            className={`${inputClass} resize-none font-mono text-xs`}
          />
        </div>

        {/* License */}
        <div>
          <label htmlFor="license" className={labelClass}>
            License
          </label>
          <select
            id="license"
            value={license}
            onChange={(e) => setLicense(e.target.value)}
            className={inputClass}
          >
            {LICENSE_OPTIONS.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>

        {/* Generate Button */}
        <button
          type="button"
          onClick={handleGenerate}
          disabled={loading || !isValid}
          className="w-full bg-[#E8500A] hover:bg-[#D44A09] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl px-6 py-3 text-base transition-colors flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Spinner />
              Generating README...
            </>
          ) : (
            "Generate README →"
          )}
        </button>

        {error && (
          <div className="bg-[#FFF5F0] border border-[#F0E4D4] rounded-xl p-4 text-sm text-[#E8500A] font-medium">
            {error}
          </div>
        )}
      </div>

      {/* Right: Live Preview */}
      <div className="lg:sticky lg:top-6">
        {!readme && !loading && (
          <div className="flex flex-col items-center justify-center py-20 px-6 bg-white rounded-2xl border border-[#F0E4D4] text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#FBF5EE] flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-[#E8500A]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>
            </div>
            <h3 className="text-base font-bold text-[#0F2447] mb-1.5">
              Your README will appear here
            </h3>
            <p className="text-sm text-[#7A6048] max-w-xs">
              Fill in the form and hit Generate. Claude AI will write a complete, professional README.md.
            </p>
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center py-20 px-6 bg-white rounded-2xl border border-[#F0E4D4]">
            <Spinner />
            <p className="text-sm text-[#7A6048] mt-4">Claude is writing your README...</p>
          </div>
        )}

        {readme && !loading && (
          <div className="bg-[#0F2447] rounded-2xl border border-[#0F2447] overflow-hidden">
            {/* Toolbar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              <span className="text-xs font-mono text-white/60">README.md</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-[#E8500A] hover:bg-[#D44A09] text-white rounded-lg transition-colors"
                >
                  <CopyIcon copied={copied} />
                  {copied ? "Copied!" : "Copy Markdown"}
                </button>
                <button
                  type="button"
                  onClick={handleDownload}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border border-white/20 hover:border-white/40 text-white/80 hover:text-white rounded-lg transition-colors"
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download .md
                </button>
              </div>
            </div>

            {/* Code Block */}
            <div className="overflow-auto max-h-[600px]">
              <pre className="p-5 text-xs font-mono text-green-300 leading-relaxed whitespace-pre-wrap break-words">
                <code>{readme}</code>
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
