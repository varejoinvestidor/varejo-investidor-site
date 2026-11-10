import { normalizedEliteReports } from "../data/eliteReports";
import { eliteReportPaths } from "../data/eliteReportPaths";
import type { Locale } from "../i18n";

/** Extrai o ano de `Maio/2026`, `11/2026`, etc. */
export function yearFromReportMonth(reportMonth: string): string | null {
  const parts = reportMonth.split("/").map((p) => p.trim()).filter(Boolean);
  if (parts.length < 2) return null;
  const year = parts[parts.length - 1];
  return /^\d{4}$/.test(year) ? year : null;
}

/** Link do relatório anual (PDF histórico) ou fallback para o painel no hub Elite. */
export function operationReportHref(reportMonth: string, locale: Locale): string {
  const year = yearFromReportMonth(reportMonth);
  if (year && normalizedEliteReports.some((report) => report.year === year)) {
    return `/historico/${year}`;
  }
  const base = eliteReportPaths[locale] ?? eliteReportPaths.pt;
  return `${base}#historico-resultados`;
}
