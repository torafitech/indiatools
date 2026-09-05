// AI Resource Library — copy-paste-ready prompts, agent configs, and Claude
// Skills. Fully static content, same pattern as bank-rates.ts: one array,
// zero backend, one page generated per slug via generateStaticParams.

export type ResourceType = "custom-gpt" | "claude-skill" | "ai-agent" | "system-prompt";
export type Platform = "ChatGPT" | "Claude" | "Claude Code" | "Any LLM / Agent Framework";

export interface AIResourceFAQ {
  q: string;
  a: string;
}

export interface AIResource {
  slug: string;
  title: string;
  type: ResourceType;
  platform: Platform;
  category: string;
  tagline: string;       // one-line, for cards
  description: string;   // 1-2 sentences, for detail page intro + meta description
  whoFor: string;
  problemSolved: string;
  content: string;       // the full copyable prompt / SKILL.md / agent config
  downloadFilename?: string;
  downloadMime?: string;
  setupSteps: string[];
  faqs: AIResourceFAQ[];
  relatedSlugs: string[];
  dateAdded: string; // ISO date
}

export const RESOURCE_TYPE_META: Record<
  ResourceType,
  { label: string; icon: string; badge: string; iconBg: string; iconText: string }
> = {
  "custom-gpt":   { label: "Custom GPT",   icon: "💬", badge: "bg-emerald-50 text-emerald-700 ring-emerald-100", iconBg: "bg-emerald-50", iconText: "text-emerald-600" },
  "claude-skill": { label: "Claude Skill", icon: "🧠", badge: "bg-[#FFF8F2] text-[#E8500A] ring-[#FFDCBA]",       iconBg: "bg-[#FFF8F2]",  iconText: "text-[#E8500A]" },
  "ai-agent":     { label: "AI Agent",     icon: "🤖", badge: "bg-[#F0F4FF] text-[#0F2447] ring-[#CBD5EF]",       iconBg: "bg-[#F0F4FF]",  iconText: "text-[#0F2447]" },
  "system-prompt":{ label: "System Prompt",icon: "📝", badge: "bg-amber-50 text-amber-700 ring-amber-100",       iconBg: "bg-amber-50",   iconText: "text-amber-700" },
};

export const RESOURCE_CATEGORIES = [
  "Customer Support",
  "Sales",
  "Marketing & SEO",
  "Finance & Business",
  "HR & Recruiting",
  "Developer Tools",
  "Productivity",
] as const;

