import {
  createPublisherSlugMetadata,
  PublisherArticleSlugPage,
  PUBLISHER_ARTICLE_REVALIDATE,
  staticParamsForPublisherAndLegacy,
} from "../../../../src/publisher/public/articleRoutes";
import "../../../insights-research.css";

export const revalidate = PUBLISHER_ARTICLE_REVALIDATE;

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  return staticParamsForPublisherAndLegacy("de", "de");
}

export async function generateMetadata({ params }: Props) {
  return createPublisherSlugMetadata("de", "de", params.slug);
}

export default async function PublisherArticleSlug({ params }: Props) {
  return PublisherArticleSlugPage({ language: "de", pageLocale: "de", slug: params.slug });
}
