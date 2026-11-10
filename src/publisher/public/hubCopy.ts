import type { Locale } from "../../i18n";
import { insightsHero } from "../../data/insightsContent";

export type PublisherHubCopy = {
  title: string;
  subtitle: string;
  searchPlaceholder: string;
  empty: string;
  featured: string;
  loadMore: string;
};

const UI: Record<string, Omit<PublisherHubCopy, "title" | "subtitle">> = {
  pt: {
    searchPlaceholder: "Buscar artigos…",
    empty: "Nenhum artigo publicado neste idioma. Volte em breve ou acompanhe pelo WhatsApp.",
    featured: "Destaque",
    loadMore: "Carregar mais",
  },
  en: {
    searchPlaceholder: "Search articles…",
    empty: "No published articles in this language yet.",
    featured: "Featured",
    loadMore: "Load more",
  },
  es: {
    searchPlaceholder: "Buscar artículos…",
    empty: "Aún no hay artículos publicados en este idioma.",
    featured: "Destacado",
    loadMore: "Cargar más",
  },
};

const DEFAULT_UI = UI.en;

export function getPublisherHubCopy(language: string): PublisherHubCopy {
  const locale = language as Locale;
  const hero = insightsHero[locale] ?? insightsHero.en;
  const ui = UI[language] ?? DEFAULT_UI;
  return {
    title: hero.title,
    subtitle: hero.subtitle,
    ...ui,
  };
}

export function dateLocaleForArticles(language: string): string {
  if (language === "pt") return "pt-BR";
  if (language === "en") return "en-US";
  if (language === "es") return "es-ES";
  if (language === "fr") return "fr-FR";
  if (language === "de") return "de-DE";
  if (language === "ja") return "ja-JP";
  if (language === "ko") return "ko-KR";
  if (language === "zh") return "zh-CN";
  if (language === "ar") return "ar";
  if (language === "he") return "he-IL";
  return language;
}
