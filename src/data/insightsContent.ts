import type { Locale } from "../i18n";
import { getMarketLabel, publicMarketSlugs, type MarketSlug } from "./marketContent";

export type InsightCategoryKey =
  | "macro"
  | "forex"
  | "stocks"
  | "crypto"
  | "commodities"
  | "etfs"
  | "risk"
  | "wealth";

export type InsightPost = {
  slug: string;
  locale: Locale;
  title: string;
  description: string;
  category: InsightCategoryKey;
  author: string;
  date: string;
  readingTime: string;
  image: string;
  tags: string[];
  content: string[];
  relatedPosts: string[];
  seoTitle: string;
  seoDescription: string;
};

export const insightsBasePath: Record<Locale, string> = {
  pt: "/insights-globais",
  en: "/global-insights",
  es: "/insights-globales",
  hi: "/global-insights-hi",
  ar: "/ar/global-insights",
  tr: "/tr/global-insights",
};

export const insightLocales: Locale[] = ["pt", "en", "es", "hi", "ar", "tr"];

export const insightsHero: Record<Locale, { title: string; subtitle: string; metaDescription: string }> = {
  pt: {
    title: "Insights Globais",
    subtitle:
      "Analises editoriais sobre Forex, acoes, cripto, commodities, ETFs, ciclos economicos e estrutura financeira global.",
    metaDescription:
      "Insights Globais do Varejo Investidor: analises sobre Forex, acoes, cripto, commodities, ETFs, ciclos economicos e estrutura financeira global para investidores de varejo.",
  },
  en: {
    title: "Global Insights",
    subtitle:
      "Editorial analysis on Forex, stocks, crypto, commodities, ETFs, economic cycles and global financial structure.",
    metaDescription:
      "Global Insights by Varejo Investidor: analysis on Forex, stocks, crypto, commodities, ETFs, economic cycles and global financial structure for retail investors.",
  },
  es: {
    title: "Insights Globales",
    subtitle:
      "Analisis editorial sobre Forex, acciones, cripto, commodities, ETFs, ciclos economicos y estructura financiera global.",
    metaDescription:
      "Insights Globales de Varejo Investidor: analisis sobre Forex, acciones, cripto, commodities, ETFs, ciclos economicos y estructura financiera global.",
  },
  hi: {
    title: "ग्लोबल इनसाइट्स",
    subtitle:
      "Forex, शेयर, क्रिप्टो, कमोडिटी, ETFs, आर्थिक चक्र और वैश्विक वित्तीय संरचना पर संस्थागत विश्लेषण।",
    metaDescription:
      "Varejo Investidor ग्लोबल इनसाइट्स: Forex, शेयर, क्रिप्टो, कमोडिटी, ETFs और वैश्विक वित्तीय संरचना पर विश्लेषण।",
  },
  ar: {
    title: "رؤى عالمية",
    subtitle:
      "تحليلات تحريرية حول الفوركس والأسهم والكريبتو والسلع وETFs والدورات الاقتصادية والهيكلة المالية العالمية.",
    metaDescription:
      "رؤى عالمية من Varejo Investidor حول الفوركس والأسهم والكريبتو والسلع وETFs والدورات الاقتصادية والهيكلة المالية العالمية.",
  },
  tr: {
    title: "Kuresel Icgoruler",
    subtitle:
      "Forex, hisseler, kripto, emtialar, ETF'ler, ekonomik donguler ve kuresel finansal yapi uzerine editorial analizler.",
    metaDescription:
      "Varejo Investidor Kuresel Icgoruler: Forex, hisseler, kripto, emtialar, ETF'ler, ekonomik donguler ve kuresel finansal yapi analizleri.",
  },
};

