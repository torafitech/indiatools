import { compareRegimes, TaxInput } from "@/lib/calculations/incometax";
import { getProfessionalTax } from "@/data/states";

export interface LabourCodeComparison {
  ctc: number;
  // Old structure (basic = 40% of CTC)
  old: {
    basicMonthly: number;
    basicPct: number;
    employeePFMonthly: number;
    employerPFMonthly: number;
    gratuityMonthly: number;
    grossMonthly: number;
    inHandMonthly: number;
    annualPFCorpus: number;
    annualGratuity: number;
  };
  // New Labour Code (basic = max(current, 50% of CTC))
  new: {
    basicMonthly: number;
    basicPct: number;
    employeePFMonthly: number;
    employerPFMonthly: number;
    gratuityMonthly: number;
    grossMonthly: number;
    inHandMonthly: number;
    annualPFCorpus: number;
    annualGratuity: number;
  };
  inHandDiff: number;
  pfDiff: number;
  gratuityDiffPerYear: number;
  basicIncrease: boolean;
}

/**
 * Calculate salary impact of New Labour Code (Code on Social Security 2020, eff. Nov 2025).
 * New rule: basic salary must be >= 50% of CTC.
 * Higher basic → higher PF + gratuity → lower take-home.
 *
 * Gratuity accrual/month = (15/26) × (basic/12) using standard actuarial formula.
 * PF = 12% of basic each (employee + employer).
 */
export function calculateLabourCodeImpact(
  ctc: number,
  currentBasicPct: number,
  state: string,
  city: "metro" | "non-metro"
): LabourCodeComparison {
  const ctcMonthly = ctc / 12;

  function computeSide(basicPct: number) {
    const basicAnnual    = Math.round(ctc * basicPct / 100);
    const basicMonthly   = Math.round(basicAnnual / 12);
    const hraRate        = city === "metro" ? 0.5 : 0.4;
    const hraAnnual      = Math.round(basicAnnual * hraRate);
    const hra            = Math.round(hraAnnual / 12);
    const employerPFAnnual = Math.round(basicAnnual * 0.12);
    const employerPF     = Math.round(employerPFAnnual / 12);
    const specialAnnual  = Math.max(0, ctc - basicAnnual - hraAnnual - employerPFAnnual);
    const special        = Math.round(specialAnnual / 12);
    const grossAnnual    = basicAnnual + hraAnnual + specialAnnual;
    const grossMonthly   = Math.round(grossAnnual / 12);
    const employeePF     = Math.round(basicAnnual * 0.12 / 12);
    const pt             = getProfessionalTax(state, grossMonthly);
    const taxInput: TaxInput = {
      grossIncome: grossAnnual, age: 30, hra: hraAnnual, rentPaid: 0,
      isMetro: city === "metro", investments80C: 0, healthInsurance80D: 0,
      parentsInsurance80D: 0, parentsAreSenior: false, npsContribution: 0,
      homeLoanInterest: 0,
    };
    const tax = compareRegimes(taxInput).newRegime.totalTax;
    const taxMonthly = Math.round(tax / 12);
    const inHand = grossMonthly - employeePF - pt - taxMonthly;
    const gratuityMonthly = Math.round((15 / 26) * basicMonthly / 12);
    const annualPF = (employeePF + employerPF) * 12;
    const annualGratuity = gratuityMonthly * 12;

    return {
      basicMonthly,
      basicPct,
      employeePFMonthly: employeePF,
      employerPFMonthly: employerPF,
      gratuityMonthly,
      grossMonthly,
      inHandMonthly: inHand,
      annualPFCorpus: annualPF,
      annualGratuity,
    };
  }

  const newBasicPct = Math.max(currentBasicPct, 50);
  const old = computeSide(currentBasicPct);
  const neu = computeSide(newBasicPct);

  return {
    ctc,
    old,
    new: neu,
    inHandDiff: neu.inHandMonthly - old.inHandMonthly,
    pfDiff: (neu.employeePFMonthly + neu.employerPFMonthly) - (old.employeePFMonthly + old.employerPFMonthly),
    gratuityDiffPerYear: (neu.gratuityMonthly - old.gratuityMonthly) * 12,
    basicIncrease: newBasicPct > currentBasicPct,
  };
}
