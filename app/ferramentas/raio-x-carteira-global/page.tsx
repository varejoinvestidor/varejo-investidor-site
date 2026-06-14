"use client";

import { useMemo, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import {
  FreeChannelCTA,
  SiteChrome,
  SupportFooter,
  fadeUp,
  useSiteLocale,
} from "../../../src/components/SiteSections";
import type { Locale } from "../../../src/i18n";

type AssetId =
  | "fixedIncome"
  | "realEstateFunds"
  | "stocks"
  | "etfs"
  | "crypto"
  | "forex"
  | "commodities"
  | "cash"
  | "other";

type CurrencyCode =
  | "BRL"
  | "USD"
  | "EUR"
  | "GBP"
  | "CHF"
  | "JPY"
  | "KRW"
  | "CNY"
  | "INR"
  | "AED"
  | "SAR"
  | "CAD"
  | "AUD"
  | "MXN"
  | "ARS"
  | "CLP"
  | "COP"
  | "TRY"
  | "IDR"
  | "VND"
  | "THB"
  | "RUB"
  | "PKR"
  | "BDT"
  | "BTC"
  | "ETH"
  | "USDT";

type CountryCode =
  | "BR"
  | "US"
  | "CA"
  | "GB"
  | "PT"
  | "ES"
  | "FR"
  | "DE"
  | "CH"
  | "AE"
  | "SA"
  | "IN"
  | "CN"
  | "JP"
  | "KR"
  | "SG"
  | "AU"
  | "MX"
  | "AR"
  | "CL"
  | "CO"
  | "TR"
  | "ID"
  | "VN"
  | "TH"
  | "RU"
  | "PK"
  | "BD"
  | "GL";

type RegionId =
  | "northAmerica"
  | "latinAmerica"
  | "europe"
  | "middleEast"
  | "asia"
  | "global";

type AssetInput = {
  id: AssetId;
  value: number;
  valueText: string;
  currency: CurrencyCode;
  country: CountryCode;
  assetType: string;
  custody: string;
  note: string;
};

type Copy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  intro: string;
  howTitle: string;
  howTextA: string;
  howTextB: string;
  cards: {
    capital: string;
    assetClass: string;
    country: string;
    currency: string;
    sector: string;
    diversification: string;
  };
  cardDescriptions: {
    capital: string;
    assetClass: string;
    country: string;
    currency: string;
    sector: string;
    diversification: string;
  };
  formTitle: string;
  formText: string;
  valueInvested: string;
  investedCurrency: string;
  mainCountry: string;
  mainSector: string;
  optionalNote: string;
  optionalPlaceholder: string;
  resultsTitle: string;
  resultsText: string;
  totalCapital: string;
  topAsset: string;
  topCountry: string;
  topCurrency: string;
  topSector: string;
  internationalShare: string;
  strongCurrencyShare: string;
  riskAssetsShare: string;
  diversificationLevel: string;
  varejoClassification: string;
  chartsTitle: string;
  chartsText: string;
  byAsset: string;
  byCountry: string;
  byCurrency: string;
  bySector: string;
  globalMap: string;
  pillars: string;
  mapTitle: string;
  mapText: string;
  levelsTitle: string;
  levelsText: string;
  levelNames: Record<"formiga" | "lobo" | "harpia", string>;
  levelDescriptions: Record<"formiga" | "lobo" | "harpia", string>;
  behaviorTitle: string;
  behaviorText: string;
  alertsTitle: string;
  recommendationsTitle: string;
  ctaTitle: string;
  ctaText: string;
  formigaButton: string;
  servicesButton: string;
  disclaimer: string;
  noData: string;
  concentrationLabel: string;
  protectedCapital: string;
  globalVision: string;
  monthlyReview: string;
  localDependency: string;
};

const assetDefinitions: Array<{ id: AssetId; key: keyof Copy["cards"] | null; label: string; description: string }> = [
  { id: "fixedIncome", key: null, label: "Renda fixa", description: "Títulos públicos, CDBs, bonds, treasuries e renda fixa local ou internacional." },
  { id: "realEstateFunds", key: null, label: "Fundos imobiliários", description: "FIIs, REITs e ativos ligados ao mercado imobiliário." },
  { id: "stocks", key: null, label: "Ações", description: "Empresas listadas em bolsa." },
  { id: "etfs", key: null, label: "ETFs", description: "Fundos negociados em bolsa que representam índices, setores, países ou estratégias." },
  { id: "crypto", key: null, label: "Criptomoedas", description: "Bitcoin, Ethereum, stablecoins e outros criptoativos." },
  { id: "forex", key: null, label: "Forex", description: "Capital usado para operações ou exposição em moedas globais." },
  { id: "commodities", key: null, label: "Commodities", description: "Ouro, petróleo, prata, cobre, agrícolas e ativos ligados a recursos naturais." },
  { id: "cash", key: null, label: "Caixa / reserva", description: "Dinheiro disponível, liquidez imediata ou reserva de emergência." },
  { id: "other", key: null, label: "Outros", description: "Qualquer outro investimento que não se encaixe nas categorias acima." },
];

const assetTypeOptions: Record<AssetId, string[]> = {
  fixedIncome: ["Tesouro Direto", "CDB", "LCI / LCA", "Debêntures", "CRI / CRA", "Bonds", "Treasuries", "Renda fixa internacional", "Caixa remunerado", "Outro"],
  realEstateFunds: ["FIIs de tijolo", "FIIs de papel", "FIIs híbridos", "FI-Infra", "REITs", "Fundos imobiliários internacionais", "Outro"],
  stocks: ["Tecnologia", "Bancos", "Energia", "Petróleo e gás", "Mineração", "Saúde", "Consumo", "Indústria", "Infraestrutura", "Agronegócio", "Dividendos", "Small caps", "Blue chips", "Ações internacionais", "Outro"],
  etfs: ["S&P 500", "Nasdaq", "Dow Jones", "MSCI World", "Mercados emergentes", "ETFs de dividendos", "ETFs de tecnologia", "ETFs de renda fixa", "ETFs de commodities", "ETFs de cripto", "ETFs globais", "Outro"],
  crypto: ["Bitcoin", "Ethereum", "Solana", "BNB", "XRP", "Cardano", "Stablecoins", "DeFi", "Layer 1", "Layer 2", "Memecoins", "Tokens de exchange", "Criptoativos diversificados", "Outro"],
  forex: ["EUR/USD", "GBP/USD", "USD/JPY", "USD/CHF", "AUD/USD", "NZD/USD", "USD/CAD", "EUR/JPY", "GBP/JPY", "XAU/USD", "USOIL", "Índices", "Conta operacional Forex", "Outro"],
  commodities: ["Ouro", "Prata", "Petróleo", "Gás natural", "Cobre", "Minério de ferro", "Soja", "Milho", "Café", "Trigo", "Algodão", "Commodities agrícolas", "Commodities metálicas", "Commodities energéticas", "Outro"],
  cash: ["Conta corrente", "Conta remunerada", "Poupança", "Fundo DI", "Tesouro Selic", "Stablecoin", "Dólar em conta", "Reserva em espécie", "Outro"],
  other: ["Previdência privada", "Empresa própria", "Imóveis físicos", "Terrenos", "Participações privadas", "Startups", "Consórcio", "Seguro com reserva", "Outro"],
};

