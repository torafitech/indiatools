"use client";

import { useState } from "react";

interface Analysis {
  score: number;
  openRatePrediction: string;
  alternatives: string[];
  explanation: string;
  flags: { type: "warning" | "success"; message: string }[];
}

const SPAM_WORDS = [
  "free","winner","won","prize","claim","urgent","act now","limited time","exclusive offer",
  "guaranteed","100%","no cost","risk-free","buy now","order now","click here","subscribe",
  "earn money","extra income","fast cash","make money","financial freedom","debt free",
  "lose weight","weight loss","diet","miracle","amazing","incredible","unbelievable",
  "you have been selected","congratulations","dear friend","dear member","increase sales",
  "double your","triple your","as seen on","be your own boss","work from home",
  "cheap","lowest price","best price","penny","bargain","discount","save big",
  "for free","no obligation","no purchase","once in a lifetime","special promotion",
];

function analyzeClientSide(subject: string) {
  const flags: { type: "warning" | "success"; message: string }[] = [];
  const lower = subject.toLowerCase();

  if (subject.length === 0) return { flags: [], spamWords: [], quickScore: 0 };

  const spamFound = SPAM_WORDS.filter((w) => lower.includes(w));
  spamFound.forEach((w) =>
    flags.push({ type: "warning", message: `Spam trigger word: "${w}"` })
  );

  const len = subject.length;
  if (len < 20) flags.push({ type: "warning", message: "Too short — under 20 characters" });
  else if (len > 70) flags.push({ type: "warning", message: "Too long — over 70 characters may get truncated on mobile" });
  else flags.push({ type: "success", message: `Good length: ${len} characters` });

  const emojiCount = [...subject].filter((c) => /\p{Emoji}/u.test(c)).length;
  if (emojiCount > 2) flags.push({ type: "warning", message: `Too many emojis (${emojiCount}) — use 1 max` });
  else if (emojiCount === 1) flags.push({ type: "success", message: "One emoji — good for attention" });

  if (/[A-Z]{3,}/.test(subject)) flags.push({ type: "warning", message: "ALL CAPS detected — triggers spam filters" });

  if (/\?$/.test(subject.trim())) flags.push({ type: "success", message: "Question format — good for curiosity" });

  const urgencyWords = ["today","now","deadline","expires","last chance","ending soon","hours left"];
  if (urgencyWords.some((w) => lower.includes(w))) {
    if (spamFound.length === 0) flags.push({ type: "success", message: "Urgency language — can boost open rates when genuine" });
  }

  if (/\d+/.test(subject)) flags.push({ type: "success", message: "Contains a number — specificity increases trust" });

  let quickScore = 60;
  quickScore -= spamFound.length * 10;
  if (len >= 30 && len <= 55) quickScore += 10;
  if (emojiCount === 1) quickScore += 5;
  if (/[A-Z]{3,}/.test(subject)) quickScore -= 15;
  quickScore = Math.min(100, Math.max(0, quickScore));

  return { flags, spamWords: spamFound, quickScore };
}

function ScoreRing({ score }: { score: number }) {
  const color = score >= 75 ? "#22c55e" : score >= 50 ? "#f59e0b" : "#ef4444";
  const label = score >= 75 ? "Strong" : score >= 50 ? "Average" : score >= 25 ? "Weak" : "Poor";
  const r = 44;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;

  return (
    <div className="flex flex-col items-center">
      <svg width="110" height="110" viewBox="0 0 110 110">
        <circle cx="55" cy="55" r={r} fill="none" stroke="#F0E4D4" strokeWidth="10" />
        <circle
          cx="55" cy="55" r={r} fill="none" stroke={color} strokeWidth="10"
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
          transform="rotate(-90 55 55)"
          style={{ transition: "stroke-dasharray 0.6s ease" }}
        />
        <text x="55" y="52" textAnchor="middle" dominantBaseline="middle" fontSize="22" fontWeight="700" fill={color}>
          {score}
        </text>
        <text x="55" y="68" textAnchor="middle" fontSize="11" fill="#7A6048">/100</text>
      </svg>
      <span className="text-sm font-semibold mt-1" style={{ color }}>{label}</span>
    </div>
  );
}

