import type { Metadata } from "next";
import Link from "next/link";
import { QRCodeGenerator } from "@/components/tools/QRCodeGenerator";
import { AdSlot } from "@/components/layout/AdSlot";

export const metadata: Metadata = {
  title: "Free QR Code Generator — Create QR Codes Online, No Signup",
  description:
    "Generate QR codes for URL, text, phone, email, WhatsApp, and WiFi instantly. Free online QR code generator. Download as PNG. No signup required.",
  keywords: [
    "qr code generator",
    "free qr code",
    "create qr code online",
    "qr code for url",
    "qr code for whatsapp",
    "wifi qr code",
    "qr code maker",
    "online qr code generator india",
    "download qr code png",
  ],
  openGraph: {
    title: "Free QR Code Generator — Create Custom QR Codes Instantly",
    description:
      "Generate QR codes for URL, text, phone, email, WhatsApp, and WiFi instantly. Free. No signup. Download as PNG.",
    url: "https://www.utilspot.app/qr-code-generator",
    siteName: "UtilSpot",
  },
  alternates: { canonical: "https://www.utilspot.app/qr-code-generator" },
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Free QR Code Generator",
  description:
    "Generate QR codes for URL, text, phone, email, WhatsApp, and WiFi. Free online tool. Download as PNG. No signup required.",
  url: "https://www.utilspot.app/qr-code-generator",
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
      name: "What is a QR code and how does it work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A QR (Quick Response) code is a two-dimensional barcode that stores information in a grid of black and white squares. When you scan a QR code with a smartphone camera, the phone's QR reader decodes the pattern and opens the encoded content — such as a URL, contact details, or WiFi credentials. QR codes can store up to 4,296 alphanumeric characters and support four error correction levels so the code remains scannable even if partially damaged.",
      },
    },
    {
      "@type": "Question",
      name: "Are QR codes free to create and use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Static QR codes — the kind that directly encode a URL or text — are completely free to create and use forever. The QR format itself is an open standard (ISO/IEC 18004). Some paid services offer 'dynamic' QR codes where you can change the destination URL later, but for most use cases a static QR code is all you need. Our generator creates static QR codes at no cost.",
      },
    },
    {
      "@type": "Question",
      name: "How do I scan a QR code on my phone?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "On most modern smartphones you can scan a QR code directly from the camera app — just point the camera at the QR code and tap the notification that appears. On iPhone (iOS 11+), open the Camera app and aim at the code; a banner appears at the top to open the link. On Android (8.0+), the default Camera app or Google Lens handles QR codes. If your device doesn't support it natively, install a free QR reader app from the Play Store or App Store.",
      },
    },
    {
      "@type": "Question",
      name: "What is error correction in QR codes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Error correction allows a QR code to be scanned even when part of it is obscured, dirty, or damaged. There are four levels: L (Low, ~7% data restoration), M (Medium, ~15%), Q (Quartile, ~25%), and H (High, ~30%). A higher level makes the QR code more robust but also larger and more complex. Use Level M for most digital uses. Choose Level H if you plan to print the QR code on packaging, stickers, or anywhere a logo will be overlaid on it.",
      },
    },
    {
      "@type": "Question",
      name: "Can I create a QR code for WhatsApp?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. A WhatsApp QR code encodes a wa.me link (e.g. https://wa.me/919876543210) which opens a WhatsApp chat with that number when scanned. Our generator handles this automatically — just select the WhatsApp type, enter the 10-digit mobile number, and the QR is generated with the correct format. The +91 country code for India is added automatically. Scanning the QR code opens WhatsApp directly on the scanned phone.",
      },
    },
  ],
};

