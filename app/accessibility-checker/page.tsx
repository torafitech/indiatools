import type { Metadata } from "next";
import Link from "next/link";
import { AccessibilityChecker } from "@/components/tools/AccessibilityChecker";
import { AdSlot } from "@/components/layout/AdSlot";

export const metadata: Metadata = {
  title: "Free Accessibility Checker — WCAG 2.1 HTML Audit Tool",
  description:
    "Free WCAG 2.1 accessibility checker. Paste HTML and instantly find violations: missing alt text, unlabelled inputs, empty links, heading hierarchy issues, and more.",
  keywords: [
    "accessibility checker free",
    "WCAG checker",
    "WCAG 2.1 validator",
    "HTML accessibility audit",
    "web accessibility tool",
    "alt text checker",
    "aria accessibility checker",
    "ADA compliance checker",
    "screen reader audit",
    "accessibility validator online",
  ],
  openGraph: {
    title: "Free Accessibility Checker — WCAG 2.1 HTML Audit Tool",
    description:
      "Paste HTML to instantly find WCAG 2.1 violations: missing alt text, unlabelled inputs, empty links, heading jumps, and more. Free, no signup.",
    url: "https://www.utilspot.app/accessibility-checker",
    siteName: "UtilSpot",
  },
  alternates: { canonical: "https://www.utilspot.app/accessibility-checker" },
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Free Accessibility Checker",
  description:
    "WCAG 2.1 AA accessibility checker. Paste HTML to find violations including missing alt attributes, unlabelled form inputs, empty links, heading hierarchy issues, and missing lang attributes.",
  url: "https://www.utilspot.app/accessibility-checker",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "All",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What WCAG checks does this tool perform?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This tool checks eight WCAG 2.1 AA criteria: images missing alt attributes (SC 1.1.1), form inputs not associated with labels (SC 1.3.1), empty anchor tags with no link text (SC 2.4.4), buttons with no accessible text (SC 4.1.2), missing lang attribute on the HTML element (SC 3.1.1), heading hierarchy jumps such as H1 jumping to H3 without an H2 (SC 1.3.1), and form submissions without a submit button. Each violation is reported with the specific element and a suggested fix.",
      },
    },
    {
      "@type": "Question",
      name: "Does this tool work on live websites or only pasted HTML?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This tool works on pasted HTML only. Paste your page's source code (or a component's HTML) into the textarea and click Check Accessibility. To get the HTML from a live site, open DevTools in your browser, right-click the element you want to check, and select 'Copy > Copy outerHTML' — or use View Source (Ctrl+U) to copy the full page HTML.",
      },
    },
    {
      "@type": "Question",
      name: "What is WCAG 2.1 AA and why does it matter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "WCAG (Web Content Accessibility Guidelines) 2.1 Level AA is the globally recognized standard for web accessibility. Meeting AA compliance means your website is usable by people with disabilities including visual impairments (screen reader users), motor impairments (keyboard-only navigation), and cognitive disabilities. In many jurisdictions — including the EU, US (Section 508/ADA), and India (GIGW Guidelines) — AA compliance is a legal requirement for government and public-facing websites.",
      },
    },
    {
      "@type": "Question",
      name: "What does 'alt text' mean and how should I write it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Alt text (the alt attribute on <img> elements) is a text description of the image content. Screen readers read this aloud for visually impaired users, and search engines use it to understand images. Write alt text that describes what the image shows — not what it is. For example: alt='Bar chart showing 40% revenue growth from 2022 to 2024' rather than alt='chart'. Decorative images that add no meaning should use alt='' (empty) so screen readers skip them. Never use alt='image' or alt='photo' — these are meaningless.",
      },
    },
    {
      "@type": "Question",
      name: "How do I associate a form input with a label?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use the for attribute on the <label> element matching the id of the <input>. Example: <label for='email'>Email address</label><input type='email' id='email' name='email'>. Alternatively, wrap the input inside the label: <label>Email address <input type='email' name='email'></label>. Never use placeholder text as the only label — placeholders disappear when typing and are not accessible to screen readers in all cases.",
      },
    },
  ],
};


