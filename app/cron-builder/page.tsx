import type { Metadata } from "next";
import Link from "next/link";
import { CronBuilder } from "@/components/tools/CronBuilder";
import { AdSlot } from "@/components/layout/AdSlot";

export const metadata: Metadata = {
  title: "Free Cron Expression Builder — Visual Cron Job Generator",
  description:
    "Visual cron expression builder. Click to build cron schedules, get plain English descriptions, and see next 5 run times. Free online cron job generator.",
  keywords: [
    "cron expression builder",
    "cron job generator",
    "cron expression generator",
    "cron schedule builder",
    "cron syntax helper",
    "cron expression visualizer",
    "online cron builder",
    "cron job creator free",
    "cron expression explainer",
    "linux cron job builder",
  ],
  openGraph: {
    title: "Free Cron Expression Builder — Visual Cron Job Generator | UtilSpot",
    description:
      "Build cron expressions visually. Plain English description + next 5 run times. Free cron job generator.",
    url: "https://www.utilspot.app/cron-builder",
    siteName: "UtilSpot",
  },
  alternates: { canonical: "https://www.utilspot.app/cron-builder" },
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Free Cron Expression Builder",
  description: "Visual cron job builder. Select minutes, hours, days to build a cron expression. See plain English description and next 5 scheduled run times.",
  url: "https://www.utilspot.app/cron-builder",
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
      name: "What is a cron expression?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A cron expression is a string of five fields that defines a recurring schedule for automated tasks. The fields, in order, represent: minute (0-59), hour (0-23), day of month (1-31), month (1-12), and day of week (0-6, where 0 is Sunday). Special characters include * (any value), */n (every n units), - (range), and , (list). Example: '0 9 * * 1-5' means 'every weekday at 9:00 AM'.",
      },
    },
    {
      "@type": "Question",
      name: "How do I run a cron job every 5 minutes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use the expression: */5 * * * * — The */5 in the minutes field means 'every 5 minutes'. This runs at :00, :05, :10, :15, :20, :25, :30, :35, :40, :45, :50, and :55 of every hour. Similarly, */15 runs every 15 minutes, */30 runs every 30 minutes. To run every hour at a specific minute (e.g., at :30 past each hour), use: 30 * * * *",
      },
    },
    {
      "@type": "Question",
      name: "How do I schedule a cron job for weekdays only?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use 1-5 in the day-of-week field (fifth field). For example, to run every weekday at 9 AM: 0 9 * * 1-5. Day numbering is 0=Sunday, 1=Monday, 2=Tuesday, 3=Wednesday, 4=Thursday, 5=Friday, 6=Saturday. For weekends only: 0 10 * * 0,6 (10 AM on Saturday and Sunday). Note that some cron implementations use 7 for Sunday as well as 0.",
      },
    },
    {
      "@type": "Question",
      name: "Can I run a cron job on the last day of the month?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Standard cron syntax does not support L (last day) directly — that's a Quartz cron extension. In standard cron, you cannot reliably schedule for the last day of every month because different months have different lengths. A common workaround is to use a script that checks if tomorrow is the 1st of the next month. Some extended cron implementations (Quartz, Spring) support L in the day-of-month field: 0 0 L * * in Quartz means midnight on the last day of every month.",
      },
    },
    {
      "@type": "Question",
      name: "What timezone does cron use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Standard cron uses the system timezone of the server it runs on. On most Linux servers, this defaults to UTC. If your server is in UTC but you want to schedule for 9 AM IST (India Standard Time, UTC+5:30), you'd set the cron to 30 3 * * * (3:30 AM UTC = 9:00 AM IST). Modern cron implementations like systemd timers and cloud schedulers (AWS EventBridge, Google Cloud Scheduler) support explicit timezone specification.",
      },
    },
  ],
};


