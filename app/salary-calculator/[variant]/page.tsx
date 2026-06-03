import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { salaryVariants } from "@/lib/programmatic/salary-variants";
import { SalaryCalculator } from "@/components/tools/SalaryCalculator";
import { AdSlot } from "@/components/layout/AdSlot";
import { calculateInHandSalary } from "@/lib/calculations/salary";
import { formatINR, formatINRShort } from "@/lib/utils/format";

export async function generateStaticParams() {
  return salaryVariants.map((v) => ({ variant: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ variant: string }>;
}): Promise<Metadata> {
  const { variant: slug } = await params;
  const variant = salaryVariants.find((v) => v.slug === slug);
  if (!variant) return {};

  const isCity = !variant.slug.match(/^\d/);
  const title = isCity
    ? `${variant.label} Salary Calculator 2025 — CTC to In-Hand for ${variant.label} Employees`
    : `${variant.label} CTC In-Hand Salary Calculator India 2025 — Take Home Pay`;

  const description = isCity
    ? `Calculate monthly in-hand salary for ${variant.label} employees. Includes ${variant.state} professional tax, PF, and income tax under new regime 2025.`
    : `Calculate monthly in-hand salary for ${variant.label} CTC in India. Full breakdown: PF, HRA, professional tax, income tax. Free calculator 2025.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://indiatools.in/salary-calculator/${variant.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://indiatools.in/salary-calculator/${variant.slug}`,
      siteName: "IndiaTools",
    },
  };
}

export default async function SalaryVariantPage({
  params,
}: {
  params: Promise<{ variant: string }>;
}) {
  const { variant: slug } = await params;
  const variant = salaryVariants.find((v) => v.slug === slug);
  if (!variant) notFound();

  const result = calculateInHandSalary(variant.ctc, true, variant.state, variant.city);

  const isCity = !variant.slug.match(/^\d/);

  const heading = isCity
    ? `Salary Calculator for ${variant.label} — CTC to In-Hand 2025`
    : `${variant.label} CTC — Monthly In-Hand Salary Breakdown India 2025`;

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: heading,
    description: variant.description,
    url: `https://indiatools.in/salary-calculator/${variant.slug}`,
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
          <Link href="/salary-calculator" className="hover:text-blue-600">Salary Calculator</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-600">{variant.label}</span>
        </nav>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{heading}</h1>

        {/* Quick summary card */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-5 text-sm">
          <p className="text-blue-900">
            For <strong>{formatINRShort(variant.ctc)} CTC</strong> in <strong>{variant.state}</strong>{" "}
            ({variant.city} city):
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-1 mt-2 text-blue-700">
            <span>Monthly In-Hand: <strong className="text-blue-800">{formatINR(result.inHandMonthly)}</strong></span>
            <span>Annual In-Hand: <strong className="text-blue-800">{formatINRShort(result.inHandAnnual)}</strong></span>
            <span>Take-Home: <strong className="text-blue-800">{result.takeHomePercent}% of CTC</strong></span>
          </div>
        </div>

        <p className="text-gray-500 mb-5 text-sm">
          Pre-filled for {isCity ? `${variant.label} (${variant.state})` : `${variant.label} package`}.
          Adjust sliders to match your actual CTC and deduction preferences.
        </p>

        <SalaryCalculator
          defaultCTC={variant.ctc}
          defaultState={variant.state}
          defaultCity={variant.city}
          defaultPF
        />

        <AdSlot slot="SALARY_VARIANT_AFTER_RESULT" className="my-6" />

        {/* Variant-specific content */}
        <section className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            {isCity
              ? `${variant.label} Salary Structure & Professional Tax`
              : `${variant.label} CTC Breakdown`}
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-3">
            {isCity
              ? `Employees in ${variant.label} are subject to ${variant.state} professional tax rules. With a typical CTC of ${formatINRShort(variant.ctc)}, the monthly gross comes to approximately ${formatINR(result.grossMonthly)}, and after PF, professional tax (${formatINR(result.professionalTax)}/month), and income tax deductions, the monthly in-hand salary is approximately ${formatINR(result.inHandMonthly)}.`
              : `A ${variant.label} package in India translates to approximately ${formatINR(result.grossMonthly)}/month gross salary. After standard deductions including employee PF (${formatINR(result.employeePF)}/month) and income tax (${formatINR(result.incomeTaxMonthly)}/month under new regime), the monthly in-hand salary is ${formatINR(result.inHandMonthly)}.`
            }
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            The calculator above is pre-filled with typical values but you can adjust the CTC, PF opt-in,
            and city type to match your specific situation. All calculations use FY 2025-26 tax slabs.
          </p>
        </section>

        <AdSlot slot="SALARY_VARIANT_BELOW_CONTENT" className="my-6" />

        {/* Related variants */}
        <section className="mt-4 mb-4">
          <h2 className="text-sm font-semibold text-gray-600 mb-3">Other Salary Calculators</h2>
          <div className="flex flex-wrap gap-2">
            {salaryVariants
              .filter((v) => v.slug !== slug)
              .slice(0, 8)
              .map((v) => (
                <Link
                  key={v.slug}
                  href={`/salary-calculator/${v.slug}`}
                  className="text-xs px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  {v.label} →
                </Link>
              ))}
            <Link
              href="/salary-calculator"
              className="text-xs px-3 py-1.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            >
              Main Salary Calculator
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
