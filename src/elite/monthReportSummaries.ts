import { resolveOperationPips } from "./resolveOperationPips";
import type { EliteMonthlyReportRow, EliteOperationRow } from "./types";

export type AssetMonthStat = {
  asset: string;
  operations: number;
  wins: number;
  losses: number;
  pips: number;
};

export type MonthReportSummary = {
  reportMonth: string;
  signals: number;
  closed: number;
  active: number;
  wins: number;
  losses: number;
  winRate: string;
  totalPips: number;
  totalPipsLabel: string;
  assets: string[];
  byAsset: AssetMonthStat[];
  bestAsset: string;
  worstAsset: string;
};

function winRateLabel(wins: number, total: number): string {
  if (!total) return "—";
  return `${((wins / total) * 100).toFixed(1)}%`;
}

function formatPipsLabel(pips: number): string {
  const sign = pips >= 0 ? "+" : "";
  const abs = Math.abs(pips);
  const body = Number.isInteger(abs)
    ? abs.toLocaleString("pt-BR")
    : abs.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  return `${sign}${body} pips`;
}

export function summarizeMonthOperations(
  reportMonth: string,
  operations: EliteOperationRow[],
  monthly: EliteMonthlyReportRow | null,
): MonthReportSummary {
  const scoped = operations.filter((o) => o.show_public && o.report_month === reportMonth);
  const closed = scoped.filter((o) => o.status === "closed");
  const active = scoped.filter((o) => o.status === "active");

  let wins = 0;
  let losses = 0;
  let totalPips = 0;
  const assetMap = new Map<string, AssetMonthStat>();

  for (const row of closed) {
    const resolved = resolveOperationPips(row);
    totalPips += resolved.pips;
    if (resolved.pips > 0) wins += 1;
    else if (resolved.pips < 0) losses += 1;

    const bucket =
      assetMap.get(row.asset) ??
      ({ asset: row.asset, operations: 0, wins: 0, losses: 0, pips: 0 } satisfies AssetMonthStat);
    bucket.operations += 1;
    bucket.pips += resolved.pips;
    if (resolved.pips > 0) bucket.wins += 1;
    else if (resolved.pips < 0) bucket.losses += 1;
    assetMap.set(row.asset, bucket);
  }

  const byAsset = Array.from(assetMap.values()).sort((a, b) => b.pips - a.pips);
  const assets = monthly?.assets?.length
    ? monthly.assets
    : Array.from(new Set(scoped.map((o) => o.asset)));

  const signals = monthly?.signals ?? scoped.length;
  const consolidatedPips = monthly?.pips ?? totalPips;
  const totalPipsLabel = monthly?.result_label?.trim() || formatPipsLabel(consolidatedPips);

  const bestAsset = byAsset[0]?.asset ?? "—";
  const worstAsset = byAsset.length ? byAsset[byAsset.length - 1]!.asset : "—";

  return {
    reportMonth,
    signals,
    closed: closed.length,
    active: active.length,
    wins,
    losses,
    winRate: winRateLabel(wins, closed.length),
    totalPips: consolidatedPips,
    totalPipsLabel,
    assets,
    byAsset,
    bestAsset,
    worstAsset,
  };
}
