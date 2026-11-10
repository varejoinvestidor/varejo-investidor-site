import { SUPPORTED_LOCALES } from "../i18n/locales";

export const PUBLISHER_LOCALE_LABELS: Record<string, string> = {
  pt: "Português (BR)",
  en: "English",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
  it: "Italiano",
  ar: "العربية",
  fa: "فارسی",
  hi: "हिन्दी",
  ur: "اردو",
  bn: "বাংলা",
  tr: "Türkçe",
  ru: "Русский",
  id: "Bahasa Indonesia",
  vi: "Tiếng Việt",
  th: "ไทย",
  tl: "Filipino",
  zh: "中文",
  ja: "日本語",
  ko: "한국어",
  pl: "Polski",
  he: "עברית",
};

export const PUBLISHER_LANGUAGE_OPTIONS = SUPPORTED_LOCALES.map((code) => ({
  code,
  label: PUBLISHER_LOCALE_LABELS[code] ?? code.toUpperCase(),
}));
