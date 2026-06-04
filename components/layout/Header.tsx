"use client";

import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/emi-calculator", label: "EMI" },
  { href: "/income-tax-calculator", label: "Tax" },
  { href: "/sip-calculator", label: "SIP" },
  { href: "/invoice-generator", label: "Invoice" },
  { href: "/about", label: "About" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-[#F0E4D4] sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-15 flex items-center justify-between" style={{ height: "60px" }}>
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1 group" aria-label="UtilSpot home">
          <span className="font-extrabold text-xl tracking-tight">
            <span className="text-gradient-saffron">Util</span>
            <span className="text-[#0F2447]">Spot</span>
          </span>
          <span className="hidden sm:inline-block text-[10px] font-semibold text-white bg-[#E8500A] px-1.5 py-0.5 rounded ml-1 leading-none">
            .app
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-1" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 text-sm font-medium text-[#7A6048] hover:text-[#E8500A] hover:bg-[#FFF8F2] rounded-lg transition-all duration-150"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-[#FFF8F2] transition-colors"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          <span
            className={`block w-5 h-0.5 bg-[#0F2447] transition-all duration-200 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 bg-[#0F2447] transition-all duration-200 ${mobileOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 bg-[#0F2447] transition-all duration-200 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="sm:hidden bg-white border-t border-[#F0E4D4] px-4 py-3 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2.5 text-sm font-medium text-[#1C1209] hover:text-[#E8500A] hover:bg-[#FFF8F2] rounded-lg transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
