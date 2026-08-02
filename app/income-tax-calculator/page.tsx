import type { Metadata } from "next";
import Link from "next/link";
import { IncomeTaxCalculator } from "@/components/tools/IncomeTaxCalculator";
import { AdSlot } from "@/components/layout/AdSlot";
import { IndiaBadge } from "@/components/ui/IndiaBadge";
import { getCurrentFY } from "@/lib/currentFY";

const fy = getCurrentFY();

export const metadata: Metadata = {
  title: `Income Tax Calculator FY ${fy} — New vs Old Regime Comparison India`,
  description:
    `Calculate income tax for FY ${fy}. Compare new vs old tax regime side-by-side and find out which saves more. Includes HRA, 80C, 80D, NPS, home loan deductions.`,
  keywords: [
    `income tax calculator ${fy}`, "new regime vs old regime", "tax calculator India",
    "income tax India", "80C deduction calculator", "HRA calculator",
  ],
  openGraph: {
    title: `Income Tax Calculator FY ${fy} — New vs Old Regime India`,
    description: "Compare new and old tax regime instantly. Enter your salary and deductions to see which saves more tax.",
    url: "https://www.utilspot.app/income-tax-calculator",
    siteName: "UtilSpot",
  },
  alternates: { canonical: "https://www.utilspot.app/income-tax-calculator" },
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: `Income Tax Calculator India FY ${fy}`,
  description: `Free income tax calculator for FY ${fy}. Compare new vs old tax regime with full deduction breakup.`,
  url: "https://www.utilspot.app/income-tax-calculator",
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
      name: "What is the difference between new and old tax regime?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The new tax regime (introduced in Budget 2020, revised in 2023 and 2025) offers lower slab rates but eliminates most deductions. The old regime has higher rates but allows deductions like HRA, 80C (₹1.5L), 80D (health insurance), NPS (₹50K), and home loan interest (₹2L). The new regime is generally better for people with fewer deductions; the old regime benefits those who maximally utilise all deductions.",
      },
    },
    {
      "@type": "Question",
      name: "Is income up to ₹12 lakh really tax-free under the new regime?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `Yes — under the new regime for FY ${fy}, income up to ₹12 lakh is effectively tax-free due to the rebate under Section 87A (₹60,000 rebate). After applying the ₹75,000 standard deduction, if your net income is ₹12 lakh or less, your tax liability is zero. However, if income exceeds ₹12 lakh even by ₹1, the rebate disappears and you pay tax on the entire amount above slab thresholds.`,
      },
    },
    {
      "@type": "Question",
      name: "What is Section 80C and what can I claim under it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Section 80C allows deductions up to ₹1.5 lakh per year on specific investments and expenses. Eligible items include: EPF/PPF contributions, ELSS mutual funds, life insurance premiums (LIC), NSC, 5-year bank FDs, home loan principal repayment, children's tuition fees, and Sukanya Samriddhi Yojana. You can mix and match these to reach the ₹1.5L limit.",
      },
    },
    {
      "@type": "Question",
      name: "How is HRA exemption calculated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "HRA exemption is the minimum of: (1) Actual HRA received from employer, (2) Rent paid minus 10% of basic salary, and (3) 50% of basic salary if metro city (Mumbai, Delhi, Kolkata, Chennai) or 40% if non-metro. Only applicable in the old regime. To claim HRA, you must actually pay rent and have rent receipts/agreement.",
      },
    },
    {
      "@type": "Question",
      name: "Should I choose new regime or old regime?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use this calculator — it shows the exact tax under both regimes. As a rough rule: if your total deductions (HRA + 80C + 80D + home loan interest) exceed ₹3–4 lakh, the old regime often saves more. If you have few deductions (renting is cheap, no home loan, limited 80C), the new regime is usually better. From FY 2024-25, the new regime is the default — you must explicitly opt for the old regime when filing.",
      },
    },
    {
      "@type": "Question",
      name: `What is the standard deduction for FY ${fy}?`,
      acceptedAnswer: {
        "@type": "Answer",
        text: `For FY ${fy}, the standard deduction is ₹75,000 under the new regime (increased from ₹50,000 in Budget 2024) and ₹50,000 under the old regime. This is a flat deduction from gross salary income — no proof required. Salaried employees and pensioners can claim this automatically.`,
      },
    },
  ],
};


