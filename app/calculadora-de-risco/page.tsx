"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  FreeChannelCTA,
  SiteChrome,
  SupportFooter,
  fadeUp,
  useSiteLocale,
} from "../../src/components/SiteSections";
import type { Locale } from "../../src/i18n";

type Currency = "USD" | "BRL" | "EUR" | "GBP";
type RiskLevel = "harpia" | "lobo" | "formiga" | "extreme";
type Tone = "rise" | "gold" | "fall";

type RiskCopy = {
  lang: string;
  eyebrow: string;
  h1: string;
  h2: string;
  form: {
    capital: string;
    capitalHelp: string;
    lot: string;
    lotHelp: string;
    stop: string;
    stopHelp: string;
    currency: string;
    currencyHelp: string;
    button: string;
  };
  howEyebrow: string;
  howTitle: string;
  howText: string;
  usageCards: { title: string; text: string }[];
  levelsEyebrow: string;
  levelsTitle: string;
  levelsText: string;
  levelCards: { title: string; text: string; tone: string }[];
  resultLabels: {
    pipValue: string;
    tradeRisk: string;
    riskPercent: string;
    classification: string;
    accountSurvival: string;
    toZero: string;
    drawdown70: string;
    recommendation: string;
    recommendedLot: string;
    protectCapital: string;
    simulator: string;
    simulatorTitle: string;
    simulatorText: string;
    recovery: string;
    recoveryTitle: string;
    loss: string;
    remaining: string;
    neededGain: string;
    finalPanel: string;
    currentLevel: string;
    riskPerTrade: string;
    accountResistance: string;
    sustainability: string;
    survivalProbability: string;
    wrongTrades: string;
    wrongTradesToZero: string;
    wrongTradesTo70: string;
    remainingCapital: string;
    negativePips: string;
  };
  levelContent: Record<RiskLevel, {
    label: string;
    title: string;
    tone: Tone;
    recommendation: string;
    sustainability: string;
    survival: string;
  }>;
  ctaEyebrow: string;
  ctaTitle: string;
  ctaText: string;
  freeButton: string;
  signalsButton: string;
  disclaimer: string;
};

const currencySymbols: Record<Currency, string> = {
  USD: "US$",
  BRL: "R$",
  EUR: "€",
  GBP: "£",
};

const recoveryRows = [
  { loss: 10, remaining: 90 },
  { loss: 20, remaining: 80 },
  { loss: 30, remaining: 70 },
  { loss: 40, remaining: 60 },
  { loss: 50, remaining: 50 },
  { loss: 60, remaining: 40 },
  { loss: 70, remaining: 30 },
  { loss: 80, remaining: 20 },
  { loss: 90, remaining: 10 },
];

const signalsPath: Record<Locale, string> = {
  pt: "/sinais",
  en: "/en/signals",
  es: "/es/signals",
  hi: "/hi/signals",
  ar: "/ar",
  tr: "/tr",
  id: "/id/signals",
  vi: "/vi/signals",
};

