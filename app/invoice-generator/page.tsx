import type { Metadata } from "next";
import Link from "next/link";
import { InvoiceGenerator } from "@/components/tools/InvoiceGenerator";
import { AdSlot } from "@/components/layout/AdSlot";
import { IndiaBadge } from "@/components/ui/IndiaBadge";

export const metadata: Metadata = {
  title: "Free GST Invoice Generator India — Create & Download PDF Invoice Online",
  description:
    "Create professional GST-compliant invoices and download as PDF instantly. Free online invoice generator for freelancers and businesses in India. No signup required.",
  keywords: [
    "GST invoice generator", "free invoice generator India", "GST invoice online",
    "invoice maker India", "download invoice PDF", "GST bill generator",
    "CGST SGST invoice", "IGST invoice", "tax invoice India",
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
      name: "How does the CGST, SGST, and IGST split work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If the seller and buyer are in the same state (intra-state supply), GST is split equally into CGST and SGST. For example, 18% GST = 9% CGST + 9% SGST. If seller and buyer are in different states (inter-state supply), the full tax is charged as IGST — 18% IGST. You choose the supply type in the Invoice Details section and the tool calculates automatically.",
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
        text: "No. All invoice data is processed entirely in your browser using JavaScript. Nothing is sent to or stored on our servers. For security, your GSTIN, bank details, and invoice amounts never leave your device. Invoice numbers are auto-incremented using browser localStorage — this is also local to your device.",
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

        <IndiaBadge note="GST-compliant (CGST/SGST/IGST) — for Indian businesses & freelancers" />
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Free GST Invoice Generator — No Signup, Download PDF Instantly
        </h1>
        <p className="text-gray-500 mb-6 text-sm sm:text-base">
          Create professional GST-compliant invoices and download as PDF. Supports CGST+SGST
          (intra-state) and IGST (inter-state). All data stays in your browser — nothing stored.
        </p>

        <InvoiceGenerator />

        <AdSlot slot="AFTER_RESULT_SLOT" className="my-6" />

        {/* SEO content */}
        <section className="mt-6 bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h2 className="text-xl font-bold text-gray-900">What Makes a Valid GST Invoice in India?</h2>

          <p className="text-gray-600 leading-relaxed">
            Under the GST Act, a <strong>tax invoice</strong> is mandatory for every supply of goods or services
            by a GST-registered taxpayer. A valid GST invoice must include specific fields — missing any of them
            can make the invoice non-compliant, affecting your buyer&apos;s ability to claim Input Tax Credit (ITC).
            Our free GST invoice generator ensures all mandatory fields are covered so your invoices are always compliant.
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

          <h3 className="text-lg font-semibold text-gray-800">CGST + SGST vs IGST — When to Use Which</h3>
          <p className="text-gray-600 leading-relaxed text-sm">
            If the supplier and buyer are in the <strong>same state</strong>, the GST is split equally into
            CGST (Central GST) and SGST (State GST). For an 18% GST rate: CGST = 9%, SGST = 9%.
            If the supplier and buyer are in <strong>different states</strong>, the full GST is charged
            as IGST (Integrated GST): 18% IGST. Our invoice generator auto-calculates this when you
            toggle between intra-state and inter-state in the Invoice Details section.
          </p>

          <h3 className="text-lg font-semibold text-gray-800">GST Invoice Numbering Rules</h3>
          <p className="text-gray-600 leading-relaxed text-sm">
            GST invoice numbers must be unique, sequential, and reset at the start of each financial year
            (April 1). You can use any format — e.g., INV-2025-001, 2025-26/001, or just 001 — as long
            as it&apos;s consecutive and doesn&apos;t repeat within a financial year. Our generator auto-increments
            and tracks your current sequence using browser local storage. The counter resets automatically
            at the start of each financial year (April 1).
          </p>

          <h3 className="text-lg font-semibold text-gray-800">Who Needs to Issue GST Invoices?</h3>
          <p className="text-gray-600 leading-relaxed text-sm">
            Any business or individual registered under GST must issue a tax invoice for every taxable supply.
            This includes freelancers providing services, retailers selling goods, and B2B suppliers.
            Businesses with turnover below the GST registration threshold (₹20 lakh for services, ₹40 lakh
            for goods) are exempt from registration and need not issue GST invoices. However, even unregistered
            businesses can use this tool to create professional invoices — simply leave the GSTIN field blank.
          </p>

          <h3 className="text-lg font-semibold text-gray-800">HSN and SAC Codes</h3>
          <p className="text-gray-600 leading-relaxed text-sm">
            HSN (Harmonised System of Nomenclature) codes are used for goods, while SAC (Services Accounting
            Code) codes are used for services. Businesses with turnover above ₹5 crore must use 6-digit codes;
            those between ₹1.5 crore and ₹5 crore use 4-digit codes; and those below ₹1.5 crore may use
            2-digit codes. Common SAC codes include 9983 (IT services), 9985 (support services), and 9954
            (construction services).
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
