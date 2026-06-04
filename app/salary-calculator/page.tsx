import type { Metadata } from "next";
import Link from "next/link";
import { SalaryCalculator } from "@/components/tools/SalaryCalculator";
import { AdSlot } from "@/components/layout/AdSlot";
import { IndiaBadge } from "@/components/ui/IndiaBadge";

export const metadata: Metadata = {
  title: "CTC to In-Hand Salary Calculator India 2025 — Take Home Pay Calculator",
  description:
    "Calculate your monthly in-hand salary from CTC. Includes PF deduction, professional tax, income tax, HRA. Free salary calculator for India 2025.",
  keywords: [
    "CTC to in-hand salary calculator",
    "salary calculator India",
    "take home salary calculator",
    "in-hand salary calculator 2025",
    "CTC breakup calculator",
    "PF deduction calculator",
    "professional tax calculator",
    "monthly salary calculator India",
  ],
  openGraph: {
    title: "CTC to In-Hand Salary Calculator India 2025",
    description:
      "Calculate your monthly in-hand salary from CTC. Includes PF, professional tax, income tax under new regime.",
    url: "https://utilspot.app/salary-calculator",
    siteName: "UtilSpot",
  },
  alternates: { canonical: "https://utilspot.app/salary-calculator" },
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "CTC to In-Hand Salary Calculator",
  description:
    "Free online salary calculator for India. Convert CTC to monthly in-hand salary with full breakdown of PF, HRA, professional tax, and income tax.",
  url: "https://utilspot.app/salary-calculator",
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
      name: "What is CTC and how is it different from in-hand salary?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "CTC (Cost to Company) is the total annual amount an employer spends on an employee, including basic salary, HRA, allowances, employer's PF contribution, gratuity, and other benefits. In-hand salary (take-home pay) is what actually gets credited to your bank account after deducting employee PF, professional tax, and income tax. Typically, in-hand salary is 65–80% of CTC depending on your tax bracket and PF opt-in status.",
      },
    },
    {
      "@type": "Question",
      name: "How is HRA calculated in salary?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "HRA (House Rent Allowance) is a component of your salary structure. In most Indian companies, HRA is set at 50% of basic salary for metro cities (Delhi, Mumbai, Chennai, Kolkata) and 40% of basic salary for non-metro cities. Basic salary itself is typically 40–50% of CTC. For tax exemption purposes under the old regime, the actual HRA exemption is the least of: actual HRA received, actual rent paid minus 10% of basic salary, or 50%/40% of basic salary depending on city.",
      },
    },
    {
      "@type": "Question",
      name: "Is PF deduction mandatory in India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "EPF (Employee Provident Fund) deduction is mandatory for employees earning up to ₹15,000 per month in basic salary who are covered under the EPF Act. For employees earning above ₹15,000, both the employee and employer can choose to opt out of EPF. When opted in, both employee and employer contribute 12% of basic salary each to the PF account. The employee's 12% is deducted from your in-hand salary, while the employer's 12% is included in your CTC.",
      },
    },
    {
      "@type": "Question",
      name: "What is professional tax in India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Professional Tax (PT) is a state-level tax levied on salaried employees in certain Indian states. Not all states charge PT — notable states that do include Maharashtra (up to ₹200/month), Karnataka (₹200/month above ₹15,000), West Bengal (up to ₹200/month), Tamil Nadu, Telangana, Gujarat, and others. States like Delhi, Uttar Pradesh, and Rajasthan do not levy professional tax. The maximum PT across all states is capped at ₹2,500 per year by the Constitution.",
      },
    },
    {
      "@type": "Question",
      name: "How much income tax is deducted from salary?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Under the new tax regime (FY 2025-26), income up to ₹12 lakh is effectively tax-free due to the ₹75,000 standard deduction and Section 87A rebate. For incomes above ₹12L, tax rates are 5% (₹4L–8L), 10% (₹8L–12L), 15% (₹12L–16L), 20% (₹16L–20L), 25% (₹20L–24L), and 30% above ₹24L. A 4% health and education cess is also applied. TDS is deducted monthly by your employer based on estimated annual tax liability.",
      },
    },
    {
      "@type": "Question",
      name: "How do I increase my in-hand salary?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can increase in-hand salary through several strategies: (1) Opt out of PF if eligible and invest the extra 12% yourself for potentially better returns. (2) Restructure salary to include more tax-exempt components like food coupons, LTA, phone/internet reimbursements. (3) Choose the tax regime that saves more — use our income tax calculator to compare. (4) If on old regime, maximize 80C deductions (₹1.5L) and NPS (80CCD — ₹50K extra). (5) Ensure your employer correctly accounts for actual rent paid for HRA exemption.",
      },
    },
  ],
};

