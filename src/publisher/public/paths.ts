import type { Locale } from "../../i18n";
import { getInsightsPath } from "../../data/insightsContent";

/** Hub editorial Publisher (conteúdo dinâmico). Posts legados continuam em `getInsightsPath(locale, slug)`. */
export function getPublisherHubPath(locale: Locale | string) {
  if (locale === "pt") return "/artigos";
  if (locale === "en") return "/en/artigos";
  return getInsightsPath(locale as Locale);
}

export function getPublisherArticlePath(locale: string, slug: string) {
  if (locale === "pt") return `/artigos/${slug}`;
  if (locale === "en") return `/en/artigos/${slug}`;
  return `${getPublisherHubPath(locale)}/${slug}`;
}

export function publisherHubActivePaths(locale: Locale | string) {
  const paths = [getPublisherHubPath(locale), getInsightsPath(locale as Locale)];
  if (locale === "pt") paths.push("/artigos", "/artigos-globais");
  if (locale === "en") paths.push("/en/artigos", "/global-articles");
  return paths;
}
