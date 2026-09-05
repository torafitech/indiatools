"use client";

import { useEffect, useRef, useState } from "react";
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

/* ── Category palette ───────────────────────────────────────────────── */
const CAT: Record<string, {
  iconBg: string; iconText: string; badge: string; dot: string; borderL: string;
}> = {
  Finance:      { iconBg: "bg-[#FFF8F2]",  iconText: "text-[#E8500A]",  badge: "bg-[#FFF8F2] text-[#E8500A] ring-[#FFDCBA]",   dot: "bg-[#E8500A]",   borderL: "border-l-[#E8500A]"   },
  Health:       { iconBg: "bg-emerald-50", iconText: "text-emerald-600", badge: "bg-emerald-50 text-emerald-700 ring-emerald-100", dot: "bg-emerald-500", borderL: "border-l-[#059669]"   },
  Writing:      { iconBg: "bg-[#F0F4FF]",  iconText: "text-[#0F2447]",  badge: "bg-[#F0F4FF] text-[#0F2447] ring-[#CBD5EF]",   dot: "bg-[#0F2447]",   borderL: "border-l-[#0F2447]"   },
  Business:     { iconBg: "bg-[#FFF8F2]",  iconText: "text-[#E8500A]",  badge: "bg-[#FFF8F2] text-[#E8500A] ring-[#FFDCBA]",   dot: "bg-[#E8500A]",   borderL: "border-l-[#E8500A]"   },
  Developer:    { iconBg: "bg-[#F0F4FF]",  iconText: "text-[#0F2447]",  badge: "bg-[#F0F4FF] text-[#0F2447] ring-[#CBD5EF]",   dot: "bg-[#0F2447]",   borderL: "border-l-[#0F2447]"   },
  "Labour & HR":{ iconBg: "bg-[#F0F4FF]",  iconText: "text-[#0F2447]",  badge: "bg-[#F0F4FF] text-[#0F2447] ring-[#CBD5EF]",   dot: "bg-[#0F2447]",   borderL: "border-l-[#0F2447]"   },
  "Real Estate & Construction": { iconBg: "bg-amber-50", iconText: "text-amber-700", badge: "bg-amber-50 text-amber-700 ring-amber-100", dot: "bg-amber-600", borderL: "border-l-amber-600" },
  Career:       { iconBg: "bg-[#F0F4FF]",  iconText: "text-[#0F2447]",  badge: "bg-[#F0F4FF] text-[#0F2447] ring-[#CBD5EF]",   dot: "bg-[#0F2447]",   borderL: "border-l-[#0F2447]"   },
  Security:     { iconBg: "bg-[#F0F4FF]",  iconText: "text-[#0F2447]",  badge: "bg-[#F0F4FF] text-[#0F2447] ring-[#CBD5EF]",   dot: "bg-[#0F2447]",   borderL: "border-l-[#0F2447]"   },
  "AI Resources": { iconBg: "bg-violet-50", iconText: "text-violet-600", badge: "bg-violet-50 text-violet-700 ring-violet-100", dot: "bg-violet-500", borderL: "border-l-violet-500" },
};

/* ── Lucide-style inline SVG icons per tool ─────────────────────────── */
function ToolIcon({ slug, className }: { slug: string; className?: string }) {
  const icons: Record<string, React.ReactNode> = {
    "/emi-calculator": <>
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </>,
    "/income-tax-calculator": <>
      <line x1="18" y1="20" x2="18" y2="10"/>
      <line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6"  y1="20" x2="6"  y2="14"/>
    </>,
    "/sip-calculator": <>
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
      <polyline points="17 6 23 6 23 12"/>
    </>,
    "/salary-calculator": <>
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
      <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
    </>,
    "/invoice-generator": <>
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
    </>,
    "/construction-cost-calculator": <>
      <path d="M1 22h22"/>
      <path d="M7 22V11l5-4 5 4v11"/>
      <path d="M11 22v-5h2v5"/>
    </>,
    "/land-area-converter": <>
      <path d="M3 21h18"/>
      <path d="M3 21V8l6-5 6 5v13"/>
      <path d="M9 21V13h6v8"/>
      <path d="M15 3l6 5v13"/>
    </>,
    "/tdee-calculator": <>
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </>,
    "/word-counter": <>
      <polyline points="4 7 4 4 20 4 20 7"/>
      <line x1="9" y1="20" x2="15" y2="20"/>
      <line x1="12" y1="4" x2="12" y2="20"/>
    </>,
    "/qr-code-generator": <>
      <rect x="3"  y="3"  width="7" height="7"/>
      <rect x="14" y="3"  width="7" height="7"/>
      <rect x="3"  y="14" width="7" height="7"/>
      <rect x="14" y="14" width="3" height="3"/>
    </>,
    "/business-name-generator": <>
      <path d="M9 18h6"/>
      <path d="M10 22h4"/>
      <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0018 8 6 6 0 006 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 018.91 14"/>
    </>,
    "/new-labour-code-calculator": <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </>,
    "/gratuity-calculator": <>
      <rect x="2" y="5" width="20" height="14" rx="2"/>
      <line x1="2" y1="10" x2="22" y2="10"/>
    </>,
    "/pf-calculator": <>
      <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2m-2 0H3"/>
      <path d="M12 12v4m-2-2h4"/>
    </>,
    "/full-final-settlement-calculator": <>
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <polyline points="9 15 11 17 15 13"/>
    </>,
    "/freelance-rate-calculator": <>
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
      <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
    </>,
    "/seo-analyzer": <>
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
      <line x1="11" y1="8" x2="11" y2="14"/>
      <line x1="8" y1="11" x2="14" y2="11"/>
    </>,
    "/accessibility-checker": <>
      <circle cx="12" cy="4" r="2"/>
      <path d="M19 12H5"/>
      <path d="M12 6v4"/>
      <path d="M8.5 22l3.5-6 3.5 6"/>
      <path d="M8.5 16l-2-4"/>
      <path d="M15.5 16l2-4"/>
    </>,
    "/equity-calculator": <>
      <path d="M21.21 15.89A10 10 0 118 2.83"/>
      <path d="M22 12A10 10 0 0012 2v10z"/>
    </>,
    "/nutrition-label-calculator": <>
      <path d="M2 2a26.6 26.6 0 0110.5 20c.9-6.82 1.91-9.72 5-14"/>
      <path d="M16 8c4 0 6-2 6-6-4 0-6 2-6 6z"/>
    </>,
    "/cron-builder": <>
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </>,
    "/password-generator": <>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0110 0v4"/>
    </>,
    "/linkedin-boolean-search-generator": <>
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </>,
    "/ai-resources": <>
      <rect x="3" y="11" width="18" height="10" rx="2"/>
      <circle cx="12" cy="5" r="2"/>
      <path d="M12 7v4"/>
      <line x1="8" y1="16" x2="8" y2="16"/>
      <line x1="16" y1="16" x2="16" y2="16"/>
    </>,
  };
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className ?? "w-5 h-5"}
    >
      {icons[slug] ?? <circle cx="12" cy="12" r="10"/>}
    </svg>
  );
}

