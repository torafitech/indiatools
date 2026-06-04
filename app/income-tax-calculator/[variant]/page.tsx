import { incomeTaxVariants } from "@/lib/programmatic/incometax-variants";
import { IncomeTaxCalculator } from "@/components/tools/IncomeTaxCalculator";
import { IndiaBadge } from "@/components/ui/IndiaBadge";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

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
        <h1 className="text-2xl sm:text-3xl font-bold text-[#0F2447] mb-2">{v.h1}</h1>
        <p className="text-[#7A6048] mb-6 text-sm sm:text-base">{v.description}</p>
        <IncomeTaxCalculator defaultIncome={v.grossIncome} />
        <section className="mt-6">
          <div className="flex flex-wrap gap-2 mb-4">
            {incomeTaxVariants
              .filter((x) => x.slug !== v.slug)
              .map((x) => (
                <Link
                  key={x.slug}
                  href={`/income-tax-calculator/${x.slug}`}
                  className="text-xs px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full hover:bg-amber-50 hover:text-amber-700 transition-colors"
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
