"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  FreeChannelCTA,
  SiteChrome,
  SupportFooter,
  fadeUp,
  useSiteLocale,
} from "../../../src/components/SiteSections";
import { ForexBrokerBannerWide } from "../../../src/components/ForexBrokerBannerWide";
import { fxproButtonLabels, fxproLinks } from "../../../src/data/fxproLinks";
import type { Locale } from "../../../src/i18n";

type Currency =
  | "USD"
  | "BRL"
  | "EUR"
  | "GBP"
  | "JPY"
  | "KRW"
  | "INR"
  | "TRY"
  | "IDR"
  | "VND"
  | "THB"
  | "RUB"
  | "PKR"
  | "BDT";

type RiskLevel = "extreme" | "harpia" | "lobo" | "formiga" | "critical";

type ToolCopy = {
  lang: string;
  eyebrow: string;
  h1: string;
  h2: string;
  intro: string;
  formTitle: string;
  labels: {
    accountCapital: string;
    lotSize: string;
    stopPips: string;
    accountCurrency: string;
    dollarRate: string;
    riskPercent: string;
    targetCurrency: string;
    targetRate: string;
    dailyGoal: string;
    tradingDays: string;
    basePips: string;
  };
  helps: {
    capital: string;
    lot: string;
    stop: string;
    dollarRate: string;
    targetRate: string;
  };
  results: {
    title: string;
    pipValue: string;
    operationRisk: string;
    riskPercent: string;
    recommendedLot: string;
    pipsToDouble: string;
    pipsToZero: string;
    classification: string;
    monthlyTarget: string;
    yearlyTarget: string;
    resultBase: string;
    result500: string;
    result1000: string;
    impact: string;
    wrongToZero: string;
    wrongToDrawdown: string;
  };
  sections: {
    howTitle: string;
    howText: string;
    levelsTitle: string;
    pipTable: string;
    dailyTargets: string;
    monthlyTargets: string;
    currency: string;
    lotSimulator: string;
    impactTable: string;
    annualTargets: string;
    objective: string;
    evolution: string;
    mistakes: string;
    brokerTitle: string;
    brokerText: string;
    ctaTitle: string;
    ctaText: string;
  };
  cards: { title: string; text: string }[];
  mistakes: string[];
  levels: Record<RiskLevel, { label: string; text: string }>;
  freeButton: string;
  signalsButton: string;
  disclaimer: string;
};

const currencySymbols: Record<Currency, string> = {
  USD: "US$",
  BRL: "R$",
  EUR: "EUR",
  GBP: "GBP",
  JPY: "JPY",
  KRW: "KRW",
  INR: "INR",
  TRY: "TRY",
  IDR: "IDR",
  VND: "VND",
  THB: "THB",
  RUB: "RUB",
  PKR: "PKR",
  BDT: "BDT",
};

const localeMap: Record<Locale, string> = {
  pt: "pt-BR",
  en: "en-US",
  es: "es-ES",
  fr: "fr-FR",
  hi: "hi-IN",
  ar: "ar-SA",
  tr: "tr-TR",
  id: "id-ID",
  vi: "vi-VN",
  th: "th-TH",
  ru: "ru-RU",
  ur: "ur-PK",
  bn: "bn-BD",
  ja: "ja-JP",
  ko: "ko-KR",
};

const defaultCurrencyByLocale: Record<Locale, Currency> = {
  pt: "BRL",
  en: "USD",
  es: "USD",
  fr: "EUR",
  hi: "INR",
  ar: "USD",
  tr: "TRY",
  id: "IDR",
  vi: "VND",
  th: "THB",
  ru: "RUB",
  ur: "PKR",
  bn: "BDT",
  ja: "JPY",
  ko: "KRW",
};

const usdRateByCurrency: Record<Currency, number> = {
  USD: 1,
  BRL: 5.45,
  EUR: 0.92,
  GBP: 0.78,
  JPY: 156,
  KRW: 1370,
  INR: 83,
  TRY: 32,
  IDR: 16200,
  VND: 25400,
  THB: 36.5,
  RUB: 90,
  PKR: 278,
  BDT: 117,
};

const currencies: Currency[] = ["USD", "BRL", "EUR", "GBP", "JPY", "KRW", "INR", "TRY", "IDR", "VND", "THB", "RUB", "PKR", "BDT"];
const lotColumns = [0.01, 0.05, 0.1, 0.2, 0.3, 0.5, 1];
const pipValueLots = [0.01, 0.05, 0.1, 0.2, 0.3, 0.4, 0.5, 1];
const simulatorLots = [0.01, 0.02, 0.03, 0.05, 0.1, 0.2, 0.3, 0.5, 1];
const pipRows = [30, 50, 80, 100, 150, 200, 300];
const monthlyPipRows = [1000, 1500, 2500, 3000, 3500, 4000, 4500];
const signalsPath: Partial<Record<Locale, string>> = {
  pt: "/sinais",
  en: "/en/signals",
  es: "/es/signals",
  fr: "/fr/signals",
  hi: "/hi/signals",
  ar: "/ar/signals",
  tr: "/tr/signals",
  id: "/id/signals",
  vi: "/vi/signals",
  th: "/th/signals",
  ru: "/ru/signals",
  ur: "/ur/signals",
  bn: "/bn/signals",
  ja: "/ja/signals",
  ko: "/ko/signals",
};

