"use client";

import { useState } from "react";

interface CheckResult {
  id: string;
  name: string;
  status: "pass" | "fail" | "warning";
  detail: string;
  fix: string | null;
  codeExample: string | null;
  wcag: string;
}

function analyzeHTML(html: string): CheckResult[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  const checks: CheckResult[] = [];

  // 1. Images without alt
  const imgs = doc.querySelectorAll("img");
  const imgsNoAlt = [...imgs].filter(
    (img) => !img.getAttribute("alt") && img.getAttribute("alt") !== ""
  );
  checks.push({
    id: "img-alt",
    name: "Image Alt Text",
    status: imgsNoAlt.length === 0 ? "pass" : "fail",
    detail:
      imgsNoAlt.length === 0
        ? `All ${imgs.length} images have alt attributes`
        : `${imgsNoAlt.length} image(s) missing alt attribute`,
    fix:
      imgsNoAlt.length > 0
        ? `Add alt="description" to each <img>. Use alt="" for decorative images.`
        : null,
    codeExample:
      imgsNoAlt.length > 0
        ? `<!-- Bad -->\n<img src="photo.jpg">\n\n<!-- Good -->\n<img src="photo.jpg" alt="Team photo at company retreat">`
        : null,
    wcag: "1.1.1 Non-text Content (Level A)",
  });

  // 2. Form inputs without labels
  const inputs = doc.querySelectorAll(
    "input:not([type='hidden']):not([type='submit']):not([type='button']), textarea, select"
  );
  const inputsNoLabel = [...inputs].filter((input) => {
    const id = input.getAttribute("id");
    const ariaLabel = input.getAttribute("aria-label");
    const ariaLabelledBy = input.getAttribute("aria-labelledby");
    if (ariaLabel || ariaLabelledBy) return false;
    if (id && doc.querySelector(`label[for="${id}"]`)) return false;
    return true;
  });
  checks.push({
    id: "input-label",
    name: "Form Input Labels",
    status: inputsNoLabel.length === 0 ? "pass" : "fail",
    detail:
      inputsNoLabel.length === 0
        ? "All form inputs are properly labelled"
        : `${inputsNoLabel.length} input(s) missing labels`,
    fix:
      inputsNoLabel.length > 0
        ? "Add a <label for='inputId'> or aria-label attribute to each form field."
        : null,
    codeExample: `<label for="email">Email Address</label>\n<input id="email" type="email">`,
    wcag: "1.3.1 Info and Relationships (Level A)",
  });

  // 3. Empty links
  const links = doc.querySelectorAll("a");
  const emptyLinks = [...links].filter(
    (a) =>
      !a.textContent?.trim() &&
      !a.getAttribute("aria-label") &&
      !a.querySelector("img[alt]")
  );
  checks.push({
    id: "link-text",
    name: "Link Text",
    status: emptyLinks.length === 0 ? "pass" : "fail",
    detail:
      emptyLinks.length === 0
        ? "All links have descriptive text"
        : `${emptyLinks.length} link(s) have no readable text`,
    fix: "Add descriptive text inside <a> tags or use aria-label.",
    codeExample: `<!-- Bad -->\n<a href="/about"><i class="icon"></i></a>\n\n<!-- Good -->\n<a href="/about">About Us</a>\n<a href="/about" aria-label="About Us"><i class="icon"></i></a>`,
    wcag: "2.4.4 Link Purpose (Level A)",
  });

  // 4. Missing lang attribute on html
  const htmlEl = doc.querySelector("html");
  const hasLang = !!htmlEl?.getAttribute("lang");
  checks.push({
    id: "lang",
    name: "HTML Language",
    status: hasLang ? "pass" : "fail",
    detail: hasLang
      ? `Language set to "${htmlEl?.getAttribute("lang")}"`
      : "Missing lang attribute on <html>",
    fix: !hasLang ? `Add lang attribute: <html lang="en">` : null,
    codeExample: `<html lang="en">`,
    wcag: "3.1.1 Language of Page (Level A)",
  });

  // 5. Empty buttons
  const buttons = doc.querySelectorAll("button");
  const emptyButtons = [...buttons].filter(
    (b) => !b.textContent?.trim() && !b.getAttribute("aria-label")
  );
  checks.push({
    id: "button-text",
    name: "Button Text",
    status: emptyButtons.length === 0 ? "pass" : "fail",
    detail:
      emptyButtons.length === 0
        ? "All buttons have accessible text"
        : `${emptyButtons.length} button(s) have no text`,
    fix: "Add descriptive text or aria-label to icon-only buttons.",
    codeExample: `<button aria-label="Close dialog">✕</button>`,
    wcag: "4.1.2 Name, Role, Value (Level A)",
  });

  // 6. Heading hierarchy
  const headings = doc.querySelectorAll("h1,h2,h3,h4,h5,h6");
  let prevLevel = 0;
  let skipped = false;
  [...headings].forEach((h) => {
    const level = parseInt(h.tagName[1]);
    if (level > prevLevel + 1 && prevLevel > 0) skipped = true;
    prevLevel = level;
  });
  const h1Count = doc.querySelectorAll("h1").length;
  checks.push({
    id: "heading-hierarchy",
    name: "Heading Structure",
    status: !skipped && h1Count <= 1 ? "pass" : h1Count > 1 ? "fail" : "warning",
    detail:
      h1Count > 1
        ? `Multiple H1 tags found (${h1Count})`
        : skipped
        ? "Heading levels skip (e.g. H1 → H3)"
        : "Proper heading hierarchy",
    fix:
      skipped || h1Count > 1
        ? "Use exactly one H1 per page. Don't skip heading levels."
        : null,
    codeExample: `<h1>Page Title</h1>\n<h2>Section</h2>\n<h3>Subsection</h3>`,
    wcag: "1.3.1 Info and Relationships (Level A)",
  });

  return checks;
}

