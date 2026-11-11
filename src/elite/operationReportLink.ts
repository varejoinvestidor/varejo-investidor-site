import { eliteReportPaths } from "../data/eliteReportPaths";
import type { Locale } from "../i18n";
import { monthlyReportHrefFromReportMonth } from "./monthlyReportLink";

/** Extrai o ano de `Maio/2026`, `11/2026`, etc. */
export function yearFromReportMonth(reportMonth: string): string | null {
  const parts = reportMonth.split("/").map((p) => p.trim()).filter(Boolean);
  if (parts.length < 2) return null;
  const year = parts[parts.length - 1];
  return /^\d{4}$/.test(year) ? year : null;
}

/** Página do relatório mensal (`/historico/janeiro-2024`) ou hub Elite. */
export function operationReportHref(reportMonth: string, locale: Locale): string {
  const monthly = monthlyReportHrefFromReportMonth(reportMonth);
  if (monthly) return monthly;
  const base = eliteReportPaths[locale] ?? eliteReportPaths.pt;
  return `${base}#historico-resultados`;
}
