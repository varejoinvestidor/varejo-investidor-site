import type { Metadata } from "next";
import { getMarketContent, type MarketSlug } from "./marketContent";

const siteUrl = "https://varejo-investidor-site.vercel.app";

export function createMarketMetadata(slug: MarketSlug): Metadata {
  const content = getMarketContent(slug, "pt");
  const path = `/${slug}`;
  const url = `${siteUrl}${path}`;

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: {
      canonical: path,
      languages: slug === "fundos-imobiliarios"
        ? { "pt-BR": path }
        : {
            "pt-BR": path,
            en: path,
            es: path,
            hi: path,
            ar: path,
            tr: path,
            id: path,
            vi: path,
          },
    },
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      url,
      siteName: "Varejo Investidor",
      type: "article",
      locale: "pt_BR",
    },
    twitter: {
      card: "summary_large_image",
      title: content.metaTitle,
      description: content.metaDescription,
    },
  };
}
