/** Normaliza símbolo de ativo (forex, índices, cripto, ações, ETFs). */
export function normalizeEliteAsset(raw: string): string {
  const t = raw.trim().toUpperCase().replace(/\s+/g, "");
  if (!t) return "";
  if (t.includes("/")) return t;
  if (t.includes("-")) return t.replace(/-/g, "/");
  const knownPairs = ["XAUUSD", "XAGUSD", "BTCUSD", "ETHUSD", "USOIL", "UKOIL"];
  for (const pair of knownPairs) {
    if (t === pair || t.startsWith(pair)) {
      if (pair === "XAUUSD") return "XAU/USD";
      if (pair === "XAGUSD") return "XAG/USD";
      if (pair === "BTCUSD") return "BTC/USD";
      if (pair === "ETHUSD") return "ETH/USD";
      return pair;
    }
  }
  return t;
}

export function isValidEliteAsset(raw: string): boolean {
  const a = normalizeEliteAsset(raw);
  if (a.length < 2 || a.length > 24) return false;
  if (!/^[A-Z0-9./_-]+$/.test(a)) return false;
  return true;
}

export const ELITE_ASSET_SUGGESTIONS = [
  "EUR/USD",
  "GBP/USD",
  "AUD/JPY",
  "USD/JPY",
  "XAU/USD",
  "USOIL",
  "BTC/USD",
  "ETH/USD",
  "USPX500",
  "US100",
  "NAS100",
  "US30",
  "GER40",
  "SPY",
  "QQQ",
  "AAPL",
  "NVDA",
] as const;
