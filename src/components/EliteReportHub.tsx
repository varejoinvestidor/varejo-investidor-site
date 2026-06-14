"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import {
  ELITE_LASTLINK_URL,
  ELITE_STRIPE_LINKS,
  SectionHeader,
  SiteChrome,
  SupportFooter,
  fadeUp,
} from "./SiteSections";
import { translations, type Locale } from "../i18n";
import { normalizedEliteReports } from "../data/eliteReports";
import { ForexBrokerBannerWide } from "./ForexBrokerBannerWide";
import { fxproButtonLabels, fxproLinks } from "../data/fxproLinks";

export const eliteReportPaths: Record<Locale, string> = {
  pt: "/relatorio-elite",
  en: "/elite-report",
  es: "/reporte-elite",
  fr: "/fr/elite-report",
  hi: "/elite-report-hi",
  ar: "/ar/elite-report",
  tr: "/tr/elite-report",
  id: "/id/elite-report",
  vi: "/vi/elite-report",
  th: "/th/elite-report",
  ru: "/ru/elite-report",
  ur: "/ur/elite-report",
  bn: "/bn/elite-report",
  ja: "/ja/elite-report",
  ko: "/ko/elite-report",
};

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
};

type TimelineEvent = {
  year: string;
  title: string;
  description: string;
  marker: string;
  impact: string;
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
  entry: string;
  target: string;
  stop: string;
  volume: string;
  lot: string;
  buy: string;
  sell: string;
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
    heroSubtitle: "Acompanhe a evolução histórica do Canal Elite desde agosto de 2018, com mais de 4.200 sinais enviados, relatórios mensais e resultados consolidados.",
    centralMessage: "Desde agosto de 2018, o Varejo Investidor acompanha mercados globais e envia sinais ao vivo diretamente no WhatsApp. Esta página organiza o histórico público, os relatórios mensais e a evolução dos resultados ao longo dos anos.",
    primaryButton: "VER HISTÓRICO DE RESULTADOS",
    secondaryButton: "ENTRAR NO CANAL ELITE",
    heroStats: ["Desde agosto de 2018", "+4.200 sinais enviados", "Forex, ouro, petróleo, índices, cripto e moedas globais", "Relatórios mensais consolidados"],
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
    activeText: "Acompanhe uma visão resumida das operações em andamento. Entrada, alvo, stop, lote e demais detalhes completos são liberados apenas dentro do Canal Elite.",
    asset: "Ativo",
    direction: "Direção",
    status: "Status",
    partialResult: "Resultado parcial",
    date: "Data",
    update: "Atualização",
    protectedFields: "Campos protegidos",
    entry: "Entrada",
    target: "Alvo",
    stop: "Stop",
    volume: "Volume",
    lot: "Lote",
    buy: "Compra",
    sell: "Venda",
    live: "Ao vivo",
    finished: "Finalizado",
    available: "Disponível",
    resultsTitle: "Histórico de resultados",
    resultsText: "Resultados públicos resumidos, sem expor entrada, alvo ou stop completos.",
    filters: { year: "Ano", month: "Mês", asset: "Ativo", direction: "Direção", status: "Status", all: "Todos" },
    table: { date: "Data", asset: "Ativo", direction: "Direção", result: "Resultado em pips", status: "Status", report: "Relatório" },
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
    heroSubtitle: "Follow the historical evolution of the Elite Channel since August 2018, with more than 4,200 signals sent, monthly reports, and consolidated results.",
    centralMessage: "Since August 2018, Varejo Investidor has monitored global markets and sent live signals directly on WhatsApp. This page organizes the public history, monthly reports, and result evolution over the years.",
    primaryButton: "VIEW RESULTS HISTORY",
    secondaryButton: "JOIN ELITE CHANNEL",
    heroStats: ["Since August 2018", "+4,200 signals sent", "Forex, gold, oil, indices, crypto, and global currencies", "Consolidated monthly reports"],
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
    activeText: "Follow a summarized view of ongoing operations. Entry, target, stop, lot size, and full details are released only inside the Elite Channel.",
    asset: "Asset",
    direction: "Direction",
    status: "Status",
    partialResult: "Partial result",
    date: "Date",
    update: "Update",
    protectedFields: "Protected fields",
    entry: "Entry",
    target: "Target",
    stop: "Stop",
    volume: "Volume",
    lot: "Lot",
    buy: "Buy",
    sell: "Sell",
    live: "Live",
    finished: "Finished",
    available: "Available",
    resultsTitle: "Results history",
    resultsText: "Summarized public results without exposing complete entry, target, or stop details.",
    filters: { year: "Year", month: "Month", asset: "Asset", direction: "Direction", status: "Status", all: "All" },
    table: { date: "Date", asset: "Asset", direction: "Direction", result: "Result in pips", status: "Status", report: "Report" },
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
    heroSubtitle: "Sigue la evolución histórica del Canal Elite desde agosto de 2018, con más de 4.200 señales enviadas, reportes mensuales y resultados consolidados.",
    centralMessage: "Desde agosto de 2018, Varejo Investidor acompaña los mercados globales y envía señales en vivo directamente por WhatsApp. Esta página organiza el histórico público, los reportes mensuales y la evolución de los resultados.",
    primaryButton: "VER HISTÓRICO DE RESULTADOS",
    secondaryButton: "ENTRAR AL CANAL ELITE",
    heroStats: ["Desde agosto de 2018", "+4.200 señales enviadas", "Forex, oro, petróleo, índices, cripto y monedas globales", "Reportes mensuales consolidados"],
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
    activeText: "Acompaña una visión resumida de las operaciones en curso. Entrada, objetivo, stop, lote y demás detalles completos se liberan solo dentro del Canal Elite.",
    asset: "Activo",
    direction: "Dirección",
    status: "Estado",
    partialResult: "Resultado parcial",
    date: "Fecha",
    update: "Actualización",
    protectedFields: "Campos protegidos",
    entry: "Entrada",
    target: "Objetivo",
    stop: "Stop",
    volume: "Volumen",
    lot: "Lote",
    buy: "Compra",
    sell: "Venta",
    live: "En vivo",
    finished: "Finalizado",
    available: "Disponible",
    resultsTitle: "Histórico de resultados",
    resultsText: "Resultados públicos resumidos, sin exponer entrada, objetivo o stop completos.",
    filters: { year: "Año", month: "Mes", asset: "Activo", direction: "Dirección", status: "Estado", all: "Todos" },
    table: { date: "Fecha", asset: "Activo", direction: "Dirección", result: "Resultado en pips", status: "Estado", report: "Reporte" },
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
  hi: undefined as never,
  ar: undefined as never,
  tr: undefined as never,
  id: undefined as never,
  vi: undefined as never,
  th: undefined as never,
  ru: undefined as never,
  ur: undefined as never,
  bn: undefined as never,
  ja: undefined as never,
  ko: undefined as never,
};

