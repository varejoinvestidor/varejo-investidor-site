import type { Locale } from "../i18n";
import { fxproButtonLabels, fxproLinks } from "./fxproLinks";
import { getInsightsPath, insightLabels } from "./insightsContent";

export const platformSlugs = ["metatrader-5", "ctrader", "tradingview"] as const;
export type PlatformSlug = (typeof platformSlugs)[number];

export type PlatformContent = {
  slug: PlatformSlug;
  label: string;
  title: string;
  subtitle: string;
  metaDescription: string;
  intro: string;
  sections: Array<{ title: string; text: string; bullets: string[] }>;
  ctaLabel: string;
  ctaHref: string;
};

const localePrefix: Partial<Record<Locale, string>> = {
  en: "/en/platforms",
  es: "/es/platforms",
  hi: "/hi/platforms",
  ar: "/ar/platforms",
  tr: "/tr/platforms",
  id: "/id/platforms",
  vi: "/vi/platforms",
};

export function getPlatformPath(locale: Locale, slug: PlatformSlug) {
  const prefix = localePrefix[locale] ?? "/en/platforms";
  return locale === "pt" ? `/plataformas/${slug}` : `${prefix}/${slug}`;
}

const sharedPlatformLabels: Record<Locale, { eyebrow: string; related: string; articles: string }> = {
  pt: { eyebrow: "Plataformas", related: "Conecte com mercados", articles: "Ler Artigos Globais" },
  en: { eyebrow: "Platforms", related: "Connect with markets", articles: "Read Global Articles" },
  es: { eyebrow: "Plataformas", related: "Conectar con mercados", articles: "Leer Art\u00EDculos Globales" },
  hi: { eyebrow: "\u092A\u094D\u0932\u0947\u091F\u092B\u0949\u0930\u094D\u092E", related: "\u092C\u093E\u091C\u093E\u0930\u094B\u0902 \u0938\u0947 \u091C\u094B\u0921\u093C\u0947\u0902", articles: "\u0935\u0948\u0936\u094D\u0935\u093F\u0915 \u0932\u0947\u0916 \u092A\u0922\u093C\u0947\u0902" },
  ar: { eyebrow: "\u0627\u0644\u0645\u0646\u0635\u0627\u062A", related: "\u0627\u0631\u0628\u0637\u0647\u0627 \u0628\u0627\u0644\u0623\u0633\u0648\u0627\u0642", articles: "\u0627\u0642\u0631\u0623 \u0627\u0644\u0645\u0642\u0627\u0644\u0627\u062A \u0627\u0644\u0639\u0627\u0644\u0645\u064A\u0629" },
  tr: { eyebrow: "Platformlar", related: "Piyasalarla ba\u011Flan", articles: "K\u00FCresel Makaleleri Oku" },
  id: { eyebrow: "Platform", related: "Hubungkan dengan pasar", articles: "Baca Artikel Global" },
  vi: { eyebrow: "N\u1EC1n t\u1EA3ng", related: "K\u1EBFt n\u1ED1i v\u1EDBi th\u1ECB tr\u01B0\u1EDDng", articles: "\u0110\u1ECDc B\u00E0i vi\u1EBFt To\u00E0n c\u1EA7u" },
};

const freeLabels: Record<Locale, string> = {
  pt: "Come\u00E7ar gratuitamente",
  en: "Start for free",
  es: "Comenzar gratis",
  hi: "\u092E\u0941\u092B\u094D\u0924 \u092E\u0947\u0902 \u0936\u0941\u0930\u0942 \u0915\u0930\u0947\u0902",
  ar: "\u0627\u0628\u062F\u0623 \u0645\u062C\u0627\u0646\u064B\u0627",
  tr: "\u00DCcretsiz ba\u015Fla",
  id: "Mulai gratis",
  vi: "B\u1EAFt \u0111\u1EA7u mi\u1EC5n ph\u00ED",
};

