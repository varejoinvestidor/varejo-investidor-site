"use client";

import { useMemo } from "react";
import type { EliteMonthlyReportRow, EliteOperationRow } from "../types";
import {
  buildCumulativePipsLine,
  buildMonthlyPipsBars,
  buildTradeOutcomePie,
  formatPipsDisplay,
  type BarPoint,
  type LinePoint,
  type PieSlice,
} from "../chartSeries";

function EmptyChart({ children }: { children: string }) {
  return (
    <div className="flex min-h-[200px] items-center justify-center rounded-lg border border-dashed border-line/20 bg-black/20 px-4 text-center text-sm text-paper/40">
      {children}
    </div>
  );
}

function PerformanceLineChart({ data }: { data: LinePoint[] }) {
  const width = 100;
  const height = 72;
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

  return (
    <figure>
      <svg viewBox={`0 0 ${width} ${height}`} className="h-56 w-full" role="img" aria-label="Pips acumulados">
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
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {points.map((p) => (
          <circle key={p.label} cx={p.x} cy={p.y} r="1.8" fill="#0f8f56" stroke="#c6994a" strokeWidth="0.6">
            <title>{`${p.label}: ${formatPipsDisplay(p.cumulative)} pips (trade ${formatPipsDisplay(p.delta)})`}</title>
          </circle>
        ))}
      </svg>
      <figcaption className="mt-2 flex flex-wrap justify-between gap-1 font-mono text-[10px] text-paper/45">
        {points.map((p) => (
          <span key={p.label}>{p.label}</span>
        ))}
      </figcaption>
    </figure>
  );
}

function PerformanceBarChart({ data }: { data: BarPoint[] }) {
  const max = Math.max(...data.map((d) => Math.abs(d.pips)), 1);

  return (
    <div className="flex min-h-[220px] items-end gap-2 overflow-x-auto pb-2 pt-4">
      {data.map((item) => {
        const h = Math.max(12, (Math.abs(item.pips) / max) * 160);
        const positive = item.pips >= 0;
        return (
          <div key={item.label} className="flex min-w-[44px] flex-1 flex-col items-center gap-2" title={`${item.signals} sinais`}>
            <span className={`font-mono text-[10px] font-bold tabular-nums ${positive ? "text-rise" : "text-fall"}`}>
              {formatPipsDisplay(item.pips)}
            </span>
            <div
              className={`w-full max-w-[52px] rounded-t-sm ${positive ? "bg-rise/75" : "bg-fall/75"}`}
              style={{ height: `${h}px` }}
            />
            <span className="text-center text-[9px] font-bold uppercase tracking-wide text-gold/90">{item.label}</span>
          </div>
        );
      })}
    </div>
  );
}

function PerformancePieChart({ slices }: { slices: PieSlice[] }) {
  const total = slices.reduce((s, x) => s + x.value, 0);
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  if (!total) return <EmptyChart>Sem dados para distribuição.</EmptyChart>;

  return (
    <div className="grid gap-4 md:grid-cols-[minmax(140px,180px)_1fr] md:items-center">
      <svg viewBox="0 0 160 160" className="mx-auto h-40 w-40">
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
        <text x="80" y="76" textAnchor="middle" className="fill-paper text-[22px] font-bold" fontSize="22">
          {total}
        </text>
        <text x="80" y="94" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="9">
          sinais
        </text>
      </svg>
      <ul className="space-y-2 text-sm">
        {slices.map((slice) => (
          <li key={slice.label} className="flex items-center justify-between gap-3 border-b border-white/6 pb-1.5">
            <span className="flex items-center gap-2 text-paper/75">
              <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: slice.color }} />
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

export function ElitePerformanceCharts({
  operations,
  monthly,
  schemaMissing,
}: {
  operations: EliteOperationRow[];
  monthly: EliteMonthlyReportRow[];
  schemaMissing?: boolean;
}) {
  const line = useMemo(() => buildCumulativePipsLine(operations), [operations]);
  const bars = useMemo(() => buildMonthlyPipsBars(monthly, operations), [monthly, operations]);
  const pie = useMemo(() => buildTradeOutcomePie(operations), [operations]);

  if (schemaMissing) {
    return (
      <section className="rounded-xl border border-line/12 p-6 opacity-60">
        <h3 className="text-sm font-bold uppercase tracking-wider text-paper/55">Gráficos</h3>
        <p className="mt-2 text-sm text-paper/45">Instale as tabelas Elite para ver linha, barras e pizza com dados reais.</p>
      </section>
    );
  }

  return (
    <section className="space-y-6 rounded-xl border border-gold/20 bg-black/25 p-6">
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-gold">Gráficos de desempenho</h3>
        <p className="mt-1 text-xs text-paper/50">
          Linha = pips acumulados (trades públicos fechados). Barras = soma por mês do relatório (mesmos pips dos cards).
          Pizza = take, stop, manual e em andamento.
        </p>
      </div>
      <div className="grid gap-8 lg:grid-cols-2">
        <article className="space-y-3 rounded-lg border border-line/12 p-4">
          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-gold">Linha — pips acumulados</h4>
          {line.length ? <PerformanceLineChart data={line} /> : <EmptyChart>Salve trades fechados para montar a curva.</EmptyChart>}
        </article>
        <article className="space-y-3 rounded-lg border border-line/12 p-4">
          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-gold">Barras — pips por mês</h4>
          {bars.length ? <PerformanceBarChart data={bars} /> : <EmptyChart>Consolidado mensal aparece após salvar operações.</EmptyChart>}
        </article>
        <article className="space-y-3 rounded-lg border border-line/12 p-4 lg:col-span-2">
          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-gold">Pizza — resultado das operações</h4>
          {pie.length ? (
            <PerformancePieChart slices={pie} />
          ) : (
            <EmptyChart>Cadastre operações públicas para ver take / stop / em andamento.</EmptyChart>
          )}
        </article>
      </div>
    </section>
  );
}
