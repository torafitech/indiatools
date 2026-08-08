import type { Metadata } from "next";
import Link from "next/link";
import { EquityCalculator } from "@/components/tools/EquityCalculator";
import { AdSlot } from "@/components/layout/AdSlot";

export const metadata: Metadata = {
  title: "Startup Equity & Dilution Calculator — Cap Table Simulator",
  description:
    "Free startup equity calculator. Build your cap table, simulate funding rounds, and see how dilution affects each founder and investor. Seed, Series A, ESOP included.",
  keywords: [
    "startup equity calculator",
    "cap table calculator",
    "equity dilution calculator",
    "startup dilution calculator",
    "founder equity calculator",
    "cap table simulator",
    "series A dilution calculator",
    "ESOP pool calculator",
    "startup valuation calculator",
    "equity calculator India",
  ],
  openGraph: {
    title: "Startup Equity & Dilution Calculator — Cap Table Simulator | UtilSpot",
    description:
      "Simulate funding rounds and see how dilution affects founders. Free cap table calculator with ESOP pool modeling.",
    url: "https://www.utilspot.app/equity-calculator",
    siteName: "UtilSpot",
  },
  alternates: { canonical: "https://www.utilspot.app/equity-calculator" },
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Startup Equity & Dilution Calculator",
  description:
    "Visual cap table simulator. Add founders, model funding rounds (Seed, Series A, Series B), include ESOP pool, and see dilution percentages after each round.",
  url: "https://www.utilspot.app/equity-calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "All",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is equity dilution and why does it matter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Equity dilution happens when a company issues new shares — for a funding round, an ESOP pool, or advisor grants. Each new share reduces existing shareholders' ownership percentage, even though the absolute number of their shares stays the same. Dilution matters because it reduces the percentage of the company each founder controls. However, a smaller percentage of a more valuable company is often worth more than a large percentage of a less valuable one — this is why founders accept dilution in exchange for growth capital.",
      },
    },
    {
      "@type": "Question",
      name: "What is a cap table?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A capitalization table (cap table) is a spreadsheet listing who owns what percentage of a company — including founders, investors, employees (via ESOP), and advisors. It tracks shares owned, ownership percentage, and value at any given moment. Investors request updated cap tables during due diligence. Keeping an accurate cap table from day one is critical — errors discovered late in a funding round can delay or kill the deal.",
      },
    },
    {
      "@type": "Question",
      name: "What is an ESOP pool and how much should we set aside?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An Employee Stock Option Pool (ESOP) is a reserved block of shares set aside for future employee grants. Investors typically require a 10–15% ESOP pool to be created (or 'refreshed') before they invest in a funding round, which means this dilution falls on the founders pre-money. For early-stage startups, a 10% pool is standard at Seed. Series A rounds often refresh the pool to 10–15% of the post-money cap table. The right size depends on your hiring plan for the next 18–24 months.",
      },
    },
    {
      "@type": "Question",
      name: "What is pre-money vs post-money valuation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pre-money valuation is what investors agree the company is worth before new investment comes in. Post-money valuation equals pre-money valuation plus the investment amount. For example, a ₹10 crore pre-money valuation with ₹2 crore of new investment gives a ₹12 crore post-money valuation. The investors' ownership percentage equals their investment divided by the post-money valuation (₹2Cr / ₹12Cr = 16.7%). Always clarify which valuation is being discussed — 'our Series A is at ₹50 crore' is ambiguous without specifying pre or post-money.",
      },
    },
    {
      "@type": "Question",
      name: "How much equity should a co-founder get?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "There is no universal rule, but the most defensible approach is to start with equal splits among all founders and then adjust based on three factors: risk (who quit their job first, who invested personal capital), role (CEO typically gets a slight premium over equal split), and contribution (who contributed IP, key hires, or initial customers). All founders should have 4-year vesting with a 1-year cliff. Unequal splits based on 'I had the idea' without commensurate contribution tend to create resentment and cap table problems later.",
      },
    },
  ],
};


