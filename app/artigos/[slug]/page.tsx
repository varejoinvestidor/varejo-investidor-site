import { notFound } from "next/navigation";
import { PublisherArticleView } from "../../../src/components/publisher/PublisherArticleView";
import {
  getPublishedArticleBySlug,
  getRelatedPublishedArticles,
  incrementArticleViews,
} from "../../../src/publisher/public/queries";
import { publisherArticleJsonLd, publisherArticleMetadata } from "../../../src/publisher/public/metadata";
import "../../insights-research.css";

export const revalidate = 60;

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props) {
  const article = await getPublishedArticleBySlug(params.slug);
  if (!article) return { title: "Artigo não encontrado" };
  return publisherArticleMetadata(article);
}

export default async function ArtigosSlugPage({ params }: Props) {
  const article = await getPublishedArticleBySlug(params.slug);
  if (!article) notFound();

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