const mt5: Record<Locale, Omit<PlatformContent, "slug" | "label" | "ctaLabel" | "ctaHref">> = {
  pt: {
    title: "MetaTrader 5 para opera\u00E7\u00E3o global",
    subtitle: "Terminal para Forex, \u00EDndices, ouro, petr\u00F3leo e execu\u00E7\u00E3o de ordens em desktop, mobile e web.",
    metaDescription: "Entenda o MetaTrader 5, sua execu\u00E7\u00E3o de ordens, uso em Forex, \u00EDndices, ouro, petr\u00F3leo e conex\u00E3o com corretoras.",
    intro: "O MetaTrader 5 \u00E9 uma plataforma usada por operadores globais para acompanhar gr\u00E1ficos, enviar ordens, gerenciar posi\u00E7\u00F5es e conectar contas de corretoras.",
    sections: [
      { title: "O que \u00E9", text: "Um terminal operacional para leitura de mercado e execu\u00E7\u00E3o em Forex, \u00EDndices, ouro e petr\u00F3leo.", bullets: ["Forex", "\u00CDndices", "Ouro", "Petr\u00F3leo"] },
      { title: "Como funciona", text: "A plataforma conecta sua conta de corretora ao ambiente de negocia\u00E7\u00E3o, permitindo ordens a mercado, ordens pendentes e gest\u00E3o de posi\u00E7\u00F5es.", bullets: ["Execu\u00E7\u00E3o de ordens", "Desktop", "Mobile", "Web"] },
      { title: "Vantagens", text: "Combina gr\u00E1ficos, hist\u00F3rico, indicadores e controle de risco para uma opera\u00E7\u00E3o mais disciplinada.", bullets: ["Indicadores", "Hist\u00F3rico", "Risco", "Corretoras"] },
    ],
  },
  en: {
    title: "MetaTrader 5 for global execution",
    subtitle: "A trading terminal for Forex, indices, gold, oil and order execution across desktop, mobile and web.",
    metaDescription: "Understand MetaTrader 5, order execution, Forex, indices, gold, oil, desktop, mobile, web and broker connection.",
    intro: "MetaTrader 5 is a platform used by global traders to follow charts, send orders, manage positions and connect broker accounts.",
    sections: [
      { title: "What it is", text: "An operational terminal for market reading and execution across Forex, indices, gold and oil.", bullets: ["Forex", "Indices", "Gold", "Oil"] },
      { title: "How it works", text: "The platform connects your broker account to the trading environment for market orders, pending orders and position management.", bullets: ["Order execution", "Desktop", "Mobile", "Web"] },
      { title: "Advantages", text: "It combines charts, history, indicators and risk control for a more disciplined execution process.", bullets: ["Indicators", "History", "Risk", "Brokers"] },
    ],
  },
  es: {
    title: "MetaTrader 5 para operaci\u00F3n global",
    subtitle: "Terminal para Forex, \u00EDndices, oro, petr\u00F3leo y ejecuci\u00F3n de \u00F3rdenes en desktop, mobile y web.",
    metaDescription: "Entienda MetaTrader 5, ejecuci\u00F3n de \u00F3rdenes, Forex, \u00EDndices, oro, petr\u00F3leo y conexi\u00F3n con brokers.",
    intro: "MetaTrader 5 es una plataforma utilizada por traders globales para seguir gr\u00E1ficos, enviar \u00F3rdenes, gestionar posiciones y conectar cuentas de brokers.",
    sections: [
      { title: "Qu\u00E9 es", text: "Un terminal operativo para lectura de mercado y ejecuci\u00F3n en Forex, \u00EDndices, oro y petr\u00F3leo.", bullets: ["Forex", "\u00CDndices", "Oro", "Petr\u00F3leo"] },
      { title: "C\u00F3mo funciona", text: "La plataforma conecta su cuenta de broker al entorno de negociaci\u00F3n para \u00F3rdenes de mercado, pendientes y gesti\u00F3n de posiciones.", bullets: ["Ejecuci\u00F3n", "Desktop", "Mobile", "Web"] },
      { title: "Ventajas", text: "Combina gr\u00E1ficos, historial, indicadores y control de riesgo para una ejecuci\u00F3n m\u00E1s disciplinada.", bullets: ["Indicadores", "Historial", "Riesgo", "Brokers"] },
    ],
  },
  hi: {
    title: "\u0935\u0948\u0936\u094D\u0935\u093F\u0915 \u0928\u093F\u0937\u094D\u092A\u093E\u0926\u0928 \u0915\u0947 \u0932\u093F\u090F MetaTrader 5",
    subtitle: "Forex, \u0907\u0902\u0921\u093F\u0938\u0947\u091C, \u0917\u094B\u0932\u094D\u0921, \u0911\u092F\u0932 \u0914\u0930 \u0911\u0930\u094D\u0921\u0930 \u0928\u093F\u0937\u094D\u092A\u093E\u0926\u0928 \u0915\u0947 \u0932\u093F\u090F desktop, mobile \u0914\u0930 web \u091F\u0930\u094D\u092E\u093F\u0928\u0932.",
    metaDescription: "MetaTrader 5, order execution, Forex, indices, gold, oil \u0914\u0930 broker connection \u0915\u094B \u0938\u092E\u091D\u0947\u0902.",
    intro: "MetaTrader 5 \u0935\u0948\u0936\u094D\u0935\u093F\u0915 traders \u0915\u0947 \u0932\u093F\u090F charts \u0926\u0947\u0916\u0928\u0947, orders \u092D\u0947\u091C\u0928\u0947, positions manage \u0915\u0930\u0928\u0947 \u0914\u0930 broker accounts \u091C\u094B\u0921\u093C\u0928\u0947 \u0915\u093E platform \u0939\u0948.",
    sections: [
      { title: "\u092F\u0939 \u0915\u094D\u092F\u093E \u0939\u0948", text: "Forex, indices, gold \u0914\u0930 oil \u092E\u0947\u0902 market reading \u0914\u0930 execution \u0915\u0947 \u0932\u093F\u090F operational terminal.", bullets: ["Forex", "Indices", "Gold", "Oil"] },
      { title: "\u0915\u0948\u0938\u0947 \u0915\u093E\u092E \u0915\u0930\u0924\u093E \u0939\u0948", text: "Platform broker account \u0915\u094B trading environment \u0938\u0947 \u091C\u094B\u0921\u093C\u0924\u093E \u0939\u0948 \u0924\u093E\u0915\u093F orders \u0914\u0930 positions manage \u0939\u094B \u0938\u0915\u0947\u0902.", bullets: ["Order execution", "Desktop", "Mobile", "Web"] },
      { title: "\u0932\u093E\u092D", text: "Charts, history, indicators \u0914\u0930 risk control \u0915\u094B \u090F\u0915 disciplined execution process \u092E\u0947\u0902 \u091C\u094B\u0921\u093C\u0924\u093E \u0939\u0948.", bullets: ["Indicators", "History", "Risk", "Brokers"] },
    ],
  },
  ar: {
    title: "MetaTrader 5 \u0644\u0644\u062A\u0646\u0641\u064A\u0630 \u0627\u0644\u0639\u0627\u0644\u0645\u064A",
    subtitle: "\u0645\u0646\u0635\u0629 \u0644\u0644\u0641\u0648\u0631\u0643\u0633 \u0648\u0627\u0644\u0645\u0624\u0634\u0631\u0627\u062A \u0648\u0627\u0644\u0630\u0647\u0628 \u0648\u0627\u0644\u0646\u0641\u0637 \u0648\u062A\u0646\u0641\u064A\u0630 \u0627\u0644\u0623\u0648\u0627\u0645\u0631 \u0639\u0644\u0649 desktop \u0648mobile \u0648web.",
    metaDescription: "\u062A\u0639\u0631\u0641 \u0639\u0644\u0649 MetaTrader 5 \u0648\u062A\u0646\u0641\u064A\u0630 \u0627\u0644\u0623\u0648\u0627\u0645\u0631 \u0648\u0627\u0644\u0641\u0648\u0631\u0643\u0633 \u0648\u0627\u0644\u0630\u0647\u0628 \u0648\u0627\u0644\u0646\u0641\u0637 \u0648\u0631\u0628\u0637 \u0627\u0644\u0648\u0633\u0637\u0627\u0621.",
    intro: "MetaTrader 5 \u0645\u0646\u0635\u0629 \u064A\u0633\u062A\u062E\u062F\u0645\u0647\u0627 \u0627\u0644\u0645\u062A\u062F\u0627\u0648\u0644\u0648\u0646 \u0639\u0627\u0644\u0645\u064A\u0627\u064B \u0644\u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u0631\u0633\u0648\u0645 \u0648\u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0623\u0648\u0627\u0645\u0631 \u0648\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0631\u0627\u0643\u0632.",
    sections: [
      { title: "\u0645\u0627 \u0647\u064A", text: "\u0645\u062D\u0637\u0629 \u062A\u0634\u063A\u064A\u0644\u064A\u0629 \u0644\u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0633\u0648\u0642 \u0648\u0627\u0644\u062A\u0646\u0641\u064A\u0630 \u0641\u064A \u0627\u0644\u0641\u0648\u0631\u0643\u0633 \u0648\u0627\u0644\u0645\u0624\u0634\u0631\u0627\u062A \u0648\u0627\u0644\u0630\u0647\u0628 \u0648\u0627\u0644\u0646\u0641\u0637.", bullets: ["Forex", "\u0627\u0644\u0645\u0624\u0634\u0631\u0627\u062A", "\u0627\u0644\u0630\u0647\u0628", "\u0627\u0644\u0646\u0641\u0637"] },
      { title: "\u0643\u064A\u0641 \u062A\u0639\u0645\u0644", text: "\u062A\u0631\u0628\u0637 \u062D\u0633\u0627\u0628 \u0627\u0644\u0648\u0633\u064A\u0637 \u0628\u0628\u064A\u0626\u0629 \u0627\u0644\u062A\u062F\u0627\u0648\u0644 \u0644\u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0623\u0648\u0627\u0645\u0631 \u0648\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0631\u0627\u0643\u0632.", bullets: ["\u062A\u0646\u0641\u064A\u0630 \u0627\u0644\u0623\u0648\u0627\u0645\u0631", "Desktop", "Mobile", "Web"] },
      { title: "\u0627\u0644\u0645\u0632\u0627\u064A\u0627", text: "\u062A\u062C\u0645\u0639 \u0628\u064A\u0646 \u0627\u0644\u0631\u0633\u0648\u0645 \u0648\u0627\u0644\u0633\u062C\u0644 \u0648\u0627\u0644\u0645\u0624\u0634\u0631\u0627\u062A \u0648\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u062E\u0627\u0637\u0631.", bullets: ["\u0645\u0624\u0634\u0631\u0627\u062A", "\u0633\u062C\u0644", "\u0645\u062E\u0627\u0637\u0631", "\u0648\u0633\u0637\u0627\u0621"] },
    ],
  },
  tr: {
    title: "K\u00FCresel i\u015Flem i\u00E7in MetaTrader 5",
    subtitle: "Forex, endeksler, alt\u0131n, petrol ve emir iletimi i\u00E7in desktop, mobile ve web terminali.",
    metaDescription: "MetaTrader 5, emir iletimi, Forex, endeksler, alt\u0131n, petrol ve aracı kurum ba\u011Flant\u0131s\u0131n\u0131 anlay\u0131n.",
    intro: "MetaTrader 5, k\u00FCresel trader'lar\u0131n grafikleri izlemesi, emir g\u00F6ndermesi, pozisyon y\u00F6netmesi ve aracı kurum hesaplar\u0131n\u0131 ba\u011Flamas\u0131 i\u00E7in kullan\u0131lan bir platformdur.",
    sections: [
      { title: "Nedir", text: "Forex, endeksler, alt\u0131n ve petrolde piyasa okuma ve i\u015Flem y\u00FCr\u00FCtme i\u00E7in operasyonel terminal.", bullets: ["Forex", "Endeksler", "Alt\u0131n", "Petrol"] },
      { title: "Nas\u0131l \u00E7al\u0131\u015F\u0131r", text: "Platform, aracı kurum hesab\u0131n\u0131z\u0131 i\u015Flem ortam\u0131na ba\u011Flar ve emir/pozisyon y\u00F6netimi sa\u011Flar.", bullets: ["Emir iletimi", "Desktop", "Mobile", "Web"] },
      { title: "Avantajlar", text: "Grafikler, ge\u00E7mi\u015F veriler, indikat\u00F6rler ve risk kontrol\u00FCn\u00FC disiplinli bir s\u00FCre\u00E7te birle\u015Ftirir.", bullets: ["\u0130ndikat\u00F6rler", "Ge\u00E7mi\u015F", "Risk", "Arac\u0131 kurumlar"] },
    ],
  },
  id: {
    title: "MetaTrader 5 untuk eksekusi global",
    subtitle: "Terminal untuk Forex, indeks, emas, minyak dan eksekusi order di desktop, mobile dan web.",
    metaDescription: "Pahami MetaTrader 5, eksekusi order, Forex, indeks, emas, minyak dan koneksi broker.",
    intro: "MetaTrader 5 adalah platform yang digunakan trader global untuk memantau grafik, mengirim order, mengelola posisi dan menghubungkan akun broker.",
    sections: [
      { title: "Apa itu", text: "Terminal operasional untuk membaca pasar dan mengeksekusi transaksi di Forex, indeks, emas dan minyak.", bullets: ["Forex", "Indeks", "Emas", "Minyak"] },
      { title: "Cara kerja", text: "Platform menghubungkan akun broker ke lingkungan trading untuk order pasar, order tertunda dan manajemen posisi.", bullets: ["Eksekusi order", "Desktop", "Mobile", "Web"] },
      { title: "Keunggulan", text: "Menggabungkan grafik, riwayat, indikator dan kontrol risiko untuk proses eksekusi yang lebih disiplin.", bullets: ["Indikator", "Riwayat", "Risiko", "Broker"] },
    ],
  },
  vi: {
    title: "MetaTrader 5 cho giao d\u1ECBch to\u00E0n c\u1EA7u",
    subtitle: "N\u1EC1n t\u1EA3ng cho Forex, ch\u1EC9 s\u1ED1, v\u00E0ng, d\u1EA7u v\u00E0 kh\u1EDBp l\u1EC7nh tr\u00EAn desktop, mobile v\u00E0 web.",
    metaDescription: "T\u00ECm hi\u1EC3u MetaTrader 5, kh\u1EDBp l\u1EC7nh, Forex, ch\u1EC9 s\u1ED1, v\u00E0ng, d\u1EA7u v\u00E0 k\u1EBFt n\u1ED1i broker.",
    intro: "MetaTrader 5 l\u00E0 n\u1EC1n t\u1EA3ng \u0111\u01B0\u1EE3c trader to\u00E0n c\u1EA7u d\u00F9ng \u0111\u1EC3 theo d\u00F5i bi\u1EC3u \u0111\u1ED3, g\u1EEDi l\u1EC7nh, qu\u1EA3n l\u00FD v\u1ECB th\u1EBF v\u00E0 k\u1EBFt n\u1ED1i t\u00E0i kho\u1EA3n broker.",
    sections: [
      { title: "L\u00E0 g\u00EC", text: "N\u1EC1n t\u1EA3ng v\u1EADn h\u00E0nh \u0111\u1EC3 \u0111\u1ECDc th\u1ECB tr\u01B0\u1EDDng v\u00E0 th\u1EF1c thi giao d\u1ECBch tr\u00EAn Forex, ch\u1EC9 s\u1ED1, v\u00E0ng v\u00E0 d\u1EA7u.", bullets: ["Forex", "Ch\u1EC9 s\u1ED1", "V\u00E0ng", "D\u1EA7u"] },
      { title: "C\u00E1ch ho\u1EA1t \u0111\u1ED9ng", text: "N\u1EC1n t\u1EA3ng k\u1EBFt n\u1ED1i t\u00E0i kho\u1EA3n broker v\u1EDBi m\u00F4i tr\u01B0\u1EDDng giao d\u1ECBch \u0111\u1EC3 \u0111\u1EB7t l\u1EC7nh v\u00E0 qu\u1EA3n l\u00FD v\u1ECB th\u1EBF.", bullets: ["Kh\u1EDBp l\u1EC7nh", "Desktop", "Mobile", "Web"] },
      { title: "L\u1EE3i th\u1EBF", text: "K\u1EBFt h\u1EE3p bi\u1EC3u \u0111\u1ED3, l\u1ECBch s\u1EED, ch\u1EC9 b\u00E1o v\u00E0 ki\u1EC3m so\u00E1t r\u1EE7i ro trong m\u1ED9t quy tr\u00ECnh k\u1EF7 lu\u1EADt.", bullets: ["Ch\u1EC9 b\u00E1o", "L\u1ECBch s\u1EED", "R\u1EE7i ro", "Broker"] },
    ],
  },
};

