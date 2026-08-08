import type { Metadata } from "next";
import Link from "next/link";
import { WordCounter } from "@/components/tools/WordCounter";
import { AdSlot } from "@/components/layout/AdSlot";

export const metadata: Metadata = {
  title: "Word Counter — Free Online Word Count & Character Counter Tool",
  description:
    "Count words, characters, sentences, reading time, and keyword density instantly. Free online word counter with Flesch readability score. No signup required.",
  keywords: [
    "word counter", "character counter", "word count tool", "reading time calculator",
    "keyword density checker", "word counter online", "free word counter",
  ],
  openGraph: {
    title: "Word Counter — Count Words, Characters & Reading Time Instantly",
    description: "Free word counter with reading time, keyword density, and Flesch readability score.",
    url: "https://www.utilspot.app/word-counter",
    siteName: "UtilSpot",
  },
  alternates: { canonical: "https://www.utilspot.app/word-counter" },
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Word Counter",
  description: "Free online word counter with character count, reading time, keyword density, and Flesch readability score.",
  url: "https://www.utilspot.app/word-counter",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "All",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How many words is a 5-minute speech?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A 5-minute speech contains approximately 650 words, based on an average speaking pace of 130 words per minute. Professional speakers range from 120–150 wpm. For a more relaxed, conversational pace, aim for 120 wpm (600 words). For a fast-paced presentation, 150 wpm gives you 750 words in 5 minutes.",
      },
    },
    {
      "@type": "Question",
      name: "What is the ideal blog post word count for SEO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For SEO, long-form content tends to rank better. Most top-ranking blog posts are 1,500–2,500 words for competitive topics. However, quality matters more than length — a focused 800-word post beats a padded 2,000-word post. For pillar content and comprehensive guides, aim for 2,000–3,500 words. For news or quick answers, 300–600 words is fine.",
      },
    },
    {
      "@type": "Question",
      name: "How many words is a tweet?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Twitter (now X) has a 280-character limit, not a word limit. The average English word is 5 characters plus a space (6 total), so 280 characters fits roughly 40–50 words. In practice, most effective tweets are 20–30 words to allow room for hashtags and links. A URL counts as 23 characters regardless of actual length.",
      },
    },
    {
      "@type": "Question",
      name: "What is reading time and how is it calculated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Reading time is an estimate of how long it takes an average person to read a piece of text. It is calculated by dividing the total word count by the average adult reading speed of 200–250 words per minute (wpm). Our tool uses 200 wpm for reading time and 130 wpm for speaking time. Medium, the blogging platform, popularised displaying reading time on articles.",
      },
    },
    {
      "@type": "Question",
      name: "What is the Flesch Reading Ease score?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Flesch Reading Ease score measures how easy a text is to read, on a scale from 0 (very difficult) to 100 (very easy). It is calculated using average sentence length and average syllables per word. Scores of 70–80 are considered easy (plain English). Most web content should aim for 60–70. Academic papers often score below 30. The formula is: 206.835 − 1.015 × (words/sentences) − 84.6 × (syllables/words).",
      },
    },
    {
      "@type": "Question",
      name: "What is keyword density and why does it matter for SEO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Keyword density is the percentage of times a specific keyword appears in a text relative to total word count. For SEO, the recommended keyword density is 1–2% for primary keywords. Too low means your content may not rank for that term; too high (keyword stuffing) can lead to Google penalties. Our tool shows the top 10 most-used meaningful words (excluding common stop words like 'the', 'is', 'and').",
      },
    },
  ],
};