const ptCopy: ToolCopy = {
  lang: "pt-BR",
  eyebrow: "Ferramenta Forex",
  h1: "Calculadora Forex",
  h2: "Entenda quanto seu lote representa, quanto o stop pode custar e qual risco sua conta assume antes de abrir uma operação.",
  intro:
    "Antes de operar, você precisa saber quanto cada pip representa, quanto o stop pode custar e qual lote faz sentido para o tamanho da sua conta.",
  formTitle: "Dados da operação",
  labels: {
    accountCapital: "Capital total da conta",
    lotSize: "Tamanho do lote",
    stopPips: "Stop loss em pips",
    accountCurrency: "Moeda da conta",
    dollarRate: "Cotação do dólar",
    riskPercent: "Risco desejado por operação",
    targetCurrency: "Moeda da meta",
    targetRate: "Conversão da meta para sua moeda",
    dailyGoal: "Meta diária",
    tradingDays: "Dias operados no mês",
    basePips: "Base de cálculo em pips",
  },
  helps: {
    capital: "Valor disponível na corretora para operar.",
    lot: "1.00 = lote padrão, 0.10 = mini lote, 0.01 = micro lote.",
    stop: "Distância entre a entrada e o stop. Usamos 100 pips como referência inicial para facilitar a comparação do risco.",
    dollarRate: "Usado para converter o valor do pip em contas fora de USD.",
    targetRate: "Quanto 1 unidade da moeda da meta vale na moeda da sua conta.",
  },
  results: {
    title: "Resultado da ferramenta",
    pipValue: "Valor por pip",
    operationRisk: "Risco da operação",
    riskPercent: "Percentual de risco",
    recommendedLot: "Lote recomendado",
    pipsToDouble: "Pips para dobrar",
    pipsToZero: "Pips para zerar",
    classification: "Classificação",
    monthlyTarget: "Meta mensal",
    yearlyTarget: "Meta anual",
    resultBase: "Resultado na base de pips",
    result500: "Resultado em 500 pips",
    result1000: "Resultado em 1.000 pips",
    impact: "Impacto na conta",
    wrongToZero: "Operações erradas até zerar",
    wrongToDrawdown: "Operações erradas até 70% DD",
  },
  sections: {
    howTitle: "Como usar a Calculadora Forex",
    howText:
      "Preencha o capital da conta, o lote, o stop e a moeda. A ferramenta mostra o risco financeiro, o valor por pip e uma sugestão de lote baseada no percentual de risco escolhido.",
    levelsTitle: "Formiga, Lobo e Harpia no risco",
    pipTable: "Tabela de valor por pip",
    dailyTargets: "Metas por pips diários",
    monthlyTargets: "Metas por pips mensais",
    currency: "Conversão e metas",
    lotSimulator: "Compare diferentes lotes com o seu capital",
    impactTable: "Impacto por lote no seu capital",
    annualTargets: "Metas anuais",
    objective: "Quanto você quer buscar por mês?",
    evolution: "Simulação de evolução da conta",
    mistakes: "Erros que quebram contas pequenas",
    brokerTitle: "Abra sua conta Forex",
    brokerText:
      "Para acompanhar os sinais e aplicar gestão de risco, opere sempre na sua própria conta. O capital permanece com você na corretora.",
    ctaTitle: "Sua evolução começa no Canal Formiga.",
    ctaText:
      "Receba análises econômicas, conteúdos educacionais e atualizações dos mercados globais diretamente no WhatsApp.",
  },
  cards: [
    { title: "Capital da conta", text: "É o valor disponível na corretora. Ele serve como base para medir se o lote escolhido faz sentido." },
    { title: "Lote", text: "É o tamanho da operação. Quanto maior o lote, maior o valor financeiro de cada pip." },
    { title: "Pip", text: "É a unidade de movimento do preço no Forex. A calculadora mostra quanto cada pip vale em dinheiro." },
    { title: "Stop loss", text: "É a distância máxima de perda planejada. Ele ajuda a proteger a conta quando a operação vai contra." },
    { title: "Risco da operação", text: "É quanto você pode perder se o stop for atingido." },
    { title: "Sobrevivência", text: "Ajuda a visualizar quantos erros consecutivos podem comprometer a conta." },
  ],
  mistakes: [
    "Operar sem stop",
    "Usar lote alto",
    "Aumentar lote após prejuízo",
    "Não saber o valor do pip",
    "Buscar meta incompatível com o capital",
    "Confundir ganho possível com risco aceitável",
  ],
  levels: {
    extreme: { label: "Conservador extremo", text: "Risco muito baixo. Preserva o capital, mas pode limitar crescimento dependendo da estratégia." },
    harpia: { label: "Harpia", text: "Risco conservador. Prioriza preservação de capital e longevidade." },
    lobo: { label: "Lobo", text: "Risco moderado. Busca crescimento com controle e espaço para erro." },
    formiga: { label: "Formiga", text: "Risco alto. A conta fica mais vulnerável a sequências negativas." },
    critical: { label: "Crítico", text: "Risco excessivo. O lote pode comprometer rapidamente a conta." },
  },
  freeButton: "Entrar no Canal Formiga",
  signalsButton: "Receber sinais no WhatsApp",
  disclaimer:
    "Ferramenta educacional. Os cálculos usam uma regra simplificada de Forex. O valor real por pip pode variar conforme ativo, corretora, moeda da conta, tipo de contrato e condições de mercado. Não existe promessa de lucro.",
};

const enCopy: ToolCopy = {
  ...ptCopy,
  lang: "en",
  eyebrow: "Forex Tool",
  h1: "Forex Calculator",
  h2: "Understand what your lot size represents, how much the stop may cost and what risk your account assumes before opening a trade.",
  intro:
    "Before trading, you need to know what each pip represents, how much the stop can cost, and which lot size fits your account.",
  formTitle: "Trade data",
  labels: {
    accountCapital: "Total account capital",
    lotSize: "Lot size",
    stopPips: "Stop loss in pips",
    accountCurrency: "Account currency",
    dollarRate: "Dollar rate",
    riskPercent: "Desired risk per trade",
    targetCurrency: "Target currency",
    targetRate: "Target conversion into your currency",
    dailyGoal: "Daily target",
    tradingDays: "Trading days per month",
    basePips: "Calculation base in pips",
  },
  helps: {
    capital: "Capital available at the broker.",
    lot: "1.00 = standard lot, 0.10 = mini lot, 0.01 = micro lot.",
    stop: "Distance between entry and stop. We use 100 pips as the initial reference to make risk comparison easier.",
    dollarRate: "Used to convert pip value for non-USD accounts.",
    targetRate: "How much 1 unit of the target currency is worth in your account currency.",
  },
  results: {
    title: "Tool result",
    pipValue: "Value per pip",
    operationRisk: "Trade risk",
    riskPercent: "Risk percentage",
    recommendedLot: "Recommended lot",
    pipsToDouble: "Pips to double",
    pipsToZero: "Pips to zero",
    classification: "Classification",
    monthlyTarget: "Monthly target",
    yearlyTarget: "Yearly target",
    resultBase: "Result at pip base",
    result500: "Result in 500 pips",
    result1000: "Result in 1,000 pips",
    impact: "Account impact",
    wrongToZero: "Wrong trades to zero",
    wrongToDrawdown: "Wrong trades to 70% DD",
  },
  sections: {
    howTitle: "How to use the Forex Calculator",
    howText:
      "Enter account capital, lot size, stop and currency. The tool shows financial risk, value per pip and a lot suggestion based on your chosen risk percentage.",
    levelsTitle: "Ant, Wolf and Harpy in risk",
    pipTable: "Pip value table",
    dailyTargets: "Daily pip targets",
    monthlyTargets: "Monthly pip targets",
    currency: "Conversion and targets",
    lotSimulator: "Compare different lots with your capital",
    impactTable: "Lot impact on your capital",
    annualTargets: "Annual targets",
    objective: "How much do you want to target per month?",
    evolution: "Account evolution simulation",
    mistakes: "Mistakes that break small accounts",
    brokerTitle: "Open your Forex account",
    brokerText:
      "To follow signals and apply risk management, always trade from your own account. Your capital remains with you at the broker.",
    ctaTitle: "Your journey starts in the Formiga Channel.",
    ctaText:
      "Receive economic analysis, educational content and global market updates directly on WhatsApp.",
  },
  cards: [
    { title: "Account capital", text: "The amount available at the broker. It is the base used to measure whether the lot makes sense." },
    { title: "Lot", text: "The trade size. The larger the lot, the larger the financial value of each pip." },
    { title: "Pip", text: "The price movement unit in Forex. The calculator shows how much each pip is worth in money." },
    { title: "Stop loss", text: "The maximum planned loss distance. It helps protect the account when the trade moves against you." },
    { title: "Trade risk", text: "How much you may lose if the stop is reached." },
    { title: "Survival", text: "Helps you see how many consecutive mistakes can compromise the account." },
  ],
  mistakes: [
    "Trading without a stop",
    "Using oversized lots",
    "Increasing lot size after a loss",
    "Not knowing pip value",
    "Setting targets incompatible with capital",
    "Confusing possible gain with acceptable risk",
  ],
  levels: {
    extreme: { label: "Extreme conservative", text: "Very low risk. It preserves capital, but may limit growth depending on the strategy." },
    harpia: { label: "Harpy", text: "Conservative risk. Focused on capital preservation and longevity." },
    lobo: { label: "Wolf", text: "Moderate risk. Growth with control and room for mistakes." },
    formiga: { label: "Ant", text: "High risk. The account becomes vulnerable to negative streaks." },
    critical: { label: "Critical", text: "Excessive risk. The lot can quickly compromise the account." },
  },
  freeButton: "Enter the Formiga Channel",
  signalsButton: "Receive signals on WhatsApp",
  disclaimer:
    "Educational tool. Calculations use a simplified Forex rule. Real pip value may vary by asset, broker, account currency, contract type and market conditions. There is no profit promise.",
};

