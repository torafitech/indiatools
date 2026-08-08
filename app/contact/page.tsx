import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact the UtilSpot team — report bugs, suggest features, or ask questions.",
  alternates: { canonical: "https://www.utilspot.app/contact" },
};

export default function ContactPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <nav className="text-xs text-gray-400 mb-4">
        <Link href="/" className="hover:text-[#E8500A]">Home</Link>
        <span className="mx-2">›</span>
        <span className="text-gray-600">Contact</span>
      </nav>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Us</h1>
      <p className="text-gray-500 mb-8">Reach out for bug reports, tool suggestions, or any questions.</p>

      <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
        <p className="text-gray-600 mb-4">
          Bug report, feature suggestion, or a question about a tool — email us directly and we&apos;ll get back to you.
        </p>
        <a
          href="mailto:hello@utilspot.app"
          className="inline-block bg-[#E8500A] text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-[#D44A09] transition-colors text-sm"
        >
          hello@utilspot.app
        </a>
      </div>
    </main>
  );
}
