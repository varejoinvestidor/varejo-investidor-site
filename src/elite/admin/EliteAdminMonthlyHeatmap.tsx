"use client";

import type { EliteMonthlyReportRow } from "../types";

const MONTHS = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

export function EliteAdminMonthlyHeatmap({ monthly }: { monthly: EliteMonthlyReportRow[] }) {
  const years = Array.from(new Set(monthly.map((m) => m.year))).sort((a, b) => a - b);
  const byKey = new Map<string, EliteMonthlyReportRow>();
  for (const m of monthly) byKey.set(`${m.year}-${m.month_index}`, m);

  if (!years.length) {
    return (
      <p className="text-sm text-paper/45">Nenhum mês em elite_monthly_reports — importe o histórico ou salve sinais.</p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <div className="grid min-w-[720px] grid-cols-[56px_repeat(12,1fr)] gap-1.5">
        <span />
        {MONTHS.map((m) => (
          <span key={m} className="text-center text-[9px] font-bold uppercase tracking-wider text-paper/45">
            {m}
          </span>
        ))}
        {years.map((year) => (
          <div key={year} className="contents">
            <span className="font-mono text-xs font-black text-gold">{year}</span>
            {MONTHS.map((_, monthIndex) => {
              const row = byKey.get(`${year}-${monthIndex}`);
              if (!row) {
                return (
                  <span
                    key={`${year}-${monthIndex}`}
                    className="flex h-9 items-center justify-center rounded border border-white/5 bg-white/[0.02] text-[10px] text-paper/12"
                  />
                );
              }
              const positive = row.pips > 0;
              const negative = row.pips < 0;
              const tone = positive
                ? "border-rise/40 bg-rise/18 text-rise"
                : negative
                  ? "border-fall/40 bg-fall/18 text-fall"
                  : "border-gold/25 bg-gold/12 text-gold";
              return (
                <span
                  key={`${year}-${monthIndex}`}
                  title={`${row.month_label}/${row.year}: ${row.signals} sinais · ${row.result_label} (${row.status_label})`}
                  className={`flex h-9 items-center justify-center rounded border text-[10px] font-black tabular-nums ${tone}`}
                >
                  {row.signals}
                </span>
              );
            })}
          </div>
        ))}
      </div>
      <p className="mt-3 text-[11px] text-paper/45">
        Números = sinais em elite_monthly_reports (planilha importada). Verde = mês com pips positivos; vermelho = negativo.
      </p>
    </div>
  );
}
