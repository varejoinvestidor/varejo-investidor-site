/** Lotes comuns (forex). 1 lote = 100k unidades no par. */
export const ELITE_LOT_SIZES = [0.01, 0.02, 0.05, 0.1, 0.5, 1] as const;

export type LotSize = (typeof ELITE_LOT_SIZES)[number];

/**
 * Valor aproximado em USD de 1 pip com 1 lote padrão no par.
 * Referência educacional — varia com taxa e corretora.
 */
export function usdPerPipOneLot(asset: string): number {
  const a = asset.toUpperCase().replace(/\s/g, "");
  if (a.includes("XAU") || a.includes("GOLD")) return 1;
  if (a.includes("BTC")) return 1;
  if (a.includes("NAS") || a.includes("US30") || a.includes("US500")) return 1;
  if (a.includes("JPY")) {
    if (a.startsWith("USD/")) return 6.5;
    if (a.endsWith("/JPY") || a.includes("/JPY")) return 6500 / 110;
    return 6.5;
  }
  if (a.includes("/USD") || a.endsWith("USD")) return 10;
  if (a.startsWith("USD/")) return 9;
  return 10;
}

export function monetaryFromPips(pips: number, asset: string, lots: number): number {
  return pips * usdPerPipOneLot(asset) * lots;
}

export function formatUsd(value: number): string {
  const sign = value >= 0 ? "+" : "-";
  return `${sign}$${Math.abs(value).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function lotTableRows(asset: string, pips: number): { lot: LotSize; usd: number }[] {
  return ELITE_LOT_SIZES.map((lot) => ({
    lot,
    usd: monetaryFromPips(pips, asset, lot),
  }));
}
