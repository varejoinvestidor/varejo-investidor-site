import { Suspense } from "react";
import { ViAnalyticsPeriodNav } from "../../../../../src/analytics/admin/ViAnalyticsPeriodNav";
import { fetchTopClicks, probeAnalyticsSchema } from "../../../../../src/analytics/admin/queries";
import { resolveAnalyticsRange } from "../../../../../src/analytics/periods";
import type { AnalyticsPeriodKey } from "../../../../../src/analytics/types";

type Props = { searchParams?: { period?: string } };

export default async function ViAdministradorCliquesPage({ searchParams }: Props) {
  const period = (searchParams?.period ?? "30d") as AnalyticsPeriodKey;
  const range = resolveAnalyticsRange(period);
  const schema = await probeAnalyticsSchema();
  const rows = schema === "ok" ? await fetchTopClicks(range.from, range.to, 50) : [];

  return (
    <div className="space-y-6">
      <Suspense fallback={null}>
        <ViAnalyticsPeriodNav />
      </Suspense>

      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-paper/70">Botões e CTAs mais clicados</h3>
        <p className="mt-2 text-sm text-paper/55">
          Cliques em links, botões e elementos com <code className="text-gold">data-vi-track</code>. Use o atributo para
          rotular campanhas (ex.: <code className="text-gold">data-vi-track=&quot;cta-formiga-hero&quot;</code>).
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-line/12">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-line/15 bg-paper/[0.03] text-xs uppercase tracking-wider text-paper/45">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Rótulo / chave</th>
              <th className="px-4 py-3">Página exemplo</th>
              <th className="px-4 py-3 text-right">Cliques</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line/10">
            {rows.length ? (
              rows.map((row, index) => (
                <tr key={row.element_key} className="text-paper/80">
                  <td className="px-4 py-3 font-mono text-xs text-paper/45">{index + 1}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-paper">{row.element_label ?? row.element_key}</p>
                    <p className="mt-0.5 font-mono text-[10px] text-paper/40">{row.element_key}</p>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-paper/55">{row.sample_path ?? "—"}</td>
                  <td className="px-4 py-3 text-right font-bold tabular-nums text-gold">{row.clicks.toLocaleString("pt-BR")}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-paper/50">
                  Sem cliques no período ou schema não instalado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
