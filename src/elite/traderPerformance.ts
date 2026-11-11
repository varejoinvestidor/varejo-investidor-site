import { operationActivityTimestamp } from "./admin/sortOperations";
import { parseReportMonth } from "./reportMonth";
import { resolveOperationPips } from "./resolveOperationPips";
import type { EliteOperationRow } from "./types";

export type PeriodKey = "day" | "week" | "month" | "all";

export type PeriodPerformance = {
  key: PeriodKey;
  label: string;
  operations: number;
  closed: number;
  pips: number;
  winRate: string;
  signalsSent: number;
};

export type PeriodTrendPoint = {
  label: string;
  signals: number;
  closed: number;
  wins: number;
  winRate: number;
  pipsDelta: number;
  cumulativePips: number;
};

function winRateLabel(wins: number, total: number): string {
  if (!total) return "—";
  return `${((wins / total) * 100).toFixed(1)}%`;
}

function periodBounds(key: PeriodKey): { start: Date; end: Date } {
  const now = new Date();
  const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfWeek = new Date(startOfDay);
  startOfWeek.setDate(startOfWeek.getDate() - 6);
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const start =
    key === "day" ? startOfDay : key === "week" ? startOfWeek : key === "month" ? startOfMonth : new Date(2018, 0, 1);

  return { start, end };
}

function reportMonthOverlapsPeriod(row: EliteOperationRow, start: Date, end: Date): boolean {
  const parsed = parseReportMonth(row.report_month);
  if (!parsed) return false;
  const monthStart = new Date(parsed.year, parsed.month_index, 1);
  const monthEnd = new Date(parsed.year, parsed.month_index + 1, 0, 23, 59, 59, 999);
  return monthStart <= end && monthEnd >= start;
}

export function operationInPeriod(row: EliteOperationRow, key: PeriodKey): boolean {
  if (key === "all") return true;

  const { start, end } = periodBounds(key);
  const ts = operationActivityTimestamp(row);
  if (ts > 0) return ts >= start.getTime() && ts <= end.getTime();

  return reportMonthOverlapsPeriod(row, start, end);
}

function summarize(rows: EliteOperationRow[], key: PeriodKey, label: string): PeriodPerformance {
  const publicRows = rows.filter((r) => r.show_public);
  const scoped = publicRows.filter((row) => operationInPeriod(row, key));
  const closed = scoped.filter((r) => r.status === "closed");
  const wins = closed.filter((r) => resolveOperationPips(r).pips > 0).length;
  const pips = closed.reduce((s, r) => s + resolveOperationPips(r).pips, 0);

  return {
    key,
    label,
    operations: scoped.length,
    signalsSent: scoped.length,
    closed: closed.length,
    pips,
    winRate: winRateLabel(wins, closed.length),
  };
}

export function computeTraderPerformance(rows: EliteOperationRow[]): PeriodPerformance[] {
  return [
    summarize(rows, "day", "Hoje"),
    summarize(rows, "week", "Últimos 7 dias"),
    summarize(rows, "month", "Mês atual"),
    summarize(rows, "all", "Histórico público"),
  ];
}

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function formatDayLabel(d: Date) {
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`;
}

/** Série diária para gráfico (7 dias ou dias do mês até hoje). */
export function buildPeriodDailyTrend(rows: EliteOperationRow[], key: "week" | "month"): PeriodTrendPoint[] {
  const publicRows = rows.filter((r) => r.show_public);
  const { start, end } = periodBounds(key);

  const days: Date[] = [];
  for (let cursor = startOfDay(start); cursor <= end; cursor = new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate() + 1)) {
    days.push(new Date(cursor));
  }

  let cumulativePips = 0;
  const points: PeriodTrendPoint[] = [];

  for (const day of days) {
    const dayStart = new Date(day.getFullYear(), day.getMonth(), day.getDate());
    const dayEnd = new Date(day.getFullYear(), day.getMonth(), day.getDate(), 23, 59, 59, 999);

    const inDay = publicRows.filter((row) => {
      const ts = operationActivityTimestamp(row);
      if (ts > 0) return ts >= dayStart.getTime() && ts <= dayEnd.getTime();
      if (key !== "month") return false;
      const parsed = parseReportMonth(row.report_month);
      if (!parsed) return false;
      return parsed.year === day.getFullYear() && parsed.month_index === day.getMonth();
    });

    const closed = inDay.filter((r) => r.status === "closed");
    const wins = closed.filter((r) => resolveOperationPips(r).pips > 0).length;
    const pipsDelta = closed.reduce((s, r) => s + resolveOperationPips(r).pips, 0);
    cumulativePips += pipsDelta;

    points.push({
      label: formatDayLabel(day),
      signals: inDay.length,
      closed: closed.length,
      wins,
      winRate: closed.length ? (wins / closed.length) * 100 : 0,
      pipsDelta,
      cumulativePips,
    });
  }

  return points;
}
