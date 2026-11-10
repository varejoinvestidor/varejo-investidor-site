import Link from "next/link";
import { Suspense } from "react";
import { AnalyticsShareBar } from "../../../../../src/analytics/admin/ViAnalyticsCharts";
import { ViAnalyticsPeriodNav } from "../../../../../src/analytics/admin/ViAnalyticsPeriodNav";
import { analyticsSchemaHasRegions } from "../../../../../src/analytics/admin/schemaState";
import { loadAnalyticsGeoReport, probeAnalyticsSchema } from "../../../../../src/analytics/admin/queries";
import { countryDisplayName, regionLabel } from "../../../../../src/analytics/regions";
import type { AnalyticsPeriodKey } from "../../../../../src/analytics/types";

type Props = { searchParams?: { period?: string } };

export default async function ViAdministradorRegioesPage({ searchParams }: Props) {
  const period = (searchParams?.period ?? "30d") as AnalyticsPeriodKey;
  const schema = await probeAnalyticsSchema();
  const report = analyticsSchemaHasRegions(schema) ? await loadAnalyticsGeoReport(period) : null;

  const maxRegion = report?.byRegion[0]?.page_views ?? 1;
  const maxCountry = report?.byCountry[0]?.page_views ?? 1;
  const maxLocale = report?.byLocale[0]?.page_views ?? 1;
  const totalViews = report?.summary?.page_views ?? 0;

  return (
    <div className="space-y-8">
      <Suspense fallback={null}>
        <ViAnalyticsPeriodNav />
      </Suspense>

      <section className="rounded-xl border border-line/12 bg-paper/[0.02] p-5 text-sm text-paper/65">
        <p>
          País vem do CDN (ex.: <code className="text-gold">x-vercel-ip-country</code>); quando ausente, usamos fuso
          horário e idioma da página. Execute{" "}
          <code className="text-gold">20260319120000_vi_analytics_regions.sql</code> após a migration base para ver
          países e macro-regiões completos.
        </p>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <GeoPanel title="Macro-regiões" subtitle={`${report?.range.label ?? "—"} · ${totalViews.toLocaleString("pt-BR")} views`}>
          {report?.byRegion.length ? (
            report.byRegion.map((row) => (
              <AnalyticsShareBar
                key={row.region_id}
                label={row.region_label || regionLabel(row.region_id)}
                value={row.page_views}
                max={maxRegion}
                hint={`${row.unique_sessions.toLocaleString("pt-BR")} sessões · ${row.clicks.toLocaleString("pt-BR")} cliques`}
              />
            ))
          ) : (
            <EmptyGeo />
          )}
        </GeoPanel>

        <GeoPanel title="Idioma do site (locale)" subtitle="Segmento da URL ou pt quando sem prefixo">
          {report?.byLocale.length ? (
            report.byLocale.map((row) => (
              <AnalyticsShareBar
                key={row.locale}
                label={row.locale === "—" ? "Indefinido" : row.locale}
                value={row.page_views}
                max={maxLocale}
                hint={`${row.unique_sessions.toLocaleString("pt-BR")} sessões`}
              />
            ))
          ) : (
            <EmptyGeo />
          )}
        </GeoPanel>
      </section>

      <section className="rounded-xl border border-line/12 bg-paper/[0.02] p-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-paper/70">Países (top views)</h3>
        <p className="mt-1 text-xs text-paper/45">Código ISO-2 · agrupado por page views no período</p>
        <div className="mt-5 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-line/15 text-xs uppercase tracking-wider text-paper/45">
              <tr>
                <th className="px-3 py-2">#</th>
                <th className="px-3 py-2">País</th>
                <th className="px-3 py-2">Região</th>
                <th className="px-3 py-2 text-right">Views</th>
                <th className="px-3 py-2 text-right">Sessões</th>
                <th className="px-3 py-2 text-right">Cliques</th>
                <th className="px-3 py-2 text-right">%</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/10 text-paper/80">
              {report?.byCountry.length ? (
                report.byCountry.map((row, index) => {
                  const pct = totalViews > 0 ? (row.page_views / totalViews) * 100 : 0;
                  return (
                    <tr key={row.country_code}>
                      <td className="px-3 py-2 font-mono text-xs text-paper/45">{index + 1}</td>
                      <td className="px-3 py-2">
                        <span className="font-medium text-paper">{countryDisplayName(row.country_code)}</span>
                        <span className="ml-2 font-mono text-xs text-paper/45">{row.country_code}</span>
                      </td>
                      <td className="px-3 py-2 text-paper/60">{regionLabel(row.region_id)}</td>
                      <td className="px-3 py-2 text-right font-bold tabular-nums text-gold">
                        {row.page_views.toLocaleString("pt-BR")}
                      </td>
                      <td className="px-3 py-2 text-right tabular-nums">{row.unique_sessions.toLocaleString("pt-BR")}</td>
                      <td className="px-3 py-2 text-right tabular-nums">{row.clicks.toLocaleString("pt-BR")}</td>
                      <td className="px-3 py-2 text-right tabular-nums text-paper/55">{pct.toFixed(1)}%</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="px-3 py-8 text-center text-paper/50">
                    Sem dados de país no período.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {report?.byCountry.length ? (
          <div className="mt-6 grid gap-4">
            {report.byCountry.slice(0, 8).map((row) => (
              <AnalyticsShareBar
                key={row.country_code}
                label={`${countryDisplayName(row.country_code)} (${row.country_code})`}
                value={row.page_views}
                max={maxCountry}
              />
            ))}
          </div>
        ) : null}
      </section>

      <section className="rounded-xl border border-gold/20 bg-gold/[0.06] p-5 text-sm text-paper/70">
        <p>
          Combine com{" "}
          <Link href="/admin/vi-administrador/relatorios" className="text-gold hover:underline">
            Relatórios
          </Link>{" "}
          para série temporal e exportação manual das tabelas.
        </p>
      </section>
    </div>
  );
}

function GeoPanel({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-line/12 bg-paper/[0.02] p-6">
      <h3 className="text-sm font-bold uppercase tracking-wider text-paper/70">{title}</h3>
      <p className="mt-1 text-xs text-paper/45">{subtitle}</p>
      <div className="mt-5 grid gap-4">{children}</div>
    </div>
  );
}

function EmptyGeo() {
  return <p className="text-sm text-paper/50">Nenhum dado no período ou migration de regiões pendente.</p>;
}
