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
