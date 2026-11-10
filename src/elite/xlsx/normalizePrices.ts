import { normalizeEliteAsset } from "../assets";

export function formatPairAsset(raw: string): string {
  const t = String(raw ?? "")
    .trim()
    .toUpperCase()
    .replace(/\s+/g, "");
  if (!t) return "";
  if (t.includes("/")) return normalizeEliteAsset(t);
  if (t.length === 6) return `${t.slice(0, 3)}/${t.slice(3)}`;
  return normalizeEliteAsset(t);
}

/** Converte inteiros da planilha Viniiip (161537 → 1.61537). */
export function normalizeSheetPrice(asset: string, raw: unknown): number | null {
  if (raw == null || raw === "") return null;
  const v = typeof raw === "number" ? raw : Number(String(raw).replace(",", "."));
  if (!Number.isFinite(v) || v === 0) return null;

  const a = formatPairAsset(asset);
  if (a.includes("XAU") || a.includes("XAG")) {
    if (v > 10_000) return Math.round((v / 100) * 100) / 100;
    if (v > 500 && v < 5000) return Math.round((v / 10) * 100) / 100;
    return v;
  }
  if (a.includes("JPY")) {
    if (v >= 1000) return Math.round((v / 1000) * 1000) / 1000;
    return v;
  }
  if (v >= 50) return Math.round((v / 100_000) * 100_000) / 100_000;
  return v;
}