export const insightLabels: Record<
  Locale,
  {
    nav: string;
    content: string;
    latest: string;
    recent: string;
    categories: string;
    all: string;
    read: string;
    whatsappTitle: string;
    newsletterTitle: string;
    newsletterText: string;
    email: string;
    newsletterButton: string;
    newsletterSuccess: string;
    markets: string;
    faq: string;
    related: string;
    education: string;
    levelBlockTitle: string;
    formiga: string;
    lobo: string;
    harpia: string;
    postCtaTitle: string;
    postCtaText: string;
  }
> = {
  pt: {
    nav: "Insights",
    content: "Conteudo",
    latest: "Ultima analise",
    recent: "Posts recentes",
    categories: "Categorias",
    all: "Todos",
    read: "Ler analise",
    whatsappTitle: "Comece pelo Canal Formiga",
    newsletterTitle: "Receba Insights Globais",
    newsletterText: "Analises, ciclos e conteudos estrategicos do Varejo Investidor por e-mail ou WhatsApp.",
    email: "E-mail",
    newsletterButton: "Receber insights",
    newsletterSuccess: "Pronto. Seu interesse foi registrado visualmente.",
    markets: "Mercados conectados",
    faq: "Perguntas frequentes",
    related: "Posts relacionados",
    education: "Ver Educacao",
    levelBlockTitle: "Como cada nivel enxerga este tema",
    formiga: "Entende o impacto basico na renda, moeda, organizacao e primeiro capital.",
    lobo: "Analisa cenario, risco, liquidez e oportunidade operacional.",
    harpia: "Observa patrimonio, protecao, moedas fortes e estrutura internacional.",
    postCtaTitle: "Aprofunde sua leitura dentro da formacao",
    postCtaText: "Conecte este insight a jornada Formiga, Lobo e Harpia para evoluir com metodo.",
  },
  en: {
    nav: "Insights",
    content: "Content",
    latest: "Latest analysis",
    recent: "Recent posts",
    categories: "Categories",
    all: "All",
    read: "Read analysis",
    whatsappTitle: "Start with the Formiga Channel",
    newsletterTitle: "Receive Global Insights",
    newsletterText: "Analysis, cycles and strategic content from Varejo Investidor by email or WhatsApp.",
    email: "Email",
    newsletterButton: "Get insights",
    newsletterSuccess: "Done. Your request was visually registered.",
    markets: "Connected markets",
    faq: "FAQ",
    related: "Related posts",
    education: "View Education",
    levelBlockTitle: "How each level reads this topic",
    formiga: "Understands the basic impact on income, currency, organization and first capital.",
    lobo: "Analyzes scenario, risk, liquidity and operational opportunity.",
    harpia: "Sees wealth, protection, strong currencies and international structure.",
    postCtaTitle: "Deepen your reading inside the education path",
    postCtaText: "Connect this insight to the Formiga, Lobo and Harpia journey to evolve with method.",
  },
  es: {
    nav: "Insights",
    content: "Contenido",
    latest: "Ultimo analisis",
    recent: "Posts recientes",
    categories: "Categorias",
    all: "Todos",
    read: "Leer analisis",
    whatsappTitle: "Comienza por el Canal Formiga",
    newsletterTitle: "Recibe Insights Globales",
    newsletterText: "Analisis, ciclos y contenidos estrategicos de Varejo Investidor por e-mail o WhatsApp.",
    email: "E-mail",
    newsletterButton: "Recibir insights",
    newsletterSuccess: "Listo. Tu solicitud fue registrada visualmente.",
    markets: "Mercados conectados",
    faq: "Preguntas frecuentes",
    related: "Posts relacionados",
    education: "Ver Educacion",
    levelBlockTitle: "Como cada nivel lee este tema",
    formiga: "Entiende el impacto basico en ingresos, moneda, organizacion y primer capital.",
    lobo: "Analiza escenario, riesgo, liquidez y oportunidad operativa.",
    harpia: "Observa patrimonio, proteccion, monedas fuertes y estructura internacional.",
    postCtaTitle: "Profundiza tu lectura dentro de la formacion",
    postCtaText: "Conecta este insight con la jornada Formiga, Lobo y Harpia para evolucionar con metodo.",
  },
  hi: {
    nav: "इनसाइट्स",
    content: "कंटेंट",
    latest: "नवीनतम विश्लेषण",
    recent: "हाल के पोस्ट",
    categories: "श्रेणियां",
    all: "सभी",
    read: "विश्लेषण पढ़ें",
    whatsappTitle: "Formiga चैनल से शुरुआत करें",
    newsletterTitle: "ग्लोबल इनसाइट्स प्राप्त करें",
    newsletterText: "Varejo Investidor के विश्लेषण, चक्र और रणनीतिक कंटेंट ई-mail या WhatsApp पर प्राप्त करें।",
    email: "ई-mail",
    newsletterButton: "इनसाइट्स प्राप्त करें",
    newsletterSuccess: "हो गया। आपका अनुरोध दर्ज हो गया।",
    markets: "जुड़े हुए बाजार",
    faq: "सामान्य प्रश्न",
    related: "संबंधित पोस्ट",
    education: "शिक्षा देखें",
    levelBlockTitle: "हर स्तर इस विषय को कैसे पढ़ता है",
    formiga: "आय, मुद्रा, संगठन और पहले पूंजी पर मूल प्रभाव समझता है।",
    lobo: "परिदृश्य, जोखिम, लिक्विडिटी और ऑपरेशनल अवसर का विश्लेषण करता है।",
    harpia: "संपत्ति, सुरक्षा, मजबूत मुद्राएं और अंतरराष्ट्रीय संरचना देखता है।",
    postCtaTitle: "शिक्षा मार्ग में अपनी समझ गहरी करें",
    postCtaText: "इस इनसाइट को Formiga, Lobo और Harpia यात्रा से जोड़कर विधि के साथ विकसित हों।",
  },
  ar: {
    nav: "رؤى",
    content: "المحتوى",
    latest: "آخر تحليل",
    recent: "منشورات حديثة",
    categories: "الفئات",
    all: "الكل",
    read: "اقرأ التحليل",
    whatsappTitle: "ابدأ من قناة Formiga",
    newsletterTitle: "استقبل الرؤى العالمية",
    newsletterText: "تحليلات ودورات ومحتوى استراتيجي من Varejo Investidor عبر البريد أو WhatsApp.",
    email: "البريد الالكتروني",
    newsletterButton: "احصل على الرؤى",
    newsletterSuccess: "تم تسجيل طلبك بصريا.",
    markets: "اسواق مرتبطة",
    faq: "اسئلة شائعة",
    related: "منشورات مرتبطة",
    education: "عرض التعليم",
    levelBlockTitle: "كيف يقرأ كل مستوى هذا الموضوع",
    formiga: "يفهم الاثر الاساسي على الدخل والعملة والتنظيم ورأس المال الاول.",
    lobo: "يحلل السيناريو والمخاطر والسيولة والفرصة التشغيلية.",
    harpia: "يرى الثروة والحماية والعملات القوية والهيكلة الدولية.",
    postCtaTitle: "عمق قراءتك داخل مسار التعليم",
    postCtaText: "اربط هذه الرؤية برحلة Formiga وLobo وHarpia للتطور بمنهجية.",
  },
  tr: {
    nav: "Icgoruler",
    content: "Icerik",
    latest: "Son analiz",
    recent: "Son yazilar",
    categories: "Kategoriler",
    all: "Tumu",
    read: "Analizi oku",
    whatsappTitle: "Formiga Kanali ile baslayin",
    newsletterTitle: "Kuresel Icgoruler Al",
    newsletterText: "Varejo Investidor analizleri, donguleri ve stratejik icerikleri e-posta veya WhatsApp ile alin.",
    email: "E-mail",
    newsletterButton: "Icgoru al",
    newsletterSuccess: "Tamam. Talebiniz gorsel olarak kaydedildi.",
    markets: "Baglantili piyasalar",
    faq: "SSS",
    related: "Ilgili yazilar",
    education: "Egitimi Gor",
    levelBlockTitle: "Her seviye bu konuyu nasil okur",
    formiga: "Gelir, para birimi, organizasyon ve ilk sermaye uzerindeki temel etkiyi anlar.",
    lobo: "Senaryo, risk, likidite ve operasyonel firsati analiz eder.",
    harpia: "Varlik, koruma, guclu para birimleri ve uluslararasi yapiyi gorur.",
    postCtaTitle: "Okumanizi egitim yolu icinde derinlestirin",
    postCtaText: "Bu icgoruyu Formiga, Lobo ve Harpia yolculuguna baglayarak metodla gelisin.",
  },
};