const copyByLocale: Partial<Record<Locale, ToolCopy>> = {
  pt: ptCopy,
  en: enCopy,
  es: {
    ...enCopy,
    lang: "es",
    eyebrow: "Herramienta Forex",
    h1: "Calculadora Forex",
    h2: "Calcula riesgo, lote correcto, impacto por pip, metas y conversion de moneda en una sola herramienta.",
    formTitle: "Datos de la operacion",
    freeButton: "Entrar al Canal Formiga",
    signalsButton: "Recibir senales en WhatsApp",
  },
  fr: { ...enCopy, lang: "fr", eyebrow: "Outil Forex", h1: "Calculateur Forex", freeButton: "Entrer dans le Canal Formiga" },
  hi: { ...enCopy, lang: "hi", eyebrow: "Forex à¤Ÿà¥‚à¤²", h1: "Forex Calculator", freeButton: "Formiga Channel à¤®à¥‡à¤‚ à¤ªà¥à¤°à¤µà¥‡à¤¶ à¤•à¤°à¥‡à¤‚" },
  ar: { ...enCopy, lang: "ar", eyebrow: "Ø£Ø¯Ø§Ø© Ø§Ù„ÙÙˆØ±ÙƒØ³", h1: "Ø­Ø§Ø³Ø¨Ø© Ø§Ù„ÙÙˆØ±ÙƒØ³", freeButton: "Ø§Ù„Ø¯Ø®ÙˆÙ„ Ø¥Ù„Ù‰ Ù‚Ù†Ø§Ø© Formiga" },
  tr: { ...enCopy, lang: "tr", eyebrow: "Forex Araci", h1: "Forex Hesaplayici", freeButton: "Formiga Kanalina Gir" },
  id: { ...enCopy, lang: "id", eyebrow: "Alat Forex", h1: "Kalkulator Forex", freeButton: "Masuk ke Kanal Formiga" },
  vi: { ...enCopy, lang: "vi", eyebrow: "Cong cu Forex", h1: "May tinh Forex", freeButton: "Vao Kenh Formiga" },
  th: { ...enCopy, lang: "th", eyebrow: "à¹€à¸„à¸£à¸·à¹ˆà¸­à¸‡à¸¡à¸·à¸­ Forex", h1: "à¹€à¸„à¸£à¸·à¹ˆà¸­à¸‡à¸„à¸³à¸™à¸§à¸“ Forex", freeButton: "à¹€à¸‚à¹‰à¸²à¸ªà¸¹à¹ˆà¸Šà¹ˆà¸­à¸‡ Formiga" },
  ru: { ...enCopy, lang: "ru", eyebrow: "Ð˜Ð½ÑÑ‚Ñ€ÑƒÐ¼ÐµÐ½Ñ‚ Forex", h1: "ÐšÐ°Ð»ÑŒÐºÑƒÐ»ÑÑ‚Ð¾Ñ€ Forex", freeButton: "Ð’Ð¾Ð¹Ñ‚Ð¸ Ð² ÐºÐ°Ð½Ð°Ð» Formiga" },
  ur: { ...enCopy, lang: "ur", eyebrow: "Forex Ù¹ÙˆÙ„", h1: "Forex Calculator", freeButton: "Formiga Channel Ù…ÛŒÚº Ø¯Ø§Ø®Ù„ ÛÙˆÚº" },
  bn: { ...enCopy, lang: "bn", eyebrow: "Forex à¦Ÿà§à¦²", h1: "Forex Calculator", freeButton: "Formiga Channel à¦ à¦ªà§à¦°à¦¬à§‡à¦¶ à¦•à¦°à§à¦¨" },
  ja: { ...enCopy, lang: "ja", eyebrow: "Forexãƒ„ãƒ¼ãƒ«", h1: "Forexè¨ˆç®—æ©Ÿ", freeButton: "Formigaãƒãƒ£ãƒ³ãƒãƒ«ã«å…¥ã‚‹" },
  ko: { ...enCopy, lang: "ko", eyebrow: "Forex ë„êµ¬", h1: "Forex ê³„ì‚°ê¸°", freeButton: "Formiga ì±„ë„ ìž…ìž¥" },
};

function formatMoney(value: number, currency: Currency, locale: Locale) {
  if (!Number.isFinite(value)) return `${currencySymbols[currency]} 0`;
  return new Intl.NumberFormat(localeMap[locale] ?? "en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "JPY" || currency === "KRW" || currency === "VND" ? 0 : 2,
  }).format(value);
}