const copy: Record<Locale, RiskCopy> = {
  pt: {
    lang: "pt-BR",
    eyebrow: "Calculadora de Risco",
    h1: "Calcule o risco antes de entrar na operação.",
    h2: "Entenda quanto cada stop representa na sua conta, qual nível de risco você está assumindo e qual lote combina melhor com Formiga, Lobo e Harpia.",
    form: {
      capital: "Capital total da conta",
      capitalHelp: "Capital total disponível para trading.",
      lot: "Tamanho do lote",
      lotHelp: "1.00 = lote padrão, 0.10 = mini lote, 0.01 = micro lote.",
      stop: "Stop loss em pips",
      stopHelp: "Distância do stop loss em pips.",
      currency: "Moeda da conta",
      currencyHelp: "Escolha a moeda usada para exibir o risco financeiro.",
      button: "Calcular risco",
    },
    howEyebrow: "Como usar",
    howTitle: "Como usar a Calculadora de Risco",
    howText: "Antes de entrar em uma operação, você precisa saber quanto da sua conta está em risco. A calculadora mostra quanto dinheiro você pode perder caso o stop seja atingido e classifica esse risco dentro dos níveis Formiga, Lobo e Harpia.",
    usageCards: [
      { title: "Capital da conta", text: "É o valor total disponível na sua conta de negociação. Exemplo: se você tem US$ 1.000 na corretora, esse é o capital usado no cálculo." },
      { title: "Tamanho do lote", text: "É o volume da operação. Quanto maior o lote, maior o ganho ou a perda a cada movimento do mercado." },
      { title: "Stop loss em pips", text: "É a distância entre sua entrada e o ponto onde você aceita encerrar a operação com prejuízo." },
      { title: "Nível de risco", text: "A calculadora mostra se o risco está em nível Harpia, Lobo ou Formiga para ajudar você a proteger capital." },
    ],
    levelsEyebrow: "Níveis de risco",
    levelsTitle: "O que significam os níveis de risco?",
    levelsText: "No Varejo Investidor, os níveis Formiga, Lobo e Harpia ajudam a entender o comportamento do investidor diante do risco. Quanto maior o risco por operação, menor a margem para erro.",
    levelCards: [
      { title: "Harpia", tone: "border-rise/[0.32] text-rise", text: "Risco conservador entre 0,10% e 0,30% por operação. Prioriza preservação de capital e longevidade." },
      { title: "Lobo", tone: "border-gold/[0.38] text-gold", text: "Risco moderado entre 0,31% e 1,00% por operação. Busca crescimento com controle." },
      { title: "Formiga", tone: "border-fall/[0.38] text-fall", text: "Risco alto acima de 1,00% por operação. A conta fica mais vulnerável a sequências negativas." },
    ],
    resultLabels: {
      pipValue: "Valor por pip",
      tradeRisk: "Risco da operação",
      riskPercent: "Percentual de risco",
      classification: "Classificação",
      accountSurvival: "Sobrevivência da conta",
      toZero: "Até zerar",
      drawdown70: "Drawdown de 70%",
      recommendation: "Recomendação",
      recommendedLot: "Lote recomendado por nível",
      protectCapital: "Ajuste o lote para proteger capital.",
      simulator: "Simulador",
      simulatorTitle: "Simulador de sobrevivência da conta.",
      simulatorText: "Veja quantas operações erradas consecutivas seriam necessárias para atingir perdas relevantes.",
      recovery: "Recuperação",
      recoveryTitle: "Tabela de recuperação de prejuízo.",
      loss: "Perda",
      remaining: "Capital restante",
      neededGain: "Ganho necessário para recuperar",
      finalPanel: "Consciência operacional",
      currentLevel: "Nível atual",
      riskPerTrade: "Risco por operação",
      accountResistance: "Resistência da conta",
      sustainability: "Sustentabilidade",
      survivalProbability: "Probabilidade de sobrevivência",
      wrongTrades: "operações erradas",
      wrongTradesToZero: "Operações erradas consecutivas poderiam zerar a conta.",
      wrongTradesTo70: "Operações erradas consecutivas poderiam levar a conta a 70% de perda.",
      remainingCapital: "Capital restante",
      negativePips: "pips negativos acumulados",
    },
    levelContent: {
      harpia: { label: "Harpia — Risco conservador", title: "Preservação de capital", tone: "rise", recommendation: "Você está operando com risco conservador. Esse nível prioriza preservação de capital, longevidade e consistência.", sustainability: "Alta", survival: "Alta" },
      lobo: { label: "Lobo — Risco moderado", title: "Crescimento com controle", tone: "gold", recommendation: "Você está operando com risco moderado. Esse nível busca crescimento com controle, mantendo espaço para erros.", sustainability: "Média", survival: "Moderada" },
      formiga: { label: "Formiga — Alto risco", title: "Conta vulnerável", tone: "fall", recommendation: "Você está operando com risco alto. Reduzir o lote pode aumentar sua sobrevivência no mercado.", sustainability: "Baixa", survival: "Baixa" },
      extreme: { label: "Conservador extremo", title: "Risco muito baixo", tone: "rise", recommendation: "Seu risco está abaixo de 0,10% por operação. Isso preserva bastante o capital, mas pode limitar crescimento.", sustainability: "Alta", survival: "Alta" },
    },
    ctaEyebrow: "Gestão de risco",
    ctaTitle: "Aprenda a operar com risco controlado.",
    ctaText: "A gestão de risco é uma das bases para sobreviver no mercado. No Varejo Investidor, você aprende a proteger capital, calcular lote, entender stop e evoluir pelos níveis Formiga, Lobo e Harpia.",
    freeButton: "Entrar no Canal Formiga",
    signalsButton: "Receber sinais no WhatsApp",
    disclaimer: "Esta calculadora possui finalidade educacional e utiliza uma regra simplificada de valor por pip. O valor real pode variar conforme ativo, corretora, tipo de conta, moeda da conta e condições de mercado. Operar Forex, criptomoedas, índices e outros ativos envolve risco e pode resultar em perdas.",
  },
  en: {
    lang: "en",
    eyebrow: "Risk Calculator",
    h1: "Calculate your risk before entering a trade.",
    h2: "Understand how much each stop loss can affect your account, which risk level you are taking, and which lot size fits Ant, Wolf and Eagle.",
    form: {
      capital: "Total account capital",
      capitalHelp: "Total capital available for trading.",
      lot: "Lot size",
      lotHelp: "1.00 = standard lot, 0.10 = mini lot, 0.01 = micro lot.",
      stop: "Stop loss in pips",
      stopHelp: "Distance of the stop loss in pips.",
      currency: "Account currency",
      currencyHelp: "Choose the currency used to display financial risk.",
      button: "Calculate risk",
    },
    howEyebrow: "How to use",
    howTitle: "How to use the Risk Calculator",
    howText: "Before entering a trade, you need to know how much of your account is at risk. The calculator shows how much money you may lose if the stop is hit and classifies that risk inside the Ant, Wolf and Eagle levels.",
    usageCards: [
      { title: "Account capital", text: "The total amount available in your trading account. If you have US$ 1,000 at the broker, that is the capital used in the calculation." },
      { title: "Lot size", text: "The trade volume. The larger the lot, the larger the gain or loss on each market movement." },
      { title: "Stop loss in pips", text: "The distance between your entry and the point where you accept closing the trade with a loss." },
      { title: "Risk level", text: "The calculator shows whether the risk is Eagle, Wolf or Ant, helping you protect capital." },
    ],
    levelsEyebrow: "Risk levels",
    levelsTitle: "What do the risk levels mean?",
    levelsText: "Inside Varejo Investidor, Ant, Wolf and Eagle help explain investor behavior under risk. The higher the risk per trade, the lower the margin for error.",
    levelCards: [
      { title: "Eagle", tone: "border-rise/[0.32] text-rise", text: "Conservative risk between 0.10% and 0.30% per trade. Prioritizes capital preservation and longevity." },
      { title: "Wolf", tone: "border-gold/[0.38] text-gold", text: "Moderate risk between 0.31% and 1.00% per trade. Seeks growth with control." },
      { title: "Ant", tone: "border-fall/[0.38] text-fall", text: "High risk above 1.00% per trade. The account becomes more vulnerable to negative streaks." },
    ],
    resultLabels: {
      pipValue: "Value per pip",
      tradeRisk: "Trade risk",
      riskPercent: "Risk percentage",
      classification: "Classification",
      accountSurvival: "Account survival",
      toZero: "Until account reaches zero",
      drawdown70: "70% drawdown",
      recommendation: "Recommendation",
      recommendedLot: "Recommended lot by level",
      protectCapital: "Adjust the lot to protect capital.",
      simulator: "Simulator",
      simulatorTitle: "Account survival simulator.",
      simulatorText: "See how many consecutive wrong trades would be needed to reach relevant losses.",
      recovery: "Recovery",
      recoveryTitle: "Loss recovery table.",
      loss: "Loss",
      remaining: "Remaining capital",
      neededGain: "Gain needed to recover",
      finalPanel: "Operational awareness",
      currentLevel: "Current level",
      riskPerTrade: "Risk per trade",
      accountResistance: "Account resistance",
      sustainability: "Sustainability",
      survivalProbability: "Survival probability",
      wrongTrades: "wrong trades",
      wrongTradesToZero: "Consecutive wrong trades could take the account to zero.",
      wrongTradesTo70: "Consecutive wrong trades could take the account to a 70% loss.",
      remainingCapital: "Remaining capital",
      negativePips: "negative pips accumulated",
    },
    levelContent: {
      harpia: { label: "Eagle — Conservative risk", title: "Capital preservation", tone: "rise", recommendation: "You are trading with conservative risk. This level prioritizes capital preservation, longevity and consistency.", sustainability: "High", survival: "High" },
      lobo: { label: "Wolf — Moderate risk", title: "Growth with control", tone: "gold", recommendation: "You are trading with moderate risk. This level seeks growth with control, keeping room for mistakes.", sustainability: "Medium", survival: "Moderate" },
      formiga: { label: "Ant — High risk", title: "Vulnerable account", tone: "fall", recommendation: "You are trading with high risk. Reducing the lot can increase your market survival.", sustainability: "Low", survival: "Low" },
      extreme: { label: "Extreme conservative", title: "Very low risk", tone: "rise", recommendation: "Your risk is below 0.10% per trade. This strongly preserves capital, but may limit growth.", sustainability: "High", survival: "High" },
    },
    ctaEyebrow: "Risk management",
    ctaTitle: "Learn to trade with controlled risk.",
    ctaText: "Risk management is one of the foundations for surviving in the market. At Varejo Investidor, you learn to protect capital, calculate lot size, understand stop loss and evolve through Ant, Wolf and Eagle.",
    freeButton: "Enter Formiga Channel",
    signalsButton: "Receive signals on WhatsApp",
    disclaimer: "This calculator is educational and uses a simplified pip-value rule. The real value may vary according to asset, broker, account type, account currency and market conditions. Trading Forex, crypto, indices and other assets involves risk and may result in losses.",
  },
  es: {} as RiskCopy,
  hi: {} as RiskCopy,
  ar: {} as RiskCopy,
  tr: {} as RiskCopy,
  id: {} as RiskCopy,
  vi: {} as RiskCopy,
};

