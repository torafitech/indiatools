import type { Metadata } from "next";
import Link from "next/link";
import { LinkedInBooleanSearchGenerator } from "@/components/tools/LinkedInBooleanSearchGenerator";
import { AdSlot } from "@/components/layout/AdSlot";

export const metadata: Metadata = {
  title: "LinkedIn Boolean Search Generator — Free X-Ray Search Query Builder | UtilSpot",
  description:
    "Build LinkedIn X-ray search queries for Google in seconds. Find people by title, location & company, or find alumni by school. Free, no signup, runs entirely in your browser.",
  keywords: [
    "linkedin boolean search generator",
    "linkedin x-ray search",
    "linkedin sourcing tool",
    "boolean search string generator",
    "recruiter search tool",
    "linkedin search operators",
    "free x-ray search generator",
  ],
  openGraph: {
    title: "LinkedIn Boolean Search Generator — Free X-Ray Search Query Builder",
    description:
      "Build LinkedIn X-ray search queries for Google in seconds. Find people by title, location & company, or find alumni by school.",
    url: "https://www.utilspot.app/linkedin-boolean-search-generator",
    siteName: "UtilSpot",
  },
  alternates: { canonical: "https://www.utilspot.app/linkedin-boolean-search-generator" },
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "LinkedIn Boolean Search Generator",
  description:
    "Free online LinkedIn X-ray search query builder. Generates Google site: search strings to find public LinkedIn profiles by role, location, company, or school — no scraping, no login required.",
  url: "https://www.utilspot.app/linkedin-boolean-search-generator",
  applicationCategory: "BusinessApplication",
  operatingSystem: "All",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is LinkedIn X-ray search?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "X-ray search means using a regular search engine's site: operator to search inside a specific website — in this case, site:linkedin.com/in searches only public LinkedIn profile pages. It's a way to search LinkedIn through Google instead of LinkedIn's own search box, which is often rate-limited or requires a paid account for advanced filters.",
      },
    },
    {
      "@type": "Question",
      name: "Does this tool access private LinkedIn data?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. This only surfaces public LinkedIn profile pages that Google has already indexed — the same pages you'd find by browsing LinkedIn while logged out. It doesn't scrape, log in, or bypass any privacy setting. If a profile isn't public or isn't indexed by Google, it won't show up.",
      },
    },
    {
      "@type": "Question",
      name: "Why use Google instead of LinkedIn's own search?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "LinkedIn's free search caps results and limits how specific your filters can be unless you pay for Recruiter or Sales Navigator. Google has no such cap, supports OR/AND/exclusion operators natively, and often surfaces profiles LinkedIn's internal search misses. It's the same technique recruiters and sales teams have used for over a decade.",
      },
    },
    {
      "@type": "Question",
      name: "Who uses X-ray search?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Recruiters sourcing candidates by title and location, salespeople doing outbound prospecting at target companies, and founders looking for co-founders, advisors, or early hires from a specific school or company background.",
      },
    },
    {
      "@type": "Question",
      name: "Why did my search return no results?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Very narrow combinations (rare title + small city + specific company) may simply have zero matching public, indexed profiles. Try dropping one filter — company or extra keyword are usually the safest to remove first — and re-run the search.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.utilspot.app" },
    { "@type": "ListItem", position: 2, name: "LinkedIn Boolean Search Generator", item: "https://www.utilspot.app/linkedin-boolean-search-generator" },
  ],
};

