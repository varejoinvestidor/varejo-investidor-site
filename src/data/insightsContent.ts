import type { Locale } from "../i18n";
import { SUPPORTED_LOCALES } from "../i18n/locales";
import { publisherHubPathForLocale } from "../i18n/publisherHubPaths";
import { getMarketLabel, publicMarketSlugs, type MarketSlug } from "./marketContent";
import { getCategoryLabel, migrateLegacyCategory } from "./insights/categories";
import { editorialPosts } from "./insights/registry";
import type { InsightCategoryKey, InsightPost } from "./insights/types";

export type { InsightCategoryKey, InsightPost, InsightContentBlock } from "./insights/types";
export { getCategoryLabel, insightCategories, insightCategoryKeys } from "./insights/categories";

const insightsBasePathEntries = SUPPORTED_LOCALES.map((locale) => [
  locale,
  publisherHubPathForLocale(locale),
] as const);

export const insightsBasePath: Record<Locale, string> = Object.fromEntries(insightsBasePathEntries) as Record<
  Locale,
  string
>;

export const insightLocales: Locale[] = ["pt", "en", "es", "fr", "it", "de", "fa", "hi", "ar", "tr", "id", "vi", "th", "ru", "ur", "bn", "ja", "ko", "zh", "pl", "tl", "he"];

