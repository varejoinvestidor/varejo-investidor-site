/** Setembro/2022 — planilha operacional Elite (entrada, SL, TP, pips). */
import { computeSignalPips } from "../elite/pips";
import type { HubMonthlyReport, HubOperation } from "../elite/mapToHub";

const REPORT_MONTH = "Setembro/2022";

export type September2022Trade = {
  day: number;
  asset: string;
  direction: "Compra" | "Venda";
  entry: number;
  stop: number;
  take: number;
  pips: number;
};

function normalizeAsset(asset: string) {
  return asset === "WTI" ? "USOIL" : asset;
}

/** Corrige OCR comum (XAU em dezenas; majors em centenas). */
function normalizeEntryPrice(asset: string, value: number): number {
  const a = normalizeAsset(asset);
  if (a === "XAU/USD" && value < 500) return Math.round(value * 10 * 100) / 100;
  if ((a === "GBP/USD" || a === "EUR/USD" || a === "AUD/USD" || a === "NZD/USD") && value > 20) {
    return Math.round((value / 100) * 100000) / 100000;
  }
  return value;
}

function normalizeStopTake(asset: string, value: number): number {
  return normalizeEntryPrice(asset, value);
}

function closeOutcome(pips: number): "take" | "stop" {
  return pips >= 0 ? "take" : "stop";
}

export const september2022Trades = [
  { day: 1, asset: "EUR/JPY", direction: "Venda", entry: 139.412, stop: 140.187, take: 138.336, pips: -10 },
  { day: 2, asset: "GBP/USD", direction: "Compra", entry: 1.1512, stop: 1.1482, take: 1.1542, pips: -30 },
  { day: 2, asset: "XAU/USD", direction: "Compra", entry: 1707.55, stop: 1703.45, take: 1713.74, pips: 62 },
  { day: 2, asset: "GBP/USD", direction: "Compra", entry: 1.1497, stop: 1.1477, take: 1.1517, pips: 20 },
  { day: 4, asset: "USOIL", direction: "Compra", entry: 87.946, stop: 86.936, take: 90.187, pips: 153 },
  { day: 5, asset: "XAU/USD", direction: "Compra", entry: 1714.77, stop: 1709.47, take: 1719.96, pips: 52 },
  { day: 6, asset: "EUR/CAD", direction: "Venda", entry: 1.30157, stop: 1.29202, take: 1.30815, pips: -96 },
  { day: 6, asset: "USOIL", direction: "Venda", entry: 85.835, stop: 86.898, take: 83.043, pips: 70 },
  { day: 7, asset: "EUR/CHF", direction: "Compra", entry: 0.97553, stop: 0.97109, take: 0.97943, pips: -44 },
  { day: 8, asset: "GBP/USD", direction: "Compra", entry: 1.15129, stop: 1.14699, take: 1.15463, pips: 33 },
  { day: 8, asset: "XAU/USD", direction: "Compra", entry: 1710.007, stop: 1707.714, take: 1712.238, pips: 23 },
  { day: 9, asset: "USOIL", direction: "Venda", entry: 85.222, stop: 85.724, take: 84.948, pips: 27 },
  { day: 12, asset: "GBP/NZD", direction: "Compra", entry: 1.90258, stop: 1.8994, take: 1.90612, pips: 35 },
  { day: 13, asset: "CHF/JPY", direction: "Venda", entry: 149.317, stop: 149.962, take: 148.39, pips: -65 },
  { day: 13, asset: "USOIL", direction: "Venda", entry: 86.769, stop: 87.413, take: 85.845, pips: 92 },
  { day: 14, asset: "GBP/AUD", direction: "Compra", entry: 1.70119, stop: 1.6976, take: 1.7084, pips: 72 },
  { day: 14, asset: "EUR/USD", direction: "Compra", entry: 0.99812, stop: 0.99369, take: 1.00235, pips: 30 },
  { day: 14, asset: "XAU/USD", direction: "Compra", entry: 1705.05, stop: 1701.87, take: 1709.26, pips: -32 },
  { day: 15, asset: "EUR/CAD", direction: "Compra", entry: 1.31928, stop: 1.3148, take: 1.32271, pips: 34 },
  { day: 15, asset: "EUR/USD", direction: "Compra", entry: 1.0008, stop: 0.99899, take: 1.00269, pips: -18 },
  { day: 16, asset: "XAU/USD", direction: "Venda", entry: 1677.04, stop: 1679.48, take: 1672.92, pips: 41 },
  { day: 19, asset: "CAD/JPY", direction: "Compra", entry: 107.92, stop: 107.616, take: 108.411, pips: 30 },
  { day: 19, asset: "AUD/CAD", direction: "Venda", entry: 0.88999, stop: 0.8922, take: 0.88504, pips: -37 },
  { day: 19, asset: "XAU/USD", direction: "Compra", entry: 1671.94, stop: 1667.71, take: 1675.33, pips: 34 },
  { day: 19, asset: "CAD/JPY", direction: "Venda", entry: 108.18, stop: 108.38, take: 107.98, pips: -20 },
  { day: 20, asset: "XAU/USD", direction: "Venda", entry: 1662.82, stop: 1670.24, take: 1655.9, pips: -74 },
  { day: 21, asset: "GBP/JPY", direction: "Venda", entry: 163.108, stop: 163.532, take: 162.508, pips: 60 },
  { day: 21, asset: "XAU/USD", direction: "Venda", entry: 1666.46, stop: 1672.06, take: 1659.77, pips: 67 },
  { day: 22, asset: "XAU/USD", direction: "Compra", entry: 1673.25, stop: 1668.55, take: 1678.68, pips: 54 },
  { day: 22, asset: "USD/CHF", direction: "Compra", entry: 0.97738, stop: 0.97294, take: 0.98267, pips: 30 },
  { day: 22, asset: "XAU/USD", direction: "Compra", entry: 1673.3, stop: 1668.63, take: 1677.86, pips: -47 },
  { day: 23, asset: "XAU/USD", direction: "Compra", entry: 1644.78, stop: 1640.92, take: 1649.32, pips: 35 },
  { day: 23, asset: "GBP/USD", direction: "Compra", entry: 1.09201, stop: 1.0901, take: 1.09293, pips: 9 },
  { day: 23, asset: "GBP/CHF", direction: "Compra", entry: 1.1215, stop: 1.1185, take: 1.1245, pips: -30 },
  { day: 23, asset: "GBP/JPY", direction: "Compra", entry: 156.309, stop: 156.149, take: 156.47, pips: 16 },
  { day: 23, asset: "XAU/USD", direction: "Compra", entry: 1647.52, stop: 1645.51, take: 1649.32, pips: -20 },
  { day: 26, asset: "GBP/USD", direction: "Venda", entry: 1.08774, stop: 1.09174, take: 1.08374, pips: 40 },
].map((row) => ({
  ...row,
  asset: normalizeAsset(row.asset),
  entry: normalizeEntryPrice(row.asset, row.entry),
  stop: normalizeStopTake(row.asset, row.stop),
  take: normalizeStopTake(row.asset, row.take),
})) as September2022Trade[];

