"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FreeChannelCTA, SiteChrome, SupportFooter, fadeUp, useSiteLocale } from "./SiteSections";
import type { Locale } from "../i18n";

type Level = "formiga" | "lobo" | "harpia";

type LevelCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  pillar: string;
  representTitle: string;
  description: string;
  metrics: string[];
  marketsTitle: string;
  marketsText: string;
  markets: LevelMarket[];
  objectiveTitle: string;
  objective: string;
  evolutionTitle: string;
  modules: { title: string; text: string }[];
  primary: string;
  primaryHref: string;
  secondary: string;
  secondaryHref: string;
};

const educationHref = "/educacao";

type MarketSlug = "forex" | "acoes" | "cripto" | "etfs" | "ouro" | "petroleo" | "commodities" | "fundos-imobiliarios";
type LevelMarket = { title: string; text: string };
type LinkedLevelMarket = LevelMarket & { href: string };

const localizedMarketPaths: Record<Locale, Record<MarketSlug, string | null>> = {
  pt: {
    forex: "/forex",
    acoes: "/acoes",
    cripto: "/cripto",
    etfs: "/etfs",
    ouro: "/ouro",
    petroleo: "/petroleo",
    commodities: "/commodities",
    "fundos-imobiliarios": "/fundos-imobiliarios",
  },
  en: {
    forex: "/en/forex",
    acoes: "/en/stocks",
    cripto: "/en/crypto",
    etfs: "/en/etfs",
    ouro: "/en/gold",
    petroleo: "/en/oil",
    commodities: "/en/commodities",
    "fundos-imobiliarios": null,
  },
  es: {
    forex: "/es/forex",
    acoes: "/es/acciones",
    cripto: "/es/cripto",
    etfs: "/es/etfs",
    ouro: "/es/oro",
    petroleo: "/es/petroleo",
    commodities: "/es/commodities",
    "fundos-imobiliarios": null,
  },
  hi: {
    forex: "/hi/forex",
    acoes: "/hi/stocks",
    cripto: "/hi/crypto",
    etfs: "/hi/etfs",
    ouro: "/hi/gold",
    petroleo: "/hi/oil",
    commodities: "/hi/commodities",
    "fundos-imobiliarios": null,
  },
  ar: {
    forex: "/ar/forex",
    acoes: "/ar/stocks",
    cripto: "/ar/crypto",
    etfs: "/ar/etfs",
    ouro: "/ar/gold",
    petroleo: "/ar/oil",
    commodities: "/ar/commodities",
    "fundos-imobiliarios": null,
  },
  tr: {
    forex: "/tr/forex",
    acoes: "/tr/stocks",
    cripto: "/tr/crypto",
    etfs: "/tr/etfs",
    ouro: "/tr/gold",
    petroleo: "/tr/oil",
    commodities: "/tr/commodities",
    "fundos-imobiliarios": null,
  },
  id: {
    forex: "/id/forex",
    acoes: "/id/stocks",
    cripto: "/id/crypto",
    etfs: "/id/etfs",
    ouro: "/id/gold",
    petroleo: "/id/oil",
    commodities: "/id/commodities",
    "fundos-imobiliarios": null,
  },
  vi: {
    forex: "/vi/forex",
    acoes: "/vi/stocks",
    cripto: "/vi/crypto",
    etfs: "/vi/etfs",
    ouro: "/vi/gold",
    petroleo: "/vi/oil",
    commodities: "/vi/commodities",
    "fundos-imobiliarios": null,
  },
};

function identifyMarketSlug(market: LevelMarket, locale: Locale): MarketSlug | null {
  const value = `${market.title} ${market.text}`.toLowerCase();

  if (value.includes("forex")) return "forex";
  if (value.includes("etf")) return "etfs";
  if (value.includes("komoditas") || value.includes("hàng hóa") || value.includes("hang hoa")) return "commodities";
  if (value.includes("minyak") || value.includes("dầu") || value.includes("dau")) return "petroleo";
  if (value.includes("emas") || value.includes("vàng") || value.includes("vang")) return "ouro";
  if (value.includes("kripto") || value.includes("tiền điện tử") || value.includes("tien dien tu")) return "cripto";
  if (value.includes("commod") || value.includes("emtia") || value.includes("السلع") || value.includes("कमोड")) return "commodities";
  if (value.includes("petr") || value.includes("oil") || value.includes("petrol") || value.includes("तेल") || value.includes("النفط")) return "petroleo";
  if (value.includes("ouro") || value.includes("gold") || value.includes("oro") || value.includes("altın") || value.includes("altin") || value.includes("सोना") || value.includes("الذهب")) return "ouro";
  if (value.includes("cripto") || value.includes("crypto") || value.includes("kripto") || value.includes("क्रिप्टो") || value.includes("الكريبتو") || value.includes("bitcoin")) return "cripto";
  if (locale === "pt" && value.includes("fundos imobili")) return "fundos-imobiliarios";
  if (value.includes("saham") || value.includes("cổ phiếu") || value.includes("co phieu")) return "acoes";
  if (
    value.includes("ações") ||
    value.includes("acoes") ||
    value.includes("stocks") ||
    value.includes("acciones") ||
    value.includes("hiss") ||
    value.includes("शेयर") ||
    value.includes("الأسهم")
  ) {
    return "acoes";
  }

  return null;
}

function getLevelMarketHref(locale: Locale, market: LevelMarket) {
  const slug = identifyMarketSlug(market, locale);
  if (!slug) return null;
  return localizedMarketPaths[locale][slug];
}

function getMarketAriaLabel(locale: Locale, title: string) {
  if (locale === "pt") return `Ver página de ${title}`;
  if (locale === "es") return `Ver pagina de ${title}`;
  if (locale === "hi") return `${title} पेज देखें`;
  if (locale === "ar") return `عرض صفحة ${title}`;
  if (locale === "tr") return `${title} sayfasini gor`;
  if (locale === "id") return `Lihat halaman ${title}`;
  if (locale === "vi") return `Xem trang ${title}`;
  return `View ${title} page`;
}

function getMarketActionLabel(locale: Locale) {
  if (locale === "pt") return "Ver mercado";
  if (locale === "es") return "Ver mercado";
  if (locale === "hi") return "बाजार देखें";
  if (locale === "ar") return "عرض السوق";
  if (locale === "tr") return "Piyasayi gor";
  if (locale === "id") return "Lihat pasar";
  if (locale === "vi") return "Xem thị trường";
  return "View market";
}

