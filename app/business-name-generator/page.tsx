import type { Metadata } from "next";
import Link from "next/link";
import { BusinessNameGenerator } from "@/components/tools/BusinessNameGenerator";
import { AdSlot } from "@/components/layout/AdSlot";

export const metadata: Metadata = {
  title: "AI Business Name Generator — Free Business Name Ideas with Claude AI",
  description:
    "Generate unique business names instantly using AI. Get 10 creative name ideas with taglines for your startup, shop, or brand. Free, powered by Claude AI.",
  keywords: [
    "business name generator",
    "AI business name generator",
    "startup name generator India",
    "company name ideas",
    "brand name generator",
    "business name ideas India",
    "free business name generator",
    "creative business names",
  ],
  openGraph: {
    title: "AI Business Name Generator — Free Business Name Ideas with Claude AI",
    description:
      "Generate unique business names instantly using AI. Get 10 creative name ideas with taglines for your startup, shop, or brand. Free, powered by Claude AI.",
    url: "https://www.utilspot.app/business-name-generator",
    siteName: "UtilSpot",
  },
  alternates: { canonical: "https://www.utilspot.app/business-name-generator" },
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "AI Business Name Generator",
  description:
    "Generate unique, creative business names instantly using Claude AI. Get 10 name ideas with taglines for your startup, brand, or shop.",
  url: "https://www.utilspot.app/business-name-generator",
  applicationCategory: "BusinessApplication",
  operatingSystem: "All",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How does the AI business name generator work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This tool uses Claude AI (by Anthropic) to generate business name ideas based on your description, industry, brand style, and values. You provide context about your business and the AI generates 10 unique, contextually relevant names with taglines and reasoning — all in seconds.",
      },
    },
    {
      "@type": "Question",
      name: "Are the generated business names trademarked?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The names are AI-generated suggestions and are NOT pre-checked for trademark availability. Before using any name commercially, you must search the Indian Trademark Registry (ipindia.gov.in) and ideally consult a legal professional. A name being unique and unclaimed online does not automatically mean it is free of trademark conflicts.",
      },
    },
    {
      "@type": "Question",
      name: "How do I check if a business name is available in India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For company or LLP registration, check name availability on the MCA portal (mca.gov.in) under the RUN (Reserve Unique Name) service. For trademark conflicts, search at ipindia.gov.in. For domain availability, use a registrar like Namecheap or GoDaddy. All three checks are important — a company name registration does not grant trademark rights.",
      },
    },
    {
      "@type": "Question",
      name: "What makes a good business name?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A strong business name is short (1-3 words), easy to spell and pronounce, memorable, and ideally has a clear .com or .in domain available. It should reflect your brand personality — whether that's trustworthy, playful, or premium. Avoid generic words like 'Solutions', 'Services', or 'Enterprises' that make your brand forgettable. Test your shortlisted names by saying them aloud and asking someone to spell them after hearing them once.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use these names commercially?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, but with due diligence. The AI generates original name ideas, but you are responsible for verifying that your chosen name does not infringe on existing trademarks or registered company names. Always perform trademark and MCA name searches before investing in branding, printing, or domain registration for a new business name.",
      },
    },
  ],
};