export const insightsHero: Record<Locale, { title: string; subtitle: string; metaDescription: string }> = {
  pt: {
    title: "Artigos Globais",
    subtitle: "An\u00E1lises editoriais sobre Forex, a\u00E7\u00F5es, cripto, commodities, ETFs, ciclos econ\u00F4micos e estrutura financeira global.",
    metaDescription: "Artigos Globais do Varejo Investidor: an\u00E1lises sobre Forex, a\u00E7\u00F5es, cripto, commodities, ETFs, ciclos econ\u00F4micos e estrutura financeira global para investidores de varejo.",
  },
  en: {
    title: "Global Articles",
    subtitle: "Editorial analysis on Forex, stocks, crypto, commodities, ETFs, economic cycles and global financial structure.",
    metaDescription: "Global Articles by Varejo Investidor: analysis on Forex, stocks, crypto, commodities, ETFs, economic cycles and global financial structure for retail investors.",
  },
  es: {
    title: "Art\u00EDculos Globales",
    subtitle: "An\u00E1lisis editorial sobre Forex, acciones, cripto, commodities, ETFs, ciclos econ\u00F3micos y estructura financiera global.",
    metaDescription: "Art\u00EDculos Globales de Varejo Investidor: an\u00E1lisis sobre Forex, acciones, cripto, commodities, ETFs, ciclos econ\u00F3micos y estructura financiera global.",
  },
  fr: {
    title: "Articles Globaux",
    subtitle: "Analyses editoriales sur le Forex, les actions, la crypto, les matieres premieres, les ETF, les cycles economiques et la structure financiere mondiale.",
    metaDescription: "Articles Globaux de Varejo Investidor : analyses sur le Forex, les actions, la crypto, les matieres premieres, les ETF, les cycles economiques et la structure financiere mondiale.",
  },
  it: {
    title: "Articoli Globali",
    subtitle: "Analisi editoriali su Forex, azioni, crypto, commodities, ETF, cicli economici e struttura finanziaria globale.",
    metaDescription: "Articoli Globali di Varejo Investidor: analisi su Forex, azioni, crypto, commodities, ETF, cicli economici e struttura finanziaria globale.",
  },
  de: {
    title: "Globale Artikel",
    subtitle: "Institutionelle Analysen zu Forex, Aktien, Krypto, Rohstoffen, ETFs, Konjunkturzyklen und globaler Finanzstruktur.",
    metaDescription: "Globale Artikel von Varejo Investidor: Analysen zu Forex, Aktien, Krypto, Rohstoffen, ETFs, Konjunkturzyklen und globaler Finanzstruktur.",
  },
  fa: {
    title: "\u0645\u0642\u0627\u0644\u0627\u062a \u062c\u0647\u0627\u0646\u06cc",
    subtitle: "\u062a\u062d\u0644\u06cc\u0644\u200c\u0647\u0627\u06cc \u062a\u062d\u0631\u06cc\u0631\u06cc\u0647 \u062f\u0631\u0628\u0627\u0631\u0647 Forex\u060c \u0633\u0647\u0627\u0645\u060c \u06a9\u0631\u06cc\u067e\u062a\u0648\u060c ETFs \u0648 \u0633\u0627\u062e\u062a\u0627\u0631 \u0645\u0627\u0644\u06cc \u062c\u0647\u0627\u0646\u06cc.",
    metaDescription: "\u0645\u0642\u0627\u0644\u0627\u062a \u062c\u0647\u0627\u0646\u06cc Varejo Investidor \u062f\u0631\u0628\u0627\u0631\u0647 Forex\u060c \u0633\u0647\u0627\u0645\u060c \u06a9\u0631\u06cc\u067e\u062a\u0648\u060c ETFs \u0648 \u0628\u0627\u0632\u0627\u0631\u0647\u0627\u06cc \u062c\u0647\u0627\u0646\u06cc.",
  },
  hi: {
    title: "\u0935\u0948\u0936\u094D\u0935\u093F\u0915 \u0932\u0947\u0916",
    subtitle: "Forex, \u0936\u0947\u092F\u0930, \u0915\u094D\u0930\u093F\u092A\u094D\u091F\u094B, \u0915\u092E\u094B\u0921\u093F\u091F\u0940, ETFs, \u0906\u0930\u094D\u0925\u093F\u0915 \u091A\u0915\u094D\u0930 \u0914\u0930 \u0935\u0948\u0936\u094D\u0935\u093F\u0915 \u0935\u093F\u0924\u094D\u0924\u0940\u092F \u0938\u0902\u0930\u091A\u0928\u093E \u092A\u0930 \u0938\u0902\u0938\u094D\u0925\u093E\u0917\u0924 \u0932\u0947\u0916\u0964",
    metaDescription: "Varejo Investidor \u0915\u0947 \u0935\u0948\u0936\u094D\u0935\u093F\u0915 \u0932\u0947\u0916: Forex, \u0936\u0947\u092F\u0930, \u0915\u094D\u0930\u093F\u092A\u094D\u091F\u094B, \u0915\u092E\u094B\u0921\u093F\u091F\u0940, ETFs \u0914\u0930 \u0935\u0948\u0936\u094D\u0935\u093F\u0915 \u0935\u093F\u0924\u094D\u0924\u0940\u092F \u0938\u0902\u0930\u091A\u0928\u093E \u092A\u0930 \u0935\u093F\u0936\u094D\u0932\u0947\u0937\u0923\u0964",
  },
  ar: {
    title: "\u0627\u0644\u0645\u0642\u0627\u0644\u0627\u062A \u0627\u0644\u0639\u0627\u0644\u0645\u064A\u0629",
    subtitle: "\u0645\u0642\u0627\u0644\u0627\u062A \u062A\u062D\u0631\u064A\u0631\u064A\u0629 \u062D\u0648\u0644 \u0627\u0644\u0641\u0648\u0631\u0643\u0633 \u0648\u0627\u0644\u0623\u0633\u0647\u0645 \u0648\u0627\u0644\u0643\u0631\u064A\u0628\u062A\u0648 \u0648\u0627\u0644\u0633\u0644\u0639 \u0648ETFs \u0648\u0627\u0644\u062F\u0648\u0631\u0627\u062A \u0627\u0644\u0627\u0642\u062A\u0635\u0627\u062F\u064A\u0629 \u0648\u0627\u0644\u0647\u064A\u0643\u0644 \u0627\u0644\u0645\u0627\u0644\u064A \u0627\u0644\u0639\u0627\u0644\u0645\u064A.",
    metaDescription: "\u0627\u0644\u0645\u0642\u0627\u0644\u0627\u062A \u0627\u0644\u0639\u0627\u0644\u0645\u064A\u0629 \u0645\u0646 Varejo Investidor \u062D\u0648\u0644 \u0627\u0644\u0641\u0648\u0631\u0643\u0633 \u0648\u0627\u0644\u0623\u0633\u0647\u0645 \u0648\u0627\u0644\u0643\u0631\u064A\u0628\u062A\u0648 \u0648\u0627\u0644\u0633\u0644\u0639 \u0648ETFs \u0648\u0627\u0644\u0647\u064A\u0643\u0644 \u0627\u0644\u0645\u0627\u0644\u064A \u0627\u0644\u0639\u0627\u0644\u0645\u064A.",
  },
  tr: {
    title: "K\u00FCresel Makaleler",
    subtitle: "Forex, hisseler, kripto, emtialar, ETF'ler, ekonomik d\u00F6ng\u00FCler ve k\u00FCresel finansal yap\u0131 \u00FCzerine editoryal analizler.",
    metaDescription: "Varejo Investidor K\u00FCresel Makaleler: Forex, hisseler, kripto, emtialar, ETF'ler, ekonomik d\u00F6ng\u00FCler ve k\u00FCresel finansal yap\u0131 analizleri.",
  },
  id: {
    title: "Artikel Global",
    subtitle: "Analisis editorial tentang Forex, saham, kripto, komoditas, ETF, siklus ekonomi dan struktur keuangan global.",
    metaDescription: "Artikel Global Varejo Investidor: analisis Forex, saham, kripto, komoditas, ETF, siklus ekonomi dan struktur keuangan global untuk investor ritel.",
  },
  vi: {
    title: "B\u00E0i vi\u1EBFt To\u00E0n c\u1EA7u",
    subtitle: "Ph\u00E2n t\u00EDch chuy\u00EAn s\u00E2u v\u1EC1 Forex, c\u1ED5 phi\u1EBFu, crypto, h\u00E0ng h\u00F3a, ETF, chu k\u1EF3 kinh t\u1EBF v\u00E0 c\u1EA5u tr\u00FAc t\u00E0i ch\u00EDnh to\u00E0n c\u1EA7u.",
    metaDescription: "B\u00E0i vi\u1EBFt To\u00E0n c\u1EA7u c\u1EE7a Varejo Investidor: ph\u00E2n t\u00EDch Forex, c\u1ED5 phi\u1EBFu, crypto, h\u00E0ng h\u00F3a, ETF, chu k\u1EF3 kinh t\u1EBF v\u00E0 c\u1EA5u tr\u00FAc t\u00E0i ch\u00EDnh to\u00E0n c\u1EA7u.",
  },
  th: {
    title: "บทความระดับโลก",
    subtitle: "บทวิเคราะห์เชิงบรรณาธิการเกี่ยวกับ Forex หุ้น คริปโต สินค้าโภคภัณฑ์ ETF วัฏจักรเศรษฐกิจ และโครงสร้างการเงินโลก",
    metaDescription: "บทความระดับโลกของ Varejo Investidor: การวิเคราะห์ Forex หุ้น คริปโต สินค้าโภคภัณฑ์ ETF วัฏจักรเศรษฐกิจ และโครงสร้างการเงินโลกสำหรับนักลงทุนรายย่อย",
  },
  ru: {
    title: "Глобальные статьи",
    subtitle: "Редакционная аналитика о Forex, акциях, криптоактивах, сырьевых товарах, ETF, экономических циклах и глобальной финансовой структуре.",
    metaDescription: "Глобальные статьи Varejo Investidor: аналитика о Forex, акциях, криптоактивах, сырье, ETF, экономических циклах и глобальной финансовой структуре для частных инвесторов.",
  },
  ur: {
    title: "عالمی مضامین",
    subtitle: "Forex، اسٹاکس، کرپٹو، کموڈٹیز، ETFs، معاشی چکروں اور عالمی مالیاتی ڈھانچے پر ادارتی تجزیات۔",
    metaDescription: "Varejo Investidor کے عالمی مضامین: عام سرمایہ کاروں کے لیے Forex، اسٹاکس، کرپٹو، کموڈٹیز، ETFs اور عالمی مالیاتی ڈھانچے پر تجزیات۔",
  },
  bn: {
    title: "গ্লোবাল আর্টিকেল",
    subtitle: "Forex, স্টক, ক্রিপ্টো, কমোডিটি, ETF, অর্থনৈতিক চক্র এবং বৈশ্বিক আর্থিক কাঠামো নিয়ে সম্পাদকীয় বিশ্লেষণ।",
    metaDescription: "Varejo Investidor গ্লোবাল আর্টিকেল: সাধারণ বিনিয়োগকারীদের জন্য Forex, স্টক, ক্রিপ্টো, কমোডিটি, ETF, অর্থনৈতিক চক্র ও বৈশ্বিক আর্থিক কাঠামোর বিশ্লেষণ।",
  },
  ja: {
    title: "グローバル記事",
    subtitle: "Forex、株式、暗号資産、商品、ETF、経済サイクル、グローバル金融構造に関する編集分析。",
    metaDescription: "Varejo Investidorのグローバル記事: 個人投資家のためのForex、株式、暗号資産、商品、ETF、経済サイクル、グローバル金融構造の分析。",
  },
  ko: {
    title: "글로벌 기사",
    subtitle: "Forex, 주식, 암호화폐, 원자재, ETF, 경제 사이클과 글로벌 금융 구조에 대한 편집 분석.",
    metaDescription: "Varejo Investidor 글로벌 기사: 개인 투자자를 위한 Forex, 주식, 암호화폐, 원자재, ETF, 경제 사이클과 글로벌 금융 구조 분석.",
  },
  zh: {
    title: "\u5168\u7403\u6587\u7AE0",
    subtitle: "\u5173\u4E8E Forex\u3001\u80A1\u7968\u3001\u52A0\u5BC6\u8D44\u4EA7\u3001\u5927\u5B97\u5546\u54C1\u3001ETF\u3001\u7ECF\u6D4E\u5468\u671F\u548C\u5168\u7403\u91D1\u878D\u7ED3\u6784\u7684\u673A\u6784\u5316\u5206\u6790\u3002",
    metaDescription: "Varejo Investidor \u5168\u7403\u6587\u7AE0\uFF1A\u9762\u5411\u96F6\u552E\u6295\u8D44\u8005\u7684 Forex\u3001\u80A1\u7968\u3001\u52A0\u5BC6\u8D44\u4EA7\u3001\u5927\u5B97\u5546\u54C1\u3001ETF\u3001\u7ECF\u6D4E\u5468\u671F\u548C\u5168\u7403\u91D1\u878D\u7ED3\u6784\u5206\u6790\u3002",
  },
  pl: {
    title: "Artykuly globalne",
    subtitle: "Analizy redakcyjne o Forex, akcjach, krypto, surowcach, ETF-ach, cyklach gospodarczych i globalnej strukturze finansowej.",
    metaDescription: "Artykuly globalne Varejo Investidor: analizy o Forex, akcjach, krypto, surowcach, ETF-ach i globalnej strukturze finansowej.",
  },
  tl: {
    title: "Mga Pandaigdigang Artikulo",
    subtitle: "Editorial analysis tungkol sa Forex, stocks, crypto, commodities, ETFs, economic cycles, at global financial structure.",
    metaDescription: "Global Articles ng Varejo Investidor: analysis tungkol sa Forex, stocks, crypto, commodities, ETFs, economic cycles, at global financial structure.",
  },
  he: {
    title: "מאמרים גלובליים",
    subtitle: "ניתוח עריכה על Forex, מניות, קריפטו, סחורות, ETFs, מחזורי כלכלה ומבנה פיננסי גלובלי.",
    metaDescription: "מאמרים גלובליים של Varejo Investidor: ניתוח על Forex, מניות, קריפטו, סחורות, ETFs, מחזורי כלכלה ומבנה פיננסי גלובלי למשקיעים קמעונאיים.",
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
    search?: string;
    searchPlaceholder?: string;
    noResults?: string;
    loadMore?: string;
    share?: string;
    toc?: string;
    sources?: string;
    updated?: string;
    editorialDesk?: string;
    marketsNav?: string;
  }
> = {
  pt: {
    nav: "Artigos",
    content: "Conte\u00FAdo",
    latest: "\u00DAltima an\u00E1lise",
    recent: "Posts recentes",
    categories: "Categorias",
    all: "Todos",
    read: "Ler an\u00E1lise",
    whatsappTitle: "Entre no Canal Formiga",
    newsletterTitle: "Receba Artigos Globais",
    newsletterText: "An\u00E1lises, ciclos e conte\u00FAdos estrat\u00E9gicos do Varejo Investidor por e-mail ou WhatsApp.",
    email: "E-mail",
    newsletterButton: "Receber artigos",
    newsletterSuccess: "Pronto. Seu interesse foi registrado visualmente.",
    markets: "Mercados conectados",
    faq: "Perguntas frequentes",
    related: "Posts relacionados",
    education: "Ver Forma\u00E7\u00E3o",
    levelBlockTitle: "Como cada n\u00EDvel enxerga este tema",
    formiga: "Entende o impacto b\u00E1sico na renda, moeda, organiza\u00E7\u00E3o e primeiro capital.",
    lobo: "Analisa cen\u00E1rio, risco, liquidez e oportunidade operacional.",
    harpia: "Observa patrim\u00F4nio, prote\u00E7\u00E3o, moedas fortes e estrutura internacional.",
    postCtaTitle: "Aprofunde sua leitura dentro da forma\u00E7\u00E3o",
    postCtaText: "Conecte este artigo \u00E0 jornada Formiga, Lobo e Harpia para evoluir com m\u00E9todo.",
    search: "Buscar",
    searchPlaceholder: "Buscar por título, tag ou tema…",
    noResults: "Nenhum artigo encontrado para este filtro.",
    loadMore: "Carregar mais artigos",
    share: "Compartilhar",
    toc: "Neste artigo",
    sources: "Fontes e referências",
    updated: "Atualizado em",
    editorialDesk: "Mesa de pesquisa",
    marketsNav: "Navegar por mercados",
  },
  en: {
    nav: "Articles",
    content: "Content",
    latest: "Latest analysis",
    recent: "Recent posts",
    categories: "Categories",
    all: "All",
    read: "Read analysis",
    whatsappTitle: "Start with the Formiga Channel",
    newsletterTitle: "Receive Global Articles",
    newsletterText: "Analysis, cycles and strategic content from Varejo Investidor by email or WhatsApp.",
    email: "Email",
    newsletterButton: "Get articles",
    newsletterSuccess: "Done. Your request was visually registered.",
    markets: "Connected markets",
    faq: "FAQ",
    related: "Related posts",
    education: "View Formation",
    levelBlockTitle: "How each level reads this topic",
    formiga: "Understands the basic impact on income, currency, organization and first capital.",
    lobo: "Analyzes scenario, risk, liquidity and operational opportunity.",
    harpia: "Sees wealth, protection, strong currencies and international structure.",
    postCtaTitle: "Deepen your reading inside the education path",
    postCtaText: "Connect this article to the Formiga, Lobo and Harpia journey to evolve with method.",
    search: "Search",
    searchPlaceholder: "Search by title, tag or topic…",
    noResults: "No articles found for this filter.",
    loadMore: "Load more articles",
    share: "Share",
    toc: "In this article",
    sources: "Sources and references",
    updated: "Updated on",
    editorialDesk: "Research desk",
    marketsNav: "Browse markets",
  },
  es: {
    nav: "Art\u00EDculos",
    content: "Contenido",
    latest: "Ultimo analisis",
    recent: "Posts recientes",
    categories: "Categorias",
    all: "Todos",
    read: "Leer analisis",
    whatsappTitle: "Comienza por el Canal Formiga",
    newsletterTitle: "Recibe Art\u00EDculos Globales",
    newsletterText: "Analisis, ciclos y contenidos estrategicos de Varejo Investidor por e-mail o WhatsApp.",
    email: "E-mail",
    newsletterButton: "Recibir art\u00EDculos",
    newsletterSuccess: "Listo. Tu solicitud fue registrada visualmente.",
    markets: "Mercados conectados",
    faq: "Preguntas frecuentes",
    related: "Posts relacionados",
    education: "Ver Formacion",
    levelBlockTitle: "Como cada nivel lee este tema",
    formiga: "Entiende el impacto basico en ingresos, moneda, organizacion y primer capital.",
    lobo: "Analiza escenario, riesgo, liquidez y oportunidad operativa.",
    harpia: "Observa patrimonio, proteccion, monedas fuertes y estructura internacional.",
    postCtaTitle: "Profundiza tu lectura dentro de la formacion",
    postCtaText: "Conecta este art\u00EDculo con la jornada Formiga, Lobo y Harpia para evolucionar con metodo.",
    search: "Buscar",
    searchPlaceholder: "Buscar por titulo, etiqueta o tema…",
    noResults: "No se encontraron articulos para este filtro.",
    loadMore: "Cargar mas articulos",
    share: "Compartir",
    toc: "En este articulo",
    sources: "Fuentes y referencias",
    updated: "Actualizado el",
    editorialDesk: "Mesa de investigacion",
    marketsNav: "Explorar mercados",
  },
  fr: {
    nav: "Articles",
    content: "Analyses",
    latest: "Dernière publication",
    recent: "Publications récentes",
    categories: "Catégories",
    all: "Tous",
    read: "Lire l’analyse",
    whatsappTitle: "Commencer par le Canal Formiga",
    newsletterTitle: "Recevoir les articles mondiaux",
    newsletterText: "Analyses, cycles et contenus stratégiques Varejo Investidor par e-mail ou WhatsApp.",
    email: "E-mail",
    newsletterButton: "Recevoir les articles",
    newsletterSuccess: "Demande enregistrée.",
    markets: "Marchés liés",
    faq: "Questions fréquentes",
    related: "Articles liés",
    education: "Voir la formation",
    levelBlockTitle: "Comment chaque niveau aborde ce thème",
    formiga: "Comprend l’impact sur les revenus, la devise, l’organisation et le premier capital.",
    lobo: "Analyse scénario, risque, liquidité et opportunité opérationnelle.",
    harpia: "Observe patrimoine, protection, devises fortes et structure internationale.",
    postCtaTitle: "Approfondir dans le parcours de formation",
    postCtaText: "Reliez cet article au parcours Fourmi, Loup et Harpie pour évoluer avec méthode.",
    search: "Rechercher",
    searchPlaceholder: "Rechercher par titre, tag ou thème…",
    noResults: "Aucun article ne correspond à ce filtre.",
    loadMore: "Charger plus d’articles",
    share: "Partager",
    toc: "Dans cet article",
    sources: "Sources et références",
    updated: "Mis à jour le",
    editorialDesk: "Desk de recherche",
    marketsNav: "Parcourir les marchés",
  },
  de: {
    nav: "Artikel",
    content: "Analysen",
    latest: "Neueste Analyse",
    recent: "Aktuelle Beiträge",
    categories: "Kategorien",
    all: "Alle",
    read: "Analyse lesen",
    whatsappTitle: "Mit dem Formiga-Kanal starten",
    newsletterTitle: "Globale Artikel erhalten",
    newsletterText: "Analysen, Zyklen und strategische Inhalte von Varejo Investidor per E-Mail oder WhatsApp.",
    email: "E-Mail",
    newsletterButton: "Artikel erhalten",
    newsletterSuccess: "Ihre Anfrage wurde registriert.",
    markets: "Verbundene Märkte",
    faq: "Häufige Fragen",
    related: "Verwandte Artikel",
    education: "Ausbildung ansehen",
    levelBlockTitle: "Wie jede Stufe dieses Thema liest",
    formiga: "Versteht die Basiswirkung auf Einkommen, Währung, Organisation und erstes Kapital.",
    lobo: "Analysiert Szenario, Risiko, Liquidität und operative Chancen.",
    harpia: "Beobachtet Vermögen, Schutz, starke Währungen und internationale Struktur.",
    postCtaTitle: "Vertiefung im Ausbildungsweg",
    postCtaText: "Verknüpfen Sie diesen Artikel mit Formiga, Wolf und Harpy für methodisches Wachstum.",
    search: "Suchen",
    searchPlaceholder: "Nach Titel, Tag oder Thema suchen…",
    noResults: "Keine Artikel für diesen Filter.",
    loadMore: "Weitere Artikel laden",
    share: "Teilen",
    toc: "In diesem Artikel",
    sources: "Quellen und Referenzen",
    updated: "Aktualisiert am",
    editorialDesk: "Research Desk",
    marketsNav: "Märkte erkunden",
  },
  hi: {
    nav: "\u0932\u0947\u0916",
    content: "सामग्री",
    latest: "नवीनतम विश्लेषण",
    recent: "हाल के पोस्ट",
    categories: "श्रेणियां",
    all: "सभी",
    read: "विश्लेषण पढ़ें",
    whatsappTitle: "मुफ्त चींटी चैनल से शुरू करें",
    newsletterTitle: "\u0935\u0948\u0936\u094D\u0935\u093F\u0915 \u0932\u0947\u0916 \u092A\u094D\u0930\u093E\u092A\u094D\u0924 \u0915\u0930\u0947\u0902",
    newsletterText: "Varejo Investidor के विश्लेषण, चक्र और रणनीतिक सामग्री ईमेल या WhatsApp पर प्राप्त करें।",
    email: "ईमेल",
    newsletterButton: "\u0932\u0947\u0916 \u092A\u094D\u0930\u093E\u092A\u094D\u0924 \u0915\u0930\u0947\u0902",
    newsletterSuccess: "हो गया। आपका अनुरोध दर्ज हो गया।",
    markets: "जुड़े हुए बाजार",
    faq: "सामान्य प्रश्न",
    related: "संबंधित पोस्ट",
    education: "प्रशिक्षण देखें",
    levelBlockTitle: "हर स्तर इस विषय को कैसे पढ़ता है",
    formiga: "आय, मुद्रा, संगठन और पहले पूंजी पर मूल प्रभाव समझता है।",
    lobo: "परिदृश्य, जोखिम, तरलता और परिचालन अवसर का विश्लेषण करता है।",
    harpia: "संपत्ति, सुरक्षा, मजबूत मुद्राएं और अंतरराष्ट्रीय संरचना देखता है।",
    postCtaTitle: "शिक्षा मार्ग में अपनी समझ गहरी करें",
    postCtaText: "इस लेख को चींटी, भेड़िया और गरुड़ की शिक्षा यात्रा से जोड़कर पद्धति के साथ आगे बढ़ें।",
    editorialDesk: "विश्लेषण डेस्क",
    marketsNav: "बाजार देखें",
  },
  ar: {
    nav: "\u0627\u0644\u0645\u0642\u0627\u0644\u0627\u062A",
    content: "المحتوى",
    latest: "آخر تحليل",
    recent: "منشورات حديثة",
    categories: "الفئات",
    all: "الكل",
    read: "اقرأ التحليل",
    whatsappTitle: "ابدأ من قناة Formiga",
    newsletterTitle: "\u0627\u0633\u062A\u0642\u0628\u0644 \u0627\u0644\u0645\u0642\u0627\u0644\u0627\u062A \u0627\u0644\u0639\u0627\u0644\u0645\u064A\u0629",
    newsletterText: "تحليلات ودورات ومحتوى استراتيجي من Varejo Investidor عبر البريد أو WhatsApp.",
    email: "البريد الالكتروني",
    newsletterButton: "\u0627\u062D\u0635\u0644 \u0639\u0644\u0649 \u0627\u0644\u0645\u0642\u0627\u0644\u0627\u062A",
    newsletterSuccess: "تم تسجيل طلبك بصريا.",
    markets: "اسواق مرتبطة",
    faq: "اسئلة شائعة",
    related: "منشورات مرتبطة",
    education: "عرض التكوين",
    levelBlockTitle: "كيف يقرأ كل مستوى هذا الموضوع",
    formiga: "يفهم الاثر الاساسي على الدخل والعملة والتنظيم ورأس المال الاول.",
    lobo: "يحلل السيناريو والمخاطر والسيولة والفرصة التشغيلية.",
    harpia: "يرى الثروة والحماية والعملات القوية والهيكلة الدولية.",
    postCtaTitle: "عمق قراءتك داخل مسار التعليم",
    postCtaText: "اربط هذه الرؤية برحلة Formiga وLobo وHarpia للتطور بمنهجية.",
  },
  he: {
    nav: "מאמרים",
    content: "תוכן",
    latest: "הניתוח האחרון",
    recent: "פוסטים אחרונים",
    categories: "קטגוריות",
    all: "הכל",
    read: "קראו ניתוח",
    whatsappTitle: "הצטרפו לערוץ Formiga",
    newsletterTitle: "קבלו מאמרים גלובליים",
    newsletterText: "ניתוחים, מחזורים ותוכן אסטרטגי מ-Varejo Investidor במייל או ב-WhatsApp.",
    email: "אימייל",
    newsletterButton: "קבלו מאמרים",
    newsletterSuccess: "בוצע. הבקשה שלכם נרשמה.",
    markets: "שווקים מקושרים",
    faq: "שאלות נפוצות",
    related: "פוסטים קשורים",
    education: "צפו בהכשרה",
    levelBlockTitle: "איך כל רמה קוראת נושא זה",
    formiga: "מבין את ההשפעה הבסיסית על הכנסה, מטבע, ארגון והון ראשוני.",
    lobo: "מנתח תרחיש, סיכון, נזילות והזדמנות אופרטיבית.",
    harpia: "רואה הון, הגנה, מטבעות חזקים ומבנה בינלאומי.",
    postCtaTitle: "העמיקו את הקריאה במסלול ההכשרה",
    postCtaText: "חברו את התובנה הזו למסע Formiga, Lobo ו-Harpia ולהתפתחות עם מתודולוגיה.",
  },
  tr: {
    nav: "Makaleler",
    content: "Icerik",
    latest: "Son analiz",
    recent: "Son yazilar",
    categories: "Kategoriler",
    all: "Tumu",
    read: "Analizi oku",
    whatsappTitle: "Formiga Kanali ile baslayin",
    newsletterTitle: "K\u00FCresel Makaleler Al",
    newsletterText: "Varejo Investidor analizleri, donguleri ve stratejik icerikleri e-posta veya WhatsApp ile alin.",
    email: "E-mail",
    newsletterButton: "Makale al",
    newsletterSuccess: "Tamam. Talebiniz gorsel olarak kaydedildi.",
    markets: "Baglantili piyasalar",
    faq: "SSS",
    related: "Ilgili yazilar",
    education: "Formasyonu Gor",
    levelBlockTitle: "Her seviye bu konuyu nasil okur",
    formiga: "Gelir, para birimi, organizasyon ve ilk sermaye uzerindeki temel etkiyi anlar.",
    lobo: "Senaryo, risk, likidite ve operasyonel firsati analiz eder.",
    harpia: "Varlik, koruma, guclu para birimleri ve uluslararasi yapiyi gorur.",
    postCtaTitle: "Okumanizi egitim yolu icinde derinlestirin",
    postCtaText: "Bu icgoruyu Formiga, Lobo ve Harpia yolculuguna baglayarak metodla gelisin.",
  },
  id: {
    nav: "Artikel",
    content: "Konten",
    latest: "Analisis terbaru",
    recent: "Artikel terbaru",
    categories: "Kategori",
    all: "Semua",
    read: "Baca analisis",
    whatsappTitle: "Mulai dari Kanal Semut",
    newsletterTitle: "Terima Artikel Global",
    newsletterText: "Analisis, siklus dan konten strategis Varejo Investidor melalui email atau WhatsApp.",
    email: "Email",
    newsletterButton: "Terima artikel",
    newsletterSuccess: "Selesai. Minat Anda telah tercatat.",
    markets: "Pasar terhubung",
    faq: "FAQ",
    related: "Artikel terkait",
    education: "Lihat Formasi",
    levelBlockTitle: "Cara setiap level membaca topik ini",
    formiga: "Memahami dampak dasar pada pendapatan, mata uang, organisasi dan modal awal.",
    lobo: "Menganalisis skenario, risiko, likuiditas dan peluang operasional.",
    harpia: "Melihat kekayaan, proteksi, mata uang kuat dan struktur internasional.",
    postCtaTitle: "Perdalam pembacaan Anda di jalur edukasi",
    postCtaText: "Hubungkan wawasan ini dengan perjalanan Semut, Serigala dan Elang Harpy untuk berkembang dengan metode.",
  },
  vi: {
    nav: "B\u00E0i vi\u1EBFt",
    content: "Nội dung",
    latest: "Phân tích mới nhất",
    recent: "Bài viết mới",
    categories: "Danh mục",
    all: "Tất cả",
    read: "Đọc phân tích",
    whatsappTitle: "Bắt đầu với Kênh Kiến",
    newsletterTitle: "Nh\u1EADn B\u00E0i vi\u1EBFt To\u00E0n c\u1EA7u",
    newsletterText: "Phân tích, chu kỳ và nội dung chiến lược của Varejo Investidor qua email hoặc WhatsApp.",
    email: "Email",
    newsletterButton: "Nh\u1EADn b\u00E0i vi\u1EBFt",
    newsletterSuccess: "Xong. Yêu cầu của bạn đã được ghi nhận.",
    markets: "Thị trường liên quan",
    faq: "FAQ",
    related: "Bài viết liên quan",
    education: "Xem Đào tạo",
    levelBlockTitle: "Mỗi cấp độ đọc chủ đề này như thế nào",
    formiga: "Hiểu tác động cơ bản đến thu nhập, tiền tệ, tổ chức và vốn đầu tiên.",
    lobo: "Phân tích bối cảnh, rủi ro, thanh khoản và cơ hội vận hành.",
    harpia: "Nhìn vào tài sản, bảo vệ, tiền tệ mạnh và cấu trúc quốc tế.",
    postCtaTitle: "Đào sâu góc nhìn trong lộ trình giáo dục",
    postCtaText: "Kết nối góc nhìn này với hành trình Kiến, Sói và Đại Bàng Harpy để phát triển có phương pháp.",
    search: "Tìm kiếm",
    searchPlaceholder: "Tìm theo tiêu đề, thẻ hoặc chủ đề…",
    noResults: "Không có bài viết nào cho bộ lọc này.",
    loadMore: "Tải thêm bài viết",
    share: "Chia sẻ",
    toc: "Trong bài viết này",
    sources: "Nguồn và tham chiếu",
    updated: "Cập nhật",
    editorialDesk: "Ban biên tập",
    marketsNav: "Duyệt thị trường",
  },
  it: {
    nav: "Articoli",
    content: "Analisi",
    latest: "Ultima analisi",
    recent: "Articoli recenti",
    categories: "Categorie",
    all: "Tutti",
    read: "Leggi analisi",
    whatsappTitle: "Inizia dal Canale Formiga",
    newsletterTitle: "Ricevi articoli globali",
    newsletterText: "Analisi, cicli e contenuti strategici di Varejo Investidor via e-mail o WhatsApp.",
    email: "E-mail",
    newsletterButton: "Ricevi articoli",
    newsletterSuccess: "Richiesta registrata.",
    markets: "Mercati collegati",
    faq: "Domande frequenti",
    related: "Articoli correlati",
    education: "Vedi formazione",
    levelBlockTitle: "Come ogni livello legge questo tema",
    formiga: "Comprende l'impatto di base su reddito, valuta, organizzazione e primo capitale.",
    lobo: "Analizza scenario, rischio, liquidità e opportunità operativa.",
    harpia: "Osserva patrimonio, protezione, valute forti e struttura internazionale.",
    postCtaTitle: "Approfondisci nella formazione",
    postCtaText: "Collega questo articolo al percorso Formica, Lupo e Arpia per evolvere con metodo.",
    search: "Cerca",
    searchPlaceholder: "Cerca per titolo, tag o tema…",
    noResults: "Nessun articolo per questo filtro.",
    loadMore: "Carica altri articoli",
    share: "Condividi",
    toc: "In questo articolo",
    sources: "Fonti e riferimenti",
    updated: "Aggiornato il",
    editorialDesk: "Desk di ricerca",
    marketsNav: "Sfoglia i mercati",
  },
  fa: {
    nav: "مقالات",
    content: "تحلیل‌ها",
    latest: "آخرین تحلیل",
    recent: "مطالب اخیر",
    categories: "دسته‌ها",
    all: "همه",
    read: "خواندن تحلیل",
    whatsappTitle: "شروع با کانال Formiga",
    newsletterTitle: "دریافت مقالات جهانی",
    newsletterText: "تحلیل‌ها، چرخه‌ها و محتوای راهبردی Varejo Investidor از طریق ایمیل یا واتساپ.",
    email: "ایمیل",
    newsletterButton: "دریافت مقالات",
    newsletterSuccess: "درخواست شما ثبت شد.",
    markets: "بازارهای مرتبط",
    faq: "سوالات متداول",
    related: "مطالب مرتبط",
    education: "مشاهده آموزش",
    levelBlockTitle: "هر سطح این موضوع را چگونه می‌خواند",
    formiga: "اثر پایه بر درآمد، ارز، سازماندهی و سرمایه اول را درک می‌کند.",
    lobo: "سناریو، ریسک، نقدشوندگی و فرصت عملیاتی را تحلیل می‌کند.",
    harpia: "ثروت، حفاظت، ارزهای قوی و ساختار بین‌المللی را می‌بیند.",
    postCtaTitle: "عمیق‌تر در مسیر آموزش بخوانید",
    postCtaText: "این مقاله را به مسیر Formiga، Wolf و Harpy وصل کنید تا با روش پیش بروید.",
    search: "جستجو",
    searchPlaceholder: "جستجو بر اساس عنوان، برچسب یا موضوع…",
    noResults: "مقاله‌ای برای این فیلتر یافت نشد.",
    loadMore: "بارگذاری مقالات بیشتر",
    share: "اشتراک‌گذاری",
    toc: "در این مقاله",
    sources: "منابع و مراجع",
    updated: "به‌روزرسانی",
    editorialDesk: "میز تحقیق",
    marketsNav: "مرور بازارها",
  },
  pl: {
    nav: "Artykuły",
    content: "Analizy",
    latest: "Najnowsza analiza",
    recent: "Ostatnie artykuły",
    categories: "Kategorie",
    all: "Wszystkie",
    read: "Czytaj analizę",
    whatsappTitle: "Zacznij od kanału Formiga",
    newsletterTitle: "Otrzymuj artykuły globalne",
    newsletterText: "Analizy, cykle i treści strategiczne Varejo Investidor e-mailem lub WhatsApp.",
    email: "E-mail",
    newsletterButton: "Otrzymuj artykuły",
    newsletterSuccess: "Zapytanie zarejestrowane.",
    markets: "Powiązane rynki",
    faq: "FAQ",
    related: "Powiązane artykuły",
    education: "Zobacz szkolenie",
    levelBlockTitle: "Jak każdy poziom czyta ten temat",
    formiga: "Rozumie podstawowy wpływ na dochód, walutę, organizację i pierwszy kapitał.",
    lobo: "Analizuje scenariusz, ryzyko, płynność i okazje operacyjne.",
    harpia: "Widzi majątek, ochronę, silne waluty i strukturę międzynarodową.",
    postCtaTitle: "Pogłęb czytanie w ścieżce edukacji",
    postCtaText: "Połącz ten artykuł ze ścieżką Formiga, Wolf i Harpy, by rozwijać się metodycznie.",
    search: "Szukaj",
    searchPlaceholder: "Szukaj po tytule, tagu lub temacie…",
    noResults: "Brak artykułów dla tego filtru.",
    loadMore: "Załaduj więcej artykułów",
    share: "Udostępnij",
    toc: "W tym artykule",
    sources: "Źródła i odniesienia",
    updated: "Zaktualizowano",
    editorialDesk: "Biuro analiz",
    marketsNav: "Przeglądaj rynki",
  },
  zh: {
    nav: "文章",
    content: "分析",
    latest: "最新分析",
    recent: "近期文章",
    categories: "分类",
    all: "全部",
    read: "阅读分析",
    whatsappTitle: "从 Formiga 频道开始",
    newsletterTitle: "接收全球文章",
    newsletterText: "通过邮件或 WhatsApp 获取 Varejo Investidor 的分析、周期与战略内容。",
    email: "电子邮箱",
    newsletterButton: "订阅文章",
    newsletterSuccess: "您的请求已记录。",
    markets: "相关市场",
    faq: "常见问题",
    related: "相关文章",
    education: "查看培训",
    levelBlockTitle: "各层级如何阅读该主题",
    formiga: "理解对收入、货币、组织与首笔资本的基础影响。",
    lobo: "分析情景、风险、流动性与操作机会。",
    harpia: "关注财富、保护、强势货币与国际结构。",
    postCtaTitle: "在教育路径中深入阅读",
    postCtaText: "将本文与 Formiga、Wolf、Harpy 旅程连接，以方法化方式成长。",
    search: "搜索",
    searchPlaceholder: "按标题、标签或主题搜索…",
    noResults: "此筛选条件下没有文章。",
    loadMore: "加载更多文章",
    share: "分享",
    toc: "本文目录",
    sources: "来源与参考",
    updated: "更新于",
    editorialDesk: "研究编辑台",
    marketsNav: "浏览市场",
  },
  tl: {
    nav: "Mga Artikulo",
    content: "Analysis",
    latest: "Pinakabagong analysis",
    recent: "Kamakailang posts",
    categories: "Mga Kategorya",
    all: "Lahat",
    read: "Basahin ang analysis",
    whatsappTitle: "Magsimula sa Formiga Channel",
    newsletterTitle: "Tumanggap ng Global Articles",
    newsletterText: "Analysis, cycles at strategic content mula sa Varejo Investidor sa email o WhatsApp.",
    email: "Email",
    newsletterButton: "Kumuha ng artikulo",
    newsletterSuccess: "Naitala ang iyong request.",
    markets: "Konektadong markets",
    faq: "FAQ",
    related: "Kaugnay na posts",
    education: "Tingnan ang Formasyon",
    levelBlockTitle: "Paano binabasa ng bawat level ang paksang ito",
    formiga: "Nauunawaan ang pangunahing epekto sa kita, currency, organisasyon at unang kapital.",
    lobo: "Sinusuri ang scenario, risk, liquidity at operational opportunity.",
    harpia: "Tumingin sa wealth, protection, malalakas na currencies at international structure.",
    postCtaTitle: "Palalimin ang pagbasa sa education path",
    postCtaText: "Ikonekta ang artikulong ito sa Formiga, Lobo at Harpia journey para lumago nang may metodo.",
    search: "Maghanap",
    searchPlaceholder: "Maghanap ayon sa title, tag o paksa…",
    noResults: "Walang artikulo para sa filter na ito.",
    loadMore: "Mag-load pa ng artikulo",
    share: "Ibahagi",
    toc: "Sa artikulong ito",
    sources: "Mga source at reference",
    updated: "Na-update noong",
    editorialDesk: "Research desk",
    marketsNav: "Mag-browse ng markets",
  },
  th: {
    nav: "บทความ",
    content: "บทวิเคราะห์",
    latest: "การวิเคราะห์ล่าสุด",
    recent: "โพสต์ล่าสุด",
    categories: "หมวดหมู่",
    all: "ทั้งหมด",
    read: "อ่านบทวิเคราะห์",
    whatsappTitle: "เริ่มจากช่อง Formiga",
    newsletterTitle: "รับบทความระดับโลก",
    newsletterText: "บทวิเคราะห์ วัฏจักร และเนื้อหาเชิงกลยุทธ์จาก Varejo Investidor ทางอีเมลหรือ WhatsApp",
    email: "อีเมล",
    newsletterButton: "รับบทความ",
    newsletterSuccess: "บันทึกคำขอของคุณแล้ว",
    markets: "ตลาดที่เชื่อมโยง",
    faq: "คำถามที่พบบ่อย",
    related: "โพสต์ที่เกี่ยวข้อง",
    education: "ดูการฝึกอบรม",
    levelBlockTitle: "แต่ละระดับอ่านหัวข้อนี้อย่างไร",
    formiga: "เข้าใจผลกระทบพื้นฐานต่อรายได้ สกุลเงิน การจัดระเบียบ และทุนเริ่มต้น",
    lobo: "วิเคราะห์สถานการณ์ ความเสี่ยง สภาพคล่อง และโอกาสเชิงปฏิบัติการ",
    harpia: "มองเห็นความมั่งคั่ง การปกป้อง สกุลเงินแข็งแกร่ง และโครงสร้างระหว่างประเทศ",
    postCtaTitle: "เจาะลึกการอ่านในเส้นทางการศึกษา",
    postCtaText: "เชื่อมบทความนี้กับเส้นทาง Formiga, Lobo และ Harpia เพื่อพัฒนาอย่างมีวิธี",
    search: "ค้นหา",
    searchPlaceholder: "ค้นหาตามชื่อเรื่อง แท็ก หรือหัวข้อ…",
    noResults: "ไม่พบบทความสำหรับตัวกรองนี้",
    loadMore: "โหลดบทความเพิ่ม",
    share: "แชร์",
    toc: "ในบทความนี้",
    sources: "แหล่งอ้างอิง",
    updated: "อัปเดตเมื่อ",
    editorialDesk: "ทีมวิจัย",
    marketsNav: "เรียกดูตลาด",
  },
  ru: {
    nav: "Статьи",
    content: "Аналитика",
    latest: "Последний анализ",
    recent: "Недавние публикации",
    categories: "Категории",
    all: "Все",
    read: "Читать анализ",
    whatsappTitle: "Начните с канала Formiga",
    newsletterTitle: "Получать глобальные статьи",
    newsletterText: "Аналитика, циклы и стратегический контент Varejo Investidor по e-mail или WhatsApp.",
    email: "E-mail",
    newsletterButton: "Получать статьи",
    newsletterSuccess: "Запрос зарегистрирован.",
    markets: "Связанные рынки",
    faq: "Частые вопросы",
    related: "Похожие статьи",
    education: "Смотреть обучение",
    levelBlockTitle: "Как каждый уровень читает эту тему",
    formiga: "Понимает базовое влияние на доход, валюту, организацию и первый капитал.",
    lobo: "Анализирует сценарий, риск, ликвидность и операционные возможности.",
    harpia: "Видит капитал, защиту, сильные валюты и международную структуру.",
    postCtaTitle: "Углубите чтение в образовательном пути",
    postCtaText: "Свяжите эту статью с путём Formiga, Lobo и Harpy для методичного роста.",
    search: "Поиск",
    searchPlaceholder: "Искать по заголовку, тегу или теме…",
    noResults: "Нет статей для этого фильтра.",
    loadMore: "Загрузить ещё статьи",
    share: "Поделиться",
    toc: "В этой статье",
    sources: "Источники и ссылки",
    updated: "Обновлено",
    editorialDesk: "Аналитическая редакция",
    marketsNav: "Обзор рынков",
  },
  ur: {
    nav: "مضامین",
    content: "تجزیات",
    latest: "تازہ ترین تجزیہ",
    recent: "حالیہ پوسٹس",
    categories: "زمرے",
    all: "سب",
    read: "تجزیہ پڑھیں",
    whatsappTitle: "Formiga چینل سے شروع کریں",
    newsletterTitle: "عالمی مضامین حاصل کریں",
    newsletterText: "Varejo Investidor کے تجزیے، چکر اور اسٹریٹجک مواد ای میل یا WhatsApp پر۔",
    email: "ای میل",
    newsletterButton: "مضامین حاصل کریں",
    newsletterSuccess: "آپ کی درخواست درج ہو گئی۔",
    markets: "منسلک مارکیٹس",
    faq: "اکثر پوچھے گئے سوالات",
    related: "متعلقہ پوسٹس",
    education: "تعلیم دیکھیں",
    levelBlockTitle: "ہر سطح یہ موضوع کیسے پڑھتی ہے",
    formiga: "آمدنی، کرنسی، تنظیم اور پہلے سرمائے پر بنیادی اثر سمجھتا ہے۔",
    lobo: "منظرنامہ، خطرہ، لیکویڈیٹی اور آپریشنل موقع کا تجزیہ کرتا ہے۔",
    harpia: "دولت، تحفظ، مضبوط کرنسیوں اور بین الاقوامی ڈھانچے کو دیکھتا ہے۔",
    postCtaTitle: "تعلیمی راستے میں مطالعہ گہرا کریں",
    postCtaText: "اس مضمون کو Formiga، Lobo اور Harpia کے سفر سے جوڑیں تاکہ منظم طور پر ترقی کریں۔",
    search: "تلاش",
    searchPlaceholder: "عنوان، ٹیگ یا موضوع سے تلاش کریں…",
    noResults: "اس فلٹر کے لیے کوئی مضمون نہیں ملا۔",
    loadMore: "مزید مضامین لوڈ کریں",
    share: "شیئر کریں",
    toc: "اس مضمون میں",
    sources: "ذرائع و حوالہ جات",
    updated: "اپ ڈیٹ",
    editorialDesk: "تحقیقی ڈیسک",
    marketsNav: "مارکیٹس دیکھیں",
  },
  bn: {
    nav: "আর্টিকেল",
    content: "বিশ্লেষণ",
    latest: "সর্বশেষ বিশ্লেষণ",
    recent: "সাম্প্রতিক পোস্ট",
    categories: "বিভাগ",
    all: "সব",
    read: "বিশ্লেষণ পড়ুন",
    whatsappTitle: "Formiga চ্যানেল দিয়ে শুরু করুন",
    newsletterTitle: "গ্লোবাল আর্টিকেল পান",
    newsletterText: "Varejo Investidor-এর বিশ্লেষণ, চক্র ও কৌশলগত কনটেন্ট ইমেইল বা WhatsApp-এ।",
    email: "ইমেইল",
    newsletterButton: "আর্টিকেল পান",
    newsletterSuccess: "আপনার অনুরোধ নথিভুক্ত হয়েছে।",
    markets: "সংযুক্ত বাজার",
    faq: "প্রায়শই জিজ্ঞাসিত প্রশ্ন",
    related: "সম্পর্কিত পোস্ট",
    education: "প্রশিক্ষণ দেখুন",
    levelBlockTitle: "প্রতিটি স্তর এই বিষয় কীভাবে পড়ে",
    formiga: "আয়, মুদ্রা, সংগঠন ও প্রথম পুঁজির মৌলিক প্রভাব বোঝে।",
    lobo: "দৃশ্যপট, ঝুঁকি, তারল্য ও অপারেশনাল সুযোগ বিশ্লেষণ করে।",
    harpia: "সম্পদ, সুরক্ষা, শক্তিশালী মুদ্রা ও আন্তর্জাতিক কাঠামো দেখে।",
    postCtaTitle: "শিক্ষার পথে পড়া গভীর করুন",
    postCtaText: "এই আর্টিকেলটি Formiga, Lobo ও Harpia যাত্রার সাথে যুক্ত করে পদ্ধতিগতভাবে এগিয়ে যান।",
    search: "অনুসন্ধান",
    searchPlaceholder: "শিরোনাম, ট্যাগ বা বিষয় অনুসারে খুঁজুন…",
    noResults: "এই ফিল্টারের জন্য কোনো আর্টিকেল নেই।",
    loadMore: "আরও আর্টিকেল লোড করুন",
    share: "শেয়ার",
    toc: "এই আর্টিকেলে",
    sources: "উৎস ও রেফারেন্স",
    updated: "আপডেট",
    editorialDesk: "গবেষণা ডেস্ক",
    marketsNav: "বাজার ব্রাউজ করুন",
  },
  ja: {
    nav: "記事",
    content: "分析",
    latest: "最新の分析",
    recent: "最近の投稿",
    categories: "カテゴリ",
    all: "すべて",
    read: "分析を読む",
    whatsappTitle: "Formigaチャンネルから始める",
    newsletterTitle: "グローバル記事を受け取る",
    newsletterText: "Varejo Investidorの分析、サイクル、戦略コンテンツをメールまたはWhatsAppで。",
    email: "メール",
    newsletterButton: "記事を受け取る",
    newsletterSuccess: "リクエストを記録しました。",
    markets: "関連マーケット",
    faq: "よくある質問",
    related: "関連記事",
    education: "トレーニングを見る",
    levelBlockTitle: "各レベルがこのテーマをどう読むか",
    formiga: "所得、通貨、整理、最初の資本への基本的影響を理解する。",
    lobo: "シナリオ、リスク、流動性、運用機会を分析する。",
    harpia: "資産、保護、強い通貨、国際構造を見る。",
    postCtaTitle: "教育パスで読みを深める",
    postCtaText: "この記事をFormiga、Lobo、Harpiaの旅につなげ、方法論的に成長する。",
    search: "検索",
    searchPlaceholder: "タイトル、タグ、テーマで検索…",
    noResults: "このフィルターに該当する記事がありません。",
    loadMore: "さらに記事を読み込む",
    share: "共有",
    toc: "この記事の内容",
    sources: "出典と参考",
    updated: "更新日",
    editorialDesk: "リサーチデスク",
    marketsNav: "マーケットを見る",
  },
  ko: {
    nav: "기사",
    content: "분석",
    latest: "최신 분석",
    recent: "최근 게시물",
    categories: "카테고리",
    all: "전체",
    read: "분석 읽기",
    whatsappTitle: "Formiga 채널로 시작하기",
    newsletterTitle: "글로벌 기사 받기",
    newsletterText: "Varejo Investidor의 분석, 사이클, 전략 콘텐츠를 이메일 또는 WhatsApp으로.",
    email: "이메일",
    newsletterButton: "기사 받기",
    newsletterSuccess: "요청이 등록되었습니다.",
    markets: "연결된 시장",
    faq: "자주 묻는 질문",
    related: "관련 게시물",
    education: "교육 보기",
    levelBlockTitle: "각 레벨이 이 주제를 읽는 방식",
    formiga: "소득, 통화, 조직, 첫 자본에 대한 기본 영향을 이해합니다.",
    lobo: "시나리오, 리스크, 유동성, 운영 기회를 분석합니다.",
    harpia: "자산, 보호, 강한 통화, 국제 구조를 봅니다.",
    postCtaTitle: "교육 경로에서 읽기를 심화하세요",
    postCtaText: "이 기사를 Formiga, Lobo, Harpy 여정과 연결해 방법적으로 성장하세요.",
    search: "검색",
    searchPlaceholder: "제목, 태그 또는 주제로 검색…",
    noResults: "이 필터에 해당하는 기사가 없습니다.",
    loadMore: "기사 더 불러오기",
    share: "공유",
    toc: "이 기사에서",
    sources: "출처 및 참고",
    updated: "업데이트",
    editorialDesk: "리서치 데스크",
    marketsNav: "시장 둘러보기",
  },
};

type LegacyCategory = InsightCategoryKey | "macro" | "commodities";

const titleSets: Record<Locale, Array<[string, string, LegacyCategory, string]>> = {
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
    ["dollar-rates-global-markets", "डॉलर वैश्विक बाजारों के बारे में क्या बताता है", "macro", "डॉलर, ब्याज दर, तरलता और जोखिम वैश्विक चक्रों की मुख्य भाषा बने हुए हैं।"],
    ["forex-gold-oil", "Forex, सोना और तेल: बाजार कैसे जुड़ते हैं", "forex", "मुद्राएँ, ऊर्जा और धातुएँ एक ही वैश्विक कहानी को अलग-अलग कोण से दिखाती हैं।"],
    ["economic-cycles-retail", "खुदरा निवेशकों को आर्थिक चक्र क्यों समझने चाहिए", "risk", "चक्र जोखिम, अवसर, तरलता और दीर्घकालिक संपत्ति निर्माण को समझाते हैं।"],
    ["bitcoin-liquidity-risk", "Bitcoin, तरलता और जोखिम: क्या देखें", "crypto", "क्रिप्टो में तरलता, सुरक्षा, चक्र और जोखिम की भूख पढ़ना ज़रूरी है।"],
    ["etfs-global-stocks-wealth", "ETF और वैश्विक शेयर संपत्ति निर्माण में", "wealth", "वैश्विक पोर्टफोलियो विविधीकरण, मजबूत मुद्रा और दीर्घकालिक संरचना से शुरू होते हैं।"],
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
  id: [
    ["dolar-suku-bunga-pasar-global", "Apa yang dolar ungkap tentang pasar global", "macro", "Dolar, suku bunga, likuiditas dan risiko tetap menjadi bahasa utama siklus global."],
    ["forex-emas-minyak", "Forex, emas dan minyak: bagaimana pasar saling terhubung", "forex", "Mata uang, energi dan logam menceritakan cerita global yang sama dari sudut berbeda."],
    ["siklus-ekonomi-investor-ritel", "Mengapa investor ritel perlu memahami siklus ekonomi", "risk", "Siklus menjelaskan risiko, peluang, likuiditas dan pembangunan kekayaan jangka panjang."],
    ["bitcoin-likuiditas-risiko", "Bitcoin, likuiditas dan risiko: apa yang perlu diperhatikan", "crypto", "Kripto menuntut pembacaan likuiditas, keamanan, siklus dan selera risiko."],
    ["etf-saham-global-kekayaan", "ETF dan saham global dalam pembangunan kekayaan", "wealth", "Portofolio global dimulai dari diversifikasi, mata uang kuat dan struktur jangka panjang."],
  ],
  vi: [
    ["do-la-lai-suat-thi-truong-toan-cau", "Đồng đô la tiết lộ điều gì về thị trường toàn cầu", "macro", "Đô la, lãi suất, thanh khoản và rủi ro vẫn là ngôn ngữ cốt lõi của chu kỳ toàn cầu."],
    ["forex-vang-dau", "Forex, vàng và dầu: các thị trường kết nối ra sao", "forex", "Tiền tệ, năng lượng và kim loại kể cùng một câu chuyện toàn cầu qua nhiều góc nhìn."],
    ["chu-ky-kinh-te-nha-dau-tu-ca-nhan", "Vì sao nhà đầu tư cá nhân cần hiểu chu kỳ kinh tế", "risk", "Chu kỳ giải thích rủi ro, cơ hội, thanh khoản và xây dựng tài sản dài hạn."],
    ["bitcoin-thanh-khoan-rui-ro", "Bitcoin, thanh khoản và rủi ro: cần theo dõi điều gì", "crypto", "Crypto đòi hỏi đọc thanh khoản, bảo mật, chu kỳ và khẩu vị rủi ro."],
    ["etf-co-phieu-toan-cau-tai-san", "ETF và cổ phiếu toàn cầu trong xây dựng tài sản", "wealth", "Danh mục toàn cầu bắt đầu bằng đa dạng hóa, tiền tệ mạnh và cấu trúc dài hạn."],
  ],
  th: [
    ["dollar-rates-global-markets", "What the dollar reveals about global markets", "macro", "The dollar, rates, liquidity and risk remain the core language of global cycles."],
    ["forex-gold-oil", "Forex, gold and oil: how markets connect", "forex", "Currencies, energy and metals tell the same global story from different angles."],
    ["economic-cycles-retail", "Why retail investors need to understand economic cycles", "risk", "Cycles explain risk, opportunity, liquidity and wealth building."],
    ["bitcoin-liquidity-risk", "Bitcoin, liquidity and risk: what to watch", "crypto", "Crypto requires reading liquidity, security, cycle and risk appetite."],
    ["etfs-global-stocks-wealth", "ETFs and global stocks in wealth building", "wealth", "Global portfolios begin with diversification, strong currency and long-term structure."],
  ],
  ru: [
    ["dollar-rates-global-markets", "What the dollar reveals about global markets", "macro", "The dollar, rates, liquidity and risk remain the core language of global cycles."],
    ["forex-gold-oil", "Forex, gold and oil: how markets connect", "forex", "Currencies, energy and metals tell the same global story from different angles."],
    ["economic-cycles-retail", "Why retail investors need to understand economic cycles", "risk", "Cycles explain risk, opportunity, liquidity and wealth building."],
    ["bitcoin-liquidity-risk", "Bitcoin, liquidity and risk: what to watch", "crypto", "Crypto requires reading liquidity, security, cycle and risk appetite."],
    ["etfs-global-stocks-wealth", "ETFs and global stocks in wealth building", "wealth", "Global portfolios begin with diversification, strong currency and long-term structure."],
  ],
  ur: [
    ["dollar-rates-global-markets", "What the dollar reveals about global markets", "macro", "The dollar, rates, liquidity and risk remain the core language of global cycles."],
    ["forex-gold-oil", "Forex, gold and oil: how markets connect", "forex", "Currencies, energy and metals tell the same global story from different angles."],
    ["economic-cycles-retail", "Why retail investors need to understand economic cycles", "risk", "Cycles explain risk, opportunity, liquidity and wealth building."],
    ["bitcoin-liquidity-risk", "Bitcoin, liquidity and risk: what to watch", "crypto", "Crypto requires reading liquidity, security, cycle and risk appetite."],
    ["etfs-global-stocks-wealth", "ETFs and global stocks in wealth building", "wealth", "Global portfolios begin with diversification, strong currency and long-term structure."],
  ],
  bn: [
    ["dollar-rates-global-markets", "What the dollar reveals about global markets", "macro", "The dollar, rates, liquidity and risk remain the core language of global cycles."],
    ["forex-gold-oil", "Forex, gold and oil: how markets connect", "forex", "Currencies, energy and metals tell the same global story from different angles."],
    ["economic-cycles-retail", "Why retail investors need to understand economic cycles", "risk", "Cycles explain risk, opportunity, liquidity and wealth building."],
    ["bitcoin-liquidity-risk", "Bitcoin, liquidity and risk: what to watch", "crypto", "Crypto requires reading liquidity, security, cycle and risk appetite."],
    ["etfs-global-stocks-wealth", "ETFs and global stocks in wealth building", "wealth", "Global portfolios begin with diversification, strong currency and long-term structure."],
  ],
  ja: [
    ["dollar-rates-global-markets", "ドルが世界市場について示すこと", "macro", "ドル、金利、流動性、リスクは、世界のサイクルを読むための中心的な言語です。"],
    ["forex-gold-oil", "Forex、金、原油: 市場はどのようにつながるのか", "forex", "通貨、エネルギー、金属は、同じグローバルストーリーを異なる角度から映し出します。"],
    ["economic-cycles-retail", "個人投資家が経済サイクルを理解すべき理由", "risk", "サイクルはリスク、機会、流動性、長期的な資産形成を説明します。"],
    ["bitcoin-liquidity-risk", "Bitcoin、流動性、リスク: 何を見るべきか", "crypto", "暗号資産には、流動性、安全性、サイクル、リスク選好の読み取りが必要です。"],
    ["etfs-global-stocks-wealth", "ETFとグローバル株式による資産形成", "wealth", "グローバルポートフォリオは、分散、強い通貨、長期構造から始まります。"],
  ],
  ko: [
    ["dollar-rates-global-markets", "달러가 글로벌 시장에 대해 보여주는 것", "macro", "달러, 금리, 유동성, 리스크는 글로벌 사이클을 읽는 핵심 언어입니다."],
    ["forex-gold-oil", "Forex, 금, 원유: 시장은 어떻게 연결되는가", "forex", "통화, 에너지, 금속은 같은 글로벌 이야기를 서로 다른 각도에서 보여줍니다."],
    ["economic-cycles-retail", "개인 투자자가 경제 사이클을 이해해야 하는 이유", "risk", "사이클은 리스크, 기회, 유동성, 장기 자산 형성을 설명합니다."],
    ["bitcoin-liquidity-risk", "Bitcoin, 유동성, 리스크: 무엇을 봐야 하는가", "crypto", "암호화폐는 유동성, 보안, 사이클, 리스크 선호도를 읽는 능력이 필요합니다."],
    ["etfs-global-stocks-wealth", "ETF와 글로벌 주식으로 만드는 자산", "wealth", "글로벌 포트폴리오는 분산, 강한 통화, 장기 구조에서 시작됩니다."],
  ],
  he: [
    ["dollar-rates-global-markets", "מה הדולר חושף על השווקים הגלובליים", "macro", "דולר, ריבית, נזילות וסיכון הם שפת המחזורים הגלובליים."],
    ["forex-gold-oil", "Forex, זהב ונפט: איך השווקים מתחברים", "forex", "מטבעות, אנרגיה ומתכות מספרים את אותה סיפור גלובלי מזוויות שונות."],
    ["economic-cycles-retail", "למה משקיעים קמעונאיים צריכים מחזורים כלכליים", "risk", "מחזורים מסבירים סיכון, הזדמנות, נזילות ובניית הון."],
    ["bitcoin-liquidity-risk", "Bitcoin, נזילות וסיכון: מה לעקוב", "crypto", "קריפטו דורש קריאת נזילות, אבטחה, מחזור ותיאבון סיכון."],
    ["etfs-global-stocks-wealth", "ETFs ומניות גלובליות בבניית הון", "wealth", "תיקים גלובליים מתחילים בגיוון, מטבע חזק ומבנה לטווח ארוך."],
  ],
};

function bodyCopy(locale: Locale) {
  const first: Record<Locale, string> = {
    pt: "A leitura institucional comeca pela relacao entre liquidez, juros, moeda e apetite por risco. Quando esses vetores mudam, os mercados globais se reposicionam antes que o investidor comum perceba.",
    en: "Institutional reading begins with the relationship between liquidity, rates, currency and risk appetite. When these vectors change, global markets reposition before the ordinary investor notices.",
    es: "La lectura institucional comienza por la relacion entre liquidez, tasas, moneda y apetito por riesgo. Cuando esos vectores cambian, los mercados globales se reposicionan antes de que el inversor comun lo perciba.",
    hi: "संस्थागत पढ़ाई तरलता, ब्याज दर, मुद्रा और जोखिम की भूख के संबंध से शुरू होती है। जब ये कारक बदलते हैं, वैश्विक बाजार सामान्य निवेशक को समझने से पहले ही दोबारा व्यवस्थित हो जाते हैं।",
    ar: "تبدأ القراءة المؤسسية من العلاقة بين السيولة والفائدة والعملة وشهية المخاطر. عندما تتغير هذه العوامل، تعيد الاسواق العالمية تموضعها مبكرا.",
    tr: "Kurumsal okuma likidite, faiz, para birimi ve risk istahi iliskisiyle baslar. Bu vektorler degistiginde kuresel piyasalar erken konumlanir.",
    id: "Pembacaan institusional dimulai dari hubungan antara likuiditas, suku bunga, mata uang dan selera risiko. Saat vektor ini berubah, pasar global sering bergerak lebih dahulu sebelum investor umum menyadarinya.",
    vi: "Cách đọc theo hướng tổ chức bắt đầu từ mối quan hệ giữa thanh khoản, lãi suất, tiền tệ và khẩu vị rủi ro. Khi các yếu tố này thay đổi, thị trường toàn cầu thường tái định vị trước khi nhà đầu tư phổ thông nhận ra.",
    he: "הקריאה המוסדית מתחילה בקשר בין נזילות, ריבית, מטבע ותיאבון סיכון. כשהגורמים האלה משתנים, השווקים הגלובליים מתמקמים מחדש לפני שהמשקיע הרגיל מבחין.",
  };
  const second: Record<Locale, string> = {
    pt: "Dentro da metodologia Formiga, Lobo e Harpia, a analise nao serve apenas para prever preco. Ela organiza comportamento financeiro, risco operacional e construcao patrimonial global.",
    en: "Inside the Formiga, Lobo and Harpia methodology, analysis is not only about predicting price. It organizes financial behavior, operational risk and global wealth building.",
    es: "Dentro de la metodologia Formiga, Lobo y Harpia, el analisis no sirve solo para prever precio. Organiza comportamiento financiero, riesgo operativo y construccion patrimonial global.",
    hi: "चींटी, भेड़िया और गरुड़ पद्धति में विश्लेषण केवल कीमत का अनुमान लगाने के लिए नहीं है। यह वित्तीय व्यवहार, परिचालन जोखिम और वैश्विक संपत्ति निर्माण को व्यवस्थित करता है।",
    ar: "ضمن منهجية Formiga وLobo وHarpia، لا يهدف التحليل فقط الى توقع السعر، بل ينظم السلوك المالي والمخاطر التشغيلية وبناء الثروة العالمية.",
    he: "במתודולוגיית Formiga, Lobo ו-Harpia, הניתוח אינו רק לחיזוי מחיר, הוא מסדר התנהגות פיננסית, סיכון תפעולי ובניית הון גלובלית.",
    tr: "Formiga, Lobo ve Harpia metodolojisinde analiz sadece fiyat tahmini degildir. Finansal davranisi, operasyonel riski ve kuresel varlik insasini duzenler.",
    id: "Dalam metodologi Semut, Serigala dan Elang Harpy, analisis bukan hanya soal memprediksi harga. Analisis mengatur perilaku finansial, risiko operasional dan pembangunan kekayaan global.",
    vi: "Trong phương pháp Kiến, Sói và Đại Bàng Harpy, phân tích không chỉ để dự đoán giá. Nó tổ chức hành vi tài chính, rủi ro vận hành và quá trình xây dựng tài sản toàn cầu.",
  };
  return [first[locale] ?? first.en, second[locale] ?? second.en];
}

const translationKeys = [
  "dollar-global-markets",
  "forex-gold-oil",
  "economic-cycles-retail",
  "bitcoin-liquidity-risk",
  "etfs-global-wealth",
] as const;

const editorialSlugByLocale = editorialPosts.reduce<Record<string, Set<string>>>((acc, post) => {
  if (!acc[post.locale]) acc[post.locale] = new Set();
  acc[post.locale].add(post.slug);
  return acc;
}, {});

function makePost(locale: Locale, item: [string, string, InsightCategoryKey | "macro" | "commodities", string], index: number): InsightPost {
  const [slug, title, rawCategory, description] = item;
  const category = migrateLegacyCategory(rawCategory);
  const date = `2026-0${Math.min(index + 1, 5)}-0${index + 2}`;
  const read = locale === "pt" ? `${6 + index} min de leitura` : locale === "es" ? `${6 + index} min de lectura` : `${6 + index} min read`;
  const intro = bodyCopy(locale)[0] ?? description;

  return {
    slug,
    locale,
    translationKey: translationKeys[index] ?? slug,
    status: "published",
    title,
    subtitle: description,
    description,
    category,
    author: "Varejo Investidor",
    date,
    dateModified: date,
    readingTime: read,
    image: `/insights/covers/${slug}.svg`,
    imageAlt: title,
    tags: [getCategoryLabel(locale, category), "Varejo Investidor", "Global Markets"],
    content: [description, ...bodyCopy(locale)],
    blocks: [],
    introduction: intro,
    relatedPosts: titleSets[locale].filter((entry) => entry[0] !== slug).slice(0, 3).map((entry) => entry[0]),
    seoTitle: `${title} | Varejo Investidor`,
    seoDescription: description,
  };
}

const generatedPosts: InsightPost[] = Object.entries(titleSets).flatMap(([locale, posts]) =>
  posts
    .map((post, index) => makePost(locale as Locale, post, index))
    .filter((post) => !(editorialSlugByLocale[post.locale]?.has(post.slug))),
);

function sortByPublishedDesc(posts: InsightPost[]) {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date));
}

