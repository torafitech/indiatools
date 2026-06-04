"use client";

import { useState } from "react";

type DocType = "NDA" | "Rent Agreement" | "Freelance Contract" | "Employment Offer Letter";

interface DocOption {
  type: DocType;
  icon: React.ReactNode;
  description: string;
}

const DOC_OPTIONS: DocOption[] = [
  {
    type: "NDA",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    description: "Non-Disclosure Agreement between two parties",
  },
  {
    type: "Rent Agreement",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    description: "Residential or commercial property rental agreement",
  },
  {
    type: "Freelance Contract",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    description: "Service agreement between client and freelancer",
  },
  {
    type: "Employment Offer Letter",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    description: "Formal job offer letter with CTC and terms",
  },
];

type Fields = Record<string, string>;

const FIELD_CONFIGS: Record<DocType, { key: string; label: string; placeholder: string; required?: boolean }[]> = {
  NDA: [
    { key: "partyAName", label: "Party A Name", placeholder: "e.g. Acme Technologies Pvt. Ltd.", required: true },
    { key: "partyAAddress", label: "Party A Address", placeholder: "e.g. 12, MG Road, Bengaluru, Karnataka 560001" },
    { key: "partyBName", label: "Party B Name", placeholder: "e.g. Rahul Sharma", required: true },
    { key: "partyBAddress", label: "Party B Address", placeholder: "e.g. 45, Sector 18, Noida, UP 201301" },
    { key: "purpose", label: "Purpose of Disclosure", placeholder: "e.g. Evaluation of potential business collaboration in software development", required: true },
    { key: "duration", label: "Confidentiality Duration", placeholder: "e.g. 2 years from the date of signing" },
  ],
  "Rent Agreement": [
    { key: "landlordName", label: "Landlord Name", placeholder: "e.g. Suresh Kumar", required: true },
    { key: "tenantName", label: "Tenant Name", placeholder: "e.g. Priya Mehta", required: true },
    { key: "propertyAddress", label: "Property Address", placeholder: "e.g. Flat 3B, Sunrise Apartments, Koramangala, Bengaluru 560034", required: true },
    { key: "rentAmount", label: "Monthly Rent (₹)", placeholder: "e.g. 25,000" },
    { key: "securityDeposit", label: "Security Deposit (₹)", placeholder: "e.g. 1,00,000" },
    { key: "duration", label: "Lease Duration", placeholder: "e.g. 11 months starting 1st July 2026" },
    { key: "city", label: "City (for stamp duty note)", placeholder: "e.g. Bengaluru" },
  ],
  "Freelance Contract": [
    { key: "clientName", label: "Client Name / Company", placeholder: "e.g. Nexus Digital Pvt. Ltd.", required: true },
    { key: "freelancerName", label: "Freelancer Name", placeholder: "e.g. Ankit Verma", required: true },
    { key: "projectDescription", label: "Project Description", placeholder: "e.g. Design and development of a mobile app for iOS and Android", required: true },
    { key: "deliverables", label: "Deliverables", placeholder: "e.g. Wireframes, UI designs, working app builds for both platforms" },
    { key: "paymentAmount", label: "Total Payment (₹)", placeholder: "e.g. 1,50,000" },
    { key: "paymentSchedule", label: "Payment Schedule", placeholder: "e.g. 30% on signing, 40% mid-project, 30% on delivery" },
    { key: "timeline", label: "Project Timeline", placeholder: "e.g. 3 months from date of agreement" },
  ],
  "Employment Offer Letter": [
    { key: "companyName", label: "Company Name", placeholder: "e.g. InnovateTech Solutions Pvt. Ltd.", required: true },
    { key: "candidateName", label: "Candidate Name", placeholder: "e.g. Divya Krishnamurthy", required: true },
    { key: "position", label: "Position / Designation", placeholder: "e.g. Senior Software Engineer", required: true },
    { key: "ctc", label: "CTC (Annual, ₹)", placeholder: "e.g. 18,00,000 LPA" },
    { key: "joiningDate", label: "Joining Date", placeholder: "e.g. 1st August 2026" },
    { key: "probationPeriod", label: "Probation Period", placeholder: "e.g. 6 months" },
    { key: "workLocation", label: "Work Location", placeholder: "e.g. Hyderabad (Hybrid — 3 days office)" },
  ],
};

