import { canonicalEliteAsset, isCryptoAsset, isIndexCfdAsset, isOilAsset, isStockOrEtfAsset } from "./pipAsset";

const YAHOO_CHART = "https://query1.finance.yahoo.com/v8/finance/chart/";
const BINANCE_TICKER = "https://api.binance.com/api/v3/ticker/price";

type YahooChartJson = {
  chart?: {
    result?: { meta?: { regularMarketPrice?: number } }[];
  };
};

const INDEX_TO_YAHOO: Record<string, string> = {
  USPX500: "^GSPC",
  US500: "^GSPC",
  SPX500: "^GSPC",
  SP500: "^GSPC",
  SPX: "^GSPC",
  NAS100: "^NDX",
  US100: "^NDX",
  USTEC: "^NDX",
  US30: "^DJI",
  DJ30: "^DJI",
  GER40: "^GDAXI",
  GER30: "^GDAXI",
  UK100: "^FTSE",
  EU50: "^STOXX50E",
};

const OIL_TO_YAHOO: Record<string, string> = {
  USOIL: "CL=F",
  WTI: "CL=F",
  UKOIL: "BZ=F",
  BRENT: "BZ=F",
  OIL: "CL=F",
};

const CRYPTO_BINANCE: Record<string, string> = {
  BTC: "BTCUSDT",
  XBT: "BTCUSDT",
  ETH: "ETHUSDT",
  SOL: "SOLUSDT",
  BNB: "BNBUSDT",
};

/** Fallback Yahoo quando Binance bloqueia IP do datacenter (ex.: Vercel). */
const CRYPTO_YAHOO: Record<string, string> = {
  BTC: "BTC-USD",
  XBT: "BTC-USD",
  ETH: "ETH-USD",
  SOL: "SOL-USD",
  BNB: "BNB-USD",
};

function resolveIndexYahooSymbol(a: string): string | null {
  if (INDEX_TO_YAHOO[a]) return INDEX_TO_YAHOO[a];
  const keys = Object.keys(INDEX_TO_YAHOO).sort((x, y) => y.length - x.length);
  for (const key of keys) {
    if (a.includes(key)) return INDEX_TO_YAHOO[key];
  }
  return null;
}

function resolveOilYahooSymbol(a: string): string | null {
  if (OIL_TO_YAHOO[a]) return OIL_TO_YAHOO[a];
  if (a.includes("UKOIL") || a.includes("BRENT")) return OIL_TO_YAHOO.UKOIL;
  if (a.includes("USOIL") || a.includes("WTI") || a === "OIL") return OIL_TO_YAHOO.USOIL;
  return null;
}

function yahooSymbolForAsset(asset: string): string | null {
  const a = canonicalEliteAsset(asset);
  if (isIndexCfdAsset(a)) return resolveIndexYahooSymbol(a);
  if (isOilAsset(a)) return resolveOilYahooSymbol(a);
  if (isStockOrEtfAsset(a)) return a;
  return null;
}

function cryptoBaseFromAsset(asset: string): string | null {
  const a = canonicalEliteAsset(asset);
  if (!isCryptoAsset(a)) return null;
  if (a.includes("/")) return a.split("/")[0] ?? null;
  for (const key of Object.keys(CRYPTO_BINANCE)) {
    if (a.includes(key)) return key;
  }
  return null;
}

function binanceSymbolForAsset(asset: string): string | null {
  const base = cryptoBaseFromAsset(asset);
  if (!base) return null;
  return CRYPTO_BINANCE[base] ?? `${base}USDT`;
}

function cryptoYahooSymbol(asset: string): string | null {
  const base = cryptoBaseFromAsset(asset);
  if (!base) return null;
  return CRYPTO_YAHOO[base] ?? `${base}-USD`;
}

async function fetchYahooPrice(symbol: string): Promise<number | null> {
  try {
    const url = `${YAHOO_CHART}${encodeURIComponent(symbol)}?interval=1d&range=1d`;
    const res = await fetch(url, {
      next: { revalidate: 0 },
      headers: { accept: "application/json", "user-agent": "VarejoInvestidor/1.0" },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as YahooChartJson;
    const price = data.chart?.result?.[0]?.meta?.regularMarketPrice;
    return price != null && Number.isFinite(price) ? price : null;
  } catch {
    return null;
  }
}

async function fetchBinancePrice(symbol: string): Promise<number | null> {
  try {
    const res = await fetch(`${BINANCE_TICKER}?symbol=${encodeURIComponent(symbol)}`, { next: { revalidate: 0 } });
    if (!res.ok) return null;
    const data = (await res.json()) as { price?: string };
    const price = data.price != null ? Number(data.price) : NaN;
    return Number.isFinite(price) ? price : null;
  } catch {
    return null;
  }
}

/** Cotações USD (ou USDT≈USD) para índices, petróleo, cripto, ações e ETFs. */
export async function fetchMultiMarketQuotes(assets: string[]): Promise<Record<string, number>> {
  const prices: Record<string, number> = {};
  const yahooJobs: { assetKey: string; symbol: string }[] = [];
  const binanceJobs: { assetKey: string; symbol: string }[] = [];

  const cryptoFallbackYahoo: { assetKey: string; symbol: string }[] = [];

  for (const asset of assets) {
    const assetKey = canonicalEliteAsset(asset);
    const binance = binanceSymbolForAsset(asset);
    if (binance) {
      binanceJobs.push({ assetKey, symbol: binance });
      const yf = cryptoYahooSymbol(asset);
      if (yf) cryptoFallbackYahoo.push({ assetKey, symbol: yf });
      continue;
    }
    const yahoo = yahooSymbolForAsset(asset);
    if (yahoo) yahooJobs.push({ assetKey, symbol: yahoo });
  }

  await Promise.all([
    ...binanceJobs.map(async ({ assetKey, symbol }) => {
      let p = await fetchBinancePrice(symbol);
      if (p == null) {
        const fb = cryptoFallbackYahoo.find((j) => j.assetKey === assetKey);
        if (fb) p = await fetchYahooPrice(fb.symbol);
      }
      if (p != null) prices[assetKey] = p;
    }),
    ...yahooJobs.map(async ({ assetKey, symbol }) => {
      const p = await fetchYahooPrice(symbol);
      if (p != null) prices[assetKey] = p;
    }),
  ]);

  return prices;
}
