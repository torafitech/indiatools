import type { Metadata } from "next";
import Link from "next/link";
import { TDEECalculator } from "@/components/tools/TDEECalculator";
import { AdSlot } from "@/components/layout/AdSlot";

export const metadata: Metadata = {
  title: "TDEE Calculator — Calculate Total Daily Energy Expenditure & Macros Free",
  description:
    "Calculate your TDEE, BMR, and daily macro targets for weight loss, muscle gain, or maintenance. Free TDEE calculator using Mifflin-St Jeor equation.",
  keywords: ["TDEE calculator", "BMR calculator", "calorie calculator", "macro calculator", "daily calorie needs India"],
  openGraph: {
    title: "TDEE Calculator — Find Your Daily Calorie & Macro Targets",
    description: "Free TDEE calculator. Get your BMR, TDEE, and daily protein/carbs/fat targets based on your goal.",
    url: "https://indiatools.in/tdee-calculator",
    siteName: "IndiaTools",
  },
  alternates: { canonical: "https://indiatools.in/tdee-calculator" },
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "TDEE Calculator",
  description: "Free TDEE and BMR calculator with macro targets for weight loss, maintenance, and muscle gain.",
  url: "https://indiatools.in/tdee-calculator",
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
      name: "What is TDEE?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "TDEE stands for Total Daily Energy Expenditure — the total number of calories your body burns in a day, including all physical activity. It is calculated by multiplying your BMR (Basal Metabolic Rate) by an activity multiplier. Your TDEE is the number of calories you need to eat to maintain your current weight.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between BMR and TDEE?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "BMR (Basal Metabolic Rate) is the number of calories your body burns at complete rest — just to keep your organs functioning. TDEE includes BMR plus all calories burned through daily activities and exercise. For a sedentary person, TDEE is approximately 1.2× BMR. For a very active person, it can be 1.7–1.9× BMR.",
      },
    },
    {
      "@type": "Question",
      name: "How many calories should I eat to lose weight?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "To lose weight, eat in a caloric deficit — less than your TDEE. A deficit of 500 calories/day leads to approximately 0.5 kg of fat loss per week (since 1 kg of fat ≈ 7,700 calories). Do not go below 1,200 calories/day for women or 1,500 for men. Our calculator automatically applies a 500 kcal deficit for the weight loss goal.",
      },
    },
    {
      "@type": "Question",
      name: "What are macros and why do they matter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Macros (macronutrients) are protein, carbohydrates, and fat — the three main sources of calories. Protein provides 4 kcal/g, carbs 4 kcal/g, and fat 9 kcal/g. The macro split matters because: protein preserves muscle mass (especially important in a deficit), fat is essential for hormones, and carbs fuel exercise and brain function. Our calculator uses a 25% protein / 40% carb / 30% fat split for most goals.",
      },
    },
    {
      "@type": "Question",
      name: "Which BMR formula does this calculator use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This calculator uses the Mifflin-St Jeor equation, which is considered the most accurate for the general population. The formula is: Men: (10 × weight in kg) + (6.25 × height in cm) − (5 × age) + 5. Women: (10 × weight in kg) + (6.25 × height in cm) − (5 × age) − 161. It is more accurate than the older Harris-Benedict equation, especially for people who are overweight.",
      },
    },
    {
      "@type": "Question",
      name: "How accurate is the TDEE calculator?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "TDEE calculators give an estimate, not an exact number. The Mifflin-St Jeor equation is accurate within ±10% for most people. Use the result as a starting point: track your weight for 2–3 weeks while eating at the suggested calories, then adjust up or down by 100–200 calories based on real results. Individual metabolism, muscle mass, and genetics cause variation.",
      },
    },
  ],
};

export default function TDEECalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <nav className="text-xs text-gray-400 mb-4">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-600">TDEE Calculator</span>
        </nav>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          TDEE Calculator — Find Your Daily Calorie &amp; Macro Targets
        </h1>
        <p className="text-gray-500 mb-6 text-sm sm:text-base">
          Enter your stats below to calculate your BMR, TDEE, and daily macro targets for your goal.
          Uses the Mifflin-St Jeor equation — the most accurate formula for the general population.
        </p>

        <TDEECalculator />

        <AdSlot slot="AFTER_RESULT_SLOT" className="my-6" />

        <section className="mt-8 bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Understanding Your TDEE Results</h2>

          <p className="text-gray-600 leading-relaxed">
            Your <strong>TDEE (Total Daily Energy Expenditure)</strong> is the most important number for
            managing body weight. It represents the total calories your body burns in 24 hours — including
            your resting metabolism, digestion (thermic effect of food), and all physical activity.
          </p>

          <h3 className="text-lg font-semibold text-gray-800">How to Use Your TDEE</h3>
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { goal: "Lose Weight", action: "Eat 300–500 kcal below TDEE", tip: "Aim for 0.5–1% bodyweight lost per week. Larger deficits cause muscle loss." },
              { goal: "Maintain Weight", action: "Eat at your TDEE", tip: "Track for 2–3 weeks and adjust ±100 kcal based on scale movement." },
              { goal: "Build Muscle", action: "Eat 200–300 kcal above TDEE", tip: "Small surplus minimises fat gain. Beginners can build muscle even in a slight deficit." },
            ].map((item) => (
              <div key={item.goal} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <p className="font-semibold text-gray-900 text-sm mb-1">{item.goal}</p>
                <p className="text-blue-600 text-sm font-medium mb-2">{item.action}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{item.tip}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold text-gray-800">Activity Level Guide</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-3 py-2 font-semibold text-gray-600">Level</th>
                  <th className="text-left px-3 py-2 font-semibold text-gray-600">Description</th>
                  <th className="text-right px-3 py-2 font-semibold text-gray-600">Multiplier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-600">
                {[
                  ["Sedentary", "Office job, little to no exercise", "× 1.2"],
                  ["Lightly Active", "Walking, light gym 1–3 days/week", "× 1.375"],
                  ["Moderately Active", "Gym 3–5 days/week", "× 1.55"],
                  ["Very Active", "Hard training 6–7 days/week", "× 1.725"],
                  ["Extra Active", "Physical job + daily training / athlete", "× 1.9"],
                ].map(([level, desc, mult]) => (
                  <tr key={level} className="hover:bg-gray-50">
                    <td className="px-3 py-2 font-medium">{level}</td>
                    <td className="px-3 py-2 text-gray-500">{desc}</td>
                    <td className="px-3 py-2 text-right font-bold text-blue-600">{mult}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-gray-600 leading-relaxed text-sm">
            Most Indians working desk jobs fall into <strong>Sedentary</strong> or <strong>Lightly Active</strong>.
            If you go to the gym 3–4 times a week but sit at a desk otherwise, choose <strong>Moderately Active</strong>.
            Do not overestimate your activity level — this is the most common reason people don&apos;t lose weight
            despite &quot;eating right.&quot;
          </p>
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
              { href: "/word-counter", label: "Word Counter" },
              { href: "/emi-calculator", label: "EMI Calculator" },
              { href: "/sip-calculator", label: "SIP Calculator" },
            ].map((t) => (
              <Link key={t.href} href={t.href}
                className="text-sm px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors">
                {t.label} →
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
