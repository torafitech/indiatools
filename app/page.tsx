import type { Metadata } from "next";
import Link from "next/link";
import { ToolGrid } from "@/components/ui/ToolGrid";

export const metadata: Metadata = {
  title: "UtilSpot — Free Online Calculators & Utility Tools",
  description:
    "Free online tools: EMI calculator, income tax calculator, SIP calculator, TDEE calculator, word counter, QR code generator, GST invoice. No signup, instant results.",
  alternates: { canonical: "https://www.utilspot.app" },
};

const tools = [
  { slug: "/emi-calculator",                    name: "EMI Calculator",              description: "Calculate monthly EMI for home, car, and personal loans with full amortization schedule.",  category: "Finance",    popular: true,  icon: "🏦", status: "live" },
  { slug: "/income-tax-calculator",             name: "Income Tax Calculator",        description: "Compare old vs new tax regime for FY 2025-26. Find out which regime saves you more.",      category: "Finance",    popular: true,  icon: "📊", status: "live" },
  { slug: "/sip-calculator",                    name: "SIP Calculator",              description: "Calculate SIP returns, goal-based SIP planning, and lump sum investment growth.",            category: "Finance",    popular: true,  icon: "📈", status: "live" },
  { slug: "/salary-calculator",                 name: "CTC to In-Hand Calculator",   description: "Calculate your monthly in-hand salary from CTC. Includes PF, professional tax, income tax.", category: "Finance",   popular: false, icon: "💼", status: "live" },
  { slug: "/invoice-generator",                 name: "GST Invoice Generator",       description: "Create professional GST-compliant invoices and download as PDF. No signup needed.",          category: "Business",   popular: false, icon: "🧾", status: "live" },
  { slug: "/construction-cost-calculator",      name: "Construction Cost Estimator", description: "Estimate home construction cost in your city. Basic, standard, and premium rates for 30+ cities.", category: "Finance", popular: false, icon: "🏗️", status: "live" },
  { slug: "/new-labour-code-calculator",        name: "New Labour Code Calculator",  description: "See how India's new Labour Code affects your PF, gratuity, and monthly take-home salary.",  category: "Labour & HR", popular: false, icon: "⚖️", status: "live" },
  { slug: "/gratuity-calculator",               name: "Gratuity Calculator 2026",    description: "Calculate gratuity under new Labour Code rules. Fixed-term employees qualify after 1 year.", category: "Labour & HR", popular: false, icon: "🏆", status: "live" },
  { slug: "/pf-calculator",                     name: "PF & EPF Calculator",         description: "Project your EPF corpus at retirement with year-by-year growth. Apply the 50% wage rule.",  category: "Labour & HR", popular: false, icon: "💰", status: "live" },
  { slug: "/full-final-settlement-calculator",  name: "Full & Final Settlement",     description: "Calculate F&F settlement on resignation — pending salary, leave encashment, gratuity, notice pay.", category: "Labour & HR", popular: false, icon: "📋", status: "live" },
  { slug: "/tdee-calculator",                   name: "TDEE Calculator",             description: "Find your Total Daily Energy Expenditure and macro targets for weight loss or muscle gain.",  category: "Health",     popular: false, icon: "🏋️", status: "live" },
  { slug: "/word-counter",                      name: "Word Counter",                description: "Count words, characters, sentences, reading time, and keyword density instantly.",           category: "Writing",    popular: false, icon: "✍️", status: "live" },
  { slug: "/qr-code-generator",                 name: "QR Code Generator",           description: "Generate QR codes for URL, text, phone, WhatsApp, email, and WiFi. Download as PNG.",       category: "Developer",  popular: false, icon: "📱", status: "live" },
  { slug: "/freelance-rate-calculator",         name: "Freelance Rate Calculator",    description: "Data-driven hourly and project rate benchmarks by skill, country, and experience level.",  category: "Career",     popular: false, icon: "💰", status: "live" },
  { slug: "/seo-analyzer",                      name: "Website SEO Analyzer",         description: "Instant on-page SEO audit. Enter any URL to check title, meta, H-tags, images, and more.", category: "Developer",  popular: false, icon: "🔍", status: "live" },
  { slug: "/accessibility-checker",             name: "Accessibility Checker",        description: "WCAG 2.1 AA compliance checker. Paste HTML to find missing alt text, unlabelled inputs, more.", category: "Developer", popular: false, icon: "♿", status: "live" },
  { slug: "/equity-calculator",                 name: "Equity & Dilution Calculator", description: "Startup cap table simulator. Model funding rounds and see founder dilution after each round.", category: "Finance",   popular: false, icon: "📊", status: "live" },
  { slug: "/nutrition-label-calculator",        name: "FSSAI Nutrition Label",        description: "Create FSSAI-compliant nutrition labels for Indian food products. 40+ ingredients included.", category: "Health",    popular: false, icon: "🥗", status: "live" },
  { slug: "/cron-builder",                      name: "Cron Expression Builder",      description: "Visual cron job builder. Get plain English description and next 5 run times instantly.",     category: "Developer",  popular: false, icon: "⏰", status: "live" },
  { slug: "/password-generator",                name: "Password Generator",           description: "Generate secure random passwords and test strength. 100% client-side, Web Crypto API.",     category: "Security",   popular: false, icon: "🔐", status: "live" },
];

