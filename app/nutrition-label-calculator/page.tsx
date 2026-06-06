import type { Metadata } from "next";
import Link from "next/link";
import { NutritionLabelCalculator } from "@/components/tools/NutritionLabelCalculator";
import { AdSlot } from "@/components/layout/AdSlot";
import { IndiaBadge } from "@/components/ui/IndiaBadge";

export const metadata: Metadata = {
  title: "FSSAI Nutrition Label Calculator — Free Indian Food Label Generator",
  description:
    "Create FSSAI-compliant nutrition labels for Indian food products. Add ingredients from our database, set serving size, and generate a printable nutrition fact panel.",
  keywords: [
    "FSSAI nutrition label calculator",
    "nutrition label generator India",
    "food label calculator India",
    "nutrition facts calculator",
    "FSSAI label format",
    "Indian food nutrition calculator",
    "calories calculator Indian food",
    "nutrition information label",
    "food product label generator",
    "FSSAI food label free",
  ],
  openGraph: {
    title: "FSSAI Nutrition Label Calculator — Free Indian Food Label Generator",
    description:
      "Build FSSAI-compliant nutrition labels for Indian food products. 40+ Indian ingredients. Set serving size. Print-ready label.",
    url: "https://www.utilspot.app/nutrition-label-calculator",
    siteName: "UtilSpot",
  },
  alternates: { canonical: "https://www.utilspot.app/nutrition-label-calculator" },
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "FSSAI Nutrition Label Calculator",
  description: "Create FSSAI-compliant nutrition information labels for Indian food businesses. Recipe builder with 40+ common Indian ingredients. Print-ready output.",
  url: "https://www.utilspot.app/nutrition-label-calculator",
  applicationCategory: "HealthApplication",
  operatingSystem: "All",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is FSSAI and is nutrition labelling mandatory in India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "FSSAI (Food Safety and Standards Authority of India) is the regulatory body governing food safety in India under the Ministry of Health and Family Welfare. Under FSSAI Food Safety and Standards (Labelling and Display) Regulations 2020, nutrition labelling is mandatory for all packaged food products sold in India. The label must display energy (kcal), protein, carbohydrates (total sugars), total fat, saturated fat, trans fat, and sodium per 100g/100ml and per serving.",
      },
    },
    {
      "@type": "Question",
      name: "What nutrients must a FSSAI nutrition label include?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "FSSAI mandatory declaration includes: energy in kcal, protein in grams, carbohydrates in grams (with total sugars listed separately), total fat in grams (with saturated fat and trans fat listed separately), and sodium in milligrams. These must be stated both per 100g/100ml and per serving. Additional voluntary declarations include dietary fiber, vitamins, and minerals. The label must also state the number of servings per package.",
      },
    },
    {
      "@type": "Question",
      name: "How do I calculate nutrition values for a recipe?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "To calculate nutrition per serving: (1) List every ingredient and its quantity in grams. (2) Look up the nutrition values per 100g for each ingredient from a reliable database. (3) Scale each ingredient's values to the actual quantity used. (4) Sum all ingredient contributions for each nutrient to get the recipe total. (5) Divide by the number of servings to get per-serving values. This calculator does all of these steps automatically — just select ingredients and enter quantities.",
      },
    },
    {
      "@type": "Question",
      name: "How accurate are the nutrition values in this calculator?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Values are based on standard Indian food composition databases and USDA data for common ingredients. They represent averages — actual values can vary based on variety, growing conditions, cooking method, and water content. For regulatory compliance, you should verify critical values with an accredited NABL-certified laboratory, especially for commercial products. This tool is suitable for estimation, recipe development, and small-scale food businesses getting started with labelling.",
      },
    },
    {
      "@type": "Question",
      name: "What is the serving size I should use on my label?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "FSSAI requires serving sizes to reflect the amount typically consumed at one time. For reference, FSSAI has published Reference Amounts Customarily Consumed (RACC) for many food categories. Biscuits/cookies: 30g. Bread: 30g (1 slice). Breakfast cereals: 30–40g. Chips/namkeen: 30g. Chocolate: 40g. Ice cream: 65ml. Beverages: 250ml. Use a realistic serving size, not an artificially small one designed to minimise the appearance of calories — FSSAI can penalise misleading labelling.",
      },
    },
  ],
};