const custodyOptions: Record<AssetId, string[]> = {
  fixedIncome: ["Banco", "Corretora", "Tesouro Direto", "Plataforma internacional", "Outro"],
  realEstateFunds: ["Corretora brasileira", "Corretora internacional", "Banco", "Outro"],
  stocks: ["Corretora brasileira", "Corretora americana", "Corretora internacional", "Banco", "Outro"],
  etfs: ["Corretora brasileira", "Corretora americana", "Corretora internacional", "Banco", "Outro"],
  crypto: ["Binance", "Coinbase", "OKX", "Bybit", "Kraken", "Mercado Bitcoin", "Foxbit", "Carteira própria", "Cold wallet", "Outro"],
  forex: ["FxPro", "IC Markets", "Pepperstone", "XM", "Exness", "AvaTrade", "OANDA", "MetaTrader", "Corretora Forex", "Outro"],
  commodities: ["Corretora Forex", "Corretora de futuros", "ETF", "Banco", "Corretora internacional", "Outro"],
  cash: ["Banco", "Corretora", "Carteira digital", "Conta internacional", "Exchange", "Outro"],
  other: ["Banco", "Corretora", "Empresa", "Imóvel próprio", "Contrato privado", "Outro"],
};

const custodyCategoryLabels = {
  bank: "Bancos",
  broker: "Corretoras",
  internationalBroker: "Corretoras internacionais",
  exchange: "Exchanges cripto",
  forexBroker: "Corretoras Forex",
  selfCustody: "Carteira própria",
  other: "Outros",
} as const;

const countries: Array<{ code: CountryCode; name: string; region: RegionId }> = [
  { code: "BR", name: "Brasil", region: "latinAmerica" },
  { code: "US", name: "Estados Unidos", region: "northAmerica" },
  { code: "CA", name: "Canada", region: "northAmerica" },
  { code: "GB", name: "Reino Unido", region: "europe" },
  { code: "PT", name: "Portugal", region: "europe" },
  { code: "ES", name: "Espanha", region: "europe" },
  { code: "FR", name: "Franca", region: "europe" },
  { code: "DE", name: "Alemanha", region: "europe" },
  { code: "CH", name: "Suica", region: "europe" },
  { code: "AE", name: "Emirados Arabes Unidos", region: "middleEast" },
  { code: "SA", name: "Arabia Saudita", region: "middleEast" },
  { code: "IN", name: "India", region: "asia" },
  { code: "CN", name: "China", region: "asia" },
  { code: "JP", name: "Japao", region: "asia" },
  { code: "KR", name: "Coreia do Sul", region: "asia" },
  { code: "SG", name: "Singapura", region: "asia" },
  { code: "AU", name: "Australia", region: "asia" },
  { code: "MX", name: "Mexico", region: "latinAmerica" },
  { code: "AR", name: "Argentina", region: "latinAmerica" },
  { code: "CL", name: "Chile", region: "latinAmerica" },
  { code: "CO", name: "Colombia", region: "latinAmerica" },
  { code: "TR", name: "Turquia", region: "middleEast" },
  { code: "ID", name: "Indonesia", region: "asia" },
  { code: "VN", name: "Vietna", region: "asia" },
  { code: "TH", name: "Tailandia", region: "asia" },
  { code: "RU", name: "Russia", region: "europe" },
  { code: "PK", name: "Paquistao", region: "asia" },
  { code: "BD", name: "Bangladesh", region: "asia" },
  { code: "GL", name: "Global / Internacional", region: "global" },
];

const currencies: CurrencyCode[] = [
  "BRL",
  "USD",
  "EUR",
  "GBP",
  "CHF",
  "JPY",
  "KRW",
  "CNY",
  "INR",
  "AED",
  "SAR",
  "CAD",
  "AUD",
  "MXN",
  "ARS",
  "CLP",
  "COP",
  "TRY",
  "IDR",
  "VND",
  "THB",
  "RUB",
  "PKR",
  "BDT",
  "BTC",
  "ETH",
  "USDT",
];

const regionNames: Record<RegionId, string> = {
  northAmerica: "America do Norte",
  latinAmerica: "America Latina",
  europe: "Europa",
  middleEast: "Oriente Medio",
  asia: "Asia",
  global: "Global",
};

const currencySymbols: Partial<Record<CurrencyCode, string>> = {
  BRL: "R$",
  USD: "US$",
  EUR: "EUR",
  GBP: "GBP",
  CHF: "CHF",
  JPY: "JPY",
  KRW: "KRW",
  CNY: "CNY",
  INR: "INR",
  AED: "AED",
  SAR: "SAR",
  CAD: "CAD",
  AUD: "AUD",
  MXN: "MXN",
  ARS: "ARS",
  CLP: "CLP",
  COP: "COP",
  TRY: "TRY",
  IDR: "IDR",
  VND: "VND",
  THB: "THB",
  RUB: "RUB",
  PKR: "PKR",
  BDT: "BDT",
  BTC: "BTC",
  ETH: "ETH",
  USDT: "USDT",
};

const strongCurrencies = new Set<CurrencyCode>(["USD", "EUR", "GBP", "CHF", "JPY", "USDT"]);
const riskAssets = new Set<AssetId>(["stocks", "etfs", "crypto", "forex", "commodities", "realEstateFunds"]);
const colorScale = ["#c6994a", "#16a34a", "#3b82f6", "#ef4444", "#8b5cf6", "#f97316", "#14b8a6", "#eab308", "#94a3b8"];

