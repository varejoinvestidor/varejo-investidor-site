import type { Metadata } from "next";
import { absoluteSiteUrl, SITE_NAME } from "../../config/site";
import type { PublicArticleDetail, PublicArticleSummary } from "./types";
import { publisherArticleUrl } from "./queries";

const HUB_TITLE = "Artigos";
const HUB_DESCRIPTION =
  "Análises editoriais do Varejo Investidor: economia global, mercados, geopolítica e estratégias para o investidor de varejo.";

export function publisherHubMetadata(): Metadata {
  const url = absoluteSiteUrl("/artigos");
  return {
    title: `${HUB_TITLE} | ${SITE_NAME}`,
    description: HUB_DESCRIPTION,
    alternates: { canonical: url },
    openGraph: {
      title: `${HUB_TITLE} | ${SITE_NAME}`,
      description: HUB_DESCRIPTION,
      url,
      type: "website",
      siteName: SITE_NAME,
    },
  };
}

export function publisherArticleMetadata(article: PublicArticleDetail): Metadata {
  const title = article.seo_title || article.title;
  const description = article.seo_description || article.excerpt || article.subtitle;
  const url = publisherArticleUrl(article.slug, article.language);
  const images = article.cover_image ? [{ url: article.cover_image, alt: article.title }] : undefined;

  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      publishedTime: article.published_at,
      modifiedTime: article.updated_at,
      authors: [article.author_name ?? SITE_NAME],
      images,
      siteName: SITE_NAME,
    },
    twitter: {
      card: article.cover_image ? "summary_large_image" : "summary",
      title,
      description,
      images: article.cover_image ? [article.cover_image] : undefined,
    },
  };
}

export function publisherArticleJsonLd(article: PublicArticleDetail) {
  const url = publisherArticleUrl(article.slug, article.language);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.seo_description || article.excerpt,
    inLanguage: "pt-BR",
    datePublished: article.published_at,
    dateModified: article.updated_at,
    author: { "@type": "Organization", name: article.author_name ?? SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME, url: absoluteSiteUrl("/") },
    image: article.cover_image ? [article.cover_image] : undefined,
    mainEntityOfPage: url,
    url,
  };
}

export function publisherHubJsonLd(articles: PublicArticleSummary[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: HUB_TITLE,
    description: HUB_DESCRIPTION,
    url: absoluteSiteUrl("/artigos"),
    blogPost: articles.slice(0, 12).map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      url: publisherArticleUrl(post.slug),
      datePublished: post.published_at,
      dateModified: post.updated_at,
    })),
  };
}
