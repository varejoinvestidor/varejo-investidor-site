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

export function buildCumulativePipsLine(ops: EliteOperationRow[]): LinePoint[] {
  const closed = ops
    .filter((o) => o.show_public && o.status === "closed")
    .slice()
    .sort((a, b) => (a.traded_on ?? "").localeCompare(b.traded_on ?? ""));

  let cumulative = 0;
  return closed.map((o, index) => {
    cumulative += o.result_pips;
    const label =
      o.traded_on?.slice(5) ??
      (o.signal_number != null ? `S${o.signal_number}` : `${index + 1}`);
    return { label, cumulative, delta: o.result_pips };
  });
}

export function buildMonthlyPipsBars(monthly: EliteMonthlyReportRow[], ops: EliteOperationRow[]): BarPoint[] {
  if (monthly.length) {
    return monthly
      .slice()
      .sort((a, b) => a.year - b.year || a.month_index - b.month_index)
      .slice(-12)
      .map((m) => ({
        label: `${m.month_label}/${String(m.year).slice(-2)}`,
        pips: m.pips,
        signals: m.signals,
      }));
  }

  const byMonth = new Map<string, { pips: number; signals: number }>();
  for (const o of ops.filter((r) => r.show_public)) {
    const key = o.report_month || "—";
    const bucket = byMonth.get(key) ?? { pips: 0, signals: 0 };
    bucket.signals += 1;
    if (o.status === "closed") bucket.pips += o.result_pips;
    byMonth.set(key, bucket);
  }

  return Array.from(byMonth.entries())
    .slice(-12)
    .map(([label, v]) => ({ label, pips: v.pips, signals: v.signals }));
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
    if (o.close_outcome === "take") take += 1;
    else if (o.close_outcome === "stop") stop += 1;
    else if (o.close_outcome === "manual") manual += 1;
    else if (o.result_pips > 0) take += 1;
    else if (o.result_pips < 0) stop += 1;
    else manual += 1;
  }

  const slices: PieSlice[] = [];
  if (take) slices.push({ label: "Take", value: take, color: PIE_COLORS.take });
  if (stop) slices.push({ label: "Stop", value: stop, color: PIE_COLORS.stop });
  if (manual) slices.push({ label: "Manual / neutro", value: manual, color: PIE_COLORS.manual });
  if (active) slices.push({ label: "Em andamento", value: active, color: PIE_COLORS.active });
  return slices;
}
