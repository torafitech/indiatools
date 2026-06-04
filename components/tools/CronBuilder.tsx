"use client";

import { useState } from "react";

const QUICK_PATTERNS = [
  { label: "Every minute",      cron: "* * * * *" },
  { label: "Every 5 minutes",   cron: "*/5 * * * *" },
  { label: "Every 15 minutes",  cron: "*/15 * * * *" },
  { label: "Every hour",        cron: "0 * * * *" },
  { label: "Daily at midnight", cron: "0 0 * * *" },
  { label: "Daily at 9 AM",     cron: "0 9 * * *" },
  { label: "Weekdays at 9 AM",  cron: "0 9 * * 1-5" },
  { label: "Weekly Monday",     cron: "0 9 * * 1" },
  { label: "Monthly 1st",       cron: "0 0 1 * *" },
];

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const HOURS = Array.from({length:24},(_,i)=>String(i).padStart(2,"0"));
const MINS = ["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","20","25","30","35","40","45","50","55"];

function cronToEnglish(cron: string): string {
  const parts = cron.trim().split(/\s+/);
  if (parts.length !== 5) return "Invalid cron expression";
  const [min, hour, dom, month, dow] = parts;

  const isEvery = (v: string) => v === "*";
  const isStep = (v: string) => v.startsWith("*/");
  const getStep = (v: string) => v.split("/")[1];

  if (cron === "* * * * *") return "Every minute";
  if (isStep(min) && isEvery(hour) && isEvery(dom) && isEvery(month) && isEvery(dow))
    return `Every ${getStep(min)} minutes`;
  if (min === "0" && isStep(hour) && isEvery(dom) && isEvery(month) && isEvery(dow))
    return `Every ${getStep(hour)} hours`;

  const timeStr = !isEvery(min) && !isEvery(hour) && !isStep(min) && !isStep(hour)
    ? `at ${String(hour).padStart(2,"0")}:${String(min).padStart(2,"0")}`
    : "";

  if (min === "0" && !isEvery(hour) && isEvery(dom) && isEvery(month) && isEvery(dow))
    return `Every day at ${String(hour).padStart(2,"0")}:00`;

  if (isEvery(dom) && isEvery(month)) {
    if (!isEvery(dow)) {
      const dowNames: Record<string, string> = {
        "1-5": "weekdays","0": "Sunday","1": "Monday","2": "Tuesday","3": "Wednesday",
        "4": "Thursday","5": "Friday","6": "Saturday","0,6": "weekends",
      };
      const dayName = dowNames[dow] ?? `day ${dow}`;
      return timeStr ? `Every ${dayName} ${timeStr}` : `Every ${dayName}`;
    }
    return timeStr ? `Every day ${timeStr}` : "Every day";
  }

  if (!isEvery(dom) && isEvery(month) && isEvery(dow)) {
    return timeStr ? `On the ${dom}${ordinal(dom)} of every month ${timeStr}` : `On the ${dom}${ordinal(dom)} of every month`;
  }

  if (!isEvery(month) && isEvery(dow)) {
    const monthName = MONTHS[(Number(month) || 1) - 1] ?? month;
    return timeStr ? `In ${monthName} on the ${dom}${ordinal(dom)} ${timeStr}` : `In ${monthName} on the ${dom}${ordinal(dom)}`;
  }

  return `${cron} — custom schedule`;
}

function ordinal(n: string): string {
  const num = parseInt(n);
  if (isNaN(num)) return "";
  if (num === 1 || num === 21 || num === 31) return "st";
  if (num === 2 || num === 22) return "nd";
  if (num === 3 || num === 23) return "rd";
  return "th";
}

function getNextRuns(cron: string, count = 5): string[] {
  const parts = cron.trim().split(/\s+/);
  if (parts.length !== 5) return [];
  const [minPart, hourPart, domPart, monthPart, dowPart] = parts;

  function matchesField(value: number, field: string, max: number): boolean {
    if (field === "*") return true;
    if (field.startsWith("*/")) {
      const step = parseInt(field.slice(2));
      return value % step === 0;
    }
    if (field.includes("-")) {
      const [a, b] = field.split("-").map(Number);
      return value >= a && value <= b;
    }
    if (field.includes(",")) {
      return field.split(",").map(Number).includes(value);
    }
    return parseInt(field) === value;
  }

  const results: string[] = [];
  const now = new Date();
  now.setSeconds(0, 0);
  now.setMinutes(now.getMinutes() + 1);

  let candidate = new Date(now);
  let iterations = 0;

  while (results.length < count && iterations < 100000) {
    iterations++;
    const m = candidate.getMinutes();
    const h = candidate.getHours();
    const dom = candidate.getDate();
    const mo = candidate.getMonth() + 1;
    const dow = candidate.getDay();

    if (
      matchesField(m, minPart, 59) &&
      matchesField(h, hourPart, 23) &&
      matchesField(dom, domPart, 31) &&
      matchesField(mo, monthPart, 12) &&
      matchesField(dow, dowPart, 6)
    ) {
      results.push(candidate.toLocaleString("en-IN", {
        weekday: "short", month: "short", day: "numeric",
        hour: "2-digit", minute: "2-digit", hour12: true,
      }));
    }
    candidate = new Date(candidate.getTime() + 60000);
  }

  return results;
}