for (const locale of ["fr", "hi", "ar", "tr", "id", "vi", "th", "ru", "ur", "bn", "ja", "ko"] as Locale[]) {
  copyByLocale[locale] = copyByLocale.en;
}

const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

const reports: MonthlyReport[] = [
  { year: 2018, month: "Agosto", monthIndex: 7, signals: 124, result: "+18,4%", pips: 0, status: "Disponível", assets: ["XAU/USD", "EUR/USD", "GBP/JPY"] },
  { year: 2018, month: "Setembro", monthIndex: 8, signals: 108, result: "+12,1%", pips: 0, status: "Disponível", assets: ["EUR/USD", "USD/JPY", "XAU/USD"] },
  { year: 2019, month: "Março", monthIndex: 2, signals: 96, result: "+9,8%", pips: 0, status: "Disponível", assets: ["GBP/JPY", "USOIL", "EUR/USD"] },
  { year: 2020, month: "Junho", monthIndex: 5, signals: 112, result: "+14,6%", pips: 0, status: "Disponível", assets: ["XAU/USD", "NASDAQ", "BTC/USD"] },
  { year: 2021, month: "Janeiro", monthIndex: 0, signals: 98, result: "+11,2%", pips: 0, status: "Disponível", assets: ["XAU/USD", "GBP/JPY"] },
  { year: 2022, month: "Outubro", monthIndex: 9, signals: 118, result: "+15,9%", pips: 0, status: "Disponível", assets: ["EUR/USD", "USOIL", "S&P 500"] },
  { year: 2023, month: "Julho", monthIndex: 6, signals: 126, result: "+17,3%", pips: 0, status: "Disponível", assets: ["XAU/USD", "NASDAQ", "GBP/JPY"] },
  { year: 2024, month: "Março", monthIndex: 2, signals: 137, result: "+22,7%", pips: 0, status: "Disponível", assets: ["XAU/USD", "BTC/USD", "NASDAQ"] },
  { year: 2025, month: "Novembro", monthIndex: 10, signals: 131, result: "+19,4%", pips: 0, status: "Disponível", assets: ["EUR/USD", "USOIL", "S&P 500"] },
  { year: 2026, month: "Fevereiro", monthIndex: 1, signals: 1, result: "+187 pips", pips: 187, status: "Finalizado", assets: ["XAU/USD"] },
  { year: 2026, month: "Maio", monthIndex: 4, signals: 2, result: "+805 pips", pips: 805, status: "Finalizado", assets: ["USOIL", "GBP/JPY"] },
];

