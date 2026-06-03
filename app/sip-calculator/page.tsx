import type { Metadata } from "next";
import Link from "next/link";
import { SIPCalculator } from "@/components/tools/SIPCalculator";
import { AdSlot } from "@/components/layout/AdSlot";

export const metadata: Metadata = {
  title: "SIP Calculator — Calculate Mutual Fund SIP Returns & Goal Planning India",
  description:
    "Free SIP calculator to estimate mutual fund returns, plan investment goals, and calculate lump sum growth. Set a target and find the monthly SIP amount needed.",
  keywords: ["SIP calculator", "mutual fund SIP calculator", "SIP returns calculator", "goal based SIP", "lump sum calculator India"],
  openGraph: {
    title: "SIP Calculator — Mutual Fund Returns & Goal Planning",
    description: "Calculate SIP returns, plan for a financial goal, or compute lump sum investment growth.",
    url: "https://indiatools.in/sip-calculator",
    siteName: "IndiaTools",
  },
  alternates: { canonical: "https://indiatools.in/sip-calculator" },
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "SIP Calculator",
  description: "Free SIP calculator for mutual fund returns with goal planning and lump sum modes.",
  url: "https://indiatools.in/sip-calculator",
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
      name: "What is SIP in mutual funds?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SIP (Systematic Investment Plan) is a method of investing a fixed amount in a mutual fund at regular intervals — typically monthly. Instead of investing a lump sum, you invest ₹500 or more every month. SIP benefits from rupee cost averaging (buying more units when prices are low, fewer when high) and the power of compounding over time.",
      },
    },
    {
      "@type": "Question",
      name: "How much SIP do I need to become a crorepati?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "To accumulate ₹1 crore assuming 12% annual returns: ₹4,349/month for 30 years, ₹7,211/month for 25 years, ₹13,168/month for 20 years, ₹26,450/month for 15 years, ₹68,000/month for 10 years. Use our Goal mode (target ₹1 crore) to calculate based on your preferred return rate and timeline.",
      },
    },
    {
      "@type": "Question",
      name: "What return rate should I use for SIP calculations?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Historical long-term returns of Indian equity mutual funds (Nifty 50 index) have been 12–14% CAGR over 15+ year periods. For conservative planning, use 10–11%. For aggressive equity funds (small/mid cap), 13–15% is realistic but not guaranteed. For debt funds, use 6–8%. Actual returns depend on market conditions and are not guaranteed.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between SIP and lump sum investment?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SIP invests a fixed amount monthly, spreading market risk over time (rupee cost averaging). Lump sum invests the entire amount at once — better when markets are at a low, riskier if you invest at a peak. For most salaried investors, SIP is better because it aligns with monthly income and removes the need to time the market. Lump sum is ideal if you receive a large windfall (bonus, inheritance) and want to invest immediately.",
      },
    },
    {
      "@type": "Question",
      name: "Is SIP better than FD (Fixed Deposit)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For long-term goals (5+ years), equity SIP historically outperforms FD. FD gives 6.5–7.5% (mostly taxable). Equity SIP has returned 11–14% CAGR over 10+ years. Long-term capital gains from equity mutual funds are taxed at 12.5% above ₹1.25L, while FD interest is taxed at your income slab rate. However, SIP has market risk and short-term losses are possible — for goals under 3 years, FD or debt funds are safer.",
      },
    },
    {
      "@type": "Question",
      name: "What is rupee cost averaging in SIP?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Rupee cost averaging means your fixed SIP amount buys more mutual fund units when markets are down and fewer when markets are up. Over time, this averages out your cost per unit lower than the average market price. This is why SIPs are recommended for volatile markets — you automatically buy more at market dips without needing to time the market.",
      },
    },
  ],
};

export default function SIPCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <nav className="text-xs text-gray-400 mb-4">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-600">SIP Calculator</span>
        </nav>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          SIP Calculator — Calculate Mutual Fund Returns &amp; Plan Your Goals
        </h1>
        <p className="text-gray-500 mb-6 text-sm sm:text-base">
          Three modes: SIP returns, goal-based reverse calculator, and lump sum growth.
          See year-by-year wealth accumulation instantly.
        </p>

        <SIPCalculator />

        <AdSlot slot="AFTER_RESULT_SLOT" className="my-6" />

        <section className="mt-8 bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Power of SIP — The Compounding Effect</h2>
          <p className="text-gray-600 leading-relaxed">
            SIP works on the principle of compounding — your returns earn returns. A ₹5,000/month SIP
            at 12% for 20 years grows to over <strong>₹49 lakhs</strong>, despite investing only ₹12 lakhs
            total. The longer you invest, the more dramatic the compounding effect.
          </p>

          <h3 className="text-lg font-semibold text-gray-800">₹5,000/month SIP — What You Get</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-blue-50 border-b border-blue-100">
                  <th className="text-left px-3 py-2 font-semibold text-blue-800">Duration</th>
                  <th className="text-right px-3 py-2 font-semibold text-blue-800">Invested</th>
                  <th className="text-right px-3 py-2 font-semibold text-blue-800">@ 10% p.a.</th>
                  <th className="text-right px-3 py-2 font-semibold text-blue-800">@ 12% p.a.</th>
                  <th className="text-right px-3 py-2 font-semibold text-blue-800">@ 15% p.a.</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-600">
                {[
                  ["5 years",  "₹3L",   "₹7.7L",  "₹8.2L",  "₹9L"],
                  ["10 years", "₹6L",   "₹10.3L", "₹11.6L", "₹13.9L"],
                  ["15 years", "₹9L",   "₹20.7L", "₹25.2L", "₹33.9L"],
                  ["20 years", "₹12L",  "₹38.3L", "₹49.9L", "₹75.8L"],
                  ["25 years", "₹15L",  "₹66.7L", "₹94.9L", "₹1.65Cr"],
                  ["30 years", "₹18L",  "₹1.13Cr","₹1.76Cr","₹3.49Cr"],
                ].map(([dur, inv, at10, at12, at15]) => (
                  <tr key={dur} className="hover:bg-gray-50">
                    <td className="px-3 py-2 font-medium">{dur}</td>
                    <td className="px-3 py-2 text-right">{inv}</td>
                    <td className="px-3 py-2 text-right">{at10}</td>
                    <td className="px-3 py-2 text-right font-semibold text-blue-600">{at12}</td>
                    <td className="px-3 py-2 text-right font-semibold text-green-600">{at15}</td>
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
              { href: "/income-tax-calculator", label: "Income Tax Calculator" },
              { href: "/tdee-calculator", label: "TDEE Calculator" },
            ].map((t) => (
              <Link key={t.href} href={t.href}
                className="text-sm px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors">
                {t.label} →
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
