"use client";

import { useMemo, useState } from "react";
import type { EliteMonthlyReportRow, EliteOperationRow } from "../types";
import {
  buildCumulativePipsLine,
  buildMonthlyPipsBars,
  buildTradeOutcomePie,
  downsampleLinePoints,
  filterMonthlyByYear,
  filterOperationsByYear,
  formatPipsDisplay,
  listOperationYears,
  type BarPoint,
  type LinePoint,
  type PieSlice,
} from "../chartSeries";

function EmptyChart({ children, compact }: { children: string; compact?: boolean }) {
  return (
    <div
      className={`flex items-center justify-center rounded-lg border border-dashed border-line/20 bg-black/20 px-4 text-center text-sm text-paper/40 ${
        compact ? "min-h-[96px]" : "min-h-[200px]"
      }`}
    >
      {children}
    </div>
  );
}

function lineAxisLabels(data: LinePoint[], max = 6): LinePoint[] {
  if (data.length <= max) return data;
  const picks = new Set<number>();
  for (let i = 0; i < max; i++) {
    picks.add(Math.round((i * (data.length - 1)) / (max - 1)));
  }
  return Array.from(picks)
    .sort((a, b) => a - b)
    .map((i) => data[i]);
}

function PerformanceLineChart({ data, compact }: { data: LinePoint[]; compact?: boolean }) {
  if (!data.length) return <EmptyChart compact={compact}>Sem pontos na série.</EmptyChart>;
  const width = 100;
  const height = compact ? 48 : 72;
  const max = Math.max(...data.map((d) => d.cumulative), 1);
  const min = Math.min(...data.map((d) => d.cumulative), 0);
  const span = max - min || 1;

  const points = data.map((d, i) => {
    const x = data.length === 1 ? 50 : (i / (data.length - 1)) * width;
    const y = height - ((d.cumulative - min) / span) * (height - 8) - 4;
    return { x, y, ...d };
  });

  const polyline = points.map((p) => `${p.x},${p.y}`).join(" ");
  const area = `0,${height} ${polyline} ${width},${height}`;
  const axisLabels = lineAxisLabels(data, compact ? 4 : 8);

  return (
    <figure>
      <svg viewBox={`0 0 ${width} ${height}`} className={compact ? "h-28 w-full" : "h-56 w-full"} role="img" aria-label="Pips acumulados">
        <defs>
          <linearGradient id="eliteAdminLine" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(198,153,74,0.45)" />
            <stop offset="100%" stopColor="rgba(15,143,86,0.05)" />
          </linearGradient>
        </defs>
        <polygon points={area} fill="url(#eliteAdminLine)" />
        <polyline
          points={polyline}
          fill="none"
          stroke="#c6994a"
          strokeWidth={compact ? 1.4 : 1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {!compact
          ? points.map((p) => (
              <circle key={`${p.label}-${p.cumulative}`} cx={p.x} cy={p.y} r="1.8" fill="#0f8f56" stroke="#c6994a" strokeWidth="0.6">
                <title>{`${p.label}: ${formatPipsDisplay(p.cumulative)} pips (trade ${formatPipsDisplay(p.delta)})`}</title>
              </circle>
            ))
          : null}
      </svg>
      <figcaption className="mt-2 flex flex-wrap justify-between gap-2 font-mono text-[10px] text-paper/45">
        {axisLabels.map((p) => (
          <span key={`${p.label}-axis`}>{p.label}</span>
        ))}
      </figcaption>
      {data.length ? (
        <p className="mt-1 text-[10px] text-paper/40">
          Acumulado:{" "}
          <span className={`font-mono font-bold ${data[data.length - 1].cumulative >= 0 ? "text-rise" : "text-fall"}`}>
            {formatPipsDisplay(data[data.length - 1].cumulative)}
          </span>
          {" · "}
          {data.length} trades
        </p>
      ) : null}
    </figure>
  );
}

function PerformanceBarChart({ data, compact }: { data: BarPoint[]; compact?: boolean }) {
  const max = Math.max(...data.map((d) => Math.abs(d.pips)), 1);
  const barMaxH = compact ? 72 : 160;

  return (
    <div className={`flex items-end gap-2 overflow-x-auto pb-2 pt-2 ${compact ? "min-h-[120px]" : "min-h-[220px]"}`}>
      {data.map((item) => {
        const h = Math.max(8, (Math.abs(item.pips) / max) * barMaxH);
        const positive = item.pips >= 0;
        return (
          <div
            key={item.label}
            className={`flex flex-col items-center gap-1 ${compact ? "min-w-[36px] flex-1" : "min-w-[44px] flex-1"}`}
            title={`${item.signals} sinais`}
          >
            <span className={`font-mono text-[9px] font-bold tabular-nums ${positive ? "text-rise" : "text-fall"}`}>
              {formatPipsDisplay(item.pips)}
            </span>
            <div
              className={`w-full max-w-[48px] rounded-t-sm ${positive ? "bg-rise/75" : "bg-fall/75"}`}
              style={{ height: `${h}px` }}
            />
            <span className="text-center text-[8px] font-bold uppercase tracking-wide text-gold/90">{item.label}</span>
          </div>
        );
      })}
    </div>
  );
}

function PerformancePieChart({ slices, compact }: { slices: PieSlice[]; compact?: boolean }) {
  const total = slices.reduce((s, x) => s + x.value, 0);
  const radius = compact ? 44 : 58;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  if (!total) return <EmptyChart compact={compact}>Sem dados para distribuição.</EmptyChart>;

  return (
    <div className={`grid gap-3 ${compact ? "grid-cols-[minmax(100px,120px)_1fr] items-center" : "md:grid-cols-[minmax(140px,180px)_1fr] md:items-center"}`}>
      <svg viewBox="0 0 160 160" className={compact ? "mx-auto h-28 w-28" : "mx-auto h-40 w-40"}>
        <circle cx="80" cy="80" r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="18" />
        {slices.map((slice) => {
          const length = (slice.value / total) * circumference;
          const node = (
            <circle
              key={slice.label}
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke={slice.color}
              strokeWidth="18"
              strokeDasharray={`${length} ${circumference - length}`}
              strokeDashoffset={-offset}
              transform="rotate(-90 80 80)"
              strokeLinecap="butt"
            />
          );
          offset += length;
          return node;
        })}
        <text x="80" y="76" textAnchor="middle" className="fill-paper font-bold" fontSize={compact ? 18 : 22}>
          {total}
        </text>
        <text x="80" y="94" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="9">
          sinais
        </text>
      </svg>
      <ul className={`space-y-1.5 ${compact ? "text-xs" : "text-sm"}`}>
        {slices.map((slice) => (
          <li key={slice.label} className="flex items-center justify-between gap-2 border-b border-white/6 pb-1">
            <span className="flex items-center gap-2 text-paper/75">
              <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: slice.color }} />
              {slice.label}
            </span>
            <span className="font-mono tabular-nums text-paper/55">
              {slice.value} ({((slice.value / total) * 100).toFixed(0)}%)
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

type ChartView = "line" | "bars" | "pie" | "all";

export function ElitePerformanceCharts({
  operations,
  monthly,
  schemaMissing,
}: {
  operations: EliteOperationRow[];
  monthly: EliteMonthlyReportRow[];
  schemaMissing?: boolean;
}) {
  const years = useMemo(() => listOperationYears(operations), [operations]);
  const [year, setYear] = useState<number | "all">("all");
  const [monthsWindow, setMonthsWindow] = useState<6 | 12 | 24>(12);
  const [chartView, setChartView] = useState<ChartView>("all");
  const [expanded, setExpanded] = useState(false);

  const filteredOps = useMemo(() => filterOperationsByYear(operations, year), [operations, year]);
  const filteredMonthly = useMemo(() => filterMonthlyByYear(monthly, year), [monthly, year]);

  const lineRaw = useMemo(() => buildCumulativePipsLine(filteredOps), [filteredOps]);
  const line = useMemo(() => downsampleLinePoints(lineRaw, expanded ? 80 : 36), [lineRaw, expanded]);
  const bars = useMemo(
    () => buildMonthlyPipsBars(filteredMonthly, filteredOps, { limitMonths: monthsWindow }),
    [filteredMonthly, filteredOps, monthsWindow],
  );
  const pie = useMemo(() => buildTradeOutcomePie(filteredOps), [filteredOps]);

  const showLine = chartView === "all" || chartView === "line";
  const showBars = chartView === "all" || chartView === "bars";
  const showPie = chartView === "all" || chartView === "pie";
  const compact = !expanded;

  if (schemaMissing) {
    return (
      <section className="rounded-xl border border-line/12 p-6 opacity-60">
        <h3 className="text-sm font-bold uppercase tracking-wider text-paper/55">Gráficos</h3>
        <p className="mt-2 text-sm text-paper/45">Instale as tabelas Elite para ver linha, barras e pizza com dados reais.</p>
      </section>
    );
  }

  return (
    <section className="rounded-xl border border-gold/20 bg-black/25 p-4 md:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-gold">Gráficos de desempenho</h3>
          <p className="mt-1 max-w-2xl text-xs text-paper/50">
            Visão compacta por padrão. Use os filtros e expanda para ver detalhes, mais trades na linha e barras maiores.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="shrink-0 border border-gold/30 px-3 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-gold transition hover:border-gold hover:bg-gold/10"
        >
          {expanded ? "Modo compacto" : "Mais informações"}
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <label className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-xs">
          <span className="font-bold uppercase tracking-wide text-paper/45">Ano</span>
          <select
            value={year === "all" ? "all" : String(year)}
            onChange={(e) => setYear(e.target.value === "all" ? "all" : Number(e.target.value))}
            className="bg-transparent font-mono text-paper outline-none"
          >
            <option value="all">Todos</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-xs">
          <span className="font-bold uppercase tracking-wide text-paper/45">Meses</span>
          <select
            value={monthsWindow}
            onChange={(e) => setMonthsWindow(Number(e.target.value) as 6 | 12 | 24)}
            className="bg-transparent font-mono text-paper outline-none"
          >
            <option value={6}>6</option>
            <option value={12}>12</option>
            <option value={24}>24</option>
          </select>
        </label>
        <label className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-xs">
          <span className="font-bold uppercase tracking-wide text-paper/45">Gráfico</span>
          <select
            value={chartView}
            onChange={(e) => setChartView(e.target.value as ChartView)}
            className="bg-transparent font-mono text-paper outline-none"
          >
            <option value="all">Todos</option>
            <option value="line">Linha</option>
            <option value="bars">Barras</option>
            <option value="pie">Pizza</option>
          </select>
        </label>
      </div>

      <div className={`mt-5 grid gap-5 ${expanded ? "gap-8 lg:grid-cols-2" : "lg:grid-cols-2"}`}>
        {showLine ? (
          <article className="space-y-2 rounded-lg border border-line/12 p-3 md:p-4">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gold">Linha — pips acumulados</h4>
            {line.length ? (
              <PerformanceLineChart data={line} compact={compact} />
            ) : (
              <EmptyChart compact={compact}>Salve trades fechados para montar a curva.</EmptyChart>
            )}
          </article>
        ) : null}
        {showBars ? (
          <article className="space-y-2 rounded-lg border border-line/12 p-3 md:p-4">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gold">Barras — pips por mês</h4>
            {bars.length ? (
              <PerformanceBarChart data={bars} compact={compact} />
            ) : (
              <EmptyChart compact={compact}>Consolidado mensal aparece após salvar operações.</EmptyChart>
            )}
          </article>
        ) : null}
        {showPie ? (
          <article className={`space-y-2 rounded-lg border border-line/12 p-3 md:p-4 ${chartView === "all" ? "lg:col-span-2" : ""}`}>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gold">Pizza — resultado das operações</h4>
            {pie.length ? <PerformancePieChart slices={pie} compact={compact} /> : <EmptyChart compact={compact}>Cadastre operações públicas.</EmptyChart>}
          </article>
        ) : null}
      </div>
    </section>
  );
}
