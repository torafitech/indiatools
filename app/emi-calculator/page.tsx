import type { Metadata } from "next";
import Link from "next/link";
import { EMICalculator } from "@/components/tools/EMICalculator";
import { AdSlot } from "@/components/layout/AdSlot";
import { BANK_RATES, RATES_LAST_REVIEWED } from "@/data/bank-rates";
import { IndiaBadge } from "@/components/ui/IndiaBadge";

const CATEGORY_LABELS: Record<string, string> = {
  PSU: "Public Sector Banks",
  Private: "Private Banks",
  HFC: "Housing Finance & NBFCs",
};

const ratesAsOf = new Date(RATES_LAST_REVIEWED).toLocaleDateString("en-IN", {
  month: "long",
  year: "numeric",
});

export const metadata: Metadata = {
  title: "EMI Calculator — Free Home, Car & Personal Loan Calculator India 2025",
  description:
    "Calculate your monthly EMI instantly. Free EMI calculator for home loan, car loan and personal loan with full amortization schedule. No signup required.",
  keywords: [
    "EMI calculator",
    "home loan EMI calculator",
    "car loan EMI calculator",
    "personal loan EMI",
    "loan EMI calculator India",
    "EMI calculator 2025",
    "amortization schedule India",
  ],
  openGraph: {
    title: "EMI Calculator — Free Home, Car & Personal Loan EMI Calculator India",
    description:
      "Calculate your monthly EMI for home loan, car loan, and personal loan. Get full amortization schedule instantly.",
    url: "https://indiatools.in/emi-calculator",
    siteName: "IndiaTools",
  },
  alternates: { canonical: "https://indiatools.in/emi-calculator" },
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "EMI Calculator",
  description:
    "Free online EMI calculator for home loan, car loan, and personal loan with amortization schedule.",
  url: "https://indiatools.in/emi-calculator",
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
      name: "What is EMI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "EMI stands for Equated Monthly Instalment. It is a fixed amount you pay to your bank or lender every month to repay your loan. Each EMI consists of two parts — a portion that goes towards repaying the principal (original loan amount) and a portion that covers the interest. In early months, a larger share goes to interest; over time, more goes to principal.",
      },
    },
    {
      "@type": "Question",
      name: "How is EMI calculated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "EMI is calculated using the formula: EMI = P × r × (1+r)^n / ((1+r)^n - 1), where P is the principal loan amount, r is the monthly interest rate (annual rate divided by 12 and then by 100), and n is the loan tenure in months. Our calculator applies this formula instantly as you adjust the inputs.",
      },
    },
    {
      "@type": "Question",
      name: "What is a good EMI to salary ratio?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Financial advisors recommend keeping your total EMI obligations (all loans combined) below 40–50% of your monthly take-home salary. For a home loan specifically, a maximum of 30–35% of your monthly income is considered comfortable. Higher EMI-to-income ratios increase financial stress and reduce your ability to save or handle emergencies.",
      },
    },
    {
      "@type": "Question",
      name: "Can I prepay my loan to reduce EMI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Most banks allow part-prepayment of loans. When you make a prepayment, you can either reduce your EMI while keeping the tenure the same, or keep the same EMI and reduce the tenure. Reducing the tenure saves more on total interest. For home loans, banks typically charge no prepayment penalty on floating-rate loans as per RBI guidelines. Fixed-rate loans may have a 1–2% prepayment fee.",
      },
    },
    {
      "@type": "Question",
      name: "Which bank has the lowest home loan interest rate in India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "As of 2025, SBI offers home loans starting from 8.50% p.a., HDFC from 8.75% p.a., ICICI from 8.75% p.a., and Kotak Mahindra Bank from 8.70% p.a. Rates vary based on your credit score, loan amount, and employment type. Use the BankBazaar comparison tool to see the latest rates from all major banks.",
      },
    },
    {
      "@type": "Question",
      name: "How does loan tenure affect EMI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Longer tenure means lower monthly EMI but higher total interest paid. Shorter tenure means higher EMI but much less total interest. For example, a ₹30 lakh home loan at 8.5% has an EMI of ₹26,285 over 20 years (₹33.1L total interest) vs ₹37,308 over 10 years (only ₹14.8L total interest). Choosing a longer tenure makes sense if monthly cash flow is tight; choose shorter tenure if you want to minimize total cost.",
      },
    },
  ],
};

