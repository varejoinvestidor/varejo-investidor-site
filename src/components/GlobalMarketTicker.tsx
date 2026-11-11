"use client";

import { useEffect, useState } from "react";
import { STATIC_MARKET_TICKER, type MarketTapeItem } from "../market/globalMarketTape";

const REFRESH_MS = 45_000;

export function GlobalMarketTicker({ label }: { label: string }) {
  const [items, setItems] = useState<MarketTapeItem[]>(STATIC_MARKET_TICKER);
  const [live, setLive] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function refresh() {
      try {
        const res = await fetch("/api/market-tape", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as { items?: MarketTapeItem[] };
        if (cancelled || !data.items?.length) return;
        setItems(data.items);
        setLive(true);
      } catch {
        /* mantém última cotação ou estático */
      }
    }

    void refresh();
    const interval = window.setInterval(() => void refresh(), REFRESH_MS);
    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, []);

  const tape = [...items, ...items];

  return (
    <div className="global-ticker border-b border-ink/[0.08] bg-ink px-3 text-paper md:px-5">
      <div className="mx-auto flex max-w-7xl items-center gap-4 overflow-hidden py-1.5 text-[9px] uppercase tracking-[0.16em] sm:gap-7 sm:py-2 sm:text-[11px] sm:tracking-[0.22em]">
        <span className="shrink-0 text-gold">{label}</span>
        {live ? (
          <span className="hidden shrink-0 text-[8px] text-paper/35 sm:inline" aria-hidden>
            ●
          </span>
        ) : null}
        <div className="ticker-track flex min-w-max gap-6">
          {tape.map((item, index) => (
            <span key={`${item.label}-${index}`} className="ticker-item flex items-center gap-2">
              <span className="text-paper/75">{item.label}</span>
              <span className={`ticker-value ${item.tone === "up" ? "text-rise" : "text-fall"}`}>{item.changeLabel}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
