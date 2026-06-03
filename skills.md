# skills.md — Reusable Patterns & Skills

## Skill 1 — Building a Calculator Tool (Pattern)

Use this pattern for every calculator tool (EMI, SIP, TDEE, Tax, etc.)

### File Structure
```
app/[tool-name]/
├── page.tsx           # Page with metadata + tool + SEO content
└── [variant]/
    └── page.tsx       # Programmatic SEO variant pages

components/tools/
└── [ToolName]Calculator.tsx   # The actual interactive component

lib/calculations/
└── [toolname].ts      # Pure math functions
```

### Page Template
```tsx
// app/[tool-name]/page.tsx
import { Metadata } from "next";
import { ToolNameCalculator } from "@/components/tools/ToolNameCalculator";
import { AdSlot } from "@/components/layout/AdSlot";

export const metadata: Metadata = {
  title: "Tool Name — Free [Description] | IndiaTools",
  description: "150-160 char description with primary keyword.",
  alternates: { canonical: "https://indiatools.in/tool-name" }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Question here?",
      "acceptedAnswer": { "@type": "Answer", "text": "Answer here." }
    }
    // 4-6 questions
  ]
};

export default function ToolNamePage() {
  return (
    <>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Tool Name Heading</h1>
        <p className="text-gray-600 mb-6">Short intro with primary keyword.</p>
        
        {/* THE TOOL */}
        <ToolNameCalculator />
        
        {/* AD AFTER RESULT */}
        <AdSlot slot="AFTER_RESULT_SLOT" className="my-6" />
        
        {/* SEO CONTENT */}
        <section className="mt-8 prose prose-gray max-w-none">
          <h2>What is [Tool Name]?</h2>
          <p>300+ words of genuinely useful content...</p>
        </section>
        
        {/* FAQ SECTION */}
        <section className="mt-8">
          <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
          {/* FAQ items */}
        </section>
        
        <AdSlot slot="BELOW_FAQ_SLOT" className="my-6" />
        
        {/* RELATED TOOLS */}
        <section className="mt-8">
          <h2 className="text-lg font-semibold mb-3">Related Tools</h2>
          {/* Links to 2-3 related tools */}
        </section>
      </main>
    </>
  );
}
```

### Component Template
```tsx
// components/tools/ToolNameCalculator.tsx
"use client";
import { useState, useMemo } from "react";
import { calculateSomething } from "@/lib/calculations/toolname";
import { SliderInput } from "@/components/ui/SliderInput";
import { ResultBox } from "@/components/ui/ResultBox";

export function ToolNameCalculator() {
  const [inputA, setInputA] = useState(defaultValue);
  const [inputB, setInputB] = useState(defaultValue);
  
  const result = useMemo(() => {
    if (!inputA || !inputB) return null;
    return calculateSomething(inputA, inputB);
  }, [inputA, inputB]);
  
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="space-y-5">
        <SliderInput
          label="Input Label"
          value={inputA}
          min={minValue}
          max={maxValue}
          step={stepValue}
          unit="₹"
          format="currency"
          onChange={setInputA}
        />
        {/* More inputs */}
      </div>
      
      {result && (
        <div className="mt-6 p-5 bg-blue-50 rounded-xl border border-blue-100">
          <ResultBox label="Result Label" value={result.mainValue} unit="₹" highlight />
          {/* Secondary results */}
        </div>
      )}
    </div>
  );
}
```

---

## Skill 2 — Programmatic SEO Page Generation

```tsx
// app/emi-calculator/[variant]/page.tsx
import { emiVariants } from "@/lib/programmatic/emi-variants";
import { EMICalculator } from "@/components/tools/EMICalculator";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return emiVariants.map(v => ({ variant: v.slug }));
}

export async function generateMetadata({ params }: { params: { variant: string } }): Promise<Metadata> {
  const variant = emiVariants.find(v => v.slug === params.variant);
  if (!variant) return {};
  return {
    title: `${variant.bank} ${variant.type} EMI Calculator 2025 — Current Rate ${variant.rate}%`,
    description: `Calculate your ${variant.bank} ${variant.type} EMI instantly. Current interest rate: ${variant.rate}% p.a. Free amortization schedule.`,
    alternates: { canonical: `https://indiatools.in/emi-calculator/${variant.slug}` }
  };
}

export default function VariantPage({ params }: { params: { variant: string } }) {
  const variant = emiVariants.find(v => v.slug === params.variant);
  if (!variant) notFound();
  
  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        {variant.bank} {variant.type} EMI Calculator — {variant.rate}% Rate
      </h1>
      <EMICalculator 
        defaultAmount={variant.defaultAmount}
        defaultRate={variant.rate}
        defaultTenure={240}
      />
      {/* Variant-specific content */}
    </main>
  );
}
```

---

## Skill 3 — Currency Formatting (India)

```ts
// lib/utils/format.ts
export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
  // Output: ₹12,50,000
}

export function formatINRShort(amount: number): string {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}K`;
  return `₹${amount}`;
}
```

---

## Skill 4 — Sitemap Generation

```ts
// app/sitemap.ts
import { MetadataRoute } from "next";
import { emiVariants } from "@/lib/programmatic/emi-variants";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://indiatools.in";
  
  const staticPages = [
    { url: baseUrl, priority: 1.0 },
    { url: `${baseUrl}/emi-calculator`, priority: 0.9 },
    { url: `${baseUrl}/income-tax-calculator`, priority: 0.9 },
    { url: `${baseUrl}/sip-calculator`, priority: 0.9 },
    { url: `${baseUrl}/word-counter`, priority: 0.8 },
    { url: `${baseUrl}/tdee-calculator`, priority: 0.8 },
    // add all tools
  ];
  
  const emiVariantPages = emiVariants.map(v => ({
    url: `${baseUrl}/emi-calculator/${v.slug}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  }));
  
  return [...staticPages, ...emiVariantPages].map(page => ({
    ...page,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency || "monthly",
  }));
}
```

---

## Skill 5 — Calling Claude API (for AI tools only)

```ts
// app/api/[tool]/route.ts
import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic(); // uses ANTHROPIC_API_KEY env var

export async function POST(request: NextRequest) {
  try {
    const { userInput } = await request.json();
    
    // Basic input validation
    if (!userInput || typeof userInput !== "string" || userInput.length > 5000) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    
    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{
        role: "user",
        content: `Your specific prompt here. User input: ${userInput}`
      }]
    });
    
    const responseText = message.content[0].type === "text" ? message.content[0].text : "";
    return NextResponse.json({ result: responseText });
    
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
```

**Rate limiting:** Add basic rate limiting to API routes to prevent abuse:
```ts
// Simple in-memory rate limit (for production use Upstash Redis)
const requestCounts = new Map<string, { count: number; reset: number }>();
// Allow 10 requests per IP per hour for AI tools
```

---

## Skill 6 — Robots.txt

```ts
// app/robots.ts
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://indiatools.in/sitemap.xml",
  };
}
```

---

## Common Mistakes to Avoid

1. **Don't calculate in the render function** — use `useMemo` for all derived values
2. **Don't use `useEffect` for calculations** — only for side effects (analytics, etc.)
3. **Don't forget `"use client"`** — any component with useState/useMemo needs it
4. **Don't hardcode affiliate URLs** — always use `/go/[partner]` redirects
5. **Don't place ads above the tool** — Google penalizes this, ruins UX
6. **Don't skip the FAQ section** — it's a major ranking factor for utility pages
7. **Don't use external fonts** — kills page speed, use system font stack
8. **Don't store any user data** — no localStorage, no cookies for tool inputs
