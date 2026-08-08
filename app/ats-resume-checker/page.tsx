import type { Metadata } from "next";
import Link from "next/link";
import { ATSResumeChecker } from "@/components/tools/ATSResumeChecker";
import { AdSlot } from "@/components/layout/AdSlot";

export const metadata: Metadata = {
  title: "Free ATS Resume Checker — AI Resume Scanner | UtilSpot",
  description:
    "Check if your resume passes ATS systems. Free AI-powered resume scanner: paste job description + resume, get instant match score, missing keywords, and improvement tips.",
  keywords: [
    "ATS resume checker",
    "ATS resume scanner free",
    "resume keyword checker",
    "applicant tracking system test",
    "resume match score",
    "resume optimization tool",
    "ATS friendly resume",
    "job description keyword match",
    "resume checker AI",
    "free ATS checker online",
  ],
  openGraph: {
    title: "Free ATS Resume Checker — AI Resume Scanner | UtilSpot",
    description:
      "Check if your resume passes ATS systems. Free AI-powered resume scanner: paste job description + resume, get instant match score, missing keywords, and improvement tips.",
    url: "https://www.utilspot.app/ats-resume-checker",
    siteName: "UtilSpot",
  },
  alternates: { canonical: "https://www.utilspot.app/ats-resume-checker" },
  robots: { index: false, follow: false },
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Free ATS Resume Checker",
  description:
    "AI-powered ATS resume checker. Paste a job description and your resume to get an instant match score, matched and missing keywords, strengths, and actionable improvement tips.",
  url: "https://www.utilspot.app/ats-resume-checker",
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
      name: "What is an ATS and why does it matter for my resume?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An Applicant Tracking System (ATS) is software used by most mid-size and large companies to automatically screen resumes before a human recruiter sees them. ATS software scans for specific keywords, skills, and phrases from the job description. If your resume doesn't contain enough matching terms, it may be filtered out automatically — even if you're qualified. Studies suggest over 75% of resumes are rejected by ATS before reaching a hiring manager, making keyword optimization essential.",
      },
    },
    {
      "@type": "Question",
      name: "How does this AI ATS resume checker work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This tool uses Claude AI (by Anthropic) to compare your resume text against the job description. It identifies keywords and skills that appear in the job posting, checks which ones are present in your resume, calculates a match score from 0-100, and generates specific suggestions for improvement. The analysis happens in seconds and is completely free with no account required.",
      },
    },
    {
      "@type": "Question",
      name: "What ATS score do I need to pass screening?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A score of 70 or above generally indicates a strong keyword match. Scores between 40-69 suggest partial alignment — your resume addresses some requirements but is missing important terms that the ATS will look for. Below 40 typically means significant rewriting is needed. That said, score thresholds vary by company and role. Use the suggestions provided to improve your match, especially by naturally incorporating missing keywords into your experience descriptions.",
      },
    },
    {
      "@type": "Question",
      name: "Should I just stuff all the missing keywords into my resume?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No — keyword stuffing is easy for both ATS software and human reviewers to detect, and it can get your application disqualified. Instead, incorporate missing keywords naturally into your existing bullet points and descriptions. If you genuinely have the skill or experience, add it where it fits contextually. If you don't have a skill, don't fabricate it. Authentic keyword integration improves ATS pass rates while keeping your resume honest and readable.",
      },
    },
    {
      "@type": "Question",
      name: "What format should I use when pasting my resume?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Paste your resume as plain text — copy directly from your Word or Google Doc file, or export your PDF as text and paste that. Remove tables and columns if possible, as these can confuse ATS parsers. Include all sections: summary, work experience with bullet points, skills list, education, and certifications. The more complete the text, the more accurate your match score will be.",
      },
    },
  ],
};

