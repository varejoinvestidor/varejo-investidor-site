import type { Metadata } from "next";
import { absoluteSiteUrl } from "../config/site";
import { getForexLibraryContent } from "./forexLibraryContent";
import { getMarketContent, type MarketSlug } from "./marketContent";
import { getInstitutionalMarketPage } from "./institutionalMarketPages";

export function createMarketMetadata(slug: MarketSlug): Metadata {
  const institutional = getInstitutionalMarketPage(slug, "pt");
  const content = institutional
    ? { metaTitle: institutional.metaTitle, metaDescription: institutional.metaDescription }
    : slug === "forex"
      ? getForexLibraryContent("pt")
      : getMarketContent(slug, "pt");
  const path = `/${slug}`;
  const url = absoluteSiteUrl(path);

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
