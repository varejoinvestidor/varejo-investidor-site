/** Gera redirects permanentes de hubs antigos → `/{idioma}/artigos` (importado em next.config.mjs). */

const LOCALES = [
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
  "he",
];

const URL_SEGMENTS = {
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
  he: "he",
};

/** Diretórios legados em app/ (sem barra inicial). */
const LEGACY_HUB_DIRS = [
  "global-articles",
  "global-insights",
  "articulos-globales",
  "insights-globales",
  "insights-globais",
  "artigos-globais",
  "global-articles-hi",
  "global-insights-hi",
  "fr/articles",
  "de/articles",
  "it/articles",
  "fa/articles",
  "pl/articles",
  "zh/articles",
  "ja/articles",
  "ja/insights",
  "ko/articles",
  "ko/insights",
  "ru/articles",
  "ru/insights",
  "ur/articles",
  "ur/insights",
  "bn/articles",
  "bn/insights",
  "th/articles",
  "th/insights",
  "vi/articles",
  "vi/insights",
  "id/articles",
  "id/insights",
  "tl/articles",
  "ar/global-articles",
  "ar/global-insights",
  "tr/global-articles",
  "tr/global-insights",
  "he/global-articles",
  "he/global-insights",
];

function hubPath(locale) {
  if (locale === "pt") return "/artigos";
  const seg = URL_SEGMENTS[locale] || locale;
  return `/${seg}/artigos`;
}

function localeFromLegacyDir(dir) {
  if (dir.startsWith("fr/")) return "fr";
  if (dir.startsWith("de/")) return "de";
  if (dir.startsWith("it/")) return "it";
  if (dir.startsWith("fa/")) return "fa";
  if (dir.startsWith("pl/")) return "pl";
  if (dir.startsWith("zh/")) return "zh";
  if (dir.startsWith("ja/")) return "ja";
  if (dir.startsWith("ko/")) return "ko";
  if (dir.startsWith("ru/")) return "ru";
  if (dir.startsWith("ur/")) return "ur";
  if (dir.startsWith("bn/")) return "bn";
  if (dir.startsWith("th/")) return "th";
  if (dir.startsWith("vi/")) return "vi";
  if (dir.startsWith("id/")) return "id";
  if (dir.startsWith("tl/")) return "tl";
  if (dir.startsWith("ar/")) return "ar";
  if (dir.startsWith("tr/")) return "tr";
  if (dir.startsWith("he/")) return "he";
  if (dir.includes("articulos") || dir.includes("globales")) return "es";
  if (dir.includes("globais") && !dir.includes("globales")) return "pt";
  if (dir.includes("hi")) return "hi";
  if (dir.startsWith("global-")) return "en";
  return "en";
}

export function buildLegacyArticleRedirects() {
  const rules = [];
  const seen = new Set();

  function push(source, destination) {
    if (seen.has(source)) return;
    seen.add(source);
    rules.push({ source, destination, permanent: true });
  }

  for (const dir of LEGACY_HUB_DIRS) {
    const locale = localeFromLegacyDir(dir);
    const dest = hubPath(locale);
    push(`/${dir}`, dest);
    push(`/${dir}/:slug*`, `${dest}/:slug*`);
  }

  for (const locale of LOCALES) {
    if (locale === "pt") continue;
    const seg = URL_SEGMENTS[locale];
    if (!seg) continue;
    const dest = hubPath(locale);
    push(`/${seg}/articles`, dest);
    push(`/${seg}/articles/:slug*`, `${dest}/:slug*`);
    push(`/${seg}/insights`, dest);
    push(`/${seg}/insights/:slug*`, `${dest}/:slug*`);
  }

  return rules;
}