function formatNumber(value: number, locale: Locale, digits = 2) {
  if (!Number.isFinite(value)) return "0";
  return new Intl.NumberFormat(localeMap[locale] ?? "en-US", {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(value);
}

function parseFlexibleNumber(rawValue: string) {
  const cleaned = rawValue.replace(/[^\d.,-]/g, "").trim();
  if (!cleaned) return 0;
  const lastComma = cleaned.lastIndexOf(",");
  const lastDot = cleaned.lastIndexOf(".");
  let normalized = cleaned;

  if (lastComma > -1 && lastDot > -1) {
    const decimalSeparator = lastComma > lastDot ? "," : ".";
    const thousandSeparator = decimalSeparator === "," ? "." : ",";
    normalized = cleaned.replaceAll(thousandSeparator, "").replace(decimalSeparator, ".");
  } else if (lastComma > -1) {
    normalized = cleaned.replaceAll(".", "").replace(",", ".");
  } else if (lastDot > -1) {
    const afterDot = cleaned.length - lastDot - 1;
    normalized = afterDot === 3 ? cleaned.replaceAll(".", "") : cleaned;
  }

  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

function classifyRisk(riskPercent: number): RiskLevel {
  if (riskPercent < 0.1) return "extreme";
  if (riskPercent <= 0.3) return "harpia";
  if (riskPercent <= 1) return "lobo";
  if (riskPercent <= 3) return "formiga";
  return "critical";
}

function resultTone(level: RiskLevel) {
  if (level === "extreme") return "border-rise/25 text-rise";
  if (level === "harpia") return "border-rise/35 text-rise";
  if (level === "lobo") return "border-gold/45 text-gold";
  if (level === "formiga") return "border-fall/45 text-fall";
  return "border-red-900/70 text-red-400";
}

export default function ForexCalculatorPage() {
  const { locale, t, changeLocale } = useSiteLocale();
  const copy = copyByLocale[locale] ?? enCopy;
  const [capital, setCapital] = useState(1000);
  const [capitalDraft, setCapitalDraft] = useState("1000");
  const [lot, setLot] = useState(0.1);
  const [stopPips, setStopPips] = useState(100);
  const [basePips, setBasePips] = useState(100);
  const [riskTarget, setRiskTarget] = useState(1);
  const [accountCurrency, setAccountCurrency] = useState<Currency>(defaultCurrencyByLocale[locale] ?? "USD");
  const [dollarRate, setDollarRate] = useState(usdRateByCurrency[defaultCurrencyByLocale[locale] ?? "USD"]);
  const [targetRate, setTargetRate] = useState(usdRateByCurrency[defaultCurrencyByLocale[locale] ?? "USD"]);
  const [dailyGoal, setDailyGoal] = useState(50);
  const [tradingDays, setTradingDays] = useState(20);
  const [objectiveCapital, setObjectiveCapital] = useState(1000);
  const [objectiveCapitalDraft, setObjectiveCapitalDraft] = useState("1000");
  const [monthlyObjective, setMonthlyObjective] = useState(1000);
  const [objectiveStop, setObjectiveStop] = useState(100);
  const [objectiveDays, setObjectiveDays] = useState(20);
  const [evolutionCapital, setEvolutionCapital] = useState(1000);
  const [evolutionCapitalDraft, setEvolutionCapitalDraft] = useState("1000");
  const [monthlyContribution, setMonthlyContribution] = useState(100);
  const [evolutionDailyTarget, setEvolutionDailyTarget] = useState(50);
  const [evolutionDays, setEvolutionDays] = useState(20);
  const [evolutionMonths, setEvolutionMonths] = useState(12);

  const calculations = useMemo(() => {
    const safeCapital = Math.max(capital, 0);
    const safeLot = Math.max(lot, 0);
    const safeStop = Math.max(stopPips, 0);
    const safeBasePips = Math.max(basePips, 0);
    const safeDollarRate = Math.max(dollarRate, 0.0001);
    const pipValue = safeLot * 10 * safeDollarRate;
    const operationRisk = pipValue * safeStop;
    const operationRiskPercent = safeCapital > 0 ? (operationRisk / safeCapital) * 100 : 0;
    const resultBase = pipValue * safeBasePips;
    const result500 = pipValue * 500;
    const result1000 = pipValue * 1000;
    const impactBase = safeCapital > 0 ? (resultBase / safeCapital) * 100 : 0;
    const recommendedLot = safeStop > 0 ? (safeCapital * (riskTarget / 100)) / (safeStop * 10 * safeDollarRate) : 0;
    const pipsToDouble = pipValue > 0 ? safeCapital / pipValue : 0;
    const pipsToZero = pipsToDouble;
    const wrongTradesToZero = operationRisk > 0 ? safeCapital / operationRisk : 0;
    const wrongTradesToDrawdown = operationRisk > 0 ? (safeCapital * 0.7) / operationRisk : 0;
    const riskLevel = classifyRisk(operationRiskPercent);
    const dailyLocal = dailyGoal * targetRate;
    const monthlyLocal = dailyLocal * tradingDays;
    const yearlyLocal = monthlyLocal * 12;
    const monthlyObjectiveLocal = monthlyObjective;
    const objectiveDailyLocal = objectiveDays > 0 ? monthlyObjectiveLocal / objectiveDays : 0;
    const objectivePipsPerDay = safeDollarRate > 0 && objectiveDays > 0 ? objectiveDailyLocal / (10 * safeDollarRate) : 0;
    const objectiveRequiredLot = objectiveDays > 0 && objectiveStop > 0
      ? objectiveDailyLocal / objectiveStop / 10 / safeDollarRate
      : 0;
    const objectiveRiskMoney = objectiveRequiredLot * 10 * safeDollarRate * objectiveStop;
    const objectiveRisk = objectiveCapital > 0 ? (objectiveRiskMoney / objectiveCapital) * 100 : 0;
    const suggestedCapitalHarpia = objectiveRiskMoney / 0.003;
    const suggestedCapitalLobo = objectiveRiskMoney / 0.01;
    const suggestedCapitalFormiga = objectiveRiskMoney / 0.03;
    const evolutionMonthly = evolutionDailyTarget * targetRate * evolutionDays;

    return {
      pipValue,
      operationRisk,
      operationRiskPercent,
      resultBase,
      result500,
      result1000,
      impactBase,
      recommendedLot,
      pipsToDouble,
      pipsToZero,
      wrongTradesToZero,
      wrongTradesToDrawdown,
      riskLevel,
      dailyLocal,
      monthlyLocal,
      yearlyLocal,
      objectivePipsPerDay,
      objectiveRequiredLot,
      objectiveRisk,
      suggestedCapitalHarpia,
      suggestedCapitalLobo,
      suggestedCapitalFormiga,
      evolutionMonthly,
    };
  }, [capital, lot, stopPips, basePips, dollarRate, riskTarget, dailyGoal, tradingDays, targetRate, monthlyObjective, objectiveStop, objectiveCapital, objectiveDays, evolutionDailyTarget, evolutionDays]);

  function updateCurrency(nextCurrency: Currency) {
    setAccountCurrency(nextCurrency);
    setDollarRate(usdRateByCurrency[nextCurrency]);
    setTargetRate(usdRateByCurrency[nextCurrency]);
    setCapitalDraft(formatMoney(capital, nextCurrency, locale));
    setObjectiveCapitalDraft(formatMoney(objectiveCapital, nextCurrency, locale));
    setEvolutionCapitalDraft(formatMoney(evolutionCapital, nextCurrency, locale));
  }

  const resultCards = [
    { label: copy.results.pipValue, value: `${formatMoney(calculations.pipValue, accountCurrency, locale)} / pip` },
    { label: copy.results.operationRisk, value: formatMoney(calculations.operationRisk, accountCurrency, locale) },
    { label: copy.results.riskPercent, value: `${formatNumber(calculations.operationRiskPercent, locale)}%` },
    { label: copy.results.resultBase, value: formatMoney(calculations.resultBase, accountCurrency, locale) },
    { label: copy.results.impact, value: `${formatNumber(calculations.impactBase, locale)}%` },
    { label: copy.results.pipsToDouble, value: `${formatNumber(calculations.pipsToDouble, locale, 0)} pips` },
    { label: copy.results.pipsToZero, value: `${formatNumber(calculations.pipsToZero, locale, 0)} pips` },
    { label: copy.results.wrongToZero, value: formatNumber(calculations.wrongTradesToZero, locale, 1) },
    { label: copy.results.wrongToDrawdown, value: formatNumber(calculations.wrongTradesToDrawdown, locale, 1) },
  ];
  const activeLevel = copy.levels[calculations.riskLevel];
  const recoveryRows = [10, 20, 30, 40, 50, 60, 70, 80, 90].map((lossPercent) => {
    const remainingBalance = capital * (1 - lossPercent / 100);
    const recoveryGain = remainingBalance > 0 ? (capital / remainingBalance - 1) * 100 : 0;
    return { lossPercent, remainingBalance, recoveryGain };
  });
  const evolutionPeriods = [1, 3, 6, 12, 36, 60].map((months) => {
    const totalContributions = monthlyContribution * months;
    const accumulatedTargets = calculations.evolutionMonthly * months;
    const projectedBalance = evolutionCapital + totalContributions + accumulatedTargets;
    const growthOnInitial = evolutionCapital > 0 ? ((projectedBalance / evolutionCapital) - 1) * 100 : 0;
    const baseWithContributions = evolutionCapital + totalContributions;
    const growthWithContributions = baseWithContributions > 0 ? ((projectedBalance / baseWithContributions) - 1) * 100 : 0;
    return { months, totalContributions, accumulatedTargets, projectedBalance, growthOnInitial, growthWithContributions };
  });

  return (
    <main className="bg-ink text-paper">
      <SiteChrome locale={locale} t={t} onLocaleChange={changeLocale} />

      <section className="relative overflow-hidden px-5 pb-14 pt-32 md:px-8 md:pb-20 md:pt-40">
        <div className="absolute inset-0 bg-grid opacity-[0.08]" />
        <div className="absolute left-1/2 top-16 h-96 w-96 -translate-x-1/2 rounded-full bg-gold/[0.05] blur-3xl" />
        <div className="relative mx-auto max-w-7xl">
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <p className="text-xs font-black uppercase tracking-[0.32em] text-gold">{copy.eyebrow}</p>
            <h1 className="mt-5 max-w-3xl font-serif text-5xl tracking-[-0.06em] text-paper md:text-7xl">
              {copy.h1}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-paper/72">{copy.h2}</p>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-paper/55">{copy.intro}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={t.freeChannel.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center border border-rise bg-rise px-6 py-4 text-xs font-black uppercase tracking-[0.16em] text-ink transition hover:-translate-y-0.5 hover:shadow-[0_0_28px_rgba(0,194,110,0.2)]"
              >
                {copy.freeButton}
              </a>
              <a
                href={signalsPath[locale] ?? "/sinais"}
                className="inline-flex justify-center border border-gold/45 bg-gold px-6 py-4 text-xs font-black uppercase tracking-[0.16em] text-ink transition hover:-translate-y-0.5 hover:bg-[#d4a858]"
              >
                {copy.signalsButton}
              </a>
            </div>
          </motion.div>

        </div>
      </section>

      <section className="px-5 py-12 md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-gold">Forex</p>
          <h2 className="mt-4 font-serif text-4xl tracking-[-0.05em] text-paper md:text-5xl">
            Antes de abrir uma operação, entenda o Forex.
          </h2>
          <p className="mt-5 max-w-4xl text-sm leading-7 text-paper/62">
            No Forex, o resultado de uma operação depende principalmente de três fatores: o capital que você tem na corretora, o lote que escolhe e a quantidade de pips que o mercado se movimenta. Quanto maior o lote, maior será o ganho em cada movimento favorável, mas também maior será a perda em cada movimento contra a operação.
          </p>
        </div>
        <div className="mx-auto mt-8 grid max-w-7xl gap-5 lg:grid-cols-3">
          {copy.cards.map((card, index) => (
            <div key={card.title} className="border border-gold/16 bg-paper/[0.025] p-5">
              <span className="text-xs font-black text-gold">0{index + 1}</span>
              <h3 className="mt-4 font-serif text-2xl tracking-[-0.04em] text-paper">{card.title}</h3>
              <p className="mt-3 text-sm leading-6 text-paper/62">{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 py-12 md:px-8">
        <div className="mx-auto max-w-7xl border border-gold/18 bg-paper/[0.03] p-6 md:p-8">
          <h2 className="font-serif text-4xl tracking-[-0.05em] text-paper">Fluxo do risco no Forex</h2>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-paper/62">
            Esse fluxo mostra por que o lote não pode ser escolhido apenas pelo possível lucro. O mesmo lote pode ser moderado para uma conta grande e agressivo para uma conta pequena.
          </p>
          <div className="mt-8 grid gap-3 md:grid-cols-7 md:items-center">
            {["Capital depositado", "Lote escolhido", "Valor por pip", "Stop loss", "Risco financeiro", "Resultado possível", "Sobrevivência da conta"].map((item, index) => (
              <div key={item} className="flex items-center gap-3 md:block">
                <div className="border border-gold/18 bg-ink p-4 text-center text-xs font-black uppercase tracking-[0.12em] text-paper/82">
                  <span className="mb-2 block text-gold">{String(index + 1).padStart(2, "0")}</span>
                  {item}
                </div>
                {index < 6 ? <span className="text-gold md:hidden">↓</span> : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-12 md:px-8">
        <div className="mx-auto max-w-7xl border border-gold/22 bg-gold/[0.055] p-6 md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-gold">Recomendação Varejo Investidor</p>
          <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="font-serif text-4xl tracking-[-0.05em] text-paper md:text-5xl">Base padrão de comparação</h2>
              <p className="mt-4 max-w-4xl text-sm leading-7 text-paper/68">
                Para facilitar a leitura do risco, usamos 100 pips como base padrão de cálculo. Assim, o investidor consegue comparar diferentes lotes e entender rapidamente quanto cada movimento pode representar na conta.
              </p>
              <p className="mt-3 max-w-4xl text-sm leading-7 text-paper/52">
                A base de 100 pips não é promessa de ganho nem indicação fixa de stop. É apenas uma referência educacional para comparar lote, risco e impacto financeiro.
              </p>
            </div>
            <div className="border border-gold/45 bg-ink px-7 py-6 text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-paper/56">Base padrão</p>
              <p className="mt-2 text-4xl font-black text-gold">100 pips</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-12 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="border border-gold/18 bg-paper/[0.035] p-5 shadow-[0_0_80px_rgba(198,153,74,0.06)] md:p-7">
            <p className="text-xs font-black uppercase tracking-[0.26em] text-gold">Calcule o risco da sua operação</p>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <Field label={copy.labels.accountCapital} help={copy.helps.capital}>
                <MoneyInput
                  value={capitalDraft}
                  currency={accountCurrency}
                  locale={locale}
                  onChange={setCapitalDraft}
                  onCommit={(nextValue) => {
                    setCapital(nextValue);
                    setCapitalDraft(formatMoney(nextValue, accountCurrency, locale));
                  }}
                />
              </Field>
              <Field label={copy.labels.accountCurrency} help="">
                <select
                  value={accountCurrency}
                  onChange={(event) => updateCurrency(event.target.value as Currency)}
                  className="w-full border border-gold/20 bg-ink px-4 py-3 text-sm font-bold text-paper outline-none transition focus:border-gold"
                >
                  {currencies.map((currency) => (
                    <option key={currency} value={currency}>{currency}</option>
                  ))}
                </select>
              </Field>
              <Field label={copy.labels.lotSize} help={copy.helps.lot}>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setLot((current) => Math.max(0.01, Number((current - 0.01).toFixed(2))))}
                    className="h-12 w-12 border border-gold/25 bg-ink text-xl font-black text-gold"
                  >
                    -
                  </button>
                  <NumberInput value={lot} step={0.01} min={0.01} onChange={setLot} />
                  <button
                    type="button"
                    onClick={() => setLot((current) => Number((current + 0.01).toFixed(2)))}
                    className="h-12 w-12 border border-gold/25 bg-ink text-xl font-black text-gold"
                  >
                    +
                  </button>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {[0.01, 0.05, 0.1, 0.2, 0.5, 1].map((quickLot) => (
                    <button
                      type="button"
                      key={quickLot}
                      onClick={() => setLot(quickLot)}
                      className={`border px-3 py-2 text-[10px] font-black uppercase tracking-[0.12em] transition ${
                        lot === quickLot ? "border-gold bg-gold text-ink" : "border-gold/20 bg-ink text-paper/70 hover:border-gold/60"
                      }`}
                    >
                      {quickLot.toFixed(2)}
                    </button>
                  ))}
                </div>
              </Field>
              <Field label={copy.labels.stopPips} help={copy.helps.stop}>
                <NumberInput value={stopPips} min={0} onChange={setStopPips} />
              </Field>
            </div>
            <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-paper/50">Base de cálculo fixa: 100 pips</p>
          </div>
        </div>
      </section>

      <TableSection title={copy.sections.pipTable}>
        <thead>
          <tr>
            <Th>Lote</Th>
            <Th>{copy.results.pipValue}</Th>
            <Th>100 pips</Th>
            <Th>500 pips</Th>
            <Th>1.000 pips</Th>
          </tr>
        </thead>
        <tbody>
          {pipValueLots.map((lotColumn) => {
            const pipValue = lotColumn * 10 * dollarRate;
            return (
              <tr key={lotColumn} className="border-t border-gold/10">
                <Td>{lotColumn.toFixed(2)}</Td>
                <Td>{formatMoney(pipValue, accountCurrency, locale)}</Td>
                <Td>{formatMoney(pipValue * 100, accountCurrency, locale)}</Td>
                <Td>{formatMoney(pipValue * 500, accountCurrency, locale)}</Td>
                <Td>{formatMoney(pipValue * 1000, accountCurrency, locale)}</Td>
              </tr>
            );
          })}
        </tbody>
      </TableSection>

      <section className="px-5 py-12 md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-gold">Resultado da operação</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {resultCards.map((card) => (
              <ResultCard key={card.label} label={card.label} value={card.value} />
            ))}
            <div className={`border bg-paper/[0.035] p-5 ${resultTone(calculations.riskLevel)}`}>
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-gold">{copy.results.classification}</p>
              <p className="mt-3 text-3xl font-black text-paper">{activeLevel.label}</p>
              <p className="mt-3 text-sm leading-6 text-paper/64">{activeLevel.text}</p>
            </div>
          </div>
        </div>
      </section>

      <TableSection
        title={copy.sections.lotSimulator}
        subtitle="Esta tabela usa o capital informado na calculadora para mostrar como cada lote altera o risco, o valor por pip e o impacto do stop."
        topContent={
          <div className="grid gap-4 sm:grid-cols-2">
            <ResultCard label="Capital usado na comparação" value={formatMoney(capital, accountCurrency, locale)} />
            <ResultCard label="Stop usado" value={`${formatNumber(stopPips, locale, 0)} pips`} />
          </div>
        }
      >
        <thead>
          <tr>
            <Th>Lote</Th>
            <Th>{copy.results.pipValue}</Th>
            <Th>{copy.results.operationRisk}</Th>
            <Th>{copy.results.riskPercent}</Th>
            <Th>100 pips</Th>
            <Th>{copy.results.pipsToDouble}</Th>
            <Th>{copy.results.pipsToZero}</Th>
            <Th>{copy.results.classification}</Th>
          </tr>
        </thead>
        <tbody>
          {simulatorLots.map((lotColumn) => {
            const pipValue = lotColumn * 10 * dollarRate;
            const riskMoney = pipValue * stopPips;
            const riskPct = capital > 0 ? (riskMoney / capital) * 100 : 0;
            const level = classifyRisk(riskPct);
            return (
              <tr key={lotColumn} className="border-t border-gold/10">
                <Td>{lotColumn.toFixed(2)}</Td>
                <Td>{formatMoney(pipValue, accountCurrency, locale)}</Td>
                <Td>{formatMoney(riskMoney, accountCurrency, locale)}</Td>
                <Td>{formatNumber(riskPct, locale)}%</Td>
                <Td>{formatMoney(pipValue * 100, accountCurrency, locale)}</Td>
                <Td>{formatNumber(pipValue > 0 ? capital / pipValue : 0, locale, 0)}</Td>
                <Td>{formatNumber(pipValue > 0 ? capital / pipValue : 0, locale, 0)}</Td>
                <Td><span className={resultTone(level)}>{copy.levels[level].label}</span></Td>
              </tr>
            );
          })}
        </tbody>
      </TableSection>

      <TableSection
        title="Tabela de recuperação de prejuízo"
        subtitle="Quanto maior a perda, maior precisa ser o ganho para voltar ao capital inicial. Esta tabela mostra por que controlar risco é essencial antes de operar."
        topContent={
          <ResultCard label="Capital inicial" value={formatMoney(capital, accountCurrency, locale)} />
        }
      >
        <thead>
          <tr>
            <Th>Capital</Th>
            <Th>Perda</Th>
            <Th>Saldo restante</Th>
            <Th>Ganho necessário para recuperar</Th>
          </tr>
        </thead>
        <tbody>
          {recoveryRows.map((row) => (
            <tr key={row.lossPercent} className="border-t border-gold/10">
              <Td>{formatMoney(capital, accountCurrency, locale)}</Td>
              <Td><span className="text-fall">-{formatNumber(row.lossPercent, locale, 0)}%</span></Td>
              <Td>{formatMoney(row.remainingBalance, accountCurrency, locale)}</Td>
              <Td><span className="text-rise">+{formatNumber(row.recoveryGain, locale)}%</span></Td>
            </tr>
          ))}
        </tbody>
      </TableSection>

      <section className="px-5 py-12 md:px-8">
        <div className="mx-auto max-w-7xl border border-gold/18 bg-paper/[0.035] p-6 md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.26em] text-gold">{copy.sections.objective}</p>
          <h2 className="mt-4 font-serif text-4xl tracking-[-0.05em] text-paper md:text-5xl">
            Calculadora de meta mensal
          </h2>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-paper/62">
            Informe uma meta mensal e veja se ela combina com o tamanho da sua conta, o stop médio e o risco assumido.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            <Field label="Capital da conta" help="Base usada para calcular a compatibilidade da meta.">
              <MoneyInput
                value={objectiveCapitalDraft}
                currency={accountCurrency}
                locale={locale}
                onChange={setObjectiveCapitalDraft}
                onCommit={(nextValue) => {
                  const safeValue = Math.max(0, nextValue);
                  setObjectiveCapital(safeValue);
                  setObjectiveCapitalDraft(formatMoney(safeValue, accountCurrency, locale));
                }}
              />
            </Field>
            <Field label="Meta mensal desejada" help="Valor na moeda da conta que você deseja buscar no mês.">
              <NumberInput value={monthlyObjective} min={0} onChange={setMonthlyObjective} />
            </Field>
            <Field label="Stop médio em pips" help="Distância média do stop usada para estimar risco.">
              <NumberInput value={objectiveStop} min={1} onChange={setObjectiveStop} />
            </Field>
            <Field label="Dias operados no mês" help="Quantidade média de dias de operação.">
              <NumberInput value={objectiveDays} min={1} max={31} onChange={setObjectiveDays} />
            </Field>
            <ReadOnlyBox label="Moeda" value={accountCurrency} />
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <ResultCard label="Pips por dia necessários" value={`${formatNumber(calculations.objectivePipsPerDay, locale, 0)} pips`} />
            <ResultCard label="Lote necessário" value={formatNumber(calculations.objectiveRequiredLot, locale, 3)} />
            <ResultCard label="Risco estimado" value={`${formatNumber(calculations.objectiveRisk, locale)}%`} />
            <ResultCard label="Compatibilidade da meta" value={calculations.objectiveRisk > 1 ? "Agressiva" : "Equilibrada"} />
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <ResultCard
              label="Capital sugerido Harpia"
              value={formatMoney(calculations.suggestedCapitalHarpia, accountCurrency, locale)}
              description="Referência conservadora: risco aproximado de 0,30% por operação."
            />
            <ResultCard
              label="Capital sugerido Lobo"
              value={formatMoney(calculations.suggestedCapitalLobo, accountCurrency, locale)}
              description="Referência moderada: risco aproximado de 1,00% por operação."
            />
            <ResultCard
              label="Capital sugerido Formiga"
              value={formatMoney(calculations.suggestedCapitalFormiga, accountCurrency, locale)}
              description="Referência agressiva: risco aproximado de 3,00% por operação."
            />
          </div>
          {calculations.objectiveRisk > 1 ? (
            <div className="mt-6 border border-fall/35 bg-fall/[0.08] p-4 text-sm leading-6 text-paper/72">
              A meta informada pode exigir risco elevado para o capital atual. Considere reduzir a meta, aumentar o capital ou diminuir a exposição.
            </div>
          ) : (
            <div className="mt-6 border border-rise/30 bg-rise/[0.07] p-4 text-sm leading-6 text-paper/72">
              A meta está mais compatível com o capital informado.
            </div>
          )}
        </div>
      </section>

      <section className="px-5 py-12 md:px-8">
        <div className="mx-auto max-w-7xl border border-gold/18 bg-paper/[0.035] p-6 md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.26em] text-gold">{copy.sections.evolution}</p>
          <h2 className="mt-4 font-serif text-4xl tracking-[-0.05em] text-paper md:text-5xl">
            Simulação de evolução da conta
          </h2>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-paper/62">
            Simulação educacional para visualizar metas acumuladas. Não representa promessa de resultado.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
            <Field label="Capital inicial" help="Base inicial da simulação.">
              <MoneyInput
                value={evolutionCapitalDraft}
                currency={accountCurrency}
                locale={locale}
                onChange={setEvolutionCapitalDraft}
                onCommit={(nextValue) => {
                  const safeValue = Math.max(0, nextValue);
                  setEvolutionCapital(safeValue);
                  setEvolutionCapitalDraft(formatMoney(safeValue, accountCurrency, locale));
                }}
              />
            </Field>
            <Field label="Aporte mensal" help="Valor adicionado mensalmente.">
              <NumberInput value={monthlyContribution} min={0} onChange={setMonthlyContribution} />
            </Field>
            <Field label="Meta diária média" help="Meta educacional média por dia.">
              <NumberInput value={evolutionDailyTarget} min={0} onChange={setEvolutionDailyTarget} />
            </Field>
            <Field label="Dias operados por mês" help="Dias considerados na simulação.">
              <NumberInput value={evolutionDays} min={1} max={31} onChange={setEvolutionDays} />
            </Field>
            <Field label="Quantidade de meses" help="Horizonte da simulação.">
              <NumberInput value={evolutionMonths} min={1} max={120} onChange={setEvolutionMonths} />
            </Field>
            <ReadOnlyBox label="Moeda" value={accountCurrency} />
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {evolutionPeriods.map((period) => (
              <div key={period.months} className="border border-gold/15 bg-paper/[0.035] p-5">
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-gold">
                  {period.months === 1 ? "1 mês" : period.months === 12 ? "1 ano" : period.months === 36 ? "3 anos" : period.months === 60 ? "5 anos" : `${period.months} meses`}
                </p>
                <p className="mt-3 break-words text-xl font-black text-white [text-shadow:0_0_8px_rgba(255,255,255,0.15)] md:text-2xl">
                  {formatMoney(period.projectedBalance, accountCurrency, locale)}
                </p>
                <dl className="mt-4 space-y-2 text-xs leading-5 text-paper/66">
                  <div className="flex justify-between gap-3">
                    <dt>Total aportado</dt>
                    <dd className="text-right font-bold text-paper">{formatMoney(period.totalContributions, accountCurrency, locale)}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt>Metas acumuladas</dt>
                    <dd className="text-right font-bold text-paper">{formatMoney(period.accumulatedTargets, accountCurrency, locale)}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt>Crescimento sobre capital inicial</dt>
                    <dd className="text-right font-bold text-rise">{formatNumber(period.growthOnInitial, locale)}%</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt>Crescimento com aportes</dt>
                    <dd className="text-right font-bold text-gold">{formatNumber(period.growthWithContributions, locale)}%</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
          <div className="mt-6 h-3 overflow-hidden bg-ink">
            <div
              className="h-full bg-gradient-to-r from-rise via-gold to-gold"
              style={{ width: `${Math.min(100, Math.max(8, evolutionMonths / 60 * 100))}%` }}
            />
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-[10px] font-black uppercase tracking-[0.16em] text-paper/55">
            <span>Capital inicial</span>
            <span className="text-gold">+</span>
            <span>Aportes mensais</span>
            <span className="text-gold">+</span>
            <span>Metas acumuladas</span>
          </div>
        </div>
      </section>

      <section className="px-5 py-12 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="border border-gold/18 bg-paper/[0.035] p-6 md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.26em] text-gold">{copy.sections.currency}</p>
            <h2 className="mt-4 font-serif text-4xl tracking-[-0.05em] text-paper md:text-5xl">
              Metas e conversão
            </h2>
            <p className="mt-4 max-w-4xl text-sm leading-7 text-paper/62">
              Informe uma meta diária em dólar e veja quanto ela representa na moeda da sua conta. Essa simulação é educacional e não representa promessa de resultado.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <Field label="Meta diária em dólar" help="">
                <NumberInput value={dailyGoal} min={0} onChange={setDailyGoal} />
              </Field>
              <Field label={copy.labels.tradingDays} help="">
                <NumberInput value={tradingDays} min={1} max={31} onChange={setTradingDays} />
              </Field>
              <ReadOnlyBox label="Moeda da conta" value={accountCurrency} />
              <Field label="Cotação USD para moeda da conta" help={copy.helps.targetRate}>
                <NumberInput value={targetRate} step={0.01} min={0.0001} onChange={setTargetRate} />
              </Field>
            </div>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <ResultCard label="Meta diária em USD" value={formatMoney(dailyGoal, "USD", locale)} />
            <ResultCard label="Meta diária na moeda da conta" value={formatMoney(calculations.dailyLocal, accountCurrency, locale)} />
            <ResultCard label="Meta mensal em USD" value={formatMoney(dailyGoal * tradingDays, "USD", locale)} />
            <ResultCard label="Meta mensal na moeda da conta" value={formatMoney(calculations.monthlyLocal, accountCurrency, locale)} />
            <ResultCard label="Meta anual em USD" value={formatMoney(dailyGoal * tradingDays * 12, "USD", locale)} />
            <ResultCard label="Meta anual na moeda da conta" value={formatMoney(calculations.yearlyLocal, accountCurrency, locale)} />
          </div>
        </div>
      </section>

      <TableSection title={copy.sections.dailyTargets}>
        <thead>
          <tr>
            <Th>Pips</Th>
            {lotColumns.map((lotColumn) => <Th key={lotColumn}>{lotColumn.toFixed(2)}</Th>)}
          </tr>
        </thead>
        <tbody>
          {pipRows.map((pips) => (
            <tr key={pips} className="border-t border-gold/10">
              <Td>{formatNumber(pips, locale, 0)}</Td>
              {lotColumns.map((lotColumn) => (
                <Td key={`${pips}-${lotColumn}`}>{formatMoney(pips * lotColumn * 10 * dollarRate, accountCurrency, locale)}</Td>
              ))}
            </tr>
          ))}
        </tbody>
      </TableSection>

      <TableSection title={copy.sections.monthlyTargets}>
        <thead>
          <tr>
            <Th>Pips</Th>
            {lotColumns.map((lotColumn) => <Th key={lotColumn}>{lotColumn.toFixed(2)}</Th>)}
          </tr>
        </thead>
        <tbody>
          {monthlyPipRows.map((pips) => (
            <tr key={pips} className="border-t border-gold/10">
              <Td>{formatNumber(pips, locale, 0)}</Td>
              {lotColumns.map((lotColumn) => (
                <Td key={`${pips}-${lotColumn}`}>{formatMoney(pips * lotColumn * 10 * dollarRate, accountCurrency, locale)}</Td>
              ))}
            </tr>
          ))}
        </tbody>
      </TableSection>

      <section className="px-5 py-12 md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-gold">{copy.sections.howTitle}</p>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-paper/62">{copy.sections.howText}</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {(["formiga", "lobo", "harpia"] as RiskLevel[]).map((level) => (
              <div key={level} className={`border bg-paper/[0.025] p-6 ${resultTone(level)}`}>
                <h3 className="font-serif text-3xl tracking-[-0.05em] text-paper">{copy.levels[level].label}</h3>
                <p className="mt-4 text-sm leading-7 text-paper/62">{copy.levels[level].text}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {(level === "formiga"
                    ? ["pips", "lote", "stop", "capital", "alavancagem"]
                    : level === "lobo"
                      ? ["risco", "processo", "consistência", "meta", "mercado"]
                      : ["preservação", "escala", "capital", "emoção", "estratégia"]
                  ).map((pillar) => (
                    <span key={pillar} className="border border-gold/15 bg-ink px-3 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-paper/70">
                      {pillar}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-12 md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-gold">{copy.sections.mistakes}</p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {copy.mistakes.map((mistake) => (
              <div key={mistake} className="border border-fall/20 bg-fall/[0.045] p-5">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-paper">{mistake}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-12 md:px-8">
        <div className="mx-auto max-w-7xl border border-gold/22 bg-gold/[0.055] p-6 md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-gold">Juros compostos e construção patrimonial</p>
          <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="font-serif text-4xl tracking-[-0.05em] text-paper md:text-5xl">
                Depois do risco, pense na construção de patrimônio.
              </h2>
              <p className="mt-4 max-w-4xl text-sm leading-7 text-paper/68">
                A Calculadora Forex mostra o impacto do lote, dos pips e do risco em cada operação. Para entender como aportes, tempo e juros compostos podem construir patrimônio no longo prazo, acesse a Calculadora de Juros e Construção de Patrimônio.
              </p>
            </div>
            <a
              href="/ferramentas/calculadora-juros-compostos"
              className="inline-flex w-full justify-center border border-gold bg-gold px-6 py-4 text-center text-xs font-black uppercase tracking-[0.16em] text-ink transition hover:-translate-y-0.5 hover:bg-[#d4a858] lg:w-auto"
            >
              Ir para Calculadora de Juros Compostos
            </a>
          </div>
        </div>
      </section>

      <section className="px-5 py-12 md:px-8">
        <div className="mx-auto max-w-7xl border border-gold/18 bg-paper/[0.035] p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-gold">FXPro</p>
              <h2 className="mt-4 font-serif text-4xl tracking-[-0.05em] text-paper">{copy.sections.brokerTitle}</h2>
              <p className="mt-4 text-sm leading-7 text-paper/62">{copy.sections.brokerText}</p>
              <a
                href={fxproLinks[locale] ?? fxproLinks.en}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-full justify-center border border-gold bg-gold px-6 py-4 text-xs font-black uppercase tracking-[0.16em] text-ink transition hover:-translate-y-0.5 hover:bg-[#d4a858] sm:w-auto"
              >
                {fxproButtonLabels[locale] ?? fxproButtonLabels.en}
              </a>
            </div>
            <ForexBrokerBannerWide language={locale} />
          </div>
        </div>
      </section>

      <section className="px-5 py-12 md:px-8">
        <div className="mx-auto max-w-7xl">
          <FreeChannelCTA t={t} />
        </div>
      </section>

      <section className="px-5 py-12 md:px-8">
        <div className="mx-auto max-w-7xl border border-gold/18 bg-paper/[0.03] p-6 text-sm leading-7 text-paper/58">
          {copy.disclaimer}
        </div>
      </section>

      <SupportFooter locale={locale} t={t} onLocaleChange={changeLocale} />
    </main>
  );
}

function NumberInput({
  value,
  min,
  max,
  step = 1,
  onChange,
}: {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
}) {
  return (
    <input
      type="number"
      value={Number.isFinite(value) ? value : 0}
      min={min}
      max={max}
      step={step}
      onChange={(event) => onChange(Number(event.target.value))}
      className="w-full border border-gold/20 bg-ink px-4 py-3 text-sm font-bold text-paper outline-none transition placeholder:text-paper/30 focus:border-gold"
    />
  );
}

function MoneyInput({
  value,
  currency,
  locale,
  onChange,
  onCommit,
}: {
  value: string;
  currency: Currency;
  locale: Locale;
  onChange: (value: string) => void;
  onCommit: (value: number) => void;
}) {
  return (
    <input
      type="text"
      inputMode="decimal"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      onBlur={() => onCommit(parseFlexibleNumber(value))}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          onCommit(parseFlexibleNumber(value));
          event.currentTarget.blur();
        }
      }}
      placeholder={currency === "BRL" ? "1.000,00" : "1,000.00"}
      className="w-full border border-gold/20 bg-ink px-4 py-3 text-sm font-bold text-paper outline-none transition placeholder:text-paper/30 focus:border-gold"
    />
  );
}

function Field({ label, help, children }: { label: string; help: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[10px] font-black uppercase tracking-[0.18em] text-paper/86">{label}</span>
      <span className="mt-2 block">{children}</span>
      {help ? <span className="mt-2 block text-xs leading-5 text-paper/54">{help}</span> : null}
    </label>
  );
}

function ReadOnlyBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-gold/20 bg-ink px-4 py-3">
      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-paper/70">{label}</p>
      <p className="mt-2 break-words text-sm font-black text-paper">{value}</p>
    </div>
  );
}

function ResultCard({ label, value, description }: { label: string; value: string; description?: string }) {
  return (
    <div className="border border-gold/15 bg-paper/[0.035] p-5">
      <p className="text-[10px] font-black uppercase tracking-[0.22em] text-gold">{label}</p>
      <p className="mt-3 break-words text-xl font-black text-white [text-shadow:0_0_8px_rgba(255,255,255,0.15)] md:text-2xl">{value}</p>
      {description ? <p className="mt-3 text-xs leading-5 text-paper/58">{description}</p> : null}
    </div>
  );
}

function TableSection({
  title,
  subtitle,
  topContent,
  children,
}: {
  title: string;
  subtitle?: string;
  topContent?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="px-5 py-8 md:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="font-serif text-3xl tracking-[-0.05em] text-paper md:text-4xl">{title}</h2>
        {subtitle ? <p className="mt-3 max-w-3xl text-sm leading-7 text-paper/60">{subtitle}</p> : null}
        {topContent ? <div className="mt-5">{topContent}</div> : null}
        <div className="mt-5 overflow-x-auto border border-gold/16 bg-paper/[0.025]">
          <table className="min-w-[760px] w-full text-left text-sm text-paper/72">{children}</table>
        </div>
      </div>
    </section>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="bg-paper/[0.04] px-4 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-gold">{children}</th>;
}

function Td({ children }: { children: React.ReactNode }) {
  return <td className="px-4 py-4 font-semibold text-paper/78">{children}</td>;
}




