import {
  createPublisherHubMetadata,
  PublisherArticlesHubPage,
  PUBLISHER_ARTICLE_REVALIDATE,
} from "../../../src/publisher/public/articleRoutes";
import "../../insights-research.css";

export const revalidate = PUBLISHER_ARTICLE_REVALIDATE;

export const metadata = createPublisherHubMetadata("ur", "ur");

export default async function PublisherArticlesHub() {
  return PublisherArticlesHubPage({ language: "ur", pageLocale: "ur" });
}
