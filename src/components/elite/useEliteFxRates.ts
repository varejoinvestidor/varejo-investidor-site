"use client";

import { useEffect, useState } from "react";
import type { FxRates } from "../../elite/lotPips";

const POLL_MS = 30_000;

export function useEliteFxRates(enabled = true) {
  const [rates, setRates] = useState<FxRates>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        const res = await fetch("/api/elite/live-quotes?assets=USD/JPY,EUR/USD,GBP/USD", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as { prices?: Record<string, number>; updatedAt?: string };
        if (cancelled) return;
        const prices = data.prices ?? {};
        setRates({
          usdJpy: prices["USD/JPY"] ?? prices["USDJPY"],
          eurUsd: prices["EUR/USD"] ?? prices["EURUSD"],
          gbpUsd: prices["GBP/USD"] ?? prices["GBPUSD"],
          updatedAt: data.updatedAt ?? new Date().toISOString(),
        });
      } catch {
        /* mantém última taxa */
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
  }, [enabled]);

  return { rates, loading };
}
