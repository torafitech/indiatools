import type { Metadata } from "next";
import Link from "next/link";
import { ReadmeGenerator } from "@/components/tools/ReadmeGenerator";
import { AdSlot } from "@/components/layout/AdSlot";

export const metadata: Metadata = {
  title: "GitHub README Generator — AI-Generated README.md in Seconds",
  description:
    "Generate a professional GitHub README.md instantly with AI. Paste your project details and get a complete README with badges, ToC, installation steps, usage examples, and more.",
  keywords: [
    "github readme generator",
    "readme.md generator",
    "ai readme generator",
    "github readme template",
    "readme markdown generator",
    "open source readme",
    "developer tools",
    "readme creator",
  ],
  openGraph: {
    title: "GitHub README Generator — AI-Generated README.md in Seconds | UtilSpot",
    description:
      "Generate a professional GitHub README.md instantly with AI. Paste your project details and get a complete README with badges, ToC, installation steps, usage examples, and more.",
    url: "https://www.utilspot.app/readme-generator",
    siteName: "UtilSpot",
  },
  alternates: { canonical: "https://www.utilspot.app/readme-generator" },
  robots: "noindex, nofollow",
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "GitHub README Generator",
  description:
    "Generate a complete, professional GitHub README.md file in seconds using Claude AI. Includes badges, table of contents, features list, installation steps, usage examples, and license section.",
  url: "https://www.utilspot.app/readme-generator",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "All",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does a good GitHub README include?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A good GitHub README should include a project title and description, badges (build status, version, license), a table of contents for longer READMEs, a clear features list, installation instructions, usage examples with code snippets, contribution guidelines, and a license section. A demo screenshot or GIF significantly increases engagement for UI projects.",
      },
    },
    {
      "@type": "Question",
      name: "How does this AI README generator work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This tool uses Claude AI (by Anthropic) to generate a complete README.md based on your project details. You provide the project name, description, tech stack, key features, installation steps, and usage examples. Claude synthesises this into a professional, well-structured README with shields.io badges, a table of contents, and all standard sections. The entire generation takes a few seconds.",
      },
    },
    {
      "@type": "Question",
      name: "Can I edit the generated README after downloading?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — the output is plain Markdown (.md) that you can edit in any text editor, VS Code, or directly on GitHub. After downloading README.md, open it in your preferred editor, customise any section, and commit it to your repository root. The AI provides a strong base; you refine it for your specific context.",
      },
    },
    {
      "@type": "Question",
      name: "What are shields.io badges and how do I update them?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Shields.io badges are dynamic SVG images embedded in README files to display metadata like build status, npm version, license type, and language. The generator creates badge URLs based on your tech stack (e.g., ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)). Update badge URLs by replacing the label, colour, and logo parameters — see shields.io for the full reference.",
      },
    },
    {
      "@type": "Question",
      name: "Should I commit README.md to the repo root or docs folder?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Always commit README.md to the repository root (top-level directory). GitHub, GitLab, and Bitbucket automatically render the root README on the project homepage. A README inside a subfolder (like /docs) is not displayed automatically and will be missed by most visitors. If your project has multiple components, you can have a README.md in each subdirectory for that specific part, in addition to the root-level README.",
      },
    },
  ],
};

