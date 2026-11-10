import type { Locale } from "../../i18n";
import { publisherHubPathForLocale } from "../../i18n/publisherHubPaths";

/** Hub editorial Publisher (Supabase): `/artigos` (PT) ou `/{locale}/artigos`. */
export function getPublisherHubPath(locale: Locale | string) {
  return publisherHubPathForLocale(locale);
}

export function getPublisherArticlePath(locale: string, slug: string) {
  return `${getPublisherHubPath(locale)}/${slug}`;
}

export function publisherHubActivePaths(locale: Locale | string) {
  return [getPublisherHubPath(locale)];
}
