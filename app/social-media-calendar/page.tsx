import type { Metadata } from "next";
import Link from "next/link";
import { SocialMediaCalendar } from "@/components/tools/SocialMediaCalendar";
import { AdSlot } from "@/components/layout/AdSlot";

export const metadata: Metadata = {
  title: "AI Social Media Content Calendar Generator — 30-Day Posts Free | UtilSpot",
  description:
    "Generate a complete social media content calendar instantly using AI. Get 7, 14, or 30 days of post ideas for Instagram, LinkedIn, Twitter, Facebook, and YouTube — free.",
  keywords: [
    "social media content calendar",
    "AI content calendar generator",
    "social media planner",
    "Instagram content calendar",
    "LinkedIn content calendar",
    "social media post ideas",
    "content calendar tool",
    "free social media calendar",
    "30 day social media plan",
    "AI social media planner",
  ],
  openGraph: {
    title: "AI Social Media Content Calendar Generator — 30-Day Posts Free | UtilSpot",
    description:
      "Generate a complete social media content calendar instantly using AI. Get 7, 14, or 30 days of post ideas for Instagram, LinkedIn, Twitter, Facebook, and YouTube — free.",
    url: "https://www.utilspot.app/social-media-calendar",
    siteName: "UtilSpot",
  },
  alternates: { canonical: "https://www.utilspot.app/social-media-calendar" },
  robots: { index: false, follow: false },
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "AI Social Media Content Calendar Generator",
  description:
    "Generate a 7, 14, or 30-day social media content calendar using Claude AI. Covers Instagram, LinkedIn, Twitter/X, Facebook, and YouTube with captions, hashtags, and posting times.",
  url: "https://www.utilspot.app/social-media-calendar",
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
      name: "How does the AI social media calendar generator work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You enter your brand name, niche, preferred platforms, and content tone. Claude AI then generates a complete day-by-day content calendar with captions, hashtags, optimal posting times, and content type (educational, promotional, engagement, etc.) for each post. The result is a ready-to-use plan tailored to your brand voice.",
      },
    },
    {
      "@type": "Question",
      name: "Which social media platforms does the calendar support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The tool supports Instagram, LinkedIn, Twitter/X, Facebook, and YouTube. You can select any combination of platforms and the AI will distribute posts across all selected channels, adapting caption style and content type for each platform's audience.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use the generated posts directly without editing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The generated posts are solid first drafts — they include complete captions, relevant hashtags, and timing recommendations. For best results, personalise the captions slightly (add brand-specific details, emojis, or a call-to-action relevant to a current campaign) before posting. AI-generated content works best as a strong starting point, not a copy-paste final product.",
      },
    },
    {
      "@type": "Question",
      name: "What content types does the calendar include?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The calendar varies content types across the plan to maintain audience engagement. Types include educational posts, promotional content, engagement posts (polls, questions), stories, reels, carousels, and inspirational quotes. This mix follows social media best practices — the 80/20 rule suggests 80% value-driven content and 20% promotional.",
      },
    },
    {
      "@type": "Question",
      name: "How many posts can I generate for free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can generate up to 5 calendars per hour for free — no signup or credit card required. Each generation can cover up to 30 days of posts across multiple platforms, giving you up to 150 individual post ideas per run.",
      },
    },
  ],
};

