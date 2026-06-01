import type { Metadata } from "next";
import type { Locale } from "../i18n";
import { getInsightsPath, getPost, insightsBasePath, insightsHero, insightLocales } from "./insightsContent";

const siteUrl = "https://varejo-investidor-site.vercel.app";

function languageAlternates(slug?: string) {
  return Object.fromEntries(
    insightLocales.map((locale) => {
      const hreflang = locale === "pt" ? "pt-BR" : locale;
      return [hreflang, getInsightsPath(locale, slug)];
    }),
  );
}

export function createInsightsMetadata(locale: Locale): Metadata {
  const hero = insightsHero[locale];
  const path = insightsBasePath[locale];

  return {
    title: `${hero.title} | Varejo Investidor`,
    description: hero.metaDescription,
    alternates: {
      canonical: path,
      languages: languageAlternates(),
    },
    openGraph: {
      title: `${hero.title} | Varejo Investidor`,
      description: hero.metaDescription,
      url: `${siteUrl}${path}`,
      siteName: "Varejo Investidor",
      type: "website",
      locale: locale === "pt" ? "pt_BR" : locale,
    },
  };
}

export function createInsightPostMetadata(locale: Locale, slug: string): Metadata {
  const post = getPost(locale, slug);

  if (!post) {
    return {
      title: "Insight | Varejo Investidor",
      description: insightsHero[locale].metaDescription,
    };
  }

  const path = getInsightsPath(locale, slug);

  return {
    title: post.seoTitle,
    description: post.seoDescription,
    alternates: {
      canonical: path,
      languages: languageAlternates(slug),
    },
    openGraph: {
      title: post.seoTitle,
      description: post.seoDescription,
      url: `${siteUrl}${path}`,
      siteName: "Varejo Investidor",
      type: "article",
      locale: locale === "pt" ? "pt_BR" : locale,
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}
