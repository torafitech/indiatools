import type { Metadata } from "next";
import Link from "next/link";
import { LegalDocGenerator } from "@/components/tools/LegalDocGenerator";
import { AdSlot } from "@/components/layout/AdSlot";
import { IndiaBadge } from "@/components/ui/IndiaBadge";

export const metadata: Metadata = {
  title: "Free Legal Document Generator India — NDA, Rent Agreement, Contracts | UtilSpot",
  description:
    "Generate professional Indian legal documents instantly with AI — NDA, rent agreement, freelance contract, employment offer letter. Free, no signup needed.",
  keywords: [
    "legal document generator India",
    "NDA generator India",
    "rent agreement generator",
    "freelance contract India",
    "employment offer letter generator",
    "AI legal document generator",
    "free legal documents India",
    "legal template generator India",
    "rental agreement format India",
    "non disclosure agreement India",
  ],
  openGraph: {
    title: "Free Legal Document Generator India — NDA, Rent Agreement, Contracts | UtilSpot",
    description:
      "Generate professional Indian legal documents instantly with AI — NDA, rent agreement, freelance contract, employment offer letter. Free, no signup needed.",
    url: "https://www.utilspot.app/legal-document-generator",
    siteName: "UtilSpot",
  },
  alternates: { canonical: "https://www.utilspot.app/legal-document-generator" },
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "AI Legal Document Generator India",
  description:
    "Generate professional Indian legal documents using AI — NDA, rent agreement, freelance contract, and employment offer letter. Free, instant, no signup required.",
  url: "https://www.utilspot.app/legal-document-generator",
  applicationCategory: "LegalApplication",
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
      name: "Are these AI-generated legal documents legally valid in India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AI-generated documents are templates and starting points — they are not automatically legally binding. For a document to be enforceable in India, it generally needs to be signed by all parties on appropriate stamp paper (as per the Indian Stamp Act), witnessed, and in some cases registered (e.g. rent agreements over 11 months must be registered under the Registration Act, 1908). Always consult a qualified lawyer before using any legal document in an official capacity.",
      },
    },
    {
      "@type": "Question",
      name: "What stamp paper is required for a rent agreement in India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Stamp duty for rent agreements varies by state. In Maharashtra, a rent agreement on stamp paper of ₹100 or 0.25% of total rent for 11 months is common. In Karnataka, it is typically ₹20–₹500 depending on duration and rent. For agreements exceeding 11 months, registration at the Sub-Registrar's Office is mandatory across most states. Use the generated template as a draft and get it printed on appropriate stamp paper from a licensed vendor.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use this NDA for a startup partnership in India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — the generated NDA includes standard Indian legal clauses covering confidential information, obligations of parties, exclusions, and remedies for breach. However, for sensitive startup partnerships (especially involving IP, technology, or significant funding), have a startup lawyer review and customise the agreement. Indian courts have upheld NDA clauses under the Indian Contract Act, 1872, provided they are reasonable in scope and duration.",
      },
    },
    {
      "@type": "Question",
      name: "What should a freelance contract include under Indian law?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A solid Indian freelance contract should include: scope of work and deliverables, payment terms (including GST if applicable — freelancers earning over ₹20L/year must register), intellectual property assignment, timelines, revision policy, termination conditions, and a dispute resolution clause specifying Indian jurisdiction. The generated contract covers all these bases — customise amounts and timelines to match your agreement.",
      },
    },
    {
      "@type": "Question",
      name: "Is an employment offer letter enough or do I need a separate employment contract?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An offer letter is the first formal step — it confirms position, CTC, and joining date. In India, companies are also required under the Shops and Establishments Act of the relevant state to provide a proper appointment letter or employment agreement covering leave policy, working hours, confidentiality, and termination procedures. For startups and small businesses, a detailed offer letter often doubles as the employment agreement. For regulated industries (IT, banking, manufacturing), a separate comprehensive employment contract is strongly recommended.",
      },
    },
  ],
};