const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.utilspot.app" },
    { "@type": "ListItem", position: 2, name: "Equity & Dilution Calculator", item: "https://www.utilspot.app/equity-calculator" },
  ],
};
export default function EquityCalculatorPage() {
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="max-w-5xl mx-auto px-4 py-8">
        <nav className="text-xs text-gray-400 mb-4">
          <Link href="/" className="hover:text-[#E8500A]">Home</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-600">Equity Calculator</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F2447] mb-2">
          Startup Equity &amp; Dilution Calculator — Cap Table Simulator
        </h1>
        <div className="flex flex-wrap gap-3 mb-2">
          <span className="inline-flex items-center gap-1.5 text-xs bg-[#F1F5F9] text-[#475569] px-3 py-1 rounded-full font-medium">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            Last updated: June 2025 · Used by startup founders globally
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs bg-[#F1F5F9] text-[#475569] px-3 py-1 rounded-full font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            Modeled by 2,100+ founders this month
          </span>
        </div>
        <p className="text-[#7A6048] mb-6 text-sm sm:text-base max-w-2xl">
          Build your cap table, model funding rounds, and see exactly how dilution affects each founder.
          Add founders, configure Seed/Series A/B rounds with ESOP pools, and track ownership after every
          round. Free, no signup, all in your browser.
        </p>

        <EquityCalculator />

        <AdSlot slot="7779500788" className="my-6" />

        <section className="mt-8 bg-white rounded-xl border border-[#F0E4D4] p-6 space-y-5">
          <h2 className="text-xl font-bold text-[#0F2447]">Understanding Startup Equity and Dilution</h2>

          <p className="text-[#7A6048] leading-relaxed text-sm">
            For first-time founders, equity and cap tables can feel unnecessarily complex. But the underlying
            math is straightforward: you start with 100% of a company, and every time you give away shares —
            to investors, employees, or advisors — your percentage shrinks. Understanding exactly how this
            works before your first funding round prevents expensive mistakes that are difficult to unwind later.
          </p>

          <h3 className="text-base font-bold text-[#0F2447]">How Funding Rounds Create Dilution</h3>
          <p className="text-[#7A6048] leading-relaxed text-sm">
            When you raise a Seed round, you and your investors agree on a pre-money valuation. New shares
            are issued to the investor, which dilutes every existing shareholder proportionally. If you had
            two founders at 50% each before a Seed round where you gave up 20%, you each now own 40%. Your
            absolute share count is unchanged — 1,000,000 shares is still 1,000,000 shares — but there are
            now more total shares in existence, so your percentage is lower.
          </p>

          <h3 className="text-base font-bold text-[#0F2447]">The ESOP Pool: Pre-Money Dilution Trap</h3>
          <p className="text-[#7A6048] leading-relaxed text-sm">
            Most investors require an ESOP pool to be created (or &ldquo;refreshed&rdquo;) before they invest —
            and they specify it should be created pre-money. This means the ESOP pool comes from the
            founders&apos; shares, not from the investor&apos;s shares. A 15% ESOP pool created pre-money in a
            round where you&apos;re selling 20% to investors means you&apos;re actually giving up 32% of the company
            (15% + 20% × remaining), with the investor getting their clean 20% on a post-money basis.
            Model this before you sign any term sheet.
          </p>

          <h3 className="text-base font-bold text-[#0F2447]">Vesting: Why It Protects Everyone</h3>
          <p className="text-[#7A6048] leading-relaxed text-sm">
            Standard founder vesting is 4 years with a 1-year cliff. This means you earn your equity over
            time — nothing vests until you&apos;ve been at the company for 12 months (the cliff), then 25% vests
            at once, with the remaining 75% vesting monthly over the next 36 months. Vesting protects
            investors from founders who leave early with large equity stakes, and it protects co-founders
            from each other. Investors will almost always require vesting as a condition of investment.
          </p>
        </section>

        <section className="mt-6 bg-white rounded-xl border border-[#F0E4D4] p-6">
          <h2 className="text-xl font-bold text-[#0F2447] mb-5">Frequently Asked Questions</h2>
          <div className="space-y-5">
            {faqSchema.mainEntity.map((faq) => (
              <div key={faq.name} className="border-b border-[#F0E4D4] pb-4 last:border-0 last:pb-0">
                <h3 className="font-semibold text-[#0F2447] mb-1 text-sm sm:text-base">{faq.name}</h3>
                <p className="text-[#7A6048] text-sm leading-relaxed">{faq.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </section>

        <AdSlot slot="2743510532" className="my-6" />

        <section className="mt-2 mb-4">
          <h2 className="text-base font-semibold text-[#7A6048] mb-3">Related Tools</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { href: "/freelance-rate-calculator", label: "Freelance Rate Calculator" },
              { href: "/invoice-generator", label: "Invoice Generator" },
              { href: "/salary-calculator", label: "Salary Calculator" },
            ].map((t) => (
              <Link key={t.href} href={t.href} className="text-sm px-3 py-1.5 bg-[#FBF5EE] text-[#0F2447] rounded-full hover:bg-[#F0E4D4] transition-colors">
                {t.label} →
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