export default function QRCodeGeneratorPage() {
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
        <nav className="text-xs text-gray-400 mb-4">
          <Link href="/" className="hover:text-[#E8500A]">
            Home
          </Link>
          <span className="mx-2">›</span>
          <span className="text-gray-600">QR Code Generator</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F2447] mb-2">
          Free QR Code Generator — Create Custom QR Codes Instantly
        </h1>
        <div className="flex flex-wrap gap-3 mb-2">
          <span className="inline-flex items-center gap-1.5 text-xs bg-[#F1F5F9] text-[#475569] px-3 py-1 rounded-full font-medium">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            Last updated: June 2025 · Works with all QR code scanners
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs bg-[#F1F5F9] text-[#475569] px-3 py-1 rounded-full font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            Generated by 4,800+ users this month
          </span>
        </div>
        <p className="text-gray-500 mb-6 text-sm sm:text-base">
          Generate QR codes for URLs, text, phone numbers, email, WhatsApp, and WiFi. No signup. Download as PNG instantly.
        </p>

        <QRCodeGenerator />

        <AdSlot slot="AFTER_RESULT_SLOT" className="my-6" />

        <section className="mt-8 bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h2 className="text-xl font-bold text-gray-900">About This QR Code Generator</h2>

          <p className="text-gray-600 leading-relaxed">
            QR codes have become one of the most widely used tools for sharing information quickly — from restaurant menus
            and business cards to payment links and event registrations. Our <strong>free QR code generator</strong> lets
            you create a QR code in seconds for any type of content, with no account, no watermark, and no expiry.
          </p>

          <h3 className="text-lg font-semibold text-gray-800">Supported QR Code Types</h3>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-600 text-sm leading-relaxed">
            <li>
              <strong>URL / Website:</strong> Encode any web address. Perfect for sharing links on print materials,
              packaging, or offline ads. The URL is automatically prefixed with{" "}
              <code className="bg-gray-100 px-1 rounded">https://</code> if omitted.
            </li>
            <li>
              <strong>Plain Text:</strong> Store any text — product serial numbers, short messages, address details,
              or event descriptions.
            </li>
            <li>
              <strong>Phone Number:</strong> Generates a{" "}
              <code className="bg-gray-100 px-1 rounded">tel:</code> link. Scanning it lets the user dial the
              number directly. India&apos;s +91 code is added automatically.
            </li>
            <li>
              <strong>Email:</strong> Creates a{" "}
              <code className="bg-gray-100 px-1 rounded">mailto:</code> link. Scanning opens the default email
              app with the recipient pre-filled.
            </li>
            <li>
              <strong>WhatsApp:</strong> Generates a{" "}
              <code className="bg-gray-100 px-1 rounded">wa.me</code> link. Scanning opens WhatsApp chat
              directly — useful for business cards and shop counters.
            </li>
            <li>
              <strong>WiFi:</strong> Encodes SSID, password, and security type so guests can scan to connect to
              your network without typing a password.
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800">Customisation Options</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Beyond the content, you can choose the output size (150 px for thumbnails, 300 px for standard use,
            500 px for print), change the QR foreground and background colors for brand matching, and select an error
            correction level from L to H. For logos overlaid on QR codes, always use Level H so the code remains
            scannable even with 30% of the surface covered.
          </p>

          <h3 className="text-lg font-semibold text-gray-800">Common Use Cases in India</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-3 py-2 font-semibold text-gray-600">Use Case</th>
                  <th className="text-left px-3 py-2 font-semibold text-gray-600">Recommended Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-600">
                {[
                  ["Restaurant menu", "URL → hosted menu page"],
                  ["UPI payment link", "URL → UPI deep link"],
                  ["WhatsApp for business", "WhatsApp → your number"],
                  ["Café / hotel WiFi access", "WiFi → SSID + password"],
                  ["Business card", "URL → portfolio or vCard"],
                  ["Event entry pass", "Text → ticket ID"],
                  ["Product packaging", "URL → product page"],
                  ["Email newsletter signup", "URL → signup form"],
                ].map(([useCase, type]) => (
                  <tr key={useCase} className="hover:bg-gray-50">
                    <td className="px-3 py-2">{useCase}</td>
                    <td className="px-3 py-2 text-[#0F2447] font-medium">{type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold text-gray-800">Tips for Better QR Codes</h3>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-600 text-sm leading-relaxed">
            <li>Keep URLs short — use a URL shortener if your link is very long. Shorter data = smaller, faster-scanning QR.</li>
            <li>Always test the QR code on multiple devices before printing at scale.</li>
            <li>Maintain adequate quiet zone (white border) around the QR when placing it on colored backgrounds.</li>
            <li>Minimum print size for reliable scanning is about 2 cm × 2 cm (≈ 0.8 inch).</li>
            <li>Avoid placing QR codes on curved surfaces — flat placement improves scan success.</li>
          </ul>
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
              { href: "/word-counter", label: "Word Counter" },
              { href: "/invoice-generator", label: "Invoice Generator" },
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
