import type { Metadata } from "next";
import Link from "next/link";
import { ConstructionCalculator } from "@/components/tools/ConstructionCalculator";
import { AdSlot } from "@/components/layout/AdSlot";
import { IndiaBadge } from "@/components/ui/IndiaBadge";

export const metadata: Metadata = {
  title: "Construction Cost Calculator India 2025 — Cost Per Sqft by City",
  description:
    "Calculate home construction cost in India. City-specific rates per sqft for basic, standard, and premium construction. Updated 2025 rates for 30+ cities.",
  keywords: [
    "construction cost calculator India",
    "construction cost per sqft India 2025",
    "house construction cost India",
    "building cost per sqft",
    "home construction cost Bangalore",
    "construction cost Mumbai",
    "construction cost Delhi",
    "construction cost estimator India",
  ],
  openGraph: {
    title: "Construction Cost Calculator India 2025 — Cost Per Sqft by City",
    description:
      "City-specific construction cost estimator for India. Basic, standard, and premium rates for 30+ cities. Updated 2025 data.",
    url: "https://utilspot.app/construction-cost-calculator",
    siteName: "UtilSpot",
  },
  alternates: { canonical: "https://utilspot.app/construction-cost-calculator" },
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Construction Cost Calculator India",
  description:
    "Free online construction cost estimator for India. Calculate home building cost per sqft for 30+ cities — basic, standard, and premium construction.",
  url: "https://utilspot.app/construction-cost-calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "All",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the average construction cost per sqft in India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "As of 2025, the average construction cost in India ranges from ₹1,000–₹1,900 per sqft for basic construction, ₹1,300–₹2,500 per sqft for standard construction, and ₹2,000–₹4,500 per sqft for premium or luxury construction. Metro cities like Delhi (₹1,900–₹4,500/sqft) and Mumbai (₹1,800–₹4,000/sqft) are significantly more expensive than tier-3 cities like Agra or Patna (₹950–₹2,100/sqft).",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between basic, standard, and premium construction?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Basic construction uses plain cement plaster, ceramic tiles, standard sanitary fittings, and no false ceiling — suited for budget homes and rental properties. Standard construction includes vitrified tiles, granite kitchen countertops, modular kitchen carcass, and branded sanitary fittings — the most common choice for middle-class homes. Premium construction features Italian marble or wooden flooring, full home automation (smart switches, sensors), premium imported sanitary ware, designer false ceilings, and high-end fittings throughout.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to build a house in India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Construction timeline in India depends on the size of the project. A small 500–800 sqft house typically takes 6–8 months. A medium 1,000–2,000 sqft home takes 10–18 months. A large 3,000+ sqft bungalow or villa can take 24–36 months. Delays due to monsoon season, material supply, or contractor issues can add 2–4 months to any project. Planning approvals can add a further 1–3 months before construction begins.",
      },
    },
    {
      "@type": "Question",
      name: "What are the main cost components in home construction?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Home construction costs are broadly split into: materials (~55% of total cost) including cement, steel, bricks, sand, and tiles; labour (~30%) covering skilled workers (masons, carpenters, electricians, plumbers) and unskilled helpers; finishing and MEP (~15%) covering electrical wiring, plumbing, paint, doors, windows, and false ceiling. Additionally, a contingency budget of 10% is highly recommended for unexpected cost overruns, which are very common in Indian construction projects.",
      },
    },
    {
      "@type": "Question",
      name: "How much does it cost to build a 1000 sqft house in Bangalore?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In Bangalore (2025 rates), building a 1,000 sqft house costs approximately ₹17–₹18.7 lakh for basic construction, ₹22–₹24.2 lakh for standard construction, and ₹35–₹38.5 lakh for premium construction. These estimates include a 10% contingency buffer. Material costs (cement, steel, sand, aggregate) have risen 8–12% since 2022 due to supply chain pressures. Getting 3+ contractor quotes is strongly recommended.",
      },
    },
    {
      "@type": "Question",
      name: "How do I reduce home construction costs in India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "To reduce construction costs: (1) Hire a contractor on a labour-only basis and source materials yourself — saves 10–15%. (2) Build in phases — complete the structure first and finish interiors later. (3) Avoid design changes mid-construction — every change adds cost. (4) Use fly-ash bricks instead of red clay bricks — lighter and cheaper. (5) Opt for AAC blocks for interior walls — faster construction, better insulation. (6) Plan your building during post-monsoon season (October–March) for faster construction and better material availability. (7) Get at least 3 written quotes from contractors, not just verbal estimates.",
      },
    },
  ],
};

