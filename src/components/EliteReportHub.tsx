"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import {
  ELITE_LASTLINK_URL,
  ELITE_STRIPE_LINKS,
  SectionHeader,
  SiteChrome,
  SupportFooter,
  fadeUp,
} from "./SiteSections";
import { translations, type Locale } from "../i18n";
import { isRtlLocale, localeToHtmlLang } from "../i18n/locales";
import { normalizedEliteReports } from "../data/eliteReports";
import { ForexBrokerBannerWide } from "./ForexBrokerBannerWide";
import { fxproButtonLabels, fxproLinks } from "../data/fxproLinks";
import { eliteReportCopyJa } from "../data/eliteReportCopyJa";
import { eliteReportCopyHi } from "../data/eliteReportCopyHi";
import {
  ELITE_HISTORIC_SIGNALS_SENT,
  ELITE_MONTHLY_INITIAL_VISIBLE,
  ELITE_MONTHLY_LOAD_MORE,
} from "../elite/constants";
import type { HubMonthlyReport, HubOperation } from "../elite/mapToHub";
import type { EliteSignalTier } from "../elite/signalTier";
import { ElitePeriodTrendChart } from "../elite/ElitePeriodTrendChart";
import type { PeriodPerformance } from "../elite/traderPerformance";
import type { EliteOperationRow } from "../elite/types";
import { PremiumAnnualBarChart, PremiumCumulativeAreaChart, PremiumDonutChart } from "./elite/EliteHubCharts";
import { EliteOperationCard, EliteOperationsPager, paginateList } from "./elite/EliteOperationCard";
import { applyLivePipsToActiveOperations, useEliteLiveQuotes } from "./elite/useEliteLiveQuotes";
import { sortOperationsByRecency } from "./elite/eliteOperationSort";
import { buildCumulativePerformanceByYear, historicYears } from "../elite/yearlyHubAggregates";
import { useOperationsPageSize } from "./elite/useOperationsPageSize";
import { operationReportHref } from "../elite/operationReportLink";
import { eliteAugust2018HubOperations, eliteAugust2018Monthly } from "../data/eliteAugust2018";
import { eliteSeptember2018HubOperations, eliteSeptember2018Monthly } from "../data/eliteSeptember2018";
import { eliteSeptember2022HubOperations, eliteSeptember2022Monthly } from "../data/eliteSeptember2022";

import { eliteReportPaths } from "../data/eliteReportPaths";

export { eliteReportPaths };

type Direction = "Compra" | "Venda";

type MonthlyReport = {
  year: number;
  month: string;
  monthIndex: number;
  signals: number;
  result: string;
  pips: number;
  status: string;
  assets: string[];
};

type Operation = {
  asset: string;
  direction: Direction;
  status: "active" | "closed";
  result: string;
  pips: number;
  date: string;
  updatedAt: string;
  reportMonth: string;
  signalNumber?: number | null;
  entryPrice?: number | null;
  takePrice?: number | null;
  stopPrice?: number | null;
  takePips?: number;
  stopPips?: number;
  signalTier?: EliteSignalTier;
};

type TimelineEvent = {
  year: string;
  title: string;
  shortTitle: string;
  summary: string;
  marker: string;
  context: string;
  impact: string;
  result: string;
  tone: "gold" | "green";
};

type Copy = {
  label: string;
  heroTitle: string;
  heroSubtitle: string;
  centralMessage: string;
  primaryButton: string;
  secondaryButton: string;
  heroStats: string[];
  authorityTitle: string;
  authorityText: string;
  dashboardTitle: string;
  dashboardText: string;
  chartSignals: string;
  chartPerformance: string;
  chartAssets: string;
  chartHeatmap: string;
  selectedYear: string;
  selectedMonth: string;
  totalSignals: string;
  consolidatedResult: string;
  availableMonths: string;
  mainAssets: string;
  reports: string;
  viewReport: string;
  activeTitle: string;
  activeText: string;
  asset: string;
  direction: string;
  status: string;
  partialResult: string;
  date: string;
  update: string;
  protectedFields: string;
  levelsPublic: string;
  entry: string;
  target: string;
  stop: string;
  buy: string;
  sell: string;
  liveMovement: string;
  liveQuote: string;
  liveEntry: string;
  liveVariation: string;
  livePipsResult: string;
  liveUpdating: string;
  liveUnavailable: string;
  live: string;
  finished: string;
  available: string;
  resultsTitle: string;
  resultsText: string;
  filters: {
    year: string;
    month: string;
    asset: string;
    direction: string;
    status: string;
    all: string;
  };
  table: {
    signal: string;
    date: string;
    asset: string;
    direction: string;
    result: string;
    status: string;
    report: string;
  };
  monthlyTitle: string;
  monthlyText: string;
  monthlyCardSignals: string;
  monthlyCardPips: string;
  monthlyCardAssets: string;
  timelineTitle: string;
  timelineText: string;
  depthTitle: string;
  depthText: string;
  depthCards: Array<{ title: string; text: string }>;
  brokerTitle: string;
  brokerText: string;
  brokerButton: string;
  brokerBannerText: string;
  ctaTitle: string;
  ctaText: string;
  ctaButton: string;
  disclaimer: string;
};

