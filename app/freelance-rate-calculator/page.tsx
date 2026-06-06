import type { Metadata } from "next";
import Link from "next/link";
import { FreelanceRateCalculator } from "@/components/tools/FreelanceRateCalculator";
import { AdSlot } from "@/components/layout/AdSlot";

export const metadata: Metadata = {
  title: "Freelance Rate Calculator 2026 — Hourly Rate by Skill, Country & Experience",
  description:
    "Find your freelance hourly rate based on skill, country, and experience. Compare Developer, Designer, Writer, Consultant & Marketer rates across India, US, UK, Canada, Australia & Germany.",
  keywords: [
    "freelance rate calculator",
    "freelance hourly rate calculator",
    "freelance rates by country 2025",
    "how much to charge as a freelancer",
    "freelance developer rates India",
    "freelance designer rates",
    "freelance consultant hourly rate",
    "freelance rate calculator USD INR",
  ],
  openGraph: {
    title: "Freelance Rate Calculator 2026 — Hourly Rate by Skill, Country & Experience",
    description:
      "Calculate your freelance hourly rate by skill, country, and experience level. See monthly and annual income projections instantly.",
    url: "https://www.utilspot.app/freelance-rate-calculator",
    siteName: "UtilSpot",
  },
  alternates: { canonical: "https://www.utilspot.app/freelance-rate-calculator" },
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Freelance Rate Calculator",
  description:
    "Free online freelance rate calculator. Find your ideal hourly rate based on skill, country, and experience level. Covers Developers, Designers, Writers, Consultants, and Marketers across 6 countries.",
  url: "https://www.utilspot.app/freelance-rate-calculator",
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
      name: "How do I calculate my freelance hourly rate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Start with market data for your skill, country, and experience level. Factor in your target annual income, expected billable hours (typically 1,000–1,500 per year after accounting for unpaid admin time, sick days, and holidays), and add 20–30% overhead for taxes, software, and gaps between projects. A mid-level developer in India billing 20 hours/week at $15–30/hour earns roughly $52K–$104K USD annually — compare that to a US developer at $50–100/hour earning $130K–$260K for the same hours.",
      },
    },
    {
      "@type": "Question",
      name: "Why are freelance rates in India lower than the US?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Rates reflect local purchasing power, cost of living, and market competition. A senior developer in India charging $30–60/hour has a high standard of living relative to local costs. The same work billed at US rates ($100–175/hour) is simply priced out of most Indian client budgets. When working with international (US/EU) clients remotely, Indian freelancers often command rates closer to the US range — the geography of the client matters as much as the geography of the freelancer.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between Junior, Mid, Senior, and Expert freelance levels?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Junior (0–2 years): Still learning, needs guidance, suitable for well-defined tasks. Mid (2–5 years): Works independently, delivers without hand-holding, understands full project lifecycle. Senior (5–10 years): Owns complex problems, mentors others, can architect solutions. Expert (10+ years): Domain authority, advises at strategy level, commands premium because clients pay for reputation and reduced risk, not just execution.",
      },
    },
    {
      "@type": "Question",
      name: "Should I charge per hour or per project as a freelancer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Hourly billing protects you on open-ended or poorly scoped projects. Project-based billing rewards speed and expertise — if you can do in 5 hours what takes a junior 20, you earn 4x more per hour effectively. Most experienced freelancers prefer project-based rates for defined deliverables and hourly for retainers or ongoing advisory work. Use your hourly rate as the baseline: a 40-hour project should be priced at roughly 40 × your hourly rate, with a buffer for revisions.",
      },
    },
    {
      "@type": "Question",
      name: "How many billable hours per week is realistic for a freelancer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "20–25 hours per week is the sustainable sweet spot for most full-time freelancers. The remaining time goes to client communication, proposals, invoicing, marketing, and skill development. Pushing to 35–40 billable hours per week is possible for short sprints but leads to burnout. Part-time freelancers typically bill 10–15 hours per week alongside a full-time job. Use the slider in this calculator to see how billable hours directly affect your monthly income projection.",
      },
    },
  ],
};