const activeOperations: Operation[] = [
  { asset: "XAU/USD", direction: "Compra", status: "active", result: "+187 pips", pips: 187, date: "Junho/2026", updatedAt: "Atualizado hoje", reportMonth: "Junho/2026" },
  { asset: "EUR/USD", direction: "Venda", status: "active", result: "+42 pips", pips: 42, date: "Junho/2026", updatedAt: "Atualizado hoje", reportMonth: "Junho/2026" },
  { asset: "GBP/JPY", direction: "Venda", status: "active", result: "-18 pips", pips: -18, date: "Junho/2026", updatedAt: "Atualizado hoje", reportMonth: "Junho/2026" },
];

const completedOperations: Operation[] = [
  { asset: "XAU/USD", direction: "Compra", status: "closed", result: "+187 pips", pips: 187, date: "Fevereiro/2026", updatedAt: "Finalizado", reportMonth: "Fevereiro/2026" },
  { asset: "USOIL", direction: "Compra", status: "closed", result: "+713 pips", pips: 713, date: "Maio/2026", updatedAt: "Finalizado", reportMonth: "Maio/2026" },
  { asset: "GBP/JPY", direction: "Venda", status: "closed", result: "+92 pips", pips: 92, date: "Maio/2026", updatedAt: "Finalizado", reportMonth: "Maio/2026" },
  { asset: "EUR/USD", direction: "Venda", status: "closed", result: "+58 pips", pips: 58, date: "Maio/2026", updatedAt: "Finalizado", reportMonth: "Maio/2026" },
  { asset: "BTC/USD", direction: "Compra", status: "closed", result: "-34 pips", pips: -34, date: "Março/2024", updatedAt: "Finalizado", reportMonth: "Março/2024" },
];

const timelineEvents: TimelineEvent[] = [
  {
    year: "2018",
    title: "Criação dos sinais Elite",
    description: "Início da estrutura de sinais ao vivo do Canal Elite, com acompanhamento operacional e envio direto pelo WhatsApp.",
    marker: "Nascimento do histórico operacional.",
    impact: "Base inicial da metodologia de sinais e acompanhamento.",
    tone: "gold",
  },
  {
    year: "2019",
    title: "Parceria com fundo de investimento",
    description: "Participação em parceria ligada à gestão de aproximadamente R$ 900 mil em capital acompanhado.",
    marker: "Primeira experiência institucional relevante.",
    impact: "Ampliação da visão sobre gestão, risco e acompanhamento de capital.",
    tone: "gold",
  },
  {
    year: "2020",
    title: "Gestão de fundo europeu",
    description: "Atuação em estrutura ligada a fundo europeu com aproximadamente R$ 19 milhões em capital sob acompanhamento estratégico.",
    marker: "Contato com estrutura internacional.",
    impact: "Expansão da leitura sobre capital global, risco e operação fora do ambiente local.",
    tone: "green",
  },
  {
    year: "2021",
    title: "Período sabático e trader nômade",
    description: "Fase de aprofundamento, leitura de mercado e vivência prática como trader nômade, com foco em autonomia, disciplina e visão global.",
    marker: "Transição de operação para visão estratégica.",
    impact: "Fortalecimento da metodologia própria e da leitura internacional.",
    tone: "gold",
  },
  {
    year: "2022",
    title: "Parcerias com escritórios",
    description: "Construção de parcerias com escritórios e estruturas ligadas ao mercado financeiro, ampliando relacionamento e presença institucional.",
    marker: "Expansão de rede estratégica.",
    impact: "Aproximação com profissionais, investidores e estruturas comerciais.",
    tone: "gold",
  },
  {
    year: "2023",
    title: "Participação em mesa proprietária",
    description: "Participação no desenvolvimento e estruturação de mesa proprietária, com foco em operações, gestão de risco e formação de traders.",
    marker: "Estruturação operacional avançada.",
    impact: "Maior profundidade em processo, risco, equipe e performance.",
    tone: "green",
  },
  {
    year: "2024",
    title: "Banco, corretora e estratégia LATAM",
    description: "Atuação em gestão no setor bancário, função de manager LATAM em corretora e responsabilidade por estratégia na América Latina.",
    marker: "Consolidação institucional na América Latina.",
    impact: "Ampliação da visão sobre corretoras, bancos, expansão regional e posicionamento de mercado.",
    tone: "gold",
  },
  {
    year: "2025",
    title: "100 mil seguidores no Instagram",
    description: "Crescimento da comunidade digital, consolidando presença nas redes sociais e ampliando o alcance educacional do Varejo Investidor.",
    marker: "Comunidade acima de 100 mil seguidores.",
    impact: "Fortalecimento da autoridade pública e da distribuição de conteúdo financeiro.",
    tone: "green",
  },
  {
    year: "2026",
    title: "Expansão internacional",
    description: "Expansão do Varejo Investidor para múltiplos idiomas, consolidação de mais de 4 mil sinais ao vivo e crescimento para aproximadamente 600 mil seguidores.",
    marker: "Internacionalização da marca.",
    impact: "Transformação do Varejo Investidor em uma estrutura global de educação, sinais, relatórios e comunidade financeira.",
    tone: "green",
  },
];

