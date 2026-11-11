export type MarketTapeItem = {
  label: string;
  changePct: number;
  tone: "up" | "down";
  changeLabel: string;
};

type TapeSource =
  | { label: string; yahoo: string }
  | { label: string; binance: string; yahooFallback?: string };

export const GLOBAL_MARKET_TICKER_SOURCES: TapeSource[] = [
  { label: "XAU/USD", yahoo: "GC=F" },
  { label: "EUR/USD", yahoo: "EURUSD=X" },
  { label: "BTC/USD", binance: "BTCUSDT", yahooFallback: "BTC-USD" },
  { label: "USOIL", yahoo: "CL=F" },
  { label: "NASDAQ", yahoo: "^NDX" },
  { label: "DXY", yahoo: "DX-Y.NYB" },
  { label: "GBP/JPY", yahoo: "GBPJPY=X" },
  { label: "S&P 500", yahoo: "^GSPC" },
];

/** Fallback estático quando provedores estão indisponíveis. */
export const STATIC_MARKET_TICKER: MarketTapeItem[] = [
  { label: "XAU/USD", changePct: 0.74, tone: "up", changeLabel: "+0.74%" },
  { label: "EUR/USD", changePct: -0.18, tone: "down", changeLabel: "-0.18%" },
  { label: "BTC/USD", changePct: 1.42, tone: "up", changeLabel: "+1.42%" },
  { label: "USOIL", changePct: -0.52, tone: "down", changeLabel: "-0.52%" },
  { label: "NASDAQ", changePct: 0.91, tone: "up", changeLabel: "+0.91%" },
  { label: "DXY", changePct: -0.21, tone: "down", changeLabel: "-0.21%" },
  { label: "GBP/JPY", changePct: 0.36, tone: "up", changeLabel: "+0.36%" },
  { label: "S&P 500", changePct: 0.82, tone: "up", changeLabel: "+0.82%" },
];

type YahooChartJson = {
  chart?: {
    result?: {
      meta?: {
        regularMarketPrice?: number;
        previousClose?: number;
        chartPreviousClose?: number;
        regularMarketChangePercent?: number;
      };
    }[];
  };
};

function formatChangeLabel(changePct: number): string {
  const sign = changePct >= 0 ? "+" : "";
  return `${sign}${changePct.toFixed(2)}%`;
}

function toneFromChange(changePct: number): "up" | "down" {
  return changePct >= 0 ? "up" : "down";
}

function yahooChangePercent(
  meta:
    | {
        regularMarketPrice?: number;
        previousClose?: number;
        chartPreviousClose?: number;
        regularMarketChangePercent?: number;
      }
    | undefined,
): number | null {
  if (!meta) return null;
  if (meta.regularMarketChangePercent != null && Number.isFinite(meta.regularMarketChangePercent)) {
    return meta.regularMarketChangePercent;
  }
  const price = meta.regularMarketPrice;
  const prev = meta.previousClose ?? meta.chartPreviousClose;
  if (price != null && prev != null && prev !== 0) {
    return ((price - prev) / prev) * 100;
  }
  return null;
}

export async function fetchYahooTapeChange(symbol: string): Promise<number | null> {
  try {
    const url = `${"https://query1.finance.yahoo.com/v8/finance/chart/"}${
      encodeURIComponent(symbol)
    }?interval=1d&range=1d`;
    const res = await fetch(url, {
      next: { revalidate: 0 },
      headers: { accept: "application/json", "user-agent": "VarejoInvestidor/1.0" },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as YahooChartJson;
    const meta = data.chart?.result?.[0]?.meta;
    return yahooChangePercent(meta);
  } catch {
    return null;
  }
}

async function fetchBinance24hChange(symbol: string): Promise<number | null> {
  try {
    const res = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${encodeURIComponent(symbol)}`, {
      next: { revalidate: 0 },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { priceChangePercent?: string };
    const pct = data.priceChangePercent != null ? Number(data.priceChangePercent) : NaN;
    return Number.isFinite(pct) ? pct : null;
  } catch {
    return null;
  }
}

export async function buildGlobalMarketTape(): Promise<MarketTapeItem[]> {
  const results = await Promise.all(
    GLOBAL_MARKET_TICKER_SOURCES.map(async (src) => {
      let change: number | null = null;

      if ("binance" in src) {
        change = await fetchBinance24hChange(src.binance);
        if (change == null && src.yahooFallback) {
          change = await fetchYahooTapeChange(src.yahooFallback);
        }
      } else {
        change = await fetchYahooTapeChange(src.yahoo);
      }

      if (change == null) return null;

      return {
        label: src.label,
        changePct: change,
        tone: toneFromChange(change),
        changeLabel: formatChangeLabel(change),
      } satisfies MarketTapeItem;
    }),
  );

  const items = results.filter((r): r is MarketTapeItem => r != null);
  if (items.length >= 4) return items;

  return STATIC_MARKET_TICKER.map((item) => ({ ...item }));
}