const SAMPLE_HTML = `<!DOCTYPE html>
<html lang="en">
<head><title>Sample Page</title></head>
<body>
  <h1>Welcome</h1>
  <img src="hero.jpg" alt="Hero banner">
  <img src="logo.png">
  <form>
    <label for="name">Name</label>
    <input id="name" type="text">
    <input type="email" placeholder="Email">
    <button type="submit">Submit</button>
  </form>
  <a href="/about">About Us</a>
  <a href="/contact"></a>
</body>
</html>`;

function StatusIcon({ status }: { status: "pass" | "fail" | "warning" }) {
  if (status === "pass")
    return (
      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 font-bold text-sm flex-shrink-0">
        ✓
      </span>
    );
  if (status === "fail")
    return (
      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-50 text-red-600 font-bold text-sm flex-shrink-0">
        ✗
      </span>
    );
  return (
    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#FFF8F2] text-[#E8500A] font-bold text-sm flex-shrink-0">
      ⚠
    </span>
  );
}

export function AccessibilityChecker() {
  const [html, setHtml] = useState("");
  const [results, setResults] = useState<CheckResult[] | null>(null);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  function runAnalysis() {
    if (!html.trim()) return;
    const checks = analyzeHTML(html);
    setResults(checks);
    const failedIds = new Set(
      checks.filter((c) => c.status !== "pass").map((c) => c.id)
    );
    setExpanded(failedIds);
  }

  function loadSample() {
    setHtml(SAMPLE_HTML);
    setResults(null);
    setExpanded(new Set());
  }

  function toggleExpand(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const passCount = results?.filter((r) => r.status === "pass").length ?? 0;
  const total = results?.length ?? 6;
  const failCount = results?.filter((r) => r.status === "fail").length ?? 0;
  const warnCount = results?.filter((r) => r.status === "warning").length ?? 0;

  const scoreColor =
    results === null
      ? "text-[#0F2447]"
      : passCount === total
      ? "text-emerald-600"
      : passCount >= total / 2
      ? "text-[#E8500A]"
      : "text-red-600";

  return (
    <div className="bg-[#FFFCF8] border border-[#F0E4D4] rounded-2xl p-5 sm:p-6 space-y-5">
      {/* Input area */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-semibold text-[#0F2447]">
            Paste HTML Code
          </label>
          <button
            onClick={loadSample}
            className="text-xs text-[#E8500A] hover:underline"
          >
            Load sample HTML
          </button>
        </div>
        <textarea
          value={html}
          onChange={(e) => setHtml(e.target.value)}
          placeholder={`Paste your HTML here…\n\nExample:\n<html lang="en">\n  <body>\n    <h1>Hello</h1>\n    <img src="photo.jpg" alt="Photo">\n  </body>\n</html>`}
          className="w-full min-h-[200px] font-mono text-sm bg-white border border-[#F0E4D4] rounded-xl p-4 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E8500A]/30 focus:border-[#E8500A] resize-y"
          spellCheck={false}
        />
        <p className="text-xs text-[#7A6048] mt-1">
          Analysis runs entirely in your browser — no code is sent to any server.
        </p>
      </div>

      <button
        onClick={runAnalysis}
        disabled={!html.trim()}
        className="w-full sm:w-auto px-8 py-3 bg-[#E8500A] text-white font-semibold rounded-xl hover:bg-[#C94208] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Check Accessibility
      </button>

      {/* Results */}
      {results && (
        <div className="space-y-4">
          {/* Score summary */}
          <div className="flex items-center gap-4 p-4 bg-white border border-[#F0E4D4] rounded-xl">
            <div className={`text-4xl font-extrabold ${scoreColor}`}>
              {passCount}/{total}
            </div>
            <div>
              <p className="font-semibold text-[#0F2447] text-sm">
                Checks passed
              </p>
              <p className="text-xs text-[#7A6048]">
                {failCount > 0 && `${failCount} failure${failCount > 1 ? "s" : ""}`}
                {failCount > 0 && warnCount > 0 && " · "}
                {warnCount > 0 && `${warnCount} warning${warnCount > 1 ? "s" : ""}`}
                {failCount === 0 && warnCount === 0 && "All Level A checks passed"}
              </p>
            </div>
            {failCount > 0 && (
              <div className="ml-auto text-xs px-3 py-1.5 bg-red-50 text-red-600 rounded-full font-medium">
                {failCount} Level A issue{failCount > 1 ? "s" : ""} found
              </div>
            )}
            {failCount === 0 && warnCount === 0 && (
              <div className="ml-auto text-xs px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-full font-medium">
                WCAG 2.1 Level A
              </div>
            )}
          </div>

          {/* Individual checks */}
          <div className="space-y-2">
            {results.map((check) => {
              const isOpen = expanded.has(check.id);
              const canExpand = check.status !== "pass" && (check.fix || check.codeExample);
              return (
                <div
                  key={check.id}
                  className={`border rounded-xl overflow-hidden transition-colors ${
                    check.status === "pass"
                      ? "border-emerald-200 bg-emerald-50/40"
                      : check.status === "fail"
                      ? "border-red-200 bg-red-50/30"
                      : "border-[#F0E4D4] bg-[#FFF8F2]"
                  }`}
                >
                  <button
                    onClick={() => canExpand && toggleExpand(check.id)}
                    className={`w-full flex items-center gap-3 p-4 text-left ${canExpand ? "cursor-pointer" : "cursor-default"}`}
                  >
                    <StatusIcon status={check.status} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-sm text-[#0F2447]">
                          {check.name}
                        </span>
                        <span className="text-xs text-[#7A6048]">
                          WCAG {check.wcag}
                        </span>
                      </div>
                      <p
                        className={`text-sm mt-0.5 ${
                          check.status === "pass"
                            ? "text-emerald-700"
                            : check.status === "fail"
                            ? "text-red-700"
                            : "text-[#E8500A]"
                        }`}
                      >
                        {check.detail}
                      </p>
                    </div>
                    {canExpand && (
                      <span className="text-[#7A6048] text-xs flex-shrink-0">
                        {isOpen ? "▲" : "▼"}
                      </span>
                    )}
                  </button>

                  {isOpen && canExpand && (
                    <div className="px-4 pb-4 space-y-3">
                      {check.fix && (
                        <div className="p-3 bg-white border border-[#F0E4D4] rounded-lg">
                          <p className="text-xs font-semibold text-[#7A6048] uppercase tracking-wide mb-1">
                            How to fix
                          </p>
                          <p className="text-sm text-[#0F2447]">{check.fix}</p>
                        </div>
                      )}
                      {check.codeExample && (
                        <div>
                          <p className="text-xs font-semibold text-[#7A6048] uppercase tracking-wide mb-1">
                            Code example
                          </p>
                          <pre className="bg-[#0F2447] text-green-300 text-xs rounded-lg p-4 overflow-x-auto whitespace-pre-wrap font-mono leading-relaxed">
                            {check.codeExample}
                          </pre>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