const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.utilspot.app" },
    { "@type": "ListItem", position: 2, name: "Word Counter", item: "https://www.utilspot.app/word-counter" },
  ],
};
export default function WordCounterPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <nav className="text-xs text-gray-400 mb-4">
          <Link href="/" className="hover:text-[#E8500A]">Home</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-600">Word Counter</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F2447] mb-2">
          Word Counter — Count Words, Characters &amp; Reading Time Instantly
        </h1>
        <div className="flex flex-wrap gap-3 mb-2">
          <span className="inline-flex items-center gap-1.5 text-xs bg-[#F1F5F9] text-[#475569] px-3 py-1 rounded-full font-medium">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            Last updated: June 2025
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs bg-[#F1F5F9] text-[#475569] px-3 py-1 rounded-full font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            Used by 3,200+ writers this month
          </span>
        </div>
        <p className="text-gray-500 mb-6 text-sm sm:text-base">
          Paste or type your text below. Word count, reading time, keyword density, and readability score update in real time.
        </p>

        <WordCounter />

        <AdSlot slot="7779500788" className="my-6" />

        <section className="mt-8 bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h2 className="text-xl font-bold text-gray-900">About This Word Counter</h2>

          <p className="text-gray-600 leading-relaxed">
            Whether you&apos;re a student checking an essay word limit, a blogger optimising content length for SEO,
            or a speaker timing a presentation — our <strong>free word counter</strong> gives you every metric you
            need instantly. No signup, no ads cluttering the tool, no word limits.
          </p>

          <h3 className="text-lg font-semibold text-gray-800">What Gets Counted</h3>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-600 text-sm leading-relaxed">
            <li><strong>Words:</strong> Any sequence of characters separated by whitespace counts as a word.</li>
            <li><strong>Characters (with spaces):</strong> Total character count including spaces and punctuation.</li>
            <li><strong>Characters (no spaces):</strong> Useful for SMS limits, Twitter, and character-based pricing.</li>
            <li><strong>Unique words:</strong> Distinct vocabulary size — indicates writing diversity.</li>
            <li><strong>Sentences:</strong> Split on periods, exclamation marks, and question marks.</li>
            <li><strong>Paragraphs:</strong> Separated by blank lines.</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800">Reading Time vs Speaking Time</h3>
          <p className="text-gray-600 leading-relaxed text-sm">
            Reading time uses 200 words per minute — the average silent reading speed for adults.
            Speaking time uses 130 wpm — a comfortable, clear presentation pace. Professional speakers
            like TED Talk presenters average 130–150 wpm. Audiobooks are typically recorded at 150–160 wpm.
            If you&apos;re preparing a speech, subtract 10–15% for pauses, emphasis, and audience interaction.
          </p>

          <h3 className="text-lg font-semibold text-gray-800">Word Count Guidelines for Common Tasks</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-3 py-2 font-semibold text-gray-600">Content Type</th>
                  <th className="text-right px-3 py-2 font-semibold text-gray-600">Recommended Words</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-600">
                {[
                  ["Tweet / X post", "20–40"],
                  ["Instagram caption", "50–150"],
                  ["Email subject line", "4–9 words"],
                  ["Blog post (quick answer)", "300–600"],
                  ["Blog post (standard)", "1,000–1,500"],
                  ["SEO-optimised long-form", "1,500–2,500"],
                  ["5-minute speech", "~650"],
                  ["10-minute speech", "~1,300"],
                  ["College essay", "500–650"],
                  ["Research paper abstract", "150–250"],
                ].map(([type, count]) => (
                  <tr key={type} className="hover:bg-gray-50">
                    <td className="px-3 py-2">{type}</td>
                    <td className="px-3 py-2 text-right font-medium">{count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

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

        <AdSlot slot="2743510532" className="my-6" />

        <section className="mt-2 mb-4">
          <h2 className="text-base font-semibold text-gray-700 mb-3">Related Tools</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { href: "/emi-calculator", label: "EMI Calculator" },
              { href: "/tdee-calculator", label: "TDEE Calculator" },
              { href: "/income-tax-calculator", label: "Income Tax Calculator" },
            ].map((t) => (
              <Link key={t.href} href={t.href}
                className="text-sm px-3 py-1.5 bg-[#F0F4FF] text-[#0F2447] rounded-full hover:bg-[#E5EAFF] transition-colors">
                {t.label} →
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
