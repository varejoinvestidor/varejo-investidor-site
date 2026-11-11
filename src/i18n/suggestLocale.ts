import { countryCodeFromRequestHeaders } from "../analytics/regions";
import { DEFAULT_LOCALE, isSupportedLocale, type SupportedLocale } from "./locales";

export type SuggestSource = "geo" | "browser" | "default";

const PORTUGUESE_COUNTRIES = new Set(["BR", "PT", "AO", "MZ", "CV", "GW", "ST", "TL"]);
const SPANISH_COUNTRIES = new Set([
  "ES",
  "MX",
  "AR",
  "CL",
  "CO",
  "PE",
  "UY",
  "PY",
  "BO",
  "EC",
  "VE",
  "CR",
  "PA",
  "GT",
  "HN",
  "SV",
  "NI",
  "DO",
  "CU",
  "PR",
  "HT",
  "JM",
  "TT",
  "BZ",
  "GY",
  "SR",
  "GF",
]);
const ENGLISH_PREFERRED = new Set([
  "US",
  "GB",
  "IE",
  "AU",
  "NZ",
  "CA",
  "ZA",
  "NG",
  "GH",
  "KE",
  "UG",
  "TZ",
  "ZM",
  "ZW",
  "BW",
  "MU",
  "SG",
  "MY",
  "PH",
  "HK",
  "MT",
  "CY",
]);
const FRENCH_COUNTRIES = new Set(["FR", "BE", "LU", "MC", "SN", "CI", "CM", "MG", "CD", "MA", "TN", "DZ"]);
const GERMAN_COUNTRIES = new Set(["DE", "AT", "LI", "CH"]);
const ITALIAN_COUNTRIES = new Set(["IT", "SM", "VA"]);
const ARABIC_COUNTRIES = new Set(["SA", "AE", "EG", "IQ", "JO", "LB", "KW", "QA", "OM", "BH", "YE", "SY", "LY", "SD", "PS"]);
const RUSSIAN_COUNTRIES = new Set(["RU", "BY", "KZ", "KG", "UZ", "TJ", "TM"]);
const CHINESE_COUNTRIES = new Set(["CN", "TW", "HK", "MO"]);

export function supportedLocaleFromCountry(countryCode: string | null | undefined): SupportedLocale | null {
  const code = (countryCode ?? "").trim().toUpperCase();
  if (!code || code === "XX" || code === "T1") return null;

  if (PORTUGUESE_COUNTRIES.has(code)) return "pt";
  if (SPANISH_COUNTRIES.has(code)) return "es";
  if (ENGLISH_PREFERRED.has(code)) return "en";
  if (FRENCH_COUNTRIES.has(code)) return "fr";
  if (GERMAN_COUNTRIES.has(code)) return "de";
  if (ITALIAN_COUNTRIES.has(code)) return "it";
  if (code === "IL") return "he";
  if (code === "IR") return "fa";
  if (code === "IN") return "hi";
  if (code === "PK") return "ur";
  if (code === "BD") return "bn";
  if (code === "TR") return "tr";
  if (RUSSIAN_COUNTRIES.has(code)) return "ru";
  if (code === "ID") return "id";
  if (code === "VN") return "vi";
  if (code === "TH") return "th";
  if (code === "PH") return "tl";
  if (CHINESE_COUNTRIES.has(code)) return "zh";
  if (code === "JP") return "ja";
  if (code === "KR") return "ko";
  if (code === "PL") return "pl";
  if (ARABIC_COUNTRIES.has(code)) return "ar";

  return null;
}

export function localeFromAcceptLanguage(header: string | null | undefined): SupportedLocale {
  if (!header) return DEFAULT_LOCALE;

  const requested = header
    .split(",")
    .map((part) => part.trim().split(";")[0]?.toLowerCase())
    .filter(Boolean);

  for (const language of requested) {
    const base = language.split("-")[0];
    if (isSupportedLocale(base)) return base;
    if (language === "fil") return "tl";
    if (language === "zh-cn" || language === "zh-sg" || language === "zh-tw" || language === "zh-hk") return "zh";
  }

  return DEFAULT_LOCALE;
}

/** Mesmo critério do navegador (localStorage / useSiteLocale). */
export function detectLocaleFromNavigator(): SupportedLocale {
  if (typeof navigator === "undefined") return DEFAULT_LOCALE;

  const languages = navigator.languages?.length ? navigator.languages : [navigator.language];
  const detected = languages.join(" ").toLowerCase();

  if (detected.includes("pt")) return "pt";
  if (detected.includes("es")) return "es";
  if (detected.includes("fr")) return "fr";
  if (detected.includes("it")) return "it";
  if (detected.includes("de")) return "de";
  if (detected.includes("fa") || detected.includes("fa-ir")) return "fa";
  if (detected.includes("hi")) return "hi";
  if (detected.includes("ar")) return "ar";
  if (detected.includes("tr")) return "tr";
  if (detected.includes("id") || detected.includes("id-id")) return "id";
  if (detected.includes("vi") || detected.includes("vi-vn")) return "vi";
  if (detected.includes("th") || detected.includes("th-th")) return "th";
  if (detected.includes("ru") || detected.includes("ru-ru")) return "ru";
  if (detected.includes("ur") || detected.includes("ur-pk")) return "ur";
  if (detected.includes("bn") || detected.includes("bn-bd")) return "bn";
  if (detected.includes("ja") || detected.includes("ja-jp")) return "ja";
  if (detected.includes("ko") || detected.includes("ko-kr")) return "ko";
  if (detected.includes("zh") || detected.includes("zh-cn") || detected.includes("zh-sg")) return "zh";
  if (detected.includes("pl") || detected.includes("pl-pl")) return "pl";
  if (detected.includes("tl") || detected.includes("fil") || detected.includes("ph")) return "tl";
  if (detected.includes("he") || detected.includes("iw")) return "he";
  if (detected.includes("en")) return "en";

  return DEFAULT_LOCALE;
}

export type SuggestedLocaleResult = {
  locale: SupportedLocale;
  source: SuggestSource;
  countryCode: string | null;
};

export function suggestLocale(input: {
  countryCode?: string | null;
  acceptLanguage?: string | null;
}): SuggestedLocaleResult {
  const countryCode = (input.countryCode ?? "").trim().toUpperCase() || null;

  const fromGeo = supportedLocaleFromCountry(countryCode);
  if (fromGeo) {
    return { locale: fromGeo, source: "geo", countryCode };
  }

  const fromAccept = localeFromAcceptLanguage(input.acceptLanguage);
  if (fromAccept !== DEFAULT_LOCALE || (input.acceptLanguage ?? "").toLowerCase().includes("en")) {
    return { locale: fromAccept, source: "browser", countryCode };
  }

  if (input.acceptLanguage?.trim()) {
    return { locale: fromAccept, source: "browser", countryCode };
  }

  return { locale: DEFAULT_LOCALE, source: "default", countryCode };
}

export function suggestLocaleFromRequestHeaders(headers: Headers): SuggestedLocaleResult {
  const countryCode = countryCodeFromRequestHeaders(headers);
  const acceptLanguage = headers.get("accept-language");
  return suggestLocale({ countryCode, acceptLanguage });
}

/** Idioma da interface da tela /idioma · inglês quando não há sinal confiável. */
export function languageGateUiLocale(suggested: SupportedLocale, source: SuggestSource): SupportedLocale {
  if (source === "default") return DEFAULT_LOCALE;
  return isSupportedLocale(suggested) ? suggested : DEFAULT_LOCALE;
}
