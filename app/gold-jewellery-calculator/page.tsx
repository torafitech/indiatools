import type { Metadata } from "next";
import Link from "next/link";
import { GoldCalculator } from "./GoldCalculator";
import { AdSlot } from "@/components/layout/AdSlot";
import { IndiaBadge } from "@/components/ui/IndiaBadge";

export const metadata: Metadata = {
  title: "Gold Jewellery Price Calculator — Making Charges, GST & Loan Eligibility",
  description:
    "Calculate gold jewellery price with making charges, wastage, GST (3%+5%), and TCS. Check old gold exchange value and gold loan eligibility up to 75% LTV. Free, no signup.",
  keywords: [
    "gold jewellery price calculator india",
    "22k gold calculator making charges",
    "gold gst calculator",
    "gold loan eligibility calculator",
    "916 hallmark gold price calculator",
    "gold jewellery price with gst india",
    "tcs on gold jewellery",
  ],
  openGraph: {
    title: "Gold Jewellery Price Calculator — Making Charges, GST & Loan Eligibility",
    description:
      "Calculate gold jewellery price with making charges, wastage, GST (3%+5%), and TCS. Check old gold exchange value and gold loan eligibility.",
    url: "https://www.utilspot.app/gold-jewellery-calculator",
    siteName: "UtilSpot",
  },
  alternates: { canonical: "https://www.utilspot.app/gold-jewellery-calculator" },
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Gold Jewellery Price Calculator",
  description:
    "Calculate gold jewellery price with making charges, wastage, GST, TCS, old gold exchange value, and gold loan eligibility.",
  url: "https://www.utilspot.app/gold-jewellery-calculator",
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
      name: "How is GST calculated on gold jewellery?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "GST on gold jewellery has two components: 3% on the gold value (pure metal cost) and 5% on making charges (labour/service). These are calculated separately and added to arrive at the total GST payable. For example, on ₹1 lakh gold value with ₹12,000 making charges, GST = ₹3,000 (3% on gold) + ₹600 (5% on making) = ₹3,600 total.",
      },
    },
    {
      "@type": "Question",
      name: "What is TCS on gold jewellery purchase?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "TCS (Tax Collected at Source) of 1% applies when you purchase gold jewellery worth more than ₹2 lakh in a single transaction from a jeweller. The jeweller collects this from you and deposits it with the government. You can claim credit for the TCS when filing your income tax return, so it is not an additional tax — only an advance tax collection.",
      },
    },
    {
      "@type": "Question",
      name: "How much loan can I get against my gold jewellery?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "RBI allows a maximum Loan-to-Value (LTV) ratio of 75% of gold's market value for NBFCs offering gold loans. Most banks are more conservative — SBI and PNB typically offer 60% LTV, while private banks offer 65%. The market value is calculated using the 30-day average gold price, not the daily spot rate, which can reduce eligibility slightly from what you calculate here.",
      },
    },
    {
      "@type": "Question",
      name: "What is 916 hallmark gold?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "916 hallmark means 91.6% pure gold, equivalent to 22 Karat. The number 916 comes from 916 parts of gold per 1,000 parts total (the remaining 84 parts are alloying metals like copper or silver that make jewellery harder). BIS hallmark 916 is the most common purity used for wedding jewellery in India. 24K (999.9 hallmark) is pure gold but too soft for intricate jewellery designs.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.utilspot.app" },
    {
      "@type": "ListItem",
      position: 2,
      name: "Gold Jewellery Calculator",
      item: "https://www.utilspot.app/gold-jewellery-calculator",
    },
  ],
};

export default function GoldJewelleryPage() {
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
          <span className="text-gray-600">Gold Jewellery Calculator</span>
        </nav>

        <IndiaBadge note="GST, TCS & RBI gold loan rules · BIS hallmark standards" />

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F2447] mb-2">
          Gold Jewellery Price Calculator — Making Charges, GST & Loan
        </h1>

        <div className="flex flex-wrap gap-3 mb-2">
          <span className="inline-flex items-center gap-1.5 text-xs bg-[#F1F5F9] text-[#475569] px-3 py-1 rounded-full font-medium">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Free tool — no login
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs bg-[#F1F5F9] text-[#475569] px-3 py-1 rounded-full font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            100% browser-based · privacy safe
          </span>
        </div>

        <p className="text-gray-500 mb-6 text-sm sm:text-base">
          Enter today&apos;s gold rate and your jewellery details to see the exact price including making charges,
          wastage, GST, and TCS. Also check old gold exchange value and gold loan eligibility.
        </p>

        <GoldCalculator />

        <AdSlot slot="7779500788" className="my-6" />

        {/* SEO Content */}
        <section className="mt-8 bg-white rounded-xl border border-gray-200 p-6 prose prose-gray max-w-none">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            How Gold Jewellery Pricing Works in India
          </h2>

          <p className="text-gray-600 leading-relaxed mb-4">
            The final price of gold jewellery in India has four distinct layers. The <strong>pure gold value</strong> is the base — calculated as weight in grams multiplied by the gold&apos;s purity percentage and the day&apos;s market rate. On top of this, jewellers add <strong>making charges</strong> — a percentage that ranges from 8% for simple plain bangles and bars to 25% or more for intricate temple or antique jewellery requiring skilled craftwork. Wastage charges (typically 2–5%) cover gold lost during the manufacturing process due to filing, melting, and polishing.
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">
            <strong>GST on gold jewellery</strong>, introduced in 2017, has two parts: 3% on the gold value and 5% on making charges. This split recognises that gold is a commodity (lower rate) while making is a service (higher rate). For a ₹1 lakh piece with ₹12,000 making charges, total GST is approximately ₹3,600 — not a flat 3% on the whole bill.
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">
            <strong>TCS (Tax Collected at Source)</strong> of 1% kicks in on purchases above ₹2 lakh per transaction (Budget 2023 provision). The jeweller collects this and deposits with the government — you claim it as a tax credit when filing your ITR, so it&apos;s not lost money.
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">
            The <strong>916 hallmark (22K)</strong> became the Indian standard for wedding jewellery because it balances purity (91.6% gold) with durability — the 8.4% alloy makes intricate designs possible. Pure 24K gold is too soft for most jewellery.
          </p>

          <p className="text-gray-600 leading-relaxed">
            For <strong>gold loans</strong>, RBI caps NBFCs at 75% LTV of the gold&apos;s market value. Banks are more conservative at 60–65%. This calculator gives you all three benchmarks instantly — the most complete free gold jewellery calculator available for Indian buyers.
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

        <AdSlot slot="2743510532" className="my-6" />

        {/* Related tools */}
        <section className="mt-2 mb-4">
          <h2 className="text-base font-semibold text-gray-700 mb-3">Related Tools</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { href: "/emi-calculator", label: "Home Loan EMI Calculator" },
              { href: "/sip-calculator", label: "SIP Calculator" },
              { href: "/income-tax-calculator", label: "Income Tax Calculator" },
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