export const insightCategories: Record<Locale, Record<InsightCategoryKey, string>> = {
  pt: { macro: "Macro Global", forex: "Forex", stocks: "Acoes", crypto: "Cripto", commodities: "Commodities", etfs: "ETFs", risk: "Risco", wealth: "Patrimonio" },
  en: { macro: "Global Macro", forex: "Forex", stocks: "Stocks", crypto: "Crypto", commodities: "Commodities", etfs: "ETFs", risk: "Risk", wealth: "Wealth" },
  es: { macro: "Macro Global", forex: "Forex", stocks: "Acciones", crypto: "Cripto", commodities: "Commodities", etfs: "ETFs", risk: "Riesgo", wealth: "Patrimonio" },
  hi: { macro: "ग्लोबल मैक्रो", forex: "Forex", stocks: "शेयर", crypto: "क्रिप्टो", commodities: "कमोडिटी", etfs: "ETFs", risk: "जोखिम", wealth: "संपत्ति" },
  ar: { macro: "ماكرو عالمي", forex: "الفوركس", stocks: "الاسهم", crypto: "الكريبتو", commodities: "السلع", etfs: "ETFs", risk: "المخاطر", wealth: "الثروة" },
  tr: { macro: "Kuresel Makro", forex: "Forex", stocks: "Hisseler", crypto: "Kripto", commodities: "Emtialar", etfs: "ETF'ler", risk: "Risk", wealth: "Varlik" },
};

