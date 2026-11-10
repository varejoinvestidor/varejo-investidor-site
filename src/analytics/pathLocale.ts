import { localeFromPublicPath } from "../i18n/routing";
import { isSupportedLocale, type SupportedLocale } from "../i18n/locales";

/** Locale do visitante a partir da URL ou do atributo lang do documento. */
export function analyticsLocaleFromContext(pathname: string, htmlLang?: string | null): SupportedLocale | null {
  const fromPath = localeFromPublicPath(pathname);
  if (fromPath) return fromPath;

  const lang = (htmlLang ?? "").trim().toLowerCase();
  if (!lang) return null;
  const primary = lang.split("-")[0];
  if (isSupportedLocale(primary)) return primary;
  return null;
}
