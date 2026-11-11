/** Slug exato do editorial “Canal / Nível Lobo” por idioma (artigos com banner Lobo automático). */
export const LOBO_CHANNEL_ARTICLE_SLUG: Partial<Record<string, string>> = {
  pt: "nivel-lobo",
  en: "wolf-level",
  es: "nivel-lobo",
};

const LOBO_SLUG_PATTERNS = [
  "nivel-lobo",
  "nível-lobo",
  "canal-lobo",
  "wolf-level",
  "wolf-channel",
  "canal-del-lobo",
];

export function isLoboChannelArticle(slug: string, language: string): boolean {
  const normalized = slug.trim().toLowerCase();
  const exact = LOBO_CHANNEL_ARTICLE_SLUG[language]?.toLowerCase();
  if (exact && normalized === exact) return true;
  return LOBO_SLUG_PATTERNS.some((part) => normalized === part || normalized.includes(part));
}

export function articleHasLoboBannerPreset(banners: { preset?: string }[]): boolean {
  return banners.some((b) => b.preset === "lobo");
}