function SpinnerIcon() {
  return (
    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

export function LegalDocGenerator() {
  const [selectedDoc, setSelectedDoc] = useState<DocType | null>(null);
  const [fields, setFields] = useState<Fields>({});
  const [loading, setLoading] = useState(false);
  const [document, setDocument] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  function handleDocSelect(doc: DocType) {
    setSelectedDoc(doc);
    setFields({});
    setDocument(null);
    setError(null);
  }

  function handleFieldChange(key: string, value: string) {
    setFields((prev) => ({ ...prev, [key]: value }));
  }

  function isFormValid() {
    if (!selectedDoc) return false;
    const required = FIELD_CONFIGS[selectedDoc].filter((f) => f.required);
    return required.every((f) => fields[f.key]?.trim());
  }

  async function handleGenerate() {
    if (!selectedDoc || !isFormValid()) return;
    setLoading(true);
    setError(null);
    setDocument(null);

    try {
      const res = await fetch("/api/legal-doc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ docType: selectedDoc, fields }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 429) {
          setError("You've reached the generation limit. Please try again in an hour.");
        } else {
          setError(data.error ?? "Something went wrong. Please try again.");
        }
        return;
      }

      setDocument(data.document);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy() {
    if (!document) return;
    try {
      await navigator.clipboard.writeText(document);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // silent fail
    }
  }

  function handleDownload() {
    if (!document || !selectedDoc) return;
    const blob = new Blob([document], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement("a");
    a.href = url;
    a.download = `${selectedDoc.replace(/\s+/g, "-").toLowerCase()}-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      {/* Step 1: Document type selection */}
      <div className="bg-white rounded-2xl border border-[#F0E4D4] p-5 sm:p-6">
        <p className="text-sm font-semibold text-[#0F2447] mb-3">
          Step 1 — Select Document Type
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {DOC_OPTIONS.map((opt) => (
            <button
              key={opt.type}
              type="button"
              onClick={() => handleDocSelect(opt.type)}
              className={`flex items-start gap-3 p-4 rounded-xl border text-left transition-all ${
                selectedDoc === opt.type
                  ? "border-[#E8500A] bg-[#FFF5F0] ring-2 ring-[#E8500A]/20"
                  : "border-[#F0E4D4] hover:border-[#E8500A]/50 hover:bg-[#FFFCF8]"
              }`}
            >
              <span
                className={`flex-shrink-0 mt-0.5 ${
                  selectedDoc === opt.type ? "text-[#E8500A]" : "text-[#7A6048]"
                }`}
              >
                {opt.icon}
              </span>
              <div>
                <p
                  className={`text-sm font-semibold ${
                    selectedDoc === opt.type ? "text-[#E8500A]" : "text-[#0F2447]"
                  }`}
                >
                  {opt.type}
                </p>
                <p className="text-xs text-[#7A6048] mt-0.5 leading-snug">{opt.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Step 2: Fill fields */}
      {selectedDoc && (
        <div className="bg-white rounded-2xl border border-[#F0E4D4] p-5 sm:p-6 space-y-4">
          <p className="text-sm font-semibold text-[#0F2447] mb-1">
            Step 2 — Fill in the Details
          </p>

          {FIELD_CONFIGS[selectedDoc].map((fieldDef) => (
            <div key={fieldDef.key}>
              <label
                htmlFor={fieldDef.key}
                className="block text-sm font-medium text-[#0F2447] mb-1.5"
              >
                {fieldDef.label}{" "}
                {fieldDef.required && <span className="text-[#E8500A]">*</span>}
              </label>
              <input
                id={fieldDef.key}
                type="text"
                value={fields[fieldDef.key] ?? ""}
                onChange={(e) => handleFieldChange(fieldDef.key, e.target.value)}
                placeholder={fieldDef.placeholder}
                className="w-full border border-[#F0E4D4] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8500A]/20 focus:border-[#E8500A] bg-white text-[#0F2447] placeholder-[#C4A882] transition-colors"
              />
            </div>
          ))}

          <button
            type="button"
            onClick={handleGenerate}
            disabled={loading || !isFormValid()}
            className="w-full mt-2 bg-[#E8500A] hover:bg-[#D44A09] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl px-5 py-2.5 text-sm transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <SpinnerIcon />
                Generating document…
              </>
            ) : (
              "Generate Document →"
            )}
          </button>
        </div>
      )}

      {/* Empty state */}
      {!selectedDoc && (
        <div className="flex flex-col items-center justify-center py-14 px-6 bg-white rounded-2xl border border-[#F0E4D4] text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#FBF5EE] flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-[#E8500A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-base font-bold text-[#0F2447] mb-1.5">
            Your document will appear here
          </h3>
          <p className="text-sm text-[#7A6048] max-w-xs">
            Select a document type above, fill in your details, and Claude AI will generate a professional legal template in seconds.
          </p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-[#FFF5F0] border border-[#F0E4D4] rounded-2xl p-4 text-sm text-[#E8500A] font-medium">
          {error}
        </div>
      )}

      {/* Result */}
      {document && !loading && (
        <div className="bg-white rounded-2xl border border-[#F0E4D4] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-[#F0E4D4] bg-[#FFFCF8]">
            <p className="text-sm font-semibold text-[#0F2447]">{selectedDoc}</p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 border border-[#F0E4D4] rounded-xl hover:bg-white hover:border-[#E8500A]/30 hover:text-[#E8500A] text-[#7A6048] transition-colors"
              >
                {copied ? (
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
                    Copy Text
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleDownload}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-[#E8500A] hover:bg-[#D44A09] text-white rounded-xl transition-colors"
              >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download .txt
              </button>
            </div>
          </div>

          <pre className="px-5 py-4 text-xs text-[#0F2447] leading-relaxed whitespace-pre-wrap font-mono overflow-x-auto max-h-[500px] overflow-y-auto">
            {document}
          </pre>

          <div className="px-5 py-3 border-t border-[#F0E4D4] bg-[#FFFCF8]">
            <p className="text-xs text-[#7A6048] flex items-start gap-1.5">
              <svg className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-[#E8500A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              This is an AI-generated template for reference only. Consult a legal professional before using this document officially. Stamp duty and registration requirements vary by state in India.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
