import type { Metadata } from "next";
import Link from "next/link";
import { FullFinalSettlementCalculator } from "@/components/tools/FullFinalSettlementCalculator";
import { AdSlot } from "@/components/layout/AdSlot";
import { IndiaBadge } from "@/components/ui/IndiaBadge";

export const metadata: Metadata = {
  title: "Full & Final Settlement Calculator — F&F Amount on Resignation India",
  description:
    "Calculate your Full & Final settlement on resignation. Includes pending salary, leave encashment, gratuity, and notice pay adjustment. Updated for new Labour Code Nov 2025.",
  keywords: [
    "full and final settlement calculator",
    "f&f calculator india",
    "notice period pay calculator",
    "leave encashment calculator",
    "full final settlement formula",
    "resignation settlement calculator",
    "f&f settlement india 2026",
    "gratuity in full final settlement",
  ],
  openGraph: {
    title: "Full & Final Settlement Calculator — F&F Amount on Resignation",
    description:
      "Calculate F&F settlement: pending salary, leave encashment, gratuity, and notice pay. Updated for new Labour Code gratuity rules.",
    url: "https://www.utilspot.app/full-final-settlement-calculator",
    siteName: "UtilSpot",
  },
  alternates: { canonical: "https://www.utilspot.app/full-final-settlement-calculator" },
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Full & Final Settlement Calculator",
  description:
    "Free F&F settlement calculator for India. Compute pending salary, leave encashment, gratuity, and notice pay on resignation.",
  url: "https://www.utilspot.app/full-final-settlement-calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "All",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is included in Full & Final settlement in India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A standard Full & Final (F&F) settlement includes: (1) Pending salary for days worked in the last month, (2) Leave encashment — payment for accumulated earned leaves not taken, (3) Gratuity — if service exceeds the eligibility threshold (5 years for permanent, 1 year for fixed-term under new Labour Code), (4) Notice pay adjustment — either additional pay if you served excess notice, or deduction if you fell short, (5) TDS on taxable portions, (6) PF settlement (handled separately via EPFO).",
      },
    },
    {
      "@type": "Question",
      name: "How many days does an employer take to process F&F settlement?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Under Indian labour law, F&F settlement should be processed within 30-45 days of the last working day. Under the new Labour Codes, employers are required to settle F&F within 2 working days for certain components. However, in practice, many companies take 30-60 days. If not settled within 45 days, employees can file a complaint with the Labour Commissioner.",
      },
    },
    {
      "@type": "Question",
      name: "Is gratuity part of F&F settlement?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, gratuity is a component of F&F settlement if the employee has completed the minimum service period — 5 years for permanent employees, 1 year for fixed-term employees under the new Labour Code. Under the Payment of Gratuity Act, gratuity must be paid within 30 days of termination/resignation. It is separate from EPF, which is settled directly through the EPFO portal.",
      },
    },
    {
      "@type": "Question",
      name: "How is leave encashment calculated in F&F?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Leave encashment in F&F = (Monthly CTC / 26) × Number of pending earned leave days. The divisor 26 represents working days per month (excluding 4 Sundays). For example, with monthly salary of ₹80,000 and 15 pending leave days: Leave encashment = (80,000 / 26) × 15 = ₹46,154. Leave encashment received on retirement is tax-exempt up to ₹25 lakh; during employment separation, it is fully taxable.",
      },
    },
    {
      "@type": "Question",
      name: "What happens if notice period is not served?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If you do not serve the required notice period, the shortfall is deducted from your F&F settlement. The deduction equals (Daily salary × Number of days short). Daily salary is computed as monthly salary / 26. For example, if monthly salary is ₹80,000 and you are short by 30 days, the deduction is (80,000 / 26) × 30 = ₹92,308. This deduction is from your gross F&F — it is not a fine but a contractual salary recovery.",
      },
    },
  ],
};


