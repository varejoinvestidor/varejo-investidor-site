"use client";

import { useEffect, useMemo, useState } from "react";
import { canonicalEliteAsset } from "../../elite/pipAsset";
import { formatPipsLabel, pipsBetween } from "../../elite/pips";
import type { EliteOperationCardModel } from "./EliteOperationCard";

const POLL_MS = 20_000;

export function useEliteLiveQuotes(assets: string[], enabled: boolean) {
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const key = useMemo(() => assets.map((a) => canonicalEliteAsset(a)).sort().join(","), [assets]);

  useEffect(() => {
    if (!enabled || !key) return;

    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        const res = await fetch(`/api/elite/live-quotes?assets=${encodeURIComponent(key)}`, { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as { prices?: Record<string, number>; updatedAt?: string };
        if (cancelled) return;
        setPrices(data.prices ?? {});
        setUpdatedAt(data.updatedAt ?? new Date().toISOString());
      } catch {
        /* cotação indisponível — mantém último valor */
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();
    const id = window.setInterval(load, POLL_MS);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, [enabled, key]);

  return { prices, updatedAt, loading };
}

export function applyLivePipsToActiveOperations<T extends EliteOperationCardModel>(
  operations: T[],
  prices: Record<string, number>,
): T[] {
  return operations.map((op) => {
    const entry = op.entryPrice;
    if (entry == null || !Number.isFinite(entry)) return op;
    const assetKey = canonicalEliteAsset(op.asset);
    const mid = prices[assetKey];
    if (mid == null || !Number.isFinite(mid)) return op;
    const pips = pipsBetween(op.asset, op.direction, entry, mid);
    const priceMove = op.direction === "Compra" ? mid - entry : entry - mid;
    return {
      ...op,
      pips,
      result: formatPipsLabel(pips),
      liveMidPrice: mid,
      livePriceMove: priceMove,
    };
  });
}
