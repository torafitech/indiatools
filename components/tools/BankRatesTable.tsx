"use client";

import Link from "next/link";
import { BANK_RATES, RBI_REPO_RATE_LAST_UPDATED, getRateDisplay, type LoanRate } from "@/data/bank-rates";

const CATEGORY_LABELS: Record<string, string> = {
  PSU: "Public Sector Banks",
  Private: "Private Banks",
  HFC: "Housing Finance & NBFCs",
};

function loanLabel(prefix: string, loan: LoanRate | undefined, bankName: string) {
  const display = getRateDisplay(loan, bankName);
  return display ? `${prefix} ${display.shortLabel}` : prefix;
}

export function BankRatesTable() {
  return (
    <section className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-baseline justify-between flex-wrap gap-2 mb-1">
        <h2 className="text-xl font-bold text-gray-900">EMI Calculator by Bank</h2>
        <span className="text-xs text-gray-400">Repo rate last updated: {RBI_REPO_RATE_LAST_UPDATED}</span>
      </div>
      <p className="text-gray-500 text-sm mb-1">
        Pre-filled calculators with each bank&apos;s current interest rate. Pick your bank and loan type.
      </p>
      <p className="text-xs text-gray-400 mb-5">
        Rates are computed from the RBI repo rate plus each bank&apos;s published spread and refreshed
        whenever the repo rate changes. Actual rate depends on your credit score — confirm with the
        lender before applying.
      </p>

      {(["PSU", "Private", "HFC"] as const).map((cat) => {
        const banks = BANK_RATES.filter((b) => b.category === cat);
        if (banks.length === 0) return null;
        return (
          <div key={cat} className="mb-6 last:mb-0">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">{CATEGORY_LABELS[cat]}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {banks.map((bank) => (
                <div key={bank.slug} className="border border-gray-200 rounded-lg p-3 hover:border-[#CBD5EF] transition-colors">
                  <p className="font-semibold text-gray-900 text-sm mb-2">{bank.name}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {bank.homeLoan !== undefined && (
                      <Link href={`/emi-calculator/${bank.slug}-home-loan`}
                        className="text-xs px-2 py-1 bg-[#F0F4FF] text-[#0F2447] rounded-md hover:bg-[#E5EAFF] transition-colors">
                        {loanLabel("Home", bank.homeLoan, bank.name)}
                      </Link>
                    )}
                    {bank.carLoan !== undefined && (
                      <Link href={`/emi-calculator/${bank.slug}-car-loan`}
                        className="text-xs px-2 py-1 bg-[#F0F4FF] text-[#0F2447] rounded-md hover:bg-[#E5EAFF] transition-colors">
                        {loanLabel("Car", bank.carLoan, bank.name)}
                      </Link>
                    )}
                    {bank.personalLoan !== undefined && (
                      <Link href={`/emi-calculator/${bank.slug}-personal-loan`}
                        className="text-xs px-2 py-1 bg-[#F0F4FF] text-[#0F2447] rounded-md hover:bg-[#E5EAFF] transition-colors">
                        {loanLabel("Personal", bank.personalLoan, bank.name)}
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      <div className="mt-2 pt-4 border-t border-gray-100">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">By Loan Amount</h3>
        <div className="flex flex-wrap gap-2">
          {[
            ["20-lakh-home-loan", "₹20 Lakh"],
            ["30-lakh-home-loan", "₹30 Lakh"],
            ["40-lakh-home-loan", "₹40 Lakh"],
            ["50-lakh-home-loan", "₹50 Lakh"],
            ["75-lakh-home-loan", "₹75 Lakh"],
            ["1-crore-home-loan", "₹1 Crore"],
          ].map(([slug, label]) => (
            <Link key={slug} href={`/emi-calculator/${slug}`}
              className="text-xs px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full hover:bg-[#F0F4FF] hover:text-[#E8500A] transition-colors">
              {label} Home Loan
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
