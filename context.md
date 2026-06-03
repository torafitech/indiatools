# context.md — Full Project Context

## Why This Project Exists
Owner is building passive income streams to exit a job within 12 months.
This utility website portfolio is one of those streams — not a startup, not a product company.
Target: $500–3,000/month in AdSense + affiliate revenue within 12 months of launch.

## Business Model
**Primary:** Google AdSense (display ads on tool pages)
**Secondary:** Affiliate commissions
- Domain registrars (Namecheap ~$50/domain sale) — on Business Name Generator
- Loan/bank comparison (BankBazaar, Bank affiliate programs) — on EMI Calculator
- Investment platforms (Groww, Zerodha affiliate) — on SIP Calculator
- Accounting software (Zoho Books, Tally) — on Invoice Generator
- Job portals (Naukri) — on Salary Calculator

**Not building:**
- SaaS subscriptions (too complex for passive income goal)
- Premium plans (maybe later, not now)

## Target Audience
- **Primary:** Indian users — salaried employees, freelancers, homebuyers, investors
- **Secondary:** Global English users (for tools like Word Counter, TDEE, Business Name Generator)
- Demographics: 25–45 age group, smartphone-first, Google searchers, mix of Tier 1 and Tier 2 Indian cities

## The SEO Strategy

### Why new sites can still win against established players
Big sites like BankBazaar have ONE EMI calculator page.
We build 500 pages — one for every bank + loan type + city combination.
Each specific page (e.g. "EMI calculator for SBI home loan ₹40 lakh 20 years") has almost zero competition.
This is called **Programmatic SEO** — one template, database of variables, hundreds of unique indexed pages.

### Traffic is not winner-take-all
A tool ranking #4 still gets clicks. A tool ranking #1 for 500 small queries beats a tool ranking #1 for one big query.

### AI Search (GEO — Generative Engine Optimization)
Perplexity, ChatGPT Browse, Google AI Overviews cite tools from the web.
A fast, clean, well-structured tool page gets cited even if it doesn't rank #1.
This is a growing traffic channel that big slow sites aren't optimized for.

### Timeline reality
- Month 1–2: Near zero traffic. Normal. Google is crawling and building trust.
- Month 3–4: Long-tail pages start ranking. 1,000–5,000 visitors/month.
- Month 6: Programmatic pages compound. 10,000–30,000/month.
- Month 12: Portfolio mature. 30,000–100,000/month across all tools.

## Research Findings Summary
Full analysis of 24 utility opportunities conducted across 7 phases:
1. Market Research
2. Gap Analysis (existing tools)
3. Non-existing tool discovery
4. Keyword research
5. Complexity assessment
6. Revenue analysis
7. Prioritization matrix

Full interactive research hub available in: `utility_research_hub.jsx`

### Tier 1 — Build Now (Highest ROI)
| Tool | Search Volume | Build Time | Est. Monthly Revenue |
|------|--------------|------------|---------------------|
| EMI Calculator Suite | 2.1M/mo | 1 week | $350–900 |
| India Income Tax Calculator | 1.5M/mo | 2 weeks | $400–1,100 |
| SIP & Investment Calculator | 800k/mo | 1 week | $300–800 |
| AI ATS Resume Checker | 350k/mo | 3 weeks | $400–1,500 |
| AI Business Name Generator | 250k/mo | 2 weeks | $300–1,000 |
| India Construction Cost Estimator | 90k/mo | 2 weeks | $200–600 |
| TDEE & Macro Calculator | 600k/mo | 1 week | $200–500 |
| Free Invoice Generator (GST) | 180k/mo | 2 weeks | $200–600 |

**Combined Tier 1 Potential: $2,350–7,000/month**

### Tier 2 — Strong Plays (Build After Tier 1)
AI Legal Doc Generator, QR Code Generator, Social Media Content Calendar,
CTC to In-Hand Salary Calculator, Freelance Rate Calculator, Color Palette Generator,
GitHub README Generator, Word Counter Pro, Website SEO Analyzer

### Tier 3 — Experimental (Build Last)
ADA Compliance Checker, Startup Equity Calculator, AI Email Subject Line Tester,
Nutrition Label Calculator, Cron Expression Builder, Meeting Agenda Generator, Password Generator

## Key Competitive Insights

### EMI Calculator
- BankBazaar dominates "EMI calculator" head term — don't fight it
- Opportunity: sub-pages for each bank (SBI, HDFC, ICICI, Axis, Kotak) with pre-filled rates
- Opportunity: loan amount specific pages ("EMI for 30 lakh home loan")
- Gap: BankBazaar has ads everywhere and poor mobile UX. Clean fast tool wins users

### Income Tax Calculator
- Most existing tools are outdated after budget changes
- Opportunity: Side-by-side new vs old regime with plain English explanation
- Update after every Union Budget (February each year) — this is the moat

### SIP Calculator
- Groww/ET Money dominate but their tools are buried inside apps
- Opportunity: Goal-based reverse calculator ("I want ₹1 crore in 10 years, what SIP?")
- Programmatic SEO: SIP returns for every amount/rate/tenure combination

### Word Counter
- WordCounter.net gets 10M+/month but terrible UI
- Opportunity: Add keyword density, Flesch reading ease, SEO analysis features
- Zero competition for "word counter with keyword density"

## AdSense Approval Strategy
1. Launch on a clean domain (no spam, no copyright issues)
2. Build minimum 10 tool pages before applying
3. Add Privacy Policy, Terms of Service, About, Contact pages
4. Wait 3 months from domain creation before applying
5. Ensure tools are genuinely useful — Google manual review checks quality
6. Finance tools help — high CPC categories signal legitimate monetizable content
7. Never copy content from other sites

## Tech Decisions Made
- **Next.js** — file-based routing, SSG for programmatic pages, great for SEO
- **Tailwind CSS** — fast styling, consistent design system
- **Vercel** — free deployment, zero DevOps, instant previews
- **No database** — keeps it simple, zero server costs, pure passive
- **No auth** — reduces complexity, tools are free to use with no friction

## Domain Strategy
One domain covers all tools. Shared domain authority = all tools benefit from each other's backlinks.

Suggested domain options:
- `indiatools.in`
- `toolstack.in`
- `calcbuddy.in`
- `indiacalc.com`

Register with Namecheap or GoDaddy India. `.in` domains preferred for India-first SEO signal.

## What Success Looks Like
- Month 3: AdSense approved, first $50–100/month
- Month 6: $300–500/month, all Tier 1 tools live
- Month 12: $1,000–3,000/month, programmatic pages driving compounding traffic
- 12–18 months: Enough passive income to reduce job dependency