export function EmailSubjectTester() {
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState<Analysis | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState<number | null>(null);

  const { flags, quickScore } = analyzeClientSide(subject);

  async function runAIAnalysis() {
    if (!subject.trim()) return;
    setLoading(true);
    setError("");
    setAiResult(null);
    try {
      const res = await fetch("/api/subject-tester", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setAiResult(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Analysis failed");
    } finally {
      setLoading(false);
    }
  }

  function copyAlt(idx: number, text: string) {
    navigator.clipboard.writeText(text);
    setCopied(idx);
    setTimeout(() => setCopied(null), 1500);
  }

  const displayScore = aiResult?.score ?? quickScore;

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-xl border border-[#F0E4D4] p-5">
        <label className="block text-sm font-semibold text-[#0F2447] mb-2">
          Email Subject Line
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={subject}
            onChange={(e) => { setSubject(e.target.value); setAiResult(null); }}
            placeholder="Enter your email subject line..."
            className="flex-1 border border-[#F0E4D4] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8500A]/30 text-[#0F2447]"
            maxLength={150}
          />
          <button
            onClick={runAIAnalysis}
            disabled={loading || !subject.trim()}
            className="px-4 py-2.5 bg-[#E8500A] text-white rounded-lg text-sm font-semibold hover:bg-[#C94008] transition-colors disabled:opacity-50"
          >
            {loading ? "Analysing…" : "AI Analyse"}
          </button>
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-xs text-[#7A6048]">Instant analysis below • AI score with alternatives on button click</span>
          <span className={`text-xs font-medium ${subject.length > 70 ? "text-red-500" : "text-[#7A6048]"}`}>
            {subject.length} chars
          </span>
        </div>
      </div>

      {subject.length > 0 && (
        <div className="bg-white rounded-xl border border-[#F0E4D4] p-5">
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <ScoreRing score={displayScore} />

            <div className="flex-1 space-y-2">
              <p className="text-xs font-semibold text-[#7A6048] uppercase tracking-wider mb-3">
                {aiResult ? "AI Score & Analysis" : "Instant Analysis"}
              </p>
              {flags.map((f, i) => (
                <div key={i} className={`flex items-start gap-2 text-sm rounded-lg px-3 py-2 ${
                  f.type === "warning" ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"
                }`}>
                  <span className="mt-0.5">{f.type === "warning" ? "⚠" : "✓"}</span>
                  <span>{f.message}</span>
                </div>
              ))}
              {aiResult?.explanation && (
                <p className="text-sm text-[#7A6048] mt-3 bg-[#FBF5EE] rounded-lg px-3 py-2">
                  {aiResult.explanation}
                </p>
              )}
              {aiResult?.openRatePrediction && (
                <p className="text-sm font-medium text-[#0F2447]">
                  Predicted open rate: <span className="text-[#E8500A]">{aiResult.openRatePrediction}</span>
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {aiResult?.alternatives && aiResult.alternatives.length > 0 && (
        <div className="bg-white rounded-xl border border-[#F0E4D4] p-5">
          <h3 className="text-sm font-bold text-[#0F2447] mb-3">5 AI-Generated Alternatives</h3>
          <div className="space-y-2">
            {aiResult.alternatives.map((alt, i) => (
              <div key={i} className="flex items-center justify-between gap-3 border border-[#F0E4D4] rounded-lg px-3 py-2.5">
                <span className="text-sm text-[#0F2447] flex-1">{alt}</span>
                <button
                  onClick={() => copyAlt(i, alt)}
                  className="text-xs text-[#E8500A] hover:text-[#C94008] font-medium shrink-0"
                >
                  {copied === i ? "Copied!" : "Copy"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
          {error}
        </div>
      )}
    </div>
  );
}
