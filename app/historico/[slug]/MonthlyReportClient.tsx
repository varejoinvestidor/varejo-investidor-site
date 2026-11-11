"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { SectionHeader, SiteChrome, SupportFooter, fadeUp, useSiteLocale } from "../../../src/components/SiteSections";
import { isRtlLocale, localeToHtmlLang } from "../../../src/i18n/locales";
import { eliteReportPaths } from "../../../src/data/eliteReportPaths";
import type { MonthReportPageData } from "../../../src/elite/loadMonthReportPage";
import { resolveOperationPips } from "../../../src/elite/resolveOperationPips";
import type { EliteOperationRow } from "../../../src/elite/types";
import { EliteLotPipsPublicPanel } from "../../../src/components/elite/EliteLotPipsPublicPanel";
import { MonthReportTrendPanel } from "../../../src/components/elite/MonthReportTrendPanel";
import type { Locale } from "../../../src/i18n";

const PAGE_SIZE = 40;

const copy = {
  pt: {
    back: "Voltar para Relatório Elite",
    eyebrow: "Canal Elite",
    title: "Relatório mensal",
    tableEyebrow: "Mesa operacional",
    tableTitle: "Operações do mês",
    tableText: "Lista completa de sinais públicos com níveis, resultado e status.",
    search: "Buscar ativo ou número",
    allAssets: "Todos os ativos",
    allResults: "Todos os resultados",
    win: "Vitórias",
    loss: "Derrotas",
    allDirections: "Compra e venda",
    buy: "Compra",
    sell: "Venda",
    stats: {
      signals: "Quantidade de sinais",
      pips: "Resultado total em pips",
      winRate: "Taxa de acerto",
      wins: "Vitórias",
      losses: "Derrotas",
      active: "Em andamento",
      assets: "Principais ativos",
      status: "Status",
      bestAsset: "Melhor ativo",
      closed: "Operações encerradas",
    },
    assetTable: {
      title: "Desempenho por ativo",
      asset: "Ativo",
      ops: "Operações",
      wins: "Vitórias",
      losses: "Derrotas",
      pips: "Pips",
    },
    columns: ["#", "Ativo", "Direção", "Entrada", "Alvo", "Stop", "Resultado", "Status"],
    empty: "Nenhuma operação pública neste mês.",
    showing: "Mostrando",
    of: "de",
    operations: "operações",
    previous: "Anterior",
    next: "Próxima",
    analyticsTitle: "Análise gráfica",
    analyticsText: "Filtre por operação, semana ou dia civil dentro do mês. Abaixo, conversão lote × pips com câmbio atualizado.",
  },
  en: {
    back: "Back to Elite Report",
    eyebrow: "Elite Channel",
    title: "Monthly report",
    tableEyebrow: "Operational desk",
    tableTitle: "Month operations",
    tableText: "Full list of public signals with levels, result and status.",
    search: "Search asset or number",
    allAssets: "All assets",
    allResults: "All results",
    win: "Wins",
    loss: "Losses",
    allDirections: "Buy and sell",
    buy: "Buy",
    sell: "Sell",
    stats: {
      signals: "Signal count",
      pips: "Total pips",
      winRate: "Win rate",
      wins: "Wins",
      losses: "Losses",
      active: "Active",
      assets: "Main assets",
      status: "Status",
      bestAsset: "Best asset",
      closed: "Closed trades",
    },
    assetTable: {
      title: "Performance by asset",
      asset: "Asset",
      ops: "Trades",
      wins: "Wins",
      losses: "Losses",
      pips: "Pips",
    },
    columns: ["#", "Asset", "Direction", "Entry", "Target", "Stop", "Result", "Status"],
    empty: "No public operations for this month.",
    showing: "Showing",
    of: "of",
    operations: "operations",
    previous: "Previous",
    next: "Next",
    analyticsTitle: "Chart analysis",
    analyticsText: "Filter by trade, week, or calendar day within the month. Lot × pips conversion uses live FX.",
  },
  es: {
    back: "Volver al Reporte Elite",
    eyebrow: "Canal Elite",
    title: "Reporte mensual",
    tableEyebrow: "Mesa operativa",
    tableTitle: "Operaciones del mes",
    tableText: "Lista completa de señales públicas con niveles, resultado y estado.",
    search: "Buscar activo o número",
    allAssets: "Todos los activos",
    allResults: "Todos los resultados",
    win: "Victorias",
    loss: "Derrotas",
    allDirections: "Compra y venta",
    buy: "Compra",
    sell: "Venta",
    stats: {
      signals: "Cantidad de señales",
      pips: "Resultado total en pips",
      winRate: "Tasa de acierto",
      wins: "Victorias",
      losses: "Derrotas",
      active: "En curso",
      assets: "Principales activos",
      status: "Estado",
      bestAsset: "Mejor activo",
      closed: "Operaciones cerradas",
    },
    assetTable: {
      title: "Desempeño por activo",
      asset: "Activo",
      ops: "Operaciones",
      wins: "Victorias",
      losses: "Derrotas",
      pips: "Pips",
    },
    columns: ["#", "Activo", "Dirección", "Entrada", "Objetivo", "Stop", "Resultado", "Estado"],
    empty: "No hay operaciones públicas en este mes.",
    showing: "Mostrando",
    of: "de",
    operations: "operaciones",
    previous: "Anterior",
    next: "Siguiente",
    analyticsTitle: "Análisis gráfico",
    analyticsText: "Filtre por operación, semana o día. Conversión lote × pips con tipo de cambio actualizado.",
  },
} as const;

