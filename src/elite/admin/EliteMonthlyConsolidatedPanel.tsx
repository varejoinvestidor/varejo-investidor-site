"use client";

import { useMemo, useState } from "react";
import {
  ELITE_ADMIN_MONTHLY_INITIAL,
  ELITE_ADMIN_MONTHLY_LOAD_MORE,
} from "../constants";
import { formatPipsDisplay } from "../pips";
import type { EliteMonthlyReportRow } from "../types";

function assetPreview(assets: string[] | undefined, max = 4): string {
  const list = assets?.filter(Boolean) ?? [];
  if (!list.length) return "—";
  if (list.length <= max) return list.join(" · ");
  return `${list.slice(0, max).join(" · ")} +${list.length - max}`;
}

export function EliteMonthlyConsolidatedPanel({
  monthly,
  title = "Consolidado mensal",
  subtitle,
}: {
  monthly: EliteMonthlyReportRow[];
  title?: string;
  subtitle?: string;
}) {
  const sorted = useMemo(
    () => monthly.slice().sort((a, b) => b.year - a.year || b.month_index - a.month_index),
    [monthly],
  );

  const [visible, setVisible] = useState(ELITE_ADMIN_MONTHLY_INITIAL);

  const summary = useMemo(() => {
    let signals = 0;
    let pips = 0;
    let wins = 0;
    for (const m of sorted) {
      signals += m.signals;
      pips += m.pips;
      if (m.pips > 0) wins += 1;
    }
    return { months: sorted.length, signals, pips, wins };
  }, [sorted]);

  const byYear = useMemo(() => {
    const map = new Map<number, EliteMonthlyReportRow[]>();
    for (const m of sorted.slice(0, visible)) {
      const bucket = map.get(m.year) ?? [];
      bucket.push(m);
      map.set(m.year, bucket);
    }
    return Array.from(map.entries()).sort((a, b) => b[0] - a[0]);
  }, [sorted, visible]);

  const hasMore = visible < sorted.length;

  if (!monthly.length) {
    return (
      <section className="space-y-3 rounded-xl border border-line/12 p-4 sm:p-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-gold">{title}</h3>
        <p className="text-sm text-paper/45">Sem meses consolidados — salve operações para recalcular automaticamente.</p>
      </section>
    );
  }

  return (
    <section className="space-y-4 rounded-xl border border-line/12 p-4 sm:p-6">
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-gold">{title}</h3>
        {subtitle ? <p className="mt-1 text-xs text-paper/50">{subtitle}</p> : null}
      </div>

      <ConsolidatedSummaryBar summary={summary} showing={Math.min(visible, sorted.length)} total={sorted.length} />

      <div className="space-y-6">
        {byYear.map(([year, rows]) => (
          <div key={year}>
            <p className="mb-2 text-[10px] font-black uppercase tracking-[0.22em] text-gold/90">{year}</p>
            <ul className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
              {rows.map((m) => (
                <MonthlyCompactCard key={m.id} row={m} />
              ))}
            </ul>
          </div>
        ))}
      </div>

      {hasMore ? (
        <button
          type="button"
          onClick={() => setVisible((v) => v + ELITE_ADMIN_MONTHLY_LOAD_MORE)}
          className="w-full rounded-lg border border-gold/28 bg-black/40 px-4 py-3 text-center text-xs font-black uppercase tracking-[0.16em] text-gold transition hover:border-gold hover:bg-gold/10"
        >
          Ver mais meses ({sorted.length - visible} restantes)
        </button>
      ) : (
        <p className="text-center text-[11px] text-paper/40">Todos os {sorted.length} meses exibidos.</p>
      )}
    </section>
  );
}

function ConsolidatedSummaryBar({
  summary,
  showing,
  total,
}: {
  summary: { months: number; signals: number; pips: number; wins: number };
  showing: number;
  total: number;
}) {
  const pipLabel = formatPipsDisplay(summary.pips);
  return (
    <div className="grid gap-2 rounded-lg border border-gold/18 bg-gold/[0.06] p-4 sm:grid-cols-4">
      <Stat label="Meses" value={String(summary.months)} sub={`exibindo ${showing}/${total}`} />
      <Stat label="Sinais (soma)" value={summary.signals.toLocaleString("pt-BR")} />
      <Stat
        label="Pips (soma)"
        value={pipLabel}
        valueClass={summary.pips >= 0 ? "text-rise" : "text-fall"}
      />
      <Stat label="Meses +" value={String(summary.wins)} sub={`de ${summary.months}`} />
    </div>
  );
}

function Stat({
  label,
  value,
  sub,
  valueClass = "text-paper",
}: {
  label: string;
  value: string;
  sub?: string;
  valueClass?: string;
}) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-wider text-paper/45">{label}</p>
      <p className={`mt-1 font-mono text-lg font-bold tabular-nums ${valueClass}`}>{value}</p>
      {sub ? <p className="mt-0.5 text-[10px] text-paper/40">{sub}</p> : null}
    </div>
  );
}

function MonthlyCompactCard({ row: m }: { row: EliteMonthlyReportRow }) {
  const positive = m.pips > 0;
  const negative = m.pips < 0;
  const borderTone = positive
    ? "border-rise/25 bg-rise/[0.04]"
    : negative
      ? "border-fall/25 bg-fall/[0.04]"
      : "border-line/12 bg-black/30";

  return (
    <li className={`list-none rounded-lg border px-3 py-2.5 text-xs ${borderTone}`}>
      <div className="flex items-start justify-between gap-2">
        <span className="font-semibold text-paper">
          {m.month_label}/{m.year}
        </span>
        <span className="shrink-0 rounded border border-white/10 px-1.5 py-0.5 text-[9px] uppercase tracking-wide text-paper/50">
          {m.status_label}
        </span>
      </div>
      <dl className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1 font-mono text-[11px]">
        <div>
          <dt className="text-paper/40">Sinais</dt>
          <dd className="font-bold text-paper">{m.signals}</dd>
        </div>
        <div>
          <dt className="text-paper/40">Pips</dt>
          <dd className={`font-semibold ${positive ? "text-rise" : negative ? "text-fall" : "text-gold"}`}>
            {m.result_label}
          </dd>
        </div>
      </dl>
      <p className="mt-2 truncate text-[10px] text-paper/45" title={m.assets?.join(", ")}>
        {assetPreview(m.assets)}
      </p>
    </li>
  );
}
