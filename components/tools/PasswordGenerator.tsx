"use client";

import { useState, useCallback } from "react";

const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER = "abcdefghijklmnopqrstuvwxyz";
const NUMS = "0123456789";
const SYMS = "!@#$%^&*()-_=+[]{}|;:,.<>?";
const SIMILAR = "0Ol1I";

const COMMON = ["password","123456","qwerty","abc123","letmein","monkey","master","dragon","111111","baseball","iloveyou","trustno1","sunshine","princess","welcome","shadow","superman","michael","jessica","password1"];

function scorePassword(pwd: string): { score: 0|1|2|3|4; label: string; color: string; feedback: string[]; timeToCrack: string } {
  const feedback: string[] = [];
  if (!pwd) return { score: 0, label: "—", color: "#d1d5db", feedback: [], timeToCrack: "—" };

  let s = 0;
  if (pwd.length >= 8) s++;
  if (pwd.length >= 12) s++;
  if (pwd.length >= 16) s++;
  if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) s++;
  if (/[0-9]/.test(pwd)) s++;
  if (/[^A-Za-z0-9]/.test(pwd)) s++;

  if (COMMON.includes(pwd.toLowerCase())) { s = 0; feedback.push("This is a commonly known password"); }
  if (/(.)\1{2,}/.test(pwd)) { s = Math.max(0, s - 1); feedback.push("Avoid repeated characters (aaa, 111)"); }
  if (/(?:012|123|234|345|456|567|678|789|890|abc|bcd|cde|qwe|wer|ert)/i.test(pwd)) { s = Math.max(0, s - 1); feedback.push("Avoid sequential patterns (123, abc, qwe)"); }

  if (pwd.length < 12) feedback.push("Use at least 12 characters");
  if (!/[A-Z]/.test(pwd)) feedback.push("Add uppercase letters");
  if (!/[a-z]/.test(pwd)) feedback.push("Add lowercase letters");
  if (!/[0-9]/.test(pwd)) feedback.push("Add numbers");
  if (!/[^A-Za-z0-9]/.test(pwd)) feedback.push("Add symbols (!@#$...)");

  const finalScore = Math.min(4, Math.max(0, Math.floor(s / 1.5))) as 0|1|2|3|4;

  const charSpace =
    (/[a-z]/.test(pwd) ? 26 : 0) +
    (/[A-Z]/.test(pwd) ? 26 : 0) +
    (/[0-9]/.test(pwd) ? 10 : 0) +
    (/[^A-Za-z0-9]/.test(pwd) ? 32 : 0);
  const entropy = pwd.length * Math.log2(charSpace || 1);
  const guessesPerSec = 1e11;
  const seconds = Math.pow(2, entropy) / guessesPerSec;

  let timeToCrack: string;
  if (seconds < 1) timeToCrack = "instantly";
  else if (seconds < 60) timeToCrack = `${Math.round(seconds)}s`;
  else if (seconds < 3600) timeToCrack = `${Math.round(seconds / 60)}min`;
  else if (seconds < 86400) timeToCrack = `${Math.round(seconds / 3600)}h`;
  else if (seconds < 31536000) timeToCrack = `${Math.round(seconds / 86400)} days`;
  else if (seconds < 3153600000) timeToCrack = `${Math.round(seconds / 31536000)} years`;
  else timeToCrack = "centuries";

  const labels = ["Very Weak", "Weak", "Fair", "Strong", "Very Strong"];
  const colors = ["#ef4444", "#f97316", "#f59e0b", "#22c55e", "#16a34a"];

  return { score: finalScore, label: labels[finalScore], color: colors[finalScore], feedback, timeToCrack };
}

function generate(length: number, upper: boolean, lower: boolean, nums: boolean, syms: boolean, noSimilar: boolean): string {
  let chars = "";
  if (upper) chars += noSimilar ? UPPER.split("").filter((c) => !SIMILAR.includes(c)).join("") : UPPER;
  if (lower) chars += noSimilar ? LOWER.split("").filter((c) => !SIMILAR.includes(c)).join("") : LOWER;
  if (nums) chars += noSimilar ? NUMS.split("").filter((c) => !SIMILAR.includes(c)).join("") : NUMS;
  if (syms) chars += SYMS;
  if (!chars) return "";

  const arr = new Uint32Array(length);
  crypto.getRandomValues(arr);
  return Array.from(arr).map((n) => chars[n % chars.length]).join("");
}

