import type { Metadata } from "next";
import Link from "next/link";
import { SEOAnalyzer } from "@/components/tools/SEOAnalyzer";
import { AdSlot } from "@/components/layout/AdSlot";

export const metadata: Metadata = {
  title: "Free Website SEO Analyzer — Instant On-Page SEO Audit",
  description:
    "Free website SEO checker. Enter any URL to get an instant on-page audit: title, meta description, H-tags, images, canonical, Open Graph, and robots meta. No signup.",
  keywords: [
    "free SEO analyzer",
    "website SEO checker",
    "on-page SEO audit",
    "SEO checker tool",
    "meta description checker",
    "title tag checker",
    "SEO audit tool free",
    "website SEO score",
    "on-page SEO analysis",
    "SEO checker online",
  ],
  openGraph: {
    title: "Free Website SEO Analyzer — Instant On-Page SEO Audit | UtilSpot",
    description:
      "Enter any URL for an instant on-page SEO audit. Checks title, meta, H1, images, canonical, OG tags, robots. Free, no signup.",
    url: "https://www.utilspot.app/seo-analyzer",
    siteName: "UtilSpot",
  },
  alternates: { canonical: "https://www.utilspot.app/seo-analyzer" },
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Free Website SEO Analyzer",
  description:
    "Instant on-page SEO audit tool. Enter any URL to check title tags, meta descriptions, heading structure, image alt text, canonical tags, Open Graph, and more.",
  url: "https://www.utilspot.app/seo-analyzer",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "All",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does this SEO analyzer check?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This tool audits the most critical on-page SEO elements: title tag (length, presence), meta description (length, presence), H1 count and content, H2 structure, images with and without alt text, canonical tag, robots meta directive, Open Graph tags (og:title, og:description, og:image), lang attribute, and viewport meta tag. Each check is scored and color-coded so you can quickly identify issues.",
      },
    },
    {
      "@type": "Question",
      name: "How is the SEO score calculated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The score is calculated by checking each SEO element against best-practice thresholds. Title between 50–60 characters scores full points; too short or too long loses points. Meta description between 150–160 characters is ideal. Exactly one H1 tag, all images with alt text, a self-referencing canonical, OG tags present, and a lang attribute each contribute to the final score out of 100.",
      },
    },
    {
      "@type": "Question",
      name: "Why can't you fetch some URLs?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Some websites block server-side requests using firewall rules, Cloudflare protection, or bot detection. If a URL cannot be fetched, the tool will display an error. Try checking the URL in a browser first to confirm it's publicly accessible. Pages behind login walls, staging environments with IP restrictions, or sites with strict User-Agent filters may not be checkable.",
      },
    },
    {
      "@type": "Question",
      name: "What is a canonical tag and why does it matter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A canonical tag (<link rel='canonical'>) tells search engines which URL is the 'official' version of a page. This prevents duplicate content issues when the same content is accessible via multiple URLs (e.g. with/without trailing slash, with/without query parameters). A missing canonical tag can lead to ranking dilution if search engines index multiple versions of the same page.",
      },
    },
    {
      "@type": "Question",
      name: "Does a perfect SEO score guarantee first page rankings?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. On-page SEO is one of many ranking factors. This tool checks technical on-page signals — which are necessary but not sufficient for high rankings. Off-page factors (backlinks, domain authority), page speed, Core Web Vitals, content quality, topical relevance, and search intent alignment all matter significantly. A perfect on-page score removes technical barriers, but great rankings also require quality content and authority.",
      },
    },
  ],
};


