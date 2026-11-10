import Link from "next/link";
import { Suspense } from "react";
import { AnalyticsAccessChart } from "../../../../../src/analytics/admin/ViAnalyticsCharts";
import { ViAnalyticsPeriodNav } from "../../../../../src/analytics/admin/ViAnalyticsPeriodNav";
import {
  fetchAnalyticsTimeseries,
  fetchAnalyticsSummary,
  probeAnalyticsSchema,
} from "../../../../../src/analytics/admin/queries";
import { resolveAnalyticsRange } from "../../../../../src/analytics/periods";
import type { AnalyticsPeriodKey } from "../../../../../src/analytics/types";

type Props = { searchParams?: { period?: string } };

export default async function ViAdministradorRelatoriosPage({ searchParams }: Props) {
  const period = (searchParams?.period ?? "30d") as AnalyticsPeriodKey;
  const range = resolveAnalyticsRange(period);
  const schema = await probeAnalyticsSchema();

  const [daily, weekly, monthly] =
    schema === "ok"
      ? await Promise.all([
          fetchAnalyticsTimeseries(range.from, range.to, "day"),
          fetchAnalyticsTimeseries(range.from, range.to, "week"),
          fetchAnalyticsTimeseries(range.from, range.to, "month"),
        ])
      : [[], [], []];

  const [summaryToday, summary7, summary30] =
    schema === "ok"
      ? await Promise.all([
          fetchAnalyticsSummary(resolveAnalyticsRange("today").from, resolveAnalyticsRange("today").to),
          fetchAnalyticsSummary(resolveAnalyticsRange("7d").from, resolveAnalyticsRange("7d").to),
          fetchAnalyticsSummary(resolveAnalyticsRange("30d").from, resolveAnalyticsRange("30d").to),
        ])
      : [null, null, null];

  return (
    <div className="space-y-10">
      <Suspense fallback={null}>
        <ViAnalyticsPeriodNav />
      </Suspense>

      <section className="grid gap-4 sm:grid-cols-3">
        <SummaryCard title="Relatório diário (hoje)" summary={summaryToday} />
        <SummaryCard title="Relatório semanal (7d)" summary={summary7} />
        <SummaryCard title="Relatório mensal (30d)" summary={summary30} />
      </section>

      <ReportBlock title="Acesso diário" subtitle={`Granularidade dia — ${range.label}`} data={daily} grain="day" />
      <ReportBlock title="Acesso semanal" subtitle="Soma por semana (início na segunda, fuso São Paulo)" data={weekly} grain="week" />
      <ReportBlock title="Acesso mensal" subtitle="Soma por mês civil" data={monthly} grain="month" />

      <section className="rounded-xl border border-gold/20 bg-gold/[0.06] p-5 text-sm text-paper/70">
        <p>
          Exporte manualmente copiando a tabela ou integre depois com BI. Para campanhas, marque CTAs com{" "}
          <code className="text-gold">data-vi-track</code> e acompanhe em{" "}
          <Link href="/admin/vi-administrador/cliques" className="text-gold hover:underline">
            Cliques & CTAs
          </Link>
          .
        </p>
      </section>
    </div>
  );
}

function SummaryCard({
  title,
  summary,
}: {
  title: string;
  summary: { page_views: number; clicks: number; unique_sessions: number } | null;
}) {
  return (
    <div className="rounded-xl border border-line/12 bg-paper/[0.02] p-5">
      <p className="text-xs font-bold uppercase tracking-wider text-paper/50">{title}</p>
      <dl className="mt-4 grid gap-2 text-sm">
        <SummaryRow label="Page views" value={summary?.page_views} />
        <SummaryRow label="Cliques" value={summary?.clicks} />
        <SummaryRow label="Sessões" value={summary?.unique_sessions} />
      </dl>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value?: number }) {
  return (
    <div className="flex justify-between gap-2">
      <dt className="text-paper/55">{label}</dt>
      <dd className="font-mono font-bold tabular-nums text-paper">{value != null ? value.toLocaleString("pt-BR") : "—"}</dd>
    </div>
  );
}

function ReportBlock({
  title,
  subtitle,
  data,
  grain,
}: {
  title: string;
  subtitle: string;
  data: Awaited<ReturnType<typeof fetchAnalyticsTimeseries>>;
  grain: "day" | "week" | "month";
}) {
  return (
    <section className="rounded-xl border border-line/12 bg-paper/[0.02] p-6">
      <h3 className="text-sm font-bold uppercase tracking-wider text-paper/70">{title}</h3>
      <p className="mt-1 text-xs text-paper/45">{subtitle}</p>
      <div className="mt-5">
        <AnalyticsAccessChart data={data} grain={grain} metric="page_views" />
      </div>
      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full text-left text-xs">
          <thead className="text-paper/45 uppercase tracking-wider">
            <tr>
              <th className="px-2 py-2">Bucket</th>
              <th className="px-2 py-2 text-right">Views</th>
              <th className="px-2 py-2 text-right">Cliques</th>
              <th className="px-2 py-2 text-right">Sessões</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line/10 text-paper/75">
            {data.map((row) => (
              <tr key={row.bucket}>
                <td className="px-2 py-2 font-mono">{row.bucket}</td>
                <td className="px-2 py-2 text-right tabular-nums">{row.page_views.toLocaleString("pt-BR")}</td>
                <td className="px-2 py-2 text-right tabular-nums">{row.clicks.toLocaleString("pt-BR")}</td>
                <td className="px-2 py-2 text-right tabular-nums">{row.unique_sessions.toLocaleString("pt-BR")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
