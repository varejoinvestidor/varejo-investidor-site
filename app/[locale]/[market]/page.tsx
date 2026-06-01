import { notFound } from "next/navigation";
import { MarketPage } from "../../../src/components/MarketPage";
import { createMarketMetadata } from "../../../src/data/marketMetadata";
import type { Locale } from "../../../src/i18n";
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
};

function isLocale(value: string): value is Locale {
  return value === "pt" || value === "en" || value === "es" || value === "hi" || value === "ar" || value === "tr" || value === "id" || value === "vi";
}

function getMarketSlug(locale: string, market: string): MarketSlug | null {
  if (!isLocale(locale)) return null;
  return marketAliasMap[locale][market] ?? null;
}

export function generateStaticParams() {
  return Object.entries(marketAliasMap).flatMap(([locale, markets]) =>
    Object.keys(markets).map((market) => ({ locale, market })),
  );
}

export function generateMetadata({ params }: { params: { locale: string; market: string } }) {
  const slug = getMarketSlug(params.locale, params.market);
  if (!slug) return {};
  return createMarketMetadata(slug);
}

export default function LocalizedMarketPage({ params }: { params: { locale: string; market: string } }) {
  const slug = getMarketSlug(params.locale, params.market);
  if (!slug) notFound();
  if (slug === "fundos-imobiliarios" && params.locale !== "pt") notFound();
  return <MarketPage slug={slug} />;
}