function getCopy(locale: string) {
  if (locale === "pt" || locale === "es" || locale === "en") return copy[locale];
  return copy.en;
}

function formatLevel(value: number | null | undefined, locale: string) {
  if (value === null || value === undefined || Number.isNaN(value)) return "—";
  return new Intl.NumberFormat(locale === "pt" ? "pt-BR" : locale, { maximumFractionDigits: 5 }).format(value);
}

function Info({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div
      className={`border p-4 ${highlight ? "border-gold/35 bg-gold/[0.08] shadow-[0_0_24px_rgba(201,155,62,0.08)]" : "border-white/10 bg-black/30"}`}
    >
      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-paper/46">{label}</p>
      <p className={`mt-2 font-mono text-sm font-black ${highlight ? "text-gold" : "text-paper"}`}>{value}</p>
    </div>
  );
}

export default function MonthlyReportClient({ payload }: { payload: MonthReportPageData }) {
  const { locale, t, changeLocale } = useSiteLocale();
  const c = getCopy(locale);
  const eliteBack = eliteReportPaths[locale] ?? eliteReportPaths.pt;

  const [search, setSearch] = useState("");
  const [assetFilter, setAssetFilter] = useState("all");
  const [resultFilter, setResultFilter] = useState("all");
  const [directionFilter, setDirectionFilter] = useState("all");
  const [page, setPage] = useState(1);

  const sortedOps = useMemo(
    () =>
      [...payload.operations].sort((a, b) => {
        const na = a.signal_number ?? 0;
        const nb = b.signal_number ?? 0;
        if (na !== nb) return na - nb;
        return String(a.updated_at ?? "").localeCompare(String(b.updated_at ?? ""));
      }),
    [payload.operations],
  );

  const assets = useMemo(() => Array.from(new Set(sortedOps.map((o) => o.asset))), [sortedOps]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return sortedOps.filter((row) => {
      const resolved = resolveOperationPips(row);
      const matchesSearch =
        !q ||
        row.asset.toLowerCase().includes(q) ||
        String(row.signal_number ?? "").includes(q);
      const matchesAsset = assetFilter === "all" || row.asset === assetFilter;
      const matchesResult =
        resultFilter === "all" ||
        (resultFilter === "win" && resolved.pips > 0) ||
        (resultFilter === "loss" && resolved.pips < 0);
      const matchesDirection = directionFilter === "all" || row.direction === directionFilter;
      return matchesSearch && matchesAsset && matchesResult && matchesDirection;
    });
  }, [sortedOps, search, assetFilter, resultFilter, directionFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const slice = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const periodLabel = `${payload.monthLabel}/${payload.year}`;
  const assetsPreview =
    payload.summary.assets.length > 6
      ? `${payload.summary.assets.slice(0, 6).join(" · ")} +${payload.summary.assets.length - 6}`
      : payload.summary.assets.join(" · ") || "—";

  return (
    <main
      lang={localeToHtmlLang(locale)}
      dir={isRtlLocale(locale) ? "rtl" : "ltr"}
      className="elite-report-page min-h-screen overflow-x-clip bg-ink text-paper"
    >
      <SiteChrome locale={locale} t={t} onLocaleChange={changeLocale} />

      <section className="relative px-5 pb-12 pt-28 md:px-8 md:pb-16 md:pt-36">
        <div className="absolute inset-0 terminal-grid opacity-40" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl">
          <Link
            href={eliteBack}
            className="inline-block border border-gold/25 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-paper/80 transition hover:border-gold hover:text-gold"
          >
            {c.back}
          </Link>

          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.55 }} className="mt-8">
            <p className="text-xs font-black uppercase tracking-[0.34em] text-gold">{c.eyebrow}</p>
            <h1 className="mt-4 font-serif text-4xl tracking-[-0.05em] text-paper md:text-6xl">
              {c.title} · {periodLabel}
            </h1>
            <p className="mt-2 text-sm font-black uppercase tracking-[0.22em] text-gold/90">{payload.statusLabel}</p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.55, delay: 0.06 }}
            className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
          >
            <Info highlight label={c.stats.signals} value={String(payload.summary.signals)} />
            <Info highlight label={c.stats.pips} value={payload.summary.totalPipsLabel} />
            <Info highlight label={c.stats.winRate} value={payload.summary.winRate} />
            <Info highlight label={c.stats.closed} value={String(payload.summary.closed)} />
            <Info label={c.stats.wins} value={String(payload.summary.wins)} />
            <Info label={c.stats.losses} value={String(payload.summary.losses)} />
            <Info label={c.stats.active} value={String(payload.summary.active)} />
            <Info label={c.stats.bestAsset} value={payload.summary.bestAsset} />
            <Info label={c.stats.assets} value={assetsPreview} />
            <Info label={c.stats.status} value={payload.statusLabel} />
          </motion.div>
        </div>
      </section>

      <section className="border-y border-white/8 bg-white/[0.02] px-5 py-14 md:px-8 md:py-18">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeader eyebrow={c.tableEyebrow} title={c.tableTitle} text={c.tableText} />
            <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[720px] lg:grid-cols-4">
              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder={c.search}
                className="border border-gold/20 bg-black/50 px-4 py-3 text-sm text-paper outline-none transition placeholder:text-paper/40 focus:border-gold"
              />
              <select
                value={assetFilter}
                onChange={(e) => {
                  setAssetFilter(e.target.value);
                  setPage(1);
                }}
                className="border border-gold/20 bg-black/50 px-4 py-3 text-sm text-paper outline-none focus:border-gold"
              >
                <option value="all">{c.allAssets}</option>
                {assets.map((asset) => (
                  <option key={asset} value={asset}>
                    {asset}
                  </option>
                ))}
              </select>
              <select
                value={resultFilter}
                onChange={(e) => {
                  setResultFilter(e.target.value);
                  setPage(1);
                }}
                className="border border-gold/20 bg-black/50 px-4 py-3 text-sm text-paper outline-none focus:border-gold"
              >
                <option value="all">{c.allResults}</option>
                <option value="win">{c.win}</option>
                <option value="loss">{c.loss}</option>
              </select>
              <select
                value={directionFilter}
                onChange={(e) => {
                  setDirectionFilter(e.target.value);
                  setPage(1);
                }}
                className="border border-gold/20 bg-black/50 px-4 py-3 text-sm text-paper outline-none focus:border-gold"
              >
                <option value="all">{c.allDirections}</option>
                <option value="Compra">{c.buy}</option>
                <option value="Venda">{c.sell}</option>
              </select>
            </div>
          </div>

          <div className="mt-8 overflow-x-auto rounded-lg border border-gold/22 bg-black/35 shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
            <table className="w-full min-w-[960px] border-collapse text-left text-sm">
              <thead className="sticky top-0 z-[1] border-b border-gold/20 bg-[#0a0a0a] text-[10px] uppercase tracking-[0.18em] text-gold">
                <tr>
                  {c.columns.map((column) => (
                    <th key={column} className="px-4 py-3 font-bold">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {slice.map((row) => (
                  <OperationRow key={row.id} row={row} locale={locale} c={c} />
                ))}
              </tbody>
            </table>
            {slice.length === 0 ? (
              <p className="px-4 py-10 text-center text-sm text-paper/55">{c.empty}</p>
            ) : null}
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs uppercase tracking-[0.18em] text-paper/50">
              {c.showing} {slice.length} {c.of} {filtered.length} {c.operations}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setPage((v) => Math.max(1, v - 1))}
                className="border border-gold/25 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-paper transition hover:border-gold disabled:opacity-40"
              >
                {c.previous}
              </button>
              <span className="border border-gold/30 px-4 py-2 font-mono text-xs text-gold">
                {currentPage}/{totalPages}
              </span>
              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setPage((v) => Math.min(totalPages, v + 1))}
                className="border border-gold/25 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-paper transition hover:border-gold disabled:opacity-40"
              >
                {c.next}
              </button>
            </div>
          </div>
        </div>
      </section>

      {payload.summary.byAsset.length > 0 ? (
        <section className="border-b border-white/8 px-5 py-14 md:px-8 md:py-18">
          <div className="mx-auto max-w-7xl">
            <SectionHeader eyebrow="Pips" title={c.assetTable.title} text={c.tableText} />
            <div className="mt-6 overflow-x-auto rounded-lg border border-gold/18 bg-black/30">
              <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                <thead className="border-b border-gold/15 bg-[#0a0a0a] text-[10px] uppercase tracking-[0.18em] text-gold">
                  <tr>
                    <th className="px-4 py-3 font-bold">{c.assetTable.asset}</th>
                    <th className="px-4 py-3 font-bold">{c.assetTable.ops}</th>
                    <th className="px-4 py-3 font-bold">{c.assetTable.wins}</th>
                    <th className="px-4 py-3 font-bold">{c.assetTable.losses}</th>
                    <th className="px-4 py-3 font-bold">{c.assetTable.pips}</th>
                  </tr>
                </thead>
                <tbody>
                  {payload.summary.byAsset.map((row) => (
                    <tr key={row.asset} className="border-b border-white/6 odd:bg-white/[0.02] hover:bg-gold/[0.04]">
                      <td className="px-4 py-3 font-mono font-bold text-paper">{row.asset}</td>
                      <td className="px-4 py-3 text-paper/80">{row.operations}</td>
                      <td className="px-4 py-3 font-mono text-rise">{row.wins}</td>
                      <td className="px-4 py-3 font-mono text-fall">{row.losses}</td>
                      <td className={`px-4 py-3 font-mono font-bold ${row.pips >= 0 ? "text-rise" : "text-fall"}`}>
                        {row.pips >= 0 ? "+" : ""}
                        {row.pips.toLocaleString(locale === "pt" ? "pt-BR" : locale)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      ) : null}

      <section className="px-5 py-14 md:px-8 md:py-18">
        <div className="mx-auto max-w-7xl space-y-10">
          <SectionHeader eyebrow="Elite" title={c.analyticsTitle} text={c.analyticsText} />
          <MonthReportTrendPanel
            operations={payload.operations}
            year={payload.year}
            monthIndex={payload.monthIndex}
            locale={locale as Locale}
          />
          <EliteLotPipsPublicPanel
            locale={locale}
            defaultAsset={
              payload.summary.bestAsset !== "—" ? payload.summary.bestAsset : payload.summary.assets[0] ?? "USD/JPY"
            }
            defaultPips={Math.round(payload.summary.totalPips)}
            assetOptions={payload.summary.assets.length ? payload.summary.assets : assets}
          />
        </div>
      </section>

      <SupportFooter t={t} locale={locale} onLocaleChange={changeLocale} />
    </main>
  );
}

type MonthlyCopy = (typeof copy)[keyof typeof copy];

function OperationRow({
  row,
  locale,
  c,
}: {
  row: EliteOperationRow;
  locale: string;
  c: MonthlyCopy;
}) {
  const resolved = resolveOperationPips(row);
  const positive = resolved.pips >= 0;
  const direction = row.direction === "Compra" ? c.buy : c.sell;

  return (
    <tr className="border-b border-white/6 odd:bg-white/[0.02] transition hover:bg-gold/[0.04]">
      <td className="px-4 py-3 font-mono font-bold text-paper">
        {row.signal_number != null ? `#${row.signal_number}` : "—"}
      </td>
      <td className="px-4 py-3 font-mono text-paper">{row.asset}</td>
      <td className={`px-4 py-3 font-bold ${row.direction === "Compra" ? "text-rise" : "text-fall"}`}>{direction}</td>
      <td className="px-4 py-3 font-mono text-paper/72">{formatLevel(row.entry_price, locale)}</td>
      <td className="px-4 py-3 font-mono text-paper/72">{formatLevel(row.take_price, locale)}</td>
      <td className="px-4 py-3 font-mono text-paper/72">{formatLevel(row.stop_price, locale)}</td>
      <td className={`px-4 py-3 font-mono font-bold ${positive ? "text-rise" : "text-fall"}`}>{resolved.label}</td>
      <td className="px-4 py-3 text-xs uppercase tracking-[0.14em] text-paper/55">
        {row.status === "active" ? c.stats.active : row.updated_label || "—"}
      </td>
    </tr>
  );
}
