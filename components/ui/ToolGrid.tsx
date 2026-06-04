"use client";

import { useState } from "react";
import Link from "next/link";

type Tool = {
  slug: string;
  name: string;
  description: string;
  category: string;
  popular: boolean;
  icon: string;
  status: string;
};

type CategoryConfig = {
  iconBg: string;
  iconText: string;
  badge: string;
  hoverBorder: string;
  dot: string;
};

const CATEGORY: Record<string, CategoryConfig> = {
  Finance: {
    iconBg: "bg-blue-50",
    iconText: "text-blue-600",
    badge: "bg-blue-50 text-blue-700 ring-blue-100",
    hoverBorder: "hover:border-blue-200",
    dot: "bg-blue-500",
  },
  Health: {
    iconBg: "bg-emerald-50",
    iconText: "text-emerald-600",
    badge: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    hoverBorder: "hover:border-emerald-200",
    dot: "bg-emerald-500",
  },
  Writing: {
    iconBg: "bg-violet-50",
    iconText: "text-violet-600",
    badge: "bg-violet-50 text-violet-700 ring-violet-100",
    hoverBorder: "hover:border-violet-200",
    dot: "bg-violet-500",
  },
  Business: {
    iconBg: "bg-amber-50",
    iconText: "text-amber-600",
    badge: "bg-amber-50 text-amber-700 ring-amber-100",
    hoverBorder: "hover:border-amber-200",
    dot: "bg-amber-500",
  },
  Developer: {
    iconBg: "bg-slate-50",
    iconText: "text-slate-600",
    badge: "bg-slate-50 text-slate-700 ring-slate-100",
    hoverBorder: "hover:border-slate-200",
    dot: "bg-slate-500",
  },
};

const FILTER_LABELS = ["All", "Finance", "Health", "Writing", "Business", "Developer"];

const STAGGER = [
  "stagger-1", "stagger-2", "stagger-3", "stagger-4", "stagger-5",
  "stagger-6", "stagger-7", "stagger-8", "stagger-9", "stagger-10",
];

export function ToolGrid({ tools }: { tools: Tool[] }) {
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? tools : tools.filter((t) => t.category === active);

  return (
    <div>
      {/* Category filter */}
      <div className="flex gap-2 overflow-x-auto pb-1 mb-6 scrollbar-hide">
        {FILTER_LABELS.map((label) => {
          const cfg = CATEGORY[label];
          const isActive = active === label;
          return (
            <button
              key={label}
              onClick={() => setActive(label)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 border ${
                isActive
                  ? "bg-[#0F2447] text-white border-[#0F2447] shadow-sm"
                  : "bg-white text-[#7A6048] border-[#F0E4D4] hover:border-[#E8500A] hover:text-[#E8500A]"
              }`}
            >
              {cfg && (
                <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-white/60" : cfg.dot}`} />
              )}
              {label}
            </button>
          );
        })}
      </div>

      {/* Tool cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((tool, i) => {
          const cfg = CATEGORY[tool.category] ?? CATEGORY.Developer;
          return (
            <Link
              key={tool.slug}
              href={tool.slug}
              className={`group relative bg-white rounded-2xl border border-[#F0E4D4] p-5 card-hover animate-fade-up opacity-0 ${STAGGER[i] ?? ""} ${cfg.hoverBorder}`}
              style={{ animationFillMode: "forwards" }}
            >
              {/* Popular badge */}
              {tool.popular && (
                <span className="absolute top-4 right-4 bg-gradient-to-r from-amber-400 to-orange-400 text-white text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wide uppercase shadow-sm">
                  Popular
                </span>
              )}

              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${cfg.iconBg} mb-4 text-2xl`}>
                {tool.icon}
              </div>

              {/* Content */}
              <h2 className="font-bold text-[#1C1209] mb-1.5 text-base group-hover:text-[#E8500A] transition-colors duration-150">
                {tool.name}
              </h2>
              <p className="text-sm text-[#7A6048] mb-4 leading-relaxed">
                {tool.description}
              </p>

              {/* Footer row */}
              <div className="flex items-center justify-between">
                <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ring-1 ${cfg.badge}`}>
                  {tool.category}
                </span>
                <span className="text-[#E8500A] opacity-0 group-hover:opacity-100 transition-opacity duration-150 text-sm font-semibold">
                  Open →
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-[#7A6048]">
          <p className="text-4xl mb-3">🔍</p>
          <p className="font-medium">No tools in this category yet.</p>
          <p className="text-sm mt-1">More coming soon!</p>
        </div>
      )}
    </div>
  );
}
