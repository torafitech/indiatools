import type { Metadata } from "next";
import Link from "next/link";
import { LandAreaConverter, LandAreaReferenceTable } from "@/components/tools/LandAreaConverter";
import { AdSlot } from "@/components/layout/AdSlot";
import { IndiaBadge } from "@/components/ui/IndiaBadge";

export const metadata: Metadata = {
  title: "Land Area Unit Converter — Sq Ft, Acre, Guntha, Bigha, Cent & More",
  description:
    "Convert between Square Feet, Square Meter, Acre, Hectare, Cent, Guntha, Bigha, Katha, Ankanam, and Ground instantly. State-specific Bigha/Katha/Guntha values included.",
  keywords: [
    "land area converter",
    "sq ft to acre converter",
    "guntha to acre",
    "gunta to acre",
    "bigha to square feet",
    "katha to square feet",
    "cent to square feet",
    "land unit converter India",
    "ankanam to square feet",
    "ground to square feet",
  ],
  openGraph: {
    title: "Land Area Unit Converter — Sq Ft, Acre, Guntha, Bigha, Cent & More",
    description:
      "Convert between all major Indian land area units instantly, with state-specific Bigha, Katha, and Guntha values.",
    url: "https://www.utilspot.app/land-area-converter",
    siteName: "UtilSpot",
  },
  alternates: { canonical: "https://www.utilspot.app/land-area-converter" },
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Land Area Unit Converter",
  description:
    "Free online converter between Square Feet, Square Meter, Square Yard, Acre, Hectare, Cent, Guntha, Bigha, Katha, Ankanam, and Ground — with state-specific values for region-dependent units.",
  url: "https://www.utilspot.app/land-area-converter",
  applicationCategory: "UtilityApplication",
  operatingSystem: "All",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How many square feet is 1 Guntha?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "1 Guntha = 1,089 sq ft = 101.17 sq m. This is exactly 1/40th of an acre (a 33 ft × 33 ft plot) and is used mainly in Karnataka, Maharashtra, Andhra Pradesh, and Telangana land records.",
      },
    },
    {
      "@type": "Question",
      name: "How many square feet is 1 Acre?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "1 Acre = 43,560 sq ft = 4,046.86 sq m = 40 Guntha = exactly 100 Cent = 4,840 sq yd.",
      },
    },
    {
      "@type": "Question",
      name: "How many square feet is 1 Bigha?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Bigha has no single fixed value across India — it is approximately 14,400 sq ft in West Bengal, 27,225 sq ft in Uttar Pradesh, and 27,220 sq ft in Bihar. Always confirm your state's exact figure before using it for any transaction.",
      },
    },
    {
      "@type": "Question",
      name: "How many square feet is 1 Katha?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Katha also varies by state: 720 sq ft in West Bengal, and approximately 1,361 sq ft in Bihar and Uttar Pradesh (where it is often called Katha or Biswa locally). Confirm the local figure with your revenue department before relying on it.",
      },
    },
    {
      "@type": "Question",
      name: "What is 1 Cent in square feet?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "1 Cent = 435.6 sq ft = 40.47 sq m. This is exactly 1/100th of an acre and is the standard small-plot land unit in Kerala, Tamil Nadu, and parts of Karnataka and Andhra Pradesh.",
      },
    },
    {
      "@type": "Question",
      name: "How many square feet is 1 Ground in Tamil Nadu?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "1 Ground = 2,400 sq ft = 223.03 sq m. Ground is the standard land unit used across Tamil Nadu, especially in Chennai real estate, roughly equal to a 40 ft × 60 ft plot.",
      },
    },
    {
      "@type": "Question",
      name: "What is 1 Ankanam in square feet?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "1 Ankanam = 72 sq ft = 6.69 sq m. Ankanam is a traditional unit used in Andhra Pradesh and Telangana, mainly for small residential plots and older property records.",
      },
    },
    {
      "@type": "Question",
      name: "Is Guntha the same as Gunta?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. \"Guntha\" and \"Gunta\" are spelling variants of the same land unit — both equal 1,089 sq ft = 1/40 acre. Karnataka land records tend to use \"Gunta\"; Maharashtra, Andhra Pradesh, and Telangana more often use \"Guntha.\"",
      },
    },
    {
      "@type": "Question",
      name: "Why does Bigha mean a different area in different states?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Bigha was never standardized under British or post-independence law the way the metric system was — each princely state and later each state government fixed its own local Bigha based on regional farming plot sizes. As a result, West Bengal's Bigha (≈14,400 sq ft) is roughly half of Uttar Pradesh's or Bihar's Pucca Bigha (≈27,225 sq ft), even though both are called 'Bigha'.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.utilspot.app" },
    { "@type": "ListItem", position: 2, name: "Land Area Converter", item: "https://www.utilspot.app/land-area-converter" },
  ],
};

