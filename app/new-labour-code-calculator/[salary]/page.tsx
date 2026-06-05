import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NewLabourCodeCalculator } from "@/components/tools/NewLabourCodeCalculator";
import { AdSlot } from "@/components/layout/AdSlot";
import { labourCodeVariants } from "@/lib/programmatic/labour-code-variants";
import { IndiaBadge } from "@/components/ui/IndiaBadge";

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

      <AdSlot slot="LABOUR_CODE_VARIANT_RESULT" className="my-6" />

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
