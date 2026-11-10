import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PublisherArtigosHub } from "../../components/publisher/PublisherArtigosHub";
import { PublisherArticleView } from "../../components/publisher/PublisherArticleView";
import { InsightPostPage } from "../../components/InsightPostPage";
import type { Locale } from "../../i18n";
import { getPost, getPostsByLocale } from "../../data/insightsContent";
import { createInsightPostMetadata } from "../../data/insightsMetadata";
import { getPublisherHubCopy } from "./hubCopy";
import {
  getPublishedArticleBySlug,
  getPublishedArticles,
  getRelatedPublishedArticles,
  incrementArticleViews,
} from "./queries";
import { getPublisherHubPath } from "./paths";
import { publisherArticleJsonLd, publisherArticleMetadata, publisherHubJsonLd, publisherHubMetadataForLocale } from "./metadata";

export const PUBLISHER_ARTICLE_REVALIDATE = 60;

export function createPublisherHubMetadata(language: string, pageLocale: Locale): Metadata {
  return publisherHubMetadataForLocale(language, pageLocale, getPublisherHubPath(language));
}

export async function PublisherArticlesHubPage({
  language,
  pageLocale,
}: {
  language: string;
  pageLocale: Locale;
}) {
  const articles = await getPublishedArticles(language);
  const jsonLd = publisherHubJsonLd(articles, language);
  const copy = getPublisherHubCopy(language);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PublisherArtigosHub articles={articles} language={language} pageLocale={pageLocale} copy={copy} />
    </>
  );
}

export async function createPublisherSlugMetadata(language: string, pageLocale: Locale, slug: string): Promise<Metadata> {
  const article = await getPublishedArticleBySlug(slug, language);
  if (article) return publisherArticleMetadata(article);
  if (getPost(pageLocale, slug)) return createInsightPostMetadata(pageLocale, slug);
  return { title: "Artigo não encontrado" };
}

export async function staticParamsForPublisherAndLegacy(language: string, pageLocale: Locale) {
  const [publisher, legacy] = await Promise.all([getPublishedArticles(language, 500), Promise.resolve(getPostsByLocale(pageLocale))]);
  const slugs = new Set<string>([...publisher.map((a) => a.slug), ...legacy.map((p) => p.slug)]);
  return Array.from(slugs).map((slug) => ({ slug }));
}

export async function PublisherArticleSlugPage({
  language,
  pageLocale,
  slug,
}: {
  language: string;
  pageLocale: Locale;
  slug: string;
}) {
  const article = await getPublishedArticleBySlug(slug, language);
  if (article) {
    void incrementArticleViews(article.id);
    const related = await getRelatedPublishedArticles(article);
    const jsonLd = publisherArticleJsonLd(article);
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <PublisherArticleView article={article} related={related} />
      </>
    );
  }

  if (!getPost(pageLocale, slug)) notFound();
  return <InsightPostPage pageLocale={pageLocale} slug={slug} />;
}