copy.es = {
  ...copy.en,
  lang: "es",
  eyebrow: "Calculadora de Riesgo",
  h1: "Calcule el riesgo antes de entrar en una operación.",
  h2: "Entienda cuánto puede afectar cada stop loss a su cuenta, qué nivel de riesgo asume y qué lote encaja mejor con Hormiga, Lobo y Águila.",
  form: { capital: "Capital total de la cuenta", capitalHelp: "Capital total disponible para trading.", lot: "Tamaño del lote", lotHelp: "1.00 = lote estándar, 0.10 = mini lote, 0.01 = micro lote.", stop: "Stop loss en pips", stopHelp: "Distancia del stop loss en pips.", currency: "Moneda de la cuenta", currencyHelp: "Elija la moneda usada para mostrar el riesgo financiero.", button: "Calcular riesgo" },
  howEyebrow: "Cómo usar",
  howTitle: "Cómo usar la Calculadora de Riesgo",
  howText: "Antes de entrar en una operación, necesita saber cuánto de su cuenta está en riesgo. La calculadora muestra cuánto dinero puede perder si el stop se alcanza y clasifica ese riesgo dentro de los niveles Hormiga, Lobo y Águila.",
  usageCards: [
    { title: "Capital de la cuenta", text: "Es el valor total disponible en su cuenta de negociación." },
    { title: "Tamaño del lote", text: "Es el volumen de la operación. Cuanto mayor sea el lote, mayor será la ganancia o la pérdida." },
    { title: "Stop loss en pips", text: "Es la distancia entre su entrada y el punto donde acepta cerrar la operación con pérdida." },
    { title: "Nivel de riesgo", text: "La calculadora indica si el riesgo está en nivel Águila, Lobo u Hormiga." },
  ],
  levelsTitle: "¿Qué significan los niveles de riesgo?",
  levelsText: "En Varejo Investidor, Hormiga, Lobo y Águila ayudan a entender el comportamiento del inversor frente al riesgo.",
  levelCards: [
    { title: "Águila", tone: "border-rise/[0.32] text-rise", text: "Riesgo conservador entre 0,10% y 0,30% por operación." },
    { title: "Lobo", tone: "border-gold/[0.38] text-gold", text: "Riesgo moderado entre 0,31% y 1,00% por operación." },
    { title: "Hormiga", tone: "border-fall/[0.38] text-fall", text: "Riesgo alto por encima de 1,00% por operación." },
  ],
  resultLabels: { ...copy.en.resultLabels, pipValue: "Valor por pip", tradeRisk: "Riesgo de la operación", riskPercent: "Porcentaje de riesgo", classification: "Clasificación", accountSurvival: "Supervivencia de la cuenta", toZero: "Hasta llegar a cero", drawdown70: "Drawdown de 70%", recommendation: "Recomendación", recommendedLot: "Lote recomendado por nivel", protectCapital: "Ajuste el lote para proteger capital.", simulator: "Simulador", simulatorTitle: "Simulador de supervivencia de la cuenta.", recovery: "Recuperación", recoveryTitle: "Tabla de recuperación de pérdidas.", loss: "Pérdida", remaining: "Capital restante", neededGain: "Ganancia necesaria para recuperar", finalPanel: "Conciencia operativa", currentLevel: "Nivel actual", riskPerTrade: "Riesgo por operación", accountResistance: "Resistencia de la cuenta", sustainability: "Sostenibilidad", survivalProbability: "Probabilidad de supervivencia", wrongTrades: "operaciones erradas", wrongTradesToZero: "Operaciones erradas consecutivas podrían llevar la cuenta a cero.", wrongTradesTo70: "Operaciones erradas consecutivas podrían llevar la cuenta a una pérdida del 70%.", remainingCapital: "Capital restante", negativePips: "pips negativos acumulados" },
  levelContent: {
    harpia: { label: "Águila — Riesgo conservador", title: "Preservación de capital", tone: "rise", recommendation: "Está operando con riesgo conservador. Este nivel prioriza preservación, longevidad y consistencia.", sustainability: "Alta", survival: "Alta" },
    lobo: { label: "Lobo — Riesgo moderado", title: "Crecimiento con control", tone: "gold", recommendation: "Está operando con riesgo moderado. Este nivel busca crecimiento con control.", sustainability: "Media", survival: "Moderada" },
    formiga: { label: "Hormiga — Riesgo alto", title: "Cuenta vulnerable", tone: "fall", recommendation: "Está operando con riesgo alto. Reducir el lote puede aumentar su supervivencia.", sustainability: "Baja", survival: "Baja" },
    extreme: { label: "Conservador extremo", title: "Riesgo muy bajo", tone: "rise", recommendation: "Su riesgo está por debajo del 0,10% por operación.", sustainability: "Alta", survival: "Alta" },
  },
  ctaEyebrow: "Gestión de riesgo",
  ctaTitle: "Aprenda a operar con riesgo controlado.",
  ctaText: "La gestión de riesgo es una de las bases para sobrevivir en el mercado.",
  freeButton: "Entrar al Canal Formiga",
  signalsButton: "Recibir señales por WhatsApp",
  disclaimer: "Esta calculadora tiene finalidad educativa y utiliza una regla simplificada de valor por pip. Operar Forex, cripto, índices y otros activos implica riesgo y puede generar pérdidas.",
};