export default function ReadmeGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-xs text-gray-400 mb-4">
          <Link href="/" className="hover:text-[#E8500A]">
            Home
          </Link>
          <span className="mx-2">›</span>
          <span className="text-gray-600">GitHub README Generator</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F2447] mb-2">
          GitHub README Generator
        </h1>
        <p className="text-[#7A6048] mb-6 text-sm sm:text-base max-w-2xl">
          Fill in your project details and get a complete, professional README.md — with badges, table of
          contents, installation steps, and usage examples — generated by Claude AI in seconds.
        </p>

        <ReadmeGenerator />

        <AdSlot slot="README_GEN_SLOT" className="my-6 min-h-[90px]" />

        {/* SEO Content */}
        <section className="mt-8 bg-white rounded-xl border border-[#F0E4D4] p-6 prose prose-gray max-w-none">
          <h2 className="text-xl font-bold text-[#0F2447] mb-4">
            Why Your GitHub README Matters More Than You Think
          </h2>

          <p className="text-[#7A6048] leading-relaxed mb-4">
            Your README is the front door of your open-source project. It&apos;s the first thing a
            developer sees when they land on your GitHub repository — and in the first 10 seconds, they
            decide whether to explore further or leave. A bare-bones README (or worse, a missing one)
            signals an unmaintained project and drives away contributors, users, and potential employers
            reviewing your portfolio.
          </p>

          <p className="text-[#7A6048] leading-relaxed mb-4">
            Beyond first impressions, a well-structured README directly improves discoverability.
            GitHub indexes README content for search, meaning a project with clear descriptions, accurate
            tech stack mentions, and thorough feature lists will surface higher in both GitHub search and
            Google results for relevant developer queries.
          </p>

          <h3 className="text-lg font-semibold text-[#0F2447] mb-2">
            Anatomy of a Professional README
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-[#7A6048] mb-4">
            <li>
              <strong className="text-[#0F2447]">Title and description:</strong> One punchy sentence
              that explains what the project does and who it&apos;s for. Avoid vague descriptions like
              &ldquo;a useful tool&rdquo; — be specific about the problem solved.
            </li>
            <li>
              <strong className="text-[#0F2447]">Badges:</strong> Shields.io badges communicate at a
              glance — license, build status, language, npm version. They add visual credibility and
              let developers quickly assess compatibility.
            </li>
            <li>
              <strong className="text-[#0F2447]">Table of contents:</strong> For READMEs longer than
              three sections, a ToC with anchor links lets developers jump to the section they need
              (usually Installation or Usage) without scrolling.
            </li>
            <li>
              <strong className="text-[#0F2447]">Installation instructions:</strong> Step-by-step
              commands in code blocks. Never assume prerequisites — list Node.js version, Python version,
              or any system-level dependencies explicitly.
            </li>
            <li>
              <strong className="text-[#0F2447]">Usage examples:</strong> Working code snippets are worth
              more than paragraphs of prose. Show the most common use case first, then edge cases.
            </li>
            <li>
              <strong className="text-[#0F2447]">Contributing section:</strong> Clear guidelines reduce
              low-quality PRs and encourage good contributions. Link to a CONTRIBUTING.md if the project
              is large enough to warrant one.
            </li>
            <li>
              <strong className="text-[#0F2447]">License:</strong> Always include a license. Without
              one, the code is technically all-rights-reserved by default. MIT is the most permissive
              and widely accepted for open-source projects.
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-[#0F2447] mb-2">
            README Best Practices for 2025
          </h3>
          <p className="text-[#7A6048] leading-relaxed mb-4">
            Modern README conventions have evolved. Keep these principles in mind when reviewing your
            AI-generated output:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-[#7A6048] mb-4">
            <li>
              Write for the reader who has never heard of your project. Assume zero context.
            </li>
            <li>
              Use relative links for images and internal documentation — they work across forks and
              mirrors.
            </li>
            <li>
              Pin your demo screenshot or GIF at the top, below the description. Visual proof reduces
              bounce rate dramatically.
            </li>
            <li>
              Keep installation commands copy-paste ready. Use{" "}
              <code className="text-sm bg-[#FBF5EE] px-1 rounded">```bash</code> code fences so GitHub
              renders them with syntax highlighting.
            </li>
            <li>
              Update the README every time you ship a breaking change or new major feature. Stale
              instructions erode trust faster than any bug.
            </li>
          </ol>

          <h3 className="text-lg font-semibold text-[#0F2447] mb-2">
            Choosing the Right Open Source License
          </h3>
          <p className="text-[#7A6048] leading-relaxed mb-4">
            License choice has real downstream consequences. <strong>MIT</strong> is the simplest —
            anyone can use, modify, and redistribute your code, even in proprietary software.{" "}
            <strong>Apache 2.0</strong> adds explicit patent protection, making it preferable for
            enterprise-facing projects. <strong>GPL-3.0</strong> is copyleft — anyone using your code
            must also open-source their changes, which is ideal if you want to ensure derivative works
            remain open. <strong>ISC</strong> is functionally equivalent to MIT but shorter.{" "}
            <strong>Unlicensed</strong> (The Unlicense) dedicates your work to the public domain —
            maximum permissiveness, no attribution required.
          </p>

          <h3 className="text-lg font-semibold text-[#0F2447] mb-2">
            How This Tool Generates Your README
          </h3>
          <p className="text-[#7A6048] leading-relaxed">
            This generator is powered by <strong>Claude AI</strong> (Anthropic). It takes your project
            inputs — name, description, tech stack, features, installation steps, and usage examples —
            and synthesises them into a complete Markdown document following GitHub README conventions.
            The output includes properly formatted shields.io badges derived from your tech stack, anchor-linked
            table of contents, feature bullet points, installation and usage code blocks, a contributing
            section, and a license badge. Download as README.md and commit to your repository root.
          </p>
        </section>

        {/* FAQ */}
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

        <AdSlot slot="README_GEN_SLOT" className="my-6 min-h-[90px]" />

        {/* Related Tools */}
        <section className="mt-2 mb-4">
          <h2 className="text-base font-semibold text-[#7A6048] mb-3">Related Tools</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { href: "/business-name-generator", label: "Business Name Generator" },
              { href: "/invoice-generator", label: "Invoice Generator" },
              { href: "/qr-code-generator", label: "QR Code Generator" },
            ].map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="text-sm px-3 py-1.5 bg-[#FBF5EE] text-[#0F2447] rounded-full hover:bg-[#F0E4D4] transition-colors"
              >
                {t.label} →
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
