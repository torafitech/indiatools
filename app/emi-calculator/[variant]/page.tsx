import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { emiVariants } from "@/lib/programmatic/emi-variants";
import { EMICalculator } from "@/components/tools/EMICalculator";
import { AdSlot } from "@/components/layout/AdSlot";
import { calculateEMISummary } from "@/lib/calculations/emi";
import { formatINR, formatINRShort } from "@/lib/utils/format";
import { getCurrentYear } from "@/lib/currentFY";

const year = getCurrentYear();

export async function generateStaticParams() {
  return emiVariants.map((v) => ({ variant: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ variant: string }>;
}): Promise<Metadata> {
  const { variant: slug } = await params;
  const variant = emiVariants.find((v) => v.slug === slug);
  if (!variant) return {};

  const title =
    variant.bank
      ? `${variant.bank} ${variant.type} EMI Calculator ${year} — Current Rate ${variant.rate}%`
      : `${variant.type} EMI Calculator — ${formatINRShort(variant.defaultAmount)} at ${variant.rate}%`;

  const description =
    variant.bank
      ? `Calculate your ${variant.bank} ${variant.type} EMI instantly. Current interest rate: ${variant.rate}% p.a. Free amortization schedule, no signup.`
      : `Calculate EMI for ${formatINRShort(variant.defaultAmount)} ${variant.type.toLowerCase()} at ${variant.rate}% p.a. Free calculator with amortization schedule.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.utilspot.app/emi-calculator/${variant.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.utilspot.app/emi-calculator/${variant.slug}`,
      siteName: "UtilSpot",
    },
    // Bank×loan-type pages are template-generated with only bankName/rate swapped —
    // thin content, noindex to avoid diluting crawl budget. Amount-only pages
    // (20-lakh-home-loan etc.) answer a genuinely different query and stay indexed.
    ...(variant.bank ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function VariantPage({
  params,
}: {
  params: Promise<{ variant: string }>;
}) {
  const { variant: slug } = await params;
  const variant = emiVariants.find((v) => v.slug === slug);
  if (!variant) notFound();

  const summary = calculateEMISummary(
    variant.defaultAmount,
    variant.rate,
    variant.defaultTenureMonths
  );

  const heading = variant.bank
    ? `${variant.bank} ${variant.type} EMI Calculator — ${variant.rate}% Rate`
    : `${formatINRShort(variant.defaultAmount)} ${variant.type} EMI Calculator`;

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: heading,
    description: variant.description,
    url: `https://www.utilspot.app/emi-calculator/${variant.slug}`,
    applicationCategory: "FinanceApplication",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-xs text-gray-400 mb-4">
          <Link href="/" className="hover:text-[#E8500A]">Home</Link>
          <span className="mx-2">›</span>
          <Link href="/emi-calculator" className="hover:text-[#E8500A]">EMI Calculator</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-600">{variant.bank || variant.slug}</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F2447] mb-2">{heading}</h1>

        {variant.bank && (
          <div className="bg-[#F0F4FF] border border-[#CBD5EF] rounded-xl p-4 mb-5 text-sm">
            <p className="text-[#0F2447]">
              <strong>{variant.bank}</strong> current {variant.type.toLowerCase()} interest rate:{" "}
              <strong className="text-[#0F2447]">{variant.rate}% p.a.</strong>
            </p>
            <p className="text-[#0F2447] mt-1 text-xs">
              For a {formatINRShort(variant.defaultAmount)} loan over {variant.defaultTenureMonths / 12} years —
              estimated monthly EMI: <strong>{formatINR(summary.emi)}</strong>
            </p>
          </div>
        )}

        <p className="text-gray-500 mb-5 text-sm">
          Pre-filled with {variant.bank ? `${variant.bank}'s` : "standard"} current {variant.type.toLowerCase()} rate.
          Adjust the sliders to match your actual loan details.
        </p>

        <EMICalculator
          defaultAmount={variant.defaultAmount}
          defaultRate={variant.rate}
          defaultTenure={variant.defaultTenureMonths}
          defaultType={variant.type === "Home Loan" ? 0 : variant.type === "Car Loan" ? 1 : 2}
        />

        <AdSlot slot="VARIANT_AFTER_RESULT" className="my-6" />

        {/* Variant-specific content */}
        {variant.bank ? (
          <section className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              {variant.bank} {variant.type} — Rates &amp; Key Facts {year}
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              {variant.bank} currently offers {variant.type.toLowerCase()} interest rates starting at{" "}
              {variant.rate}% per annum (subject to credit score and LTV ratio). EMI on a{" "}
              {formatINRShort(variant.defaultAmount)} loan over {variant.defaultTenureMonths / 12} years
              at {variant.rate}% works out to approximately{" "}
              <strong className="text-gray-800">{formatINR(summary.emi)}/month</strong>.
              Total interest paid over the full tenure is{" "}
              <strong className="text-gray-800">{formatINRShort(summary.totalInterest)}</strong>.
            </p>

            <h3 className="text-base font-semibold text-gray-800 mb-2">
              Factors That Affect Your Actual Rate
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              The {variant.rate}% shown is the base rate for salaried borrowers with a CIBIL score of 750+.
              Your actual rate depends on: credit score (750+ gets best rates, below 700 attracts a 0.5–1%
              premium), loan-to-value ratio (80% LTV is standard — higher LTV means higher rate), employment
              type (salaried vs self-employed), and the property type and age.
            </p>

            <h3 className="text-base font-semibold text-gray-800 mb-2">Processing Fees &amp; Charges</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Most banks charge 0.25%–1% of the loan amount as a one-time processing fee. For a{" "}
              {formatINRShort(variant.defaultAmount)} loan, this is{" "}
              {formatINR(variant.defaultAmount * 0.005)}–{formatINR(variant.defaultAmount * 0.01)}.
              Compare total cost of loan (interest + fees + insurance) rather than just the headline rate.
            </p>

            <h3 className="text-base font-semibold text-gray-800 mb-2">Tips to Get a Lower Rate</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-600 text-sm">
              <li>Maintain a CIBIL score above 750 — check it free at CIBIL.com before applying</li>
              <li>Keep your total EMI obligations below 40–50% of monthly income</li>
              <li>Make a higher down payment to reduce LTV below 80%</li>
              <li>Apply for a balance transfer if rates drop 0.5%+ after your loan starts</li>
            </ul>
          </section>
        ) : (
          <section className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              {formatINRShort(variant.defaultAmount)} {variant.type} — EMI &amp; Interest Breakdown
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              For a {formatINRShort(variant.defaultAmount)} {variant.type.toLowerCase()} at{" "}
              {variant.rate}% p.a. over {variant.defaultTenureMonths / 12} years, the monthly EMI is{" "}
              <strong className="text-gray-800">{formatINR(summary.emi)}</strong>. Total interest
              paid over the full tenure is{" "}
              <strong className="text-gray-800">{formatINRShort(summary.totalInterest)}</strong> — roughly{" "}
              {Math.round((summary.totalInterest / variant.defaultAmount) * 100)}% of the principal.
              Adjusting tenure or rate by even 0.5% can save ₹1–3 lakh over the life of the loan.
            </p>

            <h3 className="text-base font-semibold text-gray-800 mb-2">How to Reduce Total Interest</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              The most effective strategies: make a larger down payment to reduce the principal, choose
              a shorter tenure (higher EMI but far less total interest), and make annual prepayments of
              1–2 months&apos; EMI value. A single annual prepayment of ₹50,000 can cut 2–3 years off a
              20-year loan.
            </p>

            <h3 className="text-base font-semibold text-gray-800 mb-2">Choosing the Right Bank</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Rates vary across banks by 0.25–0.5%. For a{" "}
              {formatINRShort(variant.defaultAmount)} loan, a 0.5% rate difference changes your EMI by{" "}
              approximately {formatINR(Math.round(variant.defaultAmount * 0.005 / 1200))} per month and saves{" "}
              {formatINRShort(Math.round(variant.defaultAmount * 0.005 / 1200 * variant.defaultTenureMonths))} in
              total interest. Compare at least 3 banks before finalising.
            </p>
          </section>
        )}

        <AdSlot slot="VARIANT_BELOW_CONTENT" className="my-6" />

        {/* Related variant links */}
        <section className="mt-4 mb-4">
          <h2 className="text-sm font-semibold text-gray-600 mb-3">Other EMI Calculators</h2>
          <div className="flex flex-wrap gap-2">
            {emiVariants
              .filter((v) => v.slug !== slug && v.type === variant.type)
              .slice(0, 5)
              .map((v) => (
                <Link
                  key={v.slug}
                  href={`/emi-calculator/${v.slug}`}
                  className="text-xs px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full hover:bg-[#F0F4FF] hover:text-[#E8500A] transition-colors"
                >
                  {v.bank ? `${v.bank} ${v.type}` : v.slug.replace(/-/g, " ")} →
                </Link>
              ))}
            <Link
              href="/emi-calculator"
              className="text-xs px-3 py-1.5 bg-[#0F2447] text-white rounded-full hover:bg-[#1A3A5C] transition-colors"
            >
              Main EMI Calculator
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