function adaptPlatform(
  base: typeof mt5,
  locale: Locale,
  slug: PlatformSlug,
  label: string,
  title: string,
  introTerm: string,
  cta: { label: string; href: string },
): PlatformContent {
  const source = base[locale];
  return {
    slug,
    label,
    title,
    subtitle: source.subtitle.replace(/MetaTrader 5|MT5/g, introTerm),
    metaDescription: source.metaDescription.replace(/MetaTrader 5|MT5/g, introTerm),
    intro: source.intro.replace(/MetaTrader 5/g, introTerm),
    sections: source.sections,
    ctaLabel: cta.label,
    ctaHref: cta.href,
  };
}

export const platformContent = Object.fromEntries(
  (Object.keys(sharedPlatformLabels) as Locale[]).map((locale) => [
    locale,
    {
      "metatrader-5": {
        slug: "metatrader-5",
        label: "MetaTrader 5",
        ...mt5[locale],
        ctaLabel: fxproButtonLabels[locale],
        ctaHref: fxproLinks[locale],
      },
      ctrader: adaptPlatform(mt5, locale, "ctrader", "cTrader", "cTrader", "cTrader", {
        label: fxproButtonLabels[locale],
        href: fxproLinks[locale],
      }),
      tradingview: adaptPlatform(mt5, locale, "tradingview", "TradingView", "TradingView", "TradingView", {
        label: freeLabels[locale],
        href: "https://www.tradingview.com/",
      }),
    },
  ]),
) as Record<Locale, Record<PlatformSlug, PlatformContent>>;

export function getPlatformContent(locale: Locale, slug: string): PlatformContent | null {
  if (!platformSlugs.includes(slug as PlatformSlug)) return null;
  return platformContent[locale][slug as PlatformSlug] ?? platformContent.en[slug as PlatformSlug];
}

export function getPlatformLabels(locale: Locale) {
  return {
    ...sharedPlatformLabels[locale],
    articlesHref: getInsightsPath(locale),
    articlesLabel: insightLabels[locale].nav,
  };
}
