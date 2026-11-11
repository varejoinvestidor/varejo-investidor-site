/** Lotes comuns (forex). 1 lote = 100k unidades no par. */
export const ELITE_LOT_SIZES = [0.01, 0.02, 0.05, 0.1, 0.5, 1] as const;

export type LotSize = (typeof ELITE_LOT_SIZES)[number];

export type FxRates = {
  usdJpy?: number;
  eurUsd?: number;
  gbpUsd?: number;
  updatedAt?: string;
};

/**
 * Valor aproximado em USD de 1 pip com 1 lote padrão no par.
 * Referência educacional — varia com taxa e corretora.
 */
export function usdPerPipOneLot(asset: string, rates?: FxRates): number {
  const a = asset.toUpperCase().replace(/\s/g, "");
  const usdJpy = rates?.usdJpy && rates.usdJpy > 0 ? rates.usdJpy : 150;

  if (a.includes("XAU") || a.includes("GOLD")) return 1;
  if (a.includes("BTC")) return 1;
  if (a.includes("NAS") || a.includes("US30") || a.includes("US500") || a.includes("SPX") || a.includes("USFX")) return 1;
  if (a.includes("JPY")) {
    if (a.startsWith("USD/")) return 1000 / usdJpy;
    if (a.endsWith("/JPY") || a.includes("/JPY")) return (100_000 / usdJpy) * 0.01;
    return 1000 / usdJpy;
  }
  if (a.includes("/USD") || a.endsWith("USD")) return 10;
  if (a.startsWith("USD/")) return 9;
  return 10;
}

export function monetaryFromPips(pips: number, asset: string, lots: number, rates?: FxRates): number {
  return pips * usdPerPipOneLot(asset, rates) * lots;
}

export function formatUsd(value: number): string {
  const sign = value >= 0 ? "+" : "-";
  return `${sign}$${Math.abs(value).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function lotTableRows(asset: string, pips: number, rates?: FxRates): { lot: LotSize; usd: number }[] {
  return ELITE_LOT_SIZES.map((lot) => ({
    lot,
    usd: monetaryFromPips(pips, asset, lot, rates),
  }));
}