copy.hi = {
  ...copy.en,
  lang: "hi",
  eyebrow: "रिस्क कैलकुलेटर",
  h1: "ट्रेड में प्रवेश करने से पहले अपना जोखिम गणना करें।",
  h2: "समझें कि आपका स्टॉप लॉस खाते को कितना प्रभावित करता है, आप कितना जोखिम ले रहे हैं और कौन सा lot size चींटी, भेड़िया और गरुड़ के लिए उपयुक्त है।",
  form: { capital: "कुल खाता पूंजी", capitalHelp: "ट्रेडिंग के लिए उपलब्ध कुल पूंजी।", lot: "लॉट आकार", lotHelp: "1.00 = standard lot, 0.10 = mini lot, 0.01 = micro lot.", stop: "स्टॉप लॉस (पिप्स)", stopHelp: "स्टॉप लॉस की दूरी पिप्स में।", currency: "खाता मुद्रा", currencyHelp: "वित्तीय जोखिम दिखाने की मुद्रा चुनें।", button: "जोखिम की गणना करें" },
  howEyebrow: "कैसे उपयोग करें",
  howTitle: "रिस्क कैलकुलेटर का उपयोग कैसे करें",
  howText: "ट्रेड में प्रवेश करने से पहले आपको जानना चाहिए कि खाते का कितना हिस्सा जोखिम में है। कैलकुलेटर दिखाता है कि stop hit होने पर कितना नुकसान हो सकता है और जोखिम को चींटी, भेड़िया और गरुड़ स्तरों में वर्गीकृत करता है।",
  usageCards: [
    { title: "खाता पूंजी", text: "आपके ट्रेडिंग खाते में उपलब्ध कुल राशि।" },
    { title: "लॉट आकार", text: "ऑपरेशन का वॉल्यूम। लॉट जितना बड़ा होगा, हर मूवमेंट का प्रभाव उतना बड़ा होगा।" },
    { title: "स्टॉप लॉस पिप्स", text: "Entry और उस बिंदु के बीच की दूरी जहां आप नुकसान में ट्रेड बंद करते हैं।" },
    { title: "जोखिम स्तर", text: "कैलकुलेटर बताता है कि जोखिम गरुड़, भेड़िया या चींटी स्तर पर है।" },
  ],
  levelsEyebrow: "जोखिम स्तर",
  levelsTitle: "जोखिम स्तरों का अर्थ क्या है?",
  levelsText: "Varejo Investidor में चींटी, भेड़िया और गरुड़ जोखिम के सामने निवेशक के व्यवहार को समझाने में मदद करते हैं।",
  levelCards: [
    { title: "गरुड़", tone: "border-rise/[0.32] text-rise", text: "प्रति ट्रेड 0.10% से 0.30% तक conservador जोखिम।" },
    { title: "भेड़िया", tone: "border-gold/[0.38] text-gold", text: "प्रति ट्रेड 0.31% से 1.00% तक मध्यम जोखिम।" },
    { title: "चींटी", tone: "border-fall/[0.38] text-fall", text: "प्रति ट्रेड 1.00% से ऊपर उच्च जोखिम।" },
  ],
  resultLabels: { ...copy.en.resultLabels, pipValue: "प्रति पिप मूल्य", tradeRisk: "ट्रेड जोखिम", riskPercent: "जोखिम प्रतिशत", classification: "वर्गीकरण", accountSurvival: "खाते की टिकाऊ क्षमता", toZero: "खाता शून्य होने तक", drawdown70: "70% ड्रॉडाउन", recommendation: "सिफारिश", recommendedLot: "स्तर के अनुसार अनुशंसित लॉट", protectCapital: "पूंजी की रक्षा के लिए लॉट समायोजित करें।", simulator: "सिम्युलेटर", simulatorTitle: "खाता टिकाऊ क्षमता सिम्युलेटर।", recovery: "रिकवरी", recoveryTitle: "नुकसान रिकवरी तालिका।", loss: "नुकसान", remaining: "शेष पूंजी", neededGain: "रिकवरी के लिए आवश्यक लाभ", finalPanel: "ऑपरेशनल जागरूकता", currentLevel: "वर्तमान स्तर", riskPerTrade: "प्रति ट्रेड जोखिम", accountResistance: "खाता प्रतिरोध", sustainability: "स्थिरता", survivalProbability: "टिके रहने की संभावना", wrongTrades: "गलत ट्रेड", wrongTradesToZero: "लगातार गलत ट्रेड खाते को शून्य तक ले जा सकते हैं।", wrongTradesTo70: "लगातार गलत ट्रेड खाते को 70% नुकसान तक ले जा सकते हैं।", remainingCapital: "शेष पूंजी", negativePips: "नकारात्मक पिप्स जमा" },
  levelContent: {
    harpia: { label: "गरुड़ — संरक्षित जोखिम", title: "पूंजी संरक्षण", tone: "rise", recommendation: "आप संरक्षित जोखिम के साथ ट्रेड कर रहे हैं। यह स्तर पूंजी संरक्षण और consistency को प्राथमिकता देता है।", sustainability: "उच्च", survival: "उच्च" },
    lobo: { label: "भेड़िया — मध्यम जोखिम", title: "नियंत्रण के साथ वृद्धि", tone: "gold", recommendation: "आप मध्यम जोखिम के साथ ट्रेड कर रहे हैं। यह स्तर नियंत्रण के साथ विकास खोजता है।", sustainability: "मध्यम", survival: "मध्यम" },
    formiga: { label: "चींटी — उच्च जोखिम", title: "संवेदनशील खाता", tone: "fall", recommendation: "आप उच्च जोखिम के साथ ट्रेड कर रहे हैं। लॉट घटाने से खाते की टिकाऊ क्षमता बढ़ सकती है।", sustainability: "कम", survival: "कम" },
    extreme: { label: "अत्यधिक संरक्षित", title: "बहुत कम जोखिम", tone: "rise", recommendation: "आपका जोखिम प्रति ट्रेड 0.10% से नीचे है।", sustainability: "उच्च", survival: "उच्च" },
  },
  ctaEyebrow: "जोखिम प्रबंधन",
  ctaTitle: "नियंत्रित जोखिम के साथ ट्रेड करना सीखें।",
  ctaText: "जोखिम प्रबंधन बाजार में टिके रहने की बुनियाद है।",
  freeButton: "Formiga चैनल में प्रवेश करें",
  signalsButton: "WhatsApp पर सिग्नल प्राप्त करें",
  disclaimer: "यह कैलकुलेटर केवल शैक्षिक उद्देश्य के लिए है और pip value का सरल नियम उपयोग करता है। Forex, crypto, indices और अन्य assets में जोखिम होता है और नुकसान हो सकता है।",
};

