import type { Metadata } from "next";
import Link from "next/link";
import { ColorPaletteGenerator } from "@/components/tools/ColorPaletteGenerator";
import { AdSlot } from "@/components/layout/AdSlot";

export const metadata: Metadata = {
  title: "AI Color Palette Generator — Brand Colors from Description | UtilSpot",
  description:
    "Generate a professional 5-color brand palette instantly using AI. Describe your brand and get primary, accent, and background colors — free, no signup.",
  keywords: [
    "color palette generator",
    "AI color palette generator",
    "brand color palette",
    "color scheme generator",
    "brand colors from description",
    "free color palette tool",
    "complementary colors generator",
    "color theory generator",
    "hex color palette",
    "tailwind color palette",
  ],
  openGraph: {
    title: "AI Color Palette Generator — Brand Colors from Description | UtilSpot",
    description:
      "Generate a professional 5-color brand palette instantly using AI. Describe your brand and get primary, accent, and background colors — free, no signup.",
    url: "https://www.utilspot.app/color-palette-generator",
    siteName: "UtilSpot",
  },
  alternates: { canonical: "https://www.utilspot.app/color-palette-generator" },
  robots: { index: false, follow: false },
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "AI Color Palette Generator",
  description:
    "Generate professional 5-color brand palettes using Claude AI or classic color theory modes. Includes CSS variables and Tailwind config export.",
  url: "https://www.utilspot.app/color-palette-generator",
  applicationCategory: "DesignApplication",
  operatingSystem: "All",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How does the AI color palette generator work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The AI mode is powered by Claude (by Anthropic). You describe your brand or project in plain text — the AI understands your industry, target audience, and brand personality to generate a harmonious 5-color palette with labels for each color's intended use (primary, secondary, accent, background, text). No design knowledge needed.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between AI mode and Manual mode?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AI mode lets you describe your brand in words and the AI picks the best colors. Manual mode starts with a base color you choose and applies classic color theory rules — Analogous (nearby hues), Split-Complementary, Triadic, or Monochromatic — to derive a mathematically harmonious palette. Manual mode works entirely in-browser with no API call.",
      },
    },
    {
      "@type": "Question",
      name: "What are Analogous, Triadic, and Monochromatic color schemes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Analogous colors sit adjacent on the color wheel (±30°), creating a calm, cohesive look ideal for wellness or nature brands. Triadic uses three evenly spaced hues (+120° apart), giving vibrant, high-contrast energy great for creative or children's brands. Monochromatic uses a single hue at different lightness levels — clean, minimal, and very professional. Split-Complementary pairs your base with two colors flanking its complement, offering contrast without the tension of full complementary schemes.",
      },
    },
    {
      "@type": "Question",
      name: "Can I export the palette to CSS or Tailwind CSS?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Once a palette is generated, three export buttons appear: CSS Variables (copies :root { --color-*: hex } block), Tailwind Config (copies the colors: {} object for tailwind.config.js), and Hex List (one hex code per line). Click any button and the code is copied to your clipboard instantly.",
      },
    },
    {
      "@type": "Question",
      name: "How do I copy a color's hex code from the palette?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Click any color swatch in the palette. The hex code is copied to your clipboard and a 'Copied!' confirmation appears on the swatch. You can then paste it directly into Figma, VS Code, Canva, or any design tool.",
      },
    },
  ],
};

