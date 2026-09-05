import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0F2447] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
        {/* Four-column grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">

          {/* Col 1: Logo + description */}
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="inline-block mb-3">
              <span className="font-extrabold text-xl tracking-tight">
                <span className="text-[#E8500A]">Util</span>
                <span className="text-white">Spot</span>
              </span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed max-w-[200px]">
              Free online calculators and utility tools. No signup, no clutter.
            </p>
            <div className="flex gap-2 mt-4">
              <span className="text-[11px] bg-white/10 text-white/50 px-2.5 py-1 rounded-full font-medium">100% Free</span>
              <span className="text-[11px] bg-white/10 text-white/50 px-2.5 py-1 rounded-full font-medium">No Signup</span>
            </div>
          </div>

          {/* Col 2: Finance Tools */}
          <div>
            <p className="font-bold text-white text-sm mb-4">Finance Tools</p>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: "/emi-calculator",               label: "EMI Calculator" },
                { href: "/income-tax-calculator",        label: "Income Tax Calculator" },
                { href: "/sip-calculator",               label: "SIP Calculator" },
                { href: "/salary-calculator",            label: "Salary Calculator" },
                { href: "/invoice-generator",            label: "GST Invoice Generator" },
                { href: "/construction-cost-calculator", label: "Construction Cost" },
                { href: "/gold-jewellery-calculator",    label: "Gold Jewellery Calculator" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/50 hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: AI Resources */}
          <div>
            <p className="font-bold text-white text-sm mb-4">AI Resources</p>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: "/ai-resources",                                label: "Browse All" },
                { href: "/ai-resources/customer-support-ticket-triager",label: "Support Ticket GPT" },
                { href: "/ai-resources/invoice-data-extractor-skill",   label: "Invoice Extractor Skill" },
                { href: "/ai-resources/sales-cold-outreach-agent",      label: "Sales Outreach Agent" },
                { href: "/ai-resources/seo-blog-outline-system-prompt", label: "SEO Outline Prompt" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/50 hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Other Tools + Legal */}
          <div>
            <p className="font-bold text-white text-sm mb-4">Other Tools</p>
            <ul className="space-y-2.5 text-sm mb-6">
              {[
                { href: "/tdee-calculator",         label: "TDEE Calculator" },
                { href: "/word-counter",            label: "Word Counter" },
                { href: "/qr-code-generator",       label: "QR Code Generator" },
                { href: "/business-name-generator", label: "Business Names (AI)" },
                { href: "/attendance-calculator",  label: "Attendance Calculator" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/50 hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
            <p className="font-bold text-white text-sm mb-4">Company</p>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: "/about",          label: "About" },
                { href: "/privacy-policy", label: "Privacy Policy" },
                { href: "/terms",          label: "Terms of Service" },
                { href: "/contact",        label: "Contact" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/50 hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30">
          <p>© {year} <Link href="/" className="hover:text-white/60 transition-colors font-semibold">UtilSpot.app</Link> — Free tools for everyone.</p>
          <p className="flex items-center gap-1">Made with <span className="text-[#E8500A]">♥</span> in India</p>
        </div>
      </div>
    </footer>
  );
}
