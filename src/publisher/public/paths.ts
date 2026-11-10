import type { Locale } from "../../i18n";
import { getInsightsPath, insightsBasePath } from "../../data/insightsContent";

/** Hub editorial Publisher (Supabase). PT e EN têm URL canônica dedicada; demais idiomas usam `insightsBasePath`. */
export function getPublisherHubPath(locale: Locale | string) {
  if (locale === "pt") return "/artigos";
  if (locale === "en") return "/en/artigos";
  return insightsBasePath[locale as Locale] ?? insightsBasePath.en;
}

export function getPublisherArticlePath(locale: string, slug: string) {
  return `${getPublisherHubPath(locale)}/${slug}`;
}

export function publisherHubActivePaths(locale: Locale | string) {
  const paths = [getPublisherHubPath(locale), getInsightsPath(locale as Locale)];
  if (locale === "pt") paths.push("/artigos");
  if (locale === "en") paths.push("/en/artigos", "/global-articles");
  return paths;
}