const FILTER_LABELS = ["All", "AI Resources", "Finance", "Real Estate & Construction", "Labour & HR", "Health", "Developer", "Business", "Writing", "Career", "Security"];

const STAGGER = [
  "stagger-1","stagger-2","stagger-3","stagger-4","stagger-5",
  "stagger-6","stagger-7","stagger-8","stagger-9","stagger-10",
];

export function ToolGrid({ tools }: { tools: Tool[] }) {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? tools : tools.filter((t) => t.category === active);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  function updateScrollButtons() {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }

  useEffect(() => {
    updateScrollButtons();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollButtons);
    window.addEventListener("resize", updateScrollButtons);
    return () => {
      el.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, []);

  function scrollByAmount(dir: 1 | -1) {
    scrollRef.current?.scrollBy({ left: dir * 220, behavior: "smooth" });
  }

  return (
    <div>
      {/* Category filter pills */}
      <div className="relative mb-6">
        {canScrollLeft && (
          <button
            onClick={() => scrollByAmount(-1)}
            aria-label="Scroll categories left"
            className="hidden sm:flex absolute left-0 top-0 bottom-0 z-10 items-center justify-center w-8 bg-gradient-to-r from-white via-white to-transparent"
          >
            <span className="w-7 h-7 flex items-center justify-center rounded-full bg-white border border-[#F0E4D4] text-[#7A6048] shadow-sm hover:text-[#E8500A] hover:border-[#E8500A]">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </span>
          </button>
        )}
        {canScrollRight && (
          <button
            onClick={() => scrollByAmount(1)}
            aria-label="Scroll categories right"
            className="hidden sm:flex absolute right-0 top-0 bottom-0 z-10 items-center justify-center w-8 bg-gradient-to-l from-white via-white to-transparent"
          >
            <span className="w-7 h-7 flex items-center justify-center rounded-full bg-white border border-[#F0E4D4] text-[#7A6048] shadow-sm hover:text-[#E8500A] hover:border-[#E8500A]">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </button>
        )}
        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
        {FILTER_LABELS.map((label) => {
          const cfg = CAT[label];
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
      </div>

      {/* Tool cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((tool, i) => {
          const cfg = CAT[tool.category] ?? CAT.Developer;
          return (
            <Link
              key={tool.slug}
              href={tool.slug}
              className={`group relative bg-white rounded-2xl border border-[#F0E4D4] border-l-[3px] ${cfg.borderL} p-5 animate-fade-up opacity-0 ${STAGGER[i] ?? ""} transition-all duration-200 hover:border-[#E8500A] hover:-translate-y-0.5 hover:shadow-card-hover`}
              style={{ animationFillMode: "forwards" }}
            >
              {/* Popular badge */}
              {tool.popular && (
                <span className="absolute top-4 right-4 bg-gradient-to-r from-[#E8500A] to-orange-400 text-white text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wide uppercase shadow-sm">
                  Popular
                </span>
              )}

              {/* Icon container */}
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${cfg.iconBg} ${cfg.iconText} mb-4`}>
                <ToolIcon slug={tool.slug} className="w-5 h-5" />
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
                <span className="text-[#E8500A] text-sm font-semibold group-hover:translate-x-0.5 transition-transform duration-150">
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