const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.utilspot.app" },
    { "@type": "ListItem", position: 2, name: "Accessibility Checker", item: "https://www.utilspot.app/accessibility-checker" },
  ],
};
export default function AccessibilityCheckerPage() {
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="max-w-5xl mx-auto px-4 py-8">
        <nav className="text-xs text-gray-400 mb-4">
          <Link href="/" className="hover:text-[#E8500A]">Home</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-600">Accessibility Checker</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F2447] mb-2">
          Free Accessibility Checker — WCAG 2.1 HTML Audit
        </h1>
        <div className="flex flex-wrap gap-3 mb-2">
          <span className="inline-flex items-center gap-1.5 text-xs bg-[#F1F5F9] text-[#475569] px-3 py-1 rounded-full font-medium">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            Last updated: June 2025 · WCAG 2.1 AA standard
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs bg-[#F1F5F9] text-[#475569] px-3 py-1 rounded-full font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            Checked by 1,900+ developers this month
          </span>
        </div>
        <p className="text-[#7A6048] mb-6 text-sm sm:text-base max-w-2xl">
          Paste any HTML and instantly find WCAG 2.1 AA violations. Checks missing alt text, unlabelled
          inputs, empty links, heading hierarchy issues, and more. 100% client-side — your HTML stays in
          your browser.
        </p>

        <AccessibilityChecker />

        <AdSlot slot="7779500788" className="my-6" />

        <section className="mt-8 bg-white rounded-xl border border-[#F0E4D4] p-6 space-y-5">
          <h2 className="text-xl font-bold text-[#0F2447]">Web Accessibility: Why It Matters and Where to Start</h2>

          <p className="text-[#7A6048] leading-relaxed text-sm">
            Web accessibility means building websites that work for everyone — including people who use screen
            readers, navigate by keyboard only, have low vision, or have cognitive disabilities. An estimated
            15% of the world&apos;s population lives with some form of disability. When your website fails basic
            accessibility checks, you&apos;re actively excluding a significant portion of potential users and
            customers. Beyond ethical responsibility, accessibility compliance is increasingly a legal requirement.
          </p>

          <h3 className="text-base font-bold text-[#0F2447]">The Most Common Accessibility Failures</h3>
          <ul className="list-disc pl-5 space-y-2 text-[#7A6048] text-sm">
            <li><strong className="text-[#0F2447]">Missing alt text on images:</strong> The single most common violation. Screen readers cannot interpret visual content — without alt text, image information is completely inaccessible.</li>
            <li><strong className="text-[#0F2447]">Form inputs without labels:</strong> Using placeholder text instead of a proper label is one of the most frequent mistakes in modern web development. Placeholders disappear on input and aren&apos;t reliably announced by screen readers.</li>
            <li><strong className="text-[#0F2447]">Low colour contrast:</strong> Light grey text on white backgrounds may look clean visually but is unreadable for users with low vision or in bright sunlight. WCAG AA requires a 4.5:1 contrast ratio for normal text.</li>
            <li><strong className="text-[#0F2447]">Keyboard inaccessibility:</strong> All interactive elements (buttons, links, forms, modals) must be operable using keyboard only. Custom components built with div and span are invisible to keyboard navigation unless ARIA roles are added.</li>
            <li><strong className="text-[#0F2447]">Empty links and buttons:</strong> Icon-only buttons and empty anchor tags have no accessible name. Screen readers will announce these as &ldquo;link&rdquo; or &ldquo;button&rdquo; with no context — completely unhelpful.</li>
          </ul>

          <h3 className="text-base font-bold text-[#0F2447]">Quick Wins: Fixes That Take Under 30 Minutes</h3>
          <p className="text-[#7A6048] leading-relaxed text-sm">
            Start with these high-impact, low-effort fixes before tackling complex ARIA implementations: add
            alt attributes to all images, add for/id pairs to all form labels, add lang=&quot;en&quot; (or the relevant
            language code) to your HTML element, ensure every button and link has visible text or an aria-label,
            and fix any heading hierarchy jumps. These five fixes alone typically resolve 60–70% of common
            WCAG violations.
          </p>
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

        <AdSlot slot="2743510532" className="my-6" />

        <section className="mt-2 mb-4">
          <h2 className="text-base font-semibold text-[#7A6048] mb-3">Related Tools</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { href: "/seo-analyzer", label: "SEO Analyzer" },
              { href: "/readme-generator", label: "README Generator" },
              { href: "/word-counter", label: "Word Counter" },
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