const totalPips = september2022Trades.reduce((sum, t) => sum + t.pips, 0);

export const eliteSeptember2022Monthly: HubMonthlyReport = {
  year: 2022,
  month: "Setembro",
  monthIndex: 8,
  signals: september2022Trades.length,
  result: `+${totalPips} pips`,
  pips: totalPips,
  status: "Finalizado",
  assets: ["XAU/USD", "USOIL", "GBP/USD", "EUR/USD", "GBP/JPY"],
};

export function tradeToHubOperation(trade: September2022Trade): HubOperation {
  const asset = normalizeAsset(trade.asset);
  const levels = computeSignalPips({
    asset,
    direction: trade.direction,
    status: "closed",
    entry: trade.entry,
    take: trade.take,
    stop: trade.stop,
    closeOutcome: closeOutcome(trade.pips),
    manualPips: trade.pips,
  });

  return {
    asset,
    direction: trade.direction,
    status: "closed",
    result: `${trade.pips >= 0 ? "+" : ""}${trade.pips} pips`,
    pips: trade.pips,
    date: `${String(trade.day).padStart(2, "0")}/09/2022`,
    updatedAt: "Finalizado",
    reportMonth: REPORT_MONTH,
    signalNumber: null,
    entryPrice: trade.entry,
    takePrice: trade.take,
    stopPrice: trade.stop,
    takePips: levels.takePips,
    stopPips: levels.stopPips,
    signalTier: "elite",
  };
}

export const eliteSeptember2022HubOperations: HubOperation[] = september2022Trades.map(tradeToHubOperation);

export const eliteSeptember2022Summary = {
  totalPips,
  signals: september2022Trades.length,
  wins: september2022Trades.filter((t) => t.pips > 0).length,
  losses: september2022Trades.filter((t) => t.pips < 0).length,
};

/** Linhas SQL VALUES (sort_order, …) para migration idempotente. */
export function september2022SqlValueRows(): string[] {
  return september2022Trades.map((t, index) => {
    const outcome = closeOutcome(t.pips);
    const sign = t.pips >= 0 ? "+" : "";
    return `  ('${t.asset}', '${t.direction}', 'closed', ${t.pips}, '${sign}${t.pips} pips', '${REPORT_MONTH}', '2022-09-${String(t.day).padStart(2, "0")}', 'Finalizado', ${index + 1}, true, '${outcome}', 'elite', ${t.entry}, ${t.take}, ${t.stop})`;
  });
}
