import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About UtilSpot — Free Online Tools, No Signup",
  description: "UtilSpot.app builds free, fast, no-signup online calculators and utility tools — EMI, tax, TDEE, QR codes, invoices, and more.",
  alternates: { canonical: "https://utilspot.app/about" },
};

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
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

        <section className="bg-blue-50 rounded-xl p-5 border border-blue-100">
          <h2 className="font-semibold text-blue-900 mb-2">Our Tools</h2>
          <ul className="space-y-1 text-sm text-blue-800">
            <li>
              <Link href="/emi-calculator" className="hover:underline">EMI Calculator</Link>
              {" "}— Home, car, and personal loan EMI with amortization schedule
            </li>
            <li><Link href="/income-tax-calculator" className="hover:underline">Income Tax Calculator</Link> — FY 2025-26 new vs old regime comparison</li>
            <li><Link href="/sip-calculator" className="hover:underline">SIP Calculator</Link> — Mutual fund SIP returns and goal planning</li>
            <li><Link href="/word-counter" className="hover:underline">Word Counter</Link> — Words, characters, reading time, keyword density</li>
            <li><Link href="/tdee-calculator" className="hover:underline">TDEE Calculator</Link> — Daily calorie needs and macro targets</li>
            <li><Link href="/invoice-generator" className="hover:underline">GST Invoice Generator</Link> — Free GST invoice PDF download</li>
          </ul>
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
            <Link href="/contact" className="text-blue-600 hover:underline">
              Contact us here →
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
