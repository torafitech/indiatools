# instructions.md — Build Instructions

## How to Use This File
Follow tools in order. Do not skip ahead. Each tool builds on the shared components from the previous one.
Complete each tool fully (including SEO, FAQ section, and content) before starting the next.

---

## Phase 0 — Project Setup (Do This First)

```bash
npx create-next-app@latest indiatools --typescript --tailwind --app --src-dir
cd indiatools
npm install jspdf          # for Invoice Generator later
npm install @anthropic-ai/sdk  # for AI tools later
```

### Create these files immediately:
- `app/layout.tsx` — root layout with site header, footer, AdSense script placeholder
- `app/page.tsx` — homepage tool grid
- `components/layout/Header.tsx` — site name + nav links to tool categories
- `components/layout/Footer.tsx` — links to Privacy Policy, Terms, About, Contact
- `components/layout/AdSlot.tsx` — reusable AdSense slot component
- `app/privacy-policy/page.tsx` — required for AdSense approval
- `app/terms/page.tsx` — required for AdSense approval
- `app/about/page.tsx` — required for AdSense approval
- `app/contact/page.tsx` — required for AdSense approval

### Global styles (tailwind.config.ts):
- Primary color: blue-600 (#2563eb)
- Accent: emerald-500 (#10b981)
- Font: system font stack (no Google Fonts — keeps load fast)

---

## Tool 1 — EMI Calculator Suite
**Priority: 9.5/10 | Build time: 1 week | Route: `/emi-calculator`**

### What it does
Calculates monthly EMI for home loans, car loans, and personal loans.
Shows full amortization schedule (month-by-month breakdown of principal + interest).

### Inputs
- Loan Amount (₹) — slider + text input, range: ₹1L to ₹10Cr
- Interest Rate (%) — slider + text input, range: 5% to 24%, step 0.05
- Loan Tenure — slider + text input, toggle between Years and Months
- Loan Type selector — Home Loan / Car Loan / Personal Loan (changes default values)

### Outputs
- Monthly EMI (large, prominent display)
- Total Interest Payable
- Total Amount Payable (Principal + Interest)
- Interest as % of principal
- Amortization table (collapsible, shows year-by-year breakdown)
- Visual: Pie chart showing Principal vs Interest split (use simple CSS/SVG, no chart library)

### Formula
```ts
// /lib/calculations/emi.ts
export function calculateEMI(principal: number, annualRate: number, tenureMonths: number) {
  const r = annualRate / 12 / 100;
  if (r === 0) return principal / tenureMonths;
  const emi = (principal * r * Math.pow(1 + r, tenureMonths)) / (Math.pow(1 + r, tenureMonths) - 1);
  return Math.round(emi);
}

export function generateAmortizationSchedule(principal: number, annualRate: number, tenureMonths: number) {
  const emi = calculateEMI(principal, annualRate, tenureMonths);
  const r = annualRate / 12 / 100;
  let balance = principal;
  const schedule = [];
  for (let month = 1; month <= tenureMonths; month++) {
    const interestPayment = Math.round(balance * r);
    const principalPayment = Math.round(emi - interestPayment);
    balance = Math.round(balance - principalPayment);
    schedule.push({ month, emi, principal: principalPayment, interest: interestPayment, balance: Math.max(0, balance) });
  }
  return schedule;
}
```

### SEO Requirements
**Page title:** `EMI Calculator — Free Home, Car & Personal Loan Calculator India 2025`
**Meta description:** `Calculate your monthly EMI instantly. Free EMI calculator for home loan, car loan and personal loan with full amortization schedule. No signup required.`
**H1:** `EMI Calculator — Calculate Your Monthly Loan EMI Instantly`

**Content below tool (minimum 300 words covering):**
- What is EMI and how is it calculated
- Factors affecting EMI (principal, rate, tenure)
- Tips to reduce EMI
- Difference between home loan, car loan, personal loan EMI rates

**FAQ section (use FAQPage JSON-LD schema):**
1. What is EMI?
2. How is EMI calculated?
3. What is a good EMI to salary ratio?
4. Can I prepay my loan to reduce EMI?
5. Which bank has the lowest home loan interest rate in India?
6. How does tenure affect EMI?

### Programmatic SEO Pages
Create `/lib/programmatic/emi-variants.ts` with data for:

**Bank variants** (`/emi-calculator/[bank]-home-loan`):
```ts
export const emiVariants = [
  { slug: "sbi-home-loan", bank: "SBI", rate: 8.50, type: "Home Loan", defaultAmount: 3000000 },
  { slug: "hdfc-home-loan", bank: "HDFC", rate: 8.75, type: "Home Loan", defaultAmount: 3000000 },
  { slug: "icici-home-loan", bank: "ICICI", rate: 8.75, type: "Home Loan", defaultAmount: 3000000 },
  { slug: "axis-home-loan", bank: "Axis Bank", rate: 8.75, type: "Home Loan", defaultAmount: 3000000 },
  { slug: "kotak-home-loan", bank: "Kotak", rate: 8.70, type: "Home Loan", defaultAmount: 3000000 },
  { slug: "sbi-car-loan", bank: "SBI", rate: 9.25, type: "Car Loan", defaultAmount: 700000 },
  { slug: "hdfc-car-loan", bank: "HDFC", rate: 9.40, type: "Car Loan", defaultAmount: 700000 },
  // add 20+ more variants
];
```

Each variant page pre-fills the calculator with that bank's current rate and has unique metadata:
- Title: `SBI Home Loan EMI Calculator 2025 — Current Rate 8.5%`
- H1: `SBI Home Loan EMI Calculator`

### Affiliate placement
After the result box, add:
> "Compare home loan rates from 20+ banks — [Check Rates on BankBazaar →]"
Use `/go/bankbazaar` redirect.

---

## Tool 2 — Word Counter Pro
**Priority: 7.0/10 | Build time: 2 days | Route: `/word-counter`**

### What it does
Real-time text analysis as user types or pastes content.

### Features
- Word count, character count (with and without spaces)
- Sentence count, paragraph count
- Reading time (avg 200 words/minute)
- Speaking time (avg 130 words/minute)
- Keyword density — top 10 most-used words with percentage
- Flesch Reading Ease score
- Unique word count

### Implementation
```ts
// /lib/calculations/wordcount.ts
export function analyzeText(text: string) {
  const words = text.trim().split(/\s+/).filter(w => w.length > 0);
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
  const chars = text.length;
  const charsNoSpaces = text.replace(/\s/g, "").length;
  const readingTime = Math.ceil(words.length / 200);
  const speakingTime = Math.ceil(words.length / 130);
  // Flesch Reading Ease = 206.835 - 1.015*(words/sentences) - 84.6*(syllables/words)
  return { words: words.length, sentences: sentences.length, paragraphs: paragraphs.length,
           chars, charsNoSpaces, readingTime, speakingTime };
}
```

### SEO Requirements
**Title:** `Word Counter — Free Online Word Count & Character Counter Tool`
**H1:** `Word Counter — Count Words, Characters & Reading Time Instantly`

**FAQ:**
1. How many words is a 5-minute speech?
2. What is the ideal blog post word count for SEO?
3. How many words is a tweet?
4. What is reading time and how is it calculated?

---

## Tool 3 — TDEE & Macro Calculator
**Priority: 8.0/10 | Build time: 3 days | Route: `/tdee-calculator`**

### What it does
Calculates Total Daily Energy Expenditure and recommended macros based on goal.

### Inputs
- Age, Gender, Height (cm/ft toggle), Weight (kg/lbs toggle)
- Activity Level: Sedentary / Lightly Active / Moderately Active / Very Active / Extremely Active
- Goal: Lose Weight / Maintain / Gain Muscle

### Outputs
- BMR (Basal Metabolic Rate)
- TDEE (Total Daily Energy Expenditure)
- Recommended daily calories for selected goal
- Macro breakdown: Protein / Carbs / Fat in grams and percentage
- Deficit/surplus from maintenance

### Formula
```ts
// /lib/calculations/tdee.ts
export function calculateBMR(weight: number, height: number, age: number, gender: "male"|"female") {
  // Mifflin-St Jeor equation
  if (gender === "male") return 10 * weight + 6.25 * height - 5 * age + 5;
  return 10 * weight + 6.25 * height - 5 * age - 161;
}

export function calculateTDEE(bmr: number, activityLevel: string) {
  const multipliers = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, extreme: 1.9 };
  return bmr * (multipliers[activityLevel] || 1.2);
}
```

### SEO Requirements
**Title:** `TDEE Calculator — Calculate Total Daily Energy Expenditure & Macros Free`
**H1:** `TDEE Calculator — Find Your Daily Calorie & Macro Targets`

---

## Tool 4 — India Income Tax Calculator
**Priority: 9.3/10 | Build time: 2 weeks | Route: `/income-tax-calculator`**

### What it does
Calculates income tax under both New and Old regime for FY 2025-26.
Shows side-by-side comparison to help user choose the better regime.

### Inputs
- Annual Income (salary/business)
- HRA received (for old regime)
- Rent paid (for old regime)
- Metro/Non-metro city toggle
- 80C investments (max ₹1.5L)
- 80D health insurance premium
- NPS contribution (80CCD)
- Home loan interest (Section 24)
- Standard deduction (auto-applied: ₹75,000 for new, ₹50,000 for old)

### Tax Slabs (FY 2025-26)
```ts
// /data/tax-slabs.ts
export const newRegimeSlabs2025 = [
  { min: 0, max: 400000, rate: 0 },
  { min: 400000, max: 800000, rate: 0.05 },
  { min: 800000, max: 1200000, rate: 0.10 },
  { min: 1200000, max: 1600000, rate: 0.15 },
  { min: 1600000, max: 2000000, rate: 0.20 },
  { min: 2000000, max: 2400000, rate: 0.25 },
  { min: 2400000, max: Infinity, rate: 0.30 },
];
// Note: Income up to ₹12L is tax-free under new regime due to rebate u/s 87A
// Add surcharge for income above ₹50L
```

### Output
- Tax under New Regime
- Tax under Old Regime
- Recommended regime with explanation
- Detailed breakup: gross income → deductions → taxable income → tax → cess

### Programmatic SEO Pages
- `/income-tax-calculator/10-lpa`
- `/income-tax-calculator/15-lpa`
- `/income-tax-calculator/20-lpa`
- `/income-tax-calculator/25-lpa`
- `/income-tax-calculator/30-lpa`
- `/income-tax-calculator/50-lpa`
Each pre-fills the salary and shows the result immediately.

---

## Tool 5 — SIP Calculator
**Priority: 9.0/10 | Build time: 1 week | Route: `/sip-calculator`**

### Modes
1. **SIP Mode** — monthly investment → final corpus
2. **Goal Mode** — target corpus → required monthly SIP (reverse calculator)
3. **Lump Sum Mode** — one-time investment → final corpus

### Inputs (SIP Mode)
- Monthly SIP Amount (₹)
- Expected Annual Return (%)
- Investment Period (years)

### Inputs (Goal Mode)
- Target Amount (₹)
- Expected Annual Return (%)
- Investment Period (years)

### Formula
```ts
export function calculateSIP(monthly: number, annualRate: number, years: number) {
  const r = annualRate / 12 / 100;
  const n = years * 12;
  const corpus = monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
  const invested = monthly * n;
  return { corpus: Math.round(corpus), invested, gains: Math.round(corpus - invested) };
}

export function calculateRequiredSIP(target: number, annualRate: number, years: number) {
  const r = annualRate / 12 / 100;
  const n = years * 12;
  return Math.round(target / (((Math.pow(1 + r, n) - 1) / r) * (1 + r)));
}
```

### Programmatic SEO
- `/sip-calculator/5000-per-month-10-years`
- `/sip-calculator/10000-per-month-15-years`
- `/sip-calculator/reach-1-crore`
- `/sip-calculator/reach-50-lakh`

---

## Tool 6 — Free Invoice Generator (GST)
**Priority: 8.5/10 | Build time: 2 weeks | Route: `/invoice-generator`**

### What it does
Creates professional GST-compliant invoices downloadable as PDF.
Zero signup, zero storage — generated entirely in browser.

### Fields
- Seller: Business name, GST number, address, logo upload
- Buyer: Name, GST number, address
- Line items: Description, HSN code, Qty, Rate, GST % (0/5/12/18/28)
- Auto-calculate: CGST + SGST (intra-state) or IGST (inter-state)
- Invoice number, date, due date, payment terms
- Bank details for payment
- Notes/terms section

### PDF Generation
```ts
import jsPDF from "jspdf";
// Build invoice layout programmatically
// Use jsPDF's table plugin for line items
// Download as "Invoice-[number]-[date].pdf"
```

### SEO Requirements
**Title:** `Free GST Invoice Generator India — Create & Download PDF Invoice Online`
**H1:** `Free GST Invoice Generator — No Signup, Download PDF Instantly`

---

## Phase 2 Tools (Build After Phase 1 is Live and Getting Traffic)

### Tool 7 — CTC to In-Hand Salary Calculator `/salary-calculator`
- Input: CTC amount, city (for professional tax), PF opt-in
- Output: Monthly in-hand, annual breakdown, all deductions itemized
- Data needed: `/data/states.ts` with professional tax slabs per state

### Tool 8 — Construction Cost Estimator `/construction-cost-calculator`
- Input: City, built-up area (sqft), construction type (basic/standard/premium)
- Output: Estimated cost range, material breakdown, timeline
- Data needed: `/data/cities.ts` with per-sqft rates for 30+ Indian cities

### Tool 9 — AI ATS Resume Checker `/ats-resume-checker`
- Requires: Anthropic API key in `.env.local` as `ANTHROPIC_API_KEY`
- Input: Paste resume text + paste job description
- Output: Match score, missing keywords, improvement suggestions
- API route: `app/api/ats-check/route.ts`

### Tool 10 — AI Business Name Generator `/business-name-generator`
- Requires: Anthropic API key
- Input: Business description, industry, brand values, preferred style
- Output: 10 AI-generated names with domain availability check
- Domain check: Namecheap API or `dns.lookup()` via API route

---

## Shared Component Specs

### AdSlot Component
```tsx
// components/layout/AdSlot.tsx
export function AdSlot({ slot, className }: { slot: string; className?: string }) {
  return (
    <div className={`ad-container ${className}`}>
      <ins className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
```

### ResultBox Component
```tsx
// components/ui/ResultBox.tsx
// Large display box for primary result (EMI amount, word count, etc.)
// Props: label, value, unit, highlight (boolean)
```

### Slider with Input
```tsx
// components/ui/SliderInput.tsx
// Combined slider + number input that stay in sync
// Props: label, value, min, max, step, unit, onChange, format (currency/percent/number)
```

---

## Environment Variables
```env
# .env.local
ANTHROPIC_API_KEY=your_key_here          # Only needed for AI tools
NEXT_PUBLIC_SITE_URL=https://indiatools.in
NEXT_PUBLIC_ADSENSE_ID=ca-pub-XXXXXXXXXXXXXXXX
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX           # Google Analytics
```

---

## Deployment Checklist (Before Going Live)
- [ ] All 5 Phase 1 tools complete with SEO content
- [ ] Privacy Policy page live
- [ ] Terms of Service page live
- [ ] About page live
- [ ] Contact page live (with email)
- [ ] robots.txt configured
- [ ] sitemap.xml auto-generated (Next.js `app/sitemap.ts`)
- [ ] Google Search Console verified
- [ ] Google Analytics installed
- [ ] All pages score 85+ on PageSpeed Insights mobile
- [ ] Test on iPhone SE (375px) and standard Android (390px)
- [ ] All internal links working
- [ ] No console errors
- [ ] AdSense placeholder slots in place (ready to swap in real IDs after approval)