export default function ColorPaletteGeneratorPage() {
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
        {/* Breadcrumb */}
        <nav className="text-xs text-gray-400 mb-4">
          <Link href="/" className="hover:text-[#E8500A]">
            Home
          </Link>
          <span className="mx-2">›</span>
          <span className="text-gray-600">Color Palette Generator</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F2447] mb-2">
          AI Color Palette Generator — Brand Colors from a Description
        </h1>
        <p className="text-gray-500 mb-6 text-sm sm:text-base">
          Describe your brand and get a professional 5-color palette with CSS variables and Tailwind
          config — powered by Claude AI. Or pick a base color and apply color theory instantly.
        </p>

        <ColorPaletteGenerator />

        <AdSlot slot="COLOR_PALETTE_SLOT" className="my-6" />

        {/* SEO Content */}
        <section className="mt-8 bg-white rounded-xl border border-gray-200 p-6 prose prose-gray max-w-none">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            How to Pick the Right Brand Color Palette
          </h2>

          <p className="text-gray-600 leading-relaxed mb-4">
            Color is not decoration — it is communication. Research consistently shows that color
            increases brand recognition by up to 80% and influences purchasing decisions before a
            single word is read. Choosing the right palette for your brand or product is one of the
            highest-leverage design decisions you can make.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            The 5 Roles Every Brand Palette Needs
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-4">
            <li>
              <strong>Primary:</strong> The dominant brand color that appears on your logo, CTAs, and
              key UI elements. It carries the most weight and sets the emotional tone.
            </li>
            <li>
              <strong>Secondary:</strong> Supports the primary color in layouts, section backgrounds,
              and secondary buttons without competing for attention.
            </li>
            <li>
              <strong>Accent:</strong> A punchy color used sparingly — hover states, badges, tags,
              notification dots. High contrast, high impact.
            </li>
            <li>
              <strong>Background:</strong> Usually a very light or near-neutral shade that gives your
              content room to breathe without feeling sterile.
            </li>
            <li>
              <strong>Text:</strong> A dark, high-contrast color for body text and headings. Pure
              black (#000) is often too harsh — a dark navy or charcoal reads better on screens.
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Color Psychology for Indian Brands
          </h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            Color perception is culturally layered. In Indian contexts, saffron carries cultural and
            spiritual weight — powerful for heritage brands but requires careful use for fintech or
            healthcare. Deep navy signals trust and authority, widely used across banking and
            professional services. Green carries both prosperity (festivals, auspiciousness) and
            environmental connotations — excellent for agri-tech, food, and sustainability brands.
            Red in India reads as energy and celebration rather than warning, making it effective for
            FMCG, food delivery, and entertainment. Understanding these nuances before locking a
            palette saves costly rebrand cycles later.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Color Theory: Harmony Modes Explained
          </h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            The <strong>Manual mode</strong> in this tool applies four classical harmony rules from
            the color wheel. <strong>Analogous</strong> schemes use colors that sit next to each
            other — they feel cohesive and are the safest choice for B2B or wellness brands.{" "}
            <strong>Triadic</strong> schemes use three evenly spaced hues for maximum visual variety
            — great for playful, creative, or children-focused products.{" "}
            <strong>Split-Complementary</strong> gives you contrast without the jarring tension of
            true complementary pairs — a versatile choice for most digital products.{" "}
            <strong>Monochromatic</strong> uses a single hue at varying lightness and saturation
            levels, producing a clean, premium, and highly professional aesthetic favored by luxury
            and minimal brands.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Accessibility: WCAG Contrast Ratios
          </h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            A beautiful palette that fails accessibility tests is a liability. WCAG 2.1 requires a
            contrast ratio of at least <strong>4.5:1</strong> for normal text and{" "}
            <strong>3:1</strong> for large text. Always verify your text color against your
            background color using a contrast checker before finalising. Dark navy on white, or white
            on a deep primary color, typically passes without adjustment. Pastel-on-white combinations
            frequently fail — avoid them for body text.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Using This Tool in Your Workflow
          </h3>
          <ol className="list-decimal pl-5 space-y-2 text-gray-600 mb-4">
            <li>
              Run <strong>AI Generate</strong> with a detailed brand description. Include your
              industry, target emotion, and key differentiator for the most relevant palette.
            </li>
            <li>
              If you already have a brand color locked in, switch to <strong>Manual mode</strong>,
              enter your hex, and explore Analogous or Split-Complementary harmonies.
            </li>
            <li>
              Click any swatch to copy its hex — paste directly into Figma, Sketch, or Canva.
            </li>
            <li>
              Use <strong>CSS Variables</strong> export to add the palette to your web project in
              one paste. Use <strong>Tailwind Config</strong> to extend your Tailwind design system.
            </li>
            <li>
              Test your palette in both light and dark environments before signing off. Projectors
              and low-brightness phone screens can shift perceived color significantly.
            </li>
          </ol>

          <p className="text-gray-600 leading-relaxed">
            Need to design more than colors? Check out our{" "}
            <Link href="/business-name-generator" className="text-[#E8500A] hover:underline">
              AI Business Name Generator
            </Link>{" "}
            to find the right brand name before investing in brand visuals.
          </p>
        </section>

        {/* FAQ */}
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

        {/* Related tools */}
        <section className="mt-2 mb-4">
          <h2 className="text-base font-semibold text-gray-700 mb-3">Related Tools</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { href: "/business-name-generator", label: "Business Name Generator" },
              { href: "/invoice-generator", label: "Invoice Generator" },
              { href: "/qr-code-generator", label: "QR Code Generator" },
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