const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.utilspot.app" },
    { "@type": "ListItem", position: 2, name: "Website SEO Analyzer", item: "https://www.utilspot.app/seo-analyzer" },
  ],
};
export default function SEOAnalyzerPage() {
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
          <span className="text-gray-600">SEO Analyzer</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F2447] mb-2">
          Free Website SEO Analyzer — Instant On-Page Audit
        </h1>
        <div className="flex flex-wrap gap-3 mb-2">
          <span className="inline-flex items-center gap-1.5 text-xs bg-[#F1F5F9] text-[#475569] px-3 py-1 rounded-full font-medium">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            Last updated: June 2025 · Free, no login needed
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs bg-[#F1F5F9] text-[#475569] px-3 py-1 rounded-full font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            Audited by 3,400+ pages this month
          </span>
        </div>
        <p className="text-[#7A6048] mb-6 text-sm sm:text-base max-w-2xl">
          Enter any URL to get an instant on-page SEO audit. Checks title tags, meta description,
          heading structure, image alt text, canonical, Open Graph tags, and more. Free, no signup.
        </p>

        <SEOAnalyzer />

        <AdSlot slot="SEO_AFTER_RESULT" className="my-6" />

        <section className="mt-8 bg-white rounded-xl border border-[#F0E4D4] p-6 space-y-5">
          <h2 className="text-xl font-bold text-[#0F2447]">On-Page SEO: What Actually Moves the Needle</h2>

          <p className="text-[#7A6048] leading-relaxed text-sm">
            On-page SEO refers to everything you can control directly on a webpage to help search engines understand
            and rank it. Unlike off-page signals like backlinks — which depend on other sites — on-page factors are
            entirely within your control. Getting these right is the baseline requirement before any other SEO
            strategy makes sense. A technically broken page will underperform regardless of how many backlinks
            it earns.
          </p>

          <h3 className="text-base font-bold text-[#0F2447]">Title Tags: The Single Most Important On-Page Signal</h3>
          <p className="text-[#7A6048] leading-relaxed text-sm">
            Your title tag appears as the blue clickable headline in Google search results. It should be 50–60
            characters long (Google truncates longer titles), contain your primary keyword near the front, and
            accurately describe the page content. Each page on your site needs a unique title. Generic titles
            like &ldquo;Home&rdquo; or &ldquo;Page 1&rdquo; are wasted opportunities. A good formula: Primary Keyword — Secondary Keyword
            | Brand Name.
          </p>

          <h3 className="text-base font-bold text-[#0F2447]">Meta Descriptions: Click-Through Rate Optimization</h3>
          <p className="text-[#7A6048] leading-relaxed text-sm">
            Meta descriptions don&apos;t directly influence rankings, but they appear as the snippet below the title
            in search results and heavily influence whether someone clicks your link. Keep them 150–160 characters,
            write them as a mini advertisement for the page, include the primary keyword naturally, and end with
            a subtle call to action. Missing meta descriptions let Google choose arbitrary text from your page —
            which is often suboptimal.
          </p>

          <h3 className="text-base font-bold text-[#0F2447]">Heading Structure: H1 Through H6</h3>
          <ul className="list-disc pl-5 space-y-2 text-[#7A6048] text-sm">
            <li><strong className="text-[#0F2447]">One H1 per page:</strong> The H1 is your page&apos;s main topic. Having multiple H1s confuses search engines about what the page is primarily about.</li>
            <li><strong className="text-[#0F2447]">H2s as section headers:</strong> Use H2s for major sections. Include secondary keywords naturally — don&apos;t keyword-stuff.</li>
            <li><strong className="text-[#0F2447]">Don&apos;t skip levels:</strong> Going from H1 directly to H3 (skipping H2) breaks semantic document structure and is flagged as an accessibility issue too.</li>
          </ul>

          <h3 className="text-base font-bold text-[#0F2447]">Image Optimization: Alt Text and File Names</h3>
          <p className="text-[#7A6048] leading-relaxed text-sm">
            Every image needs an alt attribute that describes the image content. Search engines use alt text to
            understand images since they can&apos;t see them visually. Alt text also serves accessibility purposes for
            screen reader users. Descriptive alt text (not stuffed with keywords) helps your images appear in
            Google Image Search and contributes to the page&apos;s overall topic relevance. Decorative images can use
            empty alt=&quot;&quot; to signal they can be ignored by screen readers.
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

        <AdSlot slot="SEO_BELOW_FAQ" className="my-6" />

        <section className="mt-2 mb-4">
          <h2 className="text-base font-semibold text-[#7A6048] mb-3">Related Tools</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { href: "/accessibility-checker", label: "Accessibility Checker" },
              { href: "/readme-generator", label: "README Generator" },
              { href: "/word-counter", label: "Word Counter" },
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
