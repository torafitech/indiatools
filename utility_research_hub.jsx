import { useState, useMemo } from "react";

const UTILITIES = [
  {
    id:1,tier:1,name:"EMI Calculator Suite",category:"Finance",
    tagline:"Home, car & personal loan EMI with full amortization schedule",
    problem:"BankBazaar is bloated with ads, requires logins, and won't export schedules. Bank tools are slow and trust-eroding.",
    audience:"Indian home buyers, car buyers, personal loan seekers",
    competitors:["BankBazaar","HDFC Calculator","EMI-calculator.in"],
    gap:"Zero-signup, instant results, exportable amortization PDF, compare two loans side-by-side — all free",
    searchVol:2100000,searchVolDisplay:"2.1M/mo",cpc:1.80,cpcDisplay:"$1.80",
    complexity:"Easy",buildWeeks:1,
    revenueScore:9,seoScore:9.5,geoScore:8,priorityScore:9.5,
    monthlyTraffic:"80k–200k",monthlyRevenue:"$350–900",
    monetization:["AdSense (Finance CPC)","Bank/NBFC Affiliate","BankBazaar Partner"],
    pSEO:true,pSEODesc:"EMI calculator for [bank] [loan type] — 500+ unique pages",
    keywords:["emi calculator","home loan emi calculator","personal loan emi india","car loan calculator"],
    geoQ:["What will my monthly EMI be for ₹50L loan at 8.5%?","How much home loan can I afford on ₹1L salary?"],
    buildNote:"Pure frontend. React + compound interest formulas. Zero backend. Launch in 3–5 days.",maintenance:"Low"
  },
  {
    id:2,tier:1,name:"India Income Tax Calculator",category:"Finance",
    tagline:"New vs Old regime comparison with HRA, 80C, NPS deductions",
    problem:"Budget changes every year make existing tools stale. Most have confusing UIs and no side-by-side regime comparison.",
    audience:"Indian salaried employees, freelancers, small business owners",
    competitors:["ClearTax","TaxBuddy","Income Tax India website"],
    gap:"Instant side-by-side comparison, plain-English explanations, always updated post-budget, mobile-first",
    searchVol:1500000,searchVolDisplay:"1.5M/mo",cpc:3.20,cpcDisplay:"$3.20",
    complexity:"Easy",buildWeeks:2,
    revenueScore:9,seoScore:9,geoScore:9,priorityScore:9.3,
    monthlyTraffic:"60k–180k",monthlyRevenue:"$400–1,100",
    monetization:["AdSense (Finance)","ClearTax Affiliate","CA Services Referral"],
    pSEO:true,pSEODesc:"Income tax for ₹[X] salary in FY 2025-26 — 200+ pages",
    keywords:["income tax calculator india 2025","new vs old tax regime","income tax slab 2025-26","hra exemption calculator"],
    geoQ:["Should I choose new or old tax regime for 15 LPA?","How much tax will I pay on ₹12 lakh income in 2025?"],
    buildNote:"No backend. Static JS with latest slab rates. Update after each Union Budget.",maintenance:"Medium (annual budget update)"
  },
  {
    id:3,tier:1,name:"SIP & Investment Calculator",category:"Finance",
    tagline:"SIP, lump sum, ELSS, PPF, NPS returns with goal-based planning",
    problem:"Multiple fragmented tools, poor mobile UX, no goal-based reverse calculation ('I want ₹1Cr in 10 yrs — what SIP?')",
    audience:"Indian retail investors, millennials starting SIPs, mutual fund beginners",
    competitors:["Groww Calculator","ET Money","MoneyControl"],
    gap:"Goal-based mode, compare 3 SIPs side-by-side, inflation-adjusted returns, visual wealth chart",
    searchVol:800000,searchVolDisplay:"800k/mo",cpc:4.50,cpcDisplay:"$4.50",
    complexity:"Easy",buildWeeks:1,
    revenueScore:9,seoScore:8.5,geoScore:9,priorityScore:9.0,
    monthlyTraffic:"40k–120k",monthlyRevenue:"$300–800",
    monetization:["AdSense (Finance)","Groww/Zerodha Affiliate","Smallcase Affiliate"],
    pSEO:true,pSEODesc:"SIP returns for ₹[X]/month at [Y]% for [Z] years — 1000+ pages",
    keywords:["sip calculator","mutual fund calculator","lump sum calculator india","ppf calculator","nps calculator"],
    geoQ:["How much will ₹5,000/month SIP give in 10 years?","PPF vs NPS — which is better for tax saving?"],
    buildNote:"Zero backend. Compound interest formulas. The most-searched finance tool in India.",maintenance:"Low"
  },
  {
    id:4,tier:1,name:"AI ATS Resume Checker",category:"HR & Career",
    tagline:"Free AI-powered resume scanner — paste JD + resume, get instant score",
    problem:"75% of resumes rejected by ATS before a human sees them. Free tools are inaccurate or need signup.",
    audience:"Job seekers globally — freshers, career switchers, experienced professionals",
    competitors:["Jobscan ($49/mo)","Resume.io (paid)","Rezi (paid)","Enhancv (paid)"],
    gap:"Free, no signup, paste JD + resume → AI scores match %, flags missing keywords, gives rewrites",
    searchVol:350000,searchVolDisplay:"350k/mo",cpc:6.50,cpcDisplay:"$6.50",
    complexity:"Medium",buildWeeks:3,
    revenueScore:9,seoScore:8.5,geoScore:9,priorityScore:9.0,
    monthlyTraffic:"30k–100k",monthlyRevenue:"$400–1,500",
    monetization:["AdSense (HR = high CPC)","Premium plan (unlimited checks)","Naukri/LinkedIn Affiliate"],
    pSEO:false,
    keywords:["ats resume checker free","resume scanner","ats friendly resume","resume keyword checker"],
    geoQ:["How do I make my resume ATS-friendly?","Why is my resume getting rejected automatically?","What keywords should I add for a data analyst role?"],
    buildNote:"Calls Claude API. Paste resume + JD → AI scores match, suggests missing keywords. Strong premium upsell.",maintenance:"Low"
  },
  {
    id:5,tier:1,name:"AI Business Name Generator",category:"Business",
    tagline:"AI-generated brand names + instant domain & social handle check",
    problem:"Namelix is generic; Shopify's is too basic; none combine domain check + tagline suggestions + trademark hints.",
    audience:"Entrepreneurs, startup founders, freelancers, e-commerce sellers globally",
    competitors:["Namelix","Shopify Name Generator","Oberlo"],
    gap:"Niche-specific AI names, real-time domain check, social handle availability, tagline suggestions",
    searchVol:250000,searchVolDisplay:"250k/mo",cpc:5.00,cpcDisplay:"$5.00",
    complexity:"Medium",buildWeeks:2,
    revenueScore:8.5,seoScore:8,geoScore:8,priorityScore:8.5,
    monthlyTraffic:"25k–80k",monthlyRevenue:"$300–1,000",
    monetization:["AdSense","Namecheap Affiliate (~$50/domain sale)","Hostinger/Bluehost Affiliate"],
    pSEO:true,pSEODesc:"Business name ideas for [industry] — 500+ pages",
    keywords:["business name generator","startup name generator","brand name generator AI","company name ideas"],
    geoQ:["Give me 10 unique business name ideas for a food delivery startup","What's a catchy name for a fintech app?"],
    buildNote:"Claude API for name generation + Namecheap API for domain check. $50 affiliate commission per domain = strong monetization.",maintenance:"Low"
  },
  {
    id:6,tier:1,name:"India Construction Cost Estimator",category:"Real Estate",
    tagline:"City-specific house construction cost with material & labor breakdown",
    problem:"No clean tool for Indian city-specific rates. People rely on WhatsApp forwards and random contractor quotes.",
    audience:"Indian homeowners building/renovating, architects, civil contractors",
    competitors:["Manual spreadsheets","Basic builder site calculators"],
    gap:"City-specific rates (Mumbai, Bangalore, Hyderabad, Tier-2), material breakdown, timeline, civil vs finishing split",
    searchVol:90000,searchVolDisplay:"90k/mo",cpc:3.50,cpcDisplay:"$3.50",
    complexity:"Easy",buildWeeks:2,
    revenueScore:8,seoScore:9,geoScore:9,priorityScore:8.5,
    monthlyTraffic:"20k–60k",monthlyRevenue:"$200–600",
    monetization:["AdSense","Building material affiliate (Indiamart)","Architect/Contractor lead gen"],
    pSEO:true,pSEODesc:"Construction cost per sqft in [city] 2025 — 50+ high-value local pages",
    keywords:["house construction cost india 2025","construction cost per sqft bangalore","home building cost estimator india"],
    geoQ:["How much to build a 1500 sqft house in Bangalore?","Construction cost per sqft in Hyderabad 2025?"],
    buildNote:"Static city rate database + form calculation. Keep rate data updated quarterly. Programmatic SEO is the moat.",maintenance:"Medium (quarterly rate updates)"
  },
  {
    id:7,tier:1,name:"TDEE & Macro Calculator",category:"Health & Fitness",
    tagline:"Total daily energy expenditure + personalized macro targets by goal",
    problem:"TDEECalculator.net gets 1M+/month but has outdated UI and poor mobile experience — a clear opening.",
    audience:"Fitness enthusiasts, dieters, gym-goers globally",
    competitors:["TDEECalculator.net","Healthline calculator","MyFitnessPal"],
    gap:"Better UI, meal plan suggestions, macro split by goal (bulk/cut/maintain), India-specific foods section",
    searchVol:600000,searchVolDisplay:"600k/mo",cpc:1.50,cpcDisplay:"$1.50",
    complexity:"Easy",buildWeeks:1,
    revenueScore:7.5,seoScore:8.5,geoScore:8,priorityScore:8.0,
    monthlyTraffic:"50k–150k",monthlyRevenue:"$200–500",
    monetization:["AdSense (volume play)","MyProtein/Amazon Supplement Affiliate","Fitness App Affiliate (Hevy, Cronometer)"],
    pSEO:false,
    keywords:["tdee calculator","calorie calculator","macro calculator","how many calories to lose weight","bmr calculator"],
    geoQ:["How many calories do I need to lose 5kg?","What should my macros be for bulking?"],
    buildNote:"Mifflin-St Jeor formula in pure JS. Proven traffic model. No backend. Build in 3–5 days.",maintenance:"Low"
  },
  {
    id:8,tier:1,name:"Free Invoice Generator (India GST)",category:"Business",
    tagline:"Create GST-compliant invoices and download PDF — zero signup",
    problem:"Freelancers & SMEs need professional invoices but don't want to pay ₹500+/month for accounting software.",
    audience:"Indian freelancers, consultants, small businesses, GST-registered entities",
    competitors:["Zoho Invoice (freemium)","Refrens.com","Vyapar (paid)"],
    gap:"Zero signup, instant PDF via jsPDF, auto-calculate CGST+SGST+IGST, save to browser",
    searchVol:180000,searchVolDisplay:"180k/mo",cpc:3.80,cpcDisplay:"$3.80",
    complexity:"Easy",buildWeeks:2,
    revenueScore:8.5,seoScore:8.5,geoScore:8,priorityScore:8.5,
    monthlyTraffic:"20k–60k",monthlyRevenue:"$200–600",
    monetization:["AdSense","Zoho Books Affiliate","Tally/QuickBooks Affiliate","Premium templates upsell"],
    pSEO:false,
    keywords:["free invoice generator india","gst invoice maker","invoice format india","freelance invoice template"],
    geoQ:["How do I create a GST invoice for free?","What should a freelance invoice in India include?"],
    buildNote:"jsPDF for PDF generation. GST math is simple. Zero backend. Strong Zoho affiliate opportunity.",maintenance:"Low"
  },
  {
    id:9,tier:2,name:"AI Legal Document Generator",category:"Legal",
    tagline:"NDA, rent agreements, freelance contracts for India — AI-customized",
    problem:"Indian legal templates are outdated non-editable PDFs. Getting a lawyer for a basic NDA costs ₹5,000+.",
    audience:"Freelancers, landlords, startup founders, SMEs in India",
    competitors:["LegalDesk (paid)","Vakil Search (paid)","IndiaFilings (paid)"],
    gap:"AI-customized templates, plain-English clause explanations, instant download, e-stamp instructions",
    searchVol:120000,searchVolDisplay:"120k/mo",cpc:9.00,cpcDisplay:"$9.00",
    complexity:"Medium",buildWeeks:3,
    revenueScore:8.5,seoScore:8,geoScore:8.5,priorityScore:7.8,
    monthlyTraffic:"15k–40k",monthlyRevenue:"$250–800",
    monetization:["AdSense (Legal = very high CPC ~$9)","LegalDesk/Vakil Search Affiliate","Lawyer Referral Lead Gen"],
    pSEO:true,pSEODesc:"[Document type] template India [state] — 100+ pages",
    keywords:["rent agreement format india","nda template india","freelance contract template","employment contract india"],
    geoQ:["What should a rent agreement include in India?","Do I need to notarize an NDA?","How do I make a freelance contract legally binding?"],
    buildNote:"Claude API for document customization. Legal niche has the highest AdSense CPC on this list.",maintenance:"Medium"
  },
  {
    id:10,tier:2,name:"QR Code Generator Pro",category:"Developer & Business",
    tagline:"Feature-rich QR with analytics, batch mode, custom design — free",
    problem:"Free QR tools add watermarks, have poor customization, no scan tracking.",
    audience:"Marketers, restaurant owners, event organizers, small businesses",
    competitors:["QR-code-generator.com","QRTiger","Bitly QR"],
    gap:"Free analytics, bulk generation (CSV→QR batch), branded QR with logo embed, no watermark",
    searchVol:400000,searchVolDisplay:"400k/mo",cpc:1.20,cpcDisplay:"$1.20",
    complexity:"Easy",buildWeeks:1,
    revenueScore:7,seoScore:8,geoScore:7,priorityScore:7.5,
    monthlyTraffic:"30k–100k",monthlyRevenue:"$150–400",
    monetization:["AdSense","Premium plan (analytics + bulk + custom)","Bitly Affiliate"],
    pSEO:false,
    keywords:["qr code generator free","qr code maker","custom qr code","qr code for menu","qr code with logo"],
    geoQ:["How do I create a QR code for my restaurant menu?","Can I track who scans my QR code?"],
    buildNote:"qrcode.js library — extremely fast to build. Analytics requires a lightweight backend.",maintenance:"Low"
  },
  {
    id:11,tier:2,name:"AI Social Media Content Calendar",category:"Marketing",
    tagline:"Generate 30 days of social posts for any brand/niche with AI",
    problem:"Social media managers spend hours planning content. No free AI tool generates a full month of varied platform-specific posts.",
    audience:"Social media managers, content creators, small business owners — StarlingPost users",
    competitors:["Buffer ($18/mo)","Later ($25/mo)","Hootsuite ($99/mo)"],
    gap:"Free, AI-generated 30-day calendar with captions, hashtags, posting times, per-platform formatting",
    searchVol:80000,searchVolDisplay:"80k/mo",cpc:4.50,cpcDisplay:"$4.50",
    complexity:"Medium",buildWeeks:2,
    revenueScore:8,seoScore:7.5,geoScore:8,priorityScore:7.5,
    monthlyTraffic:"10k–30k",monthlyRevenue:"$150–450",
    monetization:["AdSense","Buffer/Later Affiliate","StarlingPost premium funnel (cross-sell)"],
    pSEO:true,pSEODesc:"Social media content calendar for [niche/industry] — 300+ pages",
    keywords:["social media content calendar","ai content calendar generator","social media post ideas","content plan template"],
    geoQ:["Generate a week of Instagram posts for a fitness brand","What should I post on LinkedIn this week?"],
    buildNote:"Claude API. Direct StarlingPost funnel: use free tool → upgrade to StarlingPost to schedule & post.",maintenance:"Low"
  },
  {
    id:12,tier:2,name:"India CTC to In-Hand Salary Calculator",category:"HR & Career",
    tagline:"Full CTC breakdown: PF, professional tax, gratuity, take-home by city",
    problem:"Indian job offers quote CTC but in-hand can be 60–75% of that. No clean free tool explains the full breakdown.",
    audience:"Indian job seekers, freshers evaluating offers, HR professionals",
    competitors:["AmbitionBox (limited)","Naukri Calculator (basic)"],
    gap:"Full breakdown, state-specific professional tax, PF contributions, ESIC, two-offer comparison mode",
    searchVol:150000,searchVolDisplay:"150k/mo",cpc:3.00,cpcDisplay:"$3.00",
    complexity:"Easy",buildWeeks:1,
    revenueScore:7.5,seoScore:8,geoScore:8.5,priorityScore:7.5,
    monthlyTraffic:"20k–60k",monthlyRevenue:"$150–400",
    monetization:["AdSense","Naukri/LinkedIn Job Portal Affiliate","HR Software Affiliate (Darwinbox)"],
    pSEO:true,pSEODesc:"In-hand salary for ₹[X] LPA CTC in [city] — 200+ pages",
    keywords:["ctc to in hand salary calculator india","take home salary calculator","salary breakup calculator india","10 lpa in hand salary"],
    geoQ:["What is in-hand salary for 15 LPA CTC in Bangalore?","How much PF is deducted from salary in India?"],
    buildNote:"Pure JS math with state professional tax table. State-specific data is the competitive moat.",maintenance:"Low"
  },
  {
    id:13,tier:2,name:"Freelance Rate Calculator",category:"Career & Freelance",
    tagline:"Data-driven hourly & project rate benchmarks by skill, country, experience",
    problem:"Freelancers chronically underprice themselves — no benchmark data tool exists to justify their rate.",
    audience:"Freelancers globally: developers, designers, writers, consultants",
    competitors:["Bonsai (basic)","Toptal (basic)","Millo Rate Guide"],
    gap:"Skill-specific rates by country + experience level + client budget reverse-calculator + market percentiles",
    searchVol:50000,searchVolDisplay:"50k/mo",cpc:4.00,cpcDisplay:"$4.00",
    complexity:"Easy",buildWeeks:2,
    revenueScore:7,seoScore:7,geoScore:8,priorityScore:7.0,
    monthlyTraffic:"8k–25k",monthlyRevenue:"$100–300",
    monetization:["AdSense","Toptal/Upwork Affiliate","Freelance Contract Template upsell (cross-link to Tool #9)"],
    pSEO:true,pSEODesc:"Freelance [skill] rates in [country] 2025 — 500+ pages",
    keywords:["freelance rate calculator","how much to charge as freelancer","freelance developer rate india","freelance hourly rate 2025"],
    geoQ:["How much should I charge per hour as a freelance developer in India?","What's a fair rate for freelance graphic design in the US?"],
    buildNote:"BLS + industry survey data for benchmarks. Claude API for personalized advice. Rate data = content moat.",maintenance:"Medium (annual updates)"
  },
  {
    id:14,tier:2,name:"AI Color Palette Generator",category:"Design",
    tagline:"From brand description or image upload to full CSS/Tailwind/Figma palette",
    problem:"Coolors is good but fully manual. No tool generates palettes from brand descriptions with code export.",
    audience:"Designers, developers, startup founders building brand identity",
    competitors:["Coolors.co","Adobe Color","Paletton"],
    gap:"AI palette from text description, extract from image upload, export to CSS variables / Tailwind / Figma / SCSS",
    searchVol:200000,searchVolDisplay:"200k/mo",cpc:2.00,cpcDisplay:"$2.00",
    complexity:"Medium",buildWeeks:2,
    revenueScore:7,seoScore:7.5,geoScore:7,priorityScore:7.0,
    monthlyTraffic:"20k–60k",monthlyRevenue:"$100–300",
    monetization:["AdSense","Adobe/Canva Affiliate","Figma plugin premium upsell"],
    pSEO:true,pSEODesc:"Color palette for [industry] brand — 300+ pages",
    keywords:["color palette generator","ai color palette","brand color generator","color scheme generator from image"],
    geoQ:["Generate a professional color palette for a finance app","What colors work best for a food & beverage brand?"],
    buildNote:"Claude API for AI suggestions + Canvas API for image color extraction. Design audience = strong backlink potential.",maintenance:"Low"
  },
  {
    id:15,tier:2,name:"GitHub README Generator",category:"Developer Tools",
    tagline:"AI-generates a complete README.md from your repo description",
    problem:"Developers hate writing documentation. A good README takes 2–3 hours but is critical for visibility.",
    audience:"Developers, open source contributors, student project builders",
    competitors:["readme.so (basic template dragging)","Make a README (very basic)"],
    gap:"Paste repo URL or describe project → AI generates complete README with badges, sections, code examples, demo GIF placeholder",
    searchVol:40000,searchVolDisplay:"40k/mo",cpc:3.50,cpcDisplay:"$3.50",
    complexity:"Easy",buildWeeks:1,
    revenueScore:6.5,seoScore:7,geoScore:7.5,priorityScore:7.0,
    monthlyTraffic:"8k–25k",monthlyRevenue:"$80–200",
    monetization:["AdSense","GitHub Pro / Copilot Affiliate","Developer Tool premium tier"],
    pSEO:false,
    keywords:["github readme generator","readme.md generator ai","github profile readme","open source readme template"],
    geoQ:["Generate a README for my Python web scraper project","What sections should a good README include?"],
    buildNote:"Claude API. 1-week build. Developer audience = strong organic backlinks from GitHub profiles.",maintenance:"Low"
  },
  {
    id:16,tier:2,name:"Word & Character Counter Pro",category:"Content & Writing",
    tagline:"Real-time count + reading time, SEO keyword density, readability score",
    problem:"WordCounter.net gets 10M+/month but has terrible UI — no SEO keyword density, no readability scoring.",
    audience:"Writers, bloggers, students, SEO professionals, content marketers globally",
    competitors:["WordCounter.net (10M+/mo, terrible UX)","WordCount.com"],
    gap:"Keyword density analysis, Flesch reading ease score, avg sentence length, AI rewrite suggestions",
    searchVol:900000,searchVolDisplay:"900k/mo",cpc:0.80,cpcDisplay:"$0.80",
    complexity:"Easy",buildWeeks:1,
    revenueScore:7,seoScore:8.5,geoScore:7,priorityScore:7.0,
    monthlyTraffic:"30k–100k",monthlyRevenue:"$80–250",
    monetization:["AdSense (high-volume play)","Grammarly Affiliate ($20/signup)","ProWritingAid Affiliate"],
    pSEO:false,
    keywords:["word counter","character counter","word count online","reading time calculator","character count checker"],
    geoQ:["How many words is a 5-minute speech?","What's the ideal word count for an SEO blog post?"],
    buildNote:"Pure JS regex. Fastest build on the list (1–2 days). Volume strategy — even at $0.80 CPC, 100k visits = $400+/mo.",maintenance:"Low"
  },
  {
    id:17,tier:2,name:"Free Website SEO Analyzer",category:"Developer & SEO",
    tagline:"Instant on-page SEO audit with actionable fix guidance — no signup",
    problem:"Free SEO checkers upsell after showing 3 results or produce inaccurate reports.",
    audience:"Bloggers, small business owners, freelance SEO consultants",
    competitors:["Semrush (paid)","Ubersuggest (freemium)","Seoptimer (limited free)"],
    gap:"Full free report: title/meta/H-tags/page speed/mobile/schema/Core Web Vitals with plain-English fix guidance",
    searchVol:200000,searchVolDisplay:"200k/mo",cpc:5.00,cpcDisplay:"$5.00",
    complexity:"Medium",buildWeeks:3,
    revenueScore:7.5,seoScore:8,geoScore:8,priorityScore:7.5,
    monthlyTraffic:"15k–50k",monthlyRevenue:"$200–600",
    monetization:["AdSense (SEO niche ~$5 CPC)","Semrush Affiliate ($200/referral)","Ahrefs Affiliate ($82/mo referral)"],
    pSEO:false,
    keywords:["seo analyzer free","website seo checker","on page seo checker","free seo audit tool"],
    geoQ:["How do I check my website's SEO score for free?","What SEO errors does my website have?"],
    buildNote:"Node.js backend with Puppeteer/Cheerio for HTML analysis + Google PageSpeed Insights API. Most complex Tier 2 build.",maintenance:"Medium"
  },
  {
    id:18,tier:3,name:"ADA/WCAG Compliance Checker",category:"Legal & Accessibility",
    tagline:"Check website accessibility, catch violations, prevent ADA lawsuits",
    problem:"ADA lawsuits up 300% in 5 years. 98% of sites fail WCAG. No simple free URL-based checker with plain fixes.",
    audience:"US/EU web developers, digital agencies, e-commerce site owners",
    competitors:["accessiBe ($490/mo)","WAVE (free, ugly, dated)","axe DevTools (dev-only)"],
    gap:"Free URL checker with plain-English violation explanations + fix code snippets",
    searchVol:35000,searchVolDisplay:"35k/mo",cpc:8.00,cpcDisplay:"$8.00",
    complexity:"Hard",buildWeeks:6,
    revenueScore:7,seoScore:6.5,geoScore:7,priorityScore:6.0,
    monthlyTraffic:"5k–20k",monthlyRevenue:"$100–400",
    monetization:["AdSense (Legal ~$8 CPC)","accessiBe Affiliate","Legal Consultation Referral"],
    pSEO:false,
    keywords:["ada compliance checker","wcag checker free","website accessibility checker","ada website audit tool"],
    geoQ:["Is my website ADA compliant?","How do I fix accessibility errors on my website?"],
    buildNote:"axe-core library integration. Backend needed for URL scanning. Complex but defensible niche with very high CPC.",maintenance:"High"
  },
  {
    id:19,tier:3,name:"Startup Equity & Dilution Calculator",category:"Finance & Startup",
    tagline:"Visual cap table simulator showing dilution through funding rounds",
    problem:"Founders don't understand equity dilution until it's too late. Excel cap tables are too complex for early-stage founders.",
    audience:"Early-stage startup founders, co-founders, angel investors in India and globally",
    competitors:["Carta (paid, complex)","Ledgy (paid)","ESOP calculator spreadsheets"],
    gap:"Free visual dilution simulator showing founder ownership after each funding round + ESOP pool creation",
    searchVol:25000,searchVolDisplay:"25k/mo",cpc:6.50,cpcDisplay:"$6.50",
    complexity:"Medium",buildWeeks:3,
    revenueScore:6.5,seoScore:6,geoScore:7,priorityScore:5.8,
    monthlyTraffic:"3k–12k",monthlyRevenue:"$60–180",
    monetization:["AdSense","Carta/Capbase Affiliate","VC/Accelerator Sponsorship opportunity"],
    pSEO:false,
    keywords:["startup equity calculator","cap table calculator","equity dilution calculator","esop calculator india"],
    geoQ:["How much equity should I give a co-founder?","How does a Series A round dilute founder ownership?"],
    buildNote:"React with complex state. Niche but high-quality audience. Could attract VC firm sponsorships.",maintenance:"Low"
  },
  {
    id:20,tier:3,name:"AI Email Subject Line Tester",category:"Marketing",
    tagline:"Score email subject lines for open rate, spam triggers, emoji impact",
    problem:"Email marketers A/B test but have no pre-send predictor. Existing tools give generic scores without AI alternatives.",
    audience:"Email marketers, SaaS companies, e-commerce brands, newsletter creators",
    competitors:["CoSchedule Headline Analyzer","SubjectLine.com"],
    gap:"AI score + spam trigger words + emoji impact analysis + 5 AI-generated alternative subject lines instantly",
    searchVol:30000,searchVolDisplay:"30k/mo",cpc:5.50,cpcDisplay:"$5.50",
    complexity:"Easy",buildWeeks:1,
    revenueScore:6.5,seoScore:6.5,geoScore:8,priorityScore:6.0,
    monthlyTraffic:"5k–20k",monthlyRevenue:"$80–250",
    monetization:["AdSense","Mailchimp/ConvertKit Affiliate ($30–100/signup)","ActiveCampaign Affiliate"],
    pSEO:false,
    keywords:["email subject line tester","email subject line analyzer","best email subject lines","subject line checker"],
    geoQ:["Is this email subject line good?","How do I improve email open rates?"],
    buildNote:"Claude API. 1-day build. Can also be a feature within StarlingPost for email campaigns.",maintenance:"Low"
  },
  {
    id:21,tier:3,name:"Nutrition Label Calculator (FSSAI)",category:"Health",
    tagline:"Create FSSAI-compliant nutrition labels for Indian food businesses",
    problem:"Food startups and home bakers need FSSAI nutrition labels for compliance but dietitian consultations cost ₹5,000+.",
    audience:"Home bakers, food startups, cloud kitchens, cottage food businesses in India",
    competitors:["FDA tools (US-only, complex)","No quality India-specific tool exists"],
    gap:"Recipe-based calculation, FSSAI-compliant label format, print-ready output, no signup",
    searchVol:40000,searchVolDisplay:"40k/mo",cpc:2.50,cpcDisplay:"$2.50",
    complexity:"Medium",buildWeeks:3,
    revenueScore:6,seoScore:6.5,geoScore:7,priorityScore:5.5,
    monthlyTraffic:"5k–20k",monthlyRevenue:"$60–180",
    monetization:["AdSense","FSSAI Consultant Referral","Food startup community sponsorship"],
    pSEO:false,
    keywords:["nutrition label generator india","fssai nutrition label","food calorie calculator india","recipe nutrition calculator"],
    geoQ:["How do I create a nutrition label for my homemade cookies in India?","What information is required on food labels in India?"],
    buildNote:"IFCT (Indian Food Composition Tables) database integration needed. Clear India-specific gap with no competition.",maintenance:"Medium"
  },
  {
    id:22,tier:3,name:"Cron Expression Builder",category:"Developer Tools",
    tagline:"Visual cron job builder with plain-English translation and next-run preview",
    problem:"Cron syntax is non-intuitive. Developers Google '*/5 * * * *' meaning constantly. Crontab.guru exists but is minimal.",
    audience:"Backend developers, DevOps engineers, system administrators",
    competitors:["Crontab.guru (minimal UI)","FreeFormatter"],
    gap:"Visual click-to-build interface + explain in plain English + show next 10 run times + common patterns library",
    searchVol:80000,searchVolDisplay:"80k/mo",cpc:2.80,cpcDisplay:"$2.80",
    complexity:"Easy",buildWeeks:1,
    revenueScore:5.5,seoScore:7,geoScore:7.5,priorityScore:5.5,
    monthlyTraffic:"10k–30k",monthlyRevenue:"$70–180",
    monetization:["AdSense","AWS/GCP Cloud Affiliate"],
    pSEO:false,
    keywords:["cron expression builder","cron job generator","crontab generator online","cron expression explained"],
    geoQ:["What does '*/5 * * * *' mean in cron?","How do I schedule a job to run every Monday at 9am?"],
    buildNote:"Pure JS. Crontab.guru exists but minimal UI. 2-day build. Dev audience = strong backlinks.",maintenance:"Low"
  },
  {
    id:23,tier:3,name:"AI Meeting Agenda Generator",category:"Productivity",
    tagline:"Structured meeting agendas with time blocks from a topic list",
    problem:"30–50% of meeting time is wasted due to lack of structure. No free AI tool generates a proper timed agenda.",
    audience:"Project managers, team leads, remote workers, startup teams",
    competitors:["Fellow.app (paid)","Notion templates (manual)"],
    gap:"Free, instant AI agenda with time allocation, parking lot section, action item template, facilitator guide",
    searchVol:25000,searchVolDisplay:"25k/mo",cpc:4.00,cpcDisplay:"$4.00",
    complexity:"Easy",buildWeeks:1,
    revenueScore:5.5,seoScore:6,geoScore:8.5,priorityScore:5.5,
    monthlyTraffic:"4k–15k",monthlyRevenue:"$50–150",
    monetization:["AdSense","Notion/Loom Affiliate","Project management tool affiliate"],
    pSEO:false,
    keywords:["meeting agenda generator","ai meeting agenda","meeting agenda template","how to write a meeting agenda"],
    geoQ:["Write a meeting agenda for a product roadmap review with 8 people","How should I structure a 1-hour sprint retrospective?"],
    buildNote:"Claude API. Very fast build. Consider bundling with AI Subject Line Tester as a 'productivity tools' site.",maintenance:"Low"
  },
  {
    id:24,tier:3,name:"Password Generator & Strength Tester",category:"Security",
    tagline:"Generate strong passwords & test yours — 100% client-side, never transmitted",
    problem:"80% of breaches involve weak/reused passwords. Existing generators are from NordPass/LastPass (promoting their paid products).",
    audience:"General internet users, developers, IT administrators globally",
    competitors:["NordPass Generator","LastPass Generator","1Password Generator"],
    gap:"zxcvbn strength scoring of existing passwords + memorable strong password generator + bulk generation — all client-side",
    searchVol:350000,searchVolDisplay:"350k/mo",cpc:4.00,cpcDisplay:"$4.00",
    complexity:"Easy",buildWeeks:1,
    revenueScore:6.5,seoScore:7.5,geoScore:7,priorityScore:6.0,
    monthlyTraffic:"20k–80k",monthlyRevenue:"$150–500",
    monetization:["AdSense","NordPass/1Password Affiliate ($15–40/signup)","VPN Affiliate (NordVPN ~$30/signup)"],
    pSEO:false,
    keywords:["password generator","strong password generator","password strength checker","random password generator free"],
    geoQ:["How do I create a strong password I can actually remember?","Is my current password safe to use?"],
    buildNote:"zxcvbn.js for strength scoring. All client-side — never transmit passwords. Security trust = critical differentiator.",maintenance:"Low"
  }
];