const titleSets: Record<Locale, Array<[string, string, InsightCategoryKey, string]>> = {
  pt: [
    ["dolar-juros-e-mercado-global", "O que o dolar revela sobre o mercado global", "macro", "Dolar, juros, liquidez e risco continuam sendo a linguagem central dos ciclos globais."],
    ["forex-ouro-e-petroleo", "Forex, ouro e petroleo: como os mercados se conectam", "forex", "Moedas, energia e metais contam a mesma historia por angulos diferentes."],
    ["ciclos-economicos-varejo", "Por que o varejo precisa entender ciclos economicos", "risk", "Ciclos explicam risco, oportunidade, liquidez e construcao de patrimonio."],
    ["bitcoin-liquidez-e-risco", "Bitcoin, liquidez e risco: o que observar", "crypto", "Cripto exige leitura de liquidez, seguranca, ciclo e apetite por risco."],
    ["etfs-acoes-globais-patrimonio", "ETFs e acoes globais na construcao de patrimonio", "wealth", "Carteiras globais comecam com diversificacao, moeda forte e estrutura de longo prazo."],
  ],
  en: [
    ["dollar-rates-and-global-markets", "What the dollar reveals about global markets", "macro", "The dollar, rates, liquidity and risk remain the core language of global cycles."],
    ["forex-gold-and-oil", "Forex, gold and oil: how markets connect", "forex", "Currencies, energy and metals tell the same global story from different angles."],
    ["retail-investors-economic-cycles", "Why retail investors need economic cycles", "risk", "Cycles explain risk, opportunity, liquidity and long-term wealth building."],
    ["bitcoin-liquidity-and-risk", "Bitcoin, liquidity and risk: what to watch", "crypto", "Crypto requires reading liquidity, security, cycle and risk appetite."],
    ["etfs-global-stocks-wealth", "ETFs and global stocks in wealth building", "wealth", "Global portfolios start with diversification, strong currency and long-term structure."],
  ],
  es: [
    ["dolar-tasas-mercados-globales", "Lo que el dolar revela sobre los mercados globales", "macro", "Dolar, tasas, liquidez y riesgo siguen siendo el lenguaje central de los ciclos globales."],
    ["forex-oro-petroleo", "Forex, oro y petroleo: como se conectan los mercados", "forex", "Monedas, energia y metales cuentan la misma historia global desde angulos distintos."],
    ["ciclos-economicos-minoristas", "Por que el inversor minorista necesita ciclos economicos", "risk", "Los ciclos explican riesgo, oportunidad, liquidez y construccion patrimonial."],
    ["bitcoin-liquidez-riesgo", "Bitcoin, liquidez y riesgo: que observar", "crypto", "Cripto exige lectura de liquidez, seguridad, ciclo y apetito por riesgo."],
    ["etfs-acciones-globales-patrimonio", "ETFs y acciones globales en la construccion patrimonial", "wealth", "Las carteras globales empiezan con diversificacion, moneda fuerte y largo plazo."],
  ],
  hi: [
    ["dollar-rates-global-markets", "Dollar वैश्विक बाजार के बारे में क्या बताता है", "macro", "Dollar, rates, liquidity और risk वैश्विक चक्रों की मुख्य भाषा हैं।"],
    ["forex-gold-oil", "Forex, gold और oil: बाजार कैसे जुड़ते हैं", "forex", "Currencies, energy और metals एक ही global story को अलग angles से दिखाते हैं।"],
    ["economic-cycles-retail", "Retail investors को economic cycles क्यों समझने चाहिए", "risk", "Cycles risk, opportunity, liquidity और wealth building को समझाते हैं।"],
    ["bitcoin-liquidity-risk", "Bitcoin, liquidity और risk: क्या देखें", "crypto", "Crypto में liquidity, security, cycle और risk appetite पढ़ना जरूरी है।"],
    ["etfs-global-stocks-wealth", "ETFs और global stocks wealth building में", "wealth", "Global portfolios diversification, strong currency और long-term structure से शुरू होते हैं।"],
  ],
  ar: [
    ["dollar-rates-global-markets", "ماذا يكشف الدولار عن الاسواق العالمية", "macro", "الدولار والفائدة والسيولة والمخاطر هي لغة الدورات العالمية."],
    ["forex-gold-oil", "الفوركس والذهب والنفط: كيف تتصل الاسواق", "forex", "العملات والطاقة والمعادن تروي القصة العالمية من زوايا مختلفة."],
    ["economic-cycles-retail", "لماذا يحتاج المستثمر الفردي الى فهم الدورات الاقتصادية", "risk", "الدورات تشرح المخاطر والفرص والسيولة وبناء الثروة."],
    ["bitcoin-liquidity-risk", "Bitcoin والسيولة والمخاطر: ما الذي نراقبه", "crypto", "الكريبتو يتطلب قراءة السيولة والامان والدورة وشهية المخاطر."],
    ["etfs-global-stocks-wealth", "ETFs والاسهم العالمية في بناء الثروة", "wealth", "المحافظ العالمية تبدأ بالتنويع والعملة القوية والهيكل طويل الاجل."],
  ],
  tr: [
    ["dollar-rates-global-markets", "Dolar kuresel piyasalar hakkinda ne anlatir", "macro", "Dolar, faizler, likidite ve risk kuresel dongulerin ana dilidir."],
    ["forex-gold-oil", "Forex, altin ve petrol: piyasalar nasil baglanir", "forex", "Para birimleri, enerji ve metaller ayni kuresel hikayeyi farkli acilardan anlatir."],
    ["economic-cycles-retail", "Bireysel yatirimcilar ekonomik donguleri neden anlamali", "risk", "Donguler risk, firsat, likidite ve varlik insasini aciklar."],
    ["bitcoin-liquidity-risk", "Bitcoin, likidite ve risk: ne izlenmeli", "crypto", "Kripto likidite, guvenlik, dongu ve risk istahi okumayi gerektirir."],
    ["etfs-global-stocks-wealth", "ETF'ler ve kuresel hisselerle varlik insasi", "wealth", "Kuresel portfoyler cesitlendirme, guclu para ve uzun vadeli yapi ile baslar."],
  ],
};

