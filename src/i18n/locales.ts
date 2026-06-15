export const SUPPORTED_LOCALES = [
  "pt",
  "en",
  "es",
  "fr",
  "de",
  "it",
  "ar",
  "fa",
  "hi",
  "ur",
  "bn",
  "tr",
  "ru",
  "id",
  "vi",
  "th",
  "tl",
  "zh",
  "ja",
  "ko",
  "pl",
] as const;

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];
export type Locale = string;

export const DEFAULT_LOCALE: SupportedLocale = "en";
export const RTL_LOCALES = ["ar", "fa", "ur"] as const satisfies readonly SupportedLocale[];

export function isSupportedLocale(value: string | null | undefined): value is SupportedLocale {
  return Boolean(value && SUPPORTED_LOCALES.includes(value as SupportedLocale));
}

export function isRtlLocale(locale: Locale) {
  return RTL_LOCALES.includes(locale as (typeof RTL_LOCALES)[number]);
}

export function localeToHtmlLang(locale: Locale) {
  if (locale === "pt") return "pt-BR";
  if (locale === "zh") return "zh-CN";
  return locale;
}
