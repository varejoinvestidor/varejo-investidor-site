import { notFound } from "next/navigation";
import { PublisherArticleView } from "../../../../src/components/publisher/PublisherArticleView";
import {
  getPublishedArticleBySlug,
  getRelatedPublishedArticles,
  incrementArticleViews,
} from "../../../../src/publisher/public/queries";
import { publisherArticleJsonLd, publisherArticleMetadata } from "../../../../src/publisher/public/metadata";
import "../../../insights-research.css";

export const revalidate = 60;

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props) {
  const article = await getPublishedArticleBySlug(params.slug, "en");
  if (!article) return { title: "Article not found" };
  return publisherArticleMetadata(article);
}

export default async function EnArtigosSlugPage({ params }: Props) {
  const article = await getPublishedArticleBySlug(params.slug, "en");
  if (!article) notFound();

  void incrementArticleViews(article.id);
  const related = await getRelatedPublishedArticles(article);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(publisherArticleJsonLd(article)) }} />
      <PublisherArticleView article={article} related={related} />
    </>
  );
}