const levelCopies: Record<Level, Partial<Record<Locale, LevelCopy>>> = {
  formiga: {
    pt: {
      eyebrow: "Nível Formiga",
      title: "A base financeira antes da expansão.",
      subtitle: "Organização, disciplina, primeiros investimentos, risco e construção do primeiro capital.",
      pillar: "Base • Disciplina • Primeiro capital",
      representTitle: "O que este nível representa",
      description:
        "O nível Formiga representa o investidor que está saindo da desorganização financeira e começando a construir uma base real. Antes de buscar operações, sinais ou patrimônio global, ele precisa entender dinheiro, risco, rotina, caixa e primeiros investimentos.",
      metrics: ["Organização", "Risco básico", "Primeiro capital"],
      marketsTitle: "Mercados no nível Formiga",
      marketsText:
        "No nível Formiga, o investidor começa a entender os principais mercados sem pressa de operar todos ao mesmo tempo. O foco é aprender como cada mercado funciona, quais riscos existem e como eles se conectam à vida financeira.",
      markets: [
        { title: "Forex", text: "Entender moedas, dólar, pares cambiais e risco de alavancagem." },
        { title: "Cripto", text: "Entender Bitcoin, stablecoins, volatilidade e segurança." },
        { title: "Ações", text: "Entender empresas, bolsa, dividendos e ciclos econômicos." },
        { title: "Renda fixa", text: "Entender juros, liquidez, reserva e proteção inicial." },
        { title: "Fundos imobiliários", text: "Entender renda, patrimônio e fluxo mensal." },
      ],
      objectiveTitle: "Objetivo do nível",
      objective: "Sair da base financeira frágil e construir organização, reserva, disciplina e visão inicial de mercado.",
      evolutionTitle: "Cards de evolução",
      modules: [
        { title: "Realidade financeira", text: "Renda, contas, dívidas, caixa e clareza sobre o ponto de partida." },
        { title: "Disciplina", text: "Rotina financeira, controle emocional e consistência para evoluir." },
        { title: "Primeiros mercados", text: "Introdução a Forex, cripto, ações, renda fixa e fundos imobiliários." },
      ],
      primary: "Entrar no Canal Formiga",
      primaryHref: "free",
      secondary: "Ver Educação",
      secondaryHref: educationHref,
    },
    en: {
      eyebrow: "Formiga Level",
      title: "The financial foundation before expansion.",
      subtitle: "Organization, discipline, first investments, risk, and first capital building.",
      pillar: "Foundation • Discipline • First capital",
      representTitle: "What this level represents",
      description:
        "The Formiga level represents the investor leaving financial disorder and beginning to build a real base. Before seeking trades, signals, or global wealth, the investor needs to understand money, risk, routine, cash flow, and first investments.",
      metrics: ["Organization", "Basic risk", "First capital"],
      marketsTitle: "Markets at the Formiga level",
      marketsText:
        "At the Formiga level, the investor starts to understand the main markets without rushing to trade everything at once. The focus is learning how each market works, what risks exist, and how they connect to financial life.",
      markets: [
        { title: "Forex", text: "Understand currencies, the dollar, currency pairs, and leverage risk." },
        { title: "Crypto", text: "Understand Bitcoin, stablecoins, volatility, and security." },
        { title: "Stocks", text: "Understand companies, exchanges, dividends, and economic cycles." },
        { title: "Fixed income", text: "Understand interest rates, liquidity, reserves, and initial protection." },
        { title: "Real estate funds", text: "Understand income, wealth, and monthly cash flow." },
      ],
      objectiveTitle: "Level objective",
      objective: "Leave a fragile financial base and build organization, reserves, discipline, and an initial market vision.",
      evolutionTitle: "Evolution cards",
      modules: [
        { title: "Financial reality", text: "Income, bills, debt, cash flow, and clarity about the starting point." },
        { title: "Discipline", text: "Financial routine, emotional control, and consistency to evolve." },
        { title: "First markets", text: "Introduction to Forex, crypto, stocks, fixed income, and real estate funds." },
      ],
      primary: "Start in the Formiga Channel",
      primaryHref: "free",
      secondary: "View Education",
      secondaryHref: educationHref,
    },
    es: {
      eyebrow: "Nivel Formiga",
      title: "La base financiera antes de la expansión.",
      subtitle: "Organización, disciplina, primeras inversiones, riesgo y construcción del primer capital.",
      pillar: "Base • Disciplina • Primer capital",
      representTitle: "Qué representa este nivel",
      description:
        "El nivel Formiga representa al inversor que está saliendo de la desorganización financiera y empezando a construir una base real. Antes de buscar operaciones, señales o patrimonio global, necesita entender dinero, riesgo, rutina, caja y primeras inversiones.",
      metrics: ["Organización", "Riesgo básico", "Primer capital"],
      marketsTitle: "Mercados en el nivel Formiga",
      marketsText:
        "En el nivel Formiga, el inversor empieza a entender los principales mercados sin prisa por operar todos al mismo tiempo. El foco es aprender cómo funciona cada mercado, qué riesgos existen y cómo se conectan con la vida financiera.",
      markets: [
        { title: "Forex", text: "Entender monedas, dólar, pares cambiarios y riesgo de apalancamiento." },
        { title: "Cripto", text: "Entender Bitcoin, stablecoins, volatilidad y seguridad." },
        { title: "Acciones", text: "Entender empresas, bolsa, dividendos y ciclos económicos." },
        { title: "Renta fija", text: "Entender intereses, liquidez, reserva y protección inicial." },
        { title: "Fondos inmobiliarios", text: "Entender renta, patrimonio y flujo mensual." },
      ],
      objectiveTitle: "Objetivo del nivel",
      objective: "Salir de una base financiera frágil y construir organización, reserva, disciplina y visión inicial de mercado.",
      evolutionTitle: "Cards de evolución",
      modules: [
        { title: "Realidad financiera", text: "Ingresos, cuentas, deudas, caja y claridad sobre el punto de partida." },
        { title: "Disciplina", text: "Rutina financiera, control emocional y consistencia para evolucionar." },
        { title: "Primeros mercados", text: "Introducción a Forex, cripto, acciones, renta fija y fondos inmobiliarios." },
      ],
      primary: "Empezar en el Canal Formiga",
      primaryHref: "free",
      secondary: "Ver educación",
      secondaryHref: educationHref,
    },
    hi: {
      eyebrow: "Formiga स्तर",
      title: "विस्तार से पहले वित्तीय आधार।",
      subtitle: "संगठन, अनुशासन, शुरुआती निवेश, जोखिम और पहली पूंजी का निर्माण।",
      pillar: "आधार • अनुशासन • पहली पूंजी",
      representTitle: "यह स्तर क्या दर्शाता है",
      description:
        "Formiga स्तर उस निवेशक का प्रतिनिधित्व करता है जो वित्तीय अव्यवस्था से बाहर निकलकर वास्तविक आधार बनाना शुरू कर रहा है। ऑपरेशन, सिग्नल या वैश्विक संपत्ति से पहले उसे पैसे, जोखिम, दिनचर्या, नकदी और शुरुआती निवेश को समझना होता है।",
      metrics: ["संगठन", "बुनियादी जोखिम", "पहली पूंजी"],
      marketsTitle: "Formiga स्तर के बाजार",
      marketsText:
        "Formiga स्तर में निवेशक मुख्य बाजारों को समझना शुरू करता है, बिना सभी को एक साथ ट्रेड करने की जल्दबाजी के। ध्यान यह समझने पर है कि हर बाजार कैसे काम करता है, जोखिम क्या हैं और वे वित्तीय जीवन से कैसे जुड़ते हैं।",
      markets: [
        { title: "Forex", text: "करेंसी, डॉलर, करेंसी पेयर और लेवरेज जोखिम को समझना।" },
        { title: "क्रिप्टो", text: "Bitcoin, stablecoins, volatility और सुरक्षा को समझना।" },
        { title: "शेयर", text: "कंपनियां, स्टॉक मार्केट, dividends और आर्थिक चक्र समझना।" },
        { title: "फिक्स्ड इनकम", text: "ब्याज, liquidity, reserve और प्रारंभिक सुरक्षा समझना।" },
        { title: "रियल एस्टेट फंड", text: "आय, संपत्ति और मासिक cash flow समझना।" },
      ],
      objectiveTitle: "स्तर का उद्देश्य",
      objective: "कमजोर वित्तीय आधार से बाहर निकलकर संगठन, reserve, अनुशासन और प्रारंभिक market vision बनाना।",
      evolutionTitle: "विकास कार्ड",
      modules: [
        { title: "वित्तीय वास्तविकता", text: "आय, खर्च, कर्ज, नकदी और शुरुआती स्थिति की स्पष्टता।" },
        { title: "अनुशासन", text: "वित्तीय routine, emotional control और लगातार विकास।" },
        { title: "पहले बाजार", text: "Forex, crypto, stocks, fixed income और real estate funds का परिचय।" },
      ],
      primary: "Formiga चैनल से शुरू करें",
      primaryHref: "free",
      secondary: "शिक्षा देखें",
      secondaryHref: educationHref,
    },
    ar: {
      eyebrow: "مستوى Formiga",
      title: "الأساس المالي قبل التوسع.",
      subtitle: "تنظيم، انضباط، استثمارات أولى، مخاطر وبناء رأس المال الأول.",
      pillar: "أساس • انضباط • رأس مال أول",
      representTitle: "ماذا يمثل هذا المستوى",
      description:
        "يمثل مستوى Formiga المستثمر الذي يخرج من الفوضى المالية ويبدأ في بناء قاعدة حقيقية. قبل البحث عن العمليات أو الإشارات أو الثروة العالمية، يحتاج إلى فهم المال والمخاطر والروتين والسيولة والاستثمارات الأولى.",
      metrics: ["تنظيم", "مخاطر أساسية", "رأس مال أول"],
      marketsTitle: "الأسواق في مستوى Formiga",
      marketsText:
        "في مستوى Formiga يبدأ المستثمر بفهم الأسواق الرئيسية دون استعجال تداولها كلها في وقت واحد. التركيز هو فهم كيفية عمل كل سوق، وما المخاطر الموجودة، وكيف تتصل بالحياة المالية.",
      markets: [
        { title: "Forex", text: "فهم العملات والدولار وأزواج العملات ومخاطر الرافعة المالية." },
        { title: "الكريبتو", text: "فهم Bitcoin والعملات المستقرة والتقلب والأمان." },
        { title: "الأسهم", text: "فهم الشركات والبورصة والتوزيعات والدورات الاقتصادية." },
        { title: "الدخل الثابت", text: "فهم الفائدة والسيولة والاحتياطي والحماية الأولية." },
        { title: "الصناديق العقارية", text: "فهم الدخل والثروة والتدفق الشهري." },
      ],
      objectiveTitle: "هدف المستوى",
      objective: "الخروج من قاعدة مالية هشة وبناء تنظيم واحتياطي وانضباط ورؤية أولية للسوق.",
      evolutionTitle: "بطاقات التطور",
      modules: [
        { title: "الواقع المالي", text: "الدخل، الفواتير، الديون، السيولة والوضوح حول نقطة البداية." },
        { title: "الانضباط", text: "روتين مالي، تحكم عاطفي واستمرارية للتطور." },
        { title: "الأسواق الأولى", text: "مقدمة إلى Forex والكريبتو والأسهم والدخل الثابت والصناديق العقارية." },
      ],
      primary: "ابدأ في قناة Formiga",
      primaryHref: "free",
      secondary: "عرض التعليم",
      secondaryHref: educationHref,
    },
    tr: {
      eyebrow: "Formiga Seviyesi",
      title: "Genişlemeden önce finansal temel.",
      subtitle: "Organizasyon, disiplin, ilk yatırımlar, risk ve ilk sermaye inşası.",
      pillar: "Temel • Disiplin • İlk sermaye",
      representTitle: "Bu seviye neyi temsil eder",
      description:
        "Formiga seviyesi, finansal dağınıklıktan çıkıp gerçek bir temel kurmaya başlayan yatırımcıyı temsil eder. İşlem, sinyal veya küresel varlık aramadan önce para, risk, rutin, nakit ve ilk yatırımları anlaması gerekir.",
      metrics: ["Organizasyon", "Temel risk", "İlk sermaye"],
      marketsTitle: "Formiga seviyesindeki piyasalar",
      marketsText:
        "Formiga seviyesinde yatırımcı, tüm piyasalarda aynı anda işlem yapmaya acele etmeden ana piyasaları anlamaya başlar. Amaç, her piyasanın nasıl çalıştığını, risklerini ve finansal hayatla bağlantısını öğrenmektir.",
      markets: [
        { title: "Forex", text: "Para birimleri, dolar, pariteler ve kaldıraç riskini anlamak." },
        { title: "Kripto", text: "Bitcoin, stablecoin, volatilite ve güvenliği anlamak." },
        { title: "Hisseler", text: "Şirketleri, borsayı, temettüleri ve ekonomik döngüleri anlamak." },
        { title: "Sabit getiri", text: "Faiz, likidite, rezerv ve ilk korumayı anlamak." },
        { title: "Gayrimenkul fonları", text: "Gelir, varlık ve aylık nakit akışını anlamak." },
      ],
      objectiveTitle: "Seviyenin amacı",
      objective: "Zayıf finansal temelden çıkıp organizasyon, rezerv, disiplin ve ilk piyasa vizyonu kurmak.",
      evolutionTitle: "Gelişim kartları",
      modules: [
        { title: "Finansal gerçeklik", text: "Gelir, gider, borç, nakit akışı ve başlangıç noktasında netlik." },
        { title: "Disiplin", text: "Finansal rutin, duygusal kontrol ve gelişim için süreklilik." },
        { title: "İlk piyasalar", text: "Forex, kripto, hisse, sabit getiri ve gayrimenkul fonlarına giriş." },
      ],
      primary: "Formiga Kanalında başla",
      primaryHref: "free",
      secondary: "Eğitimi Gör",
      secondaryHref: educationHref,
    },
  },
  lobo: {
    pt: {
      eyebrow: "Nível Lobo",
      title: "Estratégia, leitura de mercado e execução.",
      subtitle: "O nível operacional para quem quer entender cenário, risco, ciclos e tomada de decisão.",
      pillar: "Estratégia • Operação • Expansão",
      representTitle: "O que este nível representa",
      description:
        "O nível Lobo representa o investidor que já saiu da base e começa a operar com estratégia. Aqui o foco deixa de ser apenas aprender conceitos e passa a ser leitura de mercado, execução, gestão de risco, posicionamento e tomada de decisão com disciplina.",
      metrics: ["Leitura de mercado", "Operação", "Posicionamento"],
      marketsTitle: "Mercados no nível Lobo",
      marketsText:
        "No nível Lobo, o investidor começa a conectar mercados, entender correlações e operar com contexto. O objetivo não é buscar movimento aleatório, mas interpretar cenário, risco, liquidez e oportunidade.",
      markets: [
        { title: "Forex", text: "Leitura de pares, dólar, juros, liquidez e operações estruturadas." },
        { title: "Ouro", text: "Proteção, ciclos de risco, dólar e cenário macro." },
        { title: "Petróleo", text: "Geopolítica, oferta, demanda e impacto global." },
        { title: "Cripto", text: "Ciclos de liquidez, Bitcoin, altcoins e gestão de volatilidade." },
        { title: "Ações", text: "Setores, resultados, índice, tendência e alocação." },
        { title: "Índices", text: "S&P 500, Nasdaq, Ibovespa e leitura de fluxo global." },
      ],
      objectiveTitle: "Objetivo do nível",
      objective: "Transformar informação em decisão. Operar com método, contexto e risco controlado.",
      evolutionTitle: "Cards de evolução",
      modules: [
        { title: "Decisão operacional", text: "Cenário, fluxo, direção e tomada de decisão com regra." },
        { title: "Mercado internacional", text: "Forex, ouro, petróleo, cripto, índices e moedas globais." },
        { title: "Ciclos e risco", text: "Correlação entre ativos, liquidez, risco avançado e carteira." },
      ],
      primary: "Ver Sinais ao Vivo",
      primaryHref: "/sinais",
      secondary: "Ver Educação",
      secondaryHref: educationHref,
    },
    en: {
      eyebrow: "Lobo Level",
      title: "Strategy, market reading, and execution.",
      subtitle: "The operational level for understanding scenarios, risk, cycles, and decision-making.",
      pillar: "Strategy • Operation • Expansion",
      representTitle: "What this level represents",
      description:
        "The Lobo level represents the investor who has left the base and begins operating with strategy. The focus moves from learning concepts to market reading, execution, risk management, positioning, and disciplined decision-making.",
      metrics: ["Market reading", "Operation", "Positioning"],
      marketsTitle: "Markets at the Lobo level",
      marketsText:
        "At the Lobo level, the investor starts connecting markets, understanding correlations, and operating with context. The objective is not random movement, but interpreting scenario, risk, liquidity, and opportunity.",
      markets: [
        { title: "Forex", text: "Reading pairs, dollar, rates, liquidity, and structured operations." },
        { title: "Gold", text: "Protection, risk cycles, dollar, and macro scenario." },
        { title: "Oil", text: "Geopolitics, supply, demand, and global impact." },
        { title: "Crypto", text: "Liquidity cycles, Bitcoin, altcoins, and volatility management." },
        { title: "Stocks", text: "Sectors, earnings, indices, trend, and allocation." },
        { title: "Indices", text: "S&P 500, Nasdaq, Ibovespa, and global flow reading." },
      ],
      objectiveTitle: "Level objective",
      objective: "Transform information into decisions. Operate with method, context, and controlled risk.",
      evolutionTitle: "Evolution cards",
      modules: [
        { title: "Operational decision", text: "Scenario, flow, direction, and rule-based decision-making." },
        { title: "International market", text: "Forex, gold, oil, crypto, indices, and global currencies." },
        { title: "Cycles and risk", text: "Asset correlation, liquidity, advanced risk, and portfolio structure." },
      ],
      primary: "View Live Signals",
      primaryHref: "/sinais",
      secondary: "View Education",
      secondaryHref: educationHref,
    },
    es: {
      eyebrow: "Nivel Lobo",
      title: "Estrategia, lectura de mercado y ejecución.",
      subtitle: "El nivel operativo para entender escenario, riesgo, ciclos y toma de decisión.",
      pillar: "Estrategia • Operación • Expansión",
      representTitle: "Qué representa este nivel",
      description:
        "El nivel Lobo representa al inversor que ya salió de la base y empieza a operar con estrategia. Aquí el foco deja de ser solo aprender conceptos y pasa a ser lectura de mercado, ejecución, gestión de riesgo, posicionamiento y toma de decisión con disciplina.",
      metrics: ["Lectura de mercado", "Operación", "Posicionamiento"],
      marketsTitle: "Mercados en el nivel Lobo",
      marketsText:
        "En el nivel Lobo, el inversor empieza a conectar mercados, entender correlaciones y operar con contexto. El objetivo no es buscar movimiento aleatorio, sino interpretar escenario, riesgo, liquidez y oportunidad.",
      markets: [
        { title: "Forex", text: "Lectura de pares, dólar, tasas, liquidez y operaciones estructuradas." },
        { title: "Oro", text: "Protección, ciclos de riesgo, dólar y escenario macro." },
        { title: "Petróleo", text: "Geopolítica, oferta, demanda e impacto global." },
        { title: "Cripto", text: "Ciclos de liquidez, Bitcoin, altcoins y gestión de volatilidad." },
        { title: "Acciones", text: "Sectores, resultados, índices, tendencia y asignación." },
        { title: "Índices", text: "S&P 500, Nasdaq, Ibovespa y lectura de flujo global." },
      ],
      objectiveTitle: "Objetivo del nivel",
      objective: "Transformar información en decisión. Operar con método, contexto y riesgo controlado.",
      evolutionTitle: "Cards de evolución",
      modules: [
        { title: "Decisión operativa", text: "Escenario, flujo, dirección y toma de decisión con regla." },
        { title: "Mercado internacional", text: "Forex, oro, petróleo, cripto, índices y monedas globales." },
        { title: "Ciclos y riesgo", text: "Correlación entre activos, liquidez, riesgo avanzado y cartera." },
      ],
      primary: "Ver señales en vivo",
      primaryHref: "/sinais",
      secondary: "Ver educación",
      secondaryHref: educationHref,
    },
    hi: {
      eyebrow: "Lobo स्तर",
      title: "रणनीति, बाजार समझ और निष्पादन।",
      subtitle: "परिदृश्य, जोखिम, चक्र और निर्णय को समझने का ऑपरेशनल स्तर।",
      pillar: "रणनीति • ऑपरेशन • विस्तार",
      representTitle: "यह स्तर क्या दर्शाता है",
      description:
        "Lobo स्तर उस निवेशक का प्रतिनिधित्व करता है जो आधार से आगे बढ़ चुका है और रणनीति के साथ ऑपरेट करना शुरू करता है। यहां ध्यान केवल concepts सीखने से हटकर market reading, execution, risk management, positioning और disciplined decision-making पर आता है।",
      metrics: ["बाजार-पठन", "ऑपरेशन", "पोजिशनिंग"],
      marketsTitle: "Lobo स्तर के बाजार",
      marketsText:
        "Lobo स्तर में निवेशक बाजारों को जोड़ना, correlations समझना और context के साथ operate करना शुरू करता है। उद्देश्य random movement खोजना नहीं, बल्कि scenario, risk, liquidity और opportunity को समझना है।",
      markets: [
        { title: "Forex", text: "Pairs, dollar, rates, liquidity और structured operations की reading." },
        { title: "Gold", text: "Protection, risk cycles, dollar और macro scenario." },
        { title: "Oil", text: "Geopolitics, supply, demand और global impact." },
        { title: "Crypto", text: "Liquidity cycles, Bitcoin, altcoins और volatility management." },
        { title: "Stocks", text: "Sectors, results, index, trend और allocation." },
        { title: "Indices", text: "S&P 500, Nasdaq, Ibovespa और global flow reading." },
      ],
      objectiveTitle: "स्तर का उद्देश्य",
      objective: "जानकारी को निर्णय में बदलना। Method, context और controlled risk के साथ operate करना।",
      evolutionTitle: "विकास कार्ड",
      modules: [
        { title: "ऑपरेशनल निर्णय", text: "परिदृश्य, flow, direction और rule-based decision-making." },
        { title: "अंतरराष्ट्रीय बाजार", text: "Forex, gold, oil, crypto, indices और global currencies." },
        { title: "चक्र और जोखिम", text: "Asset correlation, liquidity, advanced risk और portfolio structure." },
      ],
      primary: "लाइव सिग्नल देखें",
      primaryHref: "/sinais",
      secondary: "शिक्षा देखें",
      secondaryHref: educationHref,
    },
    ar: {
      eyebrow: "مستوى Lobo",
      title: "استراتيجية وقراءة سوق وتنفيذ.",
      subtitle: "المستوى التشغيلي لفهم السيناريو والمخاطر والدورات واتخاذ القرار.",
      pillar: "استراتيجية • تشغيل • توسع",
      representTitle: "ماذا يمثل هذا المستوى",
      description:
        "يمثل مستوى Lobo المستثمر الذي تجاوز القاعدة وبدأ يعمل باستراتيجية. هنا ينتقل التركيز من تعلم المفاهيم فقط إلى قراءة السوق والتنفيذ وإدارة المخاطر والتموضع واتخاذ القرار بانضباط.",
      metrics: ["قراءة السوق", "تشغيل", "تموضع"],
      marketsTitle: "الأسواق في مستوى Lobo",
      marketsText:
        "في مستوى Lobo يبدأ المستثمر بربط الأسواق وفهم الارتباطات والعمل ضمن سياق. الهدف ليس البحث عن حركة عشوائية، بل تفسير السيناريو والمخاطر والسيولة والفرصة.",
      markets: [
        { title: "Forex", text: "قراءة الأزواج والدولار والفائدة والسيولة والعمليات المنظمة." },
        { title: "الذهب", text: "حماية، دورات المخاطر، الدولار والسيناريو الكلي." },
        { title: "النفط", text: "جغرافيا سياسية، عرض، طلب وتأثير عالمي." },
        { title: "الكريبتو", text: "دورات السيولة، Bitcoin، altcoins وإدارة التقلب." },
        { title: "الأسهم", text: "قطاعات، نتائج، مؤشرات، اتجاه وتوزيع." },
        { title: "المؤشرات", text: "S&P 500، Nasdaq، Ibovespa وقراءة التدفق العالمي." },
      ],
      objectiveTitle: "هدف المستوى",
      objective: "تحويل المعلومات إلى قرار. العمل بمنهج وسياق ومخاطر مضبوطة.",
      evolutionTitle: "بطاقات التطور",
      modules: [
        { title: "قرار تشغيلي", text: "سيناريو، تدفق، اتجاه واتخاذ قرار وفق قواعد واضحة." },
        { title: "السوق الدولي", text: "Forex، ذهب، نفط، كريبتو، مؤشرات وعملات عالمية." },
        { title: "دورات ومخاطر", text: "ترابط الأصول، السيولة، المخاطر المتقدمة وبناء المحفظة." },
      ],
      primary: "شاهد الإشارات المباشرة",
      primaryHref: "/sinais",
      secondary: "عرض التعليم",
      secondaryHref: educationHref,
    },
    tr: {
      eyebrow: "Lobo Seviyesi",
      title: "Strateji, piyasa okuma ve uygulama.",
      subtitle: "Senaryo, risk, döngüler ve karar alma için operasyonel seviye.",
      pillar: "Strateji • Operasyon • Genişleme",
      representTitle: "Bu seviye neyi temsil eder",
      description:
        "Lobo seviyesi, temeli aşmış ve stratejiyle işlem yapmaya başlayan yatırımcıyı temsil eder. Odak artık sadece kavram öğrenmek değil; piyasa okuma, uygulama, risk yönetimi, konumlanma ve disiplinli karar almaktır.",
      metrics: ["Piyasa okuma", "Operasyon", "Konumlanma"],
      marketsTitle: "Lobo seviyesindeki piyasalar",
      marketsText:
        "Lobo seviyesinde yatırımcı piyasaları birbirine bağlamaya, korelasyonları anlamaya ve bağlamla işlem yapmaya başlar. Amaç rastgele hareket aramak değil; senaryo, risk, likidite ve fırsatı yorumlamaktır.",
      markets: [
        { title: "Forex", text: "Pariteler, dolar, faizler, likidite ve yapılandırılmış işlemler." },
        { title: "Altın", text: "Koruma, risk döngüleri, dolar ve makro senaryo." },
        { title: "Petrol", text: "Jeopolitik, arz, talep ve küresel etki." },
        { title: "Kripto", text: "Likidite döngüleri, Bitcoin, altcoinler ve volatilite yönetimi." },
        { title: "Hisseler", text: "Sektörler, sonuçlar, endeks, trend ve dağılım." },
        { title: "Endeksler", text: "S&P 500, Nasdaq, Ibovespa ve küresel akış okuma." },
      ],
      objectiveTitle: "Seviyenin amacı",
      objective: "Bilgiyi karara dönüştürmek. Metot, bağlam ve kontrollü riskle işlem yapmak.",
      evolutionTitle: "Gelişim kartları",
      modules: [
        { title: "Operasyonel karar", text: "Senaryo, akış, yön ve kurala bağlı karar alma." },
        { title: "Uluslararası piyasa", text: "Forex, altın, petrol, kripto, endeksler ve küresel para birimleri." },
        { title: "Döngüler ve risk", text: "Varlık korelasyonu, likidite, ileri risk ve portföy yapısı." },
      ],
      primary: "Canlı sinyalleri gör",
      primaryHref: "/sinais",
      secondary: "Eğitimi Gör",
      secondaryHref: educationHref,
    },
  },
  harpia: {
    pt: {
      eyebrow: "Nível Harpia",
      title: "Visão global, patrimônio e estrutura.",
      subtitle: "A fase de proteção, sucessão, moedas fortes, expansão internacional e decisão patrimonial.",
      pillar: "Patrimônio • Proteção • Visão global",
      representTitle: "O que este nível representa",
      description:
        "O nível Harpia representa a visão acima da operação. O investidor deixa de olhar apenas para entradas e saídas e começa a pensar em proteção patrimonial, estrutura internacional, moedas fortes, sucessão, diversificação e construção financeira de longo prazo.",
      metrics: ["Patrimônio", "Proteção", "Estrutura global"],
      marketsTitle: "Mercados no nível Harpia",
      marketsText:
        "No nível Harpia, os mercados são vistos como instrumentos de estrutura. Forex, cripto, ações, renda fixa, imóveis, metais, ETFs e contas internacionais passam a fazer parte de uma visão patrimonial mais ampla.",
      markets: [
        { title: "Forex", text: "Exposição cambial, moedas fortes e proteção internacional." },
        { title: "Cripto", text: "Custódia, Bitcoin, reserva alternativa e risco sistêmico." },
        { title: "Ações globais", text: "Empresas internacionais, setores, dividendos e crescimento." },
        { title: "ETFs", text: "Diversificação global, índices e construção de carteira." },
        { title: "Renda fixa global", text: "Juros, títulos, liquidez e preservação de capital." },
        { title: "Patrimônio", text: "Sucessão, proteção, estrutura familiar e visão geracional." },
      ],
      objectiveTitle: "Objetivo do nível",
      objective: "Construir uma estrutura financeira global que sobreviva a ciclos, moedas fracas, crises e mudanças de cenário.",
      evolutionTitle: "Cards de evolução",
      modules: [
        { title: "Macro global", text: "Geopolítica, juros, moedas, fluxo internacional e ciclos econômicos." },
        { title: "Proteção patrimonial", text: "Preservação, diversificação, alocação estratégica e moedas fortes." },
        { title: "Estrutura geracional", text: "Sucessão, família, expansão internacional e decisão patrimonial." },
      ],
      primary: "Conhecer Serviços",
      primaryHref: "/servicos",
      secondary: "Ver Educação",
      secondaryHref: educationHref,
    },
    en: {
      eyebrow: "Harpia Level",
      title: "Global vision, wealth, and structure.",
      subtitle: "The phase of protection, succession, strong currencies, international expansion, and wealth decisions.",
      pillar: "Wealth • Protection • Global vision",
      representTitle: "What this level represents",
      description:
        "The Harpia level represents vision above the operation. The investor stops looking only at entries and exits and starts thinking about wealth protection, international structure, strong currencies, succession, diversification, and long-term financial construction.",
      metrics: ["Wealth", "Protection", "Global structure"],
      marketsTitle: "Markets at the Harpia level",
      marketsText:
        "At the Harpia level, markets are seen as structural instruments. Forex, crypto, stocks, fixed income, real estate, metals, ETFs, and international accounts become part of a broader wealth vision.",
      markets: [
        { title: "Forex", text: "Currency exposure, strong currencies, and international protection." },
        { title: "Crypto", text: "Custody, Bitcoin, alternative reserve, and systemic risk." },
        { title: "Global stocks", text: "International companies, sectors, dividends, and growth." },
        { title: "ETFs", text: "Global diversification, indices, and portfolio construction." },
        { title: "Global fixed income", text: "Rates, bonds, liquidity, and capital preservation." },
        { title: "Wealth", text: "Succession, protection, family structure, and generational vision." },
      ],
      objectiveTitle: "Level objective",
      objective: "Build a global financial structure able to survive cycles, weak currencies, crises, and scenario changes.",
      evolutionTitle: "Evolution cards",
      modules: [
        { title: "Global macro", text: "Geopolitics, interest rates, currencies, international flow, and economic cycles." },
        { title: "Wealth protection", text: "Preservation, diversification, strategic allocation, and strong currencies." },
        { title: "Generational structure", text: "Succession, family, international expansion, and wealth decisions." },
      ],
      primary: "View Services",
      primaryHref: "/servicos",
      secondary: "View Education",
      secondaryHref: educationHref,
    },
    es: {
      eyebrow: "Nivel Harpia",
      title: "Visión global, patrimonio y estructura.",
      subtitle: "La fase de protección, sucesión, monedas fuertes, expansión internacional y decisión patrimonial.",
      pillar: "Patrimonio • Protección • Visión global",
      representTitle: "Qué representa este nivel",
      description:
        "El nivel Harpia representa la visión por encima de la operación. El inversor deja de mirar solo entradas y salidas y empieza a pensar en protección patrimonial, estructura internacional, monedas fuertes, sucesión, diversificación y construcción financiera de largo plazo.",
      metrics: ["Patrimonio", "Protección", "Estructura global"],
      marketsTitle: "Mercados en el nivel Harpia",
      marketsText:
        "En el nivel Harpia, los mercados se ven como instrumentos de estructura. Forex, cripto, acciones, renta fija, inmuebles, metales, ETFs y cuentas internacionales pasan a formar parte de una visión patrimonial más amplia.",
      markets: [
        { title: "Forex", text: "Exposición cambiaria, monedas fuertes y protección internacional." },
        { title: "Cripto", text: "Custodia, Bitcoin, reserva alternativa y riesgo sistémico." },
        { title: "Acciones globales", text: "Empresas internacionales, sectores, dividendos y crecimiento." },
        { title: "ETFs", text: "Diversificación global, índices y construcción de cartera." },
        { title: "Renta fija global", text: "Tasas, bonos, liquidez y preservación de capital." },
        { title: "Patrimonio", text: "Sucesión, protección, estructura familiar y visión generacional." },
      ],
      objectiveTitle: "Objetivo del nivel",
      objective: "Construir una estructura financiera global capaz de sobrevivir a ciclos, monedas débiles, crisis y cambios de escenario.",
      evolutionTitle: "Cards de evolución",
      modules: [
        { title: "Macro global", text: "Geopolítica, tasas de interés, monedas, flujo internacional y ciclos económicos." },
        { title: "Protección patrimonial", text: "Preservación, diversificación, asignación estratégica y monedas fuertes." },
        { title: "Estructura generacional", text: "Sucesión, familia, expansión internacional y decisión patrimonial." },
      ],
      primary: "Ver Servicios",
      primaryHref: "/servicos",
      secondary: "Ver educación",
      secondaryHref: educationHref,
    },
    hi: {
      eyebrow: "Harpia स्तर",
      title: "वैश्विक दृष्टि, संपत्ति और संरचना।",
      subtitle: "सुरक्षा, succession, मजबूत currencies, international expansion और wealth decisions का चरण।",
      pillar: "संपत्ति • सुरक्षा • वैश्विक दृष्टि",
      representTitle: "यह स्तर क्या दर्शाता है",
      description:
        "Harpia स्तर operation से ऊपर की दृष्टि का प्रतिनिधित्व करता है। निवेशक केवल entries और exits को देखना छोड़कर wealth protection, international structure, strong currencies, succession, diversification और long-term financial construction के बारे में सोचना शुरू करता है।",
      metrics: ["संपत्ति", "सुरक्षा", "वैश्विक संरचना"],
      marketsTitle: "Harpia स्तर के बाजार",
      marketsText:
        "Harpia स्तर में markets को structure के instruments के रूप में देखा जाता है। Forex, crypto, stocks, fixed income, real estate, metals, ETFs और international accounts एक व्यापक wealth vision का हिस्सा बनते हैं।",
      markets: [
        { title: "Forex", text: "Currency exposure, strong currencies और international protection." },
        { title: "Crypto", text: "Custody, Bitcoin, alternative reserve और systemic risk." },
        { title: "Global stocks", text: "International companies, sectors, dividends और growth." },
        { title: "ETFs", text: "Global diversification, indices और portfolio construction." },
        { title: "Global fixed income", text: "Rates, bonds, liquidity और capital preservation." },
        { title: "Wealth", text: "Succession, protection, family structure और generational vision." },
      ],
      objectiveTitle: "स्तर का उद्देश्य",
      objective: "ऐसी global financial structure बनाना जो cycles, weak currencies, crises और scenario changes से बच सके।",
      evolutionTitle: "विकास कार्ड",
      modules: [
        { title: "वैश्विक मैक्रो", text: "Geopolitics, rates, currencies, international flow और economic cycles." },
        { title: "संपत्ति सुरक्षा", text: "Preservation, diversification, strategic allocation और strong currencies." },
        { title: "पीढ़ीगत संरचना", text: "Succession, family, international expansion और wealth decisions." },
      ],
      primary: "सेवाएँ देखें",
      primaryHref: "/servicos",
      secondary: "शिक्षा देखें",
      secondaryHref: educationHref,
    },
    ar: {
      eyebrow: "مستوى Harpia",
      title: "رؤية عالمية وثروة وهيكل.",
      subtitle: "مرحلة الحماية والخلافة والعملات القوية والتوسع الدولي وقرارات الثروة.",
      pillar: "ثروة • حماية • رؤية عالمية",
      representTitle: "ماذا يمثل هذا المستوى",
      description:
        "يمثل مستوى Harpia الرؤية فوق العملية. لا ينظر المستثمر فقط إلى الدخول والخروج، بل يبدأ في التفكير بحماية الثروة والهيكل الدولي والعملات القوية والخلافة والتنويع والبناء المالي طويل الأجل.",
      metrics: ["ثروة", "حماية", "هيكل عالمي"],
      marketsTitle: "الأسواق في مستوى Harpia",
      marketsText:
        "في مستوى Harpia تُرى الأسواق كأدوات للهيكلة. Forex والكريبتو والأسهم والدخل الثابت والعقار والمعادن وETFs والحسابات الدولية تصبح جزءا من رؤية ثروية أوسع.",
      markets: [
        { title: "Forex", text: "تعرض للعملات، عملات قوية وحماية دولية." },
        { title: "الكريبتو", text: "حفظ، Bitcoin، احتياطي بديل ومخاطر نظامية." },
        { title: "الأسهم العالمية", text: "شركات دولية، قطاعات، توزيعات ونمو." },
        { title: "ETFs", text: "تنويع عالمي، مؤشرات وبناء محفظة." },
        { title: "الدخل الثابت العالمي", text: "فوائد، سندات، سيولة وحفظ رأس المال." },
        { title: "الثروة", text: "خلافة، حماية، هيكل عائلي ورؤية أجيال." },
      ],
      objectiveTitle: "هدف المستوى",
      objective: "بناء هيكل مالي عالمي قادر على النجاة من الدورات والعملات الضعيفة والأزمات وتغيرات السيناريو.",
      evolutionTitle: "بطاقات التطور",
      modules: [
        { title: "ماكرو عالمي", text: "جغرافيا سياسية، فائدة، عملات، تدفقات دولية ودورات اقتصادية." },
        { title: "حماية الثروة", text: "حفظ، تنويع، توزيع استراتيجي وعملات قوية." },
        { title: "هيكل أجيال", text: "خلافة، عائلة، توسع دولي وقرارات ثروة." },
      ],
      primary: "شاهد الخدمات",
      primaryHref: "/servicos",
      secondary: "عرض التعليم",
      secondaryHref: educationHref,
    },
    tr: {
      eyebrow: "Harpia Seviyesi",
      title: "Küresel vizyon, varlık ve yapı.",
      subtitle: "Koruma, devir, güçlü para birimleri, uluslararası genişleme ve varlık kararları aşaması.",
      pillar: "Varlık • Koruma • Küresel vizyon",
      representTitle: "Bu seviye neyi temsil eder",
      description:
        "Harpia seviyesi operasyonun üstündeki vizyonu temsil eder. Yatırımcı artık yalnızca giriş ve çıkışlara bakmaz; varlık koruma, uluslararası yapı, güçlü para birimleri, devir, çeşitlendirme ve uzun vadeli finansal inşa düşünmeye başlar.",
      metrics: ["Varlık", "Koruma", "Küresel yapı"],
      marketsTitle: "Harpia seviyesindeki piyasalar",
      marketsText:
        "Harpia seviyesinde piyasalar yapı araçları olarak görülür. Forex, kripto, hisseler, sabit getiri, gayrimenkul, metaller, ETF'ler ve uluslararası hesaplar daha geniş bir varlık vizyonunun parçası olur.",
      markets: [
        { title: "Forex", text: "Döviz maruziyeti, güçlü para birimleri ve uluslararası koruma." },
        { title: "Kripto", text: "Saklama, Bitcoin, alternatif rezerv ve sistemik risk." },
        { title: "Küresel hisseler", text: "Uluslararası şirketler, sektörler, temettüler ve büyüme." },
        { title: "ETF'ler", text: "Küresel çeşitlendirme, endeksler ve portföy inşası." },
        { title: "Küresel sabit getiri", text: "Faizler, tahviller, likidite ve sermaye koruma." },
        { title: "Varlık", text: "Devir, koruma, aile yapısı ve nesil vizyonu." },
      ],
      objectiveTitle: "Seviyenin amacı",
      objective: "Döngülere, zayıf para birimlerine, krizlere ve senaryo değişimlerine dayanabilecek küresel bir finansal yapı kurmak.",
      evolutionTitle: "Gelişim kartları",
      modules: [
        { title: "Küresel makro", text: "Jeopolitik, faizler, para birimleri, uluslararası akış ve ekonomik döngüler." },
        { title: "Varlık koruma", text: "Koruma, çeşitlendirme, stratejik dağılım ve güçlü para birimleri." },
        { title: "Nesil yapısı", text: "Devir, aile, uluslararası genişleme ve varlık kararları." },
      ],
      primary: "Hizmetleri Gör",
      primaryHref: "/servicos",
      secondary: "Eğitimi Gör",
      secondaryHref: educationHref,
    },
  },
};

