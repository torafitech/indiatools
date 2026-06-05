/**
 * EPF corpus projection at retirement.
 * Compounds monthly contributions with annual EPF interest rate.
 * Both employee (12% of basic) and employer (12% of basic, split EPS + EPF) modelled.
 *
 * Employer EPS cap: 8.33% of ₹15,000 = ₹1,250/mo. Rest goes to EPF account.
 * Employee full 12% goes to PF account.
 */

export interface PFYearlySnapshot {
  year: number;
  age: number;
  basicMonthly: number;
  employeeContribution: number;
  employerContribution: number;
  interest: number;
  balance: number;
}

export interface PFCorpusResult {
  totalCorpus: number;
  totalEmployeeContribution: number;
  totalEmployerContribution: number;
  totalInterest: number;
  yearsToRetirement: number;
  yearlySnapshots: PFYearlySnapshot[];
  equivalentMonthlyPension: number;
}

const EPS_CEILING_BASIC = 15000;
const EPS_RATE = 0.0833;

/**
 * @param currentBasicMonthly - current monthly basic salary (INR)
 * @param currentAge - employee's current age
 * @param retirementAge - default 58 (EPF withdrawal age)
 * @param currentPFBalance - existing PF balance
 * @param annualSalaryGrowthPct - expected basic salary growth per year (%)
 * @param epfInterestRatePct - EPF annual interest rate (default 8.25%)
 */
export function calculatePFCorpus(
  currentBasicMonthly: number,
  currentAge: number,
  retirementAge: number,
  currentPFBalance: number,
  annualSalaryGrowthPct: number,
  epfInterestRatePct: number
): PFCorpusResult {
  const yearsToRetirement = Math.max(0, retirementAge - currentAge);
  const monthlyRate = epfInterestRatePct / 100 / 12;
  const annualGrowth = 1 + annualSalaryGrowthPct / 100;

  let balance = currentPFBalance;
  let totalEmployee = 0;
  let totalEmployer = 0;
  let totalInterest = 0;

  const yearlySnapshots: PFYearlySnapshot[] = [];

  let basicMonthly = currentBasicMonthly;

  for (let yr = 1; yr <= yearsToRetirement; yr++) {
    const yearStartBalance = balance;
    let yearEmployee = 0;
    let yearEmployer = 0;
    let yearInterest = 0;

    for (let m = 1; m <= 12; m++) {
      const empContrib = Math.round(basicMonthly * 0.12);
      const erEPFShare = Math.round(basicMonthly * 0.12 - Math.min(basicMonthly, EPS_CEILING_BASIC) * EPS_RATE);
      const interest = Math.round(balance * monthlyRate);

      balance += empContrib + erEPFShare + interest;
      yearEmployee += empContrib;
      yearEmployer += erEPFShare;
      yearInterest += interest;
    }

    totalEmployee += yearEmployee;
    totalEmployer += yearEmployer;
    totalInterest += yearInterest;

    yearlySnapshots.push({
      year: yr,
      age: currentAge + yr,
      basicMonthly: Math.round(basicMonthly),
      employeeContribution: yearEmployee,
      employerContribution: yearEmployer,
      interest: yearInterest,
      balance: Math.round(balance),
    });

    basicMonthly = basicMonthly * annualGrowth;
  }

  // Rough pension estimate: 4% SWR on corpus → annual withdrawal → monthly
  const equivalentMonthlyPension = Math.round((balance * 0.04) / 12);

  return {
    totalCorpus: Math.round(balance),
    totalEmployeeContribution: totalEmployee,
    totalEmployerContribution: totalEmployer,
    totalInterest: totalInterest,
    yearsToRetirement,
    yearlySnapshots,
    equivalentMonthlyPension,
  };
}
