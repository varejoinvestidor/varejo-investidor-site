import { DEFAULT_LOCALE, SUPPORTED_LOCALES, isSupportedLocale, type Locale, type SupportedLocale } from "./locales";

const URL_LOCALE_ALIASES: Record<string, SupportedLocale> = {
  fil: "tl",
};

const PUBLIC_LOCALE_SEGMENTS: Record<SupportedLocale, string> = {
  pt: "",
  en: "en",
  es: "es",
  fr: "fr",
  de: "de",
  it: "it",
  ar: "ar",
  fa: "fa",
  hi: "hi",
  ur: "ur",
  bn: "bn",
  tr: "tr",
  ru: "ru",
  id: "id",
  vi: "vi",
  th: "th",
  tl: "fil",
  zh: "zh",
  ja: "ja",
  ko: "ko",
  pl: "pl",
};

const MAIN_PAGE_ALIASES: Record<string, string> = {
  home: "",
  sinais: "sinais",
  signals: "sinais",
  educacao: "educacao",
  education: "educacao",
  servicos: "servicos",
  services: "servicos",
  sobre: "sobre",
  about: "sobre",
  artigos: "artigos",
  articles: "artigos",
  "global-articles": "artigos",
  "artigos-globais": "artigos",
  select: "select",
  private: "private",
  eventos: "eventos",
  events: "eventos",
  formiga: "nivel-formiga",
  "nivel-formiga": "nivel-formiga",
  lobo: "nivel-lobo",
  "nivel-lobo": "nivel-lobo",
  harpia: "nivel-harpia",
  "nivel-harpia": "nivel-harpia",
};

const MARKET_ALIASES: Record<string, string> = {
  forex: "forex",
  acoes: "acoes",
  stocks: "acoes",
  acciones: "acoes",
  actions: "acoes",
  aktien: "acoes",
  azioni: "acoes",
  saham: "acoes",
  cripto: "cripto",
  crypto: "cripto",
  krypto: "cripto",
  kripto: "cripto",
  etfs: "etfs",
  ouro: "ouro",
  gold: "ouro",
  oro: "ouro",
  or: "ouro",
  emas: "ouro",
  petroleo: "petroleo",
  oil: "petroleo",
  petrolio: "petroleo",
  oel: "petroleo",
  commodities: "commodities",
  rohstoffe: "commodities",
  komoditas: "commodities",
  "fundos-imobiliarios": "fundos-imobiliarios",
};

const CANONICAL_VISIBLE_SEGMENTS: Record<string, string> = {
  "": "",
  sinais: "sinais",
  educacao: "educacao",
  servicos: "servicos",
  sobre: "sobre",
  artigos: "artigos",
  select: "select",
  private: "private",
  eventos: "eventos",
  "nivel-formiga": "nivel-formiga",
  "nivel-lobo": "nivel-lobo",
  "nivel-harpia": "nivel-harpia",
  forex: "forex",
  acoes: "acoes",
  cripto: "cripto",
  etfs: "etfs",
  ouro: "ouro",
  petroleo: "petroleo",
  commodities: "commodities",
  "fundos-imobiliarios": "fundos-imobiliarios",
};

export function normalizeUrlLocaleSegment(segment: string | null | undefined): SupportedLocale | null {
  if (!segment) return null;
  const lower = segment.toLowerCase();
  if (URL_LOCALE_ALIASES[lower]) return URL_LOCALE_ALIASES[lower];
  return isSupportedLocale(lower) ? lower : null;
}

export function localeToUrlSegment(locale: Locale) {
  const supported = isSupportedLocale(locale) ? locale : DEFAULT_LOCALE;
  return PUBLIC_LOCALE_SEGMENTS[supported];
}

export function hasLocalePrefix(pathname: string | null | undefined) {
  const firstSegment = pathname?.split("/").filter(Boolean)[0] ?? null;
  return Boolean(normalizeUrlLocaleSegment(firstSegment));
}

export function localeFromPublicPath(pathname: string | null | undefined): SupportedLocale | null {
  const parts = pathname?.split("/").filter(Boolean) ?? [];
  if (parts.length === 0) return "pt";
  const urlLocale = normalizeUrlLocaleSegment(parts[0]);
  if (urlLocale) return urlLocale;
  const first = parts[0].toLowerCase();
  if (MAIN_PAGE_ALIASES[first] || MARKET_ALIASES[first] || first === "ferramentas" || first === "calculadora-de-risco") return "pt";
  return null;
}

function stripLocalePrefix(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length && normalizeUrlLocaleSegment(parts[0])) parts.shift();
  return `/${parts.join("/")}`.replace(/\/$/, "") || "/";
}

function canonicalizeFirstSegment(pathname: string) {
  const clean = stripLocalePrefix(pathname);
  const parts = clean.split("/").filter(Boolean);
  if (parts.length === 0) return "/";

  const first = parts[0].toLowerCase();
  const canonical = MAIN_PAGE_ALIASES[first] ?? MARKET_ALIASES[first];
  if (!canonical) return clean;

  parts[0] = CANONICAL_VISIBLE_SEGMENTS[canonical] ?? canonical;
  return `/${parts.join("/")}`;
}

export function localizedPath(pathname: string | null | undefined, locale: Locale) {
  const urlSegment = localeToUrlSegment(locale);
  const canonicalPath = canonicalizeFirstSegment(pathname || "/");

  if (!urlSegment) return canonicalPath === "/home" ? "/" : canonicalPath;
  if (canonicalPath === "/") return `/${urlSegment}`;
  return `/${urlSegment}${canonicalPath}`;
}
