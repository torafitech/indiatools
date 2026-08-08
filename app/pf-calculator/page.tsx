import type { Metadata } from "next";
import Link from "next/link";
import { PFCalculator } from "@/components/tools/PFCalculator";
import { AdSlot } from "@/components/layout/AdSlot";
import { IndiaBadge } from "@/components/ui/IndiaBadge";

export const metadata: Metadata = {
  title: "EPF PF Calculator 2026 — Calculate Your PF Corpus & Retirement Savings",
  description:
    "Project your EPF corpus at retirement with year-by-year growth chart. Apply the new Labour Code 50% wage rule. Current EPF rate 8.25%. Free PF calculator India.",
  keywords: [
    "pf calculator",
    "epf corpus calculator",
    "provident fund calculator india",
    "retirement corpus calculator",
    "epf calculator 2026",
    "pf balance calculator",
    "epf interest calculator",
    "labour code pf calculator",
  ],
  openGraph: {
    title: "EPF PF Calculator 2026 — Project Your Retirement Corpus",
    description:
      "Calculate your EPF corpus at retirement. Includes year-by-year chart, salary growth, and new Labour Code 50% wage rule. Current rate 8.25%.",
    url: "https://www.utilspot.app/pf-calculator",
    siteName: "UtilSpot",
  },
  alternates: { canonical: "https://www.utilspot.app/pf-calculator" },
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "EPF PF Corpus Calculator",
  description:
    "Free EPF calculator to project your provident fund corpus at retirement with year-by-year growth analysis.",
  url: "https://www.utilspot.app/pf-calculator",
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
      name: "What is the current EPF interest rate in India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The EPFO declared an EPF interest rate of 8.25% per annum for FY 2023-24, credited quarterly. This is the rate used as the default in this calculator. The rate is declared annually by EPFO and ratified by the Ministry of Finance.",
      },
    },
    {
      "@type": "Question",
      name: "How is EPF corpus calculated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Your EPF corpus grows through monthly contributions from both you (12% of basic salary) and your employer (split between EPF and EPS), plus compound interest at the declared EPF rate. The employer's contribution is split: 8.33% of basic (capped at ₹1,250/month) goes to Employee Pension Scheme (EPS), and the rest goes to EPF account.",
      },
    },
    {
      "@type": "Question",
      name: "Can I withdraw PF before retirement?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can make partial PF withdrawals for specific purposes: medical emergencies (75% of corpus), housing (up to 36 times monthly wages), marriage/education (50% of employee's share after 7 years), and unemployment (75% after 1 month, 100% after 2 months). Full withdrawal is permitted after retirement or 2 months of unemployment.",
      },
    },
    {
      "@type": "Question",
      name: "How does the new Labour Code affect PF contributions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The new Labour Code's 50% basic wage rule increases PF contributions for employees whose basic was below 50% of CTC. Since PF is 12% of basic (both employee and employer), a higher basic directly increases monthly contributions and therefore the final corpus at retirement.",
      },
    },
    {
      "@type": "Question",
      name: "Is PF interest taxable?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "EPF interest is tax-free up to a contribution of ₹2.5 lakh per year (employee's share). Interest on contributions above ₹2.5 lakh/year is taxable at slab rates. This change was introduced in Budget 2021 and applies from April 2021 onwards. For most salaried employees, PF remains effectively tax-free.",
      },
    },
  ],
};


const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.utilspot.app" },
    { "@type": "ListItem", position: 2, name: "PF & EPF Calculator", item: "https://www.utilspot.app/pf-calculator" },
  ],
};
export default function PFCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <nav className="text-xs text-gray-400 mb-4">
          <Link href="/" className="hover:text-[#E8500A]">Home</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-600">PF Calculator</span>
        </nav>

        <IndiaBadge note="EPF interest rate 8.25% · New Labour Code compliant" />

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F2447] mb-2">
          PF & EPF Corpus Calculator — Project Your Retirement Savings
        </h1>
        <p className="text-gray-500 mb-1 text-sm sm:text-base">
          Calculate your EPF corpus at retirement with year-by-year growth chart.
          Apply the new Labour Code 50% wage rule to see how higher basic impacts your final corpus.
        </p>
        <div className="flex flex-wrap gap-3 mb-6">
          <span className="inline-flex items-center gap-1.5 text-xs bg-[#F1F5F9] text-[#475569] px-3 py-1 rounded-full font-medium">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            Last updated: June 2025 · EPF rate 8.25%
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs bg-[#F1F5F9] text-[#475569] px-3 py-1 rounded-full font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            Calculated by 3,800+ users this month
          </span>
        </div>

        <PFCalculator />

        <AdSlot slot="7779500788" className="my-6" />

        <section className="mt-8 bg-white rounded-xl border border-gray-200 p-6 prose prose-gray max-w-none">
          <h2 className="text-xl font-bold text-gray-900 mb-4">How EPF Works and Why It Matters</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            The <strong>Employee Provident Fund (EPF)</strong> is India&apos;s premier retirement savings scheme,
            managed by the Employees&apos; Provident Fund Organisation (EPFO). It applies to all companies
            with 20 or more employees. Both you and your employer contribute 12% of your basic salary
            every month, building a corpus that earns compound interest at rates declared annually.
          </p>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Employee vs Employer Contribution Split</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-4 text-sm">
            <li><strong>Your share (12%)</strong>: Goes entirely to your EPF account</li>
            <li><strong>Employer&apos;s 8.33%</strong>: Goes to Employee Pension Scheme (EPS), capped at ₹1,250/month</li>
            <li><strong>Employer&apos;s remaining 3.67%+</strong>: Goes to your EPF account</li>
            <li>Net result: ~15.67% of basic goes to your EPF each month (your 12% + employer&apos;s EPF share)</li>
          </ul>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">The Power of Compounding</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            At 8.25% annual interest, money doubles roughly every 8.7 years. An employee who starts
            at ₹30,000 basic at age 25 and retires at 58 can accumulate over ₹1.5 crore in EPF corpus
            — even without any salary increments.
          </p>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">New Labour Code Impact on PF</h3>
          <p className="text-gray-600 leading-relaxed">
            With the new Labour Code mandating minimum 50% basic of CTC, PF contributions increase for
            those previously below the threshold. Toggle the &quot;Apply 50% wage rule&quot; option in the
            calculator to see how this affects your final retirement corpus.
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
              { href: "/sip-calculator",                   label: "SIP Calculator" },
              { href: "/new-labour-code-calculator",       label: "New Labour Code Calculator" },
              { href: "/gratuity-calculator",              label: "Gratuity Calculator" },
              { href: "/salary-calculator",                label: "CTC Salary Calculator" },
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