const copyByLocale: Record<Locale, Copy> = {
  pt: {
    label: "Histórico Elite",
    heroTitle: "8 anos de sinais ao vivo no WhatsApp",
    heroSubtitle: "Acompanhe a evolução histórica do Canal Elite desde agosto de 2018, com 4.419 sinais enviados, relatórios mensais e resultados consolidados.",
    centralMessage: "Desde agosto de 2018, o Varejo Investidor acompanha mercados globais e envia sinais ao vivo diretamente no WhatsApp. Esta página organiza o histórico público, os relatórios mensais e a evolução dos resultados ao longo dos anos.",
    primaryButton: "VER HISTÓRICO DE RESULTADOS",
    secondaryButton: "ENTRAR NO CANAL ELITE",
    heroStats: ["Desde agosto de 2018", "4.419 sinais enviados", "Forex, ouro, petróleo, índices, cripto e moedas globais", "Relatórios mensais consolidados"],
    authorityTitle: "O diferencial está no histórico",
    authorityText: "Poucas estruturas educacionais mantêm um histórico público tão longo de acompanhamento operacional. O Canal Elite nasceu em 2018 e evoluiu com sinais, análises, leitura de mercado e relatórios mensais. Esta central foi criada para organizar o passado e preparar o acompanhamento futuro com mais transparência, contexto e leitura visual.",
    dashboardTitle: "Painel histórico do Canal Elite",
    dashboardText: "Visualize sinais por ano, resultado acumulado, distribuição por ativo e o mapa mensal de relatórios disponíveis.",
    chartSignals: "Sinais por ano",
    chartPerformance: "Resultado acumulado por ano",
    chartAssets: "Distribuição por ativo",
    chartHeatmap: "Histórico mensal",
    selectedYear: "Ano selecionado",
    selectedMonth: "Mês selecionado",
    totalSignals: "Total de sinais",
    consolidatedResult: "Resultado consolidado",
    availableMonths: "Meses disponíveis",
    mainAssets: "Principais ativos",
    reports: "Relatórios",
    viewReport: "Ver relatório",
    activeTitle: "Operações ativas acompanhadas",
    activeText: "Sinais marcados como Free exibem entrada, alvo e stop no site. Sinais Elite mantêm alvo e stop reservados ao WhatsApp do Canal Elite.",
    asset: "Ativo",
    direction: "Direção",
    status: "Status",
    partialResult: "Resultado parcial",
    date: "Data",
    update: "Atualização",
    protectedFields: "Campos protegidos",
    levelsPublic: "Níveis do sinal",
    entry: "Entrada",
    target: "Alvo",
    stop: "Stop",
    buy: "Compra",
    sell: "Venda",
    liveMovement: "Movimentação ao vivo",
    liveQuote: "Cotação atual",
    liveEntry: "Preço de entrada",
    liveVariation: "Variação vs entrada",
    livePipsResult: "Resultado em pips",
    liveUpdating: "Atualizando…",
    liveUnavailable: "Cotação indisponível para este ativo no momento. O painel atualiza a cada 30 segundos quando houver feed.",
    live: "Ao vivo",
    finished: "Finalizado",
    available: "Disponível",
    resultsTitle: "Histórico de resultados",
    resultsText: "Resultados públicos resumidos, sem expor entrada, alvo ou stop completos.",
    filters: { year: "Ano", month: "Mês", asset: "Ativo", direction: "Direção", status: "Status", all: "Todos" },
    table: { signal: "Sinal", date: "Data", asset: "Ativo", direction: "Direção", result: "Resultado em pips", status: "Status", report: "Relatório" },
    monthlyTitle: "Relatório mensal do Canal Elite",
    monthlyText: "Resultados organizados por mês, com operações finalizadas e desempenho consolidado.",
    monthlyCardSignals: "Quantidade de sinais",
    monthlyCardPips: "Resultado total em pips",
    monthlyCardAssets: "Principais ativos operados",
    timelineTitle: "Linha do tempo desde 2018",
    timelineText: "Uma visão da evolução do Varejo Investidor, do Canal Elite e da construção histórica dos sinais ao vivo no WhatsApp.",
    depthTitle: "Mais do que sinais, uma estrutura de acompanhamento",
    depthText: "O Canal Elite combina análise, envio ao vivo, acompanhamento e relatório mensal para criar leitura contínua de mercado.",
    depthCards: [
      { title: "Análise antes do sinal", text: "Leitura de mercado, contexto técnico e cenário do ativo." },
      { title: "Envio ao vivo", text: "Sinal enviado diretamente no WhatsApp com entrada, alvo e stop." },
      { title: "Acompanhamento", text: "Atualizações sobre andamento, proteção e fechamento." },
      { title: "Relatório", text: "Consolidação mensal dos resultados e histórico operacional." },
    ],
    brokerTitle: "Abra sua conta e acompanhe os mercados globais",
    brokerText: "Para acompanhar sinais de Forex, ouro, petróleo, índices e moedas globais, você precisa operar em sua própria conta. Abra sua conta na corretora parceira e acompanhe os mercados com estrutura profissional.",
    brokerButton: "ABRIR CONTA FXPRO",
    brokerBannerText: "Clique no banner para acessar a corretora no idioma correto.",
    ctaTitle: "Acesse os sinais completos no Canal Elite",
    ctaText: "A página pública mostra o histórico e uma visão resumida das operações. Os sinais completos, com entrada, alvo, stop, análise e acompanhamento, são enviados diretamente no WhatsApp para membros do Canal Elite.",
    ctaButton: "ENTRAR NO CANAL ELITE",
    disclaimer: "O conteúdo desta página tem finalidade educacional e informativa. Histórico, sinais e dados públicos não constituem promessa de rentabilidade, recomendação individual ou garantia de resultado. Operações em Forex, criptoativos, commodities, índices e outros mercados envolvem risco e podem resultar em perdas.",
  },
  en: {
    label: "Elite History",
    heroTitle: "8 years of live WhatsApp signals",
    heroSubtitle: "Follow the historical evolution of the Elite Channel since August 2018, with more than 4,500 signals sent, monthly reports, and consolidated results.",
    centralMessage: "Since August 2018, Varejo Investidor has monitored global markets and sent live signals directly on WhatsApp. This page organizes the public history, monthly reports, and result evolution over the years.",
    primaryButton: "VIEW RESULTS HISTORY",
    secondaryButton: "JOIN ELITE CHANNEL",
    heroStats: ["Since August 2018", "+4,500 signals sent", "Forex, gold, oil, indices, crypto, and global currencies", "Consolidated monthly reports"],
    authorityTitle: "The difference is in the history",
    authorityText: "Few educational structures keep such a long public record of operational monitoring. The Elite Channel started in 2018 and evolved with signals, analysis, market reading, and monthly reports. This center was created to organize the past and prepare future monitoring with more transparency, context, and visual reading.",
    dashboardTitle: "Elite Channel historical dashboard",
    dashboardText: "View signals by year, accumulated result, asset distribution, and the monthly map of available reports.",
    chartSignals: "Signals by year",
    chartPerformance: "Accumulated result by year",
    chartAssets: "Asset distribution",
    chartHeatmap: "Monthly history",
    selectedYear: "Selected year",
    selectedMonth: "Selected month",
    totalSignals: "Total signals",
    consolidatedResult: "Consolidated result",
    availableMonths: "Available months",
    mainAssets: "Main assets",
    reports: "Reports",
    viewReport: "View report",
    activeTitle: "Monitored active operations",
    activeText: "Signals marked Free show entry, target, and stop on the site. Elite signals keep target and stop for the Elite WhatsApp channel.",
    asset: "Asset",
    direction: "Direction",
    status: "Status",
    partialResult: "Partial result",
    date: "Date",
    update: "Update",
    protectedFields: "Protected fields",
    levelsPublic: "Signal levels",
    entry: "Entry",
    target: "Target",
    stop: "Stop",
    buy: "Buy",
    sell: "Sell",
    liveMovement: "Live price movement",
    liveQuote: "Current quote",
    liveEntry: "Entry price",
    liveVariation: "Move vs entry",
    livePipsResult: "Result in pips",
    liveUpdating: "Updating…",
    liveUnavailable: "Live quote unavailable for this symbol. This panel polls every 30 seconds when a feed exists.",
    live: "Live",
    finished: "Finished",
    available: "Available",
    resultsTitle: "Results history",
    resultsText: "Summarized public results without exposing complete entry, target, or stop details.",
    filters: { year: "Year", month: "Month", asset: "Asset", direction: "Direction", status: "Status", all: "All" },
    table: { signal: "Signal", date: "Date", asset: "Asset", direction: "Direction", result: "Result in pips", status: "Status", report: "Report" },
    monthlyTitle: "Elite Channel monthly report",
    monthlyText: "Results organized by month, with completed operations and consolidated performance.",
    monthlyCardSignals: "Signal count",
    monthlyCardPips: "Total result in pips",
    monthlyCardAssets: "Main traded assets",
    timelineTitle: "Timeline since 2018",
    timelineText: "A view of the Elite Channel public evolution, with history, signal organization, and full data protected for members.",
    depthTitle: "More than signals, a monitoring structure",
    depthText: "The Elite Channel combines analysis, live delivery, monitoring, and monthly reporting to create continuous market reading.",
    depthCards: [
      { title: "Analysis before the signal", text: "Market reading, technical context, and asset scenario." },
      { title: "Live delivery", text: "Signal sent directly on WhatsApp with entry, target, and stop." },
      { title: "Monitoring", text: "Updates on progress, protection, and closure." },
      { title: "Report", text: "Monthly consolidation of results and operational history." },
    ],
    brokerTitle: "Open your account and follow global markets",
    brokerText: "To follow Forex, gold, oil, indices, and global currency signals, you need to trade in your own account. Open an account with the partner broker and follow markets with a professional structure.",
    brokerButton: "OPEN FXPRO ACCOUNT",
    brokerBannerText: "Click the banner to access the broker in the correct language.",
    ctaTitle: "Access the complete signals inside the Elite Channel",
    ctaText: "The public page shows history and a summarized view of operations. Complete signals with entry, target, stop, analysis, and monitoring are sent directly on WhatsApp to Elite Channel members.",
    ctaButton: "JOIN ELITE CHANNEL",
    disclaimer: "This page is educational and informational. Historical data, signals, and public metrics do not represent a promise of profitability, individual recommendation, or guarantee of results. Forex, crypto assets, commodities, indices, and other markets involve risk and may result in losses.",
  },
  es: {
    label: "Histórico Elite",
    heroTitle: "8 años de señales en vivo por WhatsApp",
    heroSubtitle: "Sigue la evolución histórica del Canal Elite desde agosto de 2018, con más de 4.500 señales enviadas, reportes mensuales y resultados consolidados.",
    centralMessage: "Desde agosto de 2018, Varejo Investidor acompaña los mercados globales y envía señales en vivo directamente por WhatsApp. Esta página organiza el histórico público, los reportes mensuales y la evolución de los resultados.",
    primaryButton: "VER HISTÓRICO DE RESULTADOS",
    secondaryButton: "ENTRAR AL CANAL ELITE",
    heroStats: ["Desde agosto de 2018", "+4.500 señales enviadas", "Forex, oro, petróleo, índices, cripto y monedas globales", "Reportes mensuales consolidados"],
    authorityTitle: "El diferencial está en el historial",
    authorityText: "Pocas estructuras educativas mantienen un historial público tan largo de seguimiento operativo. El Canal Elite nació en 2018 y evolucionó con señales, análisis, lectura de mercado y reportes mensuales.",
    dashboardTitle: "Panel histórico del Canal Elite",
    dashboardText: "Visualiza señales por año, resultado acumulado, distribución por activo y el mapa mensual de reportes disponibles.",
    chartSignals: "Señales por año",
    chartPerformance: "Resultado acumulado por año",
    chartAssets: "Distribución por activo",
    chartHeatmap: "Histórico mensual",
    selectedYear: "Año seleccionado",
    selectedMonth: "Mes seleccionado",
    totalSignals: "Total de señales",
    consolidatedResult: "Resultado consolidado",
    availableMonths: "Meses disponibles",
    mainAssets: "Principales activos",
    reports: "Reportes",
    viewReport: "Ver reporte",
    activeTitle: "Operaciones activas acompañadas",
    activeText: "Las señales Free muestran entrada, objetivo y stop en el sitio. Las Elite reservan objetivo y stop para el WhatsApp del Canal Elite.",
    asset: "Activo",
    direction: "Dirección",
    status: "Estado",
    partialResult: "Resultado parcial",
    date: "Fecha",
    update: "Actualización",
    protectedFields: "Campos protegidos",
    levelsPublic: "Niveles de la señal",
    entry: "Entrada",
    target: "Objetivo",
    stop: "Stop",
    buy: "Compra",
    sell: "Venta",
    liveMovement: "Movimiento en vivo",
    liveQuote: "Cotización actual",
    liveEntry: "Precio de entrada",
    liveVariation: "Variación vs entrada",
    livePipsResult: "Resultado en pips",
    liveUpdating: "Actualizando…",
    liveUnavailable: "Cotización no disponible para este activo. El panel se actualiza cada 30 segundos cuando hay feed.",
    live: "En vivo",
    finished: "Finalizado",
    available: "Disponible",
    resultsTitle: "Histórico de resultados",
    resultsText: "Resultados públicos resumidos, sin exponer entrada, objetivo o stop completos.",
    filters: { year: "Año", month: "Mes", asset: "Activo", direction: "Dirección", status: "Estado", all: "Todos" },
    table: { signal: "Señal", date: "Fecha", asset: "Activo", direction: "Dirección", result: "Resultado en pips", status: "Estado", report: "Reporte" },
    monthlyTitle: "Reporte mensual del Canal Elite",
    monthlyText: "Resultados organizados por mes, con operaciones finalizadas y desempeño consolidado.",
    monthlyCardSignals: "Cantidad de señales",
    monthlyCardPips: "Resultado total en pips",
    monthlyCardAssets: "Principales activos operados",
    timelineTitle: "Línea de tiempo desde 2018",
    timelineText: "Una vista de la evolución pública del Canal Elite, con historial, organización de señales y protección de datos completos para miembros.",
    depthTitle: "Más que señales, una estructura de seguimiento",
    depthText: "El Canal Elite combina análisis, envío en vivo, seguimiento y reporte mensual para crear lectura continua de mercado.",
    depthCards: [
      { title: "Análisis antes de la señal", text: "Lectura de mercado, contexto técnico y escenario del activo." },
      { title: "Envío en vivo", text: "Señal enviada directamente por WhatsApp con entrada, objetivo y stop." },
      { title: "Seguimiento", text: "Actualizaciones sobre avance, protección y cierre." },
      { title: "Reporte", text: "Consolidación mensual de resultados e histórico operativo." },
    ],
    brokerTitle: "Abre tu cuenta y acompaña los mercados globales",
    brokerText: "Para acompañar señales de Forex, oro, petróleo, índices y monedas globales, necesitas operar en tu propia cuenta. Abre tu cuenta en el broker asociado y acompaña los mercados con estructura profesional.",
    brokerButton: "ABRIR CUENTA FXPRO",
    brokerBannerText: "Haz clic en el banner para acceder al broker en el idioma correcto.",
    ctaTitle: "Accede a las señales completas en el Canal Elite",
    ctaText: "La página pública muestra el histórico y una visión resumida de las operaciones. Las señales completas, con entrada, objetivo, stop, análisis y seguimiento, se envían directamente por WhatsApp a miembros del Canal Elite.",
    ctaButton: "ENTRAR AL CANAL ELITE",
    disclaimer: "El contenido de esta página tiene finalidad educativa e informativa. El histórico, las señales y los datos públicos no constituyen promesa de rentabilidad, recomendación individual ni garantía de resultado. Forex, criptoactivos, commodities, índices y otros mercados implican riesgo y pueden generar pérdidas.",
  },
  fr: undefined as never,
  hi: eliteReportCopyHi as Copy,
  ar: undefined as never,
  tr: undefined as never,
  id: undefined as never,
  vi: undefined as never,
  th: undefined as never,
  ru: undefined as never,
  ur: undefined as never,
  bn: undefined as never,
  ja: eliteReportCopyJa as Copy,
  ko: undefined as never,
};

