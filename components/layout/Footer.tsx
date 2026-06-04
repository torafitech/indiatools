import Link from "next/link";

const FOOTER_LINKS = {
  Finance: [
    { href: "/emi-calculator", label: "EMI Calculator" },
    { href: "/sip-calculator", label: "SIP Calculator" },
    { href: "/income-tax-calculator", label: "Tax Calculator" },
    { href: "/salary-calculator", label: "Salary Calculator" },
    { href: "/construction-cost-calculator", label: "Construction Cost" },
  ],
  Tools: [
    { href: "/word-counter", label: "Word Counter" },
    { href: "/tdee-calculator", label: "TDEE Calculator" },
    { href: "/invoice-generator", label: "GST Invoice" },
    { href: "/qr-code-generator", label: "QR Code Generator" },
    { href: "/business-name-generator", label: "Business Names (AI)" },
  ],
  Company: [
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ],
};

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-white border-t border-[#F0E4D4] mt-8">
      <div className="max-w-6xl mx-auto px-4 py-10 sm:py-14">
        {/* Top row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="inline-block mb-3">
              <span className="font-extrabold text-lg tracking-tight">
                <span className="text-gradient-saffron">Util</span>
                <span className="text-[#0F2447]">Spot</span>
              </span>
            </Link>
            <p className="text-sm text-[#7A6048] leading-relaxed max-w-[200px]">
              Free online tools for India. No signup. No clutter. Just the tool.
            </p>
            <div className="flex gap-3 mt-4">
              <span className="text-[11px] bg-[#FFF8F2] text-[#E8500A] border border-[#FFDCBA] px-2.5 py-1 rounded-full font-semibold">
                100% Free
              </span>
              <span className="text-[11px] bg-[#EEF3FA] text-[#1A3A5C] border border-[#D8E5F5] px-2.5 py-1 rounded-full font-semibold">
                No Signup
              </span>
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <p className="font-bold text-[#1C1209] text-sm mb-3">{section}</p>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#7A6048] hover:text-[#E8500A] transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#F0E4D4] pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#7A6048]">
          <p>
            © {year}{" "}
            <Link href="/" className="font-semibold hover:text-[#E8500A] transition-colors">
              UtilSpot.app
            </Link>{" "}
            — Free tools for everyone.
          </p>
          <p className="flex items-center gap-1">
            Made with{" "}
            <span className="text-[#E8500A]">♥</span> in India
          </p>
        </div>
      </div>
    </footer>
  );
}
