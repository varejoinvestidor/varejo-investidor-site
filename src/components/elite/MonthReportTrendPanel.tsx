"use client";

import { useMemo, useState } from "react";
import { formatPipsDisplay } from "../../elite/pips";
import { buildMonthScopedTrend, type MonthTrendRange } from "../../elite/monthReportTrend";
import type { EliteOperationRow } from "../../elite/types";
import { buildCumulativePipsLine } from "../../elite/chartSeries";
import { InstitutionalChartFrame } from "./EliteHubCharts";
import type { Locale } from "../../i18n";

function TrendSvg({ data, compact }: { data: ReturnType<typeof buildMonthScopedTrend>; compact?: boolean }) {
  if (!data.length) {
    return (
      <p className="flex min-h-[140px] items-center justify-center rounded border border-dashed border-white/10 text-sm text-paper/40">
        Sem dados no período.
      </p>
    );
  }

  const width = 100;
  const height = compact ? 48 : 64;
  const maxSignals = Math.max(...data.map((d) => d.signals), 1);
  const maxCum = Math.max(...data.map((d) => Math.abs(d.cumulativePips)), 1);
  const minCum = Math.min(...data.map((d) => d.cumulativePips), 0);
  const cumSpan = maxCum - minCum || 1;

  const pipsPoints = data.map((d, i) => {
    const x = data.length === 1 ? 50 : (i / (data.length - 1)) * width;
    const y = height - ((d.cumulativePips - minCum) / cumSpan) * (height - 8) - 4;
    return { x, y, d };
  });

  const poly = (pts: { x: number; y: number }[]) => pts.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <figure>
      <svg viewBox={`0 0 ${width} ${height}`} className="h-40 w-full" role="img" aria-label="Tendência">
        {data.map((d, i) => {
          const x = data.length === 1 ? 50 : (i / (data.length - 1)) * width;
          const y = height - (d.signals / maxSignals) * (height - 8) - 4;
          return (
            <rect
              key={`bar-${d.label}-${i}`}
              x={x - 0.9}
              y={y}
              width={1.8}
              height={height - y - 2}
              fill="rgba(198,153,74,0.32)"
              rx={0.25}
            >
              <title>{`${d.label}: ${d.signals} sinal(is)`}</title>
            </rect>
          );
        })}
        <polyline points={poly(pipsPoints)} fill="none" stroke="#0f8f56" strokeWidth={0.9} strokeLinecap="round" />
      </svg>
      <div className="mt-2 flex flex-wrap justify-between gap-1 font-mono text-[9px] text-paper/40">
        {data.slice(0, 12).map((d) => (
          <span key={d.label}>{d.label}</span>
        ))}
        {data.length > 12 ? <span>…</span> : null}
      </div>
    </figure>
  );
}

function CumulativeMini({ ops, locale }: { ops: EliteOperationRow[]; locale: Locale }) {
  const line = useMemo(() => buildCumulativePipsLine(ops), [ops]);
  if (!line.length) return null;
  const last = line[line.length - 1]!;
  return (
    <InstitutionalChartFrame
      title={locale === "pt" ? "Pips acumulados no mês" : "Cumulative pips in month"}
      footer={`${line.length} ${locale === "pt" ? "operações fechadas" : "closed trades"} · ${formatPipsDisplay(last.cumulative)}`}
    >
      <TrendSvg
        data={line.map((p, i) => ({
          label: p.label,
          signals: 1,
          closed: 1,
          wins: p.delta > 0 ? 1 : 0,
          winRate: p.delta > 0 ? 100 : 0,
          pipsDelta: p.delta,
          cumulativePips: p.cumulative,
        }))}
        compact
      />
    </InstitutionalChartFrame>
  );
}

const RANGE_LABELS: Record<MonthTrendRange, { pt: string; en: string }> = {
  day: { pt: "Por operação", en: "Per trade" },
  week: { pt: "Por semana", en: "Per week" },
  month: { pt: "Por dia", en: "Per day" },
};

export function MonthReportTrendPanel({
  operations,
  year,
  monthIndex,
  locale,
}: {
  operations: EliteOperationRow[];
  year: number;
  monthIndex: number;
  locale: Locale;
}) {
  const [range, setRange] = useState<MonthTrendRange>("month");
  const trend = useMemo(
    () => buildMonthScopedTrend(operations, year, monthIndex, range),
    [operations, year, monthIndex, range],
  );

  const totals = useMemo(() => {
    const closed = trend.reduce((s, d) => s + d.closed, 0);
    const wins = trend.reduce((s, d) => s + d.wins, 0);
    return {
      signals: trend.reduce((s, d) => s + d.signals, 0),
      winRate: closed ? `${((wins / closed) * 100).toFixed(1)}%` : "—",
      pips: trend.length ? trend[trend.length - 1]!.cumulativePips : 0,
    };
  }, [trend]);

  const isPt = locale === "pt";

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <InstitutionalChartFrame
        title={isPt ? "Tendência no período" : "Period trend"}
        footer={
          isPt
            ? `${totals.signals} sinais · ${formatPipsDisplay(totals.pips)} · acerto ${totals.winRate}`
            : `${totals.signals} signals · ${formatPipsDisplay(totals.pips)} · win ${totals.winRate}`
        }
      >
        <div className="mb-4 flex flex-wrap gap-2">
          {(["day", "week", "month"] as const).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setRange(key)}
              className={`rounded border px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition ${
                range === key
                  ? "border-gold/50 bg-gold/15 text-gold"
                  : "border-white/10 text-paper/50 hover:border-gold/30 hover:text-paper"
              }`}
            >
              {isPt ? RANGE_LABELS[key].pt : RANGE_LABELS[key].en}
            </button>
          ))}
        </div>
        <TrendSvg data={trend} />
        <p className="mt-3 flex flex-wrap gap-x-4 text-[10px] text-paper/45">
          <span>
            <span className="inline-block h-2 w-3 bg-gold/40 align-middle" /> {isPt ? "Volume" : "Volume"}
          </span>
          <span>
            <span className="inline-block h-0.5 w-4 bg-rise align-middle" /> {isPt ? "Pips acumulados" : "Cumulative pips"}
          </span>
        </p>
      </InstitutionalChartFrame>

      <CumulativeMini ops={operations} locale={locale} />
    </div>
  );
}
