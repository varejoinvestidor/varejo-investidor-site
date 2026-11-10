import { formatPipsDisplay } from "./pips";
import { parseReportMonth } from "./reportMonth";
import { resolveOperationPips } from "./resolveOperationPips";
import type { EliteMonthlyReportRow, EliteOperationRow } from "./types";

export type LinePoint = { label: string; cumulative: number; delta: number };
export type BarPoint = { label: string; pips: number; signals: number };
export type PieSlice = { label: string; value: number; color: string };

const PIE_COLORS = {
  take: "#0f8f56",
  stop: "#c94a4a",
  manual: "#c6994a",
  active: "#6b8cce",
};

function sortClosedForTimeline(a: EliteOperationRow, b: EliteOperationRow): number {
  const da = a.traded_on ?? "";
  const db = b.traded_on ?? "";
  if (da && db && da !== db) return da.localeCompare(db);
  if (da && !db) return -1;
  if (!da && db) return 1;
  return (a.signal_number ?? 0) - (b.signal_number ?? 0);
}

export function listOperationYears(ops: EliteOperationRow[]): number[] {
  const years = new Set<number>();
  for (const o of ops) {
    if (!o.show_public) continue;
    const parsed = parseReportMonth(o.report_month);
    if (parsed) years.add(parsed.year);
    const y = o.traded_on?.slice(0, 4);
    if (y && /^\d{4}$/.test(y)) years.add(Number(y));
  }
  return Array.from(years).sort((a, b) => b - a);
}

export function filterOperationsByYear(ops: EliteOperationRow[], year: number | "all"): EliteOperationRow[] {
  if (year === "all") return ops;
  return ops.filter((o) => {
    const parsed = parseReportMonth(o.report_month);
    if (parsed?.year === year) return true;
    const y = o.traded_on?.slice(0, 4);
    return y === String(year);
  });
}

export function filterMonthlyByYear(monthly: EliteMonthlyReportRow[], year: number | "all"): EliteMonthlyReportRow[] {
  if (year === "all") return monthly;
  return monthly.filter((m) => m.year === year);
}

export function downsampleLinePoints(data: LinePoint[], maxPoints = 40): LinePoint[] {
  if (data.length <= maxPoints) return data;
  const out: LinePoint[] = [];
  const step = (data.length - 1) / (maxPoints - 1);
  for (let i = 0; i < maxPoints; i++) {
    const idx = Math.round(i * step);
    out.push(data[idx]);
  }
  return out;
}

export function buildCumulativePipsLine(ops: EliteOperationRow[]): LinePoint[] {
  const closed = ops
    .filter((o) => o.show_public && o.status === "closed")
    .slice()
    .sort(sortClosedForTimeline);

  let cumulative = 0;
  return closed.map((o, index) => {
    const pip = resolveOperationPips(o).pips;
    cumulative += pip;
    const label =
      o.traded_on?.slice(5) ??
      (o.signal_number != null ? `S${o.signal_number}` : `${index + 1}`);
    return { label, cumulative, delta: pip };
  });
}

/** Barras por mês do relatório (`report_month`), mesma base dos cards de desempenho. */
export function aggregateMonthlyPipsFromOperations(ops: EliteOperationRow[]): BarPoint[] {
  const publicOps = ops.filter((r) => r.show_public);
  const map = new Map<string, BarPoint & { sortKey: number }>();

  for (const o of publicOps) {
    const parsed = parseReportMonth(o.report_month);
    if (!parsed) continue;
    const key = `${parsed.year}-${parsed.month_index}`;
    const label = `${parsed.month_label}/${String(parsed.year).slice(-2)}`;
    const sortKey = parsed.year * 12 + parsed.month_index;
    const bucket = map.get(key) ?? { label, pips: 0, signals: 0, sortKey };
    bucket.signals += 1;
    if (o.status === "closed") bucket.pips += resolveOperationPips(o).pips;
    map.set(key, bucket);
  }

  return Array.from(map.values())
    .sort((a, b) => a.sortKey - b.sortKey)
    .slice(-12)
    .map(({ label, pips, signals }) => ({
      label,
      pips: Math.round(pips * 10) / 10,
      signals,
    }));
}

export function buildMonthlyPipsBarsFromReports(monthly: EliteMonthlyReportRow[]): BarPoint[] {
  return monthly
    .slice()
    .sort((a, b) => a.year - b.year || a.month_index - b.month_index)
    .slice(-24)
    .map((m) => ({
      label: `${m.month_label}/${String(m.year).slice(-2)}`,
      pips: m.pips,
      signals: m.signals,
    }));
}

export function buildMonthlyPipsBars(
  monthly: EliteMonthlyReportRow[],
  ops: EliteOperationRow[],
  options?: { limitMonths?: number },
): BarPoint[] {
  const limit = options?.limitMonths ?? 24;
  if (monthly.length) {
    return buildMonthlyPipsBarsFromReports(monthly).slice(-limit);
  }
  const fromOps = aggregateMonthlyPipsFromOperations(ops);
  return fromOps.slice(-limit);
}

export function buildTradeOutcomePie(ops: EliteOperationRow[]): PieSlice[] {
  const publicOps = ops.filter((o) => o.show_public);
  let take = 0;
  let stop = 0;
  let manual = 0;
  let active = 0;

  for (const o of publicOps) {
    if (o.status === "active") {
      active += 1;
      continue;
    }
    const pip = resolveOperationPips(o).pips;
    if (o.close_outcome === "take") take += 1;
    else if (o.close_outcome === "stop") stop += 1;
    else if (o.close_outcome === "manual") manual += 1;
    else if (pip > 0) take += 1;
    else if (pip < 0) stop += 1;
    else manual += 1;
  }

  const slices: PieSlice[] = [];
  if (take) slices.push({ label: "Take", value: take, color: PIE_COLORS.take });
  if (stop) slices.push({ label: "Stop", value: stop, color: PIE_COLORS.stop });
  if (manual) slices.push({ label: "Manual / neutro", value: manual, color: PIE_COLORS.manual });
  if (active) slices.push({ label: "Em andamento", value: active, color: PIE_COLORS.active });
  return slices;
}

export { formatPipsDisplay };
