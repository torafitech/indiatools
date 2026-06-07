import { incomeTaxVariants } from "@/lib/programmatic/incometax-variants";
import { IncomeTaxCalculator } from "@/components/tools/IncomeTaxCalculator";
import { IndiaBadge } from "@/components/ui/IndiaBadge";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { salaryLPAContent } from "@/lib/content/salary-lpa-content";

export async function generateStaticParams() {
  return incomeTaxVariants.map((v) => ({ variant: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ variant: string }>;
}): Promise<Metadata> {
  const { variant } = await params;
  const v = incomeTaxVariants.find((x) => x.slug === variant);
  if (!v) return {};
  return {
    title: v.title,
    description: v.description,
    alternates: { canonical: `https://www.utilspot.app/income-tax-calculator/${v.slug}` },
    openGraph: {
      title: v.title,
      description: v.description,
      url: `https://www.utilspot.app/income-tax-calculator/${v.slug}`,
      siteName: "UtilSpot",
    },
  };
}

export default async function IncomeTaxVariantPage({
  params,
}: {
  params: Promise<{ variant: string }>;
}) {
  const { variant } = await params;
  const v = incomeTaxVariants.find((x) => x.slug === variant);
  if (!v) notFound();

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: v.h1,
    description: v.description,
    url: `https://www.utilspot.app/income-tax-calculator/${v.slug}`,
    applicationCategory: "FinanceApplication",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <nav className="text-xs text-gray-400 mb-4">
          <Link href="/" className="hover:text-[#E8500A]">Home</Link>
          <span className="mx-2">›</span>
          <Link href="/income-tax-calculator" className="hover:text-[#E8500A]">Income Tax Calculator</Link>
          <span className="mx-2">›</span>
          <span className="text-[#7A6048]">₹{v.lpa} LPA</span>
        </nav>
        <IndiaBadge note="Uses Indian IT Act slabs, FY 2025-26 — not applicable outside India" />
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F2447] mb-2">{v.h1}</h1>
        <p className="text-[#7A6048] mb-6 text-sm sm:text-base">{v.description}</p>
        <IncomeTaxCalculator defaultIncome={v.grossIncome} />

        {/* Content section */}
        {(() => {
          const lpaSlug = v.slug === "1-crore" ? null : v.slug;
          const d = lpaSlug ? salaryLPAContent[lpaSlug] : null;
          const taxableIncome = v.grossIncome - 75000;
          const taxableIncomeLakh = (taxableIncome / 100000).toFixed(2).replace(/\.?0+$/, "");
          return (
            <section className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Income Tax on ₹{v.lpa} LPA — New vs Old Regime FY 2025–26
              </h2>
              {d ? (
                <>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{d.insight}</p>
                  <h3 className="text-base font-semibold text-gray-800 mb-2">
                    Which Regime to Choose at ₹{v.lpa} LPA?
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{d.taxTip}</p>
                </>
              ) : (
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  At ₹{v.lpa} LPA, income tax calculation is significant. The 30% slab applies on
                  income above ₹15 lakh, and a surcharge may apply at higher income levels.
                  Use the calculator above to compare new vs old regime for your specific deductions.
                </p>
              )}
              <h3 className="text-base font-semibold text-gray-800 mb-2">Standard Deduction Impact</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                The ₹75,000 standard deduction (FY 2025–26) reduces your taxable income to
                ₹{taxableIncomeLakh}L under the new regime. This is automatically applied — no
                declaration or proof of investment needed. It replaced the earlier ₹50,000
                standard deduction from FY 2024–25 onwards.
              </p>
              <h3 className="text-base font-semibold text-gray-800 mb-2">New Regime Tax Slabs (FY 2025–26)</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-600 text-sm">
                <li>Up to ₹4 lakh — Nil</li>
                <li>₹4L–₹8L — 5%</li>
                <li>₹8L–₹12L — 10%</li>
                <li>₹12L–₹16L — 15%</li>
                <li>₹16L–₹20L — 20%</li>
                <li>₹20L–₹24L — 25%</li>
                <li>Above ₹24L — 30%</li>
              </ul>
            </section>
          );
        })()}

        <section className="mt-6">
          <div className="flex flex-wrap gap-2 mb-4">
            {incomeTaxVariants
              .filter((x) => x.slug !== v.slug)
              .map((x) => (
                <Link
                  key={x.slug}
                  href={`/income-tax-calculator/${x.slug}`}
                  className="text-xs px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full hover:bg-[#FFF8F2] hover:text-[#E8500A] transition-colors"
                >
                  ₹{x.lpa} LPA →
                </Link>
              ))}
          </div>
          <Link href="/income-tax-calculator" className="text-sm text-[#E8500A] hover:underline">
            ← Back to Income Tax Calculator
          </Link>
        </section>
      </main>
    </>
  );
}
