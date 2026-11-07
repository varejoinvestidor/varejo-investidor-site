import type { Locale } from "../i18n";

/** Default footer YouTube URL before per-locale channels (unchanged for unmapped locales). */
export const LEGACY_YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@Varejoinvestidor";

export const LOCALIZED_YOUTUBE_CHANNEL_URLS = {
  pt: "https://www.youtube.com/@Varejoinvestidor",
  es: "https://www.youtube.com/@Varejoinvestidor_espanhol",
  ar: "https://www.youtube.com/@VarejoInvestidorArabic",
  tr: "https://www.youtube.com/@VarejoInvestidorTurkey",
  de: "https://www.youtube.com/@VarejoInvestidorGermany",
  hi: "https://www.youtube.com/@VarejoInvestidorHindi",
  fa: "https://www.youtube.com/@VarejoInvestidorPersian",
  fr: "https://www.youtube.com/@VarejoInvestidorFrench",
  en: "https://www.youtube.com/@VarejoInvestidorEnglish",
  th: "https://www.youtube.com/@VarejoInvestidorthailand",
} as const satisfies Partial<Record<Locale, string>>;

export function getYoutubeChannelUrl(locale: Locale): string {
  return LOCALIZED_YOUTUBE_CHANNEL_URLS[locale as keyof typeof LOCALIZED_YOUTUBE_CHANNEL_URLS] ?? LEGACY_YOUTUBE_CHANNEL_URL;
}
