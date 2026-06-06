import { MetadataRoute } from "next";
import { emiVariants } from "@/lib/programmatic/emi-variants";
import { salaryVariants } from "@/lib/programmatic/salary-variants";
import { constructionVariants } from "@/lib/programmatic/construction-variants";
import { incomeTaxVariants } from "@/lib/programmatic/incometax-variants";
import { labourCodeVariants } from "@/lib/programmatic/labour-code-variants";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.utilspot.app";
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl,                                             lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${baseUrl}/emi-calculator`,                         lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/income-tax-calculator`,                  lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/sip-calculator`,                         lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/salary-calculator`,                      lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/construction-cost-calculator`,           lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/equity-calculator`,                      lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/invoice-generator`,                      lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/tdee-calculator`,                        lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/nutrition-label-calculator`,             lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/word-counter`,                           lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/qr-code-generator`,                      lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/seo-analyzer`,                           lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/accessibility-checker`,                  lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/cron-builder`,                           lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/freelance-rate-calculator`,              lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/password-generator`,                     lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/new-labour-code-calculator`,             lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/gratuity-calculator`,                    lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/pf-calculator`,                          lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/full-final-settlement-calculator`,       lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/about`,                                  lastModified: now, changeFrequency: "yearly",  priority: 0.4 },
    { url: `${baseUrl}/contact`,                                lastModified: now, changeFrequency: "yearly",  priority: 0.4 },
    { url: `${baseUrl}/privacy-policy`,                         lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${baseUrl}/terms`,                                  lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
  ];

  const programmaticPages: MetadataRoute.Sitemap = [
    ...emiVariants.map((v) => ({
      url: `${baseUrl}/emi-calculator/${v.slug}`,
      lastModified: now, changeFrequency: "monthly" as const, priority: 0.7,
    })),
    ...salaryVariants.map((v) => ({
      url: `${baseUrl}/salary-calculator/${v.slug}`,
      lastModified: now, changeFrequency: "monthly" as const, priority: 0.7,
    })),
    ...constructionVariants.map((v) => ({
      url: `${baseUrl}/construction-cost-calculator/${v.slug}`,
      lastModified: now, changeFrequency: "monthly" as const, priority: 0.6,
    })),
    ...incomeTaxVariants.map((v) => ({
      url: `${baseUrl}/income-tax-calculator/${v.slug}`,
      lastModified: now, changeFrequency: "monthly" as const, priority: 0.7,
    })),
    ...labourCodeVariants.map((v) => ({
      url: `${baseUrl}/new-labour-code-calculator/${v.slug}`,
      lastModified: now, changeFrequency: "monthly" as const, priority: 0.75,
    })),
  ];

  return [...staticPages, ...programmaticPages];
}