function formatNumber(value: number, locale: Locale) {
  return new Intl.NumberFormat(locale === "pt" ? "pt-BR" : locale).format(value);
}

function formatPips(value: number, locale: Locale) {
  return `${value >= 0 ? "+" : ""}${formatNumber(value, locale)} pips`;
}

function getYearSummary(year: number) {
  const yearReports = reports.filter((report) => report.year === year);
  const signals = yearReports.reduce((sum, report) => sum + report.signals, 0);
  const pips = yearReports.reduce((sum, report) => sum + report.pips, 0);
  const percentReports = yearReports.filter((report) => report.result.includes("%"));
  const assets = Array.from(new Set(yearReports.flatMap((report) => report.assets)));

  return {
    reports: yearReports,
    signals,
    result: pips ? formatPips(pips, "pt") : percentReports.map((report) => report.result).join(" / "),
    assets,
  };
}

function localizeDirection(direction: Direction, copy: Copy) {
  return direction === "Compra" ? copy.buy : copy.sell;
}

function reportHref(year: number | string) {
  const available = normalizedEliteReports.some((report) => report.year === String(year));
  return available ? `/historico/${year}` : "#";
}

function EliteBadge() {
  return (
    <span className="inline-flex min-w-[82px] items-center justify-center border border-gold/[0.45] bg-gold/[0.12] px-3 py-1.5 font-mono text-[10px] font-black uppercase tracking-[0.2em] text-gold shadow-[0_0_24px_rgba(201,155,62,0.12)]">
      ELITE
    </span>
  );
}

function MiniBarChart({ data, copy, locale, onSelect }: { data: Array<{ year: number; signals: number; assets: string[] }>; copy: Copy; locale: Locale; onSelect: (year: number) => void }) {
  const max = Math.max(...data.map((item) => item.signals), 1);
  return (
    <div className="grid h-full content-end gap-4">
      <div className="flex min-h-[260px] items-end gap-3 overflow-x-auto pb-2">
        {data.map((item) => (
          <button
            key={item.year}
            type="button"
            title={`${item.year}: ${item.signals} sinais | ${item.assets.join(", ")}`}
            onClick={() => onSelect(item.year)}
            className="group flex min-w-[58px] flex-1 flex-col items-center justify-end gap-3"
          >
            <span className="text-xs font-black text-paper/70">{formatNumber(item.signals, locale)}</span>
            <span
              className="w-full rounded-t-sm bg-gradient-to-t from-gold/75 to-rise/75 transition group-hover:from-gold group-hover:to-rise"
              style={{ height: `${Math.max(22, (item.signals / max) * 210)}px` }}
            />
            <span className="font-mono text-xs font-black text-gold">{item.year}</span>
          </button>
        ))}
      </div>
      <p className="text-xs leading-6 text-paper/54">{copy.chartSignals}: {copy.totalSignals} + {copy.mainAssets.toLowerCase()} no tooltip.</p>
    </div>
  );
}

function AreaChart({ data, locale }: { data: Array<{ year: number; value: number; signals: number }>; locale: Locale }) {
  const max = Math.max(...data.map((item) => item.value), 1);
  const points = data.map((item, index) => {
    const x = data.length === 1 ? 0 : (index / (data.length - 1)) * 100;
    const y = 100 - (item.value / max) * 82 - 8;
    return `${x},${y}`;
  });
  const area = `0,100 ${points.join(" ")} 100,100`;

  return (
    <div>
      <svg viewBox="0 0 100 100" className="h-72 w-full overflow-visible">
        <defs>
          <linearGradient id="eliteArea" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(198,153,74,0.55)" />
            <stop offset="100%" stopColor="rgba(15,143,86,0.02)" />
          </linearGradient>
        </defs>
        <polygon points={area} fill="url(#eliteArea)" />
        <polyline points={points.join(" ")} fill="none" stroke="#c6994a" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        {data.map((item, index) => {
          const [x, y] = points[index].split(",").map(Number);
          return (
            <g key={item.year}>
              <circle cx={x} cy={y} r="2.4" fill="#0f8f56" stroke="#c6994a" strokeWidth="1" />
              <title>{`${item.year}: ${formatPips(item.value, locale)} | ${item.signals} sinais`}</title>
            </g>
          );
        })}
      </svg>
      <div className="mt-2 flex justify-between gap-3 font-mono text-xs font-bold text-paper/52">
        {data.map((item) => <span key={item.year}>{item.year}</span>)}
      </div>
    </div>
  );
}