copy.ar = {
  ...copy.en,
  lang: "ar",
  eyebrow: "حاسبة المخاطر",
  h1: "احسب مستوى المخاطرة قبل الدخول في الصفقة.",
  h2: "افهم مقدار تأثير وقف الخسارة على حسابك، ومستوى المخاطرة الذي تتحمله، وحجم العقد المناسب لك.",
  form: { capital: "إجمالي رأس المال", capitalHelp: "رأس المال المتاح للتداول.", lot: "حجم العقد", lotHelp: "1.00 = عقد قياسي، 0.10 = عقد مصغر، 0.01 = عقد ميكرو.", stop: "وقف الخسارة بالنقاط", stopHelp: "مسافة وقف الخسارة بالنقاط.", currency: "عملة الحساب", currencyHelp: "اختر العملة المستخدمة لعرض المخاطرة.", button: "احسب المخاطرة" },
  howEyebrow: "طريقة الاستخدام",
  howTitle: "كيفية استخدام حاسبة المخاطر",
  howText: "قبل الدخول في صفقة، يجب أن تعرف مقدار رأس المال المعرض للخطر. تعرض الحاسبة الخسارة المحتملة إذا تم ضرب الوقف وتصنف المخاطرة ضمن مستويات النملة والذئب والنسر.",
  levelsEyebrow: "مستويات المخاطر",
  levelsTitle: "ماذا تعني مستويات المخاطر؟",
  resultLabels: { ...copy.en.resultLabels, pipValue: "قيمة النقطة", tradeRisk: "مخاطرة الصفقة", riskPercent: "نسبة المخاطرة", classification: "التصنيف", accountSurvival: "استدامة الحساب", toZero: "حتى الوصول إلى الصفر", drawdown70: "تراجع 70%", recommendation: "التوصية" },
  freeButton: "ادخل قناة Formiga",
  signalsButton: "استقبل الإشارات على WhatsApp",
  disclaimer: "هذه الحاسبة تعليمية وتستخدم قاعدة مبسطة لقيمة النقطة. التداول في الفوركس والعملات الرقمية والمؤشرات ينطوي على مخاطر وقد يؤدي إلى خسائر.",
};

copy.tr = {
  ...copy.en,
  lang: "tr",
  eyebrow: "Risk Hesaplayıcı",
  h1: "İşleme girmeden önce riskinizi hesaplayın.",
  h2: "Her stop loss seviyesinin hesabınızı ne kadar etkilediğini, hangi risk seviyesinde olduğunuzu ve size uygun lot büyüklüğünü anlayın.",
  form: { capital: "Toplam sermaye", capitalHelp: "Trading için kullanılabilir toplam sermaye.", lot: "Lot büyüklüğü", lotHelp: "1.00 = standart lot, 0.10 = mini lot, 0.01 = mikro lot.", stop: "Pip cinsinden stop loss", stopHelp: "Stop loss mesafesi.", currency: "Hesap para birimi", currencyHelp: "Riski göstermek için para birimini seçin.", button: "Riski hesapla" },
  howEyebrow: "Nasıl kullanılır",
  howTitle: "Risk Hesaplayıcı nasıl kullanılır",
  howText: "İşleme girmeden önce hesabınızın ne kadarının risk altında olduğunu bilmelisiniz. Hesaplayıcı stop çalışırsa ne kadar kaybedebileceğinizi gösterir.",
  levelsEyebrow: "Risk seviyeleri",
  levelsTitle: "Risk seviyeleri ne anlama gelir?",
  resultLabels: { ...copy.en.resultLabels, pipValue: "Pip değeri", tradeRisk: "İşlem riski", riskPercent: "Risk yüzdesi", classification: "Sınıflandırma", accountSurvival: "Hesap dayanıklılığı", toZero: "Sıfırlanana kadar", drawdown70: "%70 drawdown", recommendation: "Öneri" },
  freeButton: "Formiga Kanalına Gir",
  signalsButton: "WhatsApp sinyalleri al",
  disclaimer: "Bu hesaplayıcı eğitim amaçlıdır ve basitleştirilmiş pip değeri kuralı kullanır. Forex, kripto, endeksler ve diğer varlıklar risk içerir.",
};

copy.id = {
  ...copy.en,
  lang: "id",
  eyebrow: "Kalkulator Risiko",
  h1: "Hitung risiko sebelum membuka posisi.",
  h2: "Pahami seberapa besar stop loss memengaruhi akun Anda, tingkat risiko yang Anda ambil, dan ukuran lot yang paling sesuai.",
  form: { capital: "Total modal akun", capitalHelp: "Modal total yang tersedia untuk trading.", lot: "Ukuran lot", lotHelp: "1.00 = lot standar, 0.10 = mini lot, 0.01 = micro lot.", stop: "Stop loss dalam pip", stopHelp: "Jarak stop loss dalam pip.", currency: "Mata uang akun", currencyHelp: "Pilih mata uang untuk menampilkan risiko.", button: "Hitung risiko" },
  howEyebrow: "Cara menggunakan",
  howTitle: "Cara menggunakan Kalkulator Risiko",
  howText: "Sebelum membuka posisi, Anda perlu mengetahui berapa banyak akun yang berisiko. Kalkulator menunjukkan potensi kerugian jika stop loss tersentuh.",
  levelsEyebrow: "Tingkat risiko",
  levelsTitle: "Apa arti tingkat risiko?",
  resultLabels: { ...copy.en.resultLabels, pipValue: "Nilai per pip", tradeRisk: "Risiko transaksi", riskPercent: "Persentase risiko", classification: "Klasifikasi", accountSurvival: "Daya tahan akun", toZero: "Hingga akun nol", drawdown70: "Drawdown 70%", recommendation: "Rekomendasi" },
  freeButton: "Masuk ke Channel Formiga",
  signalsButton: "Terima sinyal di WhatsApp",
  disclaimer: "Kalkulator ini bersifat edukatif dan menggunakan aturan nilai pip yang disederhanakan. Trading Forex, kripto, indeks dan aset lain memiliki risiko kerugian.",
};