export default function SocialMediaCalendarPage() {
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
          <Link href="/" className="hover:text-[#E8500A]">
            Home
          </Link>
          <span className="mx-2">›</span>
          <span className="text-gray-600">Social Media Calendar</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F2447] mb-2">
          AI Social Media Content Calendar
        </h1>
        <p className="text-gray-500 mb-6 text-sm sm:text-base">
          Generate a ready-to-use 7, 14, or 30-day content plan for Instagram, LinkedIn, Twitter/X,
          Facebook, and YouTube — powered by Claude AI. Free, no signup.
        </p>

        <SocialMediaCalendar />

        <AdSlot slot="SOCIAL_CAL_SLOT" className="my-6" />

        {/* SEO Content */}
        <section className="mt-8 bg-white rounded-xl border border-gray-200 p-6 prose prose-gray max-w-none">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Why a Content Calendar Changes Everything
          </h2>

          <p className="text-gray-600 leading-relaxed mb-4">
            Most brands start social media with good intentions and run out of ideas within two
            weeks. A content calendar solves the blank-page problem by planning your posts in
            advance — so you&apos;re never scrambling for something to say. Consistent posting is one
            of the strongest signals across every social algorithm, and consistency only happens
            when you have a plan.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            The 80/20 Rule for Social Content
          </h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            The most effective social media strategy is 80% value and 20% promotion. Eighty percent
            of your posts should educate, entertain, inspire, or engage your audience with no
            selling attached. The remaining 20% can promote your products, services, or offers.
            Brands that flip this ratio — posting mostly promotional content — see significantly
            lower organic reach and follower growth. Our AI-generated calendar automatically applies
            this mix across your chosen duration.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Platform-Specific Best Practices
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-4">
            <li>
              <strong>Instagram:</strong> Reels get 3–5x more reach than static posts. Aim for at
              least 2 reels per week. Carousel posts drive the highest saves. Use 5–10 targeted
              hashtags — not 30 random ones.
            </li>
            <li>
              <strong>LinkedIn:</strong> Long-form text posts (600–1200 words) consistently
              outperform short ones. Personal stories, lessons learned, and data-backed insights
              get the most shares. Post between 7–9am and 5–7pm on weekdays.
            </li>
            <li>
              <strong>Twitter/X:</strong> Thread format drives more engagement and follows than
              single tweets. Reply to trending topics in your niche to boost discoverability.
              Consistency matters more than volume here.
            </li>
            <li>
              <strong>Facebook:</strong> Video content gets significantly higher reach than text or
              image posts. Live videos perform best. Join and contribute to relevant Groups to
              expand your reach beyond your own following.
            </li>
            <li>
              <strong>YouTube:</strong> Shorts are the fastest way to grow a new channel. A
              consistent upload schedule (even weekly) outperforms irregular burst posting. Optimise
              your title and thumbnail — 70% of viewership decisions are made before clicking.
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            How to Use This AI Calendar Tool Effectively
          </h3>
          <ol className="list-decimal pl-5 space-y-2 text-gray-600 mb-4">
            <li>
              Be specific about your niche — &ldquo;health & fitness supplements for Indian men over
              30&rdquo; yields better content than just &ldquo;health&rdquo;.
            </li>
            <li>
              Select only the platforms you&apos;re actively using. More platforms = less content
              per platform. Better to be consistent on 2-3 than sporadic across 5.
            </li>
            <li>
              Match the tone to your brand voice. A D2C fashion brand sounds different from a
              B2B SaaS — pick accordingly.
            </li>
            <li>
              Use the Copy All button to paste your calendar into Notion, Google Sheets, or a
              scheduling tool like Buffer or Hootsuite.
            </li>
            <li>
              Regenerate multiple times and pick the best posts across runs to build a custom
              shortlist that perfectly fits your brand.
            </li>
          </ol>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Optimal Posting Times by Platform
          </h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            Posting at the right time can double your organic reach without any extra effort.
            General guidelines: Instagram performs best at 6–9am and 6–9pm (IST). LinkedIn peaks
            on Tuesday–Thursday mornings between 8–10am. Twitter/X sees highest engagement around
            lunch (12–2pm) and evening (6–9pm). Facebook performs best at 1–3pm on weekdays.
            YouTube gets maximum views on weekends between 12–4pm. The AI-generated calendar
            incorporates these timing recommendations by default.
          </p>

          <p className="text-gray-600 leading-relaxed">
            Need a tool to schedule these posts automatically? Buffer and Hootsuite both offer free
            tiers that work well for individual creators and small teams — copy your generated
            calendar directly into either platform and schedule in bulk.
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
              { href: "/business-name-generator", label: "Business Name Generator" },
              { href: "/invoice-generator", label: "Invoice Generator" },
              { href: "/word-counter", label: "Word Counter" },
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
