import { canonicalEliteAsset, isCryptoAsset, isIndexCfdAsset } from "./pipAsset";
import { normalizeEliteAsset } from "./assets";

export function parseForexLegs(asset: string): { base: string; quote: string } | null {
  const a = canonicalEliteAsset(asset);
  if (!a.includes("/")) return null;
  const [base, quote] = a.split("/");
  if (!base || !quote) return null;
  return { base, quote };
}

/** Taxa: unidades de QUOTE por 1 BASE (ex.: EUR/USD ≈ 1.08). */
export function crossFromUsdRates(base: string, quote: string, usdPerUnit: Record<string, number>): number | null {
  const b = usdPerUnit[base];
  const q = usdPerUnit[quote];
  if (!b || !q || b <= 0 || q <= 0) return null;
  return q / b;
}

export function normalizeAssetsParam(raw: string): string[] {
  return [
    ...new Set(
      raw
        .split(",")
        .map((s) => normalizeEliteAsset(s.trim()))
        .filter(Boolean),
    ),
  ].slice(0, 32);
}

export function canFetchLiveQuote(asset: string): boolean {
  const a = canonicalEliteAsset(asset);
  if (a.includes("XAU") || a.includes("GOLD")) return true;
  if (isCryptoAsset(a) || isIndexCfdAsset(a)) return false;
  if (a.includes("USOIL") || a.includes("OIL")) return false;
  return parseForexLegs(a) !== null;
}

export type LiveQuoteFetcher = (assets: string[]) => Promise<Record<string, number>>;