export const insightPosts: InsightPost[] = sortByPublishedDesc([...editorialPosts, ...generatedPosts]);

export function getInsightsPath(locale: Locale, slug?: string) {
  const base = publisherHubPathForLocale(locale);
  return `${base}${slug ? `/${slug}` : ""}`;
}

export function getPostsByLocale(locale: Locale) {
  const posts = sortByPublishedDesc(insightPosts.filter((post) => post.locale === locale && post.status === "published"));
  return posts.length ? posts : sortByPublishedDesc(insightPosts.filter((post) => post.locale === "en" && post.status === "published"));
}

export function getFeaturedPost(locale: Locale) {
  const posts = getPostsByLocale(locale);
  return posts.find((post) => post.featured) ?? posts[0];
}

export function filterInsightPosts(
  posts: InsightPost[],
  options: { query?: string; category?: InsightCategoryKey | "all" },
) {
  const query = options.query?.trim().toLowerCase();
  return posts.filter((post) => {
    if (options.category && options.category !== "all" && post.category !== options.category) return false;
    if (!query) return true;
    const haystack = [post.title, post.subtitle, post.description, ...post.tags].join(" ").toLowerCase();
    return haystack.includes(query);
  });
}

export function getPost(locale: Locale, slug: string) {
  return insightPosts.find((post) => post.locale === locale && post.slug === slug) ?? insightPosts.find((post) => post.locale === "en" && post.slug === slug);
}