export default function LegalDocGeneratorPage() {
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
          <span className="text-gray-600">Legal Document Generator</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F2447] mb-2">
          Free AI Legal Document Generator — NDA, Rent Agreement &amp; More
        </h1>
        <p className="text-gray-500 mb-4 text-sm sm:text-base">
          Generate professional Indian legal document templates instantly — NDA, rent agreement,
          freelance contract, and employment offer letter. Powered by Claude AI. Free, no signup.
        </p>

        <IndiaBadge note="AI-generated legal templates for India — NDA, rent agreements, contracts" />

        <LegalDocGenerator />

        <AdSlot slot="LEGAL_DOC_SLOT" className="my-6" />

        {/* SEO Content */}
        <section className="mt-8 bg-white rounded-xl border border-gray-200 p-6 prose prose-gray max-w-none">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Legal Document Templates for India — What You Need to Know
          </h2>

          <p className="text-gray-600 leading-relaxed mb-4">
            Creating legal documents in India can be time-consuming and expensive. Whether you are
            a freelancer drafting your first client contract, a landlord preparing a rent agreement,
            a startup founder signing an NDA with a potential partner, or an HR manager issuing
            offer letters — you need professionally worded documents that cover the right clauses
            under Indian law.
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">
            This free tool uses <strong>Claude AI</strong> to generate four of the most commonly
            needed legal document templates in India. Enter your specific details — party names,
            addresses, amounts, timelines — and get a complete, formatted document in seconds.
            Every document includes the appropriate <strong>THIS AGREEMENT</strong> header,{" "}
            <strong>WHEREAS clauses</strong>, numbered sections, and standard Indian legal
            boilerplate.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">NDA (Non-Disclosure Agreement)</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            An NDA is essential whenever you share sensitive business information — product ideas,
            financials, customer data, or technical specifications — with an external party. In
            India, NDAs are governed by the <strong>Indian Contract Act, 1872</strong>. A
            well-drafted NDA defines what constitutes confidential information, the obligations of
            the receiving party, permitted disclosures (e.g. to courts or regulators), the duration
            of the obligation, and remedies in case of breach. Our generator creates a mutual or
            one-way NDA based on your inputs.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">Rent Agreement</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            A rent agreement (also called a lease agreement or rental agreement) protects both
            landlord and tenant. In India, most residential rentals are structured as{" "}
            <strong>11-month agreements</strong> to avoid mandatory registration under the
            Registration Act, 1908 — agreements of 12 months or more must be registered at the
            Sub-Registrar&apos;s Office. The generated agreement covers rent amount, security
            deposit, maintenance responsibilities, notice period, and lock-in clauses. Stamp duty
            requirements vary by state — the generator includes a note specific to the city you
            enter.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">Freelance Contract</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            India has over 15 million freelancers and the number is growing rapidly. A solid
            freelance contract prevents disputes over payment, ownership of deliverables, scope
            creep, and revision cycles. The generated contract covers project scope, deliverables,
            payment milestones, intellectual property rights (work-for-hire), confidentiality,
            termination conditions, and the governing law clause. If you are registered for GST,
            ensure your payment clause mentions &ldquo;exclusive of GST&rdquo; or includes the
            applicable tax amount.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">Employment Offer Letter</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            An offer letter is the official document that confirms a candidate&apos;s selection,
            position, and compensation. Under Indian labour law — including the{" "}
            <strong>Industrial Employment (Standing Orders) Act</strong> and state-level Shops and
            Establishments Acts — employers are required to provide written terms of employment.
            The generated offer letter includes CTC breakdown guidance, probation period terms,
            joining instructions, and standard confidentiality and at-will employment clauses
            appropriate for Indian private sector companies.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            How to Use This Tool Effectively
          </h3>
          <ol className="list-decimal pl-5 space-y-2 text-gray-600 mb-4">
            <li>
              Select your document type and fill in all required fields — the more accurate your
              inputs, the better the generated document.
            </li>
            <li>
              Download the .txt file and copy it into a Word document or Google Doc for further
              formatting.
            </li>
            <li>
              Review every clause carefully. AI-generated templates are starting points — adjust
              any terms that don&apos;t match your specific arrangement.
            </li>
            <li>
              For rent agreements and employment contracts, consult a local lawyer or chartered
              secretary familiar with your state&apos;s stamp duty and registration requirements.
            </li>
            <li>
              Get all parties to sign in the presence of witnesses. For registered documents, visit
              the Sub-Registrar&apos;s Office with both parties and original ID proof.
            </li>
          </ol>

          <p className="text-gray-600 leading-relaxed">
            Need professional legal help beyond a template? Consider platforms like{" "}
            <strong>Vakil Search</strong>, <strong>Lawrato</strong>, or{" "}
            <strong>LegalKart</strong> for affordable online legal consultations with Indian
            lawyers.
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
              { href: "/invoice-generator", label: "Invoice Generator" },
              { href: "/salary-calculator", label: "Salary Calculator" },
              { href: "/business-name-generator", label: "Business Name Generator" },
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
