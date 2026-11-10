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
  return staticParamsForPublisherAndLegacy("ur", "ur");
}

export async function generateMetadata({ params }: Props) {
  return createPublisherSlugMetadata("ur", "ur", params.slug);
}

export default async function PublisherArticleSlug({ params }: Props) {
  return PublisherArticleSlugPage({ language: "ur", pageLocale: "ur", slug: params.slug });
}
