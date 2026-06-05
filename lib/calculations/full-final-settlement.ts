/**
 * Full & Final Settlement (F&F) calculator.
 * Computes all components payable on resignation/termination.
 *
 * Components:
 * 1. Pending salary (proportional to days worked in last month)
 * 2. Leave encashment: (monthly salary / 26) × pending earned leaves
 * 3. Gratuity (if service >= threshold per employment type)
 * 4. Notice pay: excess days paid TO employee, shortfall deducted FROM employee
 * 5. TDS estimate on gratuity above ₹20L at 30%
 */

import { calculateGratuity } from "./gratuity";

export interface FFSettlementResult {
  pendingSalary: number;
  leaveEncashment: number;
  gratuityAmount: number;
  gratuityTaxable: number;
  noticePay: number;
  noticePayLabel: string;
  totalGross: number;
  tdsEstimate: number;
  netFnF: number;
  serviceYears: number;
  isGratuityEligible: boolean;
  breakdown: { label: string; amount: number; type: "credit" | "debit" | "neutral" }[];
}

/**
 * @param lastDrawnBasicDA - basic + DA monthly (INR)
 * @param annualCTC - annual CTC for computing full monthly gross
 * @param joiningDate - ISO date string
 * @param lastWorkingDay - ISO date string
 * @param pendingLeaveDays - earned leave balance not availed
 * @param noticePeriodServedDays - actual notice served
 * @param requiredNoticeDays - contractual notice period
 * @param pendingSalaryDays - days of salary pending in current month
 * @param employmentType - for gratuity eligibility threshold
 */
export function calculateFFSettlement(
  lastDrawnBasicDA: number,
  annualCTC: number,
  joiningDate: string,
  lastWorkingDay: string,
  pendingLeaveDays: number,
  noticePeriodServedDays: number,
  requiredNoticeDays: number,
  pendingSalaryDays: number,
  employmentType: "permanent" | "fixed-term"
): FFSettlementResult {
  const joining = new Date(joiningDate);
  const leaving = new Date(lastWorkingDay);
  const msPerYear = 1000 * 60 * 60 * 24 * 365.25;
  const serviceYears = (leaving.getTime() - joining.getTime()) / msPerYear;

  const monthlySalary = Math.round(annualCTC / 12);
  const dailySalary = Math.round(monthlySalary / 26);

  const pendingSalary = pendingSalaryDays > 0 ? dailySalary * pendingSalaryDays : 0;
  const leaveEncashment = Math.round(dailySalary * pendingLeaveDays);

  const gratuityResult = calculateGratuity(
    lastDrawnBasicDA,
    serviceYears,
    employmentType,
    "covered"
  );
  const gratuityAmount = gratuityResult.gratuityAmount;
  const gratuityTaxable = gratuityResult.taxableAmount;

  const noticeDiff = noticePeriodServedDays - requiredNoticeDays;
  const noticePay = Math.round(dailySalary * Math.abs(noticeDiff));
  const noticePayLabel =
    noticeDiff > 0
      ? "Notice pay (excess served — payable to you)"
      : noticeDiff < 0
      ? "Notice pay shortfall (deducted from F&F)"
      : "Notice period served — no adjustment";

  const totalGross =
    pendingSalary +
    leaveEncashment +
    gratuityAmount +
    (noticeDiff > 0 ? noticePay : 0);

  const totalDebits = noticeDiff < 0 ? noticePay : 0;

  const tdsEstimate = Math.round(gratuityTaxable * 0.3);
  const netFnF = totalGross - totalDebits - tdsEstimate;

  const breakdown: FFSettlementResult["breakdown"] = [
    { label: "Pending Salary", amount: pendingSalary, type: "credit" },
    { label: "Leave Encashment", amount: leaveEncashment, type: "credit" },
    { label: "Gratuity", amount: gratuityAmount, type: "credit" },
  ];

  if (noticeDiff > 0) {
    breakdown.push({ label: "Notice Pay (excess)", amount: noticePay, type: "credit" });
  } else if (noticeDiff < 0) {
    breakdown.push({ label: "Notice Pay Shortfall", amount: noticePay, type: "debit" });
  }

  if (tdsEstimate > 0) {
    breakdown.push({ label: "TDS on Gratuity (30%)", amount: tdsEstimate, type: "debit" });
  }

  return {
    pendingSalary,
    leaveEncashment,
    gratuityAmount,
    gratuityTaxable,
    noticePay,
    noticePayLabel,
    totalGross,
    tdsEstimate,
    netFnF,
    serviceYears,
    isGratuityEligible: gratuityResult.isEligible,
    breakdown,
  };
}
