import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "IndiaTools — Free Online Calculators & Utility Tools for India",
  description:
    "Free online tools for India: EMI calculator, income tax calculator, SIP calculator, word counter, TDEE calculator, GST invoice generator. No signup, no ads clutter.",
  alternates: { canonical: "https://indiatools.in" },
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
    slug: "/word-counter",
    name: "Word Counter",
    description: "Count words, characters, sentences, reading time, and keyword density instantly.",
    category: "Writing",
    popular: false,
    icon: "✍️",
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
    slug: "/invoice-generator",
    name: "GST Invoice Generator",
    description: "Create professional GST-compliant invoices and download as PDF. No signup needed.",
    category: "Business",
    popular: false,
    icon: "🧾",
    status: "coming-soon",
  },
];

const categories = ["All", "Finance", "Health", "Writing", "Business"];

const categoryColors: Record<string, string> = {
  Finance: "bg-blue-100 text-blue-700",
  Health: "bg-green-100 text-green-700",
  Writing: "bg-purple-100 text-purple-700",
  Business: "bg-orange-100 text-orange-700",
};

export default function HomePage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      {/* Hero */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Free Tools for India
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          EMI calculators, tax tools, health calculators, and more — all free, no signup, no clutter.
        </p>
      </div>

      {/* Tool Grid */}
      <div id="finance" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={tool.slug}
            className={`bg-white rounded-xl border border-gray-200 p-5 hover:border-blue-300 hover:shadow-sm transition-all group relative ${
              tool.status === "coming-soon" ? "opacity-75" : ""
            }`}
          >
            {tool.popular && (
              <span className="absolute top-3 right-3 bg-amber-100 text-amber-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                Popular
              </span>
            )}
            {tool.status === "coming-soon" && (
              <span className="absolute top-3 right-3 bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded-full">
                Coming soon
              </span>
            )}
            <div className="text-3xl mb-3">{tool.icon}</div>
            <h2 className="font-semibold text-gray-900 group-hover:text-blue-600 mb-1">{tool.name}</h2>
            <p className="text-sm text-gray-500 mb-3 leading-relaxed">{tool.description}</p>
            <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${categoryColors[tool.category]}`}>
              {tool.category}
            </span>
          </Link>
        ))}
      </div>

      {/* Why IndiaTools */}
      <section className="mt-14 bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Why IndiaTools?</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { icon: "⚡", title: "Instant Results", desc: "No page reload needed. Results update as you type or move sliders." },
            { icon: "📱", title: "Mobile-First", desc: "Designed for smartphones. Works perfectly on any screen size." },
            { icon: "🔒", title: "Zero Data Stored", desc: "All calculations happen in your browser. Nothing is saved or tracked." },
          ].map((f) => (
            <div key={f.title} className="flex gap-3">
              <span className="text-2xl">{f.icon}</span>
              <div>
                <p className="font-semibold text-gray-900 text-sm">{f.title}</p>
                <p className="text-sm text-gray-500 mt-0.5">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