const TIER_COLORS = {
  1: { bg:"#f0fdf4", border:"#bbf7d0", text:"#15803d", dot:"#16a34a", badge:"#dcfce7" },
  2: { bg:"#eff6ff", border:"#bfdbfe", text:"#1d4ed8", dot:"#2563eb", badge:"#dbeafe" },
  3: { bg:"#fffbeb", border:"#fde68a", text:"#b45309", dot:"#d97706", badge:"#fef3c7" }
};

const CMPLX_COLORS = { "Easy":"#16a34a", "Medium":"#d97706", "Hard":"#dc2626" };

function ScoreBar({ value, max=10 }) {
  const pct = Math.round((value/max)*100);
  const color = value >= 8.5 ? "#16a34a" : value >= 7 ? "#2563eb" : value >= 5.5 ? "#d97706" : "#dc2626";
  return (
    <div style={{ display:"flex", alignItems:"center", gap:6 }}>
      <div style={{ flex:1, height:5, background:"#e2e8f0", borderRadius:3 }}>
        <div style={{ width:`${pct}%`, height:"100%", background:color, borderRadius:3 }} />
      </div>
      <span style={{ fontSize:11, color:"#64748b", minWidth:22, textAlign:"right" }}>{value.toFixed(1)}</span>
    </div>
  );
}