export default function BusinessNameGeneratorPage() {
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

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-xs text-gray-400 mb-4">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <span className="mx-2">›</span>
          <span className="text-gray-600">Business Name Generator</span>
        </nav>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          AI Business Name Generator — 10 Unique Name Ideas Instantly
        </h1>
        <p className="text-gray-500 mb-6 text-sm sm:text-base">
          Describe your business, pick a style, and get 10 creative name ideas with taglines — powered by
          Claude AI. Free, no signup needed.
        </p>

        <BusinessNameGenerator />

        <AdSlot slot="AFTER_RESULT_SLOT" className="my-6" />

        {/* SEO Content */}
        <section className="mt-8 bg-white rounded-xl border border-gray-200 p-6 prose prose-gray max-w-none">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            How to Choose the Right Business Name
          </h2>

          <p className="text-gray-600 leading-relaxed mb-4">
            Your business name is the foundation of your brand. It appears on your website, GST certificate,
            business cards, invoices, and every piece of marketing material you ever produce. Getting it right
            from day one saves significant time and money later.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            The 5 Qualities of a Memorable Business Name
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-4">
            <li>
              <strong>Short and pronounceable:</strong> Aim for 1-3 words. If someone can&apos;t say it
              after hearing it once, it&apos;s too complicated. Test by asking a friend to repeat it back.
            </li>
            <li>
              <strong>Easy to spell:</strong> Unusual spellings (Lyft, Fiverr) can work for large brands
              with massive marketing budgets — for a new Indian business, stick to intuitive spelling.
            </li>
            <li>
              <strong>Domain available:</strong> Before finalising any name, check if the .com or .in
              domain is available. A mismatch between your brand name and domain URL creates confusion.
            </li>
            <li>
              <strong>Scalable:</strong> Avoid hyper-specific names that limit future growth. &ldquo;Delhi
              Movers&rdquo; works today but traps you geographically; &ldquo;Swiftshift&rdquo; works everywhere.
            </li>
            <li>
              <strong>Trademark-safe:</strong> Run a trademark search on the Indian IP India portal before
              investing in the name. Rebranding after traction is expensive and disruptive.
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Registering Your Business Name in India
          </h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            Once you have a name, you need to register it. For a Private Limited company or LLP, use the{" "}
            <strong>MCA21 portal (mca.gov.in)</strong> to check and reserve your name via the RUN (Reserve
            Unique Name) service. For a sole proprietorship or partnership, GST registration or a trade
            licence is sufficient. For trademark protection — which gives you exclusive rights to the name
            across India — file a trademark application on the{" "}
            <strong>IP India portal (ipindia.gov.in)</strong>.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Domain Availability and .in vs .com
          </h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            For Indian businesses, a <strong>.in</strong> domain signals local credibility, while a{" "}
            <strong>.com</strong> is universally recognised. If your target audience is India-first, a .in
            domain is fine and typically cheaper. If you plan global operations, secure the .com early. Use
            the &ldquo;Check .com&rdquo; button next to each generated name to see domain availability on Namecheap
            — one of the most affordable registrars with competitive .com and .in pricing.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            How This AI Name Generator Works
          </h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            This tool is powered by <strong>Claude AI</strong> (developed by Anthropic), one of the most
            capable large language models available. When you describe your business, the AI considers your
            industry context, target market, brand personality, and values to generate names that are
            contextually appropriate — not just random word combinations. Each name comes with a one-line
            tagline and a brief explanation of why it works for your brand.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Tips for Using This Tool Effectively
          </h3>
          <ol className="list-decimal pl-5 space-y-2 text-gray-600 mb-4">
            <li>
              Write a specific description — the more context you give, the better the names. Include who
              your customers are, what problem you solve, and what feeling you want the brand to evoke.
            </li>
            <li>
              Try different brand styles for the same description. &ldquo;Modern&rdquo; might give you clean,
              minimal names while &ldquo;Bold&rdquo; gives you punchy, assertive ones.
            </li>
            <li>
              Include brand values — words like &ldquo;trust&rdquo;, &ldquo;speed&rdquo;, or &ldquo;sustainability&rdquo; guide the
              AI toward names that carry the right connotation.
            </li>
            <li>
              Run 2-3 generations and collect your 5 favourite names across all results, then shortlist
              based on domain availability and trademark search.
            </li>
          </ol>

          <p className="text-gray-600 leading-relaxed">
            Need to register your new domain? Check availability and register at Namecheap via our{" "}
            <Link
              href="/go/namecheap"
              rel="nofollow noopener sponsored"
              className="text-blue-600 hover:underline"
            >
              affiliate link →
            </Link>{" "}
            — competitive pricing on .com, .in, and all major TLDs.
          </p>
        </section>

        {/* FAQ */}
        <section className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-5">Frequently Asked Questions</h2>
          <div className="space-y-5">
            {faqSchema.mainEntity.map((faq) => (
              <div key={faq.name} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">{faq.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </section>

        <AdSlot slot="BELOW_FAQ_SLOT" className="my-6" />

        {/* Related tools */}
        <section className="mt-2 mb-4">
          <h2 className="text-base font-semibold text-gray-700 mb-3">Related Tools</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { href: "/emi-calculator", label: "EMI Calculator" },
              { href: "/invoice-generator", label: "Invoice Generator" },
            ].map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="text-sm px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors"
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
