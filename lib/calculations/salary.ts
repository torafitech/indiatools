import { compareRegimes, TaxInput } from "@/lib/calculations/incometax";
import { getProfessionalTax } from "@/data/states";

export interface SalaryBreakdown {
  ctc: number;
  grossAnnual: number;
  grossMonthly: number;
  basicMonthly: number;
  basicAnnual: number;
  hra: number;
  hraAnnual: number;
  specialAllowance: number;
  specialAllowanceAnnual: number;
  employerPF: number;
  employerPFAnnual: number;
  employeePF: number;
  employeePFAnnual: number;
  professionalTax: number;
  incomeTaxMonthly: number;
  incomeTaxAnnual: number;
  totalDeductions: number;
  inHandMonthly: number;
  inHandAnnual: number;
  takeHomePercent: number;
}

/**
 * Derive monthly in-hand salary from annual CTC.
 *
 * Structure:
 *   Basic       = 40% of CTC
 *   HRA         = 50% basic (metro) or 40% basic (non-metro)
 *   Employer PF = 12% basic (if opted in) — included in CTC, not extra
 *   Special     = CTC − basic − HRA − employer PF
 *   Gross       = basic + HRA + special allowance (employer PF is outside gross pay)
 *
 * Income tax estimated via new regime (most beneficial for most salaried employees now).
 */
export function calculateInHandSalary(
  ctc: number,
  pfOptIn: boolean,
  state: string,
  city: "metro" | "non-metro"
): SalaryBreakdown {
  const basicAnnual       = Math.round(ctc * 0.4);
  const basicMonthly      = Math.round(basicAnnual / 12);

  const hraRate           = city === "metro" ? 0.5 : 0.4;
  const hraAnnual         = Math.round(basicAnnual * hraRate);
  const hra               = Math.round(hraAnnual / 12);

  const employerPFAnnual  = pfOptIn ? Math.round(basicAnnual * 0.12) : 0;
  const employerPF        = Math.round(employerPFAnnual / 12);

  const specialAllowanceAnnual = Math.max(0, ctc - basicAnnual - hraAnnual - employerPFAnnual);
  const specialAllowance  = Math.round(specialAllowanceAnnual / 12);

  const grossAnnual       = basicAnnual + hraAnnual + specialAllowanceAnnual;
  const grossMonthly      = Math.round(grossAnnual / 12);

  const employeePFAnnual  = pfOptIn ? Math.round(basicAnnual * 0.12) : 0;
  const employeePF        = Math.round(employeePFAnnual / 12);

  const professionalTax   = getProfessionalTax(state, grossMonthly);

  // Income tax: use new regime on gross annual (most salaried people prefer new regime now)
  const taxInput: TaxInput = {
    grossIncome:          grossAnnual,
    age:                  30,
    hra:                  hraAnnual,
    rentPaid:             0,
    isMetro:              city === "metro",
    investments80C:       0,
    healthInsurance80D:   0,
    parentsInsurance80D:  0,
    parentsAreSenior:     false,
    npsContribution:      0,
    homeLoanInterest:     0,
  };

  const taxResult       = compareRegimes(taxInput);
  const incomeTaxAnnual = taxResult.newRegime.totalTax;
  const incomeTaxMonthly = Math.round(incomeTaxAnnual / 12);

  const totalDeductions = employeePF + professionalTax + incomeTaxMonthly;

  const inHandMonthly   = grossMonthly - totalDeductions;
  const inHandAnnual    = inHandMonthly * 12;
  const takeHomePercent = ctc > 0 ? Math.round((inHandAnnual / ctc) * 100) : 0;

  return {
    ctc,
    grossAnnual,
    grossMonthly,
    basicMonthly,
    basicAnnual,
    hra,
    hraAnnual,
    specialAllowance,
    specialAllowanceAnnual,
    employerPF,
    employerPFAnnual,
    employeePF,
    employeePFAnnual,
    professionalTax,
    incomeTaxMonthly,
    incomeTaxAnnual,
    totalDeductions,
    inHandMonthly,
    inHandAnnual,
    takeHomePercent,
  };
}
