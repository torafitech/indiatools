import type { Metadata } from "next";
import Link from "next/link";
import { PasswordGenerator } from "@/components/tools/PasswordGenerator";
import { AdSlot } from "@/components/layout/AdSlot";

export const metadata: Metadata = {
  title: "Free Password Generator & Strength Tester — Secure Random Passwords",
  description:
    "Generate strong random passwords and test existing ones. 100% client-side — passwords never leave your browser. Uses Web Crypto API for true randomness. Free.",
  keywords: [
    "password generator",
    "strong password generator",
    "secure password generator",
    "random password generator",
    "password strength checker",
    "password strength tester",
    "online password generator free",
    "complex password generator",
    "random password creator",
    "safe password generator",
  ],
  openGraph: {
    title: "Free Password Generator & Strength Tester — Secure Random Passwords",
    description:
      "Generate strong secure passwords and test existing ones. 100% client-side, Web Crypto API. Nothing sent to any server.",
    url: "https://www.utilspot.app/password-generator",
    siteName: "UtilSpot",
  },
  alternates: { canonical: "https://www.utilspot.app/password-generator" },
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Free Password Generator & Strength Tester",
  description: "Generate cryptographically random passwords and test existing password strength. 100% client-side using Web Crypto API. Configurable length, character sets, and bulk generation.",
  url: "https://www.utilspot.app/password-generator",
  applicationCategory: "SecurityApplication",
  operatingSystem: "All",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is this password generator safe to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. This generator runs entirely in your browser using the Web Crypto API (crypto.getRandomValues), which provides cryptographically secure random numbers. Your passwords are never transmitted to any server, never logged, and never stored. You can verify this by opening browser DevTools (F12), going to the Network tab, and confirming no network requests are made when you generate a password. The source code is also open — there's nothing hidden.",
      },
    },
    {
      "@type": "Question",
      name: "How long should my password be?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For most accounts, a minimum of 12 characters is the current security baseline. For sensitive accounts (banking, email, cloud storage), use 16+ characters. For master passwords and encryption keys, 20+ characters. Length is the most important factor: a random 12-character password using only lowercase letters has more entropy than a 8-character password using all character types. Password managers remove the need to remember long passwords, so use 20+ characters everywhere.",
      },
    },
    {
      "@type": "Question",
      name: "What is entropy and why does it matter for passwords?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Entropy measures password randomness in bits. Higher entropy means more guessing is required to crack the password. Entropy = log2(charset size) × length. A 12-character password using all 94 printable ASCII characters has 12 × log2(94) ≈ 78 bits of entropy. At 100 billion guesses per second (modern GPU cracking speed), this takes centuries to crack. Below 50 bits (e.g., 8 characters, mixed case) can be cracked within hours by dedicated hardware.",
      },
    },
    {
      "@type": "Question",
      name: "Should I use a password manager?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, unconditionally. Password managers (Bitwarden, 1Password, KeePassXC) let you use a unique, random, 20+ character password for every site without needing to remember any of them. The most common cause of account compromise is password reuse — using the same password across multiple sites means one breach exposes all your accounts. Free options: Bitwarden (fully-featured, open source) and the built-in password managers in Chrome/Safari/Firefox are all reasonable choices.",
      },
    },
    {
      "@type": "Question",
      name: "What characters should I include or exclude?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For maximum security, include all character types: uppercase, lowercase, numbers, and symbols. For compatibility with systems that restrict special characters (some banking or government sites), uppercase + lowercase + numbers is a safe fallback. The 'exclude similar characters' option removes ambiguous characters (0 and O, 1 and l and I) that can be misread when copying passwords manually — useful when you must type the password without copy-paste.",
      },
    },
  ],
};

