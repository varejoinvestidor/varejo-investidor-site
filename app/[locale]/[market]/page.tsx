import { notFound } from "next/navigation";
import { MarketPage } from "../../../src/components/MarketPage";
import { createMarketMetadata } from "../../../src/data/marketMetadata";
import type { Locale } from "../../../src/i18n";
import { SUPPORTED_LOCALES, type SupportedLocale } from "../../../src/i18n/locales";
import { CANONICAL_MARKET_SEGMENTS } from "../../../src/i18n/publisherHubPaths";
import { localeToUrlSegment, normalizeUrlLocaleSegment } from "../../../src/i18n/routing";
import type { MarketSlug } from "../../../src/data/marketContent";

const marketAliasMap: Record<Locale, Record<string, MarketSlug>> = {
  pt: {
    forex: "forex",
    acoes: "acoes",
    cripto: "cripto",
    etfs: "etfs",
    ouro: "ouro",
    petroleo: "petroleo",
    commodities: "commodities",
    "fundos-imobiliarios": "fundos-imobiliarios",
  },
  en: {
    forex: "forex",
    stocks: "acoes",
    crypto: "cripto",
    etfs: "etfs",
    gold: "ouro",
    oil: "petroleo",
    commodities: "commodities",
  },
  es: {
    forex: "forex",
    acciones: "acoes",
    cripto: "cripto",
    etfs: "etfs",
    oro: "ouro",
    petroleo: "petroleo",
    commodities: "commodities",
  },
  fr: {
    forex: "forex",
    actions: "acoes",
    stocks: "acoes",
    crypto: "cripto",
    etfs: "etfs",
    or: "ouro",
    gold: "ouro",
    petrole: "petroleo",
    oil: "petroleo",
    commodities: "commodities",
  },
  it: {
    forex: "forex",
    stocks: "acoes",
    azioni: "acoes",
    crypto: "cripto",
    cripto: "cripto",
    etfs: "etfs",
    gold: "ouro",
    oro: "ouro",
    oil: "petroleo",
    petrolio: "petroleo",
    commodities: "commodities",
  },
  de: {
    forex: "forex",
    stocks: "acoes",
    aktien: "acoes",
    crypto: "cripto",
    krypto: "cripto",
    etfs: "etfs",
    gold: "ouro",
    oil: "petroleo",
    oel: "petroleo",
    commodities: "commodities",
    rohstoffe: "commodities",
  },
  hi: {
    forex: "forex",
    stocks: "acoes",
    crypto: "cripto",
    etfs: "etfs",
    gold: "ouro",
    oil: "petroleo",
    commodities: "commodities",
  },
  ar: {
    forex: "forex",
    stocks: "acoes",
    crypto: "cripto",
    etfs: "etfs",
    gold: "ouro",
    oil: "petroleo",
    commodities: "commodities",
  },
  tr: {
    forex: "forex",
    stocks: "acoes",
    crypto: "cripto",
    etfs: "etfs",
    gold: "ouro",
    oil: "petroleo",
    commodities: "commodities",
  },
  id: {
    forex: "forex",
    stocks: "acoes",
    saham: "acoes",
    crypto: "cripto",
    kripto: "cripto",
    etfs: "etfs",
    gold: "ouro",
    emas: "ouro",
    oil: "petroleo",
    minyak: "petroleo",
    commodities: "commodities",
    komoditas: "commodities",
  },
  vi: {
    forex: "forex",
    stocks: "acoes",
    "co-phieu": "acoes",
    crypto: "cripto",
    "tien-dien-tu": "cripto",
    etfs: "etfs",
    gold: "ouro",
    vang: "ouro",
    oil: "petroleo",
    "dau-mo": "petroleo",
    commodities: "commodities",
    "hang-hoa": "commodities",
  },
  th: {
    forex: "forex",
    stocks: "acoes",
    crypto: "cripto",
    etfs: "etfs",
    gold: "ouro",
    oil: "petroleo",
    commodities: "commodities",
  },
  ru: {
    forex: "forex",
    stocks: "acoes",
    crypto: "cripto",
    etfs: "etfs",
    gold: "ouro",
    oil: "petroleo",
    commodities: "commodities",
  },
  ur: {
    forex: "forex",
    stocks: "acoes",
    crypto: "cripto",
    etfs: "etfs",
    gold: "ouro",
    oil: "petroleo",
    commodities: "commodities",
  },
  bn: {
    forex: "forex",
    stocks: "acoes",
    crypto: "cripto",
    etfs: "etfs",
    gold: "ouro",
    oil: "petroleo",
    commodities: "commodities",
  },
  ja: {
    forex: "forex",
    stocks: "acoes",
    crypto: "cripto",
    etfs: "etfs",
    gold: "ouro",
    oil: "petroleo",
    commodities: "commodities",
  },
  ko: {
    forex: "forex",
    stocks: "acoes",
    crypto: "cripto",
    etfs: "etfs",
    gold: "ouro",
    oil: "petroleo",
    commodities: "commodities",
  },
  zh: {
    forex: "forex",
    stocks: "acoes",
    crypto: "cripto",
    etfs: "etfs",
    gold: "ouro",
    oil: "petroleo",
    commodities: "commodities",
  },
  he: {
    forex: "forex",
    stocks: "acoes",
    crypto: "cripto",
    etfs: "etfs",
    gold: "ouro",
    oil: "petroleo",
    commodities: "commodities",
  },
};

function resolveLocale(segment: string): SupportedLocale | null {
  const locale = normalizeUrlLocaleSegment(segment);
  if (!locale || locale === "pt") return null;
  return locale;
}

function isLocale(value: string): value is Locale {
  return value in marketAliasMap;
}

function getMarketSlug(locale: string, market: string): MarketSlug | null {
  const normalizedMarket = market.toLowerCase();
  if ((CANONICAL_MARKET_SEGMENTS as readonly string[]).includes(normalizedMarket)) {
    if (normalizedMarket === "fundos-imobiliarios" && locale !== "pt") return null;
    return normalizedMarket as MarketSlug;
  }
  if (!isLocale(locale)) return null;
  const localeAliases = marketAliasMap[locale] ?? marketAliasMap.en;
  return localeAliases[normalizedMarket] ?? marketAliasMap.en[normalizedMarket] ?? null;
}

export function generateStaticParams() {
  return SUPPORTED_LOCALES.filter((l) => l !== "pt").flatMap((locale) => {
    const urlLocale = localeToUrlSegment(locale) || locale;
    const localeAliases = marketAliasMap[locale] ?? marketAliasMap.en;
    const markets = new Set([
      ...CANONICAL_MARKET_SEGMENTS.filter((m) => m !== "fundos-imobiliarios"),
      ...Object.keys(localeAliases),
    ]);
    return Array.from(markets).map((market) => ({ locale: urlLocale, market }));
  });
}

export function generateMetadata({ params }: { params: { locale: string; market: string } }) {
  const locale = resolveLocale(params.locale);
  if (!locale) return {};
  const slug = getMarketSlug(locale, params.market);
  if (!slug) return {};
  return createMarketMetadata(slug);
}

export default function LocalizedMarketPage({ params }: { params: { locale: string; market: string } }) {
  const locale = resolveLocale(params.locale);
  if (!locale) notFound();
  const slug = getMarketSlug(locale, params.market);
  if (!slug) notFound();
  return <MarketPage slug={slug} />;
}
