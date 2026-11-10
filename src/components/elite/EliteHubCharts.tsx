"use client";

import type { ReactNode } from "react";
import type { Locale } from "../../i18n";

function formatNumber(value: number, locale: Locale) {
  return new Intl.NumberFormat(locale === "pt" ? "pt-BR" : locale).format(value);
}

function formatPips(value: number, locale: Locale) {
  return `${value >= 0 ? "+" : ""}${formatNumber(value, locale)} pips`;
}

type BarItem = { year: number; signals: number; assets: string[] };
type AreaItem = { year: number; value: number; signals: number };

export function InstitutionalChartFrame({ title, children, footer }: { title: string; children: ReactNode; footer?: string }) {
  return (
    <div className="relative overflow-hidden rounded-sm border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-black/50 p-6 shadow-[inset_0_1px_0_rgba(198,153,74,0.08)]">
      <div className="pointer-events-none absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
      <p className="relative text-[10px] font-black uppercase tracking-[0.26em] text-gold/90">{title}</p>
      <div className="relative mt-5">{children}</div>
      {footer ? <p className="relative mt-4 text-xs leading-6 text-paper/50">{footer}</p> : null}
    </div>
  );
}

/** Barras anuais — padrão institucional. */
export function PremiumAnnualBarChart({
  data,
  locale,
  onSelect,
  title,
  footer,
}: {
  data: BarItem[];
  locale: Locale;
  onSelect: (year: number) => void;
  title: string;
  footer?: string;
}) {
  const max = Math.max(...data.map((item) => item.signals), 1);

  return (
    <InstitutionalChartFrame title={title} footer={footer}>
      <div className="flex min-h-[280px] items-end gap-2.5 overflow-x-auto pb-1 pt-2">
        {data.map((item) => {
          const h = Math.max(28, (item.signals / max) * 220);
          return (
            <button
              key={item.year}
              type="button"
              title={`${item.year}: ${item.signals} sinais | ${item.assets.join(", ")}`}
              onClick={() => onSelect(item.year)}
              className="group flex min-w-[52px] flex-1 flex-col items-center justify-end gap-2.5"
            >
              <span className="font-mono text-[11px] font-bold tabular-nums text-paper/75">
                {formatNumber(item.signals, locale)}
              </span>
              <div
                className="relative w-full max-w-[56px] overflow-hidden rounded-t-md border border-gold/25 shadow-[0_0_28px_rgba(15,143,86,0.15)] transition duration-300 group-hover:border-gold/55 group-hover:shadow-[0_0_36px_rgba(198,153,74,0.25)]"
                style={{ height: `${h}px` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a3d28] via-rise/90 to-gold/90" />
                <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/25 to-transparent" />
              </div>
              <span className="font-mono text-xs font-black text-gold">{item.year}</span>
            </button>
          );
        })}
      </div>
    </InstitutionalChartFrame>
  );
}

function smoothPath(points: Array<{ x: number; y: number }>): string {
  if (points.length < 2) return "";
  if (points.length === 2) return `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y}`;
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }
  return d;
}

export function PremiumCumulativeAreaChart({
  data,
  locale,
  title,
}: {
  data: AreaItem[];
  locale: Locale;
  title: string;
}) {
  const width = 100;
  const height = 72;
  const max = Math.max(...data.map((d) => d.value), 1);
  const min = Math.min(...data.map((d) => d.value), 0);
  const span = max - min || 1;

  const points = data.map((d, i) => ({
    x: data.length === 1 ? 50 : (i / (data.length - 1)) * width,
    y: height - ((d.value - min) / span) * (height - 10) - 5,
    ...d,
  }));

  const linePath = smoothPath(points);
  const areaPath = `${linePath} L ${width} ${height} L 0 ${height} Z`;

  return (
    <InstitutionalChartFrame title={title}>
      <svg viewBox={`0 0 ${width} ${height}`} className="h-72 w-full" role="img" aria-label={title}>
        <defs>
          <linearGradient id="eliteHubArea" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(198,153,74,0.5)" />
            <stop offset="55%" stopColor="rgba(15,143,86,0.18)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </linearGradient>
          <filter id="eliteLineGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="0.6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {[0.25, 0.5, 0.75].map((t) => (
          <line
            key={t}
            x1="0"
            x2={width}
            y1={height * t}
            y2={height * t}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="0.15"
          />
        ))}
        <path d={areaPath} fill="url(#eliteHubArea)" />
        <path
          d={linePath}
          fill="none"
          stroke="#d4a853"
          strokeWidth="1.35"
          strokeLinecap="round"
          filter="url(#eliteLineGlow)"
        />
        {points.map((p) => (
          <g key={p.year}>
            <circle cx={p.x} cy={p.y} r="2.2" fill="#0f8f56" stroke="#c6994a" strokeWidth="0.55" />
            <title>{`${p.year}: ${formatPips(p.value, locale)}`}</title>
          </g>
        ))}
      </svg>
      <div className="mt-2 flex flex-wrap justify-between gap-2 font-mono text-[10px] font-bold text-paper/48">
        {data.map((item) => (
          <span key={item.year}>{item.year}</span>
        ))}
      </div>
    </InstitutionalChartFrame>
  );
}

export function PremiumDonutChart({
  data,
  title,
  locale = "pt",
}: {
  data: Array<{ label: string; value: number; color: string }>;
  title: string;
  locale?: Locale;
}) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const countLabel =
    locale === "en" ? "signals" : locale === "es" ? "señales" : "sinais";
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <InstitutionalChartFrame title={title}>
      <div className="grid gap-6 md:grid-cols-[minmax(150px,200px)_1fr] md:items-center">
        <svg viewBox="0 0 160 160" className="mx-auto h-44 w-44">
          <circle cx="80" cy="80" r={radius} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="16" />
          {data.map((slice) => {
            const length = total > 0 ? (slice.value / total) * circumference : 0;
            const pct = total ? Math.round((slice.value / total) * 100) : 0;
            const node = (
              <circle
                key={slice.label}
                cx="80"
                cy="80"
                r={radius}
                fill="none"
                stroke={slice.color}
                strokeWidth="16"
                strokeDasharray={`${length} ${circumference - length}`}
                strokeDashoffset={-offset}
                transform="rotate(-90 80 80)"
                strokeLinecap="round"
              >
                <title>{`${slice.label}: ${formatNumber(slice.value, locale)} ${countLabel} (${pct}%)`}</title>
              </circle>
            );
            offset += length;
            return node;
          })}
          <text x="80" y="84" textAnchor="middle" fill="#c6994a" fontSize="10" fontWeight="700" letterSpacing="0.12em">
            ATIVOS
          </text>
        </svg>
        <div className="grid gap-2">
          {data.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between gap-4 border-b border-white/[0.06] py-2.5 last:border-0"
            >
              <span className="flex items-center gap-3 text-sm font-semibold text-paper/80">
                <span className="h-2.5 w-2.5 rounded-full shadow-[0_0_12px_currentColor]" style={{ backgroundColor: item.color }} />
                {item.label}
              </span>
              <span className="shrink-0 text-right font-mono text-sm font-black tabular-nums text-paper">
                <span className="text-paper/92">{formatNumber(item.value, locale)}</span>
                <span className="mx-1.5 text-paper/35">·</span>
                <span className="text-paper/55">{total ? Math.round((item.value / total) * 100) : 0}%</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </InstitutionalChartFrame>
  );
}
