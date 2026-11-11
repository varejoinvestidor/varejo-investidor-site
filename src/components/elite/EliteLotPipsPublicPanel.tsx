"use client";

import { useMemo, useState } from "react";
import { ELITE_LOT_SIZES, formatUsd, lotTableRows, usdPerPipOneLot } from "../../elite/lotPips";
import { useEliteFxRates } from "./useEliteFxRates";

type Copy = {
  title: string;
  text: string;
  asset: string;
  pips: string;
  lot: string;
  usd: string;
  rates: string;
  updating: string;
  footnote: string;
};

const copyPt: Copy = {
  title: "Tabela lote × pips (USD aprox.)",
  text: "Conversão educacional por tamanho de lote. Taxas de câmbio atualizadas automaticamente para refinar pares com JPY.",
  asset: "Ativo",
  pips: "Pips do resultado",
  lot: "Lote",
  usd: "USD (aprox.)",
  rates: "Referência ao vivo",
  updating: "Atualizando cotações…",
  footnote: "Lotes sugeridos",
};

const copyEn: Copy = {
  title: "Lot × pips table (approx. USD)",
  text: "Educational conversion by lot size. FX rates refresh automatically for JPY pairs.",
  asset: "Asset",
  pips: "Result pips",
  lot: "Lot",
  usd: "USD (approx.)",
  rates: "Live reference",
  updating: "Updating quotes…",
  footnote: "Suggested lots",
};

export function EliteLotPipsPublicPanel({
  locale,
  defaultAsset,
  defaultPips,
  assetOptions,
}: {
  locale: string;
  defaultAsset: string;
  defaultPips: number;
  assetOptions: string[];
}) {
  const c = locale === "pt" ? copyPt : copyEn;
  const [asset, setAsset] = useState(defaultAsset);
  const [pips, setPips] = useState(defaultPips);
  const { rates, loading } = useEliteFxRates(true);

  const rows = useMemo(() => lotTableRows(asset, pips, rates), [asset, pips, rates]);
  const pipOneLot = usdPerPipOneLot(asset, rates);

  const rateLine = [
    rates.usdJpy ? `USD/JPY ${rates.usdJpy.toFixed(2)}` : null,
    rates.eurUsd ? `EUR/USD ${rates.eurUsd.toFixed(4)}` : null,
    rates.gbpUsd ? `GBP/USD ${rates.gbpUsd.toFixed(4)}` : null,
    `≈ $${pipOneLot.toFixed(2)}/pip · 1 lote`,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <section className="rounded-lg border border-gold/18 bg-black/35 p-5 md:p-6">
      <h3 className="text-sm font-bold uppercase tracking-wider text-gold">{c.title}</h3>
      <p className="mt-2 max-w-2xl text-xs leading-6 text-paper/55">{c.text}</p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="block text-xs text-paper/50">
          {c.asset}
          <input
            list="month-lot-assets"
            value={asset}
            onChange={(e) => setAsset(e.target.value.toUpperCase())}
            className="mt-1 w-full rounded border border-gold/20 bg-black/50 px-3 py-2.5 font-mono text-sm text-paper outline-none focus:border-gold"
          />
          <datalist id="month-lot-assets">
            {assetOptions.map((sym) => (
              <option key={sym} value={sym} />
            ))}
          </datalist>
        </label>
        <label className="block text-xs text-paper/50">
          {c.pips}
          <input
            type="number"
            step={1}
            value={pips}
            onChange={(e) => setPips(Number(e.target.value))}
            className="mt-1 w-full rounded border border-gold/20 bg-black/50 px-3 py-2.5 font-mono text-sm text-paper outline-none focus:border-gold"
          />
        </label>
      </div>

      <p className="mt-3 text-[11px] text-paper/45">
        <span className="font-bold uppercase tracking-wide text-gold/80">{c.rates}: </span>
        {loading && !rates.usdJpy ? c.updating : rateLine || "—"}
      </p>

      <div className="mt-4 overflow-x-auto rounded border border-white/8">
        <table className="w-full min-w-[320px] text-sm">
          <thead className="bg-black/45 text-[10px] uppercase tracking-[0.18em] text-gold">
            <tr>
              <th className="px-4 py-3 text-left">{c.lot}</th>
              <th className="px-4 py-3 text-right">{c.usd}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.lot} className="border-t border-white/6">
                <td className="px-4 py-3 font-mono text-paper">{row.lot}</td>
                <td
                  className={`px-4 py-3 text-right font-mono tabular-nums font-bold ${row.usd >= 0 ? "text-rise" : "text-fall"}`}
                >
                  {formatUsd(row.usd)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-[11px] text-paper/40">
        {c.footnote}: {ELITE_LOT_SIZES.join(", ")}.
      </p>
    </section>
  );
}