function localeFromCanonicalArticlesPath(pathname: string | null): Locale | null {
  if (!pathname) return null;
  if (pathname === "/artigos" || pathname.startsWith("/artigos/")) return "pt";
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length >= 2 && parts[1] === "artigos") {
    const seg = parts[0].toLowerCase();
    if (seg === "fil") return "tl";
    const match = SUPPORTED_LOCALES.find((l) => (l === "tl" ? "fil" : l) === seg);
    return match ?? null;
  }
  return null;
}

export function localeFromInsightsPath(pathname: string | null): Locale | null {
  if (!pathname) return null;
  const canonical = localeFromCanonicalArticlesPath(pathname);
  if (canonical) return canonical;
  if (pathname === "/artigos" || (pathname.startsWith("/artigos/") && !pathname.startsWith("/artigos-globais"))) {
    return "pt";
  }
  if (pathname.startsWith("/artigos-globais")) return "pt";
  if (pathname.startsWith("/global-articles-hi")) return "hi";
  if (pathname.startsWith("/global-articles")) return "en";
  if (pathname.startsWith("/articulos-globales")) return "es";
  if (pathname.startsWith("/ar/global-articles")) return "ar";
  if (pathname.startsWith("/he/global-articles")) return "he";
  if (pathname.startsWith("/tr/global-articles")) return "tr";
  if (pathname.startsWith("/id/articles")) return "id";
  if (pathname.startsWith("/vi/articles")) return "vi";
  if (pathname.startsWith("/insights-globais")) return "pt";
  if (pathname.startsWith("/global-insights-hi")) return "hi";
  if (pathname.startsWith("/global-insights")) return "en";
  if (pathname.startsWith("/insights-globales")) return "es";
  if (pathname.startsWith("/ar/global-insights")) return "ar";
  if (pathname.startsWith("/he/global-insights")) return "he";
  if (pathname.startsWith("/tr/global-insights")) return "tr";
  if (pathname.startsWith("/id/insights")) return "id";
  if (pathname.startsWith("/vi/insights")) return "vi";
  if (pathname.startsWith("/ru/insights")) return "ru";
  if (pathname.startsWith("/ur/insights")) return "ur";
  if (pathname.startsWith("/bn/insights")) return "bn";
  if (pathname.startsWith("/ja/articles")) return "ja";
  if (pathname.startsWith("/ja/insights")) return "ja";
  if (pathname.startsWith("/ko/articles")) return "ko";
  if (pathname.startsWith("/ko/insights")) return "ko";
  return null;
}

