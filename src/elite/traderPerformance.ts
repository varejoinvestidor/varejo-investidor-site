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
};

function parseOpDate(row: EliteOperationRow): Date | null {
  const raw = row.traded_on ?? row.updated_label;
  if (row.traded_on) {
    const d = new Date(row.traded_on);
    return Number.isNaN(d.getTime()) ? null : d;
  }
  return null;
}

function inWindow(
  date: Date | null,
  start: Date,
  end: Date,
  row: EliteOperationRow,
  period: PeriodKey,
): boolean {
  if (row.status === "active" && period !== "all") return true;
  if (date) return date >= start && date <= end;
  return period === "all";
}

function winRateLabel(wins: number, total: number): string {
  if (!total) return "—";
  return `${((wins / total) * 100).toFixed(1)}%`;
}

function summarize(rows: EliteOperationRow[], key: PeriodKey, label: string): PeriodPerformance {
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfWeek = new Date(startOfDay);
  startOfWeek.setDate(startOfWeek.getDate() - 6);
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const start =
    key === "day" ? startOfDay : key === "week" ? startOfWeek : key === "month" ? startOfMonth : new Date(2018, 0, 1);

  const scoped = rows.filter((row) => key === "all" || inWindow(parseOpDate(row), start, now, row, key));
  const closed = scoped.filter((r) => r.status === "closed");
  const wins = closed.filter((r) => resolveOperationPips(r).pips > 0).length;
  const pips = closed.reduce((s, r) => s + resolveOperationPips(r).pips, 0);

  return {
    key,
    label,
    operations: scoped.length,
    closed: closed.length,
    pips,
    winRate: winRateLabel(wins, closed.length),
  };
}

export function computeTraderPerformance(rows: EliteOperationRow[]): PeriodPerformance[] {
  const publicRows = rows.filter((r) => r.show_public);
  return [
    summarize(publicRows, "day", "Hoje"),
    summarize(publicRows, "week", "Últimos 7 dias"),
    summarize(publicRows, "month", "Mês atual"),
    summarize(publicRows, "all", "Histórico público"),
  ];
}
