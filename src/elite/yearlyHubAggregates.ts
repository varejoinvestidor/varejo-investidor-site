import { parseReportMonth } from "./reportMonth";

type OpLike = { reportMonth: string; pips?: number };
type MonthLike = { year: number; signals: number; pips: number; status: string };

const HISTORIC_FIRST_YEAR = 2018;

export function historicYears(untilYear = new Date().getFullYear()): number[] {
  const end = Math.max(untilYear, HISTORIC_FIRST_YEAR);
  return Array.from({ length: end - HISTORIC_FIRST_YEAR + 1 }, (_, i) => HISTORIC_FIRST_YEAR + i);
}

export function yearFromReportMonth(reportMonth: string): number | null {
  return parseReportMonth(reportMonth)?.year ?? null;
}

export function aggregateSignalsByYear(completed: OpLike[], monthly: MonthLike[]): Map<number, number> {
  const map = new Map<number, number>();
  for (const op of completed) {
    const y = yearFromReportMonth(op.reportMonth);
    if (y == null) continue;
    map.set(y, (map.get(y) ?? 0) + 1);
  }
  for (const m of monthly) {
    if (m.status === "Finalizado" && m.pips > 0) {
      map.set(m.year, Math.max(map.get(m.year) ?? 0, m.signals));
    } else if ((map.get(m.year) ?? 0) === 0) {
      map.set(m.year, (map.get(m.year) ?? 0) + m.signals);
    }
  }
  return map;
}

export function aggregatePipsByYear(completed: OpLike[], monthly: MonthLike[]): Map<number, number> {
  const fromOps = new Map<number, number>();
  for (const op of completed) {
    const y = yearFromReportMonth(op.reportMonth);
    if (y == null) continue;
    fromOps.set(y, (fromOps.get(y) ?? 0) + (op.pips ?? 0));
  }

  const fromMonthly = new Map<number, number>();
  for (const m of monthly) {
    if (m.pips !== 0) {
      fromMonthly.set(m.year, (fromMonthly.get(m.year) ?? 0) + m.pips);
    }
  }

  const years = Array.from(
    new Set([...Array.from(fromOps.keys()), ...Array.from(fromMonthly.keys())]),
  );
  const out = new Map<number, number>();
  for (const y of years) {
    const opSum = fromOps.get(y) ?? 0;
    const monthSum = fromMonthly.get(y) ?? 0;
    out.set(y, opSum > 0 ? opSum : monthSum);
  }
  return out;
}

export function buildCumulativePerformanceByYear(
  completed: OpLike[],
  monthly: MonthLike[],
  years = historicYears(),
): { year: number; value: number; signals: number; yearPips: number }[] {
  const pipsByYear = aggregatePipsByYear(completed, monthly);
  const signalsByYear = aggregateSignalsByYear(completed, monthly);

  let accumulated = 0;
  return years.map((year) => {
    const yearPips = Math.round((pipsByYear.get(year) ?? 0) * 10) / 10;
    accumulated += yearPips;
    return {
      year,
      value: Math.round(accumulated),
      signals: signalsByYear.get(year) ?? 0,
      yearPips,
    };
  });
}
