/**
 * LinkedIn X-Ray search query builder.
 *
 * Builds Google `site:linkedin.com/in` boolean queries — the "X-ray search"
 * technique for finding public, Google-indexed LinkedIn profiles without
 * using LinkedIn's own (rate-limited, login-walled) search.
 */

export interface PeopleSearchInput {
  jobTitles: string;
  location: string;
  company?: string;
  keyword?: string;
  excludeJobPostings: boolean;
}

export interface AlumniSearchInput {
  school: string;
  role?: string;
  location?: string;
}

const JOB_POSTING_EXCLUSIONS = '-intitle:"jobs" -intitle:"hiring" -intitle:"vacancy"';

function cleanQuote(value: string): string | null {
  const trimmed = value.trim().replace(/"/g, '\\"');
  return trimmed.length > 0 ? trimmed : null;
}

function splitSynonyms(value: string): string[] {
  return value
    .split(",")
    .map((v) => cleanQuote(v))
    .filter((v): v is string => v !== null);
}

export function buildPeopleSearchQuery(input: PeopleSearchInput): string {
  const parts: string[] = ["site:linkedin.com/in"];

  const titles = splitSynonyms(input.jobTitles);
  if (titles.length > 0) {
    const orGroup = titles.map((t) => `"${t}"`).join(" OR ");
    parts.push(titles.length > 1 ? `(${orGroup})` : orGroup);
  }

  const location = cleanQuote(input.location ?? "");
  if (location) parts.push(`"${location}"`);

  const company = cleanQuote(input.company ?? "");
  if (company) parts.push(`"${company}"`);

  const keyword = cleanQuote(input.keyword ?? "");
  if (keyword) parts.push(`"${keyword}"`);

  if (input.excludeJobPostings) parts.push(JOB_POSTING_EXCLUSIONS);

  return parts.join(" ");
}

export function buildAlumniSearchQuery(input: AlumniSearchInput): string {
  const parts: string[] = ["site:linkedin.com/in"];

  const school = cleanQuote(input.school ?? "");
  if (school) parts.push(`"${school}"`);

  const role = cleanQuote(input.role ?? "");
  if (role) parts.push(`"${role}"`);

  const location = cleanQuote(input.location ?? "");
  if (location) parts.push(`"${location}"`);

  return parts.join(" ");
}