const copyByLocale: Record<Locale, Copy> = {
  pt: {
    eyebrow: "Ferramenta educacional",
    title: "Raio-X da Carteira Global",
    subtitle: "Entenda onde seu dinheiro está alocado, quais mercados dominam sua carteira e como seu patrimônio está posicionado no mundo.",
    intro: "Preencha seus investimentos por classe de ativo, país, moeda, tipo de ativo e instituição. A ferramenta transforma sua carteira em gráficos visuais para mostrar concentração, diversificação, risco e posicionamento global.",
    howTitle: "Como usar esta ferramenta",
    howTextA: "Você não precisa ser especialista. Basta informar quanto possui em cada tipo de investimento. A ferramenta organiza os dados e mostra, de forma visual, como sua carteira está distribuída.",
    howTextB: "Se grande parte do seu dinheiro está em apenas um mercado, país, moeda ou instituição, sua carteira pode estar concentrada. Se o capital está dividido entre diferentes ativos, países, moedas e locais de custódia, você começa a construir uma visão mais global.",
    cards: {
      capital: "Capital total",
      assetClass: "Classe de ativo",
      country: "País",
      currency: "Moeda",
      sector: "Tipo / ativo",
      diversification: "Diversificação",
    },
    cardDescriptions: {
      capital: "É a soma de todos os seus investimentos.",
      assetClass: "Mostra se seu dinheiro está em renda fixa, ações, ETFs, cripto, Forex, fundos imobiliários ou outros mercados.",
      country: "Mostra em quais economias seu patrimônio está exposto.",
      currency: "Mostra se sua carteira depende apenas da moeda local ou se possui exposição internacional.",
      sector: "Mostra se seu capital está concentrado em um tipo de ativo específico, como Bitcoin, Tesouro Direto, ETFs globais ou ações internacionais.",
      diversification: "Mostra se sua carteira depende de poucos ativos ou se está melhor distribuída.",
    },
    formTitle: "Preencha sua carteira",
    formText: "Adicione os valores da sua carteira por classe de ativo. Quanto mais fiel for o preenchimento, melhor será o diagnóstico de concentração, custódia e diversificação.",
    valueInvested: "Valor investido",
    investedCurrency: "Moeda",
    mainCountry: "País principal",
    mainSector: "Tipo / Ativo principal",
    optionalNote: "Observação opcional",
    optionalPlaceholder: "Ex.: ETF global, caixa para oportunidades, posição de longo prazo...",
    resultsTitle: "Resultado do raio-x",
    resultsText: "Veja onde sua carteira está concentrada, quanta exposição internacional você possui e como o Varejo Investidor classifica sua diversificação.",
    totalCapital: "Capital total da carteira",
    topAsset: "Maior concentração por classe",
    topCountry: "Maior concentração por país",
    topCurrency: "Maior concentração por moeda",
    topSector: "Maior concentração por tipo de ativo",
    internationalShare: "Percentual internacional",
    strongCurrencyShare: "Percentual em moeda forte",
    riskAssetsShare: "Percentual em ativos de risco",
    diversificationLevel: "Nível de diversificação",
    varejoClassification: "Classificação Varejo Investidor",
    chartsTitle: "Visualização da carteira",
    chartsText: "Os gráficos abaixo mostram como seu capital está dividido. Use esta leitura para enxergar concentrações que passam despercebidas no dia a dia.",
    byAsset: "Distribuição por classe de ativo",
    byCountry: "Distribuição por país",
    byCurrency: "Distribuição por moeda",
    bySector: "Distribuição por tipo / ativo",
    globalMap: "Mapa visual da carteira",
    pillars: "Pilares da carteira",
    mapTitle: "Mapa visual global",
    mapText: "Veja por região onde sua carteira está posicionada. Quanto mais seu patrimônio sai de um único país, mais global tende a ficar sua visão patrimonial.",
    levelsTitle: "Leitura Formiga, Lobo e Harpia",
    levelsText: "A classificação abaixo observa concentração, moedas fortes, exposição internacional e distribuição entre ativos. Não é nota de performance, é uma leitura de estrutura patrimonial.",
    levelNames: { formiga: "Formiga", lobo: "Lobo", harpia: "Harpia" },
    levelDescriptions: {
      formiga: "Carteira ainda concentrada, muito dependente da moeda local ou de poucas classes de ativo.",
      lobo: "Carteira em transição, com diversificação moderada e alguma exposição internacional.",
      harpia: "Carteira mais equilibrada, com moedas fortes, ativos diversos e visão global mais clara.",
    },
    behaviorTitle: "Perfil atual da carteira",
    behaviorText: "A ferramenta estima o comportamento predominante da sua carteira para mostrar se ela prioriza liquidez, crescimento, proteção ou exposição global.",
    alertsTitle: "Alertas de concentração",
    recommendationsTitle: "Recomendações educacionais",
    ctaTitle: "Comece sua evolução com mais clareza patrimonial.",
    ctaText: "Use o raio-x para entender sua carteira. Depois entre no Canal Formiga para receber análises econômicas, conteúdos educacionais e atualizações sobre os mercados globais.",
    formigaButton: "Entrar no Canal Formiga",
    servicesButton: "Conhecer serviços",
    disclaimer: "Ferramenta educacional. O raio-x da carteira não representa recomendação de compra, venda ou rebalanceamento. Os dados dependem exclusivamente do preenchimento do usuário e servem para leitura patrimonial, diversificação e entendimento de risco.",
    noData: "Sem dados suficientes",
    concentrationLabel: "Concentração",
    protectedCapital: "Patrimônio protegido",
    globalVision: "Visão global",
    monthlyReview: "Revisão mensal",
    localDependency: "Dependência local",
  },
  en: {
    eyebrow: "Educational tool",
    title: "Global Portfolio X-Ray",
    subtitle: "Understand where your money is allocated, which markets dominate your portfolio and how your wealth is positioned around the world.",
    intro: "Fill in your investments by asset class, country, currency, asset type and institution. The tool turns your portfolio into visual charts to show concentration, diversification, custody risk and global positioning.",
    howTitle: "How to use this tool",
    howTextA: "You do not need to be an expert. Simply enter how much you have in each investment type. The tool organizes the data and visually shows how your portfolio is distributed.",
    howTextB: "If most of your money is in only one market, country, currency or institution, your portfolio may be concentrated. If your capital is spread across assets, countries, currencies and custody locations, you begin to build a more global view.",
    cards: {
      capital: "Total capital",
      assetClass: "Asset class",
      country: "Country",
      currency: "Currency",
      sector: "Type / asset",
      diversification: "Diversification",
    },
    cardDescriptions: {
      capital: "The total of all your investments.",
      assetClass: "Shows whether your money is in fixed income, stocks, ETFs, crypto, Forex, real estate funds or other markets.",
      country: "Shows which economies your wealth is exposed to.",
      currency: "Shows whether your portfolio depends only on your local currency or already has international exposure.",
      sector: "Shows whether your capital is concentrated in a specific type of asset, such as Bitcoin, Treasuries, global ETFs or international stocks.",
      diversification: "Shows whether your portfolio depends on a few assets or is better distributed.",
    },
    formTitle: "Fill in your portfolio",
    formText: "Add the values of your portfolio by asset class. The more accurate the inputs, the better the concentration, custody and diversification diagnosis will be.",
    valueInvested: "Invested amount",
    investedCurrency: "Currency",
    mainCountry: "Main country",
    mainSector: "Type / main asset",
    optionalNote: "Optional note",
    optionalPlaceholder: "Ex: global ETF, cash for opportunities, long-term position...",
    resultsTitle: "Portfolio x-ray results",
    resultsText: "See where your portfolio is concentrated, how much international exposure you have and how Varejo Investidor classifies your diversification.",
    totalCapital: "Total portfolio capital",
    topAsset: "Largest concentration by asset",
    topCountry: "Largest concentration by country",
    topCurrency: "Largest concentration by currency",
    topSector: "Largest concentration by asset type",
    internationalShare: "International share",
    strongCurrencyShare: "Strong-currency share",
    riskAssetsShare: "Risk asset share",
    diversificationLevel: "Diversification level",
    varejoClassification: "Varejo Investidor classification",
    chartsTitle: "Portfolio visualization",
    chartsText: "The charts below show how your capital is split. Use them to spot concentrations that may go unnoticed in daily life.",
    byAsset: "Allocation by asset class",
    byCountry: "Allocation by country",
    byCurrency: "Allocation by currency",
    bySector: "Allocation by type / asset",
    globalMap: "Portfolio world map",
    pillars: "Portfolio pillars",
    mapTitle: "Global map view",
    mapText: "See how your portfolio is positioned by region. The more your wealth moves away from a single country, the more global your wealth vision tends to become.",
    levelsTitle: "Ant, Wolf and Harpy reading",
    levelsText: "The classification below looks at concentration, strong currencies, international exposure and distribution across assets. It is not a performance score. It is a structural wealth reading.",
    levelNames: { formiga: "Ant", lobo: "Wolf", harpia: "Harpy" },
    levelDescriptions: {
      formiga: "Portfolio still concentrated, highly dependent on local currency or on a small number of asset classes.",
      lobo: "Portfolio in transition, with moderate diversification and some international exposure.",
      harpia: "More balanced portfolio, with strong currencies, different assets and a clearer global wealth view.",
    },
    behaviorTitle: "Current portfolio profile",
    behaviorText: "The tool estimates the prevailing behavior of your portfolio to show whether it prioritizes liquidity, growth, protection or global exposure.",
    alertsTitle: "Concentration alerts",
    recommendationsTitle: "Educational recommendations",
    ctaTitle: "Build your wealth path with more clarity.",
    ctaText: "Use the x-ray to understand your portfolio. Then join the Formiga Channel to receive economic analysis, educational content and global market updates.",
    formigaButton: "Join Formiga Channel",
    servicesButton: "Explore services",
    disclaimer: "Educational tool. This portfolio x-ray is not a buy, sell or rebalance recommendation. The output depends entirely on user input and exists to support wealth reading, diversification awareness and risk understanding.",
    noData: "Not enough data",
    concentrationLabel: "Concentration",
    protectedCapital: "Protected wealth",
    globalVision: "Global vision",
    monthlyReview: "Monthly review",
    localDependency: "Local dependency",
  },
  es: undefined as never,
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

for (const locale of ["es", "fr", "hi", "ar", "tr", "id", "vi", "th", "ru", "ur", "bn", "ja", "ko"] as Locale[]) {
  copyByLocale[locale] = copyByLocale.en;
}

function formatCurrency(value: number, currency: CurrencyCode, locale: Locale) {
  const symbol = currencySymbols[currency] ?? currency;
  const formatted = new Intl.NumberFormat(locale === "pt" ? "pt-BR" : locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value || 0);
  return `${symbol} ${formatted}`;
}

function parseMoneyInput(rawValue: string) {
  const cleaned = rawValue.replace(/[^\d,.-]/g, "").trim();
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
    const parts = cleaned.split(".");
    const lastPart = parts[parts.length - 1];
    normalized = parts.length === 2 && lastPart.length === 3 ? cleaned.replaceAll(".", "") : cleaned;
  }

  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? Math.max(parsed, 0) : 0;
}

