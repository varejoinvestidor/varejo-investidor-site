"use client";

import { useMemo, useState } from "react";
import { ELITE_LOT_SIZES, formatUsd, lotTableRows } from "../lotPips";
import type { EliteMonthlyReportRow, EliteOperationRow } from "../types";
import { computeTraderPerformance } from "../traderPerformance";
import { tradeResultFromRow, tradeResultLabel } from "./tradeResult";
import { EliteSchemaAlert } from "./EliteSchemaAlert";

type Props = {
  operations: EliteOperationRow[];
  monthly: EliteMonthlyReportRow[];
  loadError?: string | null;
};

export function ElitePerformanceAdmin({ operations, monthly, loadError }: Props) {
  const publicOps = useMemo(() => operations.filter((o) => o.show_public), [operations]);
  const performance = useMemo(() => computeTraderPerformance(operations), [operations]);

  const activeCount = publicOps.filter((o) => o.status === "active").length;
  const recentClosed = useMemo(
    () =>
      [...publicOps]
        .filter((o) => o.status === "closed")
        .sort((a, b) => (b.traded_on ?? "").localeCompare(a.traded_on ?? ""))
        .slice(0, 12),
    [publicOps],
  );

  const [lotAsset, setLotAsset] = useState(publicOps[0]?.asset ?? "EUR/USD");
  const [lotPips, setLotPips] = useState(publicOps.find((o) => o.status === "closed")?.result_pips ?? 100);

  const lotRows = useMemo(() => lotTableRows(lotAsset, lotPips), [lotAsset, lotPips]);

  return (
    <div className="mx-auto max-w-6xl space-y-10">
      {loadError ? <EliteSchemaAlert message={loadError} /> : null}

      <section className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-gold">Desempenho (espelho do site)</h3>
        <p className="text-xs text-paper/55">
          Métricas calculadas a partir de <strong className="text-paper/80">elite_operations</strong> com &quot;Exibir no
          relatório público&quot;. O site em{" "}
          <a href="/relatorio-elite" className="text-gold hover:underline" target="_blank" rel="noreferrer">
            /relatorio-elite
          </a>{" "}
          usa os mesmos dados (revalidação a cada save no admin).
        </p>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {performance.map((p) => (
            <article key={p.key} className="rounded-xl border border-gold/20 bg-black/40 p-5">
              <p className="text-xs font-black uppercase tracking-wider text-gold">{p.label}</p>
              <dl className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between gap-2 border-b border-white/8 pb-1.5">
                  <dt className="text-paper/50">Operações</dt>
                  <dd className="font-mono font-bold tabular-nums">{p.operations}</dd>
                </div>
                <div className="flex justify-between gap-2 border-b border-white/8 pb-1.5">
                  <dt className="text-paper/50">Finalizadas</dt>
                  <dd className="font-mono tabular-nums">{p.closed}</dd>
                </div>
                <div className="flex justify-between gap-2 border-b border-white/8 pb-1.5">
                  <dt className="text-paper/50">Taxa de acerto</dt>
                  <dd className="font-mono text-rise">{p.winRate}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-paper/50">Pips</dt>
                  <dd className={`font-mono font-bold tabular-nums ${p.pips >= 0 ? "text-rise" : "text-fall"}`}>
                    {p.pips >= 0 ? "+" : ""}
                    {p.pips}
                  </dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
        <p className="text-xs text-paper/45">
          Em andamento agora: <span className="font-mono text-gold">{activeCount}</span> sinal(is) público(s).
        </p>
      </section>

      <section className="space-y-3 rounded-xl border border-line/12 p-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-paper/55">Últimos trades fechados (público)</h3>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="text-xs uppercase tracking-wider text-paper/45">
              <tr>
                <th className="px-2 py-2 text-left">Sinal</th>
                <th className="px-2 py-2 text-left">Ativo</th>
                <th className="px-2 py-2">Data</th>
                <th className="px-2 py-2">Resultado</th>
                <th className="px-2 py-2 text-right">Pips</th>
              </tr>
            </thead>
            <tbody>
              {recentClosed.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-2 py-6 text-center text-paper/40">
                    Nenhum trade fechado público ainda.
                  </td>
                </tr>
              ) : (
                recentClosed.map((row) => (
                  <tr key={row.id} className="border-t border-line/5">
                    <td className="px-2 py-2 font-mono text-gold">{row.signal_number ?? "—"}</td>
                    <td className="px-2 py-2 font-mono">{row.asset}</td>
                    <td className="px-2 py-2 text-paper/55">{row.traded_on ?? "—"}</td>
                    <td className="px-2 py-2 text-xs">{tradeResultLabel(tradeResultFromRow(row))}</td>
                    <td className="px-2 py-2 text-right font-mono tabular-nums">{row.result_label}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4 rounded-xl border border-line/12 p-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-gold">Consolidado mensal (banco)</h3>
        {monthly.length === 0 ? (
          <p className="text-sm text-paper/45">Sem meses consolidados — salve operações para recalcular automaticamente.</p>
        ) : (
          <ul className="grid gap-2 sm:grid-cols-2">
            {monthly
              .slice()
              .sort((a, b) => b.year - a.year || b.month_index - a.month_index)
              .map((m) => (
                <li key={m.id} className="rounded border border-line/12 bg-black/30 px-4 py-3 text-sm">
                  <span className="font-semibold text-paper">
                    {m.month_label}/{m.year}
                  </span>
                  <span className="text-paper/50"> · {m.signals} sinais · </span>
                  <span className="font-mono text-rise/90">{m.result_label}</span>
                  <span className="ml-2 text-xs text-paper/40">({m.status_label})</span>
                </li>
              ))}
          </ul>
        )}
      </section>

      <section className="space-y-4 rounded-xl border border-gold/15 p-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-gold">Tabela lote × pips (USD aprox.)</h3>
        <p className="text-xs text-paper/50">
          Conversão educacional por tamanho de lote. Ajuste ativo e pips para estimar resultado em dólar (1 lote padrão forex
          ≈ $10/pip em pares USD, conforme par).
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block text-xs text-paper/50">
            Ativo
            <input
              value={lotAsset}
              onChange={(e) => setLotAsset(e.target.value.toUpperCase())}
              className="mt-1 w-full rounded border border-line/15 bg-[#0a0a0a] px-3 py-2 text-sm font-mono"
            />
          </label>
          <label className="block text-xs text-paper/50">
            Pips do resultado
            <input
              type="number"
              value={lotPips}
              onChange={(e) => setLotPips(Number(e.target.value))}
              className="mt-1 w-full rounded border border-line/15 bg-[#0a0a0a] px-3 py-2 text-sm font-mono"
            />
          </label>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[320px] text-sm">
            <thead className="text-xs uppercase tracking-wider text-paper/45">
              <tr>
                <th className="px-3 py-2 text-left">Lote</th>
                <th className="px-3 py-2 text-right">USD (aprox.)</th>
              </tr>
            </thead>
            <tbody>
              {lotRows.map((row) => (
                <tr key={row.lot} className="border-t border-line/8">
                  <td className="px-3 py-2 font-mono">{row.lot}</td>
                  <td className={`px-3 py-2 text-right font-mono tabular-nums ${row.usd >= 0 ? "text-rise" : "text-fall"}`}>
                    {formatUsd(row.usd)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[11px] text-paper/40">Lotes sugeridos: {ELITE_LOT_SIZES.join(", ")}.</p>
      </section>
    </div>
  );
}