function bodyCopy(locale: Locale) {
  const first: Record<Locale, string> = {
    pt: "A leitura institucional comeca pela relacao entre liquidez, juros, moeda e apetite por risco. Quando esses vetores mudam, os mercados globais se reposicionam antes que o investidor comum perceba.",
    en: "Institutional reading begins with the relationship between liquidity, rates, currency and risk appetite. When these vectors change, global markets reposition before the ordinary investor notices.",
    es: "La lectura institucional comienza por la relacion entre liquidez, tasas, moneda y apetito por riesgo. Cuando esos vectores cambian, los mercados globales se reposicionan antes de que el inversor comun lo perciba.",
    hi: "संस्थागत पढ़ाई liquidity, rates, currency और risk appetite के संबंध से शुरू होती है। जब ये तत्व बदलते हैं, global markets पहले से reposition करते हैं।",
    ar: "تبدأ القراءة المؤسسية من العلاقة بين السيولة والفائدة والعملة وشهية المخاطر. عندما تتغير هذه العوامل، تعيد الاسواق العالمية تموضعها مبكرا.",
    tr: "Kurumsal okuma likidite, faiz, para birimi ve risk istahi iliskisiyle baslar. Bu vektorler degistiginde kuresel piyasalar erken konumlanir.",
  };
  const second: Record<Locale, string> = {
    pt: "Dentro da metodologia Formiga, Lobo e Harpia, a analise nao serve apenas para prever preco. Ela organiza comportamento financeiro, risco operacional e construcao patrimonial global.",
    en: "Inside the Formiga, Lobo and Harpia methodology, analysis is not only about predicting price. It organizes financial behavior, operational risk and global wealth building.",
    es: "Dentro de la metodologia Formiga, Lobo y Harpia, el analisis no sirve solo para prever precio. Organiza comportamiento financiero, riesgo operativo y construccion patrimonial global.",
    hi: "Formiga, Lobo और Harpia methodology में analysis केवल price predict करने के लिए नहीं है। यह financial behavior, operational risk और global wealth building को organize करता है।",
    ar: "ضمن منهجية Formiga وLobo وHarpia، لا يهدف التحليل فقط الى توقع السعر، بل ينظم السلوك المالي والمخاطر التشغيلية وبناء الثروة العالمية.",
    tr: "Formiga, Lobo ve Harpia metodolojisinde analiz sadece fiyat tahmini degildir. Finansal davranisi, operasyonel riski ve kuresel varlik insasini duzenler.",
  };
  return [first[locale], second[locale]];
}