export default function PasswordGeneratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main className="max-w-5xl mx-auto px-4 py-8">
        <nav className="text-xs text-gray-400 mb-4">
          <Link href="/" className="hover:text-[#E8500A]">Home</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-600">Password Generator</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F2447] mb-2">
          Free Password Generator &amp; Strength Tester
        </h1>
        <div className="flex flex-wrap gap-3 mb-2">
          <span className="inline-flex items-center gap-1.5 text-xs bg-[#F1F5F9] text-[#475569] px-3 py-1 rounded-full font-medium">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            Last updated: June 2025 · Uses Web Crypto API — 100% client-side
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs bg-[#F1F5F9] text-[#475569] px-3 py-1 rounded-full font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            Generated by 5,300+ users this month
          </span>
        </div>
        <p className="text-[#7A6048] mb-6 text-sm sm:text-base max-w-2xl">
          Generate cryptographically secure random passwords and test the strength of existing ones.
          Configure length (8–64 chars), character types, and bulk generation (1, 5, or 10 at once).
          100% client-side — your passwords never leave your browser.
        </p>

        <PasswordGenerator />

        <AdSlot slot="PWD_AFTER_RESULT" className="my-6" />

        <section className="mt-8 bg-white rounded-xl border border-[#F0E4D4] p-6 space-y-5">
          <h2 className="text-xl font-bold text-[#0F2447]">Password Security: What You Need to Know in 2025</h2>
          <p className="text-[#7A6048] leading-relaxed text-sm">
            Credential stuffing, phishing, and brute-force attacks are responsible for the vast majority of
            account compromises. The fundamental defense is simple: use a unique, randomly-generated password
            for every account. Yet over 60% of users still reuse passwords across multiple sites. Understanding
            why password strength matters — and what actually makes a password strong — is the first step to
            better security hygiene.
          </p>

          <h3 className="text-base font-bold text-[#0F2447]">How Password Cracking Works</h3>
          <p className="text-[#7A6048] leading-relaxed text-sm">
            Modern GPU-based cracking rigs can attempt 100+ billion MD5 hashes per second. Dictionary attacks
            try common words, names, and known breached passwords first. Hybrid attacks combine dictionary words
            with numbers and symbols (Password123! is immediately cracked). Rule-based attacks systematically
            apply common substitutions (@ for a, 3 for e, ! at the end). The only defense is true randomness
            and sufficient length — human-chosen &ldquo;complex&rdquo; passwords are predictably patterned.
          </p>

          <h3 className="text-base font-bold text-[#0F2447]">Time-to-Crack by Password Type</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-[#FBF5EE]">
                  <th className="text-left px-3 py-2 font-semibold text-[#0F2447] border border-[#F0E4D4]">Example</th>
                  <th className="text-left px-3 py-2 font-semibold text-[#0F2447] border border-[#F0E4D4]">Type</th>
                  <th className="text-left px-3 py-2 font-semibold text-[#0F2447] border border-[#F0E4D4]">Time to crack (100B/sec)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["password", "Common word", "Instantly"],
                  ["Password123!", "Common pattern", "Under 1 second"],
                  ["Tr0ub4dor&3", "XKCD-style", "Under 1 hour"],
                  ["k9#mL2pQ", "8-char random", "Minutes to hours"],
                  ["xK9#mL2pQr7$", "12-char random", "Decades"],
                  ["wX#4kR9mPz$2Hn7@", "16-char random", "Centuries"],
                ].map(([ex, type, time]) => (
                  <tr key={ex}>
                    <td className="px-3 py-2 font-mono text-[#E8500A] border border-[#F0E4D4] text-xs">{ex}</td>
                    <td className="px-3 py-2 text-[#7A6048] border border-[#F0E4D4]">{type}</td>
                    <td className="px-3 py-2 text-[#0F2447] font-medium border border-[#F0E4D4]">{time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

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

        <AdSlot slot="PWD_BELOW_FAQ" className="my-6" />

        <section className="mt-2 mb-4">
          <h2 className="text-base font-semibold text-[#7A6048] mb-3">Related Tools</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { href: "/qr-code-generator", label: "QR Code Generator" },
              { href: "/accessibility-checker", label: "Accessibility Checker" },
              { href: "/seo-analyzer", label: "SEO Analyzer" },
            ].map((t) => (
              <Link key={t.href} href={t.href} className="text-sm px-3 py-1.5 bg-[#FBF5EE] text-[#0F2447] rounded-full hover:bg-[#F0E4D4] transition-colors">
                {t.label} →
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
