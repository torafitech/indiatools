import { NextResponse } from "next/server";
import { emiVariants } from "@/lib/programmatic/emi-variants";
import { salaryVariants } from "@/lib/programmatic/salary-variants";
import { constructionVariants } from "@/lib/programmatic/construction-variants";
import { incomeTaxVariants } from "@/lib/programmatic/incometax-variants";
import { labourCodeVariants } from "@/lib/programmatic/labour-code-variants";

export const dynamic = "force-static";

type SitemapEntry = {
  loc: string;
  priority: string;
  changefreq: string;
};

const BASE = "https://www.utilspot.app";
const LASTMOD = "2026-06-06";

const STATIC: SitemapEntry[] = [
  { loc: BASE,                                                   priority: "1.0",  changefreq: "weekly"  },
  { loc: `${BASE}/emi-calculator`,                               priority: "0.9",  changefreq: "monthly" },
  { loc: `${BASE}/income-tax-calculator`,                        priority: "0.9",  changefreq: "monthly" },
  { loc: `${BASE}/sip-calculator`,                               priority: "0.9",  changefreq: "monthly" },
  { loc: `${BASE}/salary-calculator`,                            priority: "0.9",  changefreq: "monthly" },
  { loc: `${BASE}/construction-cost-calculator`,                 priority: "0.8",  changefreq: "monthly" },
  { loc: `${BASE}/equity-calculator`,                            priority: "0.8",  changefreq: "monthly" },
  { loc: `${BASE}/invoice-generator`,                            priority: "0.8",  changefreq: "monthly" },
  { loc: `${BASE}/tdee-calculator`,                              priority: "0.8",  changefreq: "monthly" },
  { loc: `${BASE}/nutrition-label-calculator`,                   priority: "0.8",  changefreq: "monthly" },
  { loc: `${BASE}/word-counter`,                                 priority: "0.8",  changefreq: "monthly" },
  { loc: `${BASE}/qr-code-generator`,                            priority: "0.8",  changefreq: "monthly" },
  { loc: `${BASE}/seo-analyzer`,                                 priority: "0.8",  changefreq: "monthly" },
  { loc: `${BASE}/accessibility-checker`,                        priority: "0.7",  changefreq: "monthly" },
  { loc: `${BASE}/cron-builder`,                                 priority: "0.7",  changefreq: "monthly" },
  { loc: `${BASE}/freelance-rate-calculator`,                    priority: "0.7",  changefreq: "monthly" },
  { loc: `${BASE}/password-generator`,                           priority: "0.7",  changefreq: "monthly" },
  { loc: `${BASE}/new-labour-code-calculator`,                   priority: "0.85", changefreq: "monthly" },
  { loc: `${BASE}/gratuity-calculator`,                          priority: "0.85", changefreq: "monthly" },
  { loc: `${BASE}/pf-calculator`,                                priority: "0.85", changefreq: "monthly" },
  { loc: `${BASE}/full-final-settlement-calculator`,             priority: "0.85", changefreq: "monthly" },
  { loc: `${BASE}/about`,                                        priority: "0.4",  changefreq: "yearly"  },
  { loc: `${BASE}/contact`,                                      priority: "0.4",  changefreq: "yearly"  },
  { loc: `${BASE}/privacy-policy`,                               priority: "0.3",  changefreq: "yearly"  },
  { loc: `${BASE}/terms`,                                        priority: "0.3",  changefreq: "yearly"  },
];

export async function GET() {
  const programmatic: SitemapEntry[] = [
    ...emiVariants.map((v) => ({
      loc: `${BASE}/emi-calculator/${v.slug}`,
      priority: "0.7",
      changefreq: "monthly",
    })),
    ...salaryVariants.map((v) => ({
      loc: `${BASE}/salary-calculator/${v.slug}`,
      priority: "0.7",
      changefreq: "monthly",
    })),
    ...constructionVariants.map((v) => ({
      loc: `${BASE}/construction-cost-calculator/${v.slug}`,
      priority: "0.6",
      changefreq: "monthly",
    })),
    ...incomeTaxVariants.map((v) => ({
      loc: `${BASE}/income-tax-calculator/${v.slug}`,
      priority: "0.7",
      changefreq: "monthly",
    })),
    ...labourCodeVariants.map((v) => ({
      loc: `${BASE}/new-labour-code-calculator/${v.slug}`,
      priority: "0.75",
      changefreq: "monthly",
    })),
  ];

  const all = [...STATIC, ...programmatic];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${all
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${LASTMOD}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