export default function ATSResumeCheckerPage() {
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

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-xs text-gray-400 mb-4">
          <Link href="/" className="hover:text-[#E8500A]">
            Home
          </Link>
          <span className="mx-2">›</span>
          <span className="text-gray-600">ATS Resume Checker</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F2447] mb-2">
          Free ATS Resume Checker — AI-Powered Resume Scanner
        </h1>
        <p className="text-[#7A6048] mb-6 text-sm sm:text-base max-w-2xl">
          Paste a job description and your resume. Get an instant ATS match score, keyword
          analysis, and specific suggestions to help your resume pass automated screening.
          Powered by Claude AI. No signup required.
        </p>

        <ATSResumeChecker />

        <AdSlot slot="7779500788" className="my-6" />

        {/* SEO Content */}
        <section className="mt-8 bg-white rounded-xl border border-[#F0E4D4] p-6 space-y-5">
          <h2 className="text-xl font-bold text-[#0F2447]">
            Why Your Resume Fails ATS — And How to Fix It
          </h2>

          <p className="text-[#7A6048] leading-relaxed text-sm">
            Most job seekers apply to positions they are well qualified for and never hear back.
            The culprit is often not their experience — it&apos;s how their resume is written.
            Applicant Tracking Systems (ATS) are used by over 90% of Fortune 500 companies and
            a growing number of small businesses to automate the first round of resume screening.
            These systems scan submitted resumes for specific keywords, skills, job titles, and
            qualifications that match the job description. If your resume doesn&apos;t use the exact
            language the employer used, the ATS may score it low and push it to the bottom of
            the pile — even if you have every qualification they need.
          </p>

          <h3 className="text-base font-bold text-[#0F2447]">
            How ATS Keyword Matching Works
          </h3>
          <p className="text-[#7A6048] leading-relaxed text-sm">
            ATS platforms like Greenhouse, Lever, Workday, and iCIMS parse your resume into
            structured data and compare it against required and preferred skills in the job
            posting. The more overlap between the job description&apos;s language and your resume,
            the higher your relevance score. Hard skills — programming languages, certifications,
            tools, methodologies — are weighted most heavily. Soft skills and generic buzzwords
            contribute less. This is why a resume tailored to each specific job posting
            consistently outperforms a generic one-size-fits-all resume.
          </p>

          <h3 className="text-base font-bold text-[#0F2447]">
            The Right Way to Optimize for ATS
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-[#7A6048] text-sm">
            <li>
              <strong className="text-[#0F2447]">Mirror the job description&apos;s language:</strong> If the
              posting says &ldquo;cross-functional collaboration&rdquo;, use that exact phrase rather than
              &ldquo;worked with multiple teams.&rdquo; ATS matching is often literal, not semantic.
            </li>
            <li>
              <strong className="text-[#0F2447]">Use a clean, single-column layout:</strong> Multi-column
              resumes, tables, and text boxes confuse ATS parsers. A simple top-to-bottom format with
              clear section headers (Experience, Skills, Education) is always safer.
            </li>
            <li>
              <strong className="text-[#0F2447]">Include a dedicated skills section:</strong> List relevant
              tools, technologies, certifications, and methodologies explicitly. Don&apos;t assume the ATS
              will infer your skills from job descriptions alone.
            </li>
            <li>
              <strong className="text-[#0F2447]">Spell out acronyms once:</strong> Write &ldquo;Search Engine
              Optimization (SEO)&rdquo; at least once so the ATS matches both forms. This is especially
              important for certifications and technical terms.
            </li>
            <li>
              <strong className="text-[#0F2447]">Quantify results:</strong> ATS aside, numbers make your
              impact concrete. &ldquo;Reduced churn by 18%&rdquo; is stronger than &ldquo;improved retention.&rdquo;
              Many ATS systems surface quantified achievements as signals of high performance.
            </li>
          </ul>

          <h3 className="text-base font-bold text-[#0F2447]">
            What This Tool Checks (and What It Doesn&apos;t)
          </h3>
          <p className="text-[#7A6048] leading-relaxed text-sm">
            This AI resume checker analyzes keyword overlap, identifies missing terms from the
            job description, surfaces your resume&apos;s genuine strengths relative to the role, and
            provides specific rewriting suggestions. What it doesn&apos;t check is resume formatting
            (use a simple Word or Google Docs template), file type compatibility (always submit
            .docx or PDF unless specified), or actual ATS platform-specific rules — each system
            has its own quirks. Use this tool as a keyword and content audit, not as a guarantee
            of ATS passage.
          </p>

          <h3 className="text-base font-bold text-[#0F2447]">
            How to Get the Most Accurate Analysis
          </h3>
          <p className="text-[#7A6048] leading-relaxed text-sm">
            Paste the complete job description — including the requirements section, preferred
            qualifications, and any listed responsibilities. The more detailed the JD, the more
            precise the keyword match. For your resume, paste the full plain-text version
            including your summary, all work experience bullet points, skills section, and
            education. Run the analysis, review the missing keywords, and only add the ones you
            genuinely have. Then run the analysis again to see your improved score.
          </p>
        </section>

        {/* FAQ */}
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

        <AdSlot slot="2743510532" className="my-6" />

        {/* Related Tools */}
        <section className="mt-2 mb-4">
          <h2 className="text-base font-semibold text-[#7A6048] mb-3">Related Tools</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { href: "/salary-calculator", label: "Salary Calculator" },
              { href: "/invoice-generator", label: "Invoice Generator" },
              { href: "/word-counter", label: "Word Counter" },
            ].map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="text-sm px-3 py-1.5 bg-[#FBF5EE] text-[#0F2447] rounded-full hover:bg-[#F0E4D4] transition-colors"
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