export default function LinkedInBooleanSearchGeneratorPage() {
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

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-xs text-gray-400 mb-4">
          <Link href="/" className="hover:text-[#E8500A]">Home</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-600">LinkedIn Boolean Search Generator</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F2447] mb-2">
          LinkedIn Boolean Search Generator
        </h1>
        <p className="text-[#7A6048] mb-6 text-sm sm:text-base">
          Build a Google X-ray search query for public LinkedIn profiles — by role, location, and
          company, or by school for alumni search. No signup, nothing leaves your browser.
        </p>

        <LinkedInBooleanSearchGenerator />

        <AdSlot slot="7779500788" className="my-6" />

        {/* SEO Content */}
        <section className="mt-8 bg-white rounded-xl border border-[#F0E4D4] p-6 space-y-4">
          <h2 className="text-xl font-bold text-[#0F2447]">What Is LinkedIn X-Ray Search?</h2>

          <p className="text-gray-600 leading-relaxed">
            X-ray search is a search-engine technique, not a LinkedIn feature. It uses Google&apos;s <code className="text-sm bg-[#F5EDE0] px-1 rounded">site:</code> operator to restrict results to one domain — <code className="text-sm bg-[#F5EDE0] px-1 rounded">site:linkedin.com/in</code> searches only public LinkedIn profile URLs. Combined with quoted phrases, <code className="text-sm bg-[#F5EDE0] px-1 rounded">OR</code> groups, and exclusion operators, it turns Google into a free, unthrottled search layer over every public LinkedIn profile the crawler has indexed.
          </p>

          <h3 className="text-lg font-semibold text-[#0F2447]">Why It Works</h3>
          <p className="text-gray-600 leading-relaxed">
            LinkedIn profile pages are public by default unless a user changes their visibility settings, and Google crawls and indexes most of them just like any other web page. Searching through Google instead of LinkedIn&apos;s own search box sidesteps LinkedIn&apos;s result caps and paywalled filters (Recruiter, Sales Navigator) — but it only ever surfaces what was already public and already indexed. It doesn&apos;t find anything LinkedIn itself is hiding, and it can&apos;t see profiles set to private.
          </p>

          <h3 className="text-lg font-semibold text-[#0F2447]">Who Uses This</h3>
          <p className="text-gray-600 leading-relaxed">
            <strong className="text-[#0F2447]">Recruiters</strong> sourcing candidates by job title, city, and current employer without burning through a limited monthly search quota. <strong className="text-[#0F2447]">Salespeople and founders</strong> doing outbound prospecting — finding decision-makers at a target company or industry before reaching out. <strong className="text-[#0F2447]">Founders and hiring managers</strong> looking for co-founders, advisors, or early hires from a specific school or past employer, using the alumni mode to narrow by shared background.
          </p>

          <h3 className="text-lg font-semibold text-[#0F2447]">How to Get Better Results</h3>
          <p className="text-gray-600 leading-relaxed">
            Start broad, then narrow. A single job title with a city usually returns thousands of profiles — add a company or a keyword only once you need to cut the list down. If a very specific combination returns nothing, remove the least essential filter first (company or extra keyword) rather than the job title or location, since those two carry the most signal in the query.
          </p>
        </section>

        {/* FAQ */}
        <section className="mt-6 bg-white rounded-xl border border-[#F0E4D4] p-6">
          <h2 className="text-xl font-bold text-[#0F2447] mb-5">Frequently Asked Questions</h2>
          <div className="space-y-5">
            {faqSchema.mainEntity.map((faq) => (
              <div key={faq.name} className="border-b border-[#F0E4D4] pb-4 last:border-0 last:pb-0">
                <h3 className="font-semibold text-[#0F2447] mb-1 text-sm sm:text-base">{faq.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </section>

        <AdSlot slot="2743510532" className="my-6" />

        {/* Related tools */}
        <section className="mt-2 mb-4">
          <h2 className="text-base font-semibold text-[#7A6048] mb-3">Related Tools</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { href: "/freelance-rate-calculator", label: "Freelance Rate Calculator" },
              { href: "/readme-generator", label: "GitHub README Generator" },
              { href: "/qr-code-generator", label: "QR Code Generator" },
            ].map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="text-sm px-3 py-1.5 bg-[#FFFCF8] text-[#0F2447] border border-[#F0E4D4] rounded-full hover:border-[#E8500A] hover:text-[#E8500A] transition-colors"
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
