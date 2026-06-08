"use client";

import { useState } from "react";
import { attendancePct, safeBunks, classesNeeded } from "@/lib/calculations/attendance";

interface Subject {
  id: number;
  name: string;
  attended: string;
  total: string;
}

const TARGETS = [75, 80, 85, 90];

const PLACEHOLDERS = ["e.g. Mathematics", "e.g. Physics", "e.g. Chemistry", "e.g. English"];

function defaultSubjects(): Subject[] {
  return [1, 2, 3, 4].map((id) => ({ id, name: "", attended: "", total: "" }));
}

type Status = "safe" | "warning" | "risk" | "none";

function statusMeta(status: Status) {
  if (status === "safe")    return { label: "Safe",    bg: "bg-emerald-100 text-emerald-800", dot: "bg-emerald-500" };
  if (status === "warning") return { label: "Warning", bg: "bg-amber-100 text-amber-800",    dot: "bg-amber-500"   };
  if (status === "risk")    return { label: "At Risk", bg: "bg-red-100 text-red-800",         dot: "bg-red-500"     };
  return { label: "—", bg: "bg-gray-100 text-gray-500", dot: "bg-gray-300" };
}

export function AttendanceCalculator() {
  const [target, setTarget] = useState(75);
  const [subjects, setSubjects] = useState<Subject[]>(defaultSubjects);

  const targetDecimal = target / 100;

  const computed = subjects.map((s) => {
    const attended = Math.max(0, parseInt(s.attended) || 0);
    const total    = Math.max(0, parseInt(s.total)    || 0);
    const isValid  = total > 0 && attended <= total;
    const pct      = isValid ? attendancePct(attended, total) : 0;
    const status: Status = !isValid
      ? "none"
      : pct >= target
      ? "safe"
      : pct >= target - 5
      ? "warning"
      : "risk";
    const bunks  = isValid && status === "safe"                          ? safeBunks(attended, total, targetDecimal) : 0;
    const needed = isValid && (status === "warning" || status === "risk") ? classesNeeded(attended, total, targetDecimal) : 0;
    return { ...s, attended, total, isValid, pct, status, bunks, needed };
  });

  const valid = computed.filter((s) => s.isValid);
  const totalAttended = valid.reduce((sum, s) => sum + s.attended, 0);
  const totalClasses  = valid.reduce((sum, s) => sum + s.total,    0);
  const overallPct    = attendancePct(totalAttended, totalClasses);
  const overallStatus: Status =
    valid.length === 0
      ? "none"
      : overallPct >= target
      ? "safe"
      : overallPct >= target - 5
      ? "warning"
      : "risk";
  const totalBunks  = computed.filter((s) => s.status === "safe").reduce((sum, s) => sum + s.bunks, 0);
  const atRiskCount = computed.filter((s) => s.status === "risk" || s.status === "warning").length;

  const update = (id: number, field: keyof Subject, value: string) =>
    setSubjects((prev) => prev.map((s) => (s.id === id ? { ...s, [field]: value } : s)));

  const addSubject = () => {
    if (subjects.length >= 12) return;
    const newId = Math.max(...subjects.map((s) => s.id), 0) + 1;
    setSubjects((prev) => [...prev, { id: newId, name: "", attended: "", total: "" }]);
  };

  const removeSubject = (id: number) => {
    if (subjects.length <= 1) return;
    setSubjects((prev) => prev.filter((s) => s.id !== id));
  };

  const overallMeta = statusMeta(overallStatus);

  return (
    <div className="space-y-6">
      {/* Target toggle */}
      <div className="bg-white rounded-xl border border-[#F0E4D4] p-4">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Your college&apos;s minimum attendance requirement
        </p>
        <div className="flex flex-wrap gap-2">
          {TARGETS.map((t) => (
            <button
              key={t}
              onClick={() => setTarget(t)}
              className={`px-5 py-2 rounded-lg font-bold text-sm transition-all ${
                target === t
                  ? "bg-[#0F2447] text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {t}%
            </button>
          ))}
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-3 lg:gap-6 lg:items-start">
        {/* Subject rows */}
        <div className="lg:col-span-2 space-y-3">
          {computed.map((s, idx) => {
            const meta = statusMeta(s.status);
            return (
              <div
                key={s.id}
                className="bg-white rounded-xl border border-[#F0E4D4] p-4"
              >
                {/* Name row */}
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={s.name}
                    onChange={(e) => update(s.id, "name", e.target.value)}
                    placeholder={PLACEHOLDERS[idx] ?? `Subject ${idx + 1}`}
                    className="flex-1 text-sm font-medium text-gray-800 placeholder-gray-400 bg-gray-50 rounded-lg px-3 py-2 border border-gray-200 focus:outline-none focus:border-[#E8500A] transition-colors"
                  />
                  {subjects.length > 1 && (
                    <button
                      onClick={() => removeSubject(s.id)}
                      className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors text-lg"
                      aria-label="Remove subject"
                    >
                      ×
                    </button>
                  )}
                </div>

                {/* Inputs + result */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-gray-500 font-medium whitespace-nowrap">Attended</span>
                    <input
                      type="number"
                      min={0}
                      value={s.attended}
                      onChange={(e) => update(s.id, "attended", e.target.value)}
                      placeholder="65"
                      className="w-16 text-center text-sm font-bold text-gray-800 bg-gray-50 rounded-lg px-2 py-1.5 border border-gray-200 focus:outline-none focus:border-[#E8500A] transition-colors"
                    />
                  </div>
                  <span className="text-gray-400 font-bold">/</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-gray-500 font-medium whitespace-nowrap">Total</span>
                    <input
                      type="number"
                      min={0}
                      value={s.total}
                      onChange={(e) => update(s.id, "total", e.target.value)}
                      placeholder="80"
                      className="w-16 text-center text-sm font-bold text-gray-800 bg-gray-50 rounded-lg px-2 py-1.5 border border-gray-200 focus:outline-none focus:border-[#E8500A] transition-colors"
                    />
                  </div>

                  {s.isValid && (
                    <div className="ml-auto flex items-center gap-2 flex-shrink-0">
                      <span className="text-lg font-extrabold text-gray-900 tabular-nums">
                        {s.pct.toFixed(1)}%
                      </span>
                      <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${meta.bg}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
                        {meta.label}
                      </span>
                    </div>
                  )}
                </div>

                {/* Info line */}
                {s.isValid && s.status === "safe" && (
                  <p className="mt-2 text-xs text-emerald-700 font-medium">
                    {s.bunks > 0
                      ? `✓ Can bunk ${s.bunks} more class${s.bunks !== 1 ? "es" : ""}`
                      : "✓ On target — no bunks available"}
                  </p>
                )}
                {s.isValid && (s.status === "warning" || s.status === "risk") && (
                  <p className="mt-2 text-xs text-red-600 font-medium">
                    ↑ Attend {s.needed} consecutive class{s.needed !== 1 ? "es" : ""} to reach {target}%
                  </p>
                )}
                {s.attended > s.total && s.total > 0 && (
                  <p className="mt-2 text-xs text-amber-600 font-medium">
                    ⚠ Attended cannot exceed total classes
                  </p>
                )}
              </div>
            );
          })}

          {subjects.length < 12 && (
            <button
              onClick={addSubject}
              className="w-full py-3 rounded-xl border-2 border-dashed border-gray-200 text-gray-400 hover:border-[#E8500A] hover:text-[#E8500A] text-sm font-semibold transition-colors"
            >
              + Add Subject {subjects.length < 12 ? `(${subjects.length}/12)` : ""}
            </button>
          )}
        </div>

        {/* Summary panel */}
        <div className="mt-6 lg:mt-0 lg:sticky lg:top-6">
          <div className="bg-[#0F2447] text-white rounded-2xl p-6">
            <h3 className="font-bold text-sm uppercase tracking-wide text-white/60 mb-5">
              Overall Summary
            </h3>

            {/* Big number */}
            <div className="text-center mb-6">
              <p className="text-5xl font-extrabold tabular-nums tracking-tight">
                {valid.length > 0 ? overallPct.toFixed(1) : "—"}
                {valid.length > 0 && <span className="text-3xl">%</span>}
              </p>
              <p className="text-white/50 text-xs mt-1 font-medium uppercase tracking-wide">
                Overall Attendance
              </p>
              {valid.length > 0 && (
                <span className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full mt-3 ${
                  overallStatus === "safe"    ? "bg-emerald-500/20 text-emerald-300" :
                  overallStatus === "warning" ? "bg-amber-500/20 text-amber-300"    :
                  overallStatus === "risk"    ? "bg-red-500/20 text-red-300"         :
                  "bg-white/10 text-white/50"
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${overallMeta.dot} opacity-80`} />
                  {overallMeta.label}
                </span>
              )}
            </div>

            {/* Stats */}
            <div className="space-y-3 text-sm border-t border-white/10 pt-5 mb-5">
              <div className="flex justify-between items-center">
                <span className="text-white/50">Target</span>
                <span className="font-bold text-white">{target}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/50">Subjects tracked</span>
                <span className="font-bold text-white">{valid.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/50">Safe bunks total</span>
                <span className={`font-bold ${totalBunks > 0 ? "text-emerald-400" : "text-white/40"}`}>
                  {totalBunks}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/50">Subjects at risk</span>
                <span className={`font-bold ${atRiskCount > 0 ? "text-red-400" : "text-white/40"}`}>
                  {atRiskCount}
                </span>
              </div>
            </div>

            {/* Message */}
            <div className="bg-white/8 rounded-xl p-4 text-sm leading-relaxed text-white/80">
              {valid.length === 0
                ? "Enter attendance data above to see your summary."
                : atRiskCount === 0
                ? overallPct >= target
                  ? `You're on track across all ${valid.length} subject${valid.length !== 1 ? "s" : ""}. ${totalBunks > 0 ? `${totalBunks} total bunk${totalBunks !== 1 ? "s" : ""} available.` : "No bunks to spare."}`
                  : `Almost there — just ${classesNeeded(totalAttended, totalClasses, targetDecimal)} consecutive classes needed overall.`
                : `${atRiskCount} subject${atRiskCount !== 1 ? "s" : ""} need${atRiskCount === 1 ? "s" : ""} attention. Focus on those first.`
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