for (const locale of ["fr", "ar", "tr", "id", "vi", "th", "ru", "ur", "bn", "ko"] as Locale[]) {
  copyByLocale[locale] = copyByLocale.en;
}

const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

const reports: MonthlyReport[] = [
  {
    year: eliteAugust2018Monthly.year,
    month: eliteAugust2018Monthly.month,
    monthIndex: eliteAugust2018Monthly.monthIndex,
    signals: eliteAugust2018Monthly.signals,
    result: eliteAugust2018Monthly.result,
    pips: eliteAugust2018Monthly.pips,
    status: eliteAugust2018Monthly.status,
    assets: eliteAugust2018Monthly.assets,
  },
  {
    year: eliteSeptember2018Monthly.year,
    month: eliteSeptember2018Monthly.month,
    monthIndex: eliteSeptember2018Monthly.monthIndex,
    signals: eliteSeptember2018Monthly.signals,
    result: eliteSeptember2018Monthly.result,
    pips: eliteSeptember2018Monthly.pips,
    status: eliteSeptember2018Monthly.status,
    assets: eliteSeptember2018Monthly.assets,
  },
  { year: 2019, month: "Março", monthIndex: 2, signals: 96, result: "+9,8%", pips: 0, status: "Disponível", assets: ["GBP/JPY", "USOIL", "EUR/USD"] },
  { year: 2020, month: "Junho", monthIndex: 5, signals: 112, result: "+14,6%", pips: 0, status: "Disponível", assets: ["XAU/USD", "NASDAQ", "BTC/USD"] },
  { year: 2021, month: "Janeiro", monthIndex: 0, signals: 98, result: "+11,2%", pips: 0, status: "Disponível", assets: ["XAU/USD", "GBP/JPY"] },
  {
    year: eliteSeptember2022Monthly.year,
    month: eliteSeptember2022Monthly.month,
    monthIndex: eliteSeptember2022Monthly.monthIndex,
    signals: eliteSeptember2022Monthly.signals,
    result: eliteSeptember2022Monthly.result,
    pips: eliteSeptember2022Monthly.pips,
    status: eliteSeptember2022Monthly.status,
    assets: eliteSeptember2022Monthly.assets,
  },
  { year: 2022, month: "Outubro", monthIndex: 9, signals: 118, result: "+15,9%", pips: 0, status: "Disponível", assets: ["EUR/USD", "USOIL", "S&P 500"] },
  { year: 2023, month: "Julho", monthIndex: 6, signals: 126, result: "+17,3%", pips: 0, status: "Disponível", assets: ["XAU/USD", "NASDAQ", "GBP/JPY"] },
  { year: 2024, month: "Março", monthIndex: 2, signals: 137, result: "+22,7%", pips: 0, status: "Disponível", assets: ["XAU/USD", "BTC/USD", "NASDAQ"] },
  { year: 2025, month: "Novembro", monthIndex: 10, signals: 131, result: "+19,4%", pips: 0, status: "Disponível", assets: ["EUR/USD", "USOIL", "S&P 500"] },
  { year: 2026, month: "Fevereiro", monthIndex: 1, signals: 1, result: "+187 pips", pips: 187, status: "Finalizado", assets: ["XAU/USD"] },
  { year: 2026, month: "Maio", monthIndex: 4, signals: 2, result: "+805 pips", pips: 805, status: "Finalizado", assets: ["USOIL", "GBP/JPY"] },
];

const activeOperations: Operation[] = [
  {
    asset: "XAU/USD",
    direction: "Compra",
    status: "active",
    result: "Em andamento",
    pips: 0,
    date: "06/2026",
    updatedAt: "Atualizado hoje",
    reportMonth: "06/2026",
    signalTier: "elite",
    entryPrice: 3342.5,
    takePrice: 3368,
    stopPrice: 3325,
  },
  {
    asset: "EUR/USD",
    direction: "Venda",
    status: "active",
    result: "Em andamento",
    pips: 0,
    date: "06/2026",
    updatedAt: "Atualizado hoje",
    reportMonth: "06/2026",
    signalTier: "free",
    entryPrice: 1.0842,
    takePrice: 1.0795,
    stopPrice: 1.0872,
  },
  {
    asset: "GBP/JPY",
    direction: "Venda",
    status: "active",
    result: "Em andamento",
    pips: 0,
    date: "06/2026",
    updatedAt: "Atualizado hoje",
    reportMonth: "06/2026",
    signalTier: "elite",
    entryPrice: 199.45,
    takePrice: 198.2,
    stopPrice: 200.1,
  },
];

const completedOperations: Operation[] = [
  ...(eliteAugust2018HubOperations as Operation[]),
  ...(eliteSeptember2018HubOperations as Operation[]),
  ...(eliteSeptember2022HubOperations as Operation[]),
  { asset: "XAU/USD", direction: "Compra", status: "closed", result: "+187 pips", pips: 187, date: "Fevereiro/2026", updatedAt: "Finalizado", reportMonth: "Fevereiro/2026" },
  { asset: "USOIL", direction: "Compra", status: "closed", result: "+713 pips", pips: 713, date: "Maio/2026", updatedAt: "Finalizado", reportMonth: "Maio/2026" },
  { asset: "GBP/JPY", direction: "Venda", status: "closed", result: "+92 pips", pips: 92, date: "Maio/2026", updatedAt: "Finalizado", reportMonth: "Maio/2026" },
  { asset: "EUR/USD", direction: "Venda", status: "closed", result: "+58 pips", pips: 58, date: "Maio/2026", updatedAt: "Finalizado", reportMonth: "Maio/2026" },
  { asset: "BTC/USD", direction: "Compra", status: "closed", result: "-34 pips", pips: -34, date: "Março/2024", updatedAt: "Finalizado", reportMonth: "Março/2024" },
];