const stats = [
  { value: "20+", label: "Free Tools" },
  { value: "0",   label: "Signup needed" },
  { value: "100%",label: "Browser-based" },
  { value: "∞",   label: "Always free" },
];

const trust = [
  { icon: "⚡", title: "Instant Results", desc: "No signup, no wait. Results update live as you type or drag sliders." },
  { icon: "🔒", title: "100% Private",    desc: "Nothing stored server-side. All calculations happen in your browser." },
  { icon: "🇮🇳", title: "India-First",    desc: "Built for Indian tax, salary and finance rules. EMI, GST, IT Act." },
];

export default function HomePage() {
  return (
    <main>
      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative bg-white overflow-hidden">
        {/* Subtle dot-grid background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #e2e8f0 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            opacity: 0.55,
          }}
        />
        {/* Left accent bar */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#E8500A]" />

        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-14 sm:py-22 relative">
          {/* Pill badge */}
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 bg-white border border-[#F0E4D4] text-[#7A6048] text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
              🇮🇳 Built for India · Used Globally
            </span>
          </div>

          {/* Headline — single dark navy colour */}
          <h1 className="font-extrabold tracking-tight leading-[1.1] text-[#0F2447] mb-5 max-w-2xl">
            <span className="block text-4xl sm:text-5xl lg:text-6xl">
              The Right Tool
            </span>
            <span className="block text-4xl sm:text-5xl lg:text-6xl mt-1">
              for Every Financial
            </span>
            <span className="block text-4xl sm:text-5xl lg:text-6xl mt-1">
              Decision.
            </span>
          </h1>

          <p className="text-[#7A6048] text-base sm:text-lg max-w-xl mb-8 leading-relaxed">
            EMI calculators, tax tools, health calculators, invoice generators — all free,
            no clutter, no signup.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mb-14">
            <Link
              href="/emi-calculator"
              className="inline-flex items-center gap-2 bg-[#E8500A] hover:bg-[#D44A09] text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm shadow-saffron"
            >
              Try EMI Calculator →
            </Link>
            <Link
              href="#tools"
              className="inline-flex items-center gap-2 bg-white border border-[#F0E4D4] hover:border-[#E8500A] hover:text-[#E8500A] text-[#0F2447] font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
            >
              See all tools
            </Link>
          </div>

          {/* Stats strip — numbers dark navy, labels grey, vertical dividers on desktop */}
          <div className="flex items-center gap-0 flex-wrap">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`flex flex-col pr-6 sm:pr-10 ${
                  i > 0 ? "pl-6 sm:pl-10 border-l border-[#E8E8E8]" : ""
                } mb-2`}
              >
                <span className="text-3xl sm:text-4xl font-extrabold text-[#0F2447] leading-none tabular-nums">
                  {s.value}
                </span>
                <span className="text-xs text-[#9CA3AF] mt-1 font-medium uppercase tracking-wide">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ───────────────────────────────────────────── */}
      <section className="bg-[#F8FAFC] border-y border-[#EEF0F3]">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {trust.map((f) => (
              <div key={f.title} className="flex items-start gap-3">
                <span className="text-xl mt-0.5 shrink-0">{f.icon}</span>
                <div>
                  <p className="font-bold text-[#0F2447] text-sm mb-0.5">{f.title}</p>
                  <p className="text-sm text-[#7A6048] leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TOOLS GRID ────────────────────────────────────────────── */}
      <section id="tools" className="max-w-6xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F2447]">All Tools</h2>
            <p className="text-sm text-[#7A6048] mt-0.5">{tools.length} tools · growing monthly</p>
          </div>
        </div>
        <ToolGrid tools={tools} />
      </section>

      {/* ── CTA BANNER ────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 pb-14">
        <div
          className="rounded-3xl p-8 sm:p-12 text-center"
          style={{ background: "linear-gradient(135deg, #0F2447 0%, #1A3A5C 100%)" }}
        >
          <p className="text-3xl sm:text-4xl font-extrabold text-white mb-3 tracking-tight">
            Start with any tool.
          </p>
          <p className="text-[#8BAFD4] text-base mb-7 max-w-md mx-auto">
            No account. No tracking. No ads (yet). Just the tool, doing its job.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { href: "/emi-calculator",         label: "EMI Calculator" },
              { href: "/income-tax-calculator",  label: "Tax Calculator" },
              { href: "/sip-calculator",         label: "SIP Calculator" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-full border border-white/20 transition-colors"
              >
                {link.label} →
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