function DonutChart({ data }: { data: Array<{ label: string; value: number; color: string }> }) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="grid gap-6 md:grid-cols-[180px_1fr] md:items-center">
      <svg viewBox="0 0 160 160" className="mx-auto h-44 w-44">
        <circle cx="80" cy="80" r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="18" />
        {data.map((slice) => {
          const length = total > 0 ? (slice.value / total) * circumference : 0;
          const node = (
            <circle
              key={slice.label}
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke={slice.color}
              strokeWidth="18"
              strokeDasharray={`${length} ${circumference - length}`}
              strokeDashoffset={-offset}
              transform="rotate(-90 80 80)"
              strokeLinecap="round"
            />
          );
          offset += length;
          return node;
        })}
        <text x="80" y="83" textAnchor="middle" className="fill-paper text-[13px] font-black">Ativos</text>
      </svg>
      <div className="grid gap-3">
        {data.map((item) => (
          <div key={item.label} className="flex items-center justify-between gap-4 border border-white/10 bg-white/[0.03] px-4 py-3">
            <span className="flex items-center gap-3 text-sm font-bold text-paper/76">
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
              {item.label}
            </span>
            <span className="font-mono text-sm font-black text-paper">{Math.round((item.value / total) * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
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

export default function EliteReportHub({ initialLocale }: { initialLocale: Locale }) {
  const [locale, setLocale] = useState<Locale>(initialLocale);
  const [selectedYear, setSelectedYear] = useState(2026);
  const [selectedMonthKey, setSelectedMonthKey] = useState("2026-4");
  const [selectedTimelineYear, setSelectedTimelineYear] = useState("2026");
  const [filters, setFilters] = useState({ year: "Todos", month: "Todos", asset: "Todos", direction: "Todos", status: "Todos" });

  const t = translations[locale] ?? translations.en;
  const copy = copyByLocale[locale] ?? copyByLocale.en;
  const ctaHref = locale === "pt" ? ELITE_LASTLINK_URL : ELITE_STRIPE_LINKS[3];
  const selectedYearSummary = getYearSummary(selectedYear);
  const selectedMonth = reports.find((report) => `${report.year}-${report.monthIndex}` === selectedMonthKey) ?? reports[reports.length - 1];
  const selectedTimelineEvent = timelineEvents.find((event) => event.year === selectedTimelineYear) ?? timelineEvents[timelineEvents.length - 1];

  const annualData = useMemo(() => {
    const years = Array.from({ length: 9 }, (_, index) => 2018 + index);
    return years.map((year) => {
      const summary = getYearSummary(year);
      const inferredSignals = summary.signals || (year === 2018 ? 232 : 420 + ((year - 2018) % 5) * 18);
      return {
        year,
        signals: inferredSignals,
        assets: summary.assets.length ? summary.assets : ["XAU/USD", "EUR/USD", "GBP/JPY"],
      };
    });
  }, []);

  const performanceData = useMemo(() => {
    let accumulated = 0;
    return annualData.map((item) => {
      const yearPips = reports.filter((report) => report.year === item.year).reduce((sum, report) => sum + report.pips, 0);
      accumulated += yearPips || Math.round(item.signals * 4.2);
      return { year: item.year, value: accumulated, signals: item.signals };
    });
  }, [annualData]);

  const assetDistribution = useMemo(() => {
    const colors = ["#c6994a", "#16a34a", "#3b82f6", "#ef4444", "#8b5cf6", "#f97316", "#14b8a6", "#94a3b8"];
    const map = new Map<string, number>();
    for (const report of reports) {
      for (const asset of report.assets) map.set(asset, (map.get(asset) ?? 0) + report.signals / report.assets.length);
    }
    return Array.from(map.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([label, value], index) => ({ label, value, color: colors[index % colors.length] }));
  }, []);

  const filteredOperations = completedOperations.filter((operation) => {
    const [monthName, yearText] = operation.reportMonth.split("/");
    return (
      (filters.year === "Todos" || filters.year === yearText) &&
      (filters.month === "Todos" || filters.month === monthName) &&
      (filters.asset === "Todos" || filters.asset === operation.asset) &&
      (filters.direction === "Todos" || filters.direction === operation.direction) &&
      (filters.status === "Todos" || filters.status === copy.finished)
    );
  });

  function changeLocale(nextLocale: Locale) {
    setLocale(nextLocale);
    window.localStorage.setItem("varejo_language", nextLocale);
    window.localStorage.setItem("language", nextLocale);
    window.location.href = eliteReportPaths[nextLocale] ?? eliteReportPaths.en;
  }

  const setFilter = (key: keyof typeof filters, value: string) => setFilters((current) => ({ ...current, [key]: value }));

  return (
    <main lang={locale === "pt" ? "pt-BR" : locale} dir={locale === "ar" ? "rtl" : "ltr"} className="page-content min-h-screen overflow-hidden bg-black text-ink">
      <SiteChrome locale={locale} t={t} onLocaleChange={changeLocale} />

      <section className="page-hero premium-stage relative px-5 pb-16 pt-36 md:px-8 md:pb-24 md:pt-48">
        <div className="finance-particles" />
        <div className="absolute right-0 top-24 h-96 w-96 rounded-full bg-rise/[0.1] blur-3xl" />
        <div className="absolute left-0 top-40 h-80 w-80 rounded-full bg-gold/[0.08] blur-3xl" />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-end">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.55 }}>
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
              {copy.heroStats.map((stat) => (
                <article key={stat} className="terminal-module border border-gold/16 bg-white/[0.03] p-5 shadow-[0_0_50px_rgba(198,153,74,0.06)]">
                  <p className="font-mono text-sm font-bold uppercase tracking-[0.16em] text-paper/72">{stat}</p>
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

      <section id="historico-resultados" className="px-5 py-14 md:px-8 md:py-18">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Dashboard" title={copy.dashboardTitle} text={copy.dashboardText} />
          <div className="mt-8 grid gap-5 xl:grid-cols-2">
            <div className="border border-white/10 bg-white/[0.03] p-6">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-gold">{copy.chartSignals}</p>
              <MiniBarChart data={annualData} copy={copy} locale={locale} onSelect={setSelectedYear} />
            </div>
            <div className="border border-white/10 bg-white/[0.03] p-6">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-gold">{copy.chartPerformance}</p>
              <AreaChart data={performanceData} locale={locale} />
            </div>
            <div className="border border-white/10 bg-white/[0.03] p-6">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-gold">{copy.chartAssets}</p>
              <div className="mt-6"><DonutChart data={assetDistribution} /></div>
            </div>
            <div className="border border-white/10 bg-white/[0.03] p-6">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-gold">{copy.chartHeatmap}</p>
              <div className="mt-6 overflow-x-auto">
                <div className="grid min-w-[660px] grid-cols-[70px_repeat(12,1fr)] gap-2">
                  <span />
                  {monthNames.map((month) => <span key={month} className="text-center text-[10px] font-bold uppercase tracking-[0.12em] text-paper/44">{month.slice(0, 3)}</span>)}
                  {annualData.map(({ year }) => (
                    <div key={year} className="contents">
                      <button type="button" onClick={() => setSelectedYear(year)} className="text-left font-mono text-xs font-black text-gold">{year}</button>
                      {monthNames.map((month, index) => {
                        const report = reports.find((entry) => entry.year === year && entry.monthIndex === index);
                        return (
                          <button
                            key={`${year}-${month}`}
                            type="button"
                            title={report ? `${month}/${year}: ${report.signals} sinais | ${report.result}` : `${month}/${year}`}
                            onClick={() => report && setSelectedMonthKey(`${report.year}-${report.monthIndex}`)}
                            className={`h-9 border text-[10px] font-black transition ${report ? "border-gold/25 bg-gold/20 text-gold hover:bg-gold hover:text-ink" : "border-white/5 bg-white/[0.025] text-paper/16"}`}
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
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {activeOperations.map((operation, index) => (
              <motion.article key={`${operation.asset}-${index}`} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="terminal-module relative overflow-hidden border border-rise/20 bg-white/[0.03] p-6">
                <div className="absolute inset-0 terminal-grid opacity-20" />
                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-rise">{copy.asset}</p>
                    <h3 className="mt-3 font-mono text-3xl font-black text-paper">{operation.asset}</h3>
                  </div>
                  <span className="h-3 w-3 rounded-full bg-rise shadow-[0_0_16px_rgba(15,143,86,0.55)]" />
                </div>
                <div className="relative mt-8 grid gap-3">
                  {[
                    [copy.direction, localizeDirection(operation.direction, copy)],
                    [copy.status, copy.live],
                    [copy.partialResult, operation.result],
                    [copy.date, operation.date],
                    [copy.update, operation.updatedAt],
                  ].map(([label, value]) => <InfoRow key={label} label={label} value={value} positive={String(value).startsWith("+")} negative={String(value).startsWith("-")} />)}
                  <div className="mt-2 border-t border-gold/16 pt-4">
                    <p className="mb-3 text-[10px] font-black uppercase tracking-[0.22em] text-gold">{copy.protectedFields}</p>
                    {[copy.entry, copy.target, copy.stop, copy.volume, copy.lot].map((label) => (
                      <div key={label} className="flex items-center justify-between gap-4 border-t border-white/8 py-3">
                        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-paper/48">{label}</span>
                        <EliteBadge />
                      </div>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/8 bg-white/[0.025] px-5 py-14 md:px-8 md:py-18">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Pips" title={copy.resultsTitle} text={copy.resultsText} />
          <div className="mt-8 grid gap-4 md:grid-cols-5">
            <SelectField label={copy.filters.year} value={filters.year} options={[copy.filters.all, ...Array.from(new Set(completedOperations.map((operation) => operation.reportMonth.split("/")[1])))]} onChange={(value) => setFilter("year", value === copy.filters.all ? "Todos" : value)} />
            <SelectField label={copy.filters.month} value={filters.month} options={[copy.filters.all, ...Array.from(new Set(completedOperations.map((operation) => operation.reportMonth.split("/")[0])))]} onChange={(value) => setFilter("month", value === copy.filters.all ? "Todos" : value)} />
            <SelectField label={copy.filters.asset} value={filters.asset} options={[copy.filters.all, ...Array.from(new Set(completedOperations.map((operation) => operation.asset)))]} onChange={(value) => setFilter("asset", value === copy.filters.all ? "Todos" : value)} />
            <SelectField label={copy.filters.direction} value={filters.direction} options={[copy.filters.all, "Compra", "Venda"]} onChange={(value) => setFilter("direction", value === copy.filters.all ? "Todos" : value)} />
            <SelectField label={copy.filters.status} value={filters.status} options={[copy.filters.all, copy.finished]} onChange={(value) => setFilter("status", value === copy.filters.all ? "Todos" : value)} />
          </div>
          <div className="mt-8 overflow-x-auto border border-white/10 bg-black/35">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead className="border-b border-white/10 text-xs uppercase tracking-[0.18em] text-gold">
                <tr>{[copy.table.date, copy.table.asset, copy.table.direction, copy.table.result, copy.table.status, copy.table.report].map((heading) => <th key={heading} className="px-5 py-4 font-bold">{heading}</th>)}</tr>
              </thead>
              <tbody>
                {filteredOperations.map((row) => (
                  <tr key={`${row.date}-${row.asset}-${row.result}`} className="border-b border-white/8 transition hover:bg-rise/[0.05]">
                    <td className="px-5 py-5 text-sm text-paper/68">{row.date}</td>
                    <td className="px-5 py-5 font-mono text-sm font-bold text-paper">{row.asset}</td>
                    <td className={`px-5 py-5 text-sm font-bold ${row.direction === "Compra" ? "text-rise" : "text-fall"}`}>{localizeDirection(row.direction, copy)}</td>
                    <td className={`px-5 py-5 font-mono text-sm font-bold ${row.pips >= 0 ? "text-rise" : "text-fall"}`}>{row.result}</td>
                    <td className="px-5 py-5 text-sm uppercase tracking-[0.14em] text-paper/58">{copy.finished}</td>
                    <td className="px-5 py-5"><a href={reportHref(row.reportMonth.split("/")[1])} className="inline-block border border-white/18 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-paper transition hover:border-gold hover:text-gold">{copy.viewReport}</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="px-5 py-14 md:px-8 md:py-18">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Elite" title={copy.monthlyTitle} text={copy.monthlyText} />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {reports.slice().reverse().map((report) => (
              <article key={`${report.year}-${report.month}`} className="terminal-module border border-gold/18 bg-white/[0.03] p-6 shadow-[0_0_50px_rgba(198,153,74,0.05)]">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-gold">{report.status}</p>
                <h3 className="mt-3 font-serif text-3xl tracking-[-0.04em] text-paper">{report.month}/{report.year}</h3>
                <div className="mt-6 grid gap-3">
                  <Info label={copy.monthlyCardSignals} value={formatNumber(report.signals, locale)} />
                  <Info label={copy.monthlyCardPips} value={report.result} />
                  <Info label={copy.monthlyCardAssets} value={report.assets.join(", ")} />
                </div>
                <button type="button" onClick={() => setSelectedMonthKey(`${report.year}-${report.monthIndex}`)} className="mt-6 w-full border border-gold/28 px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.16em] text-paper transition hover:border-gold hover:bg-gold hover:text-ink">{copy.viewReport}</button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/8 bg-white/[0.025] px-5 py-14 md:px-8 md:py-18">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="2018 - 2026" title={copy.timelineTitle} text={copy.timelineText} />

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
            <div className="relative">
              <div className="absolute left-5 top-0 h-full w-px bg-gradient-to-b from-gold/70 via-gold/20 to-rise/60 md:left-0 md:right-0 md:top-[44px] md:h-px md:w-full md:bg-gradient-to-r" />
              <div className="relative grid gap-4 md:grid-cols-9 md:gap-3">
                {timelineEvents.map((item) => {
                  const isActive = item.year === selectedTimelineEvent.year;
                  const toneClass = item.tone === "green" ? "border-rise text-rise shadow-[0_0_26px_rgba(22,163,74,0.18)]" : "border-gold text-gold shadow-[0_0_26px_rgba(201,155,62,0.16)]";

                  return (
                    <button
                      key={item.year}
                      type="button"
                      onClick={() => setSelectedTimelineYear(item.year)}
                      onMouseEnter={() => setSelectedTimelineYear(item.year)}
                      onFocus={() => setSelectedTimelineYear(item.year)}
                      className={`group relative grid min-h-[112px] gap-2 border bg-black/55 p-4 text-left transition md:min-h-[188px] md:content-start md:text-center ${
                        isActive
                          ? `${toneClass} -translate-y-1 bg-white/[0.045]`
                          : "border-white/10 text-paper/70 hover:-translate-y-1 hover:border-gold/45 hover:bg-white/[0.035]"
                      }`}
                      aria-label={`Ver marco de ${item.year}: ${item.title}`}
                    >
                      <span className={`absolute left-[13px] top-8 z-10 h-4 w-4 rounded-full border-2 bg-black transition md:left-1/2 md:top-[37px] md:-translate-x-1/2 ${isActive ? toneClass : "border-gold/45 shadow-[0_0_18px_rgba(201,155,62,0.08)]"}`} />
                      <span className="font-mono text-2xl font-black tracking-[-0.04em] md:mt-12">{item.year}</span>
                      <span className="text-xs font-black uppercase leading-5 tracking-[0.14em] text-paper">{item.title}</span>
                      <span className="mt-1 hidden text-[11px] font-bold uppercase tracking-[0.14em] text-paper/44 md:block">Ver marco</span>
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
              className="terminal-module relative overflow-hidden border border-gold/22 bg-black/55 p-6 shadow-[0_0_70px_rgba(201,155,62,0.08)] md:p-8"
            >
              <div className="absolute inset-0 terminal-grid opacity-25" />
              <div className="absolute -right-20 -top-24 h-56 w-56 rounded-full bg-gold/10 blur-3xl" />
              <div className="relative">
                <p className={`font-mono text-5xl font-black tracking-[-0.05em] ${selectedTimelineEvent.tone === "green" ? "text-rise" : "text-gold"}`}>
                  {selectedTimelineEvent.year}
                </p>
                <h3 className="mt-4 font-serif text-3xl leading-[1.05] tracking-[-0.045em] text-paper md:text-4xl">{selectedTimelineEvent.title}</h3>
                <p className="mt-5 text-base leading-8 text-paper/72">{selectedTimelineEvent.description}</p>

                <div className="mt-7 grid gap-4">
                  <div className="border border-gold/18 bg-white/[0.03] p-5">
                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-gold">Marco principal</p>
                    <p className="mt-3 text-sm leading-7 text-paper/78">{selectedTimelineEvent.marker}</p>
                  </div>
                  <div className="border border-rise/18 bg-rise/[0.06] p-5">
                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-rise">Impacto</p>
                    <p className="mt-3 text-sm leading-7 text-paper/78">{selectedTimelineEvent.impact}</p>
                  </div>
                </div>
              </div>
            </motion.article>
          </div>

          <div className="mt-8 border border-gold/18 bg-black/45 p-6 shadow-[0_0_50px_rgba(201,155,62,0.05)] md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-gold">De sinais ao vivo a uma estrutura global</p>
            <p className="mt-4 max-w-5xl text-sm leading-8 text-paper/70 md:text-base">
              A linha do tempo mostra a evolução do Varejo Investidor desde o início dos sinais Elite em 2018 até a expansão internacional.
              O histórico operacional, as experiências institucionais, as parcerias e o crescimento da comunidade formam a base da metodologia atual.
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
          <div className="absolute inset-0 terminal-grid opacity-25" />
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

function InfoRow({ label, value, positive, negative }: { label: string; value: string; positive?: boolean; negative?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 border-t border-white/8 pt-3">
      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-paper/48">{label}</span>
      <span className={`text-sm font-bold ${positive ? "text-rise" : negative ? "text-fall" : "text-paper"}`}>{value}</span>
    </div>
  );
}
