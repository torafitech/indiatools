import type { Metadata } from "next";
import { ToolGrid } from "@/components/ui/ToolGrid";

export const metadata: Metadata = {
  title: "UtilSpot — Free Online Calculators & Utility Tools",
  description:
    "Free online tools: EMI calculator, income tax calculator, SIP calculator, TDEE calculator, word counter, QR code generator, GST invoice. No signup, instant results.",
  alternates: { canonical: "https://utilspot.app" },
};

const tools = [
  {
    slug: "/emi-calculator",
    name: "EMI Calculator",
    description: "Calculate monthly EMI for home, car, and personal loans with full amortization schedule.",
    category: "Finance",
    popular: true,
    icon: "🏦",
    status: "live",
  },
  {
    slug: "/income-tax-calculator",
    name: "Income Tax Calculator",
    description: "Compare old vs new tax regime for FY 2025-26. Find out which regime saves you more.",
    category: "Finance",
    popular: true,
    icon: "📊",
    status: "live",
  },
  {
    slug: "/sip-calculator",
    name: "SIP Calculator",
    description: "Calculate SIP returns, goal-based SIP planning, and lump sum investment growth.",
    category: "Finance",
    popular: true,
    icon: "📈",
    status: "live",
  },
  {
    slug: "/salary-calculator",
    name: "CTC to In-Hand Calculator",
    description: "Calculate your monthly in-hand salary from CTC. Includes PF, professional tax, income tax.",
    category: "Finance",
    popular: false,
    icon: "💼",
    status: "live",
  },
  {
    slug: "/invoice-generator",
    name: "GST Invoice Generator",
    description: "Create professional GST-compliant invoices and download as PDF. No signup needed.",
    category: "Business",
    popular: false,
    icon: "🧾",
    status: "live",
  },
  {
    slug: "/construction-cost-calculator",
    name: "Construction Cost Estimator",
    description: "Estimate home construction cost in your city. Basic, standard, and premium rates for 30+ cities.",
    category: "Finance",
    popular: false,
    icon: "🏗️",
    status: "live",
  },
  {
    slug: "/tdee-calculator",
    name: "TDEE Calculator",
    description: "Find your Total Daily Energy Expenditure and macro targets for weight loss or muscle gain.",
    category: "Health",
    popular: false,
    icon: "🏋️",
    status: "live",
  },
  {
    slug: "/word-counter",
    name: "Word Counter",
    description: "Count words, characters, sentences, reading time, and keyword density instantly.",
    category: "Writing",
    popular: false,
    icon: "✍️",
    status: "live",
  },
  {
    slug: "/qr-code-generator",
    name: "QR Code Generator",
    description: "Generate QR codes for URL, text, phone, WhatsApp, email, and WiFi. Download as PNG.",
    category: "Developer",
    popular: false,
    icon: "📱",
    status: "live",
  },
  {
    slug: "/business-name-generator",
    name: "AI Business Name Generator",
    description: "Generate 10 unique business name ideas with taglines using Claude AI. Free.",
    category: "Business",
    popular: false,
    icon: "🤖",
    status: "live",
  },
];

const stats = [
  { value: "10+", label: "Free Tools" },
  { value: "0", label: "Signup needed" },
  { value: "100%", label: "Browser-based" },
  { value: "∞", label: "Uses, always free" },
];

const features = [
  {
    icon: "⚡",
    title: "Instant Results",
    desc: "Results update live as you type or move sliders. No reload, no wait.",
    bg: "bg-amber-50",
  },
  {
    icon: "📱",
    title: "Mobile-First",
    desc: "Designed for smartphones. Every tool works perfectly on a 375px screen.",
    bg: "bg-blue-50",
  },
  {
    icon: "🔒",
    title: "Zero Data Stored",
    desc: "All calculations happen in your browser. Nothing is sent to any server.",
    bg: "bg-emerald-50",
  },
];

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#FFFCF8]">
        {/* Mesh gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse at 15% 60%, rgba(232,80,10,0.08) 0%, transparent 55%),
              radial-gradient(ellipse at 85% 15%, rgba(15,36,71,0.05) 0%, transparent 55%)
            `,
          }}
        />

        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-24 relative">
          {/* Eyebrow */}
          <div className="flex items-center justify-center mb-6">
            <span className="inline-flex items-center gap-2 bg-white border border-[#F0E4D4] text-[#7A6048] text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              All tools free · No account needed
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-center font-extrabold tracking-tight leading-[1.1] mb-5">
            <span className="block text-4xl sm:text-6xl text-gradient-saffron">
              The right tool
            </span>
            <span className="block text-3xl sm:text-5xl text-[#0F2447] mt-1">
              for every decision.
            </span>
          </h1>

          <p className="text-center text-[#7A6048] text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            EMI calculators, tax tools, health calculators, invoice generators — all free,
            no clutter, no signup.
          </p>

          {/* Stats strip */}
          <div className="flex items-center justify-center gap-3 sm:gap-6 flex-wrap">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#E8500A] leading-none">
                  {s.value}
                </span>
                <span className="text-[11px] text-[#7A6048] font-medium mt-0.5 uppercase tracking-wide">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#F0E4D4] to-transparent" />

      {/* Tools section */}
      <section className="max-w-6xl mx-auto px-4 py-10 sm:py-14">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1C1209]">All Tools</h2>
            <p className="text-sm text-[#7A6048] mt-0.5">
              {tools.length} tools · growing monthly
            </p>
          </div>
        </div>
        <ToolGrid tools={tools} />
      </section>

      {/* Features strip */}
      <section className="bg-white border-y border-[#F0E4D4]">
        <div className="max-w-6xl mx-auto px-4 py-10 sm:py-14">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1C1209] mb-8 text-center">
            Why UtilSpot?
          </h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                className="flex gap-4 p-5 rounded-2xl border border-[#F0E4D4] bg-white hover:shadow-card transition-shadow"
              >
                <div className={`flex-shrink-0 w-11 h-11 rounded-xl ${f.bg} flex items-center justify-center text-xl`}>
                  {f.icon}
                </div>
                <div>
                  <p className="font-bold text-[#1C1209] text-sm mb-1">{f.title}</p>
                  <p className="text-sm text-[#7A6048] leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div
          className="rounded-3xl p-8 sm:p-12 text-center"
          style={{
            background: "linear-gradient(135deg, #0F2447 0%, #1A3A5C 100%)",
          }}
        >
          <p className="text-3xl sm:text-4xl font-extrabold text-white mb-3 tracking-tight">
            Start with any tool.
          </p>
          <p className="text-[#8BAFD4] text-base mb-7 max-w-md mx-auto">
            No account. No tracking. No ads (yet). Just the tool, doing its job.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { href: "/emi-calculator", label: "EMI Calculator" },
              { href: "/income-tax-calculator", label: "Tax Calculator" },
              { href: "/sip-calculator", label: "SIP Calculator" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-full border border-white/20 transition-colors"
              >
                {link.label} →
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
