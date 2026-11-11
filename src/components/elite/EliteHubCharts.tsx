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
    <article className="rounded-xl border border-gold/18 bg-black/30 p-4 md:p-5">
      <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gold">{title}</h3>
      <div className="mt-4">{children}</div>
      {footer ? <p className="mt-3 text-[11px] leading-relaxed text-paper/45">{footer}</p> : null}
    </article>
  );
}

/** Barras anuais — traços finos (espelho admin). */
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
      <div className="flex min-h-[200px] items-end gap-1.5 overflow-x-auto pb-1 pt-2">
        {data.map((item) => {
          const h = Math.max(20, (item.signals / max) * 150);
          return (
            <button
              key={item.year}
              type="button"
              title={`${item.year}: ${item.signals} sinais | ${item.assets.join(", ")}`}
              onClick={() => onSelect(item.year)}
              className="group flex min-w-[36px] max-w-[40px] flex-1 flex-col items-center justify-end gap-1.5"
            >
              <span className="font-mono text-[10px] font-bold tabular-nums text-paper/70">
                {formatNumber(item.signals, locale)}
              </span>
              <div
                className="w-full rounded-t border border-gold/28 bg-gradient-to-t from-rise/25 via-gold/35 to-gold/50 transition group-hover:border-gold/45 group-hover:from-rise/35"
                style={{ height: `${h}px` }}
              />
              <span className="font-mono text-[10px] font-black text-gold/90">{item.year}</span>
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
  const height = 58;
  const max = Math.max(...data.map((d) => d.value), 1);
  const min = Math.min(...data.map((d) => d.value), 0);
  const span = max - min || 1;

  const points = data.map((d, i) => ({
    x: data.length === 1 ? 50 : (i / (data.length - 1)) * width,
    y: height - ((d.value - min) / span) * (height - 8) - 4,
    ...d,
  }));

  const linePath = smoothPath(points);
  const areaPath = `${linePath} L ${width} ${height} L 0 ${height} Z`;

  return (
    <InstitutionalChartFrame title={title}>
      <svg viewBox={`0 0 ${width} ${height}`} className="h-52 w-full" role="img" aria-label={title}>
        <defs>
          <linearGradient id="eliteHubAreaRefined" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(198,153,74,0.22)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </linearGradient>
        </defs>
        {[0.33, 0.66].map((t) => (
          <line
            key={t}
            x1="0"
            x2={width}
            y1={height * t}
            y2={height * t}
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="0.12"
          />
        ))}
        <path d={areaPath} fill="url(#eliteHubAreaRefined)" />
        <path d={linePath} fill="none" stroke="#c6994a" strokeWidth="0.85" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((p) => (
          <circle key={p.year} cx={p.x} cy={p.y} r="1.15" fill="#0f8f56" stroke="#c6994a" strokeWidth="0.35">
            <title>{`${p.year}: ${formatPips(p.value, locale)}`}</title>
          </circle>
        ))}
      </svg>
      <div className="mt-2 flex flex-wrap justify-between gap-2 font-mono text-[9px] font-medium text-paper/42">
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
  const countLabel = locale === "en" ? "signals" : locale === "es" ? "señales" : "sinais";
  const radius = 58;
  const stroke = 11;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <InstitutionalChartFrame title={title}>
      <div className="grid gap-5 md:grid-cols-[minmax(140px,180px)_1fr] md:items-center">
        <svg viewBox="0 0 160 160" className="mx-auto h-40 w-40">
          <circle cx="80" cy="80" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} />
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
                strokeWidth={stroke}
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
          <text x="80" y="76" textAnchor="middle" fill="#c6994a" fontSize="18" fontWeight="700">
            {total}
          </text>
          <text x="80" y="94" textAnchor="middle" fill="rgba(255,255,255,0.42)" fontSize="9">
            {countLabel}
          </text>
        </svg>
        <ul className="grid gap-1.5">
          {data.map((item) => (
            <li
              key={item.label}
              className="flex items-center justify-between gap-3 border-b border-white/[0.06] py-2 last:border-0"
            >
              <span className="flex items-center gap-2 text-sm font-semibold text-paper/85">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                {item.label}
              </span>
              <span className="font-mono text-sm font-black tabular-nums text-paper">
                <span>{formatNumber(item.value, locale)}</span>
                <span className="mx-1.5 text-paper/35">·</span>
                <span className="text-paper/55">{total ? Math.round((item.value / total) * 100) : 0}%</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </InstitutionalChartFrame>
  );
}