export default function ConstructionCostCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-xs text-gray-400 mb-4">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-600">Construction Cost Calculator</span>
        </nav>

        <IndiaBadge note="City-specific rates for 30+ Indian cities — updated 2025" />
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Construction Cost Calculator India 2025 — Cost Per Sqft by City
        </h1>
        <p className="text-gray-500 mb-6 text-sm sm:text-base">
          Estimate your home construction cost with city-specific rates for 30+ Indian cities.
          Basic, standard, and premium construction rates updated for 2025.
        </p>

        <ConstructionCalculator />

        <AdSlot slot="CONSTRUCTION_AFTER_RESULT" className="my-6" />

        {/* SEO Content */}
        <section className="mt-8 bg-white rounded-xl border border-gray-200 p-6 prose prose-gray max-w-none">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Home Construction Cost in India — 2025 Guide
          </h2>

          <p className="text-gray-600 leading-relaxed mb-4">
            Building a house in India is one of the largest financial decisions most families make.
            Construction costs vary significantly across cities — a standard 1,500 sqft home in
            Delhi costs roughly <strong>₹37.5 lakh</strong> to build, while the same size in
            Patna costs around <strong>₹20 lakh</strong>. Understanding the cost components and
            city-specific rates helps you plan a realistic budget before you break ground.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Why Construction Costs Vary by City
          </h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            Construction costs in India are driven by four factors: <strong>land value</strong>{" "}
            (which affects what kind of project is financially viable), <strong>material
            transportation costs</strong> (cities far from quarries or steel plants pay more),{" "}
            <strong>labour rates</strong> (metro city workers command 40–60% higher wages than
            tier-3 cities), and <strong>local building bylaws</strong> (which affect foundation
            depth, setback requirements, and structural specifications). Metro cities consistently
            run 50–80% more expensive than tier-3 cities for equivalent construction quality.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Breaking Down the Construction Budget
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-4">
            <li>
              <strong>Materials (55%):</strong> Cement, steel (TMT bars), sand, aggregate, bricks,
              tiles, and finishing materials. Steel and cement prices fluctuate — lock in rates
              early with your contractor.
            </li>
            <li>
              <strong>Labour (30%):</strong> Skilled workers (masons, carpenters, electricians,
              plumbers, painters) plus unskilled helpers. Labour rates have risen 20–25% since 2020
              in most cities.
            </li>
            <li>
              <strong>Finishing and MEP (15%):</strong> Electrical wiring, plumbing, sanitary
              fittings, doors, windows, paint, and false ceiling. This is where premium vs
              standard construction diverges most sharply.
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Hidden Costs to Budget For
          </h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            Beyond the construction estimate, budget an additional 15–25% for: architect and
            structural engineer fees (2–5% of project cost), government approvals and building
            plan sanction fees (₹50,000–₹3 lakh depending on city), water and electricity
            connection charges, compound wall and gate, landscaping, and borewell if required.
            A 10% contingency buffer for construction cost overruns is practically mandatory in
            Indian construction.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            2025 Construction Rate Trends
          </h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            Construction costs in India have increased 12–18% between 2022 and 2025 due to
            rising steel prices (TMT bars now ₹55,000–₹65,000/tonne), cement price increases
            (₹380–₹430/bag of 50 kg), and elevated labour costs post-pandemic. Tier-1 metro
            cities have seen sharper increases than tier-2/3 cities. Budget extra if you are
            building in 2025 vs pre-2022 estimates.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            How to Use This Calculator
          </h3>
          <ol className="list-decimal pl-5 space-y-2 text-gray-600">
            <li>Select your city from the dropdown (supports 30+ Indian cities)</li>
            <li>Enter or slide the built-up area (the carpet area of your home)</li>
            <li>Choose Basic, Standard, or Premium based on your finish requirements</li>
            <li>Review the cost range — the actual quote from your contractor should fall within this range</li>
            <li>Add 15–20% for architect fees, approvals, and site development</li>
          </ol>
        </section>

        {/* FAQ */}
        <section className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-5">Frequently Asked Questions</h2>
          <div className="space-y-5">
            {faqSchema.mainEntity.map((faq) => (
              <div key={faq.name} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">{faq.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </section>

        <AdSlot slot="CONSTRUCTION_BELOW_FAQ" className="my-6" />

        {/* Related tools */}
        <section className="mt-2 mb-4">
          <h2 className="text-base font-semibold text-gray-700 mb-3">Related Tools</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { href: "/emi-calculator", label: "Home Loan EMI Calculator" },
              { href: "/income-tax-calculator", label: "Income Tax Calculator" },
              { href: "/sip-calculator", label: "SIP Calculator" },
            ].map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="text-sm px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors"
              >
                {t.label} →
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