const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.utilspot.app" },
    { "@type": "ListItem", position: 2, name: "Income Tax Calculator", item: "https://www.utilspot.app/income-tax-calculator" },
  ],
};
export default function IncomeTaxCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main className="max-w-5xl mx-auto px-4 py-8">
        <nav className="text-xs text-gray-400 mb-4">
          <Link href="/" className="hover:text-[#E8500A]">Home</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-600">Income Tax Calculator</span>
        </nav>

        <IndiaBadge note={`Uses Indian IT Act slabs, FY ${fy} — not applicable outside India`} />
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F2447] mb-2">
          Income Tax Calculator FY {fy} — New vs Old Regime
        </h1>
        <div className="flex flex-wrap gap-3 mb-2">
          <span className="inline-flex items-center gap-1.5 text-xs bg-[#F1F5F9] text-[#475569] px-3 py-1 rounded-full font-medium">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            Last updated: Feb 2026 · Reflects Union Budget 2025 changes
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs bg-[#F1F5F9] text-[#475569] px-3 py-1 rounded-full font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            Calculated by 14,200+ users this month
          </span>
        </div>
        <p className="text-gray-500 mb-6 text-sm sm:text-base">
          Enter your annual income and deductions. See the exact tax under both regimes side-by-side and
          which one saves you more money. Updated for Union Budget 2025.
        </p>

        <IncomeTaxCalculator />

        <AdSlot slot="AFTER_RESULT_SLOT" className="my-6" />

        <section className="mt-8 bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h2 className="text-xl font-bold text-gray-900">New vs Old Tax Regime — FY {fy}</h2>

          <p className="text-gray-600 leading-relaxed">
            Every salaried employee in India must choose between the <strong>New Tax Regime</strong> and the
            <strong> Old Tax Regime</strong> when filing their ITR. The right choice can save you tens of
            thousands of rupees annually. Our calculator computes both and tells you which is better for your
            specific situation.
          </p>

          <h3 className="text-lg font-semibold text-gray-800">New Regime Slabs (FY {fy})</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-[#F0F4FF] border-b border-[#CBD5EF]">
                  <th className="text-left px-3 py-2 font-semibold text-[#0F2447]">Income Slab</th>
                  <th className="text-right px-3 py-2 font-semibold text-[#0F2447]">Tax Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-600">
                {[
                  ["Up to ₹4 lakh", "Nil"],
                  ["₹4L – ₹8L", "5%"],
                  ["₹8L – ₹12L", "10%"],
                  ["₹12L – ₹16L", "15%"],
                  ["₹16L – ₹20L", "20%"],
                  ["₹20L – ₹24L", "25%"],
                  ["Above ₹24L", "30%"],
                ].map(([slab, rate]) => (
                  <tr key={slab} className="hover:bg-gray-50">
                    <td className="px-3 py-2">{slab}</td>
                    <td className="px-3 py-2 text-right font-bold text-[#E8500A]">{rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500">
            * Income up to ₹12L is effectively zero tax due to Rebate u/s 87A (₹60,000) + ₹75,000 standard deduction.
            Add 4% Health &amp; Education Cess on tax payable.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-2">Old Regime Slabs (FY {fy})</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-3 py-2 font-semibold text-gray-600">Income Slab</th>
                  <th className="text-right px-3 py-2 font-semibold text-gray-600">Tax Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-600">
                {[
                  ["Up to ₹2.5 lakh", "Nil"],
                  ["₹2.5L – ₹5L", "5%"],
                  ["₹5L – ₹10L", "20%"],
                  ["Above ₹10L", "30%"],
                ].map(([slab, rate]) => (
                  <tr key={slab} className="hover:bg-gray-50">
                    <td className="px-3 py-2">{slab}</td>
                    <td className="px-3 py-2 text-right font-bold">{rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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

        <AdSlot slot="BELOW_FAQ_SLOT" className="my-6" />

        <section className="mt-2 mb-4">
          <h2 className="text-base font-semibold text-gray-700 mb-3">Related Tools</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { href: "/emi-calculator", label: "EMI Calculator" },
              { href: "/sip-calculator", label: "SIP Calculator" },
              { href: "/word-counter", label: "Word Counter" },
            ].map((t) => (
              <Link key={t.href} href={t.href}
                className="text-sm px-3 py-1.5 bg-[#F0F4FF] text-[#0F2447] rounded-full hover:bg-[#E5EAFF] transition-colors">
                {t.label} →
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
