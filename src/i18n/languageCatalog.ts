import { SUPPORTED_LOCALES, type SupportedLocale } from "./locales";

export const LANGUAGE_GATE_PATH = "/idioma";

export const LANGUAGE_GATE_COOKIE = "varejo_language_gate_completed";
export const LANGUAGE_STORAGE_KEY = "varejo_language";

export type TranslationTier = "primary" | "global" | "expanding";

/** Locales with reviewed primary-market copy (nav + core pages). */
const PRIMARY_LOCALES = new Set<SupportedLocale>(["pt", "en", "es"]);
const GLOBAL_LOCALES = new Set<SupportedLocale>(["fr", "de", "it", "ar", "hi", "tr", "id", "ja", "ko", "zh", "pl", "tl", "fa"]);

export type LanguageCatalogEntry = {
  locale: SupportedLocale;
  code: string;
  nativeName: string;
  englishName: string;
  tier: TranslationTier;
};

const languageMetaRecord: Record<SupportedLocale, { code: string; nativeName: string; englishName: string }> = {
  pt: { code: "PT", nativeName: "Português", englishName: "Portuguese" },
  en: { code: "EN", nativeName: "English", englishName: "English" },
  es: { code: "ES", nativeName: "Español", englishName: "Spanish" },
  fr: { code: "FR", nativeName: "Français", englishName: "French" },
  it: { code: "IT", nativeName: "Italiano", englishName: "Italian" },
  de: { code: "DE", nativeName: "Deutsch", englishName: "German" },
  fa: { code: "FA", nativeName: "فارسی", englishName: "Persian" },
  hi: { code: "HI", nativeName: "हिन्दी", englishName: "Hindi" },
  ar: { code: "AR", nativeName: "العربية", englishName: "Arabic" },
  tr: { code: "TR", nativeName: "Türkçe", englishName: "Turkish" },
  id: { code: "ID", nativeName: "Bahasa Indonesia", englishName: "Indonesian" },
  vi: { code: "VI", nativeName: "Tiếng Việt", englishName: "Vietnamese" },
  th: { code: "TH", nativeName: "ไทย", englishName: "Thai" },
  ru: { code: "RU", nativeName: "Русский", englishName: "Russian" },
  ur: { code: "UR", nativeName: "اردو", englishName: "Urdu" },
  bn: { code: "BN", nativeName: "বাংলা", englishName: "Bengali" },
  ja: { code: "JA", nativeName: "日本語", englishName: "Japanese" },
  ko: { code: "KO", nativeName: "한국어", englishName: "Korean" },
  zh: { code: "ZH", nativeName: "中文", englishName: "Chinese" },
  pl: { code: "PL", nativeName: "Polski", englishName: "Polish" },
  tl: { code: "TL", nativeName: "Filipino", englishName: "Filipino" },
};

export const LANGUAGE_CATALOG: LanguageCatalogEntry[] = SUPPORTED_LOCALES.map((locale) => {
  const meta = languageMetaRecord[locale];
  const tier: TranslationTier = PRIMARY_LOCALES.has(locale)
    ? "primary"
    : GLOBAL_LOCALES.has(locale)
      ? "global"
      : "expanding";
  return { locale, ...meta, tier };
});

/** @deprecated Use LANGUAGE_CATALOG — kept for compact header codes. */
export const languageMeta: Record<SupportedLocale, { code: string; name: string }> = Object.fromEntries(
  LANGUAGE_CATALOG.map((item) => [item.locale, { code: item.code, name: item.nativeName }]),
) as Record<SupportedLocale, { code: string; name: string }>;

export function getTranslationTier(locale: SupportedLocale): TranslationTier {
  if (PRIMARY_LOCALES.has(locale)) return "primary";
  if (GLOBAL_LOCALES.has(locale)) return "global";
  return "expanding";
}

export function hasCompletedLanguageGate(cookieString: string | undefined): boolean {
  if (!cookieString) return false;
  return (
    cookieString.includes(`${LANGUAGE_GATE_COOKIE}=1`) ||
    cookieString.includes("varejo_language_selected=true")
  );
}

export function persistLanguageChoice(locale: SupportedLocale) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(LANGUAGE_STORAGE_KEY, locale);
  window.localStorage.setItem("varejo_language_selected", "true");
  window.localStorage.setItem("language", locale);
  window.localStorage.setItem("varejo-investidor-locale", locale);

  const maxAge = 60 * 60 * 24 * 365;
  document.cookie = `${LANGUAGE_GATE_COOKIE}=1; path=/; max-age=${maxAge}; SameSite=Lax`;
  document.cookie = `${LANGUAGE_STORAGE_KEY}=${locale}; path=/; max-age=${maxAge}; SameSite=Lax`;
  document.cookie = `varejo_language_selected=true; path=/; max-age=${maxAge}; SameSite=Lax`;
}