function MarketCard({ market, index, locale }: { market: LinkedLevelMarket; index: number; locale: Locale }) {
  return (
    <Link
      href={market.href}
      aria-label={getMarketAriaLabel(locale, market.title)}
      className="group block h-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
    >
      <motion.article
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: index * 0.04 }}
        variants={fadeUp}
        className="market-card terminal-module relative h-full overflow-hidden border border-gold/[0.2] bg-white p-5 shadow-fine transition duration-300 group-hover:-translate-y-1 group-hover:border-gold/[0.62] group-hover:shadow-[0_0_36px_rgba(201,155,62,0.14)] md:p-6"
      >
        <div className="absolute inset-0 luxury-grid opacity-20 transition group-hover:opacity-35" />
        <div className="relative flex h-full flex-col">
          <div className="flex items-start justify-between gap-4">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
              {String(index + 1).padStart(2, "0")}
            </p>
            <span className="market-card-arrow text-xl text-gold opacity-60 transition group-hover:translate-x-1 group-hover:opacity-100" aria-hidden="true">
              →
            </span>
          </div>
          <h3 className="mt-5 font-serif text-3xl tracking-[-0.04em]">{market.title}</h3>
          <p className="mt-3 leading-7 text-ink/[0.66]">{market.text}</p>
          <span className="mt-5 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-gold md:mt-auto md:pt-5">
            {getMarketActionLabel(locale)}
            <span aria-hidden="true">→</span>
          </span>
        </div>
      </motion.article>
    </Link>
  );
}

