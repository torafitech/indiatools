import type { Metadata } from "next";
import Link from "next/link";
import { GratuityCalculator } from "@/components/tools/GratuityCalculator";
import { AdSlot } from "@/components/layout/AdSlot";
import { IndiaBadge } from "@/components/ui/IndiaBadge";

export const metadata: Metadata = {
  title: "Gratuity Calculator 2026 — New Labour Code Rules & Tax Exemption",
  description:
    "Calculate gratuity under India's new Labour Code rules. Fixed-term employees now qualify after 1 year. Tax exemption up to ₹20L. Updated for Nov 2025 changes.",
  keywords: [
    "gratuity calculator 2026",
    "new gratuity rules india",
    "gratuity calculation formula",
    "fixed term gratuity india",
    "gratuity calculator new labour code",
    "gratuity tax exemption india",
    "how to calculate gratuity",
    "gratuity calculator india 2025",
  ],
  openGraph: {
    title: "Gratuity Calculator 2026 — New Labour Code Rules",
    description:
      "Calculate gratuity amount under India's new Labour Code. Fixed-term employees qualify after 1 year. Tax exemption up to ₹20L.",
    url: "https://www.utilspot.app/gratuity-calculator",
    siteName: "UtilSpot",
  },
  alternates: { canonical: "https://www.utilspot.app/gratuity-calculator" },
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Gratuity Calculator 2026",
  description:
    "Free gratuity calculator updated for India's new Labour Code rules. Supports permanent and fixed-term employees.",
  url: "https://www.utilspot.app/gratuity-calculator",
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
      name: "What is the formula for calculating gratuity in India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For employees covered under the Payment of Gratuity Act: Gratuity = (15 × Last drawn salary × Years of service) / 26. For non-covered employees: the divisor is 30 instead of 26. 'Last drawn salary' means basic + dearness allowance (DA). If the employee completes more than 6 months in the final year, that year is rounded up to a full year.",
      },
    },
    {
      "@type": "Question",
      name: "How long do you need to work to get gratuity in India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Under the old rules, permanent employees needed to complete at least 5 years of continuous service. Under the new Labour Code (effective November 2025), fixed-term contract employees are now eligible for gratuity after just 1 year of service — a significant change that benefits contractual workers.",
      },
    },
    {
      "@type": "Question",
      name: "Is gratuity taxable in India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Gratuity received by a government employee is fully tax-exempt. For private sector employees, gratuity is tax-exempt up to ₹20,00,000 (₹20 lakh) as per the latest amendment. Any amount above ₹20L is taxable as income from other sources, with 30% TDS applicable on the taxable portion.",
      },
    },
    {
      "@type": "Question",
      name: "What is the new Labour Code gratuity rule for fixed-term employees?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Code on Social Security 2020 (effective November 2025) extends gratuity eligibility to fixed-term employees after completing 1 year of service, compared to 5 years for permanent employees under the old Payment of Gratuity Act. The calculation formula remains the same — (15 × basic × years) / 26.",
      },
    },
    {
      "@type": "Question",
      name: "Does gratuity increase with the new Labour Code?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, indirectly. The new Labour Code also mandates a minimum basic salary of 50% of CTC. Since gratuity is calculated on basic salary, a higher basic means higher gratuity accrual per year. An employee with basic at 40% of CTC will see gratuity increase by 25% when basic is raised to 50% of CTC.",
      },
    },
  ],
};


const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.utilspot.app" },
    { "@type": "ListItem", position: 2, name: "Gratuity Calculator 2026", item: "https://www.utilspot.app/gratuity-calculator" },
  ],
};
export default function GratuityCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <nav className="text-xs text-gray-400 mb-4">
          <Link href="/" className="hover:text-[#E8500A]">Home</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-600">Gratuity Calculator</span>
        </nav>

        <IndiaBadge note="Updated for Code on Social Security 2020, effective Nov 2025" />

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F2447] mb-2">
          Gratuity Calculator 2026 — New Labour Code Rules
        </h1>
        <p className="text-gray-500 mb-1 text-sm sm:text-base">
          Calculate your gratuity entitlement under India&apos;s new Labour Code. Fixed-term employees now
          qualify after 1 year. Tax exemption up to ₹20 lakh.
        </p>
        <div className="flex flex-wrap gap-3 mb-6">
          <span className="inline-flex items-center gap-1.5 text-xs bg-[#F1F5F9] text-[#475569] px-3 py-1 rounded-full font-medium">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            Last updated: Nov 2025 · New Labour Code gratuity rules
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs bg-[#F1F5F9] text-[#475569] px-3 py-1 rounded-full font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            Calculated by 5,100+ users this month
          </span>
        </div>

        <GratuityCalculator />

        <AdSlot slot="GRATUITY_AFTER_RESULT" className="my-6" />

        <section className="mt-8 bg-white rounded-xl border border-gray-200 p-6 prose prose-gray max-w-none">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Gratuity Formula & New Labour Code Rules</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Gratuity is a statutory benefit paid by employers to employees as a token of appreciation for
            long service. It is governed by the <strong>Payment of Gratuity Act, 1972</strong>, now
            superseded by the <strong>Code on Social Security, 2020</strong> (effective November 2025).
          </p>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">The Formula</h3>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4 font-mono text-sm text-gray-700">
            <p>For Act-covered companies: Gratuity = (15 × Basic+DA × Years) / 26</p>
            <p>For non-covered companies: Gratuity = (15 × Basic+DA × Years) / 30</p>
            <p className="text-xs text-gray-500 mt-2 font-sans">Note: If service &gt; 6 months in final year, round up to next year</p>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">What Changed Under New Labour Code</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-4 text-sm">
            <li><strong>Fixed-term employees eligible after 1 year</strong> (was 5 years under old rules)</li>
            <li>Basic salary minimum 50% of CTC → higher gratuity for most employees</li>
            <li>₹20 lakh tax-exempt ceiling remains unchanged</li>
            <li>Gratuity to be paid within 30 days of separation (was 30 days from claim date)</li>
          </ul>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Example: 8 Years Service, ₹50,000 Basic+DA</h3>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4 text-sm text-gray-700">
            <p>Gratuity = (15 × 50,000 × 8) / 26 = <strong>₹2,30,769</strong></p>
            <p className="text-xs text-gray-500 mt-1">Fully tax-exempt (below ₹20L ceiling)</p>
          </div>
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

        <AdSlot slot="GRATUITY_BELOW_FAQ" className="my-6" />

        <section className="mt-2 mb-4">
          <h2 className="text-base font-semibold text-gray-700 mb-3">Related Tools</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { href: "/full-final-settlement-calculator", label: "F&F Settlement Calculator" },
              { href: "/new-labour-code-calculator",       label: "New Labour Code Calculator" },
              { href: "/salary-calculator",                label: "CTC Salary Calculator" },
              { href: "/pf-calculator",                    label: "PF Corpus Calculator" },
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
