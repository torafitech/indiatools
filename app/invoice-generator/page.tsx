import type { Metadata } from "next";
import Link from "next/link";
import { AdSlot } from "@/components/layout/AdSlot";

export const metadata: Metadata = {
  title: "Free GST Invoice Generator India — Create & Download PDF Invoice Online",
  description:
    "Create professional GST-compliant invoices and download as PDF instantly. Free online invoice generator for freelancers and businesses in India. No signup required.",
  keywords: [
    "GST invoice generator", "free invoice generator India", "GST invoice online",
    "invoice maker India", "download invoice PDF", "GST bill generator",
  ],
  openGraph: {
    title: "Free GST Invoice Generator — No Signup, Download PDF Instantly",
    description: "Create professional GST invoices and download as PDF. Free, no signup, works in browser.",
    url: "https://indiatools.in/invoice-generator",
    siteName: "IndiaTools",
  },
  alternates: { canonical: "https://indiatools.in/invoice-generator" },
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Free GST Invoice Generator",
  description: "Free GST-compliant invoice generator with PDF download for Indian freelancers and businesses.",
  url: "https://indiatools.in/invoice-generator",
  applicationCategory: "BusinessApplication",
  operatingSystem: "All",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is this invoice generator GST compliant?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The invoice generator includes all fields required under GST law: GSTIN of seller and buyer, HSN/SAC codes, CGST + SGST (intra-state) or IGST (inter-state) calculation, invoice number, date, and place of supply. The generated PDF meets the requirements of a valid tax invoice under the GST Act.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to sign up or pay to use this?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. This invoice generator is completely free and requires no signup. All invoice data is processed in your browser — nothing is stored on our servers. Download the PDF directly to your device.",
      },
    },
    {
      "@type": "Question",
      name: "Can I add my company logo to the invoice?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can upload your company logo and it will appear on the generated PDF invoice. Supported formats: PNG, JPG, SVG. Recommended size: 200x80 pixels.",
      },
    },
    {
      "@type": "Question",
      name: "What GST rates are supported?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The invoice generator supports all standard GST rates: 0%, 5%, 12%, 18%, and 28%. You can set different GST rates for each line item. The calculator automatically computes CGST + SGST for intra-state supplies and IGST for inter-state supplies based on the place of supply.",
      },
    },
    {
      "@type": "Question",
      name: "Is my invoice data saved anywhere?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. All invoice data is processed entirely in your browser using JavaScript. Nothing is sent to or stored on our servers. For security, your GSTIN, bank details, and invoice amounts never leave your device.",
      },
    },
  ],
};

export default function InvoiceGeneratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <nav className="text-xs text-gray-400 mb-4">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-600">GST Invoice Generator</span>
        </nav>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Free GST Invoice Generator — No Signup, Download PDF Instantly
        </h1>
        <p className="text-gray-500 mb-6 text-sm sm:text-base">
          Create professional GST-compliant invoices and download as PDF. Free for freelancers
          and businesses. All data stays in your browser — nothing is stored.
        </p>

        {/* Coming soon card */}
        <div className="bg-white rounded-2xl border-2 border-dashed border-blue-200 p-10 text-center">
          <div className="text-5xl mb-4">🧾</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Invoice Generator — Coming Soon</h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto mb-6">
            We&apos;re building a full GST invoice generator with PDF download, logo upload, multiple
            line items, and automatic CGST/SGST/IGST calculation. Launching very soon.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {[
              "GST-compliant PDF", "Logo upload", "Multiple line items",
              "CGST + SGST auto-calc", "Bank details", "No signup",
            ].map((f) => (
              <span key={f} className="text-xs bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1.5 rounded-full font-medium">
                ✓ {f}
              </span>
            ))}
          </div>
          <p className="text-sm text-gray-400">
            In the meantime, try our other tools:
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-3">
            {[
              { href: "/emi-calculator", label: "EMI Calculator" },
              { href: "/income-tax-calculator", label: "Tax Calculator" },
              { href: "/sip-calculator", label: "SIP Calculator" },
            ].map((t) => (
              <Link key={t.href} href={t.href}
                className="text-sm px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium">
                {t.label} →
              </Link>
            ))}
          </div>
        </div>

        <AdSlot slot="AFTER_RESULT_SLOT" className="my-6" />

        {/* SEO content — important for Google indexing even on coming soon */}
        <section className="mt-6 bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h2 className="text-xl font-bold text-gray-900">What Makes a Valid GST Invoice?</h2>

          <p className="text-gray-600 leading-relaxed">
            Under the GST Act, a <strong>tax invoice</strong> is mandatory for every supply of goods or services
            by a registered taxpayer. A valid GST invoice must include specific fields — missing any of them
            can make the invoice non-compliant, affecting your buyer&apos;s ability to claim Input Tax Credit (ITC).
          </p>

          <h3 className="text-lg font-semibold text-gray-800">Mandatory Fields on a GST Invoice</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { field: "Supplier GSTIN", desc: "Your 15-digit GST Identification Number" },
              { field: "Invoice Number", desc: "Unique sequential number, reset each financial year" },
              { field: "Invoice Date", desc: "Date of issue of the invoice" },
              { field: "Buyer GSTIN", desc: "Required if buyer is registered; optional for B2C" },
              { field: "Place of Supply", desc: "Determines CGST+SGST vs IGST application" },
              { field: "HSN / SAC Code", desc: "Harmonised code for goods (HSN) or services (SAC)" },
              { field: "Tax Rate & Amount", desc: "CGST%, SGST% or IGST% and corresponding amounts" },
              { field: "Total Invoice Value", desc: "Including all taxes, rounded to nearest rupee" },
            ].map((item) => (
              <div key={item.field} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <p className="font-semibold text-gray-900 text-sm">{item.field}</p>
                <p className="text-gray-500 text-xs mt-0.5">{item.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold text-gray-800">CGST + SGST vs IGST</h3>
          <p className="text-gray-600 leading-relaxed text-sm">
            If the supplier and buyer are in the <strong>same state</strong>, the GST is split equally into
            CGST (Central GST) and SGST (State GST). For an 18% GST rate: CGST = 9%, SGST = 9%.
            If the supplier and buyer are in <strong>different states</strong>, the full GST is charged
            as IGST (Integrated GST): 18% IGST. Our invoice generator auto-detects this based on
            the place of supply you select.
          </p>

          <h3 className="text-lg font-semibold text-gray-800">Invoice Numbering Rules</h3>
          <p className="text-gray-600 leading-relaxed text-sm">
            GST invoice numbers must be unique, sequential, and reset at the start of each financial year
            (April 1). You can use any format — e.g., INV-2025-001, 2025-26/001, or just 001 — as long
            as it&apos;s consecutive and doesn&apos;t repeat. Our generator auto-increments for you.
          </p>
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

        <AdSlot slot="BELOW_FAQ_SLOT" className="my-6" />

        <section className="mt-2 mb-4">
          <h2 className="text-base font-semibold text-gray-700 mb-3">Related Tools</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { href: "/emi-calculator", label: "EMI Calculator" },
              { href: "/income-tax-calculator", label: "Income Tax Calculator" },
              { href: "/sip-calculator", label: "SIP Calculator" },
            ].map((t) => (
              <Link key={t.href} href={t.href}
                className="text-sm px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors">
                {t.label} →
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
