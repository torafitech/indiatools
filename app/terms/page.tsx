import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — IndiaTools",
  description: "Terms of service for IndiaTools.in — free online tools for India.",
  alternates: { canonical: "https://indiatools.in/terms" },
};

export default function TermsPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
      <p className="text-gray-500 mb-8 text-sm">Last updated: June 2025</p>

      <div className="space-y-6 text-gray-600 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">1. Acceptance of Terms</h2>
          <p>
            By using IndiaTools.in, you agree to these Terms of Service. If you do not agree, please stop using the
            site. We reserve the right to update these terms at any time.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">2. Use of Tools</h2>
          <p>
            All tools on IndiaTools.in are provided for informational and educational purposes only. The results are
            estimates and approximations — they do not constitute financial, legal, tax, or medical advice. Always
            verify important calculations with a qualified professional before making financial decisions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">3. Accuracy Disclaimer</h2>
          <p>
            We strive to keep all calculations accurate, but we make no warranties regarding the accuracy, completeness,
            or timeliness of results. Tax slabs, interest rates, and regulatory requirements change frequently —
            always verify with official government sources (Income Tax Department, RBI) for critical decisions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">4. Affiliate Links</h2>
          <p>
            Some pages contain affiliate links. We earn a small commission if you purchase through these links at no
            additional cost to you. This does not influence our tool recommendations.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">5. Intellectual Property</h2>
          <p>
            All content, design, and code on IndiaTools.in is owned by us unless otherwise stated. You may not
            reproduce, copy, or scrape our content without permission.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">6. Limitation of Liability</h2>
          <p>
            IndiaTools.in shall not be liable for any financial losses, damages, or decisions made based on tool
            results. Use all tools at your own risk.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">7. Contact</h2>
          <p>
            For any questions about these terms, email{" "}
            <a href="mailto:hello@indiatools.in" className="text-blue-600 hover:underline">
              hello@indiatools.in
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
