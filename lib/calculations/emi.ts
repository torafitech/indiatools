/**
 * Calculate monthly EMI using standard reducing-balance formula: P * r * (1+r)^n / ((1+r)^n - 1)
 * @param principal - Loan amount in INR
 * @param annualRate - Annual interest rate as percentage (e.g. 8.5)
 * @param tenureMonths - Loan tenure in months
 */
export function calculateEMI(
  principal: number,
  annualRate: number,
  tenureMonths: number
): number {
  if (principal <= 0 || tenureMonths <= 0) return 0;
  if (annualRate === 0) return Math.round(principal / tenureMonths);
  const r = annualRate / 12 / 100;
  const emi =
    (principal * r * Math.pow(1 + r, tenureMonths)) /
    (Math.pow(1 + r, tenureMonths) - 1);
  return Math.round(emi);
}

export interface AmortizationRow {
  month: number;
  emi: number;
  principal: number;
  interest: number;
  balance: number;
}

export interface AmortizationYear {
  year: number;
  principalPaid: number;
  interestPaid: number;
  totalPaid: number;
  balance: number;
}

/**
 * Generate month-by-month amortization schedule.
 * Uses reducing balance: each month interest = balance * monthly_rate, principal = EMI - interest.
 */
export function generateAmortizationSchedule(
  principal: number,
  annualRate: number,
  tenureMonths: number
): AmortizationRow[] {
  const emi = calculateEMI(principal, annualRate, tenureMonths);
  const r = annualRate / 12 / 100;
  let balance = principal;
  const schedule: AmortizationRow[] = [];

  for (let month = 1; month <= tenureMonths; month++) {
    const interestPayment = Math.round(balance * r);
    const principalPayment = Math.min(Math.round(emi - interestPayment), balance);
    balance = Math.max(0, Math.round(balance - principalPayment));

    schedule.push({
      month,
      emi,
      principal: principalPayment,
      interest: interestPayment,
      balance,
    });
  }
  return schedule;
}

/**
 * Aggregate monthly amortization into year-by-year summary.
 */
export function getYearlyAmortization(schedule: AmortizationRow[]): AmortizationYear[] {
  const yearly: AmortizationYear[] = [];
  for (let y = 0; y < Math.ceil(schedule.length / 12); y++) {
    const months = schedule.slice(y * 12, (y + 1) * 12);
    yearly.push({
      year: y + 1,
      principalPaid: months.reduce((s, m) => s + m.principal, 0),
      interestPaid: months.reduce((s, m) => s + m.interest, 0),
      totalPaid: months.reduce((s, m) => s + m.emi, 0),
      balance: months[months.length - 1].balance,
    });
  }
  return yearly;
}

export interface PrepaymentResult {
  interestSaved: number;
  monthsSaved: number;
  newTenureMonths: number;
}

/**
 * Simulate paying extraMonthly on top of regular EMI.
 * Returns interest saved and months saved vs original schedule.
 */
export function calculatePrepaymentSavings(
  principal: number,
  annualRate: number,
  originalTenureMonths: number,
  extraMonthlyPayment: number
): PrepaymentResult {
  const emi = calculateEMI(principal, annualRate, originalTenureMonths);
  const r = annualRate / 12 / 100;
  const originalInterest = emi * originalTenureMonths - principal;

  let balance = principal;
  let months = 0;
  let interestPaid = 0;
  const totalPayment = emi + extraMonthlyPayment;

  while (balance > 1 && months < originalTenureMonths * 2) {
    const interestThisMonth = balance * r;
    const principalThisMonth = Math.min(totalPayment - interestThisMonth, balance);
    interestPaid += interestThisMonth;
    balance -= principalThisMonth;
    months++;
    if (balance <= 0) break;
  }

  return {
    interestSaved: Math.max(0, Math.round(originalInterest - interestPaid)),
    monthsSaved: Math.max(0, originalTenureMonths - months),
    newTenureMonths: months,
  };
}

export interface EMIResult {
  emi: number;
  totalInterest: number;
  totalAmount: number;
  interestPercent: number;
}

export function calculateEMISummary(
  principal: number,
  annualRate: number,
  tenureMonths: number
): EMIResult {
  const emi = calculateEMI(principal, annualRate, tenureMonths);
  const totalAmount = emi * tenureMonths;
  const totalInterest = totalAmount - principal;
  const interestPercent = Math.round((totalInterest / principal) * 100);
  return { emi, totalInterest, totalAmount, interestPercent };
}