export const AI_RESOURCES: AIResource[] = [
  {
    slug: "customer-support-ticket-triager",
    title: "Customer Support Ticket Triager",
    type: "custom-gpt",
    platform: "ChatGPT",
    category: "Customer Support",
    tagline: "Classifies incoming support tickets by urgency, category, and sentiment in one pass.",
    description:
      "A Custom GPT that reads a raw support ticket and returns a structured triage verdict — priority, department, sentiment, and a suggested first reply — so a human agent never opens a ticket cold.",
    whoFor: "Support leads and solo founders handling their own inbox who need consistent triage without hiring a dedicated triage agent.",
    problemSolved:
      "New tickets sit unsorted until someone reads each one manually. This GPT gives every ticket a consistent priority/category/sentiment label the moment it lands, so urgent and angry customers never wait behind low-priority ones.",
    content: `You are a Support Ticket Triager for a software product's customer support team.

INPUT: You will be given the raw text of one customer support ticket (email, chat transcript, or form submission). It may be messy, contain typos, or be in a mix of English and another language.

TASK: Analyze the ticket and output a structured triage verdict. Never answer the customer directly — you produce internal triage data only.

OUTPUT FORMAT (always use this exact structure):

**Priority:** [Critical / High / Medium / Low]
**Category:** [Billing / Bug Report / Feature Request / How-To Question / Account Access / Refund / Other]
**Sentiment:** [Angry / Frustrated / Neutral / Confused / Happy]
**One-line summary:** [max 15 words, what the customer actually wants]
**Suggested first reply:** [2-3 sentences a support agent can send as-is or lightly edit — acknowledge the issue, set expectations, ask for any missing info needed to resolve it]
**Escalate to engineering?** [Yes/No — Yes only for Bug Report tickets describing a reproducible failure, data loss, security concern, or payment failure]

PRIORITY RULES:
- Critical: payment failures, data loss, security issues, service completely down for the customer
- High: customer is blocked from a core workflow, or is visibly angry/threatening to churn
- Medium: a real problem but the customer has a workaround or it's not blocking
- Low: general questions, feature requests, minor cosmetic issues

Do not invent details not present in the ticket. If the ticket is too vague to categorize confidently, say so in the summary and default to Medium priority with category "Other".`,
    setupSteps: [
      "Go to chat.openai.com → Explore GPTs → Create a GPT.",
      "In the Configure tab, paste the block above into the Instructions field.",
      "Set Conversation starters to things like \"Triage this ticket:\" and \"Batch triage these 5 tickets:\".",
      "Turn off Web Browsing and Code Interpreter — this GPT only needs text reasoning.",
      "Save privately first, test on 10-15 real past tickets, then publish for your team.",
    ],
    faqs: [
      { q: "Can this GPT reply to customers directly?", a: "No — it's designed to only produce internal triage data for a human agent to review. Wire the suggested reply into your helpdesk as a draft, not an auto-send, so a person always reviews it first." },
      { q: "Does it work for non-English tickets?", a: "It can read mixed-language tickets and will still classify correctly, but the suggested reply will be in English unless you edit the instructions to explicitly request the customer's language." },
      { q: "Can I add more categories?", a: "Yes — edit the Category line in the OUTPUT FORMAT block and the bullet list stays consistent as long as you keep the same structure." },
      { q: "Will this integrate with Zendesk/Freshdesk directly?", a: "Not out of the box — a Custom GPT only works inside ChatGPT's chat interface. For direct helpdesk integration, use the AI Agent Template version of this workflow instead, wired through Zapier/Make with the helpdesk's API." },
    ],
    relatedSlugs: ["sales-cold-outreach-agent", "invoice-data-extractor-skill"],
    dateAdded: "2026-08-20",
  },
  {
    slug: "invoice-data-extractor-skill",
    title: "Invoice Data Extractor",
    type: "claude-skill",
    platform: "Claude",
    category: "Finance & Business",
    tagline: "Reads a messy invoice PDF or image and returns clean, structured line-item data.",
    description:
      "A Claude Skill that teaches Claude a consistent procedure for pulling vendor, date, line items, tax, and totals out of any invoice format and returning clean JSON — useful for bookkeeping, expense tracking, and GST reconciliation.",
    whoFor: "Freelancers, small business owners, and bookkeepers who manually re-type invoice data into spreadsheets or accounting software.",
    problemSolved:
      "Invoices arrive in every possible layout — PDF, scanned photo, forwarded email. Manually re-typing vendor name, GSTIN, line items, and totals into a ledger is slow and error-prone. This Skill gives Claude a fixed extraction procedure so output is consistent invoice after invoice.",
    content: `---
name: invoice-data-extractor
description: Extracts structured data (vendor, date, line items, tax, totals) from an invoice PDF or image. Use when the user uploads an invoice, bill, or receipt and wants clean structured data out of it — for bookkeeping, expense tracking, or GST reconciliation.
---

# Invoice Data Extractor

## When to use this skill
Trigger whenever the user shares an invoice, bill, or receipt (PDF, image, or pasted text) and wants the data extracted rather than just summarized.

## Procedure

1. Read the full document before extracting anything — invoices vary wildly in layout, and totals/tax lines are often near the bottom while the vendor GSTIN/PAN is near the top.
2. Extract these fields. If a field is genuinely absent, use \`null\` — never guess or fabricate a value.

\`\`\`json
{
  "vendor_name": "",
  "vendor_gstin": null,
  "invoice_number": "",
  "invoice_date": "YYYY-MM-DD",
  "due_date": null,
  "line_items": [
    { "description": "", "quantity": 0, "unit_price": 0, "amount": 0 }
  ],
  "subtotal": 0,
  "tax_breakdown": [
    { "type": "CGST", "rate_percent": 0, "amount": 0 }
  ],
  "total_amount": 0,
  "currency": "INR",
  "payment_terms": null
}
\`\`\`

3. Sanity-check before returning: \`sum(line_items.amount) ≈ subtotal\`, and \`subtotal + sum(tax_breakdown.amount) ≈ total_amount\`. If the numbers don't reconcile within a rupee (rounding), flag the discrepancy in a note rather than silently returning inconsistent totals.
4. If the invoice is a scanned image with unclear text, say explicitly which fields you're less confident about instead of presenting every value with equal certainty.
5. Return the JSON block first, then — only if asked — a one-line plain-English summary.

## Output rules
- Always return valid JSON matching the schema above, even if some fields are null.
- Never invent a GSTIN, PAN, or invoice number that isn't visible in the source document.
- Dates always in ISO format (YYYY-MM-DD), regardless of the source format (DD/MM/YYYY, MM-DD-YY, etc.).`,
    downloadFilename: "invoice-data-extractor.SKILL.md",
    downloadMime: "text/markdown",
    setupSteps: [
      "Download the SKILL.md file below.",
      "In Claude, go to Settings → Capabilities → Skills → Upload skill (or place the file in your project's .claude/skills/ folder if using Claude Code).",
      "Name the folder invoice-data-extractor to match the frontmatter.",
      "Upload or paste an invoice into a new Claude chat — the skill activates automatically because the description matches your request.",
      "Verify the reconciliation check (subtotal + tax = total) on your first few invoices before trusting it on volume.",
    ],
    faqs: [
      { q: "Does this work on scanned/photographed invoices, not just PDFs?", a: "Yes, Claude's vision handles both — but extraction accuracy depends on image clarity. Blurry photos will surface as low-confidence fields per the skill's rules." },
      { q: "Can it handle non-Indian invoice formats?", a: "Yes, the schema is generic (vendor, line items, tax, total). The GSTIN field will simply stay null for a non-Indian invoice." },
      { q: "How is this different from just asking Claude to read an invoice?", a: "Without the skill, output format varies chat to chat. The skill locks in one consistent JSON schema and forces a reconciliation sanity-check every time, which matters if you're piping output into a spreadsheet or accounting tool." },
      { q: "Can I extend the schema with custom fields?", a: "Yes — edit the JSON schema block in the skill file to add fields like cost_center or project_code, and the extraction procedure will follow the new schema." },
    ],
    relatedSlugs: ["customer-support-ticket-triager", "seo-blog-outline-system-prompt"],
    dateAdded: "2026-08-22",
  },
  {
    slug: "sales-cold-outreach-agent",
    title: "Cold Outreach Sales Agent",
    type: "ai-agent",
    platform: "Any LLM / Agent Framework",
    category: "Sales",
    tagline: "A 3-step agent pipeline that researches a lead, drafts a personalized cold email, and logs it to your CRM.",
    description:
      "A platform-agnostic agent template — system prompt, tool definitions, and workflow steps — for a cold outreach agent that researches each lead before writing, so emails don't read like mail-merge spam.",
    whoFor: "Founders and SDRs running their own outbound who want personalized-feeling cold emails without spending 20 minutes researching each lead by hand.",
    problemSolved:
      "Generic mail-merge cold emails get ignored. Manually researching every lead before writing doesn't scale. This agent template chains a research step and a writing step so every email references something real about the recipient's company.",
    content: `# Cold Outreach Sales Agent — Agent Template

Platform: works in n8n, Make, CrewAI, AutoGen, or a simple custom loop — this is the
prompt + tool spec, not a platform-specific export.

## Agent role / system prompt

You are an outbound sales research-and-writing agent for [YOUR COMPANY], which sells
[ONE-SENTENCE PRODUCT DESCRIPTION]. Given a lead's name, company, and title, you produce
one cold email draft. You never send anything yourself — you output a draft for human
review.

## Tools available to this agent

1. \`web_search(query: string)\` — for finding recent company news, funding, product launches.
2. \`get_company_website(domain: string)\` — fetches homepage + about page text.
3. \`crm_log_draft(lead_id: string, draft: string)\` — saves the draft against the lead record.

## Workflow (3 steps — run in order, don't skip)

**Step 1 — Research (uses web_search + get_company_website)**
Find one specific, recent, real detail about the lead's company: a product launch, a
funding round, a hiring push, an expansion, a stated pain point from a blog post or
job listing. If nothing specific turns up after 2 searches, fall back to an
industry-level observation instead of fabricating a company-specific detail.

**Step 2 — Draft the email**
Write a cold email using this structure, max 120 words total:
- Line 1: reference the specific detail from Step 1 — no generic "I hope this finds you well"
- Line 2-3: connect that detail to a problem [YOUR COMPANY]'s product solves
- Line 4: one specific, low-friction ask (a 15-min call, not "let me know your thoughts")
- Subject line: under 6 words, no clickbait, no emoji

**Step 3 — Log**
Call \`crm_log_draft\` with the lead ID and the full draft (subject + body). Never call
any "send email" tool directly — outbound sends require human approval outside this agent.

## Guardrails
- Never fabricate a company detail you didn't find via a tool call.
- Never claim a mutual connection, referral, or prior interaction that wasn't provided as input.
- If research turns up nothing usable and the industry fallback would be generic, say so explicitly instead of forcing a fake personalization.`,
    downloadFilename: "sales-cold-outreach-agent.md",
    downloadMime: "text/markdown",
    setupSteps: [
      "Pick your orchestration layer (n8n, Make, CrewAI, AutoGen, or a plain script with tool-calling).",
      "Wire the three tools: a web search API (Serper, Tavily, Brave Search), a simple URL-fetch tool, and a write action to your CRM (HubSpot/Airtable/Google Sheets API all work).",
      "Paste the system prompt + workflow section as the agent's instructions.",
      "Fill in [YOUR COMPANY] and the product description placeholders before running.",
      "Test on 5 real leads and read every draft before trusting the pipeline at volume — cold email personalization quality degrades fast if research fails silently.",
    ],
    faqs: [
      { q: "Does this send emails automatically?", a: "No, deliberately not. The agent only drafts and logs to your CRM — a human reviews and sends. Auto-sending unreviewed cold email drafts is a fast way to damage sender reputation and violate CAN-SPAM/anti-spam rules." },
      { q: "What if the research step finds nothing useful?", a: "The workflow explicitly requires falling back to an honest industry-level observation rather than fabricating a fake personalization — see the Guardrails section." },
      { q: "Which agent framework is best for this?", a: "n8n or Make if you want a visual, low-code setup; CrewAI or AutoGen if you're comfortable with Python and want tighter control over the tool-calling loop." },
      { q: "Can I adapt this for LinkedIn outreach instead of email?", a: "Yes — swap the email-structure rules in Step 2 for LinkedIn's shorter format (under 300 characters for a connection note) and drop the subject line requirement." },
    ],
    relatedSlugs: ["customer-support-ticket-triager", "seo-blog-outline-system-prompt"],
    dateAdded: "2026-08-25",
  },
  {
    slug: "seo-blog-outline-system-prompt",
    title: "SEO Blog Outline Generator",
    type: "system-prompt",
    platform: "Any LLM / Agent Framework",
    category: "Marketing & SEO",
    tagline: "Turns a target keyword into a complete, search-intent-matched blog outline in one prompt.",
    description:
      "A standalone system prompt — no platform lock-in — that takes a keyword and produces a structured outline matching search intent, with H2/H3s, a word-count target, and an FAQ block ready for FAQPage schema.",
    whoFor: "Solo content marketers and small teams who write their own blog posts and want a consistent outline step before drafting.",
    problemSolved:
      "Writing straight from a keyword to a draft skips the structural thinking that makes content rank — matching search intent, covering subtopics competitors cover, sizing the FAQ section. This prompt forces that structural pass first.",
    content: `You are an SEO content strategist. Given a target keyword, produce a complete blog
post outline — not the post itself.

INPUT: a target keyword or phrase, optionally with a target audience/region.

OUTPUT FORMAT:

**Primary keyword:** [restate it]
**Search intent:** [Informational / Commercial / Transactional / Navigational — pick one, justify in 1 line]
**Recommended title:** [under 60 characters, includes primary keyword naturally]
**Meta description:** [150-160 characters, includes primary keyword]
**Target word count:** [give a number, based on typical intent — informational how-to guides run 1500-2500 words, quick-answer content runs 600-900]

**Outline:**
- H1: [matches recommended title]
- H2: [section 1 — this should directly answer the core query in the first 100 words below it, for featured-snippet eligibility]
  - H3: [subsection if needed]
- H2: [section 2]
- H2: [section 3]
- ... (continue until the topic is fully covered — typically 4-7 H2s for a 1500+ word post)
- H2: Frequently Asked Questions
  - [4-6 question-form H3s, phrased exactly as a searcher would type them]

**FAQ answers (for schema):** for each FAQ question above, write a 2-4 sentence answer suitable for FAQPage structured data.

**Internal linking suggestions:** [2-3 topically related pages this post should link to, described generically if you don't know the site's actual pages, e.g. "a page about [related topic]"]

RULES:
- Every H2 must map to something a real searcher wants to know — no filler sections added just to hit a word count.
- Do not write the full body content — outline and FAQ answers only, per the OUTPUT FORMAT.
- If the keyword has mixed intent (e.g. could be informational or transactional), say so explicitly and pick the more common intent for the outline.`,
    setupSteps: [
      "Copy the prompt above as-is — it works as a system prompt in Claude/ChatGPT's custom instructions, or as the first message in a plain chat.",
      "Send your target keyword as the first user message once the system prompt is set.",
      "Paste the FAQ answers section directly into your FAQPage JSON-LD schema — it's already sized for that.",
      "Use the outline as your drafting scaffold, not a final deliverable — write the actual body content yourself or in a separate pass.",
    ],
    faqs: [
      { q: "Does this replace keyword research?", a: "No — you still need to pick the target keyword yourself (via Google Search Console, Ahrefs, or similar). This prompt starts from a keyword you've already chosen." },
      { q: "Can I use this for non-blog content, like landing pages?", a: "The H2/H3 outline logic still helps, but the FAQ-heavy structure is tuned for blog/guide content — for a landing page, drop the FAQ requirement and focus on the intent/title/meta sections." },
      { q: "Why does it ask for a word count target?", a: "Matching typical content length for the search intent is a real ranking signal — a 400-word post rarely satisfies an informational query that competitors answer in 2000 words." },
      { q: "Is this the same prompt regardless of platform?", a: "Yes — it's plain text, no platform-specific formatting, so it works identically in ChatGPT, Claude, Gemini, or any LLM API call." },
    ],
    relatedSlugs: ["sales-cold-outreach-agent", "invoice-data-extractor-skill"],
    dateAdded: "2026-08-28",
  },
];

export function getResourceBySlug(slug: string): AIResource | undefined {
  return AI_RESOURCES.find((r) => r.slug === slug);
}