export function getInsightMarketLinks(locale: Locale): Array<{ href: string; label: string }> {
  const slugs: MarketSlug[] = locale === "pt" ? [...publicMarketSlugs, "fundos-imobiliarios"] : publicMarketSlugs;
  return slugs.map((slug) => ({ href: `/${slug}`, label: getMarketLabel(slug, locale) }));
}

export const insightsFaq: Record<Locale, Array<{ question: string; answer: string }>> = {
  pt: [
    { question: "O que sao Artigos Globais?", answer: "Sao analises editoriais sobre mercados, ciclos, moedas, risco e patrimonio para investidores de varejo." },
    { question: "A newsletter substitui recomendacao?", answer: "Nao. O conteudo e educativo e nao substitui analise individual, planejamento ou gestao de risco." },
  ],
  en: [
    { question: "What are Global Articles?", answer: "Editorial analysis on markets, cycles, currencies, risk and wealth for retail investors." },
    { question: "Does the newsletter replace advice?", answer: "No. The content is educational and does not replace individual analysis, planning or risk management." },
  ],
  es: [
    { question: "Que son Articulos Globales?", answer: "Analisis editoriales sobre mercados, ciclos, divisas, riesgo y patrimonio para inversores minoristas." },
    { question: "La newsletter reemplaza asesoria?", answer: "No. El contenido es educativo y no reemplaza analisis individual, planificacion o gestion de riesgo." },
  ],
  hi: [
    { question: "Global Articles क्या हैं?", answer: "Retail investors के लिए markets, cycles, currencies, risk और wealth पर editorial analysis." },
    { question: "क्या newsletter advice की जगह लेती है?", answer: "नहीं। यह educational content है और individual analysis या risk management की जगह नहीं लेता।" },
  ],
  ar: [
    { question: "ما هي الرؤى العالمية؟", answer: "تحليلات تحريرية عن الاسواق والدورات والعملات والمخاطر والثروة للمستثمرين الافراد." },
    { question: "هل النشرة بديل عن الاستشارة؟", answer: "لا. المحتوى تعليمي ولا يستبدل التحليل الفردي او التخطيط او ادارة المخاطر." },
  ],
  tr: [
    { question: "Kuresel Makaleler nedir?", answer: "Bireysel yatirimcilar icin piyasalar, donguler, para birimleri, risk ve varlik uzerine editorial analizlerdir." },
    { question: "Newsletter danismanligin yerini alir mi?", answer: "Hayir. Icerik egitim amaclidir; bireysel analiz, planlama veya risk yonetiminin yerini almaz." },
  ],
  id: [
    { question: "Apa itu Artikel Global?", answer: "Analisis editorial tentang pasar, siklus, mata uang, risiko dan kekayaan untuk investor ritel." },
    { question: "Apakah newsletter menggantikan nasihat keuangan?", answer: "Tidak. Konten ini bersifat edukatif dan tidak menggantikan analisis individual, perencanaan atau manajemen risiko." },
  ],
  vi: [
    { question: "Góc Nhìn Toàn Cầu là gì?", answer: "Phân tích chuyên sâu về thị trường, chu kỳ, tiền tệ, rủi ro và tài sản dành cho nhà đầu tư cá nhân." },
    { question: "Newsletter có thay thế tư vấn không?", answer: "Không. Nội dung chỉ mang tính giáo dục và không thay thế phân tích cá nhân, lập kế hoạch hoặc quản trị rủi ro." },
  ],
  he: [
    { question: "מהם המאמרים הגלובליים?", answer: "ניתוחים עריכה על שווקים, מחזורים, מטבעות, סיכון והון למשקיעים קמעונאיים." },
    { question: "האם הניוזלטר מחליף ייעוץ?", answer: "לא. התוכן לימודי ואינו מחליף ניתוח אישי, תכנון או ניהול סיכונים." },
  ],
};
