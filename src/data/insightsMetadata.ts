import type { Metadata } from "next";
import type { Locale } from "../i18n";
import { absoluteSiteUrl } from "../config/site";
import { getTranslationAlternates } from "./insights/registry";
import { getInsightsPath, getPost, getPostsByLocale, insightsBasePath, insightsHero } from "./insightsContent";

function hubLanguageAlternates() {
  return Object.fromEntries(
    (Object.keys(insightsBasePath) as Locale[])
      .filter((locale) => getPostsByLocale(locale).length > 0)
      .map((locale) => {
        const hreflang = locale === "pt" ? "pt-BR" : locale;
        return [hreflang, getInsightsPath(locale)];
      }),
  );
}

function postLanguageAlternates(post: NonNullable<ReturnType<typeof getPost>>) {
  const alternates = getTranslationAlternates(post.translationKey);
  if (!alternates.length) return undefined;
  return Object.fromEntries(
    alternates.map(({ locale, slug }) => {
      const hreflang = locale === "pt" ? "pt-BR" : locale;
      return [hreflang, getInsightsPath(locale, slug)];
    }),
  );
}

export function createInsightsMetadata(locale: Locale): Metadata {
  const hero = insightsHero[locale];
  const path = insightsBasePath[locale];
  const url = absoluteSiteUrl(path);

  return {
    title: `${hero.title} | Varejo Investidor`,
    description: hero.metaDescription,
    alternates: {
      canonical: path,
      languages: hubLanguageAlternates(),
      ...(locale === "pt" ? { types: { "application/rss+xml": "/artigos-globais/feed.xml" } } : {}),
    },
    openGraph: {
      title: `${hero.title} | Varejo Investidor`,
      description: hero.metaDescription,
      url,
      siteName: "Varejo Investidor",
      type: "website",
      locale: locale === "pt" ? "pt_BR" : locale,
    },
    twitter: {
      card: "summary_large_image",
      title: `${hero.title} | Varejo Investidor`,
      description: hero.metaDescription,
    },
    robots: { index: true, follow: true },
  };
}

export function createInsightPostMetadata(locale: Locale, slug: string): Metadata {
  const post = getPost(locale, slug);

  if (!post) {
    return {
      title: "Artigo | Varejo Investidor",
      description: insightsHero[locale].metaDescription,
      robots: { index: false, follow: false },
    };
  }

  const path = getInsightsPath(locale, slug);
  const languages = postLanguageAlternates(post);

  return {
    title: post.seoTitle,
    description: post.seoDescription,
    alternates: {
      canonical: path,
      ...(languages ? { languages } : {}),
    },
    openGraph: {
      title: post.seoTitle,
      description: post.seoDescription,
      url: absoluteSiteUrl(path),
      siteName: "Varejo Investidor",
      type: "article",
      locale: locale === "pt" ? "pt_BR" : locale,
      publishedTime: post.date,
      modifiedTime: post.dateModified,
      authors: [post.author],
      images: [{ url: absoluteSiteUrl(post.image), alt: post.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle,
      description: post.seoDescription,
      images: [absoluteSiteUrl(post.image)],
    },
    robots: { index: true, follow: true },
  };
}
