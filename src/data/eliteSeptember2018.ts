/** Setembro/2018 — planilha operacional Elite (#128–#227). */
import tradesJson from "./eliteSeptember2018Trades.json";
import { computeSignalPips } from "../elite/pips";
import type { HubMonthlyReport, HubOperation } from "../elite/mapToHub";

const REPORT_MONTH = "Setembro/2018";
const YEAR = 2018;
const MONTH_INDEX = 8;

export type September2018Trade = {
  signal: number;
  day: number;
  asset: string;
  direction: "Compra" | "Venda";
  entry: number | null;
  stop: number | null;
  take: number | null;
  pips: number;
};

export const september2018Trades = tradesJson as September2018Trade[];

function formatPipsLabel(pips: number): string {
  const sign = pips >= 0 ? "+" : "";
  const abs = Math.abs(pips);
  const body = Number.isInteger(abs) ? String(abs) : abs.toFixed(1).replace(/\.0$/, "");
  return `${sign}${body} pips`;
}

function closeOutcome(pips: number): "take" | "stop" | "manual" {
  if (pips > 0) return "take";
  if (pips < 0) return "stop";
  return "manual";
}

function pipsForStorage(pips: number): number {
  return Math.round(pips);
}

const totalPips = Math.round(september2018Trades.reduce((sum, t) => sum + t.pips, 0));

const topAssets = [...new Set(september2018Trades.map((t) => t.asset))].slice(0, 5);

export const eliteSeptember2018Monthly: HubMonthlyReport = {
  year: YEAR,
  month: "Setembro",
  monthIndex: MONTH_INDEX,
  signals: september2018Trades.length,
  result: `+${totalPips.toLocaleString("pt-BR")} pips`,
  pips: totalPips,
  status: "Finalizado",
  assets: topAssets.length ? topAssets : ["EUR/USD", "XAU/USD", "GBP/JPY"],
};

export function tradeToHubOperation(trade: September2018Trade): HubOperation {
  const outcome = closeOutcome(trade.pips);
  const storagePips = pipsForStorage(trade.pips);

  const levels = computeSignalPips({
    asset: trade.asset,
    direction: trade.direction,
    status: "closed",
    entry: trade.entry,
    take: trade.take,
    stop: trade.stop,
    closeOutcome: outcome === "manual" ? "manual" : outcome,
    manualPips: trade.pips,
  });

  return {
    asset: trade.asset,
    direction: trade.direction,
    status: "closed",
    result: formatPipsLabel(trade.pips),
    pips: storagePips,
    date: `${String(trade.day).padStart(2, "0")}/09/2018`,
    updatedAt: "Finalizado",
    reportMonth: REPORT_MONTH,
    signalNumber: trade.signal,
    entryPrice: trade.entry,
    takePrice: trade.take,
    stopPrice: trade.stop,
    takePips: levels.takePips,
    stopPips: levels.stopPips,
    signalTier: "elite",
  };
}

export const eliteSeptember2018HubOperations: HubOperation[] = september2018Trades.map(tradeToHubOperation);

export function september2018SqlValueRows(): string[] {
  return september2018Trades.map((t, index) => {
    const outcome = closeOutcome(t.pips);
    const storagePips = pipsForStorage(t.pips);
    const label = formatPipsLabel(t.pips).replace(/'/g, "''");
    const entry = t.entry != null ? t.entry : "null";
    const take = t.take != null ? t.take : "null";
    const stop = t.stop != null ? t.stop : "null";
    const day = String(t.day).padStart(2, "0");
    return `  ('${t.asset}', '${t.direction}', 'closed', ${storagePips}, '${label}', '${REPORT_MONTH}', '2018-09-${day}', 'Finalizado', ${index + 1}, true, '${outcome}', 'elite', ${t.signal}, ${entry}, ${take}, ${stop})`;
  });
}
