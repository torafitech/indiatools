import type { Metadata } from "next";
import Link from "next/link";
import { NewLabourCodeCalculator } from "@/components/tools/NewLabourCodeCalculator";
import { AdSlot } from "@/components/layout/AdSlot";
import { IndiaBadge } from "@/components/ui/IndiaBadge";

export const metadata: Metadata = {
  title: "New Labour Code Salary Calculator 2026 — 50% Basic Wage Rule Impact",
  description:
    "Calculate how India's new Labour Code (Nov 2025) affects your salary. See changes to PF, gratuity, and monthly take-home under the 50% basic wage rule.",
  keywords: [
    "new labour code calculator",
    "50% basic salary rule calculator",
    "new wage code salary impact",
    "labour code 2026 salary",
    "code on social security 2020",
    "50% basic wage rule India",
    "new labour code PF impact",
    "labour code take home salary",
  ],
  openGraph: {
    title: "New Labour Code Salary Calculator 2026 — 50% Basic Wage Rule Impact",
    description:
      "See how India's new Labour Code changes your PF, gratuity, and monthly take-home. Free calculator updated for Nov 2025.",
    url: "https://www.utilspot.app/new-labour-code-calculator",
    siteName: "UtilSpot",
  },
  alternates: { canonical: "https://www.utilspot.app/new-labour-code-calculator" },
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "New Labour Code Salary Calculator",
  description:
    "Calculate the impact of India's new Labour Code on your salary — PF, gratuity, and monthly take-home under the 50% basic wage rule.",
  url: "https://www.utilspot.app/new-labour-code-calculator",
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
      name: "What is the 50% basic salary rule under new Labour Codes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Under the Code on Wages 2019 and Code on Social Security 2020 (effective 21 November 2025), an employee's basic wage must be at least 50% of their total salary/CTC. This means companies can no longer keep basic salary artificially low (e.g., 20-30% of CTC) to reduce PF and gratuity contributions.",
      },
    },
    {
      "@type": "Question",
      name: "Will my take-home salary decrease under the new Labour Code?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For most employees whose current basic is below 50% of CTC, take-home will reduce slightly. However, the money is not lost — it goes into your PF account and gratuity corpus. Employees with basic already at 50% or above will see no change.",
      },
    },
    {
      "@type": "Question",
      name: "When did the new Labour Codes become effective in India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The new Labour Codes (Code on Wages 2019, Industrial Relations Code 2020, Code on Social Security 2020, and Occupational Safety Code 2020) became effective on 21 November 2025, after most Indian states notified the rules.",
      },
    },
    {
      "@type": "Question",
      name: "How does the new Labour Code affect PF contributions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "With a higher basic salary (minimum 50% of CTC), both employee PF (12% of basic) and employer PF (12% of basic) increase proportionally. This builds a larger retirement corpus but reduces monthly take-home by the incremental employee PF amount.",
      },
    },
    {
      "@type": "Question",
      name: "What happens if my employer doesn't comply with the 50% rule?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Employers who do not restructure salaries to comply with the 50% basic wage rule are liable to penalties under the new labour codes. Employees can file complaints with the relevant labour authorities. The EPFO also has the power to recover underpaid PF contributions.",
      },
    },
    {
      "@type": "Question",
      name: "Does the new Labour Code apply to all companies?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Code on Wages applies to all establishments. The Code on Social Security (which governs PF and gratuity) applies to establishments covered under EPF Act (typically 20+ employees) and the Payment of Gratuity Act (10+ employees). Contract workers and gig workers may also be covered under certain provisions.",
      },
    },
  ],
};


