import { NextResponse } from "next/server";
import {
  canFetchLiveQuote,
  crossFromUsdRates,
  normalizeAssetsParam,
  parseForexLegs,
} from "../../../../src/elite/liveQuotes";
import { canonicalEliteAsset } from "../../../../src/elite/pipAsset";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type ErApiPayload = { result?: string; conversion_rates?: Record<string, number> };
type GoldPayload = { items?: { xauPrice?: number }[] };

async function fetchUsdRates(): Promise<Record<string, number> | null> {
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD", { next: { revalidate: 0 } });
    if (!res.ok) return null;
    const data = (await res.json()) as ErApiPayload;
    if (data.result !== "success" || !data.conversion_rates) return null;
    return data.conversion_rates;
  } catch {
    return null;
  }
}

async function fetchXauUsd(): Promise<number | null> {
  try {
    const res = await fetch("https://data-asg.goldprice.org/dbXRates/USD", {
      next: { revalidate: 0 },
      headers: { accept: "application/json" },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as GoldPayload;
    const price = data.items?.[0]?.xauPrice;
    return price != null && Number.isFinite(price) ? price : null;
  } catch {
    return null;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const assets = normalizeAssetsParam(searchParams.get("assets") ?? "");
  const prices: Record<string, number> = {};

  const [usdRates, xau] = await Promise.all([fetchUsdRates(), fetchXauUsd()]);

  for (const asset of assets) {
    if (!canFetchLiveQuote(asset)) continue;
    const key = canonicalEliteAsset(asset);

    if (key.includes("XAU")) {
      if (xau != null) prices[key] = xau;
      continue;
    }

    const legs = parseForexLegs(key);
    if (!legs || !usdRates) continue;

    if (legs.base === "USD") {
      const q = usdRates[legs.quote];
      if (q && q > 0) prices[key] = q;
      continue;
    }
    if (legs.quote === "USD") {
      const b = usdRates[legs.base];
      if (b && b > 0) prices[key] = 1 / b;
      continue;
    }

    const mid = crossFromUsdRates(legs.base, legs.quote, usdRates);
    if (mid != null && Number.isFinite(mid)) prices[key] = mid;
  }

  return NextResponse.json({
    prices,
    updatedAt: new Date().toISOString(),
  });
}