const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.utilspot.app" },
    { "@type": "ListItem", position: 2, name: "Freelance Rate Calculator", item: "https://www.utilspot.app/freelance-rate-calculator" },
  ],
};
export default function FreelanceRateCalculatorPage() {
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
          <span className="text-gray-600">Freelance Rate Calculator</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F2447] mb-2">
          Freelance Rate Calculator 2026
        </h1>
        <div className="flex flex-wrap gap-3 mb-2">
          <span className="inline-flex items-center gap-1.5 text-xs bg-[#F1F5F9] text-[#475569] px-3 py-1 rounded-full font-medium">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            Last updated: June 2025 · Market rates from Upwork, Toptal &amp; Naukri data
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs bg-[#F1F5F9] text-[#475569] px-3 py-1 rounded-full font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            Used by 2,600+ freelancers this month
          </span>
        </div>
        <p className="text-[#7A6048] mb-6 text-sm sm:text-base">
          Find your market-rate hourly fee by skill, country, and experience level. See monthly and
          annual income projections instantly — no signup needed.
        </p>

        <FreelanceRateCalculator />

        <AdSlot slot="FREELANCE_RATE_SLOT" className="my-6" />

        {/* SEO Content */}
        <section className="mt-8 bg-white rounded-xl border border-[#F0E4D4] p-6 space-y-4">
          <h2 className="text-xl font-bold text-[#0F2447]">How to Set Your Freelance Rate in 2026</h2>

          <p className="text-gray-600 leading-relaxed">
            Setting the right freelance rate is one of the hardest things new — and experienced — freelancers face. Charge too low and you attract budget clients who drain your time. Charge too high before you have the portfolio to back it up and you lose work to competitors. The right rate sits at the intersection of your skill level, your target market&apos;s geography, and your personal income goals.
          </p>

          <h3 className="text-lg font-semibold text-[#0F2447]">Market Rates Vary Wildly by Country</h3>
          <p className="text-gray-600 leading-relaxed">
            A senior developer in the US commands $100–175/hour because US companies budget that much for contractors, and the alternative (a full-time hire at $120K–180K/year plus benefits) costs even more. The same developer in India charges $30–60/hour — not because the skill is inferior, but because Indian businesses have different budgets and the cost of living benchmark is different. When Indian freelancers work with US or EU clients remotely, they typically price toward the international market rate, capturing a significant income premium relative to local alternatives.
          </p>

          <h3 className="text-lg font-semibold text-[#0F2447]">The Hidden Cost of Low Rates</h3>
          <p className="text-gray-600 leading-relaxed">
            Underpricing has a compounding problem: it signals low value to clients (premium clients equate price with quality), it attracts clients who bargain hardest and pay slowest, and it leaves you trapped in a volume game — more projects, less time, same income. Raising rates is difficult once you&apos;ve set expectations with a client base. It&apos;s better to start at mid-to-upper market and win fewer, higher-quality clients than to race to the bottom.
          </p>

          <h3 className="text-lg font-semibold text-[#0F2447]">Billable Hours: The Reality Check</h3>
          <p className="text-gray-600 leading-relaxed">
            Most freelancers overestimate billable hours. A 40-hour work week does not produce 40 billable hours. Client emails, proposal writing, invoicing, revisions outside scope, learning new tools, and business development all take time without generating revenue. Realistic full-time freelancers bill 20–30 hours per week. Use this calculator&apos;s slider to model both optimistic and conservative scenarios. A senior developer billing 25 hours/week at $85/hour earns ~$140,000/year — significantly more than the median salaried position for the same skill level in many markets.
          </p>

          <h3 className="text-lg font-semibold text-[#0F2447]">Project Rate vs Hourly Rate</h3>
          <p className="text-gray-600 leading-relaxed">
            For defined deliverables, project-based pricing is usually better for experienced freelancers. It rewards efficiency — if you solve a problem in 3 hours that takes a junior 12, you should earn more, not less. Use your hourly rate as the floor: a 40-hour project is priced at 40 × hourly rate, typically with a 10–20% buffer for scope creep and revisions. The &quot;Typical 40-Hour Project&quot; estimate in this calculator gives you that number directly.
          </p>

          <h3 className="text-lg font-semibold text-[#0F2447]">Rate Data Sources</h3>
          <p className="text-gray-600 leading-relaxed">
            The rates in this calculator are compiled from Upwork&apos;s Freelance Forward reports, Toptal&apos;s rate guides, We Work Remotely salary surveys, and community data from freelancer forums (Hacker News, IndieHackers, Reddit&apos;s r/freelance). They represent the typical range for each combination — outliers on both ends exist, especially for niche expertise (AI/ML, Web3, specialized compliance consulting). Update your rates annually as market demand shifts.
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

        <AdSlot slot="FREELANCE_RATE_FAQ_SLOT" className="my-6" />

        {/* Related tools */}
        <section className="mt-2 mb-4">
          <h2 className="text-base font-semibold text-[#7A6048] mb-3">Related Tools</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { href: "/salary-calculator", label: "Salary Calculator" },
              { href: "/income-tax-calculator", label: "Income Tax Calculator" },
              { href: "/invoice-generator", label: "Invoice Generator" },
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
