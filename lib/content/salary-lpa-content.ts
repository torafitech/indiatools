export interface SalaryLPAData {
  monthlyInHand: string;
  annualInHand: string;
  taxRegime: string;
  jobLevel: string;
  typicalRoles: string;
  pfMonthly: string;
  insight: string;
  taxTip: string;
}

export const salaryLPAContent: Record<string, SalaryLPAData> = {
  "5-lpa": {
    monthlyInHand: "₹37,500",
    annualInHand: "₹4.50 L",
    taxRegime: "Zero tax under both regimes (below ₹7L exemption)",
    jobLevel: "Entry-level roles — fresher to 1 year experience",
    typicalRoles: "Junior developer, analyst, associate, graduate trainee",
    pfMonthly: "₹1,800",
    insight:
      "At ₹5 LPA, you pay zero income tax under the new regime thanks to the ₹7 lakh rebate under Section 87A. Your biggest deduction is EPF at ₹1,800/month.",
    taxTip:
      "No tax planning needed at this level — both regimes give zero tax liability.",
  },
  "8-lpa": {
    monthlyInHand: "₹59,500",
    annualInHand: "₹7.14 L",
    taxRegime: "New regime saves more — zero tax vs ₹15,600 in old",
    jobLevel: "2–3 years experience, mid-junior professional",
    typicalRoles: "Software engineer, business analyst, marketing executive",
    pfMonthly: "₹2,880",
    insight:
      "At ₹8 LPA, the new tax regime gives you zero tax liability under Section 87A (income below ₹7L after standard deduction). Old regime would cost ₹15,600/year.",
    taxTip:
      "Stick with new regime unless you have ₹1.5L+ in 80C investments plus HRA.",
  },
  "10-lpa": {
    monthlyInHand: "₹74,500",
    annualInHand: "₹8.94 L",
    taxRegime: "New regime typically saves ₹18,000–₹32,000/year",
    jobLevel: "3–5 years experience, mid-level professional",
    typicalRoles: "Senior engineer, team lead, product manager, finance analyst",
    pfMonthly: "₹3,600",
    insight:
      "At ₹10 LPA, income tax begins under the new regime. After ₹75,000 standard deduction, taxable income is ₹9.25L — attracting 5% and 10% slab rates.",
    taxTip:
      "New regime is better unless you can claim HRA + 80C + 80D exceeding ₹2.75 lakh.",
  },
  "12-lpa": {
    monthlyInHand: "₹88,500",
    annualInHand: "₹10.62 L",
    taxRegime: "New regime saves ₹25,000–₹45,000 for most employees",
    jobLevel: "4–6 years experience, senior professional",
    typicalRoles: "Senior software engineer, assistant manager, specialist",
    pfMonthly: "₹4,320",
    insight:
      "At ₹12 LPA, your effective tax rate is around 8–9% under the new regime. Annual tax is approximately ₹83,200 after the ₹75,000 standard deduction.",
    taxTip:
      "Old regime only beats new regime if you claim HRA, 80C (₹1.5L), NPS (₹50K), and 80D together.",
  },
  "15-lpa": {
    monthlyInHand: "₹1,05,600",
    annualInHand: "₹12.67 L",
    taxRegime: "New regime saves ₹30,000–₹55,000 for most employees",
    jobLevel: "5–8 years experience, senior/lead level",
    typicalRoles: "Tech lead, senior manager, principal engineer, AVP",
    pfMonthly: "₹5,400",
    insight:
      "At ₹15 LPA, your in-hand crosses ₹1 lakh per month for the first time. Under the new regime, annual tax is approximately ₹1,30,000 (effective rate ~9.5%). Professional tax of ₹2,400/year applies in most states.",
    taxTip:
      "New regime wins unless your HRA + 80C + NPS + 80D deductions exceed ₹3.75 lakh.",
  },
  "18-lpa": {
    monthlyInHand: "₹1,26,000",
    annualInHand: "₹15.12 L",
    taxRegime: "New regime typically saves ₹40,000–₹65,000/year",
    jobLevel: "7–10 years experience, manager/senior manager",
    typicalRoles: "Engineering manager, senior manager, principal architect",
    pfMonthly: "₹6,480",
    insight:
      "At ₹18 LPA, you enter the 15% income tax slab under the new regime. Annual tax is approximately ₹2,10,000. Many professionals at this level benefit from NPS contributions to reduce taxable income.",
    taxTip:
      "Consider employer NPS contribution (Section 80CCD(2)) — not capped and saves tax regardless of regime.",
  },
  "20-lpa": {
    monthlyInHand: "₹1,39,000",
    annualInHand: "₹16.68 L",
    taxRegime: "New regime typically saves ₹50,000–₹80,000/year",
    jobLevel: "8–12 years experience, senior manager/director level",
    typicalRoles: "Director, senior principal, head of department, VP",
    pfMonthly: "₹7,200",
    insight:
      "At ₹20 LPA, annual income tax under new regime is approximately ₹2,88,000 (effective rate ~14.4%). Employer NPS contribution becomes a highly effective tax-saving tool at this salary level.",
    taxTip:
      "Ensure employer NPS (80CCD(2)) is utilised — up to 10% of basic salary is deductible with no upper limit.",
  },
  "25-lpa": {
    monthlyInHand: "₹1,72,000",
    annualInHand: "₹20.64 L",
    taxRegime: "Compare carefully — old regime viable with high deductions",
    jobLevel: "10–15 years experience, senior director/VP",
    typicalRoles: "VP Engineering, Senior Director, General Manager, CXO-1",
    pfMonthly: "₹7,500",
    insight:
      "At ₹25 LPA, annual tax under new regime is approximately ₹4,50,000 (effective rate ~18%). The 20% slab applies on income between ₹12L–₹15L. Perquisites and RSUs begin to significantly affect total compensation at this level.",
    taxTip:
      "Model both regimes carefully. Old regime wins if total deductions (HRA + 80C + NPS + 80D + LTA) exceed ₹5.75 lakh.",
  },
  "30-lpa": {
    monthlyInHand: "₹2,05,000",
    annualInHand: "₹24.60 L",
    taxRegime: "Both regimes close — depends heavily on deductions",
    jobLevel: "12+ years experience, CXO / Senior VP / Director level",
    typicalRoles: "CTO, CFO, VP, Director of Engineering, Senior Director",
    pfMonthly: "₹7,500",
    insight:
      "At ₹30 LPA, annual tax under new regime is approximately ₹6,30,000 (effective rate ~21%). The 30% top slab applies on income above ₹15L. ESOPs, RSUs, and variable pay become increasingly important components of total compensation.",
    taxTip:
      "At this salary, engage a tax consultant. The difference between optimal and suboptimal filing can be ₹1.5–2.5 lakh annually.",
  },
};
