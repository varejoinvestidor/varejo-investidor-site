import { Suspense } from "react";
import { AnalyticsAccessChart, AnalyticsShareBar } from "../../../../src/analytics/admin/ViAnalyticsCharts";
import { ViAnalyticsPeriodNav } from "../../../../src/analytics/admin/ViAnalyticsPeriodNav";
import { analyticsSchemaHasEvents, analyticsSchemaHasRegions } from "../../../../src/analytics/admin/schemaState";
import { loadAnalyticsDashboard, probeAnalyticsSchema } from "../../../../src/analytics/admin/queries";
import { getDashboardCounts } from "../../../../src/publisher/supabase/server";
import type { AnalyticsPeriodKey } from "../../../../src/analytics/types";

function StatCard({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-xl border border-line/12 bg-paper/[0.02] p-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-paper/50">{label}</p>
      <p className="mt-2 font-serif text-3xl text-paper">{value}</p>
      {hint ? <p className="mt-1 text-xs text-paper/40">{hint}</p> : null}
    </div>
  );
}

type Props = { searchParams?: { period?: string } };

export default async function ViAdministradorOverviewPage({ searchParams }: Props) {
  const period = (searchParams?.period ?? "30d") as AnalyticsPeriodKey;
  const schema = await probeAnalyticsSchema();
  const publisherCounts = await getDashboardCounts();
  const dashboard = analyticsSchemaHasEvents(schema) ? await loadAnalyticsDashboard(period) : null;

  const summary = dashboard?.summary;
  const maxPath = dashboard?.topPaths[0]?.views ?? 1;
  const maxClick = dashboard?.topClicks[0]?.clicks ?? 1;

  return (
    <div className="space-y-8">
      <Suspense fallback={null}>
        <ViAnalyticsPeriodNav />
      </Suspense>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Page views"
          value={summary ? summary.page_views.toLocaleString("pt-BR") : "—"}
          hint={dashboard ? `Período: ${dashboard.range.label}` : "Schema pendente"}
        />
        <StatCard label="Cliques rastreados" value={summary ? summary.clicks.toLocaleString("pt-BR") : "—"} />
        <StatCard label="Sessões únicas" value={summary ? summary.unique_sessions.toLocaleString("pt-BR") : "—"} />
        <StatCard
          label="Views em artigos (Publisher)"
          value={publisherCounts ? publisherCounts.views.toLocaleString("pt-BR") : "—"}
          hint="Contador editorial em /artigos"
        />
      </section>

      <section className="rounded-xl border border-line/12 bg-paper/[0.02] p-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-paper/70">Acessos no período</h3>
        {dashboard ? (
          <div className="mt-5">
            <AnalyticsAccessChart data={dashboard.series} grain={dashboard.range.grain} metric="page_views" />
          </div>
        ) : (
          <p className="mt-4 text-sm text-paper/55">Instale o schema para ver a série temporal.</p>
        )}
      </section>

      <section className="rounded-xl border border-line/12 bg-paper/[0.02] p-6">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-paper/70">Acessos por região</h3>
          <a href="/admin/vi-administrador/regioes" className="text-xs font-bold uppercase tracking-wider text-gold hover:underline">
            Ver completo →
          </a>
        </div>
        <div className="mt-5 grid gap-4">
          {analyticsSchemaHasRegions(schema) && dashboard?.byRegion.length ? (
            dashboard.byRegion.map((row) => (
              <AnalyticsShareBar
                key={row.region_id}
                label={row.region_label || row.region_id}
                value={row.page_views}
                max={dashboard.byRegion[0]?.page_views ?? 1}
              />
            ))
          ) : (
            <p className="text-sm text-paper/50">
              {schema === "partial"
                ? "Instale a migration de regiões para ver o mapa de acessos."
                : "Sem dados regionais ainda."}
            </p>
          )}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-line/12 bg-paper/[0.02] p-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-paper/70">Top páginas</h3>
          <div className="mt-5 grid gap-4">
            {dashboard?.topPaths.length ? (
              dashboard.topPaths.map((row) => (
                <AnalyticsShareBar key={row.path} label={row.path} value={row.views} max={maxPath} />
              ))
            ) : (
              <p className="text-sm text-paper/50">Nenhum dado ainda.</p>
            )}
          </div>
        </div>
        <div className="rounded-xl border border-line/12 bg-paper/[0.02] p-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-paper/70">Top cliques / CTAs</h3>
          <div className="mt-5 grid gap-4">
            {dashboard?.topClicks.length ? (
              dashboard.topClicks.map((row) => (
                <AnalyticsShareBar
                  key={row.element_key}
                  label={row.element_label ?? row.element_key}
                  value={row.clicks}
                  max={maxClick}
                />
              ))
            ) : (
              <p className="text-sm text-paper/50">Nenhum clique registrado.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
