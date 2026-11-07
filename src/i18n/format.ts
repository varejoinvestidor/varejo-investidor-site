import { localeToHtmlLang, type Locale } from "./locales";

export function formatLocaleNumber(value: number, locale: Locale, options?: Intl.NumberFormatOptions) {
  return new Intl.NumberFormat(localeToHtmlLang(locale), options).format(value);
}

export function formatLocaleDate(
  value: Date | string | number,
  locale: Locale,
  options?: Intl.DateTimeFormatOptions,
) {
  const date = value instanceof Date ? value : new Date(value);
  return new Intl.DateTimeFormat(localeToHtmlLang(locale), options).format(date);
}