const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.utilspot.app" },
    { "@type": "ListItem", position: 2, name: "Full & Final Settlement Calculator", item: "https://www.utilspot.app/full-final-settlement-calculator" },
  ],
};
export default function FullFinalSettlementPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <nav className="text-xs text-gray-400 mb-4">
          <Link href="/" className="hover:text-[#E8500A]">Home</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-600">Full & Final Settlement Calculator</span>
        </nav>

        <IndiaBadge note="Updated for new Labour Code gratuity rules Nov 2025" />

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F2447] mb-2">
          Full & Final Settlement Calculator — F&F Amount on Resignation
        </h1>
        <p className="text-gray-500 mb-1 text-sm sm:text-base">
          Calculate your complete F&F settlement on resignation or termination — pending salary,
          leave encashment, gratuity, and notice pay adjustment. All in one place.
        </p>
        <div className="flex flex-wrap gap-3 mb-6">
          <span className="inline-flex items-center gap-1.5 text-xs bg-[#F1F5F9] text-[#475569] px-3 py-1 rounded-full font-medium">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            Last updated: Nov 2025 · New Labour Code gratuity rules
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs bg-[#F1F5F9] text-[#475569] px-3 py-1 rounded-full font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            Calculated by 4,600+ users this month
          </span>
        </div>

        <FullFinalSettlementCalculator />

        <AdSlot slot="7779500788" className="my-6" />

        <section className="mt-8 bg-white rounded-xl border border-gray-200 p-6 prose prose-gray max-w-none">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Understanding Full & Final Settlement in India</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            When you resign or are terminated from a job in India, your employer must settle all outstanding
            dues — this is called <strong>Full & Final (F&F) settlement</strong>. Unlike your last salary,
            F&F includes multiple components and can take 30-60 days to process.
          </p>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">F&F Calculation Formula</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-4 text-sm">
            <li><strong>Pending Salary</strong> = (Monthly salary / 26) × Working days in last month</li>
            <li><strong>Leave Encashment</strong> = (Monthly salary / 26) × Pending earned leave days</li>
            <li><strong>Gratuity</strong> = (15 × Basic+DA × Years of service) / 26 (if eligible)</li>
            <li><strong>Notice Pay (credit)</strong> = (Daily salary) × Days of excess notice served</li>
            <li><strong>Notice Pay (debit)</strong> = (Daily salary) × Days short of required notice</li>
          </ul>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">What F&F Does NOT Include</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 mb-4 text-sm">
            <li>EPF withdrawal — handled separately via EPFO Unified Portal</li>
            <li>EPS pension — available after 58 years of age or 10 years of EPF service</li>
            <li>Variable pay / performance bonus (depends on company policy)</li>
            <li>ESOPs / stock vesting (governed by separate ESOP agreement)</li>
          </ul>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">New Labour Code Impact on F&F</h3>
          <p className="text-gray-600 leading-relaxed">
            Under the Code on Social Security 2020 (effective November 2025), fixed-term contract
            employees are now eligible for gratuity after completing just 1 year of service. This
            significantly increases the F&F amount for contract workers who previously received
            no gratuity.
          </p>
        </section>

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

        <AdSlot slot="2743510532" className="my-6" />

        <section className="mt-2 mb-4">
          <h2 className="text-base font-semibold text-gray-700 mb-3">Related Tools</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { href: "/gratuity-calculator",        label: "Gratuity Calculator" },
              { href: "/salary-calculator",          label: "CTC Salary Calculator" },
              { href: "/new-labour-code-calculator", label: "New Labour Code Calculator" },
              { href: "/pf-calculator",              label: "PF Corpus Calculator" },
            ].map((t) => (
              <Link key={t.href} href={t.href}
                className="text-sm px-3 py-1.5 bg-[#F0F4FF] text-[#0F2447] rounded-full hover:bg-[#E8500A] hover:text-white transition-colors">
                {t.label} →
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
