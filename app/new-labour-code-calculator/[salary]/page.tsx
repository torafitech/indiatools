import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NewLabourCodeCalculator } from "@/components/tools/NewLabourCodeCalculator";
import { AdSlot } from "@/components/layout/AdSlot";
import { labourCodeVariants } from "@/lib/programmatic/labour-code-variants";
import { IndiaBadge } from "@/components/ui/IndiaBadge";
import { salaryLPAContent } from "@/lib/content/salary-lpa-content";
import { formatINR } from "@/lib/utils/format";
import { getCurrentYear } from "@/lib/currentFY";

const year = getCurrentYear();

interface Props {
  params: Promise<{ salary: string }>;
}

export async function generateStaticParams() {
  return labourCodeVariants.map((v) => ({ salary: v.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { salary } = await params;
  const variant = labourCodeVariants.find((v) => v.slug === salary);
  if (!variant) return {};
  const lpa = variant.label;
  return {
    title: `New Labour Code Impact on ${lpa} Salary — 50% Basic Rule Calculator`,
    description: `How does the new Labour Code affect a ${lpa} CTC salary? See PF, gratuity, and monthly take-home changes under the 50% basic wage rule. Updated Nov 2025.`,
    alternates: { canonical: `https://www.utilspot.app/new-labour-code-calculator/${salary}` },
  };
}

export default async function LabourCodeVariantPage({ params }: Props) {
  const { salary } = await params;
  const variant = labourCodeVariants.find((v) => v.slug === salary);
  if (!variant) notFound();

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <nav className="text-xs text-gray-400 mb-4">
        <Link href="/" className="hover:text-[#E8500A]">Home</Link>
        <span className="mx-2">›</span>
        <Link href="/new-labour-code-calculator" className="hover:text-[#E8500A]">New Labour Code Calculator</Link>
        <span className="mx-2">›</span>
        <span className="text-gray-600">{variant.label}</span>
      </nav>

      <IndiaBadge note="New Labour Code (Nov 2025) · 50% basic wage rule" />

      <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F2447] mb-2">
        New Labour Code Impact on {variant.label} Salary
      </h1>
      <p className="text-gray-500 mb-6 text-sm">
        Pre-filled for {variant.label} CTC. Adjust sliders to match your exact salary structure.
      </p>

      <NewLabourCodeCalculator defaultCTC={variant.ctc} defaultBasicPct={40} />

      <AdSlot slot="7779500788" className="my-6" />

      {/* Content section */}
      {(() => {
        const monthlyCtc = variant.ctc / 12;
        const basicAt50 = Math.round(monthlyCtc * 0.50);
        const newPF = Math.round(basicAt50 * 0.12);
        const currentPF = Math.round(monthlyCtc * 0.40 * 0.12);
        const pfDiff = newPF - currentPF;
        const d = salaryLPAContent[salary];
        return (
          <section className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              New Labour Code Impact at {variant.label} — {year}
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Under the New Labour Code, basic salary must be at least 50% of CTC. At{" "}
              {variant.label}, this means a minimum basic of{" "}
              <strong className="text-gray-800">{formatINR(basicAt50)}/month</strong>. If your
              current basic is below this threshold, your employer must restructure your salary
              components — typically by reducing allowances like HRA, conveyance, or special
              allowance to accommodate the higher basic.
            </p>

            <h3 className="text-base font-semibold text-gray-800 mb-2">How This Changes Your PF</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Higher basic means higher EPF contribution. At 50% basic on {variant.label}, your
              employee PF contribution rises to{" "}
              <strong className="text-gray-800">{formatINR(newPF)}/month</strong> vs the current{" "}
              {formatINR(currentPF)}/month (typical 40% basic structure) — a difference of{" "}
              <strong className="text-gray-800">{formatINR(pfDiff)}/month</strong> in take-home.
              Annually, that is ₹{(pfDiff * 12).toLocaleString("en-IN")} less in hand but more in
              your EPF corpus, which earns 8.25% tax-free interest.
            </p>

            <h3 className="text-base font-semibold text-gray-800 mb-2">Gratuity Impact</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Gratuity is calculated on basic + DA. With higher basic under the new code, your
              gratuity entitlement after 5 years increases proportionally. At {formatINR(basicAt50)}/month
              basic, the gratuity after 5 years is approximately{" "}
              {formatINR(Math.round(basicAt50 * 15 / 26 * 5))} (formula: 15 days × years / 26).
              The new code also extends gratuity eligibility to fixed-term contract employees after
              just 1 year of service.
            </p>

            {d && (
              <>
                <h3 className="text-base font-semibold text-gray-800 mb-2">
                  Tax Context at {variant.label}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {d.taxTip} With higher PF deductions reducing take-home, optimising your tax
                  regime becomes more important — every rupee saved in tax offsets the reduced
                  in-hand from the higher PF contribution.
                </p>
              </>
            )}
          </section>
        );
      })()}

      <section className="mt-4 mb-4">
        <h2 className="text-sm font-semibold text-gray-600 mb-3">Other Salary Variants</h2>
        <div className="flex flex-wrap gap-2">
          {labourCodeVariants.filter((v) => v.slug !== salary).map((v) => (
            <Link key={v.slug} href={`/new-labour-code-calculator/${v.slug}`}
              className="text-xs px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full hover:bg-[#F0F4FF] hover:text-[#E8500A] transition-colors">
              {v.label} →
            </Link>
          ))}
          <Link href="/new-labour-code-calculator"
            className="text-xs px-3 py-1.5 bg-[#0F2447] text-white rounded-full hover:bg-[#1A3A5C] transition-colors">
            Custom Calculator
          </Link>
        </div>
      </section>

      <section className="mt-4 mb-4">
        <h2 className="text-base font-semibold text-gray-700 mb-3">Related Tools</h2>
        <div className="flex flex-wrap gap-2">
          {[
            { href: "/gratuity-calculator",              label: "Gratuity Calculator" },
            { href: "/pf-calculator",                    label: "PF Corpus Calculator" },
            { href: "/full-final-settlement-calculator", label: "F&F Settlement" },
            { href: "/salary-calculator",                label: "CTC Salary Calculator" },
          ].map((t) => (
            <Link key={t.href} href={t.href}
              className="text-sm px-3 py-1.5 bg-[#F0F4FF] text-[#0F2447] rounded-full hover:bg-[#E8500A] hover:text-white transition-colors">
              {t.label} →
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
