import { computeSignalPips } from "./pips";
import type { EliteMonthlyReportRow, EliteOperationRow } from "./types";

export type HubOperation = {
  asset: string;
  direction: "Compra" | "Venda";
  status: "active" | "closed";
  result: string;
  pips: number;
  date: string;
  updatedAt: string;
  reportMonth: string;
  signalNumber: number | null;
  entryPrice: number | null;
  takePrice: number | null;
  stopPrice: number | null;
  takePips: number;
  stopPips: number;
};

export type HubMonthlyReport = {
  year: number;
  month: string;
  monthIndex: number;
  signals: number;
  result: string;
  pips: number;
  status: string;
  assets: string[];
};

export function mapOperations(rows: EliteOperationRow[]): { active: HubOperation[]; closed: HubOperation[] } {
  const toHub = (row: EliteOperationRow): HubOperation => {
    const levels = computeSignalPips({
      asset: row.asset,
      direction: row.direction,
      status: row.status,
      entry: row.entry_price,
      take: row.take_price,
      stop: row.stop_price,
      closeOutcome: row.close_outcome,
      manualPips: row.result_pips,
    });
    return {
      asset: row.asset,
      direction: row.direction,
      status: row.status,
      result: row.result_label,
      pips: row.result_pips,
      date: row.report_month,
      updatedAt: row.updated_label,
      reportMonth: row.report_month,
      signalNumber: row.signal_number ?? null,
      entryPrice: row.entry_price,
      takePrice: row.take_price,
      stopPrice: row.stop_price,
      takePips: levels.takePips,
      stopPips: levels.stopPips,
    };
  };

  return {
    active: rows.filter((r) => r.status === "active").map(toHub),
    closed: rows.filter((r) => r.status === "closed").map(toHub),
  };
}

export function mapMonthly(rows: EliteMonthlyReportRow[]): HubMonthlyReport[] {
  return rows.map((row) => ({
    year: row.year,
    month: row.month_label,
    monthIndex: row.month_index,
    signals: row.signals,
    result: row.result_label,
    pips: row.pips,
    status: row.status_label,
    assets: row.assets ?? [],
  }));
}

export function aggregateStats(closed: HubOperation[], monthly: HubMonthlyReport[]) {
  const totalSignals = monthly.reduce((s, m) => s + m.signals, 0);
  const totalPips = closed.reduce((s, o) => s + o.pips, 0) + monthly.reduce((s, m) => s + m.pips, 0);
  const wins = closed.filter((o) => o.pips > 0).length;
  const winRate = closed.length ? `${((wins / closed.length) * 100).toFixed(1)}%` : "—";

  return {
    totalSignals: totalSignals || 4500,
    totalPips,
    winRate,
    closedCount: closed.length,
  };
}
