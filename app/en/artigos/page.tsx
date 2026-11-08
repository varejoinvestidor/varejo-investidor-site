import { PublisherArtigosHub } from "../../../src/components/publisher/PublisherArtigosHub";
import { getPublishedArticles } from "../../../src/publisher/public/queries";
import { publisherHubJsonLd, publisherHubMetadata } from "../../../src/publisher/public/metadata";
import { absoluteSiteUrl } from "../../../src/config/site";
import "../../insights-research.css";
import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  ...publisherHubMetadata(),
  title: "Articles | Varejo Investidor",
  description: "Editorial analysis on global economy, financial markets and investment strategy.",
  alternates: { canonical: absoluteSiteUrl("/en/artigos") },
};

export default async function EnArtigosHubPage() {
  const articles = await getPublishedArticles("en");
  const jsonLd = publisherHubJsonLd(articles);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PublisherArtigosHub articles={articles} language="en" pageLocale="en" />
    </>
  );
}
