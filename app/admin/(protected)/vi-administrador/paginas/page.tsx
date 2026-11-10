import { Suspense } from "react";
import { ViAnalyticsPeriodNav } from "../../../../../src/analytics/admin/ViAnalyticsPeriodNav";
import { analyticsSchemaHasEvents } from "../../../../../src/analytics/admin/schemaState";
import { fetchTopPaths, probeAnalyticsSchema } from "../../../../../src/analytics/admin/queries";
import { resolveAnalyticsRange } from "../../../../../src/analytics/periods";
import type { AnalyticsPeriodKey } from "../../../../../src/analytics/types";

type Props = { searchParams?: { period?: string } };

export default async function ViAdministradorPaginasPage({ searchParams }: Props) {
  const period = (searchParams?.period ?? "30d") as AnalyticsPeriodKey;
  const range = resolveAnalyticsRange(period);
  const schema = await probeAnalyticsSchema();
  const rows = analyticsSchemaHasEvents(schema) ? await fetchTopPaths(range.from, range.to, 50) : [];

  return (
    <div className="space-y-6">
      <Suspense fallback={null}>
        <ViAnalyticsPeriodNav />
      </Suspense>

      <SectionIntro title="Páginas mais vistas" text={`Ranking por URL no período ${range.label}.`} />

      <div className="overflow-x-auto rounded-xl border border-line/12">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-line/15 bg-paper/[0.03] text-xs uppercase tracking-wider text-paper/45">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Caminho</th>
              <th className="px-4 py-3 text-right">Views</th>
              <th className="px-4 py-3 text-right">Abrir</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line/10">
            {rows.length ? (
              rows.map((row, index) => (
                <tr key={row.path} className="text-paper/80">
                  <td className="px-4 py-3 font-mono text-xs text-paper/45">{index + 1}</td>
                  <td className="px-4 py-3 font-mono text-xs text-paper">{row.path}</td>
                  <td className="px-4 py-3 text-right font-bold tabular-nums text-gold">{row.views.toLocaleString("pt-BR")}</td>
                  <td className="px-4 py-3 text-right">
                    <a href={row.path} target="_blank" rel="noreferrer" className="text-xs text-rise hover:underline">
                      Ver ↗
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-paper/50">
                  Sem page views no período ou schema não instalado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SectionIntro({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <h3 className="text-sm font-bold uppercase tracking-wider text-paper/70">{title}</h3>
      <p className="mt-2 text-sm text-paper/55">{text}</p>
    </div>
  );
}
