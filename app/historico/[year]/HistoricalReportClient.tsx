"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  SectionHeader,
  SiteChrome,
  SupportFooter,
  fadeUp,
  useSiteLocale,
} from "../../../src/components/SiteSections";
import { getEliteReport, getSignalResultValue, normalizedEliteReports } from "../../../src/data/eliteReports";

const pageSize = 50;

const reportCopy = {
  pt: {
    back: "Voltar para Sinais",
    title: "RELATÓRIO ELITE",
    subtitle: "Estrutura operacional baseada em Ichimoku desde 2018",
    stats: ["Total de sinais", "Vitórias", "Derrotas", "Acerto", "Total de pips", "Melhor ativo", "Pior sequência", "Melhor sequência"],
    sectionEyebrow: "Mesa operacional",
    sectionTitle: "Tabela de sinais",
    sectionText: "Busca, filtros e leitura institucional dos sinais que compõem o relatório selecionado.",
    search: "Buscar número do sinal",
    allAssets: "Todos os ativos",
    allResults: "Vitória e derrota",
    win: "Vitória",
    loss: "Derrota",
    allDirections: "Compra e venda",
    buy: "Compra",
    sell: "Venda",
    allPeriods: "Todos os períodos",
    columns: ["Número", "Data", "Ativo", "Direção", "Entrada", "Alvo", "Stop", "Resultado", "Status"],
    empty: "Nenhum sinal encontrado para os filtros selecionados.",
    showing: "Mostrando",
    of: "de",
    signals: "sinais",
    perPage: "50 por página",
    previous: "Anterior",
    next: "Próxima",
  },
  en: {
    back: "Back to Signals",
    title: "ELITE REPORT",
    subtitle: "Operational structure based on Ichimoku since 2018",
    stats: ["Total signals", "Wins", "Losses", "Win rate", "Total pips", "Best asset", "Worst streak", "Best streak"],
    sectionEyebrow: "Operational desk",
    sectionTitle: "Signal table",
    sectionText: "Search, filters, and institutional reading of the signals included in the selected report.",
    search: "Search signal number",
    allAssets: "All assets",
    allResults: "Wins and losses",
    win: "Win",
    loss: "Loss",
    allDirections: "Buy and sell",
    buy: "Buy",
    sell: "Sell",
    allPeriods: "All periods",
    columns: ["Number", "Date", "Asset", "Direction", "Entry", "Target", "Stop", "Result", "Status"],
    empty: "No signals found for the selected filters.",
    showing: "Showing",
    of: "of",
    signals: "signals",
    perPage: "50 per page",
    previous: "Previous",
    next: "Next",
  },
  es: {
    back: "Volver a Señales",
    title: "REPORTE ELITE",
    subtitle: "Estructura operativa basada en Ichimoku desde 2018",
    stats: ["Total de señales", "Victorias", "Derrotas", "Porcentaje de acierto", "Total de pips", "Mejor activo", "Peor racha", "Mejor racha"],
    sectionEyebrow: "Mesa operativa",
    sectionTitle: "Tabla de señales",
    sectionText: "Búsqueda, filtros y lectura institucional de las señales que componen el reporte seleccionado.",
    search: "Buscar número de señal",
    allAssets: "Todos los activos",
    allResults: "Victorias y derrotas",
    win: "Victoria",
    loss: "Derrota",
    allDirections: "Compra y venta",
    buy: "Compra",
    sell: "Venta",
    allPeriods: "Todos los períodos",
    columns: ["Número", "Fecha", "Activo", "Dirección", "Entrada", "Objetivo", "Stop", "Resultado", "Estado"],
    empty: "No se encontraron señales para los filtros seleccionados.",
    showing: "Mostrando",
    of: "de",
    signals: "señales",
    perPage: "50 por página",
    previous: "Anterior",
    next: "Siguiente",
  },
};

function getReportCopy(locale: string) {
  if (locale === "pt" || locale === "es" || locale === "en") return reportCopy[locale];
  return reportCopy.en;
}

function localizeDirection(direction: string, copy: (typeof reportCopy)["pt"]) {
  if (direction === "Compra") return copy.buy;
  if (direction === "Venda") return copy.sell;
  return direction;
}

