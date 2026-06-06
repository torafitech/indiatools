import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About UtilSpot — Free Online Tools, No Signup",
  description: "UtilSpot.app builds free, fast, no-signup online calculators and utility tools — EMI, tax, TDEE, QR codes, invoices, and more.",
  alternates: { canonical: "https://www.utilspot.app/about" },
};

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <nav className="text-xs text-gray-400 mb-4">
        <Link href="/" className="hover:text-[#E8500A]">Home</Link>
        <span className="mx-2">›</span>
        <span className="text-gray-600">About</span>
      </nav>
      <h1 className="text-3xl font-bold text-gray-900 mb-4">About UtilSpot</h1>

      <div className="space-y-6 text-gray-600 leading-relaxed">
        <p className="text-lg text-gray-700">
          UtilSpot.app is a collection of free online calculators and utility tools — built to be fast, accurate, and clutter-free.
        </p>

        <p>
          Most existing tool sites are either too slow, full of ads, require you to sign up, or haven&apos;t been updated
          since the last budget. We built UtilSpot to fix that — clean, fast, accurate tools that anyone can use
          without creating an account.
        </p>

        <p>
          Every tool on this site is stateless — your inputs never leave your browser. There&apos;s no database storing
          your salary, loan amount, or health data. What you calculate is yours.
        </p>

        <section className="bg-[#F0F4FF] rounded-xl p-5 border border-[#CBD5EF] space-y-4">
          <h2 className="font-semibold text-[#0F2447]">Our Tools</h2>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-[#7A6048] mb-1.5">Finance</h3>
            <ul className="space-y-1 text-sm text-[#0F2447]">
              <li><Link href="/emi-calculator" className="hover:underline">EMI Calculator</Link> — Home, car, and personal loan EMI with amortization</li>
              <li><Link href="/income-tax-calculator" className="hover:underline">Income Tax Calculator</Link> — FY 2025-26 new vs old regime comparison</li>
              <li><Link href="/sip-calculator" className="hover:underline">SIP Calculator</Link> — Mutual fund SIP returns and goal planning</li>
              <li><Link href="/salary-calculator" className="hover:underline">CTC to In-Hand Calculator</Link> — Monthly in-hand from CTC with PF & tax</li>
              <li><Link href="/construction-cost-calculator" className="hover:underline">Construction Cost Estimator</Link> — Home build cost across 30+ Indian cities</li>
              <li><Link href="/equity-calculator" className="hover:underline">Equity & Dilution Calculator</Link> — Startup cap table and funding round simulator</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-[#7A6048] mb-1.5">Labour & HR</h3>
            <ul className="space-y-1 text-sm text-[#0F2447]">
              <li><Link href="/new-labour-code-calculator" className="hover:underline">New Labour Code Calculator</Link> — PF, gratuity, and take-home under new code</li>
              <li><Link href="/gratuity-calculator" className="hover:underline">Gratuity Calculator 2026</Link> — Gratuity under new Labour Code rules</li>
              <li><Link href="/pf-calculator" className="hover:underline">PF & EPF Calculator</Link> — EPF corpus projection with year-by-year growth</li>
              <li><Link href="/full-final-settlement-calculator" className="hover:underline">Full & Final Settlement</Link> — F&F on resignation: salary, leave, gratuity, notice</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-[#7A6048] mb-1.5">Health</h3>
            <ul className="space-y-1 text-sm text-[#0F2447]">
              <li><Link href="/tdee-calculator" className="hover:underline">TDEE Calculator</Link> — Daily calorie needs and macro targets</li>
              <li><Link href="/nutrition-label-calculator" className="hover:underline">FSSAI Nutrition Label</Link> — FSSAI-compliant food labels for Indian products</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-[#7A6048] mb-1.5">Developer</h3>
            <ul className="space-y-1 text-sm text-[#0F2447]">
              <li><Link href="/qr-code-generator" className="hover:underline">QR Code Generator</Link> — URL, text, WiFi, WhatsApp QR codes</li>
              <li><Link href="/seo-analyzer" className="hover:underline">Website SEO Analyzer</Link> — On-page SEO audit: title, meta, H-tags, images</li>
              <li><Link href="/accessibility-checker" className="hover:underline">Accessibility Checker</Link> — WCAG 2.1 AA compliance check from HTML</li>
              <li><Link href="/cron-builder" className="hover:underline">Cron Expression Builder</Link> — Visual cron builder with plain English preview</li>
              <li><Link href="/readme-generator" className="hover:underline">GitHub README Generator</Link> — AI-powered README.md with badges and ToC</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-[#7A6048] mb-1.5">Business & Career</h3>
            <ul className="space-y-1 text-sm text-[#0F2447]">
              <li><Link href="/invoice-generator" className="hover:underline">GST Invoice Generator</Link> — GST-compliant invoices with PDF download</li>
              <li><Link href="/freelance-rate-calculator" className="hover:underline">Freelance Rate Calculator</Link> — Hourly rate benchmarks by skill and country</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-[#7A6048] mb-1.5">Security & Writing</h3>
            <ul className="space-y-1 text-sm text-[#0F2447]">
              <li><Link href="/password-generator" className="hover:underline">Password Generator</Link> — Secure random passwords, 100% client-side</li>
              <li><Link href="/word-counter" className="hover:underline">Word Counter</Link> — Words, characters, reading time, keyword density</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">How We Stay Free</h2>
          <p>
            UtilSpot is free to use and will remain free. We earn revenue through Google AdSense display ads and
            affiliate commissions on links to financial services like BankBazaar and investment platforms. We clearly
            label all affiliate links and they do not affect our tool accuracy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Get in Touch</h2>
          <p>
            Found a bug? Have a tool suggestion? We&apos;d love to hear from you.{" "}
            <Link href="/contact" className="text-[#E8500A] hover:underline">
              Contact us here →
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