function makePost(locale: Locale, item: [string, string, InsightCategoryKey, string], index: number): InsightPost {
  const [slug, title, category, description] = item;
  const date = `2026-0${Math.min(index + 1, 5)}-0${index + 2}`;
  const read = locale === "pt" ? `${6 + index} min de leitura` : locale === "es" ? `${6 + index} min de lectura` : `${6 + index} min read`;

  return {
    slug,
    locale,
    title,
    description,
    category,
    author: "Varejo Investidor",
    date,
    readingTime: read,
    image: `/insights/${slug}.jpg`,
    tags: [insightCategories[locale][category], "Varejo Investidor", "Global Markets"],
    content: [description, ...bodyCopy(locale)],
    relatedPosts: titleSets[locale].filter((entry) => entry[0] !== slug).slice(0, 3).map((entry) => entry[0]),
    seoTitle: `${title} | Varejo Investidor`,
    seoDescription: description,
  };
}

export const insightPosts: InsightPost[] = Object.entries(titleSets).flatMap(([locale, posts]) =>
  posts.map((post, index) => makePost(locale as Locale, post, index)),
);

export function getInsightsPath(locale: Locale, slug?: string) {
  return `${insightsBasePath[locale]}${slug ? `/${slug}` : ""}`;
}

export function getPostsByLocale(locale: Locale) {
  return insightPosts.filter((post) => post.locale === locale);
}

