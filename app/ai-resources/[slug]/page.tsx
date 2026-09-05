import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AI_RESOURCES, RESOURCE_TYPE_META, getResourceBySlug } from "@/data/ai-resources";
import { CopyBlock } from "@/components/tools/CopyBlock";
import { AdSlot } from "@/components/layout/AdSlot";

export async function generateStaticParams() {
  return AI_RESOURCES.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);
  if (!resource) return {};

  const meta = RESOURCE_TYPE_META[resource.type];
  const title = `${resource.title} — Free ${meta.label} Template | UtilSpot`;
  const description = resource.description.slice(0, 158);

  return {
    title,
    description,
    alternates: { canonical: `https://www.utilspot.app/ai-resources/${resource.slug}` },
    openGraph: {
      title,
      description,
      url: `https://www.utilspot.app/ai-resources/${resource.slug}`,
      siteName: "UtilSpot",
    },
  };
}

export default async function AIResourceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);
  if (!resource) notFound();

  const meta = RESOURCE_TYPE_META[resource.type];
  const related = resource.relatedSlugs
    .map((s) => getResourceBySlug(s))
    .filter((r): r is NonNullable<typeof r> => Boolean(r));

  const creativeWorkSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: resource.title,
    description: resource.description,
    url: `https://www.utilspot.app/ai-resources/${resource.slug}`,
    dateCreated: resource.dateAdded,
    genre: meta.label,
    about: resource.category,
    isAccessibleForFree: true,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: resource.faqs.map((f) => ({
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
      { "@type": "ListItem", position: 2, name: "AI Resources", item: "https://www.utilspot.app/ai-resources" },
      { "@type": "ListItem", position: 3, name: resource.title, item: `https://www.utilspot.app/ai-resources/${resource.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <nav className="text-xs text-gray-400 mb-4">
          <Link href="/" className="hover:text-[#E8500A]">Home</Link>
          <span className="mx-2">›</span>
          <Link href="/ai-resources" className="hover:text-[#E8500A]">AI Resources</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-600">{resource.title}</span>
        </nav>

        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ring-1 ${meta.badge}`}>
            {meta.icon} {meta.label}
          </span>
          <span className="text-xs bg-[#F1F5F9] text-[#475569] px-3 py-1 rounded-full font-medium">
            {resource.platform}
          </span>
          <span className="text-xs bg-[#F1F5F9] text-[#475569] px-3 py-1 rounded-full font-medium">
            {resource.category}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F2447] mb-3">{resource.title}</h1>
        <p className="text-gray-500 mb-6 text-sm sm:text-base leading-relaxed">{resource.description}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#F0E4D4]">
            <p className="text-xs font-bold text-[#0F2447] uppercase tracking-wide mb-1">Who it&apos;s for</p>
            <p className="text-sm text-[#7A6048]">{resource.whoFor}</p>
          </div>
          <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#F0E4D4]">
            <p className="text-xs font-bold text-[#0F2447] uppercase tracking-wide mb-1">Problem it solves</p>
            <p className="text-sm text-[#7A6048]">{resource.problemSolved}</p>
          </div>
        </div>

        <h2 className="text-lg font-bold text-[#0F2447] mb-3">Copy the {meta.label}</h2>
        <CopyBlock
          content={resource.content}
          downloadFilename={resource.downloadFilename}
          downloadMime={resource.downloadMime}
        />

        <AdSlot slot="0000000001" className="my-6" />

        <section className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Setup Instructions</h2>
          <ol className="space-y-3">
            {resource.setupSteps.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm text-gray-600 leading-relaxed">
                <span className="shrink-0 w-6 h-6 rounded-full bg-[#0F2447] text-white text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-5">Frequently Asked Questions</h2>
          <div className="space-y-5">
            {resource.faqs.map((faq) => (
              <div key={faq.q} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">{faq.q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <AdSlot slot="0000000002" className="my-6" />

        {related.length > 0 && (
          <section className="mt-2 mb-4">
            <h2 className="text-base font-semibold text-gray-700 mb-3">Related AI Resources</h2>
            <div className="flex flex-wrap gap-2">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/ai-resources/${r.slug}`}
                  className="text-sm px-3 py-1.5 bg-[#F0F4FF] text-[#0F2447] rounded-full hover:bg-[#E5EAFF] transition-colors"
                >
                  {r.title} →
                </Link>
              ))}
              <Link
                href="/ai-resources"
                className="text-sm px-3 py-1.5 bg-[#FFF8F2] text-[#E8500A] rounded-full hover:bg-[#FFEEDD] transition-colors"
              >
                Browse all AI resources →
              </Link>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