export function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useNums, setUseNums] = useState(true);
  const [useSyms, setUseSyms] = useState(false);
  const [noSimilar, setNoSimilar] = useState(false);
  const [count, setCount] = useState<1|5|10>(1);
  const [passwords, setPasswords] = useState<string[]>([]);
  const [copied, setCopied] = useState<number | null>(null);
  const [testPwd, setTestPwd] = useState("");

  const generate_ = useCallback(() => {
    const list: string[] = [];
    for (let i = 0; i < count; i++) {
      list.push(generate(length, useUpper, useLower, useNums, useSyms, noSimilar));
    }
    setPasswords(list);
  }, [length, useUpper, useLower, useNums, useSyms, noSimilar, count]);

  function copyPwd(idx: number, pwd: string) {
    navigator.clipboard.writeText(pwd);
    setCopied(idx);
    setTimeout(() => setCopied(null), 1500);
  }

  const testResult = scorePassword(testPwd);

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-xl border border-[#F0E4D4] p-5">
        <div className="flex items-start justify-between mb-1">
          <label className="text-sm font-semibold text-[#0F2447]">Length: {length}</label>
          <span className="text-xs text-[#7A6048]">8 – 64 characters</span>
        </div>
        <input
          type="range" min={8} max={64} value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-full accent-[#E8500A] mb-4"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
          {[
            { label: "Uppercase (A-Z)", state: useUpper, set: setUseUpper },
            { label: "Lowercase (a-z)", state: useLower, set: setUseLower },
            { label: "Numbers (0-9)", state: useNums, set: setUseNums },
            { label: "Symbols (!@#…)", state: useSyms, set: setUseSyms },
            { label: "Exclude similar (0Ol1I)", state: noSimilar, set: setNoSimilar },
          ].map((opt) => (
            <label key={opt.label} className="flex items-center gap-2 text-sm text-[#0F2447] cursor-pointer">
              <input
                type="checkbox" checked={opt.state}
                onChange={(e) => opt.set(e.target.checked)}
                className="accent-[#E8500A] w-4 h-4"
              />
              {opt.label}
            </label>
          ))}
        </div>

        <div className="flex items-center gap-3 mb-4">
          <span className="text-sm text-[#0F2447] font-medium">Generate:</span>
          {([1, 5, 10] as const).map((n) => (
            <button
              key={n}
              onClick={() => setCount(n)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${count === n ? "bg-[#E8500A] text-white" : "bg-[#FBF5EE] text-[#0F2447] hover:bg-[#F0E4D4]"}`}
            >
              {n === 1 ? "1 password" : `${n} passwords`}
            </button>
          ))}
        </div>

        <button
          onClick={generate_}
          disabled={!useUpper && !useLower && !useNums && !useSyms}
          className="w-full py-3 bg-[#E8500A] text-white rounded-lg font-semibold text-sm hover:bg-[#C94008] transition-colors disabled:opacity-50"
        >
          Generate Password{count > 1 ? "s" : ""}
        </button>
      </div>

      {passwords.length > 0 && (
        <div className="bg-white rounded-xl border border-[#F0E4D4] p-5 space-y-2">
          {passwords.map((pwd, i) => (
            <div key={i} className="flex items-center gap-3 border border-[#F0E4D4] rounded-lg px-3 py-2.5">
              <span className="flex-1 font-mono text-sm text-[#0F2447] break-all">{pwd}</span>
              <button
                onClick={() => copyPwd(i, pwd)}
                className="shrink-0 text-xs font-semibold text-[#E8500A] hover:text-[#C94008]"
              >
                {copied === i ? "Copied!" : "Copy"}
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="bg-white rounded-xl border border-[#F0E4D4] p-5">
        <h3 className="text-sm font-bold text-[#0F2447] mb-3">Password Strength Tester</h3>
        <input
          type="text"
          value={testPwd}
          onChange={(e) => setTestPwd(e.target.value)}
          placeholder="Type or paste a password to test…"
          className="w-full border border-[#F0E4D4] rounded-lg px-3 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#E8500A]/30 text-[#0F2447]"
        />

        {testPwd && (
          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-4">
              <div className="flex-1 h-2 bg-[#F0E4D4] rounded-full overflow-hidden">
                <div
                  className="h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${(testResult.score / 4) * 100}%`,
                    backgroundColor: testResult.color,
                  }}
                />
              </div>
              <span className="text-sm font-bold w-24" style={{ color: testResult.color }}>
                {testResult.label}
              </span>
            </div>
            <p className="text-sm text-[#7A6048]">
              Time to crack at 100B guesses/sec:{" "}
              <span className="font-semibold text-[#0F2447]">{testResult.timeToCrack}</span>
            </p>
            {testResult.feedback.length > 0 && (
              <ul className="space-y-1">
                {testResult.feedback.map((f, i) => (
                  <li key={i} className="text-xs text-[#E8500A] bg-[#FFF8F2] rounded px-2 py-1">
                    ⚠ {f}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      <div className="bg-[#FBF5EE] rounded-xl border border-[#F0E4D4] p-4">
        <p className="text-xs text-[#7A6048] flex items-start gap-2">
          <span className="text-green-600 text-base">🔒</span>
          Your passwords are generated and tested entirely in your browser using the Web Crypto API (crypto.getRandomValues). Nothing is sent to any server. We never see, store, or transmit your passwords.
        </p>
      </div>
    </div>
  );
}