function formatMoneyInput(value: number, currency: CurrencyCode, locale: Locale) {
  if (value <= 0) return "";
  return formatCurrency(value, currency, locale);
}

function getCustodyCategory(custody: string): keyof typeof custodyCategoryLabels {
  const normalized = custody.toLowerCase();
  if (normalized.includes("cold wallet") || normalized.includes("carteira própria")) return "selfCustody";
  if (["binance", "coinbase", "okx", "bybit", "kraken", "mercado bitcoin", "foxbit", "exchange"].some((term) => normalized.includes(term))) return "exchange";
  if (normalized.includes("fxpro") || normalized.includes("ic markets") || normalized.includes("pepperstone") || normalized.includes("xm") || normalized.includes("exness") || normalized.includes("avatrade") || normalized.includes("oanda") || normalized.includes("metatrader") || normalized.includes("forex")) return "forexBroker";
  if (normalized.includes("internacional") || normalized.includes("americana") || normalized.includes("plataforma")) return "internationalBroker";
  if (normalized.includes("corretora")) return "broker";
  if (normalized.includes("banco") || normalized.includes("tesouro direto")) return "bank";
  return "other";
}

function formatPercent(value: number, locale: Locale) {
  return `${new Intl.NumberFormat(locale === "pt" ? "pt-BR" : locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value || 0)}%`;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function getTone(score: number) {
  if (score >= 72) return "harpia" as const;
  if (score >= 45) return "lobo" as const;
  return "formiga" as const;
}

function sumGroups<T extends string>(items: AssetInput[], selector: (item: AssetInput) => T) {
  const map = new Map<T, number>();
  for (const item of items) {
    if (item.value <= 0) continue;
    const key = selector(item);
    map.set(key, (map.get(key) ?? 0) + item.value);
  }
  return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
}

function DonutChart({
  data,
  total,
  locale,
}: {
  data: Array<{ label: string; value: number; color: string }>;
  total: number;
  locale: Locale;
}) {
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="flex flex-col items-center gap-5 lg:flex-row lg:items-start">
      <svg viewBox="0 0 160 160" className="h-44 w-44 shrink-0">
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
        <text x="80" y="76" textAnchor="middle" className="fill-paper text-[9px] font-black uppercase tracking-[0.22em]">
          Total
        </text>
        <text x="80" y="94" textAnchor="middle" className="fill-paper text-[16px] font-black">
          {new Intl.NumberFormat(locale === "pt" ? "pt-BR" : locale, { notation: "compact", maximumFractionDigits: 1 }).format(total)}
        </text>
      </svg>
      <div className="grid flex-1 gap-3">
        {data.map((slice) => (
          <div key={slice.label} className="flex items-center justify-between gap-3 border border-white/8 bg-white/[0.03] px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: slice.color }} />
              <span className="text-sm font-semibold text-paper/82">{slice.label}</span>
            </div>
            <span className="text-sm font-black text-paper">{formatPercent(total > 0 ? (slice.value / total) * 100 : 0, locale)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Bars({
  data,
  total,
  locale,
  currency,
}: {
  data: Array<{ label: string; value: number; color?: string }>;
  total: number;
  locale: Locale;
  currency?: CurrencyCode;
}) {
  return (
    <div className="grid gap-4">
      {data.map((item, index) => {
        const percent = total > 0 ? (item.value / total) * 100 : 0;
        return (
          <div key={`${item.label}-${index}`} className="grid gap-2">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-semibold text-paper/78">{item.label}</span>
              <span className="text-sm font-black text-paper">
                {currency ? formatCurrency(item.value, currency, locale) : formatPercent(percent, locale)}
              </span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-white/6">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${clamp(percent, 0, 100)}%`,
                  background: item.color ?? "linear-gradient(90deg, rgba(198,153,74,0.95), rgba(15,143,86,0.85))",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ResultCard({
  label,
  value,
  description,
  tone = "default",
}: {
  label: string;
  value: string;
  description?: string;
  tone?: "default" | "green" | "gold" | "red";
}) {
  const border =
    tone === "green"
      ? "border-rise/30"
      : tone === "red"
        ? "border-fall/30"
        : tone === "gold"
          ? "border-gold/35"
          : "border-white/10";
  return (
    <div className={`border ${border} bg-white/[0.03] p-5 shadow-[0_0_40px_rgba(198,153,74,0.05)]`}>
      <p className="text-[10px] font-black uppercase tracking-[0.24em] text-gold">{label}</p>
      <p className="mt-3 text-2xl font-black text-paper md:text-3xl">{value}</p>
      {description ? <p className="mt-3 text-sm leading-6 text-paper/62">{description}</p> : null}
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-black uppercase tracking-[0.18em] text-paper/72">{label}</span>
      {children}
    </label>
  );
}

function assetTone(id: AssetId) {
  if (id === "fixedIncome" || id === "cash") return "border-gold/24";
  if (id === "crypto" || id === "forex") return "border-rise/24";
  if (id === "commodities") return "border-fall/24";
  return "border-white/10";
}

export default function PortfolioXRayPage() {
  const { locale, t, changeLocale } = useSiteLocale();
  const copy = copyByLocale[locale] ?? copyByLocale.en;

  const initialInputs = useMemo<AssetInput[]>(
    () =>
      assetDefinitions.map((asset) => ({
        id: asset.id,
        value: 0,
        valueText: "",
        currency: locale === "pt" ? "BRL" : "USD",
        country: locale === "pt" ? "BR" : "US",
        assetType: assetTypeOptions[asset.id][0],
        custody: custodyOptions[asset.id][0],
        note: "",
      })),
    [locale],
  );

  const [items, setItems] = useState<AssetInput[]>(initialInputs);
  const [expandedAssets, setExpandedAssets] = useState<AssetId[]>(["fixedIncome"]);

  const populatedItems = useMemo(() => items.filter((item) => item.value > 0), [items]);
  const total = useMemo(() => populatedItems.reduce((sum, item) => sum + item.value, 0), [populatedItems]);
  const assetGroups = useMemo(() => sumGroups(populatedItems, (item) => item.id), [populatedItems]);
  const countryGroups = useMemo(() => sumGroups(populatedItems, (item) => item.country), [populatedItems]);
  const currencyGroups = useMemo(() => sumGroups(populatedItems, (item) => item.currency), [populatedItems]);
  const assetTypeGroups = useMemo(() => sumGroups(populatedItems, (item) => item.assetType), [populatedItems]);
  const custodyGroups = useMemo(() => sumGroups(populatedItems, (item) => item.custody), [populatedItems]);
  const custodyCategoryGroups = useMemo(() => sumGroups(populatedItems, (item) => getCustodyCategory(item.custody)), [populatedItems]);
  const regionGroups = useMemo(
    () =>
      sumGroups(populatedItems, (item) => countries.find((country) => country.code === item.country)?.region ?? "global"),
    [populatedItems],
  );

  const topAsset = assetGroups[0];
  const topCountry = countryGroups[0];
  const topCurrency = currencyGroups[0];
  const topAssetType = assetTypeGroups[0];
  const topCustody = custodyGroups[0];

  const internationalShare = total > 0 ? (populatedItems.filter((item) => item.country !== "BR").reduce((sum, item) => sum + item.value, 0) / total) * 100 : 0;
  const strongCurrencyShare = total > 0 ? (populatedItems.filter((item) => strongCurrencies.has(item.currency)).reduce((sum, item) => sum + item.value, 0) / total) * 100 : 0;
  const riskAssetShare = total > 0 ? (populatedItems.filter((item) => riskAssets.has(item.id)).reduce((sum, item) => sum + item.value, 0) / total) * 100 : 0;
  const custodyShare = (category: keyof typeof custodyCategoryLabels) =>
    total > 0 ? ((custodyCategoryGroups.find(([key]) => key === category)?.[1] ?? 0) / total) * 100 : 0;
  const bankShare = custodyShare("bank");
  const brokerShare = custodyShare("broker") + custodyShare("internationalBroker");
  const exchangeShare = custodyShare("exchange");
  const forexBrokerShare = custodyShare("forexBroker");
  const selfCustodyShare = custodyShare("selfCustody");

  const diversificationScore = useMemo(() => {
    if (total <= 0) return 0;
    const classScore = clamp((assetGroups.length / assetDefinitions.length) * 35, 0, 35);
    const countryScore = clamp((countryGroups.length / 8) * 18, 0, 18);
    const currencyScore = clamp((currencyGroups.length / 6) * 14, 0, 14);
    const sectorScore = clamp((assetTypeGroups.length / 7) * 14, 0, 14);
    const topConcentration = topAsset ? (topAsset[1] / total) * 100 : 100;
    const concentrationScore = clamp((100 - topConcentration) * 0.19, 0, 19);
    return Math.round(classScore + countryScore + currencyScore + sectorScore + concentrationScore);
  }, [assetGroups, countryGroups, currencyGroups, assetTypeGroups, topAsset, total]);

  const levelKey = getTone(diversificationScore);
  const behavior = useMemo(() => {
    if (total <= 0) return copy.noData;
    if (riskAssetShare >= 55) return locale === "pt" ? "Busca crescimento e aceita oscilação mais alta." : "Growth-oriented with higher tolerance for volatility.";
    if (strongCurrencyShare >= 35 && internationalShare >= 30) return locale === "pt" ? "Carteira com foco em proteção global e moedas fortes." : "Portfolio prioritizes global protection and strong currencies.";
    if ((currencyGroups[0]?.[1] ?? 0) / total >= 0.72) return locale === "pt" ? "Carteira ainda depende bastante de uma única moeda." : "Portfolio still depends heavily on a single currency.";
    return locale === "pt" ? "Carteira equilibrada entre liquidez, crescimento e exposição internacional." : "Balanced mix of liquidity, growth and international exposure.";
  }, [copy.noData, currencyGroups, internationalShare, locale, riskAssetShare, strongCurrencyShare, total]);

  const alerts = useMemo(() => {
    const list: string[] = [];
    const topAssetPct = total > 0 && topAsset ? (topAsset[1] / total) * 100 : 0;
    const topCountryPct = total > 0 && topCountry ? (topCountry[1] / total) * 100 : 0;
    const topCurrencyPct = total > 0 && topCurrency ? (topCurrency[1] / total) * 100 : 0;
    const topCustodyPct = total > 0 && topCustody ? (topCustody[1] / total) * 100 : 0;

    if (topAssetPct >= 60) list.push(locale === "pt" ? "Mais de 60% da carteira está concentrada em uma única classe de ativo." : "More than 60% of the portfolio is concentrated in a single asset class.");
    if (topCountryPct >= 70) list.push(locale === "pt" ? "A exposição geográfica está muito concentrada em um único país." : "Geographic exposure is highly concentrated in a single country.");
    if (topCurrencyPct >= 75) list.push(locale === "pt" ? "A carteira depende fortemente de uma única moeda." : "The portfolio depends heavily on a single currency.");
    if (riskAssetShare >= 60) list.push(locale === "pt" ? "Ativos de risco representam mais de 60% do capital informado." : "Risk assets represent more than 60% of the reported capital.");
    if (internationalShare <= 10) list.push(locale === "pt" ? "A exposição internacional ainda está baixa para uma visão patrimonial global." : "International exposure is still low for a global wealth approach.");
    if (topCustodyPct > 80) list.push(locale === "pt" ? "Alta concentração em uma única instituição." : "High concentration in a single institution.");
    if (exchangeShare > 70) list.push(locale === "pt" ? "Alta dependência de exchange." : "High dependence on crypto exchanges.");
    if (bankShare > 70) list.push(locale === "pt" ? "Alta dependência do sistema financeiro local." : "High dependence on the local financial system.");
    if (selfCustodyShare > 0) list.push(locale === "pt" ? "Exposição com autocustódia identificada." : "Self-custody exposure identified.");
    return list;
  }, [bankShare, exchangeShare, internationalShare, locale, riskAssetShare, selfCustodyShare, topAsset, topCountry, topCurrency, topCustody, total]);

  const recommendations = useMemo(() => {
    const list: string[] = [];
    if (diversificationScore < 45) {
      list.push(locale === "pt" ? "Comece aumentando o número de classes de ativo antes de buscar mais retorno." : "Start by increasing the number of asset classes before chasing more return.");
    }
    if (internationalShare < 20) {
      list.push(locale === "pt" ? "Considere estudar exposição internacional para reduzir dependência do mesmo ambiente econômico." : "Consider studying international exposure to reduce dependence on the same economic environment.");
    }
    if (strongCurrencyShare < 20) {
      list.push(locale === "pt" ? "Moedas fortes podem ajudar na proteção patrimonial em cenários de enfraquecimento local." : "Strong currencies can support wealth protection when the local currency weakens.");
    }
    if (riskAssetShare > 65) {
      list.push(locale === "pt" ? "Uma parcela maior de caixa ou renda fixa pode reduzir pressão emocional em fases de oscilação." : "A larger allocation to cash or fixed income can reduce emotional pressure during volatile periods.");
    }
    if (!list.length) {
      list.push(locale === "pt" ? "Sua carteira já mostra boa distribuição. O próximo passo é revisar a estrutura com frequência e ajustar conforme seus objetivos." : "Your portfolio already shows good distribution. The next step is reviewing the structure regularly and adjusting it to your objectives.");
    }
    return list;
  }, [diversificationScore, internationalShare, locale, riskAssetShare, strongCurrencyShare]);

  const pillarScores = useMemo(() => {
    const liquidity = total > 0 ? ((assetGroups.find(([id]) => id === "cash")?.[1] ?? 0) / total) * 100 : 0;
    const income = total > 0 ? (((assetGroups.find(([id]) => id === "fixedIncome")?.[1] ?? 0) + (assetGroups.find(([id]) => id === "realEstateFunds")?.[1] ?? 0)) / total) * 100 : 0;
    const growth = total > 0 ? (((assetGroups.find(([id]) => id === "stocks")?.[1] ?? 0) + (assetGroups.find(([id]) => id === "etfs")?.[1] ?? 0) + (assetGroups.find(([id]) => id === "crypto")?.[1] ?? 0)) / total) * 100 : 0;
    const protection = total > 0 ? (((assetGroups.find(([id]) => id === "fixedIncome")?.[1] ?? 0) + (assetGroups.find(([id]) => id === "cash")?.[1] ?? 0)) / total) * 100 : 0;
    const globalExposure = internationalShare;
    const risk = riskAssetShare;
    const diversification = diversificationScore;
    return [
      { label: locale === "pt" ? "Liquidez" : "Liquidity", value: liquidity },
      { label: locale === "pt" ? "Renda" : "Income", value: income },
      { label: locale === "pt" ? "Crescimento" : "Growth", value: growth },
      { label: locale === "pt" ? "Protecao" : "Protection", value: protection },
      { label: locale === "pt" ? "Exposicao global" : "Global exposure", value: globalExposure },
      { label: locale === "pt" ? "Risco" : "Risk", value: risk },
      { label: locale === "pt" ? "Diversificacao" : "Diversification", value: diversification },
    ];
  }, [assetGroups, diversificationScore, internationalShare, locale, riskAssetShare, total]);

  const assetChartData = assetGroups.map(([id, value], index) => ({
    label: assetDefinitions.find((asset) => asset.id === id)?.label ?? id,
    value,
    color: colorScale[index % colorScale.length],
  }));

  const countryChartData = countryGroups.slice(0, 6).map(([code, value], index) => ({
    label: countries.find((country) => country.code === code)?.name ?? code,
    value,
    color: colorScale[index % colorScale.length],
  }));

  const currencyChartData = currencyGroups.slice(0, 6).map(([code, value], index) => ({
    label: code,
    value,
    color: colorScale[index % colorScale.length],
  }));

  const assetTypeChartData = assetTypeGroups.slice(0, 6).map(([assetType, value], index) => ({
    label: assetType,
    value,
    color: colorScale[index % colorScale.length],
  }));

  const custodyChartData = custodyCategoryGroups.map(([category, value], index) => ({
    label: custodyCategoryLabels[category],
    value,
    color: colorScale[index % colorScale.length],
  }));

  const regionChartData = regionGroups.map(([region, value], index) => ({
    label: regionNames[region],
    value,
    color: colorScale[index % colorScale.length],
  }));

  const updateItem = <K extends keyof AssetInput>(id: AssetId, key: K, value: AssetInput[K]) => {
    setItems((current) => current.map((item) => (item.id === id ? { ...item, [key]: value } : item)));
  };

  return (
    <main className="page-content min-h-screen bg-black text-ink">
      <SiteChrome locale={locale} t={t} onLocaleChange={changeLocale} />

      <section className="page-hero px-5 pb-12 pt-16 md:px-8 md:pb-16 md:pt-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.55 }}>
            <p className="text-xs font-black uppercase tracking-[0.32em] text-gold">{copy.eyebrow}</p>
            <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[0.94] tracking-[-0.06em] text-paper md:text-7xl">
              {copy.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-paper/72 md:text-xl">{copy.subtitle}</p>
            <p className="mt-6 max-w-3xl text-base leading-8 text-paper/64">{copy.intro}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="border border-gold/18 bg-white/[0.03] p-6 shadow-[0_0_90px_rgba(198,153,74,0.08)] md:p-8"
          >
            <p className="text-xs font-black uppercase tracking-[0.26em] text-gold">{copy.resultsTitle}</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <ResultCard label={copy.totalCapital} value={formatCurrency(total, topCurrency?.[0] ?? (locale === "pt" ? "BRL" : "USD"), locale)} />
              <ResultCard
                label={copy.diversificationLevel}
                value={`${diversificationScore}/100`}
                description={copy.levelDescriptions[levelKey]}
                tone={levelKey === "harpia" ? "green" : levelKey === "lobo" ? "gold" : "red"}
              />
              <ResultCard label={copy.internationalShare} value={formatPercent(internationalShare, locale)} />
              <ResultCard label={copy.strongCurrencyShare} value={formatPercent(strongCurrencyShare, locale)} />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-5 py-12 md:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.55 }}>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-gold">{copy.howTitle}</p>
            <p className="mt-5 max-w-4xl text-base leading-8 text-paper/72">{copy.howTextA}</p>
            <p className="mt-4 max-w-4xl text-base leading-8 text-paper/64">{copy.howTextB}</p>
          </motion.div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {([
              ["capital", copy.cardDescriptions.capital],
              ["assetClass", copy.cardDescriptions.assetClass],
              ["country", copy.cardDescriptions.country],
              ["currency", copy.cardDescriptions.currency],
              ["sector", copy.cardDescriptions.sector],
              ["diversification", copy.cardDescriptions.diversification],
            ] as Array<[keyof Copy["cards"], string]>).map(([key, description]) => (
              <div key={key} className="border border-white/10 bg-white/[0.03] p-5">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-gold">{copy.cards[key]}</p>
                <p className="mt-4 text-sm leading-7 text-paper/68">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-12 md:px-8">
        <div className="mx-auto max-w-7xl border border-gold/16 bg-white/[0.03] p-6 md:p-8">
          <div className="max-w-4xl">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-gold">{copy.formTitle}</p>
            <p className="mt-4 text-base leading-8 text-paper/68">{copy.formText}</p>
          </div>
          <div className="mt-8 grid gap-3 md:grid-cols-5">
            {[
              [locale === "pt" ? "Capital total preenchido" : "Filled capital", formatCurrency(total, topCurrency?.[0] ?? (locale === "pt" ? "BRL" : "USD"), locale)],
              [locale === "pt" ? "Classes preenchidas" : "Filled classes", String(populatedItems.length)],
              [locale === "pt" ? "Países diferentes" : "Different countries", String(countryGroups.length)],
              [locale === "pt" ? "Moedas diferentes" : "Different currencies", String(currencyGroups.length)],
              [locale === "pt" ? "Instituições diferentes" : "Different institutions", String(custodyGroups.length)],
            ].map(([label, value]) => (
              <div key={label} className="border border-gold/14 bg-black/35 p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-paper/52">{label}</p>
                <p className="mt-2 text-xl font-black text-paper">{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 grid gap-4">
            {assetDefinitions.map((asset) => {
              const item = items.find((entry) => entry.id === asset.id)!;
              const isExpanded = expandedAssets.includes(asset.id);
              const toggleAsset = () =>
                setExpandedAssets((current) =>
                  current.includes(asset.id) ? current.filter((id) => id !== asset.id) : [...current, asset.id],
                );
              return (
                <div key={asset.id} className={`border ${assetTone(asset.id)} bg-black/40`}>
                  <button
                    type="button"
                    onClick={toggleAsset}
                    className="flex w-full flex-col gap-4 p-5 text-left transition hover:bg-white/[0.025] md:flex-row md:items-center md:justify-between md:p-6"
                  >
                    <div className="flex items-start gap-4">
                      <span className="grid h-9 w-9 shrink-0 place-items-center border border-gold/25 text-xl font-black text-gold">
                        {isExpanded ? "−" : "+"}
                      </span>
                      <div>
                        <p className="text-sm font-black uppercase tracking-[0.22em] text-gold">{asset.label}</p>
                        <p className="mt-3 max-w-3xl text-sm leading-7 text-paper/62">{asset.description}</p>
                      </div>
                    </div>
                    <div className="shrink-0 border border-white/10 bg-white/[0.03] px-4 py-3">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-paper/48">{locale === "pt" ? "Valor total" : "Total value"}</p>
                      <p className="mt-1 text-lg font-black text-paper">{formatCurrency(item.value, item.currency, locale)}</p>
                    </div>
                  </button>

                  {isExpanded ? (
                    <div className="border-t border-white/10 p-5 md:p-6">
                      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        <Field label={copy.valueInvested}>
                          <input
                            type="text"
                            inputMode="decimal"
                            value={item.valueText}
                            onChange={(event) => {
                              const rawValue = event.target.value;
                              updateItem(asset.id, "valueText", rawValue);
                              updateItem(asset.id, "value", parseMoneyInput(rawValue));
                            }}
                            onBlur={() => updateItem(asset.id, "valueText", formatMoneyInput(item.value, item.currency, locale))}
                            placeholder={locale === "pt" ? "Ex.: 1.000,00" : "Ex: 1,000.00"}
                            className="w-full border border-gold/22 bg-ink px-4 py-3 text-sm font-semibold text-paper outline-none transition placeholder:text-paper/28 focus:border-gold"
                          />
                        </Field>
                        <Field label={copy.investedCurrency}>
                          <select
                            value={item.currency}
                            onChange={(event) => {
                              const currency = event.target.value as CurrencyCode;
                              updateItem(asset.id, "currency", currency);
                              if (item.value > 0) updateItem(asset.id, "valueText", formatMoneyInput(item.value, currency, locale));
                            }}
                            className="w-full border border-gold/22 bg-ink px-4 py-3 text-sm font-semibold text-paper outline-none transition focus:border-gold"
                          >
                            {currencies.map((currency) => (
                              <option key={currency} value={currency}>
                                {currency}
                              </option>
                            ))}
                          </select>
                        </Field>
                        <Field label={copy.mainCountry}>
                          <select
                            value={item.country}
                            onChange={(event) => updateItem(asset.id, "country", event.target.value as CountryCode)}
                            className="w-full border border-gold/22 bg-ink px-4 py-3 text-sm font-semibold text-paper outline-none transition focus:border-gold"
                          >
                            {countries.map((country) => (
                              <option key={country.code} value={country.code}>
                                {country.name}
                              </option>
                            ))}
                          </select>
                        </Field>
                        <Field label={copy.mainSector}>
                          <select
                            value={item.assetType}
                            onChange={(event) => updateItem(asset.id, "assetType", event.target.value)}
                            className="w-full border border-gold/22 bg-ink px-4 py-3 text-sm font-semibold text-paper outline-none transition focus:border-gold"
                          >
                            {assetTypeOptions[asset.id].map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </Field>
                        <Field label={locale === "pt" ? "Onde está investido" : "Where it is held"}>
                          <select
                            value={item.custody}
                            onChange={(event) => updateItem(asset.id, "custody", event.target.value)}
                            className="w-full border border-gold/22 bg-ink px-4 py-3 text-sm font-semibold text-paper outline-none transition focus:border-gold"
                          >
                            {custodyOptions[asset.id].map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </Field>
                        <Field label={copy.optionalNote}>
                          <input
                            type="text"
                            value={item.note}
                            onChange={(event) => updateItem(asset.id, "note", event.target.value)}
                            placeholder={copy.optionalPlaceholder}
                            className="w-full border border-gold/22 bg-ink px-4 py-3 text-sm font-semibold text-paper outline-none transition placeholder:text-paper/28 focus:border-gold"
                          />
                        </Field>
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-12 md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-gold">{copy.resultsTitle}</p>
          <p className="mt-4 max-w-4xl text-base leading-8 text-paper/68">{copy.resultsText}</p>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            <ResultCard label={copy.totalCapital} value={formatCurrency(total, topCurrency?.[0] ?? (locale === "pt" ? "BRL" : "USD"), locale)} />
            <ResultCard label={copy.topAsset} value={topAsset ? `${assetDefinitions.find((asset) => asset.id === topAsset[0])?.label} · ${formatPercent((topAsset[1] / total) * 100, locale)}` : copy.noData} />
            <ResultCard label={copy.topCountry} value={topCountry ? `${countries.find((country) => country.code === topCountry[0])?.name} · ${formatPercent((topCountry[1] / total) * 100, locale)}` : copy.noData} />
            <ResultCard label={copy.topCurrency} value={topCurrency ? `${topCurrency[0]} · ${formatPercent((topCurrency[1] / total) * 100, locale)}` : copy.noData} />
            <ResultCard label={copy.topSector} value={topAssetType ? `${topAssetType[0]} · ${formatPercent((topAssetType[1] / total) * 100, locale)}` : copy.noData} />
            <ResultCard label={locale === "pt" ? "Maior concentração por instituição" : "Largest concentration by institution"} value={topCustody ? `${topCustody[0]} · ${formatPercent((topCustody[1] / total) * 100, locale)}` : copy.noData} />
            <ResultCard label={copy.internationalShare} value={formatPercent(internationalShare, locale)} />
            <ResultCard label={copy.strongCurrencyShare} value={formatPercent(strongCurrencyShare, locale)} />
            <ResultCard label={copy.riskAssetsShare} value={formatPercent(riskAssetShare, locale)} />
            <ResultCard label={locale === "pt" ? "Percentual em bancos" : "Share in banks"} value={formatPercent(bankShare, locale)} />
            <ResultCard label={locale === "pt" ? "Percentual em corretoras" : "Share in brokers"} value={formatPercent(brokerShare, locale)} />
            <ResultCard label={locale === "pt" ? "Percentual em exchanges" : "Share in exchanges"} value={formatPercent(exchangeShare, locale)} />
            <ResultCard label={locale === "pt" ? "Percentual em corretoras Forex" : "Share in Forex brokers"} value={formatPercent(forexBrokerShare, locale)} />
            <ResultCard label={locale === "pt" ? "Percentual em carteira própria" : "Share in self-custody"} value={formatPercent(selfCustodyShare, locale)} />
            <ResultCard label={copy.diversificationLevel} value={`${diversificationScore}/100`} />
            <ResultCard
              label={copy.varejoClassification}
              value={copy.levelNames[levelKey]}
              description={copy.levelDescriptions[levelKey]}
              tone={levelKey === "harpia" ? "green" : levelKey === "lobo" ? "gold" : "red"}
            />
          </div>
        </div>
      </section>

      <section className="px-5 py-12 md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-gold">{copy.chartsTitle}</p>
          <p className="mt-4 max-w-4xl text-base leading-8 text-paper/68">{copy.chartsText}</p>
          <div className="mt-8 grid gap-4 xl:grid-cols-2">
            <div className="border border-white/10 bg-white/[0.03] p-6">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-gold">{copy.byAsset}</p>
              <div className="mt-5">
                <DonutChart data={assetChartData} total={total} locale={locale} />
              </div>
            </div>
            <div className="border border-white/10 bg-white/[0.03] p-6">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-gold">{copy.byCountry}</p>
              <div className="mt-5">
                <Bars data={countryChartData} total={total} locale={locale} currency={topCurrency?.[0] ?? (locale === "pt" ? "BRL" : "USD")} />
              </div>
            </div>
            <div className="border border-white/10 bg-white/[0.03] p-6">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-gold">{copy.byCurrency}</p>
              <div className="mt-5">
                <Bars data={currencyChartData} total={total} locale={locale} />
              </div>
            </div>
            <div className="border border-white/10 bg-white/[0.03] p-6">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-gold">{copy.bySector}</p>
              <div className="mt-5">
                <Bars data={assetTypeChartData} total={total} locale={locale} />
              </div>
            </div>
            <div className="border border-white/10 bg-white/[0.03] p-6 xl:col-span-2">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-gold">{locale === "pt" ? "Distribuição por local de custódia" : "Allocation by custody location"}</p>
              <p className="mt-4 text-sm leading-7 text-paper/62">
                {locale === "pt"
                  ? "Este gráfico mostra onde sua carteira está guardada. Uma carteira pode estar diversificada em ativos, mas concentrada em poucas instituições."
                  : "This chart shows where your portfolio is held. A portfolio can be diversified by assets while still being concentrated in only a few institutions."}
              </p>
              <div className="mt-5">
                <Bars data={custodyChartData} total={total} locale={locale} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-12 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="border border-gold/16 bg-white/[0.03] p-6">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-gold">{copy.mapTitle}</p>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-paper/64">{copy.mapText}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {regionChartData.map((region) => (
                <div key={region.label} className="border border-white/10 bg-black/30 p-4">
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-paper/58">{region.label}</p>
                  <p className="mt-3 text-3xl font-black text-paper">{formatPercent(total > 0 ? (region.value / total) * 100 : 0, locale)}</p>
                  <div className="mt-4 h-2 rounded-full bg-white/6">
                    <div className="h-2 rounded-full" style={{ width: `${clamp(total > 0 ? (region.value / total) * 100 : 0, 0, 100)}%`, backgroundColor: region.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-gold/16 bg-white/[0.03] p-6">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-gold">{copy.pillars}</p>
            <div className="mt-6 grid gap-4">
              {pillarScores.map((pillar, index) => (
                <div key={pillar.label} className="grid gap-2">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-paper/78">{pillar.label}</span>
                    <span className="text-sm font-black text-paper">{formatPercent(pillar.value, locale)}</span>
                  </div>
                  <div className="h-3 rounded-full bg-white/6">
                    <div className="h-3 rounded-full" style={{ width: `${clamp(pillar.value, 0, 100)}%`, backgroundColor: colorScale[index % colorScale.length] }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-12 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 xl:grid-cols-3">
          <div className="border border-fall/24 bg-fall/[0.06] p-6">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-fall">{copy.levelNames.formiga}</p>
            <p className="mt-4 text-base leading-8 text-paper/72">{copy.levelDescriptions.formiga}</p>
          </div>
          <div className="border border-gold/24 bg-gold/[0.06] p-6">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-gold">{copy.levelNames.lobo}</p>
            <p className="mt-4 text-base leading-8 text-paper/72">{copy.levelDescriptions.lobo}</p>
          </div>
          <div className="border border-rise/24 bg-rise/[0.06] p-6">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-rise">{copy.levelNames.harpia}</p>
            <p className="mt-4 text-base leading-8 text-paper/72">{copy.levelDescriptions.harpia}</p>
          </div>
        </div>
      </section>

      <section className="px-5 py-12 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="border border-white/10 bg-white/[0.03] p-6">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-gold">{copy.behaviorTitle}</p>
            <p className="mt-4 text-base leading-8 text-paper/72">{behavior}</p>
            <div className="mt-6 grid gap-3">
              <div className="flex items-center justify-between border border-white/10 px-4 py-3 text-sm text-paper/74">
                <span>{copy.protectedCapital}</span>
                <span className="font-black text-paper">{formatPercent(100 - riskAssetShare, locale)}</span>
              </div>
              <div className="flex items-center justify-between border border-white/10 px-4 py-3 text-sm text-paper/74">
                <span>{copy.globalVision}</span>
                <span className="font-black text-paper">{formatPercent(internationalShare, locale)}</span>
              </div>
              <div className="flex items-center justify-between border border-white/10 px-4 py-3 text-sm text-paper/74">
                <span>{copy.localDependency}</span>
                <span className="font-black text-paper">{formatPercent(total > 0 && topCurrency ? (topCurrency[1] / total) * 100 : 0, locale)}</span>
              </div>
              <div className="flex items-center justify-between border border-white/10 px-4 py-3 text-sm text-paper/74">
                <span>{copy.monthlyReview}</span>
                <span className="font-black text-paper">{locale === "pt" ? "Recomendado" : "Recommended"}</span>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="border border-white/10 bg-white/[0.03] p-6">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-gold">{copy.alertsTitle}</p>
              <div className="mt-5 grid gap-3">
                {alerts.length ? (
                  alerts.map((alert, index) => (
                    <div key={`${alert}-${index}`} className="border border-fall/22 bg-fall/[0.06] px-4 py-3 text-sm leading-6 text-paper/76">
                      {alert}
                    </div>
                  ))
                ) : (
                  <div className="border border-rise/22 bg-rise/[0.06] px-4 py-3 text-sm leading-6 text-paper/76">
                    {locale === "pt" ? "Nenhum alerta forte de concentração foi identificado com os valores preenchidos." : "No major concentration alert was identified with the values provided."}
                  </div>
                )}
              </div>
            </div>

            <div className="border border-white/10 bg-white/[0.03] p-6">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-gold">{copy.recommendationsTitle}</p>
              <div className="mt-5 grid gap-3">
                {recommendations.map((recommendation, index) => (
                  <div key={`${recommendation}-${index}`} className="border border-gold/18 bg-gold/[0.05] px-4 py-3 text-sm leading-6 text-paper/76">
                    {recommendation}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-12 pt-8 md:px-8 md:pb-16">
        <div className="mx-auto max-w-7xl border border-gold/18 bg-white/[0.03] p-6 shadow-[0_0_80px_rgba(198,153,74,0.06)] md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-gold">{copy.ctaTitle}</p>
          <p className="mt-4 max-w-4xl text-base leading-8 text-paper/68">{copy.ctaText}</p>
          <div className="mt-7 flex flex-col gap-3 md:flex-row">
            <a
              href="https://whatsapp.com/channel/0029VaAO8Nb1iUxYdf4P6Y3j"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-rise px-6 py-4 text-sm font-black uppercase tracking-[0.18em] text-ink transition hover:-translate-y-0.5 hover:bg-[#14aa6c]"
            >
              {copy.formigaButton}
            </a>
            <a
              href={locale === "pt" ? "/servicos" : `/${locale}/services`}
              className="inline-flex items-center justify-center border border-gold/30 bg-transparent px-6 py-4 text-sm font-black uppercase tracking-[0.18em] text-paper transition hover:border-gold hover:text-gold"
            >
              {copy.servicesButton}
            </a>
          </div>
        </div>
      </section>

      <FreeChannelCTA t={t} />
      <SupportFooter t={t} locale={locale} onLocaleChange={changeLocale} />
    </main>
  );
}
