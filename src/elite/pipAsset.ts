import { normalizeEliteAsset } from "./assets";

export function canonicalEliteAsset(asset: string): string {
  return normalizeEliteAsset(asset).toUpperCase().replace(/\s/g, "");
}

/** Índices CFD (USPX500, NAS100, US30…): 1 pip = 1 ponto do índice (ex.: 24,5 pips). */
export function isIndexCfdAsset(asset: string): boolean {
  const a = canonicalEliteAsset(asset);
  return (
    a.includes("USPX") ||
    a.includes("US500") ||
    a.includes("SPX") ||
    a.includes("SP500") ||
    a.includes("NAS") ||
    a.includes("US100") ||
    a.includes("USTEC") ||
    a.includes("US30") ||
    a.includes("DJ30") ||
    a.includes("GER") ||
    a.includes("UK100") ||
    a.includes("EU50")
  );
}

export function isCryptoAsset(asset: string): boolean {
  const a = canonicalEliteAsset(asset);
  return a.includes("BTC") || a.includes("XBT") || a.includes("ETH") || a.includes("SOL") || a.includes("BNB");
}

export function isOilAsset(asset: string): boolean {
  const a = canonicalEliteAsset(asset);
  return (
    a.includes("USOIL") ||
    a.includes("UKOIL") ||
    a.includes("WTI") ||
    a.includes("BRENT") ||
    a === "OIL" ||
    (a.includes("OIL") && !a.includes("/"))
  );
}

/** Ações e ETFs listados (AAPL, SPY, QQQ…) — símbolo sem barra, fora índice/cripto/petróleo. */
export function isStockOrEtfAsset(asset: string): boolean {
  const a = canonicalEliteAsset(asset);
  if (a.includes("/")) return false;
  if (isIndexCfdAsset(a) || isCryptoAsset(a) || isOilAsset(a)) return false;
  if (a.includes("XAU") || a.includes("XAG") || a.includes("GOLD")) return false;
  return /^[A-Z][A-Z0-9.-]{0,11}$/.test(a);
}

export type LiveQuoteAssetClass = "forex" | "gold" | "crypto" | "index" | "oil" | "equity";

export function liveQuoteAssetClass(asset: string): LiveQuoteAssetClass | null {
  const a = canonicalEliteAsset(asset);
  if (a.includes("XAU") || a.includes("GOLD") || a.includes("XAG")) return "gold";
  if (isCryptoAsset(a)) return "crypto";
  if (parseForexPair(a)) return "forex";
  if (isIndexCfdAsset(a)) return "index";
  if (isOilAsset(a)) return "oil";
  if (isStockOrEtfAsset(a)) return "equity";
  return null;
}

function parseForexPair(a: string): boolean {
  return a.includes("/") && !isCryptoAsset(a);
}
