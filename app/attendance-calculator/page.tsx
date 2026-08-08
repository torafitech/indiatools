import type { Metadata } from "next";
import Link from "next/link";
import { AttendanceCalculator } from "./AttendanceCalculator";
import { AdSlot } from "@/components/layout/AdSlot";

export const metadata: Metadata = {
  title: "Attendance Calculator — Bunk Counter & 75% Rule Tracker",
  description:
    "Calculate college attendance percentage, check safe bunks remaining, and find classes needed to recover. Free multi-subject tracker for Indian students — 75%, 80%, 85%, 90% targets.",
  keywords: [
    "attendance calculator",
    "bunk calculator india",
    "75% attendance calculator",
    "college attendance tracker",
    "how many classes can i bunk",
    "attendance percentage calculator",
    "classes needed to improve attendance",
  ],
  openGraph: {
    title: "Attendance Calculator — Bunk Counter & 75% Rule Tracker",
    description:
      "Track attendance per subject, check safe bunks, and find how many classes to attend to recover. Free for Indian college students.",
    url: "https://www.utilspot.app/attendance-calculator",
    siteName: "UtilSpot",
  },
  alternates: { canonical: "https://www.utilspot.app/attendance-calculator" },
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Attendance Calculator",
  description:
    "Calculate college attendance percentage, safe bunks remaining, and classes needed to recover — per subject and overall.",
  url: "https://www.utilspot.app/attendance-calculator",
  applicationCategory: "EducationApplication",
  operatingSystem: "All",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the 75% attendance rule in Indian colleges?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "UGC guidelines require a minimum 75% attendance in each subject to be eligible to appear in semester exams. Some colleges enforce stricter thresholds of 80% or 85%. Students below the minimum may be detained from exams or face marks deduction, depending on institution policy.",
      },
    },
    {
      "@type": "Question",
      name: "How many classes can I bunk and still maintain 75% attendance?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Safe bunks = floor((attended − 0.75 × total) ÷ 0.75). For example, if 80 classes have been held and you attended 70, you can safely bunk 13 more. Each additional class held reduces this number, so track it regularly. This calculator updates safe bunks in real time as you enter your numbers.",
      },
    },
    {
      "@type": "Question",
      name: "How many consecutive classes do I need to attend to recover attendance?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Classes needed = ceil((target × total − attended) ÷ (1 − target)). For a 75% target, if 80 classes have been held and you attended only 55, you need to attend 20 consecutive classes without missing any to reach 75%. The reason consecutive classes help faster is that each one adds both to numerator (attended) and denominator (total).",
      },
    },
    {
      "@type": "Question",
      name: "Does medical leave count for attendance?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most Indian universities allow a medical leave exemption of 10–15% of total classes, effectively reducing the required attendance threshold. Check your specific college's ordinance — some automatically grant 10% condonation, meaning 75% requirement effectively becomes 67.5% of actual classes held. This calculator tracks raw numbers; consult your academic office for condonation.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home",                   item: "https://www.utilspot.app" },
    { "@type": "ListItem", position: 2, name: "Attendance Calculator",  item: "https://www.utilspot.app/attendance-calculator" },
  ],
};

export default function AttendancePage() {
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
          <span className="text-gray-600">Attendance Calculator</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F2447] mb-2">
          Attendance Calculator — Bunk Counter & 75% Rule
        </h1>

        <div className="flex flex-wrap gap-3 mb-4">
          <span className="inline-flex items-center gap-1.5 text-xs bg-[#F1F5F9] text-[#475569] px-3 py-1 rounded-full font-medium">
            🎓 UGC 75% Rule · Multi-subject tracker
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs bg-[#F1F5F9] text-[#475569] px-3 py-1 rounded-full font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            Free · no signup · browser-only
          </span>
        </div>

        <p className="text-gray-500 mb-6 text-sm sm:text-base">
          Track attendance across up to 12 subjects. See your attendance percentage, how many classes
          you can still bunk, and how many you need to attend to recover — all in real time.
        </p>

        <AttendanceCalculator />

        <AdSlot slot="7779500788" className="my-6" />

        {/* SEO Content */}
        <section className="mt-8 bg-white rounded-xl border border-gray-200 p-6 prose prose-gray max-w-none">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            How the 75% Attendance Rule Works in Indian Colleges
          </h2>

          <p className="text-gray-600 leading-relaxed mb-4">
            The University Grants Commission (UGC) mandates that students maintain a minimum of
            <strong> 75% attendance</strong> in each subject to sit for semester examinations. This rule
            exists to ensure regular classroom engagement and is enforced by most central universities,
            state universities, and affiliated colleges across India. Some institutions set stricter
            thresholds — 80% or even 85% — particularly for professional programmes like MBBS,
            B.Pharm, and engineering.
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">
            The <strong>safe bunk formula</strong> works by solving: how many additional classes can be
            held (and missed) before the attendance ratio falls below the threshold? Mathematically,
            if you have attended A classes out of T held and need to maintain target C, the maximum
            additional bunks B satisfies A / (T + B) ≥ C, giving B ≤ (A − C×T) / C. This calculator
            uses this exact formula — updated instantly as you type.
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">
            To <strong>recover attendance</strong>, you need consecutive classes because each adds to
            both your attended count and total count simultaneously — making the denominator grow
            slower than if you just add to numerator. The recovery formula: ceil((C×T − A) / (1 − C))
            classes attended without missing any.
          </p>

          <p className="text-gray-600 leading-relaxed">
            Many colleges allow <strong>medical condonation</strong> of 10–15% of total lectures, which
            effectively lowers the bar from 75% to around 67.5% for verified medical absences.
            Internship, sports, and cultural event leaves are often treated separately. Always verify
            with your academic office — this calculator tracks raw numbers and does not apply
            condonations automatically.
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

        <AdSlot slot="2743510532" className="my-6" />

        {/* Related tools */}
        <section className="mt-2 mb-4">
          <h2 className="text-base font-semibold text-gray-700 mb-3">Related Tools</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { href: "/word-counter",               label: "Word Counter" },
              { href: "/tdee-calculator",            label: "TDEE Calculator" },
              { href: "/gold-jewellery-calculator",  label: "Gold Jewellery Calculator" },
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