export default function EMICalculatorPage() {
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
          <span className="text-gray-600">EMI Calculator</span>
        </nav>

        <IndiaBadge note="Uses Indian bank rates, RBI rules & ₹ currency" />
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          EMI Calculator — Calculate Your Monthly Loan EMI Instantly
        </h1>
        <p className="text-gray-500 mb-6 text-sm sm:text-base">
          Free EMI calculator for home loan, car loan, and personal loan. Get your monthly EMI, total interest,
          and year-by-year amortization schedule — no signup needed.
        </p>

        <EMICalculator />

        <AdSlot slot="AFTER_RESULT_SLOT" className="my-6" />

        {/* SEO Content */}
        <section className="mt-8 bg-white rounded-xl border border-gray-200 p-6 prose prose-gray max-w-none">
          <h2 className="text-xl font-bold text-gray-900 mb-4">What is EMI and How is it Calculated?</h2>

          <p className="text-gray-600 leading-relaxed mb-4">
            An <strong>EMI (Equated Monthly Instalment)</strong> is the fixed monthly payment you make to repay a loan
            over a set period. Every EMI has two components: a principal repayment (reducing your outstanding loan
            balance) and an interest charge (cost of borrowing). The ratio between these two changes every month —
            in early months, you pay more interest and less principal; by the end of the loan, the reverse is true.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">The EMI Formula</h3>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4 font-mono text-sm text-gray-700">
            EMI = P × r × (1+r)^n / ((1+r)^n - 1)
            <p className="text-xs text-gray-500 mt-1 font-sans">
              P = Principal | r = Monthly rate (annual rate ÷ 12 ÷ 100) | n = Tenure in months
            </p>
          </div>

          <p className="text-gray-600 leading-relaxed mb-4">
            For example, for a ₹30 lakh home loan at 8.5% annual interest over 20 years (240 months):
            monthly rate r = 8.5/12/100 = 0.007083, giving an EMI of approximately <strong>₹26,035 per month</strong>.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">Factors That Affect Your EMI</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-4">
            <li>
              <strong>Principal Amount:</strong> Higher loan amount = higher EMI. Borrow only what you need, and
              make a bigger down payment where possible.
            </li>
            <li>
              <strong>Interest Rate:</strong> Even a 0.5% difference in rate significantly impacts EMI over 20 years.
              Compare rates from multiple banks before applying.
            </li>
            <li>
              <strong>Loan Tenure:</strong> Longer tenure reduces monthly EMI but increases total interest paid.
              Shorter tenure increases EMI but saves money overall.
            </li>
            <li>
              <strong>Credit Score:</strong> A CIBIL score above 750 typically qualifies you for the lowest available
              rates. Poor credit score leads to higher interest rates.
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">Tips to Reduce Your EMI</h3>
          <ol className="list-decimal pl-5 space-y-2 text-gray-600 mb-4">
            <li>Increase your down payment — reduces the principal and hence EMI</li>
            <li>Opt for a longer tenure (with caution — total interest goes up)</li>
            <li>Negotiate a lower interest rate — even 0.25% matters over 20 years</li>
            <li>Make prepayments annually — reduces outstanding principal, lowering future interest</li>
            <li>Transfer the loan to a bank offering lower rates (balance transfer)</li>
          </ol>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">Home Loan vs Car Loan vs Personal Loan EMI</h3>
          <p className="text-gray-600 leading-relaxed mb-3">
            Home loans have the lowest interest rates (8.5–10.5% p.a.) and longest tenures (up to 30 years),
            resulting in lower EMIs for larger amounts. Car loans are mid-range (9–12% p.a., up to 7 years).
            Personal loans carry the highest rates (12–24% p.a.) and shortest tenures (up to 5 years) — making
            them significantly more expensive per rupee borrowed.
          </p>
          <p className="text-gray-600 leading-relaxed">
            As a rule of thumb, keep your total monthly EMI obligations (home + car + personal loans) below 50% of
            your monthly in-hand salary to maintain financial health and ensure you can still save and invest.
          </p>
        </section>

        {/* Bank-specific EMI calculator hub */}
        <section className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-baseline justify-between flex-wrap gap-2 mb-1">
            <h2 className="text-xl font-bold text-gray-900">EMI Calculator by Bank</h2>
            <span className="text-xs text-gray-400">Rates as of {ratesAsOf}</span>
          </div>
          <p className="text-gray-500 text-sm mb-5">
            Pre-filled calculators with each bank&apos;s current interest rate. Pick your bank and loan type.
          </p>

          {(["PSU", "Private", "HFC"] as const).map((cat) => {
            const banks = BANK_RATES.filter((b) => b.category === cat);
            if (banks.length === 0) return null;
            return (
              <div key={cat} className="mb-6 last:mb-0">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">{CATEGORY_LABELS[cat]}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {banks.map((bank) => (
                    <div key={bank.slug} className="border border-gray-200 rounded-lg p-3 hover:border-blue-300 transition-colors">
                      <p className="font-semibold text-gray-900 text-sm mb-2">{bank.name}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {bank.homeLoan !== undefined && (
                          <Link href={`/emi-calculator/${bank.slug}-home-loan`}
                            className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition-colors">
                            Home {bank.homeLoan}%
                          </Link>
                        )}
                        {bank.carLoan !== undefined && (
                          <Link href={`/emi-calculator/${bank.slug}-car-loan`}
                            className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition-colors">
                            Car {bank.carLoan}%
                          </Link>
                        )}
                        {bank.personalLoan !== undefined && (
                          <Link href={`/emi-calculator/${bank.slug}-personal-loan`}
                            className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition-colors">
                            Personal {bank.personalLoan}%
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Amount-based quick links */}
          <div className="mt-2 pt-4 border-t border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">By Loan Amount</h3>
            <div className="flex flex-wrap gap-2">
              {[
                ["20-lakh-home-loan", "₹20 Lakh"],
                ["30-lakh-home-loan", "₹30 Lakh"],
                ["40-lakh-home-loan", "₹40 Lakh"],
                ["50-lakh-home-loan", "₹50 Lakh"],
                ["75-lakh-home-loan", "₹75 Lakh"],
                ["1-crore-home-loan", "₹1 Crore"],
              ].map(([slug, label]) => (
                <Link key={slug} href={`/emi-calculator/${slug}`}
                  className="text-xs px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full hover:bg-blue-50 hover:text-blue-700 transition-colors">
                  {label} Home Loan
                </Link>
              ))}
            </div>
          </div>
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

        <AdSlot slot="BELOW_FAQ_SLOT" className="my-6" />

        {/* Related tools */}
        <section className="mt-2 mb-4">
          <h2 className="text-base font-semibold text-gray-700 mb-3">Related Tools</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { href: "/sip-calculator", label: "SIP Calculator" },
              { href: "/income-tax-calculator", label: "Income Tax Calculator" },
              { href: "/tdee-calculator", label: "TDEE Calculator" },
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