export function getPost(locale: Locale, slug: string) {
  return insightPosts.find((post) => post.locale === locale && post.slug === slug);
}

export function localeFromInsightsPath(pathname: string | null): Locale | null {
  if (!pathname) return null;
  if (pathname.startsWith("/insights-globais")) return "pt";
  if (pathname.startsWith("/global-insights-hi")) return "hi";
  if (pathname.startsWith("/global-insights")) return "en";
  if (pathname.startsWith("/insights-globales")) return "es";
  if (pathname.startsWith("/ar/global-insights")) return "ar";
  if (pathname.startsWith("/tr/global-insights")) return "tr";
  return null;
}

export function getInsightMarketLinks(locale: Locale): Array<{ href: string; label: string }> {
  const slugs: MarketSlug[] = locale === "pt" ? [...publicMarketSlugs, "fundos-imobiliarios"] : publicMarketSlugs;
  return slugs.map((slug) => ({ href: `/${slug}`, label: getMarketLabel(slug, locale) }));
}

export const insightsFaq: Record<Locale, Array<{ question: string; answer: string }>> = {
  pt: [
    { question: "O que sao Insights Globais?", answer: "Sao analises editoriais sobre mercados, ciclos, moedas, risco e patrimonio para investidores de varejo." },
    { question: "A newsletter substitui recomendacao?", answer: "Nao. O conteudo e educativo e nao substitui analise individual, planejamento ou gestao de risco." },
  ],
  en: [
    { question: "What are Global Insights?", answer: "Editorial analysis on markets, cycles, currencies, risk and wealth for retail investors." },
    { question: "Does the newsletter replace advice?", answer: "No. The content is educational and does not replace individual analysis, planning or risk management." },
  ],
  es: [
    { question: "Que son Insights Globales?", answer: "Analisis editoriales sobre mercados, ciclos, divisas, riesgo y patrimonio para inversores minoristas." },
    { question: "La newsletter reemplaza asesoria?", answer: "No. El contenido es educativo y no reemplaza analisis individual, planificacion o gestion de riesgo." },
  ],
  hi: [
    { question: "Global Insights क्या हैं?", answer: "Retail investors के लिए markets, cycles, currencies, risk और wealth पर editorial analysis." },
    { question: "क्या newsletter advice की जगह लेती है?", answer: "नहीं। यह educational content है और individual analysis या risk management की जगह नहीं लेता।" },
  ],
  ar: [
    { question: "ما هي الرؤى العالمية؟", answer: "تحليلات تحريرية عن الاسواق والدورات والعملات والمخاطر والثروة للمستثمرين الافراد." },
    { question: "هل النشرة بديل عن الاستشارة؟", answer: "لا. المحتوى تعليمي ولا يستبدل التحليل الفردي او التخطيط او ادارة المخاطر." },
  ],
  tr: [
    { question: "Kuresel Icgoruler nedir?", answer: "Bireysel yatirimcilar icin piyasalar, donguler, para birimleri, risk ve varlik uzerine editorial analizlerdir." },
    { question: "Newsletter danismanligin yerini alir mi?", answer: "Hayir. Icerik egitim amaclidir; bireysel analiz, planlama veya risk yonetiminin yerini almaz." },
  ],
};