export function LevelPage({ level }: { level: Level }) {
  const { locale, t, changeLocale } = useSiteLocale();
  const copy = (levelCopies[level][locale] ?? levelCopies[level].en) as LevelCopy;
  const primaryHref = copy.primaryHref === "free" ? t.freeChannel.link : copy.primaryHref;
  const primaryExternal = copy.primaryHref === "free";
  const linkedMarkets = copy.markets
    .map((market) => {
      const href = getLevelMarketHref(locale, market);
      return href ? { ...market, href } : null;
    })
    .filter((market): market is LinkedLevelMarket => Boolean(market));

  return (
    <main lang={locale === "pt" ? "pt-BR" : locale} dir={locale === "ar" || locale === "ur" || locale === "fa" ? "rtl" : "ltr"} className="min-h-screen overflow-hidden bg-paper text-ink">
      <SiteChrome locale={locale} t={t} onLocaleChange={changeLocale} />

      <section className="page-hero premium-stage relative px-5 pb-16 pt-36 md:px-8 md:pb-24 md:pt-48">
        <div className="cinematic-noise" />
        <div className="absolute left-1/2 top-28 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-gold/[0.09] blur-3xl" />
        <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: 0.08 }} className="relative mx-auto max-w-[1280px]">
          <motion.p variants={fadeUp} className="text-xs font-black uppercase tracking-[0.32em] text-gold">
            {copy.eyebrow}
          </motion.p>
          <motion.h1 variants={fadeUp} className="mt-6 max-w-5xl text-balance font-serif text-[3rem] leading-[0.98] tracking-[-0.045em] md:text-[5.8rem]">
            {copy.title}
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-7 max-w-3xl text-lg leading-8 text-ink/[0.68] md:text-xl md:leading-9">
            {copy.subtitle}
          </motion.p>
          <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href={primaryHref}
              target={primaryExternal ? "_blank" : undefined}
              rel={primaryExternal ? "noopener noreferrer" : undefined}
              className="premium-button-gold border border-gold bg-gold px-7 py-4 text-center text-sm font-black uppercase tracking-[0.18em] text-ink transition hover:-translate-y-0.5"
            >
              {copy.primary}
            </a>
            <a href={copy.secondaryHref} className="premium-button-ghost border border-ink/[0.18] bg-paper/[0.03] px-7 py-4 text-center text-sm font-black uppercase tracking-[0.18em] text-ink transition hover:-translate-y-0.5">
              {copy.secondary}
            </a>
          </motion.div>
        </motion.div>
      </section>

      <section className="px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-[1280px] gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <motion.article initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="terminal-module relative overflow-hidden border border-gold/[0.24] bg-white p-7 shadow-premium md:p-9">
            <div className="absolute inset-0 luxury-grid opacity-25" />
            <div className="relative">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-gold">{copy.pillar}</p>
              <h2 className="mt-7 font-serif text-4xl tracking-[-0.04em]">{copy.representTitle}</h2>
              <p className="mt-5 text-lg leading-9 text-ink/[0.72]">{copy.description}</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {copy.metrics.map((metric) => (
                  <div key={metric} className="border border-gold/[0.18] bg-paper/[0.04] p-4 text-center">
                    <p className="text-xs font-black uppercase tracking-[0.14em] text-gold">{metric}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.article>

          <motion.article initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="terminal-module relative overflow-hidden border border-rise/[0.18] bg-white p-7 shadow-premium md:p-9">
            <div className="absolute inset-0 signal-grid opacity-20" />
            <div className="relative">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-rise">{copy.objectiveTitle}</p>
              <p className="mt-7 font-serif text-3xl leading-[1.16] tracking-[-0.035em] md:text-4xl">{copy.objective}</p>
            </div>
          </motion.article>
        </div>
      </section>

      <section className="border-y border-ink/[0.08] bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-[1280px]">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-4xl">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-gold">{copy.marketsTitle}</p>
            <h2 className="mt-5 font-serif text-4xl leading-[1.04] tracking-[-0.04em] md:text-6xl">{copy.marketsTitle}</h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-ink/[0.66]">{copy.marketsText}</p>
          </motion.div>
          <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {linkedMarkets.map((market, index) => (
              <MarketCard key={market.title} market={market} index={index} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-[1280px]">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-gold">{copy.evolutionTitle}</p>
            <h2 className="mt-5 max-w-4xl font-serif text-4xl leading-[1.04] tracking-[-0.04em] md:text-6xl">{copy.evolutionTitle}</h2>
          </motion.div>
          <div className="mt-9 grid gap-4 lg:grid-cols-3">
            {copy.modules.map((module, index) => (
              <motion.article key={module.title} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: index * 0.05 }} variants={fadeUp} className="level-card system-module relative overflow-hidden p-6 shadow-fine md:p-7">
                <div className="relative">
                  <span className="grid h-14 w-14 place-items-center border border-gold/[0.5] font-mono text-sm text-gold">0{index + 1}</span>
                  <h3 className="mt-8 font-serif text-3xl tracking-[-0.04em]">{module.title}</h3>
                  <p className="mt-3 leading-7 text-ink/[0.66]">{module.text}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-10 md:px-8 md:py-12">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-3 sm:flex-row">
          <a
            href={primaryHref}
            target={primaryExternal ? "_blank" : undefined}
            rel={primaryExternal ? "noopener noreferrer" : undefined}
            className="premium-button-gold flex min-h-12 flex-1 items-center justify-center border border-gold bg-gold px-7 py-4 text-center text-sm font-black uppercase tracking-[0.18em] text-ink transition hover:-translate-y-0.5"
          >
            {copy.primary}
          </a>
          <a href={copy.secondaryHref} className="premium-button-ghost flex min-h-12 flex-1 items-center justify-center border border-ink/[0.18] bg-paper/[0.03] px-7 py-4 text-center text-sm font-black uppercase tracking-[0.18em] text-ink transition hover:-translate-y-0.5">
            {copy.secondary}
          </a>
        </div>
      </section>

      <section className="px-5 py-12 md:px-8 md:py-14">
        <div className="mx-auto max-w-[1280px]">
          <FreeChannelCTA t={t} />
        </div>
      </section>

      <SupportFooter t={t} locale={locale} onLocaleChange={changeLocale} />
    </main>
  );
}
