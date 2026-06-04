import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — UtilSpot",
  description: "Privacy policy for UtilSpot.app — how we handle (or don't handle) your data.",
  alternates: { canonical: "https://www.utilspot.app/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
      <p className="text-gray-500 mb-8 text-sm">Last updated: June 2025</p>

      <div className="prose prose-gray max-w-none space-y-6">
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Overview</h2>
          <p className="text-gray-600 leading-relaxed">
            UtilSpot.app (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;) is committed to protecting your privacy. This policy explains what data we
            collect, how we use it, and your rights. The short version: we collect very little, and we don&apos;t sell anything.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">What We Collect</h2>
          <div className="space-y-3 text-gray-600 leading-relaxed">
            <p>
              <strong>Tool inputs:</strong> All calculations on UtilSpot happen entirely in your browser. We do not
              transmit, store, or log any numbers you enter into our calculators.
            </p>
            <p>
              <strong>Analytics:</strong> We use Google Analytics to understand how many people visit our site and which
              tools are popular. This collects anonymized data like page views, country, and device type — not personally
              identifiable information.
            </p>
            <p>
              <strong>Advertising:</strong> We use Google AdSense to display ads. Google may use cookies to show you
              relevant ads based on your browsing history. You can opt out via{" "}
              <a href="https://adssettings.google.com" className="text-blue-600 hover:underline" rel="noopener noreferrer" target="_blank">
                Google Ad Settings
              </a>
              .
            </p>
            <p>
              <strong>Contact form:</strong> If you contact us, we collect your email address to reply. We don&apos;t add you
              to any mailing lists.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Cookies</h2>
          <p className="text-gray-600 leading-relaxed">
            We use only essential cookies required for the site to function and third-party cookies set by Google
            Analytics and Google AdSense. We do not use tracking cookies for our own purposes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Third-Party Links</h2>
          <p className="text-gray-600 leading-relaxed">
            Some tool pages contain affiliate links to partners like BankBazaar, Groww, or Zerodha. These are clearly
            marked. We earn a commission if you make a purchase, but this does not affect our recommendations or the
            accuracy of our tools.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Your Rights</h2>
          <p className="text-gray-600 leading-relaxed">
            Since we don&apos;t store personal data from tool use, there is nothing to delete. If you&apos;ve contacted us by
            email, you may request deletion of that data by emailing us. Under GDPR and Indian IT Act provisions,
            you have the right to access, correct, or delete your personal data.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Contact</h2>
          <p className="text-gray-600 leading-relaxed">
            Questions about this policy? Email us at{" "}
            <a href="mailto:hello@utilspot.app" className="text-blue-600 hover:underline">
              hello@utilspot.app
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