function TierBadge({ tier }) {
  const c = TIER_COLORS[tier];
  return (
    <span style={{ background:c.badge, color:c.text, fontSize:10, fontWeight:700, padding:"2px 7px", borderRadius:10, letterSpacing:"0.04em" }}>
      T{tier}
    </span>
  );
}

function CxBadge({ level }) {
  const col = CMPLX_COLORS[level] || "#64748b";
  return (
    <span style={{ fontSize:10, fontWeight:600, color:col, border:`1px solid ${col}`, padding:"1px 6px", borderRadius:4, opacity:0.85 }}>
      {level}
    </span>
  );
}

function Tag({ children, color="#e0f2fe", text="#0369a1" }) {
  return <span style={{ background:color, color:text, fontSize:11, padding:"2px 8px", borderRadius:10 }}>{children}</span>;
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom:10 }}>
      <div style={{ fontSize:10, fontWeight:700, color:"#94a3b8", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:4 }}>{title}</div>
      {children}
    </div>
  );
}

function UtilityCard({ u, expanded, onToggle }) {
  const tc = TIER_COLORS[u.tier];
  const scoreColor = u.priorityScore >= 8.5 ? "#16a34a" : u.priorityScore >= 7 ? "#2563eb" : "#d97706";
  return (
    <div style={{ border:`1px solid ${expanded ? tc.border : "#e2e8f0"}`, borderRadius:10, background:"white", overflow:"hidden", transition:"border-color 0.2s" }}>
      <div
        onClick={onToggle}
        style={{ padding:"12px 14px", cursor:"pointer", display:"flex", alignItems:"flex-start", gap:10 }}
      >
        <div style={{ flexShrink:0, width:38, height:38, borderRadius:8, background:tc.badge, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <span style={{ fontSize:18 }}>
            {u.category === "Finance" ? "💰" : u.category === "HR & Career" ? "🎯" : u.category === "Health & Fitness" ? "💪" : u.category === "Business" ? "🏢" : u.category === "Real Estate" ? "🏗️" : u.category === "Marketing" ? "📣" : u.category === "Legal" ? "⚖️" : u.category === "Design" ? "🎨" : u.category === "Developer Tools" ? "⚙️" : u.category === "Developer & Business" ? "📱" : u.category === "Content & Writing" ? "✍️" : u.category === "Developer & SEO" ? "🔍" : u.category === "Legal & Accessibility" ? "♿" : u.category === "Finance & Startup" ? "📊" : u.category === "Security" ? "🔒" : u.category === "Health" ? "🥗" : u.category === "Productivity" ? "📅" : "🛠️"}
          </span>
        </div>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:"flex", gap:6, alignItems:"center", flexWrap:"wrap", marginBottom:3 }}>
            <span style={{ fontSize:14, fontWeight:700, color:"#0f172a" }}>{u.name}</span>
            <TierBadge tier={u.tier} />
            <CxBadge level={u.complexity} />
            <span style={{ fontSize:10, background:"#f1f5f9", color:"#64748b", padding:"2px 7px", borderRadius:4 }}>{u.category}</span>
            {u.pSEO && <span style={{ fontSize:10, background:"#f0fdf4", color:"#15803d", padding:"2px 7px", borderRadius:4 }}>pSEO ✓</span>}
          </div>
          <p style={{ fontSize:12, color:"#64748b", margin:"0 0 6px", lineHeight:1.4 }}>{u.tagline}</p>
          <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
            <span style={{ fontSize:11, color:"#94a3b8" }}>🔍 {u.searchVolDisplay}</span>
            <span style={{ fontSize:11, color:"#94a3b8" }}>⏱ {u.buildWeeks}w build</span>
            <span style={{ fontSize:11, color:"#94a3b8" }}>💵 {u.monthlyRevenue}/mo</span>
            <span style={{ fontSize:11, color:"#94a3b8" }}>CPC: {u.cpcDisplay}</span>
          </div>
        </div>
        <div style={{ flexShrink:0, textAlign:"center", marginLeft:6 }}>
          <div style={{ fontSize:22, fontWeight:800, color:scoreColor, lineHeight:1 }}>{u.priorityScore.toFixed(1)}</div>
          <div style={{ fontSize:9, color:"#94a3b8" }}>/ 10</div>
          <div style={{ fontSize:10, color:"#cbd5e1", marginTop:4 }}>{expanded ? "▲" : "▼"}</div>
        </div>
      </div>

      {expanded && (
        <div style={{ borderTop:"1px solid #f1f5f9", background:"#fafafa", padding:"14px" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
            <div>
              <Section title="Problem Statement">
                <p style={{ fontSize:12, color:"#374151", lineHeight:1.5, margin:0 }}>{u.problem}</p>
              </Section>
              <Section title="Market Gap">
                <p style={{ fontSize:12, color:"#374151", lineHeight:1.5, margin:0 }}>{u.gap}</p>
              </Section>
              <Section title="Competitors">
                <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
                  {u.competitors.map(c => <Tag key={c} color="#fee2e2" text="#b91c1c">{c}</Tag>)}
                </div>
              </Section>
              <Section title="Target Audience">
                <p style={{ fontSize:12, color:"#374151", margin:0 }}>{u.audience}</p>
              </Section>
            </div>
            <div>
              <Section title="Score Breakdown">
                <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
                  {[["SEO Potential", u.seoScore], ["GEO (AI Search)", u.geoScore], ["Revenue Potential", u.revenueScore], ["Priority Score", u.priorityScore]].map(([l,v]) => (
                    <div key={l} style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <span style={{ fontSize:11, color:"#64748b", minWidth:110 }}>{l}</span>
                      <ScoreBar value={v} />
                    </div>
                  ))}
                </div>
              </Section>
              <Section title="Monetization">
                {u.monetization.map((m,i) => <div key={i} style={{ fontSize:11, color:"#374151", marginBottom:2 }}>• {m}</div>)}
              </Section>
              <Section title="Build Note">
                <p style={{ fontSize:11, color:"#374151", margin:0, fontStyle:"italic" }}>{u.buildNote}</p>
              </Section>
              {u.pSEO && (
                <Section title="Programmatic SEO Play">
                  <p style={{ fontSize:11, color:"#1d4ed8", margin:0 }}>→ {u.pSEODesc}</p>
                </Section>
              )}
            </div>
          </div>
          <div style={{ marginTop:12, borderTop:"1px solid #e2e8f0", paddingTop:12, display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
            <Section title="Top Keywords">
              <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
                {u.keywords.map(k => <Tag key={k}>{k}</Tag>)}
              </div>
            </Section>
            <Section title="AI Search Questions (GEO)">
              {u.geoQ.map((q,i) => <div key={i} style={{ fontSize:11, color:"#374151", marginBottom:3 }}>→ "{q}"</div>)}
            </Section>
          </div>
          <div style={{ marginTop:8, display:"flex", gap:8, alignItems:"center" }}>
            <span style={{ fontSize:11, background:"#f1f5f9", color:"#475569", padding:"3px 10px", borderRadius:4 }}>Maintenance: {u.maintenance}</span>
            <span style={{ fontSize:11, background:"#f1f5f9", color:"#475569", padding:"3px 10px", borderRadius:4 }}>Monthly traffic: {u.monthlyTraffic} visits</span>
          </div>
        </div>
      )}
    </div>
  );
}

function MiniBarChart({ data }) {
  const max = Math.max(...data.map(d => d.value));
  return (
    <div style={{ display:"flex", alignItems:"flex-end", gap:4, height:60 }}>
      {data.map((d,i) => (
        <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}>
          <span style={{ fontSize:9, color:"#94a3b8" }}>{d.label2 || ""}</span>
          <div style={{ width:"100%", height:`${Math.round((d.value/max)*50)}px`, background:d.color || "#2563eb", borderRadius:"3px 3px 0 0", minHeight:4 }} title={d.label} />
          <span style={{ fontSize:9, color:"#64748b", textAlign:"center", lineHeight:1.1 }}>{d.label}</span>
        </div>
      ))}
    </div>
  );
}

function OverviewTab() {
  const catData = useMemo(() => {
    const map = {};
    UTILITIES.forEach(u => { map[u.category] = (map[u.category]||0)+1; });
    return Object.entries(map).sort((a,b)=>b[1]-a[1]).map(([k,v]) => ({ label:k.split(" ")[0], fullLabel:k, value:v, color:"#2563eb" }));
  }, []);
  const topByRevenue = [...UTILITIES].sort((a,b)=>b.revenueScore-a.revenueScore).slice(0,8);
  const t1Revenue = [350,400,300,400,300,200,200,200];
  const t1RevenueHigh = [900,1100,800,1500,1000,600,500,600];
  return (
    <div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:20 }}>
        <div style={{ background:"white", border:"1px solid #e2e8f0", borderRadius:10, padding:"14px 16px" }}>
          <div style={{ fontSize:12, fontWeight:700, color:"#374151", marginBottom:12 }}>Utilities by Category</div>
          <MiniBarChart data={catData.slice(0,8)} />
        </div>
        <div style={{ background:"white", border:"1px solid #e2e8f0", borderRadius:10, padding:"14px 16px" }}>
          <div style={{ fontSize:12, fontWeight:700, color:"#374151", marginBottom:12 }}>Revenue Score — Top 8</div>
          <MiniBarChart data={topByRevenue.map(u => ({
            label:u.name.split(" ").slice(0,2).join(" "),
            label2:u.revenueScore.toFixed(1),
            value:u.revenueScore,
            color: u.tier===1?"#16a34a":u.tier===2?"#2563eb":"#d97706"
          }))} />
        </div>
      </div>
      <div style={{ background:"white", border:"1px solid #e2e8f0", borderRadius:10, padding:"14px 16px", marginBottom:16 }}>
        <div style={{ fontSize:13, fontWeight:700, color:"#374151", marginBottom:12 }}>Tier 1 Portfolio — Revenue Summary</div>
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
            <thead>
              <tr>
                {["Utility","Category","Build","Search Vol","CPC","Est. Monthly Rev","Priority"].map(h => (
                  <th key={h} style={{ textAlign:"left", padding:"6px 8px", borderBottom:"1px solid #e2e8f0", color:"#94a3b8", fontWeight:600, fontSize:10, textTransform:"uppercase", letterSpacing:"0.04em", whiteSpace:"nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {UTILITIES.filter(u=>u.tier===1).map((u,i) => (
                <tr key={u.id} style={{ background: i%2===0?"#fafafa":"white" }}>
                  <td style={{ padding:"7px 8px", fontWeight:600, color:"#0f172a" }}>{u.name}</td>
                  <td style={{ padding:"7px 8px", color:"#64748b" }}>{u.category}</td>
                  <td style={{ padding:"7px 8px", color:"#64748b" }}>{u.buildWeeks}w</td>
                  <td style={{ padding:"7px 8px", color:"#374151", fontWeight:500 }}>{u.searchVolDisplay}</td>
                  <td style={{ padding:"7px 8px", color:"#374151" }}>{u.cpcDisplay}</td>
                  <td style={{ padding:"7px 8px", fontWeight:700, color:"#16a34a" }}>{u.monthlyRevenue}</td>
                  <td style={{ padding:"7px 8px" }}><span style={{ background:"#dcfce7", color:"#15803d", fontWeight:700, padding:"2px 8px", borderRadius:6 }}>{u.priorityScore.toFixed(1)}</span></td>
                </tr>
              ))}
              <tr style={{ background:"#f0fdf4", fontWeight:700 }}>
                <td colSpan={5} style={{ padding:"7px 8px", color:"#15803d" }}>Total Tier 1 Portfolio Potential</td>
                <td style={{ padding:"7px 8px", color:"#15803d", fontWeight:800, fontSize:13 }}>$2,350–7,000/mo</td>
                <td />
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12 }}>
        {[
          { tier:1, label:"Tier 1 — Build Now", desc:"Highest ROI, proven demand, 1–3 week builds. Finance tools dominate due to India's search volume.", color:"#16a34a", bg:"#f0fdf4" },
          { tier:2, label:"Tier 2 — Strong Plays", desc:"Solid opportunities requiring 2–4 weeks. Mix of developer tools, marketing, and career utilities.", color:"#2563eb", bg:"#eff6ff" },
          { tier:3, label:"Tier 3 — Experimental", desc:"Lower traffic but high CPC niches. Worth building after Tier 1 portfolio is generating revenue.", color:"#b45309", bg:"#fffbeb" }
        ].map(t => (
          <div key={t.tier} style={{ background:t.bg, border:`1px solid`, borderColor:TIER_COLORS[t.tier].border, borderRadius:10, padding:14 }}>
            <div style={{ fontSize:12, fontWeight:700, color:t.color, marginBottom:6 }}>{t.label}</div>
            <div style={{ fontSize:11, color:"#374151", lineHeight:1.5 }}>{t.desc}</div>
            <div style={{ marginTop:8, fontSize:11, fontWeight:600, color:t.color }}>{UTILITIES.filter(u=>u.tier===t.tier).length} utilities</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RoadmapTab() {
  const weeks = [
    { period:"Week 1–2", label:"Quick Wins", color:"#16a34a", bg:"#f0fdf4", border:"#bbf7d0",
      items:[
        { name:"TDEE & Macro Calculator", note:"1 week. Proven model. Pure JS.", score:8.0 },
        { name:"Word & Character Counter Pro", note:"2–3 days. Highest search volume. Pure JS.", score:7.0 },
        { name:"QR Code Generator Pro", note:"3–4 days. 400k/mo searches. Build fast.", score:7.5 },
      ]
    },
    { period:"Week 3–4", label:"Finance Core", color:"#15803d", bg:"#f0fdf4", border:"#86efac",
      items:[
        { name:"EMI Calculator Suite", note:"Priority 9.5. Build India's best EMI tool.", score:9.5 },
        { name:"SIP & Investment Calculator", note:"800k searches/mo. Goal-based mode is the differentiator.", score:9.0 },
      ]
    },
    { period:"Week 5–6", label:"Finance Expansion", color:"#1d4ed8", bg:"#eff6ff", border:"#bfdbfe",
      items:[
        { name:"India Income Tax Calculator", note:"1.5M searches/mo. Update post-budget.", score:9.3 },
        { name:"India CTC to In-Hand Salary", note:"150k searches, pure JS, very fast.", score:7.5 },
        { name:"Free Invoice Generator", note:"180k searches, GST-compliant PDF.", score:8.5 },
      ]
    },
    { period:"Week 7–8", label:"AI-Powered Tools", color:"#7c3aed", bg:"#faf5ff", border:"#ddd6fe",
      items:[
        { name:"AI ATS Resume Checker", note:"Claude API. Free vs Jobscan's $49/mo.", score:9.0 },
        { name:"AI Business Name Generator", note:"Claude API + Namecheap affiliate. Strong revenue.", score:8.5 },
        { name:"GitHub README Generator", note:"Claude API. 1-week build. Dev backlinks.", score:7.0 },
      ]
    },
    { period:"Week 9–10", label:"India-Specific Moats", color:"#b45309", bg:"#fffbeb", border:"#fde68a",
      items:[
        { name:"Construction Cost Estimator", note:"Zero competition. pSEO: 50+ city pages.", score:8.5 },
        { name:"Freelance Rate Calculator", note:"500+ pSEO pages by skill/country.", score:7.0 },
      ]
    },
    { period:"Week 11–12", label:"High-CPC Plays", color:"#dc2626", bg:"#fef2f2", border:"#fecaca",
      items:[
        { name:"AI Legal Document Generator", note:"$9 CPC. India NDA, rent agreements, contracts.", score:7.8 },
        { name:"Free Website SEO Analyzer", note:"$5 CPC. Semrush affiliate $200/signup.", score:7.5 },
      ]
    },
  ];
  return (
    <div>
      <div style={{ background:"#fafafa", border:"1px solid #e2e8f0", borderRadius:10, padding:"12px 14px", marginBottom:16 }}>
        <div style={{ fontSize:12, fontWeight:700, color:"#374151", marginBottom:4 }}>Execution Strategy</div>
        <p style={{ fontSize:12, color:"#64748b", margin:0, lineHeight:1.6 }}>
          Start with pure-JS calculators (no API costs) to build AdSense history and traffic. Then layer AI-powered tools (Claude API) for differentiation. 
          Finance tools dominate Indian search volume — EMI + Tax + SIP alone can deliver 100k+/month visitors within 3 months. 
          Use <strong style={{ fontWeight:600, color:"#374151" }}>programmatic SEO</strong> on city/location pages for construction, salary, and SIP tools. 
          Cross-link tools into a hub domain (e.g., <em>indiatools.in</em>) for domain authority compounding.
        </p>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {weeks.map((w,wi) => (
          <div key={wi} style={{ border:`1px solid ${w.border}`, borderRadius:10, background:w.bg, overflow:"hidden" }}>
            <div style={{ padding:"10px 14px", display:"flex", alignItems:"center", gap:10 }}>
              <span style={{ background:w.color, color:"white", fontSize:10, fontWeight:700, padding:"3px 10px", borderRadius:10, whiteSpace:"nowrap" }}>{w.period}</span>
              <span style={{ fontSize:13, fontWeight:700, color:w.color }}>{w.label}</span>
              <span style={{ fontSize:11, color:"#94a3b8", marginLeft:"auto" }}>{w.items.length} utilities</span>
            </div>
            <div style={{ padding:"0 14px 12px", display:"flex", flexDirection:"column", gap:6 }}>
              {w.items.map((item,ii) => (
                <div key={ii} style={{ background:"white", borderRadius:6, padding:"8px 12px", display:"flex", alignItems:"center", gap:10, border:"1px solid #f1f5f9" }}>
                  <span style={{ fontSize:12, fontWeight:600, color:"#0f172a", flex:1 }}>{item.name}</span>
                  <span style={{ fontSize:11, color:"#64748b", flex:2 }}>{item.note}</span>
                  <span style={{ fontSize:13, fontWeight:700, color: item.score>=8.5?"#16a34a":item.score>=7?"#2563eb":"#d97706" }}>{item.score.toFixed(1)}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop:16, background:"#f8fafc", border:"1px solid #e2e8f0", borderRadius:10, padding:"12px 14px" }}>
        <div style={{ fontSize:12, fontWeight:700, color:"#374151", marginBottom:8 }}>AdSense Approval Strategy</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
          {[
            "Launch 3–5 tools first on a single domain. Google AdSense prefers established utility sites.",
            "Add 5–10 blog posts per tool explaining 'how to use' and 'why it matters' for content depth.",
            "Finance tools qualify for AdSense faster — high CPC categories demonstrate monetization potential.",
            "Avoid tools with user-generated content initially. Pure calculators = clean, policy-safe content.",
            "Build programmatic SEO pages early — 50–100 location/variant pages signal a real content investment.",
            "Target AdSense application after: 3 months old, 10+ pages, 1,000+ monthly visitors consistently.",
          ].map((tip,i) => (
            <div key={i} style={{ fontSize:11, color:"#374151", display:"flex", gap:8 }}>
              <span style={{ color:"#2563eb", fontWeight:700, flexShrink:0 }}>{i+1}.</span>
              <span style={{ lineHeight:1.5 }}>{tip}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function UtilityResearchHub() {
  const [tab, setTab] = useState("utilities");
  const [tierFilter, setTierFilter] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortBy, setSortBy] = useState("priority");
  const [expandedId, setExpandedId] = useState(null);

  const categories = useMemo(() => ["All", ...new Set(UTILITIES.map(u => u.category))], []);

  const filtered = useMemo(() => {
    let list = [...UTILITIES];
    if (tierFilter > 0) list = list.filter(u => u.tier === tierFilter);
    if (categoryFilter !== "All") list = list.filter(u => u.category === categoryFilter);
    list.sort((a, b) => {
      if (sortBy === "priority") return b.priorityScore - a.priorityScore;
      if (sortBy === "revenue") return b.revenueScore - a.revenueScore;
      if (sortBy === "build") return a.buildWeeks - b.buildWeeks;
      if (sortBy === "traffic") return b.searchVol - a.searchVol;
      return 0;
    });
    return list;
  }, [tierFilter, categoryFilter, sortBy]);

  const TABS = [["utilities","Utility Portfolio"],["overview","Market Overview"],["roadmap","Build Roadmap"]];
  const statsData = [
    { label:"Opportunities", value:"24", sub:"across 17 categories" },
    { label:"Tier 1 (Build Now)", value:"8", sub:"1–3 week builds", c:"#15803d" },
    { label:"Tier 2 (Strong)", value:"9", sub:"2–4 week builds", c:"#1d4ed8" },
    { label:"Tier 3 (Experimental)", value:"7", sub:"4–8 week builds", c:"#b45309" },
    { label:"Tier 1 Revenue Potential", value:"$2.3K–7K", sub:"per month combined", c:"#16a34a" },
    { label:"Fastest Build", value:"1 day", sub:"Word Counter / Cron Builder" },
    { label:"Highest Priority", value:"9.5/10", sub:"EMI Calculator Suite", c:"#dc2626" },
    { label:"Highest CPC Niche", value:"$9.00", sub:"Legal Document Generator", c:"#7c3aed" },
  ];

  return (
    <div style={{ fontFamily:"system-ui,-apple-system,'Segoe UI',sans-serif", padding:"0 0 24px" }}>
      <div style={{ paddingBottom:16, borderBottom:"1px solid #e2e8f0", marginBottom:16 }}>
        <h1 style={{ fontSize:20, fontWeight:800, color:"#0f172a", margin:"0 0 4px" }}>Utility Website Portfolio Research</h1>
        <p style={{ fontSize:13, color:"#64748b", margin:0 }}>All 7 phases complete · 24 validated opportunities · Ranked for AdSense + Affiliate ROI · India-first + global angles</p>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:8, marginBottom:20 }}>
        {statsData.map((s,i) => (
          <div key={i} style={{ background:"#f8fafc", borderRadius:8, padding:"10px 12px", border:"1px solid #e2e8f0" }}>
            <div style={{ fontSize:10, color:"#94a3b8", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:2 }}>{s.label}</div>
            <div style={{ fontSize:18, fontWeight:800, color:s.c||"#0f172a", lineHeight:1 }}>{s.value}</div>
            <div style={{ fontSize:10, color:"#94a3b8", marginTop:2 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display:"flex", gap:0, borderBottom:"2px solid #e2e8f0", marginBottom:16 }}>
        {TABS.map(([id,label]) => (
          <button key={id} onClick={()=>setTab(id)} style={{ border:"none", background:"none", padding:"8px 16px", fontSize:13, fontWeight:600, color:tab===id?"#2563eb":"#94a3b8", borderBottom:tab===id?"2.5px solid #2563eb":"2.5px solid transparent", cursor:"pointer", marginBottom:-2, transition:"color 0.15s" }}>
            {label}
          </button>
        ))}
      </div>

      {tab === "utilities" && (
        <div>
          <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:14, alignItems:"center" }}>
            <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
              {[0,1,2,3].map(t => (
                <button key={t} onClick={()=>setTierFilter(t)} style={{ padding:"4px 12px", borderRadius:16, border:`1px solid ${tierFilter===t?"#2563eb":"#e2e8f0"}`, background:tierFilter===t?"#2563eb":"white", color:tierFilter===t?"white":"#475569", fontSize:11, fontWeight:600, cursor:"pointer" }}>
                  {t===0?"All Tiers":`Tier ${t}`}
                </button>
              ))}
            </div>
            <select value={categoryFilter} onChange={e=>setCategoryFilter(e.target.value)} style={{ padding:"4px 8px", borderRadius:6, border:"1px solid #e2e8f0", fontSize:11, color:"#475569" }}>
              {categories.map(c=><option key={c}>{c}</option>)}
            </select>
            <select value={sortBy} onChange={e=>setSortBy(e.target.value)} style={{ padding:"4px 8px", borderRadius:6, border:"1px solid #e2e8f0", fontSize:11, color:"#475569" }}>
              <option value="priority">Sort: Priority Score</option>
              <option value="revenue">Sort: Revenue Score</option>
              <option value="build">Sort: Build Time ↑</option>
              <option value="traffic">Sort: Search Volume ↑</option>
            </select>
            <span style={{ fontSize:11, color:"#94a3b8", marginLeft:"auto" }}>{filtered.length} of {UTILITIES.length} utilities</span>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
            {filtered.map(u => (
              <UtilityCard key={u.id} u={u} expanded={expandedId===u.id} onToggle={()=>setExpandedId(expandedId===u.id?null:u.id)} />
            ))}
          </div>
        </div>
      )}

      {tab === "overview" && <OverviewTab />}
      {tab === "roadmap" && <RoadmapTab />}
    </div>
  );
}
