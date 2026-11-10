"use client";

import { useMemo, useState } from "react";
import { ELITE_LOT_SIZES, formatUsd, lotTableRows } from "../lotPips";
import type { EliteMonthlyReportRow, EliteOperationRow } from "../types";
import { formatPipsDisplay } from "../pips";
import { resolveOperationPips } from "../resolveOperationPips";
import { computeTraderPerformance } from "../traderPerformance";
import { tradeResultFromRow, tradeResultLabel } from "./tradeResult";
import { EliteSchemaAlert } from "./EliteSchemaAlert";
import { ElitePerformanceCharts } from "./ElitePerformanceCharts";
import { EliteMonthlyConsolidatedPanel } from "./EliteMonthlyConsolidatedPanel";
import {
  ELITE_ADMIN_OPS_INITIAL,
  ELITE_ADMIN_OPS_LOAD_MORE,
} from "../constants";
import { EliteAdminAssetChart } from "./EliteAdminAssetChart";
import { EliteAdminMonthlyHeatmap } from "./EliteAdminMonthlyHeatmap";
import { buildAssetCounts } from "./buildAssetCounts";
import { sortAdminOperations } from "./sortOperations";

type Props = {
  operations: EliteOperationRow[];
  monthly: EliteMonthlyReportRow[];
  totalOperations?: number;
  loadError?: string | null;
};

export function ElitePerformanceAdmin({ operations, monthly, totalOperations, loadError }: Props) {
  const publicOps = useMemo(() => operations.filter((o) => o.show_public), [operations]);
  const performance = useMemo(() => computeTraderPerformance(operations), [operations]);
  const assetSlices = useMemo(() => buildAssetCounts(operations, true), [operations]);
  const sortedOps = useMemo(() => sortAdminOperations(operations), [operations]);
  const [opsVisible, setOpsVisible] = useState(ELITE_ADMIN_OPS_INITIAL);
  const opsSlice = useMemo(() => sortedOps.slice(0, opsVisible), [sortedOps, opsVisible]);
  const hasMoreOps = opsVisible < sortedOps.length;
  const totalInDb = totalOperations ?? operations.length;
  const loadIncomplete = operations.length < totalInDb;

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

      {loadIncomplete ? (
        <div className="rounded-lg border border-fall/35 bg-fall/10 px-4 py-3 text-sm text-fall">
          Carregadas <strong className="font-mono">{operations.length}</strong> de{" "}
          <strong className="font-mono">{totalInDb}</strong> operações no banco. Faça deploy recente (paginação Supabase) ou
          recarregue; totais do heatmap usam <code className="text-paper/80">elite_monthly_reports</code>.
        </div>
      ) : (
        <p className="text-xs text-paper/50">
          <span className="font-mono text-gold">{operations.length}</span> operações carregadas do Supabase (todas as páginas).
        </p>
      )}

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
                    {formatPipsDisplay(p.pips)}
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

      <section className="grid gap-6 rounded-xl border border-gold/20 bg-black/25 p-6 lg:grid-cols-2">
        <article className="space-y-3">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gold">Distribuição por ativo</h3>
          <EliteAdminAssetChart data={assetSlices} />
        </article>
        <article className="space-y-3">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gold">Histórico mensal</h3>
          <EliteAdminMonthlyHeatmap monthly={monthly} />
        </article>
      </section>

      <ElitePerformanceCharts
        operations={operations}
        monthly={monthly}
        schemaMissing={Boolean(loadError && /elite_operations|schema cache/i.test(loadError))}
      />

      <section className="space-y-3 rounded-xl border border-line/12 p-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-paper/55">Sinais salvos</h3>
          <p className="text-xs text-paper/45">
            {sortedOps.filter((o) => o.status === "active").length} em andamento · exibindo {opsSlice.length} de{" "}
            {sortedOps.length}
            {loadIncomplete ? ` (banco: ${totalInDb})` : null}
          </p>
        </div>
        <p className="text-[11px] text-paper/40">Em andamento ficam sempre no topo. Nº do sinal conforme cadastro/planilha.</p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-sm">
            <thead className="text-xs uppercase tracking-wider text-paper/45">
              <tr>
                <th className="px-2 py-2 text-left">Sinal</th>
                <th className="px-2 py-2 text-left">Ativo</th>
                <th className="px-2 py-2">Dir.</th>
                <th className="px-2 py-2 text-right">Pips</th>
                <th className="px-2 py-2">Mês</th>
                <th className="px-2 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {opsSlice.map((row) => {
                const pips = resolveOperationPips(row).pips;
                const pipClass = row.status === "active" ? "text-gold" : pips > 0 ? "text-rise" : pips < 0 ? "text-fall" : "text-paper/60";
                return (
                  <tr
                    key={row.id}
                    className={`border-t border-line/5 ${row.status === "active" ? "bg-rise/8" : ""}`}
                  >
                    <td className="px-2 py-2 font-mono font-bold text-gold">{row.signal_number ?? "—"}</td>
                    <td className="px-2 py-2 font-mono">{row.asset}</td>
                    <td className="px-2 py-2">{row.direction}</td>
                    <td className={`px-2 py-2 text-right font-mono tabular-nums ${pipClass}`}>
                      {row.status === "active" ? "—" : formatPipsDisplay(pips)}
                    </td>
                    <td className="px-2 py-2 text-paper/55">{row.report_month}</td>
                    <td className="px-2 py-2 text-xs">{tradeResultLabel(tradeResultFromRow(row))}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {hasMoreOps ? (
          <button
            type="button"
            onClick={() => setOpsVisible((n) => n + ELITE_ADMIN_OPS_LOAD_MORE)}
            className="w-full rounded-lg border border-gold/25 px-4 py-3 text-xs font-black uppercase tracking-[0.14em] text-gold transition hover:border-gold hover:bg-gold/10"
          >
            Ver mais (+{Math.min(ELITE_ADMIN_OPS_LOAD_MORE, sortedOps.length - opsVisible)})
          </button>
        ) : null}
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
                    <td className="px-2 py-2 text-right font-mono tabular-nums">
                      {resolveOperationPips(row).label}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <EliteMonthlyConsolidatedPanel
        monthly={monthly}
        title="Consolidado mensal (banco)"
        subtitle="Recalculado ao salvar sinais. Cards por ano com ativos resumidos."
      />

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
