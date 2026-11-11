"use client";

import { useMemo, useState } from "react";
import { formatPipsDisplay } from "./pips";
import type { EliteOperationRow } from "./types";
import { buildPeriodDailyTrend, type PeriodTrendPoint } from "./traderPerformance";

function MultiMetricLineChart({ data, compact }: { data: PeriodTrendPoint[]; compact?: boolean }) {
  if (!data.length) {
    return (
      <p className="flex min-h-[140px] items-center justify-center rounded-lg border border-dashed border-line/20 text-sm text-paper/40">
        Sem dados no período.
      </p>
    );
  }

  const width = 100;
  const height = compact ? 52 : 80;
  const maxSignals = Math.max(...data.map((d) => d.signals), 1);
  const maxCum = Math.max(...data.map((d) => Math.abs(d.cumulativePips)), 1);
  const minCum = Math.min(...data.map((d) => d.cumulativePips), 0);
  const cumSpan = maxCum - minCum || 1;

  const signalPoints = data.map((d, i) => {
    const x = data.length === 1 ? 50 : (i / (data.length - 1)) * width;
    const y = height - (d.signals / maxSignals) * (height - 10) - 5;
    return { x, y, d };
  });

  const pipsPoints = data.map((d, i) => {
    const x = data.length === 1 ? 50 : (i / (data.length - 1)) * width;
    const y = height - ((d.cumulativePips - minCum) / cumSpan) * (height - 10) - 5;
    return { x, y, d };
  });

  const winPoints = data.map((d, i) => {
    const x = data.length === 1 ? 50 : (i / (data.length - 1)) * width;
    const y = height - (d.winRate / 100) * (height - 10) - 5;
    return { x, y, d };
  });

  const poly = (pts: { x: number; y: number }[]) => pts.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <figure>
      <svg viewBox={`0 0 ${width} ${height}`} className={compact ? "h-36 w-full" : "h-48 w-full"} role="img" aria-label="Tendência diária">
        {signalPoints.map((p) => (
          <rect
            key={`bar-${p.d.label}`}
            x={p.x - 1.8}
            y={p.y}
            width={3.6}
            height={height - p.y - 2}
            fill="rgba(198,153,74,0.35)"
            rx={0.4}
          >
            <title>{`${p.d.label}: ${p.d.signals} sinal(is)`}</title>
          </rect>
        ))}
        <polyline points={poly(pipsPoints)} fill="none" stroke="#0f8f56" strokeWidth={1.6} strokeLinecap="round" />
        <polyline points={poly(winPoints)} fill="none" stroke="#8b5cf6" strokeWidth={1.2} strokeDasharray="2 1.5" strokeLinecap="round" />
        {pipsPoints.map((p) => (
          <circle key={`pip-${p.d.label}`} cx={p.x} cy={p.y} r="1.4" fill="#0f8f56">
            <title>{`${p.d.label}: ${formatPipsDisplay(p.d.cumulativePips)} acumulado`}</title>
          </circle>
        ))}
      </svg>
      <figcaption className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-paper/50">
        <span>
          <span className="inline-block h-2 w-3 bg-gold/40 align-middle" /> Sinais / dia
        </span>
        <span>
          <span className="inline-block h-0.5 w-4 bg-rise align-middle" /> Pips acumulados
        </span>
        <span>
          <span className="inline-block h-0.5 w-4 border-t border-dashed border-violet-400 align-middle" /> Taxa de acerto %
        </span>
      </figcaption>
      <div className="mt-2 flex flex-wrap justify-between gap-1 font-mono text-[9px] text-paper/40">
        {data.map((d) => (
          <span key={d.label}>{d.label}</span>
        ))}
      </div>
    </figure>
  );
}

export function ElitePeriodTrendChart({
  operations,
  variant = "admin",
}: {
  operations: EliteOperationRow[];
  variant?: "admin" | "public";
}) {
  const [range, setRange] = useState<"week" | "month">("week");
  const trend = useMemo(() => buildPeriodDailyTrend(operations, range), [operations, range]);

  const totals = useMemo(() => {
    const signals = trend.reduce((s, d) => s + d.signals, 0);
    const closed = trend.reduce((s, d) => s + d.closed, 0);
    const wins = trend.reduce((s, d) => s + d.wins, 0);
    return {
      signals,
      winRate: closed ? `${((wins / closed) * 100).toFixed(1)}%` : "—",
      pips: trend.length ? trend[trend.length - 1].cumulativePips : 0,
    };
  }, [trend]);

  return (
    <section className={`rounded-xl border border-gold/20 bg-black/25 p-4 md:p-6 ${variant === "public" ? "mt-10" : ""}`}>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-gold">Tendência no período</h3>
          <p className="mt-1 max-w-xl text-xs text-paper/50">
            Sinais enviados por dia, pips acumulados (fechados) e taxa de acerto diária. Mesma base dos cards acima (
            <code className="text-paper/65">created_at</code> / <code className="text-paper/65">traded_on</code>).
          </p>
        </div>
        <label className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-xs">
          <span className="font-bold uppercase tracking-wide text-paper/45">Período</span>
          <select
            value={range}
            onChange={(e) => setRange(e.target.value as "week" | "month")}
            className="bg-transparent font-mono text-paper outline-none"
          >
            <option value="week">Últimos 7 dias</option>
            <option value="month">Mês atual</option>
          </select>
        </label>
      </div>

      <div className="mt-4 flex flex-wrap gap-4 text-xs text-paper/60">
        <span>
          Sinais: <strong className="font-mono text-gold">{totals.signals}</strong>
        </span>
        <span>
          Taxa (fechados): <strong className="font-mono text-rise">{totals.winRate}</strong>
        </span>
        <span>
          Pips no período:{" "}
          <strong className={`font-mono ${totals.pips >= 0 ? "text-rise" : "text-fall"}`}>{formatPipsDisplay(totals.pips)}</strong>
        </span>
      </div>

      <div className="mt-4 rounded-lg border border-line/12 bg-black/20 p-3 md:p-4">
        <MultiMetricLineChart data={trend} />
      </div>
    </section>
  );
}
