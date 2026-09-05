"use client";

import { useState } from "react";
import Link from "next/link";
import type { AIResource, ResourceType } from "@/data/ai-resources";
import { RESOURCE_TYPE_META } from "@/data/ai-resources";

const TYPE_FILTERS: { key: ResourceType | "All"; label: string }[] = [
  { key: "All", label: "All" },
  { key: "custom-gpt", label: "Custom GPT" },
  { key: "claude-skill", label: "Claude Skill" },
  { key: "ai-agent", label: "AI Agent" },
  { key: "system-prompt", label: "System Prompt" },
];

export function AIResourceGrid({ resources, categories }: { resources: AIResource[]; categories: string[] }) {
  const [typeFilter, setTypeFilter] = useState<ResourceType | "All">("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = resources.filter((r) => {
    if (typeFilter !== "All" && r.type !== typeFilter) return false;
    if (categoryFilter !== "All" && r.category !== categoryFilter) return false;
    if (query && !`${r.title} ${r.tagline}`.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      {/* Search */}
      <div className="mb-5">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search resources — e.g. sales, invoice, support..."
          className="w-full px-4 py-3 rounded-xl border border-[#F0E4D4] text-sm text-[#1C1209] placeholder:text-[#B7A692] focus:outline-none focus:ring-2 focus:ring-[#E8500A]/30 focus:border-[#E8500A]"
        />
      </div>

      {/* Type filter pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 mb-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {TYPE_FILTERS.map((f) => {
          const isActive = typeFilter === f.key;
          const meta = f.key !== "All" ? RESOURCE_TYPE_META[f.key] : null;
          return (
            <button
              key={f.key}
              onClick={() => setTypeFilter(f.key)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 border ${
                isActive
                  ? "bg-[#0F2447] text-white border-[#0F2447] shadow-sm"
                  : "bg-white text-[#7A6048] border-[#F0E4D4] hover:border-[#E8500A] hover:text-[#E8500A]"
              }`}
            >
              {meta && <span>{meta.icon}</span>}
              {f.label}
            </button>
          );
        })}
      </div>

      {/* Category filter pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 mb-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {["All", ...categories].map((cat) => {
          const isActive = categoryFilter === cat;
          return (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 border ${
                isActive
                  ? "bg-[#E8500A] text-white border-[#E8500A]"
                  : "bg-white text-[#7A6048] border-[#F0E4D4] hover:border-[#E8500A] hover:text-[#E8500A]"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Resource cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((r) => {
          const meta = RESOURCE_TYPE_META[r.type];
          const isNew = Date.now() - new Date(r.dateAdded).getTime() < 1000 * 60 * 60 * 24 * 21;
          return (
            <Link
              key={r.slug}
              href={`/ai-resources/${r.slug}`}
              className="group relative bg-white rounded-2xl border border-[#F0E4D4] p-5 transition-all duration-200 hover:border-[#E8500A] hover:-translate-y-0.5 hover:shadow-card-hover"
            >
              {isNew && (
                <span className="absolute top-4 right-4 bg-gradient-to-r from-[#E8500A] to-orange-400 text-white text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wide uppercase shadow-sm">
                  New
                </span>
              )}
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${meta.iconBg} ${meta.iconText} mb-4 text-lg`}>
                {meta.icon}
              </div>
              <h2 className="font-bold text-[#1C1209] mb-1.5 text-base group-hover:text-[#E8500A] transition-colors duration-150">
                {r.title}
              </h2>
              <p className="text-sm text-[#7A6048] mb-4 leading-relaxed">{r.tagline}</p>
              <div className="flex items-center justify-between">
                <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ring-1 ${meta.badge}`}>
                  {meta.label}
                </span>
                <span className="text-[#E8500A] text-sm font-semibold group-hover:translate-x-0.5 transition-transform duration-150">
                  View →
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-[#7A6048]">
          <p className="text-4xl mb-3">🔍</p>
          <p className="font-medium">No resources match that filter.</p>
        </div>
      )}
    </div>
  );
}
