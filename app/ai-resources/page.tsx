import type { Metadata } from "next";
import Link from "next/link";
import { AI_RESOURCES, RESOURCE_CATEGORIES } from "@/data/ai-resources";
import { AIResourceGrid } from "@/components/tools/AIResourceGrid";
import { AdSlot } from "@/components/layout/AdSlot";

export const metadata: Metadata = {
  title: "Free AI Resources — Custom GPTs, Claude Skills, Agent Templates | UtilSpot",
  description:
    "Free, ready-to-use AI resources: Custom GPT instructions, Claude Skills, AI agent templates, and system prompts for sales, support, SEO, and finance. Copy and deploy in minutes.",
  keywords: [
    "custom gpt templates",
    "claude skill templates",
    "ai agent templates",
    "system prompt library",
    "free ai prompts",
    "ai agent prompt examples",
  ],
  openGraph: {
    title: "Free AI Resources — Custom GPTs, Claude Skills, Agent Templates",
    description:
      "Copy-paste-ready Custom GPT instructions, Claude Skills, AI agent templates, and system prompts. No signup.",
    url: "https://www.utilspot.app/ai-resources",
    siteName: "UtilSpot",
  },
  alternates: { canonical: "https://www.utilspot.app/ai-resources" },
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: AI_RESOURCES.map((r, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: r.title,
    url: `https://www.utilspot.app/ai-resources/${r.slug}`,
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.utilspot.app" },
    { "@type": "ListItem", position: 2, name: "AI Resources", item: "https://www.utilspot.app/ai-resources" },
  ],
};

export default function AIResourcesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-8">
        <nav className="text-xs text-gray-400 mb-4">
          <Link href="/" className="hover:text-[#E8500A]">Home</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-600">AI Resources</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F2447] mb-2">
          Free AI Resource Library
        </h1>
        <p className="text-[#7A6048] mb-6 text-sm sm:text-base max-w-2xl">
          Ready-to-use Custom GPT instructions, Claude Skills, AI agent templates, and
          system prompts. Copy the content, customize it, and deploy your own AI assistant
          in minutes — no signup.
        </p>

        <AIResourceGrid resources={AI_RESOURCES} categories={[...RESOURCE_CATEGORIES]} />

        <AdSlot slot="0000000000" className="my-8" />

        <section className="mt-8 bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h2 className="text-xl font-bold text-gray-900">What&apos;s in This Library</h2>
          <p className="text-gray-600 leading-relaxed text-sm">
            Every resource here is plain text or markdown you can copy straight into
            ChatGPT&apos;s Custom GPT builder, Claude&apos;s Skills panel, or your own agent
            framework (n8n, Make, CrewAI, AutoGen). Nothing requires an account on this
            site, and nothing phones home — it&apos;s just the configuration, ready to paste.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-xl bg-[#FFF8F2] border border-[#F0E4D4]">
              <p className="font-semibold text-[#0F2447] mb-1">💬 Custom GPTs</p>
              <p className="text-[#7A6048]">Full Instructions-field text for ChatGPT&apos;s GPT builder — paste and go.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#F0F4FF] border border-[#F0E4D4]">
              <p className="font-semibold text-[#0F2447] mb-1">🧠 Claude Skills</p>
              <p className="text-[#7A6048]">Downloadable SKILL.md files with correct frontmatter, ready to upload.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#FFF8F2] border border-[#F0E4D4]">
              <p className="font-semibold text-[#0F2447] mb-1">🤖 AI Agent Templates</p>
              <p className="text-[#7A6048]">Platform-agnostic system prompt + tool spec + workflow steps for any agent framework.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#F0F4FF] border border-[#F0E4D4]">
              <p className="font-semibold text-[#0F2447] mb-1">📝 System Prompts</p>
              <p className="text-[#7A6048]">Standalone prompts that work identically in any chat interface or API call.</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
