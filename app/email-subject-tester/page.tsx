import type { Metadata } from "next";
import Link from "next/link";
import { EmailSubjectTester } from "@/components/tools/EmailSubjectTester";
import { AdSlot } from "@/components/layout/AdSlot";

export const metadata: Metadata = {
  title: "Free Email Subject Line Tester — Open Rate Scorer | UtilSpot",
  description:
    "Test email subject lines for open rate potential. Instant spam word detection, length check, emoji analysis + AI score and 5 AI-generated alternatives. Free.",
  keywords: [
    "email subject line tester",
    "email subject line analyzer",
    "subject line score",
    "email open rate tester",
    "spam word checker email",
    "email subject line generator",
    "best email subject lines",
    "email subject line checker free",
    "email marketing tools",
    "subject line optimizer",
  ],
  openGraph: {
    title: "Free Email Subject Line Tester — Open Rate Scorer | UtilSpot",
    description:
      "Instant spam detection, length check, emoji analysis + AI open rate score and 5 alternatives. Free email subject line tester.",
    url: "https://www.utilspot.app/email-subject-tester",
    siteName: "UtilSpot",
  },
  alternates: { canonical: "https://www.utilspot.app/email-subject-tester" },
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Free Email Subject Line Tester",
  description: "Score email subject lines for open rate potential. Instant spam trigger detection, length check, emoji analysis, and AI-generated alternatives.",
  url: "https://www.utilspot.app/email-subject-tester",
  applicationCategory: "BusinessApplication",
  operatingSystem: "All",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What makes a good email subject line?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A strong email subject line is 30–55 characters long (fits on mobile without truncation), creates curiosity or communicates clear value, avoids spam trigger words, uses the recipient's name or personalization where possible, and matches the tone of your audience. Question-format subjects, numbered lists ('5 ways to…'), and urgency (when genuine) consistently outperform generic product-push subjects. The best subject line is one that accurately represents the email content — mismatch between subject and body destroys trust.",
      },
    },
    {
      "@type": "Question",
      name: "What words trigger spam filters?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Common spam-triggering words include: free, guaranteed, winner, prize, claim, urgent, act now, limited time, exclusive offer, 100%, no cost, risk-free, earn money, make money, fast cash, lose weight, miracle, click here, buy now, and congratulations. These words flag your email to both automated spam filters and wary readers. The safest approach is to write subject lines that sound like they come from a person, not a marketing template.",
      },
    },
    {
      "@type": "Question",
      name: "What is a good email open rate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Average email open rates vary by industry. Marketing/e-commerce averages 15–20%. B2B tech runs 20–25%. Nonprofit and education often see 25–35%. Transactional emails (receipts, confirmations) achieve 40–60%+. If your open rate is below industry average, the two most impactful fixes are: (1) improving subject lines and (2) segmenting your list so recipients only receive emails relevant to their interests. Cold outreach typically sees 20–30% open rates when well-targeted.",
      },
    },
    {
      "@type": "Question",
      name: "Should I use emojis in subject lines?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "One well-chosen emoji can increase open rates by 5–10% by adding visual differentiation in crowded inboxes. More than one emoji tends to reduce open rates and can signal spam. The emoji should be relevant to the content (not random decoration) and should render correctly across email clients — stick to simple, widely-supported emojis like 🚀 ✅ 🎯 rather than complex or newer additions. Avoid emojis in formal B2B contexts where they can reduce perceived credibility.",
      },
    },
    {
      "@type": "Question",
      name: "How long should an email subject line be?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Aim for 30–50 characters for the best balance of readability across desktop (typically shows ~60 chars) and mobile (shows ~30–40 chars in most clients). Front-load the most important words — don't bury your value proposition at the end where it gets cut off. Preheader text (the preview snippet visible after the subject) should be used to extend the message: write your subject and preheader as a complementary pair.",
      },
    },
  ],
};

export default function EmailSubjectTesterPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main className="max-w-5xl mx-auto px-4 py-8">
        <nav className="text-xs text-gray-400 mb-4">
          <Link href="/" className="hover:text-[#E8500A]">Home</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-600">Email Subject Tester</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F2447] mb-2">
          Free Email Subject Line Tester — Open Rate Scorer
        </h1>
        <p className="text-[#7A6048] mb-6 text-sm sm:text-base max-w-2xl">
          Test your email subject lines before you send. Get instant spam detection, length analysis,
          and emoji feedback — plus AI scoring and 5 improved alternatives. Free, no signup.
        </p>

        <EmailSubjectTester />

        <AdSlot slot="EMAIL_AFTER_RESULT" className="my-6" />

        <section className="mt-8 bg-white rounded-xl border border-[#F0E4D4] p-6 space-y-5">
          <h2 className="text-xl font-bold text-[#0F2447]">Writing Email Subject Lines That Get Opened</h2>
          <p className="text-[#7A6048] leading-relaxed text-sm">
            Your subject line determines whether your email gets opened or ignored. Studies show that 47% of
            email recipients open an email based on the subject line alone, and 69% report email as spam based
            solely on the subject line. Getting this one line right can double or triple your campaign performance.
          </p>
          <h3 className="text-base font-bold text-[#0F2447]">The Anatomy of a High-Performing Subject Line</h3>
          <ul className="list-disc pl-5 space-y-2 text-[#7A6048] text-sm">
            <li><strong className="text-[#0F2447]">Specificity beats vagueness:</strong> &ldquo;3 mistakes killing your email open rates&rdquo; outperforms &ldquo;Tips for better email marketing&rdquo;.</li>
            <li><strong className="text-[#0F2447]">Curiosity gap:</strong> Hint at value without giving everything away. &ldquo;What your competitors know about pricing (that you don&apos;t)&rdquo; creates a gap the reader wants to close.</li>
            <li><strong className="text-[#0F2447]">Personalization:</strong> Subject lines with the recipient&apos;s first name increase open rates by 10–14% on average. Segmentation-based relevance matters even more.</li>
            <li><strong className="text-[#0F2447]">A/B test everything:</strong> What works for one audience may not work for another. Test two versions on 20% of your list and send the winner to the remaining 80%.</li>
          </ul>
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

        <AdSlot slot="EMAIL_BELOW_FAQ" className="my-6" />

        <section className="mt-2 mb-4">
          <h2 className="text-base font-semibold text-[#7A6048] mb-3">Related Tools</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { href: "/social-media-calendar", label: "Social Media Calendar" },
              { href: "/word-counter", label: "Word Counter" },
              { href: "/readme-generator", label: "README Generator" },
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
