"use client";

import { useState } from "react";

interface AgendaItem {
  item: string;
  duration: number;
  owner: string;
  notes: string;
}

interface AgendaResult {
  agenda: AgendaItem[];
  parkingLot: string;
  actionItemTemplate: string;
}

const MEETING_TYPES = ["Sprint Review", "Brainstorm", "Status Update", "1:1", "Planning", "All-Hands", "Kick-off", "Retrospective"];
const DURATIONS = [30, 45, 60, 90, 120];

export function MeetingAgendaGenerator() {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState(60);
  const [attendees, setAttendees] = useState(5);
  const [meetingType, setMeetingType] = useState("Status Update");
  const [topics, setTopics] = useState([{ topic: "", notes: "" }]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AgendaResult | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  function addTopic() {
    setTopics([...topics, { topic: "", notes: "" }]);
  }

  function removeTopic(i: number) {
    setTopics(topics.filter((_, idx) => idx !== i));
  }

  function updateTopic(i: number, key: "topic" | "notes", val: string) {
    setTopics(topics.map((t, idx) => idx === i ? { ...t, [key]: val } : t));
  }

  async function generate() {
    const validTopics = topics.filter((t) => t.topic.trim());
    if (!title.trim() || validTopics.length === 0) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/meeting-agenda", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, duration, attendees, meetingType, topics: validTopics }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResult(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Generation failed");
    } finally {
      setLoading(false);
    }
  }

  function toMarkdown() {
    if (!result) return "";
    const lines = [
      `# ${title}`,
      `**Type:** ${meetingType} | **Duration:** ${duration} min | **Attendees:** ${attendees}`,
      "",
      "## Agenda",
      "",
      "| # | Topic | Duration | Owner | Notes |",
      "|---|-------|----------|-------|-------|",
      ...result.agenda.map((item, i) =>
        `| ${i + 1} | ${item.item} | ${item.duration} min | ${item.owner} | ${item.notes} |`
      ),
      "",
    ];
    if (result.parkingLot) lines.push("## Parking Lot", result.parkingLot, "");
    if (result.actionItemTemplate) lines.push("## Action Items", result.actionItemTemplate);
    return lines.join("\n");
  }

  function copyMarkdown() {
    navigator.clipboard.writeText(toMarkdown());
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  const totalMins = result?.agenda.reduce((s, a) => s + a.duration, 0) ?? 0;

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-xl border border-[#F0E4D4] p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-[#7A6048] mb-1">Meeting Title</label>
            <input
              type="text" value={title} onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Q3 Sprint Planning — Team Orion"
              className="w-full border border-[#F0E4D4] rounded-lg px-3 py-2.5 text-sm text-[#0F2447] focus:outline-none focus:ring-2 focus:ring-[#E8500A]/30"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#7A6048] mb-1">Meeting Type</label>
            <select
              value={meetingType} onChange={(e) => setMeetingType(e.target.value)}
              className="w-full border border-[#F0E4D4] rounded-lg px-3 py-2.5 text-sm text-[#0F2447] focus:outline-none bg-white"
            >
              {MEETING_TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#7A6048] mb-1">Duration (minutes)</label>
            <select
              value={duration} onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full border border-[#F0E4D4] rounded-lg px-3 py-2.5 text-sm text-[#0F2447] focus:outline-none bg-white"
            >
              {DURATIONS.map((d) => <option key={d} value={d}>{d} min</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#7A6048] mb-1">Number of Attendees</label>
            <input
              type="number" value={attendees} min={2} max={200}
              onChange={(e) => setAttendees(Number(e.target.value))}
              className="w-full border border-[#F0E4D4] rounded-lg px-3 py-2.5 text-sm text-[#0F2447] focus:outline-none focus:ring-2 focus:ring-[#E8500A]/30"
            />
          </div>
        </div>

        <h3 className="text-sm font-bold text-[#0F2447] mb-2">Topics to Cover</h3>
        <div className="space-y-2 mb-3">
          {topics.map((t, i) => (
            <div key={i} className="flex gap-2">
              <div className="flex-1 space-y-1">
                <input
                  type="text" value={t.topic}
                  onChange={(e) => updateTopic(i, "topic", e.target.value)}
                  placeholder={`Topic ${i + 1}…`}
                  className="w-full border border-[#F0E4D4] rounded-lg px-3 py-2 text-sm text-[#0F2447] focus:outline-none focus:ring-2 focus:ring-[#E8500A]/30"
                />
                <input
                  type="text" value={t.notes}
                  onChange={(e) => updateTopic(i, "notes", e.target.value)}
                  placeholder="Brief note (optional)…"
                  className="w-full border border-[#F0E4D4] rounded-lg px-3 py-1.5 text-xs text-[#7A6048] focus:outline-none focus:ring-2 focus:ring-[#E8500A]/20"
                />
              </div>
              <button
                onClick={() => removeTopic(i)}
                disabled={topics.length === 1}
                className="text-red-400 hover:text-red-600 disabled:opacity-30 text-lg self-start mt-1 px-1"
              >×</button>
            </div>
          ))}
        </div>
        <div className="flex gap-3">
          <button onClick={addTopic} className="text-sm text-[#E8500A] font-medium hover:text-[#C94008]">
            + Add topic
          </button>
        </div>

        <button
          onClick={generate}
          disabled={loading || !title.trim() || topics.every((t) => !t.topic.trim())}
          className="w-full mt-4 py-3 bg-[#E8500A] text-white rounded-lg font-semibold text-sm hover:bg-[#C94008] transition-colors disabled:opacity-50"
        >
          {loading ? "Generating agenda…" : "Generate Agenda with AI"}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">{error}</div>
      )}

      {result && (
        <div className="bg-white rounded-xl border border-[#F0E4D4] p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-[#0F2447]">{title}</h3>
              <p className="text-xs text-[#7A6048]">{meetingType} · {duration} min · {attendees} attendees · Allocated: {totalMins} min</p>
            </div>
            <button
              onClick={copyMarkdown}
              className="text-xs font-semibold text-[#E8500A] hover:text-[#C94008] border border-[#E8500A] rounded-lg px-3 py-1.5"
            >
              {copied ? "Copied!" : "Copy Markdown"}
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#F0E4D4]">
                  <th className="text-left py-2 pr-3 text-xs font-semibold text-[#7A6048] w-6">#</th>
                  <th className="text-left py-2 pr-3 text-xs font-semibold text-[#7A6048]">Agenda Item</th>
                  <th className="text-left py-2 pr-3 text-xs font-semibold text-[#7A6048] w-20">Duration</th>
                  <th className="text-left py-2 pr-3 text-xs font-semibold text-[#7A6048] w-28">Owner</th>
                  <th className="text-left py-2 text-xs font-semibold text-[#7A6048]">Notes</th>
                </tr>
              </thead>
              <tbody>
                {result.agenda.map((item, i) => (
                  <tr key={i} className="border-b border-[#FBF5EE] hover:bg-[#FBF5EE] transition-colors">
                    <td className="py-2.5 pr-3 text-[#7A6048] text-xs">{i + 1}</td>
                    <td className="py-2.5 pr-3 font-medium text-[#0F2447]">{item.item}</td>
                    <td className="py-2.5 pr-3 text-[#7A6048]">
                      <span className="bg-[#FBF5EE] rounded px-2 py-0.5 text-xs font-medium">{item.duration} min</span>
                    </td>
                    <td className="py-2.5 pr-3 text-[#7A6048] text-xs">{item.owner}</td>
                    <td className="py-2.5 text-xs text-[#7A6048]">{item.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {result.parkingLot && (
            <div className="mt-4 bg-[#FBF5EE] rounded-lg p-3">
              <p className="text-xs font-bold text-[#0F2447] mb-1">Parking Lot</p>
              <p className="text-xs text-[#7A6048]">{result.parkingLot}</p>
            </div>
          )}

          {result.actionItemTemplate && (
            <div className="mt-3 bg-[#FBF5EE] rounded-lg p-3">
              <p className="text-xs font-bold text-[#0F2447] mb-1">Action Item Template</p>
              <p className="text-xs text-[#7A6048] whitespace-pre-line">{result.actionItemTemplate}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
