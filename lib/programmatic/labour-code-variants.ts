import { getCurrentYear } from "@/lib/currentFY";

const year = getCurrentYear();

export interface LabourCodeVariant {
  slug: string;
  ctc: number;
  label: string;
  description: string;
}

export const labourCodeVariants: LabourCodeVariant[] = [
  { slug: "5-lpa",  ctc: 500000,   label: "5 LPA",  description: "New Labour Code impact on ₹5 LPA salary — PF and gratuity changes." },
  { slug: "8-lpa",  ctc: 800000,   label: "8 LPA",  description: "New Labour Code impact on ₹8 LPA salary — see take-home difference." },
  { slug: "10-lpa", ctc: 1000000,  label: "10 LPA", description: "New Labour Code impact on ₹10 LPA CTC — PF, gratuity, and take-home." },
  { slug: "12-lpa", ctc: 1200000,  label: "12 LPA", description: "New Labour Code impact on ₹12 LPA CTC — 50% basic rule explained." },
  { slug: "15-lpa", ctc: 1500000,  label: "15 LPA", description: `New Labour Code impact on ₹15 LPA salary in India ${year}.` },
  { slug: "18-lpa", ctc: 1800000,  label: "18 LPA", description: "New Labour Code impact on ₹18 LPA CTC — monthly take-home change." },
  { slug: "20-lpa", ctc: 2000000,  label: "20 LPA", description: "New Labour Code impact on ₹20 LPA salary — higher PF, lower take-home." },
  { slug: "25-lpa", ctc: 2500000,  label: "25 LPA", description: `New Labour Code impact on ₹25 LPA CTC in India ${year}.` },
  { slug: "30-lpa", ctc: 3000000,  label: "30 LPA", description: "New Labour Code impact on ₹30 LPA salary — PF corpus projection." },
  { slug: "35-lpa", ctc: 3500000,  label: "35 LPA", description: "New Labour Code impact on ₹35 LPA CTC — comparison old vs new structure." },
  { slug: "40-lpa", ctc: 4000000,  label: "40 LPA", description: `New Labour Code impact on ₹40 LPA salary in India ${year}.` },
  { slug: "50-lpa", ctc: 5000000,  label: "50 LPA", description: "New Labour Code impact on ₹50 LPA CTC — senior executive salary impact." },
];