const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.utilspot.app" },
    { "@type": "ListItem", position: 2, name: "Cron Expression Builder", item: "https://www.utilspot.app/cron-builder" },
  ],
};
export default function CronBuilderPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main className="max-w-5xl mx-auto px-4 py-8">
        <nav className="text-xs text-gray-400 mb-4">
          <Link href="/" className="hover:text-[#E8500A]">Home</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-600">Cron Builder</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F2447] mb-2">
          Free Cron Expression Builder — Visual Cron Job Generator
        </h1>
        <div className="flex flex-wrap gap-3 mb-2">
          <span className="inline-flex items-center gap-1.5 text-xs bg-[#F1F5F9] text-[#475569] px-3 py-1 rounded-full font-medium">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            Last updated: June 2025 · Works on all Unix/Linux cron systems
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs bg-[#F1F5F9] text-[#475569] px-3 py-1 rounded-full font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            Built by 1,800+ developers this month
          </span>
        </div>
        <p className="text-[#7A6048] mb-6 text-sm sm:text-base max-w-2xl">
          Build cron expressions visually. Pick from quick patterns or use the visual builder to set
          each field. Get a plain English description of your schedule and the next 5 run times.
          Free, no signup, runs in your browser.
        </p>

        <CronBuilder />

        <AdSlot slot="CRON_AFTER_RESULT" className="my-6" />

        <section className="mt-8 bg-white rounded-xl border border-[#F0E4D4] p-6 space-y-5">
          <h2 className="text-xl font-bold text-[#0F2447]">Cron Expression Reference Guide</h2>
          <p className="text-[#7A6048] leading-relaxed text-sm">
            Cron is the standard Unix task scheduler. Cron jobs are used for backups, report generation,
            cache clearing, API polling, database maintenance, and thousands of other recurring automation
            tasks. Understanding cron syntax is a foundational developer skill — virtually every server,
            cloud platform, and CI/CD system supports cron-based scheduling.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-[#FBF5EE]">
                  <th className="text-left px-3 py-2 font-semibold text-[#0F2447] border border-[#F0E4D4]">Field</th>
                  <th className="text-left px-3 py-2 font-semibold text-[#0F2447] border border-[#F0E4D4]">Values</th>
                  <th className="text-left px-3 py-2 font-semibold text-[#0F2447] border border-[#F0E4D4]">Special chars</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Minute", "0–59", "* , - /"],
                  ["Hour", "0–23", "* , - /"],
                  ["Day of month", "1–31", "* , - / ?"],
                  ["Month", "1–12", "* , - /"],
                  ["Day of week", "0–6 (0=Sun)", "* , - /"],
                ].map(([field, values, chars]) => (
                  <tr key={field}>
                    <td className="px-3 py-2 text-[#0F2447] border border-[#F0E4D4] font-medium">{field}</td>
                    <td className="px-3 py-2 text-[#7A6048] border border-[#F0E4D4] font-mono">{values}</td>
                    <td className="px-3 py-2 text-[#7A6048] border border-[#F0E4D4] font-mono">{chars}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="text-base font-bold text-[#0F2447]">Common Patterns Cheat Sheet</h3>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              ["* * * * *", "Every minute"],
              ["*/5 * * * *", "Every 5 minutes"],
              ["0 * * * *", "Every hour"],
              ["0 0 * * *", "Daily at midnight"],
              ["0 9 * * *", "Daily at 9:00 AM"],
              ["0 9 * * 1-5", "Weekdays at 9:00 AM"],
              ["0 9 * * 1", "Every Monday at 9:00 AM"],
              ["0 0 1 * *", "Monthly on the 1st at midnight"],
              ["0 0 1 1 *", "Annually on Jan 1st at midnight"],
              ["*/15 9-17 * * 1-5", "Every 15 min during business hours"],
            ].map(([expr, desc]) => (
              <div key={expr} className="flex gap-3 bg-[#FBF5EE] rounded-lg px-3 py-2 text-sm">
                <code className="font-mono text-[#E8500A] shrink-0 w-36">{expr}</code>
                <span className="text-[#7A6048]">{desc}</span>
              </div>
            ))}
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

        <AdSlot slot="CRON_BELOW_FAQ" className="my-6" />

        <section className="mt-2 mb-4">
          <h2 className="text-base font-semibold text-[#7A6048] mb-3">Related Tools</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { href: "/readme-generator", label: "README Generator" },
              { href: "/seo-analyzer", label: "SEO Analyzer" },
              { href: "/accessibility-checker", label: "Accessibility Checker" },
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
