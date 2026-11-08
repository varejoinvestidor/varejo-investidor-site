import { PublisherArtigosHub } from "../../src/components/publisher/PublisherArtigosHub";
import { getPublishedArticles } from "../../src/publisher/public/queries";
import { publisherHubJsonLd, publisherHubMetadata } from "../../src/publisher/public/metadata";
import "../insights-research.css";

export const metadata = publisherHubMetadata();
export const revalidate = 60;

export default async function ArtigosHubPage() {
  const articles = await getPublishedArticles("pt");
  const jsonLd = publisherHubJsonLd(articles);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PublisherArtigosHub articles={articles} language="pt" pageLocale="pt" />
    </>
  );
}