export default function HistoricalReportClient({ year }: { year: string }) {
  const { locale, t, changeLocale } = useSiteLocale();
  const currentReport = getEliteReport(year);
  const copy = getReportCopy(locale);
  const [search, setSearch] = useState("");
  const [assetFilter, setAssetFilter] = useState("all");
  const [resultFilter, setResultFilter] = useState("all");
  const [directionFilter, setDirectionFilter] = useState("all");
  const [periodFilter, setPeriodFilter] = useState(currentReport.year);
  const [page, setPage] = useState(1);

  const scopedReports = periodFilter === "all" ? normalizedEliteReports : normalizedEliteReports.filter((report) => report.year === periodFilter);
  const allSignals = scopedReports.flatMap((report) =>
    report.signals.map((signal) => ({
      ...signal,
      period: report.period,
      year: report.year,
    })),
  );

  const availableAssets = useMemo(() => Array.from(new Set(allSignals.map((signal) => signal.ativo))), [allSignals]);
  const filteredSignals = useMemo(
    () =>
      allSignals.filter((signal) => {
        const resultValue = getSignalResultValue(signal.resultado);
        const matchesSearch = String(signal.sinal).includes(search.trim());
        const matchesAsset = assetFilter === "all" || signal.ativo === assetFilter;
        const matchesResult =
          resultFilter === "all" ||
          (resultFilter === "win" && resultValue >= 0) ||
          (resultFilter === "loss" && resultValue < 0);
        const matchesDirection = directionFilter === "all" || signal.direcao === directionFilter;

        return matchesSearch && matchesAsset && matchesResult && matchesDirection;
      }),
    [allSignals, assetFilter, directionFilter, resultFilter, search],
  );

  const totalPages = Math.max(1, Math.ceil(filteredSignals.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageSignals = filteredSignals.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  function resetPage() {
    setPage(1);
  }

  return (
    <main lang={locale === "hi" ? "hi" : undefined} className="min-h-screen overflow-hidden bg-paper text-ink">
      <SiteChrome locale={locale} t={t} onLocaleChange={changeLocale} />

      <section className="premium-stage relative px-5 pb-14 pt-32 md:px-8 md:pb-20 md:pt-44">
        <div className="finance-particles" />
        <div className="absolute right-0 top-28 h-96 w-96 rounded-full bg-rise/[0.12] blur-3xl" />
        <div className="absolute left-0 top-40 h-80 w-80 rounded-full bg-gold/[0.08] blur-3xl" />
        <div className="relative mx-auto max-w-7xl">
          <a
            href={locale === "en" ? "/signals" : "/sinais"}
            className="inline-block border border-ink/[0.16] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-ink transition hover:border-gold hover:text-gold"
          >
            {copy.back}
          </a>
          <div className="mt-8 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <SectionHeader
              eyebrow={currentReport.period}
              title={copy.title}
              text={copy.subtitle}
            />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                [copy.stats[0], String(currentReport.totalSignals), "text-gold"],
                [copy.stats[1], String(currentReport.totalWins), "text-rise"],
                [copy.stats[2], String(currentReport.totalLosses), "text-fall"],
                [copy.stats[3], currentReport.winRate, "text-gold"],
                [copy.stats[4], currentReport.totalPips, "text-rise"],
                [copy.stats[5], currentReport.bestAsset, "text-gold"],
                [copy.stats[6], currentReport.worstSequence, "text-fall"],
                [copy.stats[7], currentReport.bestSequence, "text-rise"],
              ].map(([label, value, tone]) => (
                <motion.div
                  key={label}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="terminal-module border border-ink/[0.12] bg-white p-4"
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-ink/[0.48]">{label}</p>
                  <p className={`mt-3 font-mono text-2xl font-bold ${tone}`}>{value}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-ink/[0.08] bg-white px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="terminal-module relative overflow-hidden border border-gold/[0.2] bg-ink p-3 shadow-premium md:p-5">
            <div className="absolute inset-0 terminal-grid opacity-25" />
            <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[6px] border border-rise/[0.16] bg-paper/[0.035]">
              <Image
                src={currentReport.performanceImage}
                alt={`${copy.title} - ${currentReport.label}`}
                width={1080}
                height={1920}
                sizes="(max-width: 768px) 94vw, 960px"
                className="mx-auto block h-auto max-h-[780px] w-full object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeader
              eyebrow={copy.sectionEyebrow}
              title={copy.sectionTitle}
              text={copy.sectionText}
            />
            <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[720px] lg:grid-cols-3">
              <input
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  resetPage();
                }}
                placeholder={copy.search}
                className="border border-ink/[0.14] bg-ink px-4 py-3 text-sm text-paper outline-none transition placeholder:text-paper/[0.45] focus:border-rise"
              />
              <select
                value={assetFilter}
                onChange={(event) => {
                  setAssetFilter(event.target.value);
                  resetPage();
                }}
                className="border border-ink/[0.14] bg-ink px-4 py-3 text-sm text-paper outline-none transition focus:border-rise"
              >
                <option value="all">{copy.allAssets}</option>
                {availableAssets.map((asset) => (
                  <option key={asset} value={asset}>
                    {asset}
                  </option>
                ))}
              </select>
              <select
                value={resultFilter}
                onChange={(event) => {
                  setResultFilter(event.target.value);
                  resetPage();
                }}
                className="border border-ink/[0.14] bg-ink px-4 py-3 text-sm text-paper outline-none transition focus:border-rise"
              >
                <option value="all">{copy.allResults}</option>
                <option value="win">{copy.win}</option>
                <option value="loss">{copy.loss}</option>
              </select>
              <select
                value={directionFilter}
                onChange={(event) => {
                  setDirectionFilter(event.target.value);
                  resetPage();
                }}
                className="border border-ink/[0.14] bg-ink px-4 py-3 text-sm text-paper outline-none transition focus:border-rise"
              >
                <option value="all">{copy.allDirections}</option>
                <option value="Compra">{copy.buy}</option>
                <option value="Venda">{copy.sell}</option>
              </select>
              <select
                value={periodFilter}
                onChange={(event) => {
                  setPeriodFilter(event.target.value);
                  resetPage();
                }}
                className="border border-ink/[0.14] bg-ink px-4 py-3 text-sm text-paper outline-none transition focus:border-rise"
              >
                <option value="all">{copy.allPeriods}</option>
                {normalizedEliteReports.map((report) => (
                  <option key={report.year} value={report.year}>
                    {report.period}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-8 overflow-x-auto border border-ink/[0.12] bg-white shadow-fine">
            <table className="w-full min-w-[1040px] border-collapse text-left">
              <thead className="border-b border-ink/[0.1] bg-paper/[0.04] text-xs uppercase tracking-[0.18em] text-gold">
                <tr>
                  {copy.columns.map((column) => (
                    <th key={column} className="px-4 py-4 font-bold">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pageSignals.map((signal) => {
                  const isPositive = getSignalResultValue(signal.resultado) >= 0;

                  return (
                    <tr key={`${signal.year}-${signal.sinal}`} className="border-b border-ink/[0.08] transition hover:bg-rise/[0.05]">
                      <td className="px-4 py-4 font-mono text-sm font-bold text-ink">#{signal.sinal}</td>
                      <td className="px-4 py-4 text-sm text-ink/[0.68]">{signal.data}</td>
                      <td className="px-4 py-4 font-mono text-sm text-ink">{signal.ativo}</td>
                      <td className={`px-4 py-4 text-sm font-bold ${signal.direcao === "Compra" ? "text-rise" : "text-fall"}`}>
                        {localizeDirection(signal.direcao, copy)}
                      </td>
                      <td className="px-4 py-4 font-mono text-sm text-ink/[0.72]">{signal.entrada}</td>
                      <td className="px-4 py-4 font-mono text-sm text-ink/[0.72]">{signal.alvo}</td>
                      <td className="px-4 py-4 font-mono text-sm text-ink/[0.72]">{signal.stop}</td>
                      <td className={`px-4 py-4 font-mono text-sm font-bold ${isPositive ? "text-rise" : "text-fall"}`}>
                        {signal.resultado}
                      </td>
                      <td className="px-4 py-4 text-sm uppercase tracking-[0.14em] text-ink/[0.58]">{signal.status}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {pageSignals.length === 0 ? (
              <p className="px-4 py-8 text-center text-sm text-ink/[0.62]">{copy.empty}</p>
            ) : null}
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs uppercase tracking-[0.18em] text-ink/[0.52]">
              {copy.showing} {pageSignals.length} {copy.of} {filteredSignals.length} {copy.signals} • {copy.perPage}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setPage((value) => Math.max(1, value - 1))}
                className="border border-ink/[0.16] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-ink transition hover:border-gold hover:text-gold disabled:cursor-not-allowed disabled:opacity-40"
              >
                {copy.previous}
              </button>
              <span className="border border-gold/[0.22] px-4 py-2 font-mono text-xs text-gold">
                {currentPage}/{totalPages}
              </span>
              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
                className="border border-ink/[0.16] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-ink transition hover:border-gold hover:text-gold disabled:cursor-not-allowed disabled:opacity-40"
              >
                {copy.next}
              </button>
            </div>
          </div>
        </div>
      </section>

      <SupportFooter t={t} locale={locale} onLocaleChange={changeLocale} />
    </main>
  );
}
