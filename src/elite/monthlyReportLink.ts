import { eliteReportPaths } from "../data/eliteReportPaths";
import type { Locale } from "../i18n";
import { monthSlug, parseReportMonth } from "./reportMonth";

export function monthlyReportHref(monthLabel: string, year: number): string {
  return `/historico/${monthSlug(monthLabel, year)}`;
}

export function monthlyReportHrefFromReportMonth(reportMonth: string): string | null {
  const parsed = parseReportMonth(reportMonth);
  if (!parsed) return null;
  return monthlyReportHref(parsed.month_label, parsed.year);
}