const timelineStats = [
  { value: "2018", label: "Início dos sinais" },
  { value: "4.500+", label: "Sinais enviados" },
  { value: "8 anos", label: "Histórico operacional" },
  { value: "600 mil+", label: "Seguidores globais" },
];

const timelineEvents: TimelineEvent[] = [
  {
    year: "2018",
    title: "Criação dos sinais Elite",
    shortTitle: "Criação dos sinais Elite",
    summary: "Março de 2018 marca o início dos sinais gratuitos do Varejo Investidor. Após meses de desenvolvimento da metodologia, em agosto de 2018 foi criado oficialmente o Canal Elite, estrutura paga de acompanhamento operacional, análises e sinais enviados ao vivo pelo WhatsApp.",
    marker: "Nascimento da estrutura operacional que serviria de base para milhares de sinais enviados ao longo dos anos.",
    context: "O mercado de educação financeira ainda era dominado por cursos gravados e promessas de resultado. A proposta do Canal Elite foi diferente: acompanhar mercados reais diariamente, compartilhar operações e construir um histórico público de longo prazo.",
    impact: "Início da construção de um dos maiores históricos de sinais ao vivo enviados pelo WhatsApp para investidores de varejo.",
    result: "Criação da metodologia operacional e início do histórico que mais tarde ultrapassaria 4.500 sinais enviados.",
    tone: "gold",
  },
  {
    year: "2019",
    title: "Parceria com fundo de investimento",
    shortTitle: "Parceria com fundo",
    summary: "Primeiro contato com estruturas mais profissionais de gestão e acompanhamento de patrimônio.",
    marker: "Participação em parceria ligada à gestão de aproximadamente R$ 900 mil em capital acompanhado.",
    context: "A experiência permitiu contato com processos de risco, proteção patrimonial, acompanhamento de carteira e tomada de decisão voltada para preservação de capital.",
    impact: "Mudança de visão. O foco deixa de ser apenas operação e passa a incluir gestão, patrimônio e construção de longo prazo.",
    result: "Ampliação do conhecimento sobre estruturas profissionais de investimento.",
    tone: "gold",
  },
  {
    year: "2020",
    title: "Fundo Europeu",
    shortTitle: "Fundo Europeu",
    summary: "Participação em estrutura ligada a fundo europeu com aproximadamente R$ 19 milhões em capital acompanhado.",
    marker: "Primeira vivência relevante em ambiente internacional de gestão.",
    context: "O contato com estruturas globais trouxe uma visão mais ampla sobre liquidez, diversificação, proteção patrimonial e comportamento institucional.",
    impact: "Expansão da leitura sobre capital global e mercados internacionais.",
    result: "Fortalecimento da visão macroeconômica e internacional que mais tarde se tornaria uma das bases do método Harpia.",
    tone: "green",
  },
  {
    year: "2021",
    title: "Trader Nômade",
    shortTitle: "Trader Nômade",
    summary: "Período dedicado ao aprofundamento dos estudos, operação independente e experiência prática em diferentes ambientes.",
    marker: "Fase sabática voltada para desenvolvimento pessoal e profissional.",
    context: "Ao operar de forma independente e estudar mercados globais diariamente, surgem os conceitos que mais tarde evoluiriam para os níveis Formiga, Lobo e Harpia.",
    impact: "Consolidação da filosofia de construção patrimonial baseada em visão global.",
    result: "Fortalecimento da metodologia educacional que hoje sustenta toda a estrutura do Varejo Investidor.",
    tone: "gold",
  },
  {
    year: "2022",
    title: "Parcerias com escritórios",
    shortTitle: "Parcerias",
    summary: "Construção de relacionamentos com escritórios, assessorias e profissionais do mercado financeiro.",
    marker: "Expansão da presença institucional.",
    context: "O período foi marcado por aproximação com estruturas comerciais, assessores, investidores e profissionais ligados ao setor financeiro.",
    impact: "Aumento da compreensão sobre captação, relacionamento e posicionamento de mercado.",
    result: "Ampliação da rede estratégica e fortalecimento institucional.",
    tone: "gold",
  },
  {
    year: "2023",
    title: "Mesa Proprietária",
    shortTitle: "Mesa Proprietária",
    summary: "Participação na criação e estruturação de mesa proprietária.",
    marker: "Contato direto com processos de avaliação, risco e performance de traders.",
    context: "O ambiente de mesa proprietária exige disciplina operacional, controle emocional, métricas de desempenho e gestão rigorosa de risco.",
    impact: "Maior profundidade em processos operacionais e acompanhamento de performance.",
    result: "Experiência prática em estruturas profissionais de operação.",
    tone: "green",
  },
  {
    year: "2024",
    title: "Banco + Estratégia LATAM",
    shortTitle: "Estratégia LATAM",
    summary: "Atuação em gestão bancária e posição de manager LATAM em corretora global.",
    marker: "Responsável pela estratégia de introdução e expansão da corretora em toda a América Latina.",
    context: "O trabalho envolveu desenvolvimento de mercado, posicionamento regional, relacionamento com parceiros e expansão comercial em múltiplos países.",
    impact: "Ampliação da visão sobre bancos, corretoras, aquisição de clientes, regulação e expansão internacional.",
    result: "Consolidação da experiência institucional em nível regional.",
    tone: "gold",
  },
  {
    year: "2025",
    title: "100 Mil Seguidores",
    shortTitle: "100 Mil Seguidores",
    summary: "A comunidade Varejo Investidor ultrapassa a marca de 100 mil seguidores.",
    marker: "Crescimento acelerado da presença digital.",
    context: "Após anos produzindo conteúdo, relatórios e análises, a audiência passa a crescer de forma consistente.",
    impact: "Maior alcance da metodologia Formiga, Lobo e Harpia.",
    result: "Fortalecimento da autoridade digital e expansão da comunidade.",
    tone: "green",
  },
  {
    year: "2026",
    title: "Expansão Internacional",
    shortTitle: "Expansão Internacional",
    summary: "O projeto alcança múltiplos idiomas e amplia sua presença para diferentes regiões do mundo.",
    marker: "Mais de 4.500 sinais enviados ao vivo desde 2018 e aproximadamente 600 mil seguidores.",
    context: "O conteúdo passa a ser distribuído em diversos idiomas, atingindo públicos da América Latina, Europa, Ásia e Oriente Médio.",
    impact: "Transformação do Varejo Investidor em uma estrutura internacional de educação financeira, sinais e relatórios.",
    result: "Consolidação da marca como plataforma global voltada ao investidor de varejo.",
    tone: "green",
  },
];

function formatMonthlyAssetsPreview(assets: string[], locale: Locale): string {
  if (!assets.length) return "—";
  const max = 4;
  if (assets.length <= max) return assets.join(" · ");
  const rest = assets.length - max;
  if (locale === "en") return `${assets.slice(0, max).join(" · ")} +${rest} more`;
  if (locale === "es") return `${assets.slice(0, max).join(" · ")} +${rest} más`;
  return `${assets.slice(0, max).join(" · ")} +${rest} ativos`;
}

function formatNumber(value: number, locale: Locale) {
  return new Intl.NumberFormat(locale === "pt" ? "pt-BR" : locale).format(value);
}

function formatPips(value: number, locale: Locale) {
  return `${value >= 0 ? "+" : ""}${formatNumber(value, locale)} pips`;
}

function getYearSummary(year: number, reportSource: MonthlyReport[], completed: Operation[] = []) {
  const yearReports = reportSource.filter((report) => report.year === year);
  const signalsFromReports = yearReports.reduce((sum, report) => sum + report.signals, 0);
  const pipsFromReports = yearReports.reduce((sum, report) => sum + report.pips, 0);
  const yearOps = completed.filter((op) => {
    const parts = op.reportMonth.split("/");
    return parts.length === 2 && Number(parts[1]) === year;
  });
  const signals = yearOps.length > 0 ? yearOps.length : signalsFromReports;
  const pipsFromOps = yearOps.reduce((sum, op) => sum + (op.pips ?? 0), 0);
  const pips = pipsFromOps > 0 ? pipsFromOps : pipsFromReports;
  const percentReports = yearReports.filter((report) => report.result.includes("%"));
  const assets = Array.from(new Set(yearReports.flatMap((report) => report.assets)));

  return {
    reports: yearReports,
    signals,
    result: pips ? formatPips(pips, "pt") : percentReports.map((report) => report.result).join(" / "),
    assets,
  };
}

function reportHref(year: number | string) {
  const available = normalizedEliteReports.some((report) => report.year === String(year));
  return available ? `/historico/${year}` : "#";
}

