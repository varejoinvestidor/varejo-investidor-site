import { normalizedEliteReports } from "../data/eliteReports";
import { mapOperations } from "./mapToHub";
import { monthSlug, parseMonthSlug, formatReportMonth } from "./reportMonth";
import { reconcileMonthlyFromOperations } from "./reconcileMonthly";
import { fetchPublicEliteData } from "./queries";
import { summarizeMonthOperations } from "./monthReportSummaries";
import type { EliteMonthlyReportRow, EliteOperationRow } from "./types";

export type MonthReportPageData = {
  slug: string;
  monthLabel: string;
  monthIndex: number;
  year: number;
  statusLabel: string;
  monthly: EliteMonthlyReportRow | null;
  operations: EliteOperationRow[];
  summary: ReturnType<typeof summarizeMonthOperations>;
};

export async function loadMonthReportPage(slug: string): Promise<MonthReportPageData | null> {
  const parsed = parseMonthSlug(slug);
  if (!parsed) return null;

  const reportMonth = formatReportMonth(parsed.month_label, parsed.year);
  const remote = await fetchPublicEliteData();

  let monthly: EliteMonthlyReportRow | null = null;
  let operations: EliteOperationRow[] = [];

  if (remote) {
    const reconciled = reconcileMonthlyFromOperations(remote.monthly, remote.operations);
    monthly =
      reconciled.find((m) => m.year === parsed.year && m.month_index === parsed.month_index) ??
      remote.monthly.find((m) => m.year === parsed.year && m.month_index === parsed.month_index) ??
      null;
    operations = remote.operations.filter((o) => o.show_public && o.report_month === reportMonth);
  }

  const summary = summarizeMonthOperations(reportMonth, operations, monthly);

  return {
    slug: monthSlug(parsed.month_label, parsed.year),
    monthLabel: parsed.month_label,
    monthIndex: parsed.month_index,
    year: parsed.year,
    statusLabel: monthly?.status_label ?? (summary.active > 0 ? "Em andamento" : "Finalizado"),
    monthly,
    operations,
    summary,
  };
}

export function isAnnualHistoricoSlug(slug: string): boolean {
  return /^\d{4}$/.test(slug);
}

/** Pre-build slugs when Supabase is available at build time. */
export async function listHistoricoStaticSlugs(): Promise<string[]> {
  const years = normalizedEliteReports.map((r) => r.year);
  const remote = await fetchPublicEliteData();
  const months =
    remote?.monthly.map((m) => monthSlug(m.month_label, m.year)) ?? [];
  return [...years, ...months];
}

export { mapOperations };
