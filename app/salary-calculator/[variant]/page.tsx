import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { salaryVariants } from "@/lib/programmatic/salary-variants";
import { SalaryCalculator } from "@/components/tools/SalaryCalculator";
import { AdSlot } from "@/components/layout/AdSlot";
import { calculateInHandSalary } from "@/lib/calculations/salary";
import { formatINR, formatINRShort } from "@/lib/utils/format";
import { salaryLPAContent } from "@/lib/content/salary-lpa-content";
import { salaryCityContent } from "@/lib/content/salary-city-content";
import { getCurrentFY, getCurrentYear } from "@/lib/currentFY";

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

  const year = getCurrentYear();
  const isCity = !variant.slug.match(/^\d/);
  const title = isCity
    ? `${variant.label} Salary Calculator ${year} — CTC to In-Hand for ${variant.label} Employees`
    : `${variant.label} CTC In-Hand Salary Calculator India ${year} — Take Home Pay`;

  const description = isCity
    ? `Calculate monthly in-hand salary for ${variant.label} employees. Includes ${variant.state} professional tax, PF, and income tax under new regime ${year}.`
    : `Calculate monthly in-hand salary for ${variant.label} CTC in India. Full breakdown: PF, HRA, professional tax, income tax. Free calculator ${year}.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.utilspot.app/salary-calculator/${variant.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.utilspot.app/salary-calculator/${variant.slug}`,
      siteName: "UtilSpot",
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
  const year = getCurrentYear();
  const fy = getCurrentFY();

  const heading = isCity
    ? `Salary Calculator for ${variant.label} — CTC to In-Hand ${year}`
    : `${variant.label} CTC — Monthly In-Hand Salary Breakdown India ${year}`;

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: heading,
    description: variant.description,
    url: `https://www.utilspot.app/salary-calculator/${variant.slug}`,
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
          <Link href="/salary-calculator" className="hover:text-[#E8500A]">Salary Calculator</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-600">{variant.label}</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F2447] mb-2">{heading}</h1>

        {/* Quick summary card */}
        <div className="bg-[#F0F4FF] border border-[#CBD5EF] rounded-xl p-4 mb-5 text-sm">
          <p className="text-[#0F2447]">
            For <strong>{formatINRShort(variant.ctc)} CTC</strong> in <strong>{variant.state}</strong>{" "}
            ({variant.city} city):
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-1 mt-2 text-[#0F2447]">
            <span>Monthly In-Hand: <strong className="text-[#0F2447]">{formatINR(result.inHandMonthly)}</strong></span>
            <span>Annual In-Hand: <strong className="text-[#0F2447]">{formatINRShort(result.inHandAnnual)}</strong></span>
            <span>Take-Home: <strong className="text-[#0F2447]">{result.takeHomePercent}% of CTC</strong></span>
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

        <AdSlot slot="7779500788" className="my-6" />

        {/* Variant-specific content */}
        {!isCity && salaryLPAContent[slug] ? (() => {
          const d = salaryLPAContent[slug];
          const lpa = variant.label;
          return (
            <section className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                {lpa} In-Hand Salary — Key Facts for FY {fy}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">{d.insight}</p>

              <h3 className="text-base font-semibold text-gray-800 mb-2">Who Earns {lpa}?</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {d.jobLevel}. Common roles at this package include {d.typicalRoles}.
                The estimated monthly in-hand is {d.monthlyInHand} (annual: {d.annualInHand}),
                assuming a standard metro-city salary structure with PF opted in.
              </p>

              <h3 className="text-base font-semibold text-gray-800 mb-2">Income Tax at {lpa}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {d.taxRegime}. {d.taxTip}
              </p>

              <h3 className="text-base font-semibold text-gray-800 mb-2">Monthly Deductions Breakdown</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-600 text-sm">
                <li>Employee PF: {d.pfMonthly}/month (12% of basic salary)</li>
                <li>Professional Tax: ₹150–200/month (varies by state — Delhi: ₹0)</li>
                <li>Income Tax (TDS): Deducted monthly based on annual projection</li>
              </ul>
            </section>
          );
        })() : isCity && salaryCityContent[slug] ? (() => {
          const d = salaryCityContent[slug];
          return (
            <section className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Salary Calculator for {variant.label} — What to Know
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">{d.insight}</p>

              <h3 className="text-base font-semibold text-gray-800 mb-2">
                Professional Tax in {d.state}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {d.professionalTax}. {d.ptNote}.
              </p>

              <h3 className="text-base font-semibold text-gray-800 mb-2">Cost of Living Context</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {d.costNote} Factor this into your savings planning alongside your in-hand salary.
                Employees in {variant.label} should budget rent as a fixed monthly expense before
                calculating investable surplus from their take-home.
              </p>

              <h3 className="text-base font-semibold text-gray-800 mb-2">
                Salary Benchmarks in {variant.label}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {d.industry}. Typical salary range: {d.avgSalary}. The calculator is pre-filled
                with a representative CTC for this city — adjust to your exact package.
              </p>
            </section>
          );
        })() : (
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
              and city type to match your specific situation. All calculations use FY {fy} tax slabs.
            </p>
          </section>
        )}

        <AdSlot slot="2743510532" className="my-6" />

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
                  className="text-xs px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full hover:bg-[#F0F4FF] hover:text-[#E8500A] transition-colors"
                >
                  {v.label} →
                </Link>
              ))}
            <Link
              href="/salary-calculator"
              className="text-xs px-3 py-1.5 bg-[#0F2447] text-white rounded-full hover:bg-[#1A3A5C] transition-colors"
            >
              Main Salary Calculator
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
