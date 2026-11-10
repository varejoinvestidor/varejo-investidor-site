import type { Locale } from "./locales";
import { isSupportedLocale, SUPPORTED_LOCALES, type SupportedLocale } from "./locales";
import { localeToUrlSegment } from "./routing";

/** Hub editorial Publisher: `/artigos` (PT) ou `/{segmento}/artigos`. */
export function publisherHubPathForLocale(locale: Locale | string): string {
  if (locale === "pt") return "/artigos";
  const supported: SupportedLocale = isSupportedLocale(locale) ? locale : "en";
  const segment = localeToUrlSegment(supported);
  if (!segment) return "/artigos";
  return `/${segment}/artigos`;
}

export const CANONICAL_MARKET_SEGMENTS = [
  "forex",
  "acoes",
  "cripto",
  "etfs",
  "ouro",
  "petroleo",
  "commodities",
  "fundos-imobiliarios",
] as const;
