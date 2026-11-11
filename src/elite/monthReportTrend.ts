import { operationActivityTimestamp } from "./admin/sortOperations";
import { parseReportMonth } from "./reportMonth";
import { resolveOperationPips } from "./resolveOperationPips";
import type { PeriodTrendPoint } from "./traderPerformance";
import type { EliteOperationRow } from "./types";

export type MonthTrendRange = "day" | "week" | "month";

function scopedMonthOps(ops: EliteOperationRow[], year: number, monthIndex: number) {
  return ops.filter((o) => {
    if (!o.show_public) return false;
    const parsed = parseReportMonth(o.report_month);
    return parsed?.year === year && parsed?.month_index === monthIndex;
  });
}

function monthBounds(year: number, monthIndex: number) {
  const start = new Date(year, monthIndex, 1);
  const end = new Date(year, monthIndex + 1, 0, 23, 59, 59, 999);
  return { start, end, daysInMonth: end.getDate() };
}

function formatDay(d: Date) {
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`;
}

/** Tendência dentro do mês do relatório: por trade (dia), por semana ou por dia civil. */
export function buildMonthScopedTrend(
  ops: EliteOperationRow[],
  year: number,
  monthIndex: number,
  range: MonthTrendRange,
): PeriodTrendPoint[] {
  const rows = scopedMonthOps(ops, year, monthIndex);
  const closed = rows.filter((r) => r.status === "closed").slice().sort((a, b) => {
    const ta = operationActivityTimestamp(a);
    const tb = operationActivityTimestamp(b);
    if (ta && tb && ta !== tb) return ta - tb;
    return (a.signal_number ?? 0) - (b.signal_number ?? 0);
  });

  if (range === "day") {
    let cumulativePips = 0;
    return closed.map((row, index) => {
      const pips = resolveOperationPips(row).pips;
      cumulativePips += pips;
      const wins = pips > 0 ? 1 : 0;
      const label =
        row.traded_on?.slice(8, 10) && row.traded_on?.slice(5, 7)
          ? `${row.traded_on.slice(8, 10)}/${row.traded_on.slice(5, 7)}`
          : row.signal_number != null
            ? `#${row.signal_number}`
            : `Op ${index + 1}`;
      return {
        label,
        signals: 1,
        closed: 1,
        wins,
        winRate: wins * 100,
        pipsDelta: pips,
        cumulativePips,
      };
    });
  }

  if (range === "week") {
    const { start, end } = monthBounds(year, monthIndex);
    const buckets = new Map<number, PeriodTrendPoint>();
    let cursor = new Date(start);
    let week = 1;
    while (cursor <= end) {
      buckets.set(week, {
        label: `Sem ${week}`,
        signals: 0,
        closed: 0,
        wins: 0,
        winRate: 0,
        pipsDelta: 0,
        cumulativePips: 0,
      });
      cursor = new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate() + 7);
      week += 1;
    }

    for (const row of rows) {
      const ts = operationActivityTimestamp(row);
      const day = ts > 0 ? new Date(ts) : new Date(year, monthIndex, 15);
      const weekIndex = Math.min(Math.floor((day.getDate() - 1) / 7) + 1, buckets.size || 1);
      const bucket = buckets.get(weekIndex) ?? buckets.values().next().value!;
      bucket.signals += 1;
      if (row.status === "closed") {
        bucket.closed += 1;
        const pips = resolveOperationPips(row).pips;
        bucket.pipsDelta += pips;
        if (pips > 0) bucket.wins += 1;
      }
    }

    let cumulative = 0;
    return Array.from(buckets.entries())
      .sort((a, b) => a[0] - b[0])
      .map(([, point]) => {
        cumulative += point.pipsDelta;
        const winRate = point.closed ? (point.wins / point.closed) * 100 : 0;
        return { ...point, cumulativePips: cumulative, winRate };
      });
  }

  const { start, daysInMonth } = monthBounds(year, monthIndex);
  let cumulativePips = 0;
  const points: PeriodTrendPoint[] = [];

  for (let d = 0; d < daysInMonth; d++) {
    const day = new Date(start.getFullYear(), start.getMonth(), start.getDate() + d);
    const dayStart = new Date(day.getFullYear(), day.getMonth(), day.getDate());
    const dayEnd = new Date(day.getFullYear(), day.getMonth(), day.getDate(), 23, 59, 59, 999);

    const inDay = rows.filter((row) => {
      const ts = operationActivityTimestamp(row);
      if (ts > 0) return ts >= dayStart.getTime() && ts <= dayEnd.getTime();
      return false;
    });

    const closedInDay = inDay.filter((r) => r.status === "closed");
    const wins = closedInDay.filter((r) => resolveOperationPips(r).pips > 0).length;
    const pipsDelta = closedInDay.reduce((s, r) => s + resolveOperationPips(r).pips, 0);
    cumulativePips += pipsDelta;

    points.push({
      label: formatDay(day),
      signals: inDay.length,
      closed: closedInDay.length,
      wins,
      winRate: closedInDay.length ? (wins / closedInDay.length) * 100 : 0,
      pipsDelta,
      cumulativePips,
    });
  }

  return points;
}