export default function LandAreaConverterPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-xs text-gray-400 mb-4">
          <Link href="/" className="hover:text-[#E8500A]">Home</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-600">Land Area Converter</span>
        </nav>

        <IndiaBadge note="Covers Guntha, Bigha, Katha, Cent, Ankanam & Ground — India's regional land units" />
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F2447] mb-2">
          Land Area Unit Converter — Sq Ft, Acre, Guntha, Bigha &amp; More
        </h1>
        <p className="text-gray-500 mb-6 text-sm sm:text-base">
          Convert instantly between Square Feet, Square Meter, Square Yard (Gaj), Acre, Hectare, Cent,
          Guntha, Bigha, Katha, Ankanam, and Ground. Bigha, Katha, and Guntha values are set by each
          state&apos;s land-record standard — pick your state to get the correct figure.
        </p>

        <LandAreaConverter />

        <AdSlot slot="LAND_AREA_AFTER_RESULT" className="my-6" />

        {/* SEO content */}
        <section className="mt-8 bg-white rounded-xl border border-gray-200 p-6 prose prose-gray max-w-none">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Indian Land Area Units, Explained</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            India uses a mix of metric units (Square Meter, Hectare) and traditional local units
            (Guntha, Bigha, Katha, Cent, Ankanam, Ground) in property documents, revenue records, and
            everyday real estate conversations. The metric and imperial units are fixed mathematical
            ratios that never change. The traditional units — Guntha, Bigha, and Katha in particular —
            were set locally by each state and can differ significantly from one state to another.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">Fixed Units (Same Everywhere)</h3>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-600 mb-4">
            <li><strong>1 Square Meter = 10.7639 sq ft</strong></li>
            <li><strong>1 Square Yard (Gaj) = 9 sq ft</strong></li>
            <li><strong>1 Acre = 43,560 sq ft = 4,046.86 sq m</strong></li>
            <li><strong>1 Hectare = 107,639.10 sq ft = 2.471 acres</strong></li>
            <li><strong>1 Cent = 435.6 sq ft</strong> (1/100 acre — Kerala, Tamil Nadu, parts of Karnataka &amp; Andhra Pradesh)</li>
            <li><strong>1 Ankanam = 72 sq ft</strong> (Andhra Pradesh &amp; Telangana, small residential plots)</li>
            <li><strong>1 Ground = 2,400 sq ft</strong> (Tamil Nadu, especially Chennai)</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800 mb-3">Region-Dependent Units</h3>

          <h4 className="font-semibold text-gray-800 text-sm mb-1">Guntha / Gunta</h4>
          <p className="text-[#E8500A] text-sm font-semibold mb-1.5">
            1 Guntha = 1,089 sq ft = 101.17 sq m = 1/40 acre.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4 text-sm">
            Fairly consistent across the states that use it — Karnataka, Maharashtra, Andhra Pradesh,
            and Telangana all treat 1 Guntha (also spelled Gunta) as 1,089 sq ft, a 33 ft × 33 ft plot.
          </p>

          <h4 className="font-semibold text-gray-800 text-sm mb-1">Bigha</h4>
          <p className="text-[#E8500A] text-sm font-semibold mb-1.5">
            1 Bigha ranges from 14,400 sq ft (West Bengal) to ≈27,225 sq ft (Uttar Pradesh / Bihar).
          </p>
          <p className="text-gray-600 leading-relaxed mb-4 text-sm">
            Bigha is genuinely different by state — West Bengal&apos;s Bigha is roughly half of Uttar
            Pradesh&apos;s or Bihar&apos;s Pucca Bigha, despite sharing the same name. Use the regional
            standard selector in the calculator above, or see the state-specific guides below.
          </p>

          <h4 className="font-semibold text-gray-800 text-sm mb-1">Katha</h4>
          <p className="text-[#E8500A] text-sm font-semibold mb-1.5">
            1 Katha ranges from 720 sq ft (West Bengal) to ≈1,361 sq ft (Bihar / Uttar Pradesh).
          </p>
          <p className="text-gray-600 leading-relaxed mb-3 text-sm">
            Katha follows the same regional split as Bigha — twenty Katha make one Bigha in both
            Bengal and Bihar/UP, but the underlying sq-ft value differs by state.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">State-Specific Guides</h3>
          <div className="flex flex-wrap gap-2">
            {[
              { href: "/land-area-converter/karnataka", label: "Karnataka" },
              { href: "/land-area-converter/telangana-andhra-pradesh", label: "Telangana & Andhra Pradesh" },
              { href: "/land-area-converter/tamil-nadu", label: "Tamil Nadu" },
              { href: "/land-area-converter/west-bengal", label: "West Bengal" },
              { href: "/land-area-converter/uttar-pradesh-bihar", label: "Uttar Pradesh & Bihar" },
            ].map((s) => (
              <Link key={s.href} href={s.href}
                className="text-sm px-3 py-1.5 bg-[#F0F4FF] text-[#0F2447] rounded-full hover:bg-[#E5EAFF] transition-colors">
                {s.label} →
              </Link>
            ))}
          </div>
        </section>

        <LandAreaReferenceTable />

        {/* Disclaimer */}
        <section className="mt-6 bg-[#FFFCF8] border border-[#F0E4D4] rounded-xl px-5 py-4">
          <p className="text-xs text-[#7A6048] flex items-start gap-1.5">
            <svg className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-[#E8500A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            For reference only — always confirm exact conversions against your local revenue
            department&apos;s official records (RTC, Pahani, Jamabandi, or equivalent) before any legal
            or transaction use.
          </p>
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

        <AdSlot slot="LAND_AREA_BELOW_FAQ" className="my-6" />

        {/* Related tools */}
        <section className="mt-2 mb-4">
          <h2 className="text-base font-semibold text-gray-700 mb-3">Related Tools</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { href: "/construction-cost-calculator", label: "Construction Cost Calculator" },
              { href: "/emi-calculator", label: "Home Loan EMI Calculator" },
              { href: "/gold-jewellery-calculator", label: "Gold Jewellery Calculator" },
            ].map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="text-sm px-3 py-1.5 bg-[#F0F4FF] text-[#0F2447] rounded-full hover:bg-[#E5EAFF] transition-colors"
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