copy.vi = {
  ...copy.en,
  lang: "vi",
  eyebrow: "Máy Tính Rủi Ro",
  h1: "Tính toán rủi ro trước khi vào lệnh.",
  h2: "Hiểu mức độ ảnh hưởng của stop loss đến tài khoản, mức rủi ro bạn đang chấp nhận và khối lượng lệnh phù hợp.",
  form: { capital: "Tổng vốn tài khoản", capitalHelp: "Tổng vốn có sẵn để giao dịch.", lot: "Khối lượng lot", lotHelp: "1.00 = lot tiêu chuẩn, 0.10 = mini lot, 0.01 = micro lot.", stop: "Stop loss theo pip", stopHelp: "Khoảng cách stop loss tính bằng pip.", currency: "Tiền tệ tài khoản", currencyHelp: "Chọn tiền tệ để hiển thị rủi ro.", button: "Tính rủi ro" },
  howEyebrow: "Cách sử dụng",
  howTitle: "Cách sử dụng Máy Tính Rủi Ro",
  howText: "Trước khi vào lệnh, bạn cần biết bao nhiêu phần tài khoản đang chịu rủi ro. Công cụ cho thấy số tiền có thể mất nếu stop bị chạm.",
  levelsEyebrow: "Mức rủi ro",
  levelsTitle: "Các mức rủi ro có ý nghĩa gì?",
  resultLabels: { ...copy.en.resultLabels, pipValue: "Giá trị mỗi pip", tradeRisk: "Rủi ro giao dịch", riskPercent: "Tỷ lệ rủi ro", classification: "Phân loại", accountSurvival: "Sức bền tài khoản", toZero: "Đến khi tài khoản về 0", drawdown70: "Drawdown 70%", recommendation: "Khuyến nghị" },
  freeButton: "Vào Kênh Formiga",
  signalsButton: "Nhận tín hiệu trên WhatsApp",
  disclaimer: "Công cụ này chỉ phục vụ mục đích giáo dục và sử dụng quy tắc giá trị pip đơn giản. Forex, crypto, chỉ số và tài sản khác có rủi ro thua lỗ.",
};

