/** Agosto/2018 — planilha operacional Elite (#16–#127). */
import tradesJson from "./eliteAugust2018Trades.json";
import { computeSignalPips } from "../elite/pips";
import type { HubMonthlyReport, HubOperation } from "../elite/mapToHub";

const REPORT_MONTH = "Agosto/2018";
const YEAR = 2018;
const MONTH_INDEX = 7;

export type August2018Trade = {
  signal: number;
  day: number;
  asset: string;
  direction: "Compra" | "Venda";
  entry: number | null;
  stop: number | null;
  take: number | null;
  pips: number;
};

export const august2018Trades = tradesJson as August2018Trade[];

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

const totalPips = Math.round(august2018Trades.reduce((sum, t) => sum + t.pips, 0));

const topAssets = [...new Set(august2018Trades.map((t) => t.asset))].slice(0, 5);

export const eliteAugust2018Monthly: HubMonthlyReport = {
  year: YEAR,
  month: "Agosto",
  monthIndex: MONTH_INDEX,
  signals: august2018Trades.length,
  result: `+${totalPips.toLocaleString("pt-BR")} pips`,
  pips: totalPips,
  status: "Finalizado",
  assets: topAssets.length ? topAssets : ["XAU/USD", "EUR/USD", "GBP/JPY"],
};

export function tradeToHubOperation(trade: August2018Trade): HubOperation {
  const entry = trade.entry;
  const stop = trade.stop;
  const take = trade.take;
  const outcome = closeOutcome(trade.pips);
  const storagePips = pipsForStorage(trade.pips);

  const levels = computeSignalPips({
    asset: trade.asset,
    direction: trade.direction,
    status: "closed",
    entry,
    take,
    stop,
    closeOutcome: outcome === "manual" ? "manual" : outcome,
    manualPips: trade.pips,
  });

  return {
    asset: trade.asset,
    direction: trade.direction,
    status: "closed",
    result: formatPipsLabel(trade.pips),
    pips: storagePips,
    date: `${String(trade.day).padStart(2, "0")}/08/2018`,
    updatedAt: "Finalizado",
    reportMonth: REPORT_MONTH,
    signalNumber: trade.signal,
    entryPrice: entry,
    takePrice: take,
    stopPrice: stop,
    takePips: levels.takePips,
    stopPips: levels.stopPips,
    signalTier: "elite",
  };
}

export const eliteAugust2018HubOperations: HubOperation[] = august2018Trades.map(tradeToHubOperation);

export function august2018SqlValueRows(): string[] {
  return august2018Trades.map((t, index) => {
    const outcome = closeOutcome(t.pips);
    const storagePips = pipsForStorage(t.pips);
    const label = formatPipsLabel(t.pips).replace(/'/g, "''");
    const entry = t.entry != null ? t.entry : "null";
    const take = t.take != null ? t.take : "null";
    const stop = t.stop != null ? t.stop : "null";
    const day = String(t.day).padStart(2, "0");
    return `  ('${t.asset}', '${t.direction}', 'closed', ${storagePips}, '${label}', '${REPORT_MONTH}', '2018-08-${day}', 'Finalizado', ${index + 1}, true, '${outcome}', 'elite', ${t.signal}, ${entry}, ${take}, ${stop})`;
  });
}
