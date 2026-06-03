import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { emiVariants } from "@/lib/programmatic/emi-variants";
import { EMICalculator } from "@/components/tools/EMICalculator";
import { AdSlot } from "@/components/layout/AdSlot";
import { calculateEMISummary } from "@/lib/calculations/emi";
import { formatINR, formatINRShort } from "@/lib/utils/format";

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
      ? `${variant.bank} ${variant.type} EMI Calculator 2025 — Current Rate ${variant.rate}%`
      : `${variant.type} EMI Calculator — ${formatINRShort(variant.defaultAmount)} at ${variant.rate}%`;

  const description =
    variant.bank
      ? `Calculate your ${variant.bank} ${variant.type} EMI instantly. Current interest rate: ${variant.rate}% p.a. Free amortization schedule, no signup.`
      : `Calculate EMI for ${formatINRShort(variant.defaultAmount)} ${variant.type.toLowerCase()} at ${variant.rate}% p.a. Free calculator with amortization schedule.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://indiatools.in/emi-calculator/${variant.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://indiatools.in/emi-calculator/${variant.slug}`,
      siteName: "IndiaTools",
    },
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
    url: `https://indiatools.in/emi-calculator/${variant.slug}`,
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
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-2">›</span>
          <Link href="/emi-calculator" className="hover:text-blue-600">EMI Calculator</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-600">{variant.bank || variant.slug}</span>
        </nav>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{heading}</h1>

        {variant.bank && (
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-5 text-sm">
            <p className="text-blue-900">
              <strong>{variant.bank}</strong> current {variant.type.toLowerCase()} interest rate:{" "}
              <strong className="text-blue-700">{variant.rate}% p.a.</strong>
            </p>
            <p className="text-blue-700 mt-1 text-xs">
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
        <section className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            About {variant.bank ? `${variant.bank} ${variant.type}` : `${formatINRShort(variant.defaultAmount)} ${variant.type}`}
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-3">
            {variant.bank
              ? `${variant.bank} offers ${variant.type.toLowerCase()}s starting from ${variant.rate}% p.a. as of 2025. The EMI for a ₹${(variant.defaultAmount / 100000).toFixed(0)} lakh loan over ${variant.defaultTenureMonths / 12} years at this rate is ${formatINR(summary.emi)} per month, with total interest of ${formatINRShort(summary.totalInterest)}.`
              : `The EMI for a ${formatINRShort(variant.defaultAmount)} ${variant.type.toLowerCase()} at ${variant.rate}% p.a. over ${variant.defaultTenureMonths / 12} years is ${formatINR(summary.emi)} per month. Total interest paid over the loan period is ${formatINRShort(summary.totalInterest)}.`
            }
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            Use the calculator above to adjust the loan amount, interest rate, and tenure to match your specific
            requirements. The amortization schedule shows exactly how much principal and interest you pay each year.
          </p>
        </section>

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
                  className="text-xs px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  {v.bank ? `${v.bank} ${v.type}` : v.slug.replace(/-/g, " ")} →
                </Link>
              ))}
            <Link
              href="/emi-calculator"
              className="text-xs px-3 py-1.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            >
              Main EMI Calculator
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