function SelectField({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return (
    <label className="grid gap-2">
      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gold">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="border border-gold/20 bg-paper px-4 py-3 text-sm font-bold text-ink outline-none transition focus:border-gold">
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  );
}

type EliteHubData = {
  monthly: HubMonthlyReport[];
  activeOperations: HubOperation[];
  completedOperations: HubOperation[];
  stats?: { totalSignals: number; totalPips: number; winRate: string; closedCount: number };
  traderPerformance?: PeriodPerformance[];
  operations?: EliteOperationRow[];
};

export default function EliteReportHub({ initialLocale, hubData }: { initialLocale: Locale; hubData?: EliteHubData }) {
  const reduceMotion = useReducedMotion();
  const revealTransition = reduceMotion ? { duration: 0 } : { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const };
  const [locale, setLocale] = useState<Locale>(initialLocale);
  const [selectedYear, setSelectedYear] = useState(2026);
  const [selectedMonthKey, setSelectedMonthKey] = useState("2026-4");
  const [selectedTimelineYear, setSelectedTimelineYear] = useState("2026");
  const [filters, setFilters] = useState({ year: "Todos", month: "Todos", asset: "Todos", direction: "Todos", status: "Todos" });
  const [activeOpsPage, setActiveOpsPage] = useState(1);
  const [closedOpsPage, setClosedOpsPage] = useState(1);
  const [monthlyReportsVisible, setMonthlyReportsVisible] = useState(ELITE_MONTHLY_INITIAL_VISIBLE);
  const operationsPageSize = useOperationsPageSize();

  const baseReportsData: MonthlyReport[] = hubData?.monthly?.length ? (hubData.monthly as MonthlyReport[]) : reports;
  const activeOperationsData: Operation[] = hubData?.activeOperations?.length
    ? (hubData.activeOperations as Operation[])
    : activeOperations;
  const baseCompletedOperations: Operation[] = hubData?.completedOperations?.length
    ? (hubData.completedOperations as Operation[])
    : completedOperations;

  const reportsData = useMemo(() => {
    let next = baseReportsData;
    if (next.some((r) => r.year === 2018 && r.monthIndex === 7)) {
      next = next.map((r) =>
        r.year === 2018 && r.monthIndex === 7 ? ({ ...r, ...eliteAugust2018Monthly } as MonthlyReport) : r,
      );
    } else {
      next = [...next, { ...eliteAugust2018Monthly } as MonthlyReport];
    }
    if (next.some((r) => r.year === 2018 && r.monthIndex === 8)) {
      next = next.map((r) =>
        r.year === 2018 && r.monthIndex === 8 ? ({ ...r, ...eliteSeptember2018Monthly } as MonthlyReport) : r,
      );
    } else {
      next = [...next, { ...eliteSeptember2018Monthly } as MonthlyReport];
    }
    if (next.some((r) => r.year === 2022 && r.monthIndex === 8)) {
      next = next.map((r) =>
        r.year === 2022 && r.monthIndex === 8 ? ({ ...r, ...eliteSeptember2022Monthly } as MonthlyReport) : r,
      );
    } else {
      next = [...next, { ...eliteSeptember2022Monthly } as MonthlyReport];
    }
    return next.sort((a, b) => a.year - b.year || a.monthIndex - b.monthIndex);
  }, [baseReportsData]);

  const completedOperationsData = useMemo(() => {
    const rest = baseCompletedOperations.filter(
      (op) =>
        op.reportMonth !== "Agosto/2018" &&
        op.reportMonth !== "Setembro/2018" &&
        op.reportMonth !== "Setembro/2022",
    );
    return [
      ...(eliteAugust2018HubOperations as Operation[]),
      ...(eliteSeptember2018HubOperations as Operation[]),
      ...(eliteSeptember2022HubOperations as Operation[]),
      ...rest,
    ];
  }, [baseCompletedOperations]);

  const t = translations[locale] ?? translations.en;
  const copy = copyByLocale[locale] ?? copyByLocale.en;
  const ctaHref = locale === "pt" ? ELITE_LASTLINK_URL : ELITE_STRIPE_LINKS[3];
  const selectedYearSummary = getYearSummary(selectedYear, reportsData, completedOperationsData);
  const selectedMonth =
    reportsData.find((report) => `${report.year}-${report.monthIndex}` === selectedMonthKey) ?? reportsData[reportsData.length - 1];
  const publicSignalsHighlight = useMemo(() => {
    const fromDb = hubData?.stats?.totalSignals ?? 0;
    return Math.max(ELITE_HISTORIC_SIGNALS_SENT, fromDb);
  }, [hubData?.stats?.totalSignals]);

  const heroStats =
    hubData?.stats && hubData.stats.closedCount > 0
      ? [
          "Desde agosto de 2018",
          `${publicSignalsHighlight.toLocaleString(locale === "pt" ? "pt-BR" : "en-US")} ${
            locale === "es" ? "señales enviadas" : locale === "en" ? "signals sent" : "sinais enviados"
          }`,
          `${hubData.stats.totalPips >= 0 ? "+" : ""}${hubData.stats.totalPips.toLocaleString("pt-BR")} pips públicos`,
          `Taxa de acerto (amostra): ${hubData.stats.winRate}`,
        ]
      : copy.heroStats;

  const monthlyReportsNewestFirst = useMemo(() => reportsData.slice().reverse(), [reportsData]);
  const selectedTimelineEvent = timelineEvents.find((event) => event.year === selectedTimelineYear) ?? timelineEvents[timelineEvents.length - 1];

  const yearlyPerformance = useMemo(
    () => buildCumulativePerformanceByYear(completedOperationsData, reportsData, historicYears()),
    [completedOperationsData, reportsData],
  );

  const annualData = useMemo(() => {
    return yearlyPerformance.map((row) => {
      const summary = getYearSummary(row.year, reportsData, completedOperationsData);
      return {
        year: row.year,
        signals: row.signals > 0 ? row.signals : summary.signals,
        assets: summary.assets.length ? summary.assets : ["XAU/USD", "EUR/USD", "GBP/JPY"],
      };
    });
  }, [yearlyPerformance, reportsData, completedOperationsData]);

  const performanceData = useMemo(
    () => yearlyPerformance.map(({ year, value, signals }) => ({ year, value, signals })),
    [yearlyPerformance],
  );

  const assetDistribution = useMemo(() => {
    const colors = ["#c6994a", "#16a34a", "#3b82f6", "#ef4444", "#8b5cf6", "#f97316", "#14b8a6", "#94a3b8"];
    const map = new Map<string, number>();
    const allSignals = [...completedOperationsData, ...activeOperationsData];
    for (const op of allSignals) {
      map.set(op.asset, (map.get(op.asset) ?? 0) + 1);
    }
    if (map.size === 0) {
      for (const report of reportsData) {
        for (const asset of report.assets) map.set(asset, (map.get(asset) ?? 0) + report.signals / report.assets.length);
      }
    }
    return Array.from(map.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([label, value], index) => ({
        label,
        value: Math.round(value),
        color: colors[index % colors.length],
      }));
  }, [reportsData, completedOperationsData, activeOperationsData]);

  const sortedActiveOperations = useMemo(
    () => sortOperationsByRecency(activeOperationsData),
    [activeOperationsData],
  );

  const activeQuoteAssets = useMemo(
    () => Array.from(new Set(sortedActiveOperations.map((op) => op.asset))),
    [sortedActiveOperations],
  );

  const {
    prices: livePrices,
    updatedAt: liveQuotesUpdatedAt,
    loading: liveQuotesLoading,
  } = useEliteLiveQuotes(activeQuoteAssets, sortedActiveOperations.length > 0);

  const activeOperationsWithLivePips = useMemo(
    () => applyLivePipsToActiveOperations(sortedActiveOperations, livePrices),
    [sortedActiveOperations, livePrices],
  );

  const filteredOperations = useMemo(() => {
    const list = completedOperationsData.filter((operation) => {
      const [monthName, yearText] = operation.reportMonth.split("/");
      return (
        (filters.year === "Todos" || filters.year === yearText) &&
        (filters.month === "Todos" || filters.month === monthName) &&
        (filters.asset === "Todos" || filters.asset === operation.asset) &&
        (filters.direction === "Todos" || filters.direction === operation.direction) &&
        (filters.status === "Todos" || filters.status === copy.finished)
      );
    });
    return sortOperationsByRecency(list);
  }, [completedOperationsData, copy.finished, filters]);

  useEffect(() => {
    setClosedOpsPage(1);
  }, [filters]);

  useEffect(() => {
    setActiveOpsPage(1);
    setClosedOpsPage(1);
  }, [operationsPageSize]);

  const activePagination = useMemo(
    () => paginateList(activeOperationsWithLivePips, activeOpsPage, operationsPageSize),
    [activeOperationsWithLivePips, activeOpsPage, operationsPageSize],
  );

  const closedPagination = useMemo(
    () => paginateList(filteredOperations, closedOpsPage, operationsPageSize),
    [filteredOperations, closedOpsPage, operationsPageSize],
  );

  const operationsStats =
    locale === "en"
      ? {
          live: "Live",
          finished: "Closed",
          filtered: "In this filter",
          totalPublic: "Public history",
        }
      : locale === "es"
        ? {
            live: "Activas",
            finished: "Finalizadas",
            filtered: "En este filtro",
            totalPublic: "Histórico público",
          }
        : {
            live: "Ao vivo",
            finished: "Finalizadas",
            filtered: "Neste filtro",
            totalPublic: "Histórico público",
          };

  function changeLocale(nextLocale: Locale) {
    setLocale(nextLocale);
    window.localStorage.setItem("varejo_language", nextLocale);
    window.localStorage.setItem("language", nextLocale);
    window.location.href = eliteReportPaths[nextLocale] ?? eliteReportPaths.en;
  }

  const setFilter = (key: keyof typeof filters, value: string) => setFilters((current) => ({ ...current, [key]: value }));

  return (
    <main
      lang={localeToHtmlLang(locale)}
      dir={isRtlLocale(locale) ? "rtl" : "ltr"}
      className="elite-report-page page-content min-h-screen overflow-x-clip bg-ink text-paper"
    >
      <SiteChrome locale={locale} t={t} onLocaleChange={changeLocale} />

      <section className="page-hero premium-stage relative border-b border-gold/[0.14] px-5 pb-16 pt-36 md:px-8 md:pb-24 md:pt-48">
        <div className="finance-particles" />
        <div className="absolute right-0 top-24 h-96 w-96 rounded-full bg-rise/[0.12] blur-3xl" />
        <div className="absolute left-0 top-40 h-80 w-80 rounded-full bg-gold/[0.1] blur-3xl" />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-end">
            <motion.div initial={reduceMotion ? false : "hidden"} animate="visible" variants={fadeUp} transition={revealTransition}>
              <p className="text-xs font-black uppercase tracking-[0.32em] text-gold">{copy.label}</p>
              <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[0.94] tracking-[-0.06em] text-paper md:text-7xl">{copy.heroTitle}</h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-paper/72 md:text-xl">{copy.heroSubtitle}</p>
              <p className="mt-6 max-w-3xl text-base leading-8 text-paper/62">{copy.centralMessage}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#historico-resultados" className="premium-button-gold inline-flex items-center justify-center bg-gold px-6 py-4 text-sm font-black uppercase tracking-[0.16em] text-ink transition hover:-translate-y-0.5">{copy.primaryButton}</a>
                <a href={ctaHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center border border-gold/30 px-6 py-4 text-sm font-black uppercase tracking-[0.16em] text-paper transition hover:border-gold hover:text-gold">{copy.secondaryButton}</a>
              </div>
            </motion.div>
            <div className="grid gap-3 sm:grid-cols-2">
              {heroStats.map((stat) => (
                <article key={stat} className="terminal-module border border-gold/[0.22] bg-paper/[0.04] p-5 backdrop-blur-sm shadow-[0_0_40px_rgba(198,153,74,0.08)]">
                  <p className="text-sm font-semibold leading-relaxed tracking-[0.04em] text-paper/80">{stat}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-14 md:px-8 md:py-18">
        <div className="mx-auto max-w-7xl border border-gold/16 bg-white/[0.03] p-6 md:p-8">
          <SectionHeader eyebrow={copy.label} title={copy.authorityTitle} text={copy.authorityText} />
        </div>
      </section>

      {hubData?.traderPerformance?.length ? (
        <section className="border-y border-white/[0.06] px-5 py-16 md:px-8 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gold/75">
                {locale === "en" ? "Performance" : locale === "es" ? "Rendimiento" : "Desempenho"}
              </p>
              <h2 className="mt-3 font-serif text-4xl tracking-[-0.03em] text-paper md:text-5xl">
                {locale === "en" ? "Performance" : locale === "es" ? "Rendimiento" : "Desempenho"}
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-paper/55">
                {locale === "en"
                  ? "Public desk snapshot: signals, win rate and pips by day, week and month."
                  : locale === "es"
                    ? "Resumen público del desk: señales, acierto y pips por día, semana y mes."
                    : "Resumo público do desk: sinais, taxa de acerto e resultado em pips por dia, semana e mês."}
              </p>
            </div>
            <div className="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {hubData.traderPerformance.map((period) => (
                <article
                  key={period.key}
                  className="rounded-sm border border-white/[0.08] bg-black/40 p-5 backdrop-blur-sm transition hover:border-gold/25"
                >
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gold">{period.label}</p>
                  <dl className="mt-5 space-y-3 text-sm">
                    <MetricRow
                      label={locale === "en" ? "Operations" : "Operações"}
                      value={String(period.operations)}
                      emphasize
                    />
                    <MetricRow label={locale === "en" ? "Closed" : "Finalizadas"} value={String(period.closed)} />
                    <MetricRow label={locale === "en" ? "Win rate" : "Taxa de acerto"} value={period.winRate} accent="rise" />
                    <MetricRow
                      label={locale === "en" ? "Pips" : "Pips"}
                      value={`${period.pips >= 0 ? "+" : ""}${formatNumber(period.pips, locale)}`}
                      accent={period.pips >= 0 ? "rise" : "fall"}
                      emphasize
                    />
                  </dl>
                </article>
              ))}
            </div>
            {hubData.operations?.length ? (
              <ElitePeriodTrendChart operations={hubData.operations} variant="public" />
            ) : null}
          </div>
        </section>
      ) : null}

      <section id="historico-resultados" className="px-5 py-14 md:px-8 md:py-18">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Dashboard" title={copy.dashboardTitle} text={copy.dashboardText} />
          <div className="mt-8 grid gap-5 xl:grid-cols-2">
            <PremiumAnnualBarChart
              data={annualData}
              locale={locale}
              onSelect={setSelectedYear}
              title={copy.chartSignals}
              footer={`${copy.chartSignals}: ${copy.totalSignals} + ${copy.mainAssets.toLowerCase()} no tooltip.`}
            />
            <PremiumCumulativeAreaChart data={performanceData} locale={locale} title={copy.chartPerformance} />
            <PremiumDonutChart data={assetDistribution} title={copy.chartAssets} locale={locale} />
            <div className="rounded-sm border border-white/[0.08] bg-black/35 p-6">
              <p className="text-[10px] font-black uppercase tracking-[0.26em] text-gold">{copy.chartHeatmap}</p>
              <div className="mt-6 overflow-x-auto">
                <div className="grid min-w-[660px] grid-cols-[70px_repeat(12,1fr)] gap-2">
                  <span />
                  {monthNames.map((month) => <span key={month} className="text-center text-[10px] font-bold uppercase tracking-[0.12em] text-paper/44">{month.slice(0, 3)}</span>)}
                  {annualData.map(({ year }) => (
                    <div key={year} className="contents">
                      <button type="button" onClick={() => setSelectedYear(year)} className="text-left font-mono text-xs font-black text-gold">{year}</button>
                      {monthNames.map((month, index) => {
                        const report = reportsData.find((entry) => entry.year === year && entry.monthIndex === index);
                        return (
                          <button
                            key={`${year}-${month}`}
                            type="button"
                            title={report ? `${month}/${year}: ${report.signals} sinais | ${report.result}` : `${month}/${year}`}
                            onClick={() => report && setSelectedMonthKey(`${report.year}-${report.monthIndex}`)}
                            className={`h-9 border text-[10px] font-black transition ${
                              report
                                ? report.pips > 0 || report.result.startsWith("+")
                                  ? "border-rise/35 bg-rise/20 text-rise hover:bg-rise hover:text-ink"
                                  : "border-gold/25 bg-gold/20 text-gold hover:bg-gold hover:text-ink"
                                : "border-white/5 bg-white/[0.025] text-paper/16"
                            }`}
                          >
                            {report ? report.signals : ""}
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            <article className="border border-gold/16 bg-white/[0.03] p-6">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-gold">{copy.selectedYear}</p>
              <h3 className="mt-3 font-mono text-4xl font-black text-paper">{selectedYear}</h3>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Info label={copy.totalSignals} value={formatNumber(selectedYearSummary.signals, locale)} />
                <Info label={copy.consolidatedResult} value={selectedYearSummary.result || copy.available} />
                <Info label={copy.availableMonths} value={String(selectedYearSummary.reports.length)} />
                <Info label={copy.mainAssets} value={selectedYearSummary.assets.join(", ") || "XAU/USD, EUR/USD"} />
              </div>
            </article>
            <article className="border border-gold/16 bg-white/[0.03] p-6">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-gold">{copy.selectedMonth}</p>
              <h3 className="mt-3 font-serif text-4xl tracking-[-0.04em] text-paper">{selectedMonth.month}/{selectedMonth.year}</h3>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Info label={copy.totalSignals} value={formatNumber(selectedMonth.signals, locale)} />
                <Info label={copy.consolidatedResult} value={selectedMonth.result} />
                <Info label={copy.mainAssets} value={selectedMonth.assets.join(", ")} />
                <Info label={copy.status} value={selectedMonth.status} />
              </div>
              <a href={reportHref(selectedMonth.year)} className="mt-6 inline-flex w-full items-center justify-center border border-gold/30 px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-paper transition hover:border-gold hover:bg-gold hover:text-ink sm:w-auto">{copy.viewReport}</a>
            </article>
          </div>
        </div>
      </section>

      <section className="px-5 py-14 md:px-8 md:py-18">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Elite" title={copy.activeTitle} text={copy.activeText} />
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <OperationsStat label={operationsStats.live} value={String(sortedActiveOperations.length)} tone="rise" />
            <OperationsStat label={operationsStats.finished} value={String(completedOperationsData.length)} tone="gold" />
            <OperationsStat label={operationsStats.totalPublic} value={String(sortedActiveOperations.length + completedOperationsData.length)} />
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {activePagination.slice.map((operation, index) => (
              <EliteOperationCard
                key={`active-${operation.signalNumber ?? "x"}-${operation.asset}-${operation.date}-${index}`}
                operation={operation}
                copy={copy}
                locale={locale}
                mode="active"
                index={index}
                quoteUpdatedAt={liveQuotesUpdatedAt}
                quoteLoading={liveQuotesLoading}
              />
            ))}
          </div>
          {sortedActiveOperations.length === 0 ? (
            <p className="mt-8 rounded border border-dashed border-white/12 px-4 py-10 text-center text-sm text-paper/50">
              {locale === "en" ? "No live operations at the moment." : locale === "es" ? "Sin operaciones activas." : "Nenhuma operação ao vivo no momento."}
            </p>
          ) : null}
          <div className="mt-6">
            <EliteOperationsPager
              page={activePagination.page}
              totalPages={activePagination.totalPages}
              totalItems={activePagination.total}
              pageSize={operationsPageSize}
              onPage={setActiveOpsPage}
              locale={locale}
            />
          </div>
        </div>
      </section>

      <section id="historico-operacoes" className="border-y border-white/8 bg-white/[0.025] px-5 py-14 md:px-8 md:py-18">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Pips" title={copy.resultsTitle} text={copy.resultsText} />
          <p className="mt-4 text-sm text-paper/55">
            {locale === "en"
              ? "Browse finished signals as cards. Paginate to see the full public history and operation volume."
              : locale === "es"
                ? "Recorra las operaciones finalizadas en tarjetas. Use páginas para ver el volumen del histórico."
                : "Navegue pelas operações finalizadas em cards. As páginas mostram o volume e a profundidade do histórico público."}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="rounded border border-gold/25 bg-gold/10 px-3 py-1.5 text-xs font-bold text-gold">
              {operationsStats.filtered}: {filteredOperations.length}
            </span>
            <span className="text-xs text-paper/45">
              {operationsStats.finished}: {completedOperationsData.length}
            </span>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <SelectField label={copy.filters.year} value={filters.year} options={[copy.filters.all, ...Array.from(new Set(completedOperationsData.map((operation) => operation.reportMonth.split("/")[1])))]} onChange={(value) => setFilter("year", value === copy.filters.all ? "Todos" : value)} />
            <SelectField label={copy.filters.month} value={filters.month} options={[copy.filters.all, ...Array.from(new Set(completedOperationsData.map((operation) => operation.reportMonth.split("/")[0])))]} onChange={(value) => setFilter("month", value === copy.filters.all ? "Todos" : value)} />
            <SelectField label={copy.filters.asset} value={filters.asset} options={[copy.filters.all, ...Array.from(new Set(completedOperationsData.map((operation) => operation.asset)))]} onChange={(value) => setFilter("asset", value === copy.filters.all ? "Todos" : value)} />
            <SelectField label={copy.filters.direction} value={filters.direction} options={[copy.filters.all, "Compra", "Venda"]} onChange={(value) => setFilter("direction", value === copy.filters.all ? "Todos" : value)} />
            <SelectField label={copy.filters.status} value={filters.status} options={[copy.filters.all, copy.finished]} onChange={(value) => setFilter("status", value === copy.filters.all ? "Todos" : value)} />
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {closedPagination.slice.map((operation, index) => (
              <EliteOperationCard
                key={`closed-${operation.signalNumber ?? "x"}-${operation.asset}-${operation.date}-${index}`}
                operation={operation}
                copy={copy}
                locale={locale}
                mode="closed"
                index={index}
                reportHref={operationReportHref(operation.reportMonth, locale)}
              />
            ))}
          </div>
          {filteredOperations.length === 0 ? (
            <p className="mt-8 rounded border border-dashed border-white/12 px-4 py-10 text-center text-sm text-paper/50">
              {locale === "en" ? "No operations match these filters." : locale === "es" ? "Ninguna operación con estos filtros." : "Nenhuma operação com estes filtros."}
            </p>
          ) : null}
          <div className="mt-6">
            <EliteOperationsPager
              page={closedPagination.page}
              totalPages={closedPagination.totalPages}
              totalItems={closedPagination.total}
              pageSize={operationsPageSize}
              onPage={setClosedOpsPage}
              locale={locale}
            />
          </div>
        </div>
      </section>

      <section className="px-5 py-14 md:px-8 md:py-18">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Elite" title={copy.monthlyTitle} text={copy.monthlyText} />
          <div className="mt-6 rounded-lg border border-gold/20 bg-gradient-to-r from-gold/[0.08] to-transparent px-4 py-4 md:flex md:items-center md:justify-between md:gap-6">
            <p className="font-serif text-2xl tracking-tight text-paper md:text-3xl">
              {formatNumber(publicSignalsHighlight, locale)}{" "}
              <span className="text-lg text-paper/70">
                {locale === "en" ? "signals sent" : locale === "es" ? "señales enviadas" : "sinais enviados"}
              </span>
            </p>
            <p className="mt-2 max-w-md text-sm leading-6 text-paper/55 md:mt-0">
              {locale === "en"
                ? `Historic WhatsApp track record. Showing ${Math.min(monthlyReportsVisible, monthlyReportsNewestFirst.length)} of ${monthlyReportsNewestFirst.length} monthly reports.`
                : locale === "es"
                  ? `Historial en WhatsApp. Mostrando ${Math.min(monthlyReportsVisible, monthlyReportsNewestFirst.length)} de ${monthlyReportsNewestFirst.length} reportes mensuales.`
                  : `Histórico no WhatsApp desde 2018. Exibindo ${Math.min(monthlyReportsVisible, monthlyReportsNewestFirst.length)} de ${monthlyReportsNewestFirst.length} relatórios mensais.`}
            </p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {monthlyReportsNewestFirst.slice(0, monthlyReportsVisible).map((report) => (
              <article
                key={`${report.year}-${report.month}`}
                className="elite-monthly-card rounded-lg border border-gold/18 bg-white/[0.03] p-5 shadow-[0_12px_40px_rgba(0,0,0,0.28)] md:p-6"
              >
                <p className="text-xs font-black uppercase tracking-[0.22em] text-gold">{report.status}</p>
                <h3 className="mt-3 font-serif text-2xl tracking-[-0.04em] text-paper md:text-3xl">
                  {report.month}/{report.year}
                </h3>
                <div className="mt-5 grid gap-2.5">
                  <Info label={copy.monthlyCardSignals} value={formatNumber(report.signals, locale)} />
                  <Info label={copy.monthlyCardPips} value={report.result} />
                  <Info
                    label={copy.monthlyCardAssets}
                    value={formatMonthlyAssetsPreview(report.assets, locale)}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedMonthKey(`${report.year}-${report.monthIndex}`)}
                  className="mt-5 w-full min-h-[var(--vi-touch-min,3rem)] border border-gold/28 px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.16em] text-paper transition hover:border-gold hover:bg-gold hover:text-ink"
                >
                  {copy.viewReport}
                </button>
              </article>
            ))}
          </div>
          {monthlyReportsVisible < monthlyReportsNewestFirst.length ? (
            <button
              type="button"
              onClick={() => setMonthlyReportsVisible((n) => n + ELITE_MONTHLY_LOAD_MORE)}
              className="mt-6 w-full rounded-lg border border-dashed border-gold/35 bg-black/30 px-5 py-4 text-center transition hover:border-gold hover:bg-gold/[0.08]"
            >
              <span className="block text-xs font-black uppercase tracking-[0.18em] text-gold">
                {locale === "en" ? "View more months" : locale === "es" ? "Ver más meses" : "Ver mais relatórios mensais"}
              </span>
              <span className="mt-1 block text-[11px] text-paper/45">
                +{Math.min(ELITE_MONTHLY_LOAD_MORE, monthlyReportsNewestFirst.length - monthlyReportsVisible)}{" "}
                {locale === "en" ? "at a time" : "por vez"} · {monthlyReportsNewestFirst.length - monthlyReportsVisible}{" "}
                {locale === "en" ? "remaining" : "restantes"}
              </span>
            </button>
          ) : null}
        </div>
      </section>

      <section className="border-y border-white/8 bg-white/[0.025] px-5 py-14 md:px-8 md:py-18">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="2018 - 2026" title={copy.timelineTitle} text={copy.timelineText} />

          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {timelineStats.map((stat) => (
              <div key={stat.label} className="border border-gold/18 bg-black/45 p-5 shadow-[0_0_38px_rgba(201,155,62,0.05)]">
                <p className="font-mono text-3xl font-black tracking-[-0.05em] text-gold md:text-4xl">{stat.value}</p>
                <p className="mt-2 text-xs font-black uppercase tracking-[0.18em] text-paper/58">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[0.4fr_0.6fr] lg:items-start">
            <div className="relative border border-white/10 bg-black/35 p-5 md:p-6">
              <div className="absolute bottom-8 left-[35px] top-8 w-px bg-gradient-to-b from-gold/70 via-gold/22 to-rise/65" />
              <div className="relative grid gap-1">
                {timelineEvents.map((item, index) => {
                  const isActive = item.year === selectedTimelineEvent.year;
                  const isLast = index === timelineEvents.length - 1;
                  const dotClass = item.tone === "green" ? "border-rise bg-rise shadow-[0_0_22px_rgba(22,163,74,0.22)]" : "border-gold bg-gold shadow-[0_0_22px_rgba(201,155,62,0.22)]";
                  const itemTone = item.tone === "green" ? "text-rise" : "text-gold";

                  return (
                    <button
                      key={item.year}
                      type="button"
                      onClick={() => setSelectedTimelineYear(item.year)}
                      className={["group relative grid w-full grid-cols-[38px_1fr] gap-4 py-3 text-left transition", isActive ? "translate-x-1" : "hover:translate-x-1"].join(" ")}
                      aria-label={"Ver marco de " + item.year + ": " + item.title}
                    >
                      <span className={["relative z-10 mt-1 h-4 w-4 rounded-full border-2 transition", isActive ? dotClass : "border-gold/50 bg-black group-hover:border-gold"].join(" ")} />
                      <span className="min-w-0 pb-4">
                        <span className={["font-mono text-2xl font-black tracking-[-0.04em] transition", isActive ? itemTone : "text-paper/78 group-hover:text-gold"].join(" ")}>{item.year}</span>
                        <span className="mt-1 block text-sm font-black uppercase leading-5 tracking-[0.12em] text-paper">{item.shortTitle}</span>
                        {!isLast && <span className="mt-4 block h-px w-full bg-gradient-to-r from-white/14 to-transparent" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <motion.article
              key={selectedTimelineEvent.year}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28 }}
              className="terminal-module sticky top-28 min-h-[520px] overflow-hidden border border-gold/22 bg-black/55 p-7 shadow-[0_0_80px_rgba(201,155,62,0.08)] md:p-10"
            >
              <div className="absolute -right-24 -top-28 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
              <div className="absolute -bottom-28 left-8 h-64 w-64 rounded-full bg-rise/8 blur-3xl" />
              <div className="relative flex min-h-[460px] flex-col justify-between">
                <div>
                  <p className={["font-mono text-6xl font-black tracking-[-0.06em] md:text-7xl", selectedTimelineEvent.tone === "green" ? "text-rise" : "text-gold"].join(" ")}>
                    {selectedTimelineEvent.year}
                  </p>
                  <h3 className="mt-5 max-w-3xl font-serif text-4xl leading-[1.02] tracking-[-0.05em] text-paper md:text-6xl">{selectedTimelineEvent.title}</h3>
                </div>

                <div className="mt-8 grid gap-4">
                  {[
                    { label: "Resumo", value: selectedTimelineEvent.summary, icon: "01", tone: "gold" },
                    { label: "Marco principal", value: selectedTimelineEvent.marker, icon: "02", tone: "gold" },
                    { label: "Contexto", value: selectedTimelineEvent.context, icon: "03", tone: "neutral" },
                    { label: "Impacto", value: selectedTimelineEvent.impact, icon: "04", tone: "green" },
                    { label: "Resultado", value: selectedTimelineEvent.result, icon: "05", tone: "green" },
                  ].map((block) => (
                    <div
                      key={block.label}
                      className={[
                        "grid gap-4 border p-5 md:grid-cols-[58px_1fr] md:p-6",
                        block.tone === "green" ? "border-rise/18 bg-rise/[0.055]" : block.tone === "gold" ? "border-gold/18 bg-gold/[0.045]" : "border-white/10 bg-white/[0.028]",
                      ].join(" ")}
                    >
                      <div className={["flex h-12 w-12 items-center justify-center border font-mono text-xs font-black", block.tone === "green" ? "border-rise/30 text-rise" : block.tone === "gold" ? "border-gold/30 text-gold" : "border-white/15 text-paper/62"].join(" ")}>{block.icon}</div>
                      <div>
                        <p className={["text-[10px] font-black uppercase tracking-[0.22em]", block.tone === "green" ? "text-rise" : block.tone === "gold" ? "text-gold" : "text-paper/58"].join(" ")}>{block.label}</p>
                        <p className="mt-3 text-sm leading-7 text-paper/80 md:text-base md:leading-8">{block.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.article>
          </div>

          <div className="mt-8 border border-gold/18 bg-black/45 p-6 shadow-[0_0_50px_rgba(201,155,62,0.05)] md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-gold">De sinais ao vivo a uma estrutura global</p>
            <p className="mt-4 max-w-5xl text-sm leading-8 text-paper/70 md:text-base">
              {"A linha do tempo mostra a evolu\u00e7\u00e3o do Varejo Investidor desde o in\u00edcio dos sinais Elite em 2018 at\u00e9 a expans\u00e3o internacional. O hist\u00f3rico operacional, as experi\u00eancias institucionais, as parcerias e o crescimento da comunidade formam a base da metodologia atual."}
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 py-14 md:px-8 md:py-18">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Método" title={copy.depthTitle} text={copy.depthText} />
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {copy.depthCards.map((card, index) => (
              <article key={card.title} className="border border-white/10 bg-white/[0.03] p-6">
                <p className="font-mono text-xl font-black text-gold">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-4 font-serif text-2xl tracking-[-0.03em] text-paper">{card.title}</h3>
                <p className="mt-4 text-sm leading-7 text-paper/62">{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/8 bg-white/[0.025] px-5 py-14 md:px-8 md:py-18">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <SectionHeader eyebrow="FXPro" title={copy.brokerTitle} text={copy.brokerText} />
            <div className="terminal-module border border-gold/20 bg-black/35 p-6 shadow-[0_0_50px_rgba(198,153,74,0.06)]">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-gold">Forex</p>
              <h3 className="mt-4 font-serif text-3xl tracking-[-0.04em] text-paper md:text-4xl">{fxproButtonLabels[locale]}</h3>
              <p className="mt-4 leading-7 text-paper/66">{copy.brokerBannerText}</p>
              <a href={fxproLinks[locale]} target="_blank" rel="noopener noreferrer" className="premium-button-gold mt-6 inline-flex w-full items-center justify-center border border-gold bg-gold px-5 py-4 text-center text-xs font-black uppercase tracking-[0.16em] text-ink transition hover:-translate-y-0.5 md:w-auto">{copy.brokerButton}</a>
            </div>
          </div>
        </div>
      </section>

      <ForexBrokerBannerWide language={locale} />

      <section className="px-5 py-14 md:px-8 md:py-18">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="relative mx-auto max-w-7xl overflow-hidden border border-gold/26 bg-ink px-6 py-14 text-center text-paper shadow-premium md:px-10 md:py-18">
          <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-gold/12 blur-3xl" />
          <div className="relative">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold">Elite</p>
            <h2 className="mx-auto mt-5 max-w-4xl font-serif text-4xl leading-[1.05] tracking-[-0.045em] md:text-6xl">{copy.ctaTitle}</h2>
            <p className="mx-auto mt-5 max-w-3xl leading-8 text-paper/72">{copy.ctaText}</p>
            <a href={ctaHref} target="_blank" rel="noopener noreferrer" className="premium-button-gold mt-8 inline-block w-full max-w-md border border-gold bg-gold px-6 py-4 text-center text-sm font-black uppercase tracking-[0.16em] text-ink transition hover:-translate-y-0.5">{copy.ctaButton}</a>
          </div>
        </motion.div>
      </section>

      <section className="px-5 pb-12 md:px-8 md:pb-16">
        <div className="mx-auto max-w-7xl border border-white/10 bg-white/[0.03] p-5 text-sm leading-7 text-paper/64">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-gold">Disclaimer</p>
          <p className="mt-3">{copy.disclaimer}</p>
        </div>
      </section>

      <SupportFooter t={t} locale={locale} onLocaleChange={changeLocale} />
    </main>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-white/10 bg-black/30 p-4">
      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-paper/46">{label}</p>
      <p className="mt-2 font-mono text-sm font-black text-paper">{value}</p>
    </div>
  );
}

function OperationsStat({ label, value, tone = "default" }: { label: string; value: string; tone?: "default" | "gold" | "rise" }) {
  const border = tone === "gold" ? "border-gold/25" : tone === "rise" ? "border-rise/25" : "border-white/10";
  return (
    <div className={`rounded border ${border} bg-black/35 px-4 py-3`}>
      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-paper/45">{label}</p>
      <p className="mt-1 font-mono text-2xl font-black text-paper">{value}</p>
    </div>
  );
}

function MetricRow({
  label,
  value,
  emphasize,
  accent,
}: {
  label: string;
  value: string;
  emphasize?: boolean;
  accent?: "rise" | "fall";
}) {
  const valueClass = accent === "rise" ? "text-rise" : accent === "fall" ? "text-fall" : "text-paper";
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-white/[0.06] pb-2 last:border-0 last:pb-0">
      <dt className="text-[11px] uppercase tracking-[0.12em] text-paper/45">{label}</dt>
      <dd className={`font-mono tabular-nums ${emphasize ? "text-lg font-black" : "text-sm font-bold"} ${valueClass}`}>{value}</dd>
    </div>
  );
}