function formatMoney(value: number, currency: Currency, locale: Locale) {
  const intlLocale = locale === "pt" ? "pt-BR" : locale === "es" ? "es-ES" : locale === "tr" ? "tr-TR" : locale === "id" ? "id-ID" : locale === "vi" ? "vi-VN" : "en-US";
  return `${currencySymbols[currency]} ${value.toLocaleString(intlLocale, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatNumber(value: number, locale: Locale, digits = 2) {
  if (!Number.isFinite(value)) return "0";
  const intlLocale = locale === "pt" ? "pt-BR" : locale === "es" ? "es-ES" : locale === "tr" ? "tr-TR" : locale === "id" ? "id-ID" : locale === "vi" ? "vi-VN" : "en-US";
  return value.toLocaleString(intlLocale, { minimumFractionDigits: digits, maximumFractionDigits: digits });
}

function getRiskLevel(percent: number): RiskLevel {
  if (percent < 0.1) return "extreme";
  if (percent <= 0.3) return "harpia";
  if (percent <= 1) return "lobo";
  return "formiga";
}

function recommendedLot(capital: number, stopPips: number, percent: number) {
  if (capital <= 0 || stopPips <= 0) return 0;
  return (capital * (percent / 100)) / (stopPips * 10);
}

function toneClasses(tone: Tone) {
  if (tone === "rise") return "border-rise/[0.34] text-rise shadow-[0_0_34px_rgba(15,143,86,0.12)]";
  if (tone === "gold") return "border-gold/[0.42] text-gold shadow-[0_0_34px_rgba(184,137,45,0.14)]";
  return "border-fall/[0.42] text-fall shadow-[0_0_34px_rgba(199,47,47,0.12)]";
}

export default function RiskCalculatorPage() {
  const { locale, t, changeLocale } = useSiteLocale();
  const c = copy[locale] ?? copy.en;
  const [capital, setCapital] = useState(1000);
  const [lot, setLot] = useState(0.05);
  const [stopPips, setStopPips] = useState(100);
  const [currency, setCurrency] = useState<Currency>("USD");
  const [submitted, setSubmitted] = useState(true);

  const result = useMemo(() => {
    const safeCapital = Math.max(Number(capital) || 0, 0);
    const safeLot = Math.max(Number(lot) || 0, 0);
    const safeStop = Math.max(Number(stopPips) || 0, 0);
    const pipValue = safeLot * 10;
    const riskMoney = pipValue * safeStop;
    const riskPercent = safeCapital > 0 ? (riskMoney / safeCapital) * 100 : 0;
    const operationsToZero = riskMoney > 0 ? safeCapital / riskMoney : 0;
    const operationsTo70 = riskMoney > 0 ? (safeCapital * 0.7) / riskMoney : 0;
    const level = getRiskLevel(riskPercent);
    const content = c.levelContent[level];
    return {
      safeCapital,
      safeStop,
      pipValue,
      riskMoney,
      riskPercent,
      operationsToZero,
      operationsTo70,
      content,
      formigaLimitLot: recommendedLot(safeCapital, safeStop, 1),
      harpiaMin: recommendedLot(safeCapital, safeStop, 0.1),
      harpiaMax: recommendedLot(safeCapital, safeStop, 0.3),
      loboMin: recommendedLot(safeCapital, safeStop, 0.31),
      loboMax: recommendedLot(safeCapital, safeStop, 1),
    };
  }, [capital, lot, stopPips, c]);

  const survivalRows = [20, 50, 70].map((loss) => {
    const operations = result.riskMoney > 0 ? Math.floor((result.safeCapital * (loss / 100)) / result.riskMoney) : 0;
    return { loss, operations, remaining: result.safeCapital * (1 - loss / 100), accumulatedPips: operations * result.safeStop };
  });

  return (
    <main lang={c.lang} dir={locale === "ar" || locale === "ur" || locale === "fa" ? "rtl" : "ltr"} className="min-h-screen overflow-hidden bg-paper text-ink">
      <SiteChrome locale={locale} t={t} onLocaleChange={changeLocale} />

      <section className="premium-stage relative px-5 pb-14 pt-36 md:px-8 md:pb-20 md:pt-48">
        <div className="finance-particles" />
        <div className="absolute right-0 top-32 h-96 w-96 rounded-full bg-gold/[0.08] blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-gold">{c.eyebrow}</p>
            <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[0.96] tracking-[-0.06em] md:text-7xl">{c.h1}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-ink/[0.72] md:text-xl md:leading-9">{c.h2}</p>
          </motion.div>

          <motion.form
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            onSubmit={(event) => {
              event.preventDefault();
              setSubmitted(true);
            }}
            className="terminal-module border border-gold/[0.22] bg-white p-5 shadow-fine md:p-7"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                [c.form.capital, c.form.capitalHelp, capital, setCapital, "0.01"],
                [c.form.lot, c.form.lotHelp, lot, setLot, "0.01"],
                [c.form.stop, c.form.stopHelp, stopPips, setStopPips, "1"],
              ].map(([label, help, value, setter, step]) => (
                <label key={String(label)} className="block">
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-paper">{String(label)}</span>
                  <span className="mt-2 block text-sm leading-6 text-paper/[0.78]">{String(help)}</span>
                  <input
                    type="number"
                    min="0"
                    step={String(step)}
                    value={Number(value)}
                    onChange={(event) => (setter as (value: number) => void)(Number(event.target.value))}
                    className="mt-3 w-full border border-paper/[0.18] bg-paper px-4 py-4 font-mono text-lg font-bold text-paper outline-none transition focus:border-gold"
                  />
                </label>
              ))}
              <label className="block">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-paper">{c.form.currency}</span>
                <span className="mt-2 block text-sm leading-6 text-paper/[0.78]">{c.form.currencyHelp}</span>
                <select value={currency} onChange={(event) => setCurrency(event.target.value as Currency)} className="mt-3 w-full border border-paper/[0.18] bg-paper px-4 py-4 font-mono text-lg font-bold text-paper outline-none transition focus:border-gold">
                  <option value="USD">USD</option>
                  <option value="BRL">BRL</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                </select>
              </label>
            </div>
            <button type="submit" className="premium-button-gold mt-6 w-full border border-gold bg-gold px-6 py-4 text-sm font-black uppercase tracking-[0.18em] text-ink transition hover:-translate-y-0.5">
              {c.form.button}
            </button>
          </motion.form>
        </div>
      </section>

      <section className="border-y border-ink/[0.08] bg-white px-5 py-14 md:px-8 md:py-18">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-gold">{c.howEyebrow}</p>
            <h2 className="mt-4 font-serif text-4xl leading-[1.03] tracking-[-0.05em] md:text-6xl">{c.howTitle}</h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-paper/[0.76]">{c.howText}</p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {c.usageCards.map((card, index) => (
              <motion.article key={card.title} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: index * 0.04 }} variants={fadeUp} className="terminal-module border border-gold/[0.18] bg-paper p-6 shadow-fine">
                <p className="font-mono text-xs font-black uppercase tracking-[0.22em] text-gold">0{index + 1}</p>
                <h3 className="mt-4 font-serif text-3xl tracking-[-0.04em] text-paper">{card.title}</h3>
                <p className="mt-4 text-sm leading-7 text-paper/[0.72]">{card.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 md:px-8 md:py-18">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-gold">{c.levelsEyebrow}</p>
            <h2 className="mt-4 font-serif text-4xl leading-[1.03] tracking-[-0.05em] md:text-6xl">{c.levelsTitle}</h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-paper/[0.76]">{c.levelsText}</p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {c.levelCards.map((card) => (
              <article key={card.title} className={`terminal-module border bg-white p-6 shadow-fine ${card.tone}`}>
                <h3 className="font-serif text-4xl tracking-[-0.05em]">{card.title}</h3>
                <p className="mt-4 text-base leading-8 text-paper/[0.72]">{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {submitted ? (
        <>
          <section className="px-5 py-12 md:px-8 md:py-16">
            <div className="mx-auto max-w-7xl">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[
                  [c.resultLabels.pipValue, `${formatMoney(result.pipValue, currency, locale)} / pip`],
                  [c.resultLabels.tradeRisk, formatMoney(result.riskMoney, currency, locale)],
                  [c.resultLabels.riskPercent, `${formatNumber(result.riskPercent, locale)}%`],
                  [c.resultLabels.classification, result.content.label],
                ].map(([label, value], index) => (
                  <motion.article key={label} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: index * 0.04 }} variants={fadeUp} className={`terminal-module border p-6 shadow-fine ${label === c.resultLabels.classification ? toneClasses(result.content.tone) : ""}`} style={{ background: "rgba(255,255,255,0.02)", borderColor: label === c.resultLabels.classification ? undefined : "rgba(212,166,58,0.15)" }}>
                    <p className="text-xs font-black uppercase tracking-[0.22em]" style={{ color: "#D4A63A" }}>{label}</p>
                    <p className="mt-4 font-mono text-2xl leading-tight" style={{ color: "#FFFFFF", fontWeight: 700, textShadow: "0 0 8px rgba(255,255,255,0.15)" }}>{value}</p>
                  </motion.article>
                ))}
              </div>

              <div className="mt-6 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
                <article className="terminal-module border border-ink/[0.12] bg-white p-6 shadow-fine">
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-gold">{c.resultLabels.accountSurvival}</p>
                  <h2 className="mt-4 font-serif text-4xl tracking-[-0.045em]">{result.content.title}</h2>
                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <div className="border border-ink/[0.1] bg-paper p-5">
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ink/[0.48]">{c.resultLabels.toZero}</p>
                      <p className="mt-2 font-mono text-2xl font-black">{Math.floor(result.operationsToZero)} {c.resultLabels.wrongTrades}</p>
                      <p className="mt-2 text-sm leading-6 text-ink/[0.58]">{c.resultLabels.wrongTradesToZero}</p>
                    </div>
                    <div className="border border-fall/[0.22] bg-paper p-5">
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-fall">{c.resultLabels.drawdown70}</p>
                      <p className="mt-2 font-mono text-2xl font-black">{Math.floor(result.operationsTo70)} {c.resultLabels.wrongTrades}</p>
                      <p className="mt-2 text-sm leading-6 text-ink/[0.58]">{c.resultLabels.wrongTradesTo70}</p>
                    </div>
                  </div>
                </article>
                <article className={`terminal-module border bg-white p-6 shadow-fine ${toneClasses(result.content.tone)}`}>
                  <p className="text-xs font-black uppercase tracking-[0.22em]">{c.resultLabels.recommendation}</p>
                  <p className="mt-4 text-lg leading-8 text-ink/[0.72]">{result.content.recommendation}</p>
                </article>
              </div>
            </div>
          </section>

          <section className="border-y border-ink/[0.08] bg-white px-5 py-14 md:px-8 md:py-18">
            <div className="mx-auto max-w-7xl">
              <div className="max-w-3xl">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-gold">{c.resultLabels.recommendedLot}</p>
                <h2 className="mt-4 font-serif text-4xl leading-[1.02] tracking-[-0.05em] md:text-6xl">{c.resultLabels.protectCapital}</h2>
              </div>
              <div className="mt-8 grid gap-5 md:grid-cols-3">
                {[
                  [c.levelCards[0].title, "0.10% - 0.30%", `${formatNumber(result.harpiaMin, locale, 3)} - ${formatNumber(result.harpiaMax, locale, 3)} lot`, "border-rise/[0.28]"],
                  [c.levelCards[1].title, "0.31% - 1.00%", `${formatNumber(result.loboMin, locale, 3)} - ${formatNumber(result.loboMax, locale, 3)} lot`, "border-gold/[0.34]"],
                  [c.levelCards[2].title, "> 1.00%", `> ${formatNumber(result.formigaLimitLot, locale, 3)} lot`, "border-fall/[0.34]"],
                ].map(([level, range, lotRange, border]) => (
                  <article key={level} className={`terminal-module border ${border} bg-paper p-6`}>
                    <p className="font-serif text-3xl tracking-[-0.04em]">{level}</p>
                    <p className="mt-2 text-sm font-bold uppercase tracking-[0.16em] text-ink/[0.48]">{range}</p>
                    <p className="mt-5 font-mono text-2xl font-black text-gold">{lotRange}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="px-5 py-14 md:px-8 md:py-18">
            <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.3em] text-gold">{c.resultLabels.simulator}</p>
                <h2 className="mt-4 font-serif text-4xl leading-[1.03] tracking-[-0.05em] md:text-6xl">{c.resultLabels.simulatorTitle}</h2>
                <p className="mt-5 max-w-2xl leading-8 text-ink/[0.64]">{c.resultLabels.simulatorText}</p>
              </div>
              <div className="grid gap-4">
                {survivalRows.map((row) => (
                  <article key={row.loss} className="terminal-module border border-ink/[0.12] bg-white p-5 shadow-fine">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div>
                        <p className="font-mono text-3xl font-black text-fall">-{row.loss}%</p>
                        <p className="mt-1 text-sm text-ink/[0.55]">{c.resultLabels.remainingCapital}: {formatMoney(row.remaining, currency, locale)}</p>
                      </div>
                      <div className="text-left md:text-right">
                        <p className="font-mono text-xl font-black">{row.operations} {c.resultLabels.wrongTrades}</p>
                        <p className="mt-1 text-sm text-ink/[0.55]">{row.accumulatedPips} {c.resultLabels.negativePips}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="border-y border-ink/[0.08] bg-white px-5 py-14 md:px-8 md:py-18">
            <div className="mx-auto max-w-7xl">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-gold">{c.resultLabels.recovery}</p>
              <h2 className="mt-4 font-serif text-4xl leading-[1.03] tracking-[-0.05em] md:text-6xl">{c.resultLabels.recoveryTitle}</h2>
              <div className="mt-8 overflow-x-auto border border-ink/[0.12] bg-paper shadow-fine">
                <table className="w-full min-w-[680px] border-collapse text-left">
                  <thead className="border-b border-ink/[0.1] text-xs uppercase tracking-[0.18em] text-gold">
                    <tr><th className="px-5 py-4">{c.resultLabels.loss}</th><th className="px-5 py-4">{c.resultLabels.remaining}</th><th className="px-5 py-4">{c.resultLabels.neededGain}</th></tr>
                  </thead>
                  <tbody>
                    {recoveryRows.map((row) => {
                      const recovery = (row.loss / row.remaining) * 100;
                      return (
                        <tr key={row.loss} className="border-b border-ink/[0.08]">
                          <td className="px-5 py-4 font-mono font-black text-fall">-{row.loss}%</td>
                          <td className="px-5 py-4 font-mono font-bold">{row.remaining}%</td>
                          <td className="px-5 py-4 font-mono font-black text-gold">+{formatNumber(recovery, locale)}%</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section className="px-5 py-14 md:px-8 md:py-18">
            <div className="mx-auto max-w-7xl">
              <div className="terminal-module relative overflow-hidden border border-gold/[0.24] bg-ink p-6 text-paper shadow-premium md:p-10">
                <div className="absolute inset-0 terminal-grid opacity-25" />
                <div className="relative grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.3em] text-gold">{c.resultLabels.finalPanel}</p>
                    <h2 className="mt-4 font-serif text-4xl leading-[1.02] tracking-[-0.05em] md:text-6xl">{result.content.title}</h2>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    {[
                      [c.resultLabels.currentLevel, result.content.label],
                      [c.resultLabels.riskPerTrade, `${formatNumber(result.riskPercent, locale)}%`],
                      [c.resultLabels.accountResistance, `${Math.floor(result.operationsTo70)} ${c.resultLabels.wrongTrades}`],
                      [c.resultLabels.sustainability, result.content.sustainability],
                      [c.resultLabels.survivalProbability, result.content.survival],
                    ].map(([label, value]) => (
                      <div key={label} className="border border-paper/[0.1] bg-paper/[0.04] p-4">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-paper/[0.46]">{label}</p>
                        <p className="mt-2 font-mono text-lg font-black text-gold">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : null}

      <section className="px-5 py-14 md:px-8 md:py-18">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="relative mx-auto max-w-7xl overflow-hidden border border-gold/[0.24] bg-white p-6 shadow-fine md:p-10">
          <div className="absolute inset-0 terminal-grid opacity-20" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-gold">{c.ctaEyebrow}</p>
              <h2 className="mt-4 max-w-4xl font-serif text-4xl leading-[1.03] tracking-[-0.05em] md:text-6xl">{c.ctaTitle}</h2>
              <p className="mt-5 max-w-3xl leading-8 text-ink/[0.66]">{c.ctaText}</p>
            </div>
            <div className="flex w-full flex-col gap-3 lg:w-[320px]">
              <a href={t.freeChannel.link} target="_blank" rel="noopener noreferrer" className="premium-button-gold border border-gold bg-gold px-6 py-4 text-center text-sm font-black uppercase tracking-[0.16em] text-ink transition hover:-translate-y-0.5">{c.freeButton}</a>
              <a href={signalsPath[locale]} className="border border-ink/[0.18] bg-paper px-6 py-4 text-center text-sm font-black uppercase tracking-[0.16em] text-paper transition hover:-translate-y-0.5 hover:border-gold hover:text-gold">{c.signalsButton}</a>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="px-5 pb-10 md:px-8 md:pb-14">
        <div className="mx-auto max-w-7xl border border-ink/[0.1] bg-white p-5 text-sm leading-7 text-ink/[0.64] shadow-fine">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-gold">Disclaimer</p>
          <p className="mt-3">{c.disclaimer}</p>
        </div>
      </section>

      <section className="px-5 py-10 md:px-8 md:py-12">
        <div className="mx-auto max-w-7xl">
          <FreeChannelCTA t={t} />
        </div>
      </section>
      <SupportFooter t={t} locale={locale} onLocaleChange={changeLocale} />
    </main>
  );
}
