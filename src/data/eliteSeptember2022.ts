/** Setembro/2022 — consolidado a partir da planilha operacional Elite. */
import type { HubMonthlyReport, HubOperation } from "../elite/mapToHub";

const REPORT_MONTH = "Setembro/2022";

type RawTrade = {
  day: number;
  asset: string;
  direction: "Compra" | "Venda";
  pips: number;
};

function normalizeAsset(asset: string) {
  return asset === "WTI" ? "USOIL" : asset;
}

function toHubTrade(trade: RawTrade): HubOperation {
  const pips = trade.pips;
  const sign = pips >= 0 ? "+" : "";
  return {
    asset: normalizeAsset(trade.asset),
    direction: trade.direction,
    status: "closed",
    result: `${sign}${pips} pips`,
    pips,
    date: `${String(trade.day).padStart(2, "0")}/09/2022`,
    updatedAt: "Finalizado",
    reportMonth: REPORT_MONTH,
    signalNumber: null,
    entryPrice: null,
    takePrice: null,
    stopPrice: null,
    takePips: 0,
    stopPips: 0,
    signalTier: "elite",
  };
}

const rawTrades: RawTrade[] = [
  { day: 1, asset: "EUR/JPY", direction: "Venda", pips: -10 },
  { day: 2, asset: "GBP/USD", direction: "Compra", pips: -30 },
  { day: 2, asset: "XAU/USD", direction: "Compra", pips: 62 },
  { day: 2, asset: "GBP/USD", direction: "Compra", pips: 20 },
  { day: 4, asset: "WTI", direction: "Compra", pips: 153 },
  { day: 5, asset: "XAU/USD", direction: "Compra", pips: 52 },
  { day: 6, asset: "EUR/CAD", direction: "Venda", pips: -96 },
  { day: 6, asset: "WTI", direction: "Venda", pips: 70 },
  { day: 7, asset: "EUR/CHF", direction: "Compra", pips: -44 },
  { day: 8, asset: "GBP/USD", direction: "Compra", pips: 33 },
  { day: 8, asset: "XAU/USD", direction: "Compra", pips: 23 },
  { day: 9, asset: "WTI", direction: "Venda", pips: 27 },
  { day: 12, asset: "GBP/NZD", direction: "Compra", pips: 35 },
  { day: 13, asset: "CHF/JPY", direction: "Venda", pips: -65 },
  { day: 13, asset: "WTI", direction: "Venda", pips: 92 },
  { day: 14, asset: "GBP/AUD", direction: "Compra", pips: 72 },
  { day: 14, asset: "EUR/USD", direction: "Compra", pips: 30 },
  { day: 14, asset: "XAU/USD", direction: "Compra", pips: -32 },
  { day: 15, asset: "EUR/CAD", direction: "Compra", pips: 34 },
  { day: 15, asset: "EUR/USD", direction: "Compra", pips: -18 },
  { day: 16, asset: "XAU/USD", direction: "Venda", pips: 41 },
  { day: 19, asset: "CAD/JPY", direction: "Compra", pips: 30 },
  { day: 19, asset: "AUD/CAD", direction: "Venda", pips: -37 },
  { day: 19, asset: "XAU/USD", direction: "Compra", pips: 34 },
  { day: 19, asset: "CAD/JPY", direction: "Venda", pips: -20 },
  { day: 20, asset: "XAU/USD", direction: "Venda", pips: -74 },
  { day: 21, asset: "GBP/JPY", direction: "Venda", pips: 60 },
  { day: 21, asset: "XAU/USD", direction: "Venda", pips: 67 },
  { day: 22, asset: "XAU/USD", direction: "Compra", pips: 54 },
  { day: 22, asset: "USD/CHF", direction: "Compra", pips: 30 },
  { day: 22, asset: "XAU/USD", direction: "Compra", pips: -47 },
  { day: 23, asset: "XAU/USD", direction: "Compra", pips: 35 },
  { day: 23, asset: "GBP/USD", direction: "Compra", pips: 9 },
  { day: 23, asset: "GBP/CHF", direction: "Compra", pips: -30 },
  { day: 23, asset: "GBP/JPY", direction: "Compra", pips: 16 },
  { day: 23, asset: "XAU/USD", direction: "Compra", pips: -20 },
  { day: 26, asset: "GBP/USD", direction: "Venda", pips: 40 },
];

const totalPips = rawTrades.reduce((sum, t) => sum + t.pips, 0);

export const eliteSeptember2022Monthly: HubMonthlyReport = {
  year: 2022,
  month: "Setembro",
  monthIndex: 8,
  signals: rawTrades.length,
  result: `+${totalPips} pips`,
  pips: totalPips,
  status: "Finalizado",
  assets: ["XAU/USD", "USOIL", "GBP/USD", "EUR/USD", "GBP/JPY"],
};

export const eliteSeptember2022HubOperations: HubOperation[] = rawTrades.map((trade) => toHubTrade(trade));

export const eliteSeptember2022Summary = {
  totalPips,
  signals: rawTrades.length,
  wins: rawTrades.filter((t) => t.pips > 0).length,
  losses: rawTrades.filter((t) => t.pips < 0).length,
};
