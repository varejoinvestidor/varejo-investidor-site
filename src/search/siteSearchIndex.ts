import { eliteReportPaths } from "../data/eliteReportPaths";
import { insightPosts, getInsightsPath, insightsBasePath } from "../data/insightsContent";
import { getMarketLabel, publicMarketSlugs, type MarketSlug } from "../data/marketContent";
import { getPlatformPath, platformSlugs, type PlatformSlug } from "../data/platformContent";
import type { Locale } from "../i18n";
import { isSupportedLocale } from "../i18n/locales";
import { getPublishedArticles } from "../publisher/public/queries";
import { getPublisherArticlePath } from "../publisher/public/paths";
import type { SiteSearchDocument, SiteSearchResult } from "./types";

function normalize(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function haystack(doc: SiteSearchDocument) {
  return normalize([doc.title, doc.description ?? "", doc.keywords ?? "", doc.href, doc.group].join(" "));
}

function scoreDoc(doc: SiteSearchDocument, tokens: string[]) {
  const h = haystack(doc);
  const title = normalize(doc.title);
  let score = 0;
  for (const t of tokens) {
    if (title.includes(t)) score += 12;
    if (h.includes(t)) score += 4;
  }
  return score;
}

function corePages(locale: Locale): SiteSearchDocument[] {
  const elite = eliteReportPaths[locale] ?? "/relatorio-elite";
  const hub = insightsBasePath[locale] ?? "/artigos";

  const pt = locale === "pt";
  const pages: Array<{ title: string; href: string; group: string; keywords?: string }> = [
    { title: "Home", href: locale === "pt" ? "/" : `/${locale}`, group: "Páginas", keywords: "início" },
    { title: pt ? "Artigos" : "Articles", href: hub, group: "Research", keywords: "artigos research análise" },
    { title: pt ? "Sinais" : "Signals", href: pt ? "/sinais" : `/${locale}/signals`, group: "Trading", keywords: "whatsapp elite canal" },
    { title: pt ? "Educação" : "Education", href: pt ? "/educacao" : `/${locale}/education`, group: "Formação", keywords: "curso aprender" },
    { title: pt ? "Serviços" : "Services", href: pt ? "/servicos" : `/${locale}/services`, group: "Páginas" },
    { title: pt ? "Sobre" : "About", href: pt ? "/sobre" : `/${locale}/about`, group: "Páginas" },
    { title: "Select", href: pt ? "/select" : `/${locale}/select`, group: "Produtos", keywords: "assinatura" },
    { title: "Private", href: pt ? "/private" : `/${locale}/private`, group: "Produtos" },
    { title: pt ? "Relatório Elite" : "Elite Report", href: elite, group: "Elite", keywords: "performance histórico pips" },
    { title: pt ? "Canais WhatsApp" : "WhatsApp channels", href: "/canais-whatsapp", group: "Canais" },
    { title: pt ? "Eventos" : "Events", href: "/eventos", group: "Páginas" },
    { title: pt ? "Calculadora de risco" : "Risk calculator", href: "/calculadora-de-risco", group: "Ferramentas", keywords: "risco forex" },
    {
      title: pt ? "Calculadora Forex" : "Forex calculator",
      href: "/ferramentas/calculadora-forex",
      group: "Ferramentas",
      keywords: "lote pip margem",
    },
    {
      title: pt ? "Juros compostos" : "Compound interest",
      href: "/ferramentas/calculadora-juros-compostos",
      group: "Ferramentas",
    },
    {
      title: pt ? "Raio-X carteira global" : "Global portfolio X-ray",
      href: "/ferramentas/raio-x-carteira-global",
      group: "Ferramentas",
      keywords: "alocação ativos",
    },
    {
      title: pt ? "Calendário econômico" : "Economic calendar",
      href: "/ferramentas/calendario-economico",
      group: "Ferramentas",
      keywords: "macro dados",
    },
    { title: "Formiga", href: "/formiga", group: "Personagens", keywords: "estratégia" },
    { title: "Lobo", href: "/lobo", group: "Personagens" },
    { title: "Harpia", href: "/harpia", group: "Personagens" },
  ];

  return pages.map((p, i) => ({
    id: `core-${locale}-${i}`,
    title: p.title,
    description: p.keywords?.split(" ")[0] ?? p.group,
    href: p.href,
    group: p.group,
    keywords: p.keywords,
    locale,
  }));
}

function marketHref(locale: Locale, slug: MarketSlug) {
  const prefix = locale === "pt" ? "" : `/${locale}`;
  if (locale === "pt") return `/${slug}`;
  const pathSlug =
    slug === "acoes" ? "stocks" : slug === "cripto" ? "crypto" : slug === "fundos-imobiliarios" ? "real-estate" : slug;
  return `${prefix}/${pathSlug}`;
}

function marketPages(locale: Locale): SiteSearchDocument[] {
  return publicMarketSlugs.map((slug: MarketSlug) => {
    const label = getMarketLabel(slug, locale);
    const href = marketHref(locale, slug);
    return {
      id: `market-${locale}-${slug}`,
      title: label,
      description: ptMarketHint(slug, locale),
      href,
      group: locale === "pt" ? "Mercados" : "Markets",
      keywords: `${slug} mercado`,
      locale,
    };
  });
}

function ptMarketHint(slug: MarketSlug, locale: Locale) {
  if (locale !== "pt") return slug;
  const hints: Record<MarketSlug, string> = {
    forex: "Câmbio e pares de moedas",
    acoes: "Bolsa e ações globais",
    cripto: "Bitcoin e criptomoedas",
    etfs: "Fundos negociados em bolsa",
    ouro: "Ouro e metais",
    petroleo: "Petróleo WTI Brent",
    commodities: "Matérias-primas",
    "fundos-imobiliarios": "FIIs e imóveis",
  };
  return hints[slug];
}

function platformPages(locale: Locale): SiteSearchDocument[] {
  return platformSlugs.map((slug: PlatformSlug) => ({
    id: `platform-${locale}-${slug}`,
    title: slug === "metatrader-5" ? "MetaTrader 5" : slug === "ctrader" ? "cTrader" : "TradingView",
    description: locale === "pt" ? "Plataforma de trading" : "Trading platform",
    href: getPlatformPath(locale, slug),
    group: locale === "pt" ? "Plataformas" : "Platforms",
    keywords: "broker execução gráficos",
    locale,
  }));
}

function insightDocuments(): SiteSearchDocument[] {
  return insightPosts
    .filter((p) => p.status === "published")
    .map((post) => ({
      id: `insight-${post.locale}-${post.slug}`,
      title: post.title,
      description: post.subtitle || post.description,
      href: getInsightsPath(post.locale, post.slug),
      group: post.locale === "pt" ? "Artigos globais" : "Global articles",
      keywords: [String(post.category), post.author, post.slug].filter(Boolean).join(" "),
      locale: post.locale,
    }));
}

let cachedArticles: SiteSearchDocument[] | null = null;
let articlesCachedAt = 0;
const ARTICLE_CACHE_MS = 5 * 60 * 1000;

async function articleDocuments(): Promise<SiteSearchDocument[]> {
  const now = Date.now();
  if (cachedArticles && now - articlesCachedAt < ARTICLE_CACHE_MS) return cachedArticles;

  const langs = ["pt", "en", "es"] as const;
  const rows = await Promise.all(langs.map((lang) => getPublishedArticles(lang, 400)));
  const docs: SiteSearchDocument[] = [];
  for (let i = 0; i < langs.length; i++) {
    const lang = langs[i];
    for (const a of rows[i]) {
      docs.push({
        id: `pub-${a.id}`,
        title: a.title,
        description: a.excerpt || a.subtitle,
        href: getPublisherArticlePath(a.language, a.slug),
        group: lang === "pt" ? "VI Publisher" : "Publisher",
        keywords: [a.category_name, a.slug, a.author_name].filter(Boolean).join(" "),
        locale: a.language,
      });
    }
  }
  cachedArticles = docs;
  articlesCachedAt = now;
  return docs;
}

export async function buildSearchIndex(locale: Locale): Promise<SiteSearchDocument[]> {
  const loc = isSupportedLocale(locale) ? locale : "pt";
  const staticDocs = [...corePages(loc), ...marketPages(loc), ...platformPages(loc), ...insightDocuments()];
  const articles = await articleDocuments();
  const merged = new Map<string, SiteSearchDocument>();
  for (const doc of [...staticDocs, ...articles]) {
    const key = doc.href;
    if (!merged.has(key) || (doc.description?.length ?? 0) > (merged.get(key)?.description?.length ?? 0)) {
      merged.set(key, doc);
    }
  }
  return Array.from(merged.values());
}

export async function searchSite(query: string, locale: Locale, limit = 12): Promise<SiteSearchResult[]> {
  const q = query.trim();
  if (q.length < 2) return [];

  const tokens = normalize(q).split(/\s+/).filter(Boolean);
  if (!tokens.length) return [];

  const docs = await buildSearchIndex(locale);
  const scored = docs
    .map((doc) => ({
      doc,
      score: scoreDoc(doc, tokens) + (doc.locale === locale ? 4 : 0) + (doc.href.startsWith(`/${locale}`) ? 2 : 0),
    }))
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score || a.doc.title.localeCompare(b.doc.title, "pt-BR"))
    .slice(0, limit);

  return scored.map(({ doc, score }) => ({
    id: doc.id,
    title: doc.title,
    description: doc.description ?? doc.group,
    href: doc.href,
    group: doc.group,
    score,
  }));
}
