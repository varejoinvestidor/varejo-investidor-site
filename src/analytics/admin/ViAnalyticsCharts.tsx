"use client";

import type { AnalyticsTimeseriesRow } from "../types";

function formatBucketLabel(bucket: string, grain: "day" | "week" | "month") {
  const date = new Date(`${bucket}T12:00:00.000Z`);
  if (grain === "month") {
    return date.toLocaleDateString("pt-BR", { month: "short", year: "2-digit" });
  }
  if (grain === "week") {
    return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
  }
  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}

export function AnalyticsAccessChart({
  data,
  grain,
  metric = "page_views",
}: {
  data: AnalyticsTimeseriesRow[];
  grain: "day" | "week" | "month";
  metric?: "page_views" | "clicks" | "unique_sessions";
}) {
  if (!data.length) {
    return (
      <div className="flex min-h-[220px] flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-line/20 px-4 text-center text-sm text-paper/45">
        <p>Sem eventos de page view neste período.</p>
        <p className="text-xs text-paper/40">
          O schema é aplicado automaticamente (admin + cron). Navegue no site público fora de /admin para gerar dados;
          o painel atualiza sozinho a cada ~90s.
        </p>
      </div>
    );
  }

  const max = Math.max(...data.map((row) => row[metric]), 1);

  return (
    <div className="space-y-4">
      <div className="flex min-h-[240px] items-end gap-1.5 overflow-x-auto pb-2 pt-2">
        {data.map((row) => {
          const value = row[metric];
          const h = Math.max(10, (value / max) * 190);
          return (
            <div
              key={row.bucket}
              className="flex min-w-[28px] flex-1 flex-col items-center justify-end gap-2"
              title={`${formatBucketLabel(row.bucket, grain)}: ${value.toLocaleString("pt-BR")}`}
            >
              <span className="font-mono text-[10px] tabular-nums text-paper/55">
                {value > 0 ? value.toLocaleString("pt-BR") : "·"}
              </span>
              <div
                className="w-full max-w-[48px] rounded-t border border-gold/25 bg-gradient-to-t from-[#0a3d28] via-rise/85 to-gold/90"
                style={{ height: `${h}px` }}
              />
              <span className="text-[9px] font-bold uppercase tracking-wider text-paper/40">
                {formatBucketLabel(row.bucket, grain)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function AnalyticsShareBar({
  label,
  value,
  max,
  hint,
}: {
  label: string;
  value: number;
  max: number;
  hint?: string;
}) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between gap-3 text-sm">
        <div className="min-w-0">
          <span className="truncate text-paper/78">{label}</span>
          {hint ? <p className="truncate text-[11px] text-paper/40">{hint}</p> : null}
        </div>
        <span className="shrink-0 font-mono text-xs font-bold tabular-nums text-gold">{value.toLocaleString("pt-BR")}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/8">
        <div className="h-full rounded-full bg-gradient-to-r from-gold/90 to-rise/80" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