export function CronBuilder() {
  const [minVal, setMinVal] = useState("*");
  const [hourVal, setHourVal] = useState("*");
  const [domVal, setDomVal] = useState("*");
  const [monthVal, setMonthVal] = useState("*");
  const [dowVal, setDowVal] = useState("*");
  const [copied, setCopied] = useState(false);

  const cron = `${minVal} ${hourVal} ${domVal} ${monthVal} ${dowVal}`;
  const english = cronToEnglish(cron);
  const nextRuns = getNextRuns(cron);

  function applyPattern(pattern: string) {
    const parts = pattern.split(" ");
    if (parts.length === 5) {
      setMinVal(parts[0]); setHourVal(parts[1]); setDomVal(parts[2]);
      setMonthVal(parts[3]); setDowVal(parts[4]);
    }
  }

  function copy() {
    navigator.clipboard.writeText(cron);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-xl border border-[#F0E4D4] p-5">
        <h3 className="text-sm font-bold text-[#0F2447] mb-3">Quick Patterns</h3>
        <div className="flex flex-wrap gap-2">
          {QUICK_PATTERNS.map((p) => (
            <button
              key={p.cron}
              onClick={() => applyPattern(p.cron)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                cron === p.cron ? "bg-[#E8500A] text-white" : "bg-[#FBF5EE] text-[#0F2447] hover:bg-[#F0E4D4]"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#F0E4D4] p-5">
        <h3 className="text-sm font-bold text-[#0F2447] mb-4">Visual Builder</h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            { label: "Minute", value: minVal, set: setMinVal, options: ["*","*/5","*/10","*/15","*/30",...MINS.slice(0,15)] },
            { label: "Hour",   value: hourVal, set: setHourVal, options: ["*","*/2","*/4","*/6","*/12",...HOURS] },
            { label: "Day (Month)", value: domVal, set: setDomVal, options: ["*","*/2","1","5","10","15","20","25","28","L"] },
            { label: "Month", value: monthVal, set: setMonthVal, options: ["*","1","2","3","4","5","6","7","8","9","10","11","12"] },
            { label: "Day (Week)", value: dowVal, set: setDowVal, options: ["*","1-5","0,6","0","1","2","3","4","5","6"] },
          ].map((field) => (
            <div key={field.label}>
              <label className="block text-xs font-semibold text-[#7A6048] mb-1.5">{field.label}</label>
              <select
                value={field.value}
                onChange={(e) => field.set(e.target.value)}
                className="w-full border border-[#F0E4D4] rounded-lg px-2 py-2 text-sm text-[#0F2447] focus:outline-none focus:ring-2 focus:ring-[#E8500A]/30 bg-white"
              >
                {field.options.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#F0E4D4] p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-[#0F2447]">Cron Expression</h3>
          <button
            onClick={copy}
            className="text-xs font-semibold text-[#E8500A] hover:text-[#C94008]"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <div className="font-mono text-lg font-bold text-[#0F2447] bg-[#FBF5EE] rounded-lg px-4 py-3 mb-3 tracking-wide">
          {cron}
        </div>
        <p className="text-sm text-[#7A6048]">
          <span className="font-medium text-[#0F2447]">Meaning: </span>{english}
        </p>
      </div>

      {nextRuns.length > 0 && (
        <div className="bg-white rounded-xl border border-[#F0E4D4] p-5">
          <h3 className="text-sm font-bold text-[#0F2447] mb-3">Next 5 Run Times</h3>
          <ol className="space-y-2">
            {nextRuns.map((run, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-[#0F2447]">
                <span className="w-5 h-5 rounded-full bg-[#E8500A] text-white text-xs flex items-center justify-center font-bold shrink-0">
                  {i + 1}
                </span>
                {run}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