const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.utilspot.app" },
    { "@type": "ListItem", position: 2, name: "FSSAI Nutrition Label Calculator", item: "https://www.utilspot.app/nutrition-label-calculator" },
  ],
};
export default function NutritionLabelCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main className="max-w-5xl mx-auto px-4 py-8">
        <nav className="text-xs text-gray-400 mb-4">
          <Link href="/" className="hover:text-[#E8500A]">Home</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-600">Nutrition Label Calculator</span>
        </nav>

        <IndiaBadge note="FSSAI-compliant — for Indian food businesses" />
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F2447] mb-2">
          FSSAI Nutrition Label Calculator
        </h1>
        <div className="flex flex-wrap gap-3 mb-2">
          <span className="inline-flex items-center gap-1.5 text-xs bg-[#F1F5F9] text-[#475569] px-3 py-1 rounded-full font-medium">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            Last updated: June 2026 · FSSAI 2020 Labelling Regulations compliant
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs bg-[#F1F5F9] text-[#475569] px-3 py-1 rounded-full font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            Used by 1,400+ food businesses this month
          </span>
        </div>
        <p className="text-[#7A6048] mb-6 text-sm sm:text-base max-w-2xl">
          Build FSSAI-compliant nutrition information labels for Indian food products. Add ingredients from
          our database of 40+ common Indian ingredients, set your serving size, and generate a print-ready
          nutrition fact panel. Free, no signup.
        </p>

        <NutritionLabelCalculator />

        <AdSlot slot="NUTRITION_AFTER_RESULT" className="my-6" />

        <section className="mt-8 bg-white rounded-xl border border-[#F0E4D4] p-6 space-y-5">
          <h2 className="text-xl font-bold text-[#0F2447]">FSSAI Food Labelling: What Indian Food Businesses Need to Know</h2>
          <p className="text-[#7A6048] leading-relaxed text-sm">
            Whether you&apos;re a home baker selling on Swiggy Instamart, a cloud kitchen expanding to retail, or
            an established food manufacturer updating your packaging, FSSAI nutrition labelling is no longer
            optional. The 2020 labelling regulations brought India&apos;s food labelling standards closer to
            international norms and increased enforcement significantly.
          </p>
          <h3 className="text-base font-bold text-[#0F2447]">Key FSSAI Label Requirements</h3>
          <ul className="list-disc pl-5 space-y-2 text-[#7A6048] text-sm">
            <li><strong className="text-[#0F2447]">Minimum font size:</strong> Nutrition information must be in a minimum 1mm font for packages under 100cm² and 1.5mm for larger packages. Unreadable fine print is a compliance failure.</li>
            <li><strong className="text-[#0F2447]">Per 100g AND per serving:</strong> Both columns are mandatory. Declaring only per serving (a common error) is non-compliant.</li>
            <li><strong className="text-[#0F2447]">% Daily Values:</strong> FSSAI uses 2000 kcal as the reference diet. Daily values are: fat 78g, carbohydrates 300g, protein 50g, fiber 25g, sodium 2000mg.</li>
            <li><strong className="text-[#0F2447]">High fat, sugar, salt (HFSS) warning:</strong> Products exceeding FSSAI thresholds for total fat, saturated fat, trans fat, added sugar, or sodium must display a red warning label. Thresholds are category-specific.</li>
          </ul>
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

        <AdSlot slot="NUTRITION_BELOW_FAQ" className="my-6" />

        <section className="mt-2 mb-4">
          <h2 className="text-base font-semibold text-[#7A6048] mb-3">Related Tools</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { href: "/tdee-calculator", label: "TDEE Calculator" },
              { href: "/invoice-generator", label: "Invoice Generator" },
              { href: "/income-tax-calculator", label: "Income Tax Calculator" },
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
