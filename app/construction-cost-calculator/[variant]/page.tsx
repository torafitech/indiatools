import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { constructionVariants } from "@/lib/programmatic/construction-variants";
import { CITIES } from "@/data/cities";
import { ConstructionCalculator } from "@/components/tools/ConstructionCalculator";
import { AdSlot } from "@/components/layout/AdSlot";
import { formatINRShort } from "@/lib/utils/format";

export async function generateStaticParams() {
  return constructionVariants.map((v) => ({ variant: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ variant: string }>;
}): Promise<Metadata> {
  const { variant: slug } = await params;
  const v = constructionVariants.find((x) => x.slug === slug);
  if (!v) return {};

  const title = `Construction Cost per Sqft in ${v.cityName} 2025 — Home Building Cost`;
  const description = `Calculate home construction cost in ${v.cityName}, ${v.state}. Standard rate: ₹${v.standardCostPerSqft}/sqft. Basic, standard, and premium estimates for 2025.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.utilspot.app/construction-cost-calculator/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.utilspot.app/construction-cost-calculator/${slug}`,
      siteName: "UtilSpot",
    },
  };
}

export default async function ConstructionVariantPage({
  params,
}: {
  params: Promise<{ variant: string }>;
}) {
  const { variant: slug } = await params;
  const v = constructionVariants.find((x) => x.slug === slug);
  if (!v) notFound();

  const city = CITIES.find((c) => c.slug === slug);
  if (!city) notFound();

  const tierLabel = city.tier === 1 ? "metro" : city.tier === 2 ? "tier-2" : "tier-3";

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: `Construction Cost Calculator — ${v.cityName}`,
    description: `Home construction cost estimator for ${v.cityName}, ${v.state}. Rates as of 2025.`,
    url: `https://www.utilspot.app/construction-cost-calculator/${slug}`,
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
          <Link href="/construction-cost-calculator" className="hover:text-[#E8500A]">
            Construction Cost Calculator
          </Link>
          <span className="mx-2">›</span>
          <span className="text-gray-600">{v.cityName}</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F2447] mb-2">
          Construction Cost per Sqft in {v.cityName} 2025 — Home Building Cost
        </h1>

        {/* City rate summary card */}
        <div className="bg-[#F0F4FF] border border-[#CBD5EF] rounded-xl p-4 mb-5">
          <p className="text-[#0F2447] text-sm font-medium mb-2">
            2025 construction rates in {v.cityName}, {v.state} ({tierLabel} city)
          </p>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-white rounded-lg px-3 py-2 border border-[#CBD5EF]">
              <p className="text-xs text-gray-500 mb-0.5">Basic</p>
              <p className="font-bold text-gray-900 text-sm">₹{city.basicCostPerSqft}/sqft</p>
            </div>
            <div className="bg-white rounded-lg px-3 py-2 border border-[#CBD5EF] ring-1 ring-[#CBD5EF]">
              <p className="text-xs text-[#E8500A] mb-0.5 font-medium">Standard</p>
              <p className="font-bold text-[#0F2447] text-sm">₹{city.standardCostPerSqft}/sqft</p>
            </div>
            <div className="bg-white rounded-lg px-3 py-2 border border-[#CBD5EF]">
              <p className="text-xs text-gray-500 mb-0.5">Premium</p>
              <p className="font-bold text-gray-900 text-sm">₹{city.premiumCostPerSqft}/sqft</p>
            </div>
          </div>
          <p className="text-xs text-[#E8500A] mt-2">
            A 1,000 sqft standard home in {v.cityName} costs approximately{" "}
            <strong>{formatINRShort(city.standardCostPerSqft * 1000)}</strong> to build
            (before contingency).
          </p>
        </div>

        <p className="text-gray-500 mb-5 text-sm">
          Pre-filled with {v.cityName} rates. Adjust the area and construction type to match
          your project.
        </p>

        <ConstructionCalculator defaultCitySlug={slug} />

        <AdSlot slot="CONSTRUCTION_VARIANT_AFTER_RESULT" className="my-6" />

        {/* City-specific content */}
        <section className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            Home Construction Cost in {v.cityName} — What to Expect
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-3">
            {v.cityName} is a {tierLabel} city in {v.state} where residential construction rates
            range from ₹{city.basicCostPerSqft}/sqft for basic construction to
            ₹{city.premiumCostPerSqft}/sqft for premium finishes as of 2025. Standard construction —
            the most popular choice for self-use homes — costs ₹{city.standardCostPerSqft}/sqft,
            meaning a 1,500 sqft home would cost approximately{" "}
            {formatINRShort(city.standardCostPerSqft * 1500)} in construction cost
            (excluding land, approvals, and architect fees).
          </p>
          <p className="text-gray-600 text-sm leading-relaxed mb-3">
            Labour rates in {v.cityName} are
            {city.tier === 1
              ? " among the highest in India, driven by high living costs and strong demand from commercial construction projects"
              : city.tier === 2
              ? " moderate compared to metro cities, making it relatively cost-effective to build"
              : " comparatively lower than metros, which significantly reduces your overall construction budget"
            }
            . Material costs largely follow national prices for cement and steel, but local
            aggregates, bricks, and sand sourcing can vary by ₹50–₹150/sqft depending on
            proximity to quarries and transport routes.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            When budgeting your project in {v.cityName}, add architect fees (typically 3–5% of
            construction cost), building plan approval charges from the local municipal body,
            and a 10% contingency buffer on top of the construction estimate above.
          </p>
        </section>

        <AdSlot slot="CONSTRUCTION_VARIANT_BELOW_CONTENT" className="my-6" />

        {/* Related city links */}
        <section className="mt-4 mb-4">
          <h2 className="text-sm font-semibold text-gray-600 mb-3">
            Construction Costs in Other Cities
          </h2>
          <div className="flex flex-wrap gap-2">
            {constructionVariants
              .filter((x) => x.slug !== slug)
              .slice(0, 8)
              .map((x) => (
                <Link
                  key={x.slug}
                  href={`/construction-cost-calculator/${x.slug}`}
                  className="text-xs px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full hover:bg-[#F0F4FF] hover:text-[#E8500A] transition-colors"
                >
                  {x.cityName} →
                </Link>
              ))}
            <Link
              href="/construction-cost-calculator"
              className="text-xs px-3 py-1.5 bg-blue-600 text-white rounded-full hover:bg-[#1A3A5C] transition-colors"
            >
              All Cities
            </Link>
          </div>
        </section>

        {/* Cross-tool links */}
        <section className="mt-4 mb-4">
          <h2 className="text-sm font-semibold text-gray-600 mb-3">Planning to Finance?</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { href: "/emi-calculator", label: "Home Loan EMI Calculator" },
              { href: "/income-tax-calculator", label: "Income Tax Calculator" },
              { href: "/sip-calculator", label: "SIP Calculator" },
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
