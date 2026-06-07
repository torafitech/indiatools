export interface SalaryCityData {
  state: string;
  cityType: string;
  professionalTax: string;
  ptNote: string;
  industry: string;
  avgSalary: string;
  insight: string;
  costNote: string;
}

export const salaryCityContent: Record<string, SalaryCityData> = {
  bangalore: {
    state: "Karnataka",
    cityType: "Metro",
    professionalTax: "₹200/month (₹2,400/year)",
    ptNote: "Karnataka PT is ₹200/month for salaries above ₹15,000/month",
    industry: "India's tech capital — home to 40%+ of Indian IT/startup jobs",
    avgSalary: "₹8–18 LPA for tech professionals (median: ₹12 LPA)",
    insight:
      "Bangalore employees pay Karnataka professional tax of ₹200/month. As a metro city, HRA exemption is calculated at 50% of basic salary under the old tax regime. The city's high cost of living means net savings rate is typically 20–30% lower than Tier-2 cities at the same salary.",
    costNote:
      "Average 1BHK rent in Bangalore: ₹20,000–₹35,000/month in areas like Koramangala, Whitefield, HSR Layout.",
  },
  mumbai: {
    state: "Maharashtra",
    cityType: "Metro",
    professionalTax: "₹200/month (₹2,500/year — Maharashtra slab)",
    ptNote: "Maharashtra PT is ₹2,500/year for salaries above ₹10,000/month",
    industry: "Financial capital — BFSI, media, manufacturing, pharmaceuticals",
    avgSalary: "₹10–20 LPA across sectors (BFSI median: ₹15 LPA)",
    insight:
      "Mumbai employees pay Maharashtra professional tax of ₹2,500/year. As India's most expensive city, HRA typically consumes 40–50% of in-hand salary. Metro classification gives 50% basic HRA exemption under old regime.",
    costNote:
      "Average 1BHK rent in Mumbai: ₹30,000–₹60,000/month in areas like Andheri, Powai, Lower Parel.",
  },
  delhi: {
    state: "Delhi NCR",
    cityType: "Metro",
    professionalTax: "₹0 (Delhi has no professional tax)",
    ptNote: "Delhi is one of the few states/UTs that does not levy professional tax",
    industry: "Government, services, retail, IT, and FMCG hub",
    avgSalary: "₹8–16 LPA across sectors (IT median: ₹11 LPA)",
    insight:
      "Delhi employees enjoy a unique advantage — zero professional tax. This saves ₹2,400/year compared to Bangalore or Mumbai employees at the same CTC. As a metro, 50% HRA exemption applies under old regime.",
    costNote:
      "Average 1BHK rent in Delhi NCR: ₹15,000–₹35,000/month depending on area (Gurgaon higher, Delhi proper lower).",
  },
  hyderabad: {
    state: "Telangana",
    cityType: "Metro",
    professionalTax: "₹200/month (Telangana)",
    ptNote: "Telangana levies PT at ₹200/month for monthly salaries above ₹20,000",
    industry: "IT, pharma, biotech, and defence — India's fastest growing tech city",
    avgSalary: "₹8–16 LPA in IT (median: ₹11 LPA) — lower cost, similar packages",
    insight:
      "Hyderabad offers the best salary-to-cost-of-living ratio among India's major tech cities. Professional tax is ₹200/month under Telangana rules. The city's lower rent and living costs mean a ₹12 LPA salary stretches significantly further than in Bangalore or Mumbai.",
    costNote:
      "Average 1BHK rent in Hyderabad: ₹12,000–₹22,000/month in areas like Gachibowli, HITEC City, Kondapur.",
  },
  pune: {
    state: "Maharashtra",
    cityType: "Non-Metro",
    professionalTax: "₹200/month (Maharashtra — ₹2,500/year)",
    ptNote: "Maharashtra PT applies regardless of metro/non-metro classification",
    industry: "IT, manufacturing, automotive, and education hub",
    avgSalary: "₹7–15 LPA across sectors (IT median: ₹10 LPA)",
    insight:
      "Pune employees pay Maharashtra professional tax (₹2,500/year) but benefit from non-metro classification — HRA exemption is 40% of basic (vs 50% in metro cities) under old regime. Pune's growing IT sector offers salaries close to Bangalore at 30–40% lower living costs.",
    costNote:
      "Average 1BHK rent in Pune: ₹12,000–₹22,000/month in areas like Hinjewadi, Kharadi, Baner.",
  },
  chennai: {
    state: "Tamil Nadu",
    cityType: "Metro",
    professionalTax: "₹208/year (Tamil Nadu — among India's lowest)",
    ptNote: "Tamil Nadu professional tax is only ₹208/year — negligible impact",
    industry: "Manufacturing, automotive, IT services, and banking",
    avgSalary: "₹7–14 LPA across sectors (IT/auto median: ₹10 LPA)",
    insight:
      "Chennai employees pay virtually no professional tax — just ₹208/year under Tamil Nadu rules, the lowest among major Indian states. As a metro city, 50% HRA exemption applies. Chennai offers a balanced lifestyle with moderate living costs compared to Bangalore and Mumbai.",
    costNote:
      "Average 1BHK rent in Chennai: ₹12,000–₹25,000/month in areas like Sholinganallur, OMR, Anna Nagar.",
  },
  kolkata: {
    state: "West Bengal",
    cityType: "Metro",
    professionalTax: "₹200/month (West Bengal)",
    ptNote: "West Bengal PT is ₹2,400/year for salaries above ₹10,000/month",
    industry: "BFSI, manufacturing, jute, tea, and IT (growing)",
    avgSalary: "₹6–12 LPA across sectors — lower than other metros",
    insight:
      "Kolkata is the most affordable metro city for salaried employees. West Bengal professional tax is ₹200/month. Despite metro classification (50% HRA exemption under old regime), Kolkata's significantly lower rent means a higher percentage of in-hand salary is available for savings.",
    costNote:
      "Average 1BHK rent in Kolkata: ₹8,000–₹18,000/month — the most affordable among Indian metros.",
  },
};