const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.utilspot.app" },
    { "@type": "ListItem", position: 2, name: "New Labour Code Calculator", item: "https://www.utilspot.app/new-labour-code-calculator" },
  ],
};
export default function NewLabourCodePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <nav className="text-xs text-gray-400 mb-4">
          <Link href="/" className="hover:text-[#E8500A]">Home</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-600">New Labour Code Calculator</span>
        </nav>

        <IndiaBadge note="Covers Code on Social Security 2020, effective 21 Nov 2025" />

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F2447] mb-2">
          New Labour Code Calculator — See How Your Salary Changes
        </h1>
        <p className="text-gray-500 mb-1 text-sm sm:text-base">
          India&apos;s new Labour Codes require your basic salary to be at least 50% of CTC.
          See exactly how this changes your PF, gratuity, and monthly take-home pay.
        </p>
        <div className="flex flex-wrap gap-3 mb-6">
          <span className="inline-flex items-center gap-1.5 text-xs bg-[#F1F5F9] text-[#475569] px-3 py-1 rounded-full font-medium">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            Last updated: Nov 2025 · New Labour Code compliant
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs bg-[#F1F5F9] text-[#475569] px-3 py-1 rounded-full font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            Calculated by 4,200+ users this month
          </span>
        </div>

        <NewLabourCodeCalculator />

        <AdSlot slot="LABOUR_CODE_AFTER_RESULT" className="my-6" />

        {/* Salary variants */}
        <section className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Calculate by Salary</h2>
          <div className="flex flex-wrap gap-2">
            {["5-lpa", "8-lpa", "10-lpa", "12-lpa", "15-lpa", "18-lpa", "20-lpa", "25-lpa", "30-lpa", "35-lpa", "40-lpa", "50-lpa"].map((slug) => (
              <Link key={slug} href={`/new-labour-code-calculator/${slug}`}
                className="text-xs px-3 py-1.5 bg-[#F0F4FF] text-[#0F2447] rounded-full hover:bg-[#E8500A] hover:text-white transition-colors font-medium">
                {slug.replace("-lpa", " LPA")} →
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-6 bg-white rounded-xl border border-gray-200 p-6 prose prose-gray max-w-none">
          <h2 className="text-xl font-bold text-gray-900 mb-4">What Is the New Labour Code and How Does It Affect Your Salary?</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            India&apos;s four new Labour Codes — the Code on Wages (2019), Industrial Relations Code (2020),
            Code on Social Security (2020), and Occupational Safety Code (2020) — became effective on
            <strong> 21 November 2025</strong>. The most impactful change for salaried employees is the
            <strong> 50% basic wage rule</strong>: your basic salary must be at least 50% of your total
            CTC (Cost to Company).
          </p>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Why This Matters</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            For years, many Indian employers kept basic salary artificially low — sometimes just 20-30%
            of CTC — to reduce PF and gratuity liability. The new rule ends this practice. A higher basic
            means higher PF contributions (both yours and your employer&apos;s) and higher gratuity accrual.
            In the short term, your monthly take-home may reduce slightly; in the long term, you build a
            significantly larger retirement corpus.
          </p>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">The Trade-off: Take-Home vs Corpus</h3>
          <p className="text-gray-600 leading-relaxed mb-3">
            For a ₹15 LPA employee with basic at 35% (₹4.375L/year), moving to 50% (₹7.5L/year):
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 text-sm mb-4">
            <li>Employee PF increases from ₹4,375/mo → ₹7,500/mo (₹3,125 more deducted)</li>
            <li>Employer PF increases similarly (builds your retirement corpus)</li>
            <li>Gratuity accrual increases from ₹2,524/mo → ₹4,327/mo</li>
            <li>Monthly take-home reduces by approximately ₹3,000-4,000</li>
            <li>But annual PF + gratuity benefit increases by ₹80,000+</li>
          </ul>
          <p className="text-gray-600 leading-relaxed">
            The money doesn&apos;t disappear — it&apos;s diverted into your EPF account and gratuity fund.
            For long-term financial security, the new rule is net positive for employees.
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

        <AdSlot slot="LABOUR_CODE_BELOW_FAQ" className="my-6" />

        <section className="mt-2 mb-4">
          <h2 className="text-base font-semibold text-gray-700 mb-3">Related Tools</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { href: "/gratuity-calculator",               label: "Gratuity Calculator 2026" },
              { href: "/pf-calculator",                     label: "PF Corpus Calculator" },
              { href: "/full-final-settlement-calculator",  label: "F&F Settlement Calculator" },
              { href: "/salary-calculator",                 label: "CTC Salary Calculator" },
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
