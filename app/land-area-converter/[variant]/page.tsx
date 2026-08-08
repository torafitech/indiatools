import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { landAreaVariants } from "@/lib/programmatic/land-area-variants";
import { CITIES } from "@/data/cities";
import { LandAreaConverter, LandAreaReferenceTable } from "@/components/tools/LandAreaConverter";
import { AdSlot } from "@/components/layout/AdSlot";

export async function generateStaticParams() {
  return landAreaVariants.map((v) => ({ variant: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ variant: string }>;
}): Promise<Metadata> {
  const { variant: slug } = await params;
  const v = landAreaVariants.find((x) => x.slug === slug);
  if (!v) return {};

  return {
    title: v.metaTitle,
    description: v.metaDescription,
    alternates: {
      canonical: `https://www.utilspot.app/land-area-converter/${slug}`,
    },
    openGraph: {
      title: v.metaTitle,
      description: v.metaDescription,
      url: `https://www.utilspot.app/land-area-converter/${slug}`,
      siteName: "UtilSpot",
    },
  };
}

export default async function LandAreaVariantPage({
  params,
}: {
  params: Promise<{ variant: string }>;
}) {
  const { variant: slug } = await params;
  const v = landAreaVariants.find((x) => x.slug === slug);
  if (!v) notFound();

  const relatedCities = CITIES.filter((c) => v.constructionCitySlugs.includes(c.slug));

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: `Land Area Converter — ${v.stateName}`,
    description: v.metaDescription,
    url: `https://www.utilspot.app/land-area-converter/${slug}`,
    applicationCategory: "UtilityApplication",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: v.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.utilspot.app" },
      { "@type": "ListItem", position: 2, name: "Land Area Converter", item: "https://www.utilspot.app/land-area-converter" },
      { "@type": "ListItem", position: 3, name: v.stateName, item: `https://www.utilspot.app/land-area-converter/${slug}` },
    ],
  };

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
          <Link href="/land-area-converter" className="hover:text-[#E8500A]">Land Area Converter</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-600">{v.stateName}</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F2447] mb-2">
          {v.stateName} Land Area Converter — {v.primaryUnits.join(", ")}
        </h1>
        <p className="text-gray-500 mb-6 text-sm sm:text-base">{v.intro}</p>

        <LandAreaConverter
          defaultFromUnit={v.defaultFromUnit}
          defaultToUnit={v.defaultToUnit}
          defaultRegion={v.region}
        />

        <AdSlot slot="7779500788" className="my-6" />

        {/* Why it differs */}
        <section className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            Why {v.stateName}&apos;s Units Differ
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">{v.whyDiffers}</p>
        </section>

        {/* Per-unit sections */}
        <section className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Unit-by-Unit Reference</h2>
          <div className="space-y-5">
            {v.unitSections.map((u) => (
              <div key={u.unit} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-1">{u.unit}</h3>
                <p className="text-[#E8500A] text-sm font-semibold mb-1.5">{u.oneLiner}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{u.explanation}</p>
              </div>
            ))}
          </div>
        </section>

        <LandAreaReferenceTable region={v.region} />

        {/* Disclaimer */}
        <section className="mt-6 bg-[#FFFCF8] border border-[#F0E4D4] rounded-xl px-5 py-4">
          <p className="text-xs text-[#7A6048] flex items-start gap-1.5">
            <svg className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-[#E8500A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            For reference only — always confirm exact conversions against your local revenue
            department&apos;s official records (RTC, Pahani, Jamabandi, or equivalent) before any legal
            or transaction use.
          </p>
        </section>

        {/* FAQ */}
        <section className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-5">Frequently Asked Questions</h2>
          <div className="space-y-5">
            {v.faqs.map((f) => (
              <div key={f.q} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">{f.q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <AdSlot slot="2743510532" className="my-6" />

        {/* Cross-link to construction cost calculator cities */}
        {relatedCities.length > 0 && (
          <section className="mt-4 mb-4">
            <h2 className="text-sm font-semibold text-gray-600 mb-3">
              Planning to Build in {v.stateName}?
            </h2>
            <div className="flex flex-wrap gap-2">
              {relatedCities.map((c) => (
                <Link
                  key={c.slug}
                  href={`/construction-cost-calculator/${c.slug}`}
                  className="text-sm px-3 py-1.5 bg-[#F0F4FF] text-[#0F2447] rounded-full hover:bg-[#E5EAFF] transition-colors"
                >
                  {c.name} Construction Cost →
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Other state variants */}
        <section className="mt-4 mb-4">
          <h2 className="text-sm font-semibold text-gray-600 mb-3">Other State Land Unit Guides</h2>
          <div className="flex flex-wrap gap-2">
            {landAreaVariants
              .filter((x) => x.slug !== slug)
              .map((x) => (
                <Link
                  key={x.slug}
                  href={`/land-area-converter/${x.slug}`}
                  className="text-xs px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full hover:bg-[#F0F4FF] hover:text-[#E8500A] transition-colors"
                >
                  {x.stateName} →
                </Link>
              ))}
            <Link
              href="/land-area-converter"
              className="text-xs px-3 py-1.5 bg-[#0F2447] text-white rounded-full hover:bg-[#1A3A5C] transition-colors"
            >
              Main Converter
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
