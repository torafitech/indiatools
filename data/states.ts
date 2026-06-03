export interface ProfessionalTaxSlab {
  minMonthly: number;
  maxMonthly: number;
  monthlyTax: number;
}

const PT_SLABS: Record<string, ProfessionalTaxSlab[]> = {
  Maharashtra: [
    { minMonthly: 0,      maxMonthly: 7500,   monthlyTax: 0 },
    { minMonthly: 7501,   maxMonthly: 10000,  monthlyTax: 175 },
    { minMonthly: 10001,  maxMonthly: Infinity, monthlyTax: 200 },
    // February is 300 — we average to 200/mo for simplicity
  ],
  Karnataka: [
    { minMonthly: 0,      maxMonthly: 15000,  monthlyTax: 0 },
    { minMonthly: 15001,  maxMonthly: Infinity, monthlyTax: 200 },
  ],
  "West Bengal": [
    { minMonthly: 0,      maxMonthly: 8500,   monthlyTax: 0 },
    { minMonthly: 8501,   maxMonthly: 10000,  monthlyTax: 90 },
    { minMonthly: 10001,  maxMonthly: 15000,  monthlyTax: 110 },
    { minMonthly: 15001,  maxMonthly: 25000,  monthlyTax: 130 },
    { minMonthly: 25001,  maxMonthly: 40000,  monthlyTax: 150 },
    { minMonthly: 40001,  maxMonthly: Infinity, monthlyTax: 200 },
  ],
  "Andhra Pradesh": [
    { minMonthly: 0,      maxMonthly: 15000,  monthlyTax: 0 },
    { minMonthly: 15001,  maxMonthly: 20000,  monthlyTax: 150 },
    { minMonthly: 20001,  maxMonthly: Infinity, monthlyTax: 200 },
  ],
  "Tamil Nadu": [
    { minMonthly: 0,      maxMonthly: 21000,  monthlyTax: 0 },
    { minMonthly: 21001,  maxMonthly: Infinity, monthlyTax: 208 },
  ],
  Telangana: [
    { minMonthly: 0,      maxMonthly: 15000,  monthlyTax: 0 },
    { minMonthly: 15001,  maxMonthly: 20000,  monthlyTax: 150 },
    { minMonthly: 20001,  maxMonthly: Infinity, monthlyTax: 200 },
  ],
  Gujarat: [
    { minMonthly: 0,      maxMonthly: 5999,   monthlyTax: 0 },
    { minMonthly: 6000,   maxMonthly: 8999,   monthlyTax: 80 },
    { minMonthly: 9000,   maxMonthly: 11999,  monthlyTax: 150 },
    { minMonthly: 12000,  maxMonthly: Infinity, monthlyTax: 200 },
  ],
  "Madhya Pradesh": [
    { minMonthly: 0,      maxMonthly: 18750,  monthlyTax: 0 },
    { minMonthly: 18751,  maxMonthly: Infinity, monthlyTax: 208 },
  ],
  Kerala: [
    { minMonthly: 0,      maxMonthly: 1999,   monthlyTax: 0 },
    { minMonthly: 2000,   maxMonthly: 2999,   monthlyTax: 20 },
    { minMonthly: 3000,   maxMonthly: 4999,   monthlyTax: 30 },
    { minMonthly: 5000,   maxMonthly: 7499,   monthlyTax: 50 },
    { minMonthly: 7500,   maxMonthly: 9999,   monthlyTax: 75 },
    { minMonthly: 10000,  maxMonthly: 12499,  monthlyTax: 100 },
    { minMonthly: 12500,  maxMonthly: 16666,  monthlyTax: 125 },
    { minMonthly: 16667,  maxMonthly: 20833,  monthlyTax: 167 },
    { minMonthly: 20834,  maxMonthly: Infinity, monthlyTax: 208 },
  ],
  "Himachal Pradesh": [
    { minMonthly: 0,      maxMonthly: 6250,   monthlyTax: 0 },
    { minMonthly: 6251,   maxMonthly: Infinity, monthlyTax: 200 },
  ],
  Assam: [
    { minMonthly: 0,      maxMonthly: 10000,  monthlyTax: 0 },
    { minMonthly: 10001,  maxMonthly: 14999,  monthlyTax: 150 },
    { minMonthly: 15000,  maxMonthly: Infinity, monthlyTax: 208 },
  ],
  Meghalaya: [
    { minMonthly: 0,      maxMonthly: 4166,   monthlyTax: 0 },
    { minMonthly: 4167,   maxMonthly: 6250,   monthlyTax: 16 },
    { minMonthly: 6251,   maxMonthly: 8333,   monthlyTax: 25 },
    { minMonthly: 8334,   maxMonthly: 16666,  monthlyTax: 41 },
    { minMonthly: 16667,  maxMonthly: Infinity, monthlyTax: 208 },
  ],
};

/**
 * Returns monthly professional tax for a given state and monthly gross salary.
 * States not in the list (e.g. Delhi, UP, Rajasthan) have no PT — returns 0.
 */
export function getProfessionalTax(state: string, monthlyGross: number): number {
  const slabs = PT_SLABS[state];
  if (!slabs) return 0;
  for (let i = slabs.length - 1; i >= 0; i--) {
    if (monthlyGross >= slabs[i].minMonthly) {
      return slabs[i].monthlyTax;
    }
  }
  return 0;
}

export const ALL_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Jammu & Kashmir",
  "Ladakh",
  "Chandigarh",
  "Puducherry",
];
