import type { Metadata } from "next";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, absoluteSiteUrl } from "../config/site";
import type { Locale } from "../i18n";
import {
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  isSupportedLocale,
  localeToHtmlLang,
  type SupportedLocale,
} from "../i18n/locales";
import { localizedPath } from "../i18n/routing";

export const SITE_LANGUAGE_ALTERNATES: Record<string, string> = {
  "x-default": "/en",
  "pt-BR": "/",
  en: "/en",
  es: "/es",
  fr: "/fr",
  de: "/de",
  it: "/it",
  ar: "/ar",
  fa: "/fa",
  hi: "/hi",
  ur: "/ur",
  bn: "/bn",
  tr: "/tr",
  ru: "/ru",
  id: "/id",
  vi: "/vi",
  th: "/th",
  fil: "/fil",
  zh: "/zh",
  ja: "/ja",
  ko: "/ko",
  pl: "/pl",
  he: "/he",
};

function hreflangKey(locale: SupportedLocale): string {
  if (locale === "pt") return "pt-BR";
  if (locale === "tl") return "fil";
  return localeToHtmlLang(locale);
}

export function buildHreflangMap(pathname: string): Record<string, string> {
  const normalized = pathname === "/home" ? "/" : pathname;
  const languages: Record<string, string> = {
    "x-default": localizedPath(normalized, DEFAULT_LOCALE),
  };

  for (const locale of SUPPORTED_LOCALES) {
    languages[hreflangKey(locale)] = localizedPath(normalized, locale);
  }

  return languages;
}

export function buildPageMetadata(pathname: string, locale: Locale, overrides?: Partial<Metadata>): Metadata {
  const safeLocale = isSupportedLocale(locale) ? locale : DEFAULT_LOCALE;
  const canonicalPath = localizedPath(pathname === "/home" ? "/" : pathname, safeLocale);
  const ogLocale = safeLocale === "pt" ? "pt_BR" : safeLocale === "he" ? "he_IL" : safeLocale;

  return {
    metadataBase: new URL(SITE_URL),
    title: `${SITE_NAME} | Research, Formação e Mercado Global`,
    description: SITE_DESCRIPTION,
    alternates: {
      canonical: canonicalPath,
      languages: buildHreflangMap(pathname),
    },
    openGraph: {
      title: SITE_NAME,
      description: SITE_DESCRIPTION,
      type: "website",
      locale: ogLocale,
      siteName: SITE_NAME,
      url: absoluteSiteUrl(canonicalPath),
    },
    twitter: {
      card: "summary_large_image",
      title: SITE_NAME,
      description: SITE_DESCRIPTION,
    },
    ...overrides,
  };
}