export default function SalaryCalculatorPage() {
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
          <span className="text-gray-600">Salary Calculator</span>
        </nav>

        <IndiaBadge note="Uses Indian PF rules, professional tax & CTC structure" />
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          CTC to In-Hand Salary Calculator — India 2025
        </h1>
        <p className="text-gray-500 mb-6 text-sm sm:text-base">
          Enter your annual CTC to calculate monthly in-hand salary with full breakdown — PF, HRA,
          professional tax, and income tax under new regime. No signup needed.
        </p>

        <SalaryCalculator />

        <AdSlot slot="SALARY_AFTER_RESULT" className="my-6" />

        {/* SEO Content */}
        <section className="mt-8 bg-white rounded-xl border border-gray-200 p-6 prose prose-gray max-w-none">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Understanding Your Salary Structure in India</h2>

          <p className="text-gray-600 leading-relaxed mb-4">
            When you receive a job offer in India, the figure quoted is almost always the <strong>CTC (Cost to Company)</strong> — not what you will actually receive every month. The gap between CTC and in-hand salary can be significant, often 20–35% depending on your income level and state of residence. Understanding this breakdown is essential for budgeting, comparing job offers, and negotiating compensation.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">How CTC is Structured</h3>
          <p className="text-gray-600 leading-relaxed mb-3">
            A typical Indian salary structure consists of the following components:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-4">
            <li>
              <strong>Basic Salary (40% of CTC):</strong> The core component on which most other calculations are based — PF contribution, HRA, and gratuity are all derived from basic salary.
            </li>
            <li>
              <strong>HRA — House Rent Allowance (50% of basic in metros, 40% elsewhere):</strong> Provided to cover rental expenses. Tax-exempt up to a calculated limit under the old tax regime.
            </li>
            <li>
              <strong>Special Allowance:</strong> The residual amount after basic, HRA, and employer PF are accounted for within the CTC. Fully taxable.
            </li>
            <li>
              <strong>Employer PF (12% of basic):</strong> The employer&apos;s contribution to your EPF account. This is part of your CTC but never hits your bank account — it goes directly into your retirement corpus.
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">What Gets Deducted</h3>
          <p className="text-gray-600 leading-relaxed mb-3">
            Your gross monthly pay (basic + HRA + special allowance) is further reduced by three types of deductions:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-4">
            <li>
              <strong>Employee EPF (12% of basic):</strong> Your own contribution to the provident fund. This is accumulated over your career and is accessible after retirement or after 5 years of continuous service.
            </li>
            <li>
              <strong>Professional Tax:</strong> A state-level tax applicable in states like Maharashtra (max ₹2,400/year), Karnataka (₹2,400/year for gross &gt; ₹15,000), West Bengal, Tamil Nadu, Telangana, Gujarat, and others. Delhi, UP, and several other states have no PT.
            </li>
            <li>
              <strong>Income Tax (TDS):</strong> Tax Deducted at Source by your employer every month. Under the new regime (FY 2025-26), income up to ₹12 lakh is effectively zero tax. Above that, marginal rates apply from 5% to 30%.
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">New Regime vs Old Regime</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            From FY 2024-25 onwards, the new tax regime is the default for salaried employees. With a ₹75,000 standard deduction and a full rebate on income up to ₹12 lakh, most salaried employees earning below ₹15–18 LPA will pay zero or minimal income tax under the new regime. The old regime offers more deductions (80C, HRA exemption, 80D, NPS) but is beneficial only if your total deductions exceed the new regime&apos;s built-in advantage.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">Example: ₹12 LPA CTC in Bangalore</h3>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4 text-sm text-gray-700">
            <p className="font-semibold mb-2">CTC: ₹12,00,000 per year</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              <span>Basic (40%):</span><span className="font-medium">₹40,000/mo</span>
              <span>HRA (50% basic, metro):</span><span className="font-medium">₹20,000/mo</span>
              <span>Special Allowance:</span><span className="font-medium">₹26,000/mo</span>
              <span>Employer PF (12% basic):</span><span className="font-medium">₹4,800/mo (in CTC)</span>
              <span className="font-semibold">Gross Monthly:</span><span className="font-semibold">₹86,000/mo</span>
              <span className="mt-2">Employee PF:</span><span className="mt-2">−₹4,800/mo</span>
              <span>Professional Tax (KA):</span><span>−₹200/mo</span>
              <span>Income Tax (new regime):</span><span>≈ −₹0/mo (under ₹12L)</span>
              <span className="font-bold text-blue-700 mt-1">In-Hand Monthly:</span><span className="font-bold text-blue-700 mt-1">≈ ₹81,000/mo</span>
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed">
            The actual in-hand amount varies based on your employer&apos;s specific pay structure, variable pay, bonuses, and whether you claim additional deductions. This calculator gives you a reliable estimate for the fixed component of your CTC.
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

        <AdSlot slot="SALARY_BELOW_FAQ" className="my-6" />

        {/* Related tools */}
        <section className="mt-2 mb-4">
          <h2 className="text-base font-semibold text-gray-700 mb-3">Related Tools</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { href: "/emi-calculator", label: "EMI Calculator" },
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
