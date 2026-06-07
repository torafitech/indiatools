"use client";

import dynamic from "next/dynamic";

const BankRatesTable = dynamic(
  () => import("@/components/tools/BankRatesTable").then((m) => ({ default: m.BankRatesTable })),
  {
    ssr: false,
    loading: () => (
      <section className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
        <div className="h-6 w-48 bg-gray-100 rounded animate-pulse mb-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="h-20 bg-gray-100 rounded-lg animate-pulse" />
          ))}
        </div>
      </section>
    ),
  }
);

export function BankRatesTableLazy() {
  return <BankRatesTable />;
}
